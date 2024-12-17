// server.ts
import { serve } from "https://deno.land/std/http/server.ts";
import { join, extname } from "https://deno.land/std/path/mod.ts";

const port = 8000;
const publicDir = "./";  // Directory where your web files are stored

async function serveFile(path: string): Promise<Response> {
  const filePath = join(publicDir, path);
  try {
    const fileExt = extname(filePath);
    let contentType = "text/html";  // Default to HTML
    if (fileExt === ".js") {
      contentType = "application/javascript";
    } else if (fileExt === ".css") {
      contentType = "text/css";
    } else if (fileExt === ".json") {
      contentType = "application/json";
    } else if (fileExt === ".jpg" || fileExt === ".jpeg") {
      contentType = "image/jpeg";
    } else if (fileExt === ".png") {
      contentType = "image/png";
    } else if (fileExt === ".svg") {
      contentType = "image/svg+xml";
    }

    const file = await Deno.readFile(filePath);
    return new Response(file, {
      status: 200,
      headers: { "content-type": contentType },
    });
  } catch (error) {
    return new Response("File not found", { status: 404 });
  }
}

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname === "/" ? "/index.html" : url.pathname;
  return await serveFile(path);
}

console.log(`Server running at http://localhost:${port}`);
serve(handler, { port });
