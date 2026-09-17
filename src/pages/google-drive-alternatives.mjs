import { alternatives, verifiedDate } from "../data/google-drive-alternatives.mjs";
import { pageLayout } from "../layout.mjs";
import { site } from "../site.config.mjs";

export const path = "/google-drive-alternatives/";

const title = `Google Drive Alternatives: 8 Evidence-Checked Options — ${site.name}`;
const description = "Compare eight Google Drive alternatives by official pricing, self-hosting, import path, migration work, license, and verified project activity.";

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
  { title: "Google Drive migration", start: 10, end: 14 },
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
    answer: "Switch if control, privacy, self-hosting, or backup isolation matters more than Google-native collaboration. Do not assume that sharing rules, links, permissions, or native document behavior will move intact.",
    refs: alternatives.map((_, index) => [index, 12]),
  },
  {
    label: "Least disruptive",
    answer: "Dropbox is the simplest direct move for selected files on an individual account. pCloud offers a direct one-time Google Drive backup. Proton Drive uses Google Takeout, while Nextcloud requires administrator OAuth setup.",
    refs: [[6, 10], [6, 11], [3, 10], [0, 10], [1, 11]],
  },
  {
    label: "Free and self-hosted",
    answer: "Nextcloud is the clearest full web-drive replacement: its community server is free, AGPL-licensed, and has an official Docker route. Syncthing is the lighter choice when device-to-device folder sync is enough.",
    refs: [[1, 3], [1, 5], [1, 6], [1, 7], [2, 0], [2, 6]],
  },
  {
    label: "No vendor cloud",
    answer: "Choose Nextcloud when you need a browser-based drive on infrastructure you operate. Choose Syncthing or Resilio Sync when the goal is peer-to-peer folder synchronization rather than a hosted cloud workspace.",
    refs: [[1, 6], [2, 2], [7, 2], [7, 6]],
  },
];

const faq = [
  {
    question: "What is the best Google Drive alternative?",
    answer: "For the least disruptive individual file import, start with Dropbox. For a managed direct one-time backup, consider pCloud. For a complete self-hosted web drive, start with Nextcloud. For peer-to-peer folder sync without a vendor cloud, compare Syncthing and Resilio Sync.",
    refs: [[6, 10], [3, 10], [1, 1], [1, 6], [2, 2], [7, 2]],
  },
  {
    question: "Which Google Drive alternatives have a free option?",
    answer: "Proton Drive, Nextcloud, Syncthing, pCloud, IDrive, Dropbox, and Resilio Sync have a confirmed official free path. MEGA's current free allowance remained unconfirmed because its official pricing page did not open successfully during this check.",
    refs: alternatives.map((_, index) => [index, 3]),
  },
  {
    question: "Which Google Drive alternatives can be self-hosted?",
    answer: "Nextcloud is the full self-hosted web-drive option in this shortlist. Syncthing and Resilio Sync keep data on user-controlled devices, but they are synchronization systems rather than hosted browser drives.",
    refs: [[1, 6], [2, 6], [7, 6]],
  },
  {
    question: "Which alternatives import directly from Google Drive?",
    answer: "Dropbox imports selected files for individual accounts, pCloud runs a one-time backup, and Nextcloud has a one-time Google integration. IDrive can back up personal Google and Workspace Drive data, but that backup product is not documented as a one-click move into IDrive Cloud Drive.",
    refs: [[6, 10], [3, 10], [1, 10], [5, 10], [5, 2]],
  },
  {
    question: "Will Google Docs, links, sharing, and permissions move automatically?",
    answer: "No official source checked promises a lossless transfer of every Google-native document behavior, sharing link, permission, or collaboration workflow. Validate converted files and rebuild destination access rules where required.",
    refs: alternatives.map((_, index) => [index, 12]),
  },
  {
    question: "How long does a Google Drive migration take?",
    answer: "A defensible universal estimate is not available. The official sources checked do not publish end-to-end labor hours, and the real duration depends on data size, export preparation, upload speed, conversion work, and access-rule rebuilding.",
    refs: alternatives.map((_, index) => [index, 13]),
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Google Drive alternatives checked against official sources",
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
    <section class="comparison-hero google-drive-hero">
      <div class="shell">
        <p class="eyebrow">Official-source review · verified ${verifiedDate}</p>
        <h1>Google Drive alternatives: 8 verified choices.</h1>
        <div class="top-answer" aria-label="Short answer">
          <p><strong>Short answer:</strong> Dropbox is the lowest-friction direct import for selected files on an individual account. Nextcloud is the clearest free, self-hosted web drive. Syncthing is the lighter free option when peer-to-peer folder sync is enough.</p>
          ${sourceLine(referencedSources([[6, 10], [1, 3], [1, 6], [2, 0], [2, 6]]), "answer-source")}
        </div>
        <p class="comparison-intro">Eight options made the cut. Choose by migration path and operating model, not by a feature-count promise.</p>
        <div class="answer-grid">
          ${quickAnswers.map((item) => `
            <article class="answer-card">
              <h2>${item.label}</h2>
              <p>${item.answer}</p>
              ${sourceLine(referencedSources(item.refs), "answer-source")}
            </article>`).join("")}
        </div>
        <p class="honest-boundary"><strong>Honest boundary:</strong> Self-hosting means operating storage, updates, backups, monitoring, and security yourself. Exported files still have to be transmitted again, and a direct importer is not proof of a one-click, lossless move. Google-native documents, links, sharing rules, and permissions may need validation or rebuilding.</p>
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

    <section class="alternatives-list" aria-label="Reviewed Google Drive alternatives">
      <div class="shell">${alternatives.map(renderTool).join("")}</div>
    </section>

    <section class="comparison-section section" aria-labelledby="comparison-title">
      <div class="shell">
        <p class="eyebrow">Total comparison</p>
        <h2 id="comparison-title">The migration trade-offs in one table.</h2>
        <p class="table-note" id="comparison-help">Swipe or scroll horizontally on a narrow screen. Every cell keeps its official source and verification date.</p>
        <div class="table-wrap" tabindex="0" aria-describedby="comparison-help">
          <table>
            <thead><tr><th scope="col">Name</th><th scope="col">Free option</th><th scope="col">Self-hosting</th><th scope="col">Google Drive import</th><th scope="col">What needs manual work</th></tr></thead>
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
