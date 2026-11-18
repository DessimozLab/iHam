<script setup lang="ts">
import type { HogColumn } from "../core/types";

defineProps<{
  columns: HogColumn[];
  cellWidth: number;
  height: number;
  width: number;
  activeIndex: number | null;
}>();

const emit = defineEmits<{ select: [column: HogColumn, event: MouseEvent] }>();
</script>

<template>
  <svg class="iham-header" :width="width" :height="height" role="list" aria-label="HOG columns">
    <g
      v-for="c in columns"
      :key="c.index"
      class="iham-header-col"
      :class="{ 'is-active': c.index === activeIndex }"
      role="listitem"
      tabindex="0"
      :aria-label="`${c.name}: ${c.genes.length} genes, ${c.coverage.toFixed(0)}% of species`"
      :transform="`translate(${(c.start + c.maxInHog / 2) * cellWidth},${height / 2})`"
      @click="emit('select', c, $event)"
      @keydown.enter="emit('select', c, $event as unknown as MouseEvent)"
    >
      <title>{{ c.name }}</title>
      <circle r="7" />
      <text dy="0.35em">?</text>
    </g>
  </svg>
</template>

<style>
.iham-header {
  display: block;
}
.iham-header-col {
  cursor: pointer;
}
.iham-header-col circle {
  fill: var(--iham-bg, #fff);
  stroke: var(--iham-muted, #7f8c8d);
}
.iham-header-col text {
  fill: var(--iham-muted, #7f8c8d);
  font-size: 9px;
  text-anchor: middle;
  user-select: none;
}
.iham-header-col:hover circle,
.iham-header-col.is-active circle,
.iham-header-col:focus-visible circle {
  stroke: var(--iham-accent, #2c3e50);
  stroke-width: 2;
}
.iham-header-col:focus {
  outline: none;
}
</style>
