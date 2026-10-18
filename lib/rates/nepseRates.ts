export const SEBON_FEE_RATE = 0.00015; // 0.015%
export const DP_FEE = 25; // NPR 25 flat

export interface BrokerSlab {
  min: number;
  max: number;
  rate: number; // percentage as decimal
}

export const BROKER_COMMISSION_SLABS: BrokerSlab[] = [
  { min: 0, max: 50000, rate: 0.0040 },       // 0.40%
  { min: 50000, max: 500000, rate: 0.0037 },   // 0.37%
  { min: 500000, max: 2000000, rate: 0.0034 }, // 0.34%
  { min: 2000000, max: 10000000, rate: 0.0030 }, // 0.30%
  { min: 10000000, max: Infinity, rate: 0.0027 }, // 0.27%
];

export function calculateBrokerCommission(amount: number): number {
  if (amount <= 0) return 0;
  for (const slab of BROKER_COMMISSION_SLABS) {
    if (amount <= slab.max) {
      return Math.max(10, amount * slab.rate);
    }
  }
  return Math.max(10, amount * 0.0027);
}

export const CGT_RATES = {
  shortTerm: 0.075, // 7.5% (< 365 days)
  longTerm: 0.050,  // 5.0% (>= 365 days)
  institutional: 0.100, // 10.0%
};
