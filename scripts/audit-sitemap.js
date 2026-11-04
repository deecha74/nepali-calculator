const fs = require('fs');
const path = require('path');

function scanPages(dir, base = '') {
  let list = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name === 'api') continue;
      list = list.concat(scanPages(path.join(dir, entry.name), base + '/' + entry.name));
    } else if (entry.name === 'page.tsx') {
      list.push(base || '/');
    }
  }
  return list;
}

const allPages = scanPages(path.join(__dirname, '..', 'app'));
const sitemapContent = fs.readFileSync(path.join(__dirname, '..', 'app', 'sitemap.ts'), 'utf8');

const missing = allPages.filter(p => {
  if (p.includes('[slug]')) return false;
  const target = p === '/' ? "''" : `'${p}'`;
  return !sitemapContent.includes(target);
});

console.log('Total non-dynamic routes in app:', allPages.filter(p => !p.includes('[slug]')).length);
console.log('Missing routes from sitemap.ts:', missing);

