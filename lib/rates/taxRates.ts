export interface TaxSlab {
  label: string;
  limit: number; // slab ceiling or incremental limit
  rate: number;  // percentage (e.g., 0.01 for 1%)
}

export interface FiscalYearTaxConfig {
  fiscalYear: string; // e.g. "2083/84", "2082/83", "2081/82"
  label: string;
  isCurrent: boolean;
  notes: string;
  // Slabs for Unmarried / Individual
  unmarriedSlabs: TaxSlab[];
  // Slabs for Married (Joint)
  marriedSlabs: TaxSlab[];
  // Social Security Tax (SST) rate on first bracket
  sstRate: number; // 0.01 (1%)
  // Exemption of SST if registered in SSF
  ssfExemptsFirstSlabTax: boolean;
  // Maximum deductions
  maxCitEpfDeduction: number; // 500,000 or 1/3 of income
  maxLifeInsuranceDeduction: number; // 40,000
  maxHealthInsuranceDeduction: number; // 20,000
  femaleTaxRebate: number; // 0.10 (10% rebate for salaried resident females)
}

/**
 * Historical, current, and upcoming fiscal year tax configurations.
 * Allows instant budget updates or auto-selecting the active fiscal year.
 */
export const TAX_CONFIGS: Record<string, FiscalYearTaxConfig> = {
  "2083/84": {
    fiscalYear: "2083/84",
    label: "FY 2083/84 (Current Active)",
    isCurrent: true,
    notes: "Latest Budget structure with 1% SST, revised higher tiers, and full SSF integration.",
    unmarriedSlabs: [
      { label: "First NPR 10,00,000", limit: 1000000, rate: 0.01 },
      { label: "Next NPR 5,00,000 (10L - 15L)", limit: 500000, rate: 0.10 },
      { label: "Next NPR 10,00,000 (15L - 25L)", limit: 1000000, rate: 0.20 },
      { label: "Next NPR 15,00,000 (25L - 40L)", limit: 1500000, rate: 0.27 },
      { label: "Above NPR 40,00,000", limit: Infinity, rate: 0.29 },
    ],
    marriedSlabs: [
      { label: "First NPR 10,00,000", limit: 1000000, rate: 0.01 },
      { label: "Next NPR 5,00,000 (10L - 15L)", limit: 500000, rate: 0.10 },
      { label: "Next NPR 10,00,000 (15L - 25L)", limit: 1000000, rate: 0.20 },
      { label: "Next NPR 15,00,000 (25L - 40L)", limit: 1500000, rate: 0.27 },
      { label: "Above NPR 40,00,000", limit: Infinity, rate: 0.29 },
    ],
    sstRate: 0.01,
    ssfExemptsFirstSlabTax: true,
    maxCitEpfDeduction: 500000,
    maxLifeInsuranceDeduction: 40000,
    maxHealthInsuranceDeduction: 20000,
    femaleTaxRebate: 0.10,
  },
  "2082/83": {
    fiscalYear: "2082/83",
    label: "FY 2082/83",
    isCurrent: false,
    notes: "Differentiated single (5L) vs married (6L) base brackets.",
    unmarriedSlabs: [
      { label: "First NPR 5,00,000", limit: 500000, rate: 0.01 },
      { label: "Next NPR 2,00,000 (5L - 7L)", limit: 200000, rate: 0.10 },
      { label: "Next NPR 3,00,000 (7L - 10L)", limit: 300000, rate: 0.20 },
      { label: "Next NPR 10,00,000 (10L - 20L)", limit: 1000000, rate: 0.30 },
      { label: "Next NPR 30,00,000 (20L - 50L)", limit: 3000000, rate: 0.36 },
      { label: "Above NPR 50,00,000", limit: Infinity, rate: 0.39 },
    ],
    marriedSlabs: [
      { label: "First NPR 6,00,000", limit: 600000, rate: 0.01 },
      { label: "Next NPR 2,00,000 (6L - 8L)", limit: 200000, rate: 0.10 },
      { label: "Next NPR 3,00,000 (8L - 11L)", limit: 300000, rate: 0.20 },
      { label: "Next NPR 9,00,000 (11L - 20L)", limit: 900000, rate: 0.30 },
      { label: "Next NPR 30,00,000 (20L - 50L)", limit: 3000000, rate: 0.36 },
      { label: "Above NPR 50,00,000", limit: Infinity, rate: 0.39 },
    ],
    sstRate: 0.01,
    ssfExemptsFirstSlabTax: true,
    maxCitEpfDeduction: 500000,
    maxLifeInsuranceDeduction: 40000,
    maxHealthInsuranceDeduction: 20000,
    femaleTaxRebate: 0.10,
  },
  "2081/82": {
    fiscalYear: "2081/82",
    label: "FY 2081/82",
    isCurrent: false,
    notes: "Prior year rates for audit and retrospective return filing.",
    unmarriedSlabs: [
      { label: "First NPR 5,00,000", limit: 500000, rate: 0.01 },
      { label: "Next NPR 2,00,000 (5L - 7L)", limit: 200000, rate: 0.10 },
      { label: "Next NPR 3,00,000 (7L - 10L)", limit: 300000, rate: 0.20 },
      { label: "Next NPR 10,00,000 (10L - 20L)", limit: 1000000, rate: 0.30 },
      { label: "Next NPR 30,00,000 (20L - 50L)", limit: 3000000, rate: 0.36 },
      { label: "Above NPR 50,00,000", limit: Infinity, rate: 0.39 },
    ],
    marriedSlabs: [
      { label: "First NPR 6,00,000", limit: 600000, rate: 0.01 },
      { label: "Next NPR 2,00,000 (6L - 8L)", limit: 200000, rate: 0.10 },
      { label: "Next NPR 3,00,000 (8L - 11L)", limit: 300000, rate: 0.20 },
      { label: "Next NPR 9,00,000 (11L - 20L)", limit: 900000, rate: 0.30 },
      { label: "Next NPR 30,00,000 (20L - 50L)", limit: 3000000, rate: 0.36 },
      { label: "Above NPR 50,00,000", limit: Infinity, rate: 0.39 },
    ],
    sstRate: 0.01,
    ssfExemptsFirstSlabTax: true,
    maxCitEpfDeduction: 500000,
    maxLifeInsuranceDeduction: 40000,
    maxHealthInsuranceDeduction: 20000,
    femaleTaxRebate: 0.10,
  },
};

/**
 * Calculates current active fiscal year based on calendar date.
 * Nepali FY runs from Shrawan 1 (~July 16) to Ashad end (~July 15).
 */
export function getActiveFiscalYear(customDate?: Date): string {
  if (!customDate) {
    return "2083/84";
  }
  const now = customDate;
  const year = now.getFullYear();
  const month = now.getMonth(); // 0 = Jan, 6 = July
  const day = now.getDate();

  // If before mid-July (July 16), it belongs to previous BS fiscal cycle
  const isBeforeNewFY = month < 6 || (month === 6 && day < 16);
  const bsStartYear = isBeforeNewFY ? year + 57 - 1 : year + 57;
  const nextYearShort = (bsStartYear + 1) % 100;
  const calculatedFY = `${bsStartYear}/${nextYearShort < 10 ? '0' : ''}${nextYearShort}`;

  // If in pre-configured list, return it; otherwise fallback to default current
  return TAX_CONFIGS[calculatedFY] ? calculatedFY : "2083/84";
}
