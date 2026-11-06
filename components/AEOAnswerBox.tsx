'use client';

import React from 'react';

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
 * AEO (Answer Engine Optimization) & GEO (Generative Engine Optimization) Semantic Microdata
 * Visually hidden from human UI to keep mobile & desktop views clean and clutter-free,
 * while remaining in the SSR HTML DOM for schema.org/Question & Speakable extraction.
 */
export function AEOAnswerBox({
  question,
  directAnswer,
  keyFacts = [],
  authoritySource = "Official Government & Regulatory Standards",
}: AEOAnswerBoxProps) {
  return (
    <div
      className="aeo-answer-container"
      itemScope
      itemType="https://schema.org/Question"
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}
    >
      <h3 itemProp="name">{question}</h3>
      <div
        itemProp="suggestedAnswer"
        itemScope
        itemType="https://schema.org/Answer"
      >
        <p className="blog-direct-answer" itemProp="text">
          <strong>Direct Answer: </strong>
          {directAnswer} ({authoritySource})
        </p>
        {keyFacts.length > 0 && (
          <ul>
            {keyFacts.map((fact, idx) => (
              <li key={idx}>{fact}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
