import { site } from "./site.config.mjs";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export function pageLayout({ title, description, path = "/", content, structuredData = [] }) {
  const canonical = new URL(path, site.url).href;
  const schemas = Array.isArray(structuredData) ? structuredData : [structuredData];

  return `<!doctype html>
<html lang="${site.language}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="robots" content="index,follow">
    <link rel="canonical" href="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${site.name}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${canonical}">
    <meta name="twitter:card" content="summary">
    <meta name="theme-color" content="#10231d">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/assets/site.css">
    ${schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`).join("\n    ")}
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="shell header-inner">
        <a class="brand" href="/" aria-label="Workrigly home">
          <span class="brand-mark" aria-hidden="true">W</span>
          <span>${site.name}</span>
        </a>
        <nav class="site-nav" aria-label="Primary navigation">
          <a href="/">Home</a>
          <a href="/postman-alternatives/">Postman alternatives</a>
        </nav>
      </div>
    </header>
    <main id="main">${content}</main>
    <footer class="site-footer">
      <div class="shell footer-inner">
        <p><strong>${site.name}</strong> helps people evaluate practical software alternatives.</p>
        <p>&copy; ${new Date().getUTCFullYear()} Workrigly</p>
      </div>
    </footer>
  </body>
</html>`;
}
