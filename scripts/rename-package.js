#!/usr/bin/env node

/**
 * Renames an npm tarball using the given version to a form that can be discovered
 * by GH actions.
 *
 * The version is taken as CLI parameter or from the env variable VERSION.
 */

const fs = require("fs");
const path = require("path");

const targetVersion = process.env.VERSION || process.argv[2];
if (!targetVersion) {
  console.error(
    "No target version specified, set either via the VERSION env variable or via CLI parameter"
  );
  return;
}

const packagedFile = fs
  .readdirSync(path.resolve(__dirname, ".."))
  .find(
    (file) =>
      path.extname(file) === ".tgz" &&
      (file.includes(targetVersion) || file.includes(targetVersion.substr(1)))
  );

if (!packagedFile) {
  console.error(`Could not find source file to rename`);
  return;
}

const targetFile = path.resolve(
  __dirname,
  `../netlify-traffic-mesh-agent-${targetVersion}.tgz`
);
fs.copyFileSync(packagedFile, targetFile);
