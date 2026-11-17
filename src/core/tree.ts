import type { RawTreeNode } from "./types";

/** child name -> parent name */
export function extractParentRelations(tree: RawTreeNode | undefined): Record<string, string> {
  const up: Record<string, string> = {};
  const rec = (node: RawTreeNode | undefined) => {
    if (node?.children) {
      for (const child of node.children) {
        up[child.name] = node.name;
      }
      node.children.forEach(rec);
    }
  };
  rec(tree);
  return up;
}

/** Orders children by number of leaves, then by name (in place, as iHam 1.x). */
export function ladderize(tree: RawTreeNode): RawTreeNode {
  const rec = (node: RawTreeNode): { cnts: number; data: RawTreeNode } => {
    if (!node.children) {
      return { cnts: 1, data: node };
    }
    const res = node.children.map(rec);
    res.sort((a, b) => (a.cnts !== b.cnts ? a.cnts - b.cnts : a.data.name.localeCompare(b.data.name)));
    node.children = res.map((x) => x.data);
    return { cnts: res.reduce((s, x) => s + x.cnts, 0), data: node };
  };
  return rec(tree).data;
}

/** A node of the displayed species tree. */
export interface SpeciesNode {
  id: number;
  name: string;
  parent?: SpeciesNode;
  children: SpeciesNode[];
  depth: number;
  /** names of all species (leaves) below this node, ignoring collapsing */
  leafNames: string[];
}

export function buildSpeciesTree(raw: RawTreeNode): { root: SpeciesNode; nodes: SpeciesNode[] } {
  const nodes: SpeciesNode[] = [];
  const rec = (r: RawTreeNode, parent: SpeciesNode | undefined, depth: number): SpeciesNode => {
    const node: SpeciesNode = { id: nodes.length, name: r.name ?? "", parent, children: [], depth, leafNames: [] };
    nodes.push(node);
    node.children = (r.children ?? []).map((c) => rec(c, node, depth + 1));
    node.leafNames = node.children.length ? node.children.flatMap((c) => c.leafNames) : [node.name];
    return node;
  };
  return { root: rec(raw, undefined, 0), nodes };
}

export interface LayoutNode {
  node: SpeciesNode;
  /** horizontal position in [0, 1] (root = 0, leaves = 1) */
  x: number;
  /** vertical position in rows (leaf rows are 0, 1, 2, …; internal nodes are centred on their children) */
  y: number;
  /** displayed as a leaf: real leaf or collapsed node */
  isRow: boolean;
  collapsed: boolean;
}

export interface TreeLayout {
  nodes: LayoutNode[];
  /** the displayed rows (leaves and collapsed nodes) from top to bottom */
  rows: LayoutNode[];
  links: { from: LayoutNode; to: LayoutNode }[];
}

/**
 * Cladogram layout (leaves aligned, internal nodes placed by height) of the
 * tree with collapsed subtrees shown as single rows.
 */
export function layoutTree(root: SpeciesNode, collapsed: ReadonlySet<number>): TreeLayout {
  const nodes: LayoutNode[] = [];
  const rows: LayoutNode[] = [];
  const links: { from: LayoutNode; to: LayoutNode }[] = [];

  // height = max number of edges to a displayed row
  const heights = new Map<number, number>();
  const height = (n: SpeciesNode): number => {
    const h = !n.children.length || collapsed.has(n.id) ? 0 : 1 + Math.max(...n.children.map(height));
    heights.set(n.id, h);
    return h;
  };
  const rootHeight = height(root) || 1;

  const rec = (n: SpeciesNode): LayoutNode => {
    const isCollapsed = collapsed.has(n.id) && n.children.length > 0;
    const isRow = !n.children.length || isCollapsed;
    const ln: LayoutNode = { node: n, x: 1 - heights.get(n.id)! / rootHeight, y: 0, isRow, collapsed: isCollapsed };
    nodes.push(ln);
    if (isRow) {
      ln.y = rows.length;
      rows.push(ln);
    } else {
      const kids = n.children.map(rec);
      ln.y = (kids[0].y + kids[kids.length - 1].y) / 2;
      for (const k of kids) {
        links.push({ from: ln, to: k });
      }
    }
    return ln;
  };
  rec(root);
  return { nodes, rows, links };
}
