import { BlogPost } from '../types';

export const landAndRealEstatePosts: BlogPost[] = [
  {
    slug: 'nepal-land-measurement-ropani-bigha-malpot',
    title: 'Nepal Land Measurement Guide: Ropani vs Bigha and Malpot Registration Taxes',
    titleNep: 'नेपालमा जग्गा नापजाँच निर्देशिका: रोपनी, बिघा र मालपोत लिखत रजिष्ट्रेसन कर',
    excerpt: 'Learn how to convert hill land units (Ropani, Aana, Paisa, Daam) to Terai units (Bigha, Kattha, Dhur), evaluate square feet, and calculate official Malpot registration fees with female rebates.',
    excerptNep: 'पहाडी प्रणाली (रोपनी, आना, पैसा, दाम) र तराई प्रणाली (बिघा, कठ्ठा, धुर) बीचको रूपान्तरण, वर्गफिट र महिला छुटसहित मालपोत कर।',
    category: 'Land & Real Estate',
    publishedDate: '2026-10-08',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Convert Land Units & Calculate Malpot Tax',
      href: '/land',
      iconText: 'Landmark',
    },
    keywords: ['land measurement nepal', 'ropani to bigha', 'aana to square feet', 'malpot registration fee nepal'],
    content: {
      intro: 'Land measurement in Nepal uses two distinct cadastral systems: the Ropani hierarchy across the Kathmandu Valley and hilly districts, and the Bigha hierarchy across the southern Terai plains.',
      keyTakeaways: [
        '1 Ropani equals 16 Aana, 64 Paisa, 256 Daam, or 5,476 Square Feet.',
        '1 Bigha equals 20 Kattha, 400 Dhur, or 72,900 Square Feet.',
        '1 Bigha is equivalent to approximately 13.31 Ropani.',
        'Land registration in a female family members name grants a 25% to 50% rebate on official deed transfer fees.'
      ],
      sections: [
        {
          heading: 'Hilly Region (Ropani) Unit Hierarchy',
          body: 'The hill cadastral system operates on base-4 and base-16 multiples:',
          table: {
            headers: ['Unit', 'Sub-units', 'Square Feet (Sq. Ft.)', 'Square Meters (Sq. M.)'],
            rows: [
              ['1 Ropani', '16 Aana', '5,476.00 sq ft', '508.74 sq m'],
              ['1 Aana', '4 Paisa', '342.25 sq ft', '31.80 sq m'],
              ['1 Paisa', '4 Daam', '85.56 sq ft', '7.95 sq m'],
              ['1 Daam', 'Base Unit', '21.39 sq ft', '1.99 sq m'],
            ]
          },
        },
        {
          heading: 'Terai Region (Bigha) Unit Hierarchy',
          body: 'The Terai plains follow a base-20 system suited for expansive agricultural and urban plots:',
          table: {
            headers: ['Unit', 'Sub-units', 'Square Feet (Sq. Ft.)', 'Square Meters (Sq. M.)'],
            rows: [
              ['1 Bigha', '20 Kattha', '72,900.00 sq ft', '6,772.63 sq m'],
              ['1 Kattha', '20 Dhur', '3,645.00 sq ft', '338.63 sq m'],
              ['1 Dhur', 'Base Unit', '182.25 sq ft', '16.93 sq m'],
              ['1 Kanwa', '1/16th Dhur', '11.39 sq ft', '1.06 sq m'],
            ]
          },
          tip: 'When buying property in municipal boundary corridors, verify total square footage from the official blueprint to prevent surveyor boundary disputes.'
        }
      ],
      conclusion: 'Automating calculations eliminates manual errors when converting land parcels. Use our Ropani-Bigha converter to evaluate area equivalents and property ownership rebates.'
    }
  },
  {
    slug: 'malpot-land-deed-registration-fees-female-rebate-cgt-nepal',
    title: 'Nepal Malpot Land Registration Fees, Female Rebates & CGT Guide',
    titleNep: 'मालपोत लिखत रजिष्ट्रेसन दस्तुर, महिला छुट र पुँजीगत लाभकर (CGT) निर्देशिका',
    excerpt: 'Comprehensive guide to Department of Land Management and Administration (DoLMA) deed registration fees, municipal land valuation, female ownership tax discounts, and Capital Gains Tax.',
    excerptNep: 'मालपोत कार्यालयमा जग्गा पास गर्दा लाग्ने रजिस्ट्रेसन शुल्क, २५% देखि ५०% सम्मको महिला छुट, सरकारी न्यूनतम मूल्याङ्कन र पूँजीगत लाभकरको नियम।',
    category: 'Land & Real Estate',
    publishedDate: '2026-09-25',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Malpot Registration Fees & CGT',
      href: '/malpot',
      iconText: 'Building2',
    },
    keywords: ['malpot registration fee calculator', 'female land rebate nepal', 'capital gains tax land nepal', 'land pass cost kathmandu'],
    content: {
      intro: 'Transferring real estate property at the Land Revenue Office (Malpot Karyalaya) under the Department of Land Management and Administration (DoLMA) requires paying statutory registration fees and municipal deed levies. Understanding official land valuation rates, female ownership concessions, and seller Capital Gains Tax (CGT) prevents unexpected transaction costs.',
      keyTakeaways: [
        'Registration fee in Metropolitan cities is typically 4.5% for urban residential parcels.',
        'Registering land in a female family members name grants a legal 25% discount in municipal areas and up to 50% in rural villages.',
        'Sellers pay Capital Gains Tax on net profit: 5% for property held over 5 years, and 7.5% for property held under 5 years.',
        'Deed registration fees are calculated on the higher of the actual transaction amount or the government minimum valuation rate.'
      ],
      sections: [
        {
          heading: 'Municipal Registration Fee Slabs in Nepal',
          body: 'Registration charges vary based on municipal tier and road connectivity:',
          table: {
            headers: ['Local Government Classification', 'Standard Registration Fee (%)', 'Effective Fee with 25% Female Rebate'],
            rows: [
              ['Metropolitan City (महानगरपालिका)', '4.50%', '3.375%'],
              ['Sub-Metropolitan City (उपमहानगरपालिका)', '4.00%', '3.00%'],
              ['Municipality (नगरपालिका)', '3.00% - 3.50%', '2.25% - 2.625%'],
              ['Rural Municipality (गाउँपालिका)', '2.00%', '1.00% - 1.50%'],
            ]
          },
          tip: 'Female property ownership rebates apply only when ownership resides solely in the female family members name.'
        },
        {
          heading: 'Capital Gains Tax (CGT) on Land Sales',
          body: 'Under Section 95Ka of the Income Tax Act, the seller must clear Capital Gains Tax before deed transfer. Profit equals the sale price minus verified acquisition cost, legal transfer expenses, and documented structural improvements. If owned for more than 5 years, individual sellers pay 5% CGT. If owned for less than 5 years, the rate increases to 7.5%. Commercial land trading entities pay 10% advance withholding.',
        }
      ],
      conclusion: 'Calculating your complete closing costs beforehand ensures a smooth transaction at the Malpot counter. Verify deed registration fees and tax rebates with our Malpot Land Registration Calculator.'
    }
  },
  {
    slug: 'house-rent-tax-nepal-10-percent-municipality-ird-tds',
    title: 'House Rent Tax in Nepal: 10% Local Ward Tax vs. Commercial IRD TDS Rules',
    titleNep: 'घरबहाल कर निर्देशिका: १०% स्थानीय तह (वडा) र आन्तरिक राजस्व (IRD) नियम',
    excerpt: 'Detailed legal breakdown of residential and commercial house rent taxation in Nepal: local municipality 10% rent tax, institutional IRD TDS withholding, and tenant agreement requirements.',
    excerptNep: 'नेपालमा घर तथा सटर भाडामा लगाउँदा लाग्ने १०% बहाल कर, वडा कार्यालयमा सम्झौता दर्ता गर्ने नियम र संस्थागत भाडामा आन्तरिक राजस्वको टीडीएस।',
    category: 'Land & Real Estate',
    publishedDate: '2026-09-17',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate House Rent Tax (10%)',
      href: '/rent-tax',
      iconText: 'Receipt',
    },
    keywords: ['house rent tax calculator nepal', '10 percent rent tax ward office', 'commercial rent tds nepal', 'who pays rent tax nepal'],
    content: {
      intro: 'Under the Local Government Operation Act 2074 and the Constitution of Nepal, jurisdiction over house rent tax collected from natural individuals belongs entirely to local ward and municipal governments. However, commercial enterprises renting office premises from companies or registered firms fall under the Inland Revenue Department (IRD) withholding tax umbrella.',
      keyTakeaways: [
        'Local municipalities levy a flat 10% rent tax on residential and commercial properties rented by individuals.',
        'Rent contracts must be registered with the local Ward Office to obtain business licenses and formal municipal verification.',
        'When a corporate entity leases space from an individual, it withholds 10% rent tax and deposits it to the municipal revenue account.',
        'Leasing commercial space from a VAT-registered company incurs 10% TDS plus 13% Value Added Tax.'
      ],
      sections: [
        {
          heading: '10% Municipal House Rent Calculation',
          body: 'Computing annual and monthly rent tax follows direct statutory proportions:',
          table: {
            headers: ['Monthly Rental Value (NPR)', 'Monthly 10% Tax Payable', 'Annual Net Landlord Income', 'Annual Municipal Tax'],
            rows: [
              ['NPR 20,000', 'NPR 2,000', 'NPR 2,16,000', 'NPR 24,000'],
              ['NPR 50,000', 'NPR 5,000', 'NPR 5,40,000', 'NPR 60,000'],
              ['NPR 1,00,000', 'NPR 10,00,0', 'NPR 10,80,000', 'NPR 1,20,000'],
              ['NPR 2,50,000', 'NPR 25,000', 'NPR 27,00,000', 'NPR 3,00,000'],
            ]
          },
          tip: 'Rental agreements should clearly state whether the agreed figure is inclusive or exclusive of the 10% local tax.'
        },
        {
          heading: 'Legal Requirement for Ward Agreement Registration',
          body: 'Tenancy contracts exceeding 11 months must be executed in writing. Both parties submit copies of citizenship, land ownership certificates (Lalpurja), and building completion certificates to the local ward office to secure official municipal stamps.',
        }
      ],
      conclusion: 'Understanding rent tax responsibilities protects property owners and commercial tenants from municipal penalties. Compute your rental tax obligations using our House Rent Tax Calculator.'
    }
  }
];
