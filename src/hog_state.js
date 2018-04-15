export default function Hog_state() {

  const that = this;

  this.current_level = '';
  this.hogs = undefined;
  this.number_species = 0;
  this.removed_hogs = [];

  this.reset_on = function (tree, per_species3, tax_name, threshold) {
    that.current_level = tax_name;
    that.hogs = undefined;
    that.number_species = 0;
    that.removed_hogs = [];


    const leaves = tree.root().get_all_leaves();

    for (let i = 0; i < leaves.length; i++) {

      if (per_species3[leaves[i].property('name')] !== undefined && per_species3[leaves[i].property('name')][tax_name] !== undefined) {

        const slice = per_species3[leaves[i].property('name')][tax_name];

        if (slice && slice.length > 0) {
          that.number_species += 1;
          that.add_genes(slice);
        }
      }
    }

    if (that.hogs !== undefined) {
      for (let i = 0; i < that.hogs.length; i++) {
        const cov = that.hogs[i].number_species * 100 / that.number_species;
        if (cov >= threshold) {
          that.hogs[i].coverage = cov
        }
        else {
          that.removed_hogs.push(i)
        }
      }

      for (let i = that.removed_hogs.length - 1; i >= 0; i--) {
        that.hogs.splice(that.removed_hogs[i], 1);
      }
    }

    d3.select('.alert_remove')
      .attr('display', () => that.removed_hogs.length ? 'block': 'none');

    // if (that.removed_hogs.length > 0) {
    //   $('.alert_remove').show();}
    // else {
    //   $('.alert_remove').hide();}

  };

  this.add_genes = function (array_hogs_with_genes) {
    if (that.hogs === undefined) {
      that.hogs = [];
      for (var i = 0; i < array_hogs_with_genes.length; i++) {
        var h = {
          genes: [],
          name: `hog_${i}`,
          number_species: 0,
          max_in_hog: 0,
          coverage: 0,
          hog_pos: i,
          total_hogs: array_hogs_with_genes.length
        };

        that.hogs.push(h);
      }
    }

    for (var i = 0; i < array_hogs_with_genes.length; i++) {
      if (array_hogs_with_genes[i].length > 0) {
        that.hogs[i].genes = that.hogs[i].genes.concat(array_hogs_with_genes[i]);
        that.hogs[i].number_species += 1;
        if (that.hogs[i].max_in_hog < array_hogs_with_genes[i].length) {
          that.hogs[i].max_in_hog = array_hogs_with_genes[i].length
        }
      }
    }

  }
}

