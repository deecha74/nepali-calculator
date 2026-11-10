export interface ProgrammaticSalaryTax {
  slug: string;
  monthlySalary: number;
  annualSalary: number;
  title: string;
  metaDescription: string;
  keywords: string[];
  singleAnnualTaxNormal: number;
  singleAnnualTaxSsf: number;
  marriedAnnualTaxNormal: number;
  marriedAnnualTaxSsf: number;
  takeHomeMonthlyNormal: number;
  takeHomeMonthlySsf: number;
}

function computeAnnualTax(annualSalary: number, isSsf: boolean): number {
  let tax = 0;
  let remaining = annualSalary;

  // Band 1: Up to 10,00,000 (1% without SSF, 0% with SSF)
  const band1 = Math.min(remaining, 1000000);
  if (!isSsf) {
    tax += band1 * 0.01;
  }
  remaining -= band1;

  // Band 2: Next 5,00,000 (10L - 15L) @ 10%
  if (remaining > 0) {
    const band2 = Math.min(remaining, 500000);
    tax += band2 * 0.10;
    remaining -= band2;
  }

  // Band 3: Next 10,00,000 (15L - 25L) @ 20%
  if (remaining > 0) {
    const band3 = Math.min(remaining, 1000000);
    tax += band3 * 0.20;
    remaining -= band3;
  }

  // Band 4: Next 15,00,000 (25L - 40L) @ 27%
  if (remaining > 0) {
    const band4 = Math.min(remaining, 1500000);
    tax += band4 * 0.27;
    remaining -= band4;
  }

  // Band 5: Above 40,00,000 @ 29%
  if (remaining > 0) {
    tax += remaining * 0.29;
  }

  return Math.round(tax);
}

function makeSalaryItem(monthly: number): ProgrammaticSalaryTax {
  const annual = monthly * 12;
  const singleNormal = computeAnnualTax(annual, false);
  const singleSsf = computeAnnualTax(annual, true);
  const marriedNormal = singleNormal; // In 2083/84 base tiers are unified at 10L base
  const marriedSsf = singleSsf;
  const takeHomeNormal = Math.round(monthly - singleNormal / 12);
  const takeHomeSsf = Math.round(monthly - singleSsf / 12);

  const formattedMonthly = monthly.toLocaleString('en-IN');
  const formattedAnnual = annual.toLocaleString('en-IN');
  const lakhText = (monthly / 100000) >= 1 ? `${(monthly / 100000).toFixed(monthly % 100000 === 0 ? 0 : 2)} Lakh` : `${monthly / 1000}k`;

  return {
    slug: `tax-on-${monthly}-salary-nepal`,
    monthlySalary: monthly,
    annualSalary: annual,
    title: `Tax on ${formattedMonthly} Salary in Nepal — Monthly & Yearly Income Tax (FY 2083/84)`,
    metaDescription: `Calculate exact tax on NPR ${formattedMonthly} monthly salary (NPR ${formattedAnnual}/yr, ${lakhText}) in Nepal under latest IRD rules. Single vs married slabs, SSF 100% SST waiver, and in-hand take-home pay.`,
    keywords: [
      `tax on ${monthly} salary in nepal`,
      `tax on ${lakhText.toLowerCase()} salary nepal`,
      `income tax on ${formattedMonthly} nepal`,
      `${monthly} salary in hand nepal`,
      `salary tax ${formattedMonthly} nepal 2083`,
    ],
    singleAnnualTaxNormal: singleNormal,
    singleAnnualTaxSsf: singleSsf,
    marriedAnnualTaxNormal: marriedNormal,
    marriedAnnualTaxSsf: marriedSsf,
    takeHomeMonthlyNormal: takeHomeNormal,
    takeHomeMonthlySsf: takeHomeSsf,
  };
}

// All high, medium, and low search volume monthly salaries in Nepal
const MONTHLY_SALARIES = [
  15000, 20000, 22000, 25000, 28000, 30000, 32000, 35000, 38000, 40000,
  42000, 45000, 48000, 50000, 55000, 60000, 65000, 70000, 75000, 80000,
  85000, 90000, 95000, 100000, 110000, 120000, 125000, 130000, 140000,
  150000, 160000, 175000, 180000, 200000, 225000, 250000, 275000, 300000,
  350000, 400000, 450000, 500000, 600000, 750000, 1000000,
];

// Generate programmatic salary tax list
export const PROGRAMMATIC_SALARY_TAXES: ProgrammaticSalaryTax[] = MONTHLY_SALARIES.map(makeSalaryItem);
