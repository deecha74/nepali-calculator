import { Metadata } from 'next';
import BacklinkCommandCenter from '@/components/admin/BacklinkCommandCenter';

export const metadata: Metadata = {
  title: 'Admin Backlink Command Center | NepaliCalc',
  description: 'Private internal SEO & High-Authority Backlink Command Center for NepaliCalc administrators.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminBacklinksPage() {
  return <BacklinkCommandCenter />;
}

