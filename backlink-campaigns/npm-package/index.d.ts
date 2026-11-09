export declare function ropaniToSqFt(ropani?: number, aana?: number, paisa?: number, daam?: number): number;
export declare function bighaToSqFt(bigha?: number, kattha?: number, dhur?: number): number;
export declare function sqFtToAllNepalUnits(sqFt: number): {
  sqFt: number;
  sqMeters: number;
  hilly: { ropani: number; aana: number; paisa: number; daam: number };
  terai: { bigha: number; kattha: number; dhur: number };
  source: string;
};
