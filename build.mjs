// Bundles browser.js into build/iHam.js (+ minified build/iHam.min.js) exposing
// the global `iHam`. Usage: node build.mjs [--watch]
import * as esbuild from "esbuild";

const common = {
  entryPoints: ["browser.js"],
  bundle: true,
  format: "iife",
  globalName: "iHam",
  target: "es2015",
  // iham-parsers (xmldoc) references Node's `global`
  define: { global: "window" },
  logLevel: "info",
};

const builds = [
  { ...common, outfile: "build/iHam.js" },
  { ...common, outfile: "build/iHam.min.js", minify: true, sourcemap: true },
];

if (process.argv.includes("--watch")) {
  for (const options of builds) {
    const ctx = await esbuild.context(options);
    await ctx.watch();
  }
} else {
  await Promise.all(builds.map((options) => esbuild.build(options)));
}
