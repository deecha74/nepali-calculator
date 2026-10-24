'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { FAQAccordion } from '@/components/FAQAccordion';
import DocumentGenerator from './DocumentGenerator';
import { DOC_GENERATORS } from '@/lib/documents/meta';
import { DocIcon } from './DocIcon';

export default function DocPage({ slug, faqs }: { slug: string; faqs: { question: string; answer: string }[] }) {
  const { t, language } = useLanguage();
  const ne = language === 'ne';
  const meta = DOC_GENERATORS.find((d) => d.slug === slug)!;
  const others = DOC_GENERATORS.filter((d) => d.slug !== slug);

  return (
    <div className="container" style={{ padding: '32px 20px 72px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22, flexWrap: 'wrap' }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: meta.bgLight, color: meta.color, display: 'grid', placeItems: 'center' }}>
          <DocIcon name={meta.icon} size={24} />
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <h1 style={{ fontSize: 'clamp(22px,3.2vw,30px)', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
            {ne ? meta.titleNe : meta.titleEn}
          </h1>
          <p style={{ margin: '4px 0 0', color: 'var(--text-muted, #64748b)', fontSize: 14 }}>
            {ne ? meta.descNe : meta.descEn}
          </p>
        </div>
        <span style={{ fontSize: 12, fontWeight: 800, color: meta.color, background: meta.bgLight, padding: '6px 12px', borderRadius: 99 }}>
          {meta.actNe}
        </span>
      </div>

      <DocumentGenerator slug={slug} />

      <div style={{ maxWidth: 900, margin: '44px auto 0' }}>
        <FAQAccordion items={faqs} title={t('Frequently asked questions', 'बारम्बार सोधिने प्रश्न')} />
      </div>

      <div style={{ maxWidth: 900, margin: '32px auto 0', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <strong style={{ fontSize: 13 }}>{t('More generators:', 'अन्य जेनेरेटर:')}</strong>
        {others.map((o) => (
          <Link key={o.slug} href={o.href} className="footer-pill-link">{ne ? o.shortNe : o.shortEn}</Link>
        ))}
        <Link href="/document-generators" className="footer-pill-link">{t('All documents', 'सबै कागजात')}</Link>
      </div>
    </div>
  );
}
