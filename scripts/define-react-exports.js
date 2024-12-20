const fs = require("fs").promises;
const path = require("path");

const EXPORTS = {
  react: {
    ".": {
      "react-server": "./react.shared-subset.js",
      default: "./index.js",
    },
    "./package.json": "./package.json",
    "./jsx-runtime": "./jsx-runtime.js",
    "./jsx-dev-runtime": "./jsx-dev-runtime.js",
  },
  "react-dom": {
    ".": "./index.js",
    "./client": "./client.js",
    "./server": {
      deno: "./server.browser.js",
      worker: "./server.browser.js",
      browser: "./server.browser.js",
      default: "./server.node.js",
    },
    "./server.browser": "./server.browser.js",
    "./server.node": "./server.node.js",
    "./profiling": "./profiling.js",
    "./test-utils": "./test-utils.js",
    "./package.json": "./package.json",
  },
};

const updateExports = async (moduleName, exports) => {
  const packageJsonPath = path.join(
    __dirname,
    `../node_modules/${moduleName}/package.json`
  );

  try {
    const data = await fs.readFile(packageJsonPath, "utf8");
    const packageJson = JSON.parse(data);

    // Define the exports field
    packageJson.exports = exports;

    await fs.writeFile(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      "utf8"
    );
    console.log(`${moduleName} exports defined successfully!`);
  } catch (err) {
    console.error(`Error updating ${moduleName} package.json:`, err);
  }
};

const main = async () => {
  await Promise.all([
    updateExports("react", EXPORTS["react"]),
    updateExports("react-dom", EXPORTS["react-dom"]),
  ]);
};

main();
