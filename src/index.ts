import type { App } from "vue";
import IHam from "./components/IHam.vue";

export { IHam };
export type { IHamEvents, IHamMethods, IHamProps } from "./components/props";
export * from "./core";

/** Vue plugin: `app.use(IHamPlugin)` registers the global <IHam> component. */
export const IHamPlugin = {
  install(app: App) {
    app.component("IHam", IHam);
  },
};

export default IHam;
