import { parseNewick } from "./newick";
import { parsePhyloXml } from "./phyloxml";
import { extractParentRelations, ladderize } from "./tree";
import type { HogMetadata, ParsedHogs, PerSpecies, RawTreeNode } from "./types";

export interface ParseOptions {
  /**
   * Augmented OrthoXML (as served by OMA) carries an `id` and `taxonId` on
   * every orthologGroup and has groups at every taxonomic level.
   * Auto-detected when not given.
   */
  augmented?: boolean;
  /** HOG id (`<hogid>_<taxid>` in OMA's augmented OrthoXML) whose members are returned as `queryMembers` */
  queryHog?: string | null;
}

interface OrthologGroup {
  memb: number[];
  lev?: string;
  hogId?: string;
  speciesSublevels: Record<string, number[]>;
}

/** Parses a species tree given as newick or phyloXML (detected from the content). */
export function parseSpeciesTree(tree: string | RawTreeNode): RawTreeNode {
  if (typeof tree !== "string") {
    return tree;
  }
  const text = tree.trimStart();
  if (text.startsWith("<?xml") || text.startsWith("<phyloxml")) {
    return parsePhyloXml(text);
  }
  return parseNewick(text);
}

/**
 * Converts OrthoXML into iHam's per-species / per-level HOG structure.
 *
 * This is a port of iham-parsers' `parse_orthoxml` (SAX based) to a DOM walk,
 * keeping its semantics so that the matrix layout is identical to iHam 1.x.
 */
export function parseOrthoXml(
  speciesTree: string | RawTreeNode,
  orthoxml: string,
  options: ParseOptions = {},
): ParsedHogs {
  const doc = new DOMParser().parseFromString(orthoxml, "application/xml");
  const parseError = doc.getElementsByTagName("parsererror")[0];
  if (parseError) {
    throw new Error(`Invalid OrthoXML: ${parseError.textContent?.trim()}`);
  }
  const augmented = options.augmented ?? detectAugmented(doc);
  const queryHog = options.queryHog ?? null;

  const perSpecies: PerSpecies = {};
  const hogMetadata: HogMetadata = {};
  let queryMembers: number[] = [];
  const gene2sp: Record<number, string> = {};
  const xrefs: Record<number, string> = {};
  const orgs: string[] = [];
  let sptree: RawTreeNode | undefined;

  let parentOf: Record<string, string> = {};
  let depth = 0;
  let curSpecies = "";
  const ogStack: OrthologGroup[] = [];
  const skippedLevels = new Set<string>();
  const levelIndex: Record<string, number> = {};
  const nextIndex = (level: string) => {
    levelIndex[level] = levelIndex[level] === undefined ? 0 : levelIndex[level] + 1;
    return levelIndex[level];
  };

  const parsedTree = parseSpeciesTree(speciesTree);

  const trimSpeciesTree = (): RawTreeNode | undefined => {
    const rec = (node: RawTreeNode | undefined): RawTreeNode | undefined => {
      if (node !== undefined && node.children !== undefined) {
        const childs = node.children.map(rec).filter((c): c is RawTreeNode => c !== undefined);
        if (orgs.indexOf(node.name) >= 0) {
          // A species is named like an internal level: add it as a leaf
          // "<name> (species)" below that level.
          for (const gene in gene2sp) {
            if (gene2sp[gene] === node.name) {
              gene2sp[gene] += " (species)";
            }
          }
          orgs[orgs.indexOf(node.name)] += " (species)";
          childs.push({ name: `${node.name} (species)` });
        }
        if (childs.length === 0) {
          return undefined;
        } else if (childs.length === 1) {
          skippedLevels.add(node.name);
          return childs[0];
        }
        return { name: node.name, children: childs };
      }
      if (node && orgs.indexOf(node.name) >= 0) {
        return { name: node.name };
      }
      return undefined;
    };
    return rec(parsedTree);
  };

  const addToPerSpecies = (members: number[], level: string, idx: number) => {
    for (const member of members) {
      const sp = gene2sp[member];
      const spObj = (perSpecies[sp] ??= {});
      const levObj = (spObj[level] ??= []);
      while (levObj.length <= idx) {
        levObj.push([]);
      }
      levObj[idx].push(member);
    }
  };

  const lineage = (gene: number): string[] => {
    const sp = gene2sp[gene];
    const lin = [sp];
    let parent = parentOf[sp];
    while (parent !== undefined) {
      lin.push(parent);
      parent = parentOf[parent];
    }
    return lin;
  };

  const mrca = (members: number[]): string => {
    const lin = lineage(members[0]);
    const cnts = lin.map(() => 0);
    for (const member of members) {
      const ca = lineage(member).findIndex((x) => lin.indexOf(x) >= 0);
      for (let x = ca; x < lin.length; x++) {
        cnts[x]++;
      }
    }
    return lin[cnts.indexOf(members.length)];
  };

  const addLevelsForSingleSpeciesHogs = (og: OrthologGroup) => {
    for (const sp of Object.keys(og.speciesSublevels)) {
      if (sp === og.lev) {
        continue;
      }
      const spMemb = og.speciesSublevels[sp];
      let levNode = parentOf[sp];
      while (levNode !== undefined && levNode !== og.lev) {
        addToPerSpecies(spMemb, levNode, nextIndex(levNode));
        levNode = parentOf[levNode];
      }
    }
  };

  const openTag = (el: Element) => {
    const top = ogStack[ogStack.length - 1];
    switch (el.localName) {
      case "species":
        curSpecies = el.getAttribute("name") ?? "";
        orgs.push(curSpecies);
        break;
      case "gene": {
        const geneId = parseInt(el.getAttribute("id") ?? "", 10);
        gene2sp[geneId] = curSpecies;
        xrefs[geneId] = el.getAttribute("protId") ?? "";
        break;
      }
      case "geneRef": {
        const geneId = parseInt(el.getAttribute("id") ?? "", 10);
        top.memb.push(geneId);
        if (!augmented) {
          const sp = gene2sp[geneId];
          addToPerSpecies([geneId], sp, nextIndex(sp));
          (top.speciesSublevels[sp] ??= []).push(geneId);
        } else {
          const metadata: Record<string, string> = {};
          for (const item of ogStack) {
            metadata[String(item.lev)] = item.hogId as string;
          }
          hogMetadata[geneId] = metadata;
        }
        break;
      }
      case "orthologGroup": {
        const og: OrthologGroup = { memb: [], speciesSublevels: {} };
        if (augmented) {
          og.hogId = el.getAttribute("id") ?? undefined;
        }
        depth += 1;
        ogStack.push(og);
        break;
      }
      case "property":
        if (el.getAttribute("name") === "TaxRange" && top) {
          top.lev = el.getAttribute("value") ?? undefined;
        }
        break;
      case "groups":
        sptree = trimSpeciesTree();
        parentOf = extractParentRelations(sptree);
        break;
    }
  };

  const closeTag = (el: Element) => {
    if (el.localName !== "orthologGroup") {
      return;
    }
    const og = ogStack.pop()!;
    if (og.hogId && queryHog === og.hogId) {
      queryMembers = og.memb.slice();
    }
    if (og.lev === undefined) {
      og.lev = mrca(og.memb);
    }
    if (!skippedLevels.has(og.lev)) {
      addToPerSpecies(og.memb, og.lev, nextIndex(og.lev));
      addLevelsForSingleSpeciesHogs(og);
    }
    depth -= 1;
    if (depth > 0) {
      const prev = ogStack[ogStack.length - 1];
      prev.memb.push(...og.memb);
      if (!augmented) {
        // add intermediate levels that have no explicit group
        let levNode = parentOf[og.lev];
        while (levNode !== undefined && levNode !== prev.lev) {
          addToPerSpecies(og.memb, levNode, nextIndex(levNode));
          levNode = parentOf[levNode];
        }
      }
    }
  };

  const walk = (el: Element) => {
    openTag(el);
    for (const child of Array.from(el.children)) {
      walk(child);
    }
    closeTag(el);
  };
  walk(doc.documentElement);

  // sort members and pad every level to the same number of HOGs
  for (const sp of Object.keys(perSpecies)) {
    const spObj = perSpecies[sp];
    for (const tax of Object.keys(spObj)) {
      for (const hog of spObj[tax]) {
        hog.sort();
      }
      while (levelIndex[tax] >= spObj[tax].length) {
        spObj[tax].push([]);
      }
    }
  }

  if (!sptree) {
    throw new Error("OrthoXML contains no <groups> element");
  }
  return {
    perSpecies,
    hogMetadata,
    queryMembers,
    tree: ladderize(sptree),
    xrefs,
    augmented,
  };
}

/**
 * OMA's augmented OrthoXML has an `id` and a `taxonId` on every orthologGroup;
 * plain OrthoXML at most has an id on the top-level groups.
 */
function detectAugmented(doc: Document): boolean {
  const groups = Array.from(doc.getElementsByTagNameNS("*", "orthologGroup"));
  return groups.length > 0 && groups.every((g) => g.hasAttribute("id") && g.hasAttribute("taxonId"));
}
