export type LandSystem = 'ropani' | 'bigha' | 'sqft';

export interface BatoKattaInputs {
  system: LandSystem;
  
  // Ropani system inputs
  ropani?: number;
  aana?: number;
  paisa?: number;
  daam?: number;
  
  // Bigha system inputs
  bigha?: number;
  kattha?: number;
  dhur?: number;
  
  // Direct Sq Ft
  directSqFt?: number;
  
  // Road dimensions
  roadWidthFt: number; // e.g. 13 ft, 16 ft, 20 ft
  roadLengthFt: number; // length running along property in feet
  
  // Cost analysis
  ratePerUnit?: number; // Rate per Aana or per Kattha
}

export interface LandBreakdownRopani {
  ropani: number;
  aana: number;
  paisa: number;
  daam: number;
  formattedEn: string;
  formattedNe: string;
}

export interface LandBreakdownBigha {
  bigha: number;
  kattha: number;
  dhur: number;
  formattedEn: string;
  formattedNe: string;
}

export interface BatoKattaResult {
  grossSqFt: number;
  roadDeductionSqFt: number;
  netRemainingSqFt: number;
  percentageRoadLost: number;
  
  // Ropani Breakdown
  grossRopani: LandBreakdownRopani;
  roadRopani: LandBreakdownRopani;
  netRopani: LandBreakdownRopani;
  
  // Bigha Breakdown
  grossBigha: LandBreakdownBigha;
  roadBigha: LandBreakdownBigha;
  netBigha: LandBreakdownBigha;
  
  // Financial Impact (if rate provided)
  totalLandCost: number;
  grossAana: number;
  netAana: number;
  effectiveCostPerNetAana: number;
  priceIncreasePercentage: number;
}

export function sqFtToRopani(sqFt: number): LandBreakdownRopani {
  const safeSqFt = Math.max(0, sqFt);
  const ropani = Math.floor(safeSqFt / 5476);
  let rem = safeSqFt % 5476;
  
  const aana = Math.floor(rem / 342.25);
  rem = rem % 342.25;
  
  const paisa = Math.floor(rem / 85.56);
  rem = rem % 85.56;
  
  const daam = Math.round((rem / 21.39) * 10) / 10;
  
  return {
    ropani,
    aana,
    paisa,
    daam,
    formattedEn: `${ropani}-${aana}-${paisa}-${daam} (R-A-P-D)`,
    formattedNe: `${ropani} रोपनी, ${aana} आना, ${paisa} पैसा, ${daam} दाम`,
  };
}

export function sqFtToBigha(sqFt: number): LandBreakdownBigha {
  const safeSqFt = Math.max(0, sqFt);
  const bigha = Math.floor(safeSqFt / 72900);
  let rem = safeSqFt % 72900;
  
  const kattha = Math.floor(rem / 3645);
  rem = rem % 3645;
  
  const dhur = Math.round((rem / 182.25) * 10) / 10;
  
  return {
    bigha,
    kattha,
    dhur,
    formattedEn: `${bigha}-${kattha}-${dhur} (B-K-D)`,
    formattedNe: `${bigha} बिघा, ${kattha} कट्ठा, ${dhur} धुर`,
  };
}

export function calculateBatoKatta(inputs: BatoKattaInputs): BatoKattaResult {
  const { 
    system, 
    ropani = 0, aana = 0, paisa = 0, daam = 0, 
    bigha = 0, kattha = 0, dhur = 0, 
    directSqFt = 0, 
    roadWidthFt, 
    roadLengthFt,
    ratePerUnit = 0
  } = inputs;

  let grossSqFt = 0;
  if (system === 'ropani') {
    grossSqFt = (ropani * 5476) + (aana * 342.25) + (paisa * 85.56) + (daam * 21.39);
  } else if (system === 'bigha') {
    grossSqFt = (bigha * 72900) + (kattha * 3645) + (dhur * 182.25);
  } else {
    grossSqFt = directSqFt;
  }

  const roadDeductionSqFt = Math.max(0, roadWidthFt * roadLengthFt);
  const netRemainingSqFt = Math.max(0, grossSqFt - roadDeductionSqFt);
  const percentageRoadLost = grossSqFt > 0 ? (roadDeductionSqFt / grossSqFt) * 100 : 0;

  const grossRopani = sqFtToRopani(grossSqFt);
  const roadRopani = sqFtToRopani(roadDeductionSqFt);
  const netRopani = sqFtToRopani(netRemainingSqFt);

  const grossBigha = sqFtToBigha(grossSqFt);
  const roadBigha = sqFtToBigha(roadDeductionSqFt);
  const netBigha = sqFtToBigha(netRemainingSqFt);

  // Financial calculations
  const grossAana = grossSqFt / 342.25;
  const netAana = netRemainingSqFt / 342.25;
  const totalLandCost = ratePerUnit > 0 ? Math.round(grossAana * ratePerUnit) : 0;
  const effectiveCostPerNetAana = netAana > 0 && totalLandCost > 0 ? Math.round(totalLandCost / netAana) : ratePerUnit;
  const priceIncreasePercentage = ratePerUnit > 0 && effectiveCostPerNetAana > ratePerUnit
    ? ((effectiveCostPerNetAana - ratePerUnit) / ratePerUnit) * 100
    : 0;

  return {
    grossSqFt: Math.round(grossSqFt * 100) / 100,
    roadDeductionSqFt: Math.round(roadDeductionSqFt * 100) / 100,
    netRemainingSqFt: Math.round(netRemainingSqFt * 100) / 100,
    percentageRoadLost: Math.round(percentageRoadLost * 100) / 100,
    grossRopani,
    roadRopani,
    netRopani,
    grossBigha,
    roadBigha,
    netBigha,
    totalLandCost,
    grossAana: Math.round(grossAana * 100) / 100,
    netAana: Math.round(netAana * 100) / 100,
    effectiveCostPerNetAana,
    priceIncreasePercentage: Math.round(priceIncreasePercentage * 100) / 100,
  };
}
