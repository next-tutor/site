import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const sharedCss = [
  '/src/styles/base.css',
  '/src/styles/navbar.css',
  '/src/styles/footer.css',
  '/src/styles/get-start.css',
];

const pages = [
  { html: 'src/pages/home/index.html', pageCss: '/src/pages/home/home.css' },
  { html: 'src/pages/about/index.html', pageCss: '/src/pages/about/about.css' },
  { html: 'src/pages/contact/index.html', pageCss: '/src/pages/contact/contact.css' },
  { html: 'src/pages/platform/index.html', pageCss: '/src/pages/platform/platform.css' },
  { html: 'src/pages/pricing/index.html', pageCss: '/src/pages/pricing/pricing.css' },
  { html: 'src/pages/features/automation/index.html', pageCss: '/src/styles/features.css' },
  { html: 'src/pages/features/reports/index.html', pageCss: '/src/styles/features.css' },
  { html: 'src/pages/features/students/index.html', pageCss: '/src/styles/features.css' },
  { html: 'src/pages/features/tasks/index.html', pageCss: '/src/styles/features.css' },
  { html: 'src/pages/features/website/index.html', pageCss: '/src/styles/features.css' },
  { html: 'src/pages/legal/privacy/index.html', pageCss: '/src/pages/legal/privacy/privacy.css' },
  { html: 'src/pages/legal/terms/index.html', pageCss: '/src/pages/legal/terms/terms.css' },
  { html: 'src/pages/legal/credits/index.html', pageCss: '/src/pages/legal/credits/credits.css' },
];

for (const { html, pageCss } of pages) {
  const filePath = path.join(root, html);
  let content = fs.readFileSync(filePath, 'utf8');

  for (const href of sharedCss) {
    const line = `  <link rel="stylesheet" href="${href}" />\n`;
    content = content.replace(line, '');
  }

  const fontLine = content.match(/  <link href="https:\/\/fonts\.googleapis\.com[^"]+" rel="stylesheet" \/>\n/)?.[0] || '';
  if (fontLine) content = content.replace(fontLine, '');

  if (!content.includes('/src/styles/global.css')) {
    const pageLink = `  <link rel="stylesheet" href="${pageCss}" />\n`;
    const block = `  <link rel="stylesheet" href="/src/styles/global.css" />\n${pageLink}${fontLine}`;
    content = content.replace(
      /  <link rel="preload" as="image"[^>]+\/>\n/,
      (m) => `${m}${block}`
    );
  }

  fs.writeFileSync(filePath, content);
  console.log('Updated', html);
}
