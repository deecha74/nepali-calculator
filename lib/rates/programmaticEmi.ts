export interface ProgrammaticEmiScenario {
  slug: string;
  loanAmount: number;
  displayLabel: string;
  loanPurpose: string;
  defaultRate: number;
  defaultTenureYears: number;
  title: string;
  metaDescription: string;
  keywords: string[];
}

export const PROGRAMMATIC_EMI_SCENARIOS: ProgrammaticEmiScenario[] = [
  {
    slug: "5-lakh-loan-emi-nepal",
    loanAmount: 500000,
    displayLabel: "5 Lakh (रु ५ लाख)",
    loanPurpose: "Two-Wheeler & Personal Loan",
    defaultRate: 11.0,
    defaultTenureYears: 5,
    title: "5 Lakh Loan EMI in Nepal — Monthly Installment & Interest (5 Years)",
    metaDescription: "Calculate monthly EMI for a NPR 5,00,000 (5 Lakh) bank loan in Nepal. At 11% interest for 5 years, monthly EMI is रु 10,871. Check 3, 5, and 7-year schedules.",
    keywords: ["5 lakh loan emi in nepal", "500000 loan emi calculator nepal", "bike loan 5 lakh emi nepal"],
  },
  {
    slug: "10-lakh-loan-emi-nepal",
    loanAmount: 1000000,
    displayLabel: "10 Lakh (रु १० लाख)",
    loanPurpose: "Personal & Education Loan",
    defaultRate: 10.5,
    defaultTenureYears: 5,
    title: "10 Lakh Loan EMI in Nepal — 5, 7 & 10 Year Monthly Installment",
    metaDescription: "What is the monthly EMI for a 10 Lakh (NPR 10,00,000) bank loan in Nepal? At 10.5% interest over 5 years, monthly EMI is रु 21,494. Full bank amortization table.",
    keywords: ["10 lakh loan emi in nepal", "1000000 loan emi calculator nepal", "personal loan 10 lakh emi nepal"],
  },
  {
    slug: "15-lakh-loan-emi-nepal",
    loanAmount: 1500000,
    displayLabel: "15 Lakh (रु १५ लाख)",
    loanPurpose: "Education & Small Business Loan",
    defaultRate: 10.5,
    defaultTenureYears: 7,
    title: "15 Lakh Loan EMI in Nepal — Monthly Bank Installment Calculator",
    metaDescription: "Calculate monthly EMI for a 15 Lakh (NPR 15,00,000) loan in Nepal commercial banks. Compare 5, 7, and 10-year repayment schedules and total interest.",
    keywords: ["15 lakh loan emi in nepal", "1500000 loan emi nepal", "education loan 15 lakh emi nepal"],
  },
  {
    slug: "20-lakh-loan-emi-nepal",
    loanAmount: 2000000,
    displayLabel: "20 Lakh (रु २० लाख)",
    loanPurpose: "EV & Auto Hire Purchase Loan",
    defaultRate: 10.0,
    defaultTenureYears: 7,
    title: "20 Lakh Loan EMI in Nepal — EV & Car Loan Monthly Installment",
    metaDescription: "Calculate monthly EMI on a 20 Lakh (NPR 20,00,000) auto or personal loan in Nepal. At 10% for 7 years, monthly EMI is रु 33,202.",
    keywords: ["20 lakh loan emi in nepal", "2000000 car loan emi nepal", "ev loan 20 lakh emi nepal"],
  },
  {
    slug: "25-lakh-loan-emi-nepal",
    loanAmount: 2500000,
    displayLabel: "25 Lakh (रु २५ लाख)",
    loanPurpose: "Electric Car (EV) & Vehicle Loan",
    defaultRate: 9.99,
    defaultTenureYears: 7,
    title: "25 Lakh Loan EMI in Nepal — EV Car & Home Renovation Loan",
    metaDescription: "Monthly EMI for NPR 25,00,000 (25 Lakh) EV or vehicle loan in Nepal. At 9.99% over 7 years, monthly installment is रु 41,491. Compare bank rates.",
    keywords: ["25 lakh loan emi in nepal", "2500000 loan emi calculator nepal", "ev car loan 25 lakh nepal"],
  },
  {
    slug: "30-lakh-loan-emi-nepal",
    loanAmount: 3000000,
    displayLabel: "30 Lakh (रु ३० लाख)",
    loanPurpose: "EV SUV & Abroad Study Loan",
    defaultRate: 9.99,
    defaultTenureYears: 10,
    title: "30 Lakh Loan EMI in Nepal — 7, 10 & 15 Year Bank Installment",
    metaDescription: "Calculate monthly EMI for a 30 Lakh (NPR 30,00,000) bank loan in Nepal. Compare 7-year EV auto loan and 10-year education/home loan repayment tables.",
    keywords: ["30 lakh loan emi in nepal", "3000000 loan emi nepal", "abroad study loan 30 lakh emi nepal"],
  },
  {
    slug: "50-lakh-loan-emi-nepal",
    loanAmount: 5000000,
    displayLabel: "50 Lakh (रु ५० लाख)",
    loanPurpose: "Home Construction & Land Loan",
    defaultRate: 9.8,
    defaultTenureYears: 15,
    title: "50 Lakh Home Loan EMI in Nepal — 10, 15 & 20 Year Installment",
    metaDescription: "How much is the monthly EMI for a 50 Lakh (NPR 50,00,000) home loan in Nepal? At 9.8% for 15 years, monthly EMI is रु 53,120. Full NRB bank schedule.",
    keywords: ["50 lakh home loan emi in nepal", "50 lakh loan emi nepal", "5000000 home loan calculator nepal"],
  },
  {
    slug: "75-lakh-loan-emi-nepal",
    loanAmount: 7500000,
    displayLabel: "75 Lakh (रु ७५ लाख)",
    loanPurpose: "Residential House Purchase Loan",
    defaultRate: 9.8,
    defaultTenureYears: 15,
    title: "75 Lakh Home Loan EMI in Nepal — 15 & 20 Year Repayment Schedule",
    metaDescription: "Calculate monthly EMI for a 75 Lakh (NPR 75,00,000) housing loan in Nepal. Compare 15-year and 20-year tenure monthly installments across commercial banks.",
    keywords: ["75 lakh loan emi in nepal", "75 lakh home loan nepal", "ghar karja 75 lakh emi"],
  },
  {
    slug: "1-crore-loan-emi-nepal",
    loanAmount: 10000000,
    displayLabel: "1 Crore (रु १ करोड)",
    loanPurpose: "Bungalow & Real Estate Mortgage",
    defaultRate: 9.8,
    defaultTenureYears: 20,
    title: "1 Crore Loan EMI in Nepal — 15 & 20 Year Home Loan Installment",
    metaDescription: "What is the monthly EMI on a 1 Crore (NPR 1,00,00,000) home or business loan in Nepal? At 9.8% over 20 years, monthly EMI is रु 95,180. Full breakdown.",
    keywords: ["1 crore loan emi in nepal", "1 crore home loan emi nepal", "10000000 loan emi calculator nepal"],
  },
  {
    slug: "2-crore-loan-emi-nepal",
    loanAmount: 20000000,
    displayLabel: "2 Crore (रु २ करोड)",
    loanPurpose: "Commercial Property & SME Loan",
    defaultRate: 10.0,
    defaultTenureYears: 20,
    title: "2 Crore Loan EMI in Nepal — Commercial & Real Estate Mortgage",
    metaDescription: "Calculate monthly EMI for a 2 Crore (NPR 2,00,00,000) commercial building or real estate loan in Nepal. Detailed 15 and 20-year amortization schedule.",
    keywords: ["2 crore loan emi in nepal", "2 crore home loan nepal", "commercial loan emi calculator nepal"],
  },
];

