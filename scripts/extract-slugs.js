import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiDir = path.join(__dirname, '..', 'src', 'lib', 'api');
const files = fs.readdirSync(apiDir).filter(f => f.startsWith('analytics-') && f.endsWith('.ts'));

const slugs = new Set();

files.forEach(file => {
  const content = fs.readFileSync(path.join(apiDir, file), 'utf8');
  const matches = content.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
  for (const match of matches) {
    slugs.add(match[1]);
  }
});

const sortedSlugs = Array.from(slugs).sort();
console.log(`Found ${sortedSlugs.length} unique slugs`);

// Save to JSON file
fs.writeFileSync(
  path.join(__dirname, '..', 'analytics-slugs.json'),
  JSON.stringify(sortedSlugs, null, 2),
  'utf8'
);

console.log('Slugs saved to analytics-slugs.json');

