export interface ProgrammaticGoldItem {
  slug: string;
  primaryKeyword: string;
  title: string;
  shortTitle: string;
  metaDescription: string;
  nepaliTitle: string;
  unit: 'tola' | 'gram';
  tolaAmount?: number;
  lalAmount?: number;
  gramAmount?: number;
  metalType: 'fine' | 'tejabi' | 'silver';
  weightGrams: number;
  badge: string;
  headlineAnswer: string;
  conversionFormula: string;
  approximateFinePriceNpr: number;
  approximateTejabiPriceNpr: number;
  faqs: Array<{ question: string; answer: string }>;
  keywords: string[];
}

export const PROGRAMMATIC_GOLD_ITEMS: ProgrammaticGoldItem[] = [
  {
    slug: "1-lal-gold-price-in-nepal-today",
    primaryKeyword: "1 lal gold price in nepal today",
    title: "1 Lal Gold Price in Nepal Today (१ लाल सुनको भाउ) — 24K & 22K Rate",
    shortTitle: "1 Lal Gold Price Today",
    nepaliTitle: "नेपालमा १ लाल सुनको मूल्य आज",
    metaDescription: "Check today's 1 Lal gold price in Nepal: रु 2,897 for 24K Hallmark & रु 2,887 for 22K Tejabi. Learn 1 Tola = 100 Lal conversion and calculate jewelry cost.",
    unit: "tola",
    tolaAmount: 0,
    lalAmount: 1,
    metalType: "fine",
    weightGrams: 0.116638,
    badge: "1 Lal = 0.01 Tola = 0.1166 Grams",
    headlineAnswer: "Today's 1 Lal gold price in Nepal is approximately रु 2,897 for 24 Karat Hallmark Fine Gold (छापावाल सुन) and रु 2,887 for 22 Karat Tejabi Gold (तेजाबी सुन). In Nepal, 1 Tola equals exactly 100 Lal (१ तोला = १०० लाल). Therefore, the price of 1 Lal is exactly 1% of the prevailing 1 Tola gold rate.",
    conversionFormula: "1 Lal Price = Today's Rate per Tola ÷ 100 (Weight = 0.116638 grams)",
    approximateFinePriceNpr: 2897,
    approximateTejabiPriceNpr: 2887,
    faqs: [
      {
        question: "How much is 1 Lal gold in Nepal today?",
        answer: "As per current official FENEGOSIDA rates, 1 Lal 24K Hallmark gold costs approximately रु 2,897, while 1 Lal 22K Tejabi gold costs approximately रु 2,887. When purchasing jewelry, standard making charges (ज्याला) and wastage (जर्ती) will be added.",
      },
      {
        question: "How many Lal are in 1 Tola of gold in Nepal?",
        answer: "In the Nepali traditional measurement system, 1 Tola (तोला) is exactly equal to 100 Lal (लाल). 1 Lal equals 0.116638 grams.",
      },
      {
        question: "How do you calculate 1 Lal gold price from 1 Tola price?",
        answer: "Simply divide today's Tola price by 100. For example, if 1 Tola Hallmark gold is रु 2,89,700, then 1 Lal is 289,700 ÷ 100 = रु 2,897.",
      },
      {
        question: "What is the difference between Lal and Aana in Nepal?",
        answer: "1 Tola contains 16 Aana and 100 Lal. Therefore, 1 Aana = 6.25 Lal = 0.7289 grams.",
      },
    ],
    keywords: [
      "1 lal gold price in nepal today",
      "1 lal sun ko vau nepal",
      "one lal gold price nepal",
      "1 lal in gram nepal",
      "1 tola ma kati lal huncha",
      "gold price in nepal 1 lal",
    ],
  },
  {
    slug: "gold-price-in-nepal-today-per-tola",
    primaryKeyword: "gold price in nepal today per tola",
    title: "Gold Price in Nepal Today per Tola (१ तोला सुनको भाउ) — FENEGOSIDA Official",
    shortTitle: "Gold Price per Tola Today",
    nepaliTitle: "नेपालमा प्रति तोला सुनको भाउ आज",
    metaDescription: "Today's official gold price in Nepal per tola: रु 2,89,700 (24K Hallmark) and रु 2,88,700 (22K Tejabi). Live rates, 11.6638 grams conversion, and price history.",
    unit: "tola",
    tolaAmount: 1,
    lalAmount: 0,
    metalType: "fine",
    weightGrams: 11.6638,
    badge: "1 Tola = 11.6638 Grams = 100 Lal",
    headlineAnswer: "Today's gold price in Nepal per tola is रु 2,89,700 for 24K Hallmark Fine Gold and रु 2,88,700 for 22K Tejabi Gold as determined by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA). 1 Tola contains exactly 11.6638 grams or 100 Lal.",
    conversionFormula: "1 Tola = 11.6638 Grams = 100 Lal = 16 Aana",
    approximateFinePriceNpr: 289700,
    approximateTejabiPriceNpr: 288700,
    faqs: [
      {
        question: "What is the official gold price in Nepal today per tola?",
        answer: "Today's official rate published by FENEGOSIDA is रु 2,89,700 per tola for 24K Hallmark gold and रु 2,88,700 per tola for 22K Tejabi gold.",
      },
      {
        question: "How many grams are in 1 Tola in Nepal?",
        answer: "In Nepal, 1 Tola is legally and commercially standardized to exactly 11.6638 grams (often rounded to 11.66 grams for informal discussions).",
      },
      {
        question: "When are daily gold rates updated in Nepal?",
        answer: "Official gold rates are fixed and released daily at around 11:00 AM NST (Sunday to Friday) by FENEGOSIDA based on international London Bullion Market bullion rates and the USD/NPR forex exchange rate.",
      },
    ],
    keywords: [
      "gold price in nepal today per tola",
      "today gold price in nepal per tola 24 carat",
      "1 tola gold price in nepal",
      "fenegosida gold rate per tola",
      "sunko vau aaja tola",
    ],
  },
  {
    slug: "price-of-gold-in-nepal",
    primaryKeyword: "price of gold in nepal",
    title: "Price of Gold in Nepal Today (सुनको भाउ) — Live 24K & 22K Rates & Calculator",
    shortTitle: "Price of Gold in Nepal",
    nepaliTitle: "नेपालमा आजको सुनको मूल्य",
    metaDescription: "Check current price of gold in Nepal: 24K Hallmark Fine gold at रु 2,89,700/tola and 22K Tejabi at रु 2,88,700/tola. Live FENEGOSIDA rates, gram rates, and jewelry cost calculator.",
    unit: "tola",
    tolaAmount: 1,
    lalAmount: 0,
    metalType: "fine",
    weightGrams: 11.6638,
    badge: "Official FENEGOSIDA Rates",
    headlineAnswer: "The price of gold in Nepal today is रु 2,89,700 per tola for 24K Hallmark Fine Gold and रु 2,88,700 per tola for 22K Tejabi Gold. Per 10 grams, 24K gold is priced at रु 2,48,370 and per 1 gram at रु 24,837.",
    conversionFormula: "Official Daily Standard: 24K Hallmark & 22K Tejabi (FENEGOSIDA)",
    approximateFinePriceNpr: 289700,
    approximateTejabiPriceNpr: 288700,
    faqs: [
      {
        question: "What is the price of gold in Nepal right now?",
        answer: "The price is रु 2,89,700 per tola for 24K Fine Gold and रु 2,88,700 per tola for 22K Tejabi Gold. Silver is priced at रु 4,100 per tola.",
      },
      {
        question: "Why does the price of gold change daily in Nepal?",
        answer: "Nepal imports all its gold through commercial banks under Nepal Rastra Bank quotas. Daily prices fluctuate according to international market bullion spot prices, customs duty, import tariffs, and USD-NPR exchange rates.",
      },
    ],
    keywords: [
      "price of gold in nepal",
      "current price of gold in nepal",
      "gold rate in nepal today",
      "nepal gold price live",
      "nepal ma sunko vau",
    ],
  },
  {
    slug: "todays-gold-price-in-nepal",
    primaryKeyword: "todays gold price in nepal",
    title: "Today's Gold Price in Nepal (आजको सुनको भाउ) — Live FENEGOSIDA Rates",
    shortTitle: "Today's Gold Price in Nepal",
    nepaliTitle: "आजको सुनको भाउ नेपाल",
    metaDescription: "Latest today's gold price in Nepal. Find official 24K Hallmark and 22K Tejabi gold rates per tola and per 10 grams with instant jewelry making charge calculations.",
    unit: "tola",
    tolaAmount: 1,
    lalAmount: 0,
    metalType: "fine",
    weightGrams: 11.6638,
    badge: "Live Daily Market Update",
    headlineAnswer: "Today's gold price in Nepal stands at रु 2,89,700 per tola for 24K Hallmark Gold and रु 2,88,700 per tola for 22K Tejabi Gold. For 10 grams, the rate is रु 2,48,370.",
    conversionFormula: "1 Tola (11.6638g) Rate = रु 2,89,700 (24K)",
    approximateFinePriceNpr: 289700,
    approximateTejabiPriceNpr: 288700,
    faqs: [
      {
        question: "Where can I check today's official gold rate in Nepal?",
        answer: "Official rates are declared daily by FENEGOSIDA (Federation of Nepal Gold and Silver Dealers' Association) and updated live on Nepali Calc.",
      },
      {
        question: "How much are making charges and wastage on jewelry in Nepal?",
        answer: "Making charges (ज्याला) typically range from रु 1,500 to रु 3,500 per tola depending on design complexity. Wastage (जर्ती) is usually between 1% and 5%.",
      },
    ],
    keywords: [
      "todays gold price in nepal",
      "today gold price nepal 24k",
      "aajako sunko vau",
      "today fenegosida gold price nepal",
    ],
  },
  {
    slug: "1-tola-gold-price-in-nepal-today",
    primaryKeyword: "1 tola gold price in nepal today",
    title: "1 Tola Gold Price in Nepal Today — 24K Hallmark & 22K Tejabi Rate",
    shortTitle: "1 Tola Gold Price Today",
    nepaliTitle: "नेपालमा १ तोला सुनको भाउ आज",
    metaDescription: "Get today's 1 tola gold price in Nepal: रु 2,89,700 (24K) and रु 2,88,700 (22K). 1 tola equals 11.6638 grams or 100 Lal in Nepal.",
    unit: "tola",
    tolaAmount: 1,
    lalAmount: 0,
    metalType: "fine",
    weightGrams: 11.6638,
    badge: "1 Tola = 11.6638g",
    headlineAnswer: "The price of 1 Tola gold in Nepal today is रु 2,89,700 for 24K Hallmark gold and रु 2,88,700 for 22K Tejabi gold. 1 Tola equals 11.6638 grams or 100 Lal.",
    conversionFormula: "1 Tola = 11.6638 Grams = 100 Lal",
    approximateFinePriceNpr: 289700,
    approximateTejabiPriceNpr: 288700,
    faqs: [
      {
        question: "How many grams are in 1 Tola of gold?",
        answer: "1 Tola contains exactly 11.6638 grams.",
      },
    ],
    keywords: ["1 tola gold price in nepal today", "1 tola sunko vau nepal", "one tola gold price in nepal"],
  },
  {
    slug: "10-gram-gold-price-in-nepal-today",
    primaryKeyword: "10 gram gold price in nepal today",
    title: "10 Gram Gold Price in Nepal Today (१० ग्राम सुनको भाउ) — 24K & 22K",
    shortTitle: "10 Gram Gold Price Today",
    nepaliTitle: "नेपालमा १० ग्राम सुनको भाउ आज",
    metaDescription: "Today's official 10 gram gold price in Nepal: रु 2,48,370 for 24K Hallmark and रु 2,47,520 for 22K Tejabi as announced by FENEGOSIDA.",
    unit: "gram",
    gramAmount: 10,
    metalType: "fine",
    weightGrams: 10,
    badge: "Official Metric Standard (10g)",
    headlineAnswer: "Today's official 10 gram gold price in Nepal is रु 2,48,370 for 24K Hallmark Fine Gold and रु 2,47,520 for 22K Tejabi Gold. FENEGOSIDA publishes official benchmark rates for both 1 Tola (11.6638g) and 10 Grams daily.",
    conversionFormula: "10 Grams Price = FENEGOSIDA Daily 10g Official Rate",
    approximateFinePriceNpr: 248370,
    approximateTejabiPriceNpr: 247520,
    faqs: [
      {
        question: "What is the 10 gram gold price in Nepal today?",
        answer: "Today's 10 gram 24K Hallmark gold rate is रु 2,48,370 and 22K Tejabi gold rate is रु 2,47,520.",
      },
      {
        question: "Why does FENEGOSIDA publish a separate 10 gram rate?",
        answer: "While traditional retail jewelry in Nepal is measured in Tolas and Lals, international banking, bullion minting, and government customs use the metric 10-gram standard.",
      },
    ],
    keywords: [
      "10 gram gold price in nepal today",
      "10 gram sunko vau",
      "ten gram gold price nepal",
      "fenegosida 10 gram rate",
    ],
  },
  {
    slug: "1-gram-gold-price-in-nepal-today",
    primaryKeyword: "1 gram gold price in nepal today",
    title: "1 Gram Gold Price in Nepal Today (१ ग्राम सुनको मूल्य) — 24K & 22K",
    shortTitle: "1 Gram Gold Price Today",
    nepaliTitle: "नेपालमा १ ग्राम सुनको मूल्य आज",
    metaDescription: "Find today's 1 gram gold price in Nepal: रु 24,837 for 24 Karat Fine Gold and रु 24,752 for 22 Karat Tejabi Gold. Live converter and rate breakdown.",
    unit: "gram",
    gramAmount: 1,
    metalType: "fine",
    weightGrams: 1,
    badge: "1 Gram = 0.0857 Tola = 8.57 Lal",
    headlineAnswer: "Today's 1 gram gold price in Nepal is approximately रु 24,837 for 24 Karat Hallmark Fine Gold and रु 24,752 for 22 Karat Tejabi Gold. To calculate 1 gram, divide the 10-gram rate by 10 (or the 1 Tola rate by 11.6638).",
    conversionFormula: "1 Gram Price = Today's 10g Price ÷ 10",
    approximateFinePriceNpr: 24837,
    approximateTejabiPriceNpr: 24752,
    faqs: [
      {
        question: "How much is 1 gram of gold in Nepal today?",
        answer: "1 gram of 24K gold is रु 24,837 and 1 gram of 22K gold is रु 24,752.",
      },
      {
        question: "How many Lal are in 1 gram of gold?",
        answer: "1 gram of gold is equal to approximately 8.573 Lal (since 1 Tola = 100 Lal = 11.6638g).",
      },
    ],
    keywords: [
      "1 gram gold price in nepal today",
      "1 gram gold rate nepal",
      "one gram gold price nepal today",
      "1 gm gold in npr",
    ],
  },
  {
    slug: "8-gram-gold-price-in-nepal-today",
    primaryKeyword: "8 gram gold price in nepal today",
    title: "8 Gram Gold Price in Nepal Today (१ गिन्नी / Ginni Coin Rate)",
    shortTitle: "8 Gram (1 Ginni) Gold Price",
    nepaliTitle: "नेपालमा ८ ग्राम (गिन्नी) सुनको भाउ",
    metaDescription: "Check today's 8 gram gold price in Nepal (1 Sovereign / Ginni coin standard): रु 1,98,696 for 24K Hallmark gold. Weight conversion and coin purchase guide.",
    unit: "gram",
    gramAmount: 8,
    metalType: "fine",
    weightGrams: 8,
    badge: "1 Ginni (Sovereign) = 8 Grams",
    headlineAnswer: "Today's 8 gram gold price in Nepal is approximately रु 1,98,696 for 24K Hallmark Fine Gold. 8 grams is the traditional standard weight for gold coins (known locally as Ginni / गिन्नी or British Gold Sovereign coins).",
    conversionFormula: "8 Grams Price = (10g Rate ÷ 10) × 8 (Approx 0.6859 Tola)",
    approximateFinePriceNpr: 198696,
    approximateTejabiPriceNpr: 198016,
    faqs: [
      {
        question: "What is an 8-gram gold coin called in Nepal?",
        answer: "An 8-gram gold coin is traditionally known in Nepal and South Asia as a 'Ginni' (गिन्नी), originating from the British Sovereign coin which weighs exactly 7.988 grams (standardized commercially to 8 grams).",
      },
      {
        question: "How much is 1 Ginni gold coin in Nepal today?",
        answer: "An 8-gram 24K gold Ginni costs approximately रु 1,98,696 plus a small coin minting/packaging fee (usually रु 500 - रु 1,000).",
      },
    ],
    keywords: [
      "8 gram gold price in nepal today",
      "ginni gold price in nepal",
      "1 ginni gold rate nepal",
      "8 gram gold coin nepal",
    ],
  },
  {
    slug: "tejabi-gold-price-in-nepal-today",
    primaryKeyword: "tejabi gold price in nepal today",
    title: "Tejabi Gold Price in Nepal Today (२२ क्यारेट तेजाबी सुनको भाउ)",
    shortTitle: "Tejabi (22K) Gold Price Today",
    nepaliTitle: "नेपालमा २२ क्यारेट तेजाबी सुनको भाउ",
    metaDescription: "Official 22K Tejabi gold price in Nepal today: रु 2,88,700 per tola and रु 24,752 per gram. Compare Tejabi vs Hallmark 24K gold rates and jewelry charges.",
    unit: "tola",
    tolaAmount: 1,
    lalAmount: 0,
    metalType: "tejabi",
    weightGrams: 11.6638,
    badge: "22 Karat (91.6% Pure Gold)",
    headlineAnswer: "Today's Tejabi Gold (22K) price in Nepal is रु 2,88,700 per tola (रु 2,47,520 per 10 grams). Tejabi gold has a purity of 91.6% (22 Karat) and is slightly less expensive than 24K Hallmark gold (usually रु 1,000 less per tola).",
    conversionFormula: "Tejabi Rate = 22 Karat Standard (91.6% purity)",
    approximateFinePriceNpr: 289700,
    approximateTejabiPriceNpr: 288700,
    faqs: [
      {
        question: "What is Tejabi gold in Nepal?",
        answer: "Tejabi gold (तेजाबी सुन) is recycled or refined 22 Karat gold with 91.6% purity. It is durable and commonly used for intricate traditional Nepali ornaments like mangalsutra, tilhari, and bridal sets.",
      },
      {
        question: "What is the difference between Chhapawal (Hallmark) and Tejabi gold in Nepal?",
        answer: "Chhapawal (छापावाल) is 24 Karat (99.9% pure) hallmark gold. Tejabi is 22 Karat (91.6% pure). Chhapawal is softer and purer, while Tejabi is mixed with small alloy metals to make it strong enough for daily jewelry wear.",
      },
    ],
    keywords: [
      "tejabi gold price in nepal today",
      "tejabi sun ko vau",
      "22 karat gold rate nepal",
      "chhapawal vs tejabi gold nepal",
    ],
  },
  {
    slug: "24k-hallmark-gold-price-in-nepal-today",
    primaryKeyword: "24k hallmark gold price in nepal today",
    title: "24K Hallmark Gold Price in Nepal Today (२४ क्यारेट छापावाल सुन)",
    shortTitle: "24K Hallmark Gold Price",
    nepaliTitle: "नेपालमा २४ क्यारेट छापावाल सुनको भाउ",
    metaDescription: "Official 24 Karat 99.9% pure Hallmark Fine gold rate in Nepal today: रु 2,89,700 per tola and रु 2,48,370 per 10 grams according to FENEGOSIDA.",
    unit: "tola",
    tolaAmount: 1,
    lalAmount: 0,
    metalType: "fine",
    weightGrams: 11.6638,
    badge: "24 Karat (99.9% Pure Hallmark)",
    headlineAnswer: "Today's 24K Hallmark Gold (छापावाल सुन) price in Nepal is रु 2,89,700 per tola, रु 2,48,370 per 10 grams, and रु 24,837 per 1 gram. Hallmark gold is certified at 99.9% purity.",
    conversionFormula: "99.9% Pure Gold — Highest Standard in Nepal",
    approximateFinePriceNpr: 289700,
    approximateTejabiPriceNpr: 288700,
    faqs: [
      {
        question: "What does Hallmark gold mean in Nepal?",
        answer: "Hallmark (छापावाल) gold signifies officially certified 24 Karat bullion purity (99.9% pure gold) guaranteed by commercial banks and certified jewelers.",
      },
    ],
    keywords: [
      "24k hallmark gold price in nepal today",
      "chhapawal sunko vau aaja",
      "24 carat fine gold nepal",
      "999 pure gold rate nepal",
    ],
  },
  {
    slug: "silver-price-in-nepal-today-per-tola",
    primaryKeyword: "silver price in nepal today per tola",
    title: "Silver Price in Nepal Today per Tola (चाँदीको भाउ) — Live Rate & Calculator",
    shortTitle: "Silver Price per Tola Today",
    nepaliTitle: "नेपालमा आज चाँदीको भाउ",
    metaDescription: "Current silver price in Nepal today: रु 4,100 per tola and रु 3,515 per 10 grams as per FENEGOSIDA. Convert silver weight in Tola, Lal, and Grams.",
    unit: "tola",
    tolaAmount: 1,
    lalAmount: 0,
    metalType: "silver",
    weightGrams: 11.6638,
    badge: "Official FENEGOSIDA Silver Rate",
    headlineAnswer: "Today's silver price in Nepal is रु 4,100 per tola and रु 3,515 per 10 grams according to official FENEGOSIDA market quotations.",
    conversionFormula: "1 Tola Silver = 11.6638 Grams = रु 4,100",
    approximateFinePriceNpr: 4100,
    approximateTejabiPriceNpr: 4100,
    faqs: [
      {
        question: "What is today's silver price in Nepal per tola?",
        answer: "Today's official silver price in Nepal is रु 4,100 per tola (11.6638 grams).",
      },
    ],
    keywords: [
      "silver price in nepal today per tola",
      "chandi ko vau aaja",
      "silver rate in nepal today",
      "today silver price nepal fenegosida",
    ],
  },
];
