import type { GeneData, GeneCell, HiddenHog, HogColumn, HogMetadata, LevelView, PerSpecies } from "./types";

/** level -> HOG index -> max number of genes any species has in that HOG */
export type LevelMaxima = Record<string, number[]>;

const maximaCache = new WeakMap<PerSpecies, LevelMaxima>();

export function computeMaxima(perSpecies: PerSpecies): LevelMaxima {
  const cached = maximaCache.get(perSpecies);
  if (cached) return cached;
  const maxs: LevelMaxima = {};
  for (const sp of Object.keys(perSpecies)) {
    const spData = perSpecies[sp];
    for (const level of Object.keys(spData)) {
      const m = (maxs[level] ??= []);
      spData[level].forEach((hog, i) => {
        if (m[i] === undefined || m[i] < hog.length) {
          m[i] = hog.length;
        }
      });
    }
  }
  maximaCache.set(perSpecies, maxs);
  return maxs;
}

export interface LevelViewInput {
  perSpecies: PerSpecies;
  /** from `computeMaxima(perSpecies)` (the default, computed once per `perSpecies`) */
  maxima?: LevelMaxima;
  /** all species of the tree, in display order (including those below collapsed nodes); default: those of `perSpecies` */
  species?: string[];
  level: string;
  /** minimum species coverage in percent (0–100) */
  coverageThreshold?: number;
  geneData?: ReadonlyMap<number, GeneData>;
  /** from augmented OrthoXML; used to name the HOG columns */
  hogMetadata?: HogMetadata | null;
}

/**
 * Columns and gene placement for one taxonomic level. Equivalent to iHam 1.x's
 * `hog_state.reset_on` + `xcoords`.
 */
export function computeLevelView(input: LevelViewInput): LevelView {
  const { perSpecies, level, geneData, hogMetadata } = input;
  const maxima = input.maxima ?? computeMaxima(perSpecies);
  const species = input.species ?? Object.keys(perSpecies);
  const threshold = Number(input.coverageThreshold ?? 0);

  let all: Omit<HogColumn, "coverage" | "start">[] | undefined;
  let numberSpecies = 0;
  for (const sp of species) {
    const slice = perSpecies[sp]?.[level];
    if (!slice || slice.length === 0) {
      continue;
    }
    numberSpecies += 1;
    all ??= slice.map((_, i) => ({ index: i, name: `hog_${i}`, genes: [], numberSpecies: 0, maxInHog: 0 }));
    slice.forEach((genes, i) => {
      if (genes.length > 0) {
        const col = all![i];
        col.genes = col.genes.concat(genes);
        col.numberSpecies += 1;
        col.maxInHog = Math.max(col.maxInHog, genes.length);
      }
    });
  }

  const columns: HogColumn[] = [];
  const removed: number[] = [];
  const hidden: HiddenHog[] = [];
  let slots = 0;
  for (const col of all ?? []) {
    const coverage = (col.numberSpecies * 100) / numberSpecies;
    const hogId = hogMetadata?.[col.genes[0]]?.[level]?.split("_")[0];
    if (!(coverage >= threshold)) {
      removed.push(col.index);
      hidden.push(hogId ? { index: col.index, hogId } : { index: col.index });
      continue;
    }
    const column: HogColumn = { ...col, coverage, start: slots };
    const protId = col.genes.map((g) => geneData?.get(g)?.protid).find((p) => p);
    if (protId) {
      column.protId = protId;
    }
    if (hogId) {
      column.hogId = hogId;
      column.name = hogId;
    }
    columns.push(column);
    slots += col.maxInHog;
  }

  const removedSet = new Set(removed);
  const maxs = maxima[level] ?? [];
  const rowCache = new Map<string, GeneCell[]>();

  const row = (sp: string): GeneCell[] => {
    let cells = rowCache.get(sp);
    if (cells) {
      return cells;
    }
    cells = [];
    let pos = 0;
    (perSpecies[sp]?.[level] ?? []).forEach((hogGenes, hog) => {
      if (removedSet.has(hog)) {
        return;
      }
      // same (lexicographic) order as iHam 1.x
      [...hogGenes].sort().forEach((id, posInHog) => {
        cells!.push({ id, hog, slot: pos + posInHog, posInHog });
      });
      pos += maxs[hog];
    });
    rowCache.set(sp, cells);
    return cells;
  };

  return { level, columns, removed, hidden, numberSpecies, totalSlots: slots, row };
}
