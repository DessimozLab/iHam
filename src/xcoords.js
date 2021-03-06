module.exports = function(arr, maxs, current_hog_state, fam_data, is_first) {
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
  const max = d3.sum(maxs);
  arr.forEach((hog_genes, hog) => {
    if (current_hog_state.removed_hogs.indexOf(hog) === -1) {
      const hog_gene_names = [];
      hog_genes.sort();
      hog_genes.forEach(function (gene, gene_pos) {
        genes.push({
          id: gene,
          gene: fam_data[gene],
          hog: hog,
          pos: total_pos + gene_pos,
          max,
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

  let hogs = [];
  if (is_first && current_hog_state.hogs) {
    current_hog_state.hogs.forEach(hog => {
      hog.max = max;
    });
    hogs = current_hog_state.hogs;
  }


  return {
    genes: genes,
    hogs: hogs_boundaries.slice(0, -1),
    hog_groups: hogs
  };
};

