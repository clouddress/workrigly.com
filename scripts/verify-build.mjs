import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
await import("./build.mjs");

for (const file of ["index.html", "postman-alternatives/index.html", "404.html", "robots.txt", "sitemap.xml", "favicon.svg", "assets/site.css"]) {
  await access(resolve(root, "dist", file));
}

const homepage = await readFile(resolve(root, "dist/index.html"), "utf8");
const alternatives = await readFile(resolve(root, "dist/postman-alternatives/index.html"), "utf8");
const notFound = await readFile(resolve(root, "dist/404.html"), "utf8");
const robots = await readFile(resolve(root, "dist/robots.txt"), "utf8");
const sitemap = await readFile(resolve(root, "dist/sitemap.xml"), "utf8");

if (!homepage.includes('<link rel="canonical" href="https://workrigly.com/">')) throw new Error("Homepage canonical is missing or incorrect.");
if (!homepage.includes("free, open-source, and self-hosted alternatives")) throw new Error("Homepage purpose statement is missing.");
if (!notFound.includes("This page does not exist.")) throw new Error("404 page is missing.");
if (robots.trim().split("\n").length !== 3) throw new Error("robots.txt must contain exactly three lines.");
if (!robots.includes("Sitemap: https://workrigly.com/sitemap.xml")) throw new Error("robots.txt sitemap URL is incorrect.");
if (!sitemap.includes("<lastmod>")) throw new Error("sitemap.xml entries must include lastmod.");
if (!sitemap.includes("<loc>https://workrigly.com/</loc>")) throw new Error("Homepage is missing from sitemap.xml.");
if (!sitemap.includes("<loc>https://workrigly.com/postman-alternatives/</loc>")) throw new Error("Postman alternatives page is missing from sitemap.xml.");
if (!alternatives.includes('<link rel="canonical" href="https://workrigly.com/postman-alternatives/">')) throw new Error("Postman alternatives canonical is missing or incorrect.");
if (!alternatives.includes('<meta name="robots" content="index,follow">')) throw new Error("Postman alternatives robots directive is missing.");
if (!alternatives.includes('"@type":"ItemList"') || !alternatives.includes('"@type":"FAQPage"')) throw new Error("Required structured data is missing.");
if ((alternatives.match(/<article class="alternative-card"/g) || []).length !== 8) throw new Error("Expected exactly eight reviewed alternatives.");
if (/[一-鿿]/u.test(alternatives)) throw new Error("Chinese text found in the English page.");
if (/localhost|placeholder|coming soon/i.test(alternatives)) throw new Error("Forbidden placeholder or local text found in the page.");

const factIds = [...alternatives.matchAll(/data-fact-id="([^"]+)"/g)].map((match) => match[1]);
const uniqueFactIds = new Set(factIds);
if (uniqueFactIds.size !== 136) throw new Error(`Expected 136 independently sourced fact entries; found ${uniqueFactIds.size}.`);
if ((alternatives.match(/class="fact-source"/g) || []).length < factIds.length) throw new Error("Every fact entry must display an official source.");
if ((alternatives.match(/datetime="2026-09-17"/g) || []).length < factIds.length) throw new Error("Every fact entry must display the current verification date.");

console.log(`Build verification passed with ${uniqueFactIds.size} independently sourced fact entries.`);
