let _mouse_over_node;
export const mouse_over_node = {
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
};

let _tree_node_tooltip;
export const tree_node_tooltip = {
  display: function (node, div, actions, frozen) { // actions: (on collapse / expand) and (on freeze)
    const obj = {};
    obj.header = node.node_name();
    obj.rows = [];

    // collapse / uncollapse if internal node
    if (!node.is_leaf()) {
      obj.rows.push({
        value: node.is_collapsed() ? "Expand node" : "Collapse node",
        link: function (n) {
          tree_node_tooltip.close();
          actions.on_collapse();
        },
        obj: node
      });
    }

    // There are 3 freezing possibilites:
    // "Freeze tree at this node",
    // "Unfreeze the tree",
    // "Re-freeze tree at this node"
    obj.rows.push({
      value: frozen === node.id() ? 'Unfreeze the tree' : 'Freeze at this node',
      link: function (n) {
        tree_node_tooltip.close();
        actions.on_freeze();
      },
      obj: node
    });


    _tree_node_tooltip = tooltip.list()
      .width(120)
      .id('node_click_tooltip')
      .container(div)
      .call(this, obj);
  },
  close: () => _tree_node_tooltip.close()
};

let _gene_tooltip;
export const gene_tooltip = {
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
};

let _hog_header_tooltip;
export const hog_header_tooltip = {
  display: function (hog, div) {
    const obj = {};
    obj.header = hog.name;
    obj.rows = [];
    obj.rows.push({
      value: `Number of genes: ${hog.genes.length}`
    });
    obj.rows.push({
      value: `Coverage: ${hog.coverage} %`
    });
    obj.rows.push({
      value: "Sequences (Fasta)",
      link: function () {
      }
    });
    obj.rows.push({
      value: "HOGs tables",
      link: function () {
      }
    });

    _hog_header_tooltip = tooltip.list()
      .width(120)
      .id('hog_header_tooltip')
      .container(div)
      .call(this, obj);
  },
  close: () => _hog_header_tooltip.close()
};
