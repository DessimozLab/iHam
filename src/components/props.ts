import type { ColorSchemeName, GeneColorFn } from "../core/colors";
import type { ApiTemplates, LinkTemplates } from "../core/links";
import type { FamGene } from "../core/types";

export interface IHamProps {
  /** OrthoXML content (plain or OMA's augmented flavour) */
  orthoxml?: string;
  orthoxmlUrl?: string;
  /** species tree as newick or phyloXML */
  speciesTree?: string;
  speciesTreeUrl?: string;
  /** gene family data (OMA `/oma/hogdata/<entry>/json`), used for colours and tooltips */
  famData?: FamGene[];
  famDataUrl?: string;
  /** force (or disable) augmented OrthoXML parsing; auto-detected by default */
  augmented?: boolean;
  /** HOG id whose members are highlighted (OMA: `<hogid>_<taxid>`) */
  queryHog?: string;
  /** gene id to highlight */
  queryGene?: number | string;
  /** taxonomic level to open at; supports v-model:level */
  level?: string;
  /** minimum species coverage (%) for a HOG column to be shown; supports v-model */
  coverageThreshold?: number;
  /** built-in colour scheme; supports v-model */
  colorScheme?: ColorSchemeName;
  /** custom colouring; overrides `colorScheme` */
  geneColors?: GeneColorFn;
  tooltipTrigger?: "click" | "hover";
  /**
   * built-in toolbar: "open" shows all settings, "collapsed" puts them behind
   * a Settings button (legend and hidden-HOG notice stay visible), "hidden"
   * leaves it out
   */
  toolbar?: "open" | "collapsed" | "hidden";
  /** "oma" fills link and API templates for the OMA browser at `baseUrl` */
  preset?: "oma" | "none";
  baseUrl?: string;
  /** link templates; merged over the preset */
  links?: LinkTemplates;
  /** API templates; merged over the preset */
  api?: ApiTemplates;
  treeWidth?: number;
  rowHeight?: number;
  /** maximum height of the scrollable viewer area (CSS length) */
  height?: string;
  showInternalLabels?: boolean;
}
