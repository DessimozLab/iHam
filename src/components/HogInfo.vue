<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { fillTemplate, type Endpoints } from "../core/links";
import type { HogColumn } from "../core/types";
import { fetchJsonCached } from "../composables/useHogData";

const props = defineProps<{
  column: HogColumn;
  level: string;
  endpoints: Endpoints;
}>();

const emit = defineEmits<{ resolved: [title: string] }>();

/** HOG id and level used for links: from augmented OrthoXML or a remote lookup. */
const resolved = ref<{ hogId: string; level: string } | null>(null);
const lookupState = ref<"idle" | "loading" | "error">("idle");

watch(
  () => [props.column, props.level] as const,
  async ([column, level]) => {
    resolved.value = column.hogId ? { hogId: column.hogId, level } : null;
    lookupState.value = "idle";
    const url = !column.hogId && fillTemplate(props.endpoints.api.hogLookup, { protId: column.protId, level });
    if (!url) return;
    lookupState.value = "loading";
    try {
      const data = await fetchJsonCached<{ hog_id: string; level: string }>(url);
      if (column !== props.column) return;
      resolved.value = { hogId: data.hog_id, level: data.level };
      lookupState.value = "idle";
      emit("resolved", data.hog_id);
    } catch {
      if (column === props.column) lookupState.value = "error";
    }
  },
  { immediate: true },
);

const links = computed(() => {
  const r = resolved.value;
  if (!r) return [];
  const v = { hogId: r.hogId, level: r.level };
  const l = props.endpoints.links;
  return [
    { label: "Sequences (FASTA)", href: fillTemplate(l.hogFasta, v) },
    { label: `Show ${r.hogId} members`, href: fillTemplate(l.hogMembers, v) },
    { label: `Set focal to ${r.hogId}`, href: fillTemplate(l.hogViewer, v) },
    { label: "Locate in chromosome viewer", href: fillTemplate(l.hogChromosome, v) },
  ].filter((x): x is { label: string; href: string } => !!x.href);
});
</script>

<template>
  <ul>
    <li>{{ column.genes.length }} {{ column.genes.length === 1 ? "gene" : "genes" }}</li>
    <li>{{ column.coverage.toFixed(2) }}% species represented</li>
    <li v-if="lookupState === 'loading'" class="iham-muted">resolving HOG…</li>
    <li v-for="l in links" :key="l.label">
      <a :href="l.href" target="_blank" rel="noopener">{{ l.label }}</a>
    </li>
  </ul>
</template>
