import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const FONT =
  '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />';
const OLD_FONT =
  /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Poppins[^"]*" rel="stylesheet" \/>/;

const CSS_LINKS =
  /[ \t]*<link rel="stylesheet" href="\/src\/styles\/[^"]+" \/>\n/g;

const pages = [
  { html: 'src/pages/home/index.html', entry: '/src/entries/home.js' },
  { html: 'src/pages/about/index.html', entry: '/src/entries/about.js' },
  { html: 'src/pages/contact/index.html', entry: '/src/entries/contact.js' },
  { html: 'src/pages/pricing/index.html', entry: '/src/entries/pricing.js' },
  { html: 'src/pages/platform/index.html', entry: '/src/entries/platform.js' },
  { html: 'src/pages/features/automation/index.html', entry: '/src/entries/features.js' },
  { html: 'src/pages/features/students/index.html', entry: '/src/entries/features.js' },
  { html: 'src/pages/features/tasks/index.html', entry: '/src/entries/features.js' },
  { html: 'src/pages/features/website/index.html', entry: '/src/entries/features.js' },
  { html: 'src/pages/features/reports/index.html', entry: '/src/entries/features.js' },
  { html: 'src/pages/legal/privacy/index.html', entry: '/src/entries/privacy.js' },
  { html: 'src/pages/legal/terms/index.html', entry: '/src/entries/terms.js' },
  { html: 'src/pages/legal/credits/index.html', entry: '/src/entries/credits.js' },
];

const PRELOAD_LOGO =
  '  <link rel="preload" as="image" href="/src/assets/images/logo/logo-large.png" />\n';

for (const { html, entry } of pages) {
  const filePath = path.join(root, html);
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(OLD_FONT, FONT);
  content = content.replace(CSS_LINKS, '');
  content = content.replace(
    /  <link rel="stylesheet" href="\/src\/pages\/[^"]+" \/>\n/g,
    ''
  );

  if (!content.includes('rel="preload" as="image"')) {
    content = content.replace(
      /(<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\n)/,
      `$1${PRELOAD_LOGO}`
    );
  }

  content = content.replace(
    /<img src="\/src\/assets\/images\/logo\/logo-large\.png"([^>]*)>/g,
    '<img src="/src/assets/images/logo/logo-large.png" fetchpriority="high"$1>'
  );

  content = content.replace(
    /<script type="module" src="\/src\/js\/[^"]+"><\/script>\n?/g,
    ''
  );

  if (!content.includes(entry)) {
    content = content.replace(
      '</body>',
      `<script type="module" src="${entry}"></script>\n</body>`
    );
  }

  fs.writeFileSync(filePath, content);
  console.log('Updated', html);
}
