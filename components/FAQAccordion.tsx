'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export interface FAQItem {
  question: string;
  answer: string;
  questionNep?: string;
  answerNep?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  titleNep?: string;
}

export function FAQAccordion({ 
  items, 
  title = "Frequently Asked Questions",
  titleNep = "अक्सर सोधिने प्रश्नहरू (FAQs)" 
}: FAQAccordionProps) {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const currentTitle = titleNep ? t(title, titleNep) : title;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: language === 'ne' && item.questionNep ? item.questionNep : item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: language === 'ne' && item.answerNep ? item.answerNep : item.answer,
      },
    })),
  };

  return (
    <section style={{ margin: '48px 0 24px' }}>
      {/* Inject FAQ Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px' }}>
        {currentTitle}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          const displayQuestion = language === 'ne' && item.questionNep ? item.questionNep : item.question;
          const displayAnswer = language === 'ne' && item.answerNep ? item.answerNep : item.answer;
          return (
            <div
              key={idx}
              style={{
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                background: '#ffffff',
                overflow: 'hidden',
                transition: 'border-color 0.2s ease',
              }}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="btn-accordion"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px 16px',
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  cursor: 'pointer',
                  fontSize: '14.5px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  whiteSpace: 'normal',
                }}
              >
                <span style={{ flex: 1, minWidth: 0, wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal', lineHeight: 1.4 }}>
                  {displayQuestion}
                </span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    color: 'var(--text-muted)',
                    flexShrink: 0,
                  }}
                />
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: '0 16px 16px',
                    fontSize: '13.5px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.55',
                    borderTop: '1px solid #f8fafc',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                  }}
                >
                  {displayAnswer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
