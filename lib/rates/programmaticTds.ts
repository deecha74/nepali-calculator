export interface ProgrammaticTds {
  slug: string;
  paymentType: string;
  title: string;
  shortTitle: string;
  metaDescription: string;
  keywords: string[];
  tdsRate: string;
  sectionCode: string;
  thresholdExemption: string;
  grossUpExample: string;
  headlineAnswer: string;
  faqs: { question: string; answer: string }[];
}

export const PROGRAMMATIC_TDS_SCENARIOS: ProgrammaticTds[] = [
  {
    slug: "house-rent-tds-rate-nepal",
    paymentType: "House Rent (घर बहाल कर)",
    title: "House Rent TDS Rate in Nepal (घर बहाल कर कट्टी) — Section 88 & Local Ward Tax",
    shortTitle: "House Rent TDS Rate",
    metaDescription: "What is the house rent TDS rate in Nepal? Understand 10% local municipality ward rent tax vs Section 88 IRD withholding tax, payment deadlines, and tenant deduction rules.",
    keywords: ["house rent tds rate nepal", "house rent tax in nepal", "ghar bahal kar nepal 2083", "room rent tds nepal", "10 percent rent tax nepal"],
    tdsRate: "10% Flat Rate",
    sectionCode: "Local Government Operation Act 2074 & Section 88",
    thresholdExemption: "No exemption threshold (applicable on total monthly rental)",
    grossUpExample: "For Net NPR 50,000 rent in hand: Gross Rent = 50,000 / 0.90 = NPR 55,556 (TDS: NPR 5,556)",
    headlineAnswer: "Under current Nepal fiscal rules, House Rent Tax is 10%. If the rented property belongs to an individual (natural person), the 10% tax is deposited directly to the local Ward Office (वडा कार्यालय). If rented from an entity or institutional landlord, 10% TDS is deducted under Section 88 and deposited via IRD e-TDS.",
    faqs: [
      {
        question: "Who is responsible for paying house rent tax in Nepal: landlord or tenant?",
        answer: "By law, the landlord is liable for tax on rental income. However, commercial business tenants are legally obligated to deduct the 10% tax at source (TDS) and pay the remaining 90% net to the landlord.",
      },
      {
        question: "Is house rent tax refundable or adjustable against income tax?",
        answer: "For natural persons (individuals) not running a sole proprietorship, the 10% local house rent tax is a final withholding tax (अन्तिम कर) and cannot be claimed as an advance tax credit.",
      },
    ],
  },
  {
    slug: "consultancy-service-tds-rate-nepal",
    paymentType: "Consultancy & Service Fees (परामर्श सेवा)",
    title: "Consultancy Service TDS Rate in Nepal — 1.5% (VAT) vs 15% (PAN) Section 88",
    shortTitle: "Consultancy TDS Rate",
    metaDescription: "Check Section 88 TDS rates on consultancy and professional services in Nepal. When does 1.5% VAT apply vs 15% PAN withholding tax under the Income Tax Act?",
    keywords: ["consultancy service tds rate nepal", "section 88 consultancy tds nepal", "1.5 percent tds on vat invoice", "15 percent tds on consultancy nepal", "service tds nepal"],
    tdsRate: "1.5% (with VAT invoice) or 15% (PAN / Unregistered)",
    sectionCode: "Income Tax Act 2058, Section 88(1)",
    thresholdExemption: "Applicable on all professional fee amounts",
    grossUpExample: "For Net NPR 1,00,000 in hand (Non-VAT): Gross = 1,00,000 / 0.85 = NPR 1,17,647 (TDS: NPR 17,647)",
    headlineAnswer: "Under Section 88 of the Income Tax Act 2058, consultancy and service fee payments in Nepal are subject to 1.5% TDS if the provider issues an official VAT tax invoice (कर बीजक). If the provider is registered only in PAN or is an unregistered natural person, a 15% TDS rate must be withheld.",
    faqs: [
      {
        question: "Is TDS calculated on the total bill or the taxable amount excluding VAT?",
        answer: "TDS is strictly calculated on the taxable service amount EXCLUDING 13% VAT. For example, on a bill of NPR 100,000 + 13,000 VAT, 1.5% TDS is calculated on NPR 100,000 (NPR 1,500 TDS), never on the VAT portion.",
      },
    ],
  },
  {
    slug: "transportation-freight-tds-rate-nepal",
    paymentType: "Transportation & Freight (ढुवानी सेवा)",
    title: "Transportation & Freight TDS Rate in Nepal (ढुवानी सेवा कर) — Section 88Ka",
    shortTitle: "Transportation TDS Rate",
    metaDescription: "What is the TDS rate on vehicle transport and goods freight in Nepal? Calculate 2.5% freight TDS under Section 88Ka, vehicle leasing rules, and gross-up calculations.",
    keywords: ["transportation freight tds rate nepal", "dhuwani tds rate nepal", "freight withholding tax nepal", "section 88ka nepal", "2.5 percent transport tds"],
    tdsRate: "2.5% Withholding Tax",
    sectionCode: "Income Tax Act 2058, Section 88Ka",
    thresholdExemption: "Applicable on transport invoices",
    grossUpExample: "For Net NPR 40,000 freight payment: Gross = 40,000 / 0.975 = NPR 41,026 (TDS: NPR 1,026)",
    headlineAnswer: "Under Section 88Ka of Nepal's Income Tax Act, freight and transportation service payments (ढुवानी सेवा) are subject to 2.5% TDS. If the vehicle operator issues a VAT bill, standard 1.5% applies instead.",
    faqs: [
      {
        question: "Does 2.5% freight TDS apply to courier and parcel delivery?",
        answer: "Domestic cargo, truck carriage, and container freight fall under 2.5% freight TDS under Section 88Ka. Express document couriers registered in VAT typically bill with VAT at 1.5% TDS.",
      },
    ],
  },
  {
    slug: "contract-payment-tds-section-89-nepal",
    paymentType: "Contract & Construction (दफा ८९ ठेक्का कर)",
    title: "Contract Payment TDS Rate in Nepal — Section 89 (1.5% Withholding Tax)",
    shortTitle: "Contract TDS Section 89",
    metaDescription: "Understand Section 89 contract withholding tax in Nepal. 1.5% TDS on contracts exceeding NPR 50,000, tender payments, and construction work.",
    keywords: ["contract payment tds section 89 nepal", "thekka kar nepal", "construction contract tds nepal", "section 89 income tax act nepal", "1.5 percent contract tds"],
    tdsRate: "1.5% Flat Rate",
    sectionCode: "Income Tax Act 2058, Section 89",
    thresholdExemption: "Exempt if total contract payments in a fiscal year do not exceed NPR 50,000",
    grossUpExample: "On NPR 5,00,000 contract milestone bill: TDS = NPR 7,500; Net Paid = NPR 4,92,500",
    headlineAnswer: "Under Section 89 of the Income Tax Act 2058, resident entities making payments under a contract or work agreement exceeding NPR 50,000 in a fiscal year must withhold 1.5% TDS on the gross payment amount.",
    faqs: [
      {
        question: "Is Section 89 contract TDS an advance tax or final tax?",
        answer: "Section 89 contract TDS is an advance tax (अग्रिम कर). The contractor can adjust the 1.5% TDS withheld against their annual Corporate Income Tax liability when filing their income tax return (D1/D2/D3).",
      },
    ],
  },
  {
    slug: "audit-fee-tds-rate-nepal",
    paymentType: "Audit & Accounting Fees (लेखापरीक्षण शुल्क)",
    title: "Audit Fee TDS Rate in Nepal (लेखापरीक्षक शुल्क कर कट्टी) — Section 88",
    shortTitle: "Audit Fee TDS Rate",
    metaDescription: "What is the TDS rate for statutory audit and accounting fees in Nepal? 1.5% VAT vs 15% non-VAT withholding rules for Chartered Accountants and audit firms.",
    keywords: ["audit fee tds rate nepal", "accounting fee withholding tax nepal", "ca audit tds nepal", "section 88 audit fee", "audit kar katti"],
    tdsRate: "1.5% (VAT registered) or 15% (PAN firm / Individual)",
    sectionCode: "Income Tax Act 2058, Section 88(1)",
    thresholdExemption: "No threshold exemption",
    grossUpExample: "On NPR 50,000 audit fee with VAT: Taxable base NPR 50,000; TDS @ 1.5% = NPR 750",
    headlineAnswer: "Audit fees paid to Chartered Accountants (CA) or Registered Auditors (RA) are treated as professional service fees under Section 88. If the audit firm is registered in VAT and bills with a VAT invoice, the TDS rate is 1.5%. If registered only in PAN, the TDS is 15%.",
    faqs: [
      {
        question: "When must audit fee TDS be deposited to the IRD in Nepal?",
        answer: "Audit fee TDS must be deposited by the 25th day of the subsequent Bikram Sambat month using the IRD online e-TDS portal.",
      },
    ],
  },
  {
    slug: "vehicle-hire-tds-rate-nepal",
    paymentType: "Vehicle Hire & Equipment Lease (गाडी भाडा कर)",
    title: "Vehicle Hire TDS Rate in Nepal (गाडी भाडा कर कट्टी) — 10% vs 1.5% VAT Rules",
    shortTitle: "Vehicle Hire TDS Rate",
    metaDescription: "Calculate vehicle hire and machinery rental TDS in Nepal. 10% withholding tax on private vehicle rental vs 1.5% on VAT tourist vehicle transport invoices.",
    keywords: ["vehicle hire tds rate nepal", "car rental tds nepal", "gadi bhada tds nepal", "equipment rental tax nepal", "vehicle leasing withholding tax"],
    tdsRate: "10% (General vehicle rent) or 1.5% (VAT tourist transport)",
    sectionCode: "Income Tax Act 2058, Section 88",
    thresholdExemption: "No exemption threshold",
    grossUpExample: "For NPR 60,000 monthly vehicle hire: TDS @ 10% = NPR 6,000; Net Paid = NPR 54,000",
    headlineAnswer: "Hiring a private vehicle, car, or heavy machinery from an individual or non-VAT firm incurs a 10% TDS rate on the rental amount under Section 88. If rented through a VAT-registered travel/transport agency with an official VAT invoice, the TDS is 1.5%.",
    faqs: [
      {
        question: "Does vehicle hire TDS include fuel and driver salary?",
        answer: "If the rental agreement is an all-inclusive operating lease, TDS is deducted on the total invoice amount. If fuel is reimbursed separately against VAT petrol pump receipts, fuel is exempt from TDS.",
      },
    ],
  },
  {
    slug: "bank-interest-tds-rate-nepal",
    paymentType: "Bank Interest on Deposits (बैंक ब्याज कर)",
    title: "Bank Interest TDS Rate in Nepal (बैंक निक्षेप ब्याज कर) — 5% Final Tax",
    shortTitle: "Bank Interest TDS Rate",
    metaDescription: "What is the tax on bank interest in Nepal? Fixed Deposit, savings accounts, and debenture interest 5% final withholding tax rules under Section 88.",
    keywords: ["bank interest tds rate nepal", "fixed deposit interest tax nepal", "savings account interest tds nepal", "5 percent interest tax nepal", "bank byaj kar"],
    tdsRate: "5% Final Withholding Tax",
    sectionCode: "Income Tax Act 2058, Section 88 & Section 92",
    thresholdExemption: "Deducted automatically by banks on all earned interest",
    grossUpExample: "On NPR 10,000 gross interest: 5% TDS = NPR 500; Net Credited = NPR 9,500",
    headlineAnswer: "Interest earned by resident individuals on savings accounts, fixed deposits (मुद्दती खाता), and debentures in Nepal is subject to a 5% final withholding tax (TDS). Commercial banks deduct this 5% automatically before crediting interest.",
    faqs: [
      {
        question: "Do individuals have to declare bank interest on their personal tax return?",
        answer: "No, under Section 92, the 5% bank interest TDS is a Final Withholding Tax (अन्तिम कर कट्टी) for natural persons, meaning it does not need to be added to your employment or business income.",
      },
    ],
  },
  {
    slug: "dividend-tax-rate-nepal",
    paymentType: "NEPSE Cash Dividends (लाभांश कर)",
    title: "Dividend Tax Rate in Nepal (नेप्से लाभांश कर) — 5% Withholding Tax",
    shortTitle: "Dividend Tax Rate",
    metaDescription: "What is the dividend tax rate on NEPSE shares in Nepal? 5% cash dividend tax deduction, bonus share tax rules, and distribution tax laws.",
    keywords: ["dividend tax rate nepal", "nepse dividend tax", "bonus share dividend tax nepal", "5 percent dividend tax nepal", "sebon dividend tax"],
    tdsRate: "5% Final Tax",
    sectionCode: "Income Tax Act 2058, Section 54 & Section 88",
    thresholdExemption: "Withheld directly by listed companies before disbursement",
    grossUpExample: "On NPR 20,000 cash dividend: 5% TDS = NPR 1,000; Net Deposited = NPR 19,000",
    headlineAnswer: "Under Section 88 of the Income Tax Act, cash dividends distributed by resident companies and NEPSE-listed entities to resident individual shareholders are taxed at a 5% final withholding rate.",
    faqs: [
      {
        question: "Who pays the tax on bonus shares in Nepal?",
        answer: "When a company issues bonus shares (stock dividend), a 5% dividend tax on the paid-up value must be paid. Many companies propose a small cash dividend specifically to cover this 5% bonus share tax on behalf of shareholders.",
      },
    ],
  },
];

