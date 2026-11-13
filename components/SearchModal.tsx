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
  TrendingUp, 
  ArrowRight,
  Sparkles,
  Zap,
  Clock,
  Compass,
  CornerDownLeft,
  Home,
  Car,
  HeartPulse,
  Scale,
  ShieldCheck,
  Percent,
  FileText,
  DollarSign,
  Coins,
  Calculator,
  Send,
  Building2,
  Sprout,
  Activity,
  Keyboard,
  Globe,
  PiggyBank,
  Flame,
  BatteryCharging,
  Droplets,
  Binary
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export interface SearchToolItem {
  name: string;
  nepName: string;
  href: string;
  category: string;
  nepCategory: string;
  keywords: string[];
  iconType: 'tax' | 'gold' | 'bank' | 'share' | 'land' | 'vehicle' | 'edu' | 'health' | 'citizen' | 'calc' | 'power';
  isPopular?: boolean;
}

export const ALL_SEARCHABLE_TOOLS: SearchToolItem[] = [
  // Tax & Salary
  {
    name: 'Income Tax Calculator (FY 2083/84)',
    nepName: 'आयकर हिसाब (आ.व. २०८३/८४)',
    href: '/tax',
    category: 'Tax & Salary',
    nepCategory: 'कर तथा तलब',
    keywords: ['tax', 'income tax', 'salary', 'ird', 'ssf', 'cit', 'talab', 'kar', 'ayakar', 'आयकर', 'कर स्ल्याब'],
    iconType: 'tax',
    isPopular: true,
  },
  {
    name: 'Nepal Salary & Net Take-Home',
    nepName: 'मासिक तलब तथा खुद बचत हिसाब',
    href: '/salary',
    category: 'Tax & Salary',
    nepCategory: 'कर तथा तलब',
    keywords: ['salary', 'take home', 'payroll', 'net salary', 'gross salary', 'talab', 'मासिक तलब', 'तलब कर'],
    iconType: 'tax',
    isPopular: true,
  },
  {
    name: 'TDS & Withholding Tax Calculator',
    nepName: 'स्रोतमा कर कट्टी (TDS) हिसाब',
    href: '/tds',
    category: 'Tax & Salary',
    nepCategory: 'कर तथा तलब',
    keywords: ['tds', 'withholding', 'section 88', 'section 89', 'reverse tds', 'gross up', 'rent tax', 'consultancy', 'स्रोतमा कर'],
    iconType: 'tax',
    isPopular: true,
  },
  {
    name: '13% VAT & Service Charge Calculator',
    nepName: '१३% मूल्य अभिवृद्धि कर (VAT) हिसाब',
    href: '/vat',
    category: 'Tax & Salary',
    nepCategory: 'कर तथा तलब',
    keywords: ['vat', 'service charge', '13% vat', 'reverse vat', 'gross amount', 'बिल कर', 'भ्याट हिसाब'],
    iconType: 'tax',
  },
  {
    name: 'Corporate & Advance Tax (Section 94)',
    nepName: 'कम्पनी आयकर तथा अग्रिम कर (किस्ताबन्दी)',
    href: '/corporate-tax',
    category: 'Tax & Salary',
    nepCategory: 'कर तथा तलब',
    keywords: ['corporate tax', 'company tax', 'advance tax', 'section 94', 'pvt ltd', 'किस्ताबन्दी', 'अग्रिम कर', 'कम्पनी कर'],
    iconType: 'tax',
  },
  {
    name: 'Schedule 2 Tax Depreciation (WDV)',
    nepName: 'अनुसूची-२ कर ह्रासकट्टी हिसाब (WDV)',
    href: '/depreciation',
    category: 'Tax & Salary',
    nepCategory: 'कर तथा तलब',
    keywords: ['depreciation', 'schedule 2', 'wdv', 'block a', 'block b', 'timing rule', 'section 16', 'ह्रासकट्टी'],
    iconType: 'tax',
  },

  // Customs & Baggage
  {
    name: 'TIA Airport Baggage Customs Duty',
    nepName: 'विमानस्थल लगेज तथा भन्सार महसुल क्याल्कुलेटर',
    href: '/customs/airport-baggage',
    category: 'Customs & Trade',
    nepCategory: 'भन्सार तथा सामान',
    keywords: ['airport baggage', 'customs duty', 'tia airport', 'gold limit', 'tv customs', 'iphone tax', 'dubai to nepal', 'भन्सार महसुल'],
    iconType: 'calc',
    isPopular: true,
  },
  {
    name: 'Gold Baggage Allowance Nepal',
    nepName: 'विदेशबाट सुन ल्याउँदा भन्सार छुट तथा नियम',
    href: '/how-much-gold-can-you-bring-to-nepal',
    category: 'Customs & Trade',
    nepCategory: 'भन्सार तथा सामान',
    keywords: ['gold allowance', 'bring gold to nepal', '50g gold female', '25g gold male', 'gold customs', 'विदेशबाट सुन'],
    iconType: 'gold',
    isPopular: true,
  },
  {
    name: 'Mobile MDMS & Customs Duty',
    nepName: 'मोबाइल दर्ता (MDMS) तथा भन्सार महसुल',
    href: '/customs',
    category: 'Customs & Trade',
    nepCategory: 'भन्सार तथा सामान',
    keywords: ['customs', 'mdms', 'mobile tax', 'iphone customs', 'laptop duty', 'nta mdms', 'एमडीएमएस'],
    iconType: 'calc',
  },
  {
    name: 'Foreign Study NOC Tax (5%)',
    nepName: 'विदेश अध्ययन NOC तथा शिक्षा सेवा कर (५%)',
    href: '/noc-tax',
    category: 'Customs & Trade',
    nepCategory: 'भन्सार तथा सामान',
    keywords: ['noc', 'noc tax', 'abroad study', 'education tax', 'moest noc', 'australia tuition', 'एनओसी कर'],
    iconType: 'edu',
  },

  // Gold & Forex
  {
    name: 'Live Gold & Silver Price Today',
    nepName: 'नेपाल सुनचाँदीको ताजा बजार भाउ',
    href: '/gold',
    category: 'Gold & Forex',
    nepCategory: 'सुन तथा विनिमय',
    keywords: ['gold', 'silver', 'tola', 'sunko vau', 'chandi', 'fenegosida', 'hallmark', 'सुनको भाउ', 'चाँदीको भाउ'],
    iconType: 'gold',
    isPopular: true,
  },
  {
    name: 'Live Silver Rate & Converter',
    nepName: 'चाँदीको लाइभ मूल्य तथा रूपान्तरण',
    href: '/silver',
    category: 'Gold & Forex',
    nepCategory: 'सुन तथा विनिमय',
    keywords: ['silver', 'chandi', 'silver rate today', 'silver tola', 'चाँदी'],
    iconType: 'gold',
  },
  {
    name: '100-Year Gold Price History Nepal',
    nepName: 'नेपालमा १०० वर्षको सुनको ऐतिहासिक भाउ',
    href: '/gold/history',
    category: 'Gold & Forex',
    nepCategory: 'सुन तथा विनिमय',
    keywords: ['gold history', 'historical gold rate', 'gold price 2050', 'gold chart nepal', 'ऐतिहासिक सुन'],
    iconType: 'gold',
  },
  {
    name: 'NRB Live Forex & Currency Converter',
    nepName: 'नेपाल राष्ट्र बैंक ताजा विदेशी मुद्रा विनिमय दर',
    href: '/forex',
    category: 'Gold & Forex',
    nepCategory: 'सुन तथा विनिमय',
    keywords: ['forex', 'currency', 'usd to npr', 'aed to npr', 'qar to npr', 'exchange rate', 'nrb', 'विदेशी मुद्रा', 'डलर भाउ'],
    iconType: 'gold',
    isPopular: true,
  },
  {
    name: 'Remittance In-Hand Calculator',
    nepName: 'विदेशबाट पैसा पठाउँदा हात पर्ने रकम',
    href: '/remittance-calculator',
    category: 'Gold & Forex',
    nepCategory: 'सुन तथा विनिमय',
    keywords: ['remittance', 'ime', 'prabhu remit', 'western union', 'send money', 'विदेशबाट पैसा', 'रेमिट्यान्स'],
    iconType: 'gold',
  },

  // Banking & Loans
  {
    name: 'Bank Loan EMI Calculator',
    nepName: 'बैंक लोन मासिक किस्ता (EMI) क्याल्कुलेटर',
    href: '/emi',
    category: 'Banking & Loans',
    nepCategory: 'बैंक तथा कर्जा',
    keywords: ['emi', 'loan', 'bank loan', 'interest', 'monthly payment', 'ghar karja', 'किस्ता', 'ऋण', 'ईएमआई'],
    iconType: 'bank',
    isPopular: true,
  },
  {
    name: 'Commercial Bank Home Loan Comparison',
    nepName: 'वाणिज्य बैंकहरूको घर कर्जा ब्याजदर तुलना',
    href: '/emi/banks',
    category: 'Banking & Loans',
    nepCategory: 'बैंक तथा कर्जा',
    keywords: ['nabil home loan', 'global ime home loan', 'nic asia loan', 'bank rates comparison', 'बैंक तुलना'],
    iconType: 'bank',
  },
  {
    name: 'Nepal Home Loan & NRB LTV Ratio',
    nepName: 'घर कर्जा तथा नेपाल राष्ट्र बैंक धितो सीमा',
    href: '/nepal-home-loan',
    category: 'Banking & Loans',
    nepCategory: 'बैंक तथा कर्जा',
    keywords: ['home loan', 'housing loan', 'mortgage', 'down payment', 'ghar karja', 'घर कर्जा'],
    iconType: 'bank',
  },
  {
    name: 'Auto & EV Vehicle Loan EMI',
    nepName: 'सवारी तथा विद्युतीय (EV) गाडी कर्जा किस्ता',
    href: '/auto-loan',
    category: 'Banking & Loans',
    nepCategory: 'बैंक तथा कर्जा',
    keywords: ['auto loan', 'car loan', 'ev loan', 'bike emi', 'sawari karja', 'गाडी कर्जा'],
    iconType: 'bank',
  },
  {
    name: 'Bank Loan Eligibility (50% DSTI)',
    nepName: 'कर्जा योग्यता तथा पारिवारिक आम्दानी मापदण्ड',
    href: '/loan-eligibility',
    category: 'Banking & Loans',
    nepCategory: 'बैंक तथा कर्जा',
    keywords: ['loan eligibility', 'dsti', 'dbr', 'nrb income rule', 'borrowing capacity', 'ऋण योग्यता'],
    iconType: 'bank',
  },
  {
    name: 'Fixed Deposit vs Debenture Yield',
    nepName: 'मुद्दती निक्षेप vs बैंक ऋणपत्र प्रतिफल तुलना',
    href: '/fd-vs-debenture',
    category: 'Banking & Loans',
    nepCategory: 'बैंक तथा कर्जा',
    keywords: ['fd vs debenture', 'fixed deposit', 'debenture return', 'rinpatra', 'मुद्दती vs ऋणपत्र'],
    iconType: 'bank',
  },
  {
    name: 'Nepali Byaj & Bank Fixed Deposit',
    nepName: 'नेपाली ब्याज तथा बैंक मुद्दती खाता हिसाब',
    href: '/interest',
    category: 'Banking & Loans',
    nepCategory: 'बैंक तथा कर्जा',
    keywords: ['interest', 'fd', 'fixed deposit', 'simple interest', 'compound interest', 'मुद्दती खाता', 'ब्याज हिसाब'],
    iconType: 'bank',
  },
  {
    name: 'Village Monthly Byaj (Sayakada)',
    nepName: 'गाउँघरको सयकडा ब्याज (२, ३) हिसाब',
    href: '/village-interest',
    category: 'Banking & Loans',
    nepCategory: 'बैंक तथा कर्जा',
    keywords: ['sayakada', 'village interest', 'local byaj', 'sayakada 2', 'sayakada 3', 'सयकडा ब्याज', 'साउँ ब्याज'],
    iconType: 'bank',
  },
  {
    name: 'Savings Goal & Wealth Planner',
    nepName: 'बचत लक्ष्य तथा चक्रवृद्धि योजनाकार',
    href: '/savings-goal',
    category: 'Banking & Loans',
    nepCategory: 'बैंक तथा कर्जा',
    keywords: ['savings goal', 'wealth planner', 'compound interest', 'crorepati calculator', 'बचत लक्ष्य'],
    iconType: 'bank',
  },
  {
    name: 'EPF / Sanchaya Kosh Calculator',
    nepName: 'कर्मचारी सञ्चय कोष (EPF) हिसाब',
    href: '/provident-fund',
    category: 'Banking & Loans',
    nepCategory: 'बैंक तथा कर्जा',
    keywords: ['epf', 'provident fund', 'sanchaya kosh', '80g deduction', 'सञ्चय कोष'],
    iconType: 'bank',
  },
  {
    name: 'CIT & Government Pension Calculator',
    nepName: 'नागरिक लगानी कोष (CIT) तथा निवृत्तिभरण',
    href: '/pension',
    category: 'Banking & Loans',
    nepCategory: 'बैंक तथा कर्जा',
    keywords: ['pension', 'cit', 'nigarana lagani kosh', 'retirement fund', 'निवृत्तिभरण', 'पेन्सन'],
    iconType: 'bank',
  },
  {
    name: 'Gratuity & Severance Pay',
    nepName: 'उपदान (Gratuity) तथा सेवा सुविधा हिसाब',
    href: '/gratuity',
    category: 'Banking & Loans',
    nepCategory: 'बैंक तथा कर्जा',
    keywords: ['gratuity', 'labour act 2074', 'severance', 'service compensation', 'उपदान'],
    iconType: 'bank',
  },
  {
    name: 'Overtime (OT) Pay Calculator',
    nepName: 'अतिरिक्त काम (OT) तथा पारिश्रमिक हिसाब',
    href: '/overtime',
    category: 'Banking & Loans',
    nepCategory: 'बैंक तथा कर्जा',
    keywords: ['overtime', 'ot pay', 'labour law nepal', '1.5x salary', 'अतिरिक्त काम'],
    iconType: 'bank',
  },
  {
    name: 'Foreign Employment & SSF Quota',
    nepName: 'वैदेशिक रोजगार तथा सामाजिक सुरक्षा कोष (SSF)',
    href: '/foreign-employment',
    category: 'Banking & Loans',
    nepCategory: 'बैंक तथा कर्जा',
    keywords: ['foreign employment', 'ssf quota', 'shram swikriti', 'ipo quota', 'वैदेशिक रोजगार'],
    iconType: 'bank',
  },

  // NEPSE & Shares
  {
    name: 'NEPSE Share Profit & Broker Fee',
    nepName: 'नेप्से सेयर नाफा तथा ब्रोकर कमिसन हिसाब',
    href: '/nepse',
    category: 'NEPSE & Shares',
    nepCategory: 'सेयर तथा लगानी',
    keywords: ['nepse', 'share', 'stock', 'broker commission', 'cgt', 'sebon fee', 'सेयर', 'ब्रोकर कमिसन', 'नाफा'],
    iconType: 'share',
    isPopular: true,
  },
  {
    name: 'NEPSE WACC & Average Price',
    nepName: 'नेप्से भारित औसत लागत (WACC) हिसाब',
    href: '/nepse-wacc',
    category: 'NEPSE & Shares',
    nepCategory: 'सेयर तथा लगानी',
    keywords: ['wacc', 'meroshare wacc', 'share average', 'purchase cost', 'वाक हिसाब'],
    iconType: 'share',
    isPopular: true,
  },
  {
    name: 'Right Share & Bonus Price Adjustment',
    nepName: 'हकप्रद तथा बोनस सेयर मूल्य समायोजन',
    href: '/right-share',
    category: 'NEPSE & Shares',
    nepCategory: 'सेयर तथा लगानी',
    keywords: ['right share', 'bonus share', 'price adjustment', 'book closure', 'हकप्रद सेयर', 'बोनस सेयर'],
    iconType: 'share',
  },
  {
    name: 'IPO Allotment Luck Probability',
    nepName: 'आईपीओ (IPO) पर्ने सम्भावना जाँच',
    href: '/ipo-allotment',
    category: 'NEPSE & Shares',
    nepCategory: 'सेयर तथा लगानी',
    keywords: ['ipo', 'ipo allotment', 'meroshare', 'lottery probability', 'आईपीओ नतिजा'],
    iconType: 'share',
  },
  {
    name: 'SIP Compounding & Mutual Fund',
    nepName: 'मासिक एसआईपी (SIP) तथा म्युचुअल फण्ड प्रतिफल',
    href: '/sip',
    category: 'NEPSE & Shares',
    nepCategory: 'सेयर तथा लगानी',
    keywords: ['sip', 'mutual fund', 'systematic investment', 'compounding', 'एसआईपी'],
    iconType: 'share',
  },
  {
    name: 'CAGR & Investment Doubling (Rule of 72)',
    nepName: 'वार्षिक चक्रवृद्धि वृद्धिदर (CAGR) हिसाब',
    href: '/cagr',
    category: 'NEPSE & Shares',
    nepCategory: 'सेयर तथा लगानी',
    keywords: ['cagr', 'compound annual growth', 'rule of 72', 'money double', 'लगानी दोब्बर'],
    iconType: 'share',
  },
  {
    name: 'Inflation & Purchasing Power Calculator',
    nepName: 'मुद्रास्फीति (महँगी) तथा क्रयशक्ति क्याल्कुलेटर',
    href: '/inflation',
    category: 'NEPSE & Shares',
    nepCategory: 'सेयर तथा लगानी',
    keywords: ['inflation', 'purchasing power', 'rupee value', 'cpi nepal', 'महँगी हिसाब'],
    iconType: 'share',
  },
  {
    name: 'Cheque Number to Words (NPR)',
    nepName: 'चेकको रकम अक्षरमा रूपान्तरण (अंक देखि अक्षर)',
    href: '/number-to-words',
    category: 'NEPSE & Shares',
    nepCategory: 'सेयर तथा लगानी',
    keywords: ['number to words', 'cheque writer', 'in words npr', 'rupaiya aksharema', 'अक्षरमा रूपान्तरण'],
    iconType: 'calc',
  },

  // Land & Real Estate
  {
    name: 'Land Malpot & Capital Gains Tax (CGT)',
    nepName: 'मालपोत लिखत रजिस्ट्रेसन तथा पूँजीगत लाभकर',
    href: '/malpot',
    category: 'Real Estate',
    nepCategory: 'जग्गा तथा घर',
    keywords: ['malpot', 'land registration', 'cgt', 'capital gains', 'pass fee', 'jagga pass', 'मालपोत लिखत', 'रजिष्ट्रेसन'],
    iconType: 'land',
    isPopular: true,
  },
  {
    name: 'Land Converter (Ropani ⇄ Bigha ⇄ Sq.Ft)',
    nepName: 'जग्गा नाप रूपान्तरण (रोपनी, आना, बिघा, कट्ठा)',
    href: '/land',
    category: 'Real Estate',
    nepCategory: 'जग्गा तथा घर',
    keywords: ['land', 'ropani', 'aana', 'paisa', 'daam', 'bigha', 'katha', 'dhur', 'sqft', 'जग्गा नाप', 'रोपनी', 'बिघा'],
    iconType: 'land',
    isPopular: true,
  },
  {
    name: 'Road Deduction Calculator (Bato Katta)',
    nepName: 'बाटो कट्टा तथा प्लटिङ जग्गा कटौती हिसाब',
    href: '/bato-katta',
    category: 'Real Estate',
    nepCategory: 'जग्गा तथा घर',
    keywords: ['bato katta', 'road deduction', 'land plotting', 'right of way', 'बाटो कट्टा'],
    iconType: 'land',
  },
  {
    name: 'Municipal Property Tax (Ghar Jagga Kar)',
    nepName: 'एकीकृत सम्पत्ति तथा घरजग्गा कर हिसाब',
    href: '/property-tax',
    category: 'Real Estate',
    nepCategory: 'जग्गा तथा घर',
    keywords: ['property tax', 'ghar kar', 'kmc tax', 'ward tax', 'sampatti kar', 'सम्पत्ति कर', 'घरजग्गा कर'],
    iconType: 'land',
  },
  {
    name: 'House Rent Tax (10% Bahal Kar)',
    nepName: 'घरबहाल कर (१०% स्थानीय तह कर) हिसाब',
    href: '/rent-tax',
    category: 'Real Estate',
    nepCategory: 'जग्गा तथा घर',
    keywords: ['rent tax', 'bahal kar', 'house rent tax', 'municipality rent tax', 'घरबहाल कर'],
    iconType: 'land',
  },
  {
    name: 'House Construction Cost & Rod Estimator',
    nepName: 'घर निर्माण कुल लागत तथा रड-सिमेन्ट इस्टिमेट',
    href: '/house-construction',
    category: 'Real Estate',
    nepCategory: 'जग्गा तथा घर',
    keywords: ['house construction', 'building cost', 'dhalan', 'steel estimation', 'cement bags', 'घर बनाउने खर्च'],
    iconType: 'land',
    isPopular: true,
  },
  {
    name: 'Paint, Wall Brick & M20 Concrete',
    nepName: 'रङरोगन खर्च, गारोको इँटा तथा ढलान अनुपात',
    href: '/paint-cost',
    category: 'Real Estate',
    nepCategory: 'जग्गा तथा घर',
    keywords: ['paint cost', 'brick calculator', 'concrete mix', 'm20 ratio', 'putty primer', 'इँटा संख्या', 'रङ खर्च'],
    iconType: 'land',
  },
  {
    name: 'Krishi Fertilizer & Seed Dosage',
    nepName: 'कृषि मलखाद (युरिया, डीएपी, पोटास) मात्रा हिसाब',
    href: '/krishi-fertilizer',
    category: 'Real Estate',
    nepCategory: 'जग्गा तथा घर',
    keywords: ['fertilizer', 'urea', 'dap', 'potash', 'krishi', 'crop dosage', 'मलखाद हिसाब'],
    iconType: 'land',
  },

  // Vehicle & Utilities
  {
    name: 'Vehicle Bluebook Road Tax & Fines',
    nepName: 'सवारी ब्लुबुक नवीकरण कर तथा जरिवाना हिसाब',
    href: '/vehicle',
    category: 'Vehicles & Power',
    nepCategory: 'सवारी तथा बिल',
    keywords: ['vehicle tax', 'bluebook renewal', 'bike tax', 'car tax', 'yatayat fine', 'sawari kar', 'ब्लुबुक कर', 'सवारी कर'],
    iconType: 'vehicle',
    isPopular: true,
  },
  {
    name: 'Fuel Mileage & Trip Expense Splitter',
    nepName: 'इन्धन माइलेज तथा यात्रा खर्च बाँडफाँड',
    href: '/fuel',
    category: 'Vehicles & Power',
    nepCategory: 'सवारी तथा बिल',
    keywords: ['fuel', 'petrol', 'diesel', 'trip cost', 'mileage', 'noc price', 'इन्धन खर्च', 'माइलेज'],
    iconType: 'vehicle',
  },
  {
    name: 'Driving License Written Exam (DOTM Quiz)',
    nepName: 'सवारी चालक लिखित परीक्षा (यातायात ५००+ क्विज)',
    href: '/license-exam',
    category: 'Vehicles & Power',
    nepCategory: 'सवारी तथा बिल',
    keywords: ['license exam', 'dotm quiz', 'driving test', 'likhit pariksha', 'कार बाइक लिखित'],
    iconType: 'vehicle',
  },
  {
    name: 'NEA Electricity Bill Calculator',
    nepName: 'नेपाल विद्युत प्राधिकरण (NEA) बिजुली बिल हिसाब',
    href: '/nea',
    category: 'Vehicles & Power',
    nepCategory: 'सवारी तथा बिल',
    keywords: ['nea', 'electricity bill', 'bijuli bill', 'meter 5a', 'unit rate', 'विद्युत महसुल', 'बिजुली बिल'],
    iconType: 'power',
    isPopular: true,
  },
  {
    name: 'Khanepani Drinking Water Bill',
    nepName: 'खानेपानी महसुल तथा ढल सेवा शुल्क हिसाब',
    href: '/khanepani',
    category: 'Vehicles & Power',
    nepCategory: 'सवारी तथा बिल',
    keywords: ['khanepani', 'kukl', 'water bill', 'pipe size', 'sewerage charge', 'खानेपानी महसुल'],
    iconType: 'power',
  },
  {
    name: 'Home Solar Panel & Net Metering',
    nepName: 'घरको सौर्य ऊर्जा (सोलार) तथा नेट मिटरिङ हिसाब',
    href: '/solar-requirement',
    category: 'Vehicles & Power',
    nepCategory: 'सवारी तथा बिल',
    keywords: ['solar requirement', 'rooftop solar', 'net metering nea', 'solar kw', 'सौर्य ऊर्जा'],
    iconType: 'power',
  },
  {
    name: 'Inverter & Battery Backup Hours',
    nepName: 'इन्भर्टर तथा ब्याट्री ब्याकअप समय क्याल्कुलेटर',
    href: '/battery-backup',
    category: 'Vehicles & Power',
    nepCategory: 'सवारी तथा बिल',
    keywords: ['battery backup', 'inverter runtime', 'load shedding', 'ah battery', 'ब्याट्री ब्याकअप'],
    iconType: 'power',
  },

  // Education & Academic
  {
    name: 'SEE & +2 (NEB) GPA Calculator',
    nepName: 'एसईई तथा कक्षा ११/१२ GPA क्याल्कुलेटर',
    href: '/gpa',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['gpa', 'see gpa', 'neb gpa', 'class 12', 'grading system', 'एसईई जीपिए', 'ग्रेडिङ'],
    iconType: 'edu',
    isPopular: true,
  },
  {
    name: 'University CGPA (TU, KU, PU, PoU)',
    nepName: 'विश्वविद्यालय CGPA तथा इन्जिनियरिङ GPA',
    href: '/cgpa',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['cgpa', 'tu ioe cgpa', 'ku gpa', 'engineering percentage', 'semester gpa', 'सिजिपिए'],
    iconType: 'edu',
  },
  {
    name: 'University Attendance (75% / 80%)',
    nepName: 'विश्वविद्यालय ७५% उपस्थिति तथा कक्षा बंक हिसाब',
    href: '/university-attendance',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['attendance', '75 percent', 'exam eligibility', 'bunk calculator', 'उपस्थिति हिसाब'],
    iconType: 'edu',
  },
  {
    name: 'Scientific Math & GCD / LCM Solver',
    nepName: 'वैज्ञानिक क्याल्कुलेटर तथा मस/लस हिसाब',
    href: '/scientific-calculator',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['scientific calculator', 'gcd', 'lcm', 'prime factor', 'math solver', 'वैज्ञानिक हिसाब'],
    iconType: 'calc',
  },
  {
    name: 'Statistics (SD) & Quadratic Equation Solver',
    nepName: 'तथ्यांकशास्त्र (प्रमाप विचलन) तथा समीकरण',
    href: '/statistics-calculator',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['statistics', 'standard deviation', 'variance', 'mean', 'quadratic equation', 'तथ्यांकशास्त्र'],
    iconType: 'calc',
  },

  // Calendar, Age & Daily Tools
  {
    name: 'Nepali Patro 2083 Calendar',
    nepName: 'नेपाली पात्रो २०८३ (क्यालेन्डर र पञ्चाङ्ग)',
    href: '/calendar',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['patro', 'calendar', 'nepali date', 'tithi', 'dashain', 'tihar', 'panchang', 'नेपाली पात्रो', 'बिदा'],
    iconType: 'citizen',
    isPopular: true,
  },
  {
    name: 'Nepali Date Converter (BS ⇄ AD)',
    nepName: 'नेपाली मिति रूपान्तरण (वि.सं. ⇄ ई.सं.)',
    href: '/date',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['date converter', 'bs to ad', 'ad to bs', 'bikram sambat', 'nepali date', 'मिति रूपान्तरण'],
    iconType: 'citizen',
    isPopular: true,
  },
  {
    name: 'Bulk Nepali Date Converter (Excel / CSV)',
    nepName: 'एकमुष्ट नेपाली मिति रूपान्तरण (Bulk Date)',
    href: '/date/bulk',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['bulk date', 'excel date conversion', 'csv bs to ad', 'धेरै मिति रूपान्तरण'],
    iconType: 'citizen',
  },
  {
    name: 'Exact Age Finder (BS & AD)',
    nepName: 'यकिन उमेर क्याल्कुलेटर (वर्ष, महिना, दिन)',
    href: '/age',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['age calculator', 'exact age', 'birthdate', 'umer hisab', 'उमेर क्याल्कुलेटर'],
    iconType: 'citizen',
    isPopular: true,
  },
  {
    name: 'Loksewa Age Eligibility Checker',
    nepName: 'लोकसेवा आयोग उमेर योग्यता जाँच (३५/४० वर्ष)',
    href: '/loksewa-age',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['loksewa age', 'lok sewa eligibility', 'government job age limit', 'लोकसेवा उमेर'],
    iconType: 'citizen',
  },
  {
    name: 'Citizenship Age & Required Documents',
    nepName: 'नेपाली नागरिकता उमेर (१६ वर्ष) र आवश्यक कागजात',
    href: '/citizenship-age',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['citizenship age', '16 years nagarikta', 'citizenship documents nepal', 'नागरिकता उमेर'],
    iconType: 'citizen',
  },
  {
    name: 'e-Passport & Urgent Fee Guide',
    nepName: 'विद्युतीय राहदानी (e-Passport) दस्तुर क्याल्कुलेटर',
    href: '/passport-fee',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['passport fee', 'e-passport', 'urgent passport tripureshwor', 'dao fee', 'राहदानी दस्तुर'],
    iconType: 'citizen',
  },
  {
    name: 'Preeti to Unicode Font Converter',
    nepName: 'प्रिती देखि युनिकोड फन्ट रूपान्तरण',
    href: '/preeti',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['preeti', 'unicode', 'font converter', 'kantipur', 'nepali typing', 'प्रिती युनिकोड'],
    iconType: 'calc',
    isPopular: true,
  },
  {
    name: 'Traditional Units (Dharni, Pau, Mana, Muri)',
    nepName: 'नेपाली परम्परागत नापतौल (धार्नी, पाउ, माना, मुरी)',
    href: '/traditional-units',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['traditional units', 'dharni to kg', 'pau in gram', 'mana muri', 'धार्नी', 'पाउ', 'माना'],
    iconType: 'calc',
  },
  {
    name: 'Universal Unit Converter (Length, Weight, Temp)',
    nepName: 'विश्वव्यापी एकाइ रूपान्तरण (लम्बाइ, तौल, तापक्रम)',
    href: '/unit-converter',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['unit converter', 'meter to feet', 'kg to pound', 'celsius to fahrenheit', 'एकाइ रूपान्तरण'],
    iconType: 'calc',
  },
  {
    name: 'Shopping Discount & Bill Splitter',
    nepName: 'सपिङ छुट (Discount) तथा बिल बाँडफाँड',
    href: '/discount-calculator',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['discount', 'shopping discount', 'percent off', 'bill split', 'छुट हिसाब'],
    iconType: 'calc',
  },
  {
    name: 'Binary, Hex & Base Converter',
    nepName: 'बाइनरी, डेसिमल र हेक्साडेसिमल रूपान्तरण',
    href: '/base-converter',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['base converter', 'binary to decimal', 'hex converter', 'roman numerals', 'बाइनरी'],
    iconType: 'calc',
  },
  {
    name: 'Word & Character Counter',
    nepName: 'शब्द तथा अक्षर गणना (Word & Character Counter)',
    href: '/word-counter',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['word counter', 'character count', 'reading time', 'शब्द गणना'],
    iconType: 'calc',
  },
  {
    name: 'Typing Speed Test (WPM)',
    nepName: 'टाइपिङ स्पीड टेस्ट (WPM तथा लोकसेवा मापदण्ड)',
    href: '/typing-test',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['typing test', 'wpm', 'typing speed', 'loksewa typing', 'टाइपिङ स्पीड'],
    iconType: 'calc',
  },
  {
    name: 'Cryptographic Password Generator',
    nepName: 'सुरक्षित पासवर्ड जेनेरेटर तथा इन्ट्रोपी जाँच',
    href: '/password-generator',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['password generator', 'strong password', 'entropy checker', 'पासवर्ड जेनेरेटर'],
    iconType: 'calc',
  },
  {
    name: 'Payment QR Code Generator',
    nepName: 'नेपाली क्युआर कोड (QR Code) जेनेरेटर',
    href: '/qr-generator',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['qr generator', 'esewa qr', 'khalti qr', 'wifi qr', 'क्युआर कोड'],
    iconType: 'calc',
  },
  {
    name: 'Daily Rashifal (Horoscope & Zodiac)',
    nepName: 'दैनिक राशिफल तथा राशि भविष्यवाणी',
    href: '/rashifal',
    category: 'Academic & Daily',
    nepCategory: 'शिक्षा तथा दैनिक',
    keywords: ['rashifal', 'daily horoscope', 'zodiac nepal', 'rashi fal', 'दैनिक राशिफल'],
    iconType: 'citizen',
  },

  // Health & Fitness
  {
    name: 'Daily Calorie, BMR & Water Intake',
    nepName: 'दैनिक क्यालोरी, BMR तथा पानी सेवन आवश्यकता',
    href: '/calorie-calculator',
    category: 'Health & Fitness',
    nepCategory: 'स्वास्थ्य तथा फिटनेस',
    keywords: ['calorie', 'bmr', 'water intake', 'daily calories', 'weight loss', 'क्यालोरी हिसाब'],
    iconType: 'health',
  },
  {
    name: 'Momo Plate Calorie & Nutrition',
    nepName: 'मोमो प्लेट क्यालोरी तथा पोषण हिसाब',
    href: '/momo-calorie',
    category: 'Health & Fitness',
    nepCategory: 'स्वास्थ्य तथा फिटनेस',
    keywords: ['momo calorie', 'buff momo', 'chicken momo', 'steamed momo', 'मोमो क्यालोरी'],
    iconType: 'health',
  },
  {
    name: 'South Asian BMI & Weight Cutoff',
    nepName: 'दक्षिण एसियाली बीएमआई (BMI) क्याल्कुलेटर',
    href: '/bmi',
    category: 'Health & Fitness',
    nepCategory: 'स्वास्थ्य तथा फिटनेस',
    keywords: ['bmi', 'body mass index', 'who south asian bmi', 'ideal weight', 'बीएमआई'],
    iconType: 'health',
  },
  {
    name: 'US Navy Body Fat Percentage',
    nepName: 'अमेरिकी नौसेना शारीरिक बोसो (Body Fat) हिसाब',
    href: '/body-fat',
    category: 'Health & Fitness',
    nepCategory: 'स्वास्थ्य तथा फिटनेस',
    keywords: ['body fat', 'navy method', 'fat percentage', 'शारीरिक बोसो'],
    iconType: 'health',
  },
  {
    name: '90-Minute Sleep Cycle Calculator',
    nepName: '९० मिनेट निद्रा चक्र तथा बिहान उठ्ने समय',
    href: '/sleep-calculator',
    category: 'Health & Fitness',
    nepCategory: 'स्वास्थ्य तथा फिटनेस',
    keywords: ['sleep cycle', 'bedtime calculator', 'rem sleep', 'निद्रा चक्र'],
    iconType: 'health',
  },
  {
    name: 'Nepali Pregnancy Due Date (BS & AD)',
    nepName: 'नेपाली प्रसूति मिति (Due Date) क्याल्कुलेटर',
    href: '/pregnancy-due-date',
    category: 'Health & Fitness',
    nepCategory: 'स्वास्थ्य तथा फिटनेस',
    keywords: ['pregnancy due date', 'delivery date', 'lmp date bs', 'aama surakshya', 'प्रसूति मिति'],
    iconType: 'health',
  },
  {
    name: 'Blood Donation Eligibility & Interval',
    nepName: 'रक्तदान योग्यता तथा रक्त समूह अनुकूलता',
    href: '/blood-donation',
    category: 'Health & Fitness',
    nepCategory: 'स्वास्थ्य तथा फिटनेस',
    keywords: ['blood donation', 'blood group', 'donation interval', 'hemoglobin', 'रक्तदान'],
    iconType: 'health',
  },

  // Legal & Documents
  {
    name: 'Legal Document Generators Hub',
    nepName: 'नेपाली कानुनी कागजात तथा मस्यौदा जेनेरेटर',
    href: '/document-generators',
    category: 'Legal & Docs',
    nepCategory: 'कानुन तथा कागजात',
    keywords: ['document generators', 'legal documents nepal', 'deed templates', 'कागजात मस्यौदा'],
    iconType: 'citizen',
  },
  {
    name: 'House Rent Agreement Generator',
    nepName: 'घरबहाल सम्झौतापत्र (Rent Agreement) मस्यौदा',
    href: '/rent-agreement',
    category: 'Legal & Docs',
    nepCategory: 'कानुन तथा कागजात',
    keywords: ['rent agreement', 'tenancy contract', 'house rent deed', 'घरबहाल सम्झौता'],
    iconType: 'citizen',
  },
  {
    name: 'Partnership Deed (Sajhedari) Generator',
    nepName: 'साझेदारी फर्म सम्झौतापत्र (Partnership Deed)',
    href: '/partnership-deed',
    category: 'Legal & Docs',
    nepCategory: 'कानुन तथा कागजात',
    keywords: ['partnership deed', 'sajhedari patra', 'business agreement', 'साझेदारी सम्झौता'],
    iconType: 'citizen',
  },
  {
    name: 'Company Articles of Association (AOA)',
    nepName: 'कम्पनी नियमावली तथा प्रबन्धपत्र (AOA) मस्यौदा',
    href: '/aoa',
    category: 'Legal & Docs',
    nepCategory: 'कानुन तथा कागजात',
    keywords: ['aoa', 'articles of association', 'pvt ltd registration', 'कम्पनी नियमावली'],
    iconType: 'citizen',
  },
  {
    name: 'Official Acts & Gazettes Hub',
    nepName: 'सरकारी ऐन, राजपत्र तथा कानुनी दस्ताबेज',
    href: '/documents',
    category: 'Legal & Docs',
    nepCategory: 'कानुन तथा कागजात',
    keywords: ['acts', 'gazette', 'rajpatra', 'finance act', 'labour act', 'laws', 'pdf', 'सरकारी ऐन'],
    iconType: 'citizen',
  },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { t, language } = useLanguage();
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
      return ALL_SEARCHABLE_TOOLS.filter((t) => t.isPopular).slice(0, 8);
    }
    return ALL_SEARCHABLE_TOOLS.filter((item) => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.nepName.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.nepCategory.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector<HTMLElement>(`[data-search-idx="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filtered[selectedIndex];
      if (target) {
        router.push(target.href);
        onClose();
      }
    }
  };

  const renderIcon = (type: SearchToolItem['iconType'], isSelected: boolean) => {
    const size = 16;
    switch (type) {
      case 'tax':
        return <ReceiptText size={size} color={isSelected ? '#2563eb' : '#dc2626'} />;
      case 'gold':
        return <Sparkles size={size} color={isSelected ? '#2563eb' : '#d97706'} />;
      case 'bank':
        return <Landmark size={size} color={isSelected ? '#2563eb' : '#0284c7'} />;
      case 'share':
        return <TrendingUp size={size} color={isSelected ? '#2563eb' : '#059669'} />;
      case 'land':
        return <Home size={size} color={isSelected ? '#2563eb' : '#b45309'} />;
      case 'vehicle':
        return <Car size={size} color={isSelected ? '#2563eb' : '#ea580c'} />;
      case 'edu':
        return <GraduationCap size={size} color={isSelected ? '#2563eb' : '#4f46e5'} />;
      case 'health':
        return <HeartPulse size={size} color={isSelected ? '#2563eb' : '#e11d48'} />;
      case 'citizen':
        return <Calendar size={size} color={isSelected ? '#2563eb' : '#7c3aed'} />;
      case 'power':
        return <Zap size={size} color={isSelected ? '#2563eb' : '#f59e0b'} />;
      default:
        return <Calculator size={size} color={isSelected ? '#2563eb' : '#64748b'} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.55)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: ' clamp(40px, 8vh, 80px) 16px 20px',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              maxWidth: '620px',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.22), 0 0 0 1px rgba(0, 0, 0, 0.04)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '82vh',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '14px 18px',
                borderBottom: '1px solid #e2e8f0',
                gap: '12px',
                backgroundColor: '#ffffff',
              }}
            >
              <Search size={18} color="#2563eb" style={{ flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                placeholder={t(
                  'Search 70+ calculators and tools (tax, gold, emi, land, salary)...',
                  '७०+ क्याल्कुलेटर तथा उपकरणहरू खोज्नुहोस् (कर, सुन, किस्ता, जग्गा)...'
                )}
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
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#0f172a',
                  backgroundColor: 'transparent',
                }}
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94a3b8',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              ) : (
                <kbd
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#64748b',
                    backgroundColor: '#f1f5f9',
                    padding: '2px 6px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    flexShrink: 0,
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
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
                maxHeight: '440px',
              }}
            >
              {filtered.length === 0 ? (
                <div style={{ padding: '36px 20px', textAlign: 'center', color: '#64748b' }}>
                  <Compass size={28} color="#cbd5e1" style={{ margin: '0 auto 10px' }} />
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>
                    {t(`No tools found for "${query}"`, `"${query}" को लागि कुनै क्याल्कुलेटर फेला परेन`)}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '4px' }}>
                    {t('Try searching with words like tax, gold, land, emi, or salary.', 'कर, सुन, जग्गा, किस्ता वा तलब जस्ता शब्दहरू खोजी हेर्नुहोस्।')}
                  </div>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#94a3b8',
                      padding: '6px 10px 4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {query
                      ? t(`Results (${filtered.length})`, `फेला परेका उपकरणहरू (${filtered.length})`)
                      : t('Popular Calculators', 'धेरै प्रयोग हुने क्याल्कुलेटरहरू')}
                  </div>

                  {filtered.map((tool, idx) => {
                    const isSelected = idx === selectedIndex;
                    const displayName = language === 'ne' ? tool.nepName : tool.name;
                    const displayCategory = language === 'ne' ? tool.nepCategory : tool.category;

                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={onClose}
                        data-search-idx={idx}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '9px 12px',
                          borderRadius: '10px',
                          backgroundColor: isSelected ? '#eff6ff' : 'transparent',
                          border: isSelected ? '1px solid #bfdbfe' : '1px solid transparent',
                          textDecoration: 'none',
                          transition: 'background-color 0.1s ease',
                          gap: '12px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                          <div
                            style={{
                              width: '30px',
                              height: '30px',
                              borderRadius: '8px',
                              backgroundColor: isSelected ? '#dbeafe' : '#f8fafc',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              border: '1px solid #f1f5f9',
                            }}
                          >
                            {renderIcon(tool.iconType, isSelected)}
                          </div>

                          <span
                            style={{
                              fontSize: '13.5px',
                              fontWeight: 700,
                              color: isSelected ? '#1d4ed8' : '#0f172a',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {displayName}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              color: isSelected ? '#2563eb' : '#64748b',
                              backgroundColor: isSelected ? '#ffffff' : '#f1f5f9',
                              padding: '2px 7px',
                              borderRadius: '6px',
                              border: '1px solid #e2e8f0',
                            }}
                          >
                            {displayCategory}
                          </span>
                          <CornerDownLeft
                            size={13}
                            color={isSelected ? '#2563eb' : '#cbd5e1'}
                            style={{ opacity: isSelected ? 1 : 0.4 }}
                          />
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
                padding: '9px 16px',
                backgroundColor: '#f8fafc',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11.5px',
                color: '#64748b',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span>
                  <kbd style={{ padding: '1px 5px', borderRadius: '4px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#334155', fontWeight: 700 }}>↑</kbd>{' '}
                  <kbd style={{ padding: '1px 5px', borderRadius: '4px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#334155', fontWeight: 700 }}>↓</kbd>{' '}
                  {t('Navigate', 'नेभिगेट')}
                </span>
                <span>
                  <kbd style={{ padding: '1px 5px', borderRadius: '4px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#334155', fontWeight: 700 }}>↵</kbd>{' '}
                  {t('Open', 'खोल्नुहोस्')}
                </span>
                <span>
                  <kbd style={{ padding: '1px 5px', borderRadius: '4px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#334155', fontWeight: 700 }}>ESC</kbd>{' '}
                  {t('Close', 'बन्द')}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Sparkles size={12} color="#059669" />
                <span style={{ fontWeight: 600, color: '#334155' }}>
                  {t('70+ Calculators & Tools', '७०+ क्याल्कुलेटर तथा उपकरणहरू')}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
