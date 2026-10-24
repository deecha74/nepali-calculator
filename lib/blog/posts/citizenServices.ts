import { BlogPost } from '../types';

export const citizenServicesPosts: BlogPost[] = [
  {
    slug: 'vehicle-bluebook-annual-tax-nepal',
    title: 'Vehicle Bluebook Annual Tax, Inspection & Fine Slabs in Nepal: Complete Guide',
    titleNep: 'नेपालमा सवारी ब्लुबुक वार्षिक कर, नवीकरण र जरिवाना स्ल्याब: पूर्ण निर्देशिका',
    excerpt: 'Detailed guide to motorcycle, scooter, private car, and EV bluebook renewal tariffs across Bagmati, Gandaki, Koshi, and all provincial transport offices, with fine penalty calculations.',
    excerptNep: 'बागमती, गण्डकी, कोशी लगायत सबै प्रदेशका मोटरसाइकल, कार र विद्युतीय गाडीको वार्षिक कर, नवीकरण मिति र जरिवाना हिसाब।',
    category: 'Citizen Services',
    publishedDate: '2026-10-05',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Vehicle Bluebook Tax & Fines',
      href: '/vehicle',
      iconText: 'Zap',
    },
    keywords: ['bluebook renewal fine nepal', 'bike tax bagmati province', 'car tax nepal 2083', 'ev road tax nepal'],
    content: {
      intro: 'Vehicle owners in Nepal must pay annual provincial road taxes and renew their vehicle registration book (Bluebook) within the stipulated fiscal window to avoid escalating penalties.',
      keyTakeaways: [
        'Vehicles must be renewed within the fiscal year or within 90 days of expiry to avoid escalating fine tiers.',
        'Delay penalties range from 5% (initial 30 days) up to 100% (after 5 years of non-payment).',
        'Electric vehicles (EVs) qualify for subsidized provincial tax rates categorized by kilowatt (kW) motor power.',
        'Third-party motor insurance is mandatory prior to processing Bluebook road tax stamp renewal.'
      ],
      sections: [
        {
          heading: 'Bagmati Province Motorcycle & Scooter Annual Tax Slabs',
          body: 'Motorcycles are assessed according to engine displacement (CC):',
          table: {
            headers: ['Engine Capacity (CC)', 'Annual Road Tax (NPR)', 'Third Party Insurance (NPR)'],
            rows: [
              ['Up to 125 CC', 'NPR 3,000', 'NPR 1,500 - 1,700'],
              ['126 CC to 160 CC', 'NPR 4,500', 'NPR 1,700 - 1,900'],
              ['161 CC to 250 CC', 'NPR 6,000', 'NPR 2,000'],
              ['251 CC to 400 CC', 'NPR 11,500', 'NPR 2,200'],
              ['401 CC and Above', 'NPR 22,000', 'NPR 2,500'],
            ]
          },
        },
        {
          heading: 'Fine Penalty Escalation Slabs',
          body: 'Failing to renew your bluebook triggers tiered penalties:',
          table: {
            headers: ['Time Elapsed Beyond Grace Period', 'Penalty on Tax Amount'],
            rows: [
              ['First 30 Days', '5% Penalty'],
              ['Next 45 Days', '10% Penalty'],
              ['Up to End of Fiscal Year', '20% Penalty'],
              ['Subsequent Fiscal Years', '32% to 100% Penalty'],
            ]
          },
          tip: 'Renew your third-party insurance policy online before visiting the Transport Management Office or paying via the provincial Nagarik App portal.'
        }
      ],
      conclusion: 'Preventing traffic seizures and compounding penalties requires timely annual payments. Use our Vehicle Bluebook Calculator to check your annual liability.'
    }
  },
  {
    slug: 'driving-license-written-exam-likhit-nepal-guide',
    title: 'Step-by-Step Guide to Nepal Driving License Written Exam (Likhit) & Scoring',
    titleNep: 'सवारी चालक अनुमतिपत्र लिखित परीक्षा (Likhit) निर्देशिका तथा अंकभार',
    excerpt: 'Complete preparation guide for Department of Transport Management (DOTM) computer-based written driving license test for Category A (Bike/Scooter) and Category B (Car).',
    excerptNep: 'यातायात व्यवस्था विभाग (DOTM) को मोटरसाइकल, स्कुटर तथा कारको कम्प्युटर लिखित परीक्षामा १००% उत्तीर्ण हुने प्रश्नोत्तर र नियमहरू।',
    category: 'Citizen Services',
    publishedDate: '2026-09-28',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Practice 20-Question Driving License Mock Quiz',
      href: '/license-exam',
      iconText: 'GraduationCap',
    },
    keywords: ['driving license likhit exam nepal', 'dotm quiz test nepal', 'bike license exam nepal', 'dotm online exam'],
    content: {
      intro: 'The Department of Transport Management (DOTM) operates a 20-question randomized computer examination covering traffic rules, road safety, vehicle mechanics, and environmental signs for driving license applicants.',
      keyTakeaways: [
        'The written exam consists of 20 randomized multiple-choice questions from the official DOTM question bank.',
        'Each question carries 5 marks, totaling 100 marks.',
        'Candidates must score a minimum of 60 marks (at least 12 correct answers out of 20) to qualify for the practical trial.',
        'Questions cover road markings, priority yielding at roundabouts, hand signals, and penalty offenses under the Motor Vehicles Act.'
      ],
      sections: [
        {
          heading: 'Core Exam Topics Breakdown',
          body: 'The 20 questions are drawn proportionally across essential domains:',
          table: {
            headers: ['Topic Area', 'Question Weight', 'Key Focus'],
            rows: [
              ['Traffic Signs & Signals', '5 Questions', 'Mandatory, Warning & Informational signs'],
              ['Traffic Rules & Laws', '6 Questions', 'Overtaking, speed limits, parking rules, penalties'],
              ['Vehicle Mechanics', '4 Questions', 'Braking, engine oil, tires, dashboard lights'],
              ['Accident & First Aid', '3 Questions', 'Emergency handling, pedestrian safety, drunk driving'],
              ['Environmental & Civics', '2 Questions', 'Emission smoke, noise pollution, horn rules'],
            ]
          },
          tip: 'Practice under simulated timer conditions using our free DOTM interactive mock quiz with instant answer reviews.'
        }
      ],
      conclusion: 'Passing the Likhit exam on your first attempt gives you confidence before the practical trial. Practice on our interactive driving license exam simulator.'
    }
  },
  {
    slug: 'nepal-epassport-fees-fast-track-renewal-rules',
    title: 'Nepal e-Passport (MRP Replacement) Fees, Fast-Track Delivery & Ward Process',
    titleNep: 'नेपाल इ-पासपोर्ट (e-Passport) दस्तुर, द्रुत सेवा र अनलाइन आवेदन निर्देशिका',
    excerpt: 'Detailed fee guide for Nepal biometric e-Passports: Department of Passports Tripureshwor fast-track fees, District Administration Office (DAO) normal rates, 34-page vs 66-page options, and photo specs.',
    excerptNep: 'राहदानी विभाग (त्रिपुरेश्वर) को द्रुत सेवा (रु १२,०००), जिल्ला प्रशासन कार्यालयको सामान्य शुल्क (रु ५,०००), ३४ र ६६ पृष्ठको राहदानी शुल्कको पूर्ण विवरण।',
    category: 'Citizen Services',
    publishedDate: '2026-09-23',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Check e-Passport Fees & Delivery Timelines',
      href: '/passport-fee',
      iconText: 'FileText',
    },
    keywords: ['passport fee nepal', 'epassport online application nepal', 'fast track passport tripureshwor fee', 'passport renewal cost nepal'],
    content: {
      intro: 'The Department of Passports (DoP) under the Ministry of Foreign Affairs issues electronic biometric passports (e-Passports) equipped with microchips storing biographical data and facial biometrics. Understanding official fee tiers, processing locations, and emergency delivery timelines helps applicants plan international travel.',
      keyTakeaways: [
        'Normal 34-page passport issued through District Administration Offices (DAO) costs NPR 5,000.',
        'Emergency fast-track passport issued directly from Department of Passports (Tripureshwor, Kathmandu) costs NPR 12,000.',
        'Frequent business travelers can select the 66-page passport booklet at NPR 10,000 (District) or NPR 20,000 (Department).',
        'National Identity Card Number (NIN) is mandatory for all adult applicants applying within Nepal.'
      ],
      sections: [
        {
          heading: 'Official Government e-Passport Fee Slabs',
          body: 'Fees vary based on issuing authority and processing speed:',
          table: {
            headers: ['Application Location', 'Booklet Size', 'Processing Timeline', 'Official Government Fee'],
            rows: [
              ['District Administration Office (DAO)', '34 Pages', '15 to 25 Days', 'NPR 5,000'],
              ['District Administration Office (DAO)', '66 Pages', '15 to 25 Days', 'NPR 10,000'],
              ['Department of Passports (DoP Kathmandu)', '34 Pages', '2 to 3 Working Days', 'NPR 12,000'],
              ['Department of Passports (DoP Kathmandu)', '66 Pages', '2 to 3 Working Days', 'NPR 20,000'],
              ['Lost / Damaged Replacement (DAO)', '34 Pages', 'Standard District Time', 'NPR 10,000'],
              ['Lost / Damaged Replacement (DoP)', '34 Pages', 'Fast-Track', 'NPR 17,000'],
            ]
          },
          tip: 'Book your online enrollment appointment slots early in the morning when the Department releases daily biometric booking quotas.'
        },
        {
          heading: 'Document Checklist for e-Passport Enrollment',
          body: 'Applicants must present their original National Identity Card (or verified NIN printout), original citizenship certificate, previous passport (for renewal applicants), and marriage certificate if surname updates are required.',
        }
      ],
      conclusion: 'Reviewing fee schedules and requirements avoids unexpected trips to administrative counters. Verify passport fees and processing schedules with our Nepal e-Passport Calculator.'
    }
  },
  {
    slug: 'nepal-citizenship-16-year-eligibility-date-calculation',
    title: 'Nepal Citizenship 16-Year Age Eligibility: Exact BS Date Calculation & Ward Rules',
    titleNep: 'नेपाली नागरिकता १६ वर्षे उमेर योग्यता: वि.सं. मिति हिसाब र वडा सिफारिस',
    excerpt: 'Step-by-step guide to calculating 16-year age eligibility under the Nepal Citizenship Act 2063, Vikram Samvat leap year calculations, ward recommendation letters, and required documents.',
    excerptNep: 'नेपाल नागरिकता ऐन २०६३ बमोजिम ठ्याक्कै १६ वर्ष पुग्ने विक्रम संवत् मिति निकाल्ने तरिका, जन्मदर्ता, बाबुआमाको नागरिकता र वडा मुचुल्का प्रक्रिया।',
    category: 'Citizen Services',
    publishedDate: '2026-09-19',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate 16-Year Citizenship Eligibility Date',
      href: '/citizenship-age',
      iconText: 'ShieldCheck',
    },
    keywords: ['citizenship age eligibility nepal', 'nagrikta banaune umer calculator', '16 barsa nagrikta date calculator', 'nepal citizenship ward recommendation'],
    content: {
      intro: 'Article 10 of the Constitution of Nepal and the Nepal Citizenship Act 2063 specify that every Nepali citizen who has completed the age of 16 years is entitled to obtain a certificate of Nepali citizenship by descent. District Administration Offices (DAO) calculate age strictly down to the day using official Vikram Samvat dates.',
      keyTakeaways: [
        'An applicant must complete 16 full years according to the Vikram Samvat calendar before applying.',
        'Birth certificates issued by the local Ward Registrar serve as primary proof of birthdate and parentage.',
        'Both parents citizenship certificates (or legal death certificates where applicable) must accompany the file.',
        'Ward recommendation letters must include verified photograph stamps and physical witness signatures.'
      ],
      sections: [
        {
          heading: 'Determining Exact 16-Year Eligibility Date',
          body: 'Because Vikram Samvat months vary between 29 to 32 days annually, accurate age verification adds 16 years directly to the birth year while matching the exact month and day:',
          table: {
            headers: ['Birthdate in Bikram Sambat', 'Exact 16-Year Completion Date', 'Eligibility Status at DAO'],
            rows: [
              ['2067 Ashad 15', '2083 Ashad 15', 'Eligible on or after 2083 Ashad 15'],
              ['2067 Kartik 28', '2083 Kartik 28', 'Eligible on or after 2083 Kartik 28'],
              ['2067 Chaitra 30', '2083 Chaitra 30', 'Eligible on or after 2083 Chaitra 30'],
              ['2068 Baisakh 01', '2084 Baisakh 01', 'Eligible on or after 2084 Baisakh 01'],
            ]
          },
          tip: 'District officials immediately reject applications submitted even one day prior to reaching the exact 16-year anniversary.'
        },
        {
          heading: 'Standard Ward Office Application Procedure',
          body: 'Visit your permanent home ward office with original parent citizenship certificates, your official birth registration certificate, three passport-sized photographs against a plain white background, and your school SEE registration card to secure the municipal recommendation stamp.',
        }
      ],
      conclusion: 'Validating your birthdate avoids unnecessary administrative rejections. Compute your exact 16-year eligibility date using our Citizenship Age Calculator.'
    }
  },
  {
    slug: 'loksewa-age-limit-calculation-male-female-rules',
    title: 'Loksewa Aayog Age Limit Rules: 35 Years for Men & 40 Years for Women',
    titleNep: 'लोकसेवा आयोग उमेर हद निर्देशिका: पुरुषलाई ३५ र महिलालाई ४० वर्षे नियम',
    excerpt: 'Complete guide to Public Service Commission (Loksewa Aayog) age qualification rules under the Civil Service Act, cutoff date calculations, and permanent employee exemptions.',
    excerptNep: 'लोकसेवा आयोगको विज्ञापनमा तोकिएको अन्तिम मितिसम्म पुरुष उम्मेदवारलाई ३५ वर्ष र महिला तथा अपाङ्गता भएका व्यक्तिलाई ४० वर्ष उमेर हिसाब गर्ने तरिका।',
    category: 'Citizen Services',
    publishedDate: '2026-09-14',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Loksewa Age Eligibility',
      href: '/loksewa-age',
      iconText: 'GraduationCap',
    },
    keywords: ['loksewa age limit calculator nepal', 'loksewa candidate age eligibility date', 'loksewa 35 barsa male 40 barsa female', 'kharidar subba officer age limit'],
    content: {
      intro: 'The Public Service Commission (Loksewa Aayog) enforces statutory age caps for candidates applying for civil service positions, including Kharidar, Nayab Subba, and Section Officer. Under Section 10 of the Civil Service Act 2049, eligibility depends on the applicants exact age on the final application deadline.',
      keyTakeaways: [
        'Male non-disabled candidates must be between 18 and 35 years of age on the final application date.',
        'Female candidates and candidates with certified disabilities qualify up to 40 years of age.',
        'Technical engineering, healthcare, and judicial services permit entrance up to 40 years across specific gazetted tiers.',
        'Existing permanent civil servants face no upper age restriction when competing in open competitive examinations.'
      ],
      sections: [
        {
          heading: 'Loksewa Age Limit Slabs by Candidate Category',
          body: 'Statutory age limits depend on the specific position tier and candidate demographic profile:',
          table: {
            headers: ['Civil Service Position', 'Minimum Age', 'Max Age (Male)', 'Max Age (Female / Disabled)'],
            rows: [
              ['Kharidar (Non-Gazetted 2nd Class)', '18 Years', '35 Years', '40 Years'],
              ['Nayab Subba (Non-Gazetted 1st Class)', '18 Years', '35 Years', '40 Years'],
              ['Section Officer (Gazetted 3rd Class)', '21 Years', '35 Years', '40 Years'],
              ['Health Services (Staff Nurse / MO)', '21 Years', '40 Years', '40 Years'],
              ['Permanent Government Employees', '18 Years', 'No Upper Limit', 'No Upper Limit'],
            ]
          },
          tip: 'The double-fee extension period does not extend the age eligibility cutoff date; age is judged on the single-fee deadline.'
        },
        {
          heading: 'How Age Is Measured on Application Deadlines',
          body: 'Loksewa evaluates age down to the exact day. If a male applicant was born on 2048 Poush 10, and the job application advertisement states a single-fee deadline of 2083 Poush 10, the applicant reaches exactly 35 years and 0 days, qualifying for examination registration.',
        }
      ],
      conclusion: 'Verifying eligibility avoids disqualified examination filings. Compute your exact eligibility using our Loksewa Age Limit Calculator.'
    }
  },
  {
    slug: 'nepal-customs-duty-tia-airport-baggage-allowance-rules',
    title: 'Nepal Airport Customs Duty & Baggage Allowance: Gold, Phones & Electronics Rules',
    titleNep: 'नेपाल भन्सार महसुल तथा विमानस्थल ब्यागेज नियम: सुन, मोबाइल र ल्यापटप छुट',
    excerpt: 'Official Department of Customs passenger baggage allowance guidelines at Tribhuvan International Airport (TIA): gold jewelry limits, mobile phone MDMS clearance, and electronic device exemptions.',
    excerptNep: 'विदेशबाट नेपाल आउँदा ल्याउन पाइने सुनका गहना (महिला ५० ग्राम / पुरुष २५ ग्राम), थप मोबाइल फोनमा लाग्ने भन्सार महसुल र ल्यापटपको नियम।',
    category: 'Citizen Services',
    publishedDate: '2026-09-11',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Nepal Customs Duty & Baggage Limits',
      href: '/customs',
      iconText: 'Package',
    },
    keywords: ['nepal customs baggage allowance calculator', 'gold customs duty airport nepal', 'mobile phone customs tax nepal tia', 'mdms registration foreign phone'],
    content: {
      intro: 'Passengers arriving at Tribhuvan International Airport (TIA) or land border customs checkpoints must comply with Passenger Baggage Rules published by the Department of Customs under the Customs Act 2064. Bringing precious metals, consumer electronics, or foreign alcoholic beverages beyond statutory exemptions attracts customs duties and confiscation risks.',
      keyTakeaways: [
        'Female travelers can bring up to 50 grams of gold jewelry duty-free; male travelers can bring up to 25 grams duty-free.',
        'Gold bullion (bars or biscuits) is completely prohibited in passenger baggage and is confiscated upon detection.',
        'Returning labor migrants holding continuous 6-month foreign employment permits can bring one additional used mobile phone duty-free.',
        'Travelers can import up to 1 liter of alcoholic liquor or 12 beer cans duty-free in checked baggage.'
      ],
      sections: [
        {
          heading: 'Gold Jewelry Allowance and Excess Duty Rates',
          body: 'The Department of Customs establishes tiered tariffs for gold jewelry imported beyond duty-free limits:',
          table: {
            headers: ['Gold Jewelry Weight', 'Import Condition', 'Customs Duty Status'],
            rows: [
              ['Up to 50 Grams (Female) / 25 Grams (Male)', 'Personal Ornaments', '100% Duty-Free Exemption'],
              ['Next 100 Grams (Above Free Limit)', 'Declared at Customs', 'Flat Customs Tariff Paid at Counter'],
              ['Next 100 Grams (Above 200 Grams)', 'Declared at Customs', 'Higher Statutory Commercial Surcharge'],
              ['Gold Bars, Biscuits, or Coins', 'Any Weight', 'Strictly Prohibited & Seized'],
            ]
          },
          tip: 'Retain showroom purchase invoices and tax receipts from abroad to support declaration procedures at the TIA Red Channel.'
        },
        {
          heading: 'Mobile Phone and Laptop Import Regulations',
          body: 'Every traveler can bring one personal mobile phone and one portable laptop duty-free. Under Nepal Telecommunications Authority (NTA) MDMS regulations, secondary imported smartphones must be declared at customs counters to secure official tax payment receipts for network registration.',
        }
      ],
      conclusion: 'Understanding customs regulations ensures hassle-free transit through airport terminals. Calculate your import duties using our Nepal Customs Duty and Baggage Calculator.'
    }
  },
  {
    slug: 'baideshik-rojgar-cost-loan-remittance-regulations-nepal',
    title: 'Baideshik Rojgar in Nepal: Free Visa Free Ticket Rules, Loans & Remittance',
    titleNep: 'वैदेशिक रोजगार निर्देशिका: फ्री भिसा फ्री टिकट, बैंकिङ कर्जा र विप्रेषण नियम',
    excerpt: 'Detailed guide to Department of Foreign Employment (DoFE) labor permits (Shram Swikriti), the Free Visa Free Ticket policy, foreign employment welfare funds, and remittance incentives.',
    excerptNep: 'वैदेशिक रोजगार विभागको श्रम स्वीकृति, फ्रि भिसा फ्रि टिकटको सरकारी नियम, म्यानपावर सेवा शुल्क र बैंक रेमिट्यान्समा पाइने १% थप ब्याज।',
    category: 'Citizen Services',
    publishedDate: '2026-09-08',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Foreign Employment Costs & Loan EMIs',
      href: '/foreign-employment',
      iconText: 'Plane',
    },
    keywords: ['baideshik rojgar calculator nepal', 'free visa free ticket rules nepal', 'foreign employment loan nepal', 'remittance savings account interest nepal'],
    content: {
      intro: 'Securing legal overseas employment requires compliance with Department of Foreign Employment (DoFE) regulations under the Foreign Employment Act 2064. From obtaining labor permits (Shram Swikriti) and mandatory term life insurance to utilizing commercial bank remittance channels, understanding statutory protections protects migrant workers.',
      keyTakeaways: [
        'The Free Visa Free Ticket policy for Gulf nations and Malaysia caps manpower recruitment service fees at NPR 10,000.',
        'Mandatory Foreign Employment Welfare Fund contribution is NPR 1,500 (up to 3-year visa) or NPR 2,500 (above 3 years).',
        'Term life insurance coverage of at least NPR 14 Lakhs is mandatory prior to biometric labor permit issuance.',
        'Commercial banks in Nepal provide a mandatory 1% additional interest rate premium on remittance savings deposits.'
      ],
      sections: [
        {
          heading: 'Statutory Costs for Foreign Employment Clearance',
          body: 'Official government requirements establish uniform fees for labor clearance:',
          table: {
            headers: ['Expense Category', 'Receiving Agency', 'Regulated Fee (NPR)'],
            rows: [
              ['Foreign Employment Welfare Fund', 'FESB Board', 'NPR 1,500 (3 yrs) / NPR 2,500 (>3 yrs)'],
              ['Mandatory Term Life Insurance', 'Insurance Companies', 'NPR 3,500 - 8,000 (Based on age & tenure)'],
              ['Pre-Departure Medical Examination', 'Approved Medical Centers', 'NPR 6,500 - 8,500 (Standard screening)'],
              ['Pre-Departure Orientation Training', 'Certified Institutes', 'NPR 700'],
              ['Labor Permit (Shram Swikriti) Stamp', 'DoFE Online Portal', 'Government clearance record'],
            ]
          },
          tip: 'Remitting earnings through formal banking channels qualifies family members for the 10% IPO quota reservation in Nepal equity issues.'
        },
        {
          heading: 'Remittance Banking Incentives in Nepal',
          body: 'Nepal Rastra Bank mandates that commercial banks offer an additional 1% interest rate on fixed and savings deposits funded through verified foreign exchange remittances. Furthermore, formal remittance receipts provide clean documentation for domestic real estate acquisitions.',
        }
      ],
      conclusion: 'Adhering to official foreign employment channels protects workers and supports long-term family wealth creation. Calculate recruitment budgets and remittance savings using our Foreign Employment Calculator.'
    }
  },
  {
    slug: 'nepal-post-ems-international-shipping-tariffs',
    title: 'Nepal Post & EMS International Shipping Rates: Parcel Tariffs & Customs Rules',
    titleNep: 'नेपाल हुलाक तथा एक्सप्रेस पार्सल (EMS) ढुवानी दर र अन्तर्राष्ट्रिय सेवा',
    excerpt: 'Complete tariff guide for Nepal Post domestic speed post and International Express Mail Service (EMS): parcel weight slabs, document courier fees, forbidden goods, and customs declarations.',
    excerptNep: 'गोश्वारा हुलाक कार्यालयको आन्तरिक चिठी दर, विदेशमा सामान पठाउँदा लाग्ने EMS पार्सल महसुल (अमेरिका, अस्ट्रेलिया, युरोप) र भन्सार नियम।',
    category: 'Citizen Services',
    publishedDate: '2026-09-05',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Nepal Post & EMS Shipping Rates',
      href: '/postal-shipping',
      iconText: 'Truck',
    },
    keywords: ['nepal post shipping rate calculator', 'ems postage rates nepal', 'international parcel cost nepal to usa', 'general post office kathmandu tariff'],
    content: {
      intro: 'Sending parcels, commercial samples, academic transcripts, and personal gifts domestically and internationally through the General Post Office (GPO Sundhara) and Nepal Post offers economical logistics alternatives compared to private commercial express carriers. Understanding weight slabs, Express Mail Service (EMS) priority handling, and airmail tariffs ensures timely package delivery.',
      keyTakeaways: [
        'Domestic letter postage starts at nominal government rates for standard correspondence up to 20 grams.',
        'International Express Mail Service (EMS) delivers parcels to over 190 countries with end-to-end postal tracking.',
        'EMS shipping tariffs are calculated on initial 500-gram base weights, with incremental charges per additional 500 grams.',
        'Precious metals, raw currency, flammable materials, and perishable food products are prohibited from postal consignments.'
      ],
      sections: [
        {
          heading: 'International EMS Parcel Shipping Rates by Destination Zone',
          body: 'Postal tariffs correspond to geographic flight zones established by the Universal Postal Union (UPU):',
          table: {
            headers: ['Destination Country Zone', 'First 500 Grams (NPR)', 'Each Additional 500 Grams (NPR)'],
            rows: [
              ['Zone A (India, Bangladesh, SAARC)', 'NPR 1,200', 'NPR 400'],
              ['Zone B (Gulf Countries, Malaysia, Singapore)', 'NPR 1,800', 'NPR 600'],
              ['Zone C (Europe, UK, Australia, Japan)', 'NPR 2,600', 'NPR 900'],
              ['Zone D (United States, Canada, South America)', 'NPR 3,200', 'NPR 1,100'],
            ]
          },
          tip: 'Complete the CN22 / CN23 customs declaration declaration form accurately to prevent package detention at foreign destination ports.'
        },
        {
          heading: 'Packaging and Security Guidelines',
          body: 'All international consignments undergo mandatory security screening at the Central Foreign Post Office in Kathmandu. Senders must keep cartons unsealed until preliminary physical counter inspection concludes, after which postal workers apply official tamper-evident security tape.',
        }
      ],
      conclusion: 'Reliable postal logistics keep domestic businesses and diaspora families connected worldwide. Calculate domestic and overseas shipping tariffs with our Nepal Post and EMS Calculator.'
    }
  }
];
