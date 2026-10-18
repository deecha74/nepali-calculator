const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');

function scanRoutes(dir, baseRoute = '') {
  let routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name === 'api') continue;
      const subRoute = baseRoute + '/' + entry.name;
      routes = routes.concat(scanRoutes(path.join(dir, entry.name), subRoute));
    } else if (entry.name === 'page.tsx') {
      routes.push({
        route: baseRoute || '/',
        filePath: path.join(dir, entry.name)
      });
    }
  }
  return routes;
}

const allRoutes = scanRoutes(appDir);
console.log(`Auditing ${allRoutes.length} route entry points...`);

const results = [];

allRoutes.forEach(r => {
  const content = fs.readFileSync(r.filePath, 'utf8');
  let hasH1InPage = /<h1[\s>]/.test(content);
  
  // Find components imported
  const importMatches = [...content.matchAll(/import\s+\{?([A-Za-z0-9_,\s]+)\}?\s+from\s+['"]([^'"]+)['"]/g)];
  let importedComponentsH1 = [];
  
  importMatches.forEach(m => {
    let compPath = m[2];
    if (compPath.startsWith('@/')) {
      compPath = path.join(__dirname, '..', compPath.replace('@/', '')) + '.tsx';
      if (fs.existsSync(compPath)) {
        const compContent = fs.readFileSync(compPath, 'utf8');
        if (/<h1[\s>]/.test(compContent)) {
          importedComponentsH1.push(path.basename(compPath));
        } else if (/TitleHeading/.test(compContent)) {
          // Check if page passes titleTag="h2"
          const passedH2 = new RegExp(`<${path.basename(compPath, '.tsx')}[^>]*titleTag=["']h2["']`).test(content);
          if (!passedH2) {
            importedComponentsH1.push(path.basename(compPath));
          }
        }
      }
    }
  });

  const totalH1Count = (hasH1InPage ? 1 : 0) + importedComponentsH1.length;

  results.push({
    route: r.route,
    hasH1InPage,
    importedComponentsH1,
    totalH1Count,
  });
});

const missingH1 = results.filter(r => r.totalH1Count === 0);
const multipleH1 = results.filter(r => r.totalH1Count > 1);
const exactH1 = results.filter(r => r.totalH1Count === 1);

console.log(`\nRoutes with EXACTLY ONE <h1>: ${exactH1.length}`);
console.log(`Routes with ZERO <h1>: ${missingH1.length}`);
missingH1.forEach(m => console.log('  MISSING:', m.route));

console.log(`\nRoutes with MULTIPLE <h1>: ${multipleH1.length}`);
multipleH1.forEach(m => console.log('  MULTIPLE:', m.route, m.importedComponentsH1));
