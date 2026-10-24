'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { AEOAnswerBox } from '@/components/AEOAnswerBox';

export interface FAQItem {
  question: string;
  answer: string;
  questionNep?: string;
  answerNep?: string;
}

export interface QuickSummaryConfig {
  question?: string;
  directAnswer?: string;
  keyFacts?: string[];
  authoritySource?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  titleNep?: string;
  quickSummary?: QuickSummaryConfig | boolean;
  authoritySource?: string;
}

function getAuthoritySourceByContext(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('gold') || t.includes('silver') || t.includes('सुन') || t.includes('चाँदी')) {
    return 'FENEGOSIDA Official Market Standards';
  }
  if (t.includes('bmi') || t.includes('health') || t.includes('weight')) {
    return 'World Health Organization (WHO) South Asia';
  }
  if (t.includes('tax') || t.includes('salary') || t.includes('tds') || t.includes('आयकर') || t.includes('कर')) {
    return 'Inland Revenue Department (IRD) Nepal';
  }
  if (t.includes('vehicle') || t.includes('bluebook') || t.includes('सवारी') || t.includes('bike')) {
    return 'Department of Transport Management (DoTM)';
  }
  if (t.includes('land') || t.includes('malpot') || t.includes('जग्गा') || t.includes('नापी')) {
    return 'Survey Department (Naapi) & DoLMA Nepal';
  }
  if (t.includes('nepse') || t.includes('share') || t.includes('सेयर') || t.includes('wacc')) {
    return 'Securities Board of Nepal (SEBON) / NEPSE';
  }
  if (t.includes('electricity') || t.includes('nea') || t.includes('विद्युत')) {
    return 'Nepal Electricity Authority (NEA)';
  }
  if (t.includes('water') || t.includes('khanepani') || t.includes('खानेपानी') || t.includes('kukl')) {
    return 'Kathmandu Upatyaka Khanepani Limited (KUKL)';
  }
  if (t.includes('forex') || t.includes('remittance') || t.includes('currency') || t.includes('loan') || t.includes('emi') || t.includes('interest') || t.includes('fd')) {
    return 'Nepal Rastra Bank (NRB) Directives';
  }
  if (t.includes('passport') || t.includes('राहदानी')) {
    return 'Department of Passports (DoP) Nepal';
  }
  if (t.includes('license') || t.includes('लाइसेन्स')) {
    return 'DoTM Driving License Department Nepal';
  }
  if (t.includes('sip') || t.includes('mutual fund')) {
    return 'SEBON Mutual Fund Regulations';
  }
  if (t.includes('gratuity') || t.includes('labour') || t.includes('overtime') || t.includes('श्रम')) {
    return 'Nepal Labour Act 2074 & SSF Rules';
  }
  return 'Government of Nepal Regulatory Standards';
}

function getKeyFactsFromContext(title: string, firstItem?: FAQItem): string[] {
  const t = title.toLowerCase();
  if (t.includes('gold')) {
    return ['1 Tola = 11.6638g', '1 Tola = 100 Lal', 'FENEGOSIDA Official'];
  }
  if (t.includes('tax') || t.includes('salary')) {
    return ['FY 2083/84 Active Slabs', '1% SSF Waiver Applicable', 'IRD Nepal Standard'];
  }
  if (t.includes('vehicle') || t.includes('bluebook')) {
    return ['Bagmati Provincial Rates', 'Bluebook Annual Renewal', 'Zero Penalty in 90 Days'];
  }
  if (t.includes('land') || t.includes('malpot')) {
    return ['DoLMA Survey Standard', 'Ropani & Bigha Dual System', 'Official Malpot Pass Fee'];
  }
  if (t.includes('nepse') || t.includes('share')) {
    return ['SEBON Regulated Rates', '5% vs 7.5% CGT Rules', 'Broker Commission Slab'];
  }
  if (t.includes('electricity') || t.includes('nea')) {
    return ['NEA Domestic Slab Rates', '5% VAT on Commercial', 'Prompt Rebate Available'];
  }
  if (t.includes('forex') || t.includes('currency')) {
    return ['NRB Official Exchange Rate', 'Daily Live Currency Feed', 'Remittance Buy/Sell'];
  }
  if (t.includes('emi') || t.includes('loan')) {
    return ['NRB Base Rate Guidelines', '50% DSTI Eligibility Limit', 'Reducing Balance Method'];
  }
  if (t.includes('bmi')) {
    return ['Normal Range: 18.5 - 22.9', 'South Asian WHO Threshold', 'Calculates Ideal Weight in KG'];
  }
  return ['Official Nepal Standard', 'Verified Calculation Formula', 'Current Fiscal Year 2083/84'];
}

export function FAQAccordion({ 
  items, 
  title = "Frequently Asked Questions",
  titleNep = "अक्सर सोधिने प्रश्नहरू (FAQs)",
  quickSummary,
  authoritySource,
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

  // Determine if quick summary box should be rendered directly above the FAQ
  const shouldRenderSummary = quickSummary !== false && items.length > 0;
  
  const summaryQuestion = 
    typeof quickSummary === 'object' && quickSummary.question 
      ? quickSummary.question 
      : items[0]?.question;

  const summaryAnswer = 
    typeof quickSummary === 'object' && quickSummary.directAnswer 
      ? quickSummary.directAnswer 
      : items[0]?.answer;

  const summaryAuthority = 
    typeof quickSummary === 'object' && quickSummary.authoritySource 
      ? quickSummary.authoritySource 
      : (authoritySource || getAuthoritySourceByContext(title));

  const summaryKeyFacts = 
    typeof quickSummary === 'object' && quickSummary.keyFacts 
      ? quickSummary.keyFacts 
      : getKeyFactsFromContext(title, items[0]);

  return (
    <section style={{ margin: '48px 0 24px' }}>
      {/* Inject FAQ Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Quick Summary AEO Box directly above FAQ */}
      {shouldRenderSummary && summaryQuestion && summaryAnswer && (
        <AEOAnswerBox
          question={summaryQuestion}
          directAnswer={summaryAnswer}
          keyFacts={summaryKeyFacts}
          authoritySource={summaryAuthority}
          style={{ marginBottom: '24px' }}
        />
      )}

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
              className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
            >
              <button
                type="button"
                id={`faq-btn-${idx}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${idx}`}
                onClick={() => toggle(idx)}
                className="btn-accordion"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px 18px',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none',
                  WebkitTapHighlightColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  cursor: 'pointer',
                  fontSize: '14.5px',
                  fontWeight: 700,
                  color: isOpen ? '#1d4ed8' : 'var(--text-primary)',
                  whiteSpace: 'normal',
                  transition: 'color 0.2s ease',
                }}
              >
                <span style={{ flex: 1, minWidth: 0, wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal', lineHeight: 1.45 }}>
                  {displayQuestion}
                </span>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isOpen ? '#eff6ff' : '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <ChevronDown
                    size={17}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
                      color: isOpen ? '#2563eb' : 'var(--text-muted)',
                    }}
                  />
                </div>
              </button>

              <div
                id={`faq-panel-${idx}`}
                role="region"
                aria-labelledby={`faq-btn-${idx}`}
                className={`faq-accordion-collapse ${isOpen ? 'open' : ''}`}
              >
                <div className="faq-accordion-inner">
                  <div className="faq-accordion-content">
                    {displayAnswer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
