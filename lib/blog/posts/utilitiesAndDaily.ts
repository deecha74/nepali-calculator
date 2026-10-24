import { BlogPost } from '../types';

export const utilitiesAndDailyPosts: BlogPost[] = [
  {
    slug: 'preeti-to-unicode-converter-nepal-guide',
    title: 'Preeti to Unicode in Nepal: Why Unicode is Essential for Official & Online Documents',
    titleNep: 'प्रिती टु युनिकोड: सरकारी कामकाज र डिजिटल दस्ताबेजमा युनिकोडको महत्त्व',
    excerpt: 'Understand the transition from legacy ASCII fonts (Preeti, Kantipur) to universal Nepali Unicode, how conversion works offline, and standard Loksewa typing requirements.',
    excerptNep: 'लेगेसी प्रिती फन्टबाट युनिकोड रूपान्तरण किन आवश्यक छ? सरकारी कार्यालय, लोकसेवा आयोग र अनलाइन फारामको नियमहरू।',
    category: 'Utilities & Daily',
    publishedDate: '2026-09-22',
    readTime: '4 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Convert Preeti to Unicode Instantly (Offline)',
      href: '/preeti',
      iconText: 'Type',
    },
    keywords: ['preeti to unicode converter', 'nepali unicode typing', 'offline preeti converter nepal', 'loksewa typing font'],
    content: {
      intro: 'For decades, Nepali publishing houses and government offices relied on legacy font mapping such as Preeti and Kantipur. In the modern era of web applications, mobile screens, database search, and e-governance portals, standardized Nepali Unicode is mandatory.',
      keyTakeaways: [
        'Preeti maps English keyboard characters to Devanagari shapes, making text unreadable without the specific font installed.',
        'Unicode is a global computing standard: text looks identical on smartphones, tablets, and computers without installing third-party fonts.',
        'Google, Facebook, and search engines index Unicode text, whereas legacy Preeti text cannot be indexed.',
        'Nepali Calc converts entire documents in your browser with zero network latency, ensuring confidentiality.'
      ],
      sections: [
        {
          heading: 'Why Government Portals Demand Unicode',
          body: 'Whether filing Inland Revenue Department (IRD) returns, submitting Loksewa candidate profiles, or applying for an e-Passport, modern databases store text in UTF-8 Unicode. Pasting legacy Preeti text into these systems produces unreadable gibberish.',
          tip: 'Our converter works client-side in Javascript, meaning sensitive legal letters and agreements remain confidential on your device.'
        }
      ],
      conclusion: 'Say goodbye to font-missing errors. Convert unlimited text between Preeti, Kantipur, and universal Nepali Unicode in a single click.'
    }
  },
  {
    slug: 'nepal-electricity-authority-nea-meter-tariff-bill-calculation',
    title: 'NEA Electricity Bill Calculation: Meter Amperes, Domestic Slabs & 2% Rebate',
    titleNep: 'नेपाल विद्युत प्राधिकरण (NEA) महसुल हिसाब: एम्पियर स्ल्याब र २% छुट नियम',
    excerpt: 'Complete guide to Nepal Electricity Authority (NEA) consumer billing tariffs: 5A, 15A, 30A, and 60A meter tiers, minimum monthly charges, unit consumption slabs, and early payment discounts.',
    excerptNep: 'विद्युत नियमन आयोगको नयाँ महसुल अनुसार बत्तीको बिल हिसाब गर्ने तरिका, न्यूनतम शुल्क, प्रतियुनिट दर र ७ दिनभित्र तिर्दा पाइने २% छुट।',
    category: 'Utilities & Daily',
    publishedDate: '2026-09-16',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate NEA Electricity Bill & Rebates',
      href: '/nea',
      iconText: 'Zap',
    },
    keywords: ['nea electricity bill calculator', 'nea meter reading slab rates', 'bijuli bill calculation nepal', 'nea bill rebate and fine'],
    content: {
      intro: 'The Electricity Regulatory Commission (ERC) and Nepal Electricity Authority (NEA) bill residential customers using progressive volumetric consumption blocks. Understanding minimum fixed charges, per-unit energy rates across 5A to 60A meter categories, and early payment rebates enables consumers to audit utility expenses accurately.',
      keyTakeaways: [
        'Consumption up to 20 units on a 5-Ampere meter incurs a nominal minimum fee of NPR 30.',
        'Higher consumption tiers (such as 101-250 units and 251-400 units) feature progressively higher marginal unit tariffs.',
        'Settling your bill within 7 days of meter reading grants a 2% rebate off the total energy charge.',
        'Delaying payment beyond 30 days triggers escalating late fines starting at 5% and reaching 25% after 60 days.'
      ],
      sections: [
        {
          heading: 'Domestic Single Phase (5-Ampere) Progressive Energy Slabs',
          body: 'NEA charges domestic households based on tiered monthly consumption thresholds:',
          table: {
            headers: ['Monthly Unit Bracket', 'Energy Rate per Unit (NPR)', 'Minimum Base Charge (NPR)'],
            rows: [
              ['0 to 20 Units', 'NPR 0.00 (Energy Free)', 'NPR 30.00 (Minimum Charge)'],
              ['21 to 30 Units', 'NPR 6.50 per unit', 'NPR 50.00'],
              ['31 to 50 Units', 'NPR 8.00 per unit', 'NPR 75.00'],
              ['51 to 100 Units', 'NPR 9.50 per unit', 'NPR 100.00'],
              ['101 to 250 Units', 'NPR 9.50 - 10.00 per unit', 'NPR 125.00'],
              ['251 to 400 Units', 'NPR 11.00 per unit', 'NPR 150.00'],
              ['Above 400 Units', 'NPR 12.00 per unit', 'NPR 175.00'],
            ]
          },
          tip: 'Paying online via mobile banking within 7 days of the meter readers visit saves 2% on your electricity charge.'
        },
        {
          heading: 'Late Payment Fine Schedule',
          body: 'Bills paid between the 8th and 15th day incur zero fine. Settling between the 16th and 30th day incurs a 5% penalty. Settling between the 31st and 40th day incurs a 10% penalty. Delaying beyond 40 days triggers a 25% surcharge, followed by supply disconnection procedures after 60 days.',
        }
      ],
      conclusion: 'Tracking monthly electricity usage protects household budgets and prevents disconnection surcharges. Compute your monthly energy bill and discount using our NEA Electricity Bill Calculator.'
    }
  },
  {
    slug: 'kukl-kathmandu-drinking-water-meter-bill-sewerage-charges',
    title: 'KUKL Kathmandu Water Bill Calculation: Metered Units, Pipe Size & 50% Sewerage',
    titleNep: 'काठमाडौं उपत्यका खानेपानी (KUKL) महसुल हिसाब: पाइप साइज र ढल शुल्क',
    excerpt: 'Complete tariff guide for Kathmandu Upatyaka Khanepani Limited (KUKL) residential water bills: half-inch pipe rates, minimum monthly consumption units, and 50% sewerage levies.',
    excerptNep: 'काठमाडौं, ललितपुर र भक्तपुरमा खानेपानीको न्यूनतम १०,००० लिटर महसुल (रु १००), थप प्रतिहजार लिटर दर र ५०% ढल निकास शुल्कको विवरण।',
    category: 'Utilities & Daily',
    publishedDate: '2026-09-13',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate KUKL Water Bill & Sewerage Surcharge',
      href: '/khanepani',
      iconText: 'Droplets',
    },
    keywords: ['kukl water bill calculator', 'kathmandu khanepani bill online', 'kukl meter tariff rates 2083', 'water sewerage charge nepal'],
    content: {
      intro: 'Kathmandu Upatyaka Khanepani Limited (KUKL) distributes municipal drinking water across Kathmandu, Lalitpur, and Bhaktapur. Billing depends on customer pipe connection diameter (typically half-inch for residences), recorded consumption liters, and a mandatory 50% sewerage maintenance levy.',
      keyTakeaways: [
        'Standard residential half-inch (0.5 inch) pipe connection has a monthly minimum charge of NPR 100 for up to 10,000 liters.',
        'Consumption beyond 10,000 liters incurs a progressive tariff of NPR 32 per additional 1,000 liters (1 Unit).',
        'A mandatory Sewerage Service Charge equal to 50% of the net water charge is added to every customer bill.',
        'Unmetered flat connections pay fixed monthly rates based on pipe diameter.'
      ],
      sections: [
        {
          heading: 'Residential Metered Water Tariff Structure (0.5 Inch Pipe)',
          body: 'KUKL measures municipal water in units where 1 unit equals 1,000 liters (1 cubic meter):',
          table: {
            headers: ['Monthly Water Consumption', 'Water Tariff (NPR)', 'Sewerage Charge (50%)', 'Total Monthly Bill (NPR)'],
            rows: [
              ['Up to 10,000 Liters (10 Units)', 'NPR 100 (Minimum Base)', 'NPR 50.00', 'NPR 150.00'],
              ['15,000 Liters (15 Units)', 'NPR 260.00', 'NPR 130.00', 'NPR 390.00'],
              ['20,000 Liters (20 Units)', 'NPR 420.00', 'NPR 210.00', 'NPR 630.00'],
              ['30,000 Liters (30 Units)', 'NPR 740.00', 'NPR 370.00', 'NPR 1,110.00'],
            ]
          },
          tip: 'Fixing dripping taps and float valve overflows in overhead tanks prevents crossing into higher commercial consumption tiers.'
        },
        {
          heading: 'Commercial and Larger Pipe Diameters',
          body: 'Commercial complexes, hotels, and hospitals utilizing 0.75-inch, 1.0-inch, or 2.0-inch main connections pay significantly higher minimum quotas and steeper volumetric energy charges reflecting intensive institutional demand.',
        }
      ],
      conclusion: 'Understanding utility billing structures helps urban households monitor conservation. Calculate your drinking water charges and sewerage fees using our KUKL Water Bill Calculator.'
    }
  },
  {
    slug: 'nepal-oil-corporation-fuel-cost-mileage-calculation',
    title: 'Fuel Mileage & Trip Cost Calculation in Nepal: NOC Petrol & Diesel Rates',
    titleNep: 'नेपालमा इन्धन खर्च तथा माइलेज हिसाब: पेट्रोल र डिजेल यात्रा लागत',
    excerpt: 'Learn how to calculate kilometer mileage (km/l), highway fuel consumption, round-trip commuting expenses, and Nepal Oil Corporation (NOC) automated fuel budgeting.',
    excerptNep: 'गाडी तथा मोटरसाइकलको वास्तविक माइलेज निकाल्ने सूत्र, काठमाडौंदेखि पोखरा/चितवन यात्रा इन्धन खर्च र नेपाल आयल निगमको खुद्रा मूल्य हिसाब।',
    category: 'Utilities & Daily',
    publishedDate: '2026-09-10',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Fuel Consumption & Trip Cost',
      href: '/fuel',
      iconText: 'Fuel',
    },
    keywords: ['fuel mileage calculator nepal', 'petrol cost per km nepal', 'trip fuel cost calculator', 'bike mileage calculation formula'],
    content: {
      intro: 'Fluctuations in retail petroleum rates determined by the Nepal Oil Corporation (NOC) under its automated pricing mechanism impact daily vehicle operating expenses. Accurately determining your vehicles kilometer-per-liter (km/l) fuel efficiency enables reliable road trip budgeting across highway corridors.',
      keyTakeaways: [
        'The tank-to-tank method provides the most accurate real-world measurement of vehicle fuel efficiency.',
        'Mileage equals total distance traveled (km) divided by total liters of fuel consumed to refill the tank.',
        'Fuel cost per kilometer equals prevailing fuel price per liter divided by your vehicles measured mileage.',
        'Aggressive acceleration and heavy Kathmandu traffic congestion lower fuel efficiency by 20% to 35% compared to open highways.'
      ],
      sections: [
        {
          heading: 'The Tank-to-Tank Mileage Measurement Method',
          body: 'To measure real-world vehicle fuel economy without guesswork:',
          table: {
            headers: ['Measurement Step', 'Procedure', 'Sample Calculation (Motorcycle)'],
            rows: [
              ['Step 1: Fill Tank', 'Fill fuel tank to auto-cut level', 'Record initial odometer: 12,400 km'],
              ['Step 2: Drive Normal', 'Drive daily routes until near empty', 'Record final odometer: 12,750 km'],
              ['Step 3: Refill Tank', 'Refill to same auto-cut level', 'Liters pumped: 8.5 Liters'],
              ['Step 4: Compute Mileage', 'Distance (350 km) / Liters (8.5 L)', '350 / 8.5 = 41.17 km per liter'],
              ['Step 5: Cost per KM', 'Petrol Price (NPR 170) / Mileage (41.17)', 'NPR 170 / 41.17 = NPR 4.13 per km'],
            ]
          },
          tip: 'Maintaining recommended tire air pressures preserves optimal rolling resistance, improving fuel mileage by up to 3 km per liter.'
        },
        {
          heading: 'Highway Travel Budgeting (Kathmandu to Pokhara)',
          body: 'For a 200 km highway journey in a petrol hatchback achieving 14 km/liter at NPR 170 per liter: Total Fuel Required = 200 / 14 = 14.28 Liters. One-way Fuel Expense = 14.28 * NPR 170 = approximately NPR 2,428. Round-trip fuel budget equals approximately NPR 4,856.',
        }
      ],
      conclusion: 'Monitoring vehicle fuel efficiency uncovers engine wear before costly mechanical breakdowns occur. Budget your daily commutes and holiday journeys with our Fuel Mileage and Trip Cost Calculator.'
    }
  },
  {
    slug: 'nepal-rastra-bank-nrb-forex-exchange-rates-spreads',
    title: 'Nepal Rastra Bank (NRB) Forex Rates: Buying vs Selling Spreads & INR Peg',
    titleNep: 'नेपाल राष्ट्र बैंक विदेशी मुद्रा विनिमय दर: खरिद-बिक्री र भारु स्थिर दर',
    excerpt: 'Comprehensive guide to official Nepal Rastra Bank foreign currency exchange rates: USD, AUD, EUR, GBP, QAR conversion spreads, and the statutory 1.60 INR currency peg.',
    excerptNep: 'राष्ट्र बैंकको दैनिक विदेशी विनिमय दर, बैंकको खरिद र बिक्री दरबीचको फरक, डलर विनिमय र १०० भारतीय रुपैयाँ बराबर १६० नेपाली रुपैयाँ स्थिर दर।',
    category: 'Utilities & Daily',
    publishedDate: '2026-09-07',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Convert Live NRB Forex Exchange Rates',
      href: '/forex',
      iconText: 'Coins',
    },
    keywords: ['forex rates nepal rastra bank', 'nrb exchange rate today', 'usd to npr live converter', 'indian rupee to npr fixed peg 1.60'],
    content: {
      intro: 'The Foreign Exchange Management Department of Nepal Rastra Bank (NRB) publishes benchmark foreign exchange rates every morning, governing currency conversions across commercial banks, money exchange counters, and international remittance agencies.',
      keyTakeaways: [
        'The Nepalese Rupee (NPR) is pegged to the Indian Rupee (INR) at a fixed statutory rate of 100 INR = 160 NPR.',
        'Banks purchase foreign currency from customers at the Buying Rate and sell foreign currency at the higher Selling Rate.',
        'The spread between buying and selling rates covers institutional exchange operational overhead.',
        'International money transfers (SWIFT, Western Union) reference daily NRB benchmark rates with small merchant spreads.'
      ],
      sections: [
        {
          heading: 'Understanding the Buying vs. Selling Rate Spread',
          body: 'Commercial transactions depend on whether you are selling foreign currency to a bank or purchasing foreign cash for international travel:',
          table: {
            headers: ['Customer Action', 'Applicable Banking Rate', 'Practical Scenario'],
            rows: [
              ['Receiving Remittance / Export Pay', 'Bank Buying Rate', 'Bank buys foreign currency from you and credits NPR to your account'],
              ['Traveling Abroad / Paying Tuition', 'Bank Selling Rate', 'You pay NPR to the bank to purchase foreign currency drafts or cash'],
              ['Forex Exchange Spread', 'Selling Rate minus Buying Rate', 'Commercial margin retained by the financial institution'],
              ['Indian Currency (INR) Exchange', 'Fixed Peg Rate (1.60)', 'NPR 160.00 for every INR 100.00 (plus 15 paisa bank clearing fee)'],
            ]
          },
          tip: 'Commercial money transfer companies often offer exchange rates close to the mid-market rate for verified family remittances.'
        },
        {
          heading: 'The Mechanics of the Indian Rupee Peg',
          body: 'Under the bilateral currency peg agreement maintained since 1993, the exchange rate between the Nepalese Rupee and Indian Rupee remains pegged at 1.60. Consequently, when the Indian Rupee fluctuates against the US Dollar or Euro on international markets, the Nepalese Rupee moves in direct alignment.',
        }
      ],
      conclusion: 'Tracking official exchange rates ensures fair conversion terms on international transactions. Convert currencies in real time using our NRB Forex Exchange Calculator.'
    }
  },
  {
    slug: 'inverter-ips-battery-backup-hours-calculation-nepal',
    title: 'Inverter & IPS Battery Backup Hours Calculation in Nepal: Watts, Ah & Sizing',
    titleNep: 'इन्भर्टर तथा ब्याट्री ब्याकअप हिसाब: एम्पियर-आवर (Ah), वाट र ब्याकअप समय',
    excerpt: 'Learn how to calculate inverter battery backup hours in Nepal: electrical appliance watt ratings, 12V tubular battery Ah sizing, inverter VA ratings, and power efficiency losses.',
    excerptNep: 'लोडसेडिङ र बिजुली जाँदा इन्भर्टर ब्याट्री कति घण्टा टिक्छ? फ्यान, बत्ती, टिभी र वाइफाइको वाट जोडेर उपयुक्त ब्याट्री छान्ने तरिका।',
    category: 'Utilities & Daily',
    publishedDate: '2026-09-04',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Inverter Battery Backup Hours & Size',
      href: '/battery-backup',
      iconText: 'BatteryCharging',
    },
    keywords: ['inverter battery backup calculator nepal', 'battery backup hours formula', 'ips battery sizing nepal', '150ah battery backup time'],
    content: {
      intro: 'Maintaining uninterrupted electrical power for Wi-Fi routers, LED lights, laptops, and televisions during grid power cuts requires a properly sized Inverter and Instant Power Supply (IPS) system. Sizing your tubular battery Ampere-Hour (Ah) capacity prevents premature battery drain.',
      keyTakeaways: [
        'Total electrical load is determined by summing the wattage of all simultaneous appliances.',
        'Battery backup formula: Backup Hours = (Battery Voltage * Battery Ah * Efficiency Factor) / Total Watt Load.',
        'Standard inverters operate at approximately 80% electrical efficiency due to DC-to-AC conversion loss.',
        'Tubular lead-acid batteries deliver longer cycle lifespans (3 to 5 years) compared to standard flat-plate automotive batteries.'
      ],
      sections: [
        {
          heading: 'Common Household Appliance Wattage Chart in Nepal',
          body: 'Summing electrical loads running simultaneously during a power outage:',
          table: {
            headers: ['Household Appliance', 'Typical Power Rating', 'Quantity in Use', 'Total Running Load (Watts)'],
            rows: [
              ['LED Light Bulb (9W)', '9 Watts', '4 Bulbs', '36 Watts'],
              ['Ceiling Fan', '75 Watts', '2 Fans', '150 Watts'],
              ['Wi-Fi Fiber Router & ONU', '15 Watts', '1 Set', '15 Watts'],
              ['32-inch LED Television', '50 Watts', '1 TV', '50 Watts'],
              ['Laptop Computer Charging', '65 Watts', '1 Laptop', '65 Watts'],
              ['Total Combined Load', 'Sum of All Devices', 'Typical Home Run', '316 Watts'],
            ]
          },
          tip: 'Avoid connecting heavy inductive heating elements such as electric geysers, irons, or rice cookers to residential inverters.'
        },
        {
          heading: 'Step-by-Step Battery Backup Hours Calculation',
          body: 'Consider a standard 12V 150Ah tubular battery running a 300-Watt load at 80% efficiency: Total Stored Energy = 12 Volts * 150 Ah = 1,800 Watt-hours. Usable Energy (with 0.8 efficiency) = 1,800 * 0.8 = 1,440 Watt-hours. Backup Time = 1,440 Watt-hours / 300 Watts = 4.8 Hours of continuous power.',
        }
      ],
      conclusion: 'Sizing your inverter setup accurately ensures dependable home emergency power. Calculate your exact backup time and recommended battery size using our Inverter Battery Backup Calculator.'
    }
  },
  {
    slug: 'nepal-krishi-fertilizer-dosage-urea-dap-potash-per-ropani',
    title: 'Nepal Krishi Fertilizer Guide: Urea, DAP & Potash Dosage Per Ropani & Bigha',
    titleNep: 'कृषि मलखाद सिफारिस मात्रा: धान, मकै र गहुँमा युरिया, डीएपी र पोटास हिसाब',
    excerpt: 'Official Nepal Agricultural Research Council (NARC) fertilizer dosage guidelines: exact kilogram requirements for Urea, DAP, and Potash per Ropani and Bigha for rice, maize, and potato crops.',
    excerptNep: 'नेपाल कृषि अनुसन्धान परिषद् (NARC) अनुसार प्रतिरोपनी र प्रतिविघा आवश्यक युरिया, डीएपी, पोटास र कम्पोस्ट मलको सही अनुपात।',
    category: 'Utilities & Daily',
    publishedDate: '2026-09-01',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Krishi Fertilizer Dosage per Ropani & Bigha',
      href: '/krishi-fertilizer',
      iconText: 'Sprout',
    },
    keywords: ['krishi mal calculator nepal', 'urea dap potash calculator per ropani', 'fertilizer recommendation nepal narc', 'dhan kheti fertilizer per bigha'],
    content: {
      intro: 'Balanced fertilization based on soil science recommendations from the Nepal Agricultural Research Council (NARC) maximizes agricultural crop yields while preserving long-term soil health. Computing exact chemical fertilizer ratios of Nitrogen (Urea), Phosphorus (DAP), and Potassium (MOP / Potash) per Ropani or Bigha prevents nutrient waste.',
      keyTakeaways: [
        'DAP supplies both Phosphorus (46%) and initial Nitrogen (18%) during early basal root establishment.',
        'Urea supplies primary Nitrogen (46%) and should be applied in split top-dressings across crop vegetative stages.',
        'Muriate of Potash (MOP) supplies Potassium (60%), improving grain filling and drought resistance.',
        'Chemical fertilizer applications should be balanced with at least 500 kg to 1,000 kg of well-rotted organic compost per Ropani.'
      ],
      sections: [
        {
          heading: 'NARC Recommended Fertilizer Slabs for Paddy (Rice) per Ropani',
          body: 'Standard fertilizer guidelines for high-yielding irrigated paddy in the hilly valleys:',
          table: {
            headers: ['Fertilizer Type', 'Basal Application at Sowing', 'First Top Dressing (3 Weeks)', 'Second Top Dressing (Panicle Stage)'],
            rows: [
              ['DAP (18:46:0)', '5.5 kg (Full Dose at planting)', 'None', 'None'],
              ['MOP / Potash (0:0:60)', '3.5 kg (Full Dose at planting)', 'None', 'None'],
              ['Urea (46:0:0)', '2.0 kg (Basal Starter)', '4.0 kg (Tillering stage)', '4.0 kg (Panicle initiation)'],
              ['Organic Compost / Gobar Mal', '1,000 kg (During field ploughing)', 'None', 'None'],
            ]
          },
          tip: 'Apply urea top-dressing when the soil is moist, and avoid broadcasting immediately prior to heavy rains to prevent nutrient runoff.'
        },
        {
          heading: 'Converting Dosage from Ropani to Bigha Systems',
          body: 'One Bigha equals approximately 13.31 Ropani. When calculating commercial agricultural input budgets for Terai plots, multiply the standard per-Ropani kilogram requirement by 13.31 to determine bulk 50-kg sack procurement needs.',
        }
      ],
      conclusion: 'Scientific nutrient application lowers input expenses and improves harvest quality. Compute your seasonal crop fertilizer needs using our Krishi Fertilizer Calculator.'
    }
  },
  {
    slug: 'traditional-nepali-weight-volume-muri-pathi-mana-dharni',
    title: 'Traditional Nepali Weight & Volume Units: Muri, Pathi, Mana & Dharni to KG',
    titleNep: 'परम्परागत नेपाली नापतौल: मुरी, पाथी, माना, धार्नी र पाउलाई केजीमा रूपान्तरण',
    excerpt: 'Complete conversion guide for ancient Nepali volumetric and weight measures: Dharni, Sher, Pao to Kilograms, and volumetric grain units Muri, Pathi, Mana, Muthi to Liters and KG.',
    excerptNep: 'गाउँघरमा धान, मकै, चामल नाप्ने माना-पाथी-मुरी र घ्यू, मासु, आलु जोख्ने धार्नी-शेर-पाउको आधुनिक मेट्रिक प्रणाली (केजी र लिटर) हिसाब।',
    category: 'Utilities & Daily',
    publishedDate: '2026-08-28',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Convert Traditional Nepali Units to KG & Liters',
      href: '/traditional-units',
      iconText: 'Scale',
    },
    keywords: ['traditional nepali units converter', 'muri to kg nepal', '1 pathi how many kg', 'mana pathi dharni sher to kg'],
    content: {
      intro: 'Before the adoption of the international metric system, commercial trade and agricultural harvests across Nepal relied on traditional measurement systems. Volume units (Mana, Pathi, Muri) measured agricultural grains, while mass units (Dharni, Sher, Pao) measured solid produce such as potatoes, clarified butter (Ghyu), and metals.',
      keyTakeaways: [
        '1 Dharni equals 2.332 Kilograms (or approximately 2.4 kg in local bazaar trade).',
        '1 Sher equals 933 grams, and 1 Pao equals approximately 194 to 200 grams.',
        '1 Muri equals 20 Pathi, and 1 Pathi equals 8 Mana (totaling 160 Mana in 1 Muri).',
        'Volumetric grain weight varies by crop density: 1 Pathi of milled rice weighs approximately 3.6 kg to 3.8 kg, while 1 Pathi of unhusked paddy weighs approximately 2.4 kg to 2.6 kg.'
      ],
      sections: [
        {
          heading: 'Traditional Weight Units (Dharni Hierarchy)',
          body: 'Used across traditional Newar and hilly bazaar trade for weighing solid commodities:',
          table: {
            headers: ['Traditional Mass Unit', 'Sub-unit Equivalent', 'Metric Kilogram Equivalent', 'Metric Gram Equivalent'],
            rows: [
              ['1 Dharni (धार्नी)', '2.5 Sher / 12 Pao', '2.3328 kg', '2,332.8 grams'],
              ['1 Sher (शेर)', '4.8 Pao', '0.9331 kg', '933.1 grams'],
              ['1 Biswa (बिस्वा)', '2 Pao', '0.3888 kg', '388.8 grams'],
              ['1 Pao (पाउ)', '4 Chhatak', '0.1944 kg', '194.4 grams'],
              ['1 Chhatak (छटाक)', 'Base Unit', '0.0486 kg', '48.6 grams'],
            ]
          },
          tip: 'In modern Kathmandu vegetable markets, vendors colloquially round 1 Dharni to 2.5 kg or 1 Pao to 200 grams for quick cash calculations.'
        },
        {
          heading: 'Traditional Grain Volume Units (Muri Hierarchy)',
          body: 'Grains were measured using standardized brass or wooden cylindrical containers: 1 Muthi (fistful) * 8 = 1 Mana. 1 Mana * 8 = 1 Pathi (approximately 4.54 liters of liquid volume). 1 Pathi * 20 = 1 Muri. In agricultural land deeds, crop yields were historically recorded in Muris of paddy produce.',
        }
      ],
      conclusion: 'Bridging heritage measurements with modern metric scales preserves clarity in land inheritance and family trade. Convert traditional units instantly with our Nepali Units Converter.'
    }
  },
  {
    slug: 'nepali-cheque-writing-rupiya-paisa-number-to-words-rules',
    title: 'How to Write Bank Cheques in Nepal: Number-to-Words Rules & Avoid Returns',
    titleNep: 'नेपाली बैंक चेक लेख्ने सही तरिका: अंकलाई अक्षरमा लेख्ने नियम र गल्तीहरू',
    excerpt: 'Comprehensive banking guide to writing account payee cheques in Nepal: spelling numbers in English and Nepali words, paisa handling, clearing rules, and preventing cheque bounce fines.',
    excerptNep: 'बैंक चेक काट्दा रकम अंक र अक्षरमा लेख्ने नियम, नेपाली रुपैयाँ र पैसाको सही हिज्जे, एकाउन्ट पेयी (Account Payee) र बाउन्स हुनबाट जोगिने उपाय।',
    category: 'Utilities & Daily',
    publishedDate: '2026-08-25',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Convert Cheque Numbers to Words Instantly',
      href: '/number-to-words',
      iconText: 'Type',
    },
    keywords: ['cheque number to words nepali', 'how to write cheque in nepal', 'nepali amount in words online', 'cheque bounce law nepal'],
    content: {
      intro: 'Writing a bank cheque in Nepal requires absolute consistency between the numeric figure in the amount box and the handwritten text on the amount line. Under Nepal Clearing House Limited (NCHL) Electronic Cheque Clearing (ECC) guidelines, any spelling discrepancy, overwriting, or missing word suffix results in immediate clearing rejection.',
      keyTakeaways: [
        'The written text amount takes legal precedence over the numeric figure under the Negotiable Instruments Act 2034.',
        'Always terminate the words line with the word "Only" (or "मात्र" in Nepali) to prevent fraudulent additions.',
        'Crossing the top-left corner with two parallel lines and writing "Account Payee Only" ensures funds credit solely to the payees bank account.',
        'Issuing a cheque without sufficient account balance attracts criminal prosecution under the Banking Offence and Punishment Act 2064.'
      ],
      sections: [
        {
          heading: 'Numeric to Words Conversion Guidelines for Large Sums',
          body: 'Nepal follows the South Asian numbering system (Lakhs and Crores) rather than Western millions and billions:',
          table: {
            headers: ['Numeric Figure (NPR)', 'Correct English Words Format', 'Correct Nepali Words Format'],
            rows: [
              ['NPR 1,25,000.00', 'One Lakh Twenty-Five Thousand Rupees Only', 'एक लाख पच्चीस हजार रुपैयाँ मात्र'],
              ['NPR 5,50,450.00', 'Five Lakh Fifty Thousand Four Hundred Fifty Rupees Only', 'पाँच लाख पचास हजार चार सय पचास रुपैयाँ मात्र'],
              ['NPR 12,80,000.50', 'Twelve Lakh Eighty Thousand Rupees and Fifty Paisa Only', 'बाह्र लाख असी हजार रुपैयाँ पचास पैसा मात्र'],
              ['NPR 1,00,00,000.00', 'One Crore Rupees Only', 'एक करोड रुपैयाँ मात्र'],
            ]
          },
          tip: 'Never leave blank space between the currency symbol and your first digit in the numeric box.'
        },
        {
          heading: 'Legal Consequences of Dishonored Cheques',
          body: 'If a cheque bounces due to insufficient funds, the beneficiary issues a formal notice. Under Section 107 of the Negotiable Instruments Act, continued non-payment within 30 days permits filing a commercial court case, punishable by up to 3 months imprisonment and blacklisting by the Credit Information Bureau (CIB).',
        }
      ],
      conclusion: 'Accurate cheque drafting maintains banking credibility and financial safety. Convert financial figures into verified words using our Cheque Number to Words Converter.'
    }
  },
  {
    slug: 'nepal-qr-code-fonepay-esewa-merchant-standee-standards',
    title: 'Nepal QR Code Standards: Fonepay, eSewa & NepalPay Merchant Standee Guide',
    titleNep: 'नेपाल क्यूआर कोड (QR) निर्देशिका: फोनपे, इसेवा र नेपालपे स्ट्यान्डी नियम',
    excerpt: 'Complete guide to Nepal Rastra Bank (NRB) unified NepalQR specifications: EMVCo standards, dynamic vs static merchant QR codes, transaction fee limits, and printable counter standees.',
    excerptNep: 'नेपाल राष्ट्र बैंकको एकीकृत नेपाल-क्यूआर (NepalQR) मापदण्ड, व्यापारीका लागि फोनपे, इसेवा, नेपालपे क्युआर स्ट्यान्डी बनाउने र कारोबार सीमा।',
    category: 'Utilities & Daily',
    publishedDate: '2026-08-22',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Generate Printable Merchant QR Sticker & Standee',
      href: '/qr-generator',
      iconText: 'QrCode',
    },
    keywords: ['qr code generator nepal', 'fonepay qr standee print', 'esewa qr merchant code generator', 'nepalqr interoperability nrb'],
    content: {
      intro: 'Digital payments across retail shops, restaurants, and medical clinics in Nepal operate under the National Payment Switch and Unified NepalQR standards regulated by Nepal Rastra Bank. Merchant counter standees utilizing EMVCo standardized QR codes permit instant interoperable scanning across mobile banking apps, Fonepay, eSewa, and Khalti.',
      keyTakeaways: [
        'NepalQR follows global EMVCo specifications, enabling multi-wallet scanning from a single counter sticker.',
        'Static QR codes display fixed merchant credentials, requiring customers to type the payable amount manually.',
        'Dynamic QR codes generated by billing POS software encode the exact payable invoice sum into the image.',
        'Retail peer-to-merchant (P2M) QR transactions are free of surcharge for consumers.'
      ],
      sections: [
        {
          heading: 'Static vs. Dynamic QR Code Capabilities',
          body: 'Merchants deploy QR technology based on checkout counter transaction volume:',
          table: {
            headers: ['Feature', 'Static Merchant QR Code', 'Dynamic Merchant QR Code'],
            rows: [
              ['Amount Entry', 'Customer inputs amount on phone', 'Pre-encoded automatically from POS register'],
              ['Printing Requirement', 'Printed once on physical acrylic standee', 'Rendered digitally on customer-facing display'],
              ['Bill Reconciliation', 'Requires customer to show phone confirmation', 'Automatic real-time API ledger clearance'],
              ['Target Business', 'Kirana stores, cafes, pharmacies, salons', 'Supermarkets, departmental stores, hotels'],
            ]
          },
          tip: 'Ensure your counter standee includes a high-contrast quiet margin (white border) to allow instant camera focus in dim showroom lighting.'
        },
        {
          heading: 'NRB Daily Transaction Limits on QR Payments',
          body: 'To balance convenience with anti-fraud safeguards, Nepal Rastra Bank establishes daily personal QR spending limits across mobile banking apps: individual users can transact up to NPR 1,00,000 per day and NPR 10,00,000 per month without commercial transaction charges.',
        }
      ],
      conclusion: 'Professional digital payment standees build retail customer trust and speed checkout queues. Generate high-resolution printable merchant QR standees with our Nepal QR Code Generator.'
    }
  },
  {
    slug: 'bikram-sambat-to-ad-nepali-calendar-conversion-math',
    title: 'Bikram Sambat (BS) to Gregorian (AD) Date Conversion: Astronomical Math & Rules',
    titleNep: 'विक्रम संवत् (BS) र इस्वी संवत् (AD) मिति रूपान्तरण: गणितीय नियम र इतिहास',
    excerpt: 'Understand how the Bikram Sambat lunar-solar calendar operates: 56.7 year difference with Gregorian AD, variable month lengths (29 to 32 days), leap years, and algorithmic conversion math.',
    excerptNep: 'नेपाली पात्रो विक्रम संवत् र अंग्रेजी तारिख बीचको ५६ वर्ष ८ महिनाको फरक, महिनाका दिनहरू घटबढ हुने खगोलीय कारण र मिति रूपान्तरण सूत्र।',
    category: 'Utilities & Daily',
    publishedDate: '2026-08-19',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Convert Bikram Sambat (BS) ⇄ Gregorian (AD) Dates',
      href: '/date',
      iconText: 'Calendar',
    },
    keywords: ['date converter bs to ad', 'nepali date to english date converter', 'bikram sambat calendar history', 'exact age calculator bs'],
    content: {
      intro: 'The Bikram Sambat (BS) calendar serves as the official national and legal calendar of Nepal, governing government gazettes, contracts, court filings, and educational admissions. Because Bikram Sambat is a sidereal solar calendar while the Gregorian (AD) calendar is tropical, converting dates requires precise astronomical ephemeris tables rather than a simple static offset.',
      keyTakeaways: [
        'Bikram Sambat is approximately 56 years, 8 months, and 17 days ahead of the Western Gregorian calendar.',
        'Unlike Gregorian months with fixed standard lengths, BS months fluctuate between 29 to 32 days annually.',
        'The Nepali New Year (Baisakh 1) consistently corresponds to April 13 or April 14 in the Gregorian calendar.',
        'Accurate conversion uses an epoch lookup table recording the exact day counts of each historical Nepali month.'
      ],
      sections: [
        {
          heading: 'Why Bikram Sambat Month Lengths Fluctuate',
          body: 'Gregorian months have arbitrary fixed lengths (30 or 31 days). In contrast, Bikram Sambat months correspond directly to the astronomical transit of the Sun through the twelve zodiac constellations (Sankranti). Because the Earth travels in an elliptical orbit around the Sun, the Earth moves faster at perihelion during winter months (resulting in 29-day months like Poush) and slower at aphelion during summer (resulting in 31 or 32-day months like Ashad and Shrawan).',
          table: {
            headers: ['Nepali Month', 'Zodiac Transit (Sankranti)', 'Typical Month Length Range', 'Corresponding Gregorian Window'],
            rows: [
              ['Baisakh (बैशाख)', 'Mesha (Aries)', '30 to 31 Days', 'Mid-April to Mid-May'],
              ['Jestha (जेठ)', 'Vrishabha (Taurus)', '31 to 32 Days', 'Mid-May to Mid-June'],
              ['Ashad (असार)', 'Mithuna (Gemini)', '31 to 32 Days', 'Mid-June to Mid-July'],
              ['Shrawan (साउन)', 'Karka (Cancer)', '31 to 32 Days', 'Mid-July to Mid-August'],
              ['Poush (पुस)', 'Dhanu (Sagittarius)', '29 to 30 Days', 'Mid-December to Mid-January'],
              ['Chaitra (चैत)', 'Meena (Pisces)', '30 to 31 Days', 'Mid-March to Mid-April'],
            ]
          },
          tip: 'When filling legal land contracts or passport applications, verify that your English birthdate aligns with your official citizenship record.'
        },
        {
          heading: 'Exact Age Calculation in Vikram Samvat',
          body: 'Calculating age in BS requires subtracting your birth year, month, and day from the current Nepali date. If current days are fewer than birth days, borrow days from the preceding Nepali month (taking its exact historical day count of 29, 30, 31, or 32 days) rather than assuming a static 30 days.',
        }
      ],
      conclusion: 'Mastering date conversion ensures administrative accuracy across citizenship, visa, and banking documents. Convert historical dates and determine your exact age using our Nepali Date Converter.'
    }
  },
  {
    slug: 'nepal-patro-bikram-sambat-public-holidays-calendar-system',
    title: 'Nepal Patro Calendar System: Tithi, Public Holidays & Festive Panchang Rules',
    titleNep: 'नेपाली पात्रो तथा पञ्चाङ्ग निर्देशिका: तिथि, चाडपर्व र सार्वजनिक बिदा प्रणाली',
    excerpt: 'Detailed guide to the official Nepal Government holiday calendar: Dashain, Tihar, Chhath date determination, the 15 lunar Tithi cycles (Shukla and Krishna Paksha), and Panchanga calculation.',
    excerptNep: 'नेपाल राजपत्रमा प्रकाशित हुने वार्षिक सार्वजनिक बिदा, तिथि घटबढ हुने खगोलीय कारण, एकादशी, पूर्णिमा र दशैं-तिहारका शुभ साइतको पूर्ण जानकारी।',
    category: 'Utilities & Daily',
    publishedDate: '2026-08-16',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'View Official Nepal Patro & Upcoming Holidays',
      href: '/calendar',
      iconText: 'CalendarDays',
    },
    keywords: ['nepali patro calendar 2083', 'public holidays nepal gazette', 'tithi calculation nepal panchang', 'dashain tihar holiday dates'],
    content: {
      intro: 'The official Nepal Patro published annually in the Nepal Gazette by the Ministry of Home Affairs combines the civic solar Bikram Sambat calendar with the traditional lunar Panchang. Religious festivals such as Dashain, Tihar, Buddha Jayanti, and Maha Shivaratri are determined by lunar Tithis, explaining why festive dates shift on the solar calendar each year.',
      keyTakeaways: [
        'A lunar month consists of 30 Tithis divided into Shukla Paksha (waxing bright half) and Krishna Paksha (waning dark half).',
        'Because a lunar day (Tithi) averages 23 hours and 37 minutes, a Tithi can skip or repeat across civil calendar sunrises.',
        'Major national public holidays include Dashain (5 continuous days) and Tihar (3 continuous days).',
        'Provincial governments declare up to 6 additional local public holidays tailored to regional cultural celebrations.'
      ],
      sections: [
        {
          heading: 'How Cultural Holidays Are Scheduled by Tithi',
          body: 'Major cultural holidays in Nepal follow precise lunar phase definitions:',
          table: {
            headers: ['Celebration / Festival', 'Governing Lunar Tithi', 'Seasonal Month Window', 'Typical Holiday Duration'],
            rows: [
              ['Ghatasthapana (घटस्थापना)', 'Ashwin Shukla Pratipada', 'September / October', '1 Day Public Holiday'],
              ['Vijaya Dashami (विजया दशमी)', 'Ashwin Shukla Dashami', 'October', '5 Continuous Days'],
              ['Laxmi Puja (लक्ष्मी पूजा)', 'Kartik Krishna Amavasya', 'October / November', '3 Days across Tihar'],
              ['Chhath Parva (छठ पर्व)', 'Kartik Shukla Shashthi', 'November', '1 Day (Terai & National)'],
              ['Maha Shivaratri (महाशिवरात्रि)', 'Falgun Krishna Chaturdashi', 'February / March', '1 Day Public Holiday'],
              ['Buddha Jayanti (बुद्ध जयन्ती)', 'Baisakh Shukla Purnima', 'May', '1 Day Public Holiday'],
            ]
          },
          tip: 'Review gazetted provincial holiday declarations when scheduling business trips between Kathmandu and regional branch offices.'
        },
        {
          heading: 'The Five Limbs of the Vedic Panchanga',
          body: 'Traditional Nepali Patro documents five astronomical parameters daily: Tithi (lunar day), Vara (weekday), Nakshatra (lunar constellation), Yoga (solar-lunar angular relationship), and Karana (half-tithi interval), used by astrologers to schedule auspicious marriage and housewarming (Griha Pravesh) ceremonies.',
        }
      ],
      conclusion: 'Keeping track of official national holidays and cultural timings ensures seamless corporate project planning. Browse real-time festival dates and gazetted holidays using our interactive Nepal Calendar.'
    }
  },
  {
    slug: 'nepali-rashifal-vedic-astrology-planetary-transit-science',
    title: 'Daily Nepali Rashifal: Vedic Astrology, Rashi Signs & Planetary Transits',
    titleNep: 'दैनिक नेपाली राशिफल: वैदिक ज्योतिष, १२ राशि र ग्रह गोचरको प्रभाव',
    excerpt: 'Understand how Vedic astrology computes daily Rashifal in Nepal: Moon signs (Chandra Rashi), planetary transits (Gochar), Nakshatras, and astrological guidelines for career and wellness.',
    excerptNep: 'मेषदेखि मीनसम्मका १२ राशिको दैनिक फलादेश कसरी निकालिन्छ? चन्द्रमाको गोचर, दैनिक शुभ रङ, शुभ अंक र जीवनमा ग्रहको प्रभावको विश्लेषण।',
    category: 'Utilities & Daily',
    publishedDate: '2026-08-13',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Read Daily Nepali Rashifal for Your Zodiac Sign',
      href: '/rashifal',
      iconText: 'Sparkles',
    },
    keywords: ['nepali rashifal daily today', 'aajako rashifal nepali', '12 rashi astrology nepal', 'vedic horoscope moon sign'],
    content: {
      intro: 'Astrological guidance through daily and monthly Rashifal forms an integral cultural discipline across Nepali households. Rooted in classical Vedic Jyotish, predictions derive from the position of the Moon (Chandra Rashi) moving through the 27 Nakshatras and twelve zodiac signs, rather than the solar sun signs common in Western horoscopes.',
      keyTakeaways: [
        'Vedic astrology calculates personal Rashi based on the exact zodiac sign the Moon occupied at the time of your birth.',
        'The Moon transits through a new zodiac sign approximately every 2.25 days (54 hours).',
        'Daily Rashifal forecasts focus on practical life domains: vocational career, financial prudence, family relationships, and personal wellness.',
        'Planetary aspects (Drishti) and transit houses (Gochar) influence daily emotional resilience and focus.'
      ],
      sections: [
        {
          heading: 'The Twelve Rashi Signs and Ruling Planets in Vedic Astrology',
          body: 'Each zodiac sign corresponds to specific natural elements and planetary influences:',
          table: {
            headers: ['Nepali Rashi Name', 'Western Zodiac Equivalent', 'Governing Element', 'Ruling Planet (Swami Graha)'],
            rows: [
              ['Mesh (मेष)', 'Aries', 'Fire (अग्नि)', 'Mars (मङ्गल)'],
              ['Vrishabh (वृष)', 'Taurus', 'Earth (पृथ्वी)', 'Venus (शुक्र)'],
              ['Mithun (मिथुन)', 'Gemini', 'Air (वायु)', 'Mercury (बुध)'],
              ['Karkat (कर्कट)', 'Cancer', 'Water (जल)', 'Moon (चन्द्रमा)'],
              ['Simha (सिंह)', 'Leo', 'Fire (अग्नि)', 'Sun (सूर्य)'],
              ['Kanya (कन्या)', 'Virgo', 'Earth (पृथ्वी)', 'Mercury (बुध)'],
              ['Tula (तुला)', 'Libra', 'Air (वायु)', 'Venus (शुक्र)'],
              ['Vrishchik (वृश्चिक)', 'Scorpio', 'Water (जल)', 'Mars (मङ्गल)'],
              ['Dhanu (धनु)', 'Sagittarius', 'Fire (अग्नि)', 'Jupiter (बृहस्पति)'],
              ['Makar (मकर)', 'Capricorn', 'Earth (पृथ्वी)', 'Saturn (शनि)'],
              ['Kumbha (कुम्भ)', 'Aquarius', 'Air (वायु)', 'Saturn (शनि)'],
              ['Meen (मीन)', 'Pisces', 'Water (जल)', 'Jupiter (बृहस्पति)'],
            ]
          },
          tip: 'Consult your formal birth chart (Janma Kundali) to confirm whether you should follow your naming rashi (Nam Rashi) or birth moon sign (Janma Rashi).'
        },
        {
          heading: 'How Daily Astrological Transits Function',
          body: 'As the Moon moves across the astrological chart relative to your birth sign, it activates specific houses governing expenditure, social recognition, domestic harmony, or professional opportunity, offering reflective perspective for daily mindfulness.',
        }
      ],
      conclusion: 'Reflecting on astrological patterns encourages positive daily mindfulness and planning. Read your updated daily forecast using our Daily Nepali Rashifal.'
    }
  }
];
