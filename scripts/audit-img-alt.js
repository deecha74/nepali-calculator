const fs = require('fs');
const path = require('path');

function getFiles(dir, exts = ['.tsx', '.jsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === '.next') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, exts));
    } else if (exts.some(ext => file.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = getFiles(path.join(__dirname, '..', 'components')).concat(getFiles(path.join(__dirname, '..', 'app')));

const imgRegex = /<img\b([^>]*)>/gi;
const missingAlt = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    const attrs = match[1];
    if (!attrs.includes('alt=') || /alt=["']\s*["']/.test(attrs)) {
      missingAlt.push({ file: path.relative(path.join(__dirname, '..'), f), tag: match[0] });
    }
  }
});

console.log('Total <img> tags missing alt or with empty alt:', missingAlt.length);
if (missingAlt.length > 0) {
  console.log(missingAlt);
}
