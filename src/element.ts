import { defineCustomElement } from "vue";
import IHamComponent from "./components/IHam.vue";

export { omaEndpoints, fillTemplate } from "./core/links";
export type { IHamProps } from "./components/props";

/**
 * `<i-ham>` custom element. Attributes map to the component props in
 * kebab-case (`orthoxml-url`, `species-tree-url`, `fam-data-url`, `level`,
 * `query-hog`, `preset`, …); objects and functions (`famData`, `links`,
 * `geneColors`) are set as element properties. Component events are
 * dispatched as CustomEvents whose `detail` is the array of event arguments.
 */
export const IHamElement = defineCustomElement(IHamComponent);

export function register(tagName = "i-ham"): void {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, IHamElement);
  }
}

register();

declare global {
  interface HTMLElementTagNameMap {
    "i-ham": InstanceType<typeof IHamElement>;
  }
}
