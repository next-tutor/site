import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    {
      name: 'html-router',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url.split('?')[0];
          if (url === '/' || url === '/index.html' || url === '/index') {
            req.url = '/src/index/index.html';
          } else if (url === '/about' || url === '/about/') {
            req.url = '/src/about/index.html';
          } else if (url === '/platform' || url === '/platform/' || url === '/features' || url === '/features/') {
            req.url = '/src/features/index.html';
          } else if (url === '/pricing' || url === '/pricing/') {
            req.url = '/src/pricing/index.html';
          }
          next();
        });
      },
      closeBundle() {
        // Move files from dist/src/* to dist/* for production pretty URLs
        const srcDir = resolve(__dirname, 'dist/src');
        if (fs.existsSync(srcDir)) {
          const pages = ['index', 'about', 'features', 'pricing'];
          pages.forEach(page => {
            const pageDir = resolve(srcDir, page);
            if (fs.existsSync(pageDir)) {
              if (page === 'index') {
                // Move index.html directly to dist/index.html
                fs.renameSync(resolve(pageDir, 'index.html'), resolve(__dirname, 'dist/index.html'));
              } else {
                // Move page folder to dist/page/index.html
                const destDir = resolve(__dirname, `dist/${page}`);
                if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);
                fs.renameSync(resolve(pageDir, 'index.html'), resolve(destDir, 'index.html'));
              }
            }
          });
          // Clean up dist/src directory
          fs.rmSync(srcDir, { recursive: true, force: true });
        }
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index/index.html'),
        about: resolve(__dirname, 'src/about/index.html'),
        features: resolve(__dirname, 'src/features/index.html'),
        pricing: resolve(__dirname, 'src/pricing/index.html'),
      },
    },
  },
});
