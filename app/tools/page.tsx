import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Sparkles,
  ReceiptText,
  Landmark,
  TrendingUp,
  Car,
  GraduationCap,
  Zap,
  HeartPulse,
  ScrollText,
  Scale,
  DollarSign,
  Coins,
  Calculator,
  Calendar,
  Home,
  ShieldCheck,
  FileText,
  Fuel,
  Smartphone,
  Percent,
  Award,
  Activity,
  Clock,
  Binary,
  BarChart3,
  PiggyBank,
  Send,
  Building2,
  Flame,
  QrCode,
  Keyboard,
  Truck,
  Droplets,
  Sprout,
  BatteryCharging,
  Globe,
} from 'lucide-react';
import { constructMetadata, SITE_CONFIG } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'All Calculators & Tools Directory — Complete A–Z Nepal Tool Index',
  description:
    'Browse all 72+ Nepal financial, tax, gold, land measurement, NEPSE stock, banking loan, construction, health, and academic calculators in one clean directory →',
  path: '/tools',
  keywords: [
    'all nepal calculators',
    'nepal tools directory',
    'nepali calc all tools',
    'tax land gold nepse calculators nepal',
  ],
});

interface ToolItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface ToolGroup {
  title: string;
  accent: string;
  bgTint: string;
  headerIcon: React.ReactNode;
  items: ToolItem[];
}

export default function AllToolsDirectoryPage() {
  // 9 evenly balanced groups × 8 tools each = 72 tools in a symmetrical 3×3 grid
  const groups: ToolGroup[] = [
    {
      title: 'MARKET RATES & GOLD',
      accent: '#d97706',
      bgTint: '#fef3c7',
      headerIcon: <Sparkles size={14} color="#d97706" />,
      items: [
        { label: 'Live Gold & Silver Price', href: '/gold', icon: <Sparkles size={13} color="#d97706" /> },
        { label: '100-Year Gold Price History', href: '/gold/history', icon: <TrendingUp size={13} color="#d97706" /> },
        { label: 'Gold Customs Allowance Nepal', href: '/how-much-gold-can-you-bring-to-nepal', icon: <ShieldCheck size={13} color="#d97706" /> },
        { label: 'NRB Live Forex Converter', href: '/forex', icon: <DollarSign size={13} color="#d97706" /> },
        { label: 'Foreign Remittance In-Hand', href: '/remittance-calculator', icon: <Send size={13} color="#d97706" /> },
        { label: '1 Tola Gold Price Today', href: '/gold/1-tola-gold-price-nepal', icon: <Coins size={13} color="#d97706" /> },
        { label: '10 Gram Gold Price Today', href: '/gold/10-gram-gold-price-nepal', icon: <Scale size={13} color="#d97706" /> },
        { label: '1 Lal Gold Price Today', href: '/gold/1-lal-gold-price-nepal', icon: <Sparkles size={13} color="#d97706" /> },
      ],
    },
    {
      title: 'TAX, SALARY & CUSTOMS',
      accent: '#dc2626',
      bgTint: '#fee2e2',
      headerIcon: <ReceiptText size={14} color="#dc2626" />,
      items: [
        { label: 'Income Tax & Salary (2083/84)', href: '/tax', icon: <ReceiptText size={13} color="#dc2626" /> },
        { label: 'TDS & Withholding Tax', href: '/tds', icon: <Percent size={13} color="#dc2626" /> },
        { label: '13% VAT & Service Charge', href: '/vat', icon: <Calculator size={13} color="#dc2626" /> },
        { label: 'Corporate & Advance Tax', href: '/corporate-tax', icon: <Building2 size={13} color="#dc2626" /> },
        { label: 'Schedule 2 Tax Depreciation', href: '/depreciation', icon: <TrendingUp size={13} color="#dc2626" /> },
        { label: 'Mobile MDMS & Customs Duty', href: '/customs', icon: <Smartphone size={13} color="#dc2626" /> },
        { label: 'Gratuity & Labour Act 2074', href: '/gratuity', icon: <Award size={13} color="#dc2626" /> },
        { label: 'Overtime (OT) & Hourly Pay', href: '/overtime', icon: <Clock size={13} color="#dc2626" /> },
      ],
    },
    {
      title: 'BANKING, LOANS & WEALTH',
      accent: '#0284c7',
      bgTint: '#e0f2fe',
      headerIcon: <Landmark size={14} color="#0284c7" />,
      items: [
        { label: 'Bank Loan EMI Calculator', href: '/emi', icon: <Calculator size={13} color="#0284c7" /> },
        { label: 'Nepal Home Loan & NRB LTV', href: '/nepal-home-loan', icon: <Home size={13} color="#0284c7" /> },
        { label: 'Bank Loan Eligibility (DSTI)', href: '/loan-eligibility', icon: <ShieldCheck size={13} color="#0284c7" /> },
        { label: 'Village Sahu Byaj (Sayakada)', href: '/village-interest', icon: <Coins size={13} color="#0284c7" /> },
        { label: 'Nepali Byaj & Fixed Deposit', href: '/interest', icon: <Landmark size={13} color="#0284c7" /> },
        { label: 'Bank FD vs Debenture Yield', href: '/fd-vs-debenture', icon: <BarChart3 size={13} color="#0284c7" /> },
        { label: 'Savings Goal & Wealth Planner', href: '/savings-goal', icon: <PiggyBank size={13} color="#0284c7" /> },
        { label: 'EPF, CIT & Government Pension', href: '/pension', icon: <Award size={13} color="#0284c7" /> },
      ],
    },
    {
      title: 'NEPSE & SHARE MARKET',
      accent: '#059669',
      bgTint: '#d1fae5',
      headerIcon: <TrendingUp size={14} color="#059669" />,
      items: [
        { label: 'NEPSE Share Profit & Broker Fee', href: '/nepse', icon: <TrendingUp size={13} color="#059669" /> },
        { label: 'NEPSE WACC & Share Average', href: '/nepse-wacc', icon: <Calculator size={13} color="#059669" /> },
        { label: 'Right Share & Bonus Adjustment', href: '/right-share', icon: <Percent size={13} color="#059669" /> },
        { label: 'IPO Allotment Luck Probability', href: '/ipo-allotment', icon: <Sparkles size={13} color="#059669" /> },
        { label: 'SIP & Mutual Fund Returns', href: '/sip', icon: <PiggyBank size={13} color="#059669" /> },
        { label: 'CAGR & Rule of 72 Doubling', href: '/cagr', icon: <BarChart3 size={13} color="#059669" /> },
        { label: 'Inflation & Purchasing Power', href: '/inflation', icon: <Coins size={13} color="#059669" /> },
        { label: 'Cheque Number to Words (NPR)', href: '/number-to-words', icon: <FileText size={13} color="#059669" /> },
      ],
    },
    {
      title: 'LAND, PROPERTY & BUILD',
      accent: '#b45309',
      bgTint: '#fef3c7',
      headerIcon: <Home size={14} color="#b45309" />,
      items: [
        { label: 'Land Converter (Ropani ⇄ Bigha)', href: '/land', icon: <Landmark size={13} color="#b45309" /> },
        { label: 'Land Malpot & Capital Gains Tax', href: '/malpot', icon: <ReceiptText size={13} color="#b45309" /> },
        { label: 'Land Road Deduction (Bato Katta)', href: '/bato-katta', icon: <Scale size={13} color="#b45309" /> },
        { label: 'Municipal Property Tax (Ghar Kar)', href: '/property-tax', icon: <Building2 size={13} color="#b45309" /> },
        { label: 'House Construction Cost & Rod', href: '/house-construction', icon: <Home size={13} color="#b45309" /> },
        { label: 'Paint, Wall Brick & M20 Concrete', href: '/paint-cost', icon: <Calculator size={13} color="#b45309" /> },
        { label: 'House Rent Tax (10% Bahal Kar)', href: '/rent-tax', icon: <Percent size={13} color="#b45309" /> },
        { label: 'Krishi Fertilizer & Seed Dosage', href: '/krishi-fertilizer', icon: <Sprout size={13} color="#b45309" /> },
      ],
    },
    {
      title: 'VEHICLE, BILLS & POWER',
      accent: '#ea580c',
      bgTint: '#ffedd5',
      headerIcon: <Car size={14} color="#ea580c" />,
      items: [
        { label: 'Vehicle Bluebook Tax & Fines', href: '/vehicle', icon: <Car size={13} color="#ea580c" /> },
        { label: 'EV vs Petrol Auto Loan EMI', href: '/auto-loan', icon: <Calculator size={13} color="#ea580c" /> },
        { label: 'Fuel Mileage & Trip Splitter', href: '/fuel', icon: <Fuel size={13} color="#ea580c" /> },
        { label: 'Driving License Written Exam', href: '/license-exam', icon: <ShieldCheck size={13} color="#ea580c" /> },
        { label: 'NEA Electricity Bill Calculator', href: '/nea', icon: <Zap size={13} color="#ea580c" /> },
        { label: 'Home Solar Panel & Net Metering', href: '/solar-requirement', icon: <Sparkles size={13} color="#ea580c" /> },
        { label: 'Inverter & Battery Backup Hours', href: '/battery-backup', icon: <BatteryCharging size={13} color="#ea580c" /> },
        { label: 'Khanepani Drinking Water Bill', href: '/khanepani', icon: <Droplets size={13} color="#ea580c" /> },
      ],
    },
    {
      title: 'EDUCATION, MATH & TEXT',
      accent: '#4f46e5',
      bgTint: '#e0e7ff',
      headerIcon: <GraduationCap size={14} color="#4f46e5" />,
      items: [
        { label: 'SEE & +2 (NEB) GPA Calculator', href: '/gpa', icon: <GraduationCap size={13} color="#4f46e5" /> },
        { label: 'University CGPA (TU / KU / PU)', href: '/cgpa', icon: <Award size={13} color="#4f46e5" /> },
        { label: 'University Attendance (75%/80%)', href: '/university-attendance', icon: <Calendar size={13} color="#4f46e5" /> },
        { label: 'Foreign Study NOC Tax (5%)', href: '/noc-tax', icon: <Globe size={13} color="#4f46e5" /> },
        { label: 'Scientific Math & GCD / LCM', href: '/scientific-calculator', icon: <Calculator size={13} color="#4f46e5" /> },
        { label: 'Statistics (SD) & Quadratic Solver', href: '/statistics-calculator', icon: <BarChart3 size={13} color="#4f46e5" /> },
        { label: 'Binary, Hex & Roman Converter', href: '/base-converter', icon: <Binary size={13} color="#4f46e5" /> },
        { label: 'Nepali & English Word Counter', href: '/word-counter', icon: <FileText size={13} color="#4f46e5" /> },
      ],
    },
    {
      title: 'HEALTH, AGE & CALENDAR',
      accent: '#e11d48',
      bgTint: '#ffe4e6',
      headerIcon: <HeartPulse size={14} color="#e11d48" />,
      items: [
        { label: 'Nepali Date Converter (BS ⇄ AD)', href: '/date', icon: <Calendar size={13} color="#e11d48" /> },
        { label: 'Bikram Sambat Exact Age Finder', href: '/age', icon: <Clock size={13} color="#e11d48" /> },
        { label: 'Nepali Pregnancy Due Date (BS)', href: '/pregnancy-due-date', icon: <HeartPulse size={13} color="#e11d48" /> },
        { label: 'Daily Calorie, BMR & Water Intake', href: '/calorie-calculator', icon: <Flame size={13} color="#e11d48" /> },
        { label: 'BMI & South Asian Ideal Weight', href: '/bmi', icon: <Scale size={13} color="#e11d48" /> },
        { label: 'US Navy Body Fat Percentage', href: '/body-fat', icon: <Activity size={13} color="#e11d48" /> },
        { label: '90-Minute Sleep Cycle Calculator', href: '/sleep-calculator', icon: <Clock size={13} color="#e11d48" /> },
        { label: 'Momo Plate Calorie & Protein', href: '/momo-calorie', icon: <Flame size={13} color="#e11d48" /> },
      ],
    },
    {
      title: 'CITIZEN, LEGAL & DAILY TOOLS',
      accent: '#7c3aed',
      bgTint: '#ede9fe',
      headerIcon: <ScrollText size={14} color="#7c3aed" />,
      items: [
        { label: 'Nepali Patro 2083 Calendar', href: '/calendar', icon: <Calendar size={13} color="#7c3aed" /> },
        { label: 'Loksewa Age Eligibility Checker', href: '/loksewa-age', icon: <ShieldCheck size={13} color="#7c3aed" /> },
        { label: 'e-Passport & Urgent Fee Guide', href: '/passport-fee', icon: <Globe size={13} color="#7c3aed" /> },
        { label: 'Legal Document Generators Hub', href: '/document-generators', icon: <ScrollText size={13} color="#7c3aed" /> },
        { label: 'Preeti to Unicode Converter', href: '/preeti', icon: <Keyboard size={13} color="#7c3aed" /> },
        { label: 'Universal & Dharni/Pau Converter', href: '/unit-converter', icon: <Scale size={13} color="#7c3aed" /> },
        { label: 'Shopping Discount & Bill Splitter', href: '/discount-calculator', icon: <Percent size={13} color="#7c3aed" /> },
        { label: 'Cryptographic Password Generator', href: '/password-generator', icon: <ShieldCheck size={13} color="#7c3aed" /> },
      ],
    },
  ];

  const toolsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Calculators & Tools Directory — Nepali Calc',
    description: 'Complete categorized directory of 72+ Nepal tax, banking, gold, land, NEPSE, construction, health, and citizen tools.',
    url: `${SITE_CONFIG.url}/tools`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: groups.flatMap((g) => g.items).map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.label,
        url: `${SITE_CONFIG.url}${item.href}`,
      })),
    },
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: 'clamp(28px, 4vw, 48px) 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsSchema) }}
      />
      <div className="container" style={{ maxWidth: '1140px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '26px' }}>
          <h1
            style={{
              fontSize: 'clamp(22px, 3.2vw, 30px)',
              fontWeight: 900,
              color: '#0f172a',
              margin: '0 0 6px',
              letterSpacing: '-0.02em',
            }}
          >
            All Calculators &amp; Tools Directory
          </h1>
          <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
            Complete categorized directory of 72+ Nepal tax, banking, gold, land, NEPSE, construction, health, and citizen tools.
          </p>
        </div>

        {/* Even, Symmetrical 3-Column Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px',
            alignItems: 'stretch',
          }}
        >
          {groups.map((group) => (
            <div
              key={group.title}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                padding: '20px 22px',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {/* Category Header with Icon */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '14px',
                  paddingBottom: '11px',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    backgroundColor: group.bgTint,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {group.headerIcon}
                </span>
                <h2
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: '#1d4ed8',
                    margin: 0,
                  }}
                >
                  {group.title}
                </h2>
              </div>

              {/* Uniform 8-Item List with Compact Icons & Single-Line Text */}
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  flex: 1,
                }}
              >
                {group.items.map((item) => (
                  <li key={item.href + item.label} style={{ minWidth: 0 }}>
                    <Link
                      href={item.href}
                      className="footer-link"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '9px',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#334155',
                        textDecoration: 'none',
                        lineHeight: 1.35,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <span
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '6px',
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
