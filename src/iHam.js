/* global d3 */

const apijs = require('tnt.api');
const {compute_size_annotations, get_maxs} = require('./utils.js');
const hog_state = require('./hog_state');
const {hog_feature, hog_gene_feature, hog_group} = require('./features');
const {parse_orthoxml} = require('iham-parsers');
const genes_2_xcoords = require('./xcoords');
const {gene_tooltip, mouse_over_node, tree_node_tooltip, hog_header_tooltip} = require('./tooltips');

const dispatch = d3.dispatch("node_selected", "hogs_removed", "click", "updating", "updated");

function iHam() {
  // internal (non API) options
  const state = {
    highlight_condition: () => false,
  };


  let genes_feature;
  let board;
  let tree;
  let iHamVis;
  let current_opened_taxa_name = '';
  let current_opened_node = null;
  let curr_node;
  let column_coverage_threshold = 0;

  // width for tree and board
  let tree_width = 200;
  let board_width = 800;

  const min_width_tree_container = 100;
  const min_width_annot_container = 100;

  let gene_color;
  let update_nodes;

  // external options (exposed API)
  const config = {
    gene_tooltips_on: "click",
    query_gene: {},
    // data_per_species: null, // TODO: this should be called simply data?
    // tree_obj: null,
    fam_data: null,
    orthoxml: null,
    newick: null,

    // Options
    // display or not internal node label
    show_internal_labels: true,

    // Redirection url prefix for tooltip on genes
    // oma_info_url_template: '/cgi-bin/gateway.pl?f=DisplayEntry&amp;p1=',

    // text div id
    // current_level_id: 'current_level_text',
    // post_init: () => {
    // },

    frozen_node: null,

    //
    label_height: 20,
  };

  const theme = (div) => {
    const data = parse_orthoxml(config.newick, config.orthoxml);
    const data_per_species = data.per_species;
    const tree_obj = data.tree;
    const fam_data_obj = {};
    config.fam_data.forEach(gene => {
      fam_data_obj[gene.id] = {
        gc_content: gene.gc_content,
        id: gene.id,
        protid: gene.protid,
        sequence_length: gene.sequence_length,
        taxon: gene.taxon,
        xrefid: gene.xrefid
      };
    });
    d3.select(div).style("position", "relative");

    const maxs = get_maxs(data_per_species);
    const current_hog_state = new hog_state(maxs);

    gene_color = gene => {
      return (config.query_gene && gene.id === config.query_gene.id ? "#27ae60" : "#95a5a6");
    };

    // todo -30 should be define by margin variables
    // const tot_width = parseInt(d3.select(div).style('width')) - 30;
    const tot_width = board_width + tree_width;

    // Node display
    const collapsed_node = tnt.tree.node_display.triangle()
      .fill("grey")
      .size(4);

    const leaf_node = tnt.tree.node_display.circle()
      .fill("#2c3e50")
      .size(4);

    const int_node = tnt.tree.node_display.circle()
      .fill("#34495e")
      .size(4);

    const highlight_node = tnt.tree.node_display.circle()
      .fill("#e74c3c")
      .size(6);

    const node_display = tnt.tree.node_display()
      .display(function (node) {
        if (state.highlight_condition(node)) {
          highlight_node.display().call(this, node);
        } else if (node.is_collapsed()) {
          collapsed_node.display().call(this, node);
        } else if (node.is_leaf()) {
          leaf_node.display().call(this, node);
        } else if (!node.is_leaf()) {
          int_node.display().call(this, node);
        }
      });

    update_nodes = function (node) {
      dispatch.updating.call(this);

      if (config.frozen_node) {
        // board.width(compute_size_annotations(maxs, tot_width, node.node_name()));
        const removed_hogs = current_hog_state.reset_on(tree, data_per_species, current_opened_taxa_name, column_coverage_threshold, fam_data_obj);
        dispatch.hogs_removed.call(this, removed_hogs);
        board.width(board_width);
        // update_board();
        board.update();
        dispatch.updated.call(this);
        return;
      }

      // setTimeout(function () {
        curr_node = node;
        dispatch.node_selected.call(this, node);
        current_opened_node = node;
        current_opened_taxa_name = node.node_name();
        // board.width(compute_size_annotations(maxs, tot_width, node.node_name()));
        const removed_hogs = current_hog_state.reset_on(tree, data_per_species, current_opened_taxa_name, column_coverage_threshold, fam_data_obj);
        dispatch.hogs_removed.call(this, removed_hogs);
        board.width(board_width);
        // update_board();
        board.update();

        state.highlight_condition = n => node.id() === n.id();
        tree.update_nodes();
        dispatch.updated.call(this);
      // }, 0);
    };

    // Tree
    tree = tnt.tree()
      .data(tree_obj)
      .layout(tnt.tree.layout.vertical()
        // .width(Math.max(240, ~~(tot_width * 0.4)))
          .width(tree_width)
          .scale(false)
      )
      .label(tnt.tree.label.text()
        .fontsize(12)
        .height(config.label_height)
        .text(node => {
          const limit = 30;
          const data = node.data();
          if (node.is_collapsed()) {
            return `[${node.n_hidden()} hidden taxa]`;
          }
          if ((!config.show_internal_labels ||
            !state.highlight_condition(node)) &&
            data.children && data.children.length > 0) {
            return "";
          }
          if (data.name.length > limit) {
            const truncName = data.name.substr(0, limit - 3) + "...";
            return truncName.replace(/_/g, ' ');
          }
          return data.name.replace(/_/g, ' ');
        })
        .color(node => {
          if (node.is_collapsed()) {
            return 'grey';
          }
          return 'black';
        })
        .fontweight(node => {
          if (state.highlight_condition(node)) {
            return "bold";
          }
          return "normal";
        })
      )
      .on("click", function (node) {
        tree_node_tooltip.display.call(this, node, div, {
            on_collapse: () => {
              node.toggle();
              // update_nodes(node);
              iHamVis.update();
            },
            on_freeze: (action) => {
              if (action === "unfreeze") {
                config.frozen_node = null;
              } else if (action === "freeze") {
                config.frozen_node = node.id();
              } else if (action === "refreeze") {
                config.frozen_node = null;
                update_nodes(node);
                config.frozen_node = node.id();
              }
            },
          },
          config.frozen_node
        );
      })
      .on("mouseover", function (node) {
        update_nodes.call(this, node);
        // mouse_over_node.display.call(this, node, div)
      })
      .on("mouseout", function () {
        // mouse_over_node.close();
      })
      .node_display(node_display)
      .branch_color("black");

    current_opened_node = tree.root();
    current_opened_taxa_name = tree.root().node_name();
    current_hog_state.reset_on(tree, data_per_species, current_opened_taxa_name, column_coverage_threshold, fam_data_obj);

    // Board:
    board = tnt.board()
      .from(0)
      .zoom_in(1)
      .allow_drag(false)
      .to(2)
      // .width(compute_size_annotations(maxs, tot_width, current_opened_taxa_name) * (config.label_height + 2));
      .width(board_width);

    // Board's track
    genes_feature = hog_gene_feature().colors(gene_color);
    function track (leaf) {

      const sp = leaf.node_name();

      return tnt.board.track()
        .color("#FFF")
        .data(tnt.board.track.data.sync()
          .retriever(() => {
            // in case the branch is collapsed we still draw empty hogs columns
            if (leaf.is_collapsed()) {
              const random_collapse_leaf_name = leaf.get_all_leaves(true)[0].node_name();

              if (data_per_species[random_collapse_leaf_name] !== undefined) {
                const genes2Xcoords = genes_2_xcoords(data_per_species[random_collapse_leaf_name][current_opened_taxa_name], maxs[current_opened_taxa_name], current_hog_state, fam_data_obj, false);
                genes2Xcoords.genes = [];
                return genes2Xcoords;
              }
            }

            if (data_per_species[sp] === undefined) {
              return {
                genes: [],
                hogs: [],
                hog_groups: []
              };
            }

            const all_leaves = current_opened_node.get_all_leaves();
            let first_node_with_data;
            for (let i = 0; i < all_leaves.length; i++) {
              const leaf = all_leaves[i];
              if (leaf.is_collapsed()) {
                continue;
              }
              first_node_with_data = leaf;
              break;
            }

            let is_first = false;
            if (first_node_with_data) {
              is_first = first_node_with_data.node_name() === leaf.node_name();
            }
            const g2c = genes_2_xcoords(data_per_species[sp][current_opened_taxa_name], maxs[current_opened_taxa_name], current_hog_state, fam_data_obj, is_first);
            return g2c;
          })
        )
        .display(tnt.board.track.feature.composite()
          .add("genes", genes_feature
            .on("click", function (gene) {
              if (config.gene_tooltips_on === "click") {
                gene_tooltip.display.call(this, gene, div, false);
              }
            })
            .on("mouseover", function (gene) {
              if (config.gene_tooltips_on === "mouseover") {
                gene_tooltip.display.call(this, gene, div, true);
              }
            })
            .on("mouseout", function () {
              if (config.gene_tooltips_on === "mouseover") {
                gene_tooltip.close();
              }
            })
          )
          .add("hogs", hog_feature)
          .add('hog_groups', hog_group
            .on('click', function (hog) {
              hog_header_tooltip.display.call(this, hog, current_opened_taxa_name, div);
            })
          )
        )
    }


    // iHam setup
    iHamVis = tnt()
      .tree(tree)
      .board(board)
      .track(track);

    iHamVis(div);
    // update_nodes(tree.root());
    // set_widths();
  };

  apijs(theme)
    .getset(config);

  // function update_board() {
    // update the board
  // board.update();
  // }

  function set_widths() {
    if (board) {
      board.width(board_width)
        .update();
      d3.select("#tnt_tree_container_hogvis_container")
        .style("width", board_width);
    }

    if (tree) {
      tree.layout().width(tree_width);
      tree
        .update();
    }

    if (board) {
      // update_board();
      board.update();
    }
  }

  theme.board_width = function (w) {
    if (!arguments.length) {
      return board_width;
    }

    board_width = w;
    set_widths();
    return this;
  };

  theme.tree_width = function (w) {
    if (!arguments.length) {
      return tree_width;
    }

    tree_width = w;
    set_widths();
    return this;
  };

  theme.gene_colors = function (cb) {
    if (!arguments.length) {
      return gene_color;
    }
    gene_color = cb;

    genes_feature.colors(cb);
    board.width(board_width);
    // update_board();
    board.update();
    return this;
  };

  theme.coverage_threshold = function (min) {
    if (!arguments.length) {
      return column_coverage_threshold;
    }
    column_coverage_threshold = min;
    update_nodes(curr_node);
    return this;
  };

  return d3.rebind(theme, dispatch, "on");
}

module.exports = iHam;
