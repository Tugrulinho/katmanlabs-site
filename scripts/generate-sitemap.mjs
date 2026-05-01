import fs from "node:fs";
import path from "node:path";
import { createSitemapXml } from "../shared/public-site-static.mjs";

const projectRoot = process.cwd();
const snapshotPath = path.join(
  projectRoot,
  "src",
  "generated",
  "publicSiteSnapshot.json",
);
const outputPath = path.join(projectRoot, "dist", "sitemap.xml");

if (!fs.existsSync(snapshotPath)) {
  throw new Error(`Missing snapshot JSON at ${snapshotPath}`);
}

const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
const sitemap = createSitemapXml(snapshot);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, sitemap);

console.log(`Generated sitemap at ${outputPath}.`);
