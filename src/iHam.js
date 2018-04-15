/* global d3 */

import apijs from 'tnt.api';
// import parsers from 'iham-parsers';
import {compute_size_annotations, get_maxs} from './utils.js';
import {hog_feature, hog_gene_feature, hog_group} from './features';
import hog_state from './hog_state';
import genes_2_xcoords from './xcoords';
import './scss/iHam.scss';

// import axios from 'axios';
import {mouse_over_node, tree_node_tooltip} from './tooltips';

function iHam() {
  // internal (non API) options
  const state = {
    highlight_condition: () => false,
  };

  const current_hog_state = new hog_state();

  let board;
  let current_opened_taxa_name = '';
  let column_coverage_threshold = 0;

  // external options (exposed API)
  const config = {
    div_id: null,
    query_gene: {},
    data_per_species: null, // TODO: this should be called simply data?
    tree_obj: null,
    // orthoxml: null,
    // newick: null,
    pickerDiv: null, // TODO: Still don't know what is this for

    // Options
    // display or not internal node label
    show_internal_labels: true,

    // Redirection url prefix for tooltip on genes
    oma_info_url_template: '/cgi-bin/gateway.pl?f=DisplayEntry&amp;p1=',

    // text div id
    current_level_id: 'current_level_text',
    post_init: () => {
    },

    //
    label_height: 20,

    // TODO: definition?
    gene_data_vis: [
      {
        name: 'Query Gene',
        scale: 'on_off'
      },
      {
        name: "Gene Length",
        scale: "linear",
        field: "sequence_length",
        func: "color1d"
      },
      {
        name: "GC Content",
        scale: "linear",
        field: "gc_content",
        func: "color1d"
      }
    ],

    // get_fam_gene_data: function (target) {
    //   axios.get(`/oma/hogdata${this.query_gene}/json`)
    //     .then(resp => {
    //       console.log('resp...');
    //       console.log(resp);
    //       resp.data.forEach(gene => target[gene.id] = gene);
    //     });
    // }
  };

  const theme = (div) => {
    // const data = parsers.parse_orthoxml(config.newick, config.orthoxml);
    // console.log(data);
    // Mocked data for now...
    config.data_per_species = JSON.parse('{"Plasmodium falciparum (isolate 3D7)":{"Plasmodium falciparum (isolate 3D7)":[[11605],[11731]],"Eukaryota":[[11605,11731]]},"Schizosaccharomyces pombe (strain 972 / ATCC 24843)":{"Schizosaccharomyces pombe (strain 972 / ATCC 24843)":[[11028]],"Ascomycota":[[11028]],"Eukaryota":[[11028]]},"Saccharomyces cerevisiae (strain ATCC 204508 / S288c)":{"Saccharomyces cerevisiae (strain ATCC 204508 / S288c)":[[12],[5839]],"Ascomycota":[[12,5839]],"Eukaryota":[[12,5839]]}}');
    config.tree_obj = JSON.parse('{"name":"Eukaryota","children":[{"name":"Plasmodium falciparum (isolate 3D7)"},{"name":"Ascomycota","children":[{"name":"Schizosaccharomyces pombe (strain 972 / ATCC 24843)"},{"name":"Saccharomyces cerevisiae (strain ATCC 204508 / S288c)"}]}]}');

    const maxs = get_maxs(config.data_per_species);
    console.log('maxs...');
    console.log(maxs);

    const gene_color = gene => {
      return (config.query_gene && gene.id === config.query_gene.id ? "#27ae60" : "#95a5a6");
    };

    // todo -30 should be define by margin variables
    const tot_width = parseInt(d3.select(div).style('width')) - 30;

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

    function update_board() {
      // update the board
      board.update();

      // and remove all headers not belonging to top level
      const tracks = board.tracks();
      let found_first = false;
      tracks.forEach(track => {
        const header = track.g.select('.tnt_elem_hog_groups').node();
        if (header && found_first) {
          track.g.selectAll('.tnt_elem_hog_groups').remove();
        }
        if (header) {
          found_first = true;
        }
      })
    }

    function update_nodes(node) {
      current_opened_taxa_name = node.node_name();
      board.width(compute_size_annotations(maxs, tot_width, node.node_name()));
      // TODO: At this point we need to call a method to display the current level in the Helader (outside the widget)
      current_hog_state.reset_on(tree, config.data_per_species, current_opened_taxa_name, column_coverage_threshold);
      // board.update();
      update_board();
      // add_hog_header(node, current_hog_state, config);
      // add_hog_header(current_opened_taxa_name, current_hog_state, config);

      state.highlight_condition = n => node.id() === n.id();
      tree.update_nodes();
    }

    // Tree
    const tree = tnt.tree()
      .data(config.tree_obj)
      .layout(tnt.tree.layout.vertical()
        .width(Math.max(240, ~~(tot_width * 0.4)))
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
        // tree_node_tooltip.display.call(this, node);
      })
      .on("mouseover", function (node) {
        update_nodes.call(this, node);
        // mouse_over_node.display.call(this, node)
      })
      .on("mouseout", function () {
        // mouse_over_node.close();
      })
      .node_display(node_display)
      .branch_color("black");

    current_opened_taxa_name = tree.root().node_name();
    current_hog_state.reset_on(tree, config.data_per_species, current_opened_taxa_name, column_coverage_threshold);


    // Board:
    board = tnt.board()
      .from(0)
      .zoom_in(1)
      .allow_drag(false)
      .to(2)
      // .width(500) // TODO: This shouldn't be hardcoded?
      .width(compute_size_annotations(maxs, tot_width, current_opened_taxa_name) * (config.label_height + 2));
    // .max(5);

    // Board's track
    const track = function (leaf) {

      const sp = leaf.node_name();

      return tnt.board.track()
        .color("#FFF")
        .data(tnt.board.track.data.sync()
          .retriever(() => {
            // in case the branch is collapsed we still draw empty hogs columns
            if (leaf.is_collapsed()) {
              const random_collapse_leaf_name = leaf.get_all_leaves(true)[0].node_name();

              if (config.data_per_species[random_collapse_leaf_name] !== undefined) {
                const genes2Xcoords = genes_2_xcoords(config.data_per_species[random_collapse_leaf_name][current_opened_taxa_name], maxs[current_opened_taxa_name], current_hog_state);
                genes2Xcoords.genes = [];

                return genes2Xcoords;
              }

            }

            if (config.data_per_species[sp] === undefined) {
              return {
                genes: [],
                hogs: [],
                hog_groups: []
              };
            }
            return genes_2_xcoords(config.data_per_species[sp][current_opened_taxa_name], maxs[current_opened_taxa_name], current_hog_state);
          })
        )
        .display(tnt.board.track.feature.composite()
          .add("genes", hog_gene_feature(gene_color))
          .add("hogs", hog_feature)
          .add('hog_groups', hog_group)
        )
    };

    // iHam setup
    const iHamVis = tnt()
      .tree(tree)
      .board(board)
      .track(track);

    iHamVis(div);
    update_board();
  };

  const api = apijs(theme)
    .getset(config);

  return theme;
}

export default iHam;
