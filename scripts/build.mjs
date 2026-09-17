import { cp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "../src/site.config.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(root, "dist");

const pages = [
  { module: "../src/pages/index.mjs", source: "src/pages/index.mjs", output: "index.html", sitemap: true },
  { module: "../src/pages/postman-alternatives.mjs", source: "src/pages/postman-alternatives.mjs", output: "postman-alternatives/index.html", sitemap: true },
  { module: "../src/pages/notion-alternatives.mjs", source: "src/pages/notion-alternatives.mjs", output: "notion-alternatives/index.html", sitemap: true },
  { module: "../src/pages/google-drive-alternatives.mjs", source: "src/pages/google-drive-alternatives.mjs", output: "google-drive-alternatives/index.html", sitemap: true },
  { module: "../src/pages/404.mjs", source: "src/pages/404.mjs", output: "404.html", sitemap: false },
];

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

const sitemapEntries = [];

for (const page of pages) {
  const loaded = await import(page.module);
  const destination = resolve(out, page.output);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, `${loaded.html}\n`, "utf8");

  if (page.sitemap) {
    const details = await stat(resolve(root, page.source));
    sitemapEntries.push({
      loc: new URL(loaded.path, site.url).href,
      lastmod: details.mtime.toISOString().slice(0, 10),
    });
  }
}

await mkdir(resolve(out, "assets"), { recursive: true });
await cp(resolve(root, "src/assets"), resolve(out, "assets"), { recursive: true });
await cp(resolve(root, "src/public"), out, { recursive: true });

const robots = [
  "User-agent: *",
  "Allow: /",
  `Sitemap: ${site.url}/sitemap.xml`,
].join("\n");
await writeFile(resolve(out, "robots.txt"), `${robots}\n`, "utf8");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(({ loc, lastmod }) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join("\n")}
</urlset>
`;
await writeFile(resolve(out, "sitemap.xml"), sitemap, "utf8");

const headers = `/assets/*
  Cache-Control: public, max-age=31536000, immutable

/robots.txt
  Content-Type: text/plain; charset=utf-8

/sitemap.xml
  Content-Type: application/xml; charset=utf-8
`;
await writeFile(resolve(out, "_headers"), headers, "utf8");

console.log(`Built ${pages.length} pages and ${sitemapEntries.length} sitemap entry in dist/.`);
