import type { ColorSchemeName, GeneColorFn } from "../core/colors";
import type { ApiTemplates, LinkTemplates } from "../core/links";
import type { GeneData, HiddenHog } from "../core/types";

export interface IHamProps {
  /** OrthoXML content (plain or OMA's augmented flavour) */
  orthoxml?: string;
  orthoxmlUrl?: string;
  /** species tree as newick or phyloXML */
  speciesTree?: string;
  speciesTreeUrl?: string;
  /** gene family data (OMA `/oma/hogdata/<entry>/json`), used for colours and tooltips */
  geneData?: GeneData[];
  geneDataUrl?: string;
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
  maxHeight?: string;
  showInternalLabels?: boolean;
}

/** methods of the component (template ref) and of the `<i-ham>` element */
export interface IHamMethods {
  /**
   * open the viewer at a taxonomic level and scroll it into view; returns
   * false if the level is not in the tree (also before the data is loaded:
   * set the `level` prop/attribute for the initial level)
   */
  setLevel(level: string): boolean;
  /** freeze at a level, or at the selected one; hovering then no longer changes the level */
  freeze(level?: string): void;
  unfreeze(): void;
}

/** events of the component (arguments); on `<i-ham>`, `CustomEvent`s whose `detail` is the (only) argument */
export interface IHamEvents {
  "update:level": [level: string];
  "update:coverageThreshold": [value: number];
  "update:colorScheme": [value: ColorSchemeName];
  "update:tooltipTrigger": [value: "click" | "hover"];
  /** a tree node was selected: its name, whether it is a leaf, and the species below it */
  "node-selected": [node: { name: string; isLeaf: boolean; species: string[] }];
  /** the HOGs hidden by the coverage threshold changed (also on a level change, unless none were or are hidden) */
  "hogs-hidden": [info: { level: string; hogs: HiddenHog[] }];
  loaded: [info: { species: number; genes: number; augmented: boolean }];
  error: [error: Error];
}
