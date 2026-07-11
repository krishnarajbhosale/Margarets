import fs from "node:fs";
import path from "node:path";

const SVG = path.resolve(process.argv[2] || "src/assets/Home_Page.svg");
const OUT = path.resolve(process.argv[3] || "src/assets/extracted");

fs.mkdirSync(OUT, { recursive: true });

const svg = fs.readFileSync(SVG, "utf8");

// Grab the root svg width/height/viewBox for context
const rootTag = svg.slice(0, svg.indexOf(">") + 1);
const vb = (rootTag.match(/viewBox="([^"]+)"/) || [])[1];
const rw = (rootTag.match(/\bwidth="([^"]+)"/) || [])[1];
const rh = (rootTag.match(/\bheight="([^"]+)"/) || [])[1];
console.log("ROOT", { width: rw, height: rh, viewBox: vb });

// Find all <image ...> elements
const imageTagRe = /<image\b[^>]*?\/?>/g;
const attrRe = (name) => new RegExp(`${name}="([^"]*)"`);
const hrefRe = /(?:xlink:href|href)="(data:[^"]+)"/;

const manifest = [];
let m;
let idx = 0;
while ((m = imageTagRe.exec(svg))) {
  const tag = m[0];
  const href = (tag.match(hrefRe) || [])[1];
  if (!href || !href.startsWith("data:")) continue;

  const meta = href.slice(5, href.indexOf(","));
  const mime = meta.split(";")[0];
  const isB64 = meta.includes("base64");
  const dataStr = href.slice(href.indexOf(",") + 1);
  const ext = mime.split("/")[1] || "bin";

  const buf = isB64
    ? Buffer.from(dataStr, "base64")
    : Buffer.from(decodeURIComponent(dataStr), "utf8");

  const x = (tag.match(attrRe("x")) || [])[1];
  const y = (tag.match(attrRe("y")) || [])[1];
  const w = (tag.match(attrRe("width")) || [])[1];
  const h = (tag.match(attrRe("height")) || [])[1];
  const transform = (tag.match(attrRe("transform")) || [])[1];

  const name = `img-${String(idx).padStart(2, "0")}.${ext}`;
  fs.writeFileSync(path.join(OUT, name), buf);

  manifest.push({
    file: name,
    mime,
    bytes: buf.length,
    x,
    y,
    width: w,
    height: h,
    transform,
  });
  idx++;
}

fs.writeFileSync(
  path.join(OUT, "_manifest.json"),
  JSON.stringify({ root: { width: rw, height: rh, viewBox: vb }, images: manifest }, null, 2)
);

console.log(`Extracted ${manifest.length} images to ${OUT}`);
for (const it of manifest) {
  console.log(
    `${it.file}\t${(it.bytes / 1024).toFixed(0)}KB\tx=${it.x} y=${it.y} w=${it.width} h=${it.height}${
      it.transform ? "\ttransform=" + it.transform : ""
    }`
  );
}
