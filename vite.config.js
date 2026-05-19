import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

const pages = {
  home: 'src/pages/home/index.html',
  platform: 'src/pages/platform/index.html',
  pricing: 'src/pages/pricing/index.html',
  about: 'src/pages/about/index.html',
  contact: 'src/pages/contact/index.html',
  'features-website': 'src/pages/features/website/index.html',
  'features-reports': 'src/pages/features/reports/index.html',
  'features-students': 'src/pages/features/students/index.html',
  'features-tasks': 'src/pages/features/tasks/index.html',
  'features-automation': 'src/pages/features/automation/index.html',
  privacy: 'src/pages/legal/privacy/index.html',
  terms: 'src/pages/legal/terms/index.html',
  credits: 'src/pages/legal/credits/index.html',
};

const urlMap = {
  '/': '/src/pages/home/index.html',
  '/platform': '/src/pages/platform/index.html',
  '/pricing': '/src/pages/pricing/index.html',
  '/about': '/src/pages/about/index.html',
  '/contact': '/src/pages/contact/index.html',
  '/features/website': '/src/pages/features/website/index.html',
  '/features/reports': '/src/pages/features/reports/index.html',
  '/features/students': '/src/pages/features/students/index.html',
  '/features/tasks': '/src/pages/features/tasks/index.html',
  '/features/automation': '/src/pages/features/automation/index.html',
  '/privacy': '/src/pages/legal/privacy/index.html',
  '/terms': '/src/pages/legal/terms/index.html',
  '/credits': '/src/pages/legal/credits/index.html',
};

function moveDistFiles() {
  const distSrc = resolve(__dirname, 'dist/src/pages');
  if (!fs.existsSync(distSrc)) return;

  const moves = [
    ['home/index.html', '../index.html'],
    ['platform/index.html', '../platform/index.html'],
    ['pricing/index.html', '../pricing/index.html'],
    ['about/index.html', '../about/index.html'],
    ['contact/index.html', '../contact/index.html'],
    ['features/website/index.html', '../features/website/index.html'],
    ['features/reports/index.html', '../features/reports/index.html'],
    ['features/students/index.html', '../features/students/index.html'],
    ['features/tasks/index.html', '../features/tasks/index.html'],
    ['features/automation/index.html', '../features/automation/index.html'],
    ['legal/privacy/index.html', '../privacy/index.html'],
    ['legal/terms/index.html', '../terms/index.html'],
    ['legal/credits/index.html', '../credits/index.html'],
  ];

  for (const [from, to] of moves) {
    const src = resolve(distSrc, from);
    const dest = resolve(distSrc, to);
    if (!fs.existsSync(src)) continue;
    fs.mkdirSync(resolve(dest, '..'), { recursive: true });
    fs.renameSync(src, dest);
  }

  fs.rmSync(resolve(__dirname, 'dist/src'), { recursive: true, force: true });
}

export default defineConfig({
  plugins: [
    {
      name: 'html-router',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url.split('?')[0].replace(/\/$/, '') || '/';
          const mapped = urlMap[url];
          if (mapped) req.url = mapped;
          next();
        });
      },
      closeBundle() {
        moveDistFiles();
      },
    },
  ],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        Object.entries(pages).map(([key, path]) => [key, resolve(__dirname, path)])
      ),
    },
  },
});
