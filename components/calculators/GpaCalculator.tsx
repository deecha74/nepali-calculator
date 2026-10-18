'use client';

import React, { useState, useMemo } from 'react';
import { GraduationCap, Copy, Check, Plus, Trash2 } from 'lucide-react';

interface SubjectGrade {
  name: string;
  creditHours: number;
  gradePoint: number;
  letterGrade: string;
}

const GRADE_POINTS: { letter: string; point: number }[] = [
  { letter: "A+ (90-100%)", point: 4.0 },
  { letter: "A (80-89%)", point: 3.6 },
  { letter: "B+ (70-79%)", point: 3.2 },
  { letter: "B (60-69%)", point: 2.8 },
  { letter: "C+ (50-59%)", point: 2.4 },
  { letter: "C (40-49%)", point: 2.0 },
  { letter: "D (35-39%)", point: 1.6 },
  { letter: "NG (Non-Graded)", point: 0.0 },
];

export function GpaCalculator() {
  const [level, setLevel] = useState<'see' | 'neb'>('see');

  const defaultSeeSubjects: SubjectGrade[] = [
    { name: "Compulsory English", creditHours: 4, gradePoint: 3.6, letterGrade: "A" },
    { name: "Compulsory Nepali", creditHours: 4, gradePoint: 3.2, letterGrade: "B+" },
    { name: "Compulsory Mathematics", creditHours: 4, gradePoint: 4.0, letterGrade: "A+" },
    { name: "Science and Technology", creditHours: 4, gradePoint: 3.6, letterGrade: "A" },
    { name: "Social Studies", creditHours: 4, gradePoint: 3.2, letterGrade: "B+" },
    { name: "Optional I (e.g. Opt Maths)", creditHours: 4, gradePoint: 3.6, letterGrade: "A" },
    { name: "Optional II (e.g. Computer)", creditHours: 4, gradePoint: 4.0, letterGrade: "A+" },
  ];

  const [subjects, setSubjects] = useState<SubjectGrade[]>(defaultSeeSubjects);
  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    let totalWeightedPoints = 0;
    let totalCredits = 0;
    let hasNg = false;

    for (const sub of subjects) {
      totalWeightedPoints += sub.gradePoint * sub.creditHours;
      totalCredits += sub.creditHours;
      if (sub.gradePoint === 0) hasNg = true;
    }

    const gpa = totalCredits > 0 ? totalWeightedPoints / totalCredits : 0;
    const approximatePercentage = gpa * 25; // Standard NEB approx mapping

    return {
      gpa: Math.round(gpa * 100) / 100,
      approximatePercentage: Math.round(approximatePercentage * 10) / 10,
      hasNg,
    };
  }, [subjects]);

  const handleGradeChange = (index: number, point: number) => {
    const updated = [...subjects];
    updated[index].gradePoint = point;
    setSubjects(updated);
  };

  const handleCopy = () => {
    const text = `Nepal ${level.toUpperCase()} GPA Result:
Calculated GPA: ${calculation.gpa.toFixed(2)}
Approx. Percentage: ${calculation.approximatePercentage}%
Status: ${calculation.hasNg ? 'Non-Graded (NG in some subjects)' : 'Passed'}
Calculated via NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-blue">NEB / SEE Standard</span>
            <span className="badge badge-neutral">Letter Grade System</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            SEE & +2 (Class 11/12) GPA Calculator
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Calculate overall GPA and equivalent percentage based on National Examination Board letter grading.
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? "Copied!" : "Copy Result"}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {/* Subject Grades List */}
        <div>
          <span className="input-label" style={{ marginBottom: '14px' }}>Select Subject Grades:</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {subjects.map((sub, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: '10px 14px',
                  background: '#f8fafc',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{sub.name}</span>
                  <span style={{ display: 'block', fontSize: '11px', color: '#64748b' }}>Credit: {sub.creditHours} hrs</span>
                </div>

                <select
                  className="select-input"
                  style={{ width: '150px', padding: '6px 10px', fontSize: '13px' }}
                  value={sub.gradePoint}
                  onChange={(e) => handleGradeChange(idx, Number(e.target.value))}
                >
                  {GRADE_POINTS.map((g) => (
                    <option key={g.letter} value={g.point}>
                      {g.letter} ({g.point.toFixed(1)})
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="result-card-highlight">
            <span className="stat-label">Calculated Overall GPA</span>
            <div className="stat-value" style={{ color: '#2563eb', margin: '6px 0 2px', fontSize: '36px' }}>
              {calculation.gpa.toFixed(2)}
              <span style={{ fontSize: '16px', color: '#64748b' }}> / 4.0</span>
            </div>
            <span className="stat-subvalue">
              Equivalent to approx. {calculation.approximatePercentage}%
            </span>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Examination Status</span>
                <span style={{ fontWeight: 700, color: calculation.hasNg ? '#e11d48' : '#059669' }}>
                  {calculation.hasNg ? 'Needs Re-examination (NG)' : 'Passed (उत्तीर्ण)'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Grading Scale</span>
                <span style={{ fontWeight: 600 }}>NEB 8-Tier System</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
