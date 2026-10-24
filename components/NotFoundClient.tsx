'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Home, 
  BookOpen, 
  ArrowRight, 
  ReceiptText, 
  Coins, 
  Landmark, 
  Compass, 
  Car, 
  CalendarDays,
  FileQuestion
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export function NotFoundClient() {
  const { language, t } = useLanguage();

  const quickLinks = [
    {
      titleEn: 'Income Tax FY 2083/84',
      titleNe: 'आयकर हिसाब २०८३/८४',
      descEn: 'Individual, married & SSF slabs',
      descNe: 'व्यक्तिगत, विवाहित र सामाजिक सुरक्षा छुट',
      href: '/tax',
      icon: ReceiptText,
      color: '#dc2626',
      bg: '#fee2e2',
    },
    {
      titleEn: 'Live Gold Rate & Billing',
      titleNe: 'सुन चाँदी दर तथा बिलिङ',
      descEn: 'Real-time FENEGOSIDA rates & jarti',
      descNe: 'दैनिक बजार भाउ, जर्ती र ज्याला हिसाब',
      href: '/gold',
      icon: Coins,
      color: '#d97706',
      bg: '#fef3c7',
    },
    {
      titleEn: 'Bank Loan & EMI',
      titleNe: 'बैंक ऋण तथा ईएमआई',
      descEn: 'Amortization & NRB 50% DSTI limits',
      descNe: 'मासिक किस्ता तथा राष्ट्र बैंक नियम',
      href: '/emi',
      icon: Landmark,
      color: '#2563eb',
      bg: '#dbeafe',
    },
    {
      titleEn: 'Land Measurement Units',
      titleNe: 'जग्गा नापी रोपनी / बिघा',
      descEn: 'Ropani, Aana, Bigha, Kattha & Sq. Ft',
      descNe: 'रोपनी, आना, दाम, बिघा र वर्गफिट',
      href: '/land',
      icon: Compass,
      color: '#059669',
      bg: '#d1fae5',
    },
    {
      titleEn: 'Vehicle Bluebook Tax',
      titleNe: 'सवारी ब्लुबुक कर',
      descEn: 'Provincial rates & renewal fines',
      descNe: 'प्रदेश अनुसार सवारी कर र जरिवाना',
      href: '/bluebook',
      icon: Car,
      color: '#4f46e5',
      bg: '#e0e7ff',
    },
    {
      titleEn: 'Nepali Date Converter',
      titleNe: 'नेपाली मिति रूपान्तरण',
      descEn: 'Bikram Sambat (B.S.) to A.D. & age',
      descNe: 'वि.सं. बाट ई.सं. र उमेर हिसाब',
      href: '/date',
      icon: CalendarDays,
      color: '#0284c7',
      bg: '#e0f2fe',
    },
  ];

  return (
    <main 
      style={{ 
        minHeight: '85vh', 
        backgroundColor: '#ffffff',
        background: 'radial-gradient(circle at 50% 0%, #f0f7ff 0%, #ffffff 75%)',
        padding: 'clamp(50px, 8vw, 90px) 20px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="container" style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Error Pill Badge */}
        <div 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '6px 16px', 
            borderRadius: '9999px', 
            backgroundColor: '#fee2e2', 
            border: '1px solid #fecaca', 
            color: '#dc2626', 
            fontSize: '12px', 
            fontWeight: 800, 
            letterSpacing: '0.04em',
            marginBottom: '20px' 
          }}
        >
          <FileQuestion size={14} />
          <span>
            {t('404 ERROR • PAGE NOT FOUND', '४०४ त्रुटि • पृष्ठ फेला परेन')}
          </span>
        </div>

        {/* Big 404 Graphic Heading */}
        <h1 
          style={{ 
            fontSize: 'clamp(80px, 15vw, 140px)', 
            fontWeight: 900, 
            lineHeight: 1, 
            margin: '0 0 16px',
            letterSpacing: '-0.04em',
            background: 'linear-gradient(135deg, #003893 0%, #2563eb 45%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </h1>

        {/* Heading in Single Active Language */}
        <h2 style={{ fontSize: 'clamp(22px, 3.4vw, 32px)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 16px' }}>
          {t("Oops! We Couldn't Find That Calculation", 'माफ गर्नुहोस्! तपाईंले खोज्नुभएको पृष्ठ फेला परेन')}
        </h2>

        {/* Description in Single Active Language */}
        <p style={{ fontSize: '15.5px', color: '#475569', lineHeight: 1.65, maxWidth: '640px', margin: '0 auto 36px' }}>
          {t(
            "The page might have been moved, renamed, or doesn't exist. Don't worry—all verified Nepal tax, gold, loan, and land calculation tools are active below.",
            'तपाईंले खोज्नुभएको पृष्ठ हटाइएको वा सारिएको हुनसक्छ। तल दिइएका मुख्य आधिकारिक नेपाली क्यालकुलेटरहरू प्रयोग गर्न सक्नुहुन्छ।'
          )}
        </p>

        {/* Primary Action Buttons */}
        <div className="mobile-stack-buttons" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '56px' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#003893',
              color: '#ffffff',
              borderRadius: '12px',
              fontSize: '14.5px',
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(0, 56, 147, 0.28)',
              transition: 'all 0.2s ease',
            }}
            className="hover-lift"
          >
            <Home size={16} />
            <span>{t('Return to Homepage', 'गृहपृष्ठमा जानुहोस्')}</span>
          </Link>

          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#ffffff',
              color: '#0f172a',
              borderRadius: '12px',
              fontSize: '14.5px',
              fontWeight: 800,
              border: '1.5px solid #cbd5e1',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)',
              transition: 'all 0.2s ease',
            }}
            className="hover-lift"
          >
            <BookOpen size={16} color="#003893" />
            <span>{t('Read Tool Guides', 'निर्देशिका पोर्टल')}</span>
          </Link>
        </div>

        {/* Quick Tools Grid Header */}
        <div style={{ textAlign: 'left', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px' }}>
                {t('Popular Nepal Financial Tools', 'लोकप्रिय क्यालकुलेटरहरू')}
              </h3>
              <span style={{ fontSize: '13px', color: '#64748b' }}>
                {t('Essential calculators you might be looking for:', 'तपाईंलाई चाहिने मुख्य हिसाबहरू:')}
              </span>
            </div>

            <Link href="/" style={{ fontSize: '13px', fontWeight: 800, color: '#003893', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span>{t('View All Tools', 'सबै क्यालकुलेटर हेर्नुहोस्')}</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Tools Grid - strictly in single active language */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '16px' 
            }}
          >
            {quickLinks.map((tool) => {
              const IconComp = tool.icon;
              const title = language === 'ne' ? tool.titleNe : tool.titleEn;
              const desc = language === 'ne' ? tool.descNe : tool.descEn;

              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '16px 18px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="hover-lift"
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: tool.bg,
                      color: tool.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <IconComp size={20} />
                  </div>

                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                      {desc}
                    </div>
                  </div>

                  <ArrowRight size={15} color="#94a3b8" style={{ flexShrink: 0 }} />
                </Link>
              );
            })}
          </div>

        </div>

        {/* Footer Support Info in Single Active Language */}
        <div style={{ marginTop: '48px', fontSize: '13px', color: '#64748b' }}>
          {language === 'ne' ? (
            <>
              <span>कुनै जिज्ञासा भए हाम्रो </span>
              <Link href="/about" style={{ color: '#003893', fontWeight: 700, textDecoration: 'none' }}>
                हाम्रो बारेमा र सम्पर्क पृष्ठ
              </Link>
              <span> हेर्नुहोस् वा </span>
              <Link href="/blog" style={{ color: '#003893', fontWeight: 700, textDecoration: 'none' }}>
                सम्पूर्ण निर्देशिकाहरू
              </Link>
              <span> पढ्नुहोस्।</span>
            </>
          ) : (
            <>
              <span>Looking for something specific? Check our </span>
              <Link href="/about" style={{ color: '#003893', fontWeight: 700, textDecoration: 'none' }}>
                About & Contact page
              </Link>
              <span> or browse the </span>
              <Link href="/blog" style={{ color: '#003893', fontWeight: 700, textDecoration: 'none' }}>
                Complete Guide Repository
              </Link>
              <span>.</span>
            </>
          )}
        </div>

      </div>
    </main>
  );
}
