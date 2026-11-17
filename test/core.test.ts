import { describe, expect, it } from "vitest";
import { availableSchemes, makeColorScale, QUERY_COLOR, DEFAULT_GENE_COLOR } from "../src/core/colors";
import { fillTemplate, omaEndpoints } from "../src/core/links";
import { parseNewick } from "../src/core/newick";
import { parseOrthoXml, parseSpeciesTree } from "../src/core/orthoxml";
import { buildSpeciesTree, layoutTree } from "../src/core/tree";

describe("newick / phyloXML", () => {
  it("parses quoted labels, internal names and branch lengths", () => {
    const t = parseNewick('(("Homo sapiens":0.1,"Pan troglodytes":0.2)"Homininae",Mus)Root;');
    expect(t.name).toBe("Root");
    expect(t.children![0].name).toBe("Homininae");
    expect(t.children![0].children!.map((c) => c.name)).toEqual(["Homo sapiens", "Pan troglodytes"]);
    expect(t.children![0].children![1].branch_length).toBe(0.2);
  });

  it("detects phyloXML and uses taxonomy names when clades have no name", () => {
    const xml = `<?xml version="1.0"?>
      <phyloxml xmlns="http://www.phyloxml.org"><phylogeny rooted="true">
        <clade><name>Root</name>
          <clade><taxonomy><scientific_name>Homo sapiens</scientific_name></taxonomy></clade>
          <clade><name>Mus</name></clade>
        </clade>
      </phylogeny></phyloxml>`;
    const t = parseSpeciesTree(xml);
    expect(t).toEqual({ name: "Root", children: [{ name: "Homo sapiens" }, { name: "Mus" }] });
  });
});

describe("augmented OrthoXML detection", () => {
  const xml = (groupAttrs: string[]) => `<?xml version="1.0"?>
    <orthoXML xmlns="http://orthoXML.org/2011/" version="0.3">
      <species name="A"><database name="d"><genes><gene id="1" protId="A1"/></genes></database></species>
      <species name="B"><database name="d"><genes><gene id="2" protId="B1"/></genes></database></species>
      <groups>
        <orthologGroup ${groupAttrs[0]}><property name="TaxRange" value="R"/>
          <orthologGroup ${groupAttrs[1]}><property name="TaxRange" value="R"/><geneRef id="1"/><geneRef id="2"/></orthologGroup>
        </orthologGroup>
      </groups>
    </orthoXML>`;
  const tree = "(A,B)R;";

  it("recognises OMA HOG ids with taxid suffix, with or without taxonId", () => {
    const noTaxonId = parseOrthoXml(tree, xml(['id="HOG:0000001_1"', 'id="HOG:0000001.1a_1"']), {
      queryHog: "HOG:0000001_1",
    });
    expect(noTaxonId.augmented).toBe(true);
    expect(noTaxonId.queryMembers).toEqual([1, 2]);
    expect(parseOrthoXml(tree, xml(['id="x" taxonId="1"', 'id="y" taxonId="1"'])).augmented).toBe(true);
  });

  it("treats numeric top-level ids / missing nested ids as plain OrthoXML", () => {
    expect(parseOrthoXml(tree, xml(['id="601272"', ""])).augmented).toBe(false);
    expect(parseOrthoXml(tree, xml(['id="1"', 'id="2"'])).augmented).toBe(false);
  });

  it("can be forced", () => {
    expect(parseOrthoXml(tree, xml(['id="601272"', ""]), { augmented: true }).augmented).toBe(true);
  });
});

describe("tree layout", () => {
  const raw = parseNewick("((A,B)AB,(C,(D,E)DE)CDE)R;");
  const { root, nodes } = buildSpeciesTree(raw);

  it("aligns leaves and centres parents on their children", () => {
    const layout = layoutTree(root, new Set());
    expect(layout.rows.map((r) => r.node.name)).toEqual(["A", "B", "C", "D", "E"]);
    expect(new Set(layout.rows.map((r) => r.x))).toEqual(new Set([1]));
    const ab = layout.nodes.find((n) => n.node.name === "AB")!;
    expect(ab.y).toBe(0.5);
    expect(layout.nodes.find((n) => n.node.name === "R")!.x).toBe(0);
  });

  it("shows collapsed subtrees as one row", () => {
    const cde = nodes.find((n) => n.name === "CDE")!;
    const layout = layoutTree(root, new Set([cde.id]));
    expect(layout.rows.map((r) => [r.node.name, r.collapsed])).toEqual([
      ["A", false],
      ["B", false],
      ["CDE", true],
    ]);
    expect(cde.leafNames).toEqual(["C", "D", "E"]);
  });
});

describe("link templates", () => {
  it("fills and encodes placeholders", () => {
    const { links } = omaEndpoints("https://omabrowser.org/");
    expect(fillTemplate(links.hogViewer, { hogId: "HOG:F0782425.2c", level: "Homo sapiens" })).toBe(
      "https://omabrowser.org/oma/hog/HOG%3AF0782425.2c/Homo%20sapiens/iham/",
    );
  });

  it("returns nothing when a placeholder is missing or the template is unset", () => {
    expect(fillTemplate("/oma/hog/{hogId}/{level}/", { hogId: "x" })).toBeUndefined();
    expect(fillTemplate(undefined, { hogId: "x" })).toBeUndefined();
  });

  it("refuses non-http(s) schemes", () => {
    expect(fillTemplate("javascript:alert({hogId})", { hogId: "1" })).toBeUndefined();
    expect(fillTemplate("data:text/html,{hogId}", { hogId: "1" })).toBeUndefined();
    expect(fillTemplate("http://x/{hogId}", { hogId: "1" })).toBe("http://x/1");
  });
});

describe("colour schemes", () => {
  const fam = [
    { id: 1, sequence_length: 100, gc_content: 0.4, similarity: null },
    { id: 2, sequence_length: 300, gc_content: 0.6, similarity: null },
  ];

  it("offers numeric schemes only for fields with values", () => {
    expect(availableSchemes(fam)).toEqual(["query", "sequence_length", "gc_content"]);
  });

  it("highlights query genes", () => {
    const s = makeColorScale("query", fam, (id) => id === 2);
    expect(s.color(fam[1], 2)).toBe(QUERY_COLOR);
    expect(s.color(fam[0], 1)).toBe(DEFAULT_GENE_COLOR);
    expect(s.legend).toBeUndefined();
  });

  it("scales numeric fields from red to blue with a legend", () => {
    const s = makeColorScale("sequence_length", fam, () => false);
    expect(s.legend?.domain).toEqual([100, 300]);
    expect(s.color(fam[0], 1)).toBe("rgb(255, 0, 0)");
    expect(s.color(fam[1], 2)).toBe("rgb(0, 0, 255)");
    expect(s.color(undefined, 3)).not.toMatch(/^rgb/);
  });
});
