export interface HistoricalInflation {
  yearBs: number;
  yearAd: number;
  avgInflationRate: number; // percentage
}

/**
 * Historical and projected CPI inflation rates in Nepal (source: Nepal Rastra Bank / Central Bureau of Statistics)
 */
export const NEPAL_HISTORICAL_INFLATION: HistoricalInflation[] = [
  { yearBs: 2070, yearAd: 2013, avgInflationRate: 9.1 },
  { yearBs: 2071, yearAd: 2014, avgInflationRate: 7.2 },
  { yearBs: 2072, yearAd: 2015, avgInflationRate: 9.9 }, // Earthquake year
  { yearBs: 2073, yearAd: 2016, avgInflationRate: 4.5 },
  { yearBs: 2074, yearAd: 2017, avgInflationRate: 4.2 },
  { yearBs: 2075, yearAd: 2018, avgInflationRate: 4.6 },
  { yearBs: 2076, yearAd: 2019, avgInflationRate: 6.1 },
  { yearBs: 2077, yearAd: 2020, avgInflationRate: 3.6 },
  { yearBs: 2078, yearAd: 2021, avgInflationRate: 6.3 },
  { yearBs: 2079, yearAd: 2022, avgInflationRate: 7.8 },
  { yearBs: 2080, yearAd: 2023, avgInflationRate: 6.5 },
  { yearBs: 2081, yearAd: 2024, avgInflationRate: 5.4 },
  { yearBs: 2082, yearAd: 2025, avgInflationRate: 5.2 },
  { yearBs: 2083, yearAd: 2026, avgInflationRate: 5.5 },
];

export const NEPAL_AVERAGE_ANNUAL_INFLATION = 6.2; // 6.2% long-term historical average

/**
 * Calculates future purchasing power erosion or historical equivalent value
 */
export function calculateFuturePurchasingPower(
  presentAmount: number,
  annualInflationRate: number,
  futureYears: number
): { futureEquivalentValue: number; realPurchasingPower: number; cumulativeInflationPercent: number } {
  const rateDecimal = annualInflationRate / 100;
  // Future cost for same goods
  const futureEquivalentValue = presentAmount * Math.pow(1 + rateDecimal, futureYears);
  // Real purchasing power of same money
  const realPurchasingPower = presentAmount / Math.pow(1 + rateDecimal, futureYears);
  const cumulativeInflationPercent = ((Math.pow(1 + rateDecimal, futureYears) - 1) * 100);

  return {
    futureEquivalentValue: Math.round(futureEquivalentValue),
    realPurchasingPower: Math.round(realPurchasingPower),
    cumulativeInflationPercent: Math.round(cumulativeInflationPercent * 10) / 10,
  };
}
