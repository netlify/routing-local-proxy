const path = require("path");

const getTrafficMeshForLocalSystem = () => {
  let extension = "";
  let platform;
  switch (process.platform) {
    case "darwin":
      platform = "x86_64-apple-darwin";
      break;
    case "linux":
      platform = "x86_64-unknown-linux-gnu";
      break;
    case "win32":
      extension = ".exe";
      platform = "x86_64-pc-windows-msvc";
      break;
    default:
      throw new Error(
        `There is no traffic-mesh binary for ${process.platform}.`
      );
  }

  return path.join(__dirname, platform, `traffic-mesh${extension}`);
};

module.exports = { getTrafficMeshForLocalSystem };
