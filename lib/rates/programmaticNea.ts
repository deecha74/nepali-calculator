export interface ProgrammaticNeaBill {
  slug: string;
  units: number;
  title: string;
  shortTitle: string;
  metaDescription: string;
  keywords: string[];
  billAmount5A: string;
  rebateBillEarly: string;
  meterCharge: string;
  ratePerUnitAverage: string;
  headlineAnswer: string;
  faqs: { question: string; answer: string }[];
}

function calculateBill(units: number) {
  let energyCharge = 0;
  let minCharge = 30;

  if (units <= 20) {
    energyCharge = 0;
    minCharge = 30;
  } else if (units <= 30) {
    energyCharge = (units - 20) * 6.50;
    minCharge = 50;
  } else if (units <= 50) {
    energyCharge = (10 * 6.50) + ((units - 30) * 8.00);
    minCharge = 75;
  } else if (units <= 100) {
    energyCharge = (10 * 6.50) + (20 * 8.00) + ((units - 50) * 9.50);
    minCharge = 100;
  } else if (units <= 250) {
    energyCharge = (10 * 6.50) + (20 * 8.00) + (50 * 9.50) + ((units - 100) * 9.50);
    minCharge = 125;
  } else {
    energyCharge = (10 * 6.50) + (20 * 8.00) + (50 * 9.50) + (150 * 9.50) + ((units - 250) * 11.00);
    minCharge = 150;
  }

  // 5% VAT on units above 50
  let vat = 0;
  if (units > 50) {
    vat = (units - 50) * 9.5 * 0.05;
  }

  const subtotal = Math.max(minCharge, energyCharge) + vat;
  const earlyRebate = subtotal * 0.98; // 2% prompt discount within 7 days

  return {
    subtotal: Math.round(subtotal),
    earlyRebate: Math.round(earlyRebate),
    minCharge,
    avgPerUnit: units > 0 ? (subtotal / units).toFixed(2) : "0.00",
  };
}

export const PROGRAMMATIC_NEA_BILLS: ProgrammaticNeaBill[] = [
  20, 30, 50, 75, 100, 150, 200, 250, 300, 400, 500,
].map((units) => {
  const calc = calculateBill(units);
  return {
    slug: `nea-electricity-bill-for-${units}-units`,
    units,
    title: `NEA Electricity Bill for ${units} Units in Nepal (नेपाल विद्युत महसुल) — 2026 Tariff`,
    shortTitle: `NEA Bill for ${units} Units`,
    metaDescription: `How much is the NEA electricity bill for ${units} units in Nepal? View domestic 5 Ampere energy tariff, minimum service charge, 2% early payment rebate, and prompt total.`,
    keywords: [
      `nea electricity bill for ${units} units`,
      `${units} unit electricity bill nepal`,
      `nea bill for ${units} units`,
      `bijuli bill for ${units} units nepal`,
      `${units} युनिट विद्युत महसुल`,
    ],
    billAmount5A: `NPR ${calc.subtotal}`,
    rebateBillEarly: `NPR ${calc.earlyRebate} (With 2% Rebate)`,
    meterCharge: `NPR ${calc.minCharge} Minimum Charge`,
    ratePerUnitAverage: `NPR ${calc.avgPerUnit} / unit effective`,
    headlineAnswer: `For a standard domestic 5 Ampere meter in Nepal, consuming ${units} units (kWh) of electricity results in a monthly bill of approximately NPR ${calc.subtotal}. Paying your bill within 7 days of meter reading entitles you to an immediate 2% rebate, bringing your payment down to NPR ${calc.earlyRebate}.`,
    faqs: [
      {
        question: `How is the bill for ${units} units calculated under NEA tariff slabs?`,
        answer: `Nepal Electricity Authority (NEA) applies progressive telescopic slabs: the first 20 units are energy-free under 5A (Rs 30 minimum charge), 21-30 units are charged at Rs 6.50/unit, 31-50 units at Rs 8.00/unit, 51-250 units at Rs 9.50/unit, and units above 250 at Rs 11.00/unit.`,
      },
      {
        question: `When does the 2% discount or late fine apply to NEA bills?`,
        answer: `Payment within 1 to 7 days from meter reading gives an instant 2% rebate. Between 8 to 22 days, normal bill is paid. From day 23 to 30, a 5% fine is added; from day 31 to 40, a 10% fine is added; and after 40 days, a 25% fine applies with risk of line disconnection after 60 days.`,
      },
    ],
  };
});

