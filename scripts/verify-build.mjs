import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
await import("./build.mjs");

for (const file of ["index.html", "postman-alternatives/index.html", "notion-alternatives/index.html", "google-drive-alternatives/index.html", "ynab-alternatives/index.html", "404.html", "robots.txt", "sitemap.xml", "favicon.svg", "assets/site.css"]) {
  await access(resolve(root, "dist", file));
}

const homepage = await readFile(resolve(root, "dist/index.html"), "utf8");
const alternatives = await readFile(resolve(root, "dist/postman-alternatives/index.html"), "utf8");
const notionAlternatives = await readFile(resolve(root, "dist/notion-alternatives/index.html"), "utf8");
const googleDriveAlternatives = await readFile(resolve(root, "dist/google-drive-alternatives/index.html"), "utf8");
const ynabAlternatives = await readFile(resolve(root, "dist/ynab-alternatives/index.html"), "utf8");
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
if (!sitemap.includes("<loc>https://workrigly.com/notion-alternatives/</loc>")) throw new Error("Notion alternatives page is missing from sitemap.xml.");
if (!sitemap.includes("<loc>https://workrigly.com/google-drive-alternatives/</loc>")) throw new Error("Google Drive alternatives page is missing from sitemap.xml.");
if (!sitemap.includes("<loc>https://workrigly.com/ynab-alternatives/</loc>")) throw new Error("YNAB alternatives page is missing from sitemap.xml.");
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

if (!notionAlternatives.includes('<link rel="canonical" href="https://workrigly.com/notion-alternatives/">')) throw new Error("Notion alternatives canonical is missing or incorrect.");
if (!notionAlternatives.includes('<meta name="robots" content="index,follow">')) throw new Error("Notion alternatives robots directive is missing.");
if (!notionAlternatives.includes('"@type":"ItemList"') || !notionAlternatives.includes('"@type":"FAQPage"')) throw new Error("Notion structured data is missing.");
if ((notionAlternatives.match(/<article class="alternative-card"/g) || []).length !== 8) throw new Error("Expected exactly eight reviewed Notion alternatives.");
if (/[一-鿿]/u.test(notionAlternatives)) throw new Error("Chinese text found in the English Notion page.");
if (/localhost|placeholder/i.test(notionAlternatives)) throw new Error("Forbidden placeholder or local text found in the Notion page.");

const notionFactIds = [...notionAlternatives.matchAll(/data-fact-id="([^"]+)"/g)].map((match) => match[1]);
const uniqueNotionFactIds = new Set(notionFactIds);
if (uniqueNotionFactIds.size !== 120) throw new Error(`Expected 120 independently sourced Notion fact entries; found ${uniqueNotionFactIds.size}.`);
if ((notionAlternatives.match(/class="fact-source"/g) || []).length < notionFactIds.length) throw new Error("Every Notion fact entry must display an official source.");
if ((notionAlternatives.match(/datetime="2026-09-17"/g) || []).length < notionFactIds.length) throw new Error("Every Notion fact entry must display the current verification date.");

if (!googleDriveAlternatives.includes('<link rel="canonical" href="https://workrigly.com/google-drive-alternatives/">')) throw new Error("Google Drive alternatives canonical is missing or incorrect.");
if (!googleDriveAlternatives.includes('<meta name="robots" content="index,follow">')) throw new Error("Google Drive alternatives robots directive is missing.");
if (!googleDriveAlternatives.includes('"@type":"ItemList"') || !googleDriveAlternatives.includes('"@type":"FAQPage"')) throw new Error("Google Drive structured data is missing.");
if ((googleDriveAlternatives.match(/<article class="alternative-card"/g) || []).length !== 8) throw new Error("Expected exactly eight reviewed Google Drive alternatives.");
if (/[一-鿿]/u.test(googleDriveAlternatives)) throw new Error("Chinese text found in the English Google Drive page.");
if (/localhost|placeholder/i.test(googleDriveAlternatives)) throw new Error("Forbidden placeholder or local text found in the Google Drive page.");

const googleDriveFactIds = [...googleDriveAlternatives.matchAll(/data-fact-id="([^"]+)"/g)].map((match) => match[1]);
const uniqueGoogleDriveFactIds = new Set(googleDriveFactIds);
if (uniqueGoogleDriveFactIds.size !== 120) throw new Error(`Expected 120 independently sourced Google Drive fact entries; found ${uniqueGoogleDriveFactIds.size}.`);
if ((googleDriveAlternatives.match(/class="fact-source"/g) || []).length < googleDriveFactIds.length) throw new Error("Every Google Drive fact entry must display an official source.");
if ((googleDriveAlternatives.match(/datetime="2026-09-17"/g) || []).length < googleDriveFactIds.length) throw new Error("Every Google Drive fact entry must display the current verification date.");

if (!ynabAlternatives.includes('<link rel="canonical" href="https://workrigly.com/ynab-alternatives/">')) throw new Error("YNAB alternatives canonical is missing or incorrect.");
if (!ynabAlternatives.includes('<meta name="robots" content="index,follow">')) throw new Error("YNAB alternatives robots directive is missing.");
if (!ynabAlternatives.includes('"@type":"ItemList"') || !ynabAlternatives.includes('"@type":"FAQPage"')) throw new Error("YNAB structured data is missing.");
if ((ynabAlternatives.match(/<article class="alternative-card"/g) || []).length !== 8) throw new Error("Expected exactly eight reviewed YNAB alternatives.");
if (/[一-鿿]/u.test(ynabAlternatives)) throw new Error("Chinese text found in the English YNAB page.");
if (/localhost|placeholder/i.test(ynabAlternatives)) throw new Error("Forbidden placeholder or local text found in the YNAB page.");

const ynabFactIds = [...ynabAlternatives.matchAll(/data-fact-id="([^"]+)"/g)].map((match) => match[1]);
const uniqueYnabFactIds = new Set(ynabFactIds);
if (uniqueYnabFactIds.size !== 120) throw new Error(`Expected 120 independently sourced YNAB fact entries; found ${uniqueYnabFactIds.size}.`);
if ((ynabAlternatives.match(/class="fact-source"/g) || []).length < ynabFactIds.length) throw new Error("Every YNAB fact entry must display an official source.");
if ((ynabAlternatives.match(/datetime="2026-09-17"/g) || []).length < ynabFactIds.length) throw new Error("Every YNAB fact entry must display the current verification date.");

console.log(`Build verification passed with ${uniqueFactIds.size + uniqueNotionFactIds.size + uniqueGoogleDriveFactIds.size + uniqueYnabFactIds.size} independently sourced fact entries.`);
