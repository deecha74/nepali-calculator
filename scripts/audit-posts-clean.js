const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'lib', 'blog', 'posts');
const files = fs.readdirSync(dir);

let postCount = 0;
const posts = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  // Match top-level post objects by finding { slug: '...'
  const postRegex = /slug:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = postRegex.exec(content)) !== null) {
    postCount++;
    posts.push({ file: f, slug: match[1], title: match[2] });
  }
});

console.log(`True blog posts count: ${postCount}`);
posts.forEach((p, i) => {
  console.log(`${i+1}. [${p.file}] ${p.title} (/blog/${p.slug})`);
});

