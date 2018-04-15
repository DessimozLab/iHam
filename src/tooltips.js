let _mouse_over_node;
export let mouse_over_node = {
  display: function (node) {
    const obj = {
      // header: "Mouse over tooltip",
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
  display: function (node, actions, frozen) { // actions: (on collapse / expand) and (on freeze)
    const obj = {};
    obj.header = node.node_name();
    obj.rows = [];

    // collapse / uncollapse if internal node
    if (!node.is_leaf()) {
      obj.rows.push({
        value: node.is_collapsed() ? "Expand node" : "Collapse node",
        link: function (n) {
          tree_node_tooltip.close();
          // n.toggle();
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


    _tree_node_tooltip = tooltip.table()
      .width(250)
      .id(1)
      .call(this, obj);
  },
  close: () => {
    _tree_node_tooltip.close();
  }
};
