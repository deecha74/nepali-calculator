import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { BulkDateConverter } from '@/components/calculators/BulkDateConverter';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Bulk Nepali Date Converter (BS to AD) — Excel Copy-Paste for Offices",
  description: "Convert hundreds of Nepali dates (Bikram Sambat to English AD and vice versa) in one click. Paste directly from Microsoft Excel or Google Sheets.",
  path: "/date/bulk",
  keywords: [
    "bulk nepali date converter",
    "excel date converter nepali",
    "bs to ad bulk converter",
    "ad to bs bulk converter",
    "nepali date converter for excel",
    "bulk date converter nepal",
    "एकमुष्ट मिति रूपान्तरण",
  ],
});

export default function BulkDatePage() {
  const schema = generateWebApplicationSchema({
    name: "Bulk Nepali Date Converter (Excel Copy-Paste)",
    description: "Converts columns of Nepali Bikram Sambat (BS) dates to Gregorian (AD) and vice-versa for Microsoft Excel and spreadsheets.",
    url: "https://nepalcalc.com/date/bulk",
    category: "UtilityApplication",
  });

  const faqs = [
    {
      question: "How do I convert an entire Excel column of Nepali dates at once?",
      answer: "Simply select and copy (Ctrl+C) the date column from Microsoft Excel or Google Sheets, paste it into our bulk converter box, and click 'Copy Converted Column (For Excel)'. You can then paste (Ctrl+V) directly back into your spreadsheet.",
    },
    {
      question: "Which date formats are supported in bulk conversion?",
      answer: "The tool recognizes standard formats including YYYY-MM-DD, YYYY/MM/DD, YYYY.MM.DD, space-separated dates, and Devanagari numerals (e.g., २०८०-०५-१४).",
    },
    {
      question: "Can I convert from AD to BS in bulk as well?",
      answer: "Yes! Use the mode switch to toggle between 'Auto Detect', 'BS to AD', and 'AD to BS'. In Auto Detect mode, years above 2040 are automatically treated as Bikram Sambat (BS).",
    },
    {
      question: "Can I download the results as a CSV file?",
      answer: "Yes. Click the 'Download CSV' button to save a clean spreadsheet file containing row numbers, original inputs, converted dates, and the corresponding day of the week.",
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
          <span className="badge badge-blue">Spreadsheet Tool</span>
          <span className="badge badge-neutral">Excel & CSV Friendly</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Bulk Nepali Date Converter (एकमुष्ट मिति रूपान्तरण)
        </h1>
        <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '640px', margin: '8px auto 0' }}>
          Convert full columns of Bikram Sambat (BS) and English (AD) dates simultaneously for accounting, HR, and banking data entry.
        </p>
      </div>

      <BulkDateConverter />

      <AdBanner slotId="bulk-date-middle" format="horizontal" />

      <div style={{ marginTop: '40px' }}>
        <FAQAccordion
          items={faqs}
          title="Bulk Nepali Date Converter FAQs"
          quickSummary={{
            question: "How can I convert multiple Nepali dates from Excel at once?",
            directAnswer: "Our Bulk Nepali Date Converter lets you paste entire columns directly from Microsoft Excel or Google Sheets (both BS to AD and AD to BS). It instantly parses formats like YYYY-MM-DD or YYYY/MM/DD and allows you to copy the converted dates back into Excel with a single click.",
            keyFacts: [
              "Excel Copy-Paste Friendly",
              "Instant 1-Click Column Copy",
              "Supports BS to AD & AD to BS",
              "Auto-detects Devanagari digits",
              "Downloadable CSV Export"
            ],
            authoritySource: "Nepal Patro & Standard Bikram Sambat Calculations"
          }}
        />
      </div>
    </div>
  );
}
