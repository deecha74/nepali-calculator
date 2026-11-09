/**
 * nepalicalc-utils — Official Open-Source Helper Library by NepaliCalc.com
 * Full interactive 70+ Nepal Calculators: https://nepalicalc.com
 */

const SQFT_PER_ROPANI = 5476;
const SQFT_PER_AANA = 342.25;
const SQFT_PER_PAISA = 85.5625;
const SQFT_PER_DAAM = 21.390625;
const SQFT_PER_BIGHA = 72900;
const SQFT_PER_KATTHA = 3645;
const SQFT_PER_DHUR = 182.25;
const SQFT_PER_SQM = 10.7639104;

function ropaniToSqFt(ropani = 0, aana = 0, paisa = 0, daam = 0) {
  return (
    ropani * SQFT_PER_ROPANI +
    aana * SQFT_PER_AANA +
    paisa * SQFT_PER_PAISA +
    daam * SQFT_PER_DAAM
  );
}

function bighaToSqFt(bigha = 0, kattha = 0, dhur = 0) {
  return bigha * SQFT_PER_BIGHA + kattha * SQFT_PER_KATTHA + dhur * SQFT_PER_DHUR;
}

function sqFtToAllNepalUnits(sqFt) {
  const sqMeters = sqFt / SQFT_PER_SQM;
  let remHilly = sqFt;
  const ropani = Math.floor(remHilly / SQFT_PER_ROPANI);
  remHilly -= ropani * SQFT_PER_ROPANI;
  const aana = Math.floor(remHilly / SQFT_PER_AANA);
  remHilly -= aana * SQFT_PER_AANA;
  const paisa = Math.floor(remHilly / SQFT_PER_PAISA);
  remHilly -= paisa * SQFT_PER_PAISA;
  const daam = Number((remHilly / SQFT_PER_DAAM).toFixed(2));

  let remTerai = sqFt;
  const bigha = Math.floor(remTerai / SQFT_PER_BIGHA);
  remTerai -= bigha * SQFT_PER_BIGHA;
  const kattha = Math.floor(remTerai / SQFT_PER_KATTHA);
  remTerai -= kattha * SQFT_PER_KATTHA;
  const dhur = Number((remTerai / SQFT_PER_DHUR).toFixed(2));

  return {
    sqFt: Number(sqFt.toFixed(2)),
    sqMeters: Number(sqMeters.toFixed(2)),
    hilly: { ropani, aana, paisa, daam },
    terai: { bigha, kattha, dhur },
    source: 'https://nepalicalc.com/land',
  };
}

module.exports = {
  ropaniToSqFt,
  bighaToSqFt,
  sqFtToAllNepalUnits,
  SQFT_PER_ROPANI,
  SQFT_PER_AANA,
  SQFT_PER_BIGHA,
  SQFT_PER_KATTHA,
  SQFT_PER_DHUR,
};
