const fs = require('fs');
const path = require('path');

const slugPages = [
  'app/land/[slug]/page.tsx',
  'app/tax/[slug]/page.tsx',
  'app/vehicle/[slug]/page.tsx',
  'app/forex/[slug]/page.tsx',
  'app/sip/[slug]/page.tsx',
  'app/gold/[slug]/page.tsx',
  'app/traditional-units/[slug]/page.tsx',
  'app/blog/[slug]/page.tsx'
];

slugPages.forEach(p => {
  const full = path.join(__dirname, '..', p);
  if (!fs.existsSync(full)) {
    console.log(`FILE NOT FOUND: ${p}`);
    return;
  }
  const content = fs.readFileSync(full, 'utf8');
  const hasStaticParams = content.includes('generateStaticParams');
  const hasMetadata = content.includes('generateMetadata');
  const hasDynamicParams = content.includes('dynamicParams');
  console.log(`${p}: generateStaticParams: ${hasStaticParams}, generateMetadata: ${hasMetadata}, dynamicParams: ${hasDynamicParams}`);
});

