<script setup lang="ts">
import { COLOR_SCHEMES, type ColorSchemeName } from "../core/colors";
import ColorLegend from "./ColorLegend.vue";

defineProps<{
  level: string;
  frozen: boolean;
  schemes: ColorSchemeName[];
  /** null when a custom colour function is used */
  colorScheme: ColorSchemeName | null;
  legend?: { label: string; domain: [number, number]; colors: [string, string] };
  tooltipTrigger: "click" | "hover";
  coverageThreshold: number;
  removedCount: number;
}>();

const emit = defineEmits<{
  "update:colorScheme": [value: ColorSchemeName];
  "update:tooltipTrigger": [value: "click" | "hover"];
  "update:coverageThreshold": [value: number];
  unfreeze: [];
}>();

function onCoverage(e: Event) {
  const v = Number((e.target as HTMLInputElement).value);
  emit("update:coverageThreshold", Number.isFinite(v) ? Math.min(100, Math.max(0, v)) : 0);
}
</script>

<template>
  <div class="iham-toolbar">
    <div class="iham-toolbar-level">
      Level: <strong>{{ level }}</strong>
      <span v-if="frozen" class="iham-badge">
        frozen
        <button type="button" class="iham-badge-button" @click="emit('unfreeze')">unfreeze</button>
      </span>
    </div>
    <label v-if="colorScheme !== null">
      Colour
      <select :value="colorScheme" @change="emit('update:colorScheme', ($event.target as HTMLSelectElement).value as ColorSchemeName)">
        <option v-for="s in schemes" :key="s" :value="s">{{ COLOR_SCHEMES[s].label }}</option>
      </select>
    </label>
    <label>
      Gene info on
      <select :value="tooltipTrigger" @change="emit('update:tooltipTrigger', ($event.target as HTMLSelectElement).value as 'click' | 'hover')">
        <option value="click">click</option>
        <option value="hover">hover</option>
      </select>
    </label>
    <label>
      Hide HOGs in fewer than
      <input type="number" min="0" max="100" step="10" :value="coverageThreshold" @input="onCoverage" />
      % of species
    </label>
    <span v-if="removedCount > 0" class="iham-notice" role="status">
      {{ removedCount }} {{ removedCount === 1 ? "HOG" : "HOGs" }} hidden
      <button type="button" class="iham-badge-button" @click="emit('update:coverageThreshold', 0)">show all</button>
    </span>
    <ColorLegend v-if="legend" v-bind="legend" />
  </div>
</template>

<style>
.iham-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 16px;
  padding: 6px 0 8px;
  font-size: 13px;
}
.iham-toolbar label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.iham-toolbar select,
.iham-toolbar input {
  font: inherit;
  padding: 1px 4px;
}
.iham-toolbar input[type="number"] {
  width: 4.5em;
}
.iham-toolbar-level {
  margin-right: auto;
}
.iham-badge,
.iham-notice {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 12px;
  background: var(--iham-notice-bg, #d6eaf8);
  color: var(--iham-notice-fg, #1b4f72);
}
.iham-badge-button {
  border: none;
  background: none;
  padding: 0;
  font: inherit;
  text-decoration: underline;
  color: inherit;
  cursor: pointer;
}
</style>
