/** Placement of the selected internal node's label in the species tree. */

export type MeasureText = (text: string) => number;

/** gap between the node marker and its label */
export const LABEL_GAP = 6;

/** font used when the requested one can't be parsed by canvas */
export const FALLBACK_FONT = "bold 12px sans-serif";

/** rough width of `text` in FALLBACK_FONT, used before mount and without canvas support (jsdom) */
export const estimateWidth: MeasureText = (text) => text.length * 7.5;

/**
 * Text width measured with a canvas in `font`; falls back to an estimate
 * without canvas support (jsdom). Canvas silently ignores a font string it
 * can't parse, so FALLBACK_FONT is set first and stays in effect then.
 */
export function textMeasurer(font: string): MeasureText {
  const ctx = typeof document !== "undefined" ? document.createElement("canvas").getContext("2d") : null;
  if (!ctx) {
    return estimateWidth;
  }
  ctx.font = FALLBACK_FONT;
  ctx.font = font;
  const cache = new Map<string, number>();
  return (text) => {
    let w = cache.get(text);
    if (w === undefined) {
      w = ctx.measureText(text).width;
      cache.set(text, w);
    }
    return w;
  };
}

/** `text`, shortened with "…" if wider than `maxWidth` */
export function fitText(text: string, maxWidth: number, measure: MeasureText): string {
  if (measure(text) <= maxWidth) {
    return text;
  }
  let lo = 0;
  let hi = text.length;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (measure(`${text.slice(0, mid).trimEnd()}…`) <= maxWidth) lo = mid;
    else hi = mid - 1;
  }
  return lo > 0 ? `${text.slice(0, lo).trimEnd()}…` : "…";
}

/**
 * Places an internal node's label above-left of the node (right-aligned to
 * it). If there is not enough room on the left, it is shifted right, but
 * never past `rightLimit` (where the leaf names start); if it is still too
 * wide, it is shortened.
 *
 * @param nodeX x of the node
 * @param leftLimit smallest x the label may start at
 * @param rightLimit largest x the label may end at
 * @returns the text and the x of its right end (relative to the node)
 */
export function placeInternalLabel(
  name: string,
  nodeX: number,
  leftLimit: number,
  rightLimit: number,
  measure: MeasureText,
): { text: string; right: number } {
  const text = fitText(name, Math.max(0, rightLimit - leftLimit), measure);
  const width = measure(text);
  const preferred = nodeX - LABEL_GAP;
  const right = Math.min(rightLimit, Math.max(preferred, leftLimit + width));
  return { text, right: right - nodeX };
}
