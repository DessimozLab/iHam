import { defineCustomElement } from "vue";
import IHamComponent from "./components/IHam.vue";
import type { IHamEvents, IHamMethods } from "./components/props";

export { omaEndpoints, fillTemplate } from "./core/links";
export type { IHamEvents, IHamMethods, IHamProps } from "./components/props";

// Vue passes every host attribute without a prop (id, class, style, …) on to
// the component's root element in the shadow root: keep them on the host only
const VueIHamElement = defineCustomElement({ ...IHamComponent, inheritAttrs: false } as typeof IHamComponent);

/** the props that the viewer changes itself (the component's v-model props) */
const SYNCED = {
  "update:level": "level",
  "update:coverageThreshold": "coverageThreshold",
  "update:colorScheme": "colorScheme",
} as const;

/** `<i-ham>` events as DOM events: `detail` is the payload */
export type IHamElementEventMap = { [K in keyof IHamEvents]: CustomEvent<IHamEvents[K][0]> };

const hyphenate = (s: string) => s.replace(/\B([A-Z])/g, "-$1").toLowerCase();
/** the component's event names, and the kebab-case aliases that Vue also dispatches */
const EVENTS = new Set(
  (
    ["update:level", "update:coverageThreshold", "update:colorScheme", "node-selected", "hogs-removed", "loaded", "error"] satisfies
      (keyof IHamEvents)[]
  ).flatMap((e) => [e, hyphenate(e)]),
);

/**
 * `<i-ham>` custom element. Attributes map to the component props in
 * kebab-case (`orthoxml-url`, `species-tree-url`, `fam-data-url`, `level`,
 * `query-hog`, `preset`, …); objects and functions (`famData`, `links`,
 * `geneColors`) are set as element properties. Component events are
 * dispatched as CustomEvents whose `detail` is the payload (every event has
 * one argument; Vue itself would pass the argument array).
 *
 * `level`, `coverageThreshold` and `colorScheme` follow the viewer (like
 * v-model): they, and their attributes, always hold the current value, so
 * setting one of them always takes effect.
 */
export class IHamElement extends VueIHamElement {
  constructor(...args: ConstructorParameters<typeof VueIHamElement>) {
    super(...args);
    for (const [event, prop] of Object.entries(SYNCED)) {
      this.addEventListener(event, (e) => {
        (this as unknown as Record<string, unknown>)[prop] = (e as CustomEvent).detail;
      });
    }
  }

  // Vue dispatches component events with `detail: [...args]`
  override dispatchEvent(event: Event): boolean {
    if (event instanceof CustomEvent && EVENTS.has(event.type) && Array.isArray(event.detail)) {
      event = new CustomEvent(event.type, { detail: event.detail[0] });
    }
    return super.dispatchEvent(event);
  }
}
export interface IHamElement extends IHamMethods {
  addEventListener<K extends keyof IHamElementEventMap>(
    type: K,
    listener: (this: IHamElement, ev: IHamElementEventMap[K]) => unknown,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener<K extends keyof IHamElementEventMap>(
    type: K,
    listener: (this: IHamElement, ev: IHamElementEventMap[K]) => unknown,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export function register(tagName = "i-ham"): void {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, tagName === "i-ham" ? IHamElement : class extends IHamElement {});
  }
}

register();

declare global {
  interface HTMLElementTagNameMap {
    "i-ham": IHamElement;
  }
}
