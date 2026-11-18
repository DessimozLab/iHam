<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps<{
  x: number;
  y: number;
  title: string;
  /** hover popovers can't be interacted with and have no close button */
  passive?: boolean;
  /** width of the containing widget, to keep the popover inside it */
  containerWidth: number;
}>();

const emit = defineEmits<{ close: [] }>();
const el = ref<HTMLElement | null>(null);
const left = ref(props.x);

function place() {
  const w = el.value?.offsetWidth ?? 0;
  left.value = props.x + 12 + w > props.containerWidth ? Math.max(0, props.x - w - 12) : props.x + 12;
}

watch(() => [props.x, props.y], () => nextTick(place));
onMounted(() => {
  place();
  if (!props.passive) {
    el.value?.focus();
  }
});

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape") {
    emit("close");
  }
}
onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<template>
  <div
    ref="el"
    class="iham-popover"
    :class="{ 'is-passive': passive }"
    :style="{ left: `${left}px`, top: `${y + 8}px` }"
    role="dialog"
    :aria-label="title"
    tabindex="-1"
  >
    <div class="iham-popover-title">
      <span>{{ title }}</span>
      <button v-if="!passive" type="button" class="iham-popover-close" aria-label="Close" @click="emit('close')">×</button>
    </div>
    <div class="iham-popover-body"><slot /></div>
  </div>
</template>

<style>
.iham-popover {
  position: absolute;
  z-index: 20;
  min-width: 160px;
  max-width: 320px;
  background: var(--iham-bg, #fff);
  color: var(--iham-fg, #222);
  border: 1px solid var(--iham-border, #ddd);
  border-radius: 4px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
  font-size: 12px;
}
.iham-popover:focus {
  outline: none;
}
.iham-popover.is-passive {
  pointer-events: none;
}
.iham-popover-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 8px;
  font-weight: 600;
  background: var(--iham-popover-title-bg, #2c3e50);
  color: var(--iham-popover-title-fg, #fff);
  border-radius: 3px 3px 0 0;
  word-break: break-all;
}
.iham-popover-close {
  border: none;
  background: none;
  color: inherit;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  padding: 0 2px;
}
.iham-popover-body {
  padding: 6px 8px;
  max-height: 260px;
  overflow: auto;
}
.iham-popover-body ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.iham-popover-body li {
  padding: 2px 0;
}
.iham-popover-body a {
  color: var(--iham-link, #2a6ebb);
}
.iham-popover-body button.iham-link-button {
  border: none;
  background: none;
  padding: 2px 0;
  color: var(--iham-link, #2a6ebb);
  cursor: pointer;
  font: inherit;
  text-align: left;
}
.iham-popover-body button.iham-link-button:hover {
  text-decoration: underline;
}
.iham-popover-body dt {
  font-weight: 600;
  margin-top: 4px;
}
.iham-popover-body dd {
  margin: 0;
}
.iham-muted {
  color: var(--iham-muted, #7f8c8d);
}
</style>
