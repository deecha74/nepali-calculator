import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo/metadata';
import { PROGRAMMATIC_LAND_CONVERSIONS } from '@/lib/rates/landRates';
import { PROGRAMMATIC_VEHICLE_TAXES } from '@/lib/rates/programmaticVehicles';
import { PROGRAMMATIC_SALARY_TAXES } from '@/lib/rates/programmaticTax';
import { PROGRAMMATIC_FOREX_CONVERSIONS } from '@/lib/rates/forexRates';
import { PROGRAMMATIC_SIP_SCENARIOS } from '@/lib/rates/programmaticSip';
import { PROGRAMMATIC_GOLD_ITEMS } from '@/lib/rates/programmaticGold';
import { PROGRAMMATIC_TRADITIONAL_UNITS } from '@/lib/rates/traditionalUnitRates';
import { BLOG_POSTS } from '@/lib/blog/posts';

const CONTENT_LAST_MODIFIED = new Date('2026-10-30');

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const uniqueCorePaths = Array.from(
    new Set([
      '',
      '/tax',
      '/tds',
      '/depreciation',
      '/corporate-tax',
      '/land',
      '/vehicle',
      '/nepse',
      '/emi',
      '/sip',
      '/gold',
      '/gold/history',
      '/nea',
      '/date',
      '/forex',
      '/remittance-calculator',
      '/age',
      '/village-interest',
      '/house-construction',
      '/right-share',
      '/bato-katta',
      '/vat',
      '/traditional-units',
      '/interest',
      '/gpa',
      '/fuel',
      '/customs',
      '/gratuity',
      '/inflation',
      '/overtime',
      '/preeti',
      '/number-to-words',
      '/khanepani',
      '/loan-eligibility',
      '/bmi',
      '/pension',
      '/documents',
      '/rashifal',
      '/calendar',
      '/license-exam',
      '/passport-fee',
      '/noc-tax',
      '/rent-tax',
      '/document-generators',
      '/rent-agreement',
      '/aoa',
      '/partnership-deed',
      '/ipo-allotment',
      '/battery-backup',
      '/postal-shipping',
      '/typing-test',
      '/fd-vs-debenture',
      '/krishi-fertilizer',
      '/blood-donation',
      '/qr-generator',
      '/loksewa-age',
      '/date/bulk',
      '/momo-calorie',
      '/university-attendance',
      '/citizenship-age',
      '/foreign-employment',
      '/how-much-gold-can-you-bring-to-nepal',
      '/nepse-wacc',
      '/cgpa',
      '/pregnancy-due-date',
      '/solar-requirement',
      '/property-tax',
      '/paint-cost',
      '/cagr',
      '/calorie-calculator',
      '/nepal-home-loan',
      '/auto-loan',
      '/savings-goal',
      '/discount-calculator',
      '/word-counter',
      '/password-generator',
      '/unit-converter',
      '/base-converter',
      '/body-fat',
      '/sleep-calculator',
      '/scientific-calculator',
      '/statistics-calculator',
      '/tools',
      '/disclaimer',
      '/privacy-policy',
      '/terms-of-service',
      '/contact',
      '/about',
      '/blog',
    ])
  );

  const coreRoutes = uniqueCorePaths.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route === '/about' || route === '/blog' || route === '/tools' ? 0.9 : 0.85,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const programmaticLandRoutes = PROGRAMMATIC_LAND_CONVERSIONS.map((conv) => ({
    url: `${baseUrl}/land/${conv.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const programmaticVehicleRoutes = PROGRAMMATIC_VEHICLE_TAXES.map((veh) => ({
    url: `${baseUrl}/vehicle/${veh.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const programmaticTaxRoutes = PROGRAMMATIC_SALARY_TAXES.map((tax) => ({
    url: `${baseUrl}/tax/${tax.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const programmaticForexRoutes = PROGRAMMATIC_FOREX_CONVERSIONS.map((fx) => ({
    url: `${baseUrl}/forex/${fx.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const programmaticSipRoutes = PROGRAMMATIC_SIP_SCENARIOS.map((scenario) => ({
    url: `${baseUrl}/sip/${scenario.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const programmaticGoldRoutes = PROGRAMMATIC_GOLD_ITEMS.map((gold) => ({
    url: `${baseUrl}/gold/${gold.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const programmaticTraditionalUnitRoutes = PROGRAMMATIC_TRADITIONAL_UNITS.map((unit) => ({
    url: `${baseUrl}/traditional-units/${unit.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  return [
    ...coreRoutes,
    ...programmaticLandRoutes,
    ...programmaticVehicleRoutes,
    ...programmaticTaxRoutes,
    ...programmaticForexRoutes,
    ...programmaticSipRoutes,
    ...programmaticGoldRoutes,
    ...programmaticTraditionalUnitRoutes,
    ...blogRoutes,
  ];
}
