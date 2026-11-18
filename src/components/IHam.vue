<script setup lang="ts">
import { computed, onBeforeUnmount, ref, shallowRef, toRef, watch, nextTick } from "vue";
import { availableSchemes, makeColorScale, type ColorSchemeName } from "../core/colors";
import { computeLevelView, computeMaxima } from "../core/levels";
import { NO_ENDPOINTS, omaEndpoints, type Endpoints } from "../core/links";
import { buildSpeciesTree, cladeRows, layoutTree, type SpeciesNode } from "../core/tree";
import type { GeneCell, HogColumn } from "../core/types";
import type { IHamEvents, IHamMethods, IHamProps } from "./props";
import { useHogData } from "../composables/useHogData";
import GeneInfo from "./GeneInfo.vue";
import HogHeader from "./HogHeader.vue";
import HogInfo from "./HogInfo.vue";
import HogMatrix from "./HogMatrix.vue";
import IHamPopover from "./IHamPopover.vue";
import IHamToolbar from "./IHamToolbar.vue";
import NodeMenu from "./NodeMenu.vue";
import SpeciesTree from "./SpeciesTree.vue";


const props = withDefaults(defineProps<IHamProps>(), {
  augmented: undefined,
  coverageThreshold: 0,
  colorScheme: "query",
  tooltipTrigger: "click",
  toolbar: "open",
  preset: "none",
  baseUrl: "",
  treeWidth: 330,
  rowHeight: 20,
  height: "80vh",
  showInternalLabels: true,
});

const emit = defineEmits<IHamEvents>();

const CELL = 16;
const HEADER = 30;

// ---- data ----------------------------------------------------------------
const source = computed(() => ({
  orthoxml: props.orthoxml,
  orthoxmlUrl: props.orthoxmlUrl,
  speciesTree: props.speciesTree,
  speciesTreeUrl: props.speciesTreeUrl,
  famData: props.famData,
  famDataUrl: props.famDataUrl,
  augmented: props.augmented,
  queryHog: props.queryHog,
}));
const { parsed, famData, famMap, loading, phase, error, famError } = useHogData(source);

const tree = computed(() => (parsed.value ? buildSpeciesTree(parsed.value.tree) : null));
const nodeByName = computed(() => new Map(tree.value?.nodes.map((n) => [n.name, n]) ?? []));
const maxima = computed(() => (parsed.value ? computeMaxima(parsed.value.perSpecies) : {}));

watch(parsed, (p) => {
  if (p && tree.value) {
    emit("loaded", {
      species: tree.value.root.leafNames.length,
      genes: Object.keys(p.xrefs).length,
      augmented: p.augmented,
    });
  }
});
watch(error, (e) => e && emit("error", e));

// ---- state ---------------------------------------------------------------
const selected = shallowRef<SpeciesNode | null>(null);
const frozenAt = ref<number | null>(null);
const collapsed = ref<Set<number>>(new Set());
const threshold = ref(props.coverageThreshold);
const scheme = ref<ColorSchemeName>(props.colorScheme);
const trigger = ref(props.tooltipTrigger);

watch(toRef(props, "coverageThreshold"), (v) => (threshold.value = v));
watch(toRef(props, "colorScheme"), (v) => (scheme.value = v));
watch(toRef(props, "tooltipTrigger"), (v) => (trigger.value = v));

function selectNode(node: SpeciesNode, { force = false } = {}) {
  if (frozenAt.value !== null && !force) return;
  if (selected.value?.id === node.id) return;
  selected.value = node;
  emit("update:level", node.name);
  emit("node-selected", { name: node.name, id: node.id, isLeaf: !node.children.length, species: node.leafNames });
}

function nodeForLevel(level: string | undefined): SpeciesNode | undefined {
  return level ? nodeByName.value.get(level) : undefined;
}

/** select a level programmatically and scroll its rows into view */
function openAt(node: SpeciesNode) {
  selectNode(node, { force: true });
  revealPending = node.id;
  nextTick(reveal);
}

// initial level, and external level changes (v-model:level)
watch(tree, (t) => {
  collapsed.value = new Set();
  frozenAt.value = null;
  selected.value = null;
  if (t) openAt(nodeForLevel(props.level) ?? t.root);
});
watch(toRef(props, "level"), (level) => {
  const node = nodeForLevel(level);
  if (node && node.id !== selected.value?.id) openAt(node);
});

const queryIds = computed(() => {
  const ids = new Set<number>(parsed.value?.queryMembers ?? []);
  if (props.queryGene !== undefined && props.queryGene !== "") ids.add(Number(props.queryGene));
  return ids;
});

const view = computed(() => {
  const p = parsed.value;
  const t = tree.value;
  const node = selected.value;
  if (!p || !t || !node) return null;
  return computeLevelView({
    perSpecies: p.perSpecies,
    maxima: maxima.value,
    species: t.root.leafNames,
    level: node.name,
    coverageThreshold: threshold.value,
    famData: famMap.value,
    hogMetadata: p.augmented ? p.hogMetadata : null,
  });
});
watch(
  () => view.value?.removed,
  (removed, old) => {
    if (removed && removed.join() !== old?.join()) emit("hogs-removed", removed);
  },
);

const layout = computed(() => (tree.value ? layoutTree(tree.value.root, collapsed.value) : null));
const selectedRows = computed(() =>
  layout.value && selected.value ? cladeRows(layout.value, selected.value) : { start: 0, end: 0 },
);
/**
 * The HOG column markers live in the sticky header but are pushed down into
 * the (empty) row right above the selected clade, as in iHam 1. Scrolling
 * that row out of view brings them back into the header.
 */
const markerOffset = computed(() => {
  const start = selectedRows.value.start;
  if (start === 0) return 0;
  const rowCentre = HEADER + (start - 0.5) * props.rowHeight - scroll.value.top;
  return Math.max(0, Math.round(rowCentre - HEADER / 2));
});

const schemes = computed(() => availableSchemes(famData.value));
const colorScale = computed(() =>
  props.geneColors
    ? { color: props.geneColors }
    : makeColorScale(scheme.value, famData.value, (id) => queryIds.value.has(id)),
);

const endpoints = computed<Endpoints>(() => {
  const base = props.preset === "oma" ? omaEndpoints(props.baseUrl) : NO_ENDPOINTS;
  return { links: { ...base.links, ...props.links }, api: { ...base.api, ...props.api } };
});

function setThreshold(v: number) {
  threshold.value = v;
  emit("update:coverageThreshold", v);
}
function setScheme(v: ColorSchemeName) {
  scheme.value = v;
  emit("update:colorScheme", v);
}

// ---- scroll area / canvas viewport -----------------------------------------
const scroller = ref<HTMLElement | null>(null);
const rootEl = ref<HTMLElement | null>(null);
const scroll = ref({ left: 0, top: 0, width: 0, height: 0 });
let resizeObserver: ResizeObserver | undefined;

let revealPending: number | null = null;

/** centre the pending node's rows vertically in the scroll area */
function reveal() {
  const el = scroller.value;
  const ln = layout.value?.nodes.find((n) => n.node.id === revealPending);
  if (!el || !ln) return;
  revealPending = null;
  const visible = el.clientHeight - HEADER;
  el.scrollTop = Math.max(0, ln.y * props.rowHeight + props.rowHeight / 2 - visible / 2);
  measure();
}

function measure() {
  const el = scroller.value;
  if (el) {
    scroll.value = { left: el.scrollLeft, top: el.scrollTop, width: el.clientWidth, height: el.clientHeight };
  }
}
watch(scroller, (el, old) => {
  resizeObserver?.disconnect();
  old?.removeEventListener("scroll", measure);
  if (el) {
    el.addEventListener("scroll", measure, { passive: true });
    resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el);
    nextTick(() => {
      measure();
      reveal();
    });
  }
});
onBeforeUnmount(() => resizeObserver?.disconnect());

const matrixWidth = computed(() => Math.max((view.value?.totalSlots ?? 0) * CELL, 1));
const bodyHeight = computed(() => (layout.value?.rows.length ?? 0) * props.rowHeight);
const viewport = computed(() => ({
  x: scroll.value.left,
  y: scroll.value.top,
  width: Math.max(0, scroll.value.width - props.treeWidth),
  height: Math.max(0, scroll.value.height - HEADER),
}));

// ---- popovers ------------------------------------------------------------
type Popover =
  | { kind: "node"; node: SpeciesNode; x: number; y: number }
  | { kind: "gene"; cell: GeneCell; x: number; y: number; passive: boolean }
  | { kind: "hog"; column: HogColumn; level: string; x: number; y: number; title: string };

const popover = shallowRef<Popover | null>(null);
const containerWidth = ref(0);

function at(event: MouseEvent) {
  const rect = rootEl.value!.getBoundingClientRect();
  containerWidth.value = rect.width;
  // keyboard-triggered events have no coordinates: use the target's position
  if (!event.clientX && !event.clientY && event.target instanceof Element) {
    const r = event.target.getBoundingClientRect();
    return { x: r.left - rect.left + r.width / 2, y: r.bottom - rect.top };
  }
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function onNodeClick(node: SpeciesNode, event: MouseEvent) {
  popover.value = { kind: "node", node, ...at(event) };
}
function toggleCollapse(node: SpeciesNode) {
  const next = new Set(collapsed.value);
  if (next.has(node.id)) next.delete(node.id);
  else next.add(node.id);
  collapsed.value = next;
  popover.value = null;
}
function freeze(node: SpeciesNode) {
  frozenAt.value = null;
  selectNode(node, { force: true });
  frozenAt.value = node.id;
  popover.value = null;
}
function unfreeze() {
  frozenAt.value = null;
  popover.value = null;
}

function onGeneHover(cell: GeneCell | null, event: MouseEvent) {
  if (trigger.value !== "hover") return;
  popover.value = cell ? { kind: "gene", cell, passive: true, ...at(event) } : null;
}
function onGeneClick(cell: GeneCell, event: MouseEvent) {
  if (trigger.value === "click") popover.value = { kind: "gene", cell, passive: false, ...at(event) };
}
function onHogSelect(column: HogColumn, event: MouseEvent) {
  popover.value = { kind: "hog", column, level: selected.value!.name, title: column.name, ...at(event) };
}
function onHogResolved(title: string) {
  const p = popover.value;
  if (p?.kind === "hog") popover.value = { ...p, title };
}
// a popover refers to the current level's columns: close it when the level changes
watch(selected, () => {
  if (popover.value?.kind !== "node") popover.value = null;
});

const geneTitle = (cell: GeneCell) => famMap.value.get(cell.id)?.protid ?? parsed.value?.xrefs[cell.id] ?? String(cell.id);

defineExpose({
  setLevel(level: string) {
    const node = nodeForLevel(level);
    if (node) openAt(node);
    return !!node;
  },
  freeze: (level?: string) => {
    const node = level ? nodeForLevel(level) : selected.value;
    if (node) freeze(node);
  },
  unfreeze,
} satisfies IHamMethods);
</script>

<template>
  <div ref="rootEl" class="iham">
    <div v-if="error" class="iham-message iham-error" role="alert">Could not load the HOG: {{ error.message }}</div>
    <div v-else-if="loading || !view || !layout" class="iham-message" role="status">
      <template v-if="loading">
        <span class="iham-spinner" aria-hidden="true" />
        {{ phase === "processing" ? "Processing HOG…" : "Loading…" }}
      </template>
      <template v-else>No data</template>
    </div>
    <template v-else>
      <IHamToolbar
        v-if="toolbar !== 'hidden'"
        :collapsible="toolbar === 'collapsed'"
        :level="selected!.name"
        :frozen="frozenAt !== null"
        :schemes="schemes"
        :color-scheme="geneColors ? null : scheme"
        :legend="'legend' in colorScale ? colorScale.legend : undefined"
        :tooltip-trigger="trigger"
        :coverage-threshold="threshold"
        :removed-count="view.removed.length"
        @update:color-scheme="setScheme"
        @update:tooltip-trigger="trigger = $event"
        @update:coverage-threshold="setThreshold"
        @unfreeze="unfreeze"
      />
      <div v-if="famError" class="iham-message iham-warning" role="status">
        Gene data could not be loaded ({{ famError.message }}); genes are shown without their details.
      </div>
      <div ref="scroller" class="iham-scroller" :style="{ maxHeight: height }">
        <div
          class="iham-grid"
          :style="{
            gridTemplateColumns: `${treeWidth}px ${matrixWidth}px`,
            gridTemplateRows: `${HEADER}px ${bodyHeight}px`,
          }"
        >
          <div class="iham-corner" />
          <div class="iham-header-cell">
            <HogHeader
              class="iham-header-markers"
              :style="markerOffset ? { transform: `translateY(${markerOffset}px)` } : undefined"
              :columns="view.columns"
              :cell-width="CELL"
              :height="HEADER"
              :width="matrixWidth"
              :active-index="popover?.kind === 'hog' ? popover.column.index : null"
              @select="onHogSelect"
            />
          </div>
          <div class="iham-tree-cell">
            <SpeciesTree
              :layout="layout"
              :width="treeWidth"
              :row-height="rowHeight"
              :selected-id="selected?.id ?? null"
              :frozen="frozenAt !== null"
              :show-internal-labels="showInternalLabels"
              @hover="selectNode"
              @click="onNodeClick"
            />
          </div>
          <div class="iham-matrix-cell">
            <HogMatrix
              :view="view"
              :rows="layout.rows"
              :fam-map="famMap"
              :color="colorScale.color"
              :cell-width="CELL"
              :row-height="rowHeight"
              :viewport="viewport"
              :clade-rows="selectedRows"
              @gene-hover="onGeneHover"
              @gene-click="onGeneClick"
            />
          </div>
        </div>
      </div>
      <IHamPopover
        v-if="popover"
        :key="popover.kind"
        :x="popover.x"
        :y="popover.y"
        :container-width="containerWidth"
        :passive="popover.kind === 'gene' && popover.passive"
        :title="
          popover.kind === 'node' ? popover.node.name : popover.kind === 'gene' ? geneTitle(popover.cell) : popover.title
        "
        @close="popover = null"
      >
        <NodeMenu
          v-if="popover.kind === 'node'"
          :node="popover.node"
          :collapsed="collapsed.has(popover.node.id)"
          :frozen-at="frozenAt"
          @toggle-collapse="toggleCollapse(popover.node)"
          @freeze="freeze(popover.node)"
          @unfreeze="unfreeze"
        />
        <GeneInfo
          v-else-if="popover.kind === 'gene'"
          :gene-id="popover.cell.id"
          :gene="famMap.get(popover.cell.id)"
          :xref="parsed?.xrefs[popover.cell.id]"
          :endpoints="endpoints"
        />
        <HogInfo
          v-else
          :column="popover.column"
          :level="popover.level"
          :endpoints="endpoints"
          @resolved="onHogResolved"
        />
      </IHamPopover>
    </template>
  </div>
</template>

<style>
.iham {
  position: relative;
  font-family: var(--iham-font, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  color: var(--iham-fg, #222);
  background: var(--iham-bg, #fff);
  --iham-separator: #000;
}
.iham-scroller {
  overflow: auto;
  position: relative;
  border-top: 1px solid var(--iham-border, #e5e5e5);
}
.iham-grid {
  display: grid;
}
.iham-corner,
.iham-header-cell,
.iham-tree-cell {
  position: sticky;
  background: var(--iham-bg, #fff);
}
.iham-corner {
  top: 0;
  left: 0;
  z-index: 3;
}
.iham-header-cell {
  top: 0;
  z-index: 2;
  border-bottom: 1px solid var(--iham-border, #e5e5e5);
}
.iham-tree-cell {
  left: 0;
  z-index: 2;
  border-right: 1px solid var(--iham-border, #e5e5e5);
}
.iham-matrix-cell {
  position: relative;
  z-index: 1;
}
/* when pushed down over the matrix, only the markers take the pointer */
.iham-header-markers {
  pointer-events: none;
}
.iham-header-markers .iham-header-col {
  pointer-events: all;
}
.iham-message {
  padding: 16px;
  color: var(--iham-muted, #7f8c8d);
}
.iham-error {
  color: #c0392b;
}
.iham-warning {
  padding: 4px 8px;
  color: #a0522d;
}
.iham-spinner {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: iham-spin 0.8s linear infinite;
  vertical-align: -2px;
}
@keyframes iham-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
