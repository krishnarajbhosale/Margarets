// Organize Bar_Menu.svg assets into src/assets/images (mirrors organize-service.mjs).
// The drink icons, bulb, title and daisy divider are cropped from the SVG's
// native 1920px raster so the circular drink icons come pre-composited on the
// dark background exactly as designed.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("src/assets/images");
fs.mkdirSync(OUT, { recursive: true });

const svgBuf = fs.readFileSync(path.resolve("src/assets/Bar_Menu.svg"));
const raster = await sharp(svgBuf, { density: 96, limitInputPixels: false })
  .png()
  .toBuffer();

// Five circular drink icons (dark circle + gold ring), centers 384px apart.
const drinkCenters = { beer: 660, coffee: 1044, tea: 1428, soft: 1812, water: 2196 };
for (const [name, cy] of Object.entries(drinkCenters)) {
  await sharp(raster)
    .extract({ left: 265, top: cy - 150, width: 300, height: 300 })
    .png()
    .toFile(path.join(OUT, `bm-${name}.png`));
  console.log("cropped bm-" + name + ".png");
}

// "BAR MENU" display title and daisy divider ornament (from the raster).
const misc = [
  ["bm-title.png", { left: 770, top: 250, width: 390, height: 104 }],
  ["bm-daisy.png", { left: 876, top: 140, width: 186, height: 74 }],
];
for (const [name, r] of misc) {
  await sharp(raster).extract(r).png().toFile(path.join(OUT, name));
  console.log("cropped " + name);
}

// Hanging bulb: a single transparent Edison bulb cropped from the bulbs sprite
// (img-02 in the extract) rather than the raster, so it has a clean alpha edge.
const bulbSprite = path.resolve("src/assets/extracted-barmenu/img-01.png");
await sharp(bulbSprite)
  .extract({ left: 3, top: 430, width: 150, height: 560 })
  .png()
  .toFile(path.join(OUT, "bm-bulb.png"));
console.log("cropped bm-bulb.png");
