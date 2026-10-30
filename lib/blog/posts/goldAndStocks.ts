import { BlogPost } from '../types';

export const goldAndStocksPosts: BlogPost[] = [
  {
    slug: 'how-to-calculate-wacc-in-meroshare-nepse',
    title: 'How to Calculate WACC in MeroShare (NEPSE): Bonus, Right & Secondary Share Formula',
    titleNep: 'मेरोसेयर (MeroShare) मा WACC कसरी हिसाब गर्ने? बोनस, हकप्रद र दोस्रो बजार सूत्र',
    excerpt: 'Step-by-step CDSC MeroShare WACC calculation guide for Nepal Stock Exchange (NEPSE) investors. Learn how IPO, bonus shares (Rs. 100 par value), right shares, and secondary broker fees determine your Weighted Average Cost of Capital and CGT.',
    excerptNep: 'नेप्सेमा शेयर बिक्री गरेपछि मेरोसेयरको My Purchase Source र My WACC भर्दा बोनस, हकप्रद र दोस्रो बजारको औसत लागत मूल्य निकाल्ने आधिकारिक सूत्र र पूँजीगत लाभकर नियम।',
    category: 'Gold & Wealth',
    publishedDate: '2026-10-30',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate NEPSE WACC & Share Average Price',
      href: '/nepse-wacc',
      iconText: 'TrendingUp',
    },
    keywords: [
      'nepse wacc calculator',
      'how to calculate wacc in meroshare',
      'wacc calculation after bonus share nepse',
      'my purchase source meroshare guide',
      'share average calculator nepal',
    ],
    content: {
      intro: 'Under CDS and Clearing Limited (CDSC) and Securities Board of Nepal (SEBON) regulations, every investor selling equities on the Nepal Stock Exchange (NEPSE) must declare their Weighted Average Cost of Capital (WACC) in MeroShare before generating an Electronic Debit Instruction Slip (EDIS). The exact CDSC formula is: WACC per Share = Total Acquisition Cost of All Share Lots ÷ Total Combined Shares (Kitta), where secondary market buys include broker commission, 0.015% SEBON fee, and NPR 25 DP charge, while IPO, bonus, and right shares are valued at their NPR 100 par value.',
      keyTakeaways: [
        'CDSC Par Value Rule: Bonus shares and right shares always carry a cost basis of NPR 100 per kitta (par value) in MeroShare WACC calculations.',
        'Secondary Market Cost Basis: TMS purchases include base trade value + tiered broker commission (0.27%–0.40%) + 0.015% SEBON fee + NPR 25 DP fee.',
        'Capital Gains Tax (CGT) Impact: An accurate WACC directly determines your taxable capital gain—taxed at 5% for holdings over 365 days and 7.5% for holdings of 365 days or less.',
        'Closeout Penalty Warning: Failing to complete My Purchase Source, My WACC, and EDIS transfer within T+1 settlement timelines triggers a mandatory 20% closeout fine.'
      ],
      sections: [
        {
          heading: '1. Official CDSC Cost Basis Rules by Share Source',
          body: 'When MeroShare aggregates multiple historical acquisitions of the same scrip, each lot type follows a specific statutory cost rule under the Income Tax Act 2058 and CDSC guidelines:',
          table: {
            headers: ['Share Acquisition Source', 'Cost Basis Per Share in MeroShare', 'Additional Fees Included in WACC'],
            rows: [
              ['IPO / FPO Allotment', 'NPR 100 (or IPO Premium Price)', 'NPR 0 (No broker or SEBON fee)'],
              ['Bonus Share Dividend', 'NPR 100 Par Value', 'NPR 0 (5% cash dividend tax is separate)'],
              ['Right Share Allotment', 'NPR 100 Par Value', 'NPR 0'],
              ['Secondary Market Buy (TMS)', 'Actual Market Purchase Price', 'Broker Commission (0.27%–0.40%) + 0.015% SEBON + Rs. 25 DP'],
            ]
          },
          tip: 'Even though your market share price adjusts downward on book-closure day for bonus shares, MeroShare lowers your average cost per share by adding the bonus kitta at NPR 100 par value.'
        },
        {
          heading: '2. Realistic Worked Case Study: IPO + Secondary Buy + 20% Bonus Share',
          body: 'Suppose an investor holds Nabil Bank (NABIL) shares acquired across three separate events: (1) 10 kitta allotted in an IPO at NPR 100, (2) 50 kitta bought on the secondary market at NPR 480 per share, and (3) 12 bonus shares (20% bonus) credited later:',
          table: {
            headers: ['Lot Description', 'Quantity (Kitta)', 'Unit Cost / Rate', 'Broker + SEBON + DP Fees', 'Total Lot Cost (NPR)'],
            rows: [
              ['Lot 1: Primary Allotment', '10 Kitta', 'NPR 100.00', 'NPR 0.00', 'NPR 1,000.00'],
              ['Lot 2: Secondary Market Buy', '50 Kitta', 'NPR 480.00', 'NPR 124.20 (0.40% comm + SEBON + Rs. 25 DP)', 'NPR 24,124.20'],
              ['Lot 3: 20% Bonus Shares', '12 Kitta', 'NPR 100.00 (Par Value)', 'NPR 0.00', 'NPR 1,200.00'],
              ['Combined Portfolio Total', '72 Kitta', 'WACC = 26,324.20 ÷ 72', '—', 'NPR 26,324.20 (WACC = NPR 365.61/share)'],
            ]
          },
          tip: 'Verify your multi-lot WACC and net profit after 5% or 7.5% CGT in seconds using our interactive NEPSE WACC Calculator at /nepse-wacc.'
        }
      ],
      conclusion: 'Calculating your exact WACC before placing sell orders on TMS ensures you know your true break-even price and prevents overpaying Capital Gains Tax. Use our free NEPSE WACC Calculator to simulate bonus, right, and secondary market lots instantly.'
    }
  },
  {
    slug: 'cagr-calculation-nepse-stocks-land-gold-nepal',
    title: 'CAGR in Nepal: How to Calculate Compound Annual Growth Rate for NEPSE, Gold & Land',
    titleNep: 'नेपालमा CAGR (चक्रवृद्धि वार्षिक वृद्धिदर) कसरी निकाल्ने? सेयर, सुन र जग्गाको प्रतिफल तुलना',
    excerpt: 'Master the Compound Annual Growth Rate (CAGR) formula and Rule of 72 to compare multi-year investment returns across NEPSE equities, mutual funds, FENEGOSIDA gold, and real estate in Nepal.',
    excerptNep: 'नेप्से सेयर बजार, म्युचुअल फण्ड, सुन र घरजग्गामा गरिएको लगानी कुन गतिमा बढिरहेको छ? CAGR सूत्र र रुल अफ ७२ (Rule of 72) बाट वास्तविक प्रतिफल जाँच्ने तरिका।',
    category: 'Gold & Wealth',
    publishedDate: '2026-10-30',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate CAGR & Money Doubling Time',
      href: '/cagr',
      iconText: 'LineChart',
    },
    keywords: [
      'cagr calculator nepal',
      'compound annual growth rate formula',
      'gold vs land vs nepse return nepal',
      'rule of 72 calculator nepal',
    ],
    content: {
      intro: 'Compound Annual Growth Rate (CAGR) measures the true annualized compounding return of an investment between its starting value and ending value over multiple years. The exact mathematical formula is: CAGR = [(Ending Value ÷ Beginning Value)^(1 ÷ Number of Years)] - 1. Unlike simple average return percentages, CAGR accounts for compounding volatility and lets Nepali investors compare commercial bank Fixed Deposits (FD), FENEGOSIDA gold prices, Ropani/Bigha land appreciation, and NEPSE stock portfolios on an equal footing.',
      keyTakeaways: [
        'Exact Formula: CAGR = (Ending Value / Beginning Value)^(1 / n) - 1, expressed as an annual percentage.',
        'Rule of 72 Shortcut: Divide 72 by your annual CAGR % to find the exact number of years required to double your money (e.g., at 12% CAGR, money doubles in 6 years).',
        'Inflation Benchmark: Any asset in Nepal must generate a post-tax CAGR above the Nepal Rastra Bank (NRB) average CPI inflation rate (~6.5%) to build real purchasing power.',
        '10-Year Nepal Asset Benchmarks: Gold in NPR has compounded at ~13.5%–15% CAGR, beating average commercial bank Fixed Deposits after 5% TDS.'
      ],
      sections: [
        {
          heading: '1. Comparing 10-Year Historical CAGR of Major Asset Classes in Nepal',
          body: 'Evaluating where to allocate capital in Nepal requires comparing annualized compounding rates against risk and liquidity:',
          table: {
            headers: ['Asset Class in Nepal', 'Typical Historical CAGR (%)', 'Years to Double (Rule of 72)', 'Taxation on Gains'],
            rows: [
              ['Commercial Bank Fixed Deposit (FD)', '7.0% – 9.5% p.a.', '7.6 – 10.2 Years', '6% Final Withholding TDS'],
              ['Open-Ended Mutual Fund SIP (SEBON)', '11.5% – 14.5% p.a.', '5.0 – 6.2 Years', '5% TDS on Dividends / 5% Long-Term CGT'],
              ['24K Fine Gold (FENEGOSIDA NPR Rate)', '13.5% – 15.2% p.a.', '4.7 – 5.3 Years', '2% Luxury Tax (>10 Lakh) / CGT if applicable'],
              ['Urban Residential Land (Valley / Highway)', '14.0% – 18.0% p.a.', '4.0 – 5.1 Years', '5% (>5 yrs) or 7.5% (<5 yrs) Malpot CGT'],
            ]
          },
          tip: 'Compare any two investments side-by-side using our interactive CAGR & Wealth Growth Calculator at /cagr.'
        },
        {
          heading: '2. Worked Example: Calculating 5-Year Land or Stock Portfolio CAGR',
          body: 'If you invested NPR 1,00,000 in a NEPSE equity portfolio or mutual fund 5 years ago and its current market value is NPR 2,65,000: Total Absolute Return is 165%, and CAGR = (265,000 / 100,000)^(1/5) - 1 = (2.65)^(0.20) - 1 = 21.52% compounded annually. By the Rule of 72 (72 ÷ 21.52), a portfolio growing at this pace doubles every 3.35 years.',
        }
      ],
      conclusion: 'Looking solely at total profit percentages without factoring in holding duration misleads investors. Calculate your portfolio’s true annualized CAGR and doubling horizon using our free CAGR Calculator.'
    }
  },
  {
    slug: 'how-much-gold-can-you-bring-to-nepal-customs-rules',
    title: 'How Much Gold Can You Bring to Nepal? (2083/84 Airport Customs Rules & Duty Per Gram)',
    titleNep: 'विदेशबाट नेपाल आउँदा कति सुन ल्याउन पाइन्छ? (भन्सार नियम, छुट सीमा र महसुल दर २०८३/८४)',
    excerpt: 'Complete legal guide to bringing gold and silver into Nepal from Dubai, Australia, Qatar, USA & Malaysia. Check the 25g male / 50g female duty-free ornament limits, excess customs duty slabs per gram, and raw gold confiscation rules.',
    excerptNep: 'दुबई, कतार, अष्ट्रेलिया र अमेरिकाबाट नेपाल फर्किंदा भन्सार नतिरी कति ग्राम सुनको गहना ल्याउन पाइन्छ? काँचो सुन र थप गहनामा लाग्ने भन्सार महसुलको पूर्ण जानकारी।',
    category: 'Gold & Wealth',
    publishedDate: '2026-10-30',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Airport Gold Customs Duty & Allowance',
      href: '/how-much-gold-can-you-bring-to-nepal',
      iconText: 'Sparkles',
    },
    keywords: [
      'how much gold can you bring to nepal',
      'how much gold can i bring to nepal from dubai',
      'how much gold can you bring to nepal from australia',
      'nepal airport gold customs duty per gram',
      '25g 50g gold rule nepal',
      'jhitigunta gold rules nepal 2083',
      'raw gold customs rule nepal',
    ],
    content: {
      intro: 'Under Nepal’s Department of Customs Personal Baggage Order (झिटिगुन्टा आदेश) and Civil Aviation Authority of Nepal (CAAN) AIP regulations for FY 2083/84, a male passenger can bring up to 25 grams (~2.14 Tola) of finished personal gold ornaments completely duty-free, while a female passenger can bring up to 50 grams (~4.29 Tola) of finished personal gold ornaments duty-free. Passengers carrying additional finished jewelry up to +200 grams beyond their duty-free allowance must declare it at the Tribhuvan International Airport (TIA) Red Channel and pay NPR 1,050 per gram on the first 100 grams of excess and NPR 1,250 per gram on the next 100 grams of excess.',
      keyTakeaways: [
        'Men Duty-Free Allowance: Up to 25 grams (2.14 Tola) of multi-piece finished gold ornaments pays NPR 0 customs duty.',
        'Women Duty-Free Allowance: Up to 50 grams (4.29 Tola) of multi-piece finished gold ornaments pays NPR 0 customs duty.',
        'Dutiable Excess Slabs: Up to 200g of additional gold ornaments can be cleared via the Red Channel at NPR 1,050/g (first 100g) and NPR 1,250/g (next 100g).',
        'Raw Gold & Crude Kada Ban: Raw gold bars, biscuits, 24K coins, and unclasped single-molded kadas do NOT qualify for the 25g/50g ornament exemption and face seizure if undeclared.',
        'Silver Allowance: Up to 500 grams of personal silver ornaments is 100% duty-free for all passengers.'
      ],
      sections: [
        {
          heading: '1. Official Gold & Silver Customs Tariff Schedule (FY 2083/84)',
          body: 'The Department of Customs (भन्सार विभाग) under the Ministry of Finance enforces strict weight and category thresholds under the Passenger Baggage Notice. The exact calculation formula for excess ornament duty is: Total Payable Duty = (Slab 1 Excess Grams × NPR 1,050) + (Slab 2 Excess Grams × NPR 1,250).',
          table: {
            headers: ['Passenger Type', 'Gold / Silver Category', 'Duty-Free Limit', 'Tier 1 Excess (First 100g)', 'Tier 2 Excess (Next 100g)', 'Above +200g Excess'],
            rows: [
              ['Male Passenger (पुरुष)', 'Finished Gold Ornaments', '25g (2.14 Tola)', 'NPR 1,050 / gram', 'NPR 1,250 / gram', 'Confiscated (जफत)'],
              ['Female Passenger (महिला)', 'Finished Gold Ornaments', '50g (4.29 Tola)', 'NPR 1,050 / gram', 'NPR 1,250 / gram', 'Confiscated (जफत)'],
              ['All Passengers', 'Raw Gold / Biscuits / Coins', '0g (No Free Quota)', '20% Customs Tariff (Red Channel)', 'Prohibited', 'Confiscated (जफत)'],
              ['All Passengers', 'Silver Ornaments (चाँदी)', '500g (42.87 Tola)', 'NPR 15 / gram (up to 500g)', '—', 'Confiscated (जफत)'],
            ]
          },
          tip: '1 Tola equals exactly 11.6638 grams. Therefore, 5 Tola of gold equals 58.32 grams—meaning a female passenger carrying 5 Tola of jewelry is 8.32 grams over the 50g duty-free limit and must pay NPR 8,736 (8.32g × NPR 1,050) at the Red Channel.'
        },
        {
          heading: '2. Worked Case Studies: Returning from Dubai (UAE) and Australia',
          body: 'To understand how Tribhuvan International Airport Customs calculates your payable duty at the arrival counter, review these two real-world passenger scenarios:',
          table: {
            headers: ['Passenger Scenario', 'Total Gold Carried', 'Duty-Free Deduction', 'Taxable Excess Weight', 'Exact Customs Duty Payable'],
            rows: [
              ['Female returning from Sydney, Australia with wedding necklace & earrings', '50 Grams (4.29 Tola)', '50 Grams', '0 Grams', 'NPR 0 (Green Channel)'],
              ['Male returning from Dubai, UAE with 5 Tola (58.32g) gold chain & bracelet', '58.32 Grams (5 Tola)', '25 Grams', '33.32 Grams', 'NPR 34,986 (33.32g × 1,050)'],
              ['Female returning from Doha, Qatar with 180 Grams gold jewelry set', '180 Grams (15.43 Tola)', '50 Grams', '130 Grams (100g Slab 1 + 30g Slab 2)', 'NPR 1,42,500 (1,05,000 + 37,500)'],
              ['Male carrying 300 Grams of gold ornaments', '300 Grams (25.72 Tola)', '25 Grams', '200g Max Dutiable + 75g Illegal', '75g Confiscated + Fine'],
            ]
          },
          tip: 'Use our interactive Nepal Airport Gold Customs Calculator at /how-much-gold-can-you-bring-to-nepal to compute your exact gram-by-gram duty before boarding your flight.'
        },
        {
          heading: '3. Why Single-Molded "Kadas" and Crude Rings Are Confiscated at TIA',
          body: 'A major enforcement rule implemented by the Department of Customs targets raw gold disguised as jewelry. Under the Baggage Order, the 25g/50g duty-free privilege applies strictly to genuine wearable ornaments crafted with clasps, joints, or stones (such as chains, necklaces, earrings, and traditional bangles). Heavy, unpolished single-molded gold rings, thick solid kadas without joints, or gold wires bent into loops are legally classified as raw gold bullion. Furthermore, never agree to carry gold jewelry or electronics handed to you by strangers or agents at Dubai, Doha, Kuala Lumpur, or Sharjah airports—carrying third-party gold is a criminal customs offense under the Nepal Customs Act 2064.',
        },
        {
          heading: '4. Country-Specific Checklist: Australia, USA, UK, Gulf & India',
          body: 'Regardless of whether you fly from Australia, the United States, the United Kingdom, the UAE, Qatar, Saudi Arabia, Malaysia, or India, Nepal applies the same passenger baggage tariff. Always carry your original VAT/GST purchase invoice with your name, weight in grams, and karat purity clearly stated. If your gold exceeds 25g (men) or 50g (women), walk directly to the Red Channel upon arrival, submit the customs declaration form, and obtain the official government tax receipt (भन्सार प्रज्ञापनपत्र रसिद) so your gold remains 100% legal for future resale in Nepal.',
        }
      ],
      conclusion: 'Knowing the exact 25g male and 50g female duty-free ornament limits and declaring any excess weight at the Red Channel protects your hard-earned savings from airport seizure. Calculate your exact duty and convert Tola to Grams instantly using our Nepal Gold Customs Calculator.'
    }
  },
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
