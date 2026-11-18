<script setup lang="ts">
import { computed, ref, shallowRef } from "vue";
import { IHam, type ColorSchemeName, type GeneData } from "../src";
import simpleTree from "../test/fixtures/simple.nwk?raw";
import simpleXml from "../test/fixtures/simple.orthoxml?raw";
import simpleFam from "../test/fixtures/simple_famdata.json";
import p53Tree from "../test/fixtures/oma_speciestree.nwk?raw";
import p53Xml from "../test/fixtures/p53.orthoxml?raw";
import p53Fam from "../test/fixtures/p53_famdata.json";

type Source = "simple" | "p53" | "oma";
const params = new URLSearchParams(location.search);
const source = ref<Source>((params.get("source") as Source | null) ?? "p53");

// Live OMA data: through the dev-server proxy (omabrowser.org unless IHAM_OMA_URL
// says otherwise, see vite.config.ts), straight from omabrowser.org in the demo build
const OMA = import.meta.env.DEV ? "" : "https://omabrowser.org";
const hogId = ref(params.get("hog") ?? "HOG:F0782425.2c.7a");
const omaLevel = ref(params.get("level") ?? "Homininae");
const omaEntry = ref<string | null>(null);
const omaError = ref<string | null>(null);

async function loadOma() {
  omaError.value = null;
  omaEntry.value = null;
  try {
    const res = await fetch(`${OMA}/api/hog/${encodeURIComponent(hogId.value)}/members/`);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    omaEntry.value = data.members[0].omaid;
    level.value = omaLevel.value;
  } catch (e) {
    omaError.value = String(e);
  }
}
if (source.value === "oma") loadOma();

const level = ref<string | undefined>(params.get("level") ?? (source.value === "p53" ? "Homininae" : undefined));
const coverage = ref(0);
const scheme = ref<ColorSchemeName>("query");
const events = shallowRef<string[]>([]);
function log(msg: string) {
  events.value = [`${new Date().toLocaleTimeString()} ${msg}`, ...events.value].slice(0, 8);
}

const props = computed(() => {
  switch (source.value) {
    case "simple":
      return { orthoxml: simpleXml, speciesTree: simpleTree, geneData: simpleFam as GeneData[], queryGene: 12 };
    case "p53":
      return {
        orthoxml: p53Xml,
        speciesTree: p53Tree,
        geneData: p53Fam as GeneData[],
        queryHog: "HOG:F0782425.2c.7a_207598",
        preset: "oma" as const,
        baseUrl: "https://omabrowser.org",
      };
    case "oma":
      return omaEntry.value
        ? {
            orthoxmlUrl: `${OMA}/oma/hog/${hogId.value}/orthoxml/augmented/`,
            speciesTreeUrl: `${OMA}/All/speciestree.nwk`,
            geneDataUrl: `${OMA}/oma/hogdata/${omaEntry.value}/json`,
            preset: "oma" as const,
            baseUrl: OMA || undefined,
          }
        : {};
  }
});

function setSource(s: Source) {
  source.value = s;
  level.value = s === "p53" ? "Homininae" : undefined;
  if (s === "oma") loadOma();
}
</script>

<template>
  <section class="controls">
    <label><input type="radio" :checked="source === 'simple'" @change="setSource('simple')" /> Example (plain OrthoXML)</label>
    <label><input type="radio" :checked="source === 'p53'" @change="setSource('p53')" /> P53 fixture (augmented)</label>
    <label><input type="radio" :checked="source === 'oma'" @change="setSource('oma')" /> Live from OMA</label>
    <form v-if="source === 'oma'" @submit.prevent="loadOma">
      <input v-model="hogId" size="28" aria-label="HOG id" />
      <input v-model="omaLevel" size="14" aria-label="Level" />
      <button>Load</button>
      <span v-if="omaError" class="err">{{ omaError }}</span>
    </form>
  </section>

  <p class="state">
    v-model level: <code>{{ level }}</code> · coverage: <code>{{ coverage }}</code> · scheme: <code>{{ scheme }}</code>
  </p>

  <IHam
    v-bind="props"
    v-model:level="level"
    v-model:coverage-threshold="coverage"
    v-model:color-scheme="scheme"
    max-height="70vh"
    @loaded="(i) => log(`loaded ${i.species} species, ${i.genes} genes (augmented: ${i.augmented})`)"
    @node-selected="(n) => log(`node-selected ${n.name}`)"
    @hogs-hidden="(h) => log(`hogs-hidden at ${h.level}: ${h.hogs.length}`)"
    @error="(e) => log(`error ${e.message}`)"
  />

  <ul class="events">
    <li v-for="e in events" :key="e">{{ e }}</li>
  </ul>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  margin: 12px 0;
}
.state {
  font-size: 13px;
  color: #555;
}
.events {
  font: 12px ui-monospace, monospace;
  color: #555;
}
.err {
  color: #c0392b;
}
</style>
