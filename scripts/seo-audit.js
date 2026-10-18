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

console.log(`Found ${pages.length} pages.`);

const report = [];

pages.forEach((pagePath) => {
  const relPath = path.relative(path.join(__dirname, '..'), pagePath).replace(/\\/g, '/');
  const content = fs.readFileSync(pagePath, 'utf8');

  const hasUseClient = content.includes("'use client'") || content.includes('"use client"');
  const hasMetadataExport = content.includes('export const metadata') || content.includes('export async function generateMetadata');
  const hasH1 = /<h1[\s>]/.test(content);
  const hasJsonLd = content.includes('application/ld+json') || content.includes('generateWebApplicationSchema') || content.includes('generateFaqSchema');
  const hasCanonical = content.includes('canonical') || content.includes('constructMetadata');
  const hasOg = content.includes('openGraph') || content.includes('constructMetadata');

  // Check title & description if present
  let titleMatch = content.match(/title:\s*["'`](.*?)["'`]/);
  let descMatch = content.match(/description:\s*["'`](.*?)["'`]/);

  report.push({
    relPath,
    hasUseClient,
    hasMetadataExport,
    hasH1,
    hasJsonLd,
    hasCanonical,
    hasOg,
    title: titleMatch ? titleMatch[1] : null,
    descLen: descMatch ? descMatch[1].length : 0,
  });
});

console.log('--- PAGES MISSING METADATA ---');
const missingMeta = report.filter(r => !r.hasMetadataExport && r.relPath !== 'app/page.tsx');
console.log(missingMeta.map(m => m.relPath));

console.log('\n--- PAGES MISSING H1 ---');
const missingH1 = report.filter(r => !r.hasH1);
console.log(missingH1.map(m => m.relPath));

console.log('\n--- PAGES MISSING JSON-LD SCHEMA ---');
const missingSchema = report.filter(r => !r.hasJsonLd);
console.log(missingSchema.map(m => m.relPath));

console.log('\nAudit complete! Total checked:', report.length);
