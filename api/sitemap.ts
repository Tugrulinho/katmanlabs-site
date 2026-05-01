import fs from "node:fs";
import path from "node:path";
import { createSitemapXml } from "../shared/public-site-static.mjs";
import type { ApiRequest, ApiResponse } from "./_types";

export default async function handler(_req: ApiRequest, res: ApiResponse) {
  const snapshotPath = path.resolve(process.cwd(), "src/generated/publicSiteSnapshot.json");
  const snapshot = fs.existsSync(snapshotPath)
    ? JSON.parse(fs.readFileSync(snapshotPath, "utf8"))
    : { blogIndex: [] };
  const sitemap = createSitemapXml(snapshot);

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.status(200).end(sitemap);
}
