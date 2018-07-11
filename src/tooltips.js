let _mouse_over_node;
let _tree_node_tooltip;
let _gene_tooltip;
let _hog_header_tooltip;


module.exports = {
  mouse_over_node: {
    display: function (node, div) {
      const obj = {
        body: node.node_name()
      };
      _mouse_over_node = tooltip.plain()
        .id('node_over_tooltip')
        .width(140)
        .show_closer(false)
        .container(div)
        .call(this, obj);
    },
    close: () => {
      _mouse_over_node.close();
    }
  },
  tree_node_tooltip: {
    display: function (node, div, actions, frozen) { // actions: (on collapse / expand) and (on freeze)
      const obj = {};
      obj.header = node.node_name();
      obj.rows = [];

      // collapse / uncollapse if internal node
      if (!node.is_leaf() || node.is_collapsed()) {
        obj.rows.push({
          value: node.is_collapsed() ? "Expand node" : "Collapse node",
          link: function (n) {
            _tree_node_tooltip.close();
            actions.on_collapse(n);
          },
          obj: node
        });
      }

      // There are 3 freezing possibilites:
      // "Freeze tree at this node",
      // "Unfreeze the tree",
      // "Re-freeze tree at this node"
      // If no frozen, freeze at this node
      if (!frozen) {
        obj.rows.push({
          value: 'Freeze at this node',
          link: function () {
            _tree_node_tooltip.close();
            actions.on_freeze("freeze");
          }
        })
      }
      // If frozen at other node, unfreeze and freeze here
      if (frozen && (frozen !== node.id())) {
        obj.rows.push({
          value: 'Unfreeze the tree',
          link: function () {
            _tree_node_tooltip.close();
            actions.on_freeze("unfreeze");
          }
        });
        obj.rows.push({
          value: 'Re-freeze tree at this node',
          link: function () {
            _tree_node_tooltip.close();
            actions.on_freeze("refreeze");
          }
        });
      }
      if (frozen && (frozen === node.id())) {
        obj.rows.push({
          value: 'Unfreeze the tree',
          link: function (n) {
            _tree_node_tooltip.close();
            actions.on_freeze("unfreeze");
          },
          obj: node
        });
      }


      _tree_node_tooltip = tooltip.list()
        .width(120)
        .id('node_click_tooltip')
        .container(div)
        .call(this, obj);
    },
    close: () => _tree_node_tooltip.close()
  },
  gene_tooltip: {
    display: function (gene, div, mouseover) {
      const obj = {};
      obj.header = gene.gene.protid;
      obj.rows = [];
      obj.rows.push({
        label: "Name",
        value: gene.gene.xrefid
      });

      _gene_tooltip = tooltip.table()
        .width(120)
        .id('gene_tooltip')
        .container(div);

      if (mouseover) {
        _gene_tooltip.show_closer(false);
        _gene_tooltip.id("gene_tooltip_mouseover");
      }

      _gene_tooltip.call(this, obj);
    },
    close: () => _gene_tooltip.close()
  },
  hog_header_tooltip: {
    display: function (hog, taxa_name, div, show_oma_link) { //  clement - add option to display oma links
      const obj = {};
      obj.header = hog.name;
      obj.rows = [];
      obj.rows.push({
        value: `Number of genes: ${hog.genes.length}`
      });
      obj.rows.push({
        value: `% species represented: ${hog.coverage.toFixed(2)} %` // clement -  change coverage for % species represented
      });
      if (show_oma_link) {

        obj.rows.push({
          value: `<a href="https://omabrowser.org/oma/hogs/${hog.protid}/${taxa_name.replace(" ", "%20")}/fasta" target="_blank">Sequences (Fasta)</a>`,
        });
        obj.rows.push({
          value: `<a href="https://omabrowser.org/oma/hogs/${hog.protid}/${taxa_name.replace(" ", "%20")}/" target="_blank">HOGs tables</a>`,
        });

      }

      _hog_header_tooltip = tooltip.list()
        .width(120)
        .id('hog_header_tooltip')
        .container(div)
        .call(this, obj);
    },
    close: () => _hog_header_tooltip.close()
  }
};


