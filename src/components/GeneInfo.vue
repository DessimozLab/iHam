<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { fillTemplate, type Endpoints } from "../core/links";
import type { FamGene } from "../core/types";
import { fetchJsonCached } from "../composables/useHogData";

const props = defineProps<{
  geneId: number;
  gene?: FamGene;
  xref?: string;
  endpoints: Endpoints;
}>();

interface GoTerm {
  id: string;
  name: string;
}

const crossRef = computed(() => props.gene?.xrefid ?? props.xref);
const geneLink = computed(() =>
  fillTemplate(props.endpoints.links.gene, {
    xref: crossRef.value,
    protId: props.gene?.protid,
    geneId: props.geneId,
  }),
);

const goUrl = computed(() => fillTemplate(props.endpoints.api.goAnnotations, { protId: props.gene?.protid }));
const goTerms = ref<GoTerm[] | null>(null);
const goState = ref<"idle" | "loading" | "error" | "done">("idle");

watch(
  goUrl,
  async (url) => {
    goTerms.value = null;
    if (!url) {
      goState.value = "idle";
      return;
    }
    goState.value = "loading";
    try {
      const data = await fetchJsonCached<{ GO_term: string; name: string }[]>(url);
      if (url !== goUrl.value) return;
      const seen = new Set<string>();
      goTerms.value = data
        .filter((t) => !seen.has(t.GO_term) && seen.add(t.GO_term))
        .map((t) => ({ id: t.GO_term, name: t.name }));
      goState.value = "done";
    } catch {
      if (url === goUrl.value) goState.value = "error";
    }
  },
  { immediate: true },
);

const stats = computed(() => {
  const g = props.gene;
  if (!g) return [];
  return [
    ["Protein length", g.sequence_length],
    ["GC content", typeof g.gc_content === "number" ? g.gc_content.toFixed(3) : undefined],
    ["Exons", g.nr_exons],
  ].filter(([, v]) => v !== undefined && v !== null) as [string, string | number][];
});
</script>

<template>
  <dl>
    <template v-if="crossRef">
      <dt>Cross reference</dt>
      <dd>
        <a v-if="geneLink" :href="geneLink" target="_blank" rel="noopener">{{ crossRef }}</a>
        <span v-else>{{ crossRef }}</span>
      </dd>
    </template>
    <template v-for="[label, value] in stats" :key="label">
      <dt>{{ label }}</dt>
      <dd>{{ value }}</dd>
    </template>
    <template v-if="goState !== 'idle'">
      <dt>GO annotations</dt>
      <dd v-if="goState === 'loading'" class="iham-muted">loading…</dd>
      <dd v-else-if="goState === 'error'" class="iham-muted">could not be loaded</dd>
      <dd v-else-if="!goTerms?.length" class="iham-muted">none</dd>
      <dd v-else>
        <ul>
          <li v-for="t in goTerms" :key="t.id">
            <span class="iham-muted">{{ t.id }}</span> {{ t.name }}
          </li>
        </ul>
      </dd>
    </template>
  </dl>
</template>
