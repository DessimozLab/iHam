import type { RawTreeNode } from "./types";

/**
 * Minimal phyloXML reader: returns the first phylogeny's root clade. A clade's
 * name is its <name>, falling back to its taxonomy's <scientific_name>.
 */
export function parsePhyloXml(xml: string): RawTreeNode {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  const error = doc.getElementsByTagName("parsererror")[0];
  if (error) {
    throw new Error(`Invalid phyloXML: ${error.textContent?.trim()}`);
  }
  const phylogeny = firstChild(doc.documentElement, "phylogeny") ?? doc.documentElement;
  const root = firstChild(phylogeny, "clade");
  if (!root) {
    throw new Error("phyloXML contains no clade");
  }
  return convertClade(root);
}

function convertClade(clade: Element): RawTreeNode {
  const node = {} as RawTreeNode;
  const name = firstChild(clade, "name")?.textContent?.trim();
  if (name) {
    node.name = name;
  } else {
    const taxonomy = firstChild(clade, "taxonomy");
    const sciName = taxonomy && firstChild(taxonomy, "scientific_name")?.textContent?.trim();
    if (sciName) {
      node.name = sciName;
    }
  }
  const length = firstChild(clade, "branch_length")?.textContent ?? clade.getAttribute("branch_length");
  if (length) {
    node.branch_length = parseFloat(length);
  }
  const children = childElements(clade, "clade").map(convertClade);
  if (children.length) {
    node.children = children;
  }
  return node;
}

function childElements(el: Element, localName: string): Element[] {
  return Array.from(el.children).filter((c) => c.localName === localName);
}

function firstChild(el: Element, localName: string): Element | undefined {
  return childElements(el, localName)[0];
}
