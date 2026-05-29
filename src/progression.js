// ── Progression, Ranks, Bosses, Badges ───────────────────────────────────────
window.HSA = window.HSA || {};

window.HSA.RANKS = [
  { rank:0, title:'Initiate',       xpRequired:0,    icon:'⚛',  badge:'atom' },
  { rank:1, title:'Novice',         xpRequired:100,  icon:'🧬', badge:'dna' },
  { rank:2, title:'Practitioner',   xpRequired:300,  icon:'⚡', badge:'lightning' },
  { rank:3, title:'Optimizer',      xpRequired:600,  icon:'🔬', badge:'microscope' },
  { rank:4, title:'Bioscientist',   xpRequired:1200, icon:'🧠', badge:'brain' },
  { rank:5, title:'Longevity Sage', xpRequired:2500, icon:'∞',  badge:'infinity' },
  { rank:6, title:'Stack Master',   xpRequired:5000, icon:'👑', badge:'crown' },
];

window.HSA.XP_REWARDS = {
  lessonComplete: 25,
  quizEasy: 10,
  quizMedium: 20,
  quizHard: 30,
  dailyChallenge: 40,
  bossDefeat: 150,
  perfectSessionMultiplier: 1.5,
  comboX3: 1.5,
  comboX5: 2.0,
  comboX10: 3.0,
};

window.HSA.CATEGORIES = {
  methylation: { label:'Methylation & Longevity', emoji:'🧬', bossName:'The Methylation Wraith',   color:'#A78BFA' },
  training:    { label:'Training & Recovery',     emoji:'💪', bossName:'The Iron Golem',           color:'#60A5FA' },
  liver:       { label:'Liver & Detox',           emoji:'⚗️', bossName:'The Toxic Shade',          color:'#34D399' },
  neuro:       { label:'Neuro & Mood',            emoji:'🧠', bossName:'The Fog Entity',           color:'#818CF8' },
  hormones:    { label:'Hormones & Vitality',     emoji:'🔥', bossName:'The Hormone Tyrant',       color:'#FF6B35' },
  gut:         { label:'Gut & Immunity',          emoji:'🦠', bossName:'The Gut Parasite',         color:'#10B981' },
  hair:        { label:'Hair Protocol',           emoji:'💈', bossName:'The Follicle Phantom',     color:'#F59E0B' },
  vegan:       { label:'Vegan Gaps',              emoji:'🌱', bossName:'The Deficiency Specter',   color:'#84CC16' },
};

window.HSA.BOSSES = [
  {
    id:'boss_methylation', category:'methylation', name:'The Methylation Wraith', emoji:'🧬', hp:10,
    dialogueLines:[
      '"Your homocysteine is 10.2 µmol/L — a crack in your methylation armor. Do you know how to seal it?"',
      '"TMG, B12, P5P... three keys. Name them all, and the SAMe pool stays full. Fail, and the Wraith feeds."',
      '"NMN without TMG is a methylation bomb. You\'re running dry on SAMe — I can feel it."',
      '"The Wraith dissolves... your methylation triad holds. Homocysteine yields to knowledge."',
    ],
    quizIds:['q7','q31','q33','q56','q78','q96','q100','q104','q109','q2'],
    xpReward:150, badgeId:'methylation_master'
  },
  {
    id:'boss_training', category:'training', name:'The Iron Golem', emoji:'🏋️', hp:10,
    dialogueLines:[
      '"Five grams of creatine daily. Vegans start with empty stores — do you know why creatine is different for you?"',
      '"Your eGFR is 62.2. Is that a kidney problem? Or do you know the artifact?"',
      '"The Golem\'s next strike — name the pre-workout that converts to arginine in the kidneys."',
      '"The Golem crumbles under the weight of your knowledge. The iron is yours."',
    ],
    quizIds:['q37','q58','q65','q70','q71','q79','q91','q98','q110','q17'],
    xpReward:150, badgeId:'iron_protocol'
  },
  {
    id:'boss_liver', category:'liver', name:'The Toxic Shade', emoji:'⚗️', hp:10,
    dialogueLines:[
      '"ALT 67. AST 39. The Shade whispers: is your liver failing, or is this training stress? GGT will tell the truth."',
      '"NAC on rest days — why not? The Shade knows you\'re afraid to answer."',
      '"Two hepatoprotective supplements. Name them both or feel the Shade\'s bile."',
      '"The Shade dissolves in the light of understanding. Your liver is protected."',
    ],
    quizIds:['q3','q4','q29','q57','q63','q77','q88','q97','q102','q106'],
    xpReward:150, badgeId:'liver_whisperer'
  },
  {
    id:'boss_neuro', category:'neuro', name:'The Fog Entity', emoji:'🧠', hp:10,
    dialogueLines:[
      '"The Fog rolls in... magnesium at 0.85 — borderline deficiency. Which form do you take, and why at night?"',
      '"Ashwagandha. What axis does it modulate? The Fog thickens with every hesitation."',
      '"Glycine at night — is it a sleep aid or a methyl buffer? The Fog accepts only both answers."',
      '"The Fog clears. Your neuro stack is real — the knowledge was the antidote."',
    ],
    quizIds:['q47','q49','q50','q60','q64','q72','q75','q81','q84','q27'],
    xpReward:150, badgeId:'neuro_scholar'
  },
  {
    id:'boss_hormones', category:'hormones', name:'The Hormone Tyrant', emoji:'🔥', hp:10,
    dialogueLines:[
      '"Total T is 25.9. But the Tyrant knows your free T is only 8.63. Who is the captor?"',
      '"SHBG 53.42 — name my two suppressors or your free testosterone stays chained."',
      '"DHT at 7 ng/dL (LOW) by LC/MS/MS on dutasteride — why is sub-reference range actually ideal for the hair protocol?"',
      '"The Tyrant\'s chains break. Free testosterone rises. You understand the full hormonal picture."',
    ],
    quizIds:['q5','q6','q15','q18','q26','q61','q87','q93','q99','q105'],
    xpReward:150, badgeId:'hormone_master'
  },
  {
    id:'boss_gut', category:'gut', name:'The Gut Parasite', emoji:'🦠', hp:10,
    dialogueLines:[
      '"CRP at 1.0 — borderline inflamed. Name every anti-inflammatory supplement in your stack."',
      '"The Parasite feeds on deficiency. Why is Vitamin C timed at lunch specifically?"',
      '"Oleocanthal from EVOO — the Parasite trembles. What enzyme does it inhibit?"',
      '"The Gut Parasite flees your fortified microbiome. The stack stands."',
    ],
    quizIds:['q21','q55','q66','q74','q85','q90','q108','q113','q119','q30'],
    xpReward:150, badgeId:'gut_guardian'
  },
  {
    id:'boss_hair', category:'hair', name:'The Follicle Phantom', emoji:'💈', hp:10,
    dialogueLines:[
      '"DHT — the Phantom\'s weapon. But dutasteride blocks which enzymes that finasteride cannot?"',
      '"Three mechanisms for hair. Upstream, midstream, downstream — name all three products."',
      '"The Phantom laughs: your minoxidil shed begins in week 4. Will you stop? Or do you know why it happens?"',
      '"The Follicle Phantom vanishes. The three-mechanism protocol stands unchallenged."',
    ],
    quizIds:['q36','q54','q68','q82','q15','q93','q112','q117','q38','q6'],
    xpReward:150, badgeId:'follicle_scholar'
  },
  {
    id:'boss_vegan', category:'vegan', name:'The Deficiency Specter', emoji:'🌱', hp:10,
    dialogueLines:[
      '"Zero B12 in plants. Zero creatine in plants. Zero taurine in plants. The Specter asks: how do you survive?"',
      '"Why does 1000 mcg B12 barely give you what you need? The passive absorption rate — speak it."',
      '"The vegan iron story: UIBC elevated, ferritin fine. Is this a problem or a pattern?"',
      '"The Deficiency Specter fades. Your vegan protocol closes every gap with precision."',
    ],
    quizIds:['q9','q34','q40','q41','q51','q69','q83','q101','q108','q111'],
    xpReward:150, badgeId:'vegan_complete'
  },
];

window.HSA.BADGES = [
  { id:'first_step',        name:'First Step',         emoji:'🏅', description:'Completed your first lesson', rarity:'common',    unlockCondition:'Complete first lesson' },
  { id:'on_a_roll',         name:'On a Roll',          emoji:'⚡', description:'3-day study streak',         rarity:'common',    unlockCondition:'3-day streak' },
  { id:'stack_streak',      name:'Stack Streak',       emoji:'🔥', description:'7-day study streak',         rarity:'uncommon',  unlockCondition:'7-day streak' },
  { id:'obsessed',          name:'Obsessed',           emoji:'💎', description:'30-day study streak',        rarity:'rare',      unlockCondition:'30-day streak' },
  { id:'methylation_master',name:'Methylation Master', emoji:'🧬', description:'Defeated the Methylation Wraith', rarity:'rare', unlockCondition:'Defeat The Methylation Wraith' },
  { id:'iron_protocol',     name:'Iron Protocol',      emoji:'💪', description:'Defeated the Iron Golem',    rarity:'rare',      unlockCondition:'Defeat The Iron Golem' },
  { id:'liver_whisperer',   name:'Liver Whisperer',    emoji:'⚗️', description:'Defeated the Toxic Shade',   rarity:'rare',      unlockCondition:'Defeat The Toxic Shade' },
  { id:'neuro_scholar',     name:'Neuro Scholar',      emoji:'🧠', description:'Defeated the Fog Entity',    rarity:'rare',      unlockCondition:'Defeat The Fog Entity' },
  { id:'hormone_master',    name:'Hormone Master',     emoji:'🔥', description:'Defeated the Hormone Tyrant', rarity:'rare',     unlockCondition:'Defeat The Hormone Tyrant' },
  { id:'gut_guardian',      name:'Gut Guardian',       emoji:'🦠', description:'Defeated the Gut Parasite',  rarity:'rare',      unlockCondition:'Defeat The Gut Parasite' },
  { id:'follicle_scholar',  name:'Follicle Scholar',   emoji:'💈', description:'Defeated the Follicle Phantom', rarity:'rare',   unlockCondition:'Defeat The Follicle Phantom' },
  { id:'vegan_complete',    name:'Vegan Scholar',      emoji:'🌿', description:'Defeated the Deficiency Specter', rarity:'rare', unlockCondition:'Defeat The Deficiency Specter' },
  { id:'boss_slayer',       name:'Boss Slayer',        emoji:'⚔️', description:'Defeated your first boss',   rarity:'uncommon',  unlockCondition:'Defeat any boss' },
  { id:'undefeated',        name:'Undefeated',         emoji:'👑', description:'All 8 bosses defeated',      rarity:'legendary', unlockCondition:'All 8 bosses defeated without losing all hearts' },
  { id:'lab_literate',      name:'Lab Literate',       emoji:'🔬', description:'All biomarker values recalled correctly', rarity:'rare', unlockCondition:'Answer 30 my_value questions correctly' },
  { id:'perfect_recall',    name:'Perfect Recall',     emoji:'🎯', description:'10 perfect quiz sessions',   rarity:'rare',      unlockCondition:'10 perfect sessions' },
  { id:'number_cruncher',   name:'Number Cruncher',    emoji:'📊', description:'Mastered all 52 biomarkers', rarity:'legendary', unlockCondition:'All biomarker quiz questions answered correctly' },
  { id:'precise_dosing',    name:'Precise Dosing',     emoji:'💊', description:'10 dosage questions correct in a row', rarity:'uncommon', unlockCondition:'10 dosage questions in a row correct' },
  { id:'combo_king',        name:'Combo King',         emoji:'🎰', description:'Reached 10× combo in a session', rarity:'rare', unlockCondition:'10× combo in one quiz session' },
  { id:'know_thyself',      name:'Know Thyself',       emoji:'🧘', description:'Read every personalized lab context note', rarity:'uncommon', unlockCondition:'Open all biomarker detail cards' },
  { id:'stack_master_badge',name:'Stack Master',       emoji:'🏆', description:'Reached Rank 6 — Stack Master', rarity:'legendary', unlockCondition:'Reach rank 6 (5000 XP)' },
  { id:'speed_runner',      name:'Speed Runner',       emoji:'⚡', description:'Boss defeated with 10s remaining on every question', rarity:'epic', unlockCondition:'Complete a boss battle with all quick answers' },
  { id:'vegan_warrior',     name:'Vegan Warrior',      emoji:'🌱', description:'Mastered all Vegan Gaps content', rarity:'uncommon', unlockCondition:'100% mastery in Vegan Gaps category' },
  { id:'protocol_clockwork',name:'Protocol Clockwork', emoji:'⏰', description:'All timing/interaction quizzes complete', rarity:'uncommon', unlockCondition:'Complete all dosage_timing questions' },
  { id:'stack_scientist',   name:'Stack Scientist',    emoji:'🧪', description:'Every supplement dose stated correctly', rarity:'rare', unlockCondition:'All dosage questions answered correctly' },
];

// Daily challenge pool — seeded by date
window.HSA.getDailyChallenge = function() {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth()+1) * 100 + today.getDate();
  const idx = seed % window.HSA.QUIZZES.length;
  return window.HSA.QUIZZES[idx];
};
