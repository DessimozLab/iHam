const filter = (id, all) => {
  const found = all.filter(d => d.id === id);
  return found[0];
};

export default function genes_2_xcoords(arr, maxs, current_hog_state, fam_data) {
  if (arr === undefined) {
    return {
      genes: [],
      hogs: [],
      hog_groups: []
    };
  }
  const genes = [];
  const hogs_boundaries = [];
  let total_pos = 0;
  arr.forEach((hog_genes, hog) => {
    if (current_hog_state.removed_hogs.indexOf(hog) === -1) {
      const hog_gene_names = [];
      hog_genes.sort();
      hog_genes.forEach(function (gene, gene_pos) {
        genes.push({
          id: gene,
          gene: filter(gene, fam_data),
          hog: hog,
          pos: total_pos + gene_pos,
          max: d3.sum(maxs),
          max_in_hog: maxs[hog],
          pos_in_hog: gene_pos
        });
        hog_gene_names.push(gene);
      });
      total_pos += maxs[hog];
      hogs_boundaries.push({
        max: d3.sum(maxs),
        max_in_hog: total_pos,
        hog: hog,
        id: hog_gene_names.length ? hog_gene_names.join('_') : ("hog_" + hog)
      });
    }
  });

  return {
    genes: genes,
    hogs: hogs_boundaries.slice(0, -1),
    hog_groups: current_hog_state.hogs
  };
}