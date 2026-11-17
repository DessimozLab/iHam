/**
 * URL templates for links and API calls. Placeholders: {hogId}, {level},
 * {protId}, {xref}, {geneId}. Values are URL-encoded when substituted.
 * A template that is missing or empty disables that link / lookup.
 */
export interface LinkTemplates {
  /** gene cross reference link */
  gene?: string;
  hogFasta?: string;
  hogMembers?: string;
  /** re-open the viewer focused on a HOG */
  hogViewer?: string;
  hogChromosome?: string;
}

export interface ApiTemplates {
  /** returns `[{GO_term, name}, …]` */
  goAnnotations?: string;
  /** returns `{hog_id, level}`; used to resolve HOG ids when the OrthoXML is not augmented */
  hogLookup?: string;
}

export interface Endpoints {
  links: LinkTemplates;
  api: ApiTemplates;
}

export function omaEndpoints(baseUrl = ""): Endpoints {
  const b = baseUrl.replace(/\/$/, "");
  return {
    links: {
      gene: `${b}/oma/vps/{xref}/`,
      hogFasta: `${b}/oma/hog/{hogId}/{level}/fasta`,
      hogMembers: `${b}/oma/hog/{hogId}/{level}/table/`,
      hogViewer: `${b}/oma/hog/{hogId}/{level}/iham/`,
      hogChromosome: `${b}/oma/ancestralgenome/{level}/chromosome/?query={hogId}`,
    },
    api: {
      goAnnotations: `${b}/api/protein/{protId}/gene_ontology/?format=json`,
      hogLookup: `${b}/api/hog/{protId}/members/?level={level}`,
    },
  };
}

export const NO_ENDPOINTS: Endpoints = { links: {}, api: {} };

export function fillTemplate(
  template: string | undefined,
  values: Record<string, string | number | undefined>,
): string | undefined {
  if (!template) {
    return undefined;
  }
  let missing = false;
  const url = template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const v = values[key];
    if (v === undefined || v === "") {
      missing = true;
      return "";
    }
    return encodeURIComponent(String(v));
  });
  return missing || !isSafeUrl(url) ? undefined : url;
}

/** Only allow http(s) and relative URLs (no javascript:, data:, …). */
function isSafeUrl(url: string): boolean {
  const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(url);
  return !scheme || /^https?$/i.test(scheme[1]);
}
