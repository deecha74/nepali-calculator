export interface ProgrammaticSipScenario {
  slug: string;
  monthlyAmount: number;
  tenureYears: number;
  expectedRate: number;
  title: string;
  metaDescription: string;
  keywords: string[];
}

export const PROGRAMMATIC_SIP_SCENARIOS: ProgrammaticSipScenario[] = [
  {
    slug: "sip-calculator-1000-per-month",
    monthlyAmount: 1000,
    tenureYears: 10,
    expectedRate: 12,
    title: "SIP of NPR 1,000 Per Month in Nepal — 10 Year Maturity Return",
    metaDescription: "What will NPR 1,000 monthly SIP grow to in Nepal? In 10 years at 12% CAGR, an investment of NPR 1.2 Lakh grows to over NPR 2.32 Lakh.",
    keywords: ["sip 1000 per month nepal", "1000 sip calculator nepal", "invest 1000 monthly mutual fund nepal"],
  },
  {
    slug: "sip-calculator-5000-per-month",
    monthlyAmount: 5000,
    tenureYears: 10,
    expectedRate: 12,
    title: "SIP of NPR 5,000 Per Month in Nepal — 10 & 15 Year Wealth Growth",
    metaDescription: "Calculate maturity return on NPR 5,000 monthly SIP in Nepal. An investment of NPR 6 Lakh yields over NPR 11.6 Lakh in 10 years at 12% CAGR.",
    keywords: ["sip 5000 per month nepal", "5000 sip calculator nepal", "5k monthly sip mutual funds nepal"],
  },
  {
    slug: "sip-calculator-10000-per-month",
    monthlyAmount: 10000,
    tenureYears: 10,
    expectedRate: 12,
    title: "SIP of NPR 10,000 Per Month in Nepal — 10 Year & 20 Year Maturity",
    metaDescription: "Investing NPR 10,000 monthly in Nepal mutual funds? At 12% annual return, NPR 12 Lakh invested becomes NPR 23.23 Lakh in 10 years, and NPR 99.9 Lakh in 20 years.",
    keywords: ["sip 10000 per month nepal", "10k sip calculator nepal", "10000 per month mutual fund nepal"],
  },
  {
    slug: "sip-calculator-20000-per-month",
    monthlyAmount: 20000,
    tenureYears: 10,
    expectedRate: 12,
    title: "SIP of NPR 20,000 Per Month in Nepal — Wealth Creation Plan",
    metaDescription: "Calculate NPR 20,000 monthly SIP returns in Nepal. Invest NPR 24 Lakh over 10 years to accumulate over NPR 46.4 Lakh in mutual fund wealth.",
    keywords: ["sip 20000 per month nepal", "20k sip calculator nepal", "invest 20000 monthly nepal"],
  },
  {
    slug: "sip-calculator-50000-per-month",
    monthlyAmount: 50000,
    tenureYears: 10,
    expectedRate: 12,
    title: "SIP of NPR 50,000 Per Month in Nepal — High Net Worth SIP Returns",
    metaDescription: "HNW SIP Calculator Nepal: Investing NPR 50,000 monthly accumulates over NPR 1.16 Crore in 10 years and over NPR 4.99 Crore in 20 years at 12% CAGR.",
    keywords: ["sip 50000 per month nepal", "50k monthly sip nepal", "crorepati sip calculator nepal"],
  },
];
