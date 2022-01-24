(
  function (div) {
    var theme = iHam()
      .on('node_selected', function (node) {
        d3.select('#current-node')
          .text(node.node_name());
      })
      .query_gene({
        id: 12
      })
      .tree_width(500)
      .board_width(800)
        .start_opened_at("Tracheophyta")
        //.show_oma_link(true)
      .orthoxml(data.orthoxml)
      .newick(data.tree)
      .fam_data(data.fam_data);

    theme(div);
  }
)(document.getElementById('iham'));
