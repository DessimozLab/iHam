<script setup lang="ts">
import { computed, useId } from "vue";
import { legendTicks } from "../core/colors";

const props = defineProps<{
  label: string;
  domain: [number, number];
  colors: [string, string];
}>();

const WIDTH = 200;
const gradientId = `iham-legend-${useId()}`;
const ticks = computed(() =>
  legendTicks(props.domain, 5).map((t) => ({
    value: t,
    x: ((t - props.domain[0]) / (props.domain[1] - props.domain[0])) * WIDTH,
  })),
);
const fmt = (v: number) => (Math.abs(v) < 1 && v !== 0 ? v.toFixed(2) : String(Math.round(v * 100) / 100));
</script>

<template>
  <div class="iham-legend" role="img" :aria-label="`${label} from ${fmt(domain[0])} to ${fmt(domain[1])}`">
    <span class="iham-legend-label">{{ label }}</span>
    <svg :width="WIDTH + 20" height="30">
      <defs>
        <linearGradient :id="gradientId">
          <stop offset="0" :stop-color="colors[0]" />
          <stop offset="1" :stop-color="colors[1]" />
        </linearGradient>
      </defs>
      <rect x="10" y="2" :width="WIDTH" height="10" :fill="`url(#${gradientId})`" />
      <g v-for="t in ticks" :key="t.value" :transform="`translate(${10 + t.x},12)`">
        <line y2="4" />
        <text y="14">{{ fmt(t.value) }}</text>
      </g>
    </svg>
  </div>
</template>

<style>
.iham-legend {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.iham-legend svg line {
  stroke: currentColor;
}
.iham-legend svg text {
  fill: currentColor;
  font-size: 10px;
  text-anchor: middle;
}
</style>
