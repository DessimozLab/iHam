export function compute_size_annotations(maxs, tot_width, taxa_name) {
  if (taxa_name === 'LUCA') {
    return ~~(tot_width * 0.6)
  }

  let max_number_square = 0;
  const arrayLength = maxs[taxa_name].length;
  for (let i = 0; i < arrayLength; i++) {
    max_number_square += maxs[taxa_name][i];
  }

  return max_number_square;

}

// get maximum number of genes per hog accross species
export function get_maxs (data) {
  const maxs = {};
  let i;
  let sp;
  let internal;
  for (sp in data) {
    if (data.hasOwnProperty(sp)) {
      const sp_data = data[sp];
      for (internal in sp_data) {
        if (maxs[internal] === undefined) {
          maxs[internal] = [];
        }
        if (sp_data.hasOwnProperty(internal)) {
          const internal_data = sp_data[internal];
          for (i = 0; i < internal_data.length; i++) {
            if ((maxs[internal][i] === undefined) ||
              (maxs[internal][i] < internal_data[i].length)) {
              maxs[internal][i] = internal_data[i].length;
            }
          }
        }
      }
    }
  }
  return maxs;
}
