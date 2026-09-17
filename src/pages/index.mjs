import { pageLayout } from "../layout.mjs";
import { site } from "../site.config.mjs";

export const path = "/";

export const html = pageLayout({
  title: site.title,
  description: site.description,
  path,
  content: `
    <section class="hero">
      <div class="shell hero-grid">
        <div>
          <p class="eyebrow">Independent software guidance</p>
          <h1>Find an alternative that fits the way you actually work.</h1>
          <p class="lede">Workrigly helps individuals, small teams, and independent builders evaluate free, open-source, and self-hosted alternatives to paid software—without pretending every substitute is a perfect fit.</p>
          <a class="primary-link" href="#decision-guide">Make a better shortlist <span aria-hidden="true">&darr;</span></a>
        </div>
        <aside class="signal-card" aria-label="What Workrigly evaluates">
          <p class="card-kicker">A useful alternative should answer four questions</p>
          <ul class="signal-list">
            <li><span>01</span> Does it cover the workflow you rely on?</li>
            <li><span>02</span> Can you run and maintain it comfortably?</li>
            <li><span>03</span> What will it cost beyond the license?</li>
            <li><span>04</span> Can you leave with your data?</li>
          </ul>
        </aside>
      </div>
    </section>

    <section class="section" id="decision-guide">
      <div class="shell">
        <p class="eyebrow">Start here</p>
        <h2>Choose the model before the product.</h2>
        <p class="section-intro">“Free,” “open source,” and “self-hosted” solve different problems. A good shortlist starts by deciding which trade-off you are prepared to own.</p>
        <div class="choice-grid">
          <article>
            <span class="choice-number">01</span>
            <h3>Free to use</h3>
            <p>Best when the immediate goal is reducing subscription cost. Check feature limits, export options, and whether the free tier is suitable for ongoing use.</p>
          </article>
          <article>
            <span class="choice-number">02</span>
            <h3>Open source</h3>
            <p>Best when code transparency, adaptability, or community stewardship matters. Confirm that the project is maintained and that its license fits your use.</p>
          </article>
          <article>
            <span class="choice-number">03</span>
            <h3>Self-hosted</h3>
            <p>Best when you want more control over deployment and data. Count hosting, updates, backups, security, and your own maintenance time as part of the cost.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section checklist-section">
      <div class="shell checklist-grid">
        <div>
          <p class="eyebrow">Your first page</p>
          <h2>Write down the non-negotiables.</h2>
          <p>Before comparing names, make a short list of the work the replacement must preserve. That keeps attractive features from hiding a broken core workflow.</p>
        </div>
        <ul class="checklist">
          <li>Required imports, exports, and file formats</li>
          <li>People who need access and how they collaborate</li>
          <li>Devices, operating systems, and offline needs</li>
          <li>Backups, updates, support, and ownership</li>
        </ul>
      </div>
    </section>
  `,
});

