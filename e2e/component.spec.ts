import type { Locator, Page } from "@playwright/test";
import { expect, mockOma, test } from "./fixtures";

// The playground (dev/Playground.vue) with the P53 fixture, opened at Homininae.
async function openP53(page: Page) {
  await mockOma(page);
  await page.goto("./?source=p53");
  await expect(matrix(page)).toHaveAttribute("aria-label", /HOGs at Homininae$/);
}

const matrix = (page: Page) => page.locator(".iham-matrix-canvas");
const treeNode = (page: Page, name: string) => page.getByRole("treeitem", { name, exact: true });

/** number of canvas pixels that are not transparent */
const paintedPixels = (canvas: Locator) =>
  canvas.evaluate((c: HTMLCanvasElement) => {
    if (!c.width || !c.height) return 0;
    const { data } = c.getContext("2d")!.getImageData(0, 0, c.width, c.height);
    let n = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i]) n++;
    return n;
  });

test("draws the gene matrix", async ({ page }) => {
  await openP53(page);
  const box = await matrix(page).boundingBox();
  expect(box!.width).toBeGreaterThan(0);
  expect(box!.height).toBeGreaterThan(0);
  // drawn in the next animation frame
  await expect.poll(() => paintedPixels(matrix(page))).toBeGreaterThan(100);
});

test("hovering a tree node selects its level", async ({ page }) => {
  await openP53(page);
  await treeNode(page, "Primates").hover();
  await expect(matrix(page)).toHaveAttribute("aria-label", /HOGs at Primates$/);
  await expect(treeNode(page, "Primates")).toHaveAttribute("aria-selected", "true");
});

/**
 * Horizontal extent of an SVG text in the tree's coordinates, from the glyph
 * advances (what the label placement computes with). Bounding boxes would
 * include glyph overhang and, in WebKit, the white outline (stroke).
 */
const textExtent = (text: Locator) =>
  text.evaluate((el: SVGTextElement) => {
    const n = el.getNumberOfChars();
    const toTree = (p: DOMPoint) => p.matrixTransform(el.getCTM()!).x;
    return { left: toTree(el.getStartPositionOfChar(0)), right: toTree(el.getEndPositionOfChar(n - 1)) };
  });

test("the internal node label fits between the tree's edge and the leaf names", async ({ page }) => {
  await openP53(page);
  const leafLabels = page.locator(".iham-tree-node.is-leaf .iham-tree-label");
  const leafLeft = Math.min(...(await Promise.all((await leafLabels.all()).map(async (l) => (await textExtent(l)).left))));
  // near the leaves, and (shifted right, possibly shortened) near the root
  for (const name of ["Homininae", "Primates", "Euarchontoglires", "Eutheria"]) {
    await treeNode(page, name).hover();
    const label = page.locator(".iham-tree-internal-label");
    await expect(label).toHaveText(new RegExp(`^${name.slice(0, 3)}`));
    const { left, right } = await textExtent(label);
    expect(left).toBeGreaterThanOrEqual(-0.5);
    expect(right).toBeLessThanOrEqual(leafLeft + 0.5);
  }
});

test("pointing at the internal label keeps its node selected", async ({ page }) => {
  await openP53(page);
  await treeNode(page, "Primates").hover();
  await page.locator(".iham-tree-internal-label").hover();
  await expect(matrix(page)).toHaveAttribute("aria-label", /HOGs at Primates$/);
});

test("freezing keeps the level while hovering other nodes", async ({ page }) => {
  await openP53(page);
  await treeNode(page, "Primates").click();
  await page.getByRole("button", { name: "Freeze at this node" }).click();
  await treeNode(page, "Homininae").hover();
  await expect(matrix(page)).toHaveAttribute("aria-label", /HOGs at Primates$/);

  await treeNode(page, "Homininae").click();
  await page.getByRole("button", { name: "Unfreeze the tree" }).click();
  await treeNode(page, "Homininae").hover();
  await expect(matrix(page)).toHaveAttribute("aria-label", /HOGs at Homininae$/);
});

test("clicking a gene shows its details", async ({ page }) => {
  await openP53(page);
  // walk over the matrix until the pointer is over a gene
  const canvas = matrix(page);
  const box = (await canvas.boundingBox())!;
  let found = false;
  for (let y = 10; y < Math.min(box.height, 400) && !found; y += 20) {
    for (let x = 8; x < Math.min(box.width, 300) && !found; x += 16) {
      await page.mouse.move(box.x + x, box.y + y);
      found = await canvas.evaluate((c) => c.classList.contains("is-pointer"));
    }
  }
  expect(found).toBe(true);
  await page.mouse.down();
  await page.mouse.up();
  await expect(page.locator(".iham-popover")).toBeVisible();
  await expect(page.locator(".iham-popover")).toContainText(/[A-Z]{5}\d+/); // an OMA id
  await expect(page.locator(".iham-popover")).toContainText("DNA-binding transcription factor activity");
});
