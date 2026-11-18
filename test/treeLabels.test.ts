import { describe, expect, it } from "vitest";
import { fitText, LABEL_GAP, placeInternalLabel } from "../src/components/treeLabels";

// 10px per character
const measure = (t: string) => t.length * 10;

describe("internal node labels", () => {
  it("go left of the node when there is room", () => {
    // node at 200, label 100 wide: ends LABEL_GAP left of the node
    expect(placeInternalLabel("Mammalia10", 200, 2, 300, measure)).toEqual({ text: "Mammalia10", right: -LABEL_GAP });
  });

  it("shift right when there is not enough room on the left, never into the leaf names", () => {
    // node at 50: the label starts at the left limit and ends past the node
    const p = placeInternalLabel("Mammalia10", 50, 2, 300, measure);
    expect(50 + p.right - measure(p.text)).toBe(2);
    expect(50 + p.right).toBeLessThanOrEqual(300);
  });

  it("are shortened when wider than the whole branch area", () => {
    const p = placeInternalLabel("Mesangiospermae and friends", 50, 2, 152, measure);
    expect(p.text.endsWith("…")).toBe(true);
    expect(measure(p.text)).toBeLessThanOrEqual(150);
    const left = 50 + p.right - measure(p.text);
    expect(left).toBeGreaterThanOrEqual(2);
    expect(50 + p.right).toBeLessThanOrEqual(152);
  });

  it("fitText keeps text that fits and cuts at a word boundary without trailing spaces", () => {
    expect(fitText("short", 100, measure)).toBe("short");
    expect(fitText("ab cdefgh", 40, measure)).toBe("ab…");
    expect(fitText("abcdef", 5, measure)).toBe("…");
  });
});
