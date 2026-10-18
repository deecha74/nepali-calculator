import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { BatteryBackupCalculator } from '@/components/calculators/BatteryBackupCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: "Inverter Battery Backup Calculator Nepal (ब्याट्री ब्याकअप)",
  description: "Calculate inverter and solar battery backup duration in hours for 12V 100Ah, 150Ah, and 200Ah tubular batteries in Nepal based on household watts load.",
  path: "/battery-backup",
  keywords: [
    "inverter battery backup calculator nepal",
    "150ah battery backup hours",
    "tubular battery load shedding nepal",
    "solar inverter battery calculation",
    "इन्भर्टर ब्याट्री ब्याकअप समय"
  ],
});

export default function BatteryBackupPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Inverter & Battery Backup Calculator",
    description: "Calculate runtime hours of 12V tubular inverter and solar batteries under typical household watt loads.",
    url: "https://nepalcalc.com/battery-backup",
    category: "UtilitiesApplication",
  });

  const faqs = [
    {
      question: "How long does a 150Ah battery last on a normal home load in Nepal?",
      answer: "With 4 LED lights (36W), 2 fans (120W), a Wi-Fi router (15W), and a TV (65W) totaling around 236W, a standard 12V 150Ah tubular battery (80% Depth of Discharge and 85% inverter efficiency) provides approximately 5.1 hours of backup power.",
    },
    {
      question: "What is Depth of Discharge (DoD) for tubular lead-acid batteries?",
      answer: "Most deep cycle tall tubular batteries in Nepal (Exide, Luminous, Eastman) should not be discharged beyond 80% to preserve their 3–5 year operational lifespan. Lithium-ion (LiFePO4) batteries can safely discharge up to 90–95%.",
    },
    {
      question: "What inverter VA size is recommended for a 150Ah battery?",
      answer: "A single 12V 150Ah battery is best paired with a 900VA to 1100VA sine wave inverter (approx. 700W to 850W peak load capacity).",
    },
  ];

  return (
    <div className="container" style={{ padding: '36px 20px 72px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BatteryBackupCalculator />
      <div style={{ maxWidth: '900px', margin: '40px auto 0' }}>
        <FAQAccordion items={faqs} title="Inverter Battery FAQs (ब्याट्री ब्याकअप सम्बन्धी जानकारी)" />
      </div>
    </div>
  );
}
