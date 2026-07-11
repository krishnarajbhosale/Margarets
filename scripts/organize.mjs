import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const EX = path.resolve("src/assets/extracted");
const OUT = path.resolve("src/assets/images");
fs.mkdirSync(OUT, { recursive: true });

const copies = [
  ["img-01.png", "logo.png"],
  ["img-02.png", "indulgence.png"],
  ["img-03.png", "daisy.png"],
  ["img-04.png", "services-bg.png"],
  ["img-05.png", "kids-nail.png"],
  ["img-07.jpeg", "facial.jpeg"],
  ["img-10.jpeg", "manicure.jpeg"],
  ["img-06.png", "icon-kids.png"],
  ["img-08.png", "icon-facial.png"],
];

for (const [src, dst] of copies) {
  fs.copyFileSync(path.join(EX, src), path.join(OUT, dst));
  console.log("copied", dst);
}

// Clean hero interior crop (avoids baked nav + title text), upscaled for quality
await sharp(path.join(EX, "img-00.png"))
  .extract({ left: 476, top: 102, width: 548, height: 440 })
  .resize({ width: 1096 })
  .png()
  .toFile(path.join(OUT, "hero-interior.png"));
console.log("cropped hero-interior.png");

// Daisy mark alone (top of the stacked logo, incl. side flourishes)
await sharp(path.join(EX, "img-01.png"))
  .extract({ left: 60, top: 85, width: 710, height: 410 })
  .png()
  .toFile(path.join(OUT, "daisy-mark.png"));
console.log("cropped daisy-mark.png");
