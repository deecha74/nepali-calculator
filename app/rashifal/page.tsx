import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema, generateBreadcrumbSchema } from '@/lib/seo/metadata';
import { RashifalHub } from '@/components/rashifal/RashifalHub';

export const metadata: Metadata = constructMetadata({
  title: "दैनिक राशिफल (Daily Rashifal) • आजको राशिफल २०८३",
  description: "आजको दैनिक राशिफल: मेष, वृष, मिथुन, कर्कट, सिंह, कन्या, तुला, वृश्चिक, धनु, मकर, कुम्भ, र मीन राशिको फलादेश, शुभ अङ्क, शुभ रङ्ग र दशा फल।",
  path: "/rashifal",
  keywords: [
    "दैनिक राशिफल",
    "आजको राशिफल",
    "aajako rashifal",
    "daily rashifal nepal",
    "rashifal 2083",
    "nepali horoscope today",
    "mesh rashi aajako",
    "vrish rashi aajako",
    "tula rashi aajako",
    "kumbha rashi rashifal",
  ],
});

export default function RashifalPage() {
  const schema = generateWebApplicationSchema({
    name: "NepalCalc Daily Rashifal (दैनिक राशिफल)",
    description: "Daily Vedic astrological predictions, lucky numbers, colors, and planetary horoscopes for all 12 Rashi signs in Nepal.",
    url: "https://nepalcalc.com/rashifal",
    category: "LifestyleApplication",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://nepalcalc.com" },
    { name: "दैनिक राशिफल", url: "https://nepalcalc.com/rashifal" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RashifalHub />
    </>
  );
}
