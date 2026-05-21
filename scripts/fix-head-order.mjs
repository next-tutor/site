import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const fontRe =
  /  <link href="https:\/\/fonts\.googleapis\.com[^"]+" rel="stylesheet" \/>\n/g;

for (const rel of [
  'src/pages/about/index.html',
  'src/pages/contact/index.html',
  'src/pages/platform/index.html',
  'src/pages/pricing/index.html',
  'src/pages/features/automation/index.html',
  'src/pages/features/reports/index.html',
  'src/pages/features/students/index.html',
  'src/pages/features/tasks/index.html',
  'src/pages/features/website/index.html',
  'src/pages/legal/privacy/index.html',
  'src/pages/legal/terms/index.html',
  'src/pages/legal/credits/index.html',
]) {
  const filePath = path.join(root, rel);
  let html = fs.readFileSync(filePath, 'utf8');
  const font = html.match(fontRe)?.[0];
  if (!font) continue;
  html = html.replace(fontRe, '');
  html = html.replace(/(<link rel="stylesheet" href="[^"]+" \/>\n)(?=<\/head>)/, `$1${font}`);
  fs.writeFileSync(filePath, html);
  console.log('Fixed', rel);
}
