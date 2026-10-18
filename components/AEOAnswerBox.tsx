import React from 'react';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export interface AEOAnswerBoxProps {
  question: string;
  directAnswer: string;
  keyFacts?: string[];
  authoritySource?: string;
  style?: React.CSSProperties;
}

/**
 * AEO (Answer Engine Optimization) & GEO (Generative Engine Optimization) Box
 * Formats concise, factual, authoritative definitions directly extracted by
 * Google Search AI Overviews, Perplexity, SearchGPT, and Microsoft Copilot.
 */
export function AEOAnswerBox({
  question,
  directAnswer,
  keyFacts = [],
  authoritySource = "Official Government & Regulatory Standards",
  style,
}: AEOAnswerBoxProps) {
  return (
    <div
      className="aeo-answer-container"
      itemScope
      itemType="https://schema.org/Question"
      style={{
        background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)',
        border: '1.5px solid #86efac',
        borderRadius: '16px',
        padding: '20px 24px',
        margin: '24px 0 32px',
        boxShadow: '0 4px 16px rgba(16, 185, 129, 0.06)',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={16} color="#059669" />
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#047857' }}>
            Quick Summary
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#065f46', fontWeight: 600 }}>
          <span>{authoritySource}</span>
        </div>
      </div>

      <h3
        itemProp="name"
        style={{
          fontSize: '16px',
          fontWeight: 800,
          color: '#064e3b',
          marginBottom: '8px',
        }}
      >
        {question}
      </h3>

      <div
        itemProp="suggestedAnswer"
        itemScope
        itemType="https://schema.org/Answer"
      >
        <p
          itemProp="text"
          style={{
            fontSize: '14px',
            color: '#1e293b',
            lineHeight: '1.6',
            fontWeight: 500,
          }}
        >
          {directAnswer}
        </p>

        {keyFacts.length > 0 && (
          <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {keyFacts.map((fact, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: '#ffffff',
                  border: '1px solid #bbf7d0',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#065f46',
                }}
              >
                <CheckCircle2 size={13} color="#10b981" />
                <span>{fact}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
