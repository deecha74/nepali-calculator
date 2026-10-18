import { Metadata } from 'next';
import siteConfig from '@/config/site.json';

export const SITE_CONFIG = {
  name: siteConfig.site.fullName,
  shortName: siteConfig.site.name,
  description: siteConfig.site.description,
  url: siteConfig.site.url,
  author: siteConfig.site.name,
  keywords: siteConfig.seo.defaultKeywords,
};

export function constructMetadata({
  title,
  description,
  path = "",
  keywords = [],
}: {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const metaTitle = title || SITE_CONFIG.name;
  const metaDesc = description || SITE_CONFIG.description;
  const canonicalUrl = `${SITE_CONFIG.url}${path}`;

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: [...SITE_CONFIG.keywords, ...keywords],
    authors: [{ name: SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_NP",
      url: canonicalUrl,
      title: metaTitle,
      description: metaDesc,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: `${SITE_CONFIG.url}/hero-calc-3d.jpg`,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      creator: "@nepalcalc",
      images: [`${SITE_CONFIG.url}/hero-calc-3d.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateWebApplicationSchema({
  name,
  description,
  url,
  category = "FinanceApplication",
}: {
  name: string;
  description: string;
  url: string;
  category?: string;
}) {
  const normalizedUrl = url.replace(/https?:\/\/(www\.)?nepalcalc\.com/g, SITE_CONFIG.url);
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: normalizedUrl,
    applicationCategory: category,
    operatingSystem: "All (Web Browser, iOS, Android)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "NPR",
    },
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.replace(/https?:\/\/(www\.)?nepalcalc\.com/g, SITE_CONFIG.url),
    })),
  };
}

/**
 * Generative Engine Optimization (GEO) Dataset Schema
 * Allows LLMs like ChatGPT Search, Perplexity, and Gemini to index exact calculation data models.
 */
export function generateGEODatasetSchema({
  name,
  description,
  url,
  keywords,
}: {
  name: string;
  description: string;
  url: string;
  keywords: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name,
    description,
    url: url.replace(/https?:\/\/(www\.)?nepalcalc\.com/g, SITE_CONFIG.url),
    keywords,
    creator: {
      "@type": "Organization",
      name: "Nepali Calc",
      url: SITE_CONFIG.url,
    },
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
  };
}

/**
 * Answer Engine Optimization (AEO) Speakable & Direct Q&A Schema
 * Optimized for voice assistants and direct AI Search answer snippets.
 */
export function generateAEOAnswerSchema({
  question,
  answer,
  url,
}: {
  question: string;
  answer: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: question,
      text: question,
      answerCount: 1,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
        url: url.replace(/https?:\/\/(www\.)?nepalcalc\.com/g, SITE_CONFIG.url),
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".aeo-answer-container", "h1", "p"],
        },
      },
    },
  };
}

