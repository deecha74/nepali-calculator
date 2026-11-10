export * from './taxRates';
export * from './landRates';
export * from './vehicleTaxRates';
export * from './nepseRates';
export * from './neaRates';
export * from './goldRates';
export * from './programmaticGold';
export * from './goldHistory';
export * from './forexRates';
export * from './bankLoanRates';
export * from './airportCustomsRates';
export * from './programmaticInterest';
export * from './programmaticConstruction';
export * from './programmaticNea';
export * from './programmaticTds';
export * from './programmaticMalpot';
export * from './traditionalUnitRates';
export * from './programmaticEmi';
export * from './programmaticSip';
export * from './programmaticTax';
export * from './programmaticVehicles';

export interface RateEngineStatus {
  activeFiscalYear: string;
  taxRatesVersion: string;
  lastUpdated: string;
  autoUpdateEnabled: boolean;
}

export function getRateEngineStatus(): RateEngineStatus {
  return {
    activeFiscalYear: "2083/84",
    taxRatesVersion: "Nepal Finance Act (Current)",
    lastUpdated: "Fiscal Year 2083/84 Active",
    autoUpdateEnabled: true,
  };
}
