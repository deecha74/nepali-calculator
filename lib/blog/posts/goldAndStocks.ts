import { BlogPost } from '../types';

export const goldAndStocksPosts: BlogPost[] = [
  {
    slug: 'gold-silver-price-calculation-nepal',
    title: 'How Gold & Silver Prices are Calculated in Nepal: Tola, Jarti & 13% VAT',
    titleNep: 'नेपालमा सुन र चाँदीको मूल्य कसरी निर्धारण हुन्छ? तोला, जर्ती र १३% भ्याट',
    excerpt: 'Demystifying official FENEGOSIDA gold rates in Nepal, jeweler making charges, wastage loss, and how to verify 24K and 22K jewelry costs before buying.',
    excerptNep: 'नेपाल सुनचाँदी व्यवसायी महासंघ (FENEGOSIDA) को दर, गहना बनाउने ज्याला, जर्ती र बिलिङ गर्दा ठगिनबाट जोगिने उपायहरू।',
    category: 'Gold & Wealth',
    publishedDate: '2026-10-18',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Live Gold Rate & Jewelry Bill Calculator',
      href: '/gold',
      iconText: 'TrendingUp',
    },
    keywords: ['gold price in nepal today', '1 tola gold price nepal', 'gold jarti calculation nepal', 'fenegosida live rate'],
    content: {
      intro: 'Buying gold in Nepal serves as both a cultural tradition during Dashain, Tihar, and wedding seasons and a store of family wealth. However, final store billing frequently confuses buyers because the price per tola announced in morning news bulletins excludes jewelry showroom overheads.',
      keyTakeaways: [
        '1 Tola equals 11.6638 grams or 100 Lal. 1 Lal equals 0.1166 grams.',
        'Jewelry invoices consist of: Pure Metal Cost + Making Labor Charge + Wastage Jarti Charge + 13% Government VAT.',
        'Fine Gold is 99.99% pure (24 Karat), while Tejabi is 91.6% pure (22 Karat), traded at NPR 1,000 less per tola.',
        'Demand an official VAT bill with hallmark certification to guarantee resale purity verification.'
      ],
      sections: [
        {
          heading: 'Understanding Traditional Units: Tola, Lal & Grams',
          body: 'The gold market in Nepal operates on traditional Vedic units synchronized with metric measurement:',
          table: {
            headers: ['Traditional Unit', 'Equivalent Metric Weight', 'Conversion Factor'],
            rows: [
              ['1 Tola', '11.6638 Grams', '100 Lal'],
              ['1 Lal', '0.1166 Grams', '0.01 Tola'],
              ['1 Aana', '0.7289 Grams', '1/16th Tola'],
              ['10 Grams', '0.8573 Tola', '85.73 Lal'],
            ]
          },
          tip: 'Jewelers charge between 8% to 15% as Jarti depending on whether the ornament is machine-pressed or handcrafted filigree.'
        },
        {
          heading: 'How to Audit Your Jeweler’s Final Invoice',
          body: 'To verify an invoice: Multiply weight in tolas by the prevailing FENEGOSIDA live rate. Add the agreed Jarti percentage (typically 8% to 12%), add artisan making labor, and add 13% VAT. Our live Gold Calculator automates this breakdown instantly.',
        }
      ],
      conclusion: 'Armed with real-time FENEGOSIDA market rates and an automated estimator, you can evaluate showroom pricing with confidence.'
    }
  },
  {
    slug: 'nepse-share-broker-commission-capital-gains-tax',
    title: 'NEPSE Trading Fees 2083: Broker Commission, SEBON Fee, DP Charges & CGT',
    titleNep: 'नेप्से शेयर कारोबार शुल्क २०८३: ब्रोकर कमिसन, सेबोन शुल्क, डिपी र पुँजीगत लाभकर',
    excerpt: 'Comprehensive breakdown of buying and selling shares on the Nepal Stock Exchange (NEPSE): broker commissions, SEBON regulatory fee, CDS DP charges, and Capital Gains Tax (5% vs 7.5%).',
    excerptNep: 'नेप्सेमा शेयर खरिद-बिक्री गर्दा लाग्ने ब्रोकर कमिसन, सेबोन फी, डिपी शुल्क तथा अल्पकालीन र दीर्घकालीन लगानीकर्ताको पुँजीगत लाभकर हिसाब।',
    category: 'Gold & Wealth',
    publishedDate: '2026-10-02',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate NEPSE Broker Commission & Profit',
      href: '/nepse',
      iconText: 'LineChart',
    },
    keywords: ['nepse share calculator', 'nepse broker commission calculator', 'cgt nepal 5 percent 7.5 percent', 'sebon fee share'],
    content: {
      intro: 'Trading equities on the Nepal Stock Exchange (NEPSE) through online Trade Management System (TMS) broker portals involves statutory transaction charges, clearing levies, and withholding taxes that directly determine your net investment return.',
      keyTakeaways: [
        'Broker commission follows a tiered slab starting from 0.40% down to 0.27% for large trade sizes.',
        'SEBON regulatory fee is fixed at 0.015% of total traded value.',
        'Every executed trade incurs a flat NPR 25 DP fee charged by CDS and Clearing Limited.',
        'Capital Gains Tax (CGT) for individual investors is 7.5% for shares held under 365 days and 5.0% for shares held over 365 days.'
      ],
      sections: [
        {
          heading: 'Regulated Broker Commission Slabs',
          body: 'Broker commission in Nepal is standardized by the Securities Board of Nepal (SEBON):',
          table: {
            headers: ['Transaction Amount (NPR)', 'Commission Rate (%)'],
            rows: [
              ['Up to NPR 50,000', '0.40%'],
              ['NPR 50,001 to NPR 5,00,000', '0.37%'],
              ['NPR 5,00,001 to NPR 20,00,000', '0.34%'],
              ['NPR 20,00,001 to NPR 1,00,00,000', '0.30%'],
              ['Above NPR 1,00,00,000', '0.27%'],
            ]
          },
          tip: 'Holding your growth equities for more than 365 days lowers Capital Gains Tax liability by 2.5% upon sale.'
        }
      ],
      conclusion: 'Knowing your break-even share price ensures profitable market trading. Use our NEPSE Broker and Share Profit Calculator to determine net purchase costs, net sales proceeds, and Weighted Average Cost of Capital (WACC).'
    }
  },
  {
    slug: 'cdsc-ipo-allotment-math-lottery-rules-nepal',
    title: 'CDSC IPO Allotment System in Nepal: Lottery Probability & Rules',
    titleNep: 'नेपालमा प्राथमिक सेयर (IPO) बाँडफाँड प्रणाली र गोलाप्रथा नियम',
    excerpt: 'Detailed guide to CDSC 10-kitta allotment rules, oversized subscription ratios, lottery probability mathematics, and how refund mechanisms operate through C-ASBA.',
    excerptNep: 'धितोपत्र बोर्डको १० कित्ता सेयर बाँडफाँड निर्देशिका, अत्यधिक आवेदन पर्दा गोलाप्रथा कसरी हुन्छ र बैंक सि-आस्वा खाताको नियम।',
    category: 'Gold & Wealth',
    publishedDate: '2026-09-20',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate IPO Allotment Probability & Return',
      href: '/ipo-allotment',
      iconText: 'Coins',
    },
    keywords: ['ipo allotment calculator nepal', 'cdsc ipo lottery probability', '10 kitta ipo rule nepal', 'meroshare ipo result'],
    content: {
      intro: 'Initial Public Offerings (IPOs) in Nepal attract millions of retail applicants through the central C-ASBA and MeroShare portals. Under Securities Board of Nepal (SEBON) guidelines, public shares follow a strict 10-kitta minimum allotment policy, ensuring democratic distribution before larger blocks are assigned.',
      keyTakeaways: [
        'SEBON mandates 10 kitta as the minimum allotment block for individual retail applicants.',
        'When an IPO is oversubscribed, all valid applicants enter a computer-generated random lottery.',
        'Applying for more than 10 kitta in oversubscribed issues locks surplus funds without increasing lottery odds.',
        'Reserved quotas allocate 10% of total IPO shares to Nepali citizens working in foreign employment abroad.'
      ],
      sections: [
        {
          heading: 'Understanding the 10-Kitta Lottery Probability',
          body: 'When total applicant demand exceeds available shares, allotment follows pure proportional chance:',
          table: {
            headers: ['Public Issue Shares', 'Total Valid Applicants', 'Allottees (10 Kitta each)', 'Lottery Success Odds'],
            rows: [
              ['10,00,000 Kitta', '15,00,000 Applicants', '1,00,000 Applicants', '1 in 15 (Approx. 6.67%)'],
              ['20,00,000 Kitta', '14,00,000 Applicants', '2,00,000 Applicants', '1 in 7 (Approx. 14.28%)'],
              ['50,00,000 Kitta', '15,00,000 Applicants', '5,00,000 Applicants', '1 in 3 (Approx. 33.33%)'],
              ['1,50,00,000 Kitta', '15,00,000 Applicants', '15,00,000 Applicants', '100% Guaranteed Allotment'],
            ]
          },
          tip: 'In heavily oversubscribed commercial offerings, applying for more than 10 kitta (NPR 1,000) does not improve your winning chance.'
        },
        {
          heading: 'Foreign Employment Migrant Quota Rules',
          body: 'The Government of Nepal mandates that 10% of every general public IPO be reserved exclusively for verified remittance workers holding active labor permits. Because candidate pools in this category are smaller, lottery success probabilities are significantly higher than the general retail public.',
        }
      ],
      conclusion: 'Understanding subscription mechanics prevents unnecessary capital locks in bank accounts. Check your issue probabilities and expected returns using our IPO Allotment Calculator.'
    }
  }
];
