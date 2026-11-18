/** A species tree node as produced by the newick / phyloXML parsers. */
export interface RawTreeNode {
  name: string;
  children?: RawTreeNode[];
  branch_length?: number;
}

/** species -> taxonomic level -> HOG index at that level -> member gene ids */
export type PerSpecies = Record<string, Record<string, number[][]>>;

/** gene id -> taxonomic level -> HOG id (augmented OrthoXML only) */
export type HogMetadata = Record<number, Record<string, string>>;

export interface ParsedHogs {
  perSpecies: PerSpecies;
  hogMetadata: HogMetadata;
  /** member genes of `queryHog`, if it was given and found */
  queryMembers: number[];
  /** species tree pruned to the species in the OrthoXML and ladderized */
  tree: RawTreeNode;
  /** gene id -> protId attribute from the OrthoXML */
  xrefs: Record<number, string>;
  /** whether the OrthoXML was parsed in augmented mode */
  augmented: boolean;
}

/** One entry of the gene family data (OMA `/oma/hogdata/<entry>/json`). */
export interface GeneData {
  id: number;
  protid?: string;
  xrefid?: string;
  sequence_length?: number;
  gc_content?: number;
  nr_exons?: number;
  similarity?: number | null;
  taxon?: { species?: string; strain?: string } | string;
  [key: string]: unknown;
}

/** One HOG column at the currently selected level. */
export interface HogColumn {
  /** index of the HOG among all HOGs at this level (stable while the level is unchanged) */
  index: number;
  /** generated name (`hog_<index>`) or the HOG id from augmented OrthoXML */
  name: string;
  /** HOG id without the `_<taxid>` suffix, when known (augmented OrthoXML) */
  hogId?: string;
  /** protein id of the first member with family data, used for remote lookups */
  protId?: string;
  genes: number[];
  numberSpecies: number;
  /** widest row (most genes of one species) in this HOG, i.e. its width in gene slots */
  maxInHog: number;
  /** percentage of species (with genes at this level) that have a gene in this HOG */
  coverage: number;
  /** first gene slot of this column */
  start: number;
}

/** A gene placed in the matrix. */
export interface GeneCell {
  id: number;
  /** HOG index (`HogColumn.index`) */
  hog: number;
  /** horizontal position in gene slots */
  slot: number;
  posInHog: number;
}

/** A HOG hidden by the coverage threshold. */
export interface HiddenHog {
  /** index of the HOG among all HOGs at its level (`HogColumn.index`) */
  index: number;
  /** HOG id without the `_<taxid>` suffix, when known (augmented OrthoXML) */
  hogId?: string;
}

export interface LevelView {
  level: string;
  columns: HogColumn[];
  /** HOG indices hidden by the coverage threshold */
  removed: number[];
  /** the same HOGs, with their ids when known */
  hidden: HiddenHog[];
  /** number of species that have at least one gene at this level */
  numberSpecies: number;
  /** total width in gene slots */
  totalSlots: number;
  /** genes of one species row at this level */
  row(species: string): GeneCell[];
}
