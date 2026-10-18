import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { RentTaxCalculator } from '@/components/calculators/RentTaxCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: "House Rent Tax Calculator Nepal (घरबहाल कर 10%)",
  description: "Calculate 10% municipal house rent tax, company tenant 10% TDS withholding, and net rental income across Kathmandu (KMC) and all Nepal municipalities.",
  path: "/rent-tax",
  keywords: [
    "house rent tax nepal 10%",
    "ghar bahal kar kathmandu kmc",
    "house rent agreement tax lalitpur",
    "commercial lease tds 10% nepal",
    "घरबहाल कर",
    "घर भाडा कर हिसाब"
  ],
});

export default function RentTaxPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal House Rent Tax Calculator",
    description: "Calculate 10% municipality house rent tax and net landlord earnings.",
    url: "https://nepalcalc.com/rent-tax",
    category: "FinanceApplication",
  });

  const faqs = [
    {
      question: "What is the official house rent tax rate in Nepal?",
      answer: "Under the Local Government Operation Act 2074, local municipalities (such as Kathmandu Metropolitan City, Lalitpur, Pokhara) levy a 10% house rent tax on residential rental income.",
    },
    {
      question: "Who is responsible for paying the house rent tax?",
      answer: "The house owner (landlord) is legally responsible for paying the 10% rent tax to the local ward office. However, if the tenant is a registered company or organization, the tenant must withhold 10% TDS from the rent and deposit it to the tax office on behalf of the landlord.",
    },
    {
      question: "Are there any tax exemptions for small rental incomes?",
      answer: "Municipalities do not generally provide exemptions below specific thresholds for rental properties, but policies can vary slightly per local municipal bylaws.",
    },
  ];

  return (
    <div className="container" style={{ padding: '36px 20px 72px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <RentTaxCalculator />
      <div style={{ maxWidth: '900px', margin: '40px auto 0' }}>
        <FAQAccordion items={faqs} title="House Rent Tax FAQs (घरबहाल कर सम्बन्धी जानकारी)" />
      </div>
    </div>
  );
}
