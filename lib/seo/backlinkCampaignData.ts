export const SITE_URL = 'https://nepalicalc.com';

export interface WikipediaTargetItem {
  id: string;
  lang: 'en' | 'ne';
  title: string;
  wikiUrl: string;
  editUrl: string;
  targetUrl: string;
  topic: string;
  citeWebSnippet: string;
  externalLinkSnippet: string;
}

export interface HighDrPlatform {
  id: string;
  name: string;
  url: string;
  dr: number;
  tier: string;
  linkType: string;
  effort: string;
  action: string;
}

export interface SearchDorkItem {
  id: string;
  category: string;
  query: string;
  googleUrl: string;
  targetUrl: string;
  outreachPitch: string;
}

export interface AuthorityArticleItem {
  id: string;
  filename: string;
  title: string;
  canonicalUrl: string;
  tags: string[];
  platformTarget: string;
  summary: string;
  markdownWithFrontmatter: string;
  cleanBodyMarkdown: string;
}

export interface CommunityPostItem {
  id: string;
  platform: 'Reddit' | 'Quora';
  communityName: string;
  submitUrl: string;
  title: string;
  bodyMarkdown: string;
  targetUrl: string;
}

export interface DatasetFileItem {
  filename: string;
  mimeType: string;
  description: string;
  content: string;
}

const todayIso = '2026-11-09';

export const WIKIPEDIA_CITATIONS: WikipediaTargetItem[] = [
  {
    id: 'wiki-tax-en',
    lang: 'en',
    title: 'Taxation in Nepal',
    wikiUrl: 'https://en.wikipedia.org/wiki/Taxation_in_Nepal',
    editUrl: 'https://en.wikipedia.org/w/index.php?title=Taxation_in_Nepal&action=edit',
    targetUrl: `${SITE_URL}/tax`,
    topic: 'IRD Income Tax Slabs FY 2082/83 & 2083/84 and SSF Tax Brackets',
    citeWebSnippet: `<ref>{{cite web |title=IRD Income Tax Slabs FY 2082/83 & 2083/84 and SSF Tax Brackets |url=${SITE_URL}/tax |website=NepaliCalc |publisher=NepaliCalc — Official Nepal Financial & Utility Reference |access-date=${todayIso} |language=en}}</ref>`,
    externalLinkSnippet: `* [${SITE_URL}/tax IRD Income Tax Slabs FY 2082/83 & 2083/84 and SSF Tax Brackets] — Interactive reference calculator & official data tables`,
  },
  {
    id: 'wiki-bs-en',
    lang: 'en',
    title: 'Bikram Sambat',
    wikiUrl: 'https://en.wikipedia.org/wiki/Bikram_Sambat',
    editUrl: 'https://en.wikipedia.org/w/index.php?title=Bikram_Sambat&action=edit',
    targetUrl: `${SITE_URL}/date`,
    topic: 'Bikram Sambat (1970–2100 BS) to Gregorian Calendar Conversion & Month Lengths',
    citeWebSnippet: `<ref>{{cite web |title=Bikram Sambat (1970–2100 BS) to Gregorian Calendar Conversion & Month Lengths |url=${SITE_URL}/date |website=NepaliCalc |publisher=NepaliCalc — Official Nepal Financial & Utility Reference |access-date=${todayIso} |language=en}}</ref>`,
    externalLinkSnippet: `* [${SITE_URL}/date Bikram Sambat (1970–2100 BS) to Gregorian Calendar Conversion & Month Lengths] — Interactive reference calculator & official data tables`,
  },
  {
    id: 'wiki-npr-en',
    lang: 'en',
    title: 'Nepalese rupee',
    wikiUrl: 'https://en.wikipedia.org/wiki/Nepalese_rupee',
    editUrl: 'https://en.wikipedia.org/w/index.php?title=Nepalese_rupee&action=edit',
    targetUrl: `${SITE_URL}/forex`,
    topic: 'Nepal Rastra Bank Foreign Exchange Rates & INR Peg (100 INR = 160 NPR)',
    citeWebSnippet: `<ref>{{cite web |title=Nepal Rastra Bank Foreign Exchange Rates & INR Peg (100 INR = 160 NPR) |url=${SITE_URL}/forex |website=NepaliCalc |publisher=NepaliCalc — Official Nepal Financial & Utility Reference |access-date=${todayIso} |language=en}}</ref>`,
    externalLinkSnippet: `* [${SITE_URL}/forex Nepal Rastra Bank Foreign Exchange Rates & INR Peg (100 INR = 160 NPR)] — Interactive reference calculator & official data tables`,
  },
  {
    id: 'wiki-units-en',
    lang: 'en',
    title: 'Nepali units of measurement',
    wikiUrl: 'https://en.wikipedia.org/wiki/Nepali_units_of_measurement',
    editUrl: 'https://en.wikipedia.org/w/index.php?title=Nepali_units_of_measurement&action=edit',
    targetUrl: `${SITE_URL}/land`,
    topic: 'Ropani, Aana, Paisa, Daam and Bigha, Kattha, Dhur to Square Feet/Meters Conversion',
    citeWebSnippet: `<ref>{{cite web |title=Ropani, Aana, Paisa, Daam and Bigha, Kattha, Dhur to Square Feet/Meters Conversion |url=${SITE_URL}/land |website=NepaliCalc |publisher=NepaliCalc — Official Nepal Financial & Utility Reference |access-date=${todayIso} |language=en}}</ref>`,
    externalLinkSnippet: `* [${SITE_URL}/land Ropani, Aana, Paisa, Daam and Bigha, Kattha, Dhur to Square Feet/Meters Conversion] — Interactive reference calculator & official data tables`,
  },
  {
    id: 'wiki-nepse-en',
    lang: 'en',
    title: 'Nepal Stock Exchange',
    wikiUrl: 'https://en.wikipedia.org/wiki/Nepal_Stock_Exchange',
    editUrl: 'https://en.wikipedia.org/w/index.php?title=Nepal_Stock_Exchange&action=edit',
    targetUrl: `${SITE_URL}/nepse`,
    topic: 'NEPSE Broker Commission Tiers, SEBON Fee & Capital Gains Tax (5% vs 7.5%)',
    citeWebSnippet: `<ref>{{cite web |title=NEPSE Broker Commission Tiers, SEBON Fee & Capital Gains Tax (5% vs 7.5%) |url=${SITE_URL}/nepse |website=NepaliCalc |publisher=NepaliCalc — Official Nepal Financial & Utility Reference |access-date=${todayIso} |language=en}}</ref>`,
    externalLinkSnippet: `* [${SITE_URL}/nepse NEPSE Broker Commission Tiers, SEBON Fee & Capital Gains Tax (5% vs 7.5%)] — Interactive reference calculator & official data tables`,
  },
  {
    id: 'wiki-holidays-en',
    lang: 'en',
    title: 'Public holidays in Nepal',
    wikiUrl: 'https://en.wikipedia.org/wiki/Public_holidays_in_Nepal',
    editUrl: 'https://en.wikipedia.org/w/index.php?title=Public_holidays_in_Nepal&action=edit',
    targetUrl: `${SITE_URL}/date`,
    topic: 'Official Bikram Sambat 2083 BS Public Holidays & Festival Calendar',
    citeWebSnippet: `<ref>{{cite web |title=Official Bikram Sambat 2083 BS Public Holidays & Festival Calendar |url=${SITE_URL}/date |website=NepaliCalc |publisher=NepaliCalc — Official Nepal Financial & Utility Reference |access-date=${todayIso} |language=en}}</ref>`,
    externalLinkSnippet: `* [${SITE_URL}/date Official Bikram Sambat 2083 BS Public Holidays & Festival Calendar] — Interactive reference calculator & official data tables`,
  },
  {
    id: 'wiki-nea-en',
    lang: 'en',
    title: 'Nepal Electricity Authority',
    wikiUrl: 'https://en.wikipedia.org/wiki/Nepal_Electricity_Authority',
    editUrl: 'https://en.wikipedia.org/w/index.php?title=Nepal_Electricity_Authority&action=edit',
    targetUrl: `${SITE_URL}/nea`,
    topic: 'NEA Domestic Consumer Electricity Tariff Slabs & Demand Charges',
    citeWebSnippet: `<ref>{{cite web |title=NEA Domestic Consumer Electricity Tariff Slabs & Demand Charges |url=${SITE_URL}/nea |website=NepaliCalc |publisher=NepaliCalc — Official Nepal Financial & Utility Reference |access-date=${todayIso} |language=en}}</ref>`,
    externalLinkSnippet: `* [${SITE_URL}/nea NEA Domestic Consumer Electricity Tariff Slabs & Demand Charges] — Interactive reference calculator & official data tables`,
  },
  {
    id: 'wiki-tax-ne',
    lang: 'ne',
    title: 'नेपालको कर प्रणाली',
    wikiUrl: 'https://ne.wikipedia.org/wiki/%E0%A4%A8%E0%A5%87%E0%A4%AA%E0%A4%BE%E0%A4%B2%E0%A4%95%E0%A5%8B_%E0%A4%95%E0%A4%B0_%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A3%E0%A4%BE%E0%A4%B2%E0%A5%80',
    editUrl: 'https://ne.wikipedia.org/w/index.php?title=%E0%A4%A8%E0%A5%87%E0%A4%AA%E0%A4%BE%E0%A4%B2%E0%A4%95%E0%A5%8B_%E0%A4%95%E0%A4%B0_%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A3%E0%A4%BE%E0%A4%B2%E0%A5%80&action=edit',
    targetUrl: `${SITE_URL}/tax`,
    topic: 'आर्थिक वर्ष २०८२/८३ र २०८३/८४ को आयकर स्ल्याब र सामाजिक सुरक्षा कर',
    citeWebSnippet: `<ref>{{cite web |title=आर्थिक वर्ष २०८२/८३ र २०८३/८४ को आयकर स्ल्याब र सामाजिक सुरक्षा कर |url=${SITE_URL}/tax |website=NepaliCalc |publisher=NepaliCalc — Official Nepal Financial & Utility Reference |access-date=${todayIso} |language=ne}}</ref>`,
    externalLinkSnippet: `* [${SITE_URL}/tax आर्थिक वर्ष २०८२/८३ र २०८३/८४ को आयकर स्ल्याब र सामाजिक सुरक्षा कर] — Interactive reference calculator & official data tables`,
  },
  {
    id: 'wiki-bs-ne',
    lang: 'ne',
    title: 'विक्रम संवत्',
    wikiUrl: 'https://ne.wikipedia.org/wiki/%E0%A4%B5%E0%A4%BF%E0%A4%95%E0%A5%8D%E0%A4%B0%E0%A4%AE_%E0%A4%B8%E0%A4%82%E0%A4%B5%E0%A4%A4%E0%A5%8D',
    editUrl: 'https://ne.wikipedia.org/w/index.php?title=%E0%A4%B5%E0%A4%BF%E0%A4%95%E0%A5%8D%E0%A4%B0%E0%A4%AE_%E0%A4%B8%E0%A4%82%E0%A4%B5%E0%A4%A4%E0%A5%8D&action=edit',
    targetUrl: `${SITE_URL}/date`,
    topic: 'वि.सं. १९७० देखि २१०० सम्मको पात्रो र मिति रूपान्तरण',
    citeWebSnippet: `<ref>{{cite web |title=वि.सं. १९७० देखि २१०० सम्मको पात्रो र मिति रूपान्तरण |url=${SITE_URL}/date |website=NepaliCalc |publisher=NepaliCalc — Official Nepal Financial & Utility Reference |access-date=${todayIso} |language=ne}}</ref>`,
    externalLinkSnippet: `* [${SITE_URL}/date वि.सं. १९७० देखि २१०० सम्मको पात्रो र मिति रूपान्तरण] — Interactive reference calculator & official data tables`,
  },
];

export const HIGH_DR_PLATFORMS: HighDrPlatform[] = [
  {
    id: 'npm-registry',
    name: 'NPM Registry (nepalicalc-utils)',
    url: 'https://www.npmjs.com/',
    dr: 93,
    tier: 'Tier 3: Open-Source Registry',
    linkType: 'Dofollow Homepage Link',
    effort: '2 mins (Terminal)',
    action: 'Run `cd backlink-campaigns/npm-package && npm login && npm publish` for an instant DR 93 Dofollow link to https://nepalicalc.com.',
  },
  {
    id: 'github-repo',
    name: 'GitHub Repository & Gist',
    url: 'https://github.com/new',
    dr: 96,
    tier: 'Tier 3: Open-Source Registry',
    linkType: 'High-Trust Citation + Website Field',
    effort: '1 click (Auto-Publish Tab)',
    action: 'Use the 1-Click GitHub Gist publisher in this dashboard or push the datasets folder to a public GitHub repo with Website URL set to https://nepalicalc.com.',
  },
  {
    id: 'zenodo-cern',
    name: 'Zenodo (CERN Open Science DOI)',
    url: 'https://zenodo.org/uploads/new',
    dr: 91,
    tier: 'Tier 2: Academic DOI Repository',
    linkType: 'Permanent CERN DOI + Dofollow Link',
    effort: '3 mins (Download CSVs in Datasets Tab)',
    action: 'Download the CSV files from the Datasets tab, upload to Zenodo, and add https://nepalicalc.com under "Related Works / Supplement To".',
  },
  {
    id: 'kaggle-datasets',
    name: 'Kaggle Datasets',
    url: 'https://www.kaggle.com/datasets',
    dr: 90,
    tier: 'Tier 2: Academic & AI Dataset Hub',
    linkType: 'High-Authority Provenance Link',
    effort: '3 mins (Upload CSVs)',
    action: 'Upload the Nepal Land & Income Tax CSV datasets and paste https://nepalicalc.com in the Source / Provenance URL field.',
  },
  {
    id: 'huggingface-datasets',
    name: 'HuggingFace Datasets',
    url: 'https://huggingface.co/new-dataset',
    dr: 90,
    tier: 'Tier 2: Academic & AI Dataset Hub',
    linkType: 'High-Authority AI Citation Link',
    effort: '3 mins (Upload CSVs + README)',
    action: 'Create a dataset repo on HuggingFace and paste the Dataset README. Trains AI search engines (ChatGPT, Perplexity, Gemini) to cite NepaliCalc.com.',
  },
  {
    id: 'devto-article',
    name: 'Dev.to Engineering Blog',
    url: 'https://dev.to/new',
    dr: 91,
    tier: 'Tier 6: Syndication & Dev Community',
    linkType: 'Dofollow + Canonical URL',
    effort: '1 click (Auto-Publish Draft)',
    action: 'Click "Auto-Publish Draft to Dev.to" in the Articles tab or copy Article #2 into dev.to/new with canonical_url set to https://nepalicalc.com/date.',
  },
  {
    id: 'medium-import',
    name: 'Medium (Import Story / Article)',
    url: 'https://medium.com/p/import',
    dr: 95,
    tier: 'Tier 6: Syndication & Publishing',
    linkType: 'High-DR Authority + Canonical Link',
    effort: '2 mins (Copy & Paste)',
    action: 'Copy Article #1 (Tax Study) or Article #3 (Land Guide) from the Articles tab and publish on Medium with canonical link in Story Settings -> Advanced.',
  },
  {
    id: 'linkedin-article',
    name: 'LinkedIn Pulse Article',
    url: 'https://www.linkedin.com/post/new/',
    dr: 98,
    tier: 'Tier 6: Professional Publishing',
    linkType: 'High-Trust Referral & Authority Citation',
    effort: '2 mins (Copy & Paste)',
    action: 'Copy Article #4 (Remittance & NRB Forex Study) into a LinkedIn Article to reach Nepali banking, CA, and diaspora professionals.',
  },
  {
    id: 'product-hunt',
    name: 'Product Hunt',
    url: 'https://www.producthunt.com/posts/new',
    dr: 91,
    tier: 'Tier 4: SaaS & Utility Directories',
    linkType: 'High-Authority Launch Backlink',
    effort: '5 mins',
    action: 'Launch "NepaliCalc — 70+ Free Financial, Land, Tax & Patro Calculators for Nepal". Automatically scraped by 30+ SaaS directories for bonus backlinks.',
  },
  {
    id: 'alternativeto',
    name: 'AlternativeTo',
    url: 'https://alternativeto.net/',
    dr: 88,
    tier: 'Tier 4: SaaS & Utility Directories',
    linkType: 'High-Authority Utility Directory Link',
    effort: '3 mins',
    action: 'Submit NepaliCalc.com as a modern, fast web alternative to Hamro Patro and Nepal Tax/Land apps.',
  },
  {
    id: 'microlaunch',
    name: 'MicroLaunch & Uneed.best',
    url: 'https://microlaunch.net/',
    dr: 74,
    tier: 'Tier 4: SaaS & Utility Directories',
    linkType: 'Dofollow Product Link',
    effort: '3 mins',
    action: 'Submit NepaliCalc under Finance & Productivity tools for a clean Dofollow link.',
  },
  {
    id: 'techlekh-nepal',
    name: 'TechLekh & GadgetByte Nepal',
    url: 'https://techlekh.com/contact-us/',
    dr: 58,
    tier: 'Tier 1: Nepal Digital PR & Tech Media',
    linkType: 'Local Nepal Editorial Dofollow',
    effort: '5 mins (Send Article #1 or #5)',
    action: 'Send Article #5 (EV vs Petrol Bluebook Tax Study) or pitch NepaliCalc as a free 70+ calculator suite built for Nepal.',
  },
  {
    id: 'bizmandu-merolagani',
    name: 'Bizmandu / NewBusinessAge / Merolagani',
    url: 'https://www.newbusinessage.com/',
    dr: 62,
    tier: 'Tier 1: Nepal Financial News PR',
    linkType: 'Local Nepal Editorial Dofollow',
    effort: '5 mins (Send Bilingual Article #1)',
    action: 'Share the Bilingual (English + Nepali) FY 2082/83 & 2083/84 Salary & SSF Tax Study from the Articles tab.',
  },
];

export const NEPAL_SEARCH_DORKS: SearchDorkItem[] = [
  {
    id: 'dork-tax',
    category: 'Outdated Nepal Income Tax Guides (CA & Law Firms)',
    query: '"income tax" "nepal" ("2078/79" OR "2079/80" OR "2080/81") -site:nepalicalc.com',
    googleUrl: `https://www.google.com/search?q=${encodeURIComponent('"income tax" "nepal" ("2078/79" OR "2079/80" OR "2080/81") -site:nepalicalc.com')}`,
    targetUrl: `${SITE_URL}/tax`,
    outreachPitch: `Hi team, I noticed your Nepal Income Tax guide references older FY slabs. Feel free to reference or embed our updated FY 2082/83 & 2083/84 IRD Salary & SSF Tax Calculator (${SITE_URL}/tax) for your readers.`,
  },
  {
    id: 'dork-land',
    category: 'Nepal Real Estate Ropani/Bigha Conversion Blogs',
    query: '("ropani to aana" OR "bigha to kattha") ("calculator" OR "conversion") -site:nepalicalc.com',
    googleUrl: `https://www.google.com/search?q=${encodeURIComponent('("ropani to aana" OR "bigha to kattha") ("calculator" OR "conversion") -site:nepalicalc.com')}`,
    targetUrl: `${SITE_URL}/land`,
    outreachPitch: `Namaste! We built a free embeddable Ropani-Aana-Paisa-Daam & Bigha-Kattha-Dhur Land Converter (${SITE_URL}/land) that you can embed on your property listings with 1 line of HTML.`,
  },
  {
    id: 'dork-remit',
    category: 'Nepal Abroad Study & Remittance Consultancies',
    query: '("send money to nepal" OR "study in australia from nepal") ("exchange rate" OR "aud to npr")',
    googleUrl: `https://www.google.com/search?q=${encodeURIComponent('("send money to nepal" OR "study in australia from nepal") ("exchange rate" OR "aud to npr")')}`,
    targetUrl: `${SITE_URL}/forex`,
    outreachPitch: `Hi! You can embed our live NRB Foreign Exchange & Remittance Calculator (${SITE_URL}/forex) on your student/remittance guide page for free.`,
  },
  {
    id: 'dork-edu',
    category: 'Nepal Engineering & College Resource Pages (.edu.np)',
    query: 'site:.edu.np ("resources" OR "useful links" OR "downloads" OR "tools")',
    googleUrl: `https://www.google.com/search?q=${encodeURIComponent('site:.edu.np ("resources" OR "useful links" OR "downloads" OR "tools")')}`,
    targetUrl: SITE_URL,
    outreachPitch: `Respected Coordinator, we maintain an open-access portal of 70+ Nepal Engineering, Land Measurement (Ropani/Bigha), GPA/CGPA, and Bikram Sambat utilities at ${SITE_URL} free for students.`,
  },
];

export const AUTHORITY_ARTICLES: AuthorityArticleItem[] = [
  {
    id: 'art-1-tax-study',
    filename: '01-nepal-media-pr-tax-study-en-ne.md',
    title: 'Nepal Income Tax Slabs FY 2083/84: Complete 10 Lakh Base Slab, SSF vs CIT Salary Take-Home Analysis',
    canonicalUrl: `${SITE_URL}/tax`,
    tags: ['nepal', 'finance', 'tax', 'payroll'],
    platformTarget: 'Medium, Substack & Nepal Financial Media (Bilingual EN + NE)',
    summary: 'Complete FY 2083/84 data study covering the expanded NPR 10,00,000 base bracket (1% Regular / 0% in SSF) across Rs 40K–2L monthly salaries in Nepal, including a Nepali press release summary.',
    markdownWithFrontmatter: `---
title: "Nepal Income Tax Slabs FY 2083/84: Complete 10 Lakh Base Slab, SSF vs CIT Salary Take-Home Analysis"
canonical_url: "${SITE_URL}/tax"
tags: ["nepal", "finance", "tax", "payroll"]
published: false
---

# Nepal Income Tax Slabs FY 2083/84: Complete 10 Lakh Base Bracket & SSF Take-Home Salary Analysis

Calculating accurate monthly take-home pay in Nepal requires navigating the Inland Revenue Department (IRD) progressive tax brackets, Social Security Fund (SSF) 31% contribution rules (11% employee + 20% employer), Citizen Investment Trust (CIT) deductions, and female tax rebates.

To help HR teams, Chartered Accountants, and salaried professionals avoid manual spreadsheet errors, this data study breaks down exact annual tax liabilities across key salary benchmarks in Nepal—computed using the open reference engine at [NepaliCalc.com](${SITE_URL}/tax).

---

## 1. Official IRD Progressive Tax Slabs for FY 2083/84 (New Law)

Under the FY 2083/84 structure, the initial 1% Social Security Tax bracket is expanded up to **NPR 10,00,000 (10 Lakh)**, with 5 progressive tiers:

| Slab Tier | Annual Income Band (NPR) | Regular Tax Rate (EPF/CIT) | SSF Contributor Rate | Max Tax in Band |
| :--- | :--- | :---: | :---: | :---: |
| **1st Slab (Base Bracket)** | **First NPR 10,00,000 (Up to 10 Lakh)** | **1%** | **0% (Exempt)** | NPR 10,000 (NPR 0 in SSF) |
| **2nd Slab** | **Next NPR 5,00,000 (10L – 15L)** | **10%** | **10%** | NPR 50,000 |
| **3rd Slab** | **Next NPR 10,00,000 (15L – 25L)** | **20%** | **20%** | NPR 2,00,000 |
| **4th Slab** | **Next NPR 15,00,000 (25L – 40L)** | **27%** | **27%** | NPR 4,05,000 |
| **5th Slab (Top Tier)** | **Above NPR 40,00,000 (Above 40 Lakh)** | **29%** | **29%** | Progressive Ceiling Rate |

> **Key Statutory Rule**: Employees enrolled in the **Social Security Fund (SSF)** are 100% exempt from the initial 1% Social Security Tax on the first **NPR 10,00,000 (10 Lakh)**, meaning **zero income tax** on annual taxable income up to NPR 10 Lakh! *(For retrospective FY 2082/83 & 2081/82 audits, the prior 5 Lakh Single / 6 Lakh Married base slabs apply).*

---

## 2. Worked Salary Matrix (FY 2083/84): How Much Tax Do You Actually Pay?

Below is the benchmark comparison for a salaried professional in Nepal (12 months gross salary under FY 2083/84):

| Monthly Gross Salary | Annual Gross Income | Annual Tax (Regular 1% Base) | Annual Tax (With SSF 0% up to 10L) | Effective Tax Rate (SSF) | Live Breakdown Link |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **NPR 40,000 / mo** | NPR 4,80,000 | NPR 4,800 | **NPR 0** | 0.00% | [View 40K Breakdown](${SITE_URL}/tax/tax-on-40000-salary-nepal) |
| **NPR 60,000 / mo** | NPR 7,20,000 | NPR 7,200 | **NPR 0** | 0.00% | [View 60K Breakdown](${SITE_URL}/tax/tax-on-60000-salary-nepal) |
| **NPR 80,000 / mo** | NPR 9,60,000 | NPR 9,600 | **NPR 0** | 0.00% | [View 80K Breakdown](${SITE_URL}/tax/tax-on-80000-salary-nepal) |
| **NPR 1,00,000 / mo** | NPR 12,00,000 | NPR 30,000 | **NPR 20,000** | 1.67% | [View 1 Lakh Breakdown](${SITE_URL}/tax/tax-on-100000-salary-nepal) |
| **NPR 1,50,000 / mo** | NPR 18,00,000 | NPR 1,20,000 | **NPR 1,10,000** | 6.11% | [View 1.5L Breakdown](${SITE_URL}/tax/tax-on-150000-salary-nepal) |
| **NPR 2,00,000 / mo** | NPR 24,00,000 | NPR 2,40,000 | **NPR 2,30,000** | 9.58% | [View 2L Breakdown](${SITE_URL}/tax/tax-on-200000-salary-nepal) |

### How CIT, Life Insurance & Health Insurance Reduce Your Tax
Before applying the slab rates above, Nepali taxpayers can legally deduct:
1. **Retirement Fund Contribution (SSF / EPF / CIT)**: Up to **1/3rd of assessable income** or **NPR 5,00,000**, whichever is lower.
2. **Life Insurance Premium**: Up to **NPR 40,000** per year.
3. **Health Insurance Premium**: Up to **NPR 20,000** per year.
4. **Remote Area Allowance**: Up to **NPR 50,000** (Category A to E districts).
5. **Female Tax Rebate**: **10% flat discount** on total tax liability for solo female employment income.

You can test custom combinations of SSF, CIT, insurance deductions, and switch between FY 2083/84 and FY 2082/83 using the interactive [Nepal Salary & Income Tax Calculator at NepaliCalc.com](${SITE_URL}/tax).

---

## ३. नेपाली सारांश (Nepali Press Release Summary for Local Media)

**शीर्षक: आ.व. २०८३/८४ को नयाँ आयकर स्ल्याब (१० लाखसम्म १% वा SSF मा ०%), छुट र तलब करको पूर्ण विवरण**

आर्थिक वर्ष २०८३/८४ को नयाँ कर संरचना अनुसार सुरुको **रु. १०,००,००० (१० लाख)** सम्मको वार्षिक करयोग्य आम्दानीमा १ प्रतिशत मात्र सामाजिक सुरक्षा कर लाग्ने व्यवस्था छ। अझ विशेष कुरा, योगदानमा आधारित **सामाजिक सुरक्षा कोष (SSF)** मा आबद्ध श्रमिक तथा कर्मचारीहरूलाई सुरुको १० लाखसम्मको १ प्रतिशत कर पूर्ण रूपमा छुट (०% कर) हुन्छ। १० लाखभन्दा माथिको आम्दानीमा क्रमशः १०% (१०–१५ लाख), २०% (१५–२५ लाख), २७% (२५–४० लाख) र २९% (४० लाखमाथि) कर लाग्दछ।

साथै नागरिक लगानी कोष (CIT), कर्मचारी सञ्चय कोष (EPF), जीवन बीमा (रु. ४०,००० सम्म) र स्वास्थ्य बीमा (रु. २०,००० सम्म) कट्टा गरी करयोग्य आय घटाउन सकिन्छ। आफ्नो मासिक वा वार्षिक तलबबाट कति कर काटिन्छ र हातमा कति खुद तलब (Net Take-Home Salary) आउँछ भनी तुरुन्तै हिसाब गर्न [NepaliCalc को आयकर क्यालकुलेटर (${SITE_URL}/tax)](${SITE_URL}/tax) प्रयोग गर्न सकिन्छ।`,
    cleanBodyMarkdown: `# Nepal Income Tax Slabs FY 2083/84: Complete 10 Lakh Base Bracket & SSF Take-Home Salary Analysis

Calculating accurate monthly take-home pay in Nepal requires navigating the Inland Revenue Department (IRD) progressive tax brackets, Social Security Fund (SSF) 31% contribution rules (11% employee + 20% employer), Citizen Investment Trust (CIT) deductions, and female tax rebates.

To help HR teams, Chartered Accountants, and salaried professionals avoid manual spreadsheet errors, this data study breaks down exact annual tax liabilities across key salary benchmarks in Nepal—computed using the open reference engine at [NepaliCalc.com](${SITE_URL}/tax).

---

## 1. Official IRD Progressive Tax Slabs for FY 2083/84 (New Law)

Under the FY 2083/84 structure, the initial 1% Social Security Tax bracket is expanded up to **NPR 10,00,000 (10 Lakh)**, with 5 progressive tiers:

| Slab Tier | Annual Income Band (NPR) | Regular Tax Rate (EPF/CIT) | SSF Contributor Rate | Max Tax in Band |
| :--- | :--- | :---: | :---: | :---: |
| **1st Slab (Base Bracket)** | **First NPR 10,00,000 (Up to 10 Lakh)** | **1%** | **0% (Exempt)** | NPR 10,000 (NPR 0 in SSF) |
| **2nd Slab** | **Next NPR 5,00,000 (10L – 15L)** | **10%** | **10%** | NPR 50,000 |
| **3rd Slab** | **Next NPR 10,00,000 (15L – 25L)** | **20%** | **20%** | NPR 2,00,000 |
| **4th Slab** | **Next NPR 15,00,000 (25L – 40L)** | **27%** | **27%** | NPR 4,05,000 |
| **5th Slab (Top Tier)** | **Above NPR 40,00,000 (Above 40 Lakh)** | **29%** | **29%** | Progressive Ceiling Rate |

> **Key Statutory Rule**: Employees enrolled in the **Social Security Fund (SSF)** are 100% exempt from the initial 1% Social Security Tax on the first **NPR 10,00,000 (10 Lakh)**, meaning **zero income tax** on annual taxable income up to NPR 10 Lakh!

---

## 2. Worked Salary Matrix (FY 2083/84): How Much Tax Do You Actually Pay?

| Monthly Gross Salary | Annual Gross Income | Annual Tax (Regular 1% Base) | Annual Tax (With SSF 0% up to 10L) | Effective Tax Rate (SSF) | Live Breakdown Link |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **NPR 40,000 / mo** | NPR 4,80,000 | NPR 4,800 | **NPR 0** | 0.00% | [View 40K Breakdown](${SITE_URL}/tax/tax-on-40000-salary-nepal) |
| **NPR 60,000 / mo** | NPR 7,20,000 | NPR 7,200 | **NPR 0** | 0.00% | [View 60K Breakdown](${SITE_URL}/tax/tax-on-60000-salary-nepal) |
| **NPR 80,000 / mo** | NPR 9,60,000 | NPR 9,600 | **NPR 0** | 0.00% | [View 80K Breakdown](${SITE_URL}/tax/tax-on-80000-salary-nepal) |
| **NPR 1,00,000 / mo** | NPR 12,00,000 | NPR 30,000 | **NPR 20,000** | 1.67% | [View 1 Lakh Breakdown](${SITE_URL}/tax/tax-on-100000-salary-nepal) |
| **NPR 1,50,000 / mo** | NPR 18,00,000 | NPR 1,20,000 | **NPR 1,10,000** | 6.11% | [View 1.5L Breakdown](${SITE_URL}/tax/tax-on-150000-salary-nepal) |
| **NPR 2,00,000 / mo** | NPR 24,00,000 | NPR 2,40,000 | **NPR 2,30,000** | 9.58% | [View 2L Breakdown](${SITE_URL}/tax/tax-on-200000-salary-nepal) |

You can test custom combinations of SSF, CIT, insurance deductions, and festival bonuses using the interactive [Nepal Salary & Income Tax Calculator at NepaliCalc.com](${SITE_URL}/tax).

---

## ३. नेपाली सारांश (Nepali Press Release Summary for Local Media)

**शीर्षक: आ.व. २०८३/८४ को नयाँ आयकर स्ल्याब (१० लाखसम्म १% वा SSF मा ०%), छुट र तलब करको पूर्ण विवरण**

आर्थिक वर्ष २०८३/८४ को नयाँ कर संरचना अनुसार सुरुको **रु. १०,००,००० (१० लाख)** सम्मको वार्षिक करयोग्य आम्दानीमा १ प्रतिशत मात्र सामाजिक सुरक्षा कर लाग्ने व्यवस्था छ। तर योगदानमा आधारित **सामाजिक सुरक्षा कोष (SSF)** मा आबद्ध श्रमिक तथा कर्मचारीहरूलाई सुरुको १० लाखसम्मको १ प्रतिशत कर पूर्ण रूपमा छुट (०% कर) हुन्छ। आफ्नो मासिक वा वार्षिक तलबबाट कति कर काटिन्छ भनी तुरुन्तै हिसाब गर्न [NepaliCalc को आयकर क्यालकुलेटर (${SITE_URL}/tax)](${SITE_URL}/tax) प्रयोग गर्न सकिन्छ।`,
  },
  {
    id: 'art-2-bs-engine',
    filename: '02-devto-hashnode-bikram-sambat-engine.md',
    title: 'How We Built a Zero-Dependency Bikram Sambat (1970–2100 BS) Calendar & Nepal Financial Engine in TypeScript',
    canonicalUrl: `${SITE_URL}/date`,
    tags: ['typescript', 'nextjs', 'nepal', 'webdev'],
    platformTarget: 'Dev.to, Hashnode & Medium Engineering',
    summary: 'Technical architecture breakdown of Bikram Sambat (1970–2100 BS) date conversion algorithms and Nepali customary land unit normalization in TypeScript.',
    markdownWithFrontmatter: `---
title: "How We Built a Zero-Dependency Bikram Sambat (1970–2100 BS) Calendar & Nepal Financial Engine in TypeScript"
canonical_url: "${SITE_URL}/date"
tags: ["typescript", "nextjs", "nepal", "webdev"]
published: false
---

# How We Built a Zero-Dependency Bikram Sambat (1970–2100 BS) Calendar & Nepal Financial Engine in TypeScript

Unlike the Gregorian (AD) calendar—which follows deterministic leap-year math—Nepal's official **Bikram Sambat (BS / वि.सं.)** solar calendar is astronomical. In Bikram Sambat, a month can have **29, 30, 31, or 32 days** depending on the sun's transit through the zodiac (*Surya Sankranti*).

Here is an engineering breakdown of how we architected the date conversion and financial calculation engine powering [NepaliCalc.com](${SITE_URL}).

---

## 1. The Bikram Sambat Lookup Matrix Architecture

1. **Anchor Epoch**: We anchor the calendar to a known reference epoch (**1970 Baisakh 1 BS = April 13, 1913 AD**).
2. **12-Tuple Month Array**: Each BS year maps to a 12-element tuple storing the exact number of days from *Baisakh* (Month 1) to *Chaitra* (Month 12).

\`\`\`typescript
export const BS_CALENDAR_DATA: Record<number, number[]> = {
  2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2082: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
};
\`\`\`

When a user enters a BS date in the [Nepali Date Converter (BS ⇄ AD)](${SITE_URL}/date), we compute the exact day delta from the epoch in UTC milliseconds without timezone drift.

---

## 2. Solving Customary Nepali Land Units (Ropani vs. Bigha)

Nepal uses two parallel customary land measurement systems depending on geography:
- **Hilly Region (Pahad / Kathmandu Valley)**: \`1 Ropani = 16 Aana = 64 Paisa = 256 Daam = 5,476 sq. ft.\`
- **Terai Region (Madhesh / Plains)**: \`1 Bigha = 20 Kattha = 400 Dhur = 72,900 sq. ft.\`

| Customary Unit | Region | Exact Square Feet | Exact Square Meters |
| :--- | :--- | :---: | :---: |
| **1 Bigha (बिघा)** | Terai | 72,900.00 sq. ft. | 6,772.63 m² |
| **1 Kattha (कठ्ठा)** | Terai | 3,645.00 sq. ft. | 338.63 m² |
| **1 Dhur (धुर)** | Terai | 182.25 sq. ft. | 16.93 m² |
| **1 Ropani (रोपनी)** | Hilly | 5,476.00 sq. ft. | 508.74 m² |
| **1 Aana (आना)** | Hilly | 342.25 sq. ft. | 31.79 m² |

Inspect the live bidirectional unit converter and road-deduction (*Bato Katta*) math at [nepalicalc.com/land](${SITE_URL}/land).`,
    cleanBodyMarkdown: `# How We Built a Zero-Dependency Bikram Sambat (1970–2100 BS) Calendar & Nepal Financial Engine in TypeScript

Unlike the Gregorian (AD) calendar—which follows deterministic leap-year math—Nepal's official **Bikram Sambat (BS / वि.सं.)** solar calendar is astronomical. In Bikram Sambat, a month can have **29, 30, 31, or 32 days** depending on the sun's transit through the zodiac (*Surya Sankranti*).

Here is an engineering breakdown of how we architected the date conversion and financial calculation engine powering [NepaliCalc.com](${SITE_URL}).

---

## 1. The Bikram Sambat Lookup Matrix Architecture

1. **Anchor Epoch**: We anchor the calendar to a known reference epoch (**1970 Baisakh 1 BS = April 13, 1913 AD**).
2. **12-Tuple Month Array**: Each BS year maps to a 12-element tuple storing the exact number of days from *Baisakh* (Month 1) to *Chaitra* (Month 12).

\`\`\`typescript
export const BS_CALENDAR_DATA: Record<number, number[]> = {
  2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2082: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
};
\`\`\`

When a user enters a BS date in the [Nepali Date Converter (BS ⇄ AD)](${SITE_URL}/date), we compute the exact day delta from the epoch in UTC milliseconds without timezone drift.

---

## 2. Solving Customary Nepali Land Units (Ropani vs. Bigha)

Nepal uses two parallel customary land measurement systems depending on geography:
- **Hilly Region (Pahad / Kathmandu Valley)**: \`1 Ropani = 16 Aana = 64 Paisa = 256 Daam = 5,476 sq. ft.\`
- **Terai Region (Madhesh / Plains)**: \`1 Bigha = 20 Kattha = 400 Dhur = 72,900 sq. ft.\`

| Customary Unit | Region | Exact Square Feet | Exact Square Meters |
| :--- | :--- | :---: | :---: |
| **1 Bigha (बिघा)** | Terai | 72,900.00 sq. ft. | 6,772.63 m² |
| **1 Kattha (कठ्ठा)** | Terai | 3,645.00 sq. ft. | 338.63 m² |
| **1 Dhur (धुर)** | Terai | 182.25 sq. ft. | 16.93 m² |
| **1 Ropani (रोपनी)** | Hilly | 5,476.00 sq. ft. | 508.74 m² |
| **1 Aana (आना)** | Hilly | 342.25 sq. ft. | 31.79 m² |

Inspect the live bidirectional unit converter and road-deduction (*Bato Katta*) math at [nepalicalc.com/land](${SITE_URL}/land).`,
  },
  {
    id: 'art-3-land-guide',
    filename: '03-real-estate-land-measurement-guide.md',
    title: 'Complete Guide to Land Measurement in Nepal: Ropani-Aana-Paisa-Daam & Bigha-Kattha-Dhur to Sq. Feet',
    canonicalUrl: `${SITE_URL}/land`,
    tags: ['nepal', 'realestate', 'property', 'architecture'],
    platformTarget: 'Medium, Substack & Nepal Real Estate / Architecture Blogs',
    summary: 'Official Survey Department (Napi Bibhag) conversion reference for Kathmandu Valley (Ropani/Aana) and Terai (Bigha/Kattha/Dhur) residential plots.',
    markdownWithFrontmatter: `---
title: "Complete Guide to Land Measurement in Nepal: Ropani-Aana-Paisa-Daam & Bigha-Kattha-Dhur to Sq. Feet"
canonical_url: "${SITE_URL}/land"
tags: ["nepal", "realestate", "property", "architecture"]
published: false
---

# Complete Guide to Land Measurement in Nepal: Ropani-Aana-Paisa-Daam & Bigha-Kattha-Dhur to Sq. Feet

Whether you are buying residential land in Kathmandu, verifying a *Lalpurja* (land ownership certificate) in Chitwan, or calculating road expansion deduction (*Bato Katta*), understanding Nepal's dual land measurement system is essential.

This reference guide provides the official Survey Department (*Napi Bibhag*) conversion formulas between **Hilly units (Ropani/Aana)**, **Terai units (Bigha/Kattha/Dhur)**, and **Standard Metric/Imperial units (Sq. Meters / Sq. Feet)**—with instant verification tools via [NepaliCalc's Land Unit Converter](${SITE_URL}/land).

---

## 1. Hilly Region System: Ropani, Aana, Paisa & Daam

- **1 Ropani** = 16 Aana = 5,476 Sq. Feet = 508.74 Sq. Meters
- **1 Aana** = 4 Paisa = 342.25 Sq. Feet = 31.79 Sq. Meters
- **1 Paisa** = 4 Daam = 85.56 Sq. Feet = 7.95 Sq. Meters
- **1 Daam** = 21.39 Sq. Feet = 1.99 Sq. Meters

| Plot Size in Aana | Square Feet (Sq. Ft.) | Square Meters (m²) | Typical Building Footprint |
| :--- | :---: | :---: | :--- |
| **2.5 Aana (ढाई आना)** | 855.63 sq. ft. | 79.49 m² | Compact urban townhome |
| **3 Aana (३ आना)** | 1,026.75 sq. ft. | 95.39 m² | Standard 2.5-storey residential house |
| **4 Aana (४ आना)** | 1,369.00 sq. ft. | 127.18 m² | Spacious family bungalow with parking |
| **5 Aana (५ आना)** | 1,711.25 sq. ft. | 158.98 m² | Large residential villa |
| **8 Aana (आधा रोपनी)** | 2,738.00 sq. ft. | 254.37 m² | Commercial / duplex compound |

---

## 2. Terai Region System: Bigha, Kattha & Dhur

- **1 Bigha** = 20 Kattha = 72,900 Sq. Feet = 6,772.63 Sq. Meters (≈ 13.31 Ropani)
- **1 Kattha** = 20 Dhur = 3,645 Sq. Feet = 338.63 Sq. Meters (≈ 10.65 Aana)
- **1 Dhur** = 182.25 Sq. Feet = 16.93 Sq. Meters (≈ 0.53 Aana)

Calculate road setback deduction and construction cost at [Nepal Bato Katta Calculator](${SITE_URL}/bato-katta) and [House Construction Cost Estimator](${SITE_URL}/house-construction).`,
    cleanBodyMarkdown: `# Complete Guide to Land Measurement in Nepal: Ropani-Aana-Paisa-Daam & Bigha-Kattha-Dhur to Sq. Feet

Whether you are buying residential land in Kathmandu, verifying a *Lalpurja* (land ownership certificate) in Chitwan, or calculating road expansion deduction (*Bato Katta*), understanding Nepal's dual land measurement system is essential.

This reference guide provides the official Survey Department (*Napi Bibhag*) conversion formulas between **Hilly units (Ropani/Aana)**, **Terai units (Bigha/Kattha/Dhur)**, and **Standard Metric/Imperial units (Sq. Meters / Sq. Feet)**—with instant verification tools via [NepaliCalc's Land Unit Converter](${SITE_URL}/land).

---

## 1. Hilly Region System: Ropani, Aana, Paisa & Daam

- **1 Ropani** = 16 Aana = 5,476 Sq. Feet = 508.74 Sq. Meters
- **1 Aana** = 4 Paisa = 342.25 Sq. Feet = 31.79 Sq. Meters
- **1 Paisa** = 4 Daam = 85.56 Sq. Feet = 7.95 Sq. Meters
- **1 Daam** = 21.39 Sq. Feet = 1.99 Sq. Meters

| Plot Size in Aana | Square Feet (Sq. Ft.) | Square Meters (m²) | Typical Building Footprint |
| :--- | :---: | :---: | :--- |
| **2.5 Aana (ढाई आना)** | 855.63 sq. ft. | 79.49 m² | Compact urban townhome |
| **3 Aana (३ आना)** | 1,026.75 sq. ft. | 95.39 m² | Standard 2.5-storey residential house |
| **4 Aana (४ आना)** | 1,369.00 sq. ft. | 127.18 m² | Spacious family bungalow with parking |
| **5 Aana (५ आना)** | 1,711.25 sq. ft. | 158.98 m² | Large residential villa |
| **8 Aana (आधा रोपनी)** | 2,738.00 sq. ft. | 254.37 m² | Commercial / duplex compound |

---

## 2. Terai Region System: Bigha, Kattha & Dhur

- **1 Bigha** = 20 Kattha = 72,900 Sq. Feet = 6,772.63 Sq. Meters (≈ 13.31 Ropani)
- **1 Kattha** = 20 Dhur = 3,645 Sq. Feet = 338.63 Sq. Meters (≈ 10.65 Aana)
- **1 Dhur** = 182.25 Sq. Feet = 16.93 Sq. Meters (≈ 0.53 Aana)

Calculate road setback deduction and construction cost at [Nepal Bato Katta Calculator](${SITE_URL}/bato-katta) and [House Construction Cost Estimator](${SITE_URL}/house-construction).`,
  },
  {
    id: 'art-4-remittance-forex',
    filename: '04-linkedin-substack-remittance-forex-study.md',
    title: 'Sending Money to Nepal in 2083: NRB Exchange Rates, Corridor Spreads & The +1% Remittance FD Incentive',
    canonicalUrl: `${SITE_URL}/remittance`,
    tags: ['nepal', 'remittance', 'forex', 'banking'],
    platformTarget: 'LinkedIn Pulse Articles & Substack',
    summary: 'Analysis of NRB buying/selling exchange rates across USD, AUD, AED, QAR, SAR, MYR, KRW, and GBP corridors and the +1% Remittance Fixed Deposit rule.',
    markdownWithFrontmatter: `---
title: "Sending Money to Nepal in 2083: NRB Exchange Rates, Corridor Spreads & The +1% Remittance FD Incentive"
canonical_url: "${SITE_URL}/remittance"
tags: ["nepal", "remittance", "forex", "banking"]
published: false
---

# Sending Money to Nepal: Understanding NRB Forex Rates, Transfer Channels & The +1% Remittance Incentive

Remittances contribute over 25% of Nepal's GDP, with millions of Nepalis working and studying in the **UAE (AED), Qatar (QAR), Saudi Arabia (SAR), Malaysia (MYR), South Korea (KRW), Japan (JPY), Australia (AUD), the USA (USD), and the UK (GBP)**.

Here is how foreign exchange pricing to Nepalese Rupees (NPR) works and how to calculate your exact net payout using [NepaliCalc's Remittance & NRB Forex Calculators](${SITE_URL}/remittance).

| Corridor Currency | Code | Standard Unit | Live Converter Link |
| :--- | :---: | :---: | :--- |
| **US Dollar** | USD | 1 Unit | [USD to NPR Live Calculator](${SITE_URL}/forex/usd-to-npr) |
| **Australian Dollar** | AUD | 1 Unit | [AUD to NPR Live Calculator](${SITE_URL}/forex/aud-to-npr) |
| **UAE Dirham (Dubai/Abu Dhabi)** | AED | 1 Unit | [AED to NPR Live Calculator](${SITE_URL}/forex/aed-to-npr) |
| **Qatari Riyal (Doha)** | QAR | 1 Unit | [QAR to NPR Live Calculator](${SITE_URL}/forex/qar-to-npr) |
| **Saudi Riyal (Riyadh/Jeddah)** | SAR | 1 Unit | [SAR to NPR Live Calculator](${SITE_URL}/forex/sar-to-npr) |
| **Malaysian Ringgit** | MYR | 1 Unit | [MYR to NPR Live Calculator](${SITE_URL}/forex/myr-to-npr) |
| **South Korean Won (EPS)** | KRW | 100 Units | [KRW to NPR Live Calculator](${SITE_URL}/forex/krw-to-npr) |
| **British Pound Sterling** | GBP | 1 Unit | [GBP to NPR Live Calculator](${SITE_URL}/forex/gbp-to-npr) |

Compare bank deposit, digital wallet (eSewa/Khalti), and cash pickup net payout side-by-side at [NepaliCalc.com/remittance](${SITE_URL}/remittance).`,
    cleanBodyMarkdown: `# Sending Money to Nepal: Understanding NRB Forex Rates, Transfer Channels & The +1% Remittance Incentive

Remittances contribute over 25% of Nepal's GDP, with millions of Nepalis working and studying in the **UAE (AED), Qatar (QAR), Saudi Arabia (SAR), Malaysia (MYR), South Korea (KRW), Japan (JPY), Australia (AUD), the USA (USD), and the UK (GBP)**.

Here is how foreign exchange pricing to Nepalese Rupees (NPR) works and how to calculate your exact net payout using [NepaliCalc's Remittance & NRB Forex Calculators](${SITE_URL}/remittance).

| Corridor Currency | Code | Standard Unit | Live Converter Link |
| :--- | :---: | :---: | :--- |
| **US Dollar** | USD | 1 Unit | [USD to NPR Live Calculator](${SITE_URL}/forex/usd-to-npr) |
| **Australian Dollar** | AUD | 1 Unit | [AUD to NPR Live Calculator](${SITE_URL}/forex/aud-to-npr) |
| **UAE Dirham (Dubai/Abu Dhabi)** | AED | 1 Unit | [AED to NPR Live Calculator](${SITE_URL}/forex/aed-to-npr) |
| **Qatari Riyal (Doha)** | QAR | 1 Unit | [QAR to NPR Live Calculator](${SITE_URL}/forex/qar-to-npr) |
| **Saudi Riyal (Riyadh/Jeddah)** | SAR | 1 Unit | [SAR to NPR Live Calculator](${SITE_URL}/forex/sar-to-npr) |
| **Malaysian Ringgit** | MYR | 1 Unit | [MYR to NPR Live Calculator](${SITE_URL}/forex/myr-to-npr) |
| **South Korean Won (EPS)** | KRW | 100 Units | [KRW to NPR Live Calculator](${SITE_URL}/forex/krw-to-npr) |
| **British Pound Sterling** | GBP | 1 Unit | [GBP to NPR Live Calculator](${SITE_URL}/forex/gbp-to-npr) |

Compare bank deposit, digital wallet (eSewa/Khalti), and cash pickup net payout side-by-side at [NepaliCalc.com/remittance](${SITE_URL}/remittance).`,
  },
  {
    id: 'art-5-ev-bluebook',
    filename: '05-ev-vs-petrol-bluebook-tax-nepal.md',
    title: 'Electric Vehicle (EV kW) vs. Petrol (CC) Bluebook Renewal Tax in Nepal: Complete 5-Year Cost Breakdown',
    canonicalUrl: `${SITE_URL}/vehicle`,
    tags: ['nepal', 'electricvehicles', 'automobile', 'tax'],
    platformTarget: 'Nepal Auto/Tech Blogs (TechLekh, GadgetByte) & Medium',
    summary: 'Side-by-side Bagmati Province annual road tax comparison for EV motors (50kW–300kW) vs. Petrol engines (1000cc–2500cc) and late renewal penalty rules.',
    markdownWithFrontmatter: `---
title: "Electric Vehicle (EV kW) vs. Petrol (CC) Bluebook Renewal Tax in Nepal: Complete 5-Year Cost Breakdown"
canonical_url: "${SITE_URL}/vehicle"
tags: ["nepal", "electricvehicles", "automobile", "tax"]
published: false
---

# Electric Vehicle (EV kW) vs. Petrol (CC) Bluebook Renewal Tax in Nepal: Complete Cost Comparison

Over 70% of four-wheeler passenger vehicles imported into Nepal today are Electric Vehicles (EVs). Below is the official Bagmati Province annual vehicle tax comparison for both **Electric Motors (measured in kW)** and **Internal Combustion Engines (measured in CC)**—sourced from the [Nepal Vehicle Bluebook Tax Calculator](${SITE_URL}/vehicle).

## 1. Electric Car (Four-Wheeler EV) Annual Tax by Motor Peak Power (kW)

| EV Motor Power Tier | Examples in Nepal | Annual Road Tax (Bagmati) |
| :--- | :--- | :---: |
| **Up to 50 kW** | Tata Tiago EV (45/55 kW), MG Comet, Wuling Air | **NPR 10,000 / year** |
| **51 kW to 100 kW** | BYD Dolphin (70 kW), BYD Atto 3 (100 kW), Nammi Box (70 kW), Nexon EV | **NPR 15,000 / year** |
| **101 kW to 200 kW** | MG ZS EV, Hyundai Kona/Creta EV, Deepal S07, Omoda E5 | **NPR 22,000 / year** |
| **201 kW to 300 kW** | BYD Seal, Tesla Model 3/Y | **NPR 35,000 / year** |
| **Above 300 kW** | High-performance luxury dual-motor EVs | **NPR 50,000 / year** |

## 2. Petrol / Diesel Car (Four-Wheeler ICE) Annual Tax by Engine CC

| Engine Displacement (CC) | Examples in Nepal | Annual Road Tax (Bagmati) |
| :--- | :--- | :---: |
| **Up to 1,000 CC** | Alto 800, Celerio, WagonR 1.0 | **NPR 22,000 / year** |
| **1,001 CC to 1,500 CC** | Baleno, Swift, i20, Brezza, Creta 1.5, Venue | **NPR 25,000 / year** |
| **1,501 CC to 2,000 CC** | Scorpio-N, XUV700, Tucson, Compass | **NPR 34,000 / year** |
| **2,001 CC to 2,500 CC** | Hilux, Fortuner, Everest | **NPR 56,000 / year** |

Calculate your exact vehicle tax, third-party insurance, and EV charging cost per kilometer at [NepaliCalc.com/vehicle](${SITE_URL}/vehicle).`,
    cleanBodyMarkdown: `# Electric Vehicle (EV kW) vs. Petrol (CC) Bluebook Renewal Tax in Nepal: Complete Cost Comparison

Over 70% of four-wheeler passenger vehicles imported into Nepal today are Electric Vehicles (EVs). Below is the official Bagmati Province annual vehicle tax comparison for both **Electric Motors (measured in kW)** and **Internal Combustion Engines (measured in CC)**—sourced from the [Nepal Vehicle Bluebook Tax Calculator](${SITE_URL}/vehicle).

## 1. Electric Car (Four-Wheeler EV) Annual Tax by Motor Peak Power (kW)

| EV Motor Power Tier | Examples in Nepal | Annual Road Tax (Bagmati) |
| :--- | :--- | :---: |
| **Up to 50 kW** | Tata Tiago EV (45/55 kW), MG Comet, Wuling Air | **NPR 10,000 / year** |
| **51 kW to 100 kW** | BYD Dolphin (70 kW), BYD Atto 3 (100 kW), Nammi Box (70 kW), Nexon EV | **NPR 15,000 / year** |
| **101 kW to 200 kW** | MG ZS EV, Hyundai Kona/Creta EV, Deepal S07, Omoda E5 | **NPR 22,000 / year** |
| **201 kW to 300 kW** | BYD Seal, Tesla Model 3/Y | **NPR 35,000 / year** |
| **Above 300 kW** | High-performance luxury dual-motor EVs | **NPR 50,000 / year** |

## 2. Petrol / Diesel Car (Four-Wheeler ICE) Annual Tax by Engine CC

| Engine Displacement (CC) | Examples in Nepal | Annual Road Tax (Bagmati) |
| :--- | :--- | :---: |
| **Up to 1,000 CC** | Alto 800, Celerio, WagonR 1.0 | **NPR 22,000 / year** |
| **1,001 CC to 1,500 CC** | Baleno, Swift, i20, Brezza, Creta 1.5, Venue | **NPR 25,000 / year** |
| **1,501 CC to 2,000 CC** | Scorpio-N, XUV700, Tucson, Compass | **NPR 34,000 / year** |
| **2,001 CC to 2,500 CC** | Hilux, Fortuner, Everest | **NPR 56,000 / year** |

Calculate your exact vehicle tax, third-party insurance, and EV charging cost per kilometer at [NepaliCalc.com/vehicle](${SITE_URL}/vehicle).`,
  },
];

export const COMMUNITY_POSTS: CommunityPostItem[] = [
  {
    id: 'reddit-nepal-tax',
    platform: 'Reddit',
    communityName: 'r/Nepal',
    submitUrl: 'https://www.reddit.com/r/Nepal/submit',
    title: '[Guide] How much Income Tax & SSF you actually pay on a 40k to 2L monthly salary in Nepal (FY 2083/84 — 10 Lakh Base Slab)',
    targetUrl: `${SITE_URL}/tax`,
    bodyMarkdown: `A lot of people starting new jobs or switching between SSF and regular PF/CIT companies ask how much in-hand salary they will actually receive after tax under the **FY 2083/84** rules (where the first **Rs. 10,00,000** is taxed at just **1%**, or **0%** if enrolled in SSF).

Here is a quick reference table based on the current IRD FY 2083/84 slabs:

| Monthly Gross | Annual Gross | Tax (Regular 1% Base Slab) | Tax (If enrolled in SSF - 0% up to 10L) |
| :--- | :--- | :--- | :--- |
| Rs. 40,000 | Rs. 4,80,000 | Rs. 4,800/yr (Rs. 400/mo) | **Rs. 0** (Exempt up to 10L) |
| Rs. 60,000 | Rs. 7,20,000 | Rs. 7,200/yr (Rs. 600/mo) | **Rs. 0** (Exempt up to 10L) |
| Rs. 80,000 | Rs. 9,60,000 | Rs. 9,600/yr (Rs. 800/mo) | **Rs. 0** (Exempt up to 10L) |
| Rs. 1,00,000 | Rs. 12,00,000 | Rs. 30,000/yr | **Rs. 20,000/yr** |
| Rs. 1,50,000 | Rs. 18,00,000 | Rs. 1,20,000/yr | **Rs. 1,10,000/yr** |
| Rs. 2,00,000 | Rs. 24,00,000 | Rs. 2,40,000/yr | **Rs. 2,30,000/yr** |

**3 Quick Tax-Saving Tips in Nepal:**
1. **CIT / EPF / SSF Deduction**: You can deduct up to 1/3rd of your income (or max Rs. 5,00,000) via Retirement Funds (SSF/EPF/CIT) to lower your taxable income out of the 10%, 20%, or 27% brackets.
2. **Insurance Deductions**: Up to Rs. 40,000 for Life Insurance + Rs. 20,000 for Health Insurance are deductible from taxable income.
3. **Female Tax Rebate**: Solo-filing salaried women get a flat 10% rebate on total tax liability.

*(If you want to test your exact salary with Dashain bonus, CIT, and insurance deductions—or switch between FY 2083/84 and FY 2082/83—I put together a free calculator here: ${SITE_URL}/tax)*`,
  },
  {
    id: 'reddit-nepalistock-nepse',
    platform: 'Reddit',
    communityName: 'r/NepaliStock',
    submitUrl: 'https://www.reddit.com/r/NepaliStock/submit',
    title: 'Quick Reference: Updated NEPSE Broker Commission Tiers, SEBON Fee & 5% vs 7.5% CGT Break-Even Math',
    targetUrl: `${SITE_URL}/nepse`,
    bodyMarkdown: `Here is the exact fee structure currently charged on secondary market equity trades in NEPSE so you can quickly check your break-even selling price:

**1. NEPSE Broker Commission Slabs:**
* **Up to Rs. 50,000**: 0.36% (Min Rs. 10)
* **Rs. 50,001 to Rs. 5,00,000**: 0.33%
* **Rs. 5,00,001 to Rs. 20,00,000**: 0.31%
* **Rs. 20,00,001 to Rs. 1,00,00,000**: 0.27%
* **Above Rs. 1,00,00,000**: 0.24%

**2. Additional Mandatory Charges:**
* **SEBON Regulatory Fee**: 0.015% of transaction amount
* **DP Charge**: Rs. 25 per scrip per transfer
* **Capital Gains Tax (CGT) for Individuals**: **7.5%** if held < 365 days (Short-Term) | **5.0%** if held >= 365 days (Long-Term)

*(You can calculate exact net profit, right share price adjustment, and WACC at ${SITE_URL}/nepse)*`,
  },
  {
    id: 'quora-tax-answer',
    platform: 'Quora',
    communityName: 'Quora — Income Tax in Nepal',
    submitUrl: 'https://www.google.com/search?q=site%3Aquora.com+%22income+tax%22+%22nepal%22',
    title: 'How is income tax calculated on salary in Nepal (FY 2083/84)?',
    targetUrl: `${SITE_URL}/tax`,
    bodyMarkdown: `In Nepal, under the **FY 2083/84** Inland Revenue Department (IRD) structure, personal income tax is levied progressively across five streamlined slabs:

1. **First Rs. 10,00,000 (Up to 10 Lakh)**: **1%** Social Security Tax (or **0%** if enrolled in the Social Security Fund / SSF).
2. **Next Rs. 5,00,000 (10L to 15L)**: **10%**
3. **Next Rs. 10,00,000 (15L to 25L)**: **20%**
4. **Next Rs. 15,00,000 (25L to 40L)**: **27%**
5. **Above Rs. 40,00,000 (Above 40 Lakh)**: **29%**

*(Note: For retrospective FY 2082/83 & 2081/82 tax audits, the prior Rs. 5,00,000 Single / Rs. 6,00,000 Married base slabs apply).*

Before applying these slabs, you can deduct up to 1/3rd of your assessable income contributed to SSF/EPF/CIT (up to Rs. 5,00,000), Rs. 40,000 for Life Insurance, and Rs. 20,000 for Health Insurance.

You can check your exact monthly take-home salary and slab breakdown using the Nepal Salary Tax Calculator at ${SITE_URL}/tax.`,
  },
  {
    id: 'quora-land-answer',
    platform: 'Quora',
    communityName: 'Quora — Ropani / Aana / Bigha in Nepal',
    submitUrl: 'https://www.google.com/search?q=site%3Aquora.com+%22ropani%22+OR+%22aana%22+%22nepal%22',
    title: 'How many square feet is 1 Ropani, 1 Aana, or 1 Bigha in Nepal?',
    targetUrl: `${SITE_URL}/land`,
    bodyMarkdown: `Nepal uses two official customary land measurement systems depending on geography:

**1. Hilly System (Kathmandu, Pokhara & Hills — Ropani System):**
* **1 Ropani** = 16 Aana = **5,476 sq. ft.** (508.74 sq. meters)
* **1 Aana** = 4 Paisa = **342.25 sq. ft.** (31.79 sq. meters)
* **1 Paisa** = 4 Daam = **85.56 sq. ft.** (7.95 sq. meters)
* **1 Daam** = **21.39 sq. ft.** (1.99 sq. meters)

**2. Terai System (Chitwan, Jhapa, Morang, Rupandehi — Bigha System):**
* **1 Bigha** = 20 Kattha = **72,900 sq. ft.** (6,772.63 sq. meters)
* **1 Kattha** = 20 Dhur = **3,645 sq. ft.** (338.63 sq. meters)
* **1 Dhur** = **182.25 sq. ft.** (16.93 sq. meters)

For instant conversions between Ropani-Aana-Paisa-Daam, Bigha-Kattha-Dhur, and Square Feet, see the reference converter at ${SITE_URL}/land.`,
  },
];

export const DATASET_FILES: DatasetFileItem[] = [
  {
    filename: 'nepal-land-measurement-units.csv',
    mimeType: 'text/csv;charset=utf-8;',
    description: 'Official Nepal Customary Land Measurement Units (Ropani/Aana/Paisa/Daam & Bigha/Kattha/Dhur to Sq.Ft & Sq.M)',
    content: [
      'unit_name_en,unit_name_ne,region,square_feet,square_meters,ropani_equivalent,bigha_equivalent,reference_url',
      `Bigha,बिघा,Terai,72900,6772.63,13.3126,1,${SITE_URL}/land`,
      `Kattha,कठ्ठा,Terai,3645,338.63,0.6656,0.05,${SITE_URL}/land`,
      `Dhur,धुर,Terai,182.25,16.93,0.0333,0.0025,${SITE_URL}/land`,
      `Ropani,रोपनी,Hilly,5476,508.74,1,0.0751,${SITE_URL}/land`,
      `Aana,आना,Hilly,342.25,31.79,0.0625,0.00469,${SITE_URL}/land`,
      `Paisa,पैसा,Hilly,85.5625,7.95,0.015625,0.00117,${SITE_URL}/land`,
      `Daam,दाम,Hilly,21.3906,1.99,0.003906,0.000293,${SITE_URL}/land`,
    ].join('\n'),
  },
  {
    filename: 'nepal-income-tax-slabs-2083.csv',
    mimeType: 'text/csv;charset=utf-8;',
    description: 'Official IRD Nepal Income Tax Slabs (FY 2083/84 New 10L Base Rule + FY 2082/83 Reference)',
    content: [
      'fiscal_year,slab_order,filing_status,band_amount_npr,cumulative_limit_npr,regular_tax_rate_pct,ssf_contributor_rate_pct,reference_url',
      `2083/84,1,All Resident Taxpayers,1000000,1000000,1,0,${SITE_URL}/tax`,
      `2083/84,2,All Resident Taxpayers,500000,1500000,10,10,${SITE_URL}/tax`,
      `2083/84,3,All Resident Taxpayers,1000000,2500000,20,20,${SITE_URL}/tax`,
      `2083/84,4,All Resident Taxpayers,1500000,4000000,27,27,${SITE_URL}/tax`,
      `2083/84,5,All Resident Taxpayers,Above 4000000,999999999,29,29,${SITE_URL}/tax`,
      `2082/83,1,Unmarried (Single),500000,500000,1,0,${SITE_URL}/tax`,
      `2082/83,1,Married (Couple),600000,600000,1,0,${SITE_URL}/tax`,
    ].join('\n'),
  },
  {
    filename: '.zenodo.json',
    mimeType: 'application/json;charset=utf-8;',
    description: 'Zenodo CERN Open Science Metadata File (Automatically sets Related Works & Creator DOI Links)',
    content: JSON.stringify(
      {
        title:
          'Open Dataset of Nepal Statutory Financial Slabs, Customary Land Measurement Units (Ropani/Bigha), and Utility Tariffs (2082/83–2083/84 BS)',
        upload_type: 'dataset',
        description: `Structured reference datasets for Nepal's statutory income tax brackets (IRD), customary land measurement conversions (Ropani-Aana-Paisa-Daam & Bigha-Kattha-Dhur), and utility rates. Canonical interactive calculators and live verification tools are hosted at ${SITE_URL}.`,
        creators: [{ name: 'Chalise, Deepak', affiliation: 'NepaliCalc.com' }],
        keywords: [
          'Nepal',
          'Income Tax Nepal',
          'Bikram Sambat',
          'Ropani to Aana',
          'Bigha to Kattha',
          'NEPSE',
          'NepaliCalc',
        ],
        license: 'cc-by-4.0',
        related_identifiers: [
          { identifier: SITE_URL, relation: 'isSupplementTo', scheme: 'url' },
          { identifier: `${SITE_URL}/tax`, relation: 'isCompiledBy', scheme: 'url' },
          { identifier: `${SITE_URL}/land`, relation: 'isCompiledBy', scheme: 'url' },
        ],
      },
      null,
      2
    ),
  },
  {
    filename: 'README.md',
    mimeType: 'text/markdown;charset=utf-8;',
    description: 'Dataset Card README for Zenodo, Kaggle, HuggingFace & GitHub Repositories',
    content: `# Nepal Statutory Financial, Tax & Land Measurement Open Datasets (2083 BS)

[![Live Interactive Calculators](https://img.shields.io/badge/Live_Calculators-NepaliCalc.com-0b2b5c)](${SITE_URL})
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-emerald)](https://creativecommons.org/licenses/by/4.0/)

This repository contains machine-readable CSV and JSON reference tables for Nepal's statutory financial calculations, customary land measurement conversions, and calendar utilities.

## Canonical Interactive Tools & Reference Calculators
- **Nepal Salary & Income Tax Calculator (FY 2082/83 & 2083/84)**: [${SITE_URL}/tax](${SITE_URL}/tax)
- **Nepal Land Unit Converter (Ropani-Aana-Paisa-Daam ⇄ Bigha-Kattha-Dhur ⇄ Sq. Ft.)**: [${SITE_URL}/land](${SITE_URL}/land)
- **Bikram Sambat (1970–2100 BS) Date Converter & Patro**: [${SITE_URL}/date](${SITE_URL}/date)
- **NRB Live Forex & Remittance Calculator**: [${SITE_URL}/forex](${SITE_URL}/forex)
- **NEPSE Share Commission, WACC & CGT Calculator**: [${SITE_URL}/nepse](${SITE_URL}/nepse)
- **Bagmati & Provincial Vehicle Bluebook Tax Calculator**: [${SITE_URL}/vehicle](${SITE_URL}/vehicle)

## Citation
If you use these datasets in academic papers, financial analysis, or LLM training, please cite:
> NepaliCalc (2026). *Nepal Statutory Financial Slabs, Customary Land Measurement Units, and Bikram Sambat Reference Datasets*. Retrieved from ${SITE_URL}
`,
  },
];

