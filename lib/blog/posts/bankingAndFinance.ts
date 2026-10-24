import { BlogPost } from '../types';

export const bankingAndFinancePosts: BlogPost[] = [
  {
    slug: 'bank-loan-emi-dsti-eligibility-nepal',
    title: 'Bank Loan EMI, NRB 50% DSTI Limits, and Interest Calculations in Nepal',
    titleNep: 'बैंक लोन ईएमआई (EMI), राष्ट्र बैंकको ५०% DSTI कर्जा सीमा र ब्याज हिसाब',
    excerpt: 'Step-by-step guide to calculating home, auto, and business loan EMIs, understanding base rate + premium spreads, and passing Nepal Rastra Bank Debt-Service-to-Income (DSTI) scrutiny.',
    excerptNep: 'घर, गाडी तथा व्यवसायिक कर्जाको ईएमआई हिसाब, बैंकको बेस रेट र प्रिमियम, तथा नेपाल राष्ट्र बैंकको ५०% DSTI नियम बुझ्नुहोस्।',
    category: 'Banking & Loans',
    publishedDate: '2026-10-10',
    readTime: '7 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Bank Loan EMI & Schedule',
      href: '/emi',
      iconText: 'LineChart',
    },
    keywords: ['emi calculator nepal', 'loan eligibility calculator nepal', 'nrb dsti 50 percent', 'bank base rate nepal'],
    content: {
      intro: 'Purchasing a family home, acquiring an electric vehicle, or expanding a commercial enterprise in Nepal requires a clear understanding of Equated Monthly Installment (EMI) amortizations. Nepal Rastra Bank directives regulate loan borrowing caps through strict income-to-installment limits.',
      keyTakeaways: [
        'Nepal Rastra Bank enforces a strict 50% Debt Service to Income (DSTI) cap for personal home loans.',
        'Interest rates in Nepal are floating, calculated as Base Rate + Premium Spread.',
        'In reducing balance amortizations, early installments consist predominantly of interest, while later installments repay principal.',
        'Prepayment and partial settlements reduce total lifetime interest across a 15-to-20-year tenure.'
      ],
      sections: [
        {
          heading: 'What is the NRB 50% DSTI Rule?',
          body: 'Nepal Rastra Bank Unified Directives dictate that a borrowers total monthly loan servicing obligations across all banking institutions cannot exceed 50% of verifiable net monthly salary or audited business cash flow.',
          tip: 'Rental income without formal municipality tax stamps cannot be counted toward loan eligibility criteria.'
        },
        {
          heading: 'Base Rate vs. Fixed Interest Mortgages',
          body: 'Most retail loans in Nepal adjust quarterly based on commercial bank base rate movements. When institutional liquidity increases, base rates decline, lowering your total monthly interest expense.',
        }
      ],
      conclusion: 'Before scheduling a formal bank appraisal, simulate your amortization schedule and lifetime interest on Nepali Calc.'
    }
  },
  {
    slug: 'nrb-debt-service-to-income-dsti-loan-eligibility-nepal',
    title: 'NRB 50% DSTI Ratio & Bank Loan Eligibility Criteria in Nepal',
    titleNep: 'नेपाल राष्ट्र बैंकको ५०% DSTI सीमा र बैंक लोन योग्यता निर्देशिका',
    excerpt: 'Understand how commercial banks evaluate maximum borrowing capacity, gross vs. net salary scrutiny, existing loan obligations, and loan-to-value (LTV) collateral limits.',
    excerptNep: 'तपाईंको तलबले कतिसम्म बैंक ऋण धान्छ? राष्ट्र बैंकको ५०% DSTI अनुपात, धितो मूल्याङ्कन (LTV) र कर्जा योग्यता हिसाबको पूर्ण जानकारी।',
    category: 'Banking & Loans',
    publishedDate: '2026-09-27',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Check Your Loan Eligibility & DSTI',
      href: '/loan-eligibility',
      iconText: 'CheckCircle2',
    },
    keywords: ['loan eligibility calculator nepal', 'dsti ratio nepal rastra bank', 'home loan capacity calculator', 'ltv ratio nepal banks'],
    content: {
      intro: 'When evaluating loan applications for residential mortgages or commercial expansions, credit committees analyze your Debt-Service-to-Income (DSTI) ratio. Nepal Rastra Bank Unified Directives restrict total monthly loan debt obligations from exceeding 50% of authenticated net monthly take-home income.',
      keyTakeaways: [
        'DSTI ratio measures your total monthly loan installments against verifiable monthly net earnings.',
        'Maximum permissible DSTI is 50% for personal retail and home loans; higher thresholds apply for commercial entities.',
        'Loan-to-Value (LTV) caps limit residential property loans to 50% inside Kathmandu Valley and 60% outside the valley.',
        'Credit Information Bureau (CIB) reports disclose all existing active loans across Class A, B, and C financial institutions.'
      ],
      sections: [
        {
          heading: 'How Banks Compute Maximum Loan Eligibility',
          body: 'The lending equation balances disposable income against prevailing interest rates and loan tenure:',
          table: {
            headers: ['Verified Net Monthly Salary', 'Max Allowable Monthly EMI (50%)', 'Max 20-Year Loan Capacity (at 10%)'],
            rows: [
              ['NPR 50,000', 'NPR 25,000', 'Approx. NPR 25.8 Lakhs'],
              ['NPR 80,000', 'NPR 40,000', 'Approx. NPR 41.4 Lakhs'],
              ['NPR 1,20,000', 'NPR 60,000', 'Approx. NPR 62.1 Lakhs'],
              ['NPR 2,00,000', 'NPR 1,00,000', 'Approx. NPR 1.03 Crores'],
            ]
          },
          tip: 'Adding an earning spouse as a co-borrower combines verifiable household incomes, doubling total borrowing limits.'
        },
        {
          heading: 'Loan-to-Value (LTV) Collateral Constraints',
          body: 'Even if your monthly income justifies a substantial loan, the collateral valuation imposes a second ceiling. For residential purchases in Kathmandu, banks lend up to 50% of the fair market valuation determined by an approved engineering surveyor. For first-time residential home buyers, the LTV limit expands to 70% up to NPR 2 Crores.',
        }
      ],
      conclusion: 'Testing your income against official debt service metrics prevents rejected loan applications. Calculate your borrowing ceiling using our Loan Eligibility Calculator.'
    }
  },
  {
    slug: 'nepali-byaj-meter-byaj-fixed-deposit-interest-calculation',
    title: 'Nepali Village Byaj vs. Bank Fixed Deposit (FD): Simple, Compound & 5% TDS',
    titleNep: 'नेपाली स्थानीय ब्याज (सयकडा २/३) र मुद्दती निक्षेप हिसाब निर्देशिका',
    excerpt: 'Understand traditional village interest (सयकडा ब्याज), commercial bank Fixed Deposit (FD) compounding, simple vs compound formulas, and mandatory 5% government deposit tax.',
    excerptNep: 'गाउँघरको सयकडा ब्याज (वार्षिक २४% देखि ३६%), बैंकको मुद्दती खाताको त्रैमासिक चक्रबृद्धि ब्याज र ५% आयकर कट्टीको पूर्ण तुलना।',
    category: 'Banking & Loans',
    publishedDate: '2026-09-24',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Nepali Byaj & Fixed Deposit Returns',
      href: '/interest',
      iconText: 'Coins',
    },
    keywords: ['nepali byaj calculator', 'sayakada 2 byaj calculation', 'fixed deposit calculator nepal', 'bank interest 5 percent tds'],
    content: {
      intro: 'Financial transactions in Nepal operate across two distinct credit spheres: regulated commercial banking with quarterly compounding deposits, and traditional informal village lending calculated on monthly percentage bases (such as Sayakada 2 or 3 rupees).',
      keyTakeaways: [
        'Sayakada 2 equals 2% interest per month, totaling an annualized nominal rate of 24%.',
        'Sayakada 3 equals 3% interest per month, amounting to a steep annualized rate of 36%.',
        'Commercial bank Fixed Deposits compound quarterly and deduct a mandatory 5% withholding tax (TDS) on earned interest.',
        'Informal lending exceeding the statutory 16% ceiling violates the National Civil Code 2074.'
      ],
      sections: [
        {
          heading: 'Traditional Sayakada Rate Conversion to Annual Percentages',
          body: 'Informal promissory notes (Tamsuk) state interest per hundred rupees per month:',
          table: {
            headers: ['Traditional Rate', 'Monthly Interest Rate', 'Annualized Nominal Rate', 'Annual Interest on NPR 1,00,000'],
            rows: [
              ['Sayakada 1 (सयकडा १)', '1% per month', '12% per year', 'NPR 12,000'],
              ['Sayakada 1.5 (सयकडा १.५)', '1.5% per month', '18% per year', 'NPR 18,000'],
              ['Sayakada 2 (सयकडा २)', '2% per month', '24% per year', 'NPR 24,000'],
              ['Sayakada 3 (सयकडा ३)', '3% per month', '36% per year', 'NPR 36,000'],
            ]
          },
          tip: 'Under the Civil Code, courts void interest claims that exceed 10% per annum on personal hand loans.'
        },
        {
          heading: 'Bank Fixed Deposit Compounding and 5% TDS',
          body: 'Commercial banks in Nepal compute interest on daily product bases and compound balances quarterly. When crediting interest, banks deduct 5% withholding tax for individuals. If you earn NPR 100,000 in annual FD interest, the bank remits NPR 5,000 directly to the government revenue account and credits NPR 95,000 to your savings ledger.',
        }
      ],
      conclusion: 'Accurate interest calculations protect lenders and borrowers from mathematical discrepancies. Compute both traditional and banking interest using our Nepali Byaj Calculator.'
    }
  },
  {
    slug: 'fixed-deposit-vs-debenture-returns-tax-comparison-nepal',
    title: 'Fixed Deposit (FD) vs. Bank Debenture in Nepal: Returns, Risk & 5% Tax',
    titleNep: 'मुद्दती निक्षेप (FD) र ऋणपत्र (Debenture) बीचको फरक र नाफा तुलना',
    excerpt: 'Detailed financial comparison between commercial bank fixed deposits and corporate debentures in Nepal: coupon rates, maturity tenures, liquidity on NEPSE, and withholding taxes.',
    excerptNep: 'क वर्गका वाणिज्य बैंकको मुद्दती खाता र ८-१० वर्षे डिबेन्चरको ब्याज आम्दानी, सेयर बजारमा किनबेच र ५% पुँजीगत करको पूर्ण विश्लेषण।',
    category: 'Banking & Loans',
    publishedDate: '2026-09-21',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Compare Fixed Deposit vs Debenture Yields',
      href: '/fd-vs-debenture',
      iconText: 'Scale',
    },
    keywords: ['fd vs debenture nepal', 'bank debenture interest rate nepal', 'fixed deposit returns comparison', 'debenture trading nepse'],
    content: {
      intro: 'Conservative investors seeking steady passive income in Nepal face a recurring decision: locking capital into short-term Fixed Deposits (FD) or subscribing to long-term corporate bank debentures. Both asset classes provide predictable yield, but differ in liquidity, tenure, and capital locks.',
      keyTakeaways: [
        'Fixed Deposits feature shorter tenures (3 months to 3 years) with quarterly interest adjustments.',
        'Bank Debentures lock interest rates for 7 to 10 years, shielding investors from declining interest rate cycles.',
        'Debentures are listed on the Nepal Stock Exchange (NEPSE) and trade through broker TMS portals.',
        'Both fixed deposits and debenture yields incur 5% individual withholding tax deducted at source.'
      ],
      sections: [
        {
          heading: 'Core Differences: Fixed Deposit vs. Corporate Debenture',
          body: 'Comparing essential parameters highlights their structural mechanics:',
          table: {
            headers: ['Feature', 'Bank Fixed Deposit (FD)', 'Bank Debenture (ऋणपत्र)'],
            rows: [
              ['Typical Tenure', '3 Months to 3 Years', '7 to 10 Years'],
              ['Interest Rate Structure', 'Fixed for deposit term', 'Fixed coupon rate for entire decade'],
              ['Premature Exit', 'Bank penalty fee (typically 1%)', 'Sell via NEPSE broker without bank penalty'],
              ['Collateral Loan', 'Borrow up to 90% from issuing bank', 'Pledge up to 70% with BFIs'],
              ['Tax on Earnings', '5% TDS for individual depositors', '5% TDS on semi-annual coupon payments'],
            ]
          },
          tip: 'When interest rates peak in the banking sector, locking money into a 10% debenture preserves superior yields when commercial rates decline years later.'
        },
        {
          heading: 'Liquidity Mechanisms Compared',
          body: 'Exiting a Fixed Deposit before maturity requires paying premature cancellation penalties that reduce your historical return. In contrast, debenture holders can place sell orders on the secondary NEPSE trading floor to liquidate holdings at market price without canceling the underlying bond contract.',
        }
      ],
      conclusion: 'Matching your investment horizon to the correct asset structure maximizes cash flow safety. Compare maturity proceeds using our Fixed Deposit vs Debenture Calculator.'
    }
  },
  {
    slug: 'sip-mutual-fund-compounding-investment-guide-nepal',
    title: 'SIP Mutual Fund Compounding Guide in Nepal: Monthly Wealth Growth',
    titleNep: 'नेपालमा व्यवस्थित लगानी योजना (SIP): मासिक लगानी र चक्रबृद्धि नाफा',
    excerpt: 'Comprehensive guide to Systematic Investment Plans (SIP) in open-ended mutual funds in Nepal: rupee-cost averaging, compounding formulas, historical returns, and 5% CGT.',
    excerptNep: 'मासिक रु १,००० बाट सुरु हुने खुलामुखी म्युचुअल फण्ड SIP लगानी, चक्रबृद्धि नाफाको शक्ति र ५% पुँजीगत लाभकरको पूर्ण मार्गनिर्देशन।',
    category: 'Banking & Loans',
    publishedDate: '2026-09-18',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate SIP Compounding & Future Wealth',
      href: '/sip',
      iconText: 'TrendingUp',
    },
    keywords: ['sip calculator nepal', 'open ended mutual fund nepal', 'systematic investment plan returns', 'best sip in nepal'],
    content: {
      intro: 'A Systematic Investment Plan (SIP) allows retail investors in Nepal to allocate fixed sums monthly into open-ended mutual funds managed by licensed merchant banks. Rather than timing volatile NEPSE market swings, SIP harnesses rupee-cost averaging and compounding growth.',
      keyTakeaways: [
        'Investors can start an open-ended SIP with small commitments starting at NPR 1,000 per month.',
        'Rupee-cost averaging purchases more fund units when market prices drop and fewer units when prices surge.',
        'Compounding earnings over 10 to 15 years produce capital accumulation that outpaces traditional bank inflation.',
        'Redemption profits attract 5% Capital Gains Tax for individuals holding units longer than 365 days.'
      ],
      sections: [
        {
          heading: 'The Power of Compounding: Monthly SIP Projections',
          body: 'Consistent monthly contributions accumulate significant capital balances over long horizons:',
          table: {
            headers: ['Monthly SIP (NPR)', 'Tenure (Years)', 'Total Invested Capital', 'Estimated Value at 12% CAGR'],
            rows: [
              ['NPR 5,000', '5 Years', 'NPR 3,00,000', 'Approx. NPR 4.12 Lakhs'],
              ['NPR 5,000', '10 Years', 'NPR 6,00,000', 'Approx. NPR 11.61 Lakhs'],
              ['NPR 5,000', '15 Years', 'NPR 9,00,000', 'Approx. NPR 25.22 Lakhs'],
              ['NPR 10,000', '15 Years', 'NPR 18,00,000', 'Approx. NPR 50.45 Lakhs'],
              ['NPR 15,000', '20 Years', 'NPR 36,00,000', 'Approx. NPR 1.48 Crores'],
            ]
          },
          tip: 'Enabling dividend reinvestment (DREP) channels annual cash dividends into additional fund units automatically.'
        },
        {
          heading: 'Selecting Regulated Open-Ended Funds in Nepal',
          body: 'SEBON regulates open-ended mutual funds operated by merchant banks such as NIBL Ace Capital, Siddhartha Capital, NMB Capital, and NIC Asia Capital. Investors monitor Net Asset Value (NAV) updates published weekly to verify portfolio health.',
        }
      ],
      conclusion: 'Disciplined monthly investments build long-term financial security. Calculate your target retirement timeline using our SIP Compounding Calculator.'
    }
  },
  {
    slug: 'nepal-inflation-purchasing-power-parity-guide',
    title: 'Nepal Inflation & Purchasing Power: How Price Rises Erode Cash Savings',
    titleNep: 'नेपालमा मुद्रास्फीति (महँगी) र पैसाको क्रयशक्ति: बचतमा पर्ने असर',
    excerpt: 'Detailed analysis of Consumer Price Index (CPI) inflation in Nepal, real vs. nominal rates of return, purchasing power decay, and defensive asset strategies.',
    excerptNep: 'नेपाल राष्ट्र बैंकको उपभोक्ता मुद्रास्फीति दर, आजको रु १ लाखको भविष्यको वास्तविक मूल्य र महँगीलाई जित्ने सुरक्षित लगानी उपाय।',
    category: 'Banking & Loans',
    publishedDate: '2026-09-15',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Purchasing Power & Inflation Loss',
      href: '/inflation',
      iconText: 'Coins',
    },
    keywords: ['inflation calculator nepal', 'purchasing power of rupee nepal', 'nepal consumer price index cpi', 'real interest rate nepal'],
    content: {
      intro: 'Inflation measures the ongoing rise in commodity and living costs, eroding the purchasing power of cash savings over time. In Nepal, where Consumer Price Index (CPI) inflation averages 5% to 8% annually, maintaining cash in low-yielding savings accounts guarantees negative real returns.',
      keyTakeaways: [
        'At 6% annual inflation, money loses half its purchasing power in approximately 12 years (Rule of 72).',
        'Nominal bank interest minus prevailing inflation equals your actual real economic return.',
        'Food and beverage inflation frequently outpaces non-food inflation in urban Kathmandu and Pokhara markets.',
        'Assets that appreciate alongside economic growth include productive land, gold reserves, and equity shares.'
      ],
      sections: [
        {
          heading: 'Purchasing Power Decay of NPR 1,00,000 Over Time',
          body: 'Assuming an average annual inflation rate of 6%, cash balances diminish in effective purchasing value:',
          table: {
            headers: ['Time Elapsed', 'Nominal Cash Balance', 'Effective Purchasing Power at 6% Inflation'],
            rows: [
              ['Today', 'NPR 1,00,000', 'NPR 1,00,000 (100%)'],
              ['5 Years Later', 'NPR 1,00,000', 'Approx. NPR 74,725 (74.7%)'],
              ['10 Years Later', 'NPR 1,00,000', 'Approx. NPR 55,839 (55.8%)'],
              ['15 Years Later', 'NPR 1,00,000', 'Approx. NPR 41,726 (41.7%)'],
              ['20 Years Later', 'NPR 1,00,000', 'Approx. NPR 31,180 (31.2%)'],
            ]
          },
          tip: 'When bank savings interest is 3% while consumer inflation is 6%, savings lose 3% purchasing power each year.'
        },
        {
          heading: 'Beating Inflation with Real Assets',
          body: 'To safeguard purchasing power, financial planners recommend assets with returns that exceed CPI inflation. Real estate in developing corridors, dividend-paying equity portfolios, and precious metals serve as traditional stores of value in the Nepali economy.',
        }
      ],
      conclusion: 'Measuring inflation preserves the true value of your family savings. Simulate future price adjustments and purchasing power using our Nepal Inflation Calculator.'
    }
  },
  {
    slug: 'nepal-civil-servant-teacher-pension-formula-calculation',
    title: 'Nepal Civil Servant & Teacher Pension Formula: Gratuity & Monthly Pension',
    titleNep: 'निजामती कर्मचारी तथा शिक्षक पेन्सन निर्देशिका: मासिक पेन्सन र उपदान हिसाब',
    excerpt: 'Complete guide to Civil Service Act 2049 pension formulas, 20-year service eligibility, rank increments, family pension transfers, and contributory pension rules.',
    excerptNep: 'निजामती, शिक्षक तथा सेना-प्रहरीको २० वर्षे सेवा अवधि, मासिक पेन्सन निकाल्ने सरकारी सूत्र, ग्रेड रकम र योगदानमा आधारित पेन्सन प्रणाली।',
    category: 'Banking & Loans',
    publishedDate: '2026-09-12',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Monthly Pension & Gratuity',
      href: '/pension',
      iconText: 'Award',
    },
    keywords: ['pension calculator nepal', 'civil service pension formula nepal', 'teacher pension calculation nepal', 'contributory pension act nepal'],
    content: {
      intro: 'Government service in Nepal offers long-term financial security through defined pension provisions under the Civil Service Act 2049 and Education Act. Civil servants, government school teachers, Nepal Police, and Army personnel who complete 20 years of qualifying service qualify for lifelong monthly pension entitlements.',
      keyTakeaways: [
        'A minimum of 20 years of continuous permanent service qualifies employees for lifetime monthly pension.',
        'Monthly pension formula: (Total Years of Service * Final Basic Salary including grade) / 50.',
        'Employees retiring before 20 years receive a one-time gratuity lump sum based on completed service intervals.',
        'Personnel recruited after Shrawan 2076 transition into the mandatory Contributory Pension Scheme (निवृत्तभरण कोष).'
      ],
      sections: [
        {
          heading: 'Official Government Pension Calculation Formula',
          body: 'Under the Civil Service Act, monthly pension follows a defined ratio based on tenure and final pay scale:',
          table: {
            headers: ['Service Metric', 'Statutory Fraction', 'Official Legal Formula'],
            rows: [
              ['Monthly Pension', 'Service Years / 50', '(Total Years of Service * Last Month Basic Salary) / 50'],
              ['Maximum Pension Cap', 'No exceed ceiling', 'Cannot exceed final basic salary of current position'],
              ['Minimum Pension Floor', 'Base protection', 'Cannot fall below half the basic salary of current position'],
              ['Dearness Allowance', 'Monthly top-up', 'Government gazetted monthly allowance added to base pension'],
            ]
          },
          tip: 'When the Government of Nepal increases active civil servant salaries in annual budgets, retired pensioner disbursements increase proportionally by 50% of the active increment.'
        },
        {
          heading: 'Gratuity Rules for Service Under 20 Years',
          body: 'Permanent employees who resign or separate before completing 20 years receive a gratuity payout: 5 to 10 years of service grants half a month salary per completed year; 10 to 15 years grants one month salary per year; and 15 to 20 years grants one and a half months salary per year.',
        }
      ],
      conclusion: 'Retirement planning guarantees stability during your post-service years. Compute your exact monthly pension disbursement and gratuity entitlements with our Nepal Pension Calculator.'
    }
  }
];
