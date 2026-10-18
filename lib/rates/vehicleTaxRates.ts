export interface VehicleRateSlab {
  label: string;
  minVal: number;
  maxVal: number;
  annualTax: number;
}

export const BIKE_CC_SLABS: VehicleRateSlab[] = [
  { label: "Up to 125 cc", minVal: 0, maxVal: 125, annualTax: 3000 },
  { label: "126 cc – 160 cc", minVal: 126, maxVal: 160, annualTax: 4500 },
  { label: "161 cc – 250 cc", minVal: 161, maxVal: 250, annualTax: 6000 },
  { label: "251 cc – 400 cc", minVal: 251, maxVal: 400, annualTax: 11000 },
  { label: "401 cc – 650 cc", minVal: 401, maxVal: 650, annualTax: 22000 },
  { label: "Above 650 cc", minVal: 651, maxVal: Infinity, annualTax: 33000 },
];

export const BIKE_ELECTRIC_SLABS: VehicleRateSlab[] = [
  { label: "Up to 1000 W", minVal: 0, maxVal: 1000, annualTax: 1500 },
  { label: "1001 W – 1500 W", minVal: 1001, maxVal: 1500, annualTax: 2000 },
  { label: "1501 W – 2000 W", minVal: 1501, maxVal: 2000, annualTax: 2500 },
  { label: "Above 2000 W", minVal: 2001, maxVal: Infinity, annualTax: 3500 },
];

export const CAR_CC_SLABS: VehicleRateSlab[] = [
  { label: "Up to 1000 cc", minVal: 0, maxVal: 1000, annualTax: 22000 },
  { label: "1001 cc – 1500 cc", minVal: 1001, maxVal: 1500, annualTax: 25000 },
  { label: "1501 cc – 2000 cc", minVal: 1501, maxVal: 2000, annualTax: 28000 },
  { label: "2001 cc – 2500 cc", minVal: 2001, maxVal: 2500, annualTax: 37000 },
  { label: "2501 cc – 2900 cc", minVal: 2501, maxVal: 2900, annualTax: 44000 },
  { label: "Above 2900 cc", minVal: 2901, maxVal: Infinity, annualTax: 60000 },
];

export const CAR_ELECTRIC_SLABS: VehicleRateSlab[] = [
  { label: "Up to 50 kW", minVal: 0, maxVal: 50, annualTax: 10000 },
  { label: "51 kW – 100 kW", minVal: 51, maxVal: 100, annualTax: 15000 },
  { label: "101 kW – 150 kW", minVal: 101, maxVal: 150, annualTax: 25000 },
  { label: "151 kW – 200 kW", minVal: 151, maxVal: 200, annualTax: 35000 },
  { label: "Above 200 kW", minVal: 201, maxVal: Infinity, annualTax: 50000 },
];

export interface LateFineBracket {
  label: string;
  labelNep: string;
  finePercent: number; // e.g. 0.05 for 5%
  overdueYears: number; // 0 = within same FY, 1 = 1 overdue year, 2 = 2 overdue years, etc.
  finePerYearPercent: number; // fine rate per overdue year (e.g. 0.32 = 32%/year)
  isMultiYear?: boolean;
}

export const LATE_FINE_TIERS: LateFineBracket[] = [
  { label: "Within 90 days (Grace Period - 0% Fine)", labelNep: "म्याद नाघेको ९० दिनभित्र (छुट अवधि — ०%)", finePercent: 0, overdueYears: 0, finePerYearPercent: 0 },
  { label: "Overdue 91 - 120 days (5% Fine)", labelNep: "९१ देखि १२० दिन नाघेको (५% जरिवाना)", finePercent: 0.05, overdueYears: 0, finePerYearPercent: 0.05 },
  { label: "Overdue 121 - 165 days (10% Fine)", labelNep: "१२१ देखि १६५ दिन नाघेको (१०% जरिवाना)", finePercent: 0.10, overdueYears: 0, finePerYearPercent: 0.10 },
  { label: "Overdue till end of Fiscal Year (20% Fine)", labelNep: "आर्थिक वर्षको मसान्तसम्म (२०% जरिवाना)", finePercent: 0.20, overdueYears: 0, finePerYearPercent: 0.20 },
  { label: "Overdue by 1 Year (32% Fine + Back Tax)", labelNep: "१ वर्ष बक्यौता (३२% जरिवाना + बक्यौता कर)", finePercent: 0.32, overdueYears: 1, finePerYearPercent: 0.32, isMultiYear: true },
  { label: "Overdue by 2 Years (64% Fine + 2 Yrs Back Taxes)", labelNep: "२ वर्ष बक्यौता (६४% जरिवाना + २ वर्षको कर)", finePercent: 0.64, overdueYears: 2, finePerYearPercent: 0.32, isMultiYear: true },
  { label: "Overdue by 2 Years (100% Max Fine + 2 Yrs Back Taxes)", labelNep: "२ वर्ष बक्यौता (१००% अधिकतम जरिवाना + २ वर्षको कर)", finePercent: 1.00, overdueYears: 2, finePerYearPercent: 0.50, isMultiYear: true },
  { label: "Overdue by 3 Years (96% Fine + 3 Yrs Back Taxes)", labelNep: "३ वर्ष बक्यौता (९६% जरिवाना + ३ वर्षको कर)", finePercent: 0.96, overdueYears: 3, finePerYearPercent: 0.32, isMultiYear: true },
  { label: "Overdue by 4 Years (100% Max Fine + 4 Yrs Back Taxes)", labelNep: "४ वर्ष बक्यौता (१००% अधिकतम जरिवाना + ४ वर्षको कर)", finePercent: 1.00, overdueYears: 4, finePerYearPercent: 0.25, isMultiYear: true },
  { label: "Overdue by 5+ Years (100% Max Fine + 5 Yrs Back Taxes)", labelNep: "५+ वर्ष बक्यौता (१००% अधिकतम जरिवाना + ५ वर्षको कर)", finePercent: 1.00, overdueYears: 5, finePerYearPercent: 0.20, isMultiYear: true },
];

export const THIRD_PARTY_INSURANCE = {
  twoWheeler: 1500,
  fourWheeler: 7500,
};

export const PROVINCES = [
  { id: "bagmati", name: "Bagmati Province (बागमती प्रदेश)", active: true },
  { id: "koshi", name: "Koshi Province (कोशी प्रदेश)", active: true },
  { id: "madesh", name: "Madhesh Province (मधेश प्रदेश)", active: true },
  { id: "gandaki", name: "Gandaki Province (गण्डकी प्रदेश)", active: true },
  { id: "lumbini", name: "Lumbini Province (लुम्बिनी प्रदेश)", active: true },
  { id: "karnali", name: "Karnali Province (कर्णाली प्रदेश)", active: true },
  { id: "sudurpashchim", name: "Sudurpashchim Province (सुदूरपश्चिम प्रदेश)", active: true },
];
