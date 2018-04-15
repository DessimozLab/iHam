(
  function (div) {
    console.log(div);
    var newick = axios.get('/examples/speciestree.nwk')
      .then (tree => {
        return tree.data;
      })
    var orthoxml = axios.get('/examples/hbb.orthoxml')
      .then (orthoxml => {
        return orthoxml.data;
      });

    axios.all([orthoxml, newick])
      .then (resps => {
        var theme = iHam()
          .query_gene({
            id: 12
          });
          // .orthoxml(resps[0])
          // .newick(resps[1]);
        theme(div);
      });
    }
)(document.getElementById('iham'));
