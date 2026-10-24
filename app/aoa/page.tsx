import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema, generateFaqSchema } from '@/lib/seo/metadata';
import DocPage from '@/components/documents-gen/DocPage';

export const metadata: Metadata = constructMetadata({
  title: 'AOA Generator Nepal — Articles of Association (नियमावली)',
  description: 'Free Pvt. Ltd. Articles of Association (नियमावली) generator under Companies Act 2063 — six chapters, live preview and print-ready Nepali output.',
  path: '/aoa',
  keywords: ['aoa nepal', 'articles of association nepal', 'company niyamawali', 'नियमावली', 'pvt ltd aoa format nepali', 'company registration nepal'],
});

const faqs = [
  { question: 'What is the AOA (नियमावली)?', answer: 'The Articles of Association are the internal rules of a company — shares, meetings, directors, accounts and winding up. It is filed with the Office of the Company Registrar along with the MOA.' },
  { question: 'Which law does it follow?', answer: 'Companies Act, 2063 (section 20(4)). A private limited company can have up to 101 shareholders.' },
  { question: 'Can I edit the rules?', answer: 'This generator fills a standard six-chapter template. You can adjust capital, directors, quorum and subscribers. Custom clauses should be added with legal help.' },
  { question: 'Is my data saved on your server?', answer: 'No. Everything stays in your browser.' },
];

export default function Page() {
  const schema = generateWebApplicationSchema({
    name: 'AOA Generator Nepal',
    description: 'Create a Nepali Articles of Association for a private limited company.',
    url: 'https://nepalcalc.com/aoa',
    category: 'BusinessApplication',
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <DocPage slug="aoa" faqs={faqs} />
    </>
  );
}
