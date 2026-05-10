// ── Reusable UI Components ────────────────────────────────────────────────────
const { useState, useEffect, useRef, useCallback } = React;

// ── PillTag ───────────────────────────────────────────────────────────────────
function PillTag({ label, color, onClick }) {
  return (
    <span
      onClick={onClick}
      style={{
        display:'inline-flex', alignItems:'center', padding:'4px 12px',
        borderRadius:'40px', fontSize:'12px', fontFamily:'DM Mono, monospace',
        border:`1px solid ${color || 'var(--border)'}`,
        color: color || 'var(--muted)', background: color ? color+'22' : 'transparent',
        cursor: onClick ? 'pointer' : 'default', letterSpacing:'0.03em',
        transition:'all 0.15s',
      }}
    >{label}</span>
  );
}

// ── RankBadge ─────────────────────────────────────────────────────────────────
function RankBadge({ rank, size = 52, pulse = false }) {
  const r = window.HSA.RANKS[rank] || window.HSA.RANKS[0];
  const glowMap = { 0:'none', 1:'0 0 10px rgba(96,165,250,0.4)', 2:'0 0 14px rgba(167,139,250,0.4)', 3:'0 0 16px rgba(200,245,66,0.4)', 4:'0 0 20px rgba(167,139,250,0.5)', 5:'0 0 24px rgba(255,215,0,0.5)', 6:'0 0 28px rgba(255,215,0,0.6), 0 0 56px rgba(255,215,0,0.2)' };
  return (
    <div className={pulse ? 'anim-glow-pulse' : ''} style={{
      width:size, height:size, borderRadius:'50%',
      background:'var(--surface)', border:'2px solid var(--border)',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:size * 0.45, boxShadow:glowMap[rank] || 'none',
      animation: pulse ? undefined : undefined,
    }}>
      {r.icon}
    </div>
  );
}

// ── XPBar ─────────────────────────────────────────────────────────────────────
function XPBar({ xp, getRank, getNextRank }) {
  const rank = getRank(xp);
  const next = getNextRank(xp);
  const pct = next ? ((xp - rank.xpRequired) / (next.xpRequired - rank.xpRequired)) * 100 : 100;
  const [width, setWidth] = useState(0);
  useEffect(() => { setTimeout(() => setWidth(pct), 100); }, [pct]);

  return (
    <div style={{ padding:'12px 16px', background:'var(--surface)', borderRadius:'var(--radius)', border:'1px solid var(--border)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
        <span style={{ fontFamily:'DM Mono, monospace', fontSize:11, color:'var(--accent)', letterSpacing:'0.08em', textTransform:'uppercase' }}>{rank.title}</span>
        <span style={{ fontFamily:'DM Mono, monospace', fontSize:11, color:'var(--muted)' }}>{xp.toLocaleString()} XP{next ? ` / ${next.xpRequired.toLocaleString()}` : ''}</span>
      </div>
      <div style={{ height:6, background:'var(--surface2)', borderRadius:3, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${width}%`, background:'var(--accent)', borderRadius:3, transition:'width 1.2s cubic-bezier(.4,0,.2,1)' }} />
      </div>
      {next && <div style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--muted)', marginTop:4, textAlign:'right' }}>{next.title} in {(next.xpRequired - xp).toLocaleString()} XP</div>}
    </div>
  );
}

// ── MasteryRing ───────────────────────────────────────────────────────────────
function MasteryRing({ value, label, size = 72, color = 'var(--accent)' }) {
  const r = (size / 2) - 6;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);
  useEffect(() => { setTimeout(() => setOffset(circ - (circ * Math.min(value, 100) / 100)), 200); }, [value, circ]);

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
      <div style={{ position:'relative', width:size, height:size }}>
        <svg width={size} height={size} style={{ transform:'rotate(-90deg)' }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--surface2)" strokeWidth={5} />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5}
            strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
            style={{ transition:'stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)' }} />
        </svg>
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'DM Mono, monospace', fontSize:11, color, fontWeight:500 }}>
          {Math.round(value)}%
        </div>
      </div>
      <span style={{ fontSize:10, color:'var(--muted)', fontFamily:'DM Mono, monospace', letterSpacing:'0.05em', textAlign:'center', textTransform:'uppercase' }}>{label}</span>
    </div>
  );
}

// ── HeartBar ──────────────────────────────────────────────────────────────────
function HeartBar({ hearts, max = 3 }) {
  return (
    <div style={{ display:'flex', gap:6 }}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} style={{
          fontSize:20, opacity: i < hearts ? 1 : 0.2,
          transition:'opacity 0.3s, transform 0.3s',
          transform: i < hearts ? 'scale(1)' : 'scale(0.7)',
          display:'inline-block',
        }}>❤️</span>
      ))}
    </div>
  );
}

// ── ComboCounter ──────────────────────────────────────────────────────────────
function ComboCounter({ combo, multiplier }) {
  if (combo < 3) return null;
  const colors = { 1.5:'var(--epic)', 2.0:'var(--rare)', 3.0:'var(--xp-gold)' };
  const color = colors[multiplier] || 'var(--accent)';
  return (
    <div className="anim-combo" style={{
      textAlign:'center', padding:'8px 20px',
      background: color + '22', border:`1px solid ${color}`,
      borderRadius:'var(--radius-pill)', display:'inline-block',
    }}>
      <div style={{ fontFamily:'DM Mono, monospace', fontSize:13, color, fontWeight:500, letterSpacing:'0.06em' }}>
        COMBO ×{combo}!
      </div>
      <div style={{ fontFamily:'DM Mono, monospace', fontSize:10, color, opacity:0.7, marginTop:2 }}>
        {multiplier}× XP MULTIPLIER
      </div>
    </div>
  );
}

// ── XPBurst ───────────────────────────────────────────────────────────────────
function XPBurst({ xp, visible }) {
  if (!visible) return null;
  return (
    <div className="anim-xp-float" style={{
      position:'fixed', left:'50%', top:'40%', transform:'translateX(-50%)',
      fontFamily:'DM Mono, monospace', fontSize:24, fontWeight:500,
      color:'var(--xp-gold)', pointerEvents:'none', zIndex:999,
      textShadow:'0 0 20px rgba(255,215,0,0.6)',
    }}>
      +{xp} XP
    </div>
  );
}

// ── RangeBar ──────────────────────────────────────────────────────────────────
function RangeBar({ marker }) {
  const { myValue, referenceRange: r, unit, status } = marker;
  const [dotPos, setDotPos] = useState(50);

  useEffect(() => {
    const total = r.high - r.low;
    if (total <= 0) return;
    const pct = Math.max(2, Math.min(98, ((myValue - r.low) / total) * 100));
    setTimeout(() => setDotPos(pct), 300);
  }, [myValue, r]);

  const statusColor = { optimal:'var(--accent)', borderline:'var(--xp-gold)', elevated:'var(--danger)', low:'var(--epic)' }[status] || 'var(--muted)';
  const statusLabel = { optimal:'✓ OPTIMAL', borderline:'⚠ BORDERLINE', elevated:'↑ ELEVATED', low:'↓ LOW' }[status] || status;

  return (
    <div style={{ marginTop:8 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
        <span style={{ fontFamily:'DM Mono, monospace', fontSize:20, fontWeight:500, color: statusColor }}>
          {myValue} <span style={{ fontSize:11 }}>{unit}</span>
        </span>
        <span style={{
          fontFamily:'DM Mono, monospace', fontSize:10, color: statusColor,
          padding:'3px 10px', borderRadius:'40px',
          border:`1px solid ${statusColor}`, background: statusColor + '22',
          letterSpacing:'0.06em',
        }}>{statusLabel}</span>
      </div>
      <div style={{ position:'relative', height:8, borderRadius:4, overflow:'visible', background:'linear-gradient(90deg, var(--danger) 0%, var(--xp-gold) 25%, var(--accent) 45%, var(--accent) 55%, var(--xp-gold) 75%, var(--danger) 100%)' }}>
        <div style={{
          position:'absolute', top:'50%', left:`${dotPos}%`,
          transform:'translate(-50%, -50%)',
          width:14, height:14, borderRadius:'50%',
          background:'white', border:`2px solid ${statusColor}`,
          boxShadow:`0 0 8px ${statusColor}`,
          transition:'left 1s cubic-bezier(.4,0,.2,1)',
        }} />
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
        <span style={{ fontFamily:'DM Mono, monospace', fontSize:9, color:'var(--muted)' }}>{r.low}</span>
        <span style={{ fontFamily:'DM Mono, monospace', fontSize:9, color:'var(--muted)' }}>{r.high}</span>
      </div>
    </div>
  );
}

// ── DosageBadge ───────────────────────────────────────────────────────────────
function DosageBadge({ supplement }) {
  return (
    <div style={{ background:'var(--surface2)', borderRadius:'var(--radius)', padding:'8px 12px', display:'inline-block' }}>
      <div style={{ fontFamily:'DM Mono, monospace', fontSize:12, color:'var(--accent)', fontWeight:500 }}>{supplement.dosage}</div>
      <div style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--muted)', marginTop:2 }}>{supplement.dosageNote}</div>
    </div>
  );
}

// ── BadgeCard ─────────────────────────────────────────────────────────────────
function BadgeCard({ badge, earned, small = false }) {
  const rarityGlow = { uncommon:'0 0 12px rgba(96,165,250,0.3)', rare:'0 0 16px rgba(167,139,250,0.4)', legendary:'0 0 24px rgba(255,215,0,0.5), 0 0 48px rgba(255,215,0,0.15)', epic:'0 0 16px rgba(255,107,53,0.4)' };
  const glow = earned ? (rarityGlow[badge.rarity] || 'none') : 'none';
  const size = small ? 44 : 64;

  return (
    <div className={earned ? 'anim-pop-in' : ''} style={{
      display:'flex', flexDirection:'column', alignItems:'center', gap:6,
      opacity: earned ? 1 : 0.25, filter: earned ? 'none' : 'grayscale(1)',
    }}>
      <div style={{
        width:size, height:size, borderRadius:'50%',
        background:'var(--surface)', border:'2px solid var(--border)',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:size * 0.42, boxShadow:glow,
      }}>{badge.emoji}</div>
      {!small && <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:11, fontWeight:500, color: earned ? 'var(--text)' : 'var(--muted)' }}>{badge.name}</div>
        <div style={{ fontSize:10, color:'var(--muted)', fontFamily:'DM Mono, monospace', marginTop:1 }}>{badge.rarity}</div>
      </div>}
    </div>
  );
}

// ── StreakFlame ───────────────────────────────────────────────────────────────
function StreakFlame({ streak }) {
  if (streak < 3) return null;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:4 }}>
      <span className="anim-flame" style={{ fontSize:20, display:'inline-block' }}>🔥</span>
      <span style={{ fontFamily:'DM Mono, monospace', fontSize:12, color:'var(--fire)', fontWeight:500 }}>{streak}</span>
    </div>
  );
}

// ── BossHealthBar ─────────────────────────────────────────────────────────────
function BossHealthBar({ hp, maxHp }) {
  const pct = (hp / maxHp) * 100;
  const color = pct > 60 ? 'var(--danger)' : pct > 30 ? 'var(--xp-gold)' : 'var(--fire)';
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
        <span style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--muted)', letterSpacing:'0.08em', textTransform:'uppercase' }}>Boss HP</span>
        <span style={{ fontFamily:'DM Mono, monospace', fontSize:10, color }}>{'◆'.repeat(hp)}{'◇'.repeat(maxHp - hp)}</span>
      </div>
      <div style={{ height:8, background:'var(--surface2)', borderRadius:4, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${pct}%`, background:color, borderRadius:4, transition:'width 0.6s cubic-bezier(.4,0,.2,1)', boxShadow:`0 0 8px ${color}` }} />
      </div>
    </div>
  );
}

// ── SkillNode ─────────────────────────────────────────────────────────────────
function SkillNode({ level, category, completed, locked, active, onClick }) {
  const cat = window.HSA.CATEGORIES[category] || {};
  const border = completed ? 'var(--accent)' : locked ? 'var(--border)' : 'var(--surface2)';
  const bg = completed ? 'var(--accent-dim)' : 'var(--surface)';
  const glow = completed ? '0 0 12px rgba(200,245,66,0.3)' : 'none';

  return (
    <div onClick={!locked ? onClick : undefined} style={{
      width:52, height:52, borderRadius:'50%', border:`2px solid ${border}`,
      background:bg, display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:20, cursor: locked ? 'not-allowed' : 'pointer',
      opacity: locked ? 0.3 : 1, boxShadow:glow,
      transform: active ? 'scale(1.15)' : 'scale(1)',
      transition:'all 0.2s', position:'relative',
    }}>
      {completed ? '✓' : locked ? '🔒' : cat.emoji || '?'}
      {!locked && !completed && <div style={{
        position:'absolute', top:-4, right:-4, width:16, height:16, borderRadius:'50%',
        background:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:9, fontFamily:'DM Mono, monospace', color:'#0e0e0f', fontWeight:700,
      }}>{level}</div>}
    </div>
  );
}

// ── ParticleExplosion ─────────────────────────────────────────────────────────
function ParticleExplosion({ active }) {
  if (!active) return null;
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    angle: (i / 40) * 360 + (Math.random() * 20 - 10),
    distance: 80 + Math.random() * 120,
    size: 4 + Math.random() * 8,
    delay: Math.random() * 0.3,
    color: i % 3 === 0 ? 'var(--xp-gold)' : i % 3 === 1 ? 'var(--accent)' : 'var(--rare)',
  }));

  return (
    <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:999, display:'flex', alignItems:'center', justifyContent:'center' }}>
      {particles.map(p => {
        const rad = (p.angle * Math.PI) / 180;
        const px = Math.cos(rad) * p.distance;
        const py = Math.sin(rad) * p.distance;
        return (
          <div key={p.id} style={{
            position:'absolute', width:p.size, height:p.size, borderRadius:'50%',
            background:p.color, animation:`particle 1.2s ${p.delay}s ease-out forwards`,
            '--px': `${px}px`, '--py': `${py}px`,
          }} />
        );
      })}
    </div>
  );
}

// ── QuizCard ──────────────────────────────────────────────────────────────────
function QuizCard({ quiz, onAnswer, answered, combo, multiplier, hearts }) {
  const [selected, setSelected] = useState(null);
  const [shake, setShake] = useState(false);
  const [showXP, setShowXP] = useState(false);

  useEffect(() => { setSelected(null); setShake(false); setShowXP(false); }, [quiz?.id]);

  const handleSelect = (opt) => {
    if (answered !== null || selected) return;
    setSelected(opt);
    const correct = opt === quiz.answer;
    if (!correct) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      setShowXP(true);
      setTimeout(() => setShowXP(false), 900);
    }
    onAnswer(opt);
  };

  if (!quiz) return null;

  const diffDots = '●'.repeat(quiz.difficulty) + '○'.repeat(3 - quiz.difficulty);
  const xpEarned = Math.round((quiz.xpReward || 10) * multiplier);

  return (
    <div className="anim-slide-right">
      <XPBurst xp={xpEarned} visible={showXP} />

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <span style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--muted)', letterSpacing:'0.08em', textTransform:'uppercase' }}>{quiz.type?.replace('_',' ')}</span>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {combo >= 3 && <ComboCounter combo={combo} multiplier={multiplier} />}
          <span style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--accent)' }}>{diffDots}</span>
        </div>
      </div>

      {/* Question */}
      <div className={shake ? 'anim-shake' : ''} style={{
        background:'var(--surface)', borderRadius:'var(--radius)', padding:20,
        border:'1px solid var(--border)', marginBottom:16,
      }}>
        <p style={{ fontSize:16, lineHeight:1.5, fontWeight:400 }}>{quiz.question}</p>
        {multiplier > 1 && (
          <div style={{ marginTop:8, fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--xp-gold)' }}>
            +{xpEarned} XP ({multiplier}×)
          </div>
        )}
      </div>

      {/* Options */}
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {(quiz.options || []).map((opt, i) => {
          const isSelected = selected === opt;
          const isCorrect = opt === quiz.answer;
          let bg = 'var(--surface)', border = 'var(--border)', color = 'var(--text)';
          if (selected) {
            if (isCorrect) { bg = 'rgba(200,245,66,0.12)'; border = 'var(--accent)'; color = 'var(--accent)'; }
            else if (isSelected && !isCorrect) { bg = 'rgba(255,68,68,0.12)'; border = 'var(--danger)'; color = 'var(--danger)'; }
            else { bg = 'var(--surface)'; color = 'var(--muted)'; }
          }
          return (
            <button key={i} onClick={() => handleSelect(opt)} style={{
              width:'100%', padding:'14px 16px', borderRadius:'var(--radius)',
              border:`1px solid ${border}`, background:bg, color,
              textAlign:'left', cursor: selected ? 'default' : 'pointer',
              transition:'all 0.2s', fontSize:14, lineHeight:1.4,
              fontFamily:'DM Sans, sans-serif',
              transform: isSelected && isCorrect ? 'scale(1.02)' : 'scale(1)',
            }}>
              <span style={{ fontFamily:'DM Mono, monospace', fontSize:11, opacity:0.5, marginRight:8 }}>{String.fromCharCode(65+i)})</span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {selected && (
        <div className="anim-fade-in" style={{
          marginTop:12, padding:14,
          background: selected === quiz.answer ? 'rgba(200,245,66,0.08)' : 'rgba(255,68,68,0.08)',
          border:`1px solid ${selected === quiz.answer ? 'rgba(200,245,66,0.3)' : 'rgba(255,68,68,0.3)'}`,
          borderRadius:'var(--radius)',
        }}>
          <div style={{ fontFamily:'DM Mono, monospace', fontSize:10, color: selected === quiz.answer ? 'var(--accent)' : 'var(--danger)', marginBottom:6, letterSpacing:'0.06em' }}>
            {selected === quiz.answer ? '✓ CORRECT' : '✗ INCORRECT'}
          </div>
          <p style={{ fontSize:13, color:'var(--text)', lineHeight:1.5 }}>{quiz.explanation}</p>
        </div>
      )}
    </div>
  );
}

// ── FlashCard ─────────────────────────────────────────────────────────────────
function FlashCard({ supplement, onSwipe }) {
  const [flipped, setFlipped] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const startX = useRef(null);

  const rarityGlow = { uncommon:'glow-uncommon', rare:'glow-rare', legendary:'glow-legendary' };
  const glowClass = rarityGlow[supplement.rarity] || '';

  const handlePointerDown = (e) => { startX.current = e.clientX; setDragging(true); };
  const handlePointerMove = (e) => { if (startX.current !== null) setDragX(e.clientX - startX.current); };
  const handlePointerUp = () => {
    if (Math.abs(dragX) > 100) {
      onSwipe(dragX > 0 ? 'right' : 'left', supplement);
    }
    startX.current = null; setDragging(false); setDragX(0);
  };

  const rotation = dragX * 0.05;
  const swipeColor = dragX > 80 ? 'rgba(200,245,66,0.3)' : dragX < -80 ? 'rgba(255,68,68,0.3)' : 'transparent';

  return (
    <div className="flip-card" style={{ width:'100%', height:280, userSelect:'none' }}
      onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}
      onClick={() => !Math.abs(dragX) && setFlipped(f => !f)}>
      <div className={`flip-inner ${flipped ? 'flipped' : ''}`} style={{
        width:'100%', height:'100%', position:'relative',
        transform: `rotateY(${flipped ? 180 : 0}deg) rotate(${rotation}deg) translateX(${dragX * 0.3}px)`,
        transition: dragging ? 'none' : 'transform 0.6s cubic-bezier(.4,0,.2,1)',
      }}>
        {/* Front */}
        <div className={`flip-front ${glowClass}`} style={{
          position:'absolute', inset:0, borderRadius:'var(--radius)',
          background:'var(--surface)', border:'1px solid var(--border)',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          padding:24, background: swipeColor !== 'transparent' ? `linear-gradient(135deg, var(--surface), ${swipeColor})` : 'var(--surface)',
        }}>
          <div style={{ fontSize:52, marginBottom:12 }}>{supplement.emoji}</div>
          <div style={{ fontSize:22, fontWeight:500, marginBottom:4 }}>{supplement.name}</div>
          <PillTag label={supplement.category} color={window.HSA.CATEGORIES[supplement.category]?.color} />
          <div style={{ position:'absolute', bottom:12, fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--muted)' }}>tap to flip</div>
          {dragX > 80 && <div style={{ position:'absolute', top:12, right:12, fontFamily:'DM Mono, monospace', fontSize:11, color:'var(--accent)' }}>✓ KNOW IT</div>}
          {dragX < -80 && <div style={{ position:'absolute', top:12, left:12, fontFamily:'DM Mono, monospace', fontSize:11, color:'var(--danger)' }}>↺ REVIEW</div>}
        </div>
        {/* Back */}
        <div className="flip-back" style={{
          position:'absolute', inset:0, borderRadius:'var(--radius)',
          background:'var(--surface)', border:'1px solid var(--border)', padding:20,
          transform:'rotateY(180deg)',
        }}>
          <DosageBadge supplement={supplement} />
          <p style={{ marginTop:12, fontSize:13, lineHeight:1.6, color:'var(--text)' }}>{supplement.whatItIs}</p>
          <div style={{ marginTop:10, padding:'8px 12px', background:'var(--surface2)', borderRadius:10 }}>
            <div style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--muted)', marginBottom:4 }}>MECHANISM</div>
            <p style={{ fontSize:12, lineHeight:1.5, color:'var(--muted)' }}>{supplement.mechanism.slice(0,120)}...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TimerBar ──────────────────────────────────────────────────────────────────
function TimerBar({ duration = 10, running, onExpire }) {
  const [width, setWidth] = useState(100);
  const [danger, setDanger] = useState(false);
  const startTime = useRef(null);
  const raf = useRef(null);

  useEffect(() => {
    if (!running) { setWidth(100); setDanger(false); return; }
    startTime.current = performance.now();
    const tick = (now) => {
      const elapsed = (now - startTime.current) / 1000;
      const pct = Math.max(0, 100 - (elapsed / duration) * 100);
      setWidth(pct);
      setDanger(pct < 30);
      if (pct <= 0) { if (onExpire) onExpire(); return; }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [running, duration, onExpire]);

  return (
    <div style={{ height:4, background:'var(--surface2)', borderRadius:2, overflow:'hidden' }}>
      <div style={{
        height:'100%', width:`${width}%`, borderRadius:2,
        background: danger ? 'var(--danger)' : 'var(--accent)',
        transition:'background 0.3s', boxShadow: danger ? '0 0 8px var(--danger)' : 'none',
      }} />
    </div>
  );
}

// ── QuizProgressBar ───────────────────────────────────────────────────────────
function QuizProgressBar({ current, total }) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <div style={{ height:3, background:'var(--surface2)', borderRadius:2, overflow:'hidden' }}>
      <div style={{ height:'100%', width:`${pct}%`, background:'var(--accent)', borderRadius:2, transition:'width 0.4s ease' }} />
    </div>
  );
}

// Export all components to window so app.js can access them
window.HSA.components = {
  PillTag, RankBadge, XPBar, MasteryRing, HeartBar, ComboCounter, XPBurst,
  RangeBar, DosageBadge, BadgeCard, StreakFlame, BossHealthBar,
  SkillNode, ParticleExplosion, QuizCard, FlashCard, TimerBar, QuizProgressBar,
};
