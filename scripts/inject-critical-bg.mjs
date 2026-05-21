import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const CRITICAL =
  '  <style id="critical-bg">html,body{background-color:#020202;color-scheme:dark}</style>\n';

const files = [
  'src/pages/home/index.html',
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
  'demo/demo.html',
];

for (const rel of files) {
  const filePath = path.join(root, rel);
  let html = fs.readFileSync(filePath, 'utf8');
  if (html.includes('id="critical-bg"')) continue;
  html = html.replace(
    /<meta charset="UTF-8" \/>/,
    `<meta charset="UTF-8" />\n${CRITICAL}`
  );
  fs.writeFileSync(filePath, html);
  console.log('Updated', rel);
}
