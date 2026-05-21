import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const distDirectory = path.join(process.cwd(), "dist");
const serverDirectory = path.join(distDirectory, "server");
const templatePath = path.join(distDirectory, "index.html");

function resolveServerEntry() {
  const files = fs.readdirSync(serverDirectory);
  const entryFileName = files.find(
    (fileName) => fileName.startsWith("entry-server") && fileName.endsWith(".js"),
  );

  if (!entryFileName) {
    throw new Error("Could not find SSR entry in dist/server.");
  }

  return path.join(serverDirectory, entryFileName);
}

function extractBlogContentHtml(appHtml) {
  const match = appHtml.match(/<div class="blog-content[^"]*">([\s\S]*?)<\/div>\s*<\/article>/);
  return match ? match[1] : "";
}

function renderTemplate(template, renderedPage, routePath) {
  const withHead = template.replace("<!--app-head-->", renderedPage.head || "");
  let html = withHead.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${renderedPage.appHtml}</div>`,
  );

  if (routePath && routePath.startsWith("/blog/") && routePath !== "/blog") {
    const blogSlug = routePath.replace(/^\/blog\//, "");
    const contentHtml = extractBlogContentHtml(renderedPage.appHtml);
    if (contentHtml) {
      const encodedContent = Buffer.from(contentHtml, "utf8").toString("base64");
      html = html.replace(
        "</body>",
        `<script type="text/plain" data-blog-content="${blogSlug}">${encodedContent}</script></body>`,
      );
    }
  }

  return html;
}

function getOutputPath(routePath) {
  if (routePath === "/") {
    return path.join(distDirectory, "index.html");
  }

  const normalizedRoute = routePath.replace(/^\/+/, "");
  return path.join(distDirectory, normalizedRoute, "index.html");
}

const template = fs.readFileSync(templatePath, "utf8");
const serverEntryPath = resolveServerEntry();
const serverModule = await import(pathToFileURL(serverEntryPath).href);
const routes = serverModule.getPrerenderRoutes();

for (const routePath of routes) {
  const renderedPage = serverModule.render(routePath);
  const outputPath = getOutputPath(routePath);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, renderTemplate(template, renderedPage, routePath));
}

console.log(`Prerendered ${routes.length} public routes.`);
