/**
 * The public, framework-free API: parse HOGs and compute what the viewer
 * shows at a taxonomic level. Everything else in core/ is internal and may
 * change in any release.
 */
export type {
  RawTreeNode,
  PerSpecies,
  HogMetadata,
  ParsedHogs,
  GeneData,
  HogColumn,
  HiddenHog,
  GeneCell,
  LevelView,
} from "./types";
export { parseOrthoXml, parseSpeciesTree, type ParseOptions } from "./orthoxml";
export { computeLevelView, type LevelMaxima, type LevelViewInput } from "./levels";
export type { ColorSchemeName, GeneColorFn } from "./colors";
export { omaEndpoints, fillTemplate, type LinkTemplates, type ApiTemplates, type Endpoints } from "./links";
