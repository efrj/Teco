import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const vendorDir = path.join(rootDir, 'www', 'assets', 'vendor');

// 1. Prepare directories
const bootstrapCssDir = path.join(vendorDir, 'bootstrap', 'css');
const bootstrapJsDir = path.join(vendorDir, 'bootstrap', 'js');
const bsIconsDir = path.join(vendorDir, 'bootstrap-icons');
const bsIconsFontsDir = path.join(bsIconsDir, 'fonts');

[bootstrapCssDir, bootstrapJsDir, bsIconsFontsDir].forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

// 2. Copy Bootstrap CSS & JS
const bootstrapSrc = path.join(rootDir, 'node_modules', 'bootstrap', 'dist');
fs.copyFileSync(
  path.join(bootstrapSrc, 'css', 'bootstrap.min.css'),
  path.join(bootstrapCssDir, 'bootstrap.min.css')
);
if (fs.existsSync(path.join(bootstrapSrc, 'css', 'bootstrap.min.css.map'))) {
  fs.copyFileSync(
    path.join(bootstrapSrc, 'css', 'bootstrap.min.css.map'),
    path.join(bootstrapCssDir, 'bootstrap.min.css.map')
  );
}

fs.copyFileSync(
  path.join(bootstrapSrc, 'js', 'bootstrap.bundle.min.js'),
  path.join(bootstrapJsDir, 'bootstrap.bundle.min.js')
);
if (fs.existsSync(path.join(bootstrapSrc, 'js', 'bootstrap.bundle.min.js.map'))) {
  fs.copyFileSync(
    path.join(bootstrapSrc, 'js', 'bootstrap.bundle.min.js.map'),
    path.join(bootstrapJsDir, 'bootstrap.bundle.min.js.map')
  );
}

// 3. Copy Bootstrap Icons CSS & Fonts
const bsIconsSrc = path.join(rootDir, 'node_modules', 'bootstrap-icons', 'font');
fs.copyFileSync(
  path.join(bsIconsSrc, 'bootstrap-icons.min.css'),
  path.join(bsIconsDir, 'bootstrap-icons.min.css')
);

const fontsSrc = path.join(bsIconsSrc, 'fonts');
if (fs.existsSync(fontsSrc)) {
  const fontFiles = fs.readdirSync(fontsSrc);
  for (const file of fontFiles) {
    fs.copyFileSync(
      path.join(fontsSrc, file),
      path.join(bsIconsFontsDir, file)
    );
  }
}

console.log('✅ Frontend assets successfully copied to www/assets/vendor/');
