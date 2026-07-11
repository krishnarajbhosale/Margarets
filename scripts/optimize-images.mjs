// Generate .webp siblings for every PNG/JPEG in src/assets/images.
// Originals are left untouched; components import the .webp versions.
// - quality ~80, method 6 (best compression)
// - downscale so nothing exceeds 1920px wide (no enlargement)
// - alpha is preserved (WebP supports transparency natively)
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const DIR = path.resolve("src/assets/images");
const exts = new Set([".png", ".jpeg", ".jpg"]);

const files = fs.readdirSync(DIR).filter((f) => exts.has(path.extname(f).toLowerCase()));

let inTotal = 0;
let outTotal = 0;
for (const file of files) {
  const src = path.join(DIR, file);
  const dst = path.join(DIR, file.replace(/\.(png|jpe?g)$/i, ".webp"));
  const buf = await sharp(src)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toBuffer();
  fs.writeFileSync(dst, buf);
  const inKB = fs.statSync(src).size / 1024;
  const outKB = buf.length / 1024;
  inTotal += inKB;
  outTotal += outKB;
  console.log(
    `${file.padEnd(28)} ${inKB.toFixed(0).padStart(6)}KB -> ${outKB.toFixed(0).padStart(5)}KB`
  );
}
console.log("-".repeat(50));
console.log(
  `total ${files.length} images: ${(inTotal / 1024).toFixed(1)}MB -> ${(outTotal / 1024).toFixed(1)}MB`
);
