export interface SipResult {
  investedAmount: number;
  wealthGain: number;
  maturityValue: number;
  yearlyBreakdown: {
    year: number;
    investedTotal: number;
    wealthGainTotal: number;
    maturityTotal: number;
  }[];
}

export interface MutualFundInfo {
  name: string;
  schemeType: string;
  amc: string;
  expectedCagr: number;
  inceptionYear: string;
}

export const TOP_NEPAL_MUTUAL_FUNDS: MutualFundInfo[] = [
  {
    name: "NIBL Sahabhagita Fund",
    schemeType: "Open-Ended Mutual Fund",
    amc: "NIMB Ace Capital Ltd.",
    expectedCagr: 14.5,
    inceptionYear: "2076 BS",
  },
  {
    name: "Siddhartha Systematic Investment Scheme",
    schemeType: "Open-Ended Mutual Fund",
    amc: "Siddhartha Capital Ltd.",
    expectedCagr: 13.8,
    inceptionYear: "2078 BS",
  },
  {
    name: "NMB Saral Bachat Fund - E",
    schemeType: "Open-Ended Mutual Fund",
    amc: "NMB Capital Ltd.",
    expectedCagr: 12.5,
    inceptionYear: "2078 BS",
  },
  {
    name: "NIC Asia Dynamic Debt Fund",
    schemeType: "Open-Ended Debt Fund",
    amc: "NIC Asia Capital Ltd.",
    expectedCagr: 9.8,
    inceptionYear: "2077 BS",
  },
  {
    name: "Global IME Samunnat Scheme",
    schemeType: "Close-Ended / Equity",
    amc: "Global IME Capital Ltd.",
    expectedCagr: 15.2,
    inceptionYear: "2073 BS",
  },
];

/**
 * Calculates SIP compounding maturity:
 * Formula: M = P * [((1 + i)^n - 1) / i] * (1 + i)
 * where P = monthly investment, i = monthly return rate (r / 12), n = months (years * 12)
 * Supports optional annual step-up percentage.
 */
export function calculateSip(
  monthlyAmount: number,
  annualReturnRate: number,
  tenureYears: number,
  annualStepUpPercent: number = 0
): SipResult {
  const months = tenureYears * 12;
  const monthlyRate = annualReturnRate / 100 / 12;

  let currentMonthly = monthlyAmount;
  let totalInvested = 0;
  let accumulatedWealth = 0;
  const yearlyBreakdown: { year: number; investedTotal: number; wealthGainTotal: number; maturityTotal: number }[] = [];

  for (let m = 1; m <= months; m++) {
    // Add current month investment
    accumulatedWealth = (accumulatedWealth + currentMonthly) * (1 + monthlyRate);
    totalInvested += currentMonthly;

    // Year-end checkpoint or step-up
    if (m % 12 === 0) {
      const year = m / 12;
      yearlyBreakdown.push({
        year,
        investedTotal: Math.round(totalInvested),
        wealthGainTotal: Math.round(accumulatedWealth - totalInvested),
        maturityTotal: Math.round(accumulatedWealth),
      });

      // Apply annual step-up if configured
      if (annualStepUpPercent > 0) {
        currentMonthly = currentMonthly * (1 + annualStepUpPercent / 100);
      }
    }
  }

  const maturityValue = Math.round(accumulatedWealth);
  const investedAmount = Math.round(totalInvested);
  const wealthGain = Math.max(0, maturityValue - investedAmount);

  return {
    investedAmount,
    wealthGain,
    maturityValue,
    yearlyBreakdown,
  };
}
