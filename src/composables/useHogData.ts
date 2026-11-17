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

/** Loads (if given as URLs) and parses the HOG data whenever a source changes. */
export function useHogData(source: Ref<HogDataSource>) {
  const parsed = shallowRef<ParsedHogs | null>(null);
  const famData = shallowRef<FamGene[]>([]);
  const loading = shallowRef(false);
  const error = shallowRef<Error | null>(null);
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
      loading.value = true;
      error.value = null;
      try {
        const [orthoxml, tree, fam] = await Promise.all([
          src.orthoxml ?? fetchText(src.orthoxmlUrl!),
          src.speciesTree ?? fetchText(src.speciesTreeUrl!),
          src.famData ?? (src.famDataUrl ? fetchText(src.famDataUrl).then((t) => JSON.parse(t) as FamGene[]) : []),
        ]);
        if (gen !== generation) {
          return;
        }
        const result = parseOrthoXml(tree, orthoxml, { augmented: src.augmented, queryHog: src.queryHog });
        famData.value = Array.isArray(fam) ? fam : [];
        parsed.value = result;
      } catch (e) {
        if (gen === generation) {
          error.value = e instanceof Error ? e : new Error(String(e));
          parsed.value = null;
        }
      } finally {
        if (gen === generation) {
          loading.value = false;
        }
      }
    },
    { immediate: true, deep: true },
  );

  const famMap = computed(() => new Map(famData.value.map((g) => [Number(g.id), g])));
  return { parsed, famData, famMap, loading, error };
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
