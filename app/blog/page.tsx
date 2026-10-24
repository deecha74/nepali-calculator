import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';
import { BlogIndexClient } from '@/components/blog/BlogIndexClient';

export const metadata: Metadata = constructMetadata({
  title: "Calculator Guides & Financial Rules of Nepal | Nepali Calc Blog",
  description: "Official guides and in-depth articles on Nepal Income Tax FY 2083/84, Live Gold & Silver Jarti billing, Bank Loan EMI & NRB DSTI limits, Land Ropani/Bigha systems, and Bluebook taxes.",
  path: "/blog",
  keywords: [
    "nepal tax guide 2083",
    "gold calculation nepal guide",
    "nepal land measurement guide",
    "vehicle bluebook tax guide nepal",
    "nepse trading fees guide",
    "driving license written exam guide nepal"
  ]
});

export default function BlogPage() {
  return <BlogIndexClient />;
}
