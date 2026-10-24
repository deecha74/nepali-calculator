import { BlogPost } from '../types';

export const taxAndLawPosts: BlogPost[] = [
  {
    slug: 'nepal-income-tax-guide-2083-84',
    title: 'The Complete Guide to Nepal Income Tax FY 2083/84: Slabs, Deductions & SSF',
    titleNep: 'नेपाल आयकर निर्देशिका २०८३/८४: स्ल्याब, छुट र सामाजिक सुरक्षा कोष हिसाब',
    excerpt: 'Comprehensive breakdown of individual and married salary income tax brackets in Nepal, including Social Security Fund (SSF), Citizen Investment Trust (CIT), and medical insurance deductions.',
    excerptNep: 'अविवाहित तथा विवाहित व्यक्तिको नयाँ आयकर स्ल्याब, सामाजिक सुरक्षा कोष (SSF), नागरिक लगानी कोष (CIT) र बीमा छुटको पूर्ण हिसाब किताब।',
    category: 'Tax & Law',
    publishedDate: '2026-10-15',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Your Income Tax FY 2083/84',
      href: '/tax',
      iconText: 'ReceiptText',
    },
    keywords: ['nepal tax calculator', 'salary tax nepal 2083 2084', 'income tax slabs nepal', 'ssf tax rebate nepal'],
    content: {
      intro: 'Understanding salary deductions and tax liabilities under Nepal Inland Revenue Department (IRD) guidelines requires clarity on progressive slabs. For Fiscal Year 2083/84, understanding progressive tax brackets, Social Security tax exemptions, and allowable deductions helps salaried employees and business owners manage payroll accurately.',
      keyTakeaways: [
        'Under the new law for FY 2083/84, the initial 1% tax bracket is expanded up to NPR 10,00,000 (10 Lakh), providing substantial middle-class relief.',
        'Employees enrolled in the Social Security Fund (SSF) receive a full exemption (0%) from the initial 1% tax on the first 10 Lakh.',
        'Taxable income above NPR 10 Lakh is taxed progressively at 10% (10L-15L), 20% (15L-25L), 27% (25L-40L), and 29% (above 40L).',
        'Retirement deductions (SSF, EPF, CIT) remain capped at one-third of total assessable income or NPR 5,00,000, whichever is lower.',
        'For previous fiscal year audits (FY 2082/83 & 2081/82), the traditional slabs apply: first NPR 5,00,000 for unmarried and NPR 6,00,000 for married.'
      ],
      sections: [
        {
          heading: 'Individual Income Tax Slabs for FY 2083/84 (New Law)',
          body: 'Under the new law for Fiscal Year 2083/84, progressive taxation applies across five streamlined brackets, expanding the base threshold up to NPR 10 Lakh:',
          table: {
            headers: ['Income Bracket (NPR)', 'Tax Rate (%)', 'Tax Payable (NPR)'],
            rows: [
              ['First 10,00,000 (Up to 10 Lakh)', '1% (0% if in SSF)', '10,000 (0 in SSF)'],
              ['Next 5,00,000 (10,00,001 to 15,00,000)', '10%', '50,000'],
              ['Next 10,00,000 (15,00,001 to 25,00,000)', '20%', '2,00,000'],
              ['Next 15,00,000 (25,00,001 to 40,00,000)', '27%', '4,05,000'],
              ['Above 40,00,000 (Above 40 Lakh)', '29%', 'Progressive Ceiling Rate'],
            ]
          },
          tip: 'When your employer registers your payroll under the formal Social Security Fund (SSF) portal, the first 1% tax is 100% exempted by law, meaning zero tax on income up to NPR 10 Lakh!'
        },
        {
          heading: 'Historical Reference: FY 2082/83 & 2081/82 Tax Slabs',
          body: 'For taxpayers preparing retrospective tax returns, statutory audits, or verifying prior year Form 10 tax clearances, the previous two-tier system applies:',
          table: {
            headers: ['Bracket / Category', 'Unmarried / Single Slabs', 'Married / Couple Slabs', 'Rate (%)'],
            rows: [
              ['Tier 1 (Base)', 'First NPR 5,00,000', 'First NPR 6,00,000', '1% (0% SSF)'],
              ['Tier 2', 'Next NPR 2,00,000 (5L - 7L)', 'Next NPR 2,00,000 (6L - 8L)', '10%'],
              ['Tier 3', 'Next NPR 3,00,000 (7L - 10L)', 'Next NPR 3,00,000 (8L - 11L)', '20%'],
              ['Tier 4', 'Next NPR 10,00,000 (10L - 20L)', 'Next NPR 9,00,000 (11L - 20L)', '30%'],
              ['Tier 5', 'Next NPR 30,00,000 (20L - 50L)', 'Next NPR 30,00,000 (20L - 50L)', '36%'],
              ['Top Tier', 'Above NPR 50,00,000', 'Above NPR 50,00,000', '39%'],
            ]
          },
          tip: 'Our interactive Income Tax Calculator allows you to switch between FY 2083/84, FY 2082/83, and FY 2081/82 with one click.'
        },
        {
          heading: 'Maximizing Legal Tax Deductions in Nepal',
          body: 'You can lower taxable income through statutory deductions permitted under Section 63 of the Income Tax Act 2058. Contributing to EPF, CIT, and SSF provides up to NPR 5,00,000 deduction limit. Medical tax credits, life insurance (up to NPR 40,000), health insurance (up to NPR 20,000), and remote area allowances lower total liability further.',
        }
      ],
      conclusion: 'Annual tax planning ensures compliance with Nepal Government gazettes without paying excess liabilities. Use our Income Tax Calculator to obtain instant monthly breakdowns, payslips, and deduction projections.'
    }
  },
  {
    slug: 'nepal-tds-withholding-tax-guide-section-88-89',
    title: 'Nepal TDS & Withholding Tax Guide: Sections 88, 88Ka, 89 & Reverse Gross-Up',
    titleNep: 'नेपाल टीडीएस (TDS) निर्देशिका: दफा ८८, ८८क, ८९ तथा रिभर्स ग्रस-अप हिसाब',
    excerpt: 'Detailed breakdown of Tax Deducted at Source (TDS) rates on house rent, consultancy, service contracts, freight, and accounting formulas for reverse gross-up payments.',
    excerptNep: 'घरबहाल कर (१०%), परामर्श सेवा (१५%/१.५%), ढुवानी, ठेक्का सम्झौता र नेट भुक्तानीमा टीडीएस ग्रस-अप हिसाबको पूर्ण जानकारी।',
    category: 'Tax & Law',
    publishedDate: '2026-10-12',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate TDS & Gross-Up Amounts',
      href: '/tds',
      iconText: 'Receipt',
    },
    keywords: ['tds calculator nepal', 'section 88 tds rates nepal', 'reverse tds gross up formula', 'withholding tax nepal ird'],
    content: {
      intro: 'Tax Deducted at Source (TDS) under Chapter 17 of the Income Tax Act 2058 requires payers to withhold tax before remitting payment to vendors, consultants, and landlords. Understanding statutory withholding rates ensures commercial enterprises remain compliant with Inland Revenue Department deposit timelines.',
      keyTakeaways: [
        'Section 88 mandates 15% TDS on un-registered consultancy services, reduced to 1.5% for VAT-registered firms.',
        'House rent paid to individuals attracts 10% local municipality tax, while corporate leases require IRD withholding.',
        'Transport freight services incur 2.5% TDS, whereas carriage without vehicles incurs 1.5% under VAT invoicing.',
        'Reverse gross-up calculation divides net desired compensation by (1 minus the applicable tax rate).'
      ],
      sections: [
        {
          heading: 'Standard TDS Rates Under Nepal Income Tax Act',
          body: 'The Inland Revenue Department establishes uniform withholding percentages across standard commercial transactions:',
          table: {
            headers: ['Payment Category', 'Applicable Law', 'TDS Rate (%)'],
            rows: [
              ['House Rent (Institutional)', 'Section 88', '10%'],
              ['Consultancy (PAN only)', 'Section 88', '15%'],
              ['Consultancy (VAT Invoice)', 'Section 88', '1.5%'],
              ['Transport & Freight Services', 'Section 88Ka', '2.5%'],
              ['Public Procurement Contracts', 'Section 89', '1.5%'],
              ['Bank Deposit Interest (Natural Person)', 'Section 88', '5%'],
            ]
          },
          tip: 'TDS withheld must be deposited to the Government revenue portal within the 25th day of the following Nepali month to prevent 15% interest fines.'
        },
        {
          heading: 'Calculating Reverse TDS Gross-Up',
          body: 'When contracts specify a net payment amount, payers must gross up the base invoice figure. The formula is: Gross Amount = Net Amount / (1 - TDS Rate). For a net payment of NPR 85,000 with a 15% TDS rate, the gross invoice amount equals NPR 1,00,000, with NPR 15,000 deposited directly to the tax office.',
        }
      ],
      conclusion: 'Accurate TDS deductions eliminate reconciliation discrepancies during annual tax audits. Use our TDS and Reverse Gross-Up Calculator to verify withholding sums instantly.'
    }
  },
  {
    slug: 'schedule-2-tax-depreciation-slabs-nepal',
    title: 'Schedule 2 Tax Depreciation in Nepal: Block A–E WDV, Timing Rule & 7% Repairs',
    titleNep: 'अनुसूची-२ कर ह्रासकट्टी निर्देशिका: ब्लक क-ङ, समय अनुपात र ७% मर्मत सीमा',
    excerpt: 'Comprehensive guide to Written Down Value (WDV) depreciation under Section 16 of the Income Tax Act 2058, 3-tier timing absorption (3/3, 2/3, 1/3), and repair deduction caps.',
    excerptNep: 'आयकर ऐन २०५८ को दफा १६ अनुसार ह्रासकट्टी हुने ब्लक क देखि ङ सम्मका दर, सम्पत्ति खरिद मिति अनुसारको अनुपात र ७% मर्मत खर्च हिसाब।',
    category: 'Tax & Law',
    publishedDate: '2026-10-09',
    readTime: '7 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Schedule 2 Depreciation & Repairs',
      href: '/depreciation',
      iconText: 'Layers',
    },
    keywords: ['schedule 2 depreciation nepal', 'block a b c d depreciation rates', 'tax depreciation calculator nepal', 'repair limit income tax act 2058'],
    content: {
      intro: 'Accounting depreciation recorded in financial statements differs fundamentally from statutory tax depreciation permitted under Section 16 of the Income Tax Act 2058. Schedule 2 establishes a pooling system with fixed percentage write-offs calculated on declining Written Down Value (WDV) bases.',
      keyTakeaways: [
        'Assets are grouped into five distinct pools: Block A (5%), Block B (25%), Block C (20%), Block D (15%), and Block E (Straight-line over contractual life).',
        'Additions during the fiscal year follow the 3-tier timing rule: Shrawan to Poush (3/3 basis), Magh to Chaitra (2/3 basis), and Baisakh to Ashadh (1/3 basis).',
        'Repairs and maintenance expenses are deductible up to 7% of the depreciation base for each block.',
        'Excess repairs exceeding 7% cannot be expensed immediately and must be capitalized into the closing pool base.'
      ],
      sections: [
        {
          heading: 'Depreciation Blocks and Statutory Rates',
          body: 'Nepal tax law categorizes business physical assets into defined pools:',
          table: {
            headers: ['Block', 'Eligible Assets', 'WDV Depreciation Rate'],
            rows: [
              ['Block A', 'Buildings, permanent physical structures, sheds', '5%'],
              ['Block B', 'Computers, office fixtures, office furniture', '25%'],
              ['Block C', 'Automobiles, motor vehicles, construction equipment', '20%'],
              ['Block D', 'Industrial machinery, manufacturing plant, heavy equipment', '15%'],
              ['Block E', 'Intangible assets, software, licenses, patents', 'Cost / Useful Life'],
            ]
          },
          tip: 'Disposal proceeds received from selling an asset reduce the depreciation base directly before calculating current year allowances.'
        },
        {
          heading: 'The 7% Repair and Improvement Limit',
          body: 'Section 16 Subsection 2 limits deductible repair costs to 7% of the opening depreciation base of each respective block. For example, if a company maintains an opening machinery base of NPR 2,000,000 in Block D, maximum allowable repair deduction for that year is NPR 1,40,000. Any remaining repair expenditure gets added to the asset pool base for future depreciation.',
        }
      ],
      conclusion: 'Correct asset pooling prevents disallowances during tax assessments. Use our Schedule 2 Tax Depreciation Calculator to generate compliant depreciation schedules and repair limits.'
    }
  },
  {
    slug: 'corporate-income-tax-advance-tax-installments-nepal',
    title: 'Corporate Income Tax & Section 94 Advance Tax Slabs in Nepal',
    titleNep: 'कम्पनी आयकर तथा दफा ९४ अग्रिम कर किस्ताबन्दी निर्देशिका',
    excerpt: 'Detailed breakdown of corporate tax rates for private companies, commercial banks, manufacturing firms, and Section 94 advance tax installment schedules due in Poush, Chaitra, and Ashadh.',
    excerptNep: 'प्राइभेट तथा पब्लिक लिमिटेड कम्पनीको आयकर दर (२०%, २५%, ३०%) र दफा ९४ बमोजिम पौष (४०%), चैत (७०%) र असार (१००%) को अग्रिम किस्ता भुक्तानी।',
    category: 'Tax & Law',
    publishedDate: '2026-10-06',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Corporate Tax & Advance Installments',
      href: '/corporate-tax',
      iconText: 'Building2',
    },
    keywords: ['corporate tax rate nepal', 'advance tax section 94 nepal', 'company income tax slabs nepal', 'pvt ltd tax calculator'],
    content: {
      intro: 'Corporate entities registered under the Nepal Companies Act must compute annual corporate income tax and pay advance tax installments during the operating fiscal year under Section 94 of the Income Tax Act 2058. Timely installment remittance avoids statutory interest charges under Sections 118 and 119.',
      keyTakeaways: [
        'Standard private limited corporate tax rate is 25% for general trading and service companies.',
        'Manufacturing entities that generate direct employment qualify for a concessional corporate rate of 20%.',
        'Commercial banks, insurance companies, and petroleum enterprises pay a 30% corporate tax rate.',
        'Section 94 requires advance payments in three tiers: 40% by end of Poush, 70% by end of Chaitra, and 100% by end of Ashadh.'
      ],
      sections: [
        {
          heading: 'Corporate Tax Rate Brackets by Business Sector',
          body: 'Tax rates vary based on industry classification in Nepal:',
          table: {
            headers: ['Business Sector', 'Entity Type', 'Effective Corporate Tax Rate'],
            rows: [
              ['General Trading & Services', 'Pvt. Ltd. / Public Ltd.', '25%'],
              ['Manufacturing & Production', 'Industrial Enterprises', '20%'],
              ['Special Economic Zone (SEZ)', 'Eligible Production Units', '10% - 15%'],
              ['Banking, Financial & Insurance', 'BFIs & Reinsurance', '30%'],
              ['Cigarette, Tobacco & Alcohol', 'Distilleries & Tobacco', '30%'],
            ]
          },
          tip: 'Entities with annual turnover up to NPR 1 Crore can opt for simplified presumptive taxation under Section 4.'
        },
        {
          heading: 'Section 94 Advance Tax Schedule & Penalties',
          body: 'Companies must forecast their annual taxable profit and remit installment advances. By the end of Poush, 40% of estimated tax must be deposited. By the end of Chaitra, accumulated payments must reach 70%. By the end of Ashadh, 100% must be paid. Under-reporting estimated tax by more than 20% incurs interest penalties under Section 118.',
        }
      ],
      conclusion: 'Disciplined quarterly tax planning preserves business liquidity and regulatory standing. Calculate corporate tax obligations and advance installment deadlines with our online Corporate Tax Calculator.'
    }
  },
  {
    slug: 'vat-13-percent-calculation-reverse-vat-nepal',
    title: 'Nepal 13% VAT Calculation Guide: Forward, Reverse & Input Tax Credit',
    titleNep: '१३% मूल्य अभिवृद्धि कर (VAT) निर्देशिका: सामान्य, रिभर्स र इनपुट क्रेडिट हिसाब',
    excerpt: 'Step-by-step calculation guide for Nepal 13% Value Added Tax (VAT), reverse VAT extraction from inclusive prices, input tax credit offsets, and registration turnover thresholds.',
    excerptNep: '१३% भ्याट हिसाब, कुल रकमबाट भ्याट निकाल्ने रिभर्स सूत्र, खरिद भ्याट कट्टी (Input Credit) र वार्षिक भ्याट दर्ता थ्रेसहोल्डको विवरण।',
    category: 'Tax & Law',
    publishedDate: '2026-10-04',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate 13% VAT (Forward & Reverse)',
      href: '/vat',
      iconText: 'ReceiptText',
    },
    keywords: ['vat calculator nepal', '13 percent vat reverse calculation', 'input tax credit nepal vat', 'vat registration threshold nepal'],
    content: {
      intro: 'Value Added Tax (VAT) under the Value Added Tax Act 2052 applies a standardized 13% rate across non-exempt goods and commercial services. Businesses registered for VAT must calculate forward output tax on invoices and offset legitimate input tax credits accrued on commercial purchases.',
      keyTakeaways: [
        'Standard VAT rate in Nepal is 13% across taxable goods and services.',
        'To extract VAT from an inclusive total, divide the inclusive sum by 1.13, then subtract the resulting taxable base.',
        'Annual registration threshold is NPR 50 Lakhs for goods and NPR 20 Lakhs for services.',
        'VAT returns must be submitted online before the 25th day of the subsequent Nepali month.'
      ],
      sections: [
        {
          heading: 'Forward vs. Reverse VAT Formulas',
          body: 'Computing tax from a base amount requires standard forward multiplication, while billing from an inclusive total requires reverse extraction:',
          table: {
            headers: ['Operation', 'Base Input', 'Mathematical Formula', 'Example (NPR 10,000 Base)'],
            rows: [
              ['Forward VAT', 'Taxable Amount', 'Taxable Base * 0.13', '10,000 * 0.13 = NPR 1,300'],
              ['Total Bill', 'Taxable Amount', 'Taxable Base * 1.13', '10,000 * 1.13 = NPR 11,300'],
              ['Reverse Taxable Base', 'VAT-Inclusive Total', 'Total / 1.13', '11,300 / 1.13 = NPR 10,000'],
              ['Reverse VAT Extracted', 'VAT-Inclusive Total', 'Total - (Total / 1.13)', '11,300 - 10,000 = NPR 1,300'],
            ]
          },
          tip: 'Agricultural produce, basic healthcare, and public educational tuition remain zero-rated or exempt under Schedule 1 of the VAT Act.'
        },
        {
          heading: 'Managing Input Tax Credit (ITC) Offsets',
          body: 'When your business pays VAT on commercial purchases, you record input tax credit. During monthly filing, deduct total input VAT from total output VAT collected from customers. Only the net surplus is deposited to the Inland Revenue Department. If input exceeds output, the credit carries forward to the following month.',
        }
      ],
      conclusion: 'Accurate VAT invoicing protects commercial enterprises from audit penalties. Use our 13% VAT Calculator to check forward bills, inclusive extractions, and input credit offsets.'
    }
  },
  {
    slug: 'nepal-labour-act-gratuity-severance-calculation',
    title: 'Gratuity & Severance Pay Under Nepal Labour Act 2074: 8.33% Formula & Rules',
    titleNep: 'श्रम ऐन २०७४ अनुसार उपदान तथा सेवामुक्ति हिसाब: ८.३३% सूत्र र नियमहरू',
    excerpt: 'Complete guide to calculating employee gratuity, severance compensation, accumulated leave encashment, and Social Security Fund (SSF) transfers under Nepal Labour Act 2074.',
    excerptNep: 'श्रम ऐन २०७४ बमोजिम ८.३३% उपदान रकम हिसाब, सेवा अवधि, सञ्चित घरबिदा र बिरामी बिदाको रकम भुक्तानी तथा सामाजिक सुरक्षा कोषको नियम।',
    category: 'Tax & Law',
    publishedDate: '2026-10-01',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Gratuity & Severance Pay',
      href: '/gratuity',
      iconText: 'Coins',
    },
    keywords: ['gratuity calculator nepal', 'labour act 2074 gratuity formula', 'leave encashment calculation nepal', 'severance pay nepal'],
    content: {
      intro: 'The Nepal Labour Act 2074 modernized employee rights by establishing mandatory monthly gratuity accrual starting from the first day of employment. Employers must deposit or reserve 8.33% of each employees basic remuneration monthly, ensuring transparent separation benefits upon resignation or retirement.',
      keyTakeaways: [
        'Gratuity equals 8.33% of monthly basic salary, equivalent to one month of basic pay for every year of completed service.',
        'Gratuity applies strictly to basic salary; performance allowances and transportation perks are excluded.',
        'Accumulated home leave up to 90 days and sick leave up to 45 days must be encashed upon separation.',
        'Employers enrolled in the formal Social Security Fund deposit this 8.33% directly into each workers individual retirement account.'
      ],
      sections: [
        {
          heading: 'Statutory Gratuity Accrual Formula',
          body: 'The Labour Act 2074 removed the older 3-year service barrier. Gratuity accrues from day one:',
          table: {
            headers: ['Service Metric', 'Statutory Rate', 'Calculation Basis'],
            rows: [
              ['Monthly Gratuity Accrual', '8.33%', 'Monthly Basic Remuneration'],
              ['Annual Equivalent', '100% of 1 Month', '1 Month Basic Pay per Year of Service'],
              ['Home Leave Encashment Limit', 'Up to 90 Days', 'Daily Basic Salary * Unused Days'],
              ['Sick Leave Encashment Limit', 'Up to 45 Days', 'Daily Basic Salary * Unused Days'],
            ]
          },
          tip: 'Daily basic wage equals monthly basic salary divided by 30 days.'
        },
        {
          heading: 'Severance Payment During Redundancy',
          body: 'Under Section 145, if an enterprise retrenches employees due to structural reorganization, employers must pay retrenchment compensation equal to one month of basic wage for each year of continuous service, in addition to earned gratuity and leave encashment balances.',
        }
      ],
      conclusion: 'Understanding statutory separation rights ensures fair settlement between employers and team members. Calculate your exact entitlements using our Labour Act Gratuity and Leave Encashment Calculator.'
    }
  },
  {
    slug: 'nepal-labour-act-overtime-hourly-wage-calculation',
    title: 'Overtime (OT) Hourly Pay Calculation Under Nepal Labour Act 2074',
    titleNep: 'श्रम ऐन २०७४ अनुसार ओभरटाइम (OT) प्रतिघण्टा पारिश्रमिक हिसाब निर्देशिका',
    excerpt: 'Detailed calculation rules for 1.5 times overtime hourly wages, statutory 8-hour workday limits, maximum weekly overtime caps, and public holiday allowances in Nepal.',
    excerptNep: 'दैनिक ८ घण्टा भन्दा बढी काम गर्दा पाउने १.५ गुणा ओभरटाइम दर, हप्तामा अधिकतम २४ घण्टा सीमा र सार्वजनिक बिदाको पारिश्रमिक हिसाब।',
    category: 'Tax & Law',
    publishedDate: '2026-09-29',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate 1.5x Overtime Hourly Pay',
      href: '/overtime',
      iconText: 'Clock',
    },
    keywords: ['overtime calculator nepal', '1.5 times overtime calculation labour act', 'hourly wage calculation nepal', 'maximum overtime hours nepal'],
    content: {
      intro: 'Section 31 of the Nepal Labour Act 2074 establishes working hour standards across commercial and industrial workplaces. Standard working hours are capped at 8 hours per day and 48 hours per week. Hours worked beyond this threshold mandate compensation at 1.5 times the employees ordinary hourly wage.',
      keyTakeaways: [
        'Standard full-time employment is 8 hours daily and 48 hours across a 6-day working week.',
        'Overtime compensation rate is strictly 1.5 times the normal hourly basic remuneration.',
        'Overtime cannot exceed 4 hours per day or 24 hours in any single working week.',
        'Normal hourly wage equals monthly basic remuneration divided by 208 working hours.'
      ],
      sections: [
        {
          heading: 'Step-by-Step Hourly Wage Computation',
          body: 'To compute overtime entitlements accurately, determine your base hourly rate before applying the statutory premium:',
          table: {
            headers: ['Calculation Step', 'Formula', 'Example (NPR 26,000 Basic Salary)'],
            rows: [
              ['Monthly Working Hours', '26 Days * 8 Hours', '208 Hours per Month'],
              ['Base Hourly Wage', 'Monthly Basic / 208', 'NPR 26,000 / 208 = NPR 125.00'],
              ['Overtime Hourly Rate (1.5x)', 'Base Hourly Wage * 1.5', 'NPR 125.00 * 1.5 = NPR 187.50'],
              ['Total Pay for 20 Hours OT', 'OT Rate * Overtime Hours', 'NPR 187.50 * 20 = NPR 3,750.00'],
            ]
          },
          tip: 'Employers cannot force employees to work overtime without mutual consent, except in emergency repairs or disaster response.'
        },
        {
          heading: 'Public Holiday and Festival Overtime Rules',
          body: 'Employees rostered to work on gazetted public holidays or during Dashain and Tihar festival breaks receive substitute paid leave within 21 days or overtime compensation computed at statutory enhanced rates.',
        }
      ],
      conclusion: 'Clear overtime tracking protects worker health and payroll compliance. Use our Overtime Calculator to compute your exact hourly rates and monthly earnings.'
    }
  },
  {
    slug: 'foreign-study-noc-3-percent-education-tax-nepal',
    title: 'Foreign Study NOC & 3% Education Service Tax in Nepal: Complete Rules',
    titleNep: 'वैदेशिक अध्ययन अनुमतिपत्र (NOC) र ३% शिक्षा सेवा कर निर्देशिका',
    excerpt: 'Detailed guide to Ministry of Education No Objection Certificate (NOC) requirements, the 3% education service tax on overseas tuition, and bank remittance limits.',
    excerptNep: 'शिक्षा मन्त्रालयको एनओसी (NOC) लिने प्रक्रिया, विदेश कलेजको शुल्क पठाउँदा लाग्ने ३% शिक्षा सेवा कर र बैंक ड्राफ्ट नियमहरूको पूर्ण जानकारी।',
    category: 'Tax & Law',
    publishedDate: '2026-09-26',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate 3% NOC Education Tax & Bank Fees',
      href: '/noc-tax',
      iconText: 'GraduationCap',
    },
    keywords: ['noc tax calculator nepal', '3 percent education tax nepal', 'foreign study noc bank fee', 'moest noc guidelines'],
    content: {
      intro: 'Students pursuing higher education abroad in Australia, Canada, the United States, the United Kingdom, or Japan must obtain a No Objection Certificate (NOC) from the Ministry of Education, Science and Technology (MoEST). Under the Finance Act, commercial banks collect a mandatory 3% Education Service Tax on all foreign tuition remittances.',
      keyTakeaways: [
        'Commercial banks deduct a statutory 3% Education Service Tax on tuition fees remitted abroad.',
        'Living expense remittances and health insurance transfers are also subject to foreign exchange compliance checks.',
        'An official MoEST NOC letter is mandatory for commercial banks to execute foreign currency wire transfers (SWIFT/TT).',
        'NOC application fees cost NPR 2,000 paid through the Government revenue portal.'
      ],
      sections: [
        {
          heading: 'Understanding the 3% Education Tax Calculation',
          body: 'Banks compute education tax directly on the gross rupee equivalent of foreign currency before telegraphic transfer:',
          table: {
            headers: ['Tuition Remittance (AUD/USD)', 'Converted NPR Value', '3% Education Tax Payable'],
            rows: [
              ['$ 5,000', 'NPR 6,80,000', 'NPR 20,400'],
              ['$ 10,000', 'NPR 13,60,000', 'NPR 40,800'],
              ['$ 15,000', 'NPR 20,40,000', 'NPR 61,200'],
              ['$ 20,000', 'NPR 27,20,000', 'NPR 81,600'],
            ]
          },
          tip: 'Always factor the 3% tax and bank SWIFT charges (typically NPR 1,000 - 2,500) into your initial tuition budget before visiting the bank counter.'
        },
        {
          heading: 'Required Documents for Online NOC Approval',
          body: 'To apply via the MoEST online portal, students must submit citizenship copies, academic transcripts from SLC/SEE onwards, unconditional university offer letters, and evidence of recognized degree equivalence where applicable.',
        }
      ],
      conclusion: 'Preparing for international tuition remittance prevents currency conversion delays. Calculate your foreign study education tax and total remittance expenses using our NOC Tax Calculator.'
    }
  }
];
