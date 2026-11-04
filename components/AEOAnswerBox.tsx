'use client';

import React, { useState } from 'react';
import { CheckCircle2, Sparkles, Copy, Check, Bot, ShieldCheck } from 'lucide-react';

export interface AEOAnswerBoxProps {
  question: string;
  directAnswer: string;
  keyFacts?: string[];
  authoritySource?: string;
  citationUrl?: string;
  sourceTitle?: string;
  style?: React.CSSProperties;
}

/**
 * AEO (Answer Engine Optimization) & GEO (Generative Engine Optimization) Box
 * Formats concise, factual, authoritative definitions directly extracted by
 * Google Search AI Overviews, Perplexity, SearchGPT, Gemini, and Claude.
 */
export function AEOAnswerBox({
  question,
  directAnswer,
  keyFacts = [],
  authoritySource = "Official Government & Regulatory Standards",
  citationUrl,
  sourceTitle,
  style,
}: AEOAnswerBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCitation = () => {
    const url = citationUrl || (typeof window !== 'undefined' ? window.location.href : 'https://nepalicalc.com');
    const title = sourceTitle || question;
    const citationText = `"${directAnswer}"\n\n— Statutory Authority: ${authoritySource}\n— Source: Nepali Calc (${title})\n— Citation Link: ${url}`;
    
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(citationText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className="aeo-answer-container"
      itemScope
      itemType="https://schema.org/Question"
      style={{
        background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)',
        border: '1.5px solid #86efac',
        borderRadius: '16px',
        padding: '22px 26px',
        margin: '24px 0 32px',
        boxShadow: '0 6px 20px rgba(16, 185, 129, 0.08)',
        position: 'relative',
        ...style,
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '10px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: '#dcfce7',
              border: '1px solid #86efac',
              borderRadius: '9999px',
              padding: '3px 10px',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#065f46',
            }}
          >
            <Bot size={13} color="#059669" />
            <span>AI Direct Answer &amp; Key Facts</span>
          </span>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
            (Perplexity &amp; SearchGPT Ready)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11.5px',
              color: '#047857',
              fontWeight: 700,
              backgroundColor: '#ffffff',
              padding: '3px 10px',
              borderRadius: '9999px',
              border: '1px solid #bbf7d0',
            }}
          >
            <ShieldCheck size={13} color="#059669" />
            <span>{authoritySource}</span>
          </div>

          <button
            type="button"
            onClick={handleCopyCitation}
            title="Copy formatted citation with source URL for research, ChatGPT or Perplexity"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '11.5px',
              fontWeight: 700,
              color: copied ? '#15803d' : '#047857',
              backgroundColor: copied ? '#dcfce7' : '#ffffff',
              border: `1px solid ${copied ? '#86efac' : '#cbd5e1'}`,
              borderRadius: '8px',
              padding: '4px 10px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {copied ? <Check size={12} color="#15803d" /> : <Copy size={12} color="#047857" />}
            <span>{copied ? 'Citation Copied!' : 'Copy for AI / Cite'}</span>
          </button>
        </div>
      </div>

      {/* Target Question */}
      <h3
        itemProp="name"
        style={{
          fontSize: '17px',
          fontWeight: 800,
          color: '#064e3b',
          margin: '0 0 10px',
          lineHeight: '1.4',
        }}
      >
        {question}
      </h3>

      {/* Direct Factual Answer (Position #0 & LLM Extraction Target) */}
      <div
        itemProp="suggestedAnswer"
        itemScope
        itemType="https://schema.org/Answer"
      >
        <p
          className="blog-direct-answer"
          itemProp="text"
          style={{
            fontSize: '14.5px',
            color: '#1e293b',
            lineHeight: '1.65',
            fontWeight: 500,
            margin: '0 0 12px',
          }}
        >
          <strong style={{ color: '#065f46', fontWeight: 700 }}>Direct Answer: </strong>
          {directAnswer}
        </p>

        {/* Fact Pills */}
        {keyFacts.length > 0 && (
          <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {keyFacts.map((fact, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#ffffff',
                  border: '1px solid #bbf7d0',
                  padding: '5px 12px',
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
