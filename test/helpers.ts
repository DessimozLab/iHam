import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { FamGene } from "../src/core/types";

const dir = resolve(__dirname, "fixtures");
export const fixture = (name: string) => readFileSync(resolve(dir, name), "utf8");

export interface Dataset {
  name: string;
  tree: string;
  orthoxml: string;
  famData: FamGene[];
  augmented: boolean;
  queryHog?: string;
}

export const datasets: Dataset[] = [
  {
    name: "simple (plain OrthoXML)",
    tree: fixture("simple.nwk"),
    orthoxml: fixture("simple.orthoxml"),
    famData: JSON.parse(fixture("simple_famdata.json")),
    augmented: false,
  },
  {
    name: "OMA P53 HOG (augmented OrthoXML, full OMA species tree)",
    tree: fixture("oma_speciestree.nwk"),
    orthoxml: fixture("p53.orthoxml"),
    famData: JSON.parse(fixture("p53_famdata.json")),
    augmented: true,
    queryHog: "HOG:F0782425.2c.7a_207598",
  },
];
