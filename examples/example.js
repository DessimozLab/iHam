(
  function (div) {
    var newick = axios.get('/examples/speciestree.nwk')
      .then(tree => {
        return tree.data;
      })
    var orthoxml = axios.get('/examples/hbb.orthoxml')
      .then(orthoxml => {
        return orthoxml.data;
      });

    axios.all([orthoxml, newick])
      .then(resps => {
        var theme = iHam()
          .on('node_selected', function (node) {
            d3.select('#current-node')
              .text(node.node_name());
          })
          .query_gene({
            id: 12
          })
          .tree_width(500)
          .board_width(800);
        // .orthoxml(resps[0])
        // .newick(resps[1]);

        theme(div);
      });
  }
)(document.getElementById('iham'));
