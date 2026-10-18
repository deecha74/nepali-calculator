const fs = require('fs');
const path = require('path');

function getFiles(dir, match = 'page.tsx') {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, match));
    } else if (file === match) {
      results.push(fullPath);
    }
  }
  return results;
}

const appDir = path.join(__dirname, '..', 'app');
const pages = getFiles(appDir);

console.log(`Checking titles and descriptions for ${pages.length} pages...`);

const issues = [];

pages.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  const rel = path.relative(path.join(__dirname, '..'), p).replace(/\\/g, '/');
  
  const titleMatch = content.match(/title:\s*["'`](.*?)["'`]/);
  const descMatch = content.match(/description:\s*["'`](.*?)["'`]/);

  if (titleMatch && descMatch) {
    const title = titleMatch[1];
    const desc = descMatch[1];
    
    // Check if title is very short (<25) or excessively long (>75)
    // Check if desc is very short (<70) or excessively long (>200)
    issues.push({
      rel,
      title,
      titleLen: title.length,
      descLen: desc.length,
      desc
    });
  }
});

console.log('\n--- PAGES TITLE LENGTH ANALYSIS ---');
issues.forEach(i => {
  const titleFlag = i.titleLen > 70 ? ' [LONG TITLE]' : (i.titleLen < 30 ? ' [SHORT TITLE]' : '');
  const descFlag = i.descLen > 180 ? ' [LONG DESC]' : (i.descLen < 80 ? ' [SHORT DESC]' : '');
  if (titleFlag || descFlag) {
    console.log(`${i.rel}: Title (${i.titleLen})${titleFlag} | Desc (${i.descLen})${descFlag}`);
  }
});
