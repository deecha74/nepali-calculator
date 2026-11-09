import React from 'react';
import { Metadata } from 'next';
import { constructMetadata, SITE_CONFIG } from '@/lib/seo/metadata';
import { BLOG_POSTS } from '@/lib/blog/posts';
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
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Nepali Calc Financial Guides & Law Directory',
    description: 'Official guides and in-depth articles on Nepal Income Tax, Gold billing, Bank Loans, and Land Area calculations.',
    url: `${SITE_CONFIG.url}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'Nepali Calc',
      url: SITE_CONFIG.url,
    },
    blogPost: BLOG_POSTS.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      alternativeHeadline: post.titleNep,
      description: post.excerpt,
      url: `${SITE_CONFIG.url}/blog/${post.slug}`,
      datePublished: post.publishedDate,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogIndexClient />
    </>
  );
}
