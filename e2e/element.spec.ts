import type { Page } from "@playwright/test";
import type { IHamElement } from "../src/element";
import { expect, mockOma, test } from "./fixtures";

// dev/element.html: the built bundle (dist/element/iham-element.iife.js) in a
// plain page, loading the P53 HOG from omabrowser.org (answered by mockOma)

declare global {
  interface Window {
    ihamEvents: [string, unknown][];
  }
}

/** opens element.html, recording the element's events in `window.ihamEvents` */
async function openElement(page: Page, opts?: Parameters<typeof mockOma>[1]) {
  await mockOma(page, opts);
  await page.addInitScript(() => {
    window.ihamEvents = [];
    // the events don't bubble; a capturing listener still sees them
    for (const name of ["loaded", "node-selected", "update:level", "hogs-hidden", "error"]) {
      document.addEventListener(name, (e) => window.ihamEvents.push([name, (e as CustomEvent).detail]), true);
    }
  });
  await page.goto("./element.html");
}

const viewer = (page: Page) => page.locator("i-ham#viewer");
const matrix = (page: Page) => page.locator(".iham-matrix-canvas"); // locators pierce the shadow root
const events = (page: Page, name: string) =>
  page.evaluate((n) => window.ihamEvents.filter(([e]) => e === n).map(([, d]) => d), name);
const call = <T>(page: Page, fn: (el: IHamElement) => T) =>
  viewer(page).evaluate(fn as (el: Element) => T);

test("loads, styles its shadow root and reports `loaded`", async ({ page }) => {
  await openElement(page);
  await expect(matrix(page)).toHaveAttribute("aria-label", /HOGs at Homininae$/);
  expect(await events(page, "loaded")).toEqual([{ species: 108, genes: 130, augmented: true }]);
  // host attributes stay on the host
  await expect(page.locator("i-ham .iham")).not.toHaveAttribute("id", /./);
  // the component styles are inlined into the shadow root
  await expect(page.locator(".iham-tree")).toHaveCSS("display", "block");
  await expect(page.locator(".iham-tree-internal-label")).toHaveCSS("font-weight", "700");
});

test("setLevel, freeze and unfreeze", async ({ page }) => {
  await openElement(page);
  await expect(matrix(page)).toHaveAttribute("aria-label", /Homininae$/);

  expect(await call(page, (el) => el.setLevel("Primates"))).toBe(true);
  await expect(matrix(page)).toHaveAttribute("aria-label", /HOGs at Primates$/);
  expect(await events(page, "update:level")).toEqual(["Homininae", "Primates"]);
  expect(await call(page, (el) => el.setLevel("No such level"))).toBe(false);

  await call(page, (el) => el.freeze());
  await page.getByRole("treeitem", { name: "Homininae", exact: true }).hover();
  await expect(matrix(page)).toHaveAttribute("aria-label", /Primates$/);

  await call(page, (el) => el.unfreeze());
  await page.getByRole("treeitem", { name: "Hominidae", exact: true }).hover();
  await expect(matrix(page)).toHaveAttribute("aria-label", /HOGs at Hominidae$/);
});

test("level and settings attributes follow the viewer, so setting them always takes effect", async ({ page }) => {
  await openElement(page);
  await expect(matrix(page)).toHaveAttribute("aria-label", /Homininae$/);
  await page.getByRole("treeitem", { name: "Primates", exact: true }).hover();
  await expect(viewer(page)).toHaveAttribute("level", "Primates");
  expect(await call(page, (el) => el.level)).toBe("Primates");

  // back to the level it was opened at
  await call(page, (el) => el.setAttribute("level", "Homininae"));
  await expect(matrix(page)).toHaveAttribute("aria-label", /HOGs at Homininae$/);

  // the toolbar's settings too
  await page.locator(".iham-toolbar select").last().selectOption("hover");
  await expect(viewer(page)).toHaveAttribute("tooltip-trigger", "hover");
});

test("still shows the HOGs when the gene data fails to load", async ({ page, pageErrors }) => {
  await openElement(page, { geneDataStatus: 403 });
  await expect(matrix(page)).toHaveAttribute("aria-label", /HOGs at Homininae$/);
  await expect(page.locator(".iham-warning")).toContainText("403");
  expect(await events(page, "error")).toEqual([]);
  // the browser logs the failed request itself
  pageErrors.splice(0, pageErrors.length, ...pageErrors.filter((e) => !/403/.test(e)));
});
