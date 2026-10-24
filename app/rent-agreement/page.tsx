import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema, generateFaqSchema } from '@/lib/seo/metadata';
import DocPage from '@/components/documents-gen/DocPage';

export const metadata: Metadata = constructMetadata({
  title: 'Rent Agreement Generator Nepal (घर बहाल करारनामा)',
  description: 'Free Nepali rent agreement generator — fill the form, preview live and print a ready house/office/shop rent agreement with deposit, TDS and registered-office clauses.',
  path: '/rent-agreement',
  keywords: ['rent agreement nepal', 'ghar bahal karar', 'घर बहाल करारनामा', 'rent agreement format nepali', 'tenant landlord agreement nepal'],
});

const faqs = [
  { question: 'Does a rent agreement need to be registered in Nepal?', answer: 'A signed agreement between landlord and tenant is valid evidence. Companies that use the address as a registered office, or want stronger proof, usually notarise or register it. Check with your local ward office.' },
  { question: 'Who pays the 10% rent tax (TDS)?', answer: 'If the tenant is a company or organisation it must deduct 10% TDS on rent. The generator lets you choose whether the rent is gross (TDS cut from it) or net (TDS paid extra).' },
  { question: 'Is my data saved on your server?', answer: 'No. Everything stays in your browser (local storage). Nothing is uploaded.' },
  { question: 'Is this a legal advice?', answer: 'No. It is a general template. Have a lawyer review it before signing.' },
];

export default function Page() {
  const schema = generateWebApplicationSchema({
    name: 'Rent Agreement Generator Nepal',
    description: 'Create a print-ready Nepali rent agreement online.',
    url: 'https://nepalcalc.com/rent-agreement',
    category: 'BusinessApplication',
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <DocPage slug="rent-agreement" faqs={faqs} />
    </>
  );
}
