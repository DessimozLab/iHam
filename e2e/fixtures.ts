import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { test as base, expect, type Page } from "@playwright/test";

const fixture = (name: string) => readFileSync(resolve(import.meta.dirname, "../test/fixtures", name), "utf8");

/** OMA's P53 HOG (HOG:F0782425.2c.7a), the same data as the playground's "p53" source */
export const P53 = {
  orthoxml: fixture("p53.orthoxml"),
  speciesTree: fixture("oma_speciestree.nwk"),
  geneData: fixture("p53_famdata.json"),
};

/**
 * Answers the OMA browser requests from the fixtures (`geneData` replaces the
 * gene data response, e.g. with an error status), and fails on any other
 * external request, so that the tests don't depend on the network.
 */
export async function mockOma(page: Page, { geneDataStatus = 200 } = {}) {
  await page.route(
    (url) => url.protocol.startsWith("http") && url.hostname !== "localhost",
    (route) => {
      const url = new URL(route.request().url());
      if (url.hostname === "omabrowser.org") {
        if (url.pathname.includes("/orthoxml/")) return route.fulfill({ body: P53.orthoxml, contentType: "text/plain" });
        if (url.pathname.endsWith("speciestree.nwk")) return route.fulfill({ body: P53.speciesTree, contentType: "text/plain" });
        if (url.pathname.startsWith("/api/protein/") && url.pathname.endsWith("/gene_ontology/")) {
          return route.fulfill({ json: [{ GO_term: "GO:0003700", name: "DNA-binding transcription factor activity" }] });
        }
        if (url.pathname.startsWith("/oma/hogdata/")) {
          return geneDataStatus === 200
            ? route.fulfill({ body: P53.geneData, contentType: "application/json" })
            : route.fulfill({ status: geneDataStatus, body: "" });
        }
      }
      return route.abort();
    },
  );
}

/** `test` that fails on uncaught page errors and console errors */
export const test = base.extend<{ pageErrors: string[] }>({
  pageErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      await use(errors);
      expect(errors).toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
