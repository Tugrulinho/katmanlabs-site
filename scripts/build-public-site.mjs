import path from "node:path";
import { spawnSync } from "node:child_process";

const projectRoot = process.cwd();
const viteBin = path.join(projectRoot, "node_modules", "vite", "bin", "vite.js");

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    stdio: "inherit",
    env: process.env,
  });

  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${args.join(" ")}`);
  }
}

run(process.execPath, ["scripts/generate-public-site-snapshot.mjs"]);
run(process.execPath, [viteBin, "build"]);
run(process.execPath, [
  viteBin,
  "build",
  "--ssr",
  "src/entry-server.tsx",
  "--outDir",
  "dist/server",
]);
run(process.execPath, ["scripts/prerender-public-site.mjs"]);
run(process.execPath, ["scripts/generate-sitemap.mjs"]);
