'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ReceiptText, 
  LineChart, 
  Landmark, 
  GraduationCap, 
  Calendar, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { NepalCalcLogo } from '@/components/NepalCalcLogo';

export function Footer() {
  const { t } = useLanguage();

  const quickPills = [
    { name: t('Income Tax 2083/84', 'आयकर हिसाब २०८३/८४'), href: '/tax' },
    { name: t('Land Malpot Tax', 'जग्गा मालपोत तथा रजिष्ट्रेसन'), href: '/malpot' },
    { name: t('Nepali Patro 2083', 'नेपाली पात्रो २०८३'), href: '/calendar' },
    { name: t('NEPSE Broker Profit', 'नेप्से ब्रोकर कमिसन'), href: '/nepse' },
    { name: t('Bank Loan EMI', 'बैंक लोन ईएमआई (EMI)'), href: '/emi' },
    { name: t('Live Gold & Silver', 'सुनचाँदी लाइभ दर'), href: '/gold' },
    { name: t('Vehicle Bluebook Tax', 'सवारी ब्लुबुक कर'), href: '/vehicle' },
    { name: t('Preeti to Unicode', 'प्रिती टु युनिकोड'), href: '/preeti' },
  ];

  return (
    <footer
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        color: '#334155',
        marginTop: '64px',
        position: 'relative',
        boxShadow: '0 -4px 20px -5px rgba(15, 23, 42, 0.03)',
      }}
    >

      <div className="container" style={{ paddingTop: '48px', paddingBottom: '32px' }}>
        
        {/* Brand Header */}
        <div
          style={{
            paddingBottom: '24px',
            borderBottom: '1px solid #f1f5f9',
            marginBottom: '32px',
          }}
        >
          <div style={{ maxWidth: '600px' }}>
            <Link 
              href="/" 
              style={{ 
                textDecoration: 'none', 
                display: 'inline-flex', 
                alignItems: 'center', 
              }}
              aria-label="Nepali Calc Home"
            >
              <NepalCalcLogo height={32} strokeColor="#0f172a" accentColor="#f59e0b" showFlag={false} />
            </Link>
            <p 
              style={{ 
                fontSize: '14px', 
                color: '#64748b', 
                margin: '8px 0 0', 
                lineHeight: 1.6 
              }}
            >
              {t(
                'Accurate, fast, and easy-to-use calculation and citizen utility suite built for Nepal and the global Nepali diaspora.',
                'नेपाल तथा विश्वभरिका नेपालीहरूका लागि भरपर्दो, छिटो र आधिकारिक अनलाइन हिसाब तथा नागरिक सेवा पोर्टल।'
              )}
            </p>
          </div>
        </div>

        {/* Quick Popular Jump Links */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: '12px' }}>
            {t('Popular Quick Tools', 'लोकप्रिय उपकरणहरू')}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quickPills.map(pill => (
              <Link key={pill.href} href={pill.href} className="footer-pill-link">
                {pill.name}
              </Link>
            ))}
          </div>
        </div>

        {/* 4 Multi-Column Comprehensive Navigation Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '36px',
            marginBottom: '48px',
          }}
        >
          {/* Column 1: Tax & Labour */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div 
                style={{ 
                  width: '26px', 
                  height: '26px', 
                  borderRadius: '6px', 
                  backgroundColor: '#fee2e2', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                <ReceiptText size={14} color="#c8102e" />
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                {t('Tax & Labour', 'कर तथा श्रम ऐन')}
              </h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, margin: 0 }}>
              <li><Link href="/tax" className="footer-link">{t('Salary Income Tax (FY 2083/84)', 'आयकर हिसाब (२०८३/८४)')}</Link></li>
              <li><Link href="/tds" className="footer-link">{t('TDS & Withholding Tax Calculator', 'स्रोतमा कर कट्टी (TDS) हिसाब')}</Link></li>
              <li><Link href="/depreciation" className="footer-link">{t('Schedule 2 Tax Depreciation (WDV)', 'अनुसूची-२ कर ह्रासकट्टी हिसाब')}</Link></li>
              <li><Link href="/corporate-tax" className="footer-link">{t('Corporate & Advance Tax (Sec 94)', 'कम्पनी आयकर तथा अग्रिम किस्ता')}</Link></li>
              <li><Link href="/gratuity" className="footer-link">{t('Labour Act Gratuity & Leave Cashout', 'उपदान तथा सञ्चित बिदा हिसाब')}</Link></li>
              <li><Link href="/overtime" className="footer-link">{t('Overtime (OT) 1.5x Pay Calculator', 'ओभरटाइम १.५ गुणा पारिश्रमिक')}</Link></li>
              <li><Link href="/rent-tax" className="footer-link">{t('House Rental TDS Tax (10%)', 'घरबहाल कर (१०% TDS हिसाब)')}</Link></li>
              <li><Link href="/vat" className="footer-link">{t('13% VAT & Service Charge', '१३% भ्याट तथा सेवा शुल्क हिसाब')}</Link></li>
              <li><Link href="/documents" className="footer-link">{t('Official Finance Acts & Schedules', 'सरकारी आर्थिक ऐन तथा राजपत्र')}</Link></li>
            </ul>
          </div>

          {/* Column 2: Banking & Wealth */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div 
                style={{ 
                  width: '26px', 
                  height: '26px', 
                  borderRadius: '6px', 
                  backgroundColor: '#dbeafe', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                <LineChart size={14} color="#003893" />
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                {t('Banking & Wealth', 'बैंकिङ तथा शेयर बजार')}
              </h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, margin: 0 }}>
              <li><Link href="/sip" className="footer-link">{t('SIP Mutual Fund Compounding', 'एसआइपी म्युचुअल फण्ड कम्पाउन्डिङ')}</Link></li>
              <li><Link href="/emi" className="footer-link">{t('Bank Loan EMI & Amortization', 'बैंक लोन ईएमआई (EMI) किस्ता')}</Link></li>
              <li><Link href="/loan-eligibility" className="footer-link">{t('Loan Limit (NRB 50% DSTI)', 'कर्जा सीमा (DSTI ५०% मापदण्ड)')}</Link></li>
              <li><Link href="/nepse" className="footer-link">{t('NEPSE Broker & Share Profit', 'नेप्से शेयर ब्रोकर हिसाब र लाभकर')}</Link></li>
              <li><Link href="/ipo-allotment" className="footer-link">{t('IPO Allotment Probability', 'मेरोसेयर आईपीओ बाँडफाँड सम्भावना')}</Link></li>
              <li><Link href="/fd-vs-debenture" className="footer-link">{t('FD vs Debenture Yield Comparison', 'मुद्दती निक्षेप vs ऋणपत्र प्रतिफल')}</Link></li>
              <li><Link href="/pension" className="footer-link">{t('EPF, CIT & Pension Projection', 'सञ्चय कोष, नागरिक लगानी कोष पेन्सन')}</Link></li>
              <li><Link href="/forex" className="footer-link">{t('Live NRB Foreign Exchange Rates', 'नेपाल राष्ट्र बैंक विदेशी मुद्रा दर')}</Link></li>
              <li><Link href="/interest" className="footer-link">{t('Sayakada 2/3 Monthly Interest', 'सयकडा ब्याज तथा मुद्दती हिसाब')}</Link></li>
              <li><Link href="/inflation" className="footer-link">{t('Historical Rupee Inflation Value', 'मुद्रास्फीति र रुपैयाँको क्रयशक्ति')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Land & Utilities */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div 
                style={{ 
                  width: '26px', 
                  height: '26px', 
                  borderRadius: '6px', 
                  backgroundColor: '#fef3c7', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                <Landmark size={14} color="#d97706" />
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                {t('Land & Utilities', 'जग्गा तथा उपयोगिता')}
              </h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, margin: 0 }}>
              <li>
                <Link href="/malpot" className="footer-link" style={{ color: '#b45309', fontWeight: 700 }}>
                  ✦ {t('Land Malpot Tax & CGT', 'मालपोत लिखत तथा पूँजीगत लाभकर')}
                </Link>
              </li>
              <li><Link href="/land" className="footer-link">{t('Land Area (Ropani ⇄ Bigha)', 'जग्गा नाप (रोपनी ⇄ बिघा रूपान्तरण)')}</Link></li>
              <li><Link href="/vehicle" className="footer-link">{t('Vehicle Bluebook Tax & Fines', 'सवारी साधन ब्लुबुक कर र जरिवाना')}</Link></li>
              <li><Link href="/gold" className="footer-link">{t('Live Gold & Silver Tola Pricing', 'सुनचाँदी लाइभ मूल्य तथा जर्ती हिसाब')}</Link></li>
              <li><Link href="/nea" className="footer-link">{t('NEA Electricity Bill Tariff', 'विद्युत् प्राधिकरण बिजुली महसुल')}</Link></li>
              <li><Link href="/khanepani" className="footer-link">{t('Drinking Water (Khanepani) Bill', 'खानेपानी महसुल तथा ढल निकास')}</Link></li>
              <li><Link href="/battery-backup" className="footer-link">{t('Inverter Battery Backup Hours', 'इन्भर्टर ब्याट्री ब्याकअप समय हिसाब')}</Link></li>
              <li><Link href="/krishi-fertilizer" className="footer-link">{t('Krishi Fertilizer & Seed Dosage', 'रासायनिक मल तथा बीउ मात्रा सिफारिस')}</Link></li>
              <li><Link href="/preeti" className="footer-link">{t('Preeti to Unicode Font Converter', 'प्रिती टु युनिकोड रूपान्तरण')}</Link></li>
              <li><Link href="/number-to-words" className="footer-link">{t('Cheque Number to Words', 'अङ्कलाई नेपाली र अंग्रेजी अक्षरमा')}</Link></li>
              <li><Link href="/traditional-units" className="footer-link">{t('Traditional Units (धार्नी/माना)', 'परम्परागत नेपाली तौल र नाप')}</Link></li>
              <li><Link href="/fuel" className="footer-link">{t('Fuel Mileage & Ride Splitter', 'इन्धन र यात्रा खर्च बाँडफाँड')}</Link></li>
            </ul>
          </div>

          {/* Column 4: Citizen & Services */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div 
                style={{ 
                  width: '26px', 
                  height: '26px', 
                  borderRadius: '6px', 
                  backgroundColor: '#dcfce7', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                <GraduationCap size={14} color="#059669" />
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                {t('Citizen & Services', 'नागरिक सेवा तथा संस्कृति')}
              </h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, margin: 0 }}>
              <li>
                <Link href="/calendar" className="footer-link" style={{ color: '#047857', fontWeight: 700 }}>
                  ✦ {t('Detailed Nepali Patro 2083', 'विस्तृत नेपाली पात्रो २०८३')}
                </Link>
              </li>
              <li>
                <Link href="/license-exam" className="footer-link" style={{ color: '#0284c7', fontWeight: 700 }}>
                  ✦ {t('Driving License Written Exam', 'सवारी चालक लिखित परीक्षा क्विज')}
                </Link>
              </li>
              <li><Link href="/passport-fee" className="footer-link">{t('e-Passport & Urgent Fees', 'राहदानी (e-Passport) दस्तुर हिसाब')}</Link></li>
              <li><Link href="/date" className="footer-link">{t('Date Converter (BS ⇄ AD)', 'मिति रूपान्तरण (वि.सं. ⇄ ई.सं.)')}</Link></li>
              <li><Link href="/rashifal" className="footer-link">{t('Daily Rashifal (Horoscope)', 'दैनिक राशिफल (१२ राशि ग्रहफल)')}</Link></li>
              <li><Link href="/typing-test" className="footer-link">{t('Loksewa Typing Speed Test (WPM)', 'लोकसेवा टाइपिङ गति परीक्षण')}</Link></li>
              <li><Link href="/postal-shipping" className="footer-link">{t('Nepal Post EMS Shipping Tariff', 'हुलाक पार्सल तथा एक्सप्रेस महसुल')}</Link></li>
              <li><Link href="/blood-donation" className="footer-link">{t('Red Cross Blood Donation Interval', 'रक्तदान योग्यता र समय अन्तराल')}</Link></li>
              <li><Link href="/qr-generator" className="footer-link">{t('Fonepay / eSewa QR Standee', 'फोनपे र इसेवा क्युआर स्टिकर')}</Link></li>
              <li><Link href="/bmi" className="footer-link">{t('BMI & South Asian Health Weight', 'बीएमआई (BMI) आदर्श तौल हिसाब')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Acknowledgements */}
        <div
          style={{
            borderTop: '1px solid #e2e8f0',
            paddingTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '12.5px',
            color: '#64748b',
          }}
        >
          <div>
            © 2026 Nepali Calc. {t('All rights reserved. Built with precision for Nepal.', 'सबै अधिकार सुरक्षित। नेपाल र विश्वभरिका नेपालीका लागि समर्पित।')}
          </div>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/documents" className="footer-link">{t('Official Acts & Gazettes', 'सरकारी ऐन तथा राजपत्र')}</Link>
            <Link href="/documents" className="footer-link">{t('Privacy Policy', 'गोपनीयता नीति')}</Link>
            <Link href="/documents" className="footer-link">{t('Terms of Service', 'प्रयोगका सर्तहरू')}</Link>
            <Link href="/calendar" className="footer-link" style={{ color: '#003893', fontWeight: 700 }}>
              नेपाली पात्रो २०८३
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
