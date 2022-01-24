/* global d3 */

const apijs = require('tnt.api');
const tnt = require('tntvis');
const d3 = require('d3');
const {get_maxs} = require('./utils.js');
const hog_state = require('./hog_state');
const {hog_feature, hog_gene_feature, hog_group} = require('./features');
const {parse_orthoxml} = require('iham-parsers');
const genes_2_xcoords = require('./xcoords');
const {gene_tooltip, tree_node_tooltip, hog_header_tooltip} = require('./tooltips');

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

  let gene_color;
  let update_nodes;

  // external options (exposed API)
  const config = {
    gene_tooltips_on: "click",
    query_gene: {},
    fam_data: null,
    orthoxml: null,
    newick: null,


    // Options
    // display or not internal node label
    show_internal_labels: true,

    start_opened_at: false,
    show_oma_link: false,
    remote_data: false,
    augmented_orthoxml: false,
    query_hog: false,

    frozen_node: null,

    label_height: 20,
  };

  const theme = (div) => {
    const data = parse_orthoxml(config.newick, config.orthoxml,  {augmented: config.augmented_orthoxml, query_hog: config.query_hog});
    const data_per_species = data.per_species;
    const tree_obj = data.tree;
    const fam_data_obj = {};

    var hog_metadata;
      if (config.augmented_orthoxml){
           hog_metadata = data.hog_metadata}
       else{hog_metadata = false}

       var query_members;
       if (config.augmented_orthoxml){
           query_members = data.query_members}
       else{query_members = false}


    config.fam_data.forEach(gene => {
      fam_data_obj[gene.id] = {
        gc_content: gene.gc_content,
        nr_exons: gene.nr_exons,
        id: gene.id,
        protid: gene.protid,
        sequence_length: gene.sequence_length,
        taxon: gene.taxon,
        xrefid: gene.xrefid,
        similarity: gene.similarity,
        go_terms: ""
      };
    });
    d3.select(div).style("position", "relative");

    const maxs = get_maxs(data_per_species);
    const current_hog_state = new hog_state(maxs);

    gene_color = gene => {
      if (config.query_gene && gene.id === config.query_gene.id) {
        return "#27ae60"
      }
      if (config.query_hog && $.inArray(gene.id, query_members) != -1) {
        return "#27ae60"
      }

      return "#95a5a6";
    };

    // todo -30 should be define by margin variables

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
        const removed_hogs = current_hog_state.reset_on(tree, data_per_species, current_opened_taxa_name, column_coverage_threshold, fam_data_obj, hog_metadata);
        dispatch.hogs_removed.call(this, removed_hogs);

        var w = 0;
        var i = 0, len = current_hog_state.hogs.length;
        while (i < len) {
          w += current_hog_state.hogs[i].max_in_hog * 16 ;
          i++
        }

        board.width(w);
        // update_board();
        board.update();
        dispatch.updated.call(this);
        return;
      }

      curr_node = node;
      dispatch.node_selected.call(this, node);
      current_opened_node = node;
      current_opened_taxa_name = node.node_name();
      const removed_hogs = current_hog_state.reset_on(tree, data_per_species, current_opened_taxa_name, column_coverage_threshold, fam_data_obj, hog_metadata);
      dispatch.hogs_removed.call(this, removed_hogs);

      var w = 0;
      var i = 0, len = current_hog_state.hogs.length;
      while (i < len) {
        w += current_hog_state.hogs[i].max_in_hog * 16 ;
        i++
      }

      board.width(w);
      board.update();

      state.highlight_condition = n => node.id() === n.id();
      tree.update_nodes();
      dispatch.updated.call(this);

      const collapsedIndexes = [];
      var i = 0;
      tree.root().get_all_leaves().forEach(function (leaf) {
        if (leaf.is_collapsed()) {
          collapsedIndexes.push(i);
        }
        i++;
      });
      const tracks = board.tracks();
      for (let i=0; i<collapsedIndexes.length; i++) {
        const track = tracks[collapsedIndexes[i]];
        const g = track.g;
        const g_node = g.node();
        g_node.parentNode.insertBefore(g_node, g_node.parentNode.firstChild.nextSibling);
        // g.remove();
      }
    };

    // Tree
    tree = tnt.tree()
      .data(tree_obj)
      .layout(tnt.tree.layout.vertical()
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
            if (data.name.length > limit - 16) {
              const truncName_col = data.name.substr(0, limit - 19) + "...";
              return `[Collapsed taxa] ${truncName_col.replace(/_/g, ' ')}`;
            }
            return `[Collapsed taxa] ${data.name}`;
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
      })
      .node_display(node_display)
      .branch_color("black");

    current_opened_node = tree.root();
    current_opened_taxa_name = tree.root().node_name();

    var reopen = false

    tree.root().get_all_nodes().forEach(function (node) {

      if(node.node_name() == config.start_opened_at){
        current_opened_node = node;
        current_opened_taxa_name = node.node_name();
        reopen = node


      }

    });

    current_hog_state.reset_on(tree, data_per_species, current_opened_taxa_name, column_coverage_threshold, fam_data_obj, hog_metadata);
    var w = 0;
    var i = 0, len = current_hog_state.hogs.length;
    while (i < len) {
      w += current_hog_state.hogs[i].max_in_hog * 16 ;
      i++
    }

    // Board:
    board = tnt.board()
      .from(0)
      .zoom_in(1)
      .allow_drag(false)
      .to(2)
      .width(w);

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
            for (var i = 0; i < all_leaves.length; i++) {
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
                gene_tooltip.display.call(this, gene, div, false, config.show_oma_link);
              }
            })
            .on("mouseover", function (gene) {
              if (config.gene_tooltips_on === "mouseover") {
                gene_tooltip.display.call(this, gene, div, true, config.show_oma_link);
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
              hog_header_tooltip.display.call(this, hog, current_opened_taxa_name, div, config.show_oma_link, config.remote_data, config.augmented_orthoxml);
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
    d3.select('.tnt_pane').style('fill', '#FFFFFF');

    if (reopen != false) {update_nodes.call(this, reopen);}
  };

  apijs(theme)
    .getset(config);

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
