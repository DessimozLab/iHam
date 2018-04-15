let _mouse_over_node;
export let mouse_over_node = {
  display: function (node) {
    const obj = {
      header: "Mouse over tooltip",
      body: node.node_name()
    };
    _mouse_over_node = tooltip.plain()
      .id('node_over_tooltip')
      .width(140)
      .show_closer(false)
      .call(this, obj);
  },
  close: () => {
    _mouse_over_node.close();
  }
};

let _tree_node_tooltip;
export let tree_node_tooltip = {
  display: function (node) {
    const obj = {};
    obj.header = node.node_name();
    obj.rows = [];
    obj.rows.push({
      "label": "Unfreeze the tree",
      "value": 1
    });
    _tree_node_tooltip = tooltip.table()
      .width(250)
      .id(1);
  },
  close: () => {
    _tree_node_tooltip.close();
  }
};
