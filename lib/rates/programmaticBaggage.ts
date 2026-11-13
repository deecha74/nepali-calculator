export interface ProgrammaticBaggageItem {
  slug: string;
  primaryKeyword: string;
  title: string;
  shortTitle: string;
  metaDescription: string;
  country: string;
  countryFlag: string;
  category: 'gold' | 'tv' | 'phone' | 'laptop' | 'liquor' | 'drone' | 'cash';
  itemType: string;
  dutyFreeLimit: string;
  dutyPayableRate: string;
  confiscationRiskNotice: string;
  channel: string;
  headlineAnswer: string;
  faqs: Array<{ question: string; answer: string }>;
  keywords: string[];
}

export const PROGRAMMATIC_BAGGAGE_ITEMS: ProgrammaticBaggageItem[] = [
  // --- GULF GCC & MIDDLE EAST ---
  {
    slug: 'gold-from-dubai-to-nepal',
    primaryKeyword: 'how much gold can i bring from dubai to nepal',
    title: 'How Much Gold Can You Bring from Dubai to Nepal? (TIA Airport Baggage Rules 2083)',
    shortTitle: 'Dubai to Nepal Gold Allowance',
    metaDescription: 'Official TIA Airport customs rules for bringing gold from Dubai to Nepal: Female 50g free, Male 25g free. Check customs duty on excess gold jewelry and raw gold penalties.',
    country: 'United Arab Emirates (Dubai)',
    countryFlag: '🇦🇪',
    category: 'gold',
    itemType: 'Finished Gold Ornaments (Jewelry)',
    dutyFreeLimit: 'Female: 50g (~4.29 Tola) | Male: 25g (~2.14 Tola)',
    dutyPayableRate: 'Next 100g excess: NPR 1,050/g | 100g–200g excess: NPR 1,250/g',
    confiscationRiskNotice: 'Gold biscuits, 24K coins, and crude single-piece kadas are classified as raw bullion and strictly confiscated at TIA.',
    channel: 'Green Channel (up to free limit) / Red Channel (excess declared)',
    headlineAnswer: 'When flying from Dubai (UAE) to Kathmandu, female passengers can bring up to 50 grams (~4.29 tola) of personal gold jewelry completely duty-free, while male passengers can bring up to 25 grams (~2.14 tola) duty-free. You can bring an additional 200 grams of jewelry by declaring it at the Red Channel and paying flat customs duty (NPR 1,050/g on first 100g, NPR 1,250/g on next 100g). Raw gold biscuits, bars, and unclasped heavy kadas are strictly barred from passenger baggage.',
    faqs: [
      {
        question: 'Can I bring 50 grams of gold from Dubai to Nepal duty-free as a woman?',
        answer: 'Yes. Under Nepal Customs Baggage Order (झिटिगुन्टा आदेश), female Nepali citizens and tourists can bring up to 50 grams (~4.29 tola) of finished gold jewelry completely duty-free into Nepal through the Green Channel.',
      },
      {
        question: 'How much gold can a male passenger bring from Dubai to Nepal?',
        answer: 'Male passengers are allowed up to 25 grams (~2.14 tola) of personal gold jewelry duty-free. Any weight above 25g must be declared at the Red Channel counter and taxed at NPR 1,050 per gram up to 100g excess.',
      },
      {
        question: 'Can I bring gold biscuits or 24K bullion bars from Dubai to Nepal?',
        answer: 'No. Raw gold, 24K bullion bars, coins, and unpolished single-piece kadas have 0g duty-free allowance. Bringing raw gold without an official commercial import license leads to immediate seizure (जफत) and legal detention under the Customs Act.',
      },
      {
        question: 'What is the customs duty on 100 grams of gold from Dubai?',
        answer: 'For a female passenger with 100g of jewelry: First 50g is duty-free. The remaining 50g excess is taxed at NPR 1,050/gram, totaling NPR 52,500 customs duty. For a male passenger: First 25g is duty-free, and remaining 75g excess is taxed at NPR 1,050/gram, totaling NPR 78,750.',
      },
    ],
    keywords: [
      'how much gold can i bring from dubai to nepal',
      'dubai to nepal gold customs duty 2083',
      'gold allowance from dubai to kathmandu airport',
      'dubai gold rate in nepal',
      'nepal customs duty on gold from uae',
    ],
  },
  {
    slug: 'gold-from-qatar-to-nepal',
    primaryKeyword: 'customs duty on gold from qatar to nepal',
    title: 'Customs Duty on Gold from Qatar to Nepal (Doha to TIA Baggage Limits 2083)',
    shortTitle: 'Qatar to Nepal Gold Rules',
    metaDescription: 'Traveling from Doha to Kathmandu? Check official gold jewelry allowance from Qatar to Nepal: 50g free for women, 25g for men. Customs tariffs, receipts & airport red channel guide.',
    country: 'Qatar',
    countryFlag: '🇶🇦',
    category: 'gold',
    itemType: 'Finished Gold Ornaments',
    dutyFreeLimit: 'Female: 50g (~4.29 Tola) | Male: 25g (~2.14 Tola)',
    dutyPayableRate: 'First 100g excess: NPR 1,050/g | Next 100g excess: NPR 1,250/g',
    confiscationRiskNotice: 'Never carry third-party gold packets or unbranded gold kadas from Hamad International Airport for friends or agents.',
    channel: 'Green Channel (under free limit) / Red Channel (excess declared)',
    headlineAnswer: 'Passengers arriving at Kathmandu (TIA) from Qatar on flights like Qatar Airways or Nepal Airlines are allowed up to 50 grams of finished gold jewelry duty-free for women and 25 grams for men. Any excess jewelry up to 200 grams can be cleared at the Red Channel with purchase receipts. Raw gold coins and bullion bars carry zero exemption and are seized by customs authorities.',
    faqs: [
      {
        question: 'How much gold jewelry can I bring from Qatar to Nepal without duty?',
        answer: 'Women are granted 50g (~4.29 tola) and men 25g (~2.14 tola) of personal gold jewelry duty-free. Keep your Doha purchase receipt to prove authentic jewelry manufacture.',
      },
      {
        question: 'Can returning Nepali workers from Qatar bring gold coins?',
        answer: 'No. Gold coins and investment bars are considered commercial bullion in Nepal. Carrying them in personal baggage is illegal and results in confiscation at TIA.',
      },
    ],
    keywords: [
      'customs duty on gold from qatar to nepal',
      'gold limit from doha to nepal',
      'nepali workers qatar gold allowance',
      'qatar to nepal gold tax calculator',
    ],
  },
  {
    slug: 'gold-from-saudi-arabia-to-nepal',
    primaryKeyword: 'bringing gold from saudi arabia to nepal customs',
    title: 'Bringing Gold from Saudi Arabia to Nepal: Customs Duty & Baggage Rules 2083',
    shortTitle: 'Saudi to Nepal Gold Allowance',
    metaDescription: 'Traveling from Riyadh, Jeddah or Dammam to Nepal? Learn official customs duty on gold jewelry from Saudi Arabia: 25g/50g free allowance, tariffs on excess gold & TIA rules.',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    category: 'gold',
    itemType: 'Gold Ornaments (Jewelry)',
    dutyFreeLimit: 'Female: 50g | Male: 25g',
    dutyPayableRate: 'NPR 1,050 per gram (up to 100g excess) | NPR 1,250 per gram (100g–200g excess)',
    confiscationRiskNotice: 'Crude single-piece gold kadas crafted to disguise bullion are seized by TIA airport customs.',
    channel: 'Green Channel / Red Channel',
    headlineAnswer: 'Nepali migrant workers and travelers flying from Saudi Arabia to Kathmandu can bring 50 grams of personal gold jewelry for female travelers and 25 grams for male travelers duty-free. Excess jewelry up to an additional 200g is dutiable at the TIA Red Channel (NPR 1,050/g for first 100g, NPR 1,250/g for next 100g). Any excess above 200g is confiscated.',
    faqs: [
      {
        question: 'How many tola gold can I bring from Saudi Arabia to Nepal?',
        answer: 'Female passengers can bring ~4.29 tola (50 grams) free of duty, while male passengers can bring ~2.14 tola (25 grams) free of duty.',
      },
    ],
    keywords: [
      'bringing gold from saudi arabia to nepal customs',
      'saudi to nepal gold allowance',
      'riyadh to kathmandu gold baggage rules',
    ],
  },
  {
    slug: 'gold-from-kuwait-to-nepal',
    primaryKeyword: 'kuwait to nepal gold limit customs duty',
    title: 'Gold Limit from Kuwait to Nepal: Airport Customs Duty & Rules (2083/84)',
    shortTitle: 'Kuwait to Nepal Gold Rules',
    metaDescription: 'Official baggage rules for bringing gold from Kuwait to Kathmandu: 25g male, 50g female duty-free limits. Customs tax rates on excess gold jewelry at TIA airport.',
    country: 'Kuwait',
    countryFlag: '🇰🇼',
    category: 'gold',
    itemType: 'Gold Ornaments',
    dutyFreeLimit: 'Female: 50g | Male: 25g',
    dutyPayableRate: 'NPR 1,050/g (first 100g excess) | NPR 1,250/g (next 100g excess)',
    confiscationRiskNotice: 'Raw gold biscuits and unclasped heavy rings are seized.',
    channel: 'Green Channel / Red Channel',
    headlineAnswer: 'Passengers flying from Kuwait to Kathmandu are entitled to 50g duty-free gold jewelry for females and 25g for males. Additional jewelry up to 200g is cleared through the Red Channel by paying statutory customs duty.',
    faqs: [
      {
        question: 'What is the tax on 50g excess gold from Kuwait?',
        answer: '50g excess gold jewelry attracts NPR 1,050 per gram, making the total customs duty NPR 52,500.',
      },
    ],
    keywords: ['kuwait to nepal gold limit customs duty', 'kuwait to kathmandu airport baggage gold'],
  },
  {
    slug: 'gold-from-malaysia-to-nepal',
    primaryKeyword: 'how many grams gold allowed from malaysia to nepal',
    title: 'How Many Grams of Gold Allowed from Malaysia to Nepal? (TIA Rules 2083)',
    shortTitle: 'Malaysia to Nepal Gold Allowance',
    metaDescription: 'Flying from Kuala Lumpur to Kathmandu? Learn official TIA customs duty for gold jewelry from Malaysia: 25g/50g free, dutiable slabs & labor permit returnee guidelines.',
    country: 'Malaysia',
    countryFlag: '🇲🇾',
    category: 'gold',
    itemType: 'Finished Gold Ornaments',
    dutyFreeLimit: 'Female: 50g | Male: 25g',
    dutyPayableRate: 'NPR 1,050/g (up to 100g excess) | NPR 1,250/g (100g–200g excess)',
    confiscationRiskNotice: 'Never bring gold on behalf of unknown recruitment agents or passengers.',
    channel: 'Green Channel / Red Channel',
    headlineAnswer: 'Traveling from Malaysia to Nepal allows 50 grams of personal gold jewelry for women and 25 grams for men duty-free. An extra 200g of personal jewelry can be brought by paying duty at the Red Channel counter. Bullion and gold biscuits are prohibited.',
    faqs: [
      {
        question: 'Can male workers returning from Malaysia bring 50 grams of gold free?',
        answer: 'No. The duty-free limit for male passengers is strictly 25 grams (~2.14 tola). The remaining 25g excess is taxed at NPR 1,050/g (NPR 26,250).',
      },
    ],
    keywords: ['how many grams gold allowed from malaysia to nepal', 'malaysia to nepal airport gold customs'],
  },
  {
    slug: 'gold-from-usa-to-nepal',
    primaryKeyword: 'bringing gold jewelry from usa to nepal customs',
    title: 'Bringing Gold Jewelry from USA to Nepal: Airport Customs & Taxes (2083)',
    shortTitle: 'USA to Nepal Gold Allowance',
    metaDescription: 'Traveling from America to Nepal with wedding jewelry? Check official customs duty on gold jewelry from USA: 50g free for women, 25g for men, customs slabs & invoices.',
    country: 'United States (USA)',
    countryFlag: '🇺🇸',
    category: 'gold',
    itemType: 'Finished Gold Jewelry',
    dutyFreeLimit: 'Female: 50g (~4.29 Tola) | Male: 25g (~2.14 Tola)',
    dutyPayableRate: 'NPR 1,050/g (first 100g excess) | NPR 1,250/g (next 100g excess)',
    confiscationRiskNotice: 'Perth Mint or Credit Suisse 24K bars bought at Costco or US bullion dealers are classified as raw gold and cannot be imported in baggage.',
    channel: 'Green Channel / Red Channel',
    headlineAnswer: 'Nepali diaspora (NRNs), students, and tourists flying from the United States to Kathmandu can bring 50g of personal gold jewelry for female passengers and 25g for male passengers duty-free. Up to 200g excess jewelry is cleared with purchase receipts at the Red Channel. Investment bullion coins and bars are strictly prohibited in passenger baggage.',
    faqs: [
      {
        question: 'Can NRNs bring wedding jewelry from the USA to Nepal?',
        answer: 'Yes, wear or carry personal finished jewelry within the 50g (female) / 25g (male) duty-free limit. For excess wedding sets, carry original purchase receipts and clear them at the Red Channel.',
      },
      {
        question: 'Are Costco gold bars allowed in baggage to Nepal?',
        answer: 'No. 24K gold bars bought in the US are raw bullion, not wearable personal ornaments. They cannot be imported through airport baggage and will be seized.',
      },
    ],
    keywords: ['bringing gold jewelry from usa to nepal customs', 'us to nepal gold limit', 'nrn gold baggage nepal'],
  },
  {
    slug: 'gold-from-uk-to-nepal',
    primaryKeyword: 'uk to nepal gold limit customs allowance female',
    title: 'UK to Nepal Gold Customs Limit: Allowance for Male & Female Travelers (2083)',
    shortTitle: 'UK to Nepal Gold Rules',
    metaDescription: 'Flying from London Heathrow to Kathmandu? Official baggage rules for bringing gold from UK to Nepal: 50g free for women, 25g for men, British Asian jewelry rules & tariffs.',
    country: 'United Kingdom (UK)',
    countryFlag: '🇬🇧',
    category: 'gold',
    itemType: 'Finished Gold Jewelry',
    dutyFreeLimit: 'Female: 50g | Male: 25g',
    dutyPayableRate: 'NPR 1,050/g (first 100g excess) | NPR 1,250/g (next 100g excess)',
    confiscationRiskNotice: 'Gold sovereign coins are treated as bullion, not wearable ornaments.',
    channel: 'Green Channel / Red Channel',
    headlineAnswer: 'Passengers traveling from the UK to Nepal are allowed 50 grams of personal gold jewelry for female travelers and 25 grams for male travelers completely duty-free. Excess jewelry up to 200g can be cleared by paying customs tariff at TIA arrival.',
    faqs: [
      {
        question: 'Can British Gurkhas bring gold jewelry to Nepal duty-free?',
        answer: 'Yes, standard baggage allowances apply: 50g for wives/daughters, 25g for male veterans.',
      },
    ],
    keywords: ['uk to nepal gold limit customs allowance female', 'london to kathmandu gold customs airport'],
  },
  {
    slug: 'gold-from-australia-to-nepal',
    primaryKeyword: 'how much gold can female passenger bring to nepal from australia',
    title: 'How Much Gold Can You Bring from Australia to Nepal? (TIA Rules 2083)',
    shortTitle: 'Australia to Nepal Gold Allowance',
    metaDescription: 'Traveling from Sydney, Melbourne or Brisbane to Nepal? Official customs duty on gold from Australia: 50g female free allowance, 25g male free allowance & tax slabs.',
    country: 'Australia',
    countryFlag: '🇦🇺',
    category: 'gold',
    itemType: 'Finished Gold Jewelry',
    dutyFreeLimit: 'Female: 50g (~4.29 Tola) | Male: 25g (~2.14 Tola)',
    dutyPayableRate: 'NPR 1,050/g (first 100g excess) | NPR 1,250/g (next 100g excess)',
    confiscationRiskNotice: 'Perth Mint cast gold bars are raw bullion and strictly confiscated if carried in baggage.',
    channel: 'Green Channel / Red Channel',
    headlineAnswer: 'Flying from Australia to Kathmandu permits 50 grams of finished gold ornaments duty-free for female travelers and 25 grams for male travelers. Any extra finished jewelry up to 200 grams can be imported by paying statutory customs duty at the Red Channel counter.',
    faqs: [
      {
        question: 'Can students returning from Australia bring gold jewelry to Nepal?',
        answer: 'Yes, up to 50g for female students and 25g for male students without paying any customs duty.',
      },
    ],
    keywords: ['how much gold can female passenger bring to nepal from australia', 'australia to nepal gold limit'],
  },
  {
    slug: 'gold-from-japan-to-nepal',
    primaryKeyword: 'japan to nepal airport gold customs rules',
    title: 'Japan to Nepal Airport Gold Customs Rules & Allowances (2083/84)',
    shortTitle: 'Japan to Nepal Gold Allowance',
    metaDescription: 'Official customs regulations for passengers bringing gold jewelry from Tokyo/Japan to Kathmandu Airport: 25g male / 50g female duty-free rules and excess tariffs.',
    country: 'Japan',
    countryFlag: '🇯🇵',
    category: 'gold',
    itemType: 'Gold Ornaments',
    dutyFreeLimit: 'Female: 50g | Male: 25g',
    dutyPayableRate: 'NPR 1,050/g (up to 100g excess) | NPR 1,250/g (100g–200g excess)',
    confiscationRiskNotice: '24K gold bars bought in Ginza or Tanaka Kikinzoku are classified as raw bullion and prohibited in baggage.',
    channel: 'Green Channel / Red Channel',
    headlineAnswer: 'Passengers flying from Japan to Kathmandu (TIA) enjoy 50 grams of duty-free gold jewelry for females and 25 grams for males. Up to 200 grams of excess jewelry is allowed by declaring and paying duty at the Red Channel.',
    faqs: [
      {
        question: 'Can SSW / TITP workers from Japan bring gold jewelry to Nepal?',
        answer: 'Yes, up to 25g for men and 50g for women duty-free.',
      },
    ],
    keywords: ['japan to nepal airport gold customs rules', 'tokyo to kathmandu gold customs'],
  },
  {
    slug: 'gold-from-korea-to-nepal',
    primaryKeyword: 'eps korea returnee gold allowance nepal',
    title: 'EPS Korea Returnee Gold Customs Allowance & Baggage Rules (Nepal 2083)',
    shortTitle: 'Korea Returnee Gold Allowance',
    metaDescription: 'Returning to Nepal after completing EPS Korea contract? Check official TIA airport customs rules for gold: 25g male / 50g female duty-free, excess duty & baggage tips.',
    country: 'South Korea',
    countryFlag: '🇰🇷',
    category: 'gold',
    itemType: 'Finished Gold Ornaments',
    dutyFreeLimit: 'Female: 50g | Male: 25g',
    dutyPayableRate: 'NPR 1,050/g (first 100g excess) | NPR 1,250/g (next 100g excess)',
    confiscationRiskNotice: 'Korean gold bars or 24K pure unclasped rings are treated as bullion and seized.',
    channel: 'Green Channel / Red Channel',
    headlineAnswer: 'EPS workers returning from South Korea to Nepal can bring 25 grams (male) or 50 grams (female) of personal gold jewelry completely duty-free. An additional 200 grams of jewelry can be brought by declaring at the Red Channel and paying customs duty.',
    faqs: [
      {
        question: 'Does EPS returnee labor permit give extra gold allowance in Nepal?',
        answer: 'No. Labor permit (श्रम स्वीकृति) provides extra duty-free television (up to 32") and a 2nd mobile phone, but gold jewelry allowance remains standard at 25g for men and 50g for women.',
      },
    ],
    keywords: ['eps korea returnee gold allowance nepal', 'korea to nepal airport gold customs duty'],
  },

  // --- TELEVISIONS & SCREEN SIZES ---
  {
    slug: 'tv-from-dubai-to-nepal-customs',
    primaryKeyword: '55 inch tv customs duty nepal airport from dubai',
    title: 'Customs Duty on TV from Dubai to Nepal: 32", 43", 55", 65" Rates (2083)',
    shortTitle: 'Dubai to Nepal TV Customs Duty',
    metaDescription: 'Bringing a smart TV from Dubai to Nepal? Official TIA airport customs duty rates for 32-inch, 43-inch, 55-inch & 65-inch TVs. Shramik exemption vs general passenger tax.',
    country: 'United Arab Emirates (Dubai)',
    countryFlag: '🇦🇪',
    category: 'tv',
    itemType: 'Smart LED Television',
    dutyFreeLimit: 'Up to 32" Free (Only for 12+ Months Valid Shramik Returnees with SSF)',
    dutyPayableRate: 'Up to 32": NPR 4,500 (if non-labor) | 43": NPR 9,500 | 55": NPR 19,500 | 65"+: NPR 35,000+',
    confiscationRiskNotice: 'Only 1 TV allowed per passenger. Bringing multiple TVs leads to commercial seizure.',
    channel: 'Green Channel (for eligible free 32" shramik TV) / Red Channel (all other TVs)',
    headlineAnswer: 'Nepali workers returning from Dubai with a valid Foreign Employment Labor Permit who have completed at least 12 months abroad and enrolled in SSF can bring 1 LED Smart TV up to 32 inches completely duty-free. For general travelers or larger screens, flat customs duty applies: ~NPR 4,500 for up to 32", ~NPR 9,500 for 43", and ~NPR 19,500 for 55" televisions.',
    faqs: [
      {
        question: 'Can I bring a 55 inch TV from Dubai to Nepal free of customs?',
        answer: 'No. Only up to 32-inch TVs qualify for duty-free entry for eligible 12+ month labor returnees. A 55-inch TV incurs approximately NPR 19,500 in flat customs duty at Kathmandu airport.',
      },
      {
        question: 'What documents are required to get the free 32" TV exemption?',
        answer: 'You must present your passport with foreign employment visa, proof of 12+ months abroad, valid labor permit (श्रम स्वीकृति), and Social Security Fund (SSF) enrollment.',
      },
    ],
    keywords: [
      '55 inch tv customs duty nepal airport from dubai',
      'tv customs tax nepal airport from dubai 2083',
      '43 inch tv customs duty in nepal',
      'shramik tv allowance nepal airport',
    ],
  },
  {
    slug: 'tv-from-qatar-to-nepal-customs',
    primaryKeyword: '32 inch tv customs duty nepal for labor permit returnee',
    title: 'TV Customs Duty from Qatar to Nepal: 32", 43" & 55" Baggage Limits (2083)',
    shortTitle: 'Qatar to Nepal TV Baggage Rules',
    metaDescription: 'Traveling from Doha to Kathmandu with a smart TV? Check official Nepal customs duty on TVs from Qatar: 32-inch free labor permit rules, 43" and 55" tariff schedule.',
    country: 'Qatar',
    countryFlag: '🇶🇦',
    category: 'tv',
    itemType: 'Smart LED TV',
    dutyFreeLimit: '32" Free for 12+ month labor permit holders',
    dutyPayableRate: '32": NPR 4,500 (general) | 43": NPR 9,500 | 55": NPR 19,500',
    confiscationRiskNotice: 'Maximum 1 TV allowed per passenger.',
    channel: 'Red Channel (except eligible 32" labor TV)',
    headlineAnswer: 'Nepali migrant workers returning from Qatar after 12 months with valid labor approval can import one 32-inch television duty-free. General travelers pay flat tariffs: NPR 4,500 for up to 32", NPR 9,500 for 33"–43", and NPR 19,500 for 44"–55".',
    faqs: [
      {
        question: 'Can I bring a 43 inch TV from Qatar duty-free?',
        answer: 'No. Even with a labor permit, the duty-free limit is strictly 32 inches. A 43-inch TV will be taxed at NPR 9,500 at TIA customs.',
      },
    ],
    keywords: ['32 inch tv customs duty nepal for labor permit returnee', 'qatar to nepal tv tax rate airport'],
  },

  // --- SMARTPHONES & IPHONE ---
  {
    slug: 'iphone-from-dubai-to-nepal',
    primaryKeyword: 'bringing iphone from dubai to nepal customs duty',
    title: 'Customs Duty on iPhone from Dubai to Nepal: MDMS & Baggage Rules (2083)',
    shortTitle: 'Dubai to Nepal iPhone Duty & MDMS',
    metaDescription: 'Bringing an iPhone 16/15 from Dubai to Nepal? Official TIA customs rules: 1 phone free for all, 2 phones free for 6+ month labor permit returnees. MDMS registration guide.',
    country: 'United Arab Emirates (Dubai)',
    countryFlag: '🇦🇪',
    category: 'phone',
    itemType: 'Smartphone / Apple iPhone',
    dutyFreeLimit: '1 Phone Free (General) | 2 Phones Free (6+ Months Labor Permit + SSF)',
    dutyPayableRate: 'Extra Smartphone / iPhone: Flat NPR 10,000 Customs Tariff + 13% VAT for MDMS',
    confiscationRiskNotice: 'Commercial batches (3+ phones in personal baggage) without import license will be seized.',
    channel: 'Green Channel (for 1 personal phone or 2 labor-exempt phones) / Red Channel (extra phones)',
    headlineAnswer: 'Any traveler entering Nepal from Dubai can bring 1 personal mobile phone completely duty-free and register it on MDMS. Nepali citizens returning with a valid Foreign Employment Labor Permit (श्रम स्वीकृति) who worked abroad for 6+ consecutive months can bring 2 phones (1 personal + 1 new packed) duty-free. A 3rd phone or an extra iPhone brought by general travelers incurs flat customs duty (approx NPR 10,000 for flagship phones).',
    faqs: [
      {
        question: 'How do I register an iPhone from Dubai on MDMS Nepal?',
        answer: 'Visit mdms.nta.gov.np, submit your passport, arrival stamp page, Dubai purchase invoice, and IMEI number. If eligible, individual duty-free registration is approved online.',
      },
      {
        question: 'Can I bring 2 iPhones from Dubai without paying customs duty?',
        answer: 'Only if you have worked abroad for 6+ consecutive months with a valid government labor permit (श्रम स्वीकृति) and Social Security Fund (SSF) enrollment. Otherwise, only 1 phone is duty-free, and the 2nd phone is taxable.',
      },
    ],
    keywords: [
      'bringing iphone from dubai to nepal customs duty',
      'iphone 16 customs duty in nepal airport from dubai',
      'how many phones can i bring from dubai to nepal',
      'mdms nepal customs fee for iphone',
    ],
  },
  {
    slug: 'iphone-from-usa-to-nepal',
    primaryKeyword: 'iphone 16 customs tax in nepal airport from america',
    title: 'iPhone Customs Tax in Nepal from USA: Airport & MDMS Rules (2083/84)',
    shortTitle: 'USA to Nepal iPhone Customs',
    metaDescription: 'Traveling from USA to Nepal with an iPhone 16 Pro? Check official TIA customs duty: 1 personal phone duty-free, tax on extra boxed phones, and NTA MDMS registration.',
    country: 'United States (USA)',
    countryFlag: '🇺🇸',
    category: 'phone',
    itemType: 'Smartphone / iPhone',
    dutyFreeLimit: '1 Personal Phone Duty-Free',
    dutyPayableRate: 'NPR 10,000 flat customs duty on additional smartphone',
    confiscationRiskNotice: 'Unpacking your personal phone before landing is standard practice to verify personal use.',
    channel: 'Green Channel (1 phone) / Red Channel (extra phones)',
    headlineAnswer: 'Travelers from the United States to Kathmandu can bring 1 active personal smartphone completely duty-free. Bringing an additional new, boxed iPhone as a gift requires customs declaration at the Red Channel with payment of flat duty (approx NPR 10,000) for official MDMS white-listing.',
    faqs: [
      {
        question: 'Will my US iPhone work in Nepal without paying tax?',
        answer: 'Yes, your single personal iPhone works on Nepal telecom networks (NTC/Ncell) for 15 days automatically. To use it permanently, register its IMEI on the MDMS portal with your passport arrival stamp.',
      },
    ],
    keywords: ['iphone 16 customs tax in nepal airport from america', 'us to nepal iphone mdms registration'],
  },

  // --- LAPTOPS & TABLETS ---
  {
    slug: 'second-laptop-customs-nepal',
    primaryKeyword: 'how much duty for second laptop in kathmandu airport',
    title: 'Customs Duty on Second Laptop at Kathmandu Airport (TIA Rules 2083)',
    shortTitle: 'Second Laptop Duty at TIA',
    metaDescription: 'Traveling to Nepal with 2 laptops? Official TIA airport customs rules: 1 laptop free for all passengers. Check customs duty rate and documentation for your second laptop.',
    country: 'All International Origins',
    countryFlag: '🇳🇵',
    category: 'laptop',
    itemType: 'Laptop / MacBook / Tablet',
    dutyFreeLimit: '1 Personal Laptop Duty-Free',
    dutyPayableRate: 'Second Laptop: Flat Customs Duty (~NPR 5,000 to NPR 8,000 depending on valuation)',
    confiscationRiskNotice: 'Commercial quantities (3+ laptops) in personal luggage without business bill of entry are detained.',
    channel: 'Red Channel (if carrying 2+ laptops)',
    headlineAnswer: 'Under Nepal Department of Customs baggage regulations, every arriving international traveler is allowed exactly 1 personal laptop or tablet completely duty-free. If you are carrying a second laptop (such as an office work laptop plus a personal laptop, or a gift for family), you must declare it at the Red Channel and pay flat customs duty (~NPR 5,000 to NPR 8,000).',
    faqs: [
      {
        question: 'Can I carry both an office laptop and personal laptop to Nepal?',
        answer: 'Yes, but technically only 1 laptop is duty-free. To avoid duty on your office laptop, carry an official company employment letter proving it is company property that will exit Nepal with you.',
      },
    ],
    keywords: ['how much duty for second laptop in kathmandu airport', 'bringing 2 laptops to nepal customs'],
  },

  // --- ALCOHOL & LIQUOR ---
  {
    slug: 'liquor-limit-tia-airport',
    primaryKeyword: 'how much whiskey can you bring to nepal duty free',
    title: 'Liquor & Alcohol Limit at TIA Airport Nepal: Baggage Rules (2083/84)',
    shortTitle: 'Alcohol Limit at Kathmandu Airport',
    metaDescription: 'Buying duty-free liquor for Nepal? Strict TIA airport customs rules: exactly 1 liter (1 bottle) allowed duty-free. Excess alcohol cannot be taxed—it is seized!',
    country: 'All International Origins',
    countryFlag: '🍾',
    category: 'liquor',
    itemType: 'Whiskey / Spirits / Wine',
    dutyFreeLimit: 'Strictly 1 Bottle (Maximum 1,000ml / 1 Liter)',
    dutyPayableRate: 'No duty payment option — any volume above 1 Liter is confiscated (जफत)',
    confiscationRiskNotice: 'Unlike electronics where duty can be paid on excess items, Nepal Customs Act forbids excess personal alcohol; any bottle beyond 1 Liter is seized on the spot.',
    channel: 'Green Channel (up to 1L) / Confiscation Counter (for excess)',
    headlineAnswer: 'Nepal Department of Customs strictly limits personal alcohol allowance to 1 bottle up to 1,000ml (1 Liter) of liquor, whiskey, or wine duty-free. Unlike electronics where travelers can pay tax on excess goods, there is NO option to pay customs duty on extra liquor. Any volume exceeding 1 Liter is confiscated immediately at Tribhuvan International Airport customs check.',
    faqs: [
      {
        question: 'Can I bring two 750ml bottles of whiskey to Nepal?',
        answer: 'No! Two 750ml bottles total 1,500ml, exceeding the 1,000ml cap. TIA customs will confiscate the second bottle.',
      },
      {
        question: 'Can I pay customs duty to release extra alcohol at Kathmandu airport?',
        answer: 'No. The Customs Baggage Order does not permit excess liquor entry under passenger luggage. It is seized without compensation.',
      },
    ],
    keywords: ['how much whiskey can you bring to nepal duty free', 'liquor limit in kathmandu airport', 'alcohol customs nepal tia'],
  },

  // --- FOREIGN CURRENCY CASH ---
  {
    slug: 'foreign-currency-cash-limit-nepal',
    primaryKeyword: 'maximum usd cash allowed to bring to nepal without declaration',
    title: 'Foreign Currency Cash Limit in Nepal: TIA Airport Declaration Rules (2083)',
    shortTitle: 'Foreign Currency Cash Limit TIA',
    metaDescription: 'Traveling to Nepal with USD cash? Check official Nepal Rastra Bank and Customs declaration limits: $5,000 threshold, declaration form rules and banking requirements.',
    country: 'All International Origins',
    countryFlag: '💵',
    category: 'cash',
    itemType: 'Foreign Currency Banknotes (USD, EUR, GBP, AUD, AED)',
    dutyFreeLimit: 'Equivalent up to USD $5,000 (No declaration required)',
    dutyPayableRate: '0% Tax, but mandatory Customs Declaration Form required for amounts > USD $5,000',
    confiscationRiskNotice: 'Failing to declare cash exceeding USD $5,000 leads to seizure and anti-money laundering investigation.',
    channel: 'Green Channel (under $5,000) / Red Channel (over $5,000 mandatory declaration)',
    headlineAnswer: 'International passengers can bring foreign currency cash up to the equivalent of USD $5,000 into Nepal without any declaration. If you carry more than USD $5,000 in cash (or equivalent in Euros, Pounds, AUD, Dirhams), you must fill out a Customs Declaration Form at the TIA arrival counter. There is zero tax, but the declaration stamp is required to legally deposit or re-export the funds.',
    faqs: [
      {
        question: 'Is there a tax on bringing $10,000 USD to Nepal?',
        answer: 'No tax is charged. However, you MUST declare it at the customs Red Channel counter. You will receive an official customs declaration certificate necessary to deposit the USD into a Nepali foreign currency bank account.',
      },
    ],
    keywords: ['maximum usd cash allowed to bring to nepal without declaration', 'carrying foreign currency to nepal rules'],
  },
];
