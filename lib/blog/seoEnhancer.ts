import { BlogPost } from './types';

export interface ContextualClusterLink {
  label: string;
  href: string;
  description: string;
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

/**
 * Deterministic Topical Silo + Cross-Cluster Rotation for Related Blog Guides.
 * Ensures every single one of the 60 blog posts receives internal link equity
 * from sibling articles in the same category plus cross-category pillars.
 */
export function getRelatedBlogPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  totalCount = 6
): BlogPost[] {
  const sameCategory = allPosts.filter(
    (p) => p.category === currentPost.category && p.slug !== currentPost.slug
  );
  const otherCategory = allPosts.filter((p) => p.category !== currentPost.category);

  const allSameCatWithCurrent = allPosts.filter((p) => p.category === currentPost.category);
  const currentCatIdx = Math.max(
    0,
    allSameCatWithCurrent.findIndex((p) => p.slug === currentPost.slug)
  );
  const globalIdx = Math.max(
    0,
    allPosts.findIndex((p) => p.slug === currentPost.slug)
  );

  const selected: BlogPost[] = [];
  const sameTargetCount = Math.min(4, sameCategory.length);

  for (let i = 0; i < sameTargetCount; i++) {
    const pick = sameCategory[(currentCatIdx + i) % sameCategory.length];
    if (pick && !selected.some((s) => s.slug === pick.slug)) {
      selected.push(pick);
    }
  }

  let step = 0;
  while (selected.length < totalCount && step < otherCategory.length) {
    const pick = otherCategory[(globalIdx * 5 + step * 7) % otherCategory.length];
    if (pick && !selected.some((s) => s.slug === pick.slug)) {
      selected.push(pick);
    }
    step++;
  }

  return selected;
}

/**
 * Maps each blog post to relevant Programmatic SEO (pSEO) and interactive calculator hubs
 * so all 60 blog posts pass contextual internal link equity to programmatic pages.
 */
export function getProgrammaticClusterLinksForPost(post: BlogPost): ContextualClusterLink[] {
  const href = post.toolLink.href;

  if (href === '/tax' || href === '/salary' || post.category === 'Tax & Law') {
    return [
      {
        label: 'Nepal Income Tax Calculator (FY 2083/84)',
        href: '/tax',
        description: 'Interactive progressive slab calculator with SSF, CIT, EPF & insurance deductions.',
      },
      {
        label: 'Rs. 60,000 Monthly Salary Tax Breakdown',
        href: '/tax/60000-monthly-salary-tax-nepal',
        description: 'Worked monthly take-home pay for NPR 7.2 Lakh annual income (Single vs Married).',
      },
      {
        label: 'Rs. 1 Lakh Monthly Salary Tax (Married)',
        href: '/tax/1-lakh-monthly-salary-tax-nepal-married',
        description: 'Complete SSF 0% base exemption vs regular 1% tax breakdown on NPR 12 Lakh/year.',
      },
      {
        label: 'SSF vs EPF/CIT Tax Deduction Comparison',
        href: '/tax/ssf-vs-epf-tax-calculator-nepal',
        description: 'Compare 31% SSF contribution rules against Citizen Investment Trust tax savings.',
      },
      {
        label: 'TDS & Reverse Gross-Up Calculator (Sec 88/89)',
        href: '/tds',
        description: 'Calculate withholding tax on rent, consultancy, freight, and service contracts.',
      },
      {
        label: 'Schedule 2 Tax Depreciation (Block A–E)',
        href: '/depreciation',
        description: 'Compute declining WDV pool depreciation, timing rules, and 7% repair caps.',
      },
    ];
  }

  if (
    href === '/emi' ||
    href === '/nepal-home-loan' ||
    href === '/auto-loan' ||
    href === '/loan-eligibility' ||
    post.category === 'Banking & Loans'
  ) {
    return [
      {
        label: 'Nepal Bank Loan EMI Calculator',
        href: '/emi',
        description: 'Monthly amortization schedule & principal vs interest breakdown for Nepal banks.',
      },
      {
        label: 'Rs. 50 Lakh Home Loan EMI in Nepal (15–20 Yrs)',
        href: '/emi/50-lakh-home-loan-emi-nepal',
        description: 'Monthly installment and NRB DSTI income requirement for a 50 Lakh Ghar Karja.',
      },
      {
        label: 'Rs. 1 Crore Home Loan EMI in Nepal',
        href: '/emi/1-crore-home-loan-emi-nepal',
        description: 'Full 20-year repayment schedule and total interest cost for 1 Crore housing loan.',
      },
      {
        label: 'EV Car Loan EMI (80% Financing Rule)',
        href: '/emi/ev-car-loan-emi-nepal-80-percent-financing',
        description: 'Calculate 7-year monthly auto loan EMI for electric vehicles in Nepal.',
      },
      {
        label: 'Foreign Remittance & NRB Forex Calculator',
        href: '/remittance-calculator',
        description: 'Compare USD, AUD, AED, QAR, SAR, MYR & KRW to NPR payout rates.',
      },
      {
        label: 'Fixed Deposit (FD) vs Debenture Returns',
        href: '/fd-vs-debenture',
        description: 'After-tax yield comparison with 6% FD TDS and compound quarterly payouts.',
      },
    ];
  }

  if (
    href === '/gold' ||
    href === '/silver' ||
    href === '/nepse' ||
    href === '/sip' ||
    post.category === 'Gold & Wealth'
  ) {
    return [
      {
        label: 'Live Nepal Gold & Jarti Making Calculator',
        href: '/gold',
        description: 'FENEGOSIDA Hallmark 24K/22K gold price per Tola & 10g with Jarti and 2% luxury tax.',
      },
      {
        label: '1 Tola to Gram Conversion (11.6638g)',
        href: '/traditional-units/tola-to-gram',
        description: 'Convert Tola and Lal to exact Grams for Nepal bullion and jewelry billing.',
      },
      {
        label: 'NEPSE Share Profit, Broker Fee & CGT Calculator',
        href: '/nepse',
        description: 'Calculate net share profit after SEBON fee, DP charge, and 5% vs 7.5% CGT.',
      },
      {
        label: 'Rs. 5,000 Monthly SIP for 10 Years in Nepal',
        href: '/sip/5000-monthly-sip-for-10-years-nepal',
        description: 'Projected compounding corpus for NIBL, Siddhartha, NMB & NIC Asia mutual funds.',
      },
      {
        label: 'Rs. 10,000 Monthly SIP for 15 Years in Nepal',
        href: '/sip/10000-monthly-sip-for-15-years-nepal',
        description: 'Long-term wealth compounding schedule with dividend reinvestment in Nepal.',
      },
      {
        label: 'NEPSE WACC & Right Share Price Adjustment',
        href: '/nepse-wacc',
        description: 'Compute weighted average cost of capital for Meroshare EDIS & bonus shares.',
      },
    ];
  }

  if (
    href === '/land' ||
    href === '/bato-katta' ||
    href === '/malpot' ||
    href === '/house-construction' ||
    post.category === 'Land & Real Estate'
  ) {
    return [
      {
        label: 'Nepal Land Unit Converter (Ropani ⇄ Bigha ⇄ Sq.Ft)',
        href: '/land',
        description: 'Convert Ropani-Aana-Paisa-Daam and Bigha-Kattha-Dhur to Square Feet and Meters.',
      },
      {
        label: '1 Ropani to Aana & Square Feet (5,476 Sq.Ft)',
        href: '/land/ropani-to-aana',
        description: 'Official Hilly region Survey Department land conversion table.',
      },
      {
        label: '4 Aana Residential Plot Size in Sq. Feet',
        href: '/land/4-aana-to-sq-ft-house-size',
        description: 'Exact dimensions (1,369 sq.ft) and building footprint for a 4 Aana plot in Kathmandu.',
      },
      {
        label: '1 Bigha to Kattha, Dhur & Ropani',
        href: '/land/bigha-to-kattha',
        description: 'Terai region land measurement conversion (72,900 sq.ft = 13.31 Ropani).',
      },
      {
        label: 'Bato Katta (Road Setback) & GCR/FAR Calculator',
        href: '/bato-katta',
        description: 'Calculate net buildable plot area after municipal road Right-of-Way deduction.',
      },
      {
        label: 'House Construction Cost Estimator in Nepal',
        href: '/house-construction',
        description: 'Estimate pillar-system residential building cost, cement, steel rod, and bricks.',
      },
    ];
  }

  if (href === '/vehicle' || href === '/nea' || href === '/fuel') {
    return [
      {
        label: 'Vehicle Bluebook Tax & Renewal Penalty Calculator',
        href: '/vehicle',
        description: 'Official provincial annual road tax and late renewal fine calculator for Bikes, Cars & EVs.',
      },
      {
        label: '51kW–100kW EV Car Bluebook Tax (BYD Atto 3 / Dolphin)',
        href: '/vehicle/ev-car-51kw-to-100kw-tax',
        description: 'Annual Bagmati & provincial electric vehicle road tax and third-party insurance.',
      },
      {
        label: '150cc Bike Bluebook Renewal Tax in Nepal',
        href: '/vehicle/150cc-bike-tax-nepal',
        description: 'Annual two-wheeler road tax and 90-day grace period fine rules.',
      },
      {
        label: 'NEA Electricity Bill & Tariff Slab Calculator',
        href: '/nea',
        description: 'Domestic 5A, 15A, 30A & 60A meter consumption slabs and minimum demand charges.',
      },
      {
        label: 'Bikram Sambat Date Converter (1970–2100 BS)',
        href: '/date',
        description: 'Convert BS to AD dates and verify official public holidays and fiscal year deadlines.',
      },
      {
        label: 'USD to NPR Live NRB Exchange Rate',
        href: '/forex/usd-to-npr',
        description: 'Today’s official Nepal Rastra Bank buying and selling exchange rate.',
      },
    ];
  }

  return [
    {
      label: post.toolLink.title,
      href: post.toolLink.href,
      description: `Launch the interactive ${post.toolLink.title} with instant Nepal statutory rules.`,
    },
    {
      label: 'Bikram Sambat (BS ⇄ AD) Date Converter',
      href: '/date',
      description: 'Convert Nepali Bikram Sambat dates (1970–2100 BS) to English Gregorian dates.',
    },
    {
      label: 'Nepal Salary & Income Tax Calculator (FY 2083/84)',
      href: '/tax',
      description: 'Official IRD progressive tax slabs, SSF exemption, and take-home salary calculator.',
    },
    {
      label: 'Nepal Land Converter (Ropani & Bigha to Sq.Ft)',
      href: '/land',
      description: 'Bidirectional Ropani-Aana-Paisa-Daam and Bigha-Kattha-Dhur area converter.',
    },
    {
      label: 'Live Gold & Silver Jarti Calculator Nepal',
      href: '/gold',
      description: 'FENEGOSIDA Hallmark 24K/22K gold price per Tola with Jarti and Jyala billing.',
    },
    {
      label: 'Legal Document & Nivedan Generators (Bilingual)',
      href: '/document-generators',
      description: 'Generate ready-to-print House Rent Agreements, Partnership Deeds, and MoA/AoA.',
    },
  ];
}

/**
 * Generates 4 post-specific, high-intent Frequently Asked Questions (FAQs)
 * from each blog post's structured content, tables, and statutory rules.
 * Powers both visible on-page Q&A content (+250–350 words) and FAQPage JSON-LD schema.
 */
export function getBlogPostFaqs(post: BlogPost, authoritySource: string): BlogFaqItem[] {
  const faqs: BlogFaqItem[] = [];

  // FAQ 1: Core Rule & Statutory Authority
  faqs.push({
    question: `What is the official rule for ${post.title.replace(/\s*\|.*$/, '')}?`,
    answer: `${post.excerpt} According to ${authoritySource}, ${
      post.content.keyTakeaways[0] || post.content.intro
    } (${post.excerptNep})`,
  });

  // FAQ 2: First Section Formula / Table Summary
  if (post.content.sections.length > 0) {
    const firstSec = post.content.sections[0];
    let tableSummary = '';
    if (firstSec.table && firstSec.table.rows.length > 0) {
      const sampleRows = firstSec.table.rows
        .slice(0, 3)
        .map((r) => r.join(' → '))
        .join('; ');
      tableSummary = ` Key benchmark tiers include: ${sampleRows}.`;
    }
    faqs.push({
      question: `How do you calculate ${firstSec.heading.toLowerCase()} in Nepal?`,
      answer: `${firstSec.body}${tableSummary}${firstSec.tip ? ` Pro Tip: ${firstSec.tip}` : ''}`,
    });
  }

  // FAQ 3: Second Section or Key Takeaways Deep Dive
  if (post.content.sections.length > 1) {
    const sec2 = post.content.sections[1];
    faqs.push({
      question: `What should you know about ${sec2.heading.toLowerCase()}?`,
      answer: `${sec2.body}${
        post.content.keyTakeaways[1] ? ` Additionally, ${post.content.keyTakeaways[1]}` : ''
      }`,
    });
  } else if (post.content.keyTakeaways.length > 1) {
    faqs.push({
      question: `What are the key statutory takeaways for ${post.category} in Nepal?`,
      answer: post.content.keyTakeaways.slice(1).join(' '),
    });
  }

  // FAQ 4: Interactive Verification & Nepali Summary
  faqs.push({
    question: `Where can I calculate exact figures for ${post.keywords[0] || post.title} online?`,
    answer: `You can compute instant, error-free figures using the free ${post.toolLink.title} on NepaliCalc (nepalicalc.com${post.toolLink.href}). ${post.content.conclusion}`,
  });

  return faqs;
}

