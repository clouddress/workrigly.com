import { alternatives, verifiedDate } from "../data/notion-alternatives.mjs";
import { pageLayout } from "../layout.mjs";
import { site } from "../site.config.mjs";

export const path = "/notion-alternatives/";

const title = `Notion Alternatives: 8 Evidence-Checked Options — ${site.name}`;
const description = "Compare eight Notion alternatives by official pricing, self-hosting, deployment, migration limits, license, and verified project activity.";

const uniqueSources = (sources) => [...new Map(sources.map((item) => [item.url, item])).values()];
const renderSourceLinks = (sources) => uniqueSources(sources)
  .map(({ label, url }) => `<a href="${url}" rel="noopener">${label}</a>`)
  .join(' <span aria-hidden="true">·</span> ');

const sourceLine = (sources, className = "fact-source") => `
  <span class="${className}">
    <strong>Official source:</strong> ${renderSourceLinks(sources)}
    <span aria-hidden="true">·</span>
    <strong>Verified:</strong> <time datetime="${verifiedDate}">${verifiedDate}</time>
  </span>`;

const factGroups = [
  { title: "Fit and scope", start: 0, end: 3 },
  { title: "Pricing and license", start: 3, end: 6 },
  { title: "Self-hosting and deployment", start: 6, end: 10 },
  { title: "Notion migration", start: 10, end: 14 },
  { title: "Project health", start: 14, end: 15 },
];

const renderFact = (tool, item, index) => `
  <li class="fact-item" data-fact-id="${tool.slug}-${index + 1}">
    <strong>${item.label}</strong>
    <span>${item.text}</span>
    ${sourceLine(item.sources)}
  </li>`;

const renderTool = (tool, toolIndex) => `
  <article class="alternative-card" id="${tool.slug}">
    <header class="alternative-heading">
      <span class="alternative-number">${String(toolIndex + 1).padStart(2, "0")}</span>
      <div>
        <h2>${tool.name}</h2>
        <p>${tool.bestFor}</p>
      </div>
    </header>
    <div class="fact-groups">
      ${factGroups.map((group) => `
        <section class="fact-group" aria-labelledby="${tool.slug}-${group.start}">
          <h3 id="${tool.slug}-${group.start}">${group.title}</h3>
          <ul class="fact-list">
            ${tool.facts.slice(group.start, group.end).map((item, offset) => renderFact(tool, item, group.start + offset)).join("")}
          </ul>
        </section>`).join("")}
    </div>
  </article>`;

const tableRows = [
  ["Free forever: one workspace, two members, 5 GB, and 10 AI responses.", "AGPL-3.0", "Yes — Docker or Kubernetes.", "Direct importer for pages, documents, databases, and workspace content.", "Validate integrations, automations, scripts, links, and database behavior.", "0.14.3 released 2026-09-15."],
  ["Yes — Free membership tier.", "Any Source Available 1.0", "Yes — official sync-network Docker Compose.", "Notion API importer plus a more lossy ZIP fallback.", "Fix broken links and missing files; rebuild unsupported formulas and date ranges.", "Commit checked 2026-09-15; v0.56.9-alpha released 2026-09-07."],
  ["Yes — free for personal, commercial, and nonprofit use.", "Proprietary", "Local files; no server required.", "Official API and HTML-ZIP import paths.", "Rebuild linked data sources and unsupported people or formula functions.", "1.14.2 published 2026-09-15."],
  ["Yes — limits apply to shared free docs.", "Proprietary", "No official self-hosted deployment.", "Notion HTML ZIP into a new or existing Coda doc.", "Validate people, formulas, automations, integrations, permissions, and database behavior.", "Official changelog updated through July 2026."],
  ["Yes — Free Forever at $0.", "Proprietary", "No official self-hosted deployment.", "Unlimited Notion imports on every plan.", "Rebuild page history, inline-database attachments and comments, buttons, and unsupported layout blocks.", "Official product-news page updated 2026-06-23."],
  ["No ongoing free plan; 14-day trial.", "Proprietary", "No official self-hosted deployment.", "HTML import for pages or a full workspace.", "Restore users, permissions, formulas, integrations, and automations; mentions become text.", "Official changelog updated 2026-09-10."],
  ["Yes — Community edition.", "AGPL-3.0 core", "Yes — official Docker Compose installation.", "Built-in Notion ZIP importer.", "Validate or rebuild formulas, relations, rollups, automations, integrations, comments, and permissions.", "v0.96.0 released and commit checked 2026-09-08."],
  ["Yes — free desktop, mobile, and terminal apps.", "AGPL-3.0-or-later by default", "Yes — several self-managed sync targets; business server also offered.", "No dedicated importer; use a Markdown export.", "Rebuild databases, formulas, relations, rollups, views, permissions, automations, and integrations.", "3.7.18 published 2026-09-11; commit checked 2026-09-16."],
];

const tableFactIndexes = [3, 5, 6, 10, 12, 14];
const tableCell = (text, tool, factIndex) => `<td><span>${text}</span>${sourceLine(tool.facts[factIndex].sources, "cell-source")}</td>`;
const referencedSources = (refs) => refs.flatMap(([toolIndex, factIndex]) => alternatives[toolIndex].facts[factIndex].sources);

const quickAnswers = [
  {
    label: "Should you switch?",
    answer: "Switch only after a sample import preserves the pages and database behaviors your team relies on. No option here promises a one-click, lossless move of every Notion formula, automation, integration, permission, and workflow.",
    refs: alternatives.map((_, index) => [index, 12]),
  },
  {
    label: "Least disruptive",
    answer: "Start with AppFlowy for a Notion-like workspace, Coda or ClickUp for a managed team workflow, or Slite for a documentation-focused move. Each has an official Notion import path.",
    refs: [[0, 10], [3, 10], [4, 10], [5, 10]],
  },
  {
    label: "Free and self-hosted",
    answer: "Docmost is the clearest team-wiki match: its Community edition is free, its core is AGPL-licensed, and the official install uses Docker Compose. AppFlowy is the broader Notion-like self-hosted option.",
    refs: [[6, 3], [6, 5], [6, 7], [0, 6]],
  },
  {
    label: "Local-first choice",
    answer: "Obsidian is the simplest local-files choice with a first-party importer. Anytype adds an object model and self-hosted sync network. Joplin is strongest when Markdown notes matter more than Notion databases.",
    refs: [[2, 7], [2, 10], [1, 6], [7, 10]],
  },
];

const faq = [
  {
    question: "What is the best alternative to Notion?",
    answer: "There is no universal winner. AppFlowy is the closest broad self-hosted workspace in this shortlist; Docmost is the clearest self-hosted wiki; Obsidian is the simplest local-file knowledge base; Coda, ClickUp, and Slite are managed team products.",
    refs: [[0, 1], [6, 1], [2, 0], [3, 1], [4, 1], [5, 1]],
  },
  {
    question: "Which Notion alternatives are free?",
    answer: "AppFlowy, Anytype, Obsidian, Coda, ClickUp, Docmost, and Joplin have an official free path. Slite offers a 14-day trial but requires a paid plan afterward.",
    refs: alternatives.map((_, index) => [index, 3]),
  },
  {
    question: "Which alternatives can be self-hosted?",
    answer: "AppFlowy and Docmost document full self-hosted workspace deployments. Anytype documents a self-hosted sync network. Joplin supports self-managed sync targets and Joplin Server Business. Obsidian uses local files rather than a required server.",
    refs: [[0, 6], [6, 6], [1, 6], [7, 6], [2, 6]],
  },
  {
    question: "Can these tools import Notion exports?",
    answer: "All eight have a documented path, but fidelity differs. AppFlowy, Anytype, Obsidian, Coda, ClickUp, Slite, and Docmost provide Notion-specific instructions or importers. Joplin relies on a general Markdown import path.",
    refs: alternatives.map((_, index) => [index, 10]),
  },
  {
    question: "Will Notion databases and formulas migrate perfectly?",
    answer: "No official source checked promises perfect conversion across all database views, formulas, relations, rollups, permissions, integrations, and automations. Run a representative sample and keep the original export until validation is complete.",
    refs: alternatives.map((_, index) => [index, 12]),
  },
  {
    question: "How long does a Notion migration take?",
    answer: "A defensible universal estimate is not available. Slite says self-service import can take minutes rather than days, while the other official sources checked do not state a general duration. Workspace size and manual rebuild work determine the real schedule.",
    refs: alternatives.map((_, index) => [index, 13]),
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Notion alternatives checked against official sources",
    numberOfItems: alternatives.length,
    itemListElement: alternatives.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `${site.url}${path}#${tool.slug}`,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  },
];

export const html = pageLayout({
  title,
  description,
  path,
  structuredData,
  content: `
    <section class="comparison-hero">
      <div class="shell">
        <p class="eyebrow">Official-source review · verified ${verifiedDate}</p>
        <h1>Notion alternatives: choose by migration loss, not feature count.</h1>
        <p class="comparison-intro">Eight options made the cut. The best choice depends on whether you need a managed team workspace, a self-hosted wiki, or local files.</p>
        <div class="answer-grid">
          ${quickAnswers.map((item) => `
            <article class="answer-card">
              <h2>${item.label}</h2>
              <p>${item.answer}</p>
              ${sourceLine(referencedSources(item.refs), "answer-source")}
            </article>`).join("")}
        </div>
        <p class="honest-boundary"><strong>Honest boundary:</strong> Self-hosting means operating servers, storage, upgrades, backups, and security yourself. A successful Notion import does not prove that formulas, automations, integrations, permissions, or every database view survived. Migration scripts and workflows may need to be rewritten.</p>
      </div>
    </section>

    <section class="review-index section-tight" aria-labelledby="review-index-title">
      <div class="shell">
        <div class="section-heading-row">
          <div><p class="eyebrow">The shortlist</p><h2 id="review-index-title">Start with the operating model you want.</h2></div>
          <p>Every source link goes to the product's own site, documentation, license, changelog, or official GitHub repository.</p>
        </div>
        <nav class="tool-jump-list" aria-label="Jump to an alternative">
          ${alternatives.map((tool) => `<a href="#${tool.slug}">${tool.name}</a>`).join("")}
        </nav>
      </div>
    </section>

    <section class="alternatives-list" aria-label="Reviewed Notion alternatives">
      <div class="shell">${alternatives.map(renderTool).join("")}</div>
    </section>

    <section class="comparison-section section" aria-labelledby="comparison-title">
      <div class="shell">
        <p class="eyebrow">Total comparison</p>
        <h2 id="comparison-title">The migration trade-offs in one table.</h2>
        <p class="table-note" id="comparison-help">Swipe or scroll horizontally on a narrow screen. Each cell keeps its official source and verification date.</p>
        <div class="table-wrap" tabindex="0" aria-describedby="comparison-help">
          <table>
            <thead><tr><th scope="col">Name</th><th scope="col">Free option</th><th scope="col">License</th><th scope="col">Self-hosting</th><th scope="col">Notion import</th><th scope="col">What needs manual work</th><th scope="col">Latest verified activity</th></tr></thead>
            <tbody>
              ${alternatives.map((tool, rowIndex) => `<tr>
                <th scope="row"><a href="#${tool.slug}">${tool.name}</a>${sourceLine(tool.facts[0].sources, "cell-source")}</th>
                ${tableRows[rowIndex].map((text, cellIndex) => tableCell(text, tool, tableFactIndexes[cellIndex])).join("")}
              </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="faq-section section" aria-labelledby="faq-title">
      <div class="shell narrow-wide">
        <p class="eyebrow">FAQ</p>
        <h2 id="faq-title">Questions to settle before you migrate.</h2>
        <div class="faq-list">
          ${faq.map((item) => `<details><summary>${item.question}</summary><p>${item.answer}</p>${sourceLine(referencedSources(item.refs), "answer-source")}</details>`).join("")}
        </div>
      </div>
    </section>
  `,
});
