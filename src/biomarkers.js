// ── Biomarker seed data (52 markers — April 2026 Serbia panel) ────────────────
window.HSA = window.HSA || {};

window.HSA.BIOMARKERS = [
  // ── METABOLIC / GLUCOSE ────────────────────────────────────────────────────
  {
    id: 'glucose', name: 'Glucose', panel: 'glucose', myValue: 5.1, unit: 'mmol/L',
    referenceRange: { low: 3.9, optimal_low: 4.0, optimal_high: 5.5, high: 6.1 },
    status: 'optimal',
    whatItMeasures: 'Fasting blood sugar — how much glucose is circulating in your blood after an overnight fast.',
    whyItMatters: 'Chronic high glucose drives glycation, oxidative stress, and insulin resistance — the root of metabolic disease. Low glucose can indicate over-production of insulin.',
    myContextNote: '5.1 mmol/L is excellent — squarely in the optimal zone. HbA1c at 5.2% confirms this is a stable, long-term picture, not a lucky single reading. The 1.1 HOMA-IR score confirms strong insulin sensitivity.',
    relatedSupplements: ['magnesium', 'vitd', 'creatine'],
    mnemonic: 'FIVE-point-ONE: fine, fine, fine. 5.1 is pristine glucose.',
    xpValue: 15
  },
  {
    id: 'hba1c', name: 'HbA1c', panel: 'glucose', myValue: 5.2, unit: '%',
    referenceRange: { low: 4.0, optimal_low: 4.5, optimal_high: 5.6, high: 6.5 },
    status: 'optimal',
    whatItMeasures: 'Glycated haemoglobin — reflects average blood sugar over the past 2–3 months.',
    whyItMatters: 'Unlike fasting glucose (a snapshot), HbA1c is a movie. Pre-diabetes begins at 5.7%; diabetes at 6.5%.',
    myContextNote: '5.2% is excellent — in the "longevity optimal" zone. Combined with HOMA-IR of 1.1, this confirms strong metabolic health despite a high-supplement, high-training lifestyle.',
    relatedSupplements: ['magnesium', 'vitd', 'creatine'],
    mnemonic: 'HbA1c 5.2 — FIVE-point-TWO, through and through, metabolically true.',
    xpValue: 15
  },
  {
    id: 'insulin', name: 'Insulin', panel: 'glucose', myValue: 4.8, unit: 'µIU/mL',
    referenceRange: { low: 2.6, optimal_low: 3.0, optimal_high: 8.0, high: 24.9 },
    status: 'optimal',
    whatItMeasures: 'Fasting insulin — the pancreatic hormone that shuttles glucose into cells.',
    whyItMatters: 'High fasting insulin signals insulin resistance years before glucose rises. Low insulin with normal glucose = excellent sensitivity.',
    myContextNote: '4.8 µIU/mL is in the low-optimal zone — ideal. HOMA-IR = (glucose × insulin) / 22.5 = (5.1 × 4.8) / 22.5 = 1.1. A HOMA-IR under 2 is the goal. This shows the pancreas isn\'t overworking to manage blood sugar.',
    relatedSupplements: ['magnesium', 'creatine', 'vitd'],
    mnemonic: 'Insulin 4.8 — FOUR-point-EIGHT, insulin working great.',
    xpValue: 15
  },
  {
    id: 'homa_ir', name: 'HOMA-IR', panel: 'glucose', myValue: 1.1, unit: '—',
    referenceRange: { low: 0.5, optimal_low: 0.5, optimal_high: 2.0, high: 2.9 },
    status: 'optimal',
    whatItMeasures: 'Homeostatic Model Assessment of Insulin Resistance — calculated from fasting glucose × fasting insulin.',
    whyItMatters: 'The most clinically useful single measure of insulin sensitivity. Values >2 suggest resistance; >3 indicates significant resistance.',
    myContextNote: '1.1 is excellent. Formula: (5.1 × 4.8) / 22.5 = 1.088. This confirms the body is highly insulin sensitive — glucose clears efficiently with minimal insulin required.',
    relatedSupplements: ['magnesium', 'vitd', 'creatine'],
    mnemonic: 'HOMA-IR 1.1 — ONE-point-ONE, insulin resistance = none.',
    xpValue: 20
  },

  // ── CHOLESTEROL / CARDIOVASCULAR ──────────────────────────────────────────
  {
    id: 'total_chol', name: 'Total Cholesterol', panel: 'metabolic', myValue: 4.79, unit: 'mmol/L',
    referenceRange: { low: 2.5, optimal_low: 3.0, optimal_high: 5.0, high: 5.2 },
    status: 'optimal',
    whatItMeasures: 'Sum of all cholesterol-carrying particles in blood — HDL + LDL + VLDL.',
    whyItMatters: 'Total cholesterol alone is a poor cardiovascular predictor — context (HDL vs LDL vs particle size) matters far more.',
    myContextNote: '4.79 mmol/L is well within range. The full lipid picture is reassuring: low TG (0.78), good HDL (1.61), optimal LDL (2.8). The cardiovascular story here is strong.',
    relatedSupplements: ['fishoil', 'evoo', 'garlic'],
    mnemonic: 'Total chol 4.79 — FOUR-seventy-NINE, cardiovascular fine.',
    xpValue: 10
  },
  {
    id: 'hdl', name: 'HDL', panel: 'metabolic', myValue: 1.61, unit: 'mmol/L',
    referenceRange: { low: 1.0, optimal_low: 1.4, optimal_high: 2.5, high: 3.0 },
    status: 'optimal',
    whatItMeasures: 'High-density lipoprotein — the "reverse cholesterol transport" particle that removes cholesterol from arteries.',
    whyItMatters: 'HDL is cardioprotective. Low HDL (<1.0) is a major cardiovascular risk factor. High HDL reduces arterial plaque accumulation.',
    myContextNote: '1.61 mmol/L — just above the lower optimal boundary (>1.6 ref). The fish oil, EVOO, and exercise all contribute to maintaining this. Worth monitoring — if it dips below 1.6, lifestyle adjustments are warranted.',
    relatedSupplements: ['fishoil', 'evoo', 'vitd'],
    mnemonic: 'HDL 1.61 — ONE-sixty-ONE, just over the optimum line.',
    xpValue: 10
  },
  {
    id: 'ldl', name: 'LDL', panel: 'metabolic', myValue: 2.8, unit: 'mmol/L',
    referenceRange: { low: 0.5, optimal_low: 1.5, optimal_high: 3.0, high: 3.4 },
    status: 'optimal',
    whatItMeasures: 'Low-density lipoprotein — primary cholesterol carrier; elevated levels associate with atherosclerosis.',
    whyItMatters: 'LDL-C is a useful proxy but Apo-B is a better predictor of actual particle risk. LDL particle size (small dense vs large fluffy) matters — large fluffy LDL is less atherogenic.',
    myContextNote: '2.8 mmol/L is optimal. Triglycerides at 0.78 (very low) suggests favourable LDL particle size (high TG drives small dense LDL). Apo-B at 89 mg/dL warrants monitoring despite a good LDL-C number.',
    relatedSupplements: ['fishoil', 'garlic', 'evoo'],
    mnemonic: 'LDL 2.8 — TWO-point-EIGHT, LDL in a great state.',
    xpValue: 10
  },
  {
    id: 'triglycerides', name: 'Triglycerides', panel: 'metabolic', myValue: 0.78, unit: 'mmol/L',
    referenceRange: { low: 0.3, optimal_low: 0.5, optimal_high: 1.1, high: 1.7 },
    status: 'optimal',
    whatItMeasures: 'Blood fats — stored energy; elevated TG signals excess carbs/alcohol, insulin resistance, or poor fat metabolism.',
    whyItMatters: 'High TG (>1.7) is an independent cardiovascular risk factor and drives small dense LDL formation. Low TG suggests efficient fat metabolism and good insulin sensitivity.',
    myContextNote: '0.78 mmol/L is excellent — nearly half the upper limit. This strongly suggests efficient fat oxidation, good insulin sensitivity (confirmed by HOMA-IR 1.1), and the fish oil/EVOO protocol working well.',
    relatedSupplements: ['fishoil', 'evoo', 'vitd'],
    mnemonic: 'TG 0.78 — ZERO-seventy-EIGHT, triglycerides rate great.',
    xpValue: 10
  },
  {
    id: 'apo_b', name: 'Apo B', panel: 'metabolic', myValue: 89, unit: 'mg/dL',
    referenceRange: { low: 49, optimal_low: 49, optimal_high: 80, high: 130 },
    status: 'borderline',
    whatItMeasures: 'Apolipoprotein B — one Apo-B molecule per atherogenic particle (LDL, VLDL, IDL). The best single predictor of cardiovascular particle risk.',
    whyItMatters: 'Each Apo-B is one potentially atherogenic particle. Someone with many small LDL particles can have "normal" LDL-C but high Apo-B. Apo-B > LDL-C in predictive power.',
    myContextNote: '89 mg/dL is within the lab reference (49–173) but above the "optimal" threshold. The cardiometabolic ideal is Apo-B <80 mg/dL. Worth monitoring — fish oil, dietary optimisation, and EVOO are the primary tools.',
    relatedSupplements: ['fishoil', 'evoo', 'garlic'],
    mnemonic: 'Apo-B 89 — EIGHTY-NINE, borderline for the heart\'s design.',
    xpValue: 20
  },
  {
    id: 'apo_a1', name: 'Apo A-I', panel: 'metabolic', myValue: 177.8, unit: 'mg/dL',
    referenceRange: { low: 95, optimal_low: 120, optimal_high: 190, high: 210 },
    status: 'optimal',
    whatItMeasures: 'Apolipoprotein A-I — the main structural protein of HDL particles. Higher = more HDL functionality.',
    whyItMatters: 'Apo A-I reflects HDL functional capacity (reverse cholesterol transport), not just HDL-C mass. Apo-B/Apo A-I ratio is a potent cardiovascular risk predictor.',
    myContextNote: '177.8 mg/dL is strong. Apo-B/Apo A-I ratio = 89/177.8 = 0.50. A ratio <0.7 is associated with lower cardiovascular risk — this is good. Both the HDL function and LDL particle load are in a favourable pattern.',
    relatedSupplements: ['fishoil', 'evoo'],
    mnemonic: 'Apo A-I 177.8 — ONE-seventy-SEVEN, HDL close to heaven.',
    xpValue: 15
  },
  {
    id: 'lpa', name: 'Lp(a)', panel: 'metabolic', myValue: 27.7, unit: 'mg/dL',
    referenceRange: { low: 0, optimal_low: 0, optimal_high: 30, high: 50 },
    status: 'optimal',
    whatItMeasures: 'Lipoprotein(a) — genetically determined atherogenic particle. High Lp(a) is an independent, largely unmodifiable cardiovascular risk factor.',
    whyItMatters: 'Lp(a) is 80–90% genetically determined. High levels (>50 mg/dL or >125 nmol/L) significantly increase risk of heart attack and stroke. Current treatments can barely modify it.',
    myContextNote: '27.7 mg/dL is optimal (ref <30). This is a favourable genetic reading. Lp(a) can\'t be meaningfully reduced by diet or most supplements — this is largely your genetic baseline. Good news: it\'s in the safe zone.',
    relatedSupplements: ['fishoil'],
    mnemonic: 'Lp(a) 27.7 — TWENTY-SEVEN, Lp(a) under the dangerous ceiling.',
    xpValue: 15
  },

  // ── LIVER ─────────────────────────────────────────────────────────────────
  {
    id: 'ast', name: 'AST', panel: 'liver', myValue: 39, unit: 'U/L',
    referenceRange: { low: 5, optimal_low: 10, optimal_high: 34, high: 50 },
    status: 'elevated',
    whatItMeasures: 'Aspartate aminotransferase — liver enzyme released when hepatocytes are stressed or damaged.',
    whyItMatters: 'AST is less liver-specific than ALT (also in muscle). Elevated AST with elevated ALT = hepatocellular pattern. Elevated AST alone can indicate muscle damage.',
    myContextNote: 'AST at 39 U/L is ABOVE the reference (<34). Pattern alongside ALT 67: mild hepatocellular stress. The good news: GGT is normal (26 U/L), bilirubin is normal, CRP is low. This rules out alcohol damage, major fatty liver, and bile obstruction. Most likely: intense training + supplement load + possible Tongkat Ali effect. NAC and TUDCA in the stack are specifically targeting this.',
    relatedSupplements: ['nac', 'tudca', 'taurine'],
    mnemonic: 'AST 39 — THIRTY-NINE, one step over the line. Training + supplements likely culprit.',
    xpValue: 25
  },
  {
    id: 'alt', name: 'ALT', panel: 'liver', myValue: 67, unit: 'U/L',
    referenceRange: { low: 5, optimal_low: 10, optimal_high: 40, high: 56 },
    status: 'elevated',
    whatItMeasures: 'Alanine aminotransferase — the most liver-specific enzyme; primary marker of hepatocellular damage.',
    whyItMatters: 'ALT is the most sensitive indicator of liver cell stress. Elevated ALT with normal GGT and bilirubin = mild hepatocellular stress, not cholestatic damage.',
    myContextNote: 'ALT at 67 U/L is the clearest abnormality in the panel (ref <45). Pattern: hepatocellular (ALT > AST rise). NOT cholestatic (GGT 26 is normal). Likely contributors: intense training, sauna use, supplement load (especially Tongkat Ali + polyphenols). NAC + TUDCA + taurine are the liver protection protocol. Trend monitoring at next bloodwork is key.',
    relatedSupplements: ['nac', 'tudca', 'taurine', 'evoo'],
    mnemonic: 'ALT 67 — SIXTY-SEVEN, liver working but heaven-sent supplements helping.',
    xpValue: 25
  },
  {
    id: 'ggt', name: 'GGT', panel: 'liver', myValue: 26, unit: 'U/L',
    referenceRange: { low: 5, optimal_low: 10, optimal_high: 40, high: 55 },
    status: 'optimal',
    whatItMeasures: 'Gamma-glutamyl transferase — enzyme marking cholestatic liver disease, alcohol use, and oxidative stress.',
    whyItMatters: 'GGT is the key differentiator: elevated GGT = cholestatic pattern or alcohol. Normal GGT with elevated AST/ALT = hepatocellular pattern (muscle, training, supplements — not bile obstruction).',
    myContextNote: '26 U/L is optimal. This is the critical finding that contextualises the elevated AST/ALT. Normal GGT rules out alcohol damage, bile duct obstruction, and fatty liver as primary causes. The liver enzyme elevation pattern is benign in context.',
    relatedSupplements: ['nac', 'tudca'],
    mnemonic: 'GGT 26 — TWENTY-SIX, GGT all fixed. The good news in the liver mix.',
    xpValue: 20
  },
  {
    id: 'alp', name: 'ALP', panel: 'liver', myValue: 78, unit: 'U/L',
    referenceRange: { low: 40, optimal_low: 44, optimal_high: 120, high: 147 },
    status: 'optimal',
    whatItMeasures: 'Alkaline phosphatase — enzyme in liver, bone, and intestine; elevated in cholestatic liver disease and bone disorders.',
    whyItMatters: 'Elevated ALP with elevated GGT = cholestatic liver disease. Elevated ALP alone = bone disease (Paget\'s, bone metastases). Normal ALP + normal GGT confirms the liver pattern is not cholestatic.',
    myContextNote: '78 U/L — optimal. Confirms non-cholestatic pattern alongside normal GGT. Bone turnover is also normal — relevant since Vitamin D and K2 support bone health.',
    relatedSupplements: ['vitd', 'k2'],
    mnemonic: 'ALP 78 — SEVENTY-EIGHT, alkaline phosphatase just fine at this rate.',
    xpValue: 10
  },
  {
    id: 'bilirubin', name: 'Total Bilirubin', panel: 'liver', myValue: 13.4, unit: 'µmol/L',
    referenceRange: { low: 3, optimal_low: 5, optimal_high: 17, high: 21 },
    status: 'optimal',
    whatItMeasures: 'Breakdown product of haemoglobin — elevated in haemolysis, liver disease, or bile duct obstruction.',
    whyItMatters: 'Bilirubin tells you if the liver can conjugate and excrete waste. Normal = liver conjugation is working. Very elevated = jaundice.',
    myContextNote: '13.4 µmol/L is optimal. Normal bilirubin alongside normal GGT confirms the elevated AST/ALT is NOT due to impaired liver excretory function or bile duct issues.',
    relatedSupplements: ['tudca', 'nac'],
    mnemonic: 'Bilirubin 13.4 — THIRTEEN-point-FOUR, no jaundice, not a score to be sore.',
    xpValue: 10
  },
  {
    id: 'albumin', name: 'Albumin', panel: 'liver', myValue: 52, unit: 'g/L',
    referenceRange: { low: 35, optimal_low: 38, optimal_high: 50, high: 53 },
    status: 'elevated',
    whatItMeasures: 'Main protein in blood — made by the liver; reflects liver synthetic function and hydration status.',
    whyItMatters: 'LOW albumin = liver failure, malnutrition, inflammation. HIGH albumin = dehydration, hemoconcentration (blood is more concentrated than normal).',
    myContextNote: 'Albumin at 52 g/L is mildly ABOVE the reference (35–50). This is very likely dehydration/hemoconcentration from sauna use, intense training, and potentially drawing blood in a slightly dehydrated state. High albumin is not dangerous — it just reflects a concentrated blood sample. Not a liver problem (liver problems cause LOW albumin).',
    relatedSupplements: ['protein'],
    mnemonic: 'Albumin 52 — FIFTY-TWO, probably dehydrated when they drew. Rehydrate before next test.',
    xpValue: 20
  },

  // ── KIDNEY ────────────────────────────────────────────────────────────────
  {
    id: 'creatinine', name: 'Creatinine', panel: 'kidney', myValue: 119.9, unit: 'µmol/L',
    referenceRange: { low: 53, optimal_low: 70, optimal_high: 110, high: 114.9 },
    status: 'elevated',
    whatItMeasures: 'Breakdown product of creatine phosphate in muscle — filtered by kidneys. Used to estimate kidney function.',
    whyItMatters: 'High creatinine can mean poor kidney filtration — OR it can be a harmless artifact of high muscle mass and creatine supplementation. Context is everything.',
    myContextNote: 'Creatinine at 119.9 µmol/L is above reference (53–114.9). CRITICAL CONTEXT: creatine supplementation (5 g/day) predictably raises serum creatinine. Creatine → creatinine is a normal metabolic by-product. This is a well-documented lab artifact in athletes on creatine. Also: high muscle mass + intense training + possible pre-draw dehydration (sauna) all contribute. This does NOT indicate true kidney damage.',
    relatedSupplements: ['creatine'],
    mnemonic: 'Creatinine 119.9 — CREATINE is the reason. Artifact, not alarm.',
    xpValue: 25
  },
  {
    id: 'egfr', name: 'eGFR', panel: 'kidney', myValue: 62.2, unit: '—',
    referenceRange: { low: 60, optimal_low: 75, optimal_high: 120, high: 130 },
    status: 'borderline',
    whatItMeasures: 'Estimated glomerular filtration rate — calculated from creatinine; estimates how much blood the kidneys filter per minute.',
    whyItMatters: 'eGFR <60 = CKD stage 3. But the formula uses creatinine — so creatine supplementation artificially lowers calculated eGFR without any true filtration impairment.',
    myContextNote: 'eGFR 62.2 is technically still "normal" (>60) but near the cutoff. The creatinine artifact from creatine supplementation is the most likely explanation. In muscular, creatine-supplementing, heavily training men this consistently over-estimates kidney concern. Stay hydrated, avoid training/sauna immediately before lab draws. Monitor longitudinally.',
    relatedSupplements: ['creatine'],
    mnemonic: 'eGFR 62.2 — SIXTY-TWO, but creatine makes it look worse than true.',
    xpValue: 25
  },
  {
    id: 'urea', name: 'Urea', panel: 'kidney', myValue: 6.4, unit: 'mmol/L',
    referenceRange: { low: 3.2, optimal_low: 4.0, optimal_high: 7.0, high: 7.4 },
    status: 'optimal',
    whatItMeasures: 'End product of protein metabolism — made in liver, excreted by kidneys. Reflects both protein intake and kidney clearance.',
    whyItMatters: 'High urea = high protein intake or impaired kidney excretion. Low urea = malnutrition or liver failure. Normal urea alongside elevated creatinine points toward creatine artifact rather than kidney disease.',
    myContextNote: '6.4 mmol/L is optimal. This is important context for the elevated creatinine: if kidneys were truly failing, urea would also be elevated (azotaemia). Normal urea + borderline creatinine = creatine supplement artifact, not kidney disease.',
    relatedSupplements: ['creatine', 'protein'],
    mnemonic: 'Urea 6.4 — SIX-point-FOUR, kidneys still opening the door.',
    xpValue: 15
  },
  {
    id: 'uric_acid', name: 'Uric Acid', panel: 'kidney', myValue: 326.6, unit: 'µmol/L',
    referenceRange: { low: 150, optimal_low: 200, optimal_high: 380, high: 420 },
    status: 'optimal',
    whatItMeasures: 'Final product of purine metabolism — elevated levels cause gout and correlate with metabolic syndrome.',
    whyItMatters: 'High uric acid (>420 µmol/L) causes gout crystals in joints. Chronic elevation also independently predicts cardiovascular and kidney disease.',
    myContextNote: '326.6 µmol/L is well within optimal. A plant-based diet is generally low in purines (found in animal organ meats, shellfish) — this is a protective benefit of the vegan approach.',
    relatedSupplements: ['vitc'],
    mnemonic: 'Uric acid 326.6 — THREE-twenty-SIX, uric acid in the mix but well fixed.',
    xpValue: 10
  },

  // ── MINERALS ──────────────────────────────────────────────────────────────
  {
    id: 'magnesium_bm', name: 'Magnesium', panel: 'minerals', myValue: 0.85, unit: 'mmol/L',
    referenceRange: { low: 0.66, optimal_low: 0.85, optimal_high: 1.0, high: 1.07 },
    status: 'borderline',
    whatItMeasures: 'Serum magnesium — though only 1% of total body magnesium is in blood, making serum Mg a poor but convenient marker.',
    whyItMatters: 'Magnesium is required for 300+ enzymatic reactions, ATP synthesis, muscle relaxation, and sleep. Deficiency is extremely common and chronically under-diagnosed.',
    myContextNote: '0.85 mmol/L is at the very bottom of the reference range (0.66–1.07). Serum Mg dramatically understates the problem — 99% is intracellular or in bone. This level confirms borderline deficiency. Magnesium Glycinate at 300–400 mg/night is directly targeting this.',
    relatedSupplements: ['magnesium'],
    mnemonic: 'Magnesium 0.85 — ZERO-eighty-FIVE, barely alive. The glycinate at night keeps it alive.',
    xpValue: 20
  },
  {
    id: 'zinc_bm', name: 'Zinc', panel: 'minerals', myValue: 18.3, unit: 'µmol/L',
    referenceRange: { low: 7, optimal_low: 12, optimal_high: 20, high: 23 },
    status: 'borderline',
    whatItMeasures: 'Serum zinc — essential trace mineral for immune function, testosterone synthesis, and 300+ enzyme reactions.',
    whyItMatters: 'Zinc deficiency impairs immunity, testosterone synthesis, wound healing, and DNA repair. Vegans are at high risk due to phytate-bound zinc in plant foods.',
    myContextNote: '18.3 µmol/L is in the lower third of the reference range. Plant zinc bioavailability is 50–70% lower than meat-based zinc due to phytate chelation. Zinc supplementation at 15–30 mg/night is specifically addressing this vegan gap.',
    relatedSupplements: ['zinc'],
    mnemonic: 'Zinc 18.3 — EIGHTEEN-point-THREE, plants steal zinc so supplement for free.',
    xpValue: 15
  },
  {
    id: 'potassium', name: 'Potassium', panel: 'minerals', myValue: 5.2, unit: 'mmol/L',
    referenceRange: { low: 3.5, optimal_low: 3.8, optimal_high: 5.0, high: 5.1 },
    status: 'elevated',
    whatItMeasures: 'The main intracellular electrolyte — critical for heart rhythm, muscle contraction, and nerve signalling.',
    whyItMatters: 'True hyperkalemia (>6.0 mmol/L) is a cardiac emergency. At 5.2, the key question is: real or artifact? Haemolysis during blood draw artificially elevates potassium.',
    myContextNote: 'Potassium at 5.2 mmol/L is barely above the reference (3.5–5.1). The doctor noted this is likely benign — common causes: blood draw hemolysis, dehydration, post-training recovery, high-potassium plant foods. At 5.2 with no cardiac symptoms, this is "watch and repeat" territory, not a clinical problem. Confirm with a repeat draw, well-hydrated, without intense training beforehand.',
    relatedSupplements: ['magnesium'],
    mnemonic: 'Potassium 5.2 — FIVE-point-TWO, barely over — likely hemolysis or dehydration clue.',
    xpValue: 20
  },
  {
    id: 'calcium', name: 'Calcium', panel: 'minerals', myValue: 2.55, unit: 'mmol/L',
    referenceRange: { low: 2.1, optimal_low: 2.2, optimal_high: 2.5, high: 2.55 },
    status: 'borderline',
    whatItMeasures: 'Serum calcium — regulated by PTH, Vitamin D, and calcitonin; essential for bone, muscle, and nerve function.',
    whyItMatters: 'Hypercalcaemia (>2.6) causes kidney stones, calcification, and cardiac arrhythmias. Right at the upper limit is a warning signal, especially with high-dose Vitamin D supplementation.',
    myContextNote: 'Calcium at 2.55 mmol/L is EXACTLY at the upper reference limit (2.1–2.55). This is a key signal: do NOT increase Vitamin D3 dosage (currently 5000 IU). Vitamin D drives calcium absorption — too much D can push calcium higher. K2 in the stack routes calcium to bone rather than arteries. Monitor at next bloodwork.',
    relatedSupplements: ['vitd', 'k2'],
    mnemonic: 'Calcium 2.55 — TWO-fifty-FIVE, right at the limit — don\'t push D3 higher.',
    xpValue: 25
  },

  // ── IRON STATUS ───────────────────────────────────────────────────────────
  {
    id: 'iron', name: 'Iron', panel: 'minerals', myValue: 12.3, unit: 'µmol/L',
    referenceRange: { low: 11.6, optimal_low: 14, optimal_high: 28, high: 31.3 },
    status: 'borderline',
    whatItMeasures: 'Serum iron — circulating iron bound to transferrin; a snapshot of iron transport (not stores).',
    whyItMatters: 'Low serum iron can indicate iron deficiency (especially with low ferritin) or iron sequestration in inflammation. Context: ferritin and TIBC together tell the full story.',
    myContextNote: '12.3 µmol/L is just above the lower limit (11.6) but below optimal. This is expected on a vegan diet — non-heme iron is less bioavailable. Crucially: ferritin at 129.1 ng/mL is solid, meaning STORES are adequate despite lower circulating iron. Vitamin C at lunch helps maximise non-heme iron absorption.',
    relatedSupplements: ['vitc'],
    mnemonic: 'Iron 12.3 — TWELVE-point-THREE, low circulating but ferritin tells the story.',
    xpValue: 15
  },
  {
    id: 'ferritin', name: 'Ferritin', panel: 'minerals', myValue: 129.1, unit: 'ng/mL',
    referenceRange: { low: 30, optimal_low: 50, optimal_high: 300, high: 400 },
    status: 'optimal',
    whatItMeasures: 'The iron storage protein — the most reliable indicator of total body iron stores.',
    whyItMatters: 'Ferritin is the gold standard for iron status. Low ferritin = depleted stores = true iron deficiency. High ferritin = either iron overload OR inflammation (ferritin is also an acute phase reactant).',
    myContextNote: '129.1 ng/mL is solid — comfortably in the optimal range. Despite low serum iron (12.3), good ferritin indicates iron stores are adequate. This pattern (lower serum iron, ok ferritin) is typical on a plant-based diet and doesn\'t require iron supplementation.',
    relatedSupplements: ['vitc'],
    mnemonic: 'Ferritin 129.1 — ONE-twenty-NINE, iron stores doing fine.',
    xpValue: 15
  },
  {
    id: 'transferrin_sat', name: 'Transferrin Saturation', panel: 'minerals', myValue: 20.6, unit: '%',
    referenceRange: { low: 16, optimal_low: 20, optimal_high: 40, high: 45 },
    status: 'optimal',
    whatItMeasures: 'The percentage of transferrin (iron transport protein) that is carrying iron — reflects iron delivery efficiency.',
    whyItMatters: 'Low TSAT (<16%) = iron deficiency. High TSAT (>45%) = iron overload (haemochromatosis risk). 20.6% is at the lower end of optimal.',
    myContextNote: '20.6% is at the lower edge of optimal — consistent with the plant-based diet pattern. Transferrin is carrying iron efficiently, just not at maximum capacity. The fact that ferritin is solid reassures that stores are adequate despite this pattern.',
    relatedSupplements: ['vitc'],
    mnemonic: 'TSAT 20.6% — TWENTY, iron transport holding steady.',
    xpValue: 15
  },
  {
    id: 'uibc', name: 'UIBC', panel: 'minerals', myValue: 47.4, unit: 'µmol/L',
    referenceRange: { low: 12.4, optimal_low: 15, optimal_high: 43, high: 43 },
    status: 'elevated',
    whatItMeasures: 'Unsaturated iron binding capacity — the amount of transferrin NOT carrying iron; reflects iron demand or iron deficit.',
    whyItMatters: 'High UIBC means transferrin has lots of empty binding sites — the body has capacity to carry MORE iron than is available. This suggests relative iron insufficiency or high iron demand.',
    myContextNote: 'UIBC at 47.4 µmol/L is ABOVE the reference (12.4–43). The doctor interpreted this as reflecting lower available iron and higher iron demand — consistent with a vegan diet pattern. However: ferritin is good (129.1) and TSAT is acceptable (20.6%), so this is "watch" rather than "problem". Vitamin C with meals optimises non-heme iron absorption.',
    relatedSupplements: ['vitc'],
    mnemonic: 'UIBC 47.4 — FORTY-SEVEN, transferrin hungry for iron from the vegan heaven.',
    xpValue: 20
  },

  // ── HORMONES ─────────────────────────────────────────────────────────────
  {
    id: 'testosterone', name: 'Testosterone (Total)', panel: 'hormones', myValue: 25.9, unit: 'nmol/L',
    referenceRange: { low: 8.33, optimal_low: 15, optimal_high: 30, high: 30.19 },
    status: 'optimal',
    whatItMeasures: 'Total testosterone — the sum of bound (SHBG-bound, albumin-bound) and free testosterone in circulation.',
    whyItMatters: 'Testosterone drives muscle protein synthesis, libido, mood, cognitive function, and bone density. Total T is the starting point — but free T and SHBG together tell the full story.',
    myContextNote: '25.9 nmol/L is strong — top third of the male reference range. However, SHBG at 53.42 (high-normal) binds a significant fraction, reducing the free T available to tissues. Free T at 8.63 pg/mL confirms mid-range bioavailability. DHT at 483.7 pg/mL remains in range despite dutasteride.',
    relatedSupplements: ['tongkat', 'boron', 'zinc', 'ashwagandha'],
    mnemonic: 'Total T 25.9 — TWENTY-FIVE-point-NINE, testosterone strong and fine.',
    xpValue: 20
  },
  {
    id: 'free_testosterone', name: 'Free Testosterone', panel: 'hormones', myValue: 8.63, unit: 'pg/mL',
    referenceRange: { low: 2.15, optimal_low: 6, optimal_high: 14, high: 16.5 },
    status: 'optimal',
    whatItMeasures: 'The unbound, biologically active fraction of testosterone available to enter cells and exert effects.',
    whyItMatters: 'Free T is what tissues actually "see." Someone with high total T but high SHBG may have functionally lower hormonal drive. Free T is the clinically meaningful number.',
    myContextNote: '8.63 pg/mL is mid-range (ref 2.15–16.5) — decent but not optimal given total T of 25.9. The math: high SHBG (53.42) is binding approximately 96–97% of total T, leaving only ~3–4% free. Tongkat Ali + Boron are specifically targeting SHBG reduction to improve free T bioavailability.',
    relatedSupplements: ['tongkat', 'boron', 'zinc'],
    mnemonic: 'Free T 8.63 — EIGHT-sixty-THREE, SHBG holding it captive — Tongkat sets it free.',
    xpValue: 25
  },
  {
    id: 'shbg', name: 'SHBG', panel: 'hormones', myValue: 53.42, unit: 'nmol/L',
    referenceRange: { low: 18.3, optimal_low: 20, optimal_high: 45, high: 54.1 },
    status: 'borderline',
    whatItMeasures: 'Sex hormone binding globulin — the primary transport protein for testosterone (and estradiol); determines how much T is biologically available.',
    whyItMatters: 'High SHBG binds testosterone, reducing free T. SHBG is elevated by: high-fibre vegan diets, low insulin (which is good for metabolic health but raises SHBG), liver production changes, and genetics.',
    myContextNote: 'SHBG at 53.42 nmol/L is at the very top of reference (18.3–54.1). Vegan diets are specifically associated with higher SHBG — high fibre reduces enterohepatic recirculation of estrogens, but the same mechanism elevates SHBG. Despite total T of 25.9, SHBG is the limiting factor on free T. Tongkat Ali + Boron are the targeted interventions.',
    relatedSupplements: ['tongkat', 'boron'],
    mnemonic: 'SHBG 53.42 — FIFTY-THREE, very high, binding testosterone passionately.',
    xpValue: 25
  },
  {
    id: 'estradiol', name: 'Estradiol', panel: 'hormones', myValue: 20, unit: 'pg/mL',
    referenceRange: { low: 0, optimal_low: 10, optimal_high: 40, high: 56 },
    status: 'optimal',
    whatItMeasures: 'Primary estrogen in men — arises from testosterone aromatisation; important for bone, libido, and mood.',
    whyItMatters: 'Men need estrogen — too low causes poor bone density, low libido, and cognitive issues. Too high causes gynecomastia and reduced T. The T/E2 ratio matters.',
    myContextNote: 'Estradiol <20 pg/mL (reported as <20 — at or below the detection threshold). This is on the lower end but within range. Dutasteride doesn\'t block aromatase, so E2 should be maintained. Worth monitoring — low E2 can impair bone density long-term.',
    relatedSupplements: ['dutasteride', 'zinc'],
    mnemonic: 'Estradiol <20 — LESS THAN TWENTY, low-normal, watching steadily.',
    xpValue: 15
  },
  {
    id: 'dht', name: 'DHT', panel: 'hormones', myValue: 483.7, unit: 'pg/mL',
    referenceRange: { low: 175, optimal_low: 250, optimal_high: 800, high: 913 },
    status: 'optimal',
    whatItMeasures: 'Dihydrotestosterone — the most potent androgen, formed from testosterone by 5-alpha reductase.',
    whyItMatters: 'DHT drives androgenic alopecia (hair loss). Dutasteride blocks 5-alpha reductase to reduce DHT. DHT level on treatment reflects treatment efficacy.',
    myContextNote: 'DHT at 483.7 pg/mL is in the mid-range DESPITE dutasteride (which blocks ~90–95% of 5-AR). This is the "surprisingly good" result the doctor flagged — DHT is being suppressed enough for hair preservation while remaining within the normal range for overall androgenic health. Suggests good baseline endogenous production.',
    relatedSupplements: ['dutasteride'],
    mnemonic: 'DHT 483.7 — FOUR-eighty-THREE, dutasteride working, hair preserved with DHT in range.',
    xpValue: 25
  },
  {
    id: 'lh', name: 'LH', panel: 'hormones', myValue: 6.26, unit: 'mIU/mL',
    referenceRange: { low: 0.57, optimal_low: 1.7, optimal_high: 8.6, high: 12.07 },
    status: 'optimal',
    whatItMeasures: 'Luteinizing hormone — pituitary signal that stimulates testosterone production in the testes.',
    whyItMatters: 'High LH + low T = primary hypogonadism (testes failing). Low LH + low T = secondary/central hypogonadism. Normal LH + good T = HPG axis functioning well.',
    myContextNote: '6.26 mIU/mL is in the mid-range. This is reassuring: LH is appropriately signalling the testes, the testes are responding (total T 25.9), and the HPG axis appears intact. No evidence of pituitary suppression.',
    relatedSupplements: ['tongkat', 'zinc'],
    mnemonic: 'LH 6.26 — SIX-point-TWO, pituitary telling testes what to do.',
    xpValue: 15
  },
  {
    id: 'fsh', name: 'FSH', panel: 'hormones', myValue: 8.25, unit: 'mIU/mL',
    referenceRange: { low: 0.95, optimal_low: 1.5, optimal_high: 10, high: 11.95 },
    status: 'optimal',
    whatItMeasures: 'Follicle stimulating hormone — pituitary signal for sperm production (spermatogenesis).',
    whyItMatters: 'Elevated FSH in men often signals testicular dysfunction or impaired spermatogenesis. Normal FSH = the pituitary-testis axis for sperm production is functioning.',
    myContextNote: '8.25 mIU/mL is in the upper-normal range but still within reference (0.95–11.95). No signal of primary testicular dysfunction. Important in the context of dutasteride use — some 5-AR inhibitors can affect FSH/LH, but levels remain normal here.',
    relatedSupplements: ['zinc'],
    mnemonic: 'FSH 8.25 — EIGHT-point-TWO, sperm signalling going through.',
    xpValue: 15
  },
  {
    id: 'prolactin', name: 'Prolactin', panel: 'hormones', myValue: 245, unit: 'mIU/L',
    referenceRange: { low: 73, optimal_low: 86, optimal_high: 300, high: 407 },
    status: 'optimal',
    whatItMeasures: 'Pituitary hormone that can suppress testosterone when elevated (hyperprolactinaemia).',
    whyItMatters: 'High prolactin (>600 mIU/L) suppresses the HPG axis, reducing LH/FSH and testosterone. Often caused by pituitary adenoma, medication, or chronic stress.',
    myContextNote: '245 mIU/L is comfortably mid-range. No evidence of prolactin-mediated testosterone suppression. This rules out prolactinoma as a cause of the SHBG picture.',
    relatedSupplements: ['zinc', 'ashwagandha'],
    mnemonic: 'Prolactin 245 — TWO-forty-FIVE, prolactin not driving T deprivation.',
    xpValue: 15
  },
  {
    id: 'dhea_s', name: 'DHEA-S', panel: 'hormones', myValue: 187.6, unit: 'µg/dL',
    referenceRange: { low: 44.3, optimal_low: 100, optimal_high: 300, high: 331 },
    status: 'optimal',
    whatItMeasures: 'Dehydroepiandrosterone sulphate — adrenal androgen precursor to testosterone and estrogen.',
    whyItMatters: 'DHEA-S declines with age. Low levels associate with reduced vitality, immunosenescence, and lower anabolic tone. Often used as a broad vitality/adrenal reserve marker.',
    myContextNote: '187.6 µg/dL is solidly mid-range — good adrenal reserve and anabolic precursor pool. No DHEA supplementation in the stack — these levels are endogenously produced.',
    relatedSupplements: ['ashwagandha'],
    mnemonic: 'DHEA-S 187.6 — ONE-eighty-SEVEN, adrenal androgen reserve doing well.',
    xpValue: 15
  },
  {
    id: 'igf1', name: 'IGF-1', panel: 'hormones', myValue: 146.8, unit: 'ng/mL',
    referenceRange: { low: 88.5, optimal_low: 100, optimal_high: 200, high: 216 },
    status: 'optimal',
    whatItMeasures: 'Insulin-like growth factor 1 — mediates growth hormone effects; promotes muscle, bone, and organ growth.',
    whyItMatters: 'Optimal IGF-1 indicates adequate growth hormone axis activity. Very high IGF-1 is associated with increased cancer risk; very low with muscle wasting and poor recovery.',
    myContextNote: '146.8 ng/mL is solid mid-range. Reflects adequate protein intake, training stimulus, and sleep quality. The training + protein shake protocol is maintaining healthy anabolic tone. IGF-1 naturally declines with age — maintaining 146.8 is a good benchmark.',
    relatedSupplements: ['protein', 'creatine'],
    mnemonic: 'IGF-1 146.8 — ONE-forty-SIX, anabolic signal in the mix.',
    xpValue: 15
  },
  {
    id: 'cortisol', name: 'Cortisol (AM)', panel: 'hormones', myValue: 199.8, unit: 'nmol/L',
    referenceRange: { low: 101, optimal_low: 140, optimal_high: 400, high: 536 },
    status: 'optimal',
    whatItMeasures: 'Morning cortisol — the primary stress hormone, highest in the morning (cortisol awakening response).',
    whyItMatters: 'Chronically high cortisol suppresses testosterone, immune function, and sleep. Too low suggests adrenal insufficiency. Morning sampling captures the natural peak.',
    myContextNote: '199.8 nmol/L is mid-range — appropriate for a morning sample. The ashwagandha + magnesium night stack helps buffer the HPA axis. No evidence of hypercortisolism (Cushing\'s) or adrenal insufficiency. Tongkat Ali also has cortisol-modulating properties.',
    relatedSupplements: ['ashwagandha', 'tongkat', 'magnesium'],
    mnemonic: 'Cortisol 199.8 — ONE-ninety-NINE, morning cortisol perfectly aligned.',
    xpValue: 15
  },

  // ── THYROID ───────────────────────────────────────────────────────────────
  {
    id: 'tsh', name: 'hsTSH', panel: 'thyroid', myValue: 2.92, unit: 'µIU/mL',
    referenceRange: { low: 0.35, optimal_low: 0.5, optimal_high: 2.5, high: 4.94 },
    status: 'optimal',
    whatItMeasures: 'Thyroid-stimulating hormone — pituitary signal to the thyroid; the primary thyroid screening test.',
    whyItMatters: 'High TSH = hypothyroidism (thyroid underperforming, pituitary compensating). Low TSH = hyperthyroidism or over-replacement. TSH is the most sensitive thyroid indicator.',
    myContextNote: '2.92 µIU/mL is within range (0.35–4.94) but in the upper-normal zone. Many functional medicine practitioners target TSH <2.0. Iodine adequacy (supplemented at ~150 mcg/day) is important to maintain this. Anti-TPO and Anti-Tg are both very low — no autoimmune thyroid disease.',
    relatedSupplements: ['iodine', 'zinc', 'selenium'],
    mnemonic: 'TSH 2.92 — TWO-point-NINE, thyroid signalling within the line.',
    xpValue: 15
  },
  {
    id: 'free_t3', name: 'Free T3', panel: 'thyroid', myValue: 4.17, unit: 'pmol/L',
    referenceRange: { low: 2.43, optimal_low: 3.5, optimal_high: 5.5, high: 6.01 },
    status: 'optimal',
    whatItMeasures: 'The active form of thyroid hormone — directly regulates metabolism in every cell.',
    whyItMatters: 'Free T3 is the metabolically active thyroid hormone. Even with normal TSH and T4, low T3 indicates poor T4→T3 conversion (often selenium or zinc deficiency).',
    myContextNote: '4.17 pmol/L is solidly mid-range — good conversion of T4 to active T3. Zinc (18.3, supplemented) and adequate iodine support this conversion. No evidence of poor deiodinase activity.',
    relatedSupplements: ['iodine', 'zinc'],
    mnemonic: 'Free T3 4.17 — FOUR-point-ONE, thyroid active hormone done right.',
    xpValue: 15
  },
  {
    id: 'free_t4', name: 'Free T4', panel: 'thyroid', myValue: 14.6, unit: 'pmol/L',
    referenceRange: { low: 9.01, optimal_low: 11, optimal_high: 18, high: 19.05 },
    status: 'optimal',
    whatItMeasures: 'The storage/transport form of thyroid hormone — converted to active T3 in peripheral tissues.',
    whyItMatters: 'Free T4 reflects thyroid gland output. Low T4 + high TSH = primary hypothyroidism. Normal T4 + normal TSH = thyroid gland functioning appropriately.',
    myContextNote: '14.6 pmol/L is mid-range. The T4→T3 conversion is working well (Free T3 is 4.17). Thyroid axis is functioning normally across all three markers.',
    relatedSupplements: ['iodine'],
    mnemonic: 'Free T4 14.6 — FOURTEEN-sixty, thyroid gland doing its bidding.',
    xpValue: 10
  },
  {
    id: 'anti_tpo', name: 'Anti-TPO', panel: 'thyroid', myValue: 0.24, unit: 'IU/mL',
    referenceRange: { low: 0, optimal_low: 0, optimal_high: 3.0, high: 5.61 },
    status: 'optimal',
    whatItMeasures: 'Antibodies against thyroid peroxidase — the primary marker of Hashimoto\'s thyroiditis (autoimmune hypothyroidism).',
    whyItMatters: 'Positive Anti-TPO = thyroid autoimmunity, predicting future hypothyroidism. Negative = no active thyroid autoimmune process.',
    myContextNote: '0.24 IU/mL is essentially undetectable (ref <5.61). Thyroid autoimmunity is absent. This is reassuring given iodine supplementation — excess iodine can trigger thyroiditis in susceptible individuals, but the antibody picture is clean here.',
    relatedSupplements: ['iodine'],
    mnemonic: 'Anti-TPO 0.24 — ZERO-twenty-FOUR, thyroid immune system at peace, not at war.',
    xpValue: 15
  },
  {
    id: 'anti_tg', name: 'Anti-Tg', panel: 'thyroid', myValue: 2.76, unit: 'IU/mL',
    referenceRange: { low: 0, optimal_low: 0, optimal_high: 3.0, high: 4.11 },
    status: 'optimal',
    whatItMeasures: 'Antibodies against thyroglobulin — secondary marker of autoimmune thyroid disease (Hashimoto\'s or Graves\').',
    whyItMatters: 'Elevated Anti-Tg with elevated Anti-TPO = higher certainty of Hashimoto\'s. Anti-Tg alone is less specific. Both negative = thyroid autoimmunity unlikely.',
    myContextNote: '2.76 IU/mL is within range (ref <4.11) — low and not clinically significant. Together with Anti-TPO of 0.24, this confirms no thyroid autoimmune disease. Thyroid antibodies are the "surprisingly good" result the doctor flagged.',
    relatedSupplements: ['iodine'],
    mnemonic: 'Anti-Tg 2.76 — TWO-seventy-SIX, thyroid antibodies not in the mix.',
    xpValue: 15
  },

  // ── INFLAMMATION / OTHER ──────────────────────────────────────────────────
  {
    id: 'crp', name: 'CRP', panel: 'inflammation', myValue: 1.0, unit: 'mg/L',
    referenceRange: { low: 0, optimal_low: 0, optimal_high: 0.8, high: 5.0 },
    status: 'borderline',
    whatItMeasures: 'C-reactive protein — a non-specific liver-produced inflammatory marker that rises with acute and chronic inflammation.',
    whyItMatters: 'CRP >1.0 mg/L is associated with elevated cardiovascular risk. Chronic sub-clinical inflammation accelerates atherosclerosis, cancer risk, and ageing. The anti-inflammatory stack targets this directly.',
    myContextNote: '1.0 mg/L is right at the borderline (optimal <0.8). This is good context for why fish oil, ginger, garlic, fisetin, and EVOO are in the stack — each targeting a different inflammatory pathway. Combined CRP was likely higher before the anti-inflammatory protocol.',
    relatedSupplements: ['fishoil', 'ginger', 'garlic', 'fisetin', 'evoo', 'vitc'],
    mnemonic: 'CRP 1.0 — ONE-point-ZERO, borderline inflammation — supplement stack is the hero.',
    xpValue: 20
  },
  {
    id: 'homocysteine', name: 'Homocysteine', panel: 'inflammation', myValue: 10.2, unit: 'µmol/L',
    referenceRange: { low: 4, optimal_low: 5, optimal_high: 9, high: 15 },
    status: 'borderline',
    whatItMeasures: 'Amino acid produced in the methylation cycle — elevated levels damage blood vessel walls and predict cardiovascular and cognitive disease.',
    whyItMatters: 'Every 5 µmol/L rise in homocysteine increases cardiovascular disease risk ~20%. Elevated levels are a modifiable risk factor — directly targeted by the B vitamin/methylation protocol.',
    myContextNote: '10.2 µmol/L is borderline high (optimal <9). This is the direct target of the methylation triad: TMG (BHMT pathway) + B12 (methionine synthase pathway) + P5P (transsulfuration pathway). All three are in the stack precisely because of this result.',
    relatedSupplements: ['tmg', 'b12', 'p5p', 'folate'],
    mnemonic: 'Homocysteine 10.2 — TEN-point-TWO, TMG + B12 + P5P coming through.',
    xpValue: 25
  },
  {
    id: 'fibrinogen', name: 'Fibrinogen', panel: 'inflammation', myValue: 3.4, unit: 'g/L',
    referenceRange: { low: 2.0, optimal_low: 2.0, optimal_high: 3.5, high: 4.0 },
    status: 'optimal',
    whatItMeasures: 'Blood clotting protein — also an inflammatory marker; elevated in chronic inflammation and cardiovascular risk.',
    whyItMatters: 'High fibrinogen increases blood viscosity and clot risk. Like CRP, fibrinogen is both a clotting factor and an acute phase reactant — rises with inflammation.',
    myContextNote: '3.4 g/L is within range (2.0–4.0) — upper-normal but acceptable. Fish oil has mild fibrinogen-reducing effects. The anti-inflammatory stack helps keep this in range.',
    relatedSupplements: ['fishoil', 'garlic'],
    mnemonic: 'Fibrinogen 3.4 — THREE-point-FOUR, clotting factor not out to score.',
    xpValue: 15
  },

  // ── VITAMINS ──────────────────────────────────────────────────────────────
  {
    id: 'vitd_bm', name: 'Vitamin D', panel: 'vitamins', myValue: 136.4, unit: 'nmol/L',
    referenceRange: { low: 50, optimal_low: 75, optimal_high: 150, high: 200 },
    status: 'optimal',
    whatItMeasures: '25-OH Vitamin D — the storage form; the standard test for Vitamin D status.',
    whyItMatters: 'Deficiency (<50 nmol/L) increases risk of bone disease, immune dysfunction, depression, and cardiovascular disease. Most vegans without supplementation land in deficiency.',
    myContextNote: '136.4 nmol/L is optimal — near the upper range (ref 50–150). 5000 IU/day is achieving this. Important: do NOT increase dose further. Calcium at 2.55 (at upper limit) reinforces this — Vitamin D drives calcium absorption, which is already at ceiling.',
    relatedSupplements: ['vitd', 'k2'],
    mnemonic: 'Vit D 136.4 — ONE-thirty-SIX, sun in a capsule doing its tricks. Don\'t go higher.',
    xpValue: 15
  },
  {
    id: 'b12_bm', name: 'B12', panel: 'vitamins', myValue: 530.7, unit: 'pg/mL',
    referenceRange: { low: 197, optimal_low: 300, optimal_high: 700, high: 771 },
    status: 'optimal',
    whatItMeasures: 'Serum cobalamin — the most commonly tested B12 form (functional deficiency can occur even with "normal" serum levels).',
    whyItMatters: 'B12 deficiency causes irreversible nerve damage and megaloblastic anaemia. For vegans, supplementation is non-negotiable — there is no reliable plant source.',
    myContextNote: '530.7 pg/mL is maintained by ~1000 mcg/day supplementation. Without it, this would be in deficiency territory within months on a vegan diet. The high dose is necessary because B12 absorption via intrinsic factor is capped at ~1.5 mcg — the rest requires passive diffusion at 1% efficiency.',
    relatedSupplements: ['b12'],
    mnemonic: 'B12 530.7 — FIVE-thirty, maintained by daily supplementation — zero in plants.',
    xpValue: 20
  },
  {
    id: 'folate', name: 'Folate', panel: 'vitamins', myValue: 10.7, unit: 'ng/mL',
    referenceRange: { low: 4.6, optimal_low: 7, optimal_high: 16, high: 18.7 },
    status: 'optimal',
    whatItMeasures: 'Serum folate (B9) — essential for DNA synthesis, cell division, and the methylation cycle.',
    whyItMatters: 'Deficiency causes megaloblastic anaemia and neural tube defects. Adequate folate works with B12 in the methionine synthase pathway to clear homocysteine.',
    myContextNote: '10.7 ng/mL is optimal — reflecting good dietary folate from green vegetables, legumes, and other plant foods. Folate is a genuine nutritional strength of the vegan diet. Works synergistically with B12 and TMG to drive homocysteine down from 10.2.',
    relatedSupplements: ['b12', 'tmg', 'p5p'],
    mnemonic: 'Folate 10.7 — TEN-point-SEVEN, folate from plants sent from heaven.',
    xpValue: 15
  }
];
