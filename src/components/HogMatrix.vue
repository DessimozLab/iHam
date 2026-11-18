<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type { GeneColorFn } from "../core/colors";
import type { LayoutNode } from "../core/tree";
import type { GeneData, GeneCell, LevelView } from "../core/types";

/**
 * Gene matrix drawn on a canvas that only covers the visible part of the
 * scroll area; it is moved and redrawn on scroll.
 */
const props = defineProps<{
  view: LevelView;
  rows: LayoutNode[];
  geneMap: ReadonlyMap<number, GeneData>;
  color: GeneColorFn;
  cellWidth: number;
  rowHeight: number;
  /** visible area in matrix coordinates */
  viewport: { x: number; y: number; width: number; height: number };
  /** rows [start, end) of the selected clade; HOG boundaries are drawn only there */
  cladeRows: { start: number; end: number };
}>();

const emit = defineEmits<{
  geneHover: [cell: GeneCell | null, event: MouseEvent];
  geneClick: [cell: GeneCell, event: MouseEvent];
}>();

const canvas = ref<HTMLCanvasElement | null>(null);
const hovered = ref<{ cell: GeneCell; row: number } | null>(null);

const width = computed(() => Math.max(props.view.totalSlots * props.cellWidth, 1));
const height = computed(() => props.rows.length * props.rowHeight);
const box = computed(() => {
  const w = Math.max(0, Math.min(props.viewport.width, width.value));
  const h = Math.max(0, Math.min(props.viewport.height, height.value));
  return {
    x: Math.max(0, Math.min(props.viewport.x, width.value - w)),
    y: Math.max(0, Math.min(props.viewport.y, height.value - h)),
    w,
    h,
  };
});

function rowCells(r: LayoutNode): GeneCell[] {
  return r.collapsed ? [] : props.view.row(r.node.name);
}

/** first index in sorted cells with slot >= s */
function lowerBound(cells: GeneCell[], s: number): number {
  let lo = 0;
  let hi = cells.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (cells[mid].slot < s) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

let frame = 0;
function scheduleDraw() {
  if (!frame) {
    frame = requestAnimationFrame(() => {
      frame = 0;
      draw();
    });
  }
}

function draw() {
  const el = canvas.value;
  const ctx = el?.getContext("2d");
  if (!el || !ctx) {
    return;
  }
  const { x, y, w, h } = box.value;
  const dpr = window.devicePixelRatio || 1;
  const pw = Math.round(w * dpr);
  const ph = Math.round(h * dpr);
  if (el.width !== pw || el.height !== ph) {
    el.width = pw;
    el.height = ph;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  ctx.translate(-x, -y);

  const cw = props.cellWidth;
  const rh = props.rowHeight;
  const pad = Math.floor((rh - rh * 0.8) / 2);
  const firstRow = Math.max(0, Math.floor(y / rh));
  const lastRow = Math.min(props.rows.length - 1, Math.ceil((y + h) / rh));
  const firstSlot = Math.floor(x / cw);
  const lastSlot = Math.ceil((x + w) / cw);

  for (let r = firstRow; r <= lastRow; r++) {
    const cells = rowCells(props.rows[r]);
    for (let i = lowerBound(cells, firstSlot); i < cells.length && cells[i].slot <= lastSlot; i++) {
      const cell = cells[i];
      ctx.fillStyle = props.color(props.geneMap.get(cell.id), cell.id);
      ctx.fillRect(cell.slot * cw + pad, r * rh + pad, cw - 2 * pad, rh - 2 * pad);
    }
  }

  // HOG column boundaries, over the rows of the selected clade (as in iHam 1)
  const y0 = Math.max(y, props.cladeRows.start * rh);
  const y1 = Math.min(y + h, props.cladeRows.end * rh);
  ctx.strokeStyle = getComputedStyle(el).getPropertyValue("--iham-separator").trim() || "#000";
  ctx.lineWidth = 2;
  ctx.beginPath();
  const cols = props.view.columns;
  for (let i = 0; i < cols.length - 1; i++) {
    const sx = (cols[i].start + cols[i].maxInHog) * cw;
    if (y1 > y0 && sx >= x - 2 && sx <= x + w + 2) {
      ctx.moveTo(sx, y0);
      ctx.lineTo(sx, y1);
    }
  }
  ctx.stroke();

  const hv = hovered.value;
  if (hv) {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(hv.cell.slot * cw + pad - 1, hv.row * rh + pad - 1, cw - 2 * pad + 2, rh - 2 * pad + 2);
  }
}

function cellAt(event: MouseEvent): { cell: GeneCell; row: number } | null {
  const rect = canvas.value!.getBoundingClientRect();
  const mx = event.clientX - rect.left + box.value.x;
  const my = event.clientY - rect.top + box.value.y;
  const rowIdx = Math.floor(my / props.rowHeight);
  const row = props.rows[rowIdx];
  if (!row) {
    return null;
  }
  const slot = Math.floor(mx / props.cellWidth);
  const cells = rowCells(row);
  const cell = cells[lowerBound(cells, slot)];
  return cell && cell.slot === slot ? { cell, row: rowIdx } : null;
}

function onMove(event: MouseEvent) {
  const hit = cellAt(event);
  if (hit?.cell !== hovered.value?.cell) {
    hovered.value = hit;
    scheduleDraw();
  }
  emit("geneHover", hit?.cell ?? null, event);
}

function onLeave(event: MouseEvent) {
  if (hovered.value) {
    hovered.value = null;
    scheduleDraw();
  }
  emit("geneHover", null, event);
}

function onClick(event: MouseEvent) {
  const hit = cellAt(event);
  if (hit) {
    emit("geneClick", hit.cell, event);
  }
}

watch(() => [props.view, props.rows, props.color, props.geneMap, box.value, props.cladeRows], scheduleDraw);
onMounted(draw);
defineExpose({ redraw: scheduleDraw });
</script>

<template>
  <div class="iham-matrix" :style="{ width: `${width}px`, height: `${height}px` }">
    <canvas
      ref="canvas"
      class="iham-matrix-canvas"
      :class="{ 'is-pointer': hovered }"
      :style="{
        width: `${box.w}px`,
        height: `${box.h}px`,
        transform: `translate(${box.x}px, ${box.y}px)`,
      }"
      role="img"
      :aria-label="`Gene matrix: ${view.columns.length} HOGs at ${view.level}`"
      @mousemove="onMove"
      @mouseleave="onLeave"
      @click="onClick"
    />
  </div>
</template>

<style>
.iham-matrix {
  position: relative;
}
.iham-matrix-canvas {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
}
.iham-matrix-canvas.is-pointer {
  cursor: pointer;
}
</style>
