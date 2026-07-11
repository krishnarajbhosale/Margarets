// Organize Service.svg extracted assets into src/assets/images (mirrors organize.mjs).
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const EX = path.resolve("src/assets/extracted-service");
const OUT = path.resolve("src/assets/images");
fs.mkdirSync(OUT, { recursive: true });

// Photographic assets: copy verbatim under semantic names.
const copies = [
  ["img-13.png", "svc-hero-portrait.png"],
  ["img-05.jpeg", "svc-nail.jpeg"],
  ["img-09.png", "svc-microblading.png"],
  ["img-10.png", "svc-microshading.png"],
  ["img-11.png", "svc-henna.png"],
  ["img-08.jpeg", "svc-eyelashes.jpeg"],
  ["img-07.png", "svc-hairstyles.png"],
  ["img-00.jpeg", "svc-foot-spa.jpeg"],
  ["img-02.png", "svc-threading.png"],
  ["img-01.jpeg", "svc-waxing.jpeg"],
  ["img-06.jpeg", "svc-makeup.jpeg"],
];
for (const [src, dst] of copies) {
  fs.copyFileSync(path.join(EX, src), path.join(OUT, dst));
  console.log("copied", dst);
}

// Gold leaf ornaments cropped from the transparent decoration sheet (img-03).
const sheet = path.join(EX, "img-03.png");
const crops = [
  ["svc-flourish-left.png",  { left: 0,   top: 28,   width: 205, height: 195 }],
  ["svc-flourish-right.png", { left: 858, top: 28,   width: 166, height: 195 }],
  ["svc-daisy-stem.png",     { left: 0,   top: 600,  width: 300, height: 360 }],
  ["svc-leaf-corner.png",    { left: 828, top: 1215, width: 196, height: 235 }],
];
for (const [dst, r] of crops) {
  await sharp(sheet).extract(r).png().toFile(path.join(OUT, dst));
  console.log("cropped", dst);
}

// Gold sparkle frame line (used as the Nail-Art panel top/bottom border),
// rendered straight from the SVG at native 1440 width.
const svgBuf = fs.readFileSync(path.resolve("src/assets/Service.svg"));
const full = await sharp(svgBuf, { density: 96, limitInputPixels: false })
  .resize({ width: 1440 })
  .png()
  .toBuffer();
await sharp(full)
  .extract({ left: 60, top: 744, width: 1320, height: 26 })
  .png()
  .toFile(path.join(OUT, "svc-frame-line.png"));
console.log("cropped svc-frame-line.png");

// Hand-painted gold leaf branch that sits under the Henna copy. Rendered at the
// SVG's native 1920px raster (density 96, no resize) for a crisp, retina crop.
const nativeRaster = await sharp(svgBuf, { density: 96, limitInputPixels: false })
  .png()
  .toBuffer();
await sharp(nativeRaster)
  .extract({ left: 4, top: 4250, width: 640, height: 426 })
  .png()
  .toFile(path.join(OUT, "svc-henna-leaf.png"));
console.log("cropped svc-henna-leaf.png");

// Ornate corner leaf branch + center daisy monogram for the spa-cards header,
// cropped from the same native raster.
await sharp(nativeRaster)
  .extract({ left: 0, top: 7338, width: 340, height: 352 })
  .png()
  .toFile(path.join(OUT, "svc-spa-branch.png"));
console.log("cropped svc-spa-branch.png");
await sharp(nativeRaster)
  .extract({ left: 860, top: 7452, width: 236, height: 156 })
  .png()
  .toFile(path.join(OUT, "svc-spa-daisy.png"));
console.log("cropped svc-spa-daisy.png");
