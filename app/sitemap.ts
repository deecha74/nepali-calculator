import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo/metadata';
import { PROGRAMMATIC_LAND_CONVERSIONS } from '@/lib/rates/landRates';
import { PROGRAMMATIC_VEHICLE_TAXES } from '@/lib/rates/programmaticVehicles';
import { PROGRAMMATIC_SALARY_TAXES } from '@/lib/rates/programmaticTax';
import { PROGRAMMATIC_FOREX_CONVERSIONS } from '@/lib/rates/forexRates';

import { PROGRAMMATIC_SIP_SCENARIOS } from '@/lib/rates/programmaticSip';
import { PROGRAMMATIC_GOLD_ITEMS } from '@/lib/rates/programmaticGold';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const currentDate = new Date();

  const coreRoutes = [
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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  const programmaticLandRoutes = PROGRAMMATIC_LAND_CONVERSIONS.map((conv) => ({
    url: `${baseUrl}/land/${conv.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const programmaticVehicleRoutes = PROGRAMMATIC_VEHICLE_TAXES.map((veh) => ({
    url: `${baseUrl}/vehicle/${veh.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const programmaticTaxRoutes = PROGRAMMATIC_SALARY_TAXES.map((tax) => ({
    url: `${baseUrl}/tax/${tax.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const programmaticForexRoutes = PROGRAMMATIC_FOREX_CONVERSIONS.map((fx) => ({
    url: `${baseUrl}/forex/${fx.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const programmaticSipRoutes = PROGRAMMATIC_SIP_SCENARIOS.map((scenario) => ({
    url: `${baseUrl}/sip/${scenario.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const programmaticGoldRoutes = PROGRAMMATIC_GOLD_ITEMS.map((gold) => ({
    url: `${baseUrl}/gold/${gold.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
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
  ];
}


