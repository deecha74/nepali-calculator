'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  ReceiptText, 
  GraduationCap, 
  Calendar, 
  Landmark, 
  LineChart, 
  ArrowRight,
  Sparkles,
  Zap,
  Clock,
  Compass,
  CornerDownLeft
} from 'lucide-react';

import { useLanguage } from '@/components/LanguageContext';

export interface SearchToolItem {
  name: string;
  nepName: string;
  href: string;
  desc: string;
  category: string;
  keywords: string[];
  badge?: string;
}

export const ALL_SEARCHABLE_TOOLS: SearchToolItem[] = [
  {
    name: 'Land Malpot Registration & Capital Gains Tax (CGT)',
    nepName: 'मालपोत लिखत रजिष्ट्रेसन तथा पूँजीगत लाभकर',
    href: '/malpot',
    desc: 'Official DoLMA deed registration fees (with 25% female rebate) and 7.5%/10% seller CGT',
    category: 'Land & Utilities',
    keywords: ['malpot', 'land registration', 'cgt', 'capital gains', 'pass fee', 'jagga', 'likhit', 'dolma'],
    badge: 'New'
  },
  {
    name: 'Income Tax Calculator (FY 2083/84)',
    nepName: 'आयकर हिसाब (आ.व. २०८३/८४)',
    href: '/tax',
    desc: 'Salary tax brackets, single/married rebate, SSF & CIT exemptions',
    category: 'Tax & Labour',
    keywords: ['tax', 'income', 'salary', 'ird', 'ssf', 'cit', 'talab', 'kar', 'ayakar'],
    badge: 'Popular'
  },
  {
    name: 'TDS & Withholding Tax Calculator',
    nepName: 'स्रोतमा कर कट्टी (TDS) हिसाब',
    href: '/tds',
    desc: 'Section 88, 88Ka, 89 TDS on rent, consultancy, freight, contracts & reverse gross-up',
    category: 'Tax & Labour',
    keywords: ['tds', 'withholding', 'section 88', 'section 89', 'reverse tds', 'gross up', 'rent tax', 'consultancy', 'स्रोतमा कर'],
    badge: 'New'
  },
  {
    name: 'Schedule 2 Tax Depreciation Calculator (WDV)',
    nepName: 'अनुसूची-२ कर ह्रासकट्टी हिसाब',
    href: '/depreciation',
    desc: 'Block A-E WDV depreciation with 3-tier timing absorption (3/3, 2/3, 1/3) and 7% repairs limit',
    category: 'Tax & Labour',
    keywords: ['depreciation', 'schedule 2', 'wdv', 'block a', 'block b', 'timing rule', 'section 16', 'ह्रासकट्टी'],
    badge: 'New'
  },
  {
    name: 'Corporate Income Tax & Advance Tax (Section 94)',
    nepName: 'कम्पनी आयकर तथा अग्रिम कर (किस्ताबन्दी)',
    href: '/corporate-tax',
    desc: 'Pvt Ltd corporate tax rates (20%, 25%, 30%) with Section 94 advance tax instalments (Poush, Chaitra, Ashadh)',
    category: 'Tax & Labour',
    keywords: ['corporate tax', 'company tax', 'advance tax', 'section 94', 'pvt ltd', 'किस्ताबन्दी', 'अग्रिम कर'],
    badge: 'New'
  },
  {
    name: 'Driving License Written Exam (DOTM Quiz)',
    nepName: 'सवारी चालक लिखित परीक्षा (यातायात क्विज)',
    href: '/license-exam',
    desc: 'Official 500+ DOTM question bank, random 20 test & mock score',
    category: 'Citizen & Services',
    keywords: ['license', 'dotm', 'driving', 'exam', 'quiz', 'likhit', 'sawari', 'car', 'bike'],
    badge: 'Quiz'
  },
  {
    name: 'Nepali Patro 2083 (Bikram Sambat Calendar)',
    nepName: 'नेपाली पात्रो २०८३ (क्यालेन्डर र पञ्चाङ्ग)',
    href: '/calendar',
    desc: 'Interactive Bikram Sambat, Tithis, Dashain/Tihar dates, festivals & holidays',
    category: 'Citizen & Services',
    keywords: ['patro', 'calendar', 'nepali date', 'tithi', 'dashain', 'tihar', 'panchang', 'holiday'],
    badge: 'Patro'
  },
  {
    name: 'Date Converter (BS ⇄ AD)',
    nepName: 'मिति रूपान्तरण (वि.सं. ⇄ ई.सं.)',
    href: '/date',
    desc: 'Fast Bikram Sambat to Gregorian conversion with age calculation',
    category: 'Citizen & Services',
    keywords: ['date', 'converter', 'miti', 'bs to ad', 'ad to bs', 'bikram sambat'],
  },
  {
    name: 'Daily Rashifal (Horoscope)',
    nepName: 'दैनिक राशिफल (Horoscope)',
    href: '/rashifal',
    desc: 'Daily astrological forecasts, lucky numbers and colors for 12 signs',
    category: 'Citizen & Services',
    keywords: ['rashifal', 'horoscope', 'rashi', 'jyotish', 'mesh', 'brish', 'mithun'],
  },
  {
    name: 'Land Area Converter (Ropani ⇄ Bigha)',
    nepName: 'जग्गा नाप रूपान्तरण (रोपनी ⇄ बिघा)',
    href: '/land',
    desc: 'Convert Ropani-Aana-Paisa-Daam to Bigha-Kattha-Dhur and Sq. Feet',
    category: 'Land & Utilities',
    keywords: ['land', 'jagga', 'ropani', 'bigha', 'aana', 'kattha', 'dhur', 'paisa', 'sqft'],
    badge: 'Top'
  },
  {
    name: 'SIP Mutual Fund Compounding',
    nepName: 'एसआइपी म्युचुअल फण्ड कम्पाउन्डिङ',
    href: '/sip',
    desc: 'Monthly disciplined investment compounding return projector',
    category: 'Loans & Shares',
    keywords: ['sip', 'mutual fund', 'compounding', 'investment', 'bachat', 'shares'],
  },
  {
    name: 'Bank Loan EMI Calculator & Schedule',
    nepName: 'बैंक ऋण EMI किस्ता क्याल्कुलेटर',
    href: '/emi',
    desc: 'Home, auto & business loan monthly installments with amortization table',
    category: 'Loans & Shares',
    keywords: ['emi', 'loan', 'bank', 'interest', 'byaj', 'karja', 'home loan', 'auto loan'],
  },
  {
    name: 'NEPSE Broker Commission & CGT Calculator',
    nepName: 'नेप्से शेयर ब्रोकर हिसाब र पूँजीगत लाभकर',
    href: '/nepse',
    desc: 'SEBON fee, DP fee, broker commission slab (0.27%-0.40%) & capital gains tax',
    category: 'Loans & Shares',
    keywords: ['nepse', 'share', 'broker', 'cgt', 'sebon', 'stock', 'meroshare'],
  },
  {
    name: 'IPO Allotment Probability Calculator',
    nepName: 'आईपीओ बाँडफाँड सम्भावना क्याल्कुलेटर',
    href: '/ipo-allotment',
    desc: 'MeroShare 10-kitta allotment lottery odds based on applicant volume',
    category: 'Loans & Shares',
    keywords: ['ipo', 'allotment', 'meroshare', 'kitta', 'share', 'lottery'],
  },
  {
    name: 'Vehicle Bluebook Tax & Fines Calculator',
    nepName: 'सवारी ब्लुबुक वार्षिक कर तथा जरिवाना',
    href: '/vehicle',
    desc: 'Bagmati & all provincial annual tax rates for bike, scooter, car & EV',
    category: 'Land & Utilities',
    keywords: ['vehicle', 'bluebook', 'tax', 'bike', 'car', 'ev', 'sawari', 'yatayat', 'fine'],
  },
  {
    name: 'Live Gold & Silver Rates & Making Charge',
    nepName: 'सुनचाँदी लाइभ दर तथा जर्ती हिसाब',
    href: '/gold',
    desc: 'Real-time Tola and Gram pricing with jeweler making charge & wastage (Jarti)',
    category: 'Land & Utilities',
    keywords: ['gold', 'silver', 'sun', 'chandi', 'tola', 'jarti', 'jewel', 'rate', 'live'],
    badge: 'Live'
  },
  {
    name: 'Forex & Remittance Converter (NRB Live)',
    nepName: 'विदेशी मुद्रा विनिमय दर (नेपाल राष्ट्र बैंक)',
    href: '/forex',
    desc: 'Official NRB buying and selling rates for USD, AUD, EUR, GBP, AED, SAR',
    category: 'Loans & Shares',
    keywords: ['forex', 'currency', 'usd', 'nrb', 'remittance', 'dolar', 'exchange', 'npr'],
    badge: 'Live'
  },
  {
    name: 'NEA Electricity Bill Calculator',
    nepName: 'नेपाल विद्युत् प्राधिकरण बिजुली महसुल',
    href: '/nea',
    desc: 'Official 5A to 60A tier tariff slab calculator with rebate/penalty',
    category: 'Land & Utilities',
    keywords: ['nea', 'electricity', 'bijuli', 'current', 'unit', 'tariff', 'bill'],
  },
  {
    name: 'Drinking Water (Khanepani) Bill',
    nepName: 'खानेपानी महसुल क्याल्कुलेटर',
    href: '/khanepani',
    desc: 'KUKL & municipality water meter tariff and sewerage charges',
    category: 'Land & Utilities',
    keywords: ['water', 'khanepani', 'kukl', 'bill', 'meter'],
  },
  {
    name: 'Inverter & Battery Backup Hours',
    nepName: 'इन्भर्टर ब्याट्री ब्याकअप समय क्याल्कुलेटर',
    href: '/battery-backup',
    desc: 'Calculate runtime hours based on battery Ah, inverter VA, and home wattage',
    category: 'Land & Utilities',
    keywords: ['inverter', 'battery', 'backup', 'load', 'watt', 'runtime', 'ups'],
  },
  {
    name: 'Nepal Post & EMS Shipping Tariff',
    nepName: 'हुलाक पार्सल तथा एक्सप्रेस ढुवानी महसुल',
    href: '/postal-shipping',
    desc: 'Calculate domestic postage and overseas parcel postage worldwide',
    category: 'Citizen & Services',
    keywords: ['post', 'hulak', 'shipping', 'ems', 'parcel', 'courier', 'tariff'],
  },
  {
    name: 'Loksewa Typing Speed Test (WPM)',
    nepName: 'लोकसेवा टाइपिङ गति परीक्षण (WPM)',
    href: '/typing-test',
    desc: 'Benchmark your Nepali Unicode & English typing accuracy and speed',
    category: 'Citizen & Services',
    keywords: ['typing', 'speed', 'wpm', 'loksewa', 'unicode', 'preeti', 'test'],
  },
  {
    name: 'Red Cross Blood Donation Eligibility',
    nepName: 'रक्तदान योग्यता र समय अन्तराल',
    href: '/blood-donation',
    desc: 'Check next donation date (90 days interval) and blood group compatibility',
    category: 'Citizen & Services',
    keywords: ['blood', 'donation', 'raktadan', 'red cross', 'plasma', 'eligibility'],
  },
  {
    name: 'Fonepay / eSewa Payment QR Generator',
    nepName: 'फोनपे तथा इसेवा क्युआर कोड स्टिकर',
    href: '/qr-generator',
    desc: 'Generate high-resolution printable Nepal QR code standees for shops',
    category: 'Citizen & Services',
    keywords: ['qr', 'fonepay', 'esewa', 'payment', 'khalti', 'sticker', 'merchant'],
  },
  {
    name: 'Krishi Fertilizer & Seed Calculator',
    nepName: 'कृषि रासायनिक मल तथा बीउ मात्रा हिसाब',
    href: '/krishi-fertilizer',
    desc: 'Recommended Urea, DAP, and Potash dosage per Ropani or Bigha',
    category: 'Land & Utilities',
    keywords: ['krishi', 'fertilizer', 'mal', 'urea', 'dap', 'potash', 'kheti', 'rice'],
  },
  {
    name: 'e-Passport (राहदानी) Fee Calculator',
    nepName: 'ई-राहदानी (Passport) दस्तुर क्याल्कुलेटर',
    href: '/passport-fee',
    desc: 'Normal 34-page, 66-page, urgent fast-track and emergency passport fees',
    category: 'Citizen & Services',
    keywords: ['passport', 'rahadani', 'fee', 'urgent', 'dop', 'embassy'],
  },
  {
    name: 'Foreign Study NOC Tax (3%) Calculator',
    nepName: 'विदेश अध्ययन एनओसी (NOC) ३% शिक्षा कर',
    href: '/noc-tax',
    desc: 'MoEST No Objection Certificate education service tax and wire transfer fees',
    category: 'Tax & Labour',
    keywords: ['noc', 'foreign study', 'education tax', 'moest', 'abroad', 'university'],
  },
  {
    name: 'House Rental TDS (10%) Calculator',
    nepName: 'घरबहाल कर (१०% TDS) तथा भाडा सम्झौता',
    href: '/rent-tax',
    desc: 'Local ward municipality rent tax and IRD corporate rental TDS deduction',
    category: 'Tax & Labour',
    keywords: ['rent', 'gharbahal', 'tds', 'lease', 'flat', 'room', 'tax'],
  },
  {
    name: 'FD vs Debenture Yield Comparison',
    nepName: 'मुद्दती निक्षेप vs ऋणपत्र प्रतिफल तुलना',
    href: '/fd-vs-debenture',
    desc: 'Compare after-tax earnings of commercial bank fixed deposits vs debentures',
    category: 'Loans & Shares',
    keywords: ['fd', 'fixed deposit', 'debenture', 'bond', 'muddati', 'yield'],
  },
  {
    name: 'Preeti to Unicode Converter',
    nepName: 'प्रिती टु युनिकोड रूपान्तरण (Preeti to Unicode)',
    href: '/preeti',
    desc: 'Instant, private client-side converter between traditional Preeti and Unicode',
    category: 'Land & Utilities',
    keywords: ['preeti', 'unicode', 'font', 'nepali font', 'convert', 'type'],
  },
  {
    name: 'Nepali Number to Words Converter',
    nepName: 'अङ्कलाई नेपाली र अंग्रेजी अक्षरमा रूपान्तरण',
    href: '/number-to-words',
    desc: 'Generate formal Nepali words for bank cheques, vouchers, and receipts',
    category: 'Land & Utilities',
    keywords: ['number to words', 'cheque', 'akshar', 'rupaiyan', 'lakh', 'crore'],
  },
  {
    name: 'Labour Act Gratuity & Severance',
    nepName: 'श्रम ऐन उपदान तथा सञ्चित बिदा हिसाब',
    href: '/gratuity',
    desc: 'Official 8.33% monthly salary gratuity and unused home/sick leave cashout',
    category: 'Tax & Labour',
    keywords: ['gratuity', 'labour act', 'upadan', 'severance', 'leave', 'bida', 'shram'],
  },
  {
    name: 'Overtime (OT) 1.5x Pay Calculator',
    nepName: 'ओभरटाइम १.५ गुणा पारिश्रमिक हिसाब',
    href: '/overtime',
    desc: 'Nepal Labour Act hourly overtime calculation (1.5 times normal hourly rate)',
    category: 'Tax & Labour',
    keywords: ['overtime', 'ot', 'salary', 'labour act', 'hourly pay'],
  },
  {
    name: '13% VAT & Service Charge Calculator',
    nepName: '१३% भ्याट तथा सेवा शुल्क क्याल्कुलेटर',
    href: '/vat',
    desc: 'Forward & reverse VAT calculations, restaurant service charge breakdown',
    category: 'Tax & Labour',
    keywords: ['vat', 'bhyat', 'tax', 'service charge', 'bill', 'receipt'],
  },
  {
    name: 'Loan Eligibility (NRB 50% DSTI)',
    nepName: 'कर्जा योग्यता सीमा (DSTI ५०%)',
    href: '/loan-eligibility',
    desc: 'Calculate maximum bank borrowing limit under central bank 50% DSTI rules',
    category: 'Loans & Shares',
    keywords: ['loan eligibility', 'dsti', 'borrowing limit', 'nrb', 'salary loan'],
  },
  {
    name: 'EPF, CIT & Pension Projection',
    nepName: 'कर्मचारी सञ्चय कोष, नागरिक लगानी कोष र पेन्सन',
    href: '/pension',
    desc: 'Retirement corpus projection with compound interest and pension gratuity',
    category: 'Loans & Shares',
    keywords: ['epf', 'cit', 'pension', 'sanchaya kosh', 'nigrani', 'retirement'],
  },
  {
    name: 'Phone MDMS & Airport Customs Duty',
    nepName: 'मोबाइल MDMS दर्ता तथा त्रिभुवन विमानस्थल भन्सार',
    href: '/customs',
    desc: 'Baggage rules, customs duty percentages and free phone quota under NTA MDMS',
    category: 'Tax & Labour',
    keywords: ['customs', 'mdms', 'airport', 'phone', 'mobile', 'duty', 'bhansar'],
  },
  {
    name: 'Fuel Mileage & Trip Ride Splitter',
    nepName: 'इन्धन र यात्रा खर्च बाँडफाँड क्याल्कुलेटर',
    href: '/fuel',
    desc: 'Calculate petrol/diesel cost and split travel expenses per passenger',
    category: 'Land & Utilities',
    keywords: ['fuel', 'petrol', 'diesel', 'mileage', 'trip', 'split', 'travel'],
  },
  {
    name: 'Desi Sayakada (२/३ रुपैयाँ) Interest',
    nepName: 'सयकडा ब्याज तथा गाउँले हिसाब',
    href: '/interest',
    desc: 'Monthly informal local interest (२-३ रुपैयाँ सयकडा) vs annual bank compounding',
    category: 'Loans & Shares',
    keywords: ['sayakada', 'interest', 'desi byaj', 'byaj', 'compound'],
  },
  {
    name: 'Traditional Units (धार्नी, माना, पाथी)',
    nepName: 'परम्परागत नेपाली तौल र नाप रूपान्तरण',
    href: '/traditional-units',
    desc: 'Convert Dharni, Sher, Pau, Tola to Kilograms and Mana, Pathi, Muri to Liters',
    category: 'Land & Utilities',
    keywords: ['traditional units', 'dharni', 'mana', 'pathi', 'muri', 'pau', 'sher'],
  },
  {
    name: 'BMI & Healthy Weight Calculator',
    nepName: 'बीएमआई (BMI) तथा आदर्श तौल हिसाब',
    href: '/bmi',
    desc: 'Body Mass Index calculator for South Asian demographic health standards',
    category: 'Land & Utilities',
    keywords: ['bmi', 'weight', 'health', 'height', 'fitness'],
  },
  {
    name: 'Inflation & Purchasing Power Calculator',
    nepName: 'मुद्रास्फीति र नेपाली रुपैयाँको क्रयशक्ति',
    href: '/inflation',
    desc: 'Historical value of Rs 100 in Nepal from 2050 BS to present',
    category: 'Loans & Shares',
    keywords: ['inflation', 'purchasing power', 'rupee value', 'cpi'],
  },
  {
    name: 'Official Acts & Gazettes Hub',
    nepName: 'सरकारी ऐन, राजपत्र तथा कानुनी दस्ताबेज',
    href: '/documents',
    desc: 'Direct PDF downloads of Finance Act 2083, Labour Act 2074 & IRD directives',
    category: 'Citizen & Services',
    keywords: ['acts', 'gazette', 'rajpatra', 'finance act', 'labour act', 'laws', 'pdf'],
  }
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global Esc key listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      // Return top popular suggestions
      return ALL_SEARCHABLE_TOOLS.slice(0, 8);
    }
    return ALL_SEARCHABLE_TOOLS.filter(item => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.nepName.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.keywords.some(k => k.toLowerCase().includes(q))
      );
    });
  }, [query]);

  // Handle arrow key navigation & enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filtered[selectedIndex];
      if (target) {
        router.push(target.href);
        onClose();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '60px 16px 20px',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              maxWidth: '640px',
              backgroundColor: '#fdfbf7',
              borderRadius: '20px',
              border: '1.5px solid #d4af37',
              boxShadow: '0 25px 60px rgba(44, 34, 20, 0.22), inset 0 0 0 1px rgba(212, 175, 55, 0.25)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '80vh',
            }}
            onClick={(e) => e.stopPropagation()}
          >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #e2e8f0',
            gap: '12px',
          }}
        >
          <Search size={20} color="#003893" style={{ flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder={t('Search all 35+ tools (e.g. malpot, tax, patro, license, gold, emi, ropani)...', 'सबै ३५+ उपकरणहरू खोज्नुहोस् (जस्तै: मालपोत, आयकर, पात्रो, ब्लुबुक, सुन, ईएमआई)...')}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              fontWeight: 600,
              color: '#0f172a',
              backgroundColor: 'transparent',
            }}
          />
          {query ? (
            <button
              type="button"
              onClick={() => { setQuery(''); inputRef.current?.focus(); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px' }}
            >
              <X size={18} />
            </button>
          ) : (
            <kbd
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#64748b',
                backgroundColor: '#f1f5f9',
                padding: '3px 7px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                flexShrink: 0
              }}
            >
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          style={{
            overflowY: 'auto',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ padding: '36px 20px', textAlign: 'center', color: '#64748b' }}>
              <Compass size={32} color="#cbd5e1" style={{ margin: '0 auto 10px' }} />
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>
                {t(`No tools found for "${query}"`, `कुनै उपकरण फेला परेन ("${query}")`)}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                {t('Please try searching with another keyword or browse the homepage.', 'कृपया अर्को शब्द खोज्नुहोस् वा गृहपृष्ठमा हेर्नुहोस्।')}
              </div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', padding: '6px 12px 4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {query 
                  ? t(`Search Results (${filtered.length})`, `खोज परिणामहरू (${filtered.length})`) 
                  : t('Popular Tools', 'लोकप्रिय उपकरणहरू (Popular Tools)')}
              </div>

              {filtered.map((tool, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={onClose}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      backgroundColor: isSelected ? '#eff6ff' : 'transparent',
                      border: isSelected ? '1px solid #bfdbfe' : '1px solid transparent',
                      textDecoration: 'none',
                      transition: 'all 0.12s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          backgroundColor: isSelected ? '#dbeafe' : '#f1f5f9',
                          color: '#003893',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {tool.category === 'Tax & Labour' ? <ReceiptText size={18} /> :
                         tool.category === 'Citizen & Services' ? (tool.href.includes('calendar') ? <Calendar size={18} /> : <GraduationCap size={18} />) :
                         tool.category === 'Loans & Shares' ? <LineChart size={18} /> : <Landmark size={18} />}
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 800, color: isSelected ? '#003893' : '#0f172a' }}>
                            {tool.nepName}
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {tool.name} • {tool.desc}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, marginLeft: '12px' }}>
                      <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>
                        {tool.category}
                      </span>
                      <ArrowRight size={14} color={isSelected ? '#003893' : '#cbd5e1'} />
                    </div>
                  </Link>
                );
              })}
            </>
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div
          style={{
            padding: '10px 20px',
            backgroundColor: '#f8fafc',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11.5px',
            color: '#64748b',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span><kbd style={{ padding: '1px 5px', borderRadius: '4px', backgroundColor: '#e2e8f0', color: '#334155', fontWeight: 700 }}>↑</kbd> <kbd style={{ padding: '1px 5px', borderRadius: '4px', backgroundColor: '#e2e8f0', color: '#334155', fontWeight: 700 }}>↓</kbd> {t('Navigate', 'नेभिगेसन')}</span>
            <span><kbd style={{ padding: '1px 5px', borderRadius: '4px', backgroundColor: '#e2e8f0', color: '#334155', fontWeight: 700 }}>↵</kbd> {t('Select', 'चयन')}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={12} color="#f59e0b" />
            <span>{t('All 35+ Official Nepal Tools', 'नेपालका सबै ३५+ आधिकारिक उपकरणहरू')}</span>
          </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  );
}
