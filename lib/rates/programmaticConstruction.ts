export interface ProgrammaticConstruction {
  slug: string;
  title: string;
  shortTitle: string;
  metaDescription: string;
  keywords: string[];
  builtUpAreaSqFt: number;
  floorsText: string;
  estimatedBudget: string;
  ratePerSqFt: string;
  cementBags: string;
  steelRebarTons: string;
  bricksCount: string;
  laborShare: string;
  materialShare: string;
  headlineAnswer: string;
  faqs: { question: string; answer: string }[];
}

export const PROGRAMMATIC_CONSTRUCTION_SCENARIOS: ProgrammaticConstruction[] = [
  {
    slug: "cost-to-build-2-point-5-storey-house-in-nepal",
    title: "Cost to Build 2.5 Storey House in Nepal (२.५ तल्ला घर बनाउने खर्च) — 2026 Estimate",
    shortTitle: "2.5 Storey House Cost",
    metaDescription: "How much does it cost to build a 2.5 storey (२.५ तल्ला) RCC house in Nepal? Total construction budget, bags of cement, steel rod (rebar), bricks, and labor costs.",
    keywords: ["cost to build 2.5 storey house in nepal", "2.5 tala ghar banaune kharcha", "2.5 storey house construction cost nepal", "ghar banaune kharcha 2026", "cement rod estimate nepal"],
    builtUpAreaSqFt: 2000,
    floorsText: "2.5 Storey (२.५ तल्ला)",
    estimatedBudget: "NPR 85,00,000 to NPR 95,00,000",
    ratePerSqFt: "NPR 4,250 – NPR 4,750 / sq ft",
    cementBags: "850 – 950 Bags (OPC & PPC)",
    steelRebarTons: "7.5 – 8.5 Metric Tons (500D TMT)",
    bricksCount: "38,000 – 42,000 First-Class Bricks",
    laborShare: "NPR 30,00,000 (Approx 35%)",
    materialShare: "NPR 58,00,000 (Approx 65%)",
    headlineAnswer: "Building a standard quality 2.5-storey RCC residential house in Nepal with roughly 2,000 sq ft built-up area costs between NPR 85 Lakh and NPR 95 Lakh (average NPR 4,500/sq ft). This includes structural RCC work, brick masonry, plaster, standard tile/marble flooring, plumbing, electrical, and painting.",
    faqs: [
      {
        question: "How long does it take to construct a 2.5 storey house in Kathmandu?",
        answer: "On average, complete construction of a 2.5-storey RCC pillar house takes between 8 to 12 months, allowing adequate curing time (at least 21 to 28 days per slab).",
      },
      {
        question: "How much land is needed for a 2.5 storey house in Nepal?",
        answer: "A 2.5-storey house can comfortably be built on 3 Aana (1,026.75 sq ft) to 4 Aana (1,369 sq ft) of land, leaving mandatory 5-foot setbacks on all boundaries as required by Nepal municipal building bylaws.",
      },
    ],
  },
  {
    slug: "cost-to-build-1-storey-house-in-nepal",
    title: "Cost to Build 1 Storey House in Nepal (१ तल्ला घर खर्च) — Budget & Materials",
    shortTitle: "1 Storey House Cost",
    metaDescription: "Estimate total cost to build a 1-storey (single floor) house in Nepal. Structural foundation for future vertical extension, material costs, and labor breakdown.",
    keywords: ["cost to build 1 storey house in nepal", "1 tala ghar banaune kharcha", "single floor house cost nepal", "1 storey house construction nepal"],
    builtUpAreaSqFt: 850,
    floorsText: "1 Storey (१ तल्ला with foundation for 2.5)",
    estimatedBudget: "NPR 38,00,000 to NPR 44,00,000",
    ratePerSqFt: "NPR 4,500 – NPR 5,100 / sq ft",
    cementBags: "420 – 460 Bags",
    steelRebarTons: "3.8 – 4.2 Metric Tons",
    bricksCount: "16,000 – 18,000 Bricks",
    laborShare: "NPR 14,00,000 (Approx 35%)",
    materialShare: "NPR 26,00,000 (Approx 65%)",
    headlineAnswer: "Constructing a 1-storey RCC house (approx 850 sq ft) engineered with foundations to add upper floors in the future costs between NPR 38 Lakh and NPR 44 Lakh in Nepal. Foundation and footing earthwork make up a larger portion of first-floor construction.",
    faqs: [
      {
        question: "Is it cheaper to build load-bearing brick masonry or RCC frame for 1 storey?",
        answer: "While load-bearing brick wall masonry is 15-20% cheaper upfront, municipal building codes across Nepal require RCC pillar-beam frames (12x12 inch pillars) in seismic zones to ensure earthquake safety and permit future vertical expansion.",
      },
    ],
  },
  {
    slug: "cost-to-build-2-storey-house-in-nepal",
    title: "Cost to Build 2 Storey House in Nepal (२ तल्ला घर बनाउने खर्च) — 2026 Budget",
    shortTitle: "2 Storey House Cost",
    metaDescription: "Total estimated budget and raw material quantities for a 2-storey house in Nepal. Built-up area, cement, steel, bricks, sand, and labor wages.",
    keywords: ["cost to build 2 storey house in nepal", "2 tala ghar banaune kharcha", "2 storey house cost kathmandu", "double storey construction nepal"],
    builtUpAreaSqFt: 1600,
    floorsText: "2 Storey (२ तल्ला)",
    estimatedBudget: "NPR 68,00,000 to NPR 76,00,000",
    ratePerSqFt: "NPR 4,250 – NPR 4,750 / sq ft",
    cementBags: "700 – 760 Bags",
    steelRebarTons: "6.0 – 6.8 Metric Tons",
    bricksCount: "30,000 – 33,000 Bricks",
    laborShare: "NPR 24,50,000 (Approx 35%)",
    materialShare: "NPR 47,50,000 (Approx 65%)",
    headlineAnswer: "A standard 2-storey RCC residential house with 1,600 sq ft built-up area costs between NPR 68 Lakh and NPR 76 Lakh in Nepal. This covers 4 to 5 bedrooms, living rooms, 2-3 bathrooms, kitchen, and standard finishes.",
    faqs: [
      {
        question: "What is the contractor labor rate per square foot in Nepal?",
        answer: "For labor-only contracts (excluding materials), contractors in Kathmandu, Lalitpur, and Pokhara charge between NPR 450 and NPR 600 per square foot for structural civil construction and plastering.",
      },
    ],
  },
  {
    slug: "cost-to-build-3-storey-house-in-nepal",
    title: "Cost to Build 3 Storey House in Nepal (३ तल्ला घर खर्च) — Commercial & Residential",
    shortTitle: "3 Storey House Cost",
    metaDescription: "Cost breakdown to construct a 3-storey RCC residential or rental apartment house in Nepal. Budget, cement bags, steel rebar, and finishing costs.",
    keywords: ["cost to build 3 storey house in nepal", "3 tala ghar banaune kharcha", "3 storey house construction budget nepal", "rental house construction nepal"],
    builtUpAreaSqFt: 2500,
    floorsText: "3 Storey (३ तल्ला)",
    estimatedBudget: "NPR 1,08,00,000 to NPR 1,22,00,000",
    ratePerSqFt: "NPR 4,300 – NPR 4,850 / sq ft",
    cementBags: "1,100 – 1,250 Bags",
    steelRebarTons: "10.0 – 11.5 Metric Tons",
    bricksCount: "48,000 – 54,000 Bricks",
    laborShare: "NPR 39,00,000 (Approx 35%)",
    materialShare: "NPR 76,00,000 (Approx 65%)",
    headlineAnswer: "Constructing a 3-storey RCC house with 2,500 sq ft built-up area in Nepal costs between NPR 1.08 Crore and NPR 1.22 Crore. This multi-floor design is popular for rental flat income alongside owner residence.",
    faqs: [
      {
        question: "Do 3-storey buildings require municipal soil testing in Nepal?",
        answer: "Yes, under Nepal National Building Code (NBC 105:2020) and municipal bylaws, houses of 3 or more storeys or buildings over 1,000 sq ft footprint require an engineering geotechnical soil test report prior to building permit (नक्सा पास) approval.",
      },
    ],
  },
  {
    slug: "cost-of-building-1000-sq-ft-house-kathmandu",
    title: "Cost of Building 1000 Sq Ft House in Kathmandu (१००० वर्गफिट घर खर्च)",
    shortTitle: "1000 Sq Ft House Cost",
    metaDescription: "Calculate construction cost for a 1000 sq ft house in Kathmandu Valley. Standard rates per sq ft, cement, steel rebar, sand, gravel, and finish estimates.",
    keywords: ["cost of building 1000 sq ft house kathmandu", "1000 sq ft house cost nepal", "1000 sq ft ghar banaune kharcha", "construction cost per sq ft kathmandu"],
    builtUpAreaSqFt: 1000,
    floorsText: "1 to 1.5 Storey (1,000 sq ft)",
    estimatedBudget: "NPR 44,00,000 to NPR 49,00,000",
    ratePerSqFt: "NPR 4,400 – NPR 4,900 / sq ft",
    cementBags: "430 – 470 Bags",
    steelRebarTons: "3.8 – 4.3 Metric Tons",
    bricksCount: "19,000 – 21,000 Bricks",
    laborShare: "NPR 15,50,000",
    materialShare: "NPR 30,50,000",
    headlineAnswer: "Building a 1,000 sq ft home in Kathmandu Valley costs between NPR 44 Lakh and NPR 49 Lakh for standard finish RCC construction. Material transport, river sand (वाशिङ बालुवा), and aggregate haulage account for key cost factors in valley municipalities.",
    faqs: [
      {
        question: "What is the average cost of river sand and gravel per tipper in Kathmandu?",
        answer: "A standard 10-wheeler tipper of washed river sand (वाशिङ बालुवा) typically costs NPR 26,000 to NPR 32,000, while crushed aggregate (रोडा/गिट्टी) costs NPR 28,000 to NPR 34,000 delivered to site in Kathmandu.",
      },
    ],
  },
  {
    slug: "cost-of-building-1500-sq-ft-house-nepal",
    title: "Cost of Building 1500 Sq Ft House in Nepal (१५०० वर्गफिट घर बनाउने खर्च)",
    shortTitle: "1500 Sq Ft House Cost",
    metaDescription: "What does it cost to construct a 1500 sq ft residential house in Nepal? Detailed budget, cement bags, steel tonnage, bricks, and labor costs.",
    keywords: ["cost of building 1500 sq ft house nepal", "1500 sq ft house construction cost", "1500 sq ft ghar kharcha nepal", "house cost 1500 sq ft"],
    builtUpAreaSqFt: 1500,
    floorsText: "2 Storey (1,500 sq ft)",
    estimatedBudget: "NPR 64,00,000 to NPR 72,00,000",
    ratePerSqFt: "NPR 4,250 – NPR 4,800 / sq ft",
    cementBags: "640 – 700 Bags",
    steelRebarTons: "5.6 – 6.2 Metric Tons",
    bricksCount: "28,000 – 31,000 Bricks",
    laborShare: "NPR 23,00,000",
    materialShare: "NPR 45,00,000",
    headlineAnswer: "A 1,500 sq ft residential house in Nepal costs approximately NPR 64 Lakh to NPR 72 Lakh for turnkey construction, comprising foundation earthwork, structural RCC framing, exterior plaster, weather-coat paint, and standard sanitary fixtures.",
    faqs: [
      {
        question: "How much cement is needed per square foot of construction in Nepal?",
        answer: "An established engineering thumb rule in Nepal calculates approximately 0.42 to 0.46 bags of cement (50kg each) per square foot of total built-up area for standard RCC residential houses.",
      },
    ],
  },
  {
    slug: "cost-of-building-2000-sq-ft-house-nepal",
    title: "Cost of Building 2000 Sq Ft House in Nepal (२००० वर्गफिट घर निर्माण खर्च)",
    shortTitle: "2000 Sq Ft House Cost",
    metaDescription: "Comprehensive construction estimate for 2000 sq ft residential building in Nepal. Total cost, materials bill, and labor wages.",
    keywords: ["cost of building 2000 sq ft house nepal", "2000 sq ft house cost kathmandu", "2000 sq ft ghar banaune kharcha", "construction cost 2000 sq ft"],
    builtUpAreaSqFt: 2000,
    floorsText: "2.5 Storey (2,000 sq ft)",
    estimatedBudget: "NPR 85,00,000 to NPR 96,00,000",
    ratePerSqFt: "NPR 4,250 – NPR 4,800 / sq ft",
    cementBags: "850 – 920 Bags",
    steelRebarTons: "7.6 – 8.4 Metric Tons",
    bricksCount: "38,000 – 42,000 Bricks",
    laborShare: "NPR 31,00,000",
    materialShare: "NPR 60,00,000",
    headlineAnswer: "Constructing a 2,000 sq ft home across 2 to 2.5 storeys costs between NPR 85 Lakh and NPR 96 Lakh in Nepal. Finishing accounts for nearly 40% of the cost, including tiles, kitchen counters, UPVC/aluminum windows, and bathroom fittings.",
    faqs: [
      {
        question: "What percentage of construction cost goes into finishing in Nepal?",
        answer: "Finishing materials (vitrified tiles, marble/granite, sanitaryware, modular kitchen, electrical wiring, switches, and paint) represent roughly 35% to 42% of the total house budget.",
      },
    ],
  },
  {
    slug: "3-aana-house-construction-cost-nepal",
    title: "3 Aana House Construction Cost in Nepal (३ आना जग्गामा घर बनाउने खर्च)",
    shortTitle: "3 Aana House Cost",
    metaDescription: "How much does it cost to build a 2.5-storey house on a 3 Aana (1,026 sq ft) plot in Kathmandu Nepal? Setback rules, built-up area, and total budget.",
    keywords: ["3 aana house construction cost nepal", "3 aana ma ghar banaune kharcha", "cost to build house on 3 aana nepal", "3 aana plotting house budget"],
    builtUpAreaSqFt: 1750,
    floorsText: "2.5 Storey on 3 Aana (1,026.75 sq ft plot)",
    estimatedBudget: "NPR 76,00,000 to NPR 86,00,000",
    ratePerSqFt: "NPR 4,350 – NPR 4,900 / sq ft",
    cementBags: "750 – 820 Bags",
    steelRebarTons: "6.5 – 7.2 Metric Tons",
    bricksCount: "33,000 – 36,000 Bricks",
    laborShare: "NPR 27,50,000",
    materialShare: "NPR 53,50,000",
    headlineAnswer: "On a 3 Aana plot (1,026.75 sq ft), mandatory 5-foot setbacks leave approximately 680–720 sq ft of ground footprint (FAR-compliant). Constructing a 2.5-storey home with ~1,750 sq ft built-up area costs between NPR 76 Lakh and NPR 86 Lakh.",
    faqs: [
      {
        question: "Can you park a car on a 3 Aana house in Kathmandu?",
        answer: "Yes, by designing ground-floor open stilt parking (or leaving 12x18 feet in front of the portico), a 3 Aana plot can accommodate 1 hatchback/sedan and 2 motorcycles alongside living quarters.",
      },
    ],
  },
  {
    slug: "4-aana-house-construction-cost-nepal",
    title: "4 Aana House Construction Cost in Nepal (४ आना जग्गामा घर बनाउने खर्च)",
    shortTitle: "4 Aana House Cost",
    metaDescription: "Detailed estimate to build a 2.5 storey residential home on a 4 Aana (1,369 sq ft) plot in Nepal. Total building cost, garden space, and materials required.",
    keywords: ["4 aana house construction cost nepal", "4 aana ma ghar banaune kharcha", "4 aana house budget kathmandu", "cost to build house on 4 aana land"],
    builtUpAreaSqFt: 2300,
    floorsText: "2.5 Storey on 4 Aana (1,369 sq ft plot)",
    estimatedBudget: "NPR 98,00,000 to NPR 1,12,00,000",
    ratePerSqFt: "NPR 4,250 – NPR 4,850 / sq ft",
    cementBags: "980 – 1,060 Bags",
    steelRebarTons: "8.6 – 9.6 Metric Tons",
    bricksCount: "44,000 – 48,000 Bricks",
    laborShare: "NPR 36,00,000",
    materialShare: "NPR 68,00,000",
    headlineAnswer: "Building a spacious 2.5-storey home on a 4 Aana plot (1,369 sq ft) yields approximately 2,300 sq ft of built-up area while leaving room for compound parking and a small garden. The total construction cost ranges from NPR 98 Lakh to NPR 1.12 Crore.",
    faqs: [
      {
        question: "What is the floor area ratio (FAR) allowed on a 4 Aana plot in Kathmandu?",
        answer: "In Kathmandu Valley urban residential zones, municipal bylaws typically specify a Ground Coverage ratio of 60% to 70% and an FAR (Floor Area Ratio) between 1.5 and 2.0.",
      },
    ],
  },
  {
    slug: "cement-and-steel-cost-for-house-in-nepal",
    title: "Cement & Steel Rebar Cost for House in Nepal (सिमेन्ट र रडको खर्च हिसाब)",
    shortTitle: "Cement & Steel Requirement",
    metaDescription: "Calculate exact cement bags and TMT steel rebar (छड) tons required for building a residential house in Nepal. Current market prices and formula estimates.",
    keywords: ["cement and steel cost for house in nepal", "cement requirement per sq ft nepal", "steel rebar rod per sq ft nepal", "saria cement kharcha ghar nepal"],
    builtUpAreaSqFt: 2000,
    floorsText: "Standard RCC 2,000 sq ft Building",
    estimatedBudget: "NPR 15,50,000 (Steel) + NPR 6,50,000 (Cement)",
    ratePerSqFt: "Steel: ~4 kg/sq ft • Cement: ~0.44 bags/sq ft",
    cementBags: "880 Bags (OPC for slabs, PPC for masonry)",
    steelRebarTons: "8.0 Metric Tons (80 Quintals)",
    bricksCount: "40,000 Bricks",
    laborShare: "NPR 8,00,000 (Bar bending & casting)",
    materialShare: "NPR 22,00,000 (Raw rebar & cement)",
    headlineAnswer: "For a standard 2,000 sq ft residential RCC house in Nepal, you need approximately 8 Metric Tons (80 quintals) of 500D TMT rebar steel (costing ~NPR 15–16 Lakh at NPR 95–102/kg) and roughly 880 bags of cement (costing ~NPR 6.2–6.8 Lakh at NPR 680–760/bag).",
    faqs: [
      {
        question: "Which cement is better in Nepal: OPC or PPC?",
        answer: "Civil engineers in Nepal recommend 43 or 53 Grade OPC (Ordinary Portland Cement) for structural RCC casting (pillars, beams, foundation footings, and roof slabs) due to its quick 28-day compressive strength, and PPC (Portland Pozzolana Cement) for brick masonry wall mortar and interior plastering.",
      },
    ],
  },
];

