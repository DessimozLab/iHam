/// <reference types="vitest/config" />
import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";

// Modes:
//   (dev)     `npm run dev`  – playground in dev/, proxies the OMA browser for live data
//   lib       Vue 3 library: dist/iham.js + dist/iham.css, `vue` stays external
//   element   <i-ham> custom element: dist/element/iham-element.{js,iife.js},
//             Vue bundled in, component styles injected into the shadow root
const OMA_UPSTREAM = process.env.IHAM_OMA_URL ?? "https://omabrowser.org";
const ELEMENT_OUT = resolve(import.meta.dirname, "dist/element");

/**
 * The custom element only gets its styles in the `element` build (they are
 * inlined into the shadow root), so the dev server can't serve it from source.
 * Instead, run the element build in watch mode next to the dev server, serve
 * its output (see `publicDir`) and reload element.html after each rebuild.
 *
 * The build runs in a child process: in-process it shares @vitejs/plugin-vue's
 * per-file cache with the dev server, which corrupts the dev server's SFC
 * transforms (duplicate `export default`).
 */
function elementWatchBuild(): Plugin {
  return {
    name: "iham:element-watch-build",
    apply: "serve",
    configureServer(server) {
      const child = spawn(
        process.execPath,
        [resolve(import.meta.dirname, "node_modules/vite/bin/vite.js"), "build", "--mode", "element", "--watch", "--logLevel", "warn"],
        { cwd: import.meta.dirname, stdio: ["ignore", "inherit", "inherit"] },
      );
      const stop = () => child.kill();
      server.httpServer?.on("close", stop);
      process.once("exit", stop);

      let timer: ReturnType<typeof setTimeout> | undefined;
      const bundle = resolve(ELEMENT_OUT, "iham-element.iife.js");
      server.watcher.add(bundle);
      const onChange = (file: string) => {
        if (file === bundle) {
          clearTimeout(timer);
          timer = setTimeout(() => server.ws.send({ type: "full-reload", path: "/element.html" }), 200);
        }
      };
      server.watcher.on("add", onChange).on("change", onChange);
    },
  };
}

export default defineConfig(({ mode, command }) => {
  const isElement = mode === "element";
  const isLibrary = mode === "lib" || isElement;
  // the playground, served (`npm run dev`) or built as the demo (`npm run build:demo`)
  const isDemo = !isLibrary && mode !== "test";
  // `vite` dev server only (vitest also "serves", in mode "test")
  const isPlayground = command === "serve" && mode === "development";

  return {
    plugins: [
      vue({
        // In the element build every SFC's <style> is inlined so that
        // defineCustomElement can put it into the shadow root.
        features: { customElement: isElement },
      }),
      isPlayground && elementWatchBuild(),
    ],
    // the playground's element.html loads the (watch-)built element from here;
    // the demo build copies it, so build:element must run first (see build:demo)
    publicDir: isDemo ? ELEMENT_OUT : false,
    // the demo is published in a subdirectory (GitHub Pages)
    base: isDemo ? "./" : undefined,
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
              // the demo: the playground, loading live data straight from omabrowser.org
              outDir: resolve(import.meta.dirname, "dist-playground"),
              emptyOutDir: true,
              rolldownOptions: {
                input: {
                  index: resolve(import.meta.dirname, "dev/index.html"),
                  element: resolve(import.meta.dirname, "dev/element.html"),
                },
              },
            },
    test: {
      root: import.meta.dirname,
      environment: "jsdom",
      include: ["test/**/*.test.ts"],
    },
  };
});
