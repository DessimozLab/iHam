import type { RawTreeNode } from "./types";

/**
 * Newick parser with support for double-quoted labels.
 * Port of iham-parsers/src/newick.js (Jason Davies 2010, Adrian Altenhoff 2017).
 */
export function parseNewick(s: string): RawTreeNode {
  const ancestors: RawTreeNode[] = [];
  let tree = {} as RawTreeNode;
  const tokens = s.split(/(\s*;|\(|\)|,|:|"\s*)/);
  let inQuotedLabel = false;

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    if (inQuotedLabel && token !== '"') {
      tree.name = (tree.name ?? "") + token;
      continue;
    }
    token = token.trim();
    switch (token) {
      case '"':
        inQuotedLabel = !inQuotedLabel;
        break;
      case "(": {
        const subtree = {} as RawTreeNode;
        tree.children = [subtree];
        ancestors.push(tree);
        tree = subtree;
        break;
      }
      case ",": {
        const subtree = {} as RawTreeNode;
        ancestors[ancestors.length - 1].children!.push(subtree);
        tree = subtree;
        break;
      }
      case ")":
        tree = ancestors.pop()!;
        break;
      case ":":
        break;
      default: {
        const prev = tokens[i - 1];
        if (prev === ")" || prev === "(" || prev === ",") {
          tree.name = token;
        } else if (prev === ":") {
          tree.branch_length = parseFloat(token);
        }
      }
    }
  }
  return tree;
}
