export interface HistoricalGoldRecord {
  yearAD: number;
  yearBS: string;
  ratePerTolaNpr: number;
  ratePer10gNpr: number;
  ratePerLalNpr: number;
  eventOrContext: string;
}

// 100-Year Historical Gold Rates in Nepal (1926 - 2026)
// Compiled from Nepal Rastra Bank economic archives, historical market records, and FENEGOSIDA data.
export const HISTORICAL_GOLD_DATA: HistoricalGoldRecord[] = [
  { yearAD: 2026, yearBS: "२०८२/८३", ratePerTolaNpr: 289700, ratePer10gNpr: 248370, ratePerLalNpr: 2897, eventOrContext: "All-Time High (FENEGOSIDA Official Live)" },
  { yearAD: 2025, yearBS: "२०८१/८२", ratePerTolaNpr: 261000, ratePer10gNpr: 223770, ratePerLalNpr: 2610, eventOrContext: "Global Bullion Surge & Currency Headwinds" },
  { yearAD: 2024, yearBS: "२०८०/८१", ratePerTolaNpr: 145000, ratePer10gNpr: 124316, ratePerLalNpr: 1450, eventOrContext: "Import Tariff Revisions & Rate Rally" },
  { yearAD: 2023, yearBS: "२०७९/८०", ratePerTolaNpr: 105000, ratePer10gNpr: 90022, ratePerLalNpr: 1050, eventOrContext: "Crossed historic NPR 1 Lakh threshold" },
  { yearAD: 2022, yearBS: "२०७८/७९", ratePerTolaNpr: 94500, ratePer10gNpr: 81020, ratePerLalNpr: 945, eventOrContext: "Global Supply Chain Reopening" },
  { yearAD: 2021, yearBS: "२०७७/७८", ratePerTolaNpr: 89000, ratePer10gNpr: 76304, ratePerLalNpr: 890, eventOrContext: "Post-Pandemic Market Consolidation" },
  { yearAD: 2020, yearBS: "२०७६/७७", ratePerTolaNpr: 92000, ratePer10gNpr: 78876, ratePerLalNpr: 920, eventOrContext: "COVID-19 Pandemic Safe-Haven Rush (+44%)" },
  { yearAD: 2019, yearBS: "२०७५/७६", ratePerTolaNpr: 63500, ratePer10gNpr: 54442, ratePerLalNpr: 635, eventOrContext: "US-China Trade Tensions" },
  { yearAD: 2018, yearBS: "२०७४/७५", ratePerTolaNpr: 58200, ratePer10gNpr: 49900, ratePerLalNpr: 582, eventOrContext: "Stable Exchange Rates" },
  { yearAD: 2017, yearBS: "२०७३/७४", ratePerTolaNpr: 55800, ratePer10gNpr: 47840, ratePerLalNpr: 558, eventOrContext: "Nepal Local Elections Recovery" },
  { yearAD: 2016, yearBS: "२०७२/७३", ratePerTolaNpr: 52500, ratePer10gNpr: 45011, ratePerLalNpr: 525, eventOrContext: "10 Years Ago (Post-Constitution Period)" },
  { yearAD: 2015, yearBS: "२०७१/७२", ratePerTolaNpr: 48000, ratePer10gNpr: 41153, ratePerLalNpr: 480, eventOrContext: "Major Gorkha Earthquake Year" },
  { yearAD: 2014, yearBS: "२०७०/७१", ratePerTolaNpr: 39800, ratePer10gNpr: 34123, ratePerLalNpr: 398, eventOrContext: "Temporary Bullion Price Correction" },
  { yearAD: 2013, yearBS: "२०६९/७०", ratePerTolaNpr: 47000, ratePer10gNpr: 40296, ratePerLalNpr: 470, eventOrContext: "Volatile Global Bullion Shift" },
  { yearAD: 2012, yearBS: "२०६८/६९", ratePerTolaNpr: 45300, ratePer10gNpr: 38838, ratePerLalNpr: 453, eventOrContext: "Eurozone Sovereign Debt Uncertainty" },
  { yearAD: 2011, yearBS: "२०६७/६८", ratePerTolaNpr: 40000, ratePer10gNpr: 34294, ratePerLalNpr: 400, eventOrContext: "Global Gold Historic Bull Run" },
  { yearAD: 2010, yearBS: "२०६६/६७", ratePerTolaNpr: 31000, ratePer10gNpr: 26578, ratePerLalNpr: 310, eventOrContext: "Crossed NPR 30,000 Milestone" },
  { yearAD: 2009, yearBS: "२०६५/६६", ratePerTolaNpr: 25000, ratePer10gNpr: 21434, ratePerLalNpr: 250, eventOrContext: "Global Financial Crisis Aftermath" },
  { yearAD: 2008, yearBS: "२०६४/६५", ratePerTolaNpr: 21500, ratePer10gNpr: 18433, ratePerLalNpr: 215, eventOrContext: "Declaration of Republic of Nepal & Lehman Crisis" },
  { yearAD: 2007, yearBS: "२०६३/६४", ratePerTolaNpr: 18200, ratePer10gNpr: 15604, ratePerLalNpr: 182, eventOrContext: "Comprehensive Peace Accord Era" },
  { yearAD: 2006, yearBS: "२०६२/६३", ratePerTolaNpr: 14500, ratePer10gNpr: 12432, ratePerLalNpr: 145, eventOrContext: "People's Movement II (जनआन्दोलन २)" },
  { yearAD: 2005, yearBS: "२०६१/६२", ratePerTolaNpr: 12000, ratePer10gNpr: 10288, ratePerLalNpr: 120, eventOrContext: "Royal Takeover Period" },
  { yearAD: 2004, yearBS: "२०६०/६१", ratePerTolaNpr: 10100, ratePer10gNpr: 8659, ratePerLalNpr: 101, eventOrContext: "Crossed NPR 10,000 threshold" },
  { yearAD: 2003, yearBS: "२०५९/६०", ratePerTolaNpr: 9200, ratePer10gNpr: 7888, ratePerLalNpr: 92, eventOrContext: "Iraq War Geopolitical Buying" },
  { yearAD: 2002, yearBS: "२०५८/५९", ratePerTolaNpr: 8100, ratePer10gNpr: 6945, ratePerLalNpr: 81, eventOrContext: "Post-Royal Massacre Economic Slump" },
  { yearAD: 2001, yearBS: "२०५७/५८", ratePerTolaNpr: 7400, ratePer10gNpr: 6344, ratePerLalNpr: 74, eventOrContext: "Royal Palace Incident & 9/11 Shock" },
  { yearAD: 2000, yearBS: "२०५६/५७", ratePerTolaNpr: 7200, ratePer10gNpr: 6173, ratePerLalNpr: 72, eventOrContext: "Millennium Y2K Era" },
  { yearAD: 1995, yearBS: "२०५१/५२", ratePerTolaNpr: 4800, ratePer10gNpr: 4115, ratePerLalNpr: 48, eventOrContext: "Economic Liberalization in Nepal" },
  { yearAD: 1990, yearBS: "२०४६/४७", ratePerTolaNpr: 3600, ratePer10gNpr: 3086, ratePerLalNpr: 36, eventOrContext: "Restoration of Multiparty Democracy" },
  { yearAD: 1985, yearBS: "२०४१/४२", ratePerTolaNpr: 3200, ratePer10gNpr: 2743, ratePerLalNpr: 32, eventOrContext: "Panchayat Golden Era Stabilization" },
  { yearAD: 1980, yearBS: "२०३६/३७", ratePerTolaNpr: 2800, ratePer10gNpr: 2401, ratePerLalNpr: 28, eventOrContext: "Historic Global Gold Spike (Hunt Brothers / Oil Shock)" },
  { yearAD: 1975, yearBS: "२०३१/३२", ratePerTolaNpr: 1150, ratePer10gNpr: 986, ratePerLalNpr: 11.5, eventOrContext: "First Time Crossing NPR 1,000 / Tola" },
  { yearAD: 1971, yearBS: "२०२७/२८", ratePerTolaNpr: 700, ratePer10gNpr: 600, ratePerLalNpr: 7.0, eventOrContext: "End of Bretton Woods Gold Standard (Nixon Shock)" },
  { yearAD: 1965, yearBS: "२०२१/२२", ratePerTolaNpr: 400, ratePer10gNpr: 343, ratePerLalNpr: 4.0, eventOrContext: "Early Panchayat Development Period" },
  { yearAD: 1960, yearBS: "२०१६/१७", ratePerTolaNpr: 300, ratePer10gNpr: 257, ratePerLalNpr: 3.0, eventOrContext: "BP Koirala Ministry & Panchayat Dissolution" },
  { yearAD: 1955, yearBS: "२०११/१२", ratePerTolaNpr: 160, ratePer10gNpr: 137, ratePerLalNpr: 1.6, eventOrContext: "Coronation of King Mahendra" },
  { yearAD: 1950, yearBS: "२००६/०७", ratePerTolaNpr: 120, ratePer10gNpr: 103, ratePerLalNpr: 1.2, eventOrContext: "Historic Democratic Revolution (End of 104-yr Rana Regime)" },
  { yearAD: 1945, yearBS: "२००१/०२", ratePerTolaNpr: 65, ratePer10gNpr: 56, ratePerLalNpr: 0.65, eventOrContext: "End of World War II" },
  { yearAD: 1940, yearBS: "१९९६/९७", ratePerTolaNpr: 35, ratePer10gNpr: 30, ratePerLalNpr: 0.35, eventOrContext: "World War II Era under Juddha Shumsher" },
  { yearAD: 1935, yearBS: "१९९१/९२", ratePerTolaNpr: 28, ratePer10gNpr: 24, ratePerLalNpr: 0.28, eventOrContext: "Post-1934 Great Earthquake Recovery" },
  { yearAD: 1930, yearBS: "१९८६/८७", ratePerTolaNpr: 22, ratePer10gNpr: 19, ratePerLalNpr: 0.22, eventOrContext: "Great Depression Global Era" },
  { yearAD: 1926, yearBS: "१९८२/८३", ratePerTolaNpr: 20, ratePer10gNpr: 17.15, ratePerLalNpr: 0.20, eventOrContext: "100 Years Ago (Chandra Shumsher Rana Era)" },
];

export interface GoldComparisonResult {
  pastYear: number;
  pastYearBS: string;
  pastRatePerTola: number;
  todayRatePerTola: number;
  tolaQuantity: number;
  pastTotalCost: number;
  todayTotalValue: number;
  netProfitNpr: number;
  percentageGrowth: number;
  multiplier: number;
  cagrPercent: number;
  yearsElapsed: number;
  context: string;
}

export function compareGoldRates(
  pastYearAD: number,
  todayLiveRate: number,
  tolaQuantity: number = 1
): GoldComparisonResult {
  const record = HISTORICAL_GOLD_DATA.find((r) => r.yearAD === pastYearAD) || HISTORICAL_GOLD_DATA[HISTORICAL_GOLD_DATA.length - 1];
  const yearsElapsed = Math.max(1, 2026 - record.yearAD);
  const pastRate = record.ratePerTolaNpr;
  const currentRate = todayLiveRate > 0 ? todayLiveRate : 289700;

  const pastTotalCost = pastRate * tolaQuantity;
  const todayTotalValue = currentRate * tolaQuantity;
  const netProfitNpr = todayTotalValue - pastTotalCost;
  const percentageGrowth = ((todayTotalValue - pastTotalCost) / pastTotalCost) * 100;
  const multiplier = todayTotalValue / pastTotalCost;

  // Compound Annual Growth Rate (CAGR) = (End Value / Begin Value)^(1 / n) - 1
  const cagrPercent = (Math.pow(multiplier, 1 / yearsElapsed) - 1) * 100;

  return {
    pastYear: record.yearAD,
    pastYearBS: record.yearBS,
    pastRatePerTola: pastRate,
    todayRatePerTola: currentRate,
    tolaQuantity,
    pastTotalCost,
    todayTotalValue,
    netProfitNpr,
    percentageGrowth,
    multiplier,
    cagrPercent,
    yearsElapsed,
    context: record.eventOrContext,
  };
}
