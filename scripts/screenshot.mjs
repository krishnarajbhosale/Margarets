import puppeteer from "puppeteer";

const URL = process.env.URL || "http://localhost:4173/";

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(async () => {
  if (document.fonts && document.fonts.ready) await document.fonts.ready;
});
await new Promise((r) => setTimeout(r, 800));

await page.screenshot({ path: "scripts/full.png", fullPage: true });

// Also grab the top fold
await page.screenshot({ path: "scripts/fold.png", clip: { x: 0, y: 0, width: 1440, height: 1000 } });

await browser.close();
console.log("screenshots written: scripts/full.png, scripts/fold.png");
