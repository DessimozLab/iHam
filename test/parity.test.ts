/**
 * Parity with iHam 1.x: the new parser and level computation must produce the
 * same data and matrix layout as iham-parsers + v1's hog_state/xcoords.
 */
import { createRequire } from "node:module";
import { beforeAll, describe, expect, it } from "vitest";
import { computeLevelView, computeMaxima } from "../src/core/levels";
import { parseOrthoXml } from "../src/core/orthoxml";
import { buildSpeciesTree } from "../src/core/tree";
import type { FamGene, ParsedHogs } from "../src/core/types";
import { datasets } from "./helpers";

const require = createRequire(import.meta.url);
const legacyParsers = require("iham-parsers");
const LegacyHogState = require("./legacy/hog_state.cjs");
const legacyXcoords = require("./legacy/xcoords.cjs");
const { get_maxs } = require("./legacy/utils.cjs");

// v1's xcoords uses the global d3 v3 (only d3.sum)
(globalThis as any).d3 = { sum: (a: number[]) => a.reduce((s, x) => s + (x || 0), 0) };

describe.each(datasets)("$name", (ds) => {
  let legacy: any;
  let parsed: ParsedHogs;

  beforeAll(() => {
    legacy = legacyParsers.parse_orthoxml(ds.tree, ds.orthoxml, {
      augmented: ds.augmented,
      query_hog: ds.queryHog ?? false,
    });
    parsed = parseOrthoXml(ds.tree, ds.orthoxml, { queryHog: ds.queryHog });
  });

  it("detects the OrthoXML flavour", () => {
    expect(parsed.augmented).toBe(ds.augmented);
  });

  it("parses the same per-species data, metadata, xrefs and tree", () => {
    expect(parsed.perSpecies).toEqual(legacy.per_species);
    expect(parsed.hogMetadata).toEqual(legacy.hog_metadata);
    expect(parsed.xrefs).toEqual(legacy.xrefs);
    expect(parsed.tree).toEqual(legacy.tree);
    const legacyQuery = Array.isArray(legacy.query_members) ? legacy.query_members : [];
    expect(parsed.queryMembers).toEqual(legacyQuery);
    if (ds.queryHog) {
      expect(parsed.queryMembers.length).toBeGreaterThan(0);
    }
  });

  it("computes the same column maxima", () => {
    expect(computeMaxima(parsed.perSpecies)).toEqual(get_maxs(legacy.per_species));
  });

  it("lays out every level identically to v1 (thresholds 0, 50, 90)", () => {
    const { nodes, root } = buildSpeciesTree(parsed.tree);
    const species = root.leafNames;
    const famMap = new Map<number, FamGene>(ds.famData.map((g) => [g.id, g]));
    const famObj: Record<number, FamGene> = Object.fromEntries(ds.famData.map((g) => [g.id, g]));
    const maxima = computeMaxima(parsed.perSpecies);
    const legacyMaxs = get_maxs(legacy.per_species);
    const fakeTree = { root: () => ({ get_all_leaves: () => species.map((name) => ({ property: () => name })) }) };

    let checkedLevels = 0;
    let checkedCells = 0;
    for (const node of nodes) {
      const level = node.name;
      for (const threshold of [0, 50, 90]) {
        const state = new LegacyHogState();
        state.reset_on(fakeTree, legacy.per_species, level, threshold, famObj, ds.augmented ? legacy.hog_metadata : false);
        const view = computeLevelView({
          perSpecies: parsed.perSpecies,
          maxima,
          species,
          level,
          coverageThreshold: threshold,
          famData: famMap,
          hogMetadata: ds.augmented ? parsed.hogMetadata : null,
        });

        const legacyCols = (state.hogs ?? []).map((h: any) => ({
          index: h.hog_pos,
          genes: h.genes,
          numberSpecies: h.number_species,
          maxInHog: h.max_in_hog,
          coverage: h.coverage,
          start: h.hog_start,
          protId: h.protid,
          name: h.name,
        }));
        const newCols = view.columns.map((c) => ({
          index: c.index,
          genes: c.genes,
          numberSpecies: c.numberSpecies,
          maxInHog: c.maxInHog,
          coverage: c.coverage,
          start: c.start,
          protId: c.protId,
          name: c.name,
        }));
        expect(newCols, `${level} @${threshold}%`).toEqual(legacyCols);
        expect(view.removed, `${level} @${threshold}%`).toEqual(state.removed_hogs);
        expect(view.numberSpecies).toBe(state.number_species);

        for (const sp of species) {
          const lg = legacyXcoords(legacy.per_species[sp]?.[level], legacyMaxs[level], state, famObj, false);
          const expected = lg.genes.map((g: any) => ({ id: g.id, hog: g.hog, slot: g.pos, posInHog: g.pos_in_hog }));
          const cells = view.row(sp);
          expect(cells, `${sp} @ ${level}`).toEqual(expected);
          checkedCells += cells.length;
        }
      }
      checkedLevels++;
    }
    expect(checkedLevels).toBe(nodes.length);
    expect(checkedCells).toBeGreaterThan(0);
  });
});
