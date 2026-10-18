const fs = require('fs');
const path = require('path');

const compDir = path.join(__dirname, '..', 'components', 'calculators');
const files = [
  'BmiCalculator.tsx',
  'CustomsCalculator.tsx',
  'DateConverter.tsx',
  'EmiCalculator.tsx',
  'ForexCalculator.tsx',
  'FuelCalculator.tsx',
  'GoldCalculator.tsx',
  'GpaCalculator.tsx',
  'GratuityCalculator.tsx',
  'IncomeTaxCalculator.tsx',
  'InflationCalculator.tsx',
  'KhanepaniCalculator.tsx',
  'LandConverter.tsx',
  'LoanEligibilityCalculator.tsx',
  'LocalInterestCalculator.tsx',
  'NeaCalculator.tsx',
  'NepseCalculator.tsx',
  'NumberToWordsCalculator.tsx',
  'OvertimeCalculator.tsx',
  'PensionCalculator.tsx',
  'PreetiConverter.tsx',
  'SipCalculator.tsx',
  'TraditionalUnitsConverter.tsx',
  'VatCalculator.tsx',
  'VehicleTaxCalculator.tsx'
];

files.forEach(f => {
  const content = fs.readFileSync(path.join(compDir, f), 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('<h2')) {
      console.log(`${f}:${idx + 1}: ${line.trim()}`);
      if (lines[idx + 1]) console.log(`   ${lines[idx + 1].trim()}`);
    }
  });
});
