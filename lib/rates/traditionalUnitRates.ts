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
];
