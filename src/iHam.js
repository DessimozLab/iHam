/* global d3 */

import apijs from 'tnt.api';
// import parsers from 'iham-parsers';
import {compute_size_annotations, get_maxs} from './utils.js';
import {hog_feature, hog_gene_feature, hog_group} from './features';
import hog_state from './hog_state';
import genes_2_xcoords from './xcoords';
import './scss/iHam.scss';
// import getBoardTrack from './track';

// import axios from 'axios';
import {gene_tooltip, mouse_over_node, tree_node_tooltip, hog_header_tooltip} from './tooltips';

const dispatch = d3.dispatch("node_selected", "hogs_removed", "click");

function iHam() {
  // internal (non API) options
  const state = {
    highlight_condition: () => false,
  };

  const current_hog_state = new hog_state();

  let genes_feature;
  let board;
  let tree;
  let iHamVis;
  let current_opened_taxa_name = '';
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
    div_id: null,
    gene_tooltips_on: "click",
    query_gene: {},
    data_per_species: null, // TODO: this should be called simply data?
    tree_obj: null,
    fam_data: null,
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

    frozen_node: null,

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
    d3.select(div).style("position", "relative");
    // const data = parsers.parse_orthoxml(config.newick, config.orthoxml);
    // Mocked data for now...
    // config.data_per_species = JSON.parse('{"Plasmodium falciparum (isolate 3D7)":{"Plasmodium falciparum (isolate 3D7)":[[11605],[11731]],"Eukaryota":[[11605,11731]]},"Schizosaccharomyces pombe (strain 972 / ATCC 24843)":{"Schizosaccharomyces pombe (strain 972 / ATCC 24843)":[[11028]],"Ascomycota":[[11028]],"Eukaryota":[[11028]]},"Saccharomyces cerevisiae (strain ATCC 204508 / S288c)":{"Saccharomyces cerevisiae (strain ATCC 204508 / S288c)":[[12],[5839]],"Ascomycota":[[12,5839]],"Eukaryota":[[12,5839]]}}');
    // config.tree_obj = JSON.parse('{"name":"Eukaryota","children":[{"name":"Plasmodium falciparum (isolate 3D7)"},{"name":"Ascomycota","children":[{"name":"Schizosaccharomyces pombe (strain 972 / ATCC 24843)"},{"name":"Saccharomyces cerevisiae (strain ATCC 204508 / S288c)"}]}]}');
    // config.fam_data = JSON.parse('[{"id": 12, "protid": "YEAST00012", "sequence_length": 457, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "DHE5_YEAST", "gc_content": 0.4868995633187773}, {"id": 5839, "protid": "YEAST05839", "sequence_length": 454, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "DHE4_YEAST", "gc_content": 0.4468864468864469}, {"id": 11028, "protid": "SCHPO04676", "sequence_length": 451, "taxon": {"species": "Schizosaccharomyces pombe ", "strain": "(strain 972 / ATCC 24843)"}, "xrefid": "DHE4_SCHPO", "gc_content": 0.5007374631268436}, {"id": 11605, "protid": "PLAF700166", "sequence_length": 470, "taxon": {"species": "Plasmodium falciparum ", "strain": "(isolate 3D7)"}, "xrefid": "Q8ILT0", "gc_content": 0.3043170559094126}, {"id": 11731, "protid": "PLAF700292", "sequence_length": 510, "taxon": {"species": "Plasmodium falciparum ", "strain": "(isolate 3D7)"}, "xrefid": "Q8ILF7", "gc_content": 0.299412915851272}]');
    config.data_per_species = JSON.parse('{"Plasmodium falciparum (isolate 3D7)":{"Plasmodium falciparum (isolate 3D7)":[[13190]],"Eukaryota":[[13190]]},"Schizosaccharomyces pombe (strain 972 / ATCC 24843)":{"Schizosaccharomyces pombe (strain 972 / ATCC 24843)":[[6375],[8693],[8663],[10053],[10579],[10582],[10587],[10588]],"Ascomycota":[[10053,10579,10582,10587,10588,8663],[6375,8693],[]],"Eukaryota":[[10053,10579,10582,10587,10588,6375,8663,8693]]},"Ashbya gossypii (strain ATCC 10895 / CBS 109.51 / FGSC 9923 / NRRL Y-1056)":{"Ashbya gossypii (strain ATCC 10895 / CBS 109.51 / FGSC 9923 / NRRL Y-1056)":[[19423],[19949],[19951],[19952]],"Saccharomycetaceae":[[19949,19951,19952],[],[19423]],"Ascomycota":[[19949,19951,19952],[],[19423]],"Eukaryota":[[19423,19949,19951,19952]]},"Saccharomyces cerevisiae (strain ATCC 204508 / S288c)":{"Saccharomyces cerevisiae (strain ATCC 204508 / S288c)":[[718],[1791],[3104],[3475],[5277],[1323],[1324],[1326],[2154],[2952],[2954],[2956],[3099],[3965],[4524],[5297]],"Saccharomycetaceae":[[1323,1324,1326,2154,2952,2954,2956,3099,3965,4524,5297],[1791,3104,3475,5277,718],[]],"Ascomycota":[[1323,1324,1326,1791,2154,2952,2954,2956,3099,3104,3475,3965,4524,5277,5297,718],[],[]],"Eukaryota":[[1323,1324,1326,1791,2154,2952,2954,2956,3099,3104,3475,3965,4524,5277,5297,718]]}}');
    config.tree_obj = JSON.parse('{"name":"Eukaryota","children":[{"name":"Plasmodium falciparum (isolate 3D7)"},{"name":"Ascomycota","children":[{"name":"Schizosaccharomyces pombe (strain 972 / ATCC 24843)"},{"name":"Saccharomycetaceae","children":[{"name":"Ashbya gossypii (strain ATCC 10895 / CBS 109.51 / FGSC 9923 / NRRL Y-1056)"},{"name":"Saccharomyces cerevisiae (strain ATCC 204508 / S288c)"}]}]}]}');
    config.fam_data = JSON.parse('[{"id": 718, "protid": "YEAST00718", "sequence_length": 567, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT15_YEAST", "gc_content": 0.41901408450704225}, {"id": 1323, "protid": "YEAST01323", "sequence_length": 570, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT7_YEAST", "gc_content": 0.4138937536485698}, {"id": 1324, "protid": "YEAST01324", "sequence_length": 570, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT6_YEAST", "gc_content": 0.4133099824868651}, {"id": 1326, "protid": "YEAST01326", "sequence_length": 567, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT3_YEAST", "gc_content": 0.4055164319248826}, {"id": 1791, "protid": "YEAST01791", "sequence_length": 564, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT13_YEAST", "gc_content": 0.4230088495575221}, {"id": 2154, "protid": "YEAST02154", "sequence_length": 546, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT10_YEAST", "gc_content": 0.4113345521023766}, {"id": 2952, "protid": "YEAST02952", "sequence_length": 576, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT4_YEAST", "gc_content": 0.3928365106874639}, {"id": 2954, "protid": "YEAST02954", "sequence_length": 570, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT1_YEAST", "gc_content": 0.4115586690017513}, {"id": 2956, "protid": "YEAST02956", "sequence_length": 592, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT5_YEAST", "gc_content": 0.418212478920742}, {"id": 3099, "protid": "YEAST03099", "sequence_length": 567, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT9_YEAST", "gc_content": 0.43896713615023475}, {"id": 3104, "protid": "YEAST03104", "sequence_length": 569, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT8_YEAST", "gc_content": 0.4087719298245614}, {"id": 3475, "protid": "YEAST03475", "sequence_length": 567, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT16_YEAST", "gc_content": 0.42018779342723006}, {"id": 3965, "protid": "YEAST03965", "sequence_length": 574, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "GAL2_YEAST", "gc_content": 0.42144927536231885}, {"id": 4524, "protid": "YEAST04524", "sequence_length": 541, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT2_YEAST", "gc_content": 0.3985239852398524}, {"id": 5277, "protid": "YEAST05277", "sequence_length": 564, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT17_YEAST", "gc_content": 0.4176991150442478}, {"id": 5297, "protid": "YEAST05297", "sequence_length": 567, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT11_YEAST", "gc_content": 0.43896713615023475}, {"id": 6375, "protid": "SCHPO00023", "sequence_length": 555, "taxon": {"species": "Schizosaccharomyces pombe ", "strain": "(strain 972 / ATCC 24843)"}, "xrefid": "GHT3_SCHPO", "gc_content": 0.38968824940047964}, {"id": 8663, "protid": "SCHPO02311", "sequence_length": 518, "taxon": {"species": "Schizosaccharomyces pombe ", "strain": "(strain 972 / ATCC 24843)"}, "xrefid": "GHT7_SCHPO", "gc_content": 0.4007707129094412}, {"id": 8693, "protid": "SCHPO02341", "sequence_length": 557, "taxon": {"species": "Schizosaccharomyces pombe ", "strain": "(strain 972 / ATCC 24843)"}, "xrefid": "GHT4_SCHPO", "gc_content": 0.4074074074074074}, {"id": 10053, "protid": "SCHPO03701", "sequence_length": 531, "taxon": {"species": "Schizosaccharomyces pombe ", "strain": "(strain 972 / ATCC 24843)"}, "xrefid": "GHT2_SCHPO", "gc_content": 0.4166666666666667}, {"id": 10579, "protid": "SCHPO04227", "sequence_length": 535, "taxon": {"species": "Schizosaccharomyces pombe ", "strain": "(strain 972 / ATCC 24843)"}, "xrefid": "GHT6_SCHPO", "gc_content": 0.43781094527363185}, {"id": 10582, "protid": "SCHPO04230", "sequence_length": 546, "taxon": {"species": "Schizosaccharomyces pombe ", "strain": "(strain 972 / ATCC 24843)"}, "xrefid": "GHT5_SCHPO", "gc_content": 0.44363193174893356}, {"id": 10587, "protid": "SCHPO04235", "sequence_length": 547, "taxon": {"species": "Schizosaccharomyces pombe ", "strain": "(strain 972 / ATCC 24843)"}, "xrefid": "GHT8_SCHPO", "gc_content": 0.44038929440389296}, {"id": 10588, "protid": "SCHPO04236", "sequence_length": 557, "taxon": {"species": "Schizosaccharomyces pombe ", "strain": "(strain 972 / ATCC 24843)"}, "xrefid": "GHT1_SCHPO", "gc_content": 0.45340501792114696}, {"id": 13190, "protid": "PLAF701751", "sequence_length": 504, "taxon": {"species": "Plasmodium falciparum ", "strain": "(isolate 3D7)"}, "xrefid": "Q7KWJ5", "gc_content": 0.2963696369636964}, {"id": 19423, "protid": "ASHGO02481", "sequence_length": 547, "taxon": {"species": "Ashbya gossypii ", "strain": "(strain ATCC 10895 / CBS 109.51 / FGSC 9923 / NRRL Y-1056)"}, "xrefid": "Q757Q4", "gc_content": 0.5371046228710462}, {"id": 19949, "protid": "ASHGO03007", "sequence_length": 539, "taxon": {"species": "Ashbya gossypii ", "strain": "(strain ATCC 10895 / CBS 109.51 / FGSC 9923 / NRRL Y-1056)"}, "xrefid": "Q755M1", "gc_content": 0.45555555555555555}, {"id": 19951, "protid": "ASHGO03009", "sequence_length": 546, "taxon": {"species": "Ashbya gossypii ", "strain": "(strain ATCC 10895 / CBS 109.51 / FGSC 9923 / NRRL Y-1056)"}, "xrefid": "Q755L9", "gc_content": 0.47592931139549055}, {"id": 19952, "protid": "ASHGO03010", "sequence_length": 535, "taxon": {"species": "Ashbya gossypii ", "strain": "(strain ATCC 10895 / CBS 109.51 / FGSC 9923 / NRRL Y-1056)"}, "xrefid": "Q755L8", "gc_content": 0.4732587064676617}]');

    const maxs = get_maxs(config.data_per_species);

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
      if (config.frozen_node) {
        return;
      }
      curr_node = node;
      dispatch.node_selected.call(this, node);
      current_opened_taxa_name = node.node_name();
      // board.width(compute_size_annotations(maxs, tot_width, node.node_name()));
      board.width(board_width);
      // TODO: At this point we need to call a method to display the current level in the Header (outside the widget)
      const removed_hogs = current_hog_state.reset_on(tree, config.data_per_species, current_opened_taxa_name, column_coverage_threshold);
      dispatch.hogs_removed.call(this, removed_hogs);
      // board.update();
      update_board();
      // add_hog_header(node, current_hog_state, config);
      // add_hog_header(current_opened_taxa_name, current_hog_state, config);

      state.highlight_condition = n => node.id() === n.id();
      tree.update_nodes();
    };

    // Tree
    tree = tnt.tree()
      .data(config.tree_obj)
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
              iHamVis.update()
            },
            on_freeze: () => {
              if (config.frozen_node) {
                config.frozen_node = null;
              } else {
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

    current_opened_taxa_name = tree.root().node_name();
    current_hog_state.reset_on(tree, config.data_per_species, current_opened_taxa_name, column_coverage_threshold);

    // Board:
    board = tnt.board()
      .from(0)
      .zoom_in(1)
      .allow_drag(false)
      .to(2)
      // .width(compute_size_annotations(maxs, tot_width, current_opened_taxa_name) * (config.label_height + 2));
      .width(board_width);

    // Board's track
    genes_feature = hog_gene_feature().colors(gene_color)
    function track (leaf) {

      const sp = leaf.node_name();

      return tnt.board.track()
        .color("#FFF")
        .data(tnt.board.track.data.sync()
          .retriever(() => {
            // in case the branch is collapsed we still draw empty hogs columns
            if (leaf.is_collapsed()) {
              const random_collapse_leaf_name = leaf.get_all_leaves(true)[0].node_name();

              if (config.data_per_species[random_collapse_leaf_name] !== undefined) {
                const genes2Xcoords = genes_2_xcoords(config.data_per_species[random_collapse_leaf_name][current_opened_taxa_name], maxs[current_opened_taxa_name], current_hog_state, config.fam_data);
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
            return genes_2_xcoords(config.data_per_species[sp][current_opened_taxa_name], maxs[current_opened_taxa_name], current_hog_state, config.fam_data);
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
              hog_header_tooltip.display.call(this, hog, div);
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
    update_nodes(tree.root());
    set_widths();
  };

  apijs(theme)
    .getset(config);


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
      update_board();
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
    update_board();
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

export default iHam;
