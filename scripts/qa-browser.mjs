import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";

const require = createRequire(import.meta.url);
const { chromium } = (() => {
  try {
    return require("playwright");
  } catch {
    return require("/Users/bunny/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
  }
})();

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const errors = [];

page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});

await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 15000 });
const desktopMetrics = await page.evaluate(() => ({
  title: document.title,
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  heroHeight: document.querySelector(".hero-section")?.getBoundingClientRect().height,
  visualExists: Boolean(document.querySelector(".data-visual"))
}));
await page.screenshot({ path: "output/qa/desktop-home.png", fullPage: false });
await page.screenshot({ path: "output/qa/desktop-home-full.png", fullPage: true });

await page.setViewportSize({ width: 390, height: 844 });
await page.reload({ waitUntil: "domcontentloaded", timeout: 15000 });
const mobileMetrics = await page.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  heroHeight: document.querySelector(".hero-section")?.getBoundingClientRect().height,
  mobileMenuDisplay: getComputedStyle(document.querySelector(".menu-toggle")).display
}));
await page.screenshot({ path: "output/qa/mobile-home.png", fullPage: false });

await browser.close();

await writeFile(
  "output/qa/report.json",
  JSON.stringify({ desktopMetrics, mobileMetrics, errors }, null, 2)
);
