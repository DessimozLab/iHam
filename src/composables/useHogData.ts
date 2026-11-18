import { computed, shallowRef, watch, type Ref } from "vue";
import { parseOrthoXml } from "../core/orthoxml";
import type { FamGene, ParsedHogs } from "../core/types";

export interface HogDataSource {
  orthoxml?: string;
  orthoxmlUrl?: string;
  speciesTree?: string;
  speciesTreeUrl?: string;
  famData?: FamGene[];
  famDataUrl?: string;
  augmented?: boolean;
  queryHog?: string;
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} while loading ${url}`);
  }
  return res.text();
}

/**
 * Resolves once the browser has had a chance to paint (two animation frames),
 * so a status change is visible before a long synchronous task. Falls back to
 * a timeout because animation frames don't fire in background tabs.
 */
function afterPaint(): Promise<void> {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, 100);
    if (typeof requestAnimationFrame === "function") {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          clearTimeout(timer);
          resolve();
        }),
      );
    }
  });
}

export type LoadPhase = "idle" | "loading" | "processing";

/** Loads (if given as URLs) and parses the HOG data whenever a source changes. */
export function useHogData(source: Ref<HogDataSource>) {
  const parsed = shallowRef<ParsedHogs | null>(null);
  const famData = shallowRef<FamGene[]>([]);
  /** "loading": fetching data; "processing": parsing (blocks the page for large HOGs) */
  const phase = shallowRef<LoadPhase>("idle");
  const loading = computed(() => phase.value !== "idle");
  const error = shallowRef<Error | null>(null);
  /** the gene data failed to load; the HOGs are shown without it */
  const famError = shallowRef<Error | null>(null);
  let generation = 0;

  watch(
    source,
    async (src) => {
      const orthoxmlGiven = src.orthoxml || src.orthoxmlUrl;
      const treeGiven = src.speciesTree || src.speciesTreeUrl;
      if (!orthoxmlGiven || !treeGiven) {
        parsed.value = null;
        return;
      }
      const gen = ++generation;
      phase.value = "loading";
      error.value = null;
      famError.value = null;
      // gene data is optional: without it, the HOGs are still shown
      let famFailure: Error | null = null;
      const famPromise: Promise<FamGene[]> = src.famData
        ? Promise.resolve(src.famData)
        : src.famDataUrl
          ? fetchText(src.famDataUrl)
              .then((t) => JSON.parse(t) as FamGene[])
              .catch((e: unknown) => {
                famFailure = e instanceof Error ? e : new Error(String(e));
                return [];
              })
          : Promise.resolve([]);
      try {
        const [orthoxml, tree, fam] = await Promise.all([
          src.orthoxml ?? fetchText(src.orthoxmlUrl!),
          src.speciesTree ?? fetchText(src.speciesTreeUrl!),
          famPromise,
        ]);
        if (gen !== generation) {
          return;
        }
        // parsing is synchronous: show "processing" before the page blocks
        phase.value = "processing";
        await afterPaint();
        if (gen !== generation) {
          return;
        }
        const result = parseOrthoXml(tree, orthoxml, { augmented: src.augmented, queryHog: src.queryHog });
        famData.value = Array.isArray(fam) ? fam : [];
        famError.value = famFailure;
        parsed.value = result;
      } catch (e) {
        if (gen === generation) {
          error.value = e instanceof Error ? e : new Error(String(e));
          parsed.value = null;
        }
      } finally {
        if (gen === generation) {
          phase.value = "idle";
        }
      }
    },
    { immediate: true, deep: true },
  );

  const famMap = computed(() => new Map(famData.value.map((g) => [Number(g.id), g])));
  return { parsed, famData, famMap, loading, phase, error, famError };
}

const jsonCache = new Map<string, Promise<unknown>>();

/** Cached JSON GET; failed requests are not cached. */
export function fetchJsonCached<T>(url: string): Promise<T> {
  let p = jsonCache.get(url);
  if (!p) {
    p = fetch(url).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    });
    p.catch(() => jsonCache.delete(url));
    jsonCache.set(url, p);
  }
  return p as Promise<T>;
}
