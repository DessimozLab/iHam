# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

iHam ("interactive HOG Analysis Method") visualises hierarchical orthologous groups (HOGs): a species tree on the left and a gene matrix (species rows × HOG columns at the selected taxonomic level) on the right. Its main user is the OMA browser (pyomabrowser, `oma/templates/hog_ihamviewer.html`).

Two lines of development:
- **`master` / tags `v1.x`**: iHam 1 (TnT + d3 v3 + jQuery, chainable `iHam()` API, committed `build/` bundles). pyomabrowser vendors `build/iHam.js` as `oma/static/js/iHam.js`; pyham loads it from jsDelivr by tag. pyomabrowser has patched its vendored copy directly before (commit 8463a0e3): diff it against the previous `build/iHam.js` before replacing it.
- **`v2` branch**: rewrite as a Vue 3 component (`<IHam>`) plus an `<i-ham>` custom element, built with Vite. Everything below describes v2.

## Commands

```
npm run dev          # playground (dev/), proxies /oma /api /All to OMA stage (IHAM_OMA_URL overrides)
npm test             # vitest (jsdom); single file: npx vitest run test/parity.test.ts; filter: -t "pattern"
npm run typecheck    # vue-tsc over src, test, dev
npm run build        # build:lib (dist/iham.js + iham.css, vue external) + build:element (dist/element/*.js, Vue bundled) + build:types
```

`vite.config.ts` switches on `--mode`: `lib`, `element`, or the dev playground (root `dev/`). The element build compiles SFCs with `features.customElement` so their `<style>` blocks are inlined into the shadow root; served from source the element would be unstyled. So `npm run dev` also runs the element build in watch mode as a child process (plugin `iham:element-watch-build`; in-process it corrupts plugin-vue's cache for the dev server), serves `dist/element/` as the public dir and reloads `element.html` after each rebuild: `element.html` always exercises the real bundle. HTML pages in `dev/` can't reference modules outside `dev/` directly; go through a `dev/*.ts` entry.

Tests use jsdom, not happy-dom: happy-dom's XML parser rejects valid OrthoXML (single-quoted XML declarations, namespaces).

## Architecture

- **`src/core/`**: framework-free TypeScript, also exported from the package.
  - `orthoxml.ts`: port of iham-parsers' SAX converter to a DOM walk with **identical semantics** (level indices, intermediate-level filling for plain OrthoXML, `(species)` renaming, lexicographic member sort). Produces `perSpecies[species][level][hogIndex] = geneIds`, `hogMetadata` (augmented only), `queryMembers`, and the pruned, ladderized species tree. Augmented mode is auto-detected: every `orthologGroup` has `id` and `taxonId`.
  - `levels.ts`: `computeMaxima` (column widths) and `computeLevelView` (= v1 `hog_state.reset_on` + `xcoords`): the columns at a level after the coverage filter, plus per-species gene slots.
  - `tree.ts`: species tree model (ids, `leafNames`) and the cladogram layout, with collapsed nodes shown as rows.
  - `colors.ts`, `links.ts`: colour schemes; URL templates with an OMA preset (`omaEndpoints`). `fillTemplate` URL-encodes values and rejects non-http(s) schemes.
- **`src/components/`**: `IHam.vue` owns the state (selected node, frozen node, collapsed set, threshold, scheme) and one scroll container: a CSS grid with sticky corner/header/tree cells. `HogMatrix.vue` draws only the visible viewport on a canvas translated to the scroll position (`viewport` prop) and does its own hit-testing. `SpeciesTree.vue` is SVG. Popovers (`GeneInfo`, `HogInfo`, `NodeMenu`) are positioned relative to the root element. Props are declared in `components/props.ts`.
- **Entries**: `src/index.ts` (Vue library + core) and `src/element.ts` (`defineCustomElement`, registers `i-ham`).

## Invariants

- `test/parity.test.ts` runs v1's own code (`iham-parsers` devDependency, `test/legacy/*.cjs`) against the new core on the plain example and on OMA's augmented P53 HOG, for every level and several thresholds. Keep it green when touching `core/`; if behaviour should intentionally differ from v1, change the test explicitly.
- Hovering a tree node selects its level (unless frozen); only programmatic level changes (prop, `setLevel`) scroll the node into view.
- Use the configurable link/API templates; never hardcode OMA URLs in components.
