import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const sharedCss = `  <link rel="stylesheet" href="/src/styles/base.css" />
  <link rel="stylesheet" href="/src/styles/navbar.css" />
  <link rel="stylesheet" href="/src/styles/footer.css" />
  <link rel="stylesheet" href="/src/styles/get-start.css" />
`;

const pages = [
  { html: 'src/pages/home/index.html', extraCss: ['/src/pages/home/home.css'], scripts: ['/src/js/main.js'] },
  { html: 'src/pages/about/index.html', extraCss: ['/src/pages/about/about.css'], scripts: ['/src/js/main.js'] },
  { html: 'src/pages/contact/index.html', extraCss: ['/src/pages/contact/contact.css'], scripts: ['/src/js/main.js'] },
  { html: 'src/pages/platform/index.html', extraCss: ['/src/pages/platform/platform.css'], scripts: ['/src/js/main.js', '/src/js/platform.js'] },
  { html: 'src/pages/pricing/index.html', extraCss: ['/src/pages/pricing/pricing.css'], scripts: ['/src/js/main.js', '/src/js/pricing.js'] },
  { html: 'src/pages/features/automation/index.html', extraCss: ['/src/styles/features.css'], scripts: ['/src/js/main.js', '/src/js/features.js'] },
  { html: 'src/pages/features/reports/index.html', extraCss: ['/src/styles/features.css'], scripts: ['/src/js/main.js', '/src/js/features.js'] },
  { html: 'src/pages/features/students/index.html', extraCss: ['/src/styles/features.css'], scripts: ['/src/js/main.js', '/src/js/features.js'] },
  { html: 'src/pages/features/tasks/index.html', extraCss: ['/src/styles/features.css'], scripts: ['/src/js/main.js', '/src/js/features.js'] },
  { html: 'src/pages/features/website/index.html', extraCss: ['/src/styles/features.css'], scripts: ['/src/js/main.js', '/src/js/features.js'] },
  { html: 'src/pages/legal/privacy/index.html', extraCss: ['/src/pages/legal/privacy/privacy.css'], scripts: ['/src/js/main.js'] },
  { html: 'src/pages/legal/terms/index.html', extraCss: ['/src/pages/legal/terms/terms.css'], scripts: ['/src/js/main.js'] },
  { html: 'src/pages/legal/credits/index.html', extraCss: ['/src/pages/legal/credits/credits.css'], scripts: ['/src/js/main.js'] },
];

const fontLine =
  '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />';

for (const { html, extraCss, scripts } of pages) {
  const filePath = path.join(root, html);
  let content = fs.readFileSync(filePath, 'utf8');

  const extraBlock = extraCss
    .map(href => `  <link rel="stylesheet" href="${href}" />`)
    .join('\n');

  if (!content.includes('/src/styles/base.css')) {
    content = content.replace(
      fontLine,
      `${fontLine}\n${sharedCss}${extraBlock}`
    );
  }

  content = content.replace(/<script type="module" src="\/src\/entries\/[^"]+"><\/script>\n?/g, '');

  const scriptBlock = scripts
    .map(src => `<script type="module" src="${src}"></script>`)
    .join('\n');

  if (!content.includes(scripts[0])) {
    content = content.replace('</body>', `${scriptBlock}\n</body>`);
  }

  fs.writeFileSync(filePath, content);
  console.log('Updated', html);
}
