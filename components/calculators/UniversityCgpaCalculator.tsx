'use client';

import React, { useState, useMemo } from 'react';
import { GraduationCap, Plus, Trash2, Copy, Check, Award, Target } from 'lucide-react';

export type UniversitySystem = 'tu_ioe' | 'tu_semester' | 'ku' | 'pokhara' | 'purbanchal';

interface SemesterRow {
  id: string;
  name: string;
  credits: number;
  gpa: number;
}

const UNIVERSITY_CONFIGS: Record<
  UniversitySystem,
  {
    name: string;
    nepaliName: string;
    maxScale: number;
    toPercentageFormula: string;
    convertToPercentage: (cgpa: number) => number;
    passCgpa: number;
    distinctionCgpa: number;
  }
> = {
  tu_ioe: {
    name: 'Tribhuvan University — IOE / Engineering / CSIT',
    nepaliName: 'त्रिभुवन विश्वविद्यालय (IOE / इन्जिनियरिङ)',
    maxScale: 4.0,
    toPercentageFormula: 'Percentage = (CGPA / 4.0) × 100 (or TU Dean Office conversion)',
    convertToPercentage: (cgpa) => Math.min(100, (cgpa / 4.0) * 100),
    passCgpa: 2.0,
    distinctionCgpa: 3.6,
  },
  tu_semester: {
    name: 'TU FoM — BBA / BIM / BBM / BCA / MBS',
    nepaliName: 'त्रि.वि. व्यवस्थापन संकाय (BBA / BIM / BCA)',
    maxScale: 4.0,
    toPercentageFormula: 'Percentage = CGPA × 25 (TU Faculty of Management 4.0 Scale)',
    convertToPercentage: (cgpa) => Math.min(100, cgpa * 25),
    passCgpa: 2.0,
    distinctionCgpa: 3.7,
  },
  ku: {
    name: 'Kathmandu University (KU — Engineering / Science / Mgmt)',
    nepaliName: 'काठमाडौँ विश्वविद्यालय (KU)',
    maxScale: 4.0,
    toPercentageFormula: 'Percentage = (CGPA / 4.0) × 100 (KU 4.0 Grading System)',
    convertToPercentage: (cgpa) => Math.min(100, (cgpa / 4.0) * 100),
    passCgpa: 2.0,
    distinctionCgpa: 3.5,
  },
  pokhara: {
    name: 'Pokhara University (PU — BE / BBA / BCIS)',
    nepaliName: 'पोखरा विश्वविद्यालय (Pokhara University)',
    maxScale: 4.0,
    toPercentageFormula: 'Percentage = (CGPA - 0.5) × 25 (or Direct 4.0 Scale Equivalence)',
    convertToPercentage: (cgpa) => Math.min(100, Math.max(0, cgpa * 25)),
    passCgpa: 2.0,
    distinctionCgpa: 3.6,
  },
  purbanchal: {
    name: 'Purbanchal University (PoU — BE / BIT / BBA)',
    nepaliName: 'पूर्वाञ्चल विश्वविद्यालय (Purbanchal University)',
    maxScale: 4.0,
    toPercentageFormula: 'Percentage = CGPA × 25',
    convertToPercentage: (cgpa) => Math.min(100, cgpa * 25),
    passCgpa: 2.0,
    distinctionCgpa: 3.6,
  },
};

export function UniversityCgpaCalculator() {
  const [uni, setUni] = useState<UniversitySystem>('tu_ioe');
  const [semesters, setSemesters] = useState<SemesterRow[]>([
    { id: '1', name: '1st Semester', credits: 20, gpa: 3.45 },
    { id: '2', name: '2nd Semester', credits: 21, gpa: 3.62 },
    { id: '3', name: '3rd Semester', credits: 22, gpa: 3.55 },
    { id: '4', name: '4th Semester', credits: 21, gpa: 3.70 },
  ]);

  // Target CGPA Predictor State
  const [totalProgramSemesters, setTotalProgramSemesters] = useState<number>(8);
  const [targetFinalCgpa, setTargetFinalCgpa] = useState<number>(3.65);
  const [copied, setCopied] = useState<boolean>(false);

  const uniConfig = UNIVERSITY_CONFIGS[uni];

  const addSemester = () => {
    const nextNum = semesters.length + 1;
    setSemesters((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: `${nextNum}${nextNum === 1 ? 'st' : nextNum === 2 ? 'nd' : nextNum === 3 ? 'rd' : 'th'} Semester`,
        credits: 20,
        gpa: 3.5,
      },
    ]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length <= 1) return;
    setSemesters((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSemester = (id: string, field: keyof SemesterRow, val: string | number) => {
    setSemesters((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: field === 'name' ? String(val) : parseFloat(String(val)) || 0 } : s))
    );
  };

  const calculation = useMemo(() => {
    let totalCredits = 0;
    let weightedGradePoints = 0;

    semesters.forEach((s) => {
      const c = Math.max(0, s.credits);
      const g = Math.min(4.0, Math.max(0, s.gpa));
      totalCredits += c;
      weightedGradePoints += c * g;
    });

    const cgpa = totalCredits > 0 ? weightedGradePoints / totalCredits : 0;
    const percentage = uniConfig.convertToPercentage(cgpa);

    let divisionLabel = 'Pass / Second Division';
    if (cgpa >= uniConfig.distinctionCgpa) divisionLabel = 'Distinction / Dean’s List (विशिष्ट श्रेणी)';
    else if (cgpa >= 3.0) divisionLabel = 'First Division with Honours (प्रथम श्रेणी)';
    else if (cgpa < uniConfig.passCgpa) divisionLabel = 'Below Minimum Passing CGPA (< 2.00)';

    // Target CGPA Predictor Math
    const completedSemCount = semesters.length;
    const remainingSemCount = Math.max(0, totalProgramSemesters - completedSemCount);
    const avgCreditsPerSem = completedSemCount > 0 ? totalCredits / completedSemCount : 20;
    const remainingCredits = remainingSemCount * avgCreditsPerSem;
    const totalExpectedCredits = totalCredits + remainingCredits;

    const requiredTotalPoints = targetFinalCgpa * totalExpectedCredits;
    const neededPoints = requiredTotalPoints - weightedGradePoints;
    const requiredFutureGpa = remainingCredits > 0 ? neededPoints / remainingCredits : cgpa;
    const isTargetAchievable = requiredFutureGpa <= 4.0 && requiredFutureGpa >= 0;

    return {
      totalCredits,
      weightedGradePoints,
      cgpa,
      percentage,
      divisionLabel,
      completedSemCount,
      remainingSemCount,
      requiredFutureGpa,
      isTargetAchievable,
    };
  }, [semesters, uniConfig, totalProgramSemesters, targetFinalCgpa]);

  const handleCopy = () => {
    const text = `${uniConfig.name} — CGPA Result:
Completed Semesters: ${calculation.completedSemCount} (${calculation.totalCredits} Credits)
Cumulative GPA (CGPA): ${calculation.cgpa.toFixed(2)} / 4.00
Equivalent Percentage: ${calculation.percentage.toFixed(2)}%
Division: ${calculation.divisionLabel}
Calculated on NepalCalc.com/cgpa`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 32px)', maxWidth: '1040px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          marginBottom: '24px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: '#e0e7ff',
              color: '#4f46e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <GraduationCap size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-blue">TU • KU • Pokhara • Purbanchal</span>
              <span className="badge badge-neutral">Semester CGPA & Target Grade</span>
            </div>
            <h2 style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800, margin: '6px 0 0', color: 'var(--text-primary)' }}>
              University CGPA, Engineering GPA & Target Marks Calculator
            </h2>
          </div>
        </div>

        <button type="button" onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy CGPA'}</span>
        </button>
      </div>

      {/* University Selector */}
      <div style={{ marginBottom: '22px' }}>
        <label htmlFor="uni-select" className="input-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13.5px' }}>
          Select Your University Grading System (विश्वविद्यालय छान्नुहोस्):
        </label>
        <select
          id="uni-select"
          value={uni}
          onChange={(e) => setUni(e.target.value as UniversitySystem)}
          className="text-input"
          style={{ width: '100%', padding: '10px 12px', fontSize: '14px', fontWeight: 700 }}
        >
          {(Object.keys(UNIVERSITY_CONFIGS) as UniversitySystem[]).map((k) => (
            <option key={k} value={k}>
              {UNIVERSITY_CONFIGS[k].name} ({UNIVERSITY_CONFIGS[k].nepaliName})
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
        {/* Left: Semester Inputs */}
        <div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
            Enter Semester Credit Hours & SGPA (सेमेस्टर विवरण)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
            {semesters.map((sem) => (
              <div
                key={sem.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.3fr 1fr 1fr auto',
                  gap: '8px',
                  alignItems: 'center',
                  padding: '10px 12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <input
                  type="text"
                  value={sem.name}
                  onChange={(e) => updateSemester(sem.id, 'name', e.target.value)}
                  className="text-input"
                  style={{ padding: '7px 8px', fontSize: '12.5px', fontWeight: 700 }}
                />
                <div>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    step="0.5"
                    value={sem.credits}
                    onChange={(e) => updateSemester(sem.id, 'credits', e.target.value)}
                    className="text-input"
                    placeholder="Credits"
                    style={{ width: '100%', padding: '7px 8px', fontSize: '13px', fontWeight: 700 }}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    min={0}
                    max={4.0}
                    step="0.01"
                    value={sem.gpa}
                    onChange={(e) => updateSemester(sem.id, 'gpa', e.target.value)}
                    className="text-input"
                    placeholder="SGPA"
                    style={{ width: '100%', padding: '7px 8px', fontSize: '13px', fontWeight: 700 }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeSemester(sem.id)}
                  disabled={semesters.length <= 1}
                  aria-label="Remove semester"
                  style={{
                    padding: '7px',
                    borderRadius: '8px',
                    border: '1px solid #fecaca',
                    backgroundColor: '#fef2f2',
                    color: '#dc2626',
                    cursor: semesters.length <= 1 ? 'not-allowed' : 'pointer',
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addSemester}
            className="btn-secondary"
            style={{ fontSize: '12.5px', padding: '8px 14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={15} /> Add Next Semester
          </button>
        </div>

        {/* Right: CGPA Result & Target GPA Predictor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              padding: '22px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #312e81 0%, #4338ca 100%)',
              color: '#ffffff',
            }}
          >
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#c7d2fe', fontWeight: 700 }}>
              Cumulative Grade Point Average (CGPA)
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginTop: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 'clamp(30px, 4.5vw, 40px)', fontWeight: 900, color: '#fbbf24' }}>
                {calculation.cgpa.toFixed(2)} / 4.00
              </span>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#38bdf8' }}>
                ({calculation.percentage.toFixed(2)}%)
              </span>
            </div>
            <div style={{ fontSize: '13px', color: '#e0e7ff', marginTop: '6px', fontWeight: 600 }}>
              {calculation.divisionLabel} • Total Credits: {calculation.totalCredits}
            </div>
          </div>

          {/* Target CGPA Predictor Box */}
          <div style={{ padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
              <Target size={18} color="#4f46e5" />
              <span>Graduation Target CGPA Predictor (लक्ष्य GPA हिसाब)</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Total Degree Semesters
                </label>
                <select
                  value={totalProgramSemesters}
                  onChange={(e) => setTotalProgramSemesters(Number(e.target.value))}
                  className="text-input"
                  style={{ width: '100%', padding: '8px', fontSize: '13px', fontWeight: 700 }}
                >
                  <option value={8}>8 Semesters (4-Year BE / BBA / CSIT)</option>
                  <option value={10}>10 Semesters (5-Year B.Arch / BALLB)</option>
                  <option value={4}>4 Semesters (2-Year Masters / MBA / ME)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Desired Graduation CGPA
                </label>
                <input
                  type="number"
                  min={2.0}
                  max={4.0}
                  step="0.05"
                  value={targetFinalCgpa}
                  onChange={(e) => setTargetFinalCgpa(parseFloat(e.target.value) || 3.5)}
                  className="text-input"
                  style={{ width: '100%', padding: '8px', fontSize: '14px', fontWeight: 700 }}
                />
              </div>
            </div>

            {calculation.remainingSemCount > 0 ? (
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: calculation.isTargetAchievable ? '#ecfdf5' : '#fef2f2',
                  border: `1px solid ${calculation.isTargetAchievable ? '#a7f3d0' : '#fecaca'}`,
                  color: calculation.isTargetAchievable ? '#065f46' : '#991b1b',
                  fontSize: '13px',
                  lineHeight: 1.5,
                }}
              >
                {calculation.isTargetAchievable ? (
                  <>
                    To graduate with a <strong>{targetFinalCgpa.toFixed(2)} CGPA</strong>, you need an average SGPA of{' '}
                    <strong>{Math.max(0, calculation.requiredFutureGpa).toFixed(2)} / 4.00</strong> across your remaining{' '}
                    <strong>{calculation.remainingSemCount} semesters</strong>.
                  </>
                ) : (
                  <>
                    Requires <strong>{calculation.requiredFutureGpa.toFixed(2)} SGPA</strong> in remaining{' '}
                    {calculation.remainingSemCount} semesters (exceeds the 4.00 maximum scale). Try adjusting your target CGPA.
                  </>
                )}
              </div>
            ) : (
              <div style={{ fontSize: '12.5px', color: '#64748b' }}>
                All {totalProgramSemesters} semesters are entered above. Your final graduation CGPA is{' '}
                <strong>{calculation.cgpa.toFixed(2)}</strong>.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

