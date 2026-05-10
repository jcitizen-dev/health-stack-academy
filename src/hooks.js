// ── Custom hooks ──────────────────────────────────────────────────────────────
// All hooks added to window.HSA for access in app.js
const { useState, useEffect, useCallback, useRef } = React;

// ── useProgress ──────────────────────────────────────────────────────────────
function useProgress() {
  const STORAGE_KEY = 'hsa_progress';

  function getDefault() {
    return {
      xp: 0, level: 0, streak: 0,
      lastStudyDate: '',
      categoryMastery: { methylation:0, training:0, liver:0, neuro:0, hormones:0, gut:0, hair:0, vegan:0 },
      unlockedModules: [],
      quizHistory: [],
      badges: [],
      reviewQueue: [],
      combo: 0,
      hearts: 3,
      heartsLastReset: '',
      bossesDefeated: [],
      totalQuestionsAnswered: 0,
      perfectSessions: 0,
      dailyChallengeCompletedDate: '',
      openedMarkers: [],
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return getDefault();
      return { ...getDefault(), ...JSON.parse(raw) };
    } catch { return getDefault(); }
  }

  function save(p) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {}
  }

  const [progress, setProgress] = useState(load);

  const update = useCallback((fn) => {
    setProgress(prev => {
      const next = fn(prev);
      save(next);
      return next;
    });
  }, []);

  // Check / update streak on mount
  useEffect(() => {
    const today = new Date().toISOString().slice(0,10);
    update(p => {
      if (p.lastStudyDate === today) return p;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0,10);
      const newStreak = p.lastStudyDate === yesterday ? p.streak + 1 : 1;
      return { ...p, streak: newStreak, lastStudyDate: today };
    });
  }, []);

  const getRank = useCallback((xp) => {
    const ranks = window.HSA.RANKS;
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (xp >= ranks[i].xpRequired) return ranks[i];
    }
    return ranks[0];
  }, []);

  const getNextRank = useCallback((xp) => {
    const ranks = window.HSA.RANKS;
    for (let i = 0; i < ranks.length; i++) {
      if (xp < ranks[i].xpRequired) return ranks[i];
    }
    return null;
  }, []);

  const addXP = useCallback((amount, category) => {
    update(p => {
      const newXp = p.xp + amount;
      const newLevel = getRank(newXp).rank;
      const newMastery = category
        ? { ...p.categoryMastery, [category]: Math.min(100, (p.categoryMastery[category] || 0) + Math.floor(amount / 3)) }
        : p.categoryMastery;
      return { ...p, xp: newXp, level: newLevel, categoryMastery: newMastery };
    });
  }, [update, getRank]);

  const answerQuestion = useCallback((quizId, correct, xpEarned, category) => {
    update(p => {
      const today = new Date().toISOString().slice(0,10);
      const newHistory = [...p.quizHistory, { quizId, correct, date: today, xp: xpEarned }];
      const newXp = correct ? p.xp + xpEarned : p.xp;
      const newLevel = getRank(newXp).rank;
      const newTotal = p.totalQuestionsAnswered + 1;
      const newMastery = correct && category
        ? { ...p.categoryMastery, [category]: Math.min(100, (p.categoryMastery[category] || 0) + Math.floor(xpEarned / 4)) }
        : p.categoryMastery;

      // Update spaced repetition queue
      let newQueue = [...p.reviewQueue];
      const existing = newQueue.find(i => i.quizId === quizId);
      const now = Date.now();
      if (correct) {
        if (existing) {
          existing.interval = Math.round(existing.interval * 2.5);
          existing.nextReview = now + existing.interval * 86400000;
          existing.critical = false;
        } else {
          newQueue.push({ quizId, interval: 1, nextReview: now + 86400000, critical: false });
        }
      } else {
        const q = window.HSA.QUIZZES.find(q => q.id === quizId);
        const isCritical = q && (q.type === 'dosage' || q.type === 'my_value');
        if (existing) {
          existing.interval = 1;
          existing.nextReview = isCritical ? now + 43200000 : now + 86400000;
          existing.critical = isCritical;
        } else {
          newQueue.push({ quizId, interval: 1, nextReview: isCritical ? now + 43200000 : now + 86400000, critical: isCritical });
        }
      }

      // Badge checks
      let newBadges = [...p.badges];
      if (newTotal === 1 && !newBadges.includes('first_step')) newBadges.push('first_step');

      return {
        ...p,
        xp: newXp, level: newLevel,
        quizHistory: newHistory,
        totalQuestionsAnswered: newTotal,
        categoryMastery: newMastery,
        reviewQueue: newQueue,
        badges: newBadges,
        lastStudyDate: today,
      };
    });
  }, [update, getRank]);

  const defeatBoss = useCallback((bossId, badgeId) => {
    update(p => {
      const newXp = p.xp + 150;
      const newLevel = getRank(newXp).rank;
      const newDefeated = [...new Set([...p.bossesDefeated, bossId])];
      const newBadges = [...new Set([...p.badges, 'boss_slayer', badgeId].filter(Boolean))];
      const isAllDefeated = window.HSA.BOSSES.every(b => newDefeated.includes(b.id));
      if (isAllDefeated && !newBadges.includes('undefeated')) newBadges.push('undefeated');
      if (newLevel === 6 && !newBadges.includes('stack_master_badge')) newBadges.push('stack_master_badge');
      return { ...p, xp: newXp, level: newLevel, bossesDefeated: newDefeated, badges: newBadges };
    });
  }, [update, getRank]);

  const earnBadge = useCallback((badgeId) => {
    update(p => {
      if (p.badges.includes(badgeId)) return p;
      return { ...p, badges: [...p.badges, badgeId] };
    });
  }, [update]);

  const markMarkerOpened = useCallback((markerId) => {
    update(p => {
      if (p.openedMarkers.includes(markerId)) return p;
      const newOpened = [...p.openedMarkers, markerId];
      const newBadges = [...p.badges];
      const allMarkers = window.HSA.BIOMARKERS.map(b => b.id);
      if (allMarkers.every(id => newOpened.includes(id)) && !newBadges.includes('know_thyself')) {
        newBadges.push('know_thyself');
      }
      return { ...p, openedMarkers: newOpened, badges: newBadges };
    });
  }, [update]);

  const resetProgress = useCallback(() => {
    const fresh = getDefault();
    save(fresh);
    setProgress(fresh);
  }, []);

  return { progress, addXP, answerQuestion, defeatBoss, earnBadge, markMarkerOpened, resetProgress, getRank, getNextRank, update };
}

// ── useCombo ──────────────────────────────────────────────────────────────────
function useCombo() {
  const [combo, setCombo] = useState(0);

  const multiplier = combo >= 10 ? 3.0 : combo >= 5 ? 2.0 : combo >= 3 ? 1.5 : 1.0;

  const incrementCombo = useCallback(() => setCombo(c => c + 1), []);
  const resetCombo = useCallback(() => setCombo(0), []);

  return { combo, multiplier, incrementCombo, resetCombo };
}

// ── useHearts ─────────────────────────────────────────────────────────────────
function useHearts(progress, updateProgress) {
  const today = new Date().toISOString().slice(0,10);
  const hearts = progress.heartsLastReset === today ? progress.hearts : 3;

  const consumeHeart = useCallback(() => {
    updateProgress(p => {
      const today = new Date().toISOString().slice(0,10);
      const current = p.heartsLastReset === today ? p.hearts : 3;
      return { ...p, hearts: Math.max(0, current - 1), heartsLastReset: today };
    });
  }, [updateProgress]);

  const heartsEmpty = hearts <= 0;

  return { hearts, consumeHeart, heartsEmpty };
}

// ── useStackBridge ────────────────────────────────────────────────────────────
function useStackBridge() {
  const [todaysTaken, setTodaysTaken] = useState(null);

  useEffect(() => {
    const dateStr = (() => {
      const d = new Date();
      return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
    })();
    const prefix = 'sl2|' + dateStr + '|';

    // Try IndexedDB first (Stack.html stores data there)
    const tryIDB = () => {
      try {
        const req = indexedDB.open('suppLog2', 1);
        req.onsuccess = (e) => {
          try {
            const db = e.target.result;
            const tx = db.transaction('c', 'readonly');
            const store = tx.objectStore('c');
            const keysReq = store.getAllKeys();
            keysReq.onsuccess = () => {
              const taken = (keysReq.result || [])
                .filter(k => String(k).startsWith(prefix))
                .map(k => String(k).replace(prefix, ''));
              setTodaysTaken(taken.length > 0 ? taken : null);
            };
          } catch { tryLS(); }
        };
        req.onerror = () => tryLS();
      } catch { tryLS(); }
    };

    const tryLS = () => {
      try {
        const taken = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith(prefix)) taken.push(k.replace(prefix, ''));
        }
        setTodaysTaken(taken.length > 0 ? taken : null);
      } catch { setTodaysTaken(null); }
    };

    tryIDB();
  }, []);

  return { todaysTaken };
}

// ── useQuizSession ────────────────────────────────────────────────────────────
function useQuizSession(quizIds, onComplete) {
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(null); // null | 'correct' | 'wrong'
  const [results, setResults] = useState([]);
  const [sessionXP, setSessionXP] = useState(0);
  const [done, setDone] = useState(false);

  const quizzes = (quizIds || []).map(id => window.HSA.QUIZZES.find(q => q.id === id)).filter(Boolean);
  const current = quizzes[idx] || null;

  const submitAnswer = useCallback((selectedAnswer, multiplier, hearts, consumeHeart, answerQuestion) => {
    if (!current || answered !== null) return;
    const correct = selectedAnswer === current.answer;
    const baseXP = current.xpReward || 10;
    const earned = correct ? Math.round(baseXP * multiplier) : 0;

    setAnswered(correct ? 'correct' : 'wrong');
    setResults(r => [...r, { quizId: current.id, correct, earned }]);
    if (correct) setSessionXP(x => x + earned);
    if (!correct) consumeHeart();
    answerQuestion(current.id, correct, earned, current.category);

    setTimeout(() => {
      if (idx + 1 >= quizzes.length) {
        setDone(true);
        if (onComplete) onComplete(results.concat({ quizId: current.id, correct, earned }), sessionXP + earned);
      } else {
        setIdx(i => i + 1);
        setAnswered(null);
      }
    }, 1200);
  }, [current, answered, idx, quizzes.length, results, sessionXP, onComplete]);

  return { current, idx, total: quizzes.length, answered, results, sessionXP, done, submitAnswer };
}

// Export to global
window.HSA.hooks = { useProgress, useCombo, useHearts, useStackBridge, useQuizSession };
