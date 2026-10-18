// 1 Tola = 11.6638 grams
// 1 Tola = 100 Lal
// 1 Tola = 16 Aana
export const GRAMS_PER_TOLA = 11.6638;
export const LAL_PER_TOLA = 100;
export const AANA_PER_TOLA = 16;

export interface GoldMetalRates {
  fineGold24K: number; // per tola in NPR
  tejabiGold22K: number; // per tola in NPR
  silver: number; // per tola in NPR
  fineGold10g: number; // per 10 grams
  silver10g: number; // per 10 grams
  dailyChangeNpr: number;
  dailyChangePercent: number;
  marketStatus: "Live Market Active" | "Market Closed";
  updatedAt: string;
}

// Current prevailing market baseline (Federation of Nepal Gold and Silver Dealers' Association - FENEGOSIDA)
export const DEFAULT_GOLD_RATES: GoldMetalRates = {
  fineGold24K: 289700, // NPR per tola
  tejabiGold22K: 288700, // NPR per tola
  silver: 4100, // NPR per tola
  fineGold10g: 248370, // per 10 grams
  silver10g: 3515, // per 10 grams
  dailyChangeNpr: -400,
  dailyChangePercent: -0.14,
  marketStatus: "Live Market Active",
  updatedAt: "Today (FENEGOSIDA Official Live)",
};

