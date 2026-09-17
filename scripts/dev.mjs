import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { createServer } from "node:http";

await import("./build.mjs");

const root = resolve(import.meta.dirname, "../dist");
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

createServer((request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  let requested = pathname === "/" ? "index.html" : pathname.slice(1);
  let file = join(root, requested);

  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file) && !extname(file) && existsSync(`${file}.html`)) file = `${file}.html`;

  const found = existsSync(file) && statSync(file).isFile();
  if (!found) file = join(root, "404.html");

  response.writeHead(found ? 200 : 404, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(response);
}).listen(4173, "127.0.0.1", () => {
  console.log("Workrigly is available at http://localhost:4173");
});

