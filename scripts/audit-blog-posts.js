const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'lib', 'blog', 'posts');
const files = fs.readdirSync(dir);

const allPosts = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const slugMatches = [...content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  const titleMatches = [...content.matchAll(/title:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  const catMatches = [...content.matchAll(/category:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  
  slugMatches.forEach((slug, idx) => {
    allPosts.push({
      file: f,
      slug,
      title: titleMatches[idx] || '',
      category: catMatches[idx] || ''
    });
  });
});

console.log(`Total analyzed: ${allPosts.length}`);
allPosts.forEach((p, i) => {
  console.log(`${i+1}. [${p.category || p.file.replace('.ts', '')}] ${p.title} (${p.slug})`);
});

