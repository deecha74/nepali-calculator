export * from './taxRates';
export * from './landRates';
export * from './vehicleTaxRates';
export * from './nepseRates';
export * from './neaRates';
export * from './goldRates';
export * from './programmaticGold';
export * from './goldHistory';
export * from './forexRates';

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
