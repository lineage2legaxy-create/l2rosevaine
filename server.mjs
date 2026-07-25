import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize, relative } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "dist");
export const securityHeaders = Object.freeze({
  "Content-Security-Policy": "default-src 'self'; img-src 'self' data:; media-src 'self' blob:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self' https:; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
  "X-Content-Type-Options": "nosniff", "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY", "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
});
const mime = { ".css": "text/css; charset=utf-8", ".html": "text/html; charset=utf-8", ".ico": "image/x-icon", ".jpeg": "image/jpeg", ".jpg": "image/jpeg", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".mp3": "audio/mpeg", ".mp4": "video/mp4", ".png": "image/png", ".svg": "image/svg+xml", ".webm": "video/webm", ".webp": "image/webp", ".woff2": "font/woff2" };
export const cacheControlFor = (path) => path === "index.html" ? "no-store" : /(?:^|\/)assets\/.*-[a-zA-Z0-9_-]{8,}\./.test(path) ? "public, max-age=31536000, immutable" : "public, max-age=3600";
export const resolveRequestPath = (rawPath) => {
  let decoded;
  try { decoded = decodeURIComponent(rawPath.split("?")[0]); } catch { return null; }
  if (decoded.includes("\0") || decoded.split(/[\\/]+/).includes("..")) return null;
  const route = decoded.replace(/^[/\\]+/, "");
  const requested = normalize(join(root, route));
  if (relative(root, requested).startsWith("..")) return null;
  return extname(route) ? requested : join(root, "index.html");
};
export const app = createServer((req, res) => {
  Object.entries(securityHeaders).forEach(([key, value]) => res.setHeader(key, value));
  if (!["GET", "HEAD"].includes(req.method ?? "")) { res.writeHead(405, { Allow: "GET, HEAD" }).end(); return; }
  const path = resolveRequestPath(req.url ?? "/");
  if (!path) { res.writeHead(400).end("Bad Request"); return; }
  const file = existsSync(path) && statSync(path).isFile() ? path : null;
  if (!file) { res.writeHead(404).end("Not Found"); return; }
  const rel = relative(root, file).replaceAll("\\", "/");
  res.writeHead(200, { "Content-Type": mime[extname(file).toLowerCase()] ?? "application/octet-stream", "Content-Length": statSync(file).size, "Cache-Control": cacheControlFor(rel) });
  if (req.method === "HEAD") res.end(); else createReadStream(file).pipe(res);
});
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number.parseInt(process.env.PORT ?? "3000", 10);
  app.listen(Number.isFinite(port) ? port : 3000, "0.0.0.0");
}
