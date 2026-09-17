import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../dist/postman-alternatives/index.html", import.meta.url), "utf8");
const urls = [...new Set([...html.matchAll(/href="(https:\/\/[^\"]+)"/g)]
  .map((match) => match[1])
  .filter((url) => !url.startsWith("https://workrigly.com")))];

const results = await Promise.all(urls.map(async (url) => {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
      headers: { "user-agent": "Workrigly source-link verification" },
    });
    return { url, status: response.status, ok: response.status < 400 };
  } catch (error) {
    return { url, status: error.name, ok: false };
  }
}));

const failures = results.filter(({ ok }) => !ok);
console.log(JSON.stringify({ checked: results.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
