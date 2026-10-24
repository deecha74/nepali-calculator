import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema, generateFaqSchema } from '@/lib/seo/metadata';
import DocPage from '@/components/documents-gen/DocPage';

export const metadata: Metadata = constructMetadata({
  title: 'Partnership Deed Generator Nepal (साझेदारी सम्झौता)',
  description: 'Free Nepali partnership deed generator under Partnership Act 2020 — partners, capital, profit ratio, bank operation and retirement clauses with print-ready output.',
  path: '/partnership-deed',
  keywords: ['partnership deed nepal', 'sajhedari samjhauta', 'साझेदारी सम्झौता', 'partnership firm registration nepal', 'partnership agreement format nepali'],
});

const faqs = [
  { question: 'Which law governs partnership firms in Nepal?', answer: 'The Partnership Act, 2020 (साझेदारी ऐन, २०२०). Firms are registered at the Office of the Company Registrar or the concerned local registration office.' },
  { question: 'Do profit shares need to total 100%?', answer: 'Yes. The generator warns you if the partners’ profit shares do not add up to 100%.' },
  { question: 'How many partners can I add?', answer: 'Up to 10 in this tool. Add, remove and reorder as needed.' },
  { question: 'Is my data saved on your server?', answer: 'No. Everything stays in your browser.' },
];

export default function Page() {
  const schema = generateWebApplicationSchema({
    name: 'Partnership Deed Generator Nepal',
    description: 'Create a print-ready Nepali partnership deed online.',
    url: 'https://nepalcalc.com/partnership-deed',
    category: 'BusinessApplication',
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <DocPage slug="partnership-deed" faqs={faqs} />
    </>
  );
}
