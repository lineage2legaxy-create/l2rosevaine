import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
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

export const statFile = async (path, statFn = stat) => {
  try {
    const info = await statFn(path);
    return info.isFile() ? { status: 200, info } : { status: 404 };
  } catch (error) {
    return { status: error?.code === "ENOENT" || error?.code === "ENOTDIR" ? 404 : 500 };
  }
};

export const handleRequest = async (req, res, dependencies = {}) => {
  const statFn = dependencies.stat ?? stat;
  const streamFn = dependencies.createReadStream ?? createReadStream;
  Object.entries(securityHeaders).forEach(([key, value]) => res.setHeader(key, value));
  if (!["GET", "HEAD"].includes(req.method ?? "")) { res.writeHead(405, { Allow: "GET, HEAD" }).end(); return; }
  const path = resolveRequestPath(req.url ?? "/");
  if (!path) { res.writeHead(400).end("Bad Request"); return; }
  const result = await statFile(path, statFn);
  if (result.status !== 200) { res.writeHead(result.status).end(result.status === 404 ? "Not Found" : "Internal Server Error"); return; }
  const rel = relative(root, path).replaceAll("\\", "/");
  const headers = { "Content-Type": mime[extname(path).toLowerCase()] ?? "application/octet-stream", "Content-Length": result.info.size, "Cache-Control": cacheControlFor(rel) };
  if (req.method === "HEAD") { res.writeHead(200, headers).end(); return; }
  const stream = streamFn(path);
  stream.once("error", (error) => {
    if (!res.headersSent) res.writeHead(error?.code === "ENOENT" ? 404 : 500).end(error?.code === "ENOENT" ? "Not Found" : "Internal Server Error");
    else res.destroy();
  });
  stream.once("open", () => {
    res.writeHead(200, headers);
    stream.pipe(res);
  });
};

export const app = createServer((req, res) => {
  handleRequest(req, res).catch(() => {
    if (!res.headersSent) res.writeHead(500).end("Internal Server Error");
    else res.destroy();
  });
});
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number.parseInt(process.env.PORT ?? "3000", 10);
  app.listen(Number.isFinite(port) ? port : 3000, "0.0.0.0");
}
