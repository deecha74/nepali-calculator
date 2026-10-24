import { BsDate } from '@/lib/utils/nepaliAge';

export interface VillageInterestParams {
  principal: number;
  startDate: BsDate;
  endDate: BsDate;
  sayakadaRate: number; // e.g., 2 means 2% per month
  isCompoundedYearly: boolean; // whether interest is capitalized annually
}

export interface VillageInterestResult {
  elapsedYears: number;
  elapsedMonths: number;
  elapsedDays: number;
  totalDecimalMonths: number;
  totalDays: number;
  monthlyInterestInitial: number;
  dailyInterestInitial: number;
  totalInterest: number;
  totalPayable: number;
  annualEquivalentRate: number;
  breakdownYears?: {
    yearNumber: number;
    openingPrincipal: number;
    interestEarned: number;
    closingPrincipal: number;
  }[];
}

const DAYS_IN_NEPALI_MONTH = [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30];

export function calculateVillageInterest(params: VillageInterestParams): VillageInterestResult {
  const { principal, startDate, endDate, sayakadaRate, isCompoundedYearly } = params;

  // Calculate elapsed Years, Months, Days
  let years = endDate.year - startDate.year;
  let months = endDate.month - startDate.month;
  let days = endDate.day - startDate.day;

  if (days < 0) {
    months -= 1;
    const prevMonthIdx = (endDate.month - 2 + 12) % 12;
    const daysInPrev = DAYS_IN_NEPALI_MONTH[prevMonthIdx] || 30;
    days += daysInPrev;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  years = Math.max(0, years);
  months = Math.max(0, months);
  days = Math.max(0, days);

  // Approximate total days and decimal months
  // In village practice: 1 month = 30 days. Fractional month = days / 30.
  const fractionalMonth = days / 30;
  const totalDecimalMonths = years * 12 + months + fractionalMonth;
  const totalDays = Math.round(years * 365.25 + months * 30 + days);

  const monthlyRateDecimal = sayakadaRate / 100;
  const annualEquivalentRate = sayakadaRate * 12;

  const monthlyInterestInitial = principal * monthlyRateDecimal;
  const dailyInterestInitial = monthlyInterestInitial / 30;

  let totalInterest = 0;
  let totalPayable = 0;
  const breakdownYears = [];

  if (!isCompoundedYearly || years === 0) {
    // Simple Village Byaj: P * r * t (months)
    totalInterest = principal * monthlyRateDecimal * totalDecimalMonths;
    totalPayable = principal + totalInterest;
  } else {
    // Yearly Compounding (गाउँघरमा प्रत्येक वर्षको अन्त्यमा ब्याज साँवामा थपिने चलन)
    let currentPrincipal = principal;

    for (let y = 1; y <= years; y++) {
      const yearInterest = currentPrincipal * monthlyRateDecimal * 12;
      const closing = currentPrincipal + yearInterest;
      breakdownYears.push({
        yearNumber: y,
        openingPrincipal: Math.round(currentPrincipal),
        interestEarned: Math.round(yearInterest),
        closingPrincipal: Math.round(closing),
      });
      currentPrincipal = closing;
    }

    // Remaining fractional period after whole years
    const remainingMonths = months + fractionalMonth;
    const remainingInterest = currentPrincipal * monthlyRateDecimal * remainingMonths;

    totalPayable = currentPrincipal + remainingInterest;
    totalInterest = totalPayable - principal;
  }

  return {
    elapsedYears: years,
    elapsedMonths: months,
    elapsedDays: days,
    totalDecimalMonths: Math.round(totalDecimalMonths * 100) / 100,
    totalDays,
    monthlyInterestInitial: Math.round(monthlyInterestInitial),
    dailyInterestInitial: Math.round(dailyInterestInitial * 100) / 100,
    totalInterest: Math.round(totalInterest),
    totalPayable: Math.round(totalPayable),
    annualEquivalentRate,
    breakdownYears: breakdownYears.length > 0 ? breakdownYears : undefined,
  };
}
