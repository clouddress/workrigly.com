import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
await import("./build.mjs");

for (const file of ["index.html", "404.html", "robots.txt", "sitemap.xml", "favicon.svg", "assets/site.css"]) {
  await access(resolve(root, "dist", file));
}

const homepage = await readFile(resolve(root, "dist/index.html"), "utf8");
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

console.log("Build verification passed.");

