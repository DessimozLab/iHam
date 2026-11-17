import { scaleLinear } from "d3-scale";
import type { FamGene } from "./types";

export const QUERY_COLOR = "#27ae60";
export const DEFAULT_GENE_COLOR = "#95a5a6";
export const MISSING_COLOR = "#d5dbdb";

/** Built-in schemes; numeric ones colour by a field of the family data. */
export const COLOR_SCHEMES = {
  query: { label: "Query genes" },
  sequence_length: { label: "Protein length", field: "sequence_length" },
  gc_content: { label: "GC content", field: "gc_content" },
  nr_exons: { label: "Number of exons", field: "nr_exons" },
  similarity: { label: "Gene function similarity", field: "similarity" },
} as const;

export type ColorSchemeName = keyof typeof COLOR_SCHEMES;
export type GeneColorFn = (gene: FamGene | undefined, geneId: number) => string;

export interface ColorScale {
  color: GeneColorFn;
  /** present for numeric schemes */
  legend?: { label: string; domain: [number, number]; colors: [string, string] };
}

const RANGE: [string, string] = ["red", "blue"];

/** Numeric schemes for which at least one gene has a value. */
export function availableSchemes(famData: Iterable<FamGene>): ColorSchemeName[] {
  const genes = [...famData];
  return (Object.keys(COLOR_SCHEMES) as ColorSchemeName[]).filter((name) => {
    const field = (COLOR_SCHEMES[name] as { field?: string }).field;
    return !field || genes.some((g) => typeof g[field] === "number");
  });
}

export function makeColorScale(
  scheme: ColorSchemeName,
  famData: Iterable<FamGene>,
  isQuery: (geneId: number) => boolean,
): ColorScale {
  const def = COLOR_SCHEMES[scheme] as { label: string; field?: string };
  if (!def.field) {
    return { color: (_g, id) => (isQuery(id) ? QUERY_COLOR : DEFAULT_GENE_COLOR) };
  }
  const field = def.field;
  const values = [...famData].map((g) => g[field]).filter((v): v is number => typeof v === "number");
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const domain: [number, number] = values.length ? [lo, hi === lo ? lo + 1 : hi] : [0, 1];
  const scale = scaleLinear<string>().domain(domain).range(RANGE);
  return {
    color: (gene) => {
      const v = gene?.[field];
      return typeof v === "number" ? scale(v) : MISSING_COLOR;
    },
    legend: { label: def.label, domain, colors: RANGE },
  };
}

export function legendTicks(domain: [number, number], count = 6): number[] {
  return scaleLinear().domain(domain).ticks(count);
}
