export interface ProgrammaticTraditionalUnit {
  slug: string;
  fromUnit: string;
  toUnit: string;
  fromUnitNepali: string;
  toUnitNepali: string;
  factor: number;
  formula: string;
  title: string;
  shortTitle: string;
  metaDescription: string;
  headlineAnswer: string;
  faqs: Array<{ question: string; answer: string }>;
  keywords: string[];
}

export const PROGRAMMATIC_TRADITIONAL_UNITS: ProgrammaticTraditionalUnit[] = [
  {
    slug: "1-dharni-in-kg",
    fromUnit: "Dharni",
    toUnit: "Kilogram (KG)",
    fromUnitNepali: "धार्नी",
    toUnitNepali: "किलोग्राम (केजी)",
    factor: 2.3328,
    formula: "1 Dharni = 2.3328 KG (12 Pao)",
    title: "1 Dharni ma Kati KG Huncha? (१ धार्नीमा कति केजी हुन्छ?) — Nepal Weight Standard",
    shortTitle: "1 Dharni in KG",
    metaDescription: "1 Dharni equals 2.3328 KG officially in Nepal (often approximated as 2.4 kg or 2.5 kg in local bazaar trade). Convert Dharni, Pao, and KG instantly.",
    headlineAnswer: "In the official Nepali traditional measurement standard, 1 Dharni equals exactly 2.3328 Kilograms (2,332.8 grams). 1 Dharni consists of 12 Pao. In retail vegetable and fruit markets across Kathmandu and Nepal, traders traditionally approximate 1 Dharni as 2.4 KG or 2.5 KG.",
    faqs: [
      {
        question: "1 Dharni ma kati kg huncha? (How many KG in 1 Dharni?)",
        answer: "Officially, 1 Dharni is equal to 2.3328 Kilograms. In everyday trade and vegetable wholesale markets (Kalimati, Balkhu), 1 Dharni is colloquially rounded to 2.4 or 2.5 KG.",
      },
      {
        question: "1 Dharni ma kati Pao huncha?",
        answer: "1 Dharni contains exactly 12 Pao (१ धार्नी = १२ पाउ).",
      },
      {
        question: "Where is Dharni used in Nepal?",
        answer: "Dharni is widely used in local vegetable mandis, traditional butcher shops, dry fruit stores, and agricultural produce weighing across Nepal.",
      },
    ],
    keywords: [
      "1 dharni ma kati kg huncha",
      "dharni to kg converter",
      "1 dharni in kg nepal",
      "dharni to kg",
      "१ धार्नीमा कति केजी",
      "dharni pao kg nepal",
    ],
  },
  {
    slug: "1-pao-in-gram",
    fromUnit: "Pao",
    toUnit: "Grams",
    fromUnitNepali: "पाउ",
    toUnitNepali: "ग्राम",
    factor: 194.4,
    formula: "1 Pao = 194.4 Grams (Trade: ~200g)",
    title: "1 Pao ma Kati Gram Huncha? (१ पाउमा कति ग्राम हुन्छ?) — Nepal Pao to Gram",
    shortTitle: "1 Pao in Grams",
    metaDescription: "How many grams are in 1 Pao in Nepal? 1 Pao = 194.4 grams officially (approximated as 200 grams in local retail). 1 KG contains 5 Pao.",
    headlineAnswer: "Officially under Nepal's historical weights standard, 1 Pao equals 194.4 grams (since 12 Pao = 1 Dharni = 2.3328 kg). However, in modern daily market practice across Kathmandu and local stores, 1 Pao is universally treated as 200 grams, meaning exactly 5 Pao make 1 Kilogram (1 KG = 5 Pao).",
    faqs: [
      {
        question: "1 Pao ma kati gram huncha? (How many grams in 1 Pao?)",
        answer: "In local market practice, 1 Pao is 200 grams. Officially by traditional gazette measurement, 1 Pao is 194.4 grams.",
      },
      {
        question: "1 KG ma kati Pao huncha?",
        answer: "In retail practice, 1 Kilogram contains exactly 5 Pao (5 × 200g = 1,000g). Officially, 1 KG equals 5.14 traditional Pao.",
      },
    ],
    keywords: [
      "1 pao ma kati gram huncha",
      "pao to gram nepal",
      "1 kg ma kati pao huncha",
      "pao to kg converter",
      "१ पाउमा कति ग्राम",
    ],
  },
  {
    slug: "1-pathi-in-mana",
    fromUnit: "Pathi",
    toUnit: "Mana",
    fromUnitNepali: "पाथी",
    toUnitNepali: "माना",
    factor: 8,
    formula: "1 Pathi = 8 Mana (Approx. 4.54 Liters)",
    title: "1 Pathi ma Kati Mana Huncha? (१ पाथीमा कति माना हुन्छ?) — Nepal Grain Measure",
    shortTitle: "1 Pathi in Mana",
    metaDescription: "1 Pathi equals exactly 8 Mana (approx. 4.54 liters or ~3.5 to 4.2 kg for rice and grains). Traditional volumetric measurement converter.",
    headlineAnswer: "In the traditional Nepali volumetric system, 1 Pathi equals exactly 8 Mana (१ पाथी = ८ माना). In metric volume, 1 Pathi is approximately 4.54 Liters (1 Gallon). In terms of dry food grain weight, 1 Pathi of paddy or rice weighs between 3.5 KG and 4.2 KG depending on moisture content and grain variety.",
    faqs: [
      {
        question: "1 Pathi ma kati Mana huncha? (How many Mana in 1 Pathi?)",
        answer: "1 Pathi is exactly 8 Mana (१ पाथी = ८ माना).",
      },
      {
        question: "1 Pathi chamal ma kati KG huncha?",
        answer: "1 Pathi of clean white rice typically weighs approximately 3.7 to 4.0 Kilograms.",
      },
      {
        question: "How many Pathi are in 1 Muri?",
        answer: "1 Muri contains exactly 20 Pathi or 160 Mana.",
      },
    ],
    keywords: [
      "1 pathi ma kati mana huncha",
      "pathi to mana converter",
      "1 pathi in kg nepal",
      "pathi to kg chamal",
      "१ पाथीमा कति माना",
    ],
  },
  {
    slug: "1-muri-in-pathi",
    fromUnit: "Muri",
    toUnit: "Pathi",
    fromUnitNepali: "मुरी",
    toUnitNepali: "पाथी",
    factor: 20,
    formula: "1 Muri = 20 Pathi = 160 Mana",
    title: "1 Muri ma Kati Pathi Huncha? (१ मुरीमा कति पाथी हुन्छ?) — Nepal Agriculture",
    shortTitle: "1 Muri in Pathi",
    metaDescription: "1 Muri equals 20 Pathi (160 Mana). In grain weight, 1 Muri of paddy is approx. 50 kg to 60 kg, and 1 Muri of rice is approx. 70 kg to 80 kg.",
    headlineAnswer: "1 Muri contains exactly 20 Pathi or 160 Mana (१ मुरी = २० पाथी = १६० माना). When weighing agricultural harvest in Nepal: 1 Muri of unhusked paddy (धान) weighs approximately 50 KG, while 1 Muri of husked milled rice (चामल) weighs approximately 75 KG to 80 KG.",
    faqs: [
      {
        question: "1 Muri ma kati Pathi huncha?",
        answer: "1 Muri equals 20 Pathi or 160 Mana.",
      },
      {
        question: "1 Muri dhan ma kati KG huncha?",
        answer: "1 Muri of unhusked paddy (Dhan) typically weighs 48 to 50 Kilograms.",
      },
      {
        question: "1 Muri chamal ma kati KG huncha?",
        answer: "1 Muri of milled rice (Chamal) typically weighs approximately 75 to 80 Kilograms.",
      },
    ],
    keywords: [
      "1 muri ma kati pathi huncha",
      "muri to pathi nepal",
      "1 muri dhan ma kati kg",
      "1 muri in kg nepal",
      "१ मुरीमा कति पाथी",
    ],
  },
  {
    slug: "1-quintal-in-kg",
    fromUnit: "Quintal",
    toUnit: "Kilogram (KG)",
    fromUnitNepali: "क्विन्टल",
    toUnitNepali: "केजी",
    factor: 100,
    formula: "1 Quintal = 100 KG",
    title: "1 Quintal ma Kati KG Huncha? (१ क्विन्टलमा कति केजी हुन्छ?) — Nepal Standard",
    shortTitle: "1 Quintal in KG",
    metaDescription: "1 Quintal equals exactly 100 Kilograms (KG). Calculate grain sacks, cement, fertilizer, and agricultural harvest in Nepal.",
    headlineAnswer: "In Nepal and internationally, 1 Quintal equals exactly 100 Kilograms (१ क्विन्टल = १०० केजी). Standard agricultural produce, sugar sacks, cement supply, and wholesale Krishi mal in Nepal are traded in quintals.",
    faqs: [
      {
        question: "1 Quintal ma kati KG huncha?",
        answer: "1 Quintal is exactly equal to 100 Kilograms (१०० केजी).",
      },
      {
        question: "1 Tonne ma kati Quintal huncha?",
        answer: "1 Metric Tonne contains exactly 10 Quintals (1,000 Kilograms).",
      },
    ],
    keywords: [
      "1 quintal ma kati kg huncha",
      "quintal to kg converter",
      "1 quintal in kg nepal",
      "१ क्विन्टलमा कति केजी",
    ],
  },
  {
    slug: "1-mana-in-gram-ml",
    fromUnit: "Mana",
    toUnit: "Grams / Milliliters",
    fromUnitNepali: "माना",
    toUnitNepali: "ग्राम / मिलिलिटर",
    factor: 568,
    formula: "1 Mana ≈ 568 ML (Volume) | ~450g to 500g (Rice/Grain)",
    title: "1 Mana ma Kati Gram Huncha? (१ मानामा कति ग्राम र मिलिलिटर हुन्छ?) — Nepal",
    shortTitle: "1 Mana in Grams & ML",
    metaDescription: "1 Mana equals approximately 568 ml (0.568 liters) in liquid volume and 450g to 500g (half kg) when measuring rice, dal, or grains in Nepal.",
    headlineAnswer: "In Nepal's traditional volumetric system, 1 Mana equals approximately 568 milliliters (1/8th of a Pathi). Because Mana measures volume rather than mass, its weight in grams depends on the item: 1 Mana of milled rice (चामल) or lentils (दाल) weighs approximately 450 to 500 grams, while 1 Mana of water or milk weighs ~568 grams.",
    faqs: [
      {
        question: "1 Mana chamal ma kati gram huncha?",
        answer: "1 Mana of white rice (चामल) weighs approximately 450 grams to 500 grams (nearly half a kilogram).",
      },
      {
        question: "1 Mana ma kati Muthi huncha?",
        answer: "In traditional Nepali village measurement, 1 Mana contains 10 Muthi (१ माना = १० मुठी).",
      },
      {
        question: "Kati Mana ko 1 Pathi huncha?",
        answer: "8 Mana make 1 Pathi (८ माना = १ पाथी).",
      },
    ],
    keywords: [
      "1 mana ma kati gram huncha",
      "1 mana in kg nepal",
      "mana to gram converter",
      "1 mana chamal in gram",
      "१ मानामा कति ग्राम",
    ],
  },
  {
    slug: "1-sher-in-kg-gram",
    fromUnit: "Sher",
    toUnit: "Grams",
    fromUnitNepali: "सेर",
    toUnitNepali: "ग्राम",
    factor: 933.1,
    formula: "1 Sher = 933.1 Grams (16 Chhatak / ~0.93 KG)",
    title: "1 Sher ma Kati Gram / KG Huncha? (१ सेरमा कति ग्राम हुन्छ?) — Nepal Weight",
    shortTitle: "1 Sher in Grams & KG",
    metaDescription: "1 Sher equals 933.12 grams (0.933 kg) or 16 Chhatak (80 Tola) in traditional Nepali and Terai weight standards.",
    headlineAnswer: "In traditional Nepali weight measurement, 1 Sher (सेर) equals 933.12 grams (approximately 0.933 Kilograms). 1 Sher is divided into 16 Chhatak or 80 Tola, and 2.5 Sher equal 1 Dharni (2.3328 KG).",
    faqs: [
      {
        question: "1 Sher ma kati gram huncha?",
        answer: "1 Sher is equal to 933.12 grams (slightly less than 1 Kilogram).",
      },
      {
        question: "1 Sher ma kati Chhatak wa Tola huncha?",
        answer: "1 Sher contains 16 Chhatak or 80 Tola.",
      },
    ],
    keywords: [
      "1 sher ma kati gram huncha",
      "sher to kg converter nepal",
      "1 sher in kg nepal",
      "१ सेरमा कति ग्राम",
    ],
  },
  {
    slug: "1-chhatak-in-gram",
    fromUnit: "Chhatak",
    toUnit: "Grams",
    fromUnitNepali: "छटाक",
    toUnitNepali: "ग्राम",
    factor: 58.32,
    formula: "1 Chhatak = 58.32 Grams (5 Tola)",
    title: "1 Chhatak ma Kati Gram Huncha? (१ छटाकमा कति ग्राम हुन्छ?) — Nepal",
    shortTitle: "1 Chhatak in Grams",
    metaDescription: "1 Chhatak equals 58.32 grams (or exactly 5 Tola) in traditional Nepali weight measurements used for spices, ghee, and herbs.",
    headlineAnswer: "In Nepal's traditional weight system, 1 Chhatak (छटाक) equals 58.32 grams (which is exactly 5 Tola). 16 Chhatak make 1 Sher (933.12 grams).",
    faqs: [
      {
        question: "1 Chhatak ma kati gram huncha?",
        answer: "1 Chhatak equals 58.32 grams (often rounded to 50–60 grams in retail spice shops).",
      },
      {
        question: "1 Chhatak ma kati Tola huncha?",
        answer: "1 Chhatak equals exactly 5 Tola (5 × 11.6638g = 58.32g).",
      },
    ],
    keywords: [
      "1 chhatak ma kati gram huncha",
      "chhatak to gram nepal",
      "१ छटाकमा कति ग्राम",
    ],
  },
  {
    slug: "1-haat-in-feet-inch",
    fromUnit: "Haat",
    toUnit: "Feet",
    fromUnitNepali: "हात",
    toUnitNepali: "फिट (१८ इन्च)",
    factor: 1.5,
    formula: "1 Haat = 1.5 Feet = 18 Inches (2 Bitta)",
    title: "1 Haat ma Kati Feet / Inch Huncha? (१ हातमा कति इन्च र फिट हुन्छ?) — Nepal",
    shortTitle: "1 Haat in Feet & Inches",
    metaDescription: "In traditional Nepali length measurement, 1 Haat (cubit) equals 18 inches or 1.5 feet (0.4572 meters), consisting of 2 Bitta.",
    headlineAnswer: "In traditional Nepali linear measurement, 1 Haat (हात) is standardized as 18 Inches or 1.5 Feet (45.72 cm). 1 Haat consists of 2 Bitta (बित्ता, 9 inches each) and 2 Haat make 1 Gaj (गज, 36 inches or 1 Yard).",
    faqs: [
      {
        question: "1 Haat ma kati inch wa feet huncha?",
        answer: "1 Haat equals 18 inches (1.5 feet).",
      },
      {
        question: "1 Bitta ma kati inch huncha?",
        answer: "1 Bitta (handspan) equals 9 inches (half of 1 Haat).",
      },
    ],
    keywords: [
      "1 haat ma kati inch huncha",
      "1 haat in feet nepal",
      "bitta haat gaj converter nepal",
      "१ हातमा कति इन्च",
    ],
  },
  {
    slug: "1-kosh-in-km",
    fromUnit: "Kosh",
    toUnit: "Kilometers (KM)",
    fromUnitNepali: "कोष",
    toUnitNepali: "किलोमिटर",
    factor: 3.218,
    formula: "1 Kosh ≈ 3.22 Kilometers (2 Miles)",
    title: "1 Kosh ma Kati Kilometer Huncha? (१ कोषमा कति किलोमिटर हुन्छ?) — Nepal Distance",
    shortTitle: "1 Kosh in Kilometers",
    metaDescription: "How many kilometers in 1 Kosh in Nepal? 1 Kosh equals approximately 3.22 kilometers (2 miles or 2,000 Danda/Gaj) in traditional Nepali trail distance.",
    headlineAnswer: "In Nepal's traditional distance measurement system, 1 Kosh (कोष) equals approximately 3.22 Kilometers (or 2 British Miles). Historically across Nepal's Hulaki Marga and hill trails, 4 Kosh equal 1 Yojan (~12.87 KM).",
    faqs: [
      {
        question: "1 Kosh ma kati kilometer huncha?",
        answer: "1 Kosh is approximately 3.22 Kilometers (often rounded to 3 KM in rural walking estimates).",
      },
      {
        question: "1 Kosh ma kati Mile huncha?",
        answer: "1 Kosh equals 2 Miles.",
      },
    ],
    keywords: [
      "1 kosh ma kati kilometer huncha",
      "1 kosh in km nepal",
      "kosh to km converter",
      "१ कोषमा कति किलोमिटर",
    ],
  },
  {
    slug: "1-bitta-in-inch",
    fromUnit: "Bitta",
    toUnit: "Inches",
    fromUnitNepali: "बित्ता",
    toUnitNepali: "इन्च",
    factor: 9,
    formula: "1 Bitta = 9 Inches (22.86 cm)",
    title: "1 Bitta ma Kati Inch Huncha? (१ बित्तामा कति इन्च हुन्छ?) — Nepal",
    shortTitle: "1 Bitta in Inches",
    metaDescription: "1 traditional Nepali Bitta (handspan) equals 9 inches or 22.86 centimeters. 2 Bitta make exactly 1 Haat (18 inches).",
    headlineAnswer: "In traditional Nepali body-length measurement, 1 Bitta (बित्ता) is standardized as exactly 9 Inches (22.86 cm). 2 Bitta make 1 Haat (18 inches).",
    faqs: [
      {
        question: "1 Bitta ma kati inch huncha?",
        answer: "1 Bitta equals 9 inches (22.86 cm).",
      },
    ],
    keywords: ["1 bitta ma kati inch huncha", "1 bitta in cm", "१ बित्तामा कति इन्च"],
  },
  {
    slug: "1-gaj-in-feet",
    fromUnit: "Gaj",
    toUnit: "Feet",
    fromUnitNepali: "गज",
    toUnitNepali: "फिट (३ फिट / १ यार्ड)",
    factor: 3,
    formula: "1 Gaj = 3 Feet = 36 Inches = 1 Yard",
    title: "1 Gaj ma Kati Feet Huncha? (१ गजमा कति फिट हुन्छ?) — Nepal Cloth & Land",
    shortTitle: "1 Gaj in Feet",
    metaDescription: "1 Gaj equals 3 feet or 36 inches (0.9144 meters / 1 British Yard). Used for traditional tailoring cloth, land frontage, and timber measurement.",
    headlineAnswer: "In Nepal, 1 Gaj (गज) is exactly equal to 3 Feet (36 Inches or 0.9144 Meters), which corresponds to 1 Yard. 1 Gaj contains 2 Haat.",
    faqs: [
      {
        question: "1 Gaj ma kati feet huncha?",
        answer: "1 Gaj equals exactly 3 feet (36 inches).",
      },
    ],
    keywords: ["1 gaj ma kati feet huncha", "1 gaj in meter nepal", "१ गजमा कति फिट"],
  },
  {
    slug: "1-muri-in-kg",
    fromUnit: "Muri",
    toUnit: "Kilogram (KG)",
    fromUnitNepali: "मुरी",
    toUnitNepali: "किलोग्राम",
    factor: 50,
    formula: "1 Muri Dhan ≈ 50 KG | 1 Muri Chamal ≈ 75 KG",
    title: "1 Muri ma Kati KG Huncha? (१ मुरी धान / चामलमा कति केजी हुन्छ?) — Nepal",
    shortTitle: "1 Muri in KG",
    metaDescription: "How many KG in 1 Muri of grain in Nepal? 1 Muri paddy (Dhan) weighs approx 50 KG; 1 Muri milled rice (Chamal) weighs approx 75 KG. 1 Muri = 20 Pathi.",
    headlineAnswer: "Because Muri is a volumetric measure (20 Pathi ≈ 87.2 Liters), weight varies by grain: 1 Muri of unhusked paddy (धान) weighs approximately 48 to 50 KG, while 1 Muri of milled rice (चामल) weighs approximately 72 to 75 KG.",
    faqs: [
      {
        question: "1 Muri dhan ma kati kg huncha?",
        answer: "1 Muri of paddy (धान) is approximately 50 Kilograms.",
      },
      {
        question: "1 Muri ma kati Pathi huncha?",
        answer: "1 Muri equals exactly 20 Pathi (१ मुरी = २० पाथी = १६० माना).",
      },
    ],
    keywords: ["1 muri ma kati kg huncha", "1 muri dhan ma kati kg", "1 muri chamal weight nepal", "१ मुरीमा कति केजी"],
  },
  {
    slug: "1-pao-in-grams",
    fromUnit: "Pao",
    toUnit: "Grams",
    fromUnitNepali: "पाउ",
    toUnitNepali: "ग्राम",
    factor: 194.4,
    formula: "1 Pao ≈ 200 Grams (Officially 194.4g)",
    title: "1 Pao ma Kati Gram Huncha? (१ पाउमा कति ग्राम हुन्छ?) — Nepal Grocery Standard",
    shortTitle: "1 Pao in Grams",
    metaDescription: "In Nepal grocery retail, 1 Pao is traditionally standardized as 200 grams (1/5th of a KG), while historical pure Dharni Pao is 194.4 grams.",
    headlineAnswer: "In everyday Nepali vegetable and grocery retail, 1 Pao (पाउ) is standardized as 200 Grams (so 5 Pao = 1 KG). Under the traditional royal Dharni standard, 1 Pao equals exactly 194.4 grams (1/12th of a 2.3328 KG Dharni).",
    faqs: [
      {
        question: "1 Pao ma kati gram huncha?",
        answer: "In modern Nepali markets (Bazaar standard), 1 Pao equals 200 Grams. In traditional weights, 1 Pao = 194.4 grams.",
      },
    ],
    keywords: ["1 pao ma kati gram huncha", "1 pao in grams nepal", "१ पाउमा कति ग्राम"],
  },
  {
    slug: "1-ratti-in-grams",
    fromUnit: "Ratti",
    toUnit: "Grams / Carat",
    fromUnitNepali: "रत्ती",
    toUnitNepali: "ग्राम / क्यारेट",
    factor: 0.1215,
    formula: "1 Ratti ≈ 0.1215 Grams (0.6075 Carat)",
    title: "1 Ratti ma Kati Gram Huncha? (१ रत्तीमा कति ग्राम र क्यारेट हुन्छ?) — Nepal Gemstone",
    shortTitle: "1 Ratti in Grams",
    metaDescription: "How many grams in 1 Ratti for astrologic gemstones (रुबी, पन्ना, नीलम) in Nepal? 1 Ratti equals 0.1215 grams (or 0.6075 Carat / 121.5 milligrams).",
    headlineAnswer: "In Nepal's astrological and gemstone trade, 1 Ratti (रत्ती, Gunja seed standard) equals 0.1215 Grams (121.5 milligrams or approximately 0.608 Carat). 8 Ratti make 1 Masha, and 12 Masha make 1 Tola.",
    faqs: [
      {
        question: "1 Ratti ma kati gram huncha?",
        answer: "1 Ratti equals approximately 0.1215 grams (121.5 mg) or 0.6075 Carat.",
      },
    ],
    keywords: ["1 ratti ma kati gram huncha", "ratti to carat nepal", "gemstone ratti calculator nepal", "१ रत्तीमा कति ग्राम"],
  },
];
