import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { PreetiConverter } from '@/components/calculators/PreetiConverter';
import { AEOAnswerBox } from '@/components/AEOAnswerBox';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Preeti to Nepali Unicode Converter (प्रिती युनिकोड)",
  description: "Fast, accurate Preeti to Nepali Unicode & Unicode to Preeti converter. Convert Kantipur and Preeti fonts to Unicode for Facebook, Word, and mobile devices.",
  path: "/preeti",
  keywords: [
    "preeti to unicode",
    "preeti to unicode converter",
    "unicode to preeti converter",
    "nepali unicode converter",
    "kantipur to unicode",
    "nepali font converter online",
    "प्रिती टु युनिकोड",
  ],
});

export default function PreetiPage() {
  const schema = generateWebApplicationSchema({
    name: "Preeti to Unicode Converter Nepal",
    description: "Online fast bidirectional Preeti to Unicode font converter for Nepal.",
    url: "https://nepalcalc.com/preeti",
    category: "UtilityApplication",
  });

  const faqs = [
    {
      question: "Why should I convert Preeti to Nepali Unicode?",
      answer: "Preeti is a legacy ASCII-based font. If someone opens a Preeti document on a phone, website, or computer without the Preeti TTF font installed, it looks like gibberish English letters (e.g., 'g]kfn'). Converting it to Unicode ensures universal readability across all smartphones, Google Search, Facebook, and modern operating systems.",
    },
    {
      question: "Does this converter work for Kantipur, Sagarmatha, and Himali fonts?",
      answer: "Yes! Kantipur, Sagarmatha, Himali, and traditional legacy fonts share the identical character mapping with Preeti font, so you can freely paste and convert them into Nepali Unicode.",
    },
    {
      question: "Can I convert Nepali Unicode back to Preeti font?",
      answer: "Yes. Simply click the 'Switch Direction' button to convert modern Unicode text back into Preeti font format for older desktop publishing applications like Adobe PageMaker or legacy CorelDraw.",
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
          <span className="badge badge-emerald">Universal Font Support</span>
          <span className="badge badge-neutral">Preeti ⇄ Unicode</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Preeti to Nepali Unicode Converter
        </h1>
        <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '640px', margin: '8px auto 0' }}>
          Convert traditional Preeti, Kantipur, and Sagarmatha fonts into standard Nepali Unicode text instantly.
        </p>
      </div>

      <AEOAnswerBox
        question="How do I convert Preeti font to Unicode in Nepal?"
        directAnswer="To convert Preeti to Unicode, paste your Preeti-encoded text into the left converter box. The tool automatically maps legacy glyphs to universal Devanagari Unicode codepoints (UTF-8), making your text immediately readable on smartphones, web browsers, and Facebook."
        keyFacts={["Zero installation needed", "Bidirectional Preeti ⇄ Unicode", "Works for Kantipur font"]}
        authoritySource="Devanagari Unicode Standard"
      />

      <PreetiConverter />

      <AdBanner slotId="preeti-page-middle" format="horizontal" />

      <div style={{ marginTop: '40px' }}>
        <FAQAccordion items={faqs} title="Preeti to Unicode Conversion FAQs" />
      </div>
    </div>
  );
}
