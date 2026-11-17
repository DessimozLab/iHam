# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

iHam ("interactive HOG Analysis Method") is a browser widget that visualises hierarchical orthologous groups (HOGs): a species tree on the left and a gene matrix (species rows × HOG columns) on the right. It is embedded in the OMA browser. Inputs are a species tree (newick/phyloxml), an OrthoXML string, and gene family JSON (`fam_data`). The public API (options, events) is documented in `README.md`.

## Build

```
npm install
npm run build       # build-js + build-css
npm run build-js    # node build.mjs: esbuild bundles browser.js -> build/iHam.js and build/iHam.min.js (+ .map), global `iHam`
npm run build-css   # dart-sass index.scss -> build/iHam.css
npm run watch       # rebuild build/iHam.js and iHam.min.js on change
```

- `build/` is **committed**: it is the distributed bundle. OMA (pyomabrowser) vendors a copy in `oma/static/js/iHam.js`, and pyham loads `cdn.jsdelivr.net/gh/DessimozLab/iHam@master/build/iHam.js`, so anything pushed to `build/` on master reaches pyham users. Rebuild and commit `build/` alongside `src/` changes.
- `browser.js` deliberately sets `window.d3` (d3 v3): the tnt.* libraries and host pages (OMA's template uses `d3.scale`, `d3.svg.axis`) rely on that global. `build.mjs` defines `global` as `window` for iham-parsers.
- pyomabrowser has in the past patched its vendored `iHam.js` directly (e.g. the "Locate in chromosome viewer" link, pyomabrowser commit 8463a0e3). Before replacing OMA's copy, diff it against this repo's previous `build/iHam.js` (`diff -w`) and port any changes into `src/`.
- There are no automated tests and no linter (`npm test` just errors out).

To check changes manually, open `examples/simple/index.html` (or the other `examples/*/index.html`) in a browser after building; they load `../../build/iHam.js` and sample data from `data.js`.

## Architecture

Entry chain: `browser.js` → `index.js` → `src/iHam.js` (CommonJS `require` throughout; d3 v3 APIs such as `d3.dispatch`, `d3.rebind`). `src/features.js` uses the global `tnt` that `tntvis` creates as a side effect.

- **`src/iHam.js`** — the `iHam()` factory. Uses `tnt.api` to turn the `config` object into chainable getter/setters (`.newick()`, `.orthoxml()`, `.fam_data()`, `.query_gene()`, …); `tree_width`, `board_width`, `gene_colors`, `coverage_threshold` are hand-written setters that also trigger redraws. Calling the returned `theme(div)` parses the data and builds a `tnt()` visualisation composed of a `tnt.tree` (species tree) and a `tnt.board` with one track per tree leaf. Events (`node_selected`, `hogs_removed`, `updating`, `updated`) come from a per-instance `d3.dispatch`, exposed via `d3.rebind(theme, dispatch, "on")`. Setters may be called before or after rendering.
- **Parsing** is external: `parse_orthoxml` from the `iham-parsers` package returns `per_species` (species → taxon level → array of HOGs → gene ids), the tree object, and optionally `hog_metadata`/`query_members` when `augmented_orthoxml` is set.
- **`src/hog_state.js`** — holds the HOG columns for the currently selected taxonomic level. `reset_on(...)` recomputes them whenever a tree node is hovered/selected, applying the coverage threshold (percent of species with genes in the HOG) and recording removed HOGs.
- **`src/xcoords.js`** — converts one species' genes at the current level into x-positions on the board (`genes`, `hogs` boundaries, `hog_groups`), skipping removed HOGs.
- **`src/features.js`** — tnt board feature renderers for genes, HOG boundaries, and HOG header groups.
- **`src/tooltips.js`** — gene, tree-node (collapse / freeze / refreeze) and HOG-header tooltips (uses `tnt.tooltip` and jQuery).
- **`src/utils.js`** — `get_maxs`: per taxon level, the max number of genes any species has in each HOG; this determines column widths.

Key interaction flow: hovering a tree node calls `update_nodes(node)`, which resets `hog_state` for that taxon, resizes the board (`sum(max_in_hog) * 16` px), and redraws. When a node is "frozen" (`config.frozen_node`), hovering no longer changes the level. Collapsed tree nodes still render empty HOG columns using one of their descendant leaves.

The tooltips call OMA endpoints with relative URLs (`/api/protein/<id>/gene_ontology/`, `/api/hog/<protid>/members/`), so with `remote_data`/GO lookups the widget only fully works when hosted on omabrowser.org. OMA's usage of the API is in pyomabrowser `oma/templates/hog_ihamviewer.html`.

Styles live in `src/scss/iham.scss`, imported by `index.scss`.
