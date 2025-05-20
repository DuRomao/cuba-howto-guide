import { defineConfig } from "vite";
import path from "path";
import pugPlugin from "vite-plugin-pug";
import fs from "fs";
import { renderFile } from "pug";
import chokidar from "chokidar";

const inputDir = path.resolve("assets/pug/pages"); // Source directory for Pug files
const outputDir = path.resolve(""); // Destination directory for compiled HTML

const compilePug = (filePath) => {
  const relativePath = path.relative(inputDir, filePath);
  const outputFilePath = path.resolve(
    outputDir,
    relativePath.replace(".pug", ".html")
  );

  try {
    const html = renderFile(filePath);
    fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
    fs.writeFileSync(outputFilePath, html);
    console.log(`Compiled: ${filePath} → ${outputFilePath}`);
  } catch (err) {
    console.error(`Error compiling ${filePath}: ${err.message}`);
  }
};

const startPugWatcher = () => {
  const watcher = chokidar.watch(inputDir, { persistent: true });

  watcher
    .on("add", compilePug)
    .on("change", compilePug)
    .on("error", (error) => console.error(`Watcher error: ${error}`));

  console.log("Watching for Pug file changes...");
};

export default defineConfig(({ command }) => {
  if (command === "serve") {
    startPugWatcher(); // Start the Pug watcher in development mode
  }

  return {
    root: "", // Root directory
    cacheDir: false, // Disable Vite's cache
    server: {
      open: "template/index.html", // Open this file in the browser
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "assets"), // Alias for '@'
      },
    },
    plugins: [
      pugPlugin(), // Enable the Pug plugin for Vite
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "sass:color"; @import "@scss/tailwind.css";', // Prepend modern Sass features
          // additionalData: '@import "tailwind.scss";',
        },
      },
      postcss: "postcss.config.js", // Ensure Tailwind runs correctly
    },
  };
});
