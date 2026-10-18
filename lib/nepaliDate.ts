/**
 * Nepali Date (Bikram Sambat) conversion and utilities
 */

export const NEPALI_MONTHS = [
  { bs: "बैशाख", en: "Baishakh", num: 1 },
  { bs: "जेठ", en: "Jestha", num: 2 },
  { bs: "असार", en: "Ashadh", num: 3 },
  { bs: "श्रावण", en: "Shrawan", num: 4 },
  { bs: "भाद्र", en: "Bhadra", num: 5 },
  { bs: "आश्विन", en: "Ashwin", num: 6 },
  { bs: "कार्तिक", en: "Kartik", num: 7 },
  { bs: "मंसिर", en: "Mangsir", num: 8 },
  { bs: "पौष", en: "Poush", num: 9 },
  { bs: "माघ", en: "Magh", num: 10 },
  { bs: "फाल्गुन", en: "Falgun", num: 11 },
  { bs: "चैत्र", en: "Chaitra", num: 12 },
];

export const NEPALI_DAYS = [
  { bs: "आइतबार", en: "Sunday" },
  { bs: "सोमबार", en: "Monday" },
  { bs: "मंगलबार", en: "Tuesday" },
  { bs: "बुधबार", en: "Wednesday" },
  { bs: "बिहीबार", en: "Thursday" },
  { bs: "शुक्रबार", en: "Friday" },
  { bs: "शनिबार", en: "Saturday" },
];

// Approximate standard days lookup for BS years
// Reference anchor: 2000 BS Baishakh 1 = 1943-04-14 AD (approx)
export function convertAdToBsApprox(date: Date): { year: number; month: number; day: number; formatted: string } {
  const adYear = date.getFullYear();
  const adMonth = date.getMonth() + 1;
  const adDay = date.getDate();

  // Approximate offset ~56 years, 8 months, 17 days
  let bsYear = adYear + 56;
  let bsMonth = adMonth + 8;
  let bsDay = adDay + 16;

  if (bsDay > 30) {
    bsDay -= 30;
    bsMonth += 1;
  }
  if (bsMonth > 12) {
    bsMonth -= 12;
    bsYear += 1;
  }

  const monthObj = NEPALI_MONTHS[bsMonth - 1] || NEPALI_MONTHS[0];
  return {
    year: bsYear,
    month: bsMonth,
    day: bsDay,
    formatted: `${bsYear} ${monthObj.en} ${bsDay} (${monthObj.bs})`,
  };
}

export function convertBsToAdApprox(bsYear: number, bsMonth: number, bsDay: number): Date {
  let adYear = bsYear - 57;
  let adMonth = bsMonth + 3;
  let adDay = bsDay - 13;

  if (adDay < 1) {
    adMonth -= 1;
    adDay += 30;
  }
  if (adMonth > 12) {
    adMonth -= 12;
    adYear += 1;
  }

  return new Date(adYear, adMonth - 1, Math.max(1, adDay));
}

export function calculateExactAge(birthDate: Date, targetDate?: Date) {
  const target = targetDate || new Date(2026, 9, 1);
  let years = target.getFullYear() - birthDate.getFullYear();
  let months = target.getMonth() - birthDate.getMonth();
  let days = target.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    days += 30;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((target.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    totalDays: Math.max(0, totalDays),
    totalWeeks: Math.floor(Math.max(0, totalDays) / 7),
  };
}

export function toNepaliDigits(input: number | string): string {
  const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(input).replace(/[0-9]/g, (w) => nepaliDigits[+w]);
}

export function toEnglishDigits(input: string): string {
  const devanagariMap: { [key: string]: string } = {
    '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
    '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
  };
  return input.replace(/[०-९]/g, (w) => devanagariMap[w] || w);
}
