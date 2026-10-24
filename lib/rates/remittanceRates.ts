export interface RemittanceCorridor {
  code: string;
  nameEn: string;
  nameNe: string;
  countryEn: string;
  countryNe: string;
  flag: string;
  unit: number;
  baseNprBuy: number; // Baseline NRB buy rate
  presetAmounts: number[];
}

export interface RemittanceChannel {
  id: 'bank' | 'wallet' | 'cash';
  nameEn: string;
  nameNe: string;
  descriptionEn: string;
  descriptionNe: string;
  averageFeeForeign: number; // Foreign currency fee
  bonusRateNpr: number; // Bank deposit incentive bonus per foreign unit
  speedEn: string;
  speedNe: string;
  operators: string[];
}

export const REMITTANCE_CORRIDORS: RemittanceCorridor[] = [
  {
    code: 'AED',
    nameEn: 'UAE Dirham',
    nameNe: 'युएई दिर्हाम',
    countryEn: 'United Arab Emirates (Dubai, Abu Dhabi)',
    countryNe: 'संयुक्त अरब इमिरेट्स (दुबई)',
    flag: '🇦🇪',
    unit: 1,
    baseNprBuy: 36.70,
    presetAmounts: [500, 1000, 1500, 2000, 3000],
  },
  {
    code: 'QAR',
    nameEn: 'Qatari Riyal',
    nameNe: 'कतारी रियाल',
    countryEn: 'Qatar (Doha)',
    countryNe: 'कतार (दोहा)',
    flag: '🇶🇦',
    unit: 1,
    baseNprBuy: 37.01,
    presetAmounts: [500, 1000, 1500, 2000, 3000],
  },
  {
    code: 'SAR',
    nameEn: 'Saudi Riyal',
    nameNe: 'साउदी रियाल',
    countryEn: 'Saudi Arabia (Riyadh, Jeddah)',
    countryNe: 'साउदी अरब (रियाद, जेद्दा)',
    flag: '🇸🇦',
    unit: 1,
    baseNprBuy: 35.92,
    presetAmounts: [500, 1000, 1500, 2000, 3000],
  },
  {
    code: 'KWD',
    nameEn: 'Kuwaiti Dinar',
    nameNe: 'कुवेती दिनार',
    countryEn: 'Kuwait',
    countryNe: 'कुवेत',
    flag: '🇰🇼',
    unit: 1,
    baseNprBuy: 439.10,
    presetAmounts: [50, 100, 200, 300, 500],
  },
  {
    code: 'BHD',
    nameEn: 'Bahraini Dinar',
    nameNe: 'बहराइनी दिनार',
    countryEn: 'Bahrain',
    countryNe: 'बहराइन',
    flag: '🇧🇭',
    unit: 1,
    baseNprBuy: 357.60,
    presetAmounts: [50, 100, 200, 300, 500],
  },
  {
    code: 'OMR',
    nameEn: 'Omani Rial',
    nameNe: 'ओमानी रियाल',
    countryEn: 'Oman',
    countryNe: 'ओमान',
    flag: '🇴🇲',
    unit: 1,
    baseNprBuy: 350.15,
    presetAmounts: [50, 100, 200, 300, 500],
  },
  {
    code: 'MYR',
    nameEn: 'Malaysian Ringgit',
    nameNe: 'मलेसियाली रिंगिट',
    countryEn: 'Malaysia (KL, Penang)',
    countryNe: 'मलेसिया',
    flag: '🇲🇾',
    unit: 1,
    baseNprBuy: 31.25,
    presetAmounts: [500, 1000, 1500, 2000, 3000],
  },
  {
    code: 'USD',
    nameEn: 'US Dollar',
    nameNe: 'अमेरिकी डलर',
    countryEn: 'United States',
    countryNe: 'अमेरिका',
    flag: '🇺🇸',
    unit: 1,
    baseNprBuy: 134.80,
    presetAmounts: [100, 300, 500, 1000, 2000],
  },
  {
    code: 'AUD',
    nameEn: 'Australian Dollar',
    nameNe: 'अस्ट्रेलियन डलर',
    countryEn: 'Australia (Sydney, Melbourne)',
    countryNe: 'अस्ट्रेलिया',
    flag: '🇦🇺',
    unit: 1,
    baseNprBuy: 90.15,
    presetAmounts: [200, 500, 1000, 2000, 3000],
  },
  {
    code: 'KRW',
    nameEn: 'South Korean Won',
    nameNe: 'दक्षिण कोरियाली वोन',
    countryEn: 'South Korea (EPS Workers)',
    countryNe: 'दक्षिण कोरिया (इपिएस)',
    flag: '🇰🇷',
    unit: 100,
    baseNprBuy: 9.95,
    presetAmounts: [100000, 300000, 500000, 1000000, 2000000],
  },
  {
    code: 'JPY',
    nameEn: 'Japanese Yen',
    nameNe: 'जापानी येन',
    countryEn: 'Japan (Tokyo, Osaka)',
    countryNe: 'जापान',
    flag: '🇯🇵',
    unit: 10,
    baseNprBuy: 9.05,
    presetAmounts: [10000, 30000, 50000, 100000, 200000],
  },
  {
    code: 'GBP',
    nameEn: 'British Pound',
    nameNe: 'बेलायती पाउन्ड',
    countryEn: 'United Kingdom',
    countryNe: 'बेलायत',
    flag: '🇬🇧',
    unit: 1,
    baseNprBuy: 176.50,
    presetAmounts: [100, 200, 500, 1000, 2000],
  },
  {
    code: 'EUR',
    nameEn: 'Euro',
    nameNe: 'युरो',
    countryEn: 'European Union',
    countryNe: 'युरोपेली युनियन',
    flag: '🇪🇺',
    unit: 1,
    baseNprBuy: 147.20,
    presetAmounts: [100, 300, 500, 1000, 2000],
  },
];

export const REMITTANCE_CHANNELS: RemittanceChannel[] = [
  {
    id: 'bank',
    nameEn: 'Direct Bank Account Deposit',
    nameNe: 'सीधै बैंक खातामा जम्मा',
    descriptionEn: 'Direct credit to any Nepali commercial bank (Global IME, Nabil, NIC Asia, Everest). Qualifies for +1% remittance fixed deposit rate bonus.',
    descriptionNe: 'नेपालका कुनै पनि वाणिज्य बैंक खातामा सोझै दाखिला। थप १% रेमिट्यान्स मुद्दती ब्याज सुविधा पाउने।',
    averageFeeForeign: 0, // Most banks waive fees above minimum transfer
    bonusRateNpr: 0.15, // Approx +0.15 NPR per unit equivalent from bank incentive
    speedEn: 'Same Day / Instant IPS',
    speedNe: 'सोही दिन / तत्काल',
    operators: ['Global IME Bank', 'Nabil Bank', 'NIC Asia', 'Everest Bank', 'Sanima Bank'],
  },
  {
    id: 'wallet',
    nameEn: 'Digital Wallet (eSewa / Khalti)',
    nameNe: 'डिजिटल वालेट (इ-सेवा / खल्ती)',
    descriptionEn: 'Instant deposit to recipient mobile wallet number. Convenient for bills, top-ups, and instant family use.',
    descriptionNe: 'प्राप्तकर्ताको मोबाइल नम्बरमा सिधै डिजिटल वालेट जम्मा। तत्काल खर्च तथा बिल भुक्तानीका लागि उपयुक्त।',
    averageFeeForeign: 5, // typical small platform flat fee
    bonusRateNpr: 0.05,
    speedEn: 'Instant (Under 60 seconds)',
    speedNe: 'तत्काल (१ मिनेट भित्र)',
    operators: ['eSewa Money Transfer', 'Khalti Remit', 'IME Pay'],
  },
  {
    id: 'cash',
    nameEn: 'Cash Pickup Counter (IME / Western Union)',
    nameNe: 'काउन्टर नगद भुक्तानी (IME / वेस्टर्न युनियन)',
    descriptionEn: 'Recipient collects physical cash from any authorized money transfer agent counter across all 77 districts of Nepal using citizenship/ID.',
    descriptionNe: 'नेपालभरका ७७ जिल्लामै रहेका रेमिट्यान्स काउन्टरबाट नागरिकता देखाएर तुरुन्तै नगद संकलन गर्न सकिने।',
    averageFeeForeign: 10,
    bonusRateNpr: 0,
    speedEn: 'Ready for Pickup Immediately',
    speedNe: 'काउन्टरमा तुरुन्तै उपलब्ध',
    operators: ['IME Remit', 'Western Union', 'Prabhu Money Transfer', 'City Express'],
  },
];
