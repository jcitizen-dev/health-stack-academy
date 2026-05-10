// ── Screens + App + Router ────────────────────────────────────────────────────
const { useState, useEffect, useCallback, useRef, useMemo, useContext, createContext } = React;

// ── Custom hash router (no external dependency) ───────────────────────────────
const RouterCtx = createContext({ pathname: '/', search: '', navigate: () => {} });

function HashRouter({ children }) {
  const parse = () => {
    const raw = window.location.hash.replace(/^#/, '') || '/';
    const qi = raw.indexOf('?');
    return qi === -1
      ? { pathname: raw, search: '' }
      : { pathname: raw.slice(0, qi), search: raw.slice(qi) };
  };
  const [loc, setLoc] = useState(parse);
  const navigate = useCallback((to) => { window.location.hash = to; }, []);
  useEffect(() => {
    const h = () => setLoc(parse());
    window.addEventListener('hashchange', h);
    return () => window.removeEventListener('hashchange', h);
  }, []);
  return React.createElement(RouterCtx.Provider, { value: { ...loc, navigate } }, children);
}

function useNavigate() { return useContext(RouterCtx).navigate; }
function useLocation() { const { pathname, search } = useContext(RouterCtx); return { pathname, search }; }

function Routes({ children }) {
  const { pathname } = useContext(RouterCtx);
  const kids = React.Children.toArray(children);
  for (const kid of kids) {
    const pattern = kid.props.path || '';
    if (pattern === pathname) return kid.props.element;
    const pp = pattern.split('/'), lp = pathname.split('/');
    if (pp.length === lp.length && pp.every((seg, i) => seg.startsWith(':') || seg === lp[i])) {
      return kid.props.element;
    }
  }
  return null;
}

function Route() { return null; }

// Destructure hooks
const { useProgress, useCombo, useHearts, useStackBridge, useQuizSession } = window.HSA.hooks;
// Destructure components
const {
  PillTag, RankBadge, XPBar, MasteryRing, HeartBar, ComboCounter, XPBurst,
  RangeBar, DosageBadge, BadgeCard, StreakFlame, BossHealthBar,
  SkillNode, ParticleExplosion, QuizCard, FlashCard, TimerBar, QuizProgressBar,
} = window.HSA.components;

// ── Disclaimer Modal ──────────────────────────────────────────────────────────
function DisclaimerModal({ onAccept }) {
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div className="anim-pop-in" style={{ background:'var(--surface)', borderRadius:'var(--radius)', padding:28, maxWidth:420, width:'100%', border:'1px solid var(--border)' }}>
        <div style={{ fontSize:32, textAlign:'center', marginBottom:12 }}>⚕️</div>
        <h2 style={{ fontFamily:'DM Mono, monospace', fontSize:14, letterSpacing:'0.06em', textAlign:'center', marginBottom:16, color:'var(--accent)' }}>EDUCATIONAL DISCLAIMER</h2>
        <p style={{ fontSize:13, lineHeight:1.7, color:'var(--muted)', marginBottom:20 }}>
          This app is a <strong style={{color:'var(--text)'}}>personal educational tool</strong> to help you learn your own supplement stack and bloodwork results. All content reflects one individual's personal health data and reading materials.
          <br/><br/>
          <strong style={{color:'var(--danger)'}}>This is NOT medical advice.</strong> Do not use this to make healthcare decisions. Always consult qualified medical professionals for health guidance.
        </p>
        <button onClick={onAccept} style={{
          width:'100%', padding:'14px', borderRadius:'var(--radius)',
          background:'var(--accent)', color:'#0e0e0f', border:'none',
          fontFamily:'DM Mono, monospace', fontSize:13, fontWeight:500,
          letterSpacing:'0.06em', cursor:'pointer',
        }}>I UNDERSTAND — LET'S LEARN</button>
      </div>
    </div>
  );
}

// ── Bottom Nav ─────────────────────────────────────────────────────────────────
function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const tabs = [
    { path:'/', label:'Today', icon:'🏠' },
    { path:'/learn', label:'Learn', icon:'📚' },
    { path:'/quiz', label:'Quiz', icon:'⚡' },
    { path:'/flashcards', label:'Flash', icon:'🃏' },
    { path:'/progress', label:'Progress', icon:'📊' },
  ];
  return (
    <nav className="bottom-nav">
      <div style={{ display:'flex', maxWidth:480, margin:'0 auto' }}>
        {tabs.map(t => {
          const active = location.pathname === t.path || (t.path !== '/' && location.pathname.startsWith(t.path));
          return (
            <button key={t.path} onClick={() => navigate(t.path)} style={{
              flex:1, padding:'10px 0', background:'transparent', border:'none',
              color: active ? 'var(--accent)' : 'var(--muted)',
              fontFamily:'DM Mono, monospace', fontSize:9, letterSpacing:'0.06em',
              textTransform:'uppercase', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:3,
              transition:'color 0.15s',
            }}>
              <span style={{ fontSize:18 }}>{t.icon}</span>
              {t.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ── Dashboard Screen ──────────────────────────────────────────────────────────
function Dashboard({ progressHook }) {
  const { progress, getRank, getNextRank } = progressHook;
  const { todaysTaken } = useStackBridge();
  const navigate = useNavigate();
  const rank = getRank(progress.xp);
  const nextRank = getNextRank(progress.xp);
  const daily = window.HSA.getDailyChallenge();
  const overdue = progress.reviewQueue.filter(i => i.nextReview <= Date.now());

  const avgMastery = useMemo(() => {
    const vals = Object.values(progress.categoryMastery);
    return vals.length ? Math.round(vals.reduce((a,b) => a+b, 0) / vals.length) : 0;
  }, [progress.categoryMastery]);

  const todayCorrect = useMemo(() => {
    const today = new Date().toISOString().slice(0,10);
    const todayQ = progress.quizHistory.filter(h => h.date === today);
    if (!todayQ.length) return 0;
    return Math.round((todayQ.filter(h => h.correct).length / todayQ.length) * 100);
  }, [progress.quizHistory]);

  return (
    <div style={{ maxWidth:480, margin:'0 auto', padding:'16px 16px 100px' }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24, paddingTop: 'env(safe-area-inset-top, 16px)' }}>
        <RankBadge rank={rank.rank} size={56} pulse />
        <div style={{ flex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <h1 style={{ fontSize:22, fontWeight:300 }}>Health Stack Academy</h1>
            <StreakFlame streak={progress.streak} />
          </div>
          <div style={{ fontFamily:'DM Mono, monospace', fontSize:11, color:'var(--muted)', marginTop:2 }}>{rank.icon} {rank.title} · {progress.streak} day streak</div>
        </div>
      </div>

      {/* XP Bar */}
      <XPBar xp={progress.xp} getRank={getRank} getNextRank={getNextRank} />

      {/* Activity Rings */}
      <div style={{ display:'flex', justifyContent:'space-around', padding:'20px 0', background:'var(--surface)', borderRadius:'var(--radius)', border:'1px solid var(--border)', marginTop:12 }}>
        <MasteryRing value={todayCorrect} label="Today" size={72} color="var(--accent)" />
        <MasteryRing value={(progress.streak / 7) * 100} label="Streak" size={72} color="var(--rare)" />
        <MasteryRing value={avgMastery} label="Overall" size={72} color="var(--epic)" />
      </div>

      {/* Daily Challenge */}
      <div style={{ marginTop:12, padding:16, background:'var(--surface)', borderRadius:'var(--radius)', border:'2px solid var(--xp-gold)', boxShadow:'0 0 16px rgba(255,215,0,0.15)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
          <span style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--xp-gold)', letterSpacing:'0.08em', textTransform:'uppercase' }}>Daily Challenge</span>
          <span style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--xp-gold)', padding:'2px 8px', border:'1px solid var(--xp-gold)', borderRadius:'40px' }}>2× XP</span>
        </div>
        <p style={{ fontSize:13, lineHeight:1.5, marginBottom:12 }}>{daily?.question}</p>
        {progress.dailyChallengeCompletedDate === new Date().toISOString().slice(0,10)
          ? <div style={{ fontFamily:'DM Mono, monospace', fontSize:11, color:'var(--accent)' }}>✓ Completed today</div>
          : <button onClick={() => navigate('/quiz?daily=1')} style={{
              padding:'10px 20px', borderRadius:'var(--radius-pill)',
              background:'var(--xp-gold)', color:'#0e0e0f', border:'none',
              fontFamily:'DM Mono, monospace', fontSize:12, fontWeight:500, cursor:'pointer',
            }}>Attempt Challenge</button>
        }
      </div>

      {/* Overdue review */}
      {overdue.length > 0 && (
        <div onClick={() => navigate('/quiz?review=1')} style={{ marginTop:12, padding:14, background:'var(--surface)', borderRadius:'var(--radius)', border:`1px solid ${overdue.length > 5 ? 'var(--danger)' : 'var(--border)'}`, cursor:'pointer', display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontSize:24 }}>📋</span>
          <div>
            <div style={{ fontSize:14, fontWeight:500 }}>Review Queue</div>
            <div style={{ fontFamily:'DM Mono, monospace', fontSize:11, color: overdue.length > 5 ? 'var(--danger)' : 'var(--muted)', marginTop:2 }}>{overdue.length} card{overdue.length !== 1 ? 's' : ''} due for review</div>
          </div>
          <span style={{ marginLeft:'auto', color:'var(--muted)' }}>›</span>
        </div>
      )}

      {/* Stack Bridge */}
      {todaysTaken && todaysTaken.length > 0 && (
        <div onClick={() => navigate('/quiz?stack=1')} style={{ marginTop:12, padding:14, background:'var(--accent-dim)', borderRadius:'var(--radius)', border:'1px solid rgba(200,245,66,0.3)', cursor:'pointer' }}>
          <div style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--accent)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6 }}>Stack Bridge</div>
          <div style={{ fontSize:13 }}>You took <strong style={{color:'var(--accent)'}}>{todaysTaken.length} supplements</strong> today. Quick recall quiz available.</div>
        </div>
      )}

      {/* Category Grid */}
      <div style={{ marginTop:12 }}>
        <div style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--muted)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10 }}>Skill Tree</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {Object.entries(window.HSA.CATEGORIES).map(([key, cat]) => {
            const mastery = progress.categoryMastery[key] || 0;
            return (
              <div key={key} onClick={() => navigate(`/learn?category=${key}`)} style={{
                padding:14, background:'var(--surface)', borderRadius:'var(--radius)',
                border:'1px solid var(--border)', cursor:'pointer', transition:'border-color 0.2s',
              }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
                  <span style={{ fontSize:20 }}>{cat.emoji}</span>
                  <span style={{ fontFamily:'DM Mono, monospace', fontSize:11, color: cat.color }}>{mastery}%</span>
                </div>
                <div style={{ fontSize:12, fontWeight:500, marginBottom:6 }}>{cat.label}</div>
                <div style={{ height:3, background:'var(--surface2)', borderRadius:2 }}>
                  <div style={{ height:'100%', width:`${mastery}%`, background: cat.color, borderRadius:2, transition:'width 1s ease' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Badges */}
      {progress.badges.length > 0 && (
        <div style={{ marginTop:12 }}>
          <div style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--muted)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10 }}>Recent Badges</div>
          <div style={{ display:'flex', gap:16 }}>
            {progress.badges.slice(-3).map(id => {
              const badge = window.HSA.BADGES.find(b => b.id === id);
              if (!badge) return null;
              return <BadgeCard key={id} badge={badge} earned small />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Biomarkers Screen ─────────────────────────────────────────────────────────
function BiomarkersScreen({ progressHook }) {
  const { markMarkerOpened } = progressHook;
  const navigate = useNavigate();
  const panels = ['metabolic','glucose','liver','kidney','minerals','hormones','thyroid','inflammation','vitamins'];
  const [activePanel, setActivePanel] = useState('liver'); // Start on liver since it has the key flagged results
  const [expanded, setExpanded] = useState(null);

  const markers = window.HSA.BIOMARKERS.filter(m => m.panel === activePanel);

  const handleExpand = (id) => {
    setExpanded(e => e === id ? null : id);
    markMarkerOpened(id);
  };

  const statusPriority = { elevated:0, borderline:1, low:2, optimal:3 };
  const sortedMarkers = [...markers].sort((a,b) => (statusPriority[a.status]||3) - (statusPriority[b.status]||3));

  return (
    <div style={{ maxWidth:480, margin:'0 auto', padding:'16px 16px 100px' }}>
      <div style={{ paddingTop:'env(safe-area-inset-top, 16px)', marginBottom:16 }}>
        <h1 style={{ fontSize:22, fontWeight:300 }}>My Bloodwork</h1>
        <div style={{ fontFamily:'DM Mono, monospace', fontSize:11, color:'var(--muted)', marginTop:4 }}>April 2026 · Serbia</div>
      </div>

      {/* Panel tabs */}
      <div style={{ display:'flex', gap:6, overflowX:'auto', paddingBottom:4, marginBottom:16, scrollbarWidth:'none' }}>
        {panels.map(p => (
          <button key={p} onClick={() => { setActivePanel(p); setExpanded(null); }} style={{
            flexShrink:0, padding:'7px 14px', borderRadius:'40px',
            border:`1px solid ${activePanel === p ? 'var(--accent)' : 'var(--border)'}`,
            background: activePanel === p ? 'var(--accent)' : 'transparent',
            color: activePanel === p ? '#0e0e0f' : 'var(--muted)',
            fontFamily:'DM Mono, monospace', fontSize:11, cursor:'pointer', letterSpacing:'0.04em', textTransform:'capitalize',
          }}>{p}</button>
        ))}
      </div>

      {/* Markers */}
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {sortedMarkers.map(m => {
          const isExpanded = expanded === m.id;
          const statusColor = { optimal:'var(--accent)', borderline:'var(--xp-gold)', elevated:'var(--danger)', low:'var(--epic)' }[m.status];
          return (
            <div key={m.id} onClick={() => handleExpand(m.id)} style={{
              background:'var(--surface)', borderRadius:'var(--radius)',
              border:`1px solid ${isExpanded ? statusColor : 'var(--border)'}`,
              overflow:'hidden', cursor:'pointer', transition:'border-color 0.2s',
            }}>
              <div style={{ padding:'14px 16px' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: isExpanded ? 8 : 0 }}>
                  <span style={{ fontSize:14, fontWeight:500 }}>{m.name}</span>
                  <span style={{ fontFamily:'DM Mono, monospace', fontSize:14, fontWeight:500, color:statusColor }}>
                    {m.myValue} <span style={{ fontSize:10, color:'var(--muted)' }}>{m.unit}</span>
                  </span>
                </div>
                <RangeBar marker={m} />
              </div>
              {isExpanded && (
                <div className="anim-fade-in" style={{ padding:'0 16px 16px', borderTop:'1px solid var(--border)' }}>
                  <div style={{ marginTop:12 }}>
                    <div style={{ fontFamily:'DM Mono, monospace', fontSize:9, color:'var(--muted)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6 }}>WHAT IT MEASURES</div>
                    <p style={{ fontSize:13, lineHeight:1.5, color:'var(--muted)' }}>{m.whatItMeasures}</p>
                  </div>
                  <div style={{ marginTop:12, padding:12, background:`${statusColor}11`, borderRadius:10, borderLeft:`3px solid ${statusColor}` }}>
                    <div style={{ fontFamily:'DM Mono, monospace', fontSize:9, color:statusColor, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6 }}>MY CONTEXT</div>
                    <p style={{ fontSize:13, lineHeight:1.6, color:'var(--text)' }}>{m.myContextNote}</p>
                  </div>
                  {m.relatedSupplements.length > 0 && (
                    <div style={{ marginTop:10, display:'flex', flexWrap:'wrap', gap:6 }}>
                      {m.relatedSupplements.map(sid => {
                        const sup = window.HSA.SUPPLEMENTS.find(s => s.id === sid);
                        if (!sup) return null;
                        return <PillTag key={sid} label={`${sup.emoji} ${sup.name}`} color={window.HSA.CATEGORIES[sup.category]?.color} onClick={() => navigate(`/learn?supp=${sid}`)} />;
                      })}
                    </div>
                  )}
                  <div style={{ marginTop:10, fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--muted)', padding:'6px 10px', background:'var(--surface2)', borderRadius:8 }}>
                    💡 {m.mnemonic}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Know Your Numbers CTA */}
      <div style={{ position:'sticky', bottom:80, marginTop:16 }}>
        <button onClick={() => navigate('/quiz?type=my_value')} style={{
          width:'100%', padding:'14px', borderRadius:'var(--radius)',
          background:'var(--accent)', color:'#0e0e0f', border:'none',
          fontFamily:'DM Mono, monospace', fontSize:13, fontWeight:500,
          letterSpacing:'0.06em', cursor:'pointer', boxShadow:'0 4px 20px rgba(200,245,66,0.3)',
        }}>⚡ KNOW YOUR NUMBERS — QUIZ</button>
      </div>
    </div>
  );
}

// ── Quiz Screen ───────────────────────────────────────────────────────────────
function QuizScreen({ progressHook }) {
  const { progress, answerQuestion, update } = progressHook;
  const { combo, multiplier, incrementCombo, resetCombo } = useCombo();
  const { hearts, consumeHeart, heartsEmpty } = useHearts(progress, update);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // Determine quiz set
  const quizIds = useMemo(() => {
    const allQ = window.HSA.QUIZZES;
    if (params.get('daily')) {
      const daily = window.HSA.getDailyChallenge();
      return daily ? [daily.id] : allQ.slice(0,10).map(q=>q.id);
    }
    if (params.get('review')) {
      const now = Date.now();
      const due = progress.reviewQueue.filter(i => i.nextReview <= now).sort((a,b) => a.nextReview - b.nextReview);
      return due.slice(0,10).map(i => i.quizId);
    }
    if (params.get('type')) {
      return allQ.filter(q => q.type === params.get('type')).slice(0,10).map(q=>q.id);
    }
    if (params.get('category')) {
      return allQ.filter(q => q.category === params.get('category')).slice(0,15).map(q=>q.id);
    }
    if (params.get('stack')) {
      const taken = (params.get('names') || '').split(',');
      return allQ.filter(q => taken.some(name => q.question.toLowerCase().includes(name.toLowerCase()))).slice(0,8).map(q=>q.id);
    }
    // Default: random mix
    const shuffled = [...allQ].sort(() => Math.random() - 0.5);
    return shuffled.slice(0,10).map(q=>q.id);
  }, []);

  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [sessionXP, setSessionXP] = useState(0);
  const [results, setResults] = useState([]);
  const [done, setDone] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const quizzes = quizIds.map(id => window.HSA.QUIZZES.find(q => q.id === id)).filter(Boolean);
  const current = quizzes[idx];

  const handleAnswer = useCallback((selectedAnswer) => {
    if (!current || answered !== null) return;
    const correct = selectedAnswer === current.answer;
    const baseXP = current.xpReward || 10;
    const earned = correct ? Math.round(baseXP * multiplier) : 0;
    const isDaily = params.get('daily') === '1';

    if (correct) {
      incrementCombo();
      setSessionXP(x => x + earned);
    } else {
      resetCombo();
      consumeHeart();
    }

    answerQuestion(current.id, correct, earned, current.category);
    if (isDaily && correct) {
      update(p => ({ ...p, dailyChallengeCompletedDate: new Date().toISOString().slice(0,10) }));
    }

    setAnswered(correct ? 'correct' : 'wrong');
    setResults(r => [...r, { correct, earned }]);

    setTimeout(() => {
      if (heartsEmpty && !correct) { setDone(true); return; }
      if (idx + 1 >= quizzes.length) {
        setDone(true);
        const allCorrect = results.concat({correct}).every(r => r.correct);
        if (allCorrect) setShowParticles(true);
      } else {
        setIdx(i => i + 1);
        setAnswered(null);
      }
    }, 1300);
  }, [current, answered, idx, quizzes.length, multiplier, hearts, heartsEmpty, results, answerQuestion, update, incrementCombo, resetCombo, consumeHeart, params]);

  const correctCount = results.filter(r => r.correct).length;
  const pct = results.length ? Math.round((correctCount / results.length) * 100) : 0;

  if (done) {
    return (
      <div style={{ maxWidth:480, margin:'0 auto', padding:'40px 20px 100px', textAlign:'center' }}>
        <ParticleExplosion active={showParticles} />
        <div className="anim-victory" style={{ fontSize:64, marginBottom:16 }}>
          {pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : '📚'}
        </div>
        <div style={{ fontFamily:'DM Mono, monospace', fontSize:13, color:'var(--muted)', marginBottom:8, letterSpacing:'0.06em', textTransform:'uppercase' }}>Session Complete</div>
        <div style={{ fontSize:42, fontWeight:300, color:'var(--accent)', fontFamily:'DM Mono, monospace', marginBottom:4 }}>{pct}%</div>
        <div style={{ fontFamily:'DM Mono, monospace', fontSize:12, color:'var(--muted)', marginBottom:24 }}>{correctCount}/{results.length} correct</div>
        <div style={{ background:'var(--surface)', borderRadius:'var(--radius)', padding:16, border:'1px solid var(--border)', marginBottom:24 }}>
          <div style={{ fontFamily:'DM Mono, monospace', fontSize:12, color:'var(--xp-gold)' }}>+{sessionXP} XP earned</div>
        </div>
        <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
          <button onClick={() => { setIdx(0); setAnswered(null); setResults([]); setDone(false); setSessionXP(0); resetCombo(); }} style={{ padding:'12px 24px', borderRadius:'var(--radius)', background:'var(--accent)', color:'#0e0e0f', border:'none', fontFamily:'DM Mono, monospace', fontSize:12, fontWeight:500, cursor:'pointer' }}>Play Again</button>
          <button onClick={() => navigate('/flashcards')} style={{ padding:'12px 24px', borderRadius:'var(--radius)', background:'var(--surface)', color:'var(--text)', border:'1px solid var(--border)', fontFamily:'DM Mono, monospace', fontSize:12, cursor:'pointer' }}>Flashcards</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth:480, margin:'0 auto', padding:'16px 16px 100px' }}>
      <div style={{ paddingTop:'env(safe-area-inset-top, 16px)', marginBottom:12 }}>
        <QuizProgressBar current={idx} total={quizzes.length} />
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:8 }}>
          <HeartBar hearts={hearts} />
          <span style={{ fontFamily:'DM Mono, monospace', fontSize:11, color:'var(--muted)' }}>{idx+1}/{quizzes.length}</span>
          <span style={{ fontFamily:'DM Mono, monospace', fontSize:11, color:'var(--xp-gold)' }}>+{sessionXP} XP</span>
        </div>
      </div>
      {current && <QuizCard quiz={current} onAnswer={handleAnswer} answered={answered} combo={combo} multiplier={multiplier} hearts={hearts} />}
    </div>
  );
}

// ── Learn Screen ──────────────────────────────────────────────────────────────
function LearnScreen({ progressHook }) {
  const { progress, addXP } = progressHook;
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryFilter = params.get('category');
  const suppFilter = params.get('supp');

  const [view, setView] = useState('list'); // 'list' | 'detail'
  const [selected, setSelected] = useState(null);

  const supplements = window.HSA.SUPPLEMENTS.filter(s => !categoryFilter || s.category === categoryFilter);

  const openSupplement = (sup) => { setSelected(sup); setView('detail'); };
  const handleComplete = () => {
    if (!selected) return;
    addXP(25, selected.category);
    setView('list');
  };

  if (view === 'detail' && selected) {
    const cat = window.HSA.CATEGORIES[selected.category] || {};
    const glowClass = { uncommon:'glow-uncommon', rare:'glow-rare', legendary:'glow-legendary' }[selected.rarity] || '';
    return (
      <div style={{ maxWidth:480, margin:'0 auto', padding:'16px 16px 100px' }}>
        <button onClick={() => setView('list')} style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', fontFamily:'DM Mono, monospace', fontSize:11, marginBottom:16, paddingTop:'env(safe-area-inset-top, 0px)', letterSpacing:'0.04em' }}>← BACK</button>
        <div className={`anim-slide-up ${glowClass}`} style={{ background:'var(--surface)', borderRadius:'var(--radius)', border:'1px solid var(--border)', padding:20, marginBottom:12 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
            <span style={{ fontSize:44 }}>{selected.emoji}</span>
            <div>
              <div style={{ fontSize:20, fontWeight:500 }}>{selected.name}</div>
              <div style={{ display:'flex', gap:6, marginTop:4 }}>
                <PillTag label={cat.label} color={cat.color} />
                <PillTag label={selected.rarity} color={selected.rarity === 'legendary' ? 'var(--xp-gold)' : selected.rarity === 'rare' ? 'var(--rare)' : undefined} />
              </div>
            </div>
          </div>
          <DosageBadge supplement={selected} />
        </div>

        {[
          { title:'What It Is', content: selected.whatItIs },
          { title:'Why I Take It', content: selected.whyITakeIt, accent: true },
          { title:'How It Works', content: selected.mechanism },
          { title:'Expert Notes', content: selected.expertNotes },
          { title:'Key Risks', content: selected.risks, danger: true },
          ...(selected.veganRelevance ? [{ title:'Vegan Relevance 🌱', content: selected.veganRelevance }] : []),
        ].map(section => (
          <div key={section.title} style={{ marginBottom:10, padding:16, background:'var(--surface)', borderRadius:'var(--radius)', border:'1px solid var(--border)', borderLeft: section.accent ? '3px solid var(--accent)' : section.danger ? '3px solid var(--danger)' : '1px solid var(--border)' }}>
            <div style={{ fontFamily:'DM Mono, monospace', fontSize:10, color: section.accent ? 'var(--accent)' : section.danger ? 'var(--danger)' : 'var(--muted)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:8 }}>{section.title}</div>
            <p style={{ fontSize:14, lineHeight:1.7, color:'var(--text)' }}>{section.content}</p>
          </div>
        ))}

        {selected.relatedMarkers.length > 0 && (
          <div style={{ padding:16, background:'var(--surface)', borderRadius:'var(--radius)', border:'1px solid var(--border)', marginBottom:10 }}>
            <div style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--muted)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:8 }}>Related Biomarkers</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {selected.relatedMarkers.map(id => {
                const m = window.HSA.BIOMARKERS.find(b => b.id === id);
                if (!m) return null;
                const sc = { optimal:'var(--accent)', borderline:'var(--xp-gold)', elevated:'var(--danger)', low:'var(--epic)' }[m.status];
                return <PillTag key={id} label={`${m.name}: ${m.myValue} ${m.unit}`} color={sc} onClick={() => navigate('/biomarkers')} />;
              })}
            </div>
          </div>
        )}

        <button onClick={handleComplete} style={{ width:'100%', padding:'14px', borderRadius:'var(--radius)', background:'var(--accent)', color:'#0e0e0f', border:'none', fontFamily:'DM Mono, monospace', fontSize:13, fontWeight:500, letterSpacing:'0.06em', cursor:'pointer', marginTop:8 }}>
          ✓ LESSON COMPLETE (+25 XP) → Test Knowledge
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth:480, margin:'0 auto', padding:'16px 16px 100px' }}>
      <div style={{ paddingTop:'env(safe-area-inset-top, 16px)', marginBottom:16 }}>
        <h1 style={{ fontSize:22, fontWeight:300 }}>Learn</h1>
        <div style={{ fontFamily:'DM Mono, monospace', fontSize:11, color:'var(--muted)', marginTop:4 }}>{supplements.length} supplements {categoryFilter ? `· ${categoryFilter}` : ''}</div>
      </div>

      {/* Category filter pills */}
      <div style={{ display:'flex', gap:6, overflowX:'auto', paddingBottom:4, marginBottom:16, scrollbarWidth:'none' }}>
        <button onClick={() => navigate('/learn')} style={{ flexShrink:0, padding:'7px 14px', borderRadius:'40px', border:`1px solid ${!categoryFilter ? 'var(--accent)' : 'var(--border)'}`, background: !categoryFilter ? 'var(--accent)' : 'transparent', color: !categoryFilter ? '#0e0e0f' : 'var(--muted)', fontFamily:'DM Mono, monospace', fontSize:11, cursor:'pointer' }}>All</button>
        {Object.entries(window.HSA.CATEGORIES).map(([key, cat]) => (
          <button key={key} onClick={() => navigate(`/learn?category=${key}`)} style={{ flexShrink:0, padding:'7px 14px', borderRadius:'40px', border:`1px solid ${categoryFilter === key ? cat.color : 'var(--border)'}`, background: categoryFilter === key ? cat.color + '22' : 'transparent', color: categoryFilter === key ? cat.color : 'var(--muted)', fontFamily:'DM Mono, monospace', fontSize:11, cursor:'pointer' }}>{cat.emoji} {key}</button>
        ))}
      </div>

      {/* Supplement list */}
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {supplements.map(sup => {
          const cat = window.HSA.CATEGORIES[sup.category] || {};
          const glowClass = { uncommon:'glow-uncommon', rare:'glow-rare', legendary:'glow-legendary' }[sup.rarity] || '';
          return (
            <div key={sup.id} className={glowClass} onClick={() => openSupplement(sup)} style={{ padding:16, background:'var(--surface)', borderRadius:'var(--radius)', border:'1px solid var(--border)', cursor:'pointer', display:'flex', alignItems:'center', gap:14, transition:'border-color 0.2s' }}>
              <span style={{ fontSize:32 }}>{sup.emoji}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:500, marginBottom:4 }}>{sup.name}</div>
                <div style={{ display:'flex', gap:6 }}>
                  <PillTag label={sup.dosage} />
                  <PillTag label={sup.rarity} color={sup.rarity === 'legendary' ? 'var(--xp-gold)' : sup.rarity === 'rare' ? 'var(--rare)' : undefined} />
                </div>
              </div>
              <span style={{ color:'var(--muted)', fontSize:18 }}>›</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Flashcards Screen ─────────────────────────────────────────────────────────
function FlashcardsScreen({ progressHook }) {
  const { addXP } = progressHook;
  const [deck, setDeck] = useState(() => [...window.HSA.SUPPLEMENTS].sort(() => Math.random() - 0.5));
  const [known, setKnown] = useState([]);
  const [review, setReview] = useState([]);
  const [done, setDone] = useState(false);

  const current = deck[0];

  const handleSwipe = useCallback((direction, sup) => {
    if (direction === 'right') {
      setKnown(k => [...k, sup]);
      addXP(5, sup.category);
    } else {
      setReview(r => [...r, sup]);
    }
    setDeck(d => {
      const next = d.slice(1);
      if (next.length === 0) setDone(true);
      return next;
    });
  }, [addXP]);

  const reset = () => { setDeck([...window.HSA.SUPPLEMENTS].sort(() => Math.random() - 0.5)); setKnown([]); setReview([]); setDone(false); };

  if (done) {
    return (
      <div style={{ maxWidth:480, margin:'0 auto', padding:'60px 20px 100px', textAlign:'center' }}>
        <div style={{ fontSize:64, marginBottom:16 }}>🃏</div>
        <div style={{ fontFamily:'DM Mono, monospace', fontSize:13, color:'var(--muted)', marginBottom:8 }}>Deck Complete</div>
        <div style={{ display:'flex', gap:16, justifyContent:'center', margin:'20px 0' }}>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:32, color:'var(--accent)', fontFamily:'DM Mono, monospace' }}>{known.length}</div>
            <div style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--muted)' }}>KNOW IT</div>
          </div>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:32, color:'var(--danger)', fontFamily:'DM Mono, monospace' }}>{review.length}</div>
            <div style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--muted)' }}>REVIEW</div>
          </div>
        </div>
        <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
          <button onClick={reset} style={{ padding:'12px 24px', borderRadius:'var(--radius)', background:'var(--accent)', color:'#0e0e0f', border:'none', fontFamily:'DM Mono, monospace', fontSize:12, fontWeight:500, cursor:'pointer' }}>Shuffle & Repeat</button>
          <button onClick={() => { setDeck([...review].sort(() => Math.random() - 0.5)); setKnown([]); setReview([]); setDone(false); }} disabled={!review.length} style={{ padding:'12px 24px', borderRadius:'var(--radius)', background:'var(--surface)', color: review.length ? 'var(--text)' : 'var(--muted)', border:'1px solid var(--border)', fontFamily:'DM Mono, monospace', fontSize:12, cursor: review.length ? 'pointer' : 'not-allowed' }}>Review Again ({review.length})</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth:480, margin:'0 auto', padding:'16px 16px 100px' }}>
      <div style={{ paddingTop:'env(safe-area-inset-top, 16px)', marginBottom:16, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:300 }}>Flashcards</h1>
          <div style={{ fontFamily:'DM Mono, monospace', fontSize:11, color:'var(--muted)', marginTop:4 }}>{deck.length} remaining</div>
        </div>
        <div style={{ display:'flex', gap:12, fontFamily:'DM Mono, monospace', fontSize:11 }}>
          <span style={{ color:'var(--accent)' }}>✓ {known.length}</span>
          <span style={{ color:'var(--danger)' }}>↺ {review.length}</span>
        </div>
      </div>

      {/* Card stack visual */}
      <div style={{ position:'relative', marginBottom:20 }}>
        {deck.slice(1,3).map((s,i) => (
          <div key={s.id} style={{ position:'absolute', top:0, left:0, right:0, transform:`translateY(${(i+1)*8}px) scale(${1 - (i+1)*0.04})`, opacity:1 - (i+1)*0.25, zIndex:-i-1 }}>
            <div style={{ height:280, background:'var(--surface)', borderRadius:'var(--radius)', border:'1px solid var(--border)' }} />
          </div>
        ))}
        {current && <FlashCard supplement={current} onSwipe={handleSwipe} />}
      </div>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 8px' }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
          <span style={{ fontSize:28, color:'var(--danger)' }}>←</span>
          <span style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--danger)' }}>REVIEW</span>
        </div>
        <div style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--muted)' }}>swipe or tap to flip</div>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
          <span style={{ fontSize:28, color:'var(--accent)' }}>→</span>
          <span style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--accent)' }}>KNOW IT</span>
        </div>
      </div>
    </div>
  );
}

// ── Boss Battle Screen ─────────────────────────────────────────────────────────
function BossBattleScreen({ progressHook }) {
  const { progress, defeatBoss, update } = progressHook;
  const { combo, multiplier, incrementCombo, resetCombo } = useCombo();
  const { hearts, consumeHeart, heartsEmpty } = useHearts(progress, update);
  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = location.pathname.split('/').pop();

  const boss = window.HSA.BOSSES.find(b => b.category === categoryId) || window.HSA.BOSSES[0];
  const [phase, setPhase] = useState('entry'); // 'entry' | 'battle' | 'victory' | 'defeat'
  const [hp, setHp] = useState(boss.hp);
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [timerKey, setTimerKey] = useState(0);
  const [showParticles, setShowParticles] = useState(false);
  const [sessionXP, setSessionXP] = useState(0);

  const quizzes = (boss.quizIds || []).map(id => window.HSA.QUIZZES.find(q => q.id === id)).filter(Boolean);
  const current = quizzes[idx];

  const { answerQuestion } = progressHook;

  const handleAnswer = useCallback((selectedAnswer) => {
    if (!current || answered !== null) return;
    const correct = selectedAnswer === current.answer;
    const earned = correct ? Math.round((current.xpReward || 20) * multiplier) : 0;

    if (correct) {
      incrementCombo();
      const newHp = hp - 1;
      setHp(newHp);
      setSessionXP(x => x + earned);
      const newDiagIdx = Math.min(Math.floor((boss.hp - newHp) / (boss.hp / 3)), 2);
      setDialogueIdx(newDiagIdx);
      if (newHp <= 0) {
        setPhase('victory');
        setShowParticles(true);
        defeatBoss(boss.id, boss.badgeId);
        return;
      }
    } else {
      resetCombo();
      consumeHeart();
      if (heartsEmpty) { setPhase('defeat'); return; }
    }

    answerQuestion(current.id, correct, earned, current.category);
    setAnswered(correct ? 'correct' : 'wrong');
    setTimeout(() => {
      setIdx(i => i + 1);
      setAnswered(null);
      setTimerKey(k => k + 1);
    }, 1200);
  }, [current, answered, hp, boss, multiplier, hearts, heartsEmpty, answerQuestion, defeatBoss, incrementCombo, resetCombo, consumeHeart]);

  if (phase === 'entry') return (
    <div style={{ maxWidth:480, margin:'0 auto', padding:'60px 20px', textAlign:'center', background:'#0e0e0f', minHeight:'100dvh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
      <div className="anim-boss-slam" style={{ fontSize:80, marginBottom:16 }}>{boss.emoji}</div>
      <div className="anim-bounce" style={{ fontFamily:'DM Mono, monospace', fontSize:20, color:'var(--danger)', letterSpacing:'0.08em', marginBottom:8 }}>{boss.name}</div>
      <div style={{ fontFamily:'DM Mono, monospace', fontSize:12, color:'var(--muted)', marginBottom:32, maxWidth:280, lineHeight:1.6 }}>{boss.dialogueLines[0]}</div>
      <button onClick={() => setPhase('battle')} className="anim-glow-pulse" style={{ padding:'16px 40px', borderRadius:'var(--radius-pill)', background:'var(--danger)', color:'white', border:'none', fontFamily:'DM Mono, monospace', fontSize:14, fontWeight:500, letterSpacing:'0.08em', cursor:'pointer' }}>BEGIN BATTLE</button>
    </div>
  );

  if (phase === 'victory') return (
    <div style={{ maxWidth:480, margin:'0 auto', padding:'60px 20px 100px', textAlign:'center' }}>
      <ParticleExplosion active={showParticles} />
      <div className="anim-victory" style={{ fontSize:72, marginBottom:16 }}>🏆</div>
      <div style={{ fontFamily:'DM Mono, monospace', fontSize:18, color:'var(--xp-gold)', letterSpacing:'0.08em', marginBottom:12 }}>BOSS DEFEATED!</div>
      <div style={{ fontFamily:'DM Mono, monospace', fontSize:12, color:'var(--muted)', marginBottom:24, maxWidth:280, margin:'0 auto 24px', lineHeight:1.6 }}>{boss.dialogueLines[3]}</div>
      <div className="anim-pop-in" style={{ marginBottom:24 }}>
        {boss.badgeId && (() => { const b = window.HSA.BADGES.find(b => b.id === boss.badgeId); return b ? <BadgeCard badge={b} earned /> : null; })()}
      </div>
      <div style={{ fontFamily:'DM Mono, monospace', fontSize:13, color:'var(--xp-gold)', marginBottom:24 }}>+150 XP + Badge Earned!</div>
      <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
        <button onClick={() => navigate('/')} style={{ padding:'12px 24px', borderRadius:'var(--radius)', background:'var(--accent)', color:'#0e0e0f', border:'none', fontFamily:'DM Mono, monospace', fontSize:12, fontWeight:500, cursor:'pointer' }}>Home</button>
        <button onClick={() => navigate('/progress')} style={{ padding:'12px 24px', borderRadius:'var(--radius)', background:'var(--surface)', color:'var(--text)', border:'1px solid var(--border)', fontFamily:'DM Mono, monospace', fontSize:12, cursor:'pointer' }}>Trophy Room</button>
      </div>
    </div>
  );

  if (phase === 'defeat') return (
    <div style={{ maxWidth:480, margin:'0 auto', padding:'60px 20px 100px', textAlign:'center' }}>
      <div style={{ fontSize:72, marginBottom:16, opacity:0.5 }}>💀</div>
      <div style={{ fontFamily:'DM Mono, monospace', fontSize:18, color:'var(--danger)', letterSpacing:'0.08em', marginBottom:12 }}>DEFEATED</div>
      <div style={{ fontFamily:'DM Mono, monospace', fontSize:12, color:'var(--muted)', marginBottom:24 }}>The boss overpowered your knowledge today. Study and return stronger.</div>
      <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
        <button onClick={() => { setPhase('entry'); setHp(boss.hp); setIdx(0); setAnswered(null); resetCombo(); }} style={{ padding:'12px 24px', borderRadius:'var(--radius)', background:'var(--danger)', color:'white', border:'none', fontFamily:'DM Mono, monospace', fontSize:12, cursor:'pointer' }}>Try Again</button>
        <button onClick={() => navigate('/learn')} style={{ padding:'12px 24px', borderRadius:'var(--radius)', background:'var(--surface)', color:'var(--text)', border:'1px solid var(--border)', fontFamily:'DM Mono, monospace', fontSize:12, cursor:'pointer' }}>Study First</button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth:480, margin:'0 auto', padding:'16px 16px 100px' }}>
      <div style={{ paddingTop:'env(safe-area-inset-top, 16px)', marginBottom:12 }}>
        <BossHealthBar hp={hp} maxHp={boss.hp} />
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:10 }}>
          <HeartBar hearts={hearts} />
          <div style={{ fontFamily:'DM Mono, monospace', fontSize:13, color:'var(--danger)' }}>{boss.emoji} {boss.name}</div>
        </div>
      </div>
      <TimerBar key={timerKey} duration={10} running={answered === null && phase === 'battle'} onExpire={() => handleAnswer('__timeout__')} />
      <div style={{ margin:'12px 0', padding:12, background:'var(--surface2)', borderRadius:'var(--radius)', fontFamily:'DM Mono, monospace', fontSize:11, color:'var(--muted)', fontStyle:'italic', lineHeight:1.5 }}>
        {boss.dialogueLines[Math.min(dialogueIdx, boss.dialogueLines.length - 2)]}
      </div>
      {current && <QuizCard quiz={current} onAnswer={handleAnswer} answered={answered} combo={combo} multiplier={multiplier} hearts={hearts} />}
    </div>
  );
}

// ── Boss Select Screen ─────────────────────────────────────────────────────────
function BossSelectScreen({ progressHook }) {
  const { progress } = progressHook;
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth:480, margin:'0 auto', padding:'16px 16px 100px' }}>
      <div style={{ paddingTop:'env(safe-area-inset-top, 16px)', marginBottom:16 }}>
        <h1 style={{ fontSize:22, fontWeight:300 }}>Boss Battles</h1>
        <div style={{ fontFamily:'DM Mono, monospace', fontSize:11, color:'var(--muted)', marginTop:4 }}>{progress.bossesDefeated.length}/8 defeated</div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {window.HSA.BOSSES.map(boss => {
          const defeated = progress.bossesDefeated.includes(boss.id);
          const cat = window.HSA.CATEGORIES[boss.category] || {};
          return (
            <div key={boss.id} onClick={() => navigate(`/boss/${boss.category}`)} style={{
              padding:16, background:'var(--surface)', borderRadius:'var(--radius)',
              border:`1px solid ${defeated ? 'var(--accent)' : 'var(--border)'}`,
              cursor:'pointer', display:'flex', alignItems:'center', gap:14,
              opacity: defeated ? 0.7 : 1,
            }}>
              <span style={{ fontSize:36 }}>{boss.emoji}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:500 }}>{boss.name}</div>
                <div style={{ fontFamily:'DM Mono, monospace', fontSize:11, color: cat.color, marginTop:4 }}>{cat.label} · 10 Questions · 150 XP</div>
              </div>
              <span style={{ fontSize:20 }}>{defeated ? '✓' : '›'}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Progress Screen ────────────────────────────────────────────────────────────
function ProgressScreen({ progressHook }) {
  const { progress, getRank } = progressHook;
  const rank = getRank(progress.xp);

  // Streak calendar (last 8 weeks)
  const calendarData = useMemo(() => {
    const days = [];
    const history = progress.quizHistory || [];
    const now = new Date();
    for (let i = 55; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const ds = d.toISOString().slice(0,10);
      const dayHistory = history.filter(h => h.date === ds);
      days.push({ date: ds, count: dayHistory.length, xp: dayHistory.reduce((a,h) => a + (h.xp || 0), 0) });
    }
    return days;
  }, [progress.quizHistory]);

  const maxXP = Math.max(1, ...calendarData.map(d => d.xp));

  return (
    <div style={{ maxWidth:480, margin:'0 auto', padding:'16px 16px 100px' }}>
      <div style={{ paddingTop:'env(safe-area-inset-top, 16px)', marginBottom:16 }}>
        <h1 style={{ fontSize:22, fontWeight:300 }}>Progress</h1>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:12 }}>
        {[
          { label:'Total XP', value: progress.xp.toLocaleString() },
          { label:'Streak', value: `${progress.streak}d` },
          { label:'Questions', value: progress.totalQuestionsAnswered },
          { label:'Bosses', value: `${progress.bossesDefeated.length}/8` },
        ].map(stat => (
          <div key={stat.label} style={{ padding:14, background:'var(--surface)', borderRadius:'var(--radius)', border:'1px solid var(--border)', textAlign:'center' }}>
            <div style={{ fontFamily:'DM Mono, monospace', fontSize:20, color:'var(--accent)', fontWeight:500 }}>{stat.value}</div>
            <div style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--muted)', marginTop:4, textTransform:'uppercase', letterSpacing:'0.06em' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Category mastery bars */}
      <div style={{ padding:16, background:'var(--surface)', borderRadius:'var(--radius)', border:'1px solid var(--border)', marginBottom:12 }}>
        <div style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--muted)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:12 }}>Category Mastery</div>
        {Object.entries(window.HSA.CATEGORIES).map(([key, cat]) => {
          const mastery = progress.categoryMastery[key] || 0;
          return (
            <div key={key} style={{ marginBottom:10 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                <span style={{ fontSize:12 }}>{cat.emoji} {cat.label}</span>
                <span style={{ fontFamily:'DM Mono, monospace', fontSize:11, color: cat.color }}>{mastery}%</span>
              </div>
              <div style={{ height:4, background:'var(--surface2)', borderRadius:2 }}>
                <div style={{ height:'100%', width:`${mastery}%`, background: cat.color, borderRadius:2, transition:'width 1s ease' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity calendar */}
      <div style={{ padding:16, background:'var(--surface)', borderRadius:'var(--radius)', border:'1px solid var(--border)', marginBottom:12 }}>
        <div style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--muted)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:12 }}>Activity (8 Weeks)</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(8, 1fr)', gap:3 }}>
          {calendarData.map((d, i) => {
            const intensity = d.xp / maxXP;
            const bg = d.count === 0 ? 'var(--surface2)' : intensity < 0.3 ? 'rgba(200,245,66,0.2)' : intensity < 0.7 ? 'rgba(200,245,66,0.5)' : 'var(--accent)';
            return <div key={i} title={`${d.date}: ${d.xp}XP`} style={{ aspectRatio:'1', borderRadius:3, background:bg }} />;
          })}
        </div>
      </div>

      {/* Badge wall */}
      <div style={{ padding:16, background:'var(--surface)', borderRadius:'var(--radius)', border:'1px solid var(--border)' }}>
        <div style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--muted)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:12 }}>Trophy Room — {progress.badges.length}/{window.HSA.BADGES.length} Earned</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:12 }}>
          {window.HSA.BADGES.map(badge => (
            <BadgeCard key={badge.id} badge={badge} earned={progress.badges.includes(badge.id)} small />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── App Root ──────────────────────────────────────────────────────────────────
function App() {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(
    () => localStorage.getItem('hsa_disclaimer_accepted') === 'true'
  );
  const progressHook = useProgress();

  const handleAccept = () => {
    localStorage.setItem('hsa_disclaimer_accepted', 'true');
    setDisclaimerAccepted(true);
  };

  return (
    <HashRouter>
      {!disclaimerAccepted && <DisclaimerModal onAccept={handleAccept} />}
      <Routes>
        <Route path="/" element={<Dashboard progressHook={progressHook} />} />
        <Route path="/learn" element={<LearnScreen progressHook={progressHook} />} />
        <Route path="/biomarkers" element={<BiomarkersScreen progressHook={progressHook} />} />
        <Route path="/quiz" element={<QuizScreen progressHook={progressHook} />} />
        <Route path="/flashcards" element={<FlashcardsScreen progressHook={progressHook} />} />
        <Route path="/boss" element={<BossSelectScreen progressHook={progressHook} />} />
        <Route path="/boss/:categoryId" element={<BossBattleScreen progressHook={progressHook} />} />
        <Route path="/progress" element={<ProgressScreen progressHook={progressHook} />} />
      </Routes>
      <BottomNav />
    </HashRouter>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
