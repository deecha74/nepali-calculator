export interface ProgrammaticInterest {
  slug: string;
  type: 'fd' | 'local';
  title: string;
  shortTitle: string;
  metaDescription: string;
  keywords: string[];
  headlineAnswer: string;
  amountFormatted: string;
  rateText: string;
  periodText: string;
  interestEarned: string;
  taxOrTds: string;
  netReturn: string;
  formula: string;
  faqs: { question: string; answer: string }[];
}

export const PROGRAMMATIC_INTEREST_SCENARIOS: ProgrammaticInterest[] = [
  {
    slug: "1-lakh-fixed-deposit-interest-nepal",
    type: "fd",
    title: "Interest on 1 Lakh Fixed Deposit in Nepal — 1 Year Maturity & Monthly Return",
    shortTitle: "1 Lakh Fixed Deposit Return",
    metaDescription: "How much interest do you earn on NPR 1,00,000 fixed deposit in Nepal commercial banks? Calculate 1-year quarterly compounding return, 5% TDS deduction, and monthly cash flow.",
    keywords: ["1 lakh fixed deposit interest nepal", "interest on 100000 fd in nepal", "1 lakh fd return in nepal commercial banks", "fixed deposit rate nepal"],
    headlineAnswer: "At an average commercial bank Fixed Deposit rate of 7.00% p.a. with quarterly compounding, NPR 1,00,000 yields approximately NPR 7,186 gross interest in 1 year. After deducting the mandatory 5% Nepal government TDS (NPR 359), your net in-hand return is NPR 6,827 (Total maturity: NPR 1,06,827).",
    amountFormatted: "NPR 1,00,000 (1 Lakh)",
    rateText: "7.00% p.a. (Quarterly Compounding)",
    periodText: "1 Year (12 Months)",
    interestEarned: "NPR 7,186 (Gross)",
    taxOrTds: "NPR 359 (5% Nepal Gov TDS)",
    netReturn: "NPR 6,827 Net Return (NPR 1,06,827 Maturity)",
    formula: "A = P × (1 + r/n)^(n×t), Net = Principal + Interest - 5% TDS",
    faqs: [
      {
        question: "How much is the monthly interest on 1 Lakh Fixed Deposit in Nepal?",
        answer: "If you opt for monthly interest payouts instead of cumulative compounding, an NPR 1 Lakh FD at 7.00% pays approximately NPR 583 gross per month. After 5% TDS (NPR 29), you receive NPR 554 net in your savings account every month.",
      },
      {
        question: "Is Fixed Deposit interest safe in Nepal commercial banks?",
        answer: "Yes, deposits up to NPR 5,00,000 in Nepal Rastra Bank licensed Class A commercial banks, Class B development banks, and Class C finance companies are protected under the Deposit and Credit Guarantee Fund (DCGF).",
      },
    ],
  },
  {
    slug: "2-lakh-fixed-deposit-interest-nepal",
    type: "fd",
    title: "Interest on 2 Lakh Fixed Deposit in Nepal — 1 Year Commercial Bank Return",
    shortTitle: "2 Lakh Fixed Deposit Return",
    metaDescription: "Calculate exact interest on NPR 2,00,000 (2 Lakh) Fixed Deposit in Nepal banks. Net return after 5% TDS and maturity payout for 12 months.",
    keywords: ["2 lakh fixed deposit interest nepal", "interest on 200000 fd in nepal", "mudhati khata 2 lakh byaj", "fixed deposit 2 lakh return nepal"],
    headlineAnswer: "Investing NPR 2,00,000 in a 1-year commercial bank Fixed Deposit at 7.00% p.a. yields NPR 14,372 gross interest. After 5% withholding tax (NPR 719), the net interest payout is NPR 13,653, providing a total maturity value of NPR 2,13,653.",
    amountFormatted: "NPR 2,00,000 (2 Lakh)",
    rateText: "7.00% p.a. (Quarterly Compounding)",
    periodText: "1 Year (12 Months)",
    interestEarned: "NPR 14,372 (Gross)",
    taxOrTds: "NPR 719 (5% TDS)",
    netReturn: "NPR 13,653 Net Return (NPR 2,13,653 Maturity)",
    formula: "A = P × (1 + r/4)^4, Net = Principal + (A - P) × 0.95",
    faqs: [
      {
        question: "Can I take a loan against my 2 Lakh fixed deposit in Nepal?",
        answer: "Yes, commercial banks in Nepal permit loan against fixed deposit up to 90% of the principal amount at typically 1.0% to 1.5% above the FD coupon rate without needing real estate collateral.",
      },
    ],
  },
  {
    slug: "5-lakh-fixed-deposit-interest-nepal",
    type: "fd",
    title: "Interest on 5 Lakh Fixed Deposit in Nepal — 1 Year Maturity & Monthly Income",
    shortTitle: "5 Lakh Fixed Deposit Return",
    metaDescription: "Calculate interest on NPR 5,00,000 (5 Lakh) Fixed Deposit in Nepal. Gross interest, 5% government TDS deduction, and net earnings under quarterly compounding.",
    keywords: ["5 lakh fixed deposit interest nepal", "interest on 500000 fd in nepal", "5 lakh fd return in nepal", "monthly income on 5 lakh fd nepal"],
    headlineAnswer: "A 5 Lakh (NPR 5,00,000) Fixed Deposit in Nepal at 7.00% p.a. yields NPR 35,930 gross interest over 12 months. After deducting 5% TDS (NPR 1,796), you receive a net profit of NPR 34,134, making the final maturity payout NPR 5,34,134.",
    amountFormatted: "NPR 5,00,000 (5 Lakh)",
    rateText: "7.00% p.a. (Quarterly Compounding)",
    periodText: "1 Year (12 Months)",
    interestEarned: "NPR 35,930 (Gross)",
    taxOrTds: "NPR 1,796 (5% TDS)",
    netReturn: "NPR 34,134 Net Return (NPR 5,34,134 Maturity)",
    formula: "A = 500000 × (1 + 0.07/4)^4, Net = 500000 + (A - 500000) × 0.95",
    faqs: [
      {
        question: "What is the monthly interest on a 5 Lakh Fixed Deposit in Nepal?",
        answer: "For monthly interest schemes, 5 Lakh at 7.00% generates roughly NPR 2,917 gross per month. After 5% TDS (NPR 146), you receive approximately NPR 2,771 credited into your account every month.",
      },
    ],
  },
  {
    slug: "10-lakh-fixed-deposit-interest-nepal",
    type: "fd",
    title: "Interest on 10 Lakh Fixed Deposit in Nepal — Annual Return & Monthly Cashflow",
    shortTitle: "10 Lakh Fixed Deposit Return",
    metaDescription: "What is the return on NPR 10,00,000 (10 Lakh) Fixed Deposit in Nepal? View gross annual interest, 5% tax deduction, and monthly pension-like income.",
    keywords: ["10 lakh fixed deposit interest nepal", "interest on 10 lakh fd in nepal", "1000000 fd return nepal", "monthly return on 10 lakh fixed deposit nepal"],
    headlineAnswer: "On an NPR 10,00,000 (10 Lakh) Fixed Deposit in a Nepal commercial bank at 7.00% p.a., the 1-year cumulative gross interest is NPR 71,859. Subtracting 5% government withholding tax (NPR 3,593) yields a net interest gain of NPR 68,266 (Total maturity: NPR 10,68,266).",
    amountFormatted: "NPR 10,00,000 (10 Lakh)",
    rateText: "7.00% p.a. (Quarterly Compounding)",
    periodText: "1 Year (12 Months)",
    interestEarned: "NPR 71,859 (Gross)",
    taxOrTds: "NPR 3,593 (5% TDS)",
    netReturn: "NPR 68,266 Net Return (NPR 10,68,266 Maturity)",
    formula: "A = 1000000 × (1 + 0.07/4)^4, Net = 1000000 + (A - 1000000) × 0.95",
    faqs: [
      {
        question: "Can I earn monthly living income from a 10 Lakh FD in Nepal?",
        answer: "Yes, on a monthly interest payout plan at 7.00%, an NPR 10 Lakh deposit provides approximately NPR 5,542 net cash in hand per month after deducting 5% TDS.",
      },
    ],
  },
  {
    slug: "20-lakh-fixed-deposit-interest-nepal",
    type: "fd",
    title: "Interest on 20 Lakh Fixed Deposit in Nepal — 1 Year Maturity & Monthly Payout",
    shortTitle: "20 Lakh Fixed Deposit Return",
    metaDescription: "Calculate 1-year returns on NPR 20,00,000 (20 Lakh) Fixed Deposit in Nepal banks. Net interest after 5% TDS and monthly passive income.",
    keywords: ["20 lakh fixed deposit interest nepal", "interest on 20 lakh fd in nepal", "mudhati khata 20 lakh byaj", "20 lakh monthly fd return nepal"],
    headlineAnswer: "An NPR 20,00,000 (20 Lakh) Fixed Deposit in Nepal at 7.00% p.a. with quarterly compounding earns NPR 1,43,718 gross interest in 1 year. After deducting 5% TDS (NPR 7,186), your net take-home interest is NPR 1,36,532 (Total maturity: NPR 21,36,532).",
    amountFormatted: "NPR 20,00,000 (20 Lakh)",
    rateText: "7.00% p.a. (Quarterly Compounding)",
    periodText: "1 Year (12 Months)",
    interestEarned: "NPR 1,43,718 (Gross)",
    taxOrTds: "NPR 7,186 (5% TDS)",
    netReturn: "NPR 1,36,532 Net Return (NPR 21,36,532 Maturity)",
    formula: "A = 2000000 × (1 + 0.07/4)^4, Net = 2000000 + (A - 2000000) × 0.95",
    faqs: [
      {
        question: "What is the monthly interest on 20 Lakh in Nepal?",
        answer: "On a monthly payout scheme, you receive approximately NPR 11,083 net per month directly in your bank account after 5% TDS.",
      },
    ],
  },
  {
    slug: "50-lakh-fixed-deposit-interest-nepal",
    type: "fd",
    title: "Interest on 50 Lakh Fixed Deposit in Nepal — High Net Worth Return & Monthly Income",
    shortTitle: "50 Lakh Fixed Deposit Return",
    metaDescription: "How much interest do you earn on NPR 50 Lakh Fixed Deposit in Nepal? Calculate 1-year quarterly compounding return, TDS deduction, and monthly passive earnings.",
    keywords: ["50 lakh fixed deposit interest nepal", "interest on 50 lakh fd in nepal", "50 lakh mudhati khata byaj", "50 lakh monthly income nepal"],
    headlineAnswer: "An NPR 50,00,000 (50 Lakh) Fixed Deposit in Nepal at 7.00% p.a. generates NPR 3,59,295 gross interest per year. After deducting 5% TDS (NPR 17,965), your net annual profit is NPR 3,41,330 (Total maturity: NPR 53,41,330).",
    amountFormatted: "NPR 50,00,000 (50 Lakh)",
    rateText: "7.00% p.a. (Quarterly Compounding)",
    periodText: "1 Year (12 Months)",
    interestEarned: "NPR 3,59,295 (Gross)",
    taxOrTds: "NPR 17,965 (5% TDS)",
    netReturn: "NPR 3,41,330 Net Return (NPR 53,41,330 Maturity)",
    formula: "A = 5000000 × (1 + 0.07/4)^4, Net = 5000000 + (A - 5000000) × 0.95",
    faqs: [
      {
        question: "What is the monthly passive income on a 50 Lakh FD in Nepal?",
        answer: "A monthly interest payment scheme on 50 Lakh at 7.00% pays approximately NPR 27,708 net per month after 5% TDS—sufficient to cover typical household living expenses in Kathmandu.",
      },
    ],
  },
  {
    slug: "1-crore-fixed-deposit-interest-nepal",
    type: "fd",
    title: "Interest on 1 Crore Fixed Deposit in Nepal — Passive Income & Maturity Wealth",
    shortTitle: "1 Crore Fixed Deposit Return",
    metaDescription: "Calculate annual and monthly earnings on NPR 1 Crore Fixed Deposit in Nepal commercial banks. Net interest after 5% tax and quarterly compounding growth.",
    keywords: ["1 crore fixed deposit interest nepal", "interest on 1 crore fd in nepal", "1 crore monthly income fixed deposit nepal", "1 crore byaj nepal"],
    headlineAnswer: "Investing NPR 1,00,00,000 (1 Crore) in a 1-year commercial bank Fixed Deposit in Nepal at 7.00% p.a. earns NPR 7,18,590 gross interest. After deducting 5% government TDS (NPR 35,930), your net take-home return is NPR 6,82,660 (Total maturity: NPR 1,06,82,660).",
    amountFormatted: "NPR 1,00,00,000 (1 Crore)",
    rateText: "7.00% p.a. (Quarterly Compounding)",
    periodText: "1 Year (12 Months)",
    interestEarned: "NPR 7,18,590 (Gross)",
    taxOrTds: "NPR 35,930 (5% TDS)",
    netReturn: "NPR 6,82,660 Net Return (NPR 1,06,82,660 Maturity)",
    formula: "A = 10000000 × (1 + 0.07/4)^4, Net = 10000000 + (A - 10000000) × 0.95",
    faqs: [
      {
        question: "Can you live off the interest of 1 Crore in Nepal?",
        answer: "Yes, at 7.00% p.a. with monthly payouts, an NPR 1 Crore deposit produces approximately NPR 55,417 net cash every month after deducting 5% TDS, exceeding the average professional monthly salary in Nepal.",
      },
    ],
  },
  {
    slug: "sayakada-2-byaj-hisab-nepal",
    type: "local",
    title: "Sayakada 2 Byaj Calculator Nepal (सयकडा २ रुपैयाँ ब्याज हिसाब) — Simple & Compound",
    shortTitle: "Sayakada 2 Byaj Hisab",
    metaDescription: "Calculate traditional Nepali local village interest (सयकडा २ ब्याज). Exact monthly interest, annual 24% APR rate, and simple vs annual compounding (साँवा थप) breakdowns.",
    keywords: ["sayakada 2 byaj hisab nepal", "sayakada 2 calculator nepal", "gaule byaj sayakada 2", "सयकडा २ ब्याज", "स्थानीय ब्याज हिसाब"],
    headlineAnswer: "In traditional Nepali local lending, 'सयकडा २' means 2% monthly interest (NPR 2 per month for every NPR 100 principal), which equals 24% annual simple interest. For a loan of NPR 1,00,000 (1 Lakh), the interest is NPR 2,000 per month and NPR 24,000 per year under simple interest.",
    amountFormatted: "NPR 1,00,000 (1 Lakh Principal)",
    rateText: "2% Per Month (24% Per Annum)",
    periodText: "1 Year (12 Months)",
    interestEarned: "NPR 24,000 (Simple) / NPR 26,824 (Compound)",
    taxOrTds: "Informal Lending (No Institutional TDS)",
    netReturn: "Total Due: NPR 1,24,000 (Simple) / NPR 1,26,824 (Compound)",
    formula: "Simple: P × (Rate/100) × Months; Compound: P × (1 + Rate/100)^Months - P",
    faqs: [
      {
        question: "Is Sayakada 2 (24% per year) legal under Nepal Law?",
        answer: "Under the Muluki Civil Code 2074 (मुलुकी देवानी संहिता २०७४, दफा ४७८), the maximum legal interest rate for private personal loans in Nepal is capped at 10% per annum. Charging 24% (Sayakada 2) or higher is legally unenforceable in court, and any interest collected above 10% is deducted from the principal.",
      },
    ],
  },
  {
    slug: "sayakada-3-byaj-hisab-nepal",
    type: "local",
    title: "Sayakada 3 Byaj Calculator Nepal (सयकडा ३ रुपैयाँ ब्याज) — Informal Lending Rate",
    shortTitle: "Sayakada 3 Byaj Hisab",
    metaDescription: "Calculate Sayakada 3 (सयकडा ३) village interest in Nepal. 3% monthly rate (36% per annum), monthly interest per lakh, and legal limit warnings under Muluki Ain.",
    keywords: ["sayakada 3 byaj hisab nepal", "sayakada 3 calculator", "sahu ko byaj 3 rupaiya", "सयकडा ३ ब्याज", "मीटर ब्याज नेपाल"],
    headlineAnswer: "Sayakada 3 (सयकडा ३) represents 3% interest per month (NPR 3 per month per NPR 100 borrowed), translating to an effective annual rate of 36% simple interest. On a loan of NPR 1,00,000, you pay NPR 3,000 every month and NPR 36,000 per year.",
    amountFormatted: "NPR 1,00,000 (1 Lakh Principal)",
    rateText: "3% Per Month (36% Per Annum)",
    periodText: "1 Year (12 Months)",
    interestEarned: "NPR 36,000 (Simple) / NPR 42,576 (Compound)",
    taxOrTds: "Informal Private Lending",
    netReturn: "Total Due: NPR 1,36,000 (Simple) / NPR 1,42,576 (Compound)",
    formula: "Simple: P × 0.03 × Months; Compound: P × (1.03)^Months - P",
    faqs: [
      {
        question: "What should you know about Meter Byaj (मिटर ब्याज) in Nepal?",
        answer: "Charging Sayakada 3 (36%) or higher with coercive compounding (साँवामा ब्याज गाभ्ने) is categorized as predatory usury (मिटर ब्याज). The government of Nepal and the Commission for Investigation of Meter Byaj have criminalized predatory informal lending and made loan contracts over 10% null and void.",
      },
    ],
  },
  {
    slug: "sayakada-1-point-5-byaj-hisab-nepal",
    type: "local",
    title: "Sayakada 1.5 Byaj Calculator Nepal (सयकडा १.५ ब्याज) — 18% Annual Local Rate",
    shortTitle: "Sayakada 1.5 Byaj Hisab",
    metaDescription: "Calculate Sayakada 1.5 (सयकडा डेढ रुपैयाँ ब्याज) in Nepal. Monthly 1.5% interest, 18% annual simple rate, and monthly repayment per lakh.",
    keywords: ["sayakada 1.5 byaj hisab nepal", "sayakada dedh rupaiya byaj", "local interest 1.5 percent nepal", "सयकडा १.५ ब्याज"],
    headlineAnswer: "Sayakada 1.5 (सयकडा १.५ / डेढ रुपैयाँ) equals 1.5% monthly interest or 18% simple interest per year. On a borrowing of NPR 1,00,000 (1 Lakh), the monthly interest charge is NPR 1,500, totaling NPR 18,000 in 1 year.",
    amountFormatted: "NPR 1,00,000 (1 Lakh Principal)",
    rateText: "1.5% Per Month (18% Per Annum)",
    periodText: "1 Year (12 Months)",
    interestEarned: "NPR 18,000 (Simple) / NPR 19,562 (Compound)",
    taxOrTds: "Informal Lending",
    netReturn: "Total Due: NPR 1,18,000 (Simple) / NPR 1,19,562 (Compound)",
    formula: "Simple: P × 0.015 × Months",
    faqs: [
      {
        question: "Is Sayakada 1.5 common for cooperative (सहकारी) loans?",
        answer: "In past years, many savings and credit cooperatives (साकोस) in Nepal charged between 14% and 18% per annum (roughly Sayakada 1.2 to 1.5). Currently, the Department of Cooperatives has imposed a regulatory interest ceiling (सन्दर्भ ब्याजदर) of 14.75% per annum for all licensed cooperatives.",
      },
    ],
  },
];

