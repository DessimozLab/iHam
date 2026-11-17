/// <reference types="vitest/config" />
import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Modes:
//   (dev)     `npm run dev`  – playground in dev/, proxies OMA stage for real data
//   lib       Vue 3 library: dist/iham.js + dist/iham.css, `vue` stays external
//   element   <i-ham> custom element: dist/element/iham-element.{js,iife.js},
//             Vue bundled in, component styles injected into the shadow root
const OMA_UPSTREAM = process.env.IHAM_OMA_URL ?? "https://oma-stage.vital-it.ch";

export default defineConfig(({ mode }) => {
  const isElement = mode === "element";

  return {
    plugins: [
      vue({
        // In the element build every SFC's <style> is inlined so that
        // defineCustomElement can put it into the shadow root.
        features: { customElement: isElement },
      }),
    ],
    define: isElement ? { "process.env.NODE_ENV": JSON.stringify("production") } : {},
    resolve: {
      alias: { "@": resolve(import.meta.dirname, "src") },
    },
    server: {
      // the playground imports the test fixtures from ../test
      fs: { allow: [import.meta.dirname] },
      // Lets the playground load HOGs the same way OMA does (relative URLs).
      proxy: Object.fromEntries(
        ["/oma", "/api", "/All"].map((p) => [
          p,
          { target: OMA_UPSTREAM, changeOrigin: true, followRedirects: true },
        ]),
      ),
    },
    root: mode === "lib" || isElement ? undefined : "dev",
    build:
      mode === "lib"
        ? {
            outDir: "dist",
            emptyOutDir: false,
            sourcemap: true,
            cssCodeSplit: false,
            lib: {
              entry: resolve(import.meta.dirname, "src/index.ts"),
              formats: ["es"],
              fileName: () => "iham.js",
              cssFileName: "iham",
            },
            rolldownOptions: { external: ["vue"] },
          }
        : isElement
          ? {
              outDir: "dist/element",
              emptyOutDir: true,
              sourcemap: true,
              lib: {
                entry: resolve(import.meta.dirname, "src/element.ts"),
                formats: ["es", "iife"],
                name: "IHam",
                fileName: (format) =>
                  format === "es" ? "iham-element.js" : `iham-element.${format}.js`,
              },
            }
          : {
              outDir: resolve(import.meta.dirname, "dist-playground"),
              emptyOutDir: true,
            },
    test: {
      root: import.meta.dirname,
      environment: "jsdom",
      include: ["test/**/*.test.ts"],
    },
  };
});
