import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const SRC = path.resolve("src/assets/extracted/img-00.png");
const OUT = path.resolve("src/assets/extracted/crops");
fs.mkdirSync(OUT, { recursive: true });

// img-00 is 1024 x 1536
const meta = await sharp(SRC).metadata();
console.log("img-00", meta.width, "x", meta.height);

const regions = {
  nav: { left: 0, top: 0, width: 1024, height: 95 },
  heroLeft: { left: 0, top: 130, width: 360, height: 420 },
  heroButtons: { left: 30, top: 450, width: 420, height: 90 },
  indulgenceText: { left: 350, top: 590, width: 360, height: 360 },
  features: { left: 0, top: 1380, width: 1024, height: 156 },
};

for (const [name, r] of Object.entries(regions)) {
  await sharp(SRC)
    .extract(r)
    .resize({ width: r.width * 2 })
    .png()
    .toFile(path.join(OUT, `${name}.png`));
  console.log("wrote", name);
}

// Clean hero interior crop for actual use in the site (avoids baked-in text on the left)
await sharp(SRC)
  .extract({ left: 360, top: 0, width: 664, height: 560 })
  .png()
  .toFile(path.join(OUT, "hero-interior.png"));
console.log("wrote hero-interior");
