export default function genes_2_xcoords(arr, maxs, current_hog_state) {
  if (arr === undefined) {
    return {
      genes: [],
      hogs: []
    };
  }
  const genes = [];
  const hogs_boundaries = [];
  let total_pos = 0;
  arr.forEach((hog_genes, hog) => {
    // TODO: Put this back
    console.log('removed hogs...');
    console.log(current_hog_state.removed_hogs);
    if (current_hog_state.removed_hogs.indexOf(hog) === -1) {
      const hog_gene_names = [];
      hog_genes.sort();
      hog_genes.forEach(function (gene, gene_pos) {
        genes.push({
          id: gene,
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
  };
}
