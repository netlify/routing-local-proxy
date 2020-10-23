#!/usr/bin/env node

/**
 * Overwrites the version field of the parent package.json which what's given via
 * environment parameter VERSION or via CLI parameter.
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

const packageFile = path.resolve(__dirname, "../package.json");

const contents = JSON.parse(fs.readFileSync(packageFile));
contents.version = targetVersion;

const newContents = JSON.stringify(contents, null, 2);
fs.writeFileSync(packageFile, newContents);
