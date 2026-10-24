export type ConstructionTier = 'standard' | 'semiLuxury' | 'luxury';
export type SoilCondition = 'medium' | 'soft_clay';
export type MasonryType = 'chimney_brick' | 'aac_block';

export interface UnitRateCustomization {
  cementBag?: number;
  steelKg?: number;
  brickPiece?: number;
  aacBlock?: number;
  sandCuFt?: number;
  aggregateCuFt?: number;
  masonWage?: number;
  laborWage?: number;
}

export interface ConstructionInputs {
  builtUpSqFt: number; // Total built-up area in sq. ft. across all floors
  storeys: number; // e.g. 1, 2, 2.5, 3, 4 Tala
  tier: ConstructionTier;
  soilCondition?: SoilCondition;
  masonryType?: MasonryType;
  costPerSqFtCustom?: number;
  customRates?: UnitRateCustomization;
}

export interface PillarStructuralBreakdown {
  pillarCount: number;
  pillarSizeEn: string;
  pillarSizeNe: string;
  rebarSpecEn: string;
  rebarSpecNe: string;
  stirrupSpecEn: string;
  stirrupSpecNe: string;
  footingDepthEn: string;
  footingDepthNe: string;
  footingSizeEn: string;
  footingSizeNe: string;
  footingCount: number;
  groundFootprintSqFt: number;
  plinthBeamSizeEn: string;
  plinthBeamSizeNe: string;
  roofSlabThicknessEn: string;
  roofSlabThicknessNe: string;
}

export interface BricksDetailBreakdown {
  totalUnits: number;
  unitTypeEn: string;
  unitTypeNe: string;
  exterior9InchUnits: number; // 60%
  interior4InchUnits: number; // 40%
  mortarCementBags: number;
  mortarSandCuFt: number;
  mortarRatioEn: string;
  mortarRatioNe: string;
  breakageWastageUnits: number; // 5% allowance
}

export interface CementDetailBreakdown {
  totalBags: number;
  opcStructureBags: number; // OPC 43/53 for Footing, Columns, Beams, Roof Slabs
  ppcFinishingBags: number; // PPC for Brick Masonry, Plaster, Tiling
  structureAndSlabsBags: number; // 50%
  masonryMortarBags: number; // 25%
  plasterAndFlooringBags: number; // 25%
  waterproofingCompoundLiters: number; // Integral liquid waterproofing
  waterRequiredLiters: number; // Total water for mixing and 21-day curing
}

export interface SteelDiameterItem {
  diameter: string;
  purposeEn: string;
  purposeNe: string;
  kg: number;
  quintals: number;
  percentage: number;
}

export interface SteelDetailBreakdown {
  totalKg: number;
  totalQuintals: number;
  bindingWireKg: number; // 20-gauge GI wire (~12 kg/ton)
  diameterSchedule: SteelDiameterItem[];
  pillarColumnsKg: number;
  beamsLintelsKg: number;
  slabRoofMeshKg: number;
}

export interface BoqPhaseItem {
  id: string;
  phaseNumber: number;
  titleEn: string;
  titleNe: string;
  sharePercent: number;
  estimatedCost: number;
  scopeItemsEn: string[];
  scopeItemsNe: string[];
  durationWeeks: string;
}

// ----------------- SENIOR ENGINEER ADVANCED MODELS -----------------

export interface ArchitecturalRoomItem {
  nameEn: string;
  nameNe: string;
  dimensionsEn: string;
  dimensionsNe: string;
  areaSqFt: number;
  floorLevelEn: string;
  floorLevelNe: string;
  notesEn: string;
  notesNe: string;
}

export interface FloorAreaStatement {
  floorLevelEn: string;
  floorLevelNe: string;
  floorAreaSqFt: number;
  rooms: ArchitecturalRoomItem[];
}

export interface ArchitecturalPlanStatement {
  floors: FloorAreaStatement[];
  totalCarpetAreaSqFt: number;
  circulationAreaSqFt: number; // Stairs, passages, verandas (~15%)
  wallThicknessAreaSqFt: number; // 9" & 4.5" wall footprint (~15%)
  efficiencyPercentage: number; // Carpet / Built-up
}

export interface StructuralMemberDetail {
  memberNameEn: string;
  memberNameNe: string;
  dimensionsEn: string;
  dimensionsNe: string;
  mainRebarEn: string;
  mainRebarNe: string;
  shearTiesEn: string;
  shearTiesNe: string;
  concreteGradeEn: string;
  concreteGradeNe: string;
  clearCoverEn: string;
  clearCoverNe: string;
}

export interface StructuralEngineeringSchedule {
  designCode: string;
  seismicZone: string;
  soilBearingCapacityEn: string;
  soilBearingCapacityNe: string;
  foundationTypeEn: string;
  foundationTypeNe: string;
  columns: StructuralMemberDetail;
  plinthBeam: StructuralMemberDetail;
  floorBeams: StructuralMemberDetail;
  roofSlab: StructuralMemberDetail;
  staircase: StructuralMemberDetail;
  lintelSillBands: StructuralMemberDetail;
}

export interface DudbcRateAnalysisItem {
  code: string;
  descriptionEn: string;
  descriptionNe: string;
  unit: string;
  quantity: number;
  materialUnitCost: number;
  laborUnitCost: number;
  totalRate: number;
  totalAmount: number;
}

export interface MunicipalPermitItem {
  titleEn: string;
  titleNe: string;
  cost: number;
  timelineDays: string;
  descriptionEn: string;
  descriptionNe: string;
}

export interface MunicipalPermitBreakdown {
  totalConsultancyAndPermitCost: number;
  items: MunicipalPermitItem[];
}

export interface MilestoneCashflowItem {
  stageNumber: number;
  titleEn: string;
  titleNe: string;
  percent: number;
  cumulativePercent: number;
  amount: number;
  inspectionRequirementsEn: string[];
  inspectionRequirementsNe: string[];
}

export interface MaterialBreakdown {
  cementBags: number; // 50kg bags
  cementCost: number;
  steelKg: number; // Kg
  steelQuintals: number; // Quintals (100kg)
  steelCost: number;
  bricksCount: number; // Number of bricks / blocks
  bricksCost: number;
  sandCuFt: number; // Cubic feet
  sandTrips: number; // ~350 cu ft tipper trucks
  sandCost: number;
  aggregateCuFt: number; // Cubic feet
  aggregateTrips: number; // ~350 cu ft tipper trucks
  aggregateCost: number;
  finishingCost: number; // Doors, windows, painting, tiles, plumbing, electrical

  // Advanced Senior Structural Engineering Breakdowns
  pillars: PillarStructuralBreakdown;
  bricksDetail: BricksDetailBreakdown;
  cementDetail: CementDetailBreakdown;
  steelDetail: SteelDetailBreakdown;
  boqPhases: BoqPhaseItem[];

  // Senior Structural Engineer Extensions
  architecturalPlan: ArchitecturalPlanStatement;
  structuralSchedule: StructuralEngineeringSchedule;
  rateAnalysis: DudbcRateAnalysisItem[];
  municipalPermits: MunicipalPermitBreakdown;
  milestoneCashflow: MilestoneCashflowItem[];
}

export interface ConstructionEstimate {
  totalBuiltUpSqFt: number;
  storeys: number;
  effectiveRatePerSqFt: number;
  totalBudget: number;
  materialBudget: number; // ~65%
  laborBudget: number; // ~35%
  soilCondition: SoilCondition;
  masonryType: MasonryType;
  materials: MaterialBreakdown;
  unitRatesUsed: Required<UnitRateCustomization>;
}

export const TIER_RATES: Record<ConstructionTier, { rate: number; nameEn: string; nameNe: string; descEn: string; descNe: string }> = {
  standard: {
    rate: 4200,
    nameEn: 'Standard Finish (रु ४,२०० / sq ft)',
    nameNe: 'साधारण फिनिसिङ (रू. ४,२०० / वर्ग फिट)',
    descEn: 'Standard RCC frame (NBC 205 compliant), local vitrified tiles, first-class chimney bricks, Asian paints, standard CPVC plumbing and modular wiring.',
    descNe: 'आरसीसी फ्रेम (NBC 205 मापदण्ड), गुणस्तरीय टायल, पहिलो नम्बर इँटा, एसियन पेन्ट्स, साधारण वायरिङ तथा स्यानिटरी फिटिङ्स।',
  },
  semiLuxury: {
    rate: 5200,
    nameEn: 'Semi-Luxury Finish (रु ५,२०० / sq ft)',
    nameNe: 'सेमी-लक्जरी फिनिसिङ (रू. ५,२०० / वर्ग फिट)',
    descEn: 'UPVC soundproof sliding windows, 2x4 glazed vitrified tiles, granite kitchen counter & staircase, false ceiling with warm LED cove, Jaquar bath fittings.',
    descNe: 'युपिभिसी झ्याल, २×४ प्रिमियम टायल, ग्रानिट किचेन र सिँढी, फल सिलिङ, ज्याक्वार ब्राण्डका बाथरुम सामान।',
  },
  luxury: {
    rate: 6500,
    nameEn: 'Premium Luxury (रु ६,५०० / sq ft)',
    nameNe: 'प्रिमियम लक्जरी (रू. ६,५०० / वर्ग फिट)',
    descEn: 'Italian marble flooring, teakwood solid doors & carved frames, modular German kitchen, full smart-home automation, exterior elevation cladding.',
    descNe: 'इटालियन मार्बल, सिसौ/सालको काठ, जर्मन मोड्युलर किचेन, पूर्ण स्मार्ट होम अटोमेसन र आधुनिक बाहिरी डिजाइन।',
  },
};

/**
 * Standard unit material & labor market costs in Nepal (2026 Kathmandu & Urban averages)
 */
export const DEFAULT_UNIT_RATES: Required<UnitRateCustomization> = {
  cementBag: 720, // NPR per 50kg bag
  steelKg: 98, // NPR per kg of Fe500D rebar
  brickPiece: 16.5, // NPR per 1st class chimney brick
  aacBlock: 92, // NPR per standard AAC block
  sandCuFt: 55, // NPR per cu. ft.
  aggregateCuFt: 62, // NPR per cu. ft.
  masonWage: 1350, // NPR per day
  laborWage: 900, // NPR per day
};

export function calculateHouseConstruction(inputs: ConstructionInputs): ConstructionEstimate {
  const { 
    builtUpSqFt, 
    storeys, 
    tier, 
    soilCondition = 'medium', 
    masonryType = 'chimney_brick',
    costPerSqFtCustom,
    customRates = {}
  } = inputs;

  const unitRatesUsed: Required<UnitRateCustomization> = {
    cementBag: customRates.cementBag ?? DEFAULT_UNIT_RATES.cementBag,
    steelKg: customRates.steelKg ?? DEFAULT_UNIT_RATES.steelKg,
    brickPiece: customRates.brickPiece ?? DEFAULT_UNIT_RATES.brickPiece,
    aacBlock: customRates.aacBlock ?? DEFAULT_UNIT_RATES.aacBlock,
    sandCuFt: customRates.sandCuFt ?? DEFAULT_UNIT_RATES.sandCuFt,
    aggregateCuFt: customRates.aggregateCuFt ?? DEFAULT_UNIT_RATES.aggregateCuFt,
    masonWage: customRates.masonWage ?? DEFAULT_UNIT_RATES.masonWage,
    laborWage: customRates.laborWage ?? DEFAULT_UNIT_RATES.laborWage,
  };

  const baseRate = costPerSqFtCustom && costPerSqFtCustom > 0 ? costPerSqFtCustom : TIER_RATES[tier].rate;

  const totalBudget = Math.round(builtUpSqFt * baseRate);
  const materialBudget = Math.round(totalBudget * 0.65);
  const laborBudget = Math.round(totalBudget * 0.35);

  // Ground footprint (built-up area divided by number of floors)
  const groundFootprintSqFt = Math.max(200, Math.round(builtUpSqFt / storeys));

  // Pillars / Columns estimation (NBC 205 / NBC 105:2020 standard grid in Nepal)
  // Average column span is 12ft to 14ft (~80 to 90 sq ft ground area per pillar)
  // Minimum 9 pillars (3x3 grid) for any stable residential building
  const pillarCount = Math.max(9, Math.round(groundFootprintSqFt / 80));

  let pillarSizeEn = '12" × 12" (300mm × 300mm)';
  let pillarSizeNe = '१२ इन्च × १२ इन्च (३००mm × ३००mm)';
  let rebarSpecEn = '6 to 8 Nos. 16mm Fe500D TMT Rebars';
  let rebarSpecNe = '६ देखि ८ वटा १६mm Fe500D TMT मुख्य रड';
  let footingSizeEn = '5\'0" × 5\'0" × 15" (1.5m × 1.5m) isolated footing';
  let footingSizeNe = '५×५ फिट (१.५ मिटर) व्यक्तिगत जग (Footing)';

  if (storeys >= 3) {
    pillarSizeEn = '14" × 14" (350mm × 350mm) or 14" × 16"';
    pillarSizeNe = '१४ इन्च × १४ इन्च (३५०mm × ३५०mm) वा १४×१६';
    rebarSpecEn = '8 Nos. 20mm + 4 Nos. 16mm Fe500D TMT Rebars';
    rebarSpecNe = '८ वटा २०mm + ४ वटा १६mm Fe500D TMT मुख्य रड';
    footingSizeEn = '6\'0" × 6\'0" × 18" (1.8m × 1.8m) combined/isolated footing';
    footingSizeNe = '६×६ फिट (१.८ मिटर) बलियो जग (Footing)';
  }

  const stirrupSpecEn = '8mm lateral ties @ 4" (100mm) c/c at critical confinement joints, 6" (150mm) c/c at mid-height, 135° seismic hooks';
  const stirrupSpecNe = '८mm रिङ (टाई): जोर्नी नजिक ४ इन्च (१००mm) र बीचमा ६ इन्च दूरी, १३५ डिग्री भूकम्प प्रतिरोधी हुक';

  const footingDepthEn = soilCondition === 'soft_clay' 
    ? '6.5 to 8.0 ft (2.0 to 2.5m) depth with mandatory tie/strap beams (for soft clay/silt)'
    : '5.0 to 6.5 ft (1.5 to 2.0m) depth below natural ground level (NGL)';
  const footingDepthNe = soilCondition === 'soft_clay'
    ? '६.५ देखि ८ फिट (काठमाडौंको कालोमाटो/कमजोर माटोका लागि स्ट्र्याप बिम सहित)'
    : '५ देखि ६.५ फिट (१.५ देखि २ मिटर) प्राकृतिक जमिन सतह मुनि';

  const plinthBeamSizeEn = '9" × 12" (230mm × 300mm) continuous DPC tie-beam with 4 Nos. 12mm bars';
  const plinthBeamSizeNe = '९ इन्च × १२ इन्च निरन्तर डिपिसी टाई-बिम (४ वटा १२mm रड सहित)';
  const roofSlabThicknessEn = '5 Inches (125mm) M20 grade concrete with two-way 8mm/10mm rebar mesh';
  const roofSlabThicknessNe = '५ इन्च (१२५mm) M20 ग्रेड कङ्क्रिट र ८mm/१०mm दोहोरो जाली ढलान';

  // Primary Material quantities
  const cementBags = Math.round(builtUpSqFt * 0.44);
  const cementCost = Math.round(cementBags * unitRatesUsed.cementBag);

  const steelKg = Math.round(builtUpSqFt * 3.9);
  const steelQuintals = Math.round((steelKg / 100) * 10) / 10;
  const steelCost = Math.round(steelKg * unitRatesUsed.steelKg);

  // Bricks / Blocks
  const isAac = masonryType === 'aac_block';
  const rawBricksCount = Math.round(builtUpSqFt * 19.5);
  const totalUnits = isAac ? Math.round(rawBricksCount / 5.5) : rawBricksCount;
  const unitPrice = isAac ? unitRatesUsed.aacBlock : unitRatesUsed.brickPiece;
  const bricksCost = Math.round(totalUnits * unitPrice);

  const sandCuFt = Math.round(builtUpSqFt * 1.8);
  const sandTrips = Math.round((sandCuFt / 350) * 10) / 10;
  const sandCost = Math.round(sandCuFt * unitRatesUsed.sandCuFt);

  const aggregateCuFt = Math.round(builtUpSqFt * 1.4);
  const aggregateTrips = Math.round((aggregateCuFt / 350) * 10) / 10;
  const aggregateCost = Math.round(aggregateCuFt * unitRatesUsed.aggregateCuFt);

  const primaryMaterialTotal = cementCost + steelCost + bricksCost + sandCost + aggregateCost;
  const finishingCost = Math.max(0, materialBudget - primaryMaterialTotal);

  // Advanced Detailed Breakdowns
  const exterior9InchUnits = Math.round(totalUnits * 0.60);
  const interior4InchUnits = Math.round(totalUnits * 0.40);
  const breakageWastageUnits = Math.round(totalUnits * 0.05); // 5% allowance

  const mortarCementBags = isAac 
    ? Math.round(totalUnits * 0.03) 
    : Math.round((exterior9InchUnits * 0.0013) + (interior4InchUnits * 0.0025));
  const mortarSandCuFt = isAac 
    ? Math.round(totalUnits * 0.2) 
    : Math.round((exterior9InchUnits * 0.014) + (interior4InchUnits * 0.018));

  // Cement split by grade
  const opcStructureBags = Math.round(cementBags * 0.52); // OPC for RCC structural elements
  const ppcFinishingBags = cementBags - opcStructureBags; // PPC for masonry and plaster
  const structureAndSlabsBags = Math.round(cementBags * 0.50);
  const masonryMortarBags = Math.round(cementBags * 0.25);
  const plasterAndFlooringBags = Math.round(cementBags * 0.25);
  const waterproofingCompoundLiters = Math.round(cementBags * 0.18); // ~200ml per bag
  const waterRequiredLiters = Math.round(builtUpSqFt * 110); // ~110L water per sq ft for mixing & 21-day curing

  // Steel Diameter Schedule
  const pillarColumnsKg = Math.round(steelKg * 0.35);
  const beamsLintelsKg = Math.round(steelKg * 0.35);
  const slabRoofMeshKg = Math.round(steelKg * 0.30);
  const bindingWireKg = Math.round((steelKg / 1000) * 12); // ~12 kg GI wire per ton

  const diameterSchedule: SteelDiameterItem[] = [
    {
      diameter: storeys >= 3 ? 'Ø 20mm' : 'Ø 16mm',
      purposeEn: 'Main vertical rebar for ground & lower floor columns',
      purposeNe: 'पिल्लरको मुख्य ठाडो रड (तल्लो तला तथा भारी भार)',
      kg: Math.round(steelKg * 0.25),
      quintals: Math.round((steelKg * 0.25 / 100) * 10) / 10,
      percentage: 25,
    },
    {
      diameter: 'Ø 16mm',
      purposeEn: 'Primary longitudinal bars for main floor beams & upper columns',
      purposeNe: 'मुख्य बिमको माथिल्लो र तल्लो लम्बाइ रड',
      kg: Math.round(steelKg * 0.25),
      quintals: Math.round((steelKg * 0.25 / 100) * 10) / 10,
      percentage: 25,
    },
    {
      diameter: 'Ø 12mm',
      purposeEn: 'Secondary tie-beams, plinth DPC beam, and staircase waist slab',
      purposeNe: 'डिपिसी बिम, सिँढीको मुख्य रड र अतिरिक्त बिम',
      kg: Math.round(steelKg * 0.20),
      quintals: Math.round((steelKg * 0.20 / 100) * 10) / 10,
      percentage: 20,
    },
    {
      diameter: 'Ø 10mm',
      purposeEn: 'Roof slab main bending reinforcement & lintel bands',
      purposeNe: 'छत ढलानको मुख्य जाली र झ्यालढोकाको लिन्टेल ब्यान्ड',
      kg: Math.round(steelKg * 0.15),
      quintals: Math.round((steelKg * 0.15 / 100) * 10) / 10,
      percentage: 15,
    },
    {
      diameter: 'Ø 8mm',
      purposeEn: 'Column lateral ties, beam shear stirrup rings & slab distribution mesh',
      purposeNe: 'पिल्लर र बिमको रिङ (टाई) तथा छतको वितरण जाली',
      kg: Math.round(steelKg * 0.15),
      quintals: Math.round((steelKg * 0.15 / 100) * 10) / 10,
      percentage: 15,
    },
  ];

  // Professional 6-Phase Engineering BOQ Breakdown
  const boqPhases: BoqPhaseItem[] = [
    {
      id: 'substructure',
      phaseNumber: 1,
      titleEn: 'Phase 1: Substructure & Foundation (जग र जमिनमुनिको काम)',
      titleNe: 'पहिलो चरण: जग तथा डिपिसी कार्य (Foundation & Substructure)',
      sharePercent: 15,
      estimatedCost: Math.round(totalBudget * 0.15),
      durationWeeks: '3 to 4 Weeks',
      scopeItemsEn: [
        'Site clearance, architectural layout and boundary demarcation (चुन हाल्ने)',
        'Earthwork excavation in foundation pits up to specified depth (माटो खन्ने)',
        'Flat brick soling & 1:3:6 Plain Cement Concrete (PCC) bedding under footings',
        'Reinforced Concrete (RCC M20) isolated / combined footings and column starter casting',
        'Backfilling with selected earth and mechanical compaction',
        'Plinth wall brick masonry & DPC continuous damp-proof tie-beam with waterproofing coat',
      ],
      scopeItemsNe: [
        'जग्गा सफाइ, इन्जिनियरिङ नक्सा अनुसार चुना हाल्ने र रेखांकन',
        'निर्धारित गहिराइसम्म जगको खाल्डो खन्ने (Earthwork Excavation)',
        'खाल्डोमा एक तह इँटाको सोलिङ र १:३:६ को पिसिसी (PCC) ढलान',
        'फुटिङ जाली बिछ्याउने, पिल्लरको डण्डी ठड्याउने र M20 कङ्क्रिट ढलान',
        'माटो पुर्ने र राम्रोसँग कम्प्याक्सन (दह्रो बनाउने) कार्य',
        'प्लिन्थ बिम (DPC) बाँध्ने र ओस रोक्ने वाटरप्रुफिङ ढलान',
      ],
    },
    {
      id: 'superstructure',
      phaseNumber: 2,
      titleEn: 'Phase 2: Superstructure RCC Framework & Slabs (आरसीसी फ्रेम र ढलान)',
      titleNe: 'दोस्रो चरण: आरसीसी फ्रेम, पिल्लर र छत ढलान (Superstructure Frame)',
      sharePercent: 22,
      estimatedCost: Math.round(totalBudget * 0.22),
      durationWeeks: '6 to 8 Weeks',
      scopeItemsEn: [
        'Column reinforcement steel binding with 135° seismic hook ties (NBC 205 standard)',
        'Plywood / steel formwork shuttering with rigid vertical props & column concrete casting',
        'Floor and roof beam formwork, rebar layout, and stirrup positioning',
        'Slab shuttering, bottom cover blocks, two-way 8mm/10mm rebar mesh & conduit placement',
        'Machine-mixed M20 concrete slab casting with mechanical needle vibrator compaction',
        'Mandatory 21-day water ponding and curing for maximum compressive strength',
        'RCC staircase waist slab and step casting',
      ],
      scopeItemsNe: [
        'पिल्लरको डण्डी बाँध्ने, १३५ डिग्री हुक भएका रिङ मिलाउने (NBC 205 मापदण्ड)',
        'प्लाइउड/स्टिल फर्मा ठोक्ने र भाइब्रेटर लगाएर पिल्लर ढलान गर्ने',
        'बिम र छतको फर्मा ठोक्ने, कभर ब्लक राख्ने र दोहोरो जाली बिछ्याउने',
        'छत ढलान गर्दा बिजुलीको पाइप र फ्यान बक्स मिलाएर राख्ने',
        'M20 कङ्क्रिटले छत ढलान गर्ने र कम्तीमा २१ दिनसम्म पानी जमाएर क्युरिङ गर्ने',
        'सिँढीको आरसीसी ढलान र स्टेप बनाउने कार्य',
      ],
    },
    {
      id: 'masonry',
      phaseNumber: 3,
      titleEn: 'Phase 3: Masonry Brickwork & Partitions (इँटाको गारो लगाउने)',
      titleNe: 'तेस्रो चरण: इँटाको गारो तथा पर्खाल (Brickwork Masonry)',
      sharePercent: 15,
      estimatedCost: Math.round(totalBudget * 0.15),
      durationWeeks: '4 to 5 Weeks',
      scopeItemsEn: [
        '9-inch (230mm) exterior load/perimeter walls in 1:6 cement-sand mortar',
        '4.5-inch (115mm) interior partition walls in 1:4 cement-sand mortar',
        'Reinforced horizontal sill bands at window bottom level & lintel bands with sunshades (Chhajja)',
        'Roof terrace parapet wall (3 feet height) and compound boundary walling',
        'Proper soaking of bricks in water tanks prior to laying to prevent moisture absorption from mortar',
      ],
      scopeItemsNe: [
        'बाहिरी भागमा सुरक्षा र इन्सुलेसनका लागि ९ इन्च बाक्लो गारो (१:६ मसला)',
        'भित्री कोठा विभाजनका लागि ४.५ इन्चको गारो (१:४ मसला)',
        'झ्यालको तल्लो भागमा सिल ब्यान्ड र माथिल्लो भागमा लिन्टेल ब्यान्ड ढलान (भूकम्प सुरक्षा)',
        'छतमा ३ फिट अग्लो प्यारापेट पर्खाल लगाउने',
        'इँटा लगाउनु अघि पानीको ट्यांकीमा राम्ररी भिजाएर मात्र गारो लगाउने',
      ],
    },
    {
      id: 'plaster',
      phaseNumber: 4,
      titleEn: 'Phase 4: Plastering & Waterproofing (प्लास्टर र वाटरप्रुफिङ)',
      titleNe: 'चौथो चरण: भित्री/बाहिरी प्लास्टर र वाटरप्रुफिङ (Plaster & Waterproofing)',
      sharePercent: 12,
      estimatedCost: Math.round(totalBudget * 0.12),
      durationWeeks: '4 to 6 Weeks',
      scopeItemsEn: [
        'Fixing expanded GI chicken wire mesh over all RCC-to-brick joints to eliminate hairline cracks',
        'Internal wall plastering (12mm thickness) in 1:4 cement-sand mortar in plumb and right angle',
        'External wall plastering (18mm thickness) in two coats with integral waterproofing chemical',
        'Bathroom sunken slab and terrace roof waterproofing treatment (2-coat polymer acrylic slurry)',
        'Minimum 10 to 14 days of wet curing for all plastered surfaces',
      ],
      scopeItemsNe: [
        'पिल्लर र इँटा जोडिने ठाउँमा धाँजा फाट्न नदिन कुखुरे जाली (Chicken Mesh) ठोक्ने',
        'भित्री भित्तामा १२mm बाक्लो १:४ मसलाको साहुल र गुनिया मिलाएको प्लास्टर',
        'बाहिरी भित्तामा १८mm बाक्लो दोहोरो तहको वाटरप्रुफ प्लास्टर',
        'बाथरुम र कौसीको छतमा केमिकल लगाएर वाटरप्रुफिङ गर्ने',
        'प्लास्टर पछि कम्तीमा १० देखि १४ दिनसम्म राम्ररी पानी हालेर क्युरिङ गर्ने',
      ],
    },
    {
      id: 'finishing',
      phaseNumber: 5,
      titleEn: 'Phase 5: Flooring, Tiling & Architectural Paints (टायल, मार्बल र रङरोगन)',
      titleNe: 'पाँचौं चरण: टायल, मार्बल, ग्रानिट र रङरोगन (Flooring & Painting)',
      sharePercent: 18,
      estimatedCost: Math.round(totalBudget * 0.18),
      durationWeeks: '6 to 8 Weeks',
      scopeItemsEn: [
        'Laying polished vitrified floor tiles (2\'×2\' / 2\'×4\') with epoxy grout joints in rooms',
        'Anti-skid matte ceramic tiles on bathroom floors and glazed wall tiles up to 7 ft door height',
        '18mm polished natural Granite slab on kitchen countertops and staircase treads with grooved nosing',
        'Wall surface preparation with 2 coats of acrylic wall putty / gypsum punning with smooth sanding',
        'Primer coat + 2 coats of premium washable interior luxury emulsion and exterior anti-fungal weathercoat',
      ],
      scopeItemsNe: [
        'बैठक तथा कोठाहरूमा २×२ वा २×४ को प्रिमियम भिट्रिफाइड टायल लगाउने',
        'बाथरुममा नचिप्लिने (Anti-skid) भुइँ टायल र भित्तामा ७ फिटसम्म वाल टायल',
        'भान्साको स्ल्याब र सिँढीमा १८mm बाक्लो प्राकृतिक ग्रानिट मार्बल ठोक्ने',
        'भित्तामा २ हात पुटिङ (Wall Putty) लगाएर चिल्लो बनाउने',
        'प्राइमसहित २ कोट एसियन/बर्जर गुणस्तरीय इमल्सन र बाहिर एपेक्स वेदरकोट रङ लगाउने',
      ],
    },
    {
      id: 'mep_joinery',
      phaseNumber: 6,
      titleEn: 'Phase 6: MEP, Sanitary Ware, Doors & Windows (बिजुली, धारा, स्यानिटरी र झ्यालढोका)',
      titleNe: 'छैटौं चरण: बिजुली, स्यानिटरी, धारा, झ्याल र ढोका (MEP & Joinery)',
      sharePercent: 18,
      estimatedCost: Math.round(totalBudget * 0.18),
      durationWeeks: '6 to 8 Weeks',
      scopeItemsEn: [
        'Concealed electrical wiring with fire-retardant (FR) copper wires, modular switch plates & MCB DB box',
        'Hot & cold CPVC water supply lines, PVC sewage & soil lines, septic tank / soak pit connection',
        'Installation of branded sanitary ware: wall-hung commodes, vanity basins, CP showers & bib cocks',
        'Rooftop water storage tank (1000L to 2000L), automatic water level controller and booster pump',
        'Heavy-gauge UPVC / anodized aluminum sliding windows with 5mm/8mm toughened glass & insect mesh',
        'Solid seasoned wood door frames (चौकोस) and commercial laminated flush doors with cylindrical locks',
      ],
      scopeItemsNe: [
        'कन्सिल्ड बिजुली वायरिङ, FR कपर तार, मोड्युलर स्विच र सुरक्षित MCB बक्स जडान',
        'तातो-चिसो पानीका लागि CPVC पाइप, ढल निकास र सेप्टिक ट्यांकी जोड्ने',
        'ब्राण्डेड कमोड, बेसिन, सावर र धाराका सामान जडान गर्ने',
        'छतमा १,००० देखि २,००० लिटरको पानी ट्यांकी र अटोमेटिक मोटर पम्प जडान',
        'युपिभिसी (UPVC) वा एल्युमिनियमका बलिया झ्याल र लामखुट्टे जाली',
        'साल वा सिसौको काठको चौकोस र बलिया ढोका तथा लक जडान',
      ],
    },
  ];

  // ----------------- SENIOR STRUCTURAL & ARCHITECTURAL DETAILED STATEMENTS -----------------

  // 1. Architectural Room Statement & Floor-wise Distribution
  const perFloorFootprint = Math.round(builtUpSqFt / storeys);
  const floorStatements: FloorAreaStatement[] = [];

  // Ground Floor
  floorStatements.push({
    floorLevelEn: 'Ground Floor (तला १: भुइँतला)',
    floorLevelNe: 'पहिलो तला: भुइँतला (Ground Floor)',
    floorAreaSqFt: perFloorFootprint,
    rooms: [
      {
        nameEn: 'Formal Living Room (बैठक कोठा)',
        nameNe: 'बैठक कोठा (Formal Living Room)',
        dimensionsEn: '14\'0" × 16\'0"',
        dimensionsNe: '१४×१६ फिट',
        areaSqFt: 224,
        floorLevelEn: 'Ground Floor',
        floorLevelNe: 'भुइँतला',
        notesEn: 'Natural daylight facing front road, TV unit niche & concealed LED cove.',
        notesNe: 'अगाडि बाटोपट्टि पर्याप्त घाम लाग्ने, टिभी युनिट र फल्स सिलिङ सहित।',
      },
      {
        nameEn: 'Kitchen & Dining Space (भान्सा र डाइनिङ)',
        nameNe: 'भान्सा तथा डाइनिङ (Kitchen & Dining)',
        dimensionsEn: '12\'0" × 15\'0"',
        dimensionsNe: '१२×१५ फिट',
        areaSqFt: 180,
        floorLevelEn: 'Ground Floor',
        floorLevelNe: 'भुइँतला',
        notesEn: 'L-shaped granite platform, chimney duct shaft & utility backyard access.',
        notesNe: 'एल-साइज ग्रानिट काउन्टर, चिम्नी निकास डक्ट र पछाडिपट्टि जाने ढोका।',
      },
      {
        nameEn: 'Guest Bedroom (पाहुना कोठा)',
        nameNe: 'पाहुना कोठा (Guest Bedroom)',
        dimensionsEn: '11\'0" × 12\'0"',
        dimensionsNe: '११×१२ फिट',
        areaSqFt: 132,
        floorLevelEn: 'Ground Floor',
        floorLevelNe: 'भुइँतला',
        notesEn: 'Well-ventilated for elderly parents or guests with easy bathroom access.',
        notesNe: 'ज्येष्ठ नागरिक वा पाहुनाका लागि सुविधाजनक, बाथरुम नजिक।',
      },
      {
        nameEn: 'Common Bathroom (साझा बाथरुम)',
        nameNe: 'साझा बाथरुम (Common Bathroom)',
        dimensionsEn: '7\'0" × 5\'0"',
        dimensionsNe: '७×५ फिट',
        areaSqFt: 35,
        floorLevelEn: 'Ground Floor',
        floorLevelNe: 'भुइँतला',
        notesEn: 'Anti-skid floor, exhaust ventilation louvers and wet/dry separation.',
        notesNe: 'नचिप्लिने टायल, भेन्टिलेसन र तातो-चिसो पानी फिटिङ्स।',
      },
      {
        nameEn: 'Car Porch & Main Entry Foyer (गाडी पार्किङ र भर्‍याङ)',
        nameNe: 'कार पार्किङ तथा मूल प्रवेशद्वार',
        dimensionsEn: '10\'0" × 16\'0"',
        dimensionsNe: '१०×१६ फिट',
        areaSqFt: 160,
        floorLevelEn: 'Ground Floor',
        floorLevelNe: 'भुइँतला',
        notesEn: 'Reinforced heavy-duty floor pavers & spacious dog-legged staircase.',
        notesNe: 'बलियो पेभर टायल, गाडी पार्किङ र ६ फिट चौडा सिँढी।',
      },
    ],
  });

  // First Floor (if storeys >= 2)
  if (storeys >= 2) {
    floorStatements.push({
      floorLevelEn: 'First Floor (तला २: पहिलो तला)',
      floorLevelNe: 'दोस्रो तला: पहिलो तला (First Floor)',
      floorAreaSqFt: perFloorFootprint,
      rooms: [
        {
          nameEn: 'Master Bedroom with Attached Bath (मास्टर बेडरुम)',
          nameNe: 'मास्टर बेडरुम (अट्याच बाथरुम सहित)',
          dimensionsEn: '14\'0" × 15\'0" + Bath 8\'×5\'',
          dimensionsNe: '१४×१५ फिट + बाथरुम ८×५ फिट',
          areaSqFt: 250,
          floorLevelEn: 'First Floor',
          floorLevelNe: 'पहिलो तला',
          notesEn: 'Walk-in wardrobe space, private balcony access and luxury attached bath.',
          notesNe: 'वारड्रोब, निजी कौसी/बाल्कोनी र ज्याकुजी/सावर सहितको अट्याच बाथरुम।',
        },
        {
          nameEn: 'Children / Family Bedroom (छोराछोरीको कोठा)',
          nameNe: 'छोराछोरीको बेडरुम (Family Bedroom)',
          dimensionsEn: '12\'0" × 13\'0"',
          dimensionsNe: '१२×१३ फिट',
          areaSqFt: 156,
          floorLevelEn: 'First Floor',
          floorLevelNe: 'पहिलो तला',
          notesEn: 'Study desk nook, cross-ventilated dual windows & wardrobe alcove.',
          notesNe: 'पढ्ने टेबल, दुईतर्फी झ्यालबाट हावा ओहोरदोहोर हुने आधुनिक कोठा।',
        },
        {
          nameEn: 'Family Lounge & Lobby (पारिवारिक लिभिङ)',
          nameNe: 'पारिवारिक हल (Family Lounge)',
          dimensionsEn: '12\'0" × 14\'0"',
          dimensionsNe: '१२×१४ फिट',
          areaSqFt: 168,
          floorLevelEn: 'First Floor',
          floorLevelNe: 'पहिलो तला',
          notesEn: 'Private evening entertainment area linking bedrooms to balcony.',
          notesNe: 'परिवारका सदस्यहरू बेलुकी बसेर गफगाफ तथा टिभी हेर्ने ठाउँ।',
        },
        {
          nameEn: 'Attached / Common Bathroom (बाथरुम)',
          nameNe: 'बाथरुम (Family Bathroom)',
          dimensionsEn: '7\'0" × 5\'6"',
          dimensionsNe: '७×५.५ फिट',
          areaSqFt: 38.5,
          floorLevelEn: 'First Floor',
          floorLevelNe: 'पहिलो तला',
          notesEn: 'Full 7-foot height wall tiles, vanity counter and shower cubicle.',
          notesNe: 'भित्ताभरि टायल, काउन्टर बेसिन र आधुनिक स्यानिटरी फिटिङ्स।',
        },
      ],
    });
  }

  // Top Floor / Terrace (if storeys >= 2.5)
  if (storeys >= 2.5) {
    const terraceFootprint = Math.round(builtUpSqFt - (perFloorFootprint * Math.floor(storeys)));
    floorStatements.push({
      floorLevelEn: 'Top Floor & Terrace (तला ३: पूजा कोठा तथा कौसी)',
      floorLevelNe: 'माथिल्लो तला: पूजा कोठा र कौसी (Terrace Floor)',
      floorAreaSqFt: terraceFootprint > 0 ? terraceFootprint : Math.round(perFloorFootprint * 0.5),
      rooms: [
        {
          nameEn: 'Puja Room / Mandir (पूजा कोठा)',
          nameNe: 'पूजा कोठा (Vastu Compliant Mandir)',
          dimensionsEn: '8\'0" × 8\'0"',
          dimensionsNe: '८×८ फिट',
          areaSqFt: 64,
          floorLevelEn: 'Top Floor',
          floorLevelNe: 'माथिल्लो तला',
          notesEn: 'Northeast (Ishan Kona) orientation as per Vastu Shastra principles.',
          notesNe: 'वास्तुशास्त्र अनुसार उत्तर-पूर्व (ईशान कोण) मा शुद्ध पूजा कोठा।',
        },
        {
          nameEn: 'Laundry & Utility Store (लुगा धुने र स्टोर)',
          nameNe: 'लुगा धुने र भण्डार (Laundry & Store)',
          dimensionsEn: '8\'0" × 10\'0"',
          dimensionsNe: '८×१० फिट',
          areaSqFt: 80,
          floorLevelEn: 'Top Floor',
          floorLevelNe: 'माथिल्लो तला',
          notesEn: 'Washing machine water inlets, drainage point and linen storage shelves.',
          notesNe: 'लुगा धुने मेसिनको कनेक्सन, पानी निकास र अतिरिक्त सामान राख्ने ठाउँ।',
        },
        {
          nameEn: 'Rooftop Solar Terrace & Garden (खुला कौसी)',
          nameNe: 'खुला कौसी तथा छत (Open Solar Terrace)',
          dimensionsEn: 'Spacious Open Space',
          dimensionsNe: 'फराकिलो खुला ठाउँ',
          areaSqFt: Math.max(200, perFloorFootprint - 200),
          floorLevelEn: 'Terrace',
          floorLevelNe: 'छत',
          notesEn: 'Waterproofing screed, solar water heater provisions and 3ft parapet wall.',
          notesNe: 'वाटरप्रुफिङ ढलान, सोलार जडान गर्ने ठाउँ र ३ फिट अग्लो सुरक्षा पर्खाल।',
        },
      ],
    });
  }

  const totalCarpetAreaSqFt = Math.round(builtUpSqFt * 0.70);
  const circulationAreaSqFt = Math.round(builtUpSqFt * 0.15); // stairs, corridors
  const wallThicknessAreaSqFt = Math.round(builtUpSqFt * 0.15); // brick wall thickness
  const efficiencyPercentage = 70;

  const architecturalPlan: ArchitecturalPlanStatement = {
    floors: floorStatements,
    totalCarpetAreaSqFt,
    circulationAreaSqFt,
    wallThicknessAreaSqFt,
    efficiencyPercentage,
  };

  // 2. Structural Engineering Schedule (NBC 105:2020 & NBC 205)
  const structuralSchedule: StructuralEngineeringSchedule = {
    designCode: 'NBC 105:2020 (Seismic Code of Nepal) & NBC 205 (RCC Buildings)',
    seismicZone: 'Zone V (Highest Seismic Hazard Coefficient Z=0.35 in Nepal)',
    soilBearingCapacityEn: soilCondition === 'soft_clay' 
      ? '80 to 100 kN/m² (Soft Clay / Kathmandu Valley Silt - SBC Test Mandatory)' 
      : '130 to 150 kN/m² (Firm gravelly clay / Medium dense soil)',
    soilBearingCapacityNe: soilCondition === 'soft_clay'
      ? '८० देखि १०० kN/m² (काठमाडौं उपत्यकाको कालोमाटो/कमजोर माटो - माटो परीक्षण अनिवार्य)'
      : '१३० देखि १५० kN/m² (बलियो तथा कडा माटो)',
    foundationTypeEn: soilCondition === 'soft_clay'
      ? 'Combined Footings with continuous reinforced Strap / Tie Beams at NGL'
      : 'Trapezoidal Isolated RCC Footings with double rebar mesh',
    foundationTypeNe: soilCondition === 'soft_clay'
      ? 'स्ट्र्याप टाई-बिम सहितको संयुक्त जग (Combined Footings with Strap Beam)'
      : 'ट्रयापेजोइडल इन्डिभिजुअल जग (Isolated RCC Footing)',
    columns: {
      memberNameEn: 'RCC Columns (खम्बा)',
      memberNameNe: 'आरसीसी पिल्लर (खम्बा)',
      dimensionsEn: pillarSizeEn,
      dimensionsNe: pillarSizeNe,
      mainRebarEn: rebarSpecEn,
      mainRebarNe: rebarSpecNe,
      shearTiesEn: stirrupSpecEn,
      shearTiesNe: stirrupSpecNe,
      concreteGradeEn: 'M20 Grade (1:1.5:3) Machine Mixed with Mechanical Vibrator',
      concreteGradeNe: 'M20 ग्रेड (१:१.५:३) मेसिन मिक्स र भाइब्रेटर कम्प्याक्सन',
      clearCoverEn: '40mm concrete cover blocks on all 4 faces',
      clearCoverNe: 'चारैतिर ४०mm बाक्लो कंक्रीट कभर ब्लक',
    },
    plinthBeam: {
      memberNameEn: 'Plinth Tie-Beam (डिपिसी लेभल बिम)',
      memberNameNe: 'प्लिन्थ टाई-बिम (DPC Tie-Beam)',
      dimensionsEn: plinthBeamSizeEn,
      dimensionsNe: plinthBeamSizeNe,
      mainRebarEn: '4 Nos. 12mm Fe500D (2 top + 2 bottom) with 1 Nos. 12mm extra near joints',
      mainRebarNe: '४ वटा १२mm Fe500D (२ माथि + २ तल) मुख्य रड',
      shearTiesEn: '8mm stirrups @ 6" (150mm) c/c throughout length',
      shearTiesNe: '८mm रिङ ६ इन्च (१५०mm) दूरीमा',
      concreteGradeEn: 'M20 Grade (1:1.5:3) with 2 coats Bitumen DPC Waterproofing membrane',
      concreteGradeNe: 'M20 ग्रेड कङ्क्रिट र २ कोट अलकत्रा/बिटुमिन ओस रोक्ने केमिकल',
      clearCoverEn: '25mm concrete cover blocks',
      clearCoverNe: '२५mm कभर ब्लक',
    },
    floorBeams: {
      memberNameEn: 'Floor & Roof Main Beams (मुख्य बिम)',
      memberNameNe: 'फ्लोर तथा छतका मुख्य बिम',
      dimensionsEn: storeys >= 3 ? '9" × 16" (230mm × 400mm)' : '9" × 14" (230mm × 350mm)',
      dimensionsNe: storeys >= 3 ? '९ इन्च × १६ इन्च (२३०mm × ४००mm)' : '९ इन्च × १४ इन्च (२३०mm × ३५०mm)',
      mainRebarEn: '3 Nos. 16mm Top + 3 Nos. 16mm Bottom + 2 Nos. 12mm Curtailment Extra Bars over supports',
      mainRebarNe: '३ वटा १६mm माथि + ३ वटा १६mm तल + जोर्नीमा थप १२mm रड',
      shearTiesEn: '8mm two-legged stirrups @ 4" (100mm) c/c within 2d from column face, 6" (150mm) c/c at mid-span',
      shearTiesNe: '८mm रिङ: खम्बा नजिक ४ इन्च (१००mm) र बीचमा ६ इन्च (१५०mm) दूरी',
      concreteGradeEn: 'M20 Grade (1:1.5:3) with minimum 28-day characteristic strength fck = 20 N/mm²',
      concreteGradeNe: 'M20 ग्रेड (२८ दिनमा २० N/mm² भार थाम्ने क्षमता)',
      clearCoverEn: '25mm concrete cover blocks',
      clearCoverNe: '२५mm कभर ब्लक',
    },
    roofSlab: {
      memberNameEn: 'Roof RCC Slab (छत ढलान)',
      memberNameNe: 'छत आरसीसी स्ल्याब ढलान',
      dimensionsEn: roofSlabThicknessEn,
      dimensionsNe: roofSlabThicknessNe,
      mainRebarEn: 'Two-way mesh: 10mm @ 6" (150mm) c/c along shorter span; 8mm @ 6" (150mm) c/c distribution bars along longer span',
      mainRebarNe: 'दोहोरो जाली: छोटो दिशामा १०mm र लामो दिशामा ८mm रड ६-६ इन्च दूरीमा',
      shearTiesEn: 'Bent-up crank bars / top negative moment extra bars over continuous beam supports',
      shearTiesNe: 'बिम माथि क्र्याङ्क (दोब्रिएको) रड र टप अतिरिक्त डण्डी',
      concreteGradeEn: 'M20 Grade with Integral Liquid Waterproofing Compound (200ml per bag of cement)',
      concreteGradeNe: 'M20 ग्रेड र प्रति बोरा सिमेन्टमा २००ml वाटरप्रुफिङ केमिकल',
      clearCoverEn: '15mm concrete bottom cover spacers',
      clearCoverNe: '१५mm कभर ब्लक',
    },
    staircase: {
      memberNameEn: 'RCC Dog-Legged Staircase (घरको सिँढी)',
      memberNameNe: 'आरसीसी डग-लेग्ड सिँढी (Staircase)',
      dimensionsEn: 'Waist slab: 5.5" (140mm) thickness | Riser: 6" (150mm) | Tread: 10" (250mm) | Width: 3\'6" (1.05m)',
      dimensionsNe: 'स्ल्याब मोटाइ: ५.५ इन्च | राइजर (उचाइ): ६ इन्च | ट्रेड (टेक्ने भाग): १० इन्च | चौडाइ: ३.५ फिट',
      mainRebarEn: '12mm @ 4.5" (115mm) c/c along flight length; 8mm @ 6" (150mm) c/c distribution bars with 40d anchorage',
      mainRebarNe: 'मुख्य डण्डी १२mm (४.५ इन्च दूरीमा) र वितरण डण्डी ८mm (६ इन्च दूरीमा)',
      shearTiesEn: 'Mid-landing continuous support beam (9" × 12") with 4 Nos. 12mm rebar',
      shearTiesNe: 'ल्यान्डिङ बिम (९×१२ इन्च) मा ४ वटा १२mm रड',
      concreteGradeEn: 'M20 Grade monolithic casting with floor slabs',
      concreteGradeNe: 'M20 ग्रेड कङ्क्रिट',
      clearCoverEn: '20mm concrete cover blocks',
      clearCoverNe: '२०mm कभर ब्लक',
    },
    lintelSillBands: {
      memberNameEn: 'Seismic Lintel & Sill Bands (लिन्टेल र सिल ब्यान्ड)',
      memberNameNe: 'भूकम्प सुरक्षा लिन्टेल र सिल ब्यान्ड',
      dimensionsEn: 'Continuous 4.5" × 9" (115mm × 230mm) reinforced band along all masonry walls',
      dimensionsNe: 'चारैतिरका गारोमा निरन्तर ४.५ इन्च × ९ इन्चको ढलान ब्यान्ड',
      mainRebarEn: '2 Nos. 10mm bars at window sill level; 4 Nos. 10mm bars with 3" cantilever sunshades at lintel level',
      mainRebarNe: 'झ्यालको मुनि २ वटा १०mm र माथि ४ वटा १०mm रड सहित घामपानी छेक्ने छाना (Chhajja)',
      shearTiesEn: '8mm stirrups @ 6" (150mm) c/c',
      shearTiesNe: '८mm रिङ ६ इन्च दूरीमा',
      concreteGradeEn: 'M20 Grade (1:1.5:3)',
      concreteGradeNe: 'M20 ग्रेड',
      clearCoverEn: '20mm concrete cover',
      clearCoverNe: '२०mm कभर ब्लक',
    },
  };

  // 3. Itemized DUDBC Rate Analysis Table
  const rateAnalysis: DudbcRateAnalysisItem[] = [
    {
      code: 'DUDBC-01',
      descriptionEn: 'Earthwork excavation in foundation pits in all types of soil including disposal within 10m',
      descriptionNe: 'जगको खाल्डो खन्ने तथा माटो पन्छाउने कार्य (Earthwork Excavation)',
      unit: 'cu. ft.',
      quantity: Math.round(builtUpSqFt * 1.5),
      materialUnitCost: 0,
      laborUnitCost: 18,
      totalRate: 18,
      totalAmount: Math.round(builtUpSqFt * 1.5 * 18),
    },
    {
      code: 'DUDBC-02',
      descriptionEn: 'Dry flat brick soling under footings and ground floor base packed with river sand',
      descriptionNe: 'जग र भुइँतलामा बालुवा प्याकिङ सहित एक तह इँटाको सोलिङ (Flat Soling)',
      unit: 'sq. ft.',
      quantity: Math.round(groundFootprintSqFt * 1.15),
      materialUnitCost: 65,
      laborUnitCost: 15,
      totalRate: 80,
      totalAmount: Math.round(groundFootprintSqFt * 1.15 * 80),
    },
    {
      code: 'DUDBC-03',
      descriptionEn: 'Plain Cement Concrete (PCC 1:3:6) in foundation base using 40mm crushed stone ballast',
      descriptionNe: 'जगको बेसमा १:३:६ को पिसिसी (PCC) ढलान',
      unit: 'cu. ft.',
      quantity: Math.round(groundFootprintSqFt * 0.35),
      materialUnitCost: 175,
      laborUnitCost: 45,
      totalRate: 220,
      totalAmount: Math.round(groundFootprintSqFt * 0.35 * 220),
    },
    {
      code: 'DUDBC-04',
      descriptionEn: 'RCC 1:1.5:3 (M20 grade) in footings, columns, beams, slabs & stairs excluding shuttering & steel',
      descriptionNe: 'पिल्लर, बिम, जग र छतमा M20 (१:१.५:३) आरसीसी ढलान',
      unit: 'cu. ft.',
      quantity: Math.round(builtUpSqFt * 0.65),
      materialUnitCost: 260,
      laborUnitCost: 75,
      totalRate: 335,
      totalAmount: Math.round(builtUpSqFt * 0.65 * 335),
    },
    {
      code: 'DUDBC-05',
      descriptionEn: 'Providing, cutting, bending and binding Fe500D TMT earthquake rebar with 20G GI wire',
      descriptionNe: 'Fe500D TMT डण्डी काट्ने, दोब्य्राउने र बाँध्ने कार्य',
      unit: 'kg',
      quantity: steelKg,
      materialUnitCost: unitRatesUsed.steelKg,
      laborUnitCost: 18,
      totalRate: unitRatesUsed.steelKg + 18,
      totalAmount: Math.round(steelKg * (unitRatesUsed.steelKg + 18)),
    },
    {
      code: 'DUDBC-06',
      descriptionEn: 'First-class chimney brickwork in 1:6 cement-sand mortar for 9" external & 1:4 for 4.5" partitions',
      descriptionNe: 'पहिलो नम्बर इँटाको गारो (९ इन्च र ४.५ इन्च) लगाउने कार्य',
      unit: 'nos',
      quantity: totalUnits,
      materialUnitCost: Math.round(unitPrice + 4.5),
      laborUnitCost: 6.5,
      totalRate: Math.round(unitPrice + 11),
      totalAmount: Math.round(totalUnits * (unitPrice + 11)),
    },
    {
      code: 'DUDBC-07',
      descriptionEn: 'Internal 12mm cement plaster (1:4) and external 18mm double-coat waterproof plaster',
      descriptionNe: 'भित्री १२mm र बाहिरी १८mm वाटरप्रुफ सिमेन्ट प्लास्टर',
      unit: 'sq. ft.',
      quantity: Math.round(builtUpSqFt * 3.2),
      materialUnitCost: 32,
      laborUnitCost: 28,
      totalRate: 60,
      totalAmount: Math.round(builtUpSqFt * 3.2 * 60),
    },
    {
      code: 'DUDBC-08',
      descriptionEn: 'Laying vitrified tiles, anti-skid bathroom ceramics & polished natural granite on stairs/kitchen',
      descriptionNe: 'भिट्रिफाइड टायल, बाथरुम टायल र सिँढी/किचेनमा ग्रानिट मार्बल ठोक्ने',
      unit: 'sq. ft.',
      quantity: Math.round(builtUpSqFt * 0.85),
      materialUnitCost: 145,
      laborUnitCost: 65,
      totalRate: 210,
      totalAmount: Math.round(builtUpSqFt * 0.85 * 210),
    },
  ];

  // 4. Municipal Approval (नक्शा पास) & Professional Engineering Fees
  const municipalPermits: MunicipalPermitBreakdown = {
    totalConsultancyAndPermitCost: 185000,
    items: [
      {
        titleEn: 'Architectural Working Drawings & 3D Elevation Modeling',
        titleNe: 'आर्किटेक्चरल २D नक्सा तथा ३D भ्यू डिजाइन',
        cost: 45000,
        timelineDays: '7 to 10 Days',
        descriptionEn: 'Floor plans, elevations, section cuts, room sizing, door/window schedules and photorealistic 3D rendering.',
        descriptionNe: 'घरको भुइँ र तलाको नक्सा, चारैतिरको भ्यू, काटिएका सेक्सन र रङ्गीन ३D मोडल।',
      },
      {
        titleEn: 'Structural Analysis Report (ETABS/SAP2000 Seismic Model - NBC 105:2020)',
        titleNe: 'स्ट्रक्चरल डिजाइन तथा भूकम्प प्रतिरोधी विश्लेषण प्रतिवेदन',
        cost: 35000,
        timelineDays: '5 to 7 Days',
        descriptionEn: 'Full 3D finite element computer simulation verifying pillar sizing, beam loads, and soil-structure interaction.',
        descriptionNe: 'कम्प्युटर सिमुलेसन मार्फत पिल्लर, बिम र जगको भार वहन क्षमता जाँच्ने आधिकारिक इन्जिनियरिङ रिपोर्ट।',
      },
      {
        titleEn: 'Sanitary, Plumbing (PHE) & Concealed Electrical Layout',
        titleNe: 'स्यानिटरी, प्लम्बिङ र बिजुली वायरिङ नक्सा',
        cost: 20000,
        timelineDays: '3 to 5 Days',
        descriptionEn: 'Water pipe distribution, septic tank design, rain drainage, light points and distribution board schematics.',
        descriptionNe: 'ढल निकास, सेप्टिक ट्यांकी, खानेपानी पाइप र बिजुलीका पोइन्टहरूको इन्जिनियरिङ रेखांकन।',
      },
      {
        titleEn: 'Municipality Scrutiny Fee & Revenue Deposit (धरौटी तथा नक्शा पास राजस्व)',
        titleNe: 'नगरपालिका नक्शा पास राजस्व, फारम दस्तुर र धरौटी',
        cost: 50000,
        timelineDays: '15 to 30 Days',
        descriptionEn: 'Official government municipality permit scrutiny, neighborhood notice (१५ दिने सार्वजनिक सूचना) and temporary approval.',
        descriptionNe: 'नगरपालिकाको आधिकारिक दस्तुर, १५ दिने सँधियार मुचुल्का सूचना र अस्थायी निर्माण अनुमति।',
      },
      {
        titleEn: 'Site Supervision & Construction Completion Certificate (निर्माण सम्पन्नताको प्रमाणपत्र)',
        titleNe: 'साइट सुपरभिजन र अन्तिम निर्माण सम्पन्न प्रमाणपत्र (Nirman Sampanna)',
        cost: 35000,
        timelineDays: 'Post-Construction',
        descriptionEn: 'Mandatory engineer site visits during foundation, pillar casting, roof casting, and final municipal completion sign-off.',
        descriptionNe: 'इन्जिनियरद्वारा ढलान गर्दा गरिने साइट निरीक्षण र घर बनिसकेपछि नगरपालिकाबाट लिइने सम्पन्नता प्रमाणपत्र।',
      },
    ],
  };

  // 5. Milestone Cashflow Plan (7-Stage Bank Loan & Contractor Disbursement)
  const milestoneCashflow: MilestoneCashflowItem[] = [
    {
      stageNumber: 1,
      titleEn: 'Stage 1: Advance, Layout & Foundation Footings Casting (१०%)',
      titleNe: 'पहिलो किस्ता: पेस्की, लेआउट र जग ढलान कार्य (१०%)',
      percent: 10,
      cumulativePercent: 10,
      amount: Math.round(totalBudget * 0.10),
      inspectionRequirementsEn: [
        'Boundary demarcation verified against land ownership deed (लालपुर्जा)',
        'Footing pit depth verified to specified firm soil layer (5.5ft to 7.5ft)',
        'Cover blocks under footing rebar mesh in place before concrete pouring',
      ],
      inspectionRequirementsNe: [
        'लालपुर्जा र चारकिल्ला अनुसार साँध-सिमाना ठीक भएको यकिन गर्ने',
        'जगको गहिराइ मापदण्ड अनुसार पुगेको र सोलिङ-पिसिसी भएको जाँच्ने',
        'फुटिङ जालीमुनि कभर ब्लक राखेपछि मात्र ढलान गर्ने',
      ],
    },
    {
      stageNumber: 2,
      titleEn: 'Stage 2: Plinth Tie-Beam (DPC Level) & Earth Backfilling (१५%)',
      titleNe: 'दोस्रो किस्ता: प्लिन्थ बिम (DPC), माटो पुर्ने र कम्प्याक्सन (१५%)',
      percent: 15,
      cumulativePercent: 25,
      amount: Math.round(totalBudget * 0.15),
      inspectionRequirementsEn: [
        'Plinth tie-beam continuous level and 135° hook ties checked',
        'Damp-proof course (DPC) bitumen coating properly cured',
        'Earth backfilling compacted in 6-inch layers to prevent future floor sinking',
      ],
      inspectionRequirementsNe: [
        'प्लिन्थ बिमको लेभल मिलेको र १३५ डिग्रीका रिङ बाँधिएको जाँच्ने',
        'ओस रोक्ने DPC वाटरप्रुफिङ कोट राम्ररी लागेको यकिन गर्ने',
        'भुइँ नभासियोस् भनेर माटो राम्रोसँग कम्प्याक्सन (दह्रो) पार्ने',
      ],
    },
    {
      stageNumber: 3,
      titleEn: 'Stage 3: Ground Floor Columns & 1st Floor Slab Casting (१५%)',
      titleNe: 'तेस्रो किस्ता: भुइँतलाका पिल्लर र पहिलो छत ढलान (१५%)',
      percent: 15,
      cumulativePercent: 40,
      amount: Math.round(totalBudget * 0.15),
      inspectionRequirementsEn: [
        'Column plumb verified vertically with optical plumb-bob',
        'Slab shuttering rigidity & bottom props verified against deflection',
        'Electrical conduit pipes and ceiling fan boxes firmly anchored before casting',
      ],
      inspectionRequirementsNe: [
        'पिल्लरहरू ठाडो (साहुल) मिलेको जाँच्ने',
        'छतको फर्मा दह्रो अड्याइएको र कभर ब्लक राखिएको यकिन गर्ने',
        'ढलान अगाडि बिजुलीका पाइप र फ्यान बक्स बाँधिएको जाँच्ने',
      ],
    },
    {
      stageNumber: 4,
      titleEn: 'Stage 4: Upper Storey Columns & Top Roof Slab Casting (१५%)',
      titleNe: 'चौथो किस्ता: माथिल्लो तलाका पिल्लर र मुख्य छत ढलान (१५%)',
      percent: 15,
      cumulativePercent: 55,
      amount: Math.round(totalBudget * 0.15),
      inspectionRequirementsEn: [
        'Top roof beam reinforcement overlap and lap length (50d) verified',
        'Parapet wall starter rebar and rooftop drainage slope (1:100) planned',
        '21-day continuous water ponding strictly enforced on freshly cast slab',
      ],
      inspectionRequirementsNe: [
        'डण्डीको खप्टिने भाग (ल्यापिङ) कम्तीमा ५० गुणा डायमिटर पुगेको जाँच्ने',
        'छतमा पानी नजमोस् भनेर ढलानमै पानीको भिरालोपना (Slope) मिलाउने',
        'छत ढलानपछि २१ दिनसम्म निरन्तर पानी जमाएर क्युरिङ गर्ने',
      ],
    },
    {
      stageNumber: 5,
      titleEn: 'Stage 5: Masonry Walls, Lintel Bands & Conduit Chipping (१५%)',
      titleNe: 'पाँचौं किस्ता: इँटाको गारो, लिन्टेल ब्यान्ड र पाइप चिपिङ (१५%)',
      percent: 15,
      cumulativePercent: 70,
      amount: Math.round(totalBudget * 0.15),
      inspectionRequirementsEn: [
        'Bricks thoroughly soaked in water before laying to prevent drying mortar',
        'Horizontal reinforced lintel & sill bands cast over all window/door openings',
        'Wall joints raked 10mm deep to ensure mechanical bonding with plaster',
      ],
      inspectionRequirementsNe: [
        'इँटा लगाउनु अघि ट्यांकीमा राम्ररी भिजाएको यकिन गर्ने',
        'झ्यालढोकामा भूकम्प रोक्ने लिन्टेल र सिल ब्यान्ड ढलान भएको जाँच्ने',
        'प्लास्टर समातोस् भनेर इँटाको जोर्नीमा मसला कोतरेको (Raking) हुनुपर्ने',
      ],
    },
    {
      stageNumber: 6,
      titleEn: 'Stage 6: Plastering, Waterproofing & Door Frame Chaukhats (१५%)',
      titleNe: 'छैटौं किस्ता: भित्री/बाहिरी प्लास्टर, वाटरप्रुफिङ र चौकोस (१५%)',
      percent: 15,
      cumulativePercent: 85,
      amount: Math.round(totalBudget * 0.15),
      inspectionRequirementsEn: [
        'Chicken wire mesh installed across all brick-to-column junctions before plaster',
        'Bathroom sunken slab and rooftop terrace acrylic waterproofing tested with water ponding',
        'Seasoned wooden door frames (चौकोस) leveled in true plumb and right angle',
      ],
      inspectionRequirementsNe: [
        'पिल्लर र इँटा जोर्नीमा कुखुरे तारजाली ठोकेपछि मात्र प्लास्टर गर्ने',
        'बाथरुम र कौसीमा केमिकल लगाएर पानी जमाई चुहावट परीक्षण गर्ने',
        'काठका चौकोसहरू साहुल र गुनिया मिलाएर जाम गर्ने',
      ],
    },
    {
      stageNumber: 7,
      titleEn: 'Stage 7: Flooring Tiles, Painting, Electrical/Sanitary & Handover (१५%)',
      titleNe: 'सातौं किस्ता: टायल, रङरोगन, धारा, बिजुली र साँचो हस्तान्तरण (१५%)',
      percent: 15,
      cumulativePercent: 100,
      amount: Math.round(totalBudget * 0.15),
      inspectionRequirementsEn: [
        'Floor tiles checked for hollow tapping sounds with rubber mallet',
        'Plumbing pressure test to ensure zero leakage in pressurized water pipes',
        'Final cleaning, electrical tripping verification, and keys handover with guarantee letter',
      ],
      inspectionRequirementsNe: [
        'टायल मुनि मसला खाली भएर खोक्रो आवाज नआएको यकिन गर्ने',
        'पानीका सबै पाइपमा प्रेसर दिएर चुहावट नभएको जाँच्ने',
        'घर सफाइ, बिजुली बत्ती चेकजाँच र ग्यारेन्टी पत्रसहित साँचो हस्तान्तरण',
      ],
    },
  ];

  return {
    totalBuiltUpSqFt: builtUpSqFt,
    storeys,
    effectiveRatePerSqFt: baseRate,
    totalBudget,
    materialBudget,
    laborBudget,
    soilCondition,
    masonryType,
    materials: {
      cementBags,
      cementCost,
      steelKg,
      steelQuintals,
      steelCost,
      bricksCount: totalUnits,
      bricksCost,
      sandCuFt,
      sandTrips,
      sandCost,
      aggregateCuFt,
      aggregateTrips,
      aggregateCost,
      finishingCost,
      pillars: {
        pillarCount,
        pillarSizeEn,
        pillarSizeNe,
        rebarSpecEn,
        rebarSpecNe,
        stirrupSpecEn,
        stirrupSpecNe,
        footingDepthEn,
        footingDepthNe,
        footingSizeEn,
        footingSizeNe,
        footingCount: pillarCount,
        groundFootprintSqFt,
        plinthBeamSizeEn,
        plinthBeamSizeNe,
        roofSlabThicknessEn,
        roofSlabThicknessNe,
      },
      bricksDetail: {
        totalUnits,
        unitTypeEn: isAac ? 'AAC Lightweight Blocks' : 'First-Class Chimney Bricks',
        unitTypeNe: isAac ? 'एएसी हलुका ब्लक' : 'पहिलो नम्बर इँटा',
        exterior9InchUnits,
        interior4InchUnits,
        mortarCementBags,
        mortarSandCuFt,
        mortarRatioEn: isAac ? '1:3 thin block adhesive polymer mortar' : '1:4 for 4.5" partitions; 1:6 for 9" walls',
        mortarRatioNe: isAac ? '१:३ एएसी ब्लक टाँस्ने विशेष मसला' : '४.५ इन्चका लागि १:४ र ९ इन्चका लागि १:६ को मसला अनुपात',
        breakageWastageUnits,
      },
      cementDetail: {
        totalBags: cementBags,
        opcStructureBags,
        ppcFinishingBags,
        structureAndSlabsBags,
        masonryMortarBags,
        plasterAndFlooringBags,
        waterproofingCompoundLiters,
        waterRequiredLiters,
      },
      steelDetail: {
        totalKg: steelKg,
        totalQuintals: steelQuintals,
        bindingWireKg,
        diameterSchedule,
        pillarColumnsKg,
        beamsLintelsKg,
        slabRoofMeshKg,
      },
      boqPhases,
      architecturalPlan,
      structuralSchedule,
      rateAnalysis,
      municipalPermits,
      milestoneCashflow,
    },
    unitRatesUsed,
  };
}
