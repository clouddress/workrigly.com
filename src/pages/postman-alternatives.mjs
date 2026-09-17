import { alternatives, verifiedDate } from "../data/postman-alternatives.mjs";
import { pageLayout } from "../layout.mjs";
import { site } from "../site.config.mjs";

export const path = "/postman-alternatives/";

const title = `Postman Alternatives: 8 Evidence-Checked Options — ${site.name}`;
const description = "Compare eight Postman alternatives by migration fidelity, free access, open-source license, self-hosting, deployment, limitations, and verified project activity.";

const renderSourceLinks = (sources) => sources
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
  { title: "Postman migration", start: 10, end: 15 },
  { title: "Project health", start: 15, end: 17 },
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

const tableCell = (text, tool, factIndex) => `
  <td>
    <span>${text}</span>
    ${sourceLine(tool.facts[factIndex].sources, "cell-source")}
  </td>`;

const tableRows = [
  ["Yes — Essentials is $0; local Scratch Pad is free forever.", "Yes", "Apache-2.0", "Partial — local client and self-hosted mocks, not a documented full cloud replacement.", "Yes — Collection v2.0/v2.1 and environments.", "Review unsupported script patterns; recreate mock servers.", "core 13.2.0 released 2026-08-25; default-branch commit checked 2026-09-16.", "Broad desktop API work and relatively strong script migration."],
  ["Yes — Cloud Free is $0; Community Edition is free.", "Yes", "MIT", "Yes — Community Edition via Docker; Helm path documented.", "Yes — collections and environments.", "Advanced auth and collection settings; experimental scripts need review.", "2026.8.1 released 2026-09-14; default-branch commit checked 2026-09-14.", "Teams that need an explicitly self-hostable web API platform."],
  ["Yes — Open Source plan is $0, with a two-workspace limit.", "Yes", "MIT", "Not a hosted service — local app, files, Git, and CLI.", "Yes — Collection v2/v2.1; environments supported.", "Review unsupported script behavior; mocks and monitors are not documented import targets.", "v4.1.0 released 2026-08-20; default-branch commit checked 2026-09-16.", "Offline-first, Git-tracked collections and CLI automation."],
  ["Yes for personal use; prebuilt binaries require a license at work.", "Yes", "MIT", "Not a hosted service — local desktop app with Git directory sync.", "Yes — Collection v2.0/v2.1 and environments.", "All pre-request and test scripts; monitors, mocks, flows, docs, and history do not import.", "v2026.7.1 released 2026-09-01; default-branch commit checked 2026-09-16.", "Local-first request work with broad auth import and no script dependency."],
  ["Yes — Desktop is public beta and works accountless; CLI is open source.", "CLI only confirmed", "BSD-3-Clause for CLI; Desktop not confirmed", "Not a hosted service — local Desktop/CLI; no documented self-hosted sync server.", "Yes in Desktop — collections, environments, and data dumps.", "Scripts, tests, dynamic tags, and unsupported request types must be rebuilt.", "CLI 3.2.4 released 2024-11-01; CLI commit checked 2024-12-17.", "Human-friendly desktop or terminal requests without Postman scripts."],
  ["Yes — Free plan is $0, but Postman import is paid-only.", "Not confirmed", "Not confirmed", "No documented server; collection data is stored locally.", "Paid-only — Postman 2.1 collections and environments.", "Convert Postman scripts to tc APIs; rebuild unlisted platform assets.", "v2.41.3 released 2026-09-13; support-repo commit checked 2026-06-04.", "API requests and tests inside VS Code or JetBrains."],
  ["Yes — open-source software; no paid plan documented.", "Yes", "Apache-2.0", "Not a hosted service — run the binary or official container on your infrastructure.", "No Postman importer documented.", "Rewrite requests, variables, scripts, and assertions into Hurl files.", "8.0.1 released 2026-04-29; default-branch commit checked 2026-09-16.", "Plain-text HTTP integration tests in local development and CI."],
  ["Yes — SoapUI Open Source is free.", "Yes", "EUPL-1.1", "Local application/source build; mock services can run through mockservicerunner.", "Only Postman Collection v1; v2 is unsupported.", "Rebuild unsupported tests and anything outside the documented v1 conversion rules.", "v5.10.0 released 2026-06-02; default-branch commit checked 2026-06-08.", "REST/SOAP functional testing and mocks, especially with old v1 exports."],
];

const tableFactIndexes = [3, 5, 5, 6, 10, 12, 16, 1];

const faq = [
  {
    question: "What is the best alternative to Postman?",
    answer: "There is no evidence-backed universal winner. Insomnia and Bruno deserve the first look when collections, environments, and script conversion matter; Hoppscotch is the clearest free self-hosted platform; Yaak is strong for local-first request data when scripts are not required.",
    tools: [[0, 10], [2, 10], [1, 6], [3, 12]],
  },
  {
    question: "Is there a free alternative to Postman?",
    answer: "Yes. Every option in this review has a documented free path, but the terms differ: some are open-source tools, Yaak's prebuilt binary is free for personal use, and Thunder Client keeps Postman import behind a paid plan.",
    tools: alternatives.map((_, index) => [index, 3]),
  },
  {
    question: "Which Postman alternatives are open source?",
    answer: "Insomnia, Hoppscotch Community Edition, Bruno, Yaak, HTTPie CLI, Hurl, and SoapUI have official open-source licenses. Thunder Client's product source license was not confirmed from its official public material.",
    tools: alternatives.map((_, index) => [index, 5]),
  },
  {
    question: "Which Postman alternatives can be self-hosted?",
    answer: "Hoppscotch Community Edition is the full API platform here with an explicit self-hosting guide. Insomnia documents self-hosted mocks. Bruno, Yaak, HTTPie, Hurl, Thunder Client, and SoapUI run locally or in CI rather than offering a documented full collaboration server.",
    tools: alternatives.map((_, index) => [index, 6]),
  },
  {
    question: "Can I import Postman collections?",
    answer: "Insomnia, Hoppscotch, Bruno, Yaak, HTTPie Desktop, and paid Thunder Client document Postman collection import. SoapUI supports only the old Postman v1 format. Hurl does not document a Postman importer.",
    tools: alternatives.map((_, index) => [index, 10]),
  },
  {
    question: "Do Postman scripts migrate automatically?",
    answer: "Not reliably across tools. Insomnia and Bruno convert many scripts, Hoppscotch calls its script import experimental, Yaak and HTTPie do not import scripts, Thunder Client publishes tc API mappings for conversion, Hurl requires a rewrite, and SoapUI converts only a documented subset of old v1 tests.",
    tools: alternatives.map((_, index) => [index, 12]),
  },
  {
    question: "How much work is required to migrate from Postman?",
    answer: "It depends on the assets and scripts in the project. Yaak publishes vendor guidance for a collection and a team move; migration time for the other seven tools is not estimated here because neither official timing nor a Workrigly migration test was available.",
    tools: alternatives.map((_, index) => [index, 14]),
  },
];

const faqSchemas = faq.map(({ question, answer }) => ({
  "@type": "Question",
  name: question,
  acceptedAnswer: { "@type": "Answer", text: answer },
}));

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Postman alternatives checked against official sources",
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
    mainEntity: faqSchemas,
  },
];

const quickAnswers = [
  {
    label: "Should you switch?",
    answer: "Only if a candidate preserves your critical requests, environments, authentication, and scripts. If you depend on Postman mocks, monitors, or workspace automation, check the documented gaps before moving.",
    refs: [[0, 13], [3, 13], [4, 13]],
  },
  {
    label: "Least disruptive migration",
    answer: "There is no single winner for every collection. Start with Insomnia or Bruno for documented script conversion; use Yaak when broad request and auth import matters more than scripts; treat Hoppscotch script import as experimental.",
    refs: [[0, 12], [2, 12], [3, 11], [1, 12]],
  },
  {
    label: "Free and self-hosted",
    answer: "Hoppscotch Community Edition is the clearest match: it is free, MIT licensed, and has official Docker and Kubernetes self-hosting documentation.",
    refs: [[1, 3], [1, 5], [1, 6]],
  },
  {
    label: "Where to look first",
    answer: "Insomnia or Bruno for broad client migration; Hoppscotch for a self-hosted web platform; Yaak or HTTPie for local-first requests; Thunder Client inside an editor; Hurl or SoapUI for focused test automation.",
    refs: [[0, 1], [2, 1], [1, 6], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1]],
  },
];

const referencedSources = (refs) => refs.flatMap(([toolIndex, factIndex]) => alternatives[toolIndex].facts[factIndex].sources);

export const html = pageLayout({
  title,
  description,
  path,
  structuredData,
  content: `
    <section class="comparison-hero">
      <div class="shell">
        <p class="eyebrow">Official-source review · verified ${verifiedDate}</p>
        <h1>Postman alternatives: the answer depends on what must survive the move.</h1>
        <p class="comparison-intro">Eight options made the cut. Each one can replace a real part of Postman, but none should be treated as a lossless copy.</p>
        <div class="answer-grid">
          ${quickAnswers.map((item) => `
            <article class="answer-card">
              <h2>${item.label}</h2>
              <p>${item.answer}</p>
              ${sourceLine(referencedSources(item.refs), "answer-source")}
            </article>`).join("")}
        </div>
        <p class="honest-boundary"><strong>Honest boundary:</strong> Self-hosting means you operate the infrastructure yourself. Importing a Postman collection does not mean every script or configuration migrates automatically. Migration time depends on the project. Every product fact below reflects the official sources checked on the displayed verification date.</p>
      </div>
    </section>

    <section class="review-index section-tight" aria-labelledby="review-index-title">
      <div class="shell">
        <div class="section-heading-row">
          <div>
            <p class="eyebrow">The shortlist</p>
            <h2 id="review-index-title">Choose by workflow, not by logo.</h2>
          </div>
          <p>Every source link goes to the product's own site, documentation, license, changelog, or official GitHub repository.</p>
        </div>
        <nav class="tool-jump-list" aria-label="Jump to an alternative">
          ${alternatives.map((tool) => `<a href="#${tool.slug}">${tool.name}</a>`).join("")}
        </nav>
      </div>
    </section>

    <section class="alternatives-list" aria-label="Reviewed Postman alternatives">
      <div class="shell">
        ${alternatives.map(renderTool).join("")}
      </div>
    </section>

    <section class="comparison-section section" aria-labelledby="comparison-title">
      <div class="shell">
        <p class="eyebrow">Total comparison</p>
        <h2 id="comparison-title">The trade-offs in one table.</h2>
        <p class="table-note" id="comparison-help">Swipe or scroll horizontally on a narrow screen. Each cell keeps its official source and verification date.</p>
        <div class="table-wrap" tabindex="0" aria-describedby="comparison-help">
          <table>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Free option</th>
                <th scope="col">Open source</th>
                <th scope="col">License</th>
                <th scope="col">Self-hosting</th>
                <th scope="col">Postman Collection import</th>
                <th scope="col">Manual rewrite required</th>
                <th scope="col">Latest verified project activity</th>
                <th scope="col">Best-fit use case</th>
              </tr>
            </thead>
            <tbody>
              ${alternatives.map((tool, rowIndex) => `
                <tr>
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
          ${faq.map((item) => `
            <details>
              <summary>${item.question}</summary>
              <p>${item.answer}</p>
              ${sourceLine(referencedSources(item.tools), "answer-source")}
            </details>`).join("")}
        </div>
      </div>
    </section>
  `,
});
