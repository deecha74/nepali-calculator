export interface RopaniSystem {
  ropani: number;
  aana: number;
  paisa: number;
  daam: number;
}

export interface BighaSystem {
  bigha: number;
  kattha: number;
  dhur: number;
  kanwa: number;
}

// 1 Sq. Foot to various land units constants
export const SQFT_PER_ROPANI = 5476;
export const SQFT_PER_AANA = 342.25;
export const SQFT_PER_PAISA = 85.5625;
export const SQFT_PER_DAAM = 21.390625;

export const SQFT_PER_BIGHA = 72900;
export const SQFT_PER_KATTHA = 3645;
export const SQFT_PER_DHUR = 182.25;
export const SQFT_PER_KANWA = 11.390625;

export const SQFT_PER_SQMTR = 10.7639;
export const SQFT_PER_ACRE = 43560;
export const SQFT_PER_HECTARE = 107639.1;

/**
 * Converts Ropani-Aana-Paisa-Daam into Total Square Feet
 */
export function ropaniToSqFt(r: number, a: number, p: number, d: number): number {
  return (
    (r || 0) * SQFT_PER_ROPANI +
    (a || 0) * SQFT_PER_AANA +
    (p || 0) * SQFT_PER_PAISA +
    (d || 0) * SQFT_PER_DAAM
  );
}

/**
 * Converts Bigha-Kattha-Dhur-Kanwa into Total Square Feet
 */
export function bighaToSqFt(b: number, k: number, d: number, kw: number = 0): number {
  return (
    (b || 0) * SQFT_PER_BIGHA +
    (k || 0) * SQFT_PER_KATTHA +
    (d || 0) * SQFT_PER_DHUR +
    (kw || 0) * SQFT_PER_KANWA
  );
}

/**
 * Converts total square feet into clean Ropani-Aana-Paisa-Daam breakdown
 */
export function sqFtToRopani(sqFt: number): RopaniSystem {
  let remaining = Math.max(0, sqFt);
  const ropani = Math.floor(remaining / SQFT_PER_ROPANI);
  remaining %= SQFT_PER_ROPANI;

  const aana = Math.floor(remaining / SQFT_PER_AANA);
  remaining %= SQFT_PER_AANA;

  const paisa = Math.floor(remaining / SQFT_PER_PAISA);
  remaining %= SQFT_PER_PAISA;

  const daam = Math.round((remaining / SQFT_PER_DAAM) * 100) / 100;

  return { ropani, aana, paisa, daam };
}

/**
 * Converts total square feet into clean Bigha-Kattha-Dhur-Kanwa breakdown
 */
export function sqFtToBigha(sqFt: number): BighaSystem {
  let remaining = Math.max(0, sqFt);
  const bigha = Math.floor(remaining / SQFT_PER_BIGHA);
  remaining %= SQFT_PER_BIGHA;

  const kattha = Math.floor(remaining / SQFT_PER_KATTHA);
  remaining %= SQFT_PER_KATTHA;

  const dhur = Math.floor(remaining / SQFT_PER_DHUR);
  remaining %= SQFT_PER_DHUR;

  const kanwa = Math.round((remaining / SQFT_PER_KANWA) * 100) / 100;

  return { bigha, kattha, dhur, kanwa };
}

export interface ProgrammaticLandConversion {
  slug: string;
  fromUnit: string;
  toUnit: string;
  fromUnitNepali: string;
  toUnitNepali: string;
  factor: number; // 1 fromUnit = factor * toUnit
  formula: string;
  title: string;
  metaDescription: string;
}

/**
 * Programmatic SEO routes for land conversions
 */
export const PROGRAMMATIC_LAND_CONVERSIONS: ProgrammaticLandConversion[] = [
  {
    slug: "ropani-to-aana",
    fromUnit: "Ropani",
    toUnit: "Aana",
    fromUnitNepali: "रोपनी",
    toUnitNepali: "आना",
    factor: 16,
    formula: "1 Ropani = 16 Aana",
    title: "Ropani to Aana Converter (१ रोपनी = १६ आना)",
    metaDescription: "Convert Ropani to Aana instantly with official Nepal government survey measurement standards. Accurate calculation with square feet and square meters.",
  },
  {
    slug: "aana-to-sqft",
    fromUnit: "Aana",
    toUnit: "Square Feet",
    fromUnitNepali: "आना",
    toUnitNepali: "वर्ग फिट",
    factor: 342.25,
    formula: "1 Aana = 342.25 Sq. Ft",
    title: "Aana to Square Feet (Sq Ft) Converter",
    metaDescription: "How many square feet are in 1 Aana? 1 Aana equals 342.25 sq ft. Calculate land area and property prices in Kathmandu Valley and Nepal.",
  },
  {
    slug: "ropani-to-bigha",
    fromUnit: "Ropani",
    toUnit: "Bigha",
    fromUnitNepali: "रोपनी",
    toUnitNepali: "विघा",
    factor: 5476 / 72900, // 0.0751
    formula: "1 Ropani ≈ 0.0751 Bigha (1 Bigha = 13.31 Ropani)",
    title: "Ropani to Bigha Converter (पहाड देखि तराई जग्गा)",
    metaDescription: "Convert hill/valley Ropani system to Terai Bigha system accurately. 1 Bigha equals 13.31 Ropani. Free online land calculator.",
  },
  {
    slug: "bigha-to-kattha",
    fromUnit: "Bigha",
    toUnit: "Kattha",
    fromUnitNepali: "विघा",
    toUnitNepali: "कठ्ठा",
    factor: 20,
    formula: "1 Bigha = 20 Kattha",
    title: "Bigha to Kattha Converter (१ विघा = २० कठ्ठा) — Terai Land Calculator",
    metaDescription: "Convert Bigha to Kattha in Terai Nepal instantly. 1 Bigha equals 20 Kattha or 400 Dhur. Instant live results.",
  },
  {
    slug: "kattha-to-dhur",
    fromUnit: "Kattha",
    toUnit: "Dhur",
    fromUnitNepali: "कठ्ठा",
    toUnitNepali: "धुर",
    factor: 20,
    formula: "1 Kattha = 20 Dhur",
    title: "Kattha to Dhur Converter (१ कठ्ठा = २० धुर) — Nepal Land Measurement",
    metaDescription: "Easily convert Kattha to Dhur for Terai land measurement. 1 Kattha = 20 Dhur (3,645 sq ft).",
  },
  {
    slug: "dhur-to-sqft",
    fromUnit: "Dhur",
    toUnit: "Square Feet",
    fromUnitNepali: "धुर",
    toUnitNepali: "वर्ग फिट",
    factor: 182.25,
    formula: "1 Dhur = 182.25 Sq. Ft",
    title: "Dhur to Square Feet Converter — Terai Land Measurement Nepal",
    metaDescription: "1 Dhur = 182.25 square feet. Calculate Terai property land area and value in square feet and meters.",
  },
  {
    slug: "ropani-to-sqft",
    fromUnit: "Ropani",
    toUnit: "Square Feet",
    fromUnitNepali: "रोपनी",
    toUnitNepali: "वर्ग फिट",
    factor: 5476,
    formula: "1 Ropani = 5,476 Sq. Ft",
    title: "Ropani to Square Feet Converter (१ रोपनी = ५४७६ sq ft) — Nepal",
    metaDescription: "Convert Ropani to Sq Ft and Sq Meter. 1 Ropani is equal to 5,476 square feet. Official Nepal measurement standard.",
  },
  {
    slug: "bigha-to-sqft",
    fromUnit: "Bigha",
    toUnit: "Square Feet",
    fromUnitNepali: "विघा",
    toUnitNepali: "वर्ग फिट",
    factor: 72900,
    formula: "1 Bigha = 72,900 Sq. Ft",
    title: "Bigha to Square Feet Converter (१ विघा = ७२,९०० sq ft)",
    metaDescription: "Convert Bigha to Square Feet in Terai Nepal. 1 Bigha equals 72,900 sq ft or 6,772.63 square meters. Instant accurate calculator.",
  },
  {
    slug: "kattha-to-sqft",
    fromUnit: "Kattha",
    toUnit: "Square Feet",
    fromUnitNepali: "कठ्ठा",
    toUnitNepali: "वर्ग फिट",
    factor: 3645,
    formula: "1 Kattha = 3,645 Sq. Ft",
    title: "Kattha to Square Feet Converter (१ कठ्ठा = ३,६४५ sq ft)",
    metaDescription: "Convert Kattha to Square Feet for Terai land measurement. 1 Kattha = 3,645 sq ft (20 Dhur). Free instant calculator.",
  },
  {
    slug: "aana-to-paisa",
    fromUnit: "Aana",
    toUnit: "Paisa",
    fromUnitNepali: "आना",
    toUnitNepali: "पैसा",
    factor: 4,
    formula: "1 Aana = 4 Paisa",
    title: "Aana to Paisa Converter (१ आना = ४ पैसा)",
    metaDescription: "1 Aana equals 4 Paisa in Nepali land system. Convert Aana and Paisa to square feet and square meters instantly.",
  },
];
