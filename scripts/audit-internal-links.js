const fs = require('fs');
const path = require('path');

function getFiles(dir, exts = ['.tsx', '.ts']) {
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

// Read routes directly from sitemap.ts
const sitemapContent = fs.readFileSync(path.join(__dirname, '..', 'app', 'sitemap.ts'), 'utf8');
const routesFound = [...sitemapContent.matchAll(/['"](\/[a-z0-9\-_]*)['"]/g)].map(m => m[1]);
const validRoutes = new Set(['', '/', ...routesFound]);

const files = getFiles(path.join(__dirname, '..', 'components')).concat(getFiles(path.join(__dirname, '..', 'app')));

const linkRegex = /href=["'](\/[^"']*)["']/g;
const deadLinks = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const link = match[1].split('?')[0].split('#')[0];
    // Ignore static assets or api
    if (link.startsWith('/api') || link.endsWith('.svg') || link.endsWith('.png') || link.endsWith('.jpg') || link.endsWith('.ico')) continue;
    
    // Check if route or programmatic pattern matches
    const baseDir = link.replace(/^\//, '');
    const existsDirect = fs.existsSync(path.join(__dirname, '..', 'app', baseDir, 'page.tsx'));
    const isProgrammatic = link.startsWith('/land/') || link.startsWith('/tax/') || link.startsWith('/vehicle/') || link.startsWith('/forex/') || link.startsWith('/sip/');
    
    if (link !== '/' && !existsDirect && !isProgrammatic) {
      deadLinks.push({ file: path.relative(path.join(__dirname, '..'), f), link });
    }
  }
});

console.log('Total dead internal links detected:', deadLinks.length);
if (deadLinks.length > 0) {
  console.log(deadLinks);
} else {
  console.log('Zero dead internal links! All links are valid.');
}
