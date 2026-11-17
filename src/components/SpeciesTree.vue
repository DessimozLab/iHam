<script setup lang="ts">
import { computed } from "vue";
import type { LayoutNode, SpeciesNode, TreeLayout } from "../core/tree";

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

function label(n: LayoutNode): string {
  const name = n.node.name.replace(/_/g, " ");
  if (n.collapsed) {
    const short = name.length > LABEL_LIMIT - 16 ? `${name.slice(0, LABEL_LIMIT - 19)}...` : name;
    return `[Collapsed taxa] ${short}`;
  }
  const isSelected = n.node.id === props.selectedId;
  if (!n.isRow && !(props.showInternalLabels && isSelected)) {
    return "";
  }
  return name.length > LABEL_LIMIT ? `${name.slice(0, LABEL_LIMIT - 3)}...` : name;
}

/** internal labels go above-left of the node unless they would be clipped at the left edge */
const labelFitsLeft = (n: LayoutNode) => px(n) - label(n).length * 7.5 - 6 >= 0;

const links = computed(() =>
  props.layout.links.map(({ from, to }) => ({
    key: `${from.node.id}-${to.node.id}`,
    d: `M${px(from)},${py(from)}V${py(to)}H${px(to)}`,
  })),
);
</script>

<template>
  <svg class="iham-tree" :width="width" :height="height" role="tree" aria-label="Species tree">
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
        :class="{ 'is-internal': !n.isRow && labelFitsLeft(n) }"
        :x="n.isRow ? 9 : labelFitsLeft(n) ? -6 : 6"
        :y="n.isRow ? 0 : -7"
        :dy="n.isRow ? '0.35em' : 0"
      >
        {{ label(n) }}
      </text>
    </g>
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
.iham-tree-label.is-internal {
  text-anchor: end;
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
