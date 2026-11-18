<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from "vue";
import type { LayoutNode, SpeciesNode, TreeLayout } from "../core/tree";
import { placeInternalLabel, textMeasurer, type MeasureText } from "./treeLabels";

const props = defineProps<{
  layout: TreeLayout;
  width: number;
  rowHeight: number;
  selectedId: number | null;
  frozen: boolean;
  showInternalLabels: boolean;
}>();

const emit = defineEmits<{
  hover: [node: SpeciesNode];
  click: [node: SpeciesNode, event: MouseEvent];
}>();

const LABEL_LIMIT = 30;
const MARGIN = 10;

const labelSpace = computed(() => Math.min(210, props.width * 0.6));
const branchWidth = computed(() => Math.max(20, props.width - labelSpace.value - MARGIN * 2));
const height = computed(() => props.layout.rows.length * props.rowHeight);

const px = (n: LayoutNode) => MARGIN + n.x * branchWidth.value;
const py = (n: LayoutNode) => n.y * props.rowHeight + props.rowHeight / 2;

const displayName = (n: LayoutNode) => n.node.name.replace(/_/g, " ");

function label(n: LayoutNode): string {
  const name = displayName(n);
  if (n.collapsed) {
    const short = name.length > LABEL_LIMIT - 16 ? `${name.slice(0, LABEL_LIMIT - 19)}...` : name;
    return `[Collapsed taxa] ${short}`;
  }
  if (!n.isRow) {
    return ""; // drawn separately, see internalLabel
  }
  return name.length > LABEL_LIMIT ? `${name.slice(0, LABEL_LIMIT - 3)}...` : name;
}

// the selected internal node's label is measured in the tree's (bold) font
const svg = ref<SVGSVGElement | null>(null);
const measure = shallowRef<MeasureText>(textMeasurer("bold 12px sans-serif"));
onMounted(() => {
  if (svg.value) {
    const cs = getComputedStyle(svg.value);
    measure.value = textMeasurer(`bold ${cs.fontSize || "12px"} ${cs.fontFamily || "sans-serif"}`);
  }
});

/**
 * Label of the selected internal node: above-left of it, shifted right when
 * there is no room, but never into the leaf names; shortened if needed.
 */
const internalLabel = computed(() => {
  if (!props.showInternalLabels) return null;
  const n = props.layout.nodes.find((x) => x.node.id === props.selectedId);
  if (!n || n.isRow) return null;
  const leafX = MARGIN + branchWidth.value;
  const { text, right } = placeInternalLabel(displayName(n), px(n), 2, leafX - 4, measure.value);
  return { text, x: px(n) + right, y: py(n) - 7 };
});

const links = computed(() =>
  props.layout.links.map(({ from, to }) => ({
    key: `${from.node.id}-${to.node.id}`,
    d: `M${px(from)},${py(from)}V${py(to)}H${px(to)}`,
  })),
);
</script>

<template>
  <svg ref="svg" class="iham-tree" :width="width" :height="height" role="tree" aria-label="Species tree">
    <g class="iham-tree-links">
      <path v-for="l in links" :key="l.key" :d="l.d" />
    </g>
    <g
      v-for="n in layout.nodes"
      :key="n.node.id"
      class="iham-tree-node"
      :class="{
        'is-selected': n.node.id === selectedId,
        'is-leaf': n.isRow && !n.collapsed,
        'is-collapsed': n.collapsed,
        'is-frozen': frozen && n.node.id === selectedId,
      }"
      :transform="`translate(${px(n)},${py(n)})`"
      role="treeitem"
      :aria-label="n.node.name"
      :aria-selected="n.node.id === selectedId"
      @mouseenter="emit('hover', n.node)"
      @click="emit('click', n.node, $event)"
    >
      <title>{{ n.node.name }}</title>
      <rect class="iham-tree-hit" x="-6" :y="-rowHeight / 2" :width="12" :height="rowHeight" />
      <path v-if="n.collapsed" class="iham-tree-marker" d="M-4,0L4,-5L4,5Z" />
      <circle v-else class="iham-tree-marker" :r="n.node.id === selectedId ? 6 : 4" />
      <text
        v-if="label(n)"
        class="iham-tree-label"
        x="9"
        dy="0.35em"
      >
        {{ label(n) }}
      </text>
    </g>
    <!-- after all nodes, so that no branch or marker is drawn over it -->
    <text
      v-if="internalLabel"
      class="iham-tree-label iham-tree-internal-label"
      :x="internalLabel.x"
      :y="internalLabel.y"
    >
      {{ internalLabel.text }}
    </text>
  </svg>
</template>

<style>
.iham-tree {
  display: block;
  font-size: 12px;
  user-select: none;
}
.iham-tree-links path {
  fill: none;
  stroke: var(--iham-tree-branch, #222);
  stroke-width: 1;
}
.iham-tree-node {
  cursor: pointer;
}
.iham-tree-hit {
  fill: transparent;
}
.iham-tree-marker {
  fill: var(--iham-tree-node, #34495e);
}
.iham-tree-node.is-leaf .iham-tree-marker {
  fill: var(--iham-tree-leaf, #2c3e50);
}
.iham-tree-node.is-collapsed .iham-tree-marker {
  fill: grey;
}
.iham-tree-node.is-selected .iham-tree-marker {
  fill: var(--iham-selected, #e74c3c);
}
.iham-tree-node.is-frozen .iham-tree-marker {
  stroke: var(--iham-selected, #e74c3c);
  stroke-width: 2;
  fill: var(--iham-bg, #fff);
}
.iham-tree-label {
  fill: var(--iham-fg, #000);
  paint-order: stroke;
  stroke: var(--iham-bg, #fff);
  stroke-width: 3px;
  stroke-linejoin: round;
}
.iham-tree-internal-label {
  text-anchor: end;
  font-weight: bold;
  pointer-events: none;
}
.iham-tree-node.is-collapsed .iham-tree-label {
  fill: grey;
}
.iham-tree-node.is-selected .iham-tree-label {
  font-weight: bold;
}
.iham-tree-node:hover .iham-tree-label {
  text-decoration: underline;
}
</style>
