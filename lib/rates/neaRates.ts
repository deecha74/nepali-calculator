export interface NeaSlab {
  min: number;
  max: number;
  energyRate: number; // NPR per unit
  minCharge5A: number;
}

export const NEA_SLABS_5A: NeaSlab[] = [
  { min: 0, max: 20, energyRate: 0, minCharge5A: 30 },     // Lifeline
  { min: 21, max: 30, energyRate: 6.50, minCharge5A: 50 },
  { min: 31, max: 50, energyRate: 8.00, minCharge5A: 75 },
  { min: 51, max: 100, energyRate: 9.50, minCharge5A: 100 },
  { min: 101, max: 250, energyRate: 9.50, minCharge5A: 125 },
  { min: 251, max: Infinity, energyRate: 11.00, minCharge5A: 150 },
];

export const METER_CAPACITIES = [
  { id: "5A", label: "5 Ampere (Standard Domestic)", multiplier: 1.0 },
  { id: "15A", label: "15 Ampere (Large Domestic)", multiplier: 1.15 },
  { id: "30A", label: "30 Ampere (3-Phase / Heavy)", multiplier: 1.30 },
  { id: "60A", label: "60 Ampere (Commercial / 3-Phase)", multiplier: 1.50 },
];
