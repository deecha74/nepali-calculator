'use client';

import React from 'react';

export interface ChartSegment {
  label: string;
  value: number;
  color: string;
  percentage?: number;
}

interface DonutChartProps {
  segments: ChartSegment[];
  totalLabel?: string;
  totalValue?: string;
  size?: number;
}

export function DonutChart({
  segments,
  totalLabel = "Total",
  totalValue,
  size = 200,
}: DonutChartProps) {
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const total = segments.reduce((sum, seg) => sum + Math.max(0, seg.value), 0);

  let accumulatedPercent = 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />
          {total > 0 &&
            segments.map((seg, idx) => {
              const fraction = Math.max(0, seg.value) / total;
              const strokeDasharray = `${fraction * circumference} ${circumference}`;
              const strokeDashoffset = -accumulatedPercent * circumference;
              accumulatedPercent += fraction;

              return (
                <circle
                  key={idx}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={seg.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{
                    transform: 'rotate(-90deg)',
                    transformOrigin: '50% 50%',
                    transition: 'stroke-dasharray 0.4s ease, stroke-dashoffset 0.4s ease',
                  }}
                />
              );
            })}
        </svg>

        {/* Center Text */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>
            {totalLabel}
          </span>
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
            {totalValue || `रु ${Math.round(total).toLocaleString('en-IN')}`}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
        {segments.map((seg, idx) => {
          const pct = total > 0 ? Math.round((seg.value / total) * 100) : 0;
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: seg.color,
                }}
              />
              <span style={{ color: '#475569', fontWeight: 500 }}>{seg.label}</span>
              <span style={{ color: '#0f172a', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
