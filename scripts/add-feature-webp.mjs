import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const featurePages = [
  'src/pages/features/automation/index.html',
  'src/pages/features/reports/index.html',
  'src/pages/features/students/index.html',
  'src/pages/features/tasks/index.html',
  'src/pages/features/website/index.html',
];

function webpFor(src) {
  const webp = src.replace(/\.(png|jpe?g)$/i, '.webp');
  return fs.existsSync(path.join(root, webp.replace('/src/', 'src/'))) ? webp : null;
}

for (const rel of featurePages) {
  const filePath = path.join(root, rel);
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    /<source srcset="([^"]+\.png)"([^>]*)\/>/g,
    (match, src, rest) => {
      const webp = webpFor(src);
      if (!webp) return match;
      return `<source srcset="${webp}" type="image/webp"${rest}/>\n        <source srcset="${src}"${rest}/>`;
    }
  );

  content = content.replace(
    /(<picture[^>]*>[\s\S]*?)<img src="([^"]+\.png)"([^>]*>)/g,
    (match, prefix, src, imgRest) => {
      if (prefix.includes('type="image/webp"')) return match;
      const webp = webpFor(src);
      if (!webp) return match;
      return `${prefix}<source srcset="${webp}" type="image/webp" />\n        <img src="${src}"${imgRest}`;
    }
  );

  fs.writeFileSync(filePath, content);
  console.log('Updated', rel);
}
