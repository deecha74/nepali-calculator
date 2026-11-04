const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = getFiles(path.join(__dirname, '..', 'app'));
let count = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('https://nepalcalc.com')) {
    content = content.replace(/https:\/\/nepalcalc\.com/g, 'https://nepalicalc.com');
    fs.writeFileSync(f, content, 'utf8');
    count++;
  }
});

console.log(`Replaced https://nepalcalc.com in ${count} files.`);

