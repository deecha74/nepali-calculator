import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';
import { NotFoundClient } from '@/components/NotFoundClient';

export const metadata: Metadata = constructMetadata({
  title: '404 - Page Not Found | Nepali Calc',
  description: 'The page or calculator you are looking for could not be found. Explore official Nepal income tax, gold billing, bank loan EMI, and land measurement tools.',
});

export default function NotFound() {
  return <NotFoundClient />;
}
