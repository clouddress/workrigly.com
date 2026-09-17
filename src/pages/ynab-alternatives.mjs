import { alternatives, verifiedDate } from "../data/ynab-alternatives.mjs";
import { pageLayout } from "../layout.mjs";
import { site } from "../site.config.mjs";

export const path = "/ynab-alternatives/";

const title = `YNAB Alternatives: 8 Evidence-Checked Options — ${site.name}`;
const description = "Compare eight YNAB alternatives by official pricing, self-hosting, migration work, license, and verified project activity.";

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
  { title: "YNAB migration", start: 10, end: 14 },
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

const tableFactIndexes = [3, 6, 10, 12];
const tableCell = (tool, factIndex) => `<td><span>${tool.facts[factIndex].text}</span>${sourceLine(tool.facts[factIndex].sources, "cell-source")}</td>`;
const referencedSources = (refs) => refs.flatMap(([toolIndex, factIndex]) => alternatives[toolIndex].facts[factIndex].sources);

const quickAnswers = [
  {
    label: "Should you switch?",
    answer: "Switch only if a different operating model matters more than preserving YNAB exactly. Actual Budget keeps envelope budgeting and adds self-hosting; the managed apps trade that control for forecasting, dashboards, or a simpler workflow.",
    refs: [[0, 0], [0, 6], [1, 1], [2, 1], [5, 1]],
  },
  {
    label: "Least migration friction",
    answer: "Actual Budget and PocketSmith have dedicated YNAB import paths. Actual imports a plan JSON and documents post-import cleanup; PocketSmith imports accounts, transactions, and categories from YNAB's Register CSV, but future budgets must be rebuilt.",
    refs: [[0, 10], [0, 12], [1, 10], [1, 12]],
  },
  {
    label: "Free and self-hosted",
    answer: "Actual Budget is the only option in this shortlist with a confirmed free, open-source, customer-operated server. Goodbudget and EveryDollar have ongoing free plans, but they are vendor-hosted.",
    refs: [[0, 3], [0, 5], [0, 6], [3, 3], [3, 6], [4, 3], [4, 6]],
  },
  {
    label: "Best managed starting point",
    answer: "Start with PocketSmith when importing YNAB history matters. Start with Monarch or Simplifi when broader household dashboards and cash-flow views matter more and you accept CSV conversion plus budget reconstruction.",
    refs: [[1, 10], [1, 12], [2, 1], [2, 10], [5, 1], [5, 10]],
  },
];

const faq = [
  {
    question: "What is the best YNAB alternative?",
    answer: "Actual Budget is the strongest match for envelope budgeting, data control, and self-hosting. PocketSmith is the strongest managed starting point when a dedicated YNAB importer and forecasting matter. The best choice changes if you prefer household dashboards, a simpler budget, or offline mobile use.",
    refs: [[0, 0], [0, 6], [0, 10], [1, 1], [1, 10], [2, 1], [6, 0]],
  },
  {
    question: "Which YNAB alternatives have a permanent free plan?",
    answer: "Actual Budget's open-source app is free, while PocketSmith, Goodbudget, and EveryDollar publish ongoing free plans. Monarch and Lunch Money publish trials rather than permanent free tiers; Simplifi offers a money-back guarantee, and Centsible offers a trial before its lifetime purchase.",
    refs: alternatives.map((_, index) => [index, 3]),
  },
  {
    question: "Which YNAB alternative can I self-host?",
    answer: "Actual Budget is the only confirmed self-hosted product in this shortlist. Its official options include Docker, a server CLI, managed hosting, and building from source.",
    refs: [[0, 6], [0, 7], [0, 8]],
  },
  {
    question: "Which alternatives import directly from YNAB?",
    answer: "Actual Budget and PocketSmith document dedicated YNAB import paths. Monarch, Goodbudget, Simplifi, and Lunch Money use general CSV transaction imports. EveryDollar does not support file imports, and Centsible says full migration from another budget app is unsupported.",
    refs: alternatives.map((_, index) => [index, 10]),
  },
  {
    question: "Will my YNAB targets, assignments, rules, and bank connections move automatically?",
    answer: "No product in this review provides an official promise that every YNAB behavior moves intact. Even the dedicated importers document model differences or follow-up work, while the CSV tools focus primarily on transactions and selected category fields.",
    refs: alternatives.map((_, index) => [index, 12]),
  },
  {
    question: "How long does it take to migrate away from YNAB?",
    answer: "There is no defensible universal estimate. None of the official sources checked publishes end-to-end labor hours, and the work depends on account count, history size, importer support, budget-model differences, cleanup, and validation.",
    refs: alternatives.map((_, index) => [index, 13]),
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "YNAB alternatives checked against official sources",
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
    <section class="comparison-hero compact-comparison-hero">
      <div class="shell">
        <p class="eyebrow">Official-source review · verified ${verifiedDate}</p>
        <h1>YNAB alternatives: 8 verified choices.</h1>
        <div class="top-answer" aria-label="Short answer">
          <p><strong>Short answer:</strong> Actual Budget is the best free, self-hosted YNAB replacement. PocketSmith is the lowest-friction managed move because it has a dedicated YNAB importer. Monarch and Simplifi fit people who want a broader financial dashboard and accept more rebuilding.</p>
          ${sourceLine(referencedSources([[0, 3], [0, 6], [0, 10], [1, 10], [2, 1], [2, 10], [5, 1], [5, 10]]), "answer-source")}
        </div>
        <p class="comparison-intro">Eight options made the cut. Choose by budgeting model, migration path, and who operates the service.</p>
        <div class="answer-grid">
          ${quickAnswers.map((item) => `
            <article class="answer-card">
              <h2>${item.label}</h2>
              <p>${item.answer}</p>
              ${sourceLine(referencedSources(item.refs), "answer-source")}
            </article>`).join("")}
        </div>
        <p class="honest-boundary"><strong>Honest boundary:</strong> Self-hosting means operating updates, backups, monitoring, and security yourself. A transaction importer is not a one-click, lossless budget migration: YNAB targets, assignments, credit-card handling, rules, recurring items, and bank connections may need to be recreated or revalidated.</p>
      </div>
    </section>

    <section class="review-index section-tight" aria-labelledby="review-index-title">
      <div class="shell">
        <div class="section-heading-row">
          <div><p class="eyebrow">The shortlist</p><h2 id="review-index-title">Start with the budgeting model you want.</h2></div>
          <p>Every source link goes to the product's own site, documentation, terms, changelog, or official GitHub repository.</p>
        </div>
        <nav class="tool-jump-list" aria-label="Jump to an alternative">
          ${alternatives.map((tool) => `<a href="#${tool.slug}">${tool.name}</a>`).join("")}
        </nav>
      </div>
    </section>

    <section class="alternatives-list" aria-label="Reviewed YNAB alternatives">
      <div class="shell">${alternatives.map(renderTool).join("")}</div>
    </section>

    <section class="comparison-section section" aria-labelledby="comparison-title">
      <div class="shell">
        <p class="eyebrow">Total comparison</p>
        <h2 id="comparison-title">The migration trade-offs in one table.</h2>
        <p class="table-note" id="comparison-help">Swipe or scroll horizontally on a narrow screen. Every cell keeps its official source and verification date.</p>
        <div class="table-wrap" tabindex="0" aria-describedby="comparison-help">
          <table>
            <thead><tr><th scope="col">Name</th><th scope="col">Free option</th><th scope="col">Self-hosting</th><th scope="col">YNAB import</th><th scope="col">What needs manual work</th></tr></thead>
            <tbody>
              ${alternatives.map((tool) => `<tr>
                <th scope="row"><a href="#${tool.slug}">${tool.name}</a>${sourceLine(tool.facts[0].sources, "cell-source")}</th>
                ${tableFactIndexes.map((factIndex) => tableCell(tool, factIndex)).join("")}
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
