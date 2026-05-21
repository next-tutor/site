import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.resolve(__dirname, '../src/assets/images');
const MIN_BYTES = 40 * 1024;
const exts = new Set(['.png', '.jpg', '.jpeg']);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

async function optimizeRaster(file) {
  const ext = path.extname(file).toLowerCase();
  if (!exts.has(ext)) return;

  const stat = fs.statSync(file);
  if (stat.size < MIN_BYTES) return;

  const webpPath = file.replace(/\.(png|jpe?g)$/i, '.webp');
  const before = stat.size;

  await sharp(file)
    .webp({ quality: 82, effort: 4 })
    .toFile(webpPath);

  const optimized = await sharp(file)
    .resize({ width: null, height: null, withoutEnlargement: true })
    .toBuffer()
    .then(buf =>
      ext === '.png'
        ? sharp(buf).png({ quality: 80, compressionLevel: 9 })
        : sharp(buf).jpeg({ quality: 82, mozjpeg: true })
    );

  const out = await optimized.toBuffer();
  if (out.length < before) {
    fs.writeFileSync(file, out);
  }

  const webpSize = fs.statSync(webpPath).size;
  console.log(
    `${path.relative(imagesDir, file)}: ${(before / 1024).toFixed(0)}KB -> ${(fs.statSync(file).size / 1024).toFixed(0)}KB, webp ${(webpSize / 1024).toFixed(0)}KB`
  );
}

async function optimizeSvg(file) {
  if (!file.endsWith('.svg')) return;
  const stat = fs.statSync(file);
  if (stat.size < 50 * 1024) return;

  const input = fs.readFileSync(file, 'utf8');
  const trimmed = input.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
  if (trimmed.length < stat.size) {
    fs.writeFileSync(file, trimmed);
    console.log(`${path.relative(imagesDir, file)}: svg trimmed ${(stat.size / 1024).toFixed(0)}KB -> ${(trimmed.length / 1024).toFixed(0)}KB`);
  }
}

function optimizeVideo() {
  // Skip real_lines_loop.mp4 — hero background; re-encoding destroys visual quality
}

const files = walk(imagesDir);
for (const file of files) {
  await optimizeRaster(file);
  await optimizeSvg(file);
}
optimizeVideo();
console.log('Done.');
