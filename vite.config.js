import { defineConfig } from 'vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import viteCompression from 'vite-plugin-compression';
import { pages, formatPageTitle } from './src/shared/pages.js';

const root = dirname(fileURLToPath(import.meta.url));

const urlMap = Object.fromEntries(
  Object.values(pages).map(({ url, path }) => [url, `/${path}`])
);

const previewUrlMap = {
  '/': '/index.html',
  '/platform': '/platform/index.html',
  '/pricing': '/pricing/index.html',
  '/about': '/about/index.html',
  '/contact': '/contact/index.html',
  '/features/website': '/features/website/index.html',
  '/features/reports': '/features/reports/index.html',
  '/features/students': '/features/students/index.html',
  '/features/tasks': '/features/tasks/index.html',
  '/features/automation': '/features/automation/index.html',
  '/privacy': '/privacy/index.html',
  '/terms': '/terms/index.html',
  '/credits': '/credits/index.html',
};

const titleByPath = new Map(
  Object.values(pages).map(({ path, title }) => [resolve(root, path), formatPageTitle(title)])
);

function htmlRouterMiddleware(map) {
  return (req, _res, next) => {
    const url = req.url?.split('?')[0].replace(/\/$/, '') || '/';
    const mapped = map[url];
    if (mapped) req.url = mapped;
    next();
  };
}

function moveDistFiles() {
  const distRoot = resolve(root, 'dist');
  const distSrc = resolve(distRoot, 'src/pages');
  if (!fs.existsSync(distSrc)) return;

  const moves = [
    ['home/index.html', 'index.html'],
    ['platform/index.html', 'platform/index.html'],
    ['pricing/index.html', 'pricing/index.html'],
    ['about/index.html', 'about/index.html'],
    ['contact/index.html', 'contact/index.html'],
    ['features/website/index.html', 'features/website/index.html'],
    ['features/reports/index.html', 'features/reports/index.html'],
    ['features/students/index.html', 'features/students/index.html'],
    ['features/tasks/index.html', 'features/tasks/index.html'],
    ['features/automation/index.html', 'features/automation/index.html'],
    ['legal/privacy/index.html', 'privacy/index.html'],
    ['legal/terms/index.html', 'terms/index.html'],
    ['legal/credits/index.html', 'credits/index.html'],
  ];

  for (const [from, to] of moves) {
    const src = resolve(distSrc, from);
    const dest = resolve(distRoot, to);
    if (!fs.existsSync(src)) continue;
    fs.mkdirSync(resolve(dest, '..'), { recursive: true });
    fs.renameSync(src, dest);
  }

  fs.rmSync(resolve(distRoot, 'src'), { recursive: true, force: true });
}

function copyDemoToDist() {
  const demoSrc = resolve(root, 'demo');
  const demoDest = resolve(root, 'dist/demo');
  if (!fs.existsSync(demoSrc)) return;
  fs.cpSync(demoSrc, demoDest, { recursive: true });
}

const CRITICAL_BG =
  '<style id="critical-bg">html,body{background-color:#020202;color-scheme:dark}</style>';

function criticalBgPlugin() {
  return {
    name: 'critical-bg',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        if (html.includes('id="critical-bg"')) return html;
        if (html.includes('/demo/demo.html') || html.includes('demo/demo')) return html;
        return html.replace(
          /<meta charset="UTF-8" \/>/i,
          `<meta charset="UTF-8" />\n  ${CRITICAL_BG}`
        );
      },
    },
  };
}

function cssBeforeJsPlugin() {
  return {
    name: 'css-before-js',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html.replace(/(<head>)([\s\S]*?)(<\/head>)/, (match, open, head, close) => {
          const critical = head.match(/<style id="critical-bg">[\s\S]*?<\/style>/) || [];
          const styles = head.match(/<link rel="stylesheet"[^>]*>/g) || [];
          const scripts = head.match(/<script type="module"[^>]*><\/script>/g) || [];
          const rest = head
            .replace(/<style id="critical-bg">[\s\S]*?<\/style>\s*/g, '')
            .replace(/<link rel="stylesheet"[^>]*>\s*/g, '')
            .replace(/<script type="module"[^>]*><\/script>\s*/g, '');
          const block = [...critical, ...styles, ...scripts].join('\n  ');
          return block ? `${open}${rest}  ${block}\n${close}` : `${open}${rest}${close}`;
        });
      },
    },
  };
}

function pageTitlePlugin() {
  return {
    name: 'page-titles',
    transformIndexHtml(html, ctx) {
      const title = titleByPath.get(ctx.filename);
      if (!title) return html;
      return html.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
    },
  };
}

export default defineConfig({
  plugins: [
    criticalBgPlugin(),
    cssBeforeJsPlugin(),
    pageTitlePlugin(),
    {
      name: 'html-router',
      configureServer(server) {
        server.middlewares.use(htmlRouterMiddleware(urlMap));
      },
      configurePreviewServer(server) {
        server.middlewares.use(htmlRouterMiddleware(previewUrlMap));
      },
      closeBundle() {
        moveDistFiles();
        copyDemoToDist();
      },
    },
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
  server: {
    allowedHosts: ['small-colts-stand.loca.lt'],
  },
  build: {
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: Object.fromEntries(
        Object.entries(pages).map(([key, { path }]) => [key, resolve(root, path)])
      ),
    },
  },
});
