const fs = require('fs');
const path = require('path');

const compDir = path.join(__dirname, '..', 'components', 'calculators');
const files = fs.readdirSync(compDir).filter(f => f.endsWith('.tsx'));

console.log(`Checking ${files.length} calculator components...`);

const needH1 = [];
files.forEach(f => {
  const content = fs.readFileSync(path.join(compDir, f), 'utf8');
  const hasH1 = /<h1[\s>]/.test(content);
  if (!hasH1) {
    needH1.push(f);
  }
});

console.log('Calculators lacking <h1>:', needH1);
