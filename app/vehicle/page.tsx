import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { VehicleTaxCalculator } from '@/components/calculators/VehicleTaxCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Vehicle Bluebook Tax & Fine Calculator Nepal (सवारी कर)",
  description: "Calculate annual vehicle tax, bluebook renewal late fines, and third-party insurance for bikes, scooters, and cars in Bagmati & all Nepal provinces.",
  path: "/vehicle",
  keywords: [
    "bluebook renewal fine nepal",
    "vehicle tax calculator nepal",
    "bike tax bagmati province 2081",
    "bike ko bluebook renewal tax kati lagcha",
    "bluebook fine kasari hisab garne",
    "bike renew garnu agadi insurance chahincha ki nai",
    "nepal ma gadi tax kati huncha",
    "car tax nepal",
    "yatayat tax renewal fine",
    "सवारी कर बागमती प्रदेश",
    "ब्लुबुक नवीकरण जरिवाना"
  ],
});

export default function VehiclePage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Vehicle Bluebook Tax & Fine Calculator",
    description: "Official annual road tax and late renewal fine calculator for Nepal vehicles.",
    url: "https://nepalcalc.com/vehicle",
    category: "UtilityApplication",
  });

  const faqs = [
    {
      question: "Bike ko bluebook renewal fine kati lagcha? (When do vehicle renewal fines start?)",
      answer: "You should renew your bluebook within the current fiscal year or within 90 days from the registration expiry date. Renewing within this period incurs zero late penalty. If overdue into the next fiscal year, penalties start at 20% to 32%, scaling up to 100% fine on annual vehicle tax.",
    },
    {
      question: "What is the late fine for overdue bike renewal after 1 year?",
      answer: "If vehicle renewal is overdue into the subsequent fiscal year, fines range from 20% to 32%, escalating to 100% fine on annual tax for multi-year overdue vehicles.",
    },
    {
      question: "Bluebook renew garda third-party insurance compulsory huncha?",
      answer: "Yes, a valid third-party motor insurance certificate is legally mandatory before the Transport Management Office (Yatayat Karyalaya) can stamp your bluebook renewal.",
    },
  ];

  return (
    <div className="calculator-page-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <VehicleTaxCalculator />
      <AdBanner slotId="vehicle-page-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Vehicle Bluebook & Tax FAQs" />
    </div>
  );
}
