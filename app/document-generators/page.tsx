import type { Metadata } from 'next';
import { constructMetadata, SITE_CONFIG } from '@/lib/seo/metadata';
import DocHub from '@/components/documents-gen/DocHub';

export const metadata: Metadata = constructMetadata({
  title: 'Legal Document Generators Nepal (कानुनी कागजात)',
  description: 'Free Nepali legal document generators — rent agreement, company AOA (नियमावली) and partnership deed. Fill, preview and print.',
  path: '/document-generators',
  keywords: ['nepali legal documents', 'rent agreement generator', 'aoa generator', 'partnership deed generator', 'कानुनी कागजात'],
});

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Legal Document Generators Nepal',
    description: 'Free Nepali legal document generators — rent agreement, company AOA and partnership deed.',
    url: `${SITE_CONFIG.url}/document-generators`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'House & Room Rent Agreement Generator',
          url: `${SITE_CONFIG.url}/rent-agreement`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Company Articles of Association (AOA) Generator',
          url: `${SITE_CONFIG.url}/aoa`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Partnership Deed Generator',
          url: `${SITE_CONFIG.url}/partnership-deed`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <DocHub />
    </>
  );
}
