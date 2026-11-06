import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema, SITE_CONFIG } from '@/lib/seo/metadata';
import { PasswordGeneratorCalculator } from '@/components/calculators/PasswordGeneratorCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: 'Secure Password Generator & Entropy Checker [100% Client-Side]',
  description: 'Generate strong cryptographic passwords locally in your browser for MeroShare, mobile banking, eSewa, and email accounts with entropy bit analysis →',
  path: '/password-generator',
  keywords: ['password generator online', 'strong password generator nepal', 'random password creator', 'entropy password checker'],
});

export default function PasswordGeneratorPage() {
  const schema = generateWebApplicationSchema({
    name: 'Cryptographic Password Generator & Strength Checker',
    description: 'Generate high-entropy random passwords locally in your browser.',
    url: `${SITE_CONFIG.url}/password-generator`,
    category: 'UtilityApplication',
  });

  const faqs = [
    {
      question: 'Are passwords generated on this page stored or sent over the internet?',
      answer: 'No. All passwords are generated 100% locally inside your web browser memory and are never transmitted or logged anywhere.',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <PasswordGeneratorCalculator />
      <div style={{ marginTop: '36px', maxWidth: '900px', margin: '36px auto 0' }}>
        <FAQAccordion items={faqs} title="Password Security FAQs" />
      </div>
    </div>
  );
}

