import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo/metadata';
import { PROGRAMMATIC_LAND_CONVERSIONS } from '@/lib/rates/landRates';
import { PROGRAMMATIC_VEHICLE_TAXES } from '@/lib/rates/programmaticVehicles';
import { PROGRAMMATIC_SALARY_TAXES } from '@/lib/rates/programmaticTax';
import { PROGRAMMATIC_FOREX_CONVERSIONS } from '@/lib/rates/forexRates';
import { PROGRAMMATIC_SIP_SCENARIOS } from '@/lib/rates/programmaticSip';
import { PROGRAMMATIC_GOLD_ITEMS } from '@/lib/rates/programmaticGold';
import { PROGRAMMATIC_TRADITIONAL_UNITS } from '@/lib/rates/traditionalUnitRates';
import { PROGRAMMATIC_EMI_SCENARIOS } from '@/lib/rates/programmaticEmi';
import { PROGRAMMATIC_BANK_LOAN_SCENARIOS } from '@/lib/rates/bankLoanRates';
import { PROGRAMMATIC_INTEREST_SCENARIOS } from '@/lib/rates/programmaticInterest';
import { PROGRAMMATIC_CONSTRUCTION_SCENARIOS } from '@/lib/rates/programmaticConstruction';
import { PROGRAMMATIC_NEA_BILLS } from '@/lib/rates/programmaticNea';
import { PROGRAMMATIC_TDS_SCENARIOS } from '@/lib/rates/programmaticTds';
import { PROGRAMMATIC_MALPOT_SCENARIOS } from '@/lib/rates/programmaticMalpot';
import { PROGRAMMATIC_BAGGAGE_ITEMS } from '@/lib/rates/programmaticBaggage';
import { PROGRAMMATIC_LIKHIT_SCENARIOS } from '@/lib/rates/programmaticLikhit';
import {
  PROGRAMMATIC_LICENSE_CATEGORIES,
  PROGRAMMATIC_LICENSE_TOPICS,
  PROGRAMMATIC_TRIAL_GUIDES,
  PROGRAMMATIC_LONGTAIL_GUIDES,
} from '@/lib/rates/programmaticLicense';
import { BLOG_POSTS } from '@/lib/blog/posts';

const CONTENT_LAST_MODIFIED = new Date('2026-11-04');

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const uniqueCorePaths = Array.from(
    new Set([
      '',
      '/tax',
      '/salary',
      '/tds',
      '/depreciation',
      '/corporate-tax',
      '/land',
      '/vehicle',
      '/nepse',
      '/emi',
      '/sip',
      '/gold',
      '/silver',
      '/gold/history',
      '/provident-fund',
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
      '/customs/airport-baggage',
      '/emi/banks',
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
      '/license',
      '/license/mock-test',
      '/license/questions',
      '/license/traffic-signs',
      '/license/eye-test',
      '/license/trial',
      '/license/result',
      '/likhit-result',
      '/eye-test',
      '/traffic-signs',
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
      '/malpot',
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

  const programmaticEmiRoutes = PROGRAMMATIC_EMI_SCENARIOS.map((emi) => ({
    url: `${baseUrl}/emi/${emi.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const programmaticBankLoanRoutes = PROGRAMMATIC_BANK_LOAN_SCENARIOS.map((bankLoan) => ({
    url: `${baseUrl}/emi/banks/${bankLoan.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const programmaticInterestRoutes = PROGRAMMATIC_INTEREST_SCENARIOS.map((scenario) => ({
    url: `${baseUrl}/interest/${scenario.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const programmaticConstructionRoutes = PROGRAMMATIC_CONSTRUCTION_SCENARIOS.map((scenario) => ({
    url: `${baseUrl}/house-construction/${scenario.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const programmaticNeaRoutes = PROGRAMMATIC_NEA_BILLS.map((bill) => ({
    url: `${baseUrl}/nea/${bill.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const programmaticTdsRoutes = PROGRAMMATIC_TDS_SCENARIOS.map((tds) => ({
    url: `${baseUrl}/tds/${tds.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const programmaticMalpotRoutes = PROGRAMMATIC_MALPOT_SCENARIOS.map((malpot) => ({
    url: `${baseUrl}/malpot/${malpot.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const programmaticBaggageRoutes = PROGRAMMATIC_BAGGAGE_ITEMS.map((baggage) => ({
    url: `${baseUrl}/customs/airport-baggage/${baggage.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const programmaticLikhitRoutes = PROGRAMMATIC_LIKHIT_SCENARIOS.map((scenario) => ({
    url: `${baseUrl}/likhit-result/${scenario.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const programmaticLicenseCategoryRoutes = PROGRAMMATIC_LICENSE_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/license/category/${cat.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const programmaticLicenseTopicRoutes = PROGRAMMATIC_LICENSE_TOPICS.map((topic) => ({
    url: `${baseUrl}/license/topic/${topic.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const programmaticTrialGuideRoutes = PROGRAMMATIC_TRIAL_GUIDES.map((guide) => ({
    url: `${baseUrl}/license/trial/${guide.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const programmaticLicenseResultRoutes = PROGRAMMATIC_LIKHIT_SCENARIOS.map((scenario) => ({
    url: `${baseUrl}/license/result/${scenario.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const programmaticLongtailRoutes = PROGRAMMATIC_LONGTAIL_GUIDES.map((guide) => ({
    url: `${baseUrl}/license/guide/${guide.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
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
    ...programmaticEmiRoutes,
    ...programmaticBankLoanRoutes,
    ...programmaticInterestRoutes,
    ...programmaticConstructionRoutes,
    ...programmaticNeaRoutes,
    ...programmaticTdsRoutes,
    ...programmaticMalpotRoutes,
    ...programmaticBaggageRoutes,
    ...programmaticLikhitRoutes,
    ...programmaticLicenseCategoryRoutes,
    ...programmaticLicenseTopicRoutes,
    ...programmaticTrialGuideRoutes,
    ...programmaticLicenseResultRoutes,
    ...programmaticLongtailRoutes,
    ...blogRoutes,
  ];
}
