import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';
import DocHub from '@/components/documents-gen/DocHub';

export const metadata: Metadata = constructMetadata({
  title: 'Legal Document Generators Nepal (कानुनी कागजात)',
  description: 'Free Nepali legal document generators — rent agreement, company AOA (नियमावली) and partnership deed. Fill, preview and print.',
  path: '/document-generators',
  keywords: ['nepali legal documents', 'rent agreement generator', 'aoa generator', 'partnership deed generator', 'कानुनी कागजात'],
});

export default function Page() {
  return <DocHub />;
}
