import { NEPALI_MONTHS } from '@/lib/nepaliDate';

export interface BsDate {
  year: number;
  month: number;
  day: number;
}

export interface AgeCalculationResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  totalBreaths: number;
  nextBirthday: {
    monthsRemaining: number;
    daysRemaining: number;
    totalDaysRemaining: number;
  };
  rashi: {
    nameEn: string;
    nameNe: string;
    symbol: string;
    elementEn: string;
    elementNe: string;
  };
  eligibility: {
    citizenship: boolean; // 16+
    drivingLicense: boolean; // 18+
    voterId: boolean; // 18+
    lokSewaGeneralMale: boolean; // 18 - 35
    lokSewaGeneralFemale: boolean; // 18 - 40
    lokSewaOfficer: boolean; // 21 - 35 (or 40)
    foreignEmployment: boolean; // 18 - 60
    seniorCitizenAllowance: boolean; // 68+
  };
}

export const ZODIAC_SIGNS = [
  { monthNum: 1, nameEn: 'Mesh (Aries)', nameNe: 'मेष राशि', symbol: '♈', elementEn: 'Fire', elementNe: 'अग्नि' },
  { monthNum: 2, nameEn: 'Brish (Taurus)', nameNe: 'वृष राशि', symbol: '♉', elementEn: 'Earth', elementNe: 'पृथ्वी' },
  { monthNum: 3, nameEn: 'Mithun (Gemini)', nameNe: 'मिथुन राशि', symbol: '♊', elementEn: 'Air', elementNe: 'वायु' },
  { monthNum: 4, nameEn: 'Karkat (Cancer)', nameNe: 'कर्कट राशि', symbol: '♋', elementEn: 'Water', elementNe: 'जल' },
  { monthNum: 5, nameEn: 'Simha (Leo)', nameNe: 'सिंह राशि', symbol: '♌', elementEn: 'Fire', elementNe: 'अग्नि' },
  { monthNum: 6, nameEn: 'Kanya (Virgo)', nameNe: 'कन्या राशि', symbol: '♍', elementEn: 'Earth', elementNe: 'पृथ्वी' },
  { monthNum: 7, nameEn: 'Tula (Libra)', nameNe: 'तुला राशि', symbol: '♎', elementEn: 'Air', elementNe: 'वायु' },
  { monthNum: 8, nameEn: 'Brischik (Scorpio)', nameNe: 'वृश्चिक राशि', symbol: '♏', elementEn: 'Water', elementNe: 'जल' },
  { monthNum: 9, nameEn: 'Dhanu (Sagittarius)', nameNe: 'धनु राशि', symbol: '♐', elementEn: 'Fire', elementNe: 'अग्नि' },
  { monthNum: 10, nameEn: 'Makar (Capricorn)', nameNe: 'मकर राशि', symbol: '♑', elementEn: 'Earth', elementNe: 'पृथ्वी' },
  { monthNum: 11, nameEn: 'Kumbha (Aquarius)', nameNe: 'कुम्भ राशि', symbol: '♒', elementEn: 'Air', elementNe: 'वायु' },
  { monthNum: 12, nameEn: 'Meen (Pisces)', nameNe: 'मीन राशि', symbol: '♓', elementEn: 'Water', elementNe: 'जल' },
];

/**
 * Standard days per month in Bikram Sambat for standard calculation
 */
const STANDARD_MONTH_DAYS = [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30];

export function calculateBsAge(birth: BsDate, target: BsDate): AgeCalculationResult {
  let years = target.year - birth.year;
  let months = target.month - birth.month;
  let days = target.day - birth.day;

  if (days < 0) {
    months -= 1;
    // borrow days from previous month
    const prevMonthIdx = (target.month - 2 + 12) % 12;
    const daysInPrevMonth = STANDARD_MONTH_DAYS[prevMonthIdx] || 30;
    days += daysInPrevMonth;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Ensure non-negative
  years = Math.max(0, years);
  months = Math.max(0, months);
  days = Math.max(0, days);

  // Total elapsed days estimate
  const totalDays = Math.round(years * 365.25 + months * 30.4375 + days);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;
  const totalBreaths = totalDays * 23040; // ~16 breaths per minute

  // Next Birthday calculation
  let nextBdayMonths = birth.month - target.month;
  let nextBdayDays = birth.day - target.day;

  if (nextBdayDays < 0) {
    nextBdayMonths -= 1;
    const daysInCurrentMonth = STANDARD_MONTH_DAYS[target.month - 1] || 30;
    nextBdayDays += daysInCurrentMonth;
  }

  if (nextBdayMonths < 0) {
    nextBdayMonths += 12;
  }

  const totalDaysRemaining = Math.round(nextBdayMonths * 30.4375 + nextBdayDays);

  // Rashi
  const rashi = ZODIAC_SIGNS.find((z) => z.monthNum === birth.month) || ZODIAC_SIGNS[0];

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    totalHours,
    totalBreaths,
    nextBirthday: {
      monthsRemaining: nextBdayMonths,
      daysRemaining: nextBdayDays,
      totalDaysRemaining,
    },
    rashi,
    eligibility: {
      citizenship: years >= 16,
      drivingLicense: years >= 18,
      voterId: years >= 18,
      lokSewaGeneralMale: years >= 18 && years <= 35,
      lokSewaGeneralFemale: years >= 18 && years <= 40,
      lokSewaOfficer: years >= 21 && years <= 35,
      foreignEmployment: years >= 18 && years <= 60,
      seniorCitizenAllowance: years >= 68,
    },
  };
}
