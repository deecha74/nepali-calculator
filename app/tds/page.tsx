import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { TdsCalculator } from '@/components/calculators/TdsCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Nepal TDS & Withholding Tax Calculator 2083/84 — Forward & Reverse Gross-Up",
  description: "Official TDS calculator for Nepal under Income Tax Act 2058. Calculate tax deducted at source for house rent (10%), consultancy (1.5%/15%), freight (2.5%), contracts (1.5%), and reverse gross-up payments.",
  path: "/tds",
  keywords: [
    "nepal tds calculator",
    "tds rate nepal 2083",
    "withholding tax calculator nepal",
    "section 88 tds nepal",
    "reverse tds calculator nepal",
    "gross up tds nepal",
    "house rent tds nepal",
    "consultancy tds nepal",
    "स्रोतमा कर कट्टी हिसाब",
    "e-tds nepal deposit date"
  ],
});

export default function TdsPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal TDS & Withholding Tax Calculator",
    description: "Official Nepal Tax Deducted at Source (TDS) and Withholding Tax calculation utility for businesses, accountants, and taxpayers.",
    url: "https://nepalcalc.com/tds",
    category: "FinancialApplication",
  });

  const faqs = [
    {
      question: "Is TDS in Nepal calculated on the VAT-inclusive or VAT-exclusive amount?",
      answer: "Under Inland Revenue Department (IRD) directives and the Income Tax Act 2058, TDS must be deducted on the taxable base amount EXCLUDING 13% Value Added Tax (VAT). VAT is an indirect tax and cannot be subject to income tax withholding.",
    },
    {
      question: "What is the difference between 1.5% and 15% TDS on service/consultancy fees?",
      answer: "Under Section 88, if the service provider issues an official VAT tax invoice (कर बीजक), the TDS rate is 1.5%. If the service provider is a natural person or business registered only in PAN (without VAT) or an unregistered natural person, the TDS rate is 15%.",
    },
    {
      question: "What is the deadline for depositing TDS in Nepal (दफा ९०)?",
      answer: "Under Section 90 of the Income Tax Act 2058, all tax deducted at source during any Bikram Sambat (BS) month must be deposited to the government revenue account by the 25th day of the following month, along with the submission of the monthly e-TDS return on the IRD portal.",
    },
    {
      question: "How does the Reverse TDS (Gross-Up) calculation work?",
      answer: "If an agreement specifies that a consultant or vendor must receive an exact net in-hand cash amount (e.g. Rs 100,000 net after TDS), the gross taxable invoice is calculated using the formula: Gross Amount = Net Desired / (1 - TDS Rate). This ensures the payer knows the exact billing amount to write on the voucher.",
    },
    {
      question: "What is the TDS rate on house rent for business premises in Nepal?",
      answer: "House rent paid by a corporate entity, company, or business tenant to an individual property owner is subject to 10% rental withholding tax under Section 88 of the Income Tax Act.",
    },
  ];

  return (
    <div className="calculator-page-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <TdsCalculator />
      <AdBanner slotId="tds-page-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Nepal TDS & Withholding Tax FAQs" />
    </div>
  );
}
