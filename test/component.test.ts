import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import IHam from "../src/components/IHam.vue";
import { datasets } from "./helpers";

// jsdom has no ResizeObserver and no canvas 2D context; the matrix simply isn't drawn.
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver;
HTMLCanvasElement.prototype.getContext = (() => null) as typeof HTMLCanvasElement.prototype.getContext;

const p53 = datasets[1];

async function mountP53(props: Record<string, unknown> = {}) {
  const wrapper = mount(IHam, {
    props: {
      orthoxml: p53.orthoxml,
      speciesTree: p53.tree,
      famData: p53.famData,
      queryHog: p53.queryHog,
      ...props,
    },
    attachTo: document.body,
  });
  await settled(wrapper);
  return wrapper;
}

/** wait until data is parsed and rendered (or failed) */
async function settled(wrapper: ReturnType<typeof mount>) {
  await vi.waitUntil(() => wrapper.find(".iham-scroller, .iham-error").exists(), { timeout: 5000 });
  await flushPromises();
  await nextTick();
}

describe("<IHam>", () => {
  it("opens at the requested level and emits loaded / update:level", async () => {
    const w = await mountP53({ level: "Homininae" });
    expect(w.find(".iham-toolbar-level strong").text()).toBe("Homininae");
    expect(w.emitted("loaded")?.[0][0]).toEqual({ species: 108, genes: 130, augmented: true });
    expect(w.emitted("update:level")?.[0]).toEqual(["Homininae"]);
    expect(w.find(".iham-tree-node.is-selected").attributes("aria-label")).toBe("Homininae");
    w.unmount();
  });

  it("falls back to the root for unknown levels", async () => {
    const w = await mountP53({ level: "Nonexistentia" });
    expect(w.find(".iham-toolbar-level strong").text()).toBe("Euteleostomi");
    w.unmount();
  });

  it("changes level on hover unless frozen", async () => {
    const w = await mountP53();
    const node = (name: string) => w.findAll(".iham-tree-node").find((n) => n.attributes("aria-label") === name)!;
    await node("Mammalia").trigger("mouseenter");
    expect(w.find(".iham-toolbar-level strong").text()).toBe("Mammalia");

    await node("Mammalia").trigger("click");
    const freeze = w.findAll(".iham-popover button").find((b) => b.text() === "Freeze at this node")!;
    await freeze.trigger("click");
    await node("Primates").trigger("mouseenter");
    expect(w.find(".iham-toolbar-level strong").text()).toBe("Mammalia");
    expect(w.find(".iham-badge").exists()).toBe(true);

    await w.find(".iham-badge button").trigger("click");
    await node("Primates").trigger("mouseenter");
    expect(w.find(".iham-toolbar-level strong").text()).toBe("Primates");
    w.unmount();
  });

  it("collapses a node into a single row", async () => {
    const w = await mountP53();
    const before = w.findAll(".iham-tree-node.is-leaf").length;
    const primates = w.findAll(".iham-tree-node").find((n) => n.attributes("aria-label") === "Primates")!;
    await primates.trigger("click");
    await w.findAll(".iham-popover button").find((b) => b.text() === "Collapse node")!.trigger("click");
    expect(w.findAll(".iham-tree-node.is-collapsed")).toHaveLength(1);
    expect(w.findAll(".iham-tree-node.is-leaf").length).toBeLessThan(before);
    w.unmount();
  });

  it("shows HOG info with OMA links from the preset", async () => {
    const w = await mountP53({ level: "Mammalia", preset: "oma", baseUrl: "https://omabrowser.org" });
    await w.find(".iham-header-col").trigger("click");
    const pop = w.find(".iham-popover");
    expect(pop.text()).toContain("100.00% species represented");
    const hrefs = pop.findAll("a").map((a) => a.attributes("href"));
    expect(hrefs).toContain("https://omabrowser.org/oma/hog/HOG%3AF0782425/Mammalia/iham/");
    expect(hrefs).toHaveLength(4);
    w.unmount();
  });

  it("has no links without a preset or templates", async () => {
    const w = await mountP53({ level: "Mammalia" });
    await w.find(".iham-header-col").trigger("click");
    expect(w.find(".iham-popover").findAll("a")).toHaveLength(0);
    w.unmount();
  });

  it("emits v-model updates from the toolbar", async () => {
    const w = await mountP53();
    await w.find('.iham-toolbar input[type="number"]').setValue("50");
    expect(w.emitted("update:coverageThreshold")?.at(-1)).toEqual([50]);
    await w.find(".iham-toolbar select").setValue("sequence_length");
    expect(w.emitted("update:colorScheme")?.at(-1)).toEqual(["sequence_length"]);
    expect(w.find(".iham-legend").exists()).toBe(true);
    w.unmount();
  });

  it("shows a processing message before the (blocking) parse", async () => {
    const w = mount(IHam, { props: { orthoxml: p53.orthoxml, speciesTree: p53.tree } });
    await flushPromises();
    await nextTick();
    expect(w.find(".iham-message").text()).toBe("Processing HOG…");
    await settled(w);
    expect(w.find(".iham-message").exists()).toBe(false);
    w.unmount();
  });

  it("reports load errors", async () => {
    const w = mount(IHam, { props: { orthoxml: "<not-xml", speciesTree: "(A,B)R;" } });
    await settled(w);
    expect(w.find(".iham-error").exists()).toBe(true);
    expect(w.emitted("error")).toBeTruthy();
    w.unmount();
  });
});
