<script setup lang="ts">
import type { SpeciesNode } from "../core/tree";

defineProps<{
  node: SpeciesNode;
  collapsed: boolean;
  /** id of the node the view is frozen at, or null */
  frozenAt: number | null;
}>();

const emit = defineEmits<{
  toggleCollapse: [];
  freeze: [];
  unfreeze: [];
}>();
</script>

<template>
  <ul>
    <li v-if="node.children.length">
      <button type="button" class="iham-link-button" @click="emit('toggleCollapse')">
        {{ collapsed ? "Expand node" : "Collapse node" }}
      </button>
    </li>
    <li v-if="frozenAt === null">
      <button type="button" class="iham-link-button" @click="emit('freeze')">Freeze at this node</button>
    </li>
    <template v-else>
      <li>
        <button type="button" class="iham-link-button" @click="emit('unfreeze')">Unfreeze the tree</button>
      </li>
      <li v-if="frozenAt !== node.id">
        <button type="button" class="iham-link-button" @click="emit('freeze')">Re-freeze tree at this node</button>
      </li>
    </template>
    <li class="iham-muted">{{ node.leafNames.length }} species</li>
  </ul>
</template>
