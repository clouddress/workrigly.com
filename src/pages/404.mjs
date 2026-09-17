import { pageLayout } from "../layout.mjs";
import { site } from "../site.config.mjs";

export const path = "/404";

export const html = pageLayout({
  title: `Page not found — ${site.name}`,
  description: "The requested page could not be found.",
  path,
  content: `
    <section class="not-found">
      <div class="shell narrow">
        <p class="eyebrow">404</p>
        <h1>This page does not exist.</h1>
        <p class="lede">The address may be incorrect, or the page may have moved.</p>
        <a class="primary-link" href="/">Return to Workrigly <span aria-hidden="true">&rarr;</span></a>
      </div>
    </section>
  `,
});

