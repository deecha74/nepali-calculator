import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { NumberToWordsCalculator } from '@/components/calculators/NumberToWordsCalculator';
import { AEOAnswerBox } from '@/components/AEOAnswerBox';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Nepali Number to Words Converter (अङ्कलाई अक्षरमा)",
  description: "Convert numbers to Nepali and English words for writing bank cheques, deposit vouchers, and VAT invoices. Accurate Crore, Lakh, Thousand, and Rupee format.",
  path: "/number-to-words",
  keywords: [
    "number to words nepali",
    "number to word converter nepal",
    "cheque writing amount nepali",
    "cheque amount in words nepal",
    "ankalai aksharma nepali",
    "अङ्कलाई अक्षरमा",
  ],
});

export default function NumberToWordsPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepali Number to Words Converter",
    description: "Online currency amount number to words converter for bank cheques and invoices in Nepal.",
    url: "https://nepalcalc.com/number-to-words",
    category: "FinanceApplication",
  });

  const faqs = [
    {
      question: "How do I write cheque amounts in Nepali words?",
      answer: "In Nepali banking practice, write numbers using the South Asian numbering system (करोड, लाख, हजार, सय) and end with 'रुपैयाँ मात्र' (e.g., NPR 1,50,000 is written as 'एक लाख पचास हजार रुपैयाँ मात्र').",
    },
    {
      question: "Why is 'मात्र' (Only) added at the end of cheque amounts?",
      answer: "Ending the written amount with 'मात्र' in Nepali or 'Only' in English prevents any unauthorized party from adding extra words or numbers to alter the cheque payout value.",
    },
    {
      question: "Do Nepali banks accept cheque amounts in English?",
      answer: "Yes, all commercial and development banks in Nepal (Nabil Bank, Global IME Bank, NIC Asia, Everest Bank, etc.) officially accept cheques written in both Nepali and English words.",
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-emerald">Nepal Banking Standard</span>
          <span className="badge badge-neutral">Cheque & Invoice Ready</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Nepali Number to Words Converter
        </h1>
        <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '640px', margin: '8px auto 0' }}>
          Convert numeric amounts into formal Nepali and English words for bank cheques, cash vouchers, and tax invoices.
        </p>
      </div>

      <NumberToWordsCalculator />

      <AdBanner slotId="number-words-page-middle" format="horizontal" />

      <div style={{ marginTop: '40px' }}>
        <FAQAccordion
          items={faqs}
          title="Cheque Writing & Number to Words FAQs"
          quickSummary={{
            question: "How do you write numbers in words on a bank cheque in Nepal?",
            directAnswer: "To write an amount on a Nepali bank cheque, express the numeric figure in Lakh and Crore notation followed by 'रुपैयाँ मात्र' (in Nepali) or 'Rupees Only' (in English). For example, NPR 2,75,000 is written as 'दुई लाख पचहत्तर हजार रुपैयाँ मात्र' or 'Two Lakh Seventy Five Thousand Rupees Only'.",
            keyFacts: ["Bank Cheque Compliant", "Crore & Lakh Notation", "Includes 'मात्र' / 'Only' suffix"],
            authoritySource: "Nepal Rastra Bank Clearing Standard"
          }}
        />
      </div>
    </div>
  );
}
