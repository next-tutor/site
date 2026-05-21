import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, '../dist');

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

const pages = ['index.html', 'platform/index.html', 'features/tasks/index.html'];
const assets = walk(path.join(dist, 'assets'));

console.log('Performance build report\n');
for (const page of pages) {
  const htmlPath = path.join(dist, page);
  if (!fs.existsSync(htmlPath)) continue;
  const html = fs.readFileSync(htmlPath, 'utf8');
  const refs = [...html.matchAll(/(?:href|src)="(\/assets\/[^"]+)"/g)].map(m => m[1]);
  let total = fs.statSync(htmlPath).size;
  for (const ref of refs) {
    const file = path.join(dist, ref.replace(/^\//, ''));
    if (fs.existsSync(file)) total += fs.statSync(file).size;
  }
  console.log(`${page}: ~${(total / 1024).toFixed(0)} KB referenced assets (excludes deferred demo iframe)`);
}

const demo = path.join(dist, 'demo');
if (fs.existsSync(demo)) {
  const demoFiles = walk(demo);
  const demoSize = demoFiles.reduce((s, f) => s + fs.statSync(f).size, 0);
  console.log(`\ndemo/ (loaded on iframe activation): ~${(demoSize / 1024).toFixed(0)} KB total`);
}

console.log('\nRun Lighthouse locally: npx lighthouse http://localhost:4173/ --only-categories=performance');
