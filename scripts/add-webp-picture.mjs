import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const targets = [
  'src/pages/home/index.html',
  'src/pages/platform/index.html',
];

const imgPattern =
  /<img([^>]*?)src="(\/src\/assets\/images\/[^"]+\.png)"([^>]*?)>/g;

function addWebpPicture(content) {
  return content.replace(imgPattern, (match, before, src, after) => {
    if (match.includes('<picture')) return match;
    const webp = src.replace(/\.png$/i, '.webp');
    const webpPath = path.join(root, webp.replace('/src/', 'src/'));
    if (!fs.existsSync(webpPath)) return match;
    return `<picture><source srcset="${webp}" type="image/webp" /><img${before}src="${src}"${after}></picture>`;
  });
}

for (const rel of targets) {
  const filePath = path.join(root, rel);
  let content = fs.readFileSync(filePath, 'utf8');
  const updated = addWebpPicture(content);
  if (updated !== content) {
    fs.writeFileSync(filePath, updated);
    console.log('Updated', rel);
  }
}
