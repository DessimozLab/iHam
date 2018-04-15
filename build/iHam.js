(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.iHam = factory());
}(this, (function () { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var api_1 = createCommonjsModule(function (module, exports) {
	var api = function (who) {

	    var _methods = function () {
		var m = [];

		m.add_batch = function (obj) {
		    m.unshift(obj);
		};

		m.update = function (method, value) {
		    for (var i=0; i<m.length; i++) {
			for (var p in m[i]) {
			    if (p === method) {
				m[i][p] = value;
				return true;
			    }
			}
		    }
		    return false;
		};

		m.add = function (method, value) {
		    if (m.update (method, value) ) {
		    } else {
			var reg = {};
			reg[method] = value;
			m.add_batch (reg);
		    }
		};

		m.get = function (method) {
		    for (var i=0; i<m.length; i++) {
			for (var p in m[i]) {
			    if (p === method) {
				return m[i][p];
			    }
			}
		    }
		};

		return m;
	    };

	    var methods    = _methods();
	    var api = function () {};

	    api.check = function (method, check, msg) {
		if (method instanceof Array) {
		    for (var i=0; i<method.length; i++) {
			api.check(method[i], check, msg);
		    }
		    return;
		}

		if (typeof (method) === 'function') {
		    method.check(check, msg);
		} else {
		    who[method].check(check, msg);
		}
		return api;
	    };

	    api.transform = function (method, cbak) {
		if (method instanceof Array) {
		    for (var i=0; i<method.length; i++) {
			api.transform (method[i], cbak);
		    }
		    return;
		}

		if (typeof (method) === 'function') {
		    method.transform (cbak);
		} else {
		    who[method].transform(cbak);
		}
		return api;
	    };

	    var attach_method = function (method, opts) {
		var checks = [];
		var transforms = [];

		var getter = opts.on_getter || function () {
		    return methods.get(method);
		};

		var setter = opts.on_setter || function (x) {
		    for (var i=0; i<transforms.length; i++) {
			x = transforms[i](x);
		    }

		    for (var j=0; j<checks.length; j++) {
			if (!checks[j].check(x)) {
			    var msg = checks[j].msg || 
				("Value " + x + " doesn't seem to be valid for this method");
			    throw (msg);
			}
		    }
		    methods.add(method, x);
		};

		var new_method = function (new_val) {
		    if (!arguments.length) {
			return getter();
		    }
		    setter(new_val);
		    return who; // Return this?
		};
		new_method.check = function (cbak, msg) {
		    if (!arguments.length) {
			return checks;
		    }
		    checks.push ({check : cbak,
				  msg   : msg});
		    return this;
		};
		new_method.transform = function (cbak) {
		    if (!arguments.length) {
			return transforms;
		    }
		    transforms.push(cbak);
		    return this;
		};

		who[method] = new_method;
	    };

	    var getset = function (param, opts) {
		if (typeof (param) === 'object') {
		    methods.add_batch (param);
		    for (var p in param) {
			attach_method (p, opts);
		    }
		} else {
		    methods.add (param, opts.default_value);
		    attach_method (param, opts);
		}
	    };

	    api.getset = function (param, def) {
		getset(param, {default_value : def});

		return api;
	    };

	    api.get = function (param, def) {
		var on_setter = function () {
		    throw ("Method defined only as a getter (you are trying to use it as a setter");
		};

		getset(param, {default_value : def,
			       on_setter : on_setter}
		      );

		return api;
	    };

	    api.set = function (param, def) {
		var on_getter = function () {
		    throw ("Method defined only as a setter (you are trying to use it as a getter");
		};

		getset(param, {default_value : def,
			       on_getter : on_getter}
		      );

		return api;
	    };

	    api.method = function (name, cbak) {
		if (typeof (name) === 'object') {
		    for (var p in name) {
			who[p] = name[p];
		    }
		} else {
		    who[name] = cbak;
		}
		return api;
	    };

	    return api;
	    
	};

	module.exports = exports = api;
	});

	var tnt_api = api_1;

	function compute_size_annotations(maxs, tot_width, taxa_name) {
	  if (taxa_name === 'LUCA') {
	    return ~~(tot_width * 0.6);
	  }

	  var max_number_square = 0;
	  var arrayLength = maxs[taxa_name].length;

	  for (var i = 0; i < arrayLength; i++) {
	    max_number_square += maxs[taxa_name][i];
	  }

	  return max_number_square;
	} // get maximum number of genes per hog accross species

	function get_maxs(data) {
	  var maxs = {};
	  var i;
	  var sp;
	  var internal;

	  for (sp in data) {
	    if (data.hasOwnProperty(sp)) {
	      var sp_data = data[sp];

	      for (internal in sp_data) {
	        if (maxs[internal] === undefined) {
	          maxs[internal] = [];
	        }

	        if (sp_data.hasOwnProperty(internal)) {
	          var internal_data = sp_data[internal];

	          for (i = 0; i < internal_data.length; i++) {
	            if (maxs[internal][i] === undefined || maxs[internal][i] < internal_data[i].length) {
	              maxs[internal][i] = internal_data[i].length;
	            }
	          }
	        }
	      }
	    }
	  }

	  return maxs;
	}

	// hog feature
	// TnT doesn't have the features we need, so create ower own
	var hog_feature = tnt.board.track.feature().index(function (d) {
	  return d.id;
	}).create(function (new_hog, x_scale) {
	  var track = this;
	  var padding = ~~(track.height() - track.height() * 0.8) / 2; // TODO: can this be factored out??
	  // otherwise it is repeated with every create event

	  var height = track.height() - ~~(padding * 2);
	  var dom1 = x_scale.domain()[1];
	  new_hog.append("line").attr("class", "hog_boundary").attr("x1", function (d) {
	    var width = d3.min([x_scale(dom1 / d.max), height]);
	    var x = width * (d.max_in_hog - 1);
	    var xnext = width * d.max_in_hog;
	    return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
	  }).attr("x2", function (d, i) {
	    var width = d3.min([x_scale(dom1 / d.max), height]);
	    var x = width * (d.max_in_hog - 1);
	    var xnext = width * d.max_in_hog;
	    return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
	  }).attr("y1", 0).attr("y2", track.height()).attr("stroke-width", 2).attr("stroke", "black");
	}).distribute(function (hogs, x_scale) {
	  var track = this;
	  var padding = ~~(track.height() - track.height() * 0.8) / 2; // TODO: can this be factored out??

	  var height = track.height() - ~~(padding * 2);
	  var dom1 = x_scale.domain()[1];
	  hogs.select("line").transition().duration(200).attr("x1", function (d) {
	    var width = d3.min([x_scale(dom1 / d.max), height]);
	    var x = width * (d.max_in_hog - 1);
	    var xnext = width * d.max_in_hog;
	    return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
	  }).attr("x2", function (d) {
	    var width = d3.min([x_scale(dom1 / d.max), height]); // var x = x_scale((dom1/d.max) * d.max_in_hog);
	    // var xnext = x_scale((dom1/d.max) * (d.max_in_hog + 1));

	    var x = width * (d.max_in_hog - 1);
	    var xnext = width * d.max_in_hog;
	    return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
	  });
	});
	function hog_gene_feature(color) {
	  var feature = tnt.board.track.feature();

	  if (!color) {
	    color = function color() {
	      return "grey";
	    };
	  }

	  feature.color = function (c) {
	    if (!arguments.length) {
	      return color;
	    }

	    color = c;
	    return this;
	  };

	  feature.index(function (d) {
	    return d.id;
	  }).create(function (new_elems, x_scale) {
	    var track = this;
	    var padding = ~~(track.height() - track.height() * 0.8) / 2; // TODO: can this be factored out??
	    // otherwise it is repeated with every create event

	    var height = track.height() - ~~(padding * 2);
	    var dom1 = x_scale.domain()[1];
	    new_elems.append("rect").attr("class", "hog_gene").attr("x", function (d) {
	      var width = d3.min([x_scale(dom1 / d.max), height]);
	      var x = width * d.pos;
	      return x + padding;
	    }).attr("y", padding).attr("width", function (d) {
	      var width = d3.min([x_scale(dom1 / d.max), height]);
	      return width - 2 * padding;
	    }).attr("height", height).attr("fill", color);
	  }).distribute(function (elems, x_scale) {
	    var track = this;
	    var padding = ~~(track.height() - track.height() * 0.8) / 2; // TODO: can this be factored out??
	    // otherwise it is repeated with every create event

	    var height = track.height() - ~~(padding * 2);
	    var dom1 = x_scale.domain()[1];
	    elems.select("rect").transition().attr("x", function (d) {
	      var width = d3.min([x_scale(dom1 / d.max), height]);
	      var x = width * d.pos;
	      return x + padding;
	    }).attr("width", function (d) {
	      var width = d3.min([x_scale(dom1 / d.max), height]);
	      return width - 2 * padding;
	    });
	  });
	  return feature;
	}
	var hog_group = tnt.board.track.feature().index(function (d) {
	  return d.name;
	}).create(function (new_group, x_scale) {
	  // const track = this;
	  var dom1 = x_scale.domain()[1];
	  var g = new_group.append('g').attr('transform', function (g) {
	    var hog_space = x_scale(dom1 / (g.total_hogs + 1));
	    var posx = hog_space * g.hog_pos + hog_space / 2;
	    return "translate(".concat(posx, ", 0)");
	  }).attr('class', function (d) {
	    return d.name;
	  });
	  g.append('circle').attr('cx', 0).attr('cy', -6).attr('r', 2).attr('fill', 'black');
	  g.append('circle').attr('cx', 0).attr('cy', -12).attr('r', 2).attr('fill', 'black');
	  g.append('circle').attr('cx', 0).attr('cy', -18).attr('r', 2).attr('fill', 'black');
	}).distribute(function (elems, x_scale) {
	  var dom1 = x_scale.domain()[1];
	  elems.select('g').transition().attr('transform', function (g) {
	    var hog_space = x_scale(dom1 / (g.total_hogs + 1));
	    var posx = hog_space * g.hog_pos + hog_space / 2;
	    return "translate(".concat(posx, ", 0)");
	  });
	}).on('click', function (g) {
	  console.log(g);
	});

	function Hog_state() {
	  var that = this;
	  this.current_level = '';
	  this.hogs = undefined;
	  this.number_species = 0;
	  this.removed_hogs = [];

	  this.reset_on = function (tree, per_species3, tax_name, threshold) {
	    that.current_level = tax_name;
	    that.hogs = undefined;
	    that.number_species = 0;
	    that.removed_hogs = [];
	    var leaves = tree.root().get_all_leaves();

	    for (var i = 0; i < leaves.length; i++) {
	      if (per_species3[leaves[i].property('name')] !== undefined && per_species3[leaves[i].property('name')][tax_name] !== undefined) {
	        var slice = per_species3[leaves[i].property('name')][tax_name];

	        if (slice && slice.length > 0) {
	          that.number_species += 1;
	          that.add_genes(slice);
	        }
	      }
	    }

	    if (that.hogs !== undefined) {
	      for (var _i = 0; _i < that.hogs.length; _i++) {
	        var cov = that.hogs[_i].number_species * 100 / that.number_species;

	        if (cov >= threshold) {
	          that.hogs[_i].coverage = cov;
	        } else {
	          that.removed_hogs.push(_i);
	        }
	      }

	      for (var _i2 = that.removed_hogs.length - 1; _i2 >= 0; _i2--) {
	        that.hogs.splice(that.removed_hogs[_i2], 1);
	      }
	    }

	    d3.select('.alert_remove').attr('display', function () {
	      return that.removed_hogs.length ? 'block' : 'none';
	    }); // if (that.removed_hogs.length > 0) {
	    //   $('.alert_remove').show();}
	    // else {
	    //   $('.alert_remove').hide();}
	  };

	  this.add_genes = function (array_hogs_with_genes) {
	    if (that.hogs === undefined) {
	      that.hogs = [];

	      for (var i = 0; i < array_hogs_with_genes.length; i++) {
	        var h = {
	          genes: [],
	          name: "hog_".concat(i),
	          number_species: 0,
	          max_in_hog: 0,
	          coverage: 0,
	          hog_pos: i,
	          total_hogs: array_hogs_with_genes.length
	        };
	        that.hogs.push(h);
	      }
	    }

	    for (var i = 0; i < array_hogs_with_genes.length; i++) {
	      if (array_hogs_with_genes[i].length > 0) {
	        that.hogs[i].genes = that.hogs[i].genes.concat(array_hogs_with_genes[i]);
	        that.hogs[i].number_species += 1;

	        if (that.hogs[i].max_in_hog < array_hogs_with_genes[i].length) {
	          that.hogs[i].max_in_hog = array_hogs_with_genes[i].length;
	        }
	      }
	    }
	  };
	}

	function genes_2_xcoords(arr, maxs, current_hog_state) {
	  if (arr === undefined) {
	    return {
	      genes: [],
	      hogs: [],
	      hog_groups: []
	    };
	  }

	  var genes = [];
	  var hogs_boundaries = [];
	  var total_pos = 0;
	  arr.forEach(function (hog_genes, hog) {
	    // TODO: Put this back
	    if (current_hog_state.removed_hogs.indexOf(hog) === -1) {
	      var hog_gene_names = [];
	      hog_genes.sort();
	      hog_genes.forEach(function (gene, gene_pos) {
	        genes.push({
	          id: gene,
	          hog: hog,
	          pos: total_pos + gene_pos,
	          max: d3.sum(maxs),
	          max_in_hog: maxs[hog],
	          pos_in_hog: gene_pos
	        });
	        hog_gene_names.push(gene);
	      });
	      total_pos += maxs[hog];
	      hogs_boundaries.push({
	        max: d3.sum(maxs),
	        max_in_hog: total_pos,
	        hog: hog,
	        id: hog_gene_names.length ? hog_gene_names.join('_') : "hog_" + hog
	      });
	    }
	  });
	  return {
	    genes: genes,
	    hogs: hogs_boundaries.slice(0, -1),
	    hog_groups: current_hog_state.hogs
	  };
	}

	/* global d3 */

	function iHam() {
	  // internal (non API) options
	  var state = {
	    highlight_condition: function highlight_condition() {
	      return false;
	    }
	  };
	  var current_hog_state = new Hog_state();
	  var board;
	  var current_opened_taxa_name = '';
	  var column_coverage_threshold = 0; // external options (exposed API)

	  var config = {
	    div_id: null,
	    query_gene: {},
	    data_per_species: null,
	    // TODO: this should be called simply data?
	    tree_obj: null,
	    // orthoxml: null,
	    // newick: null,
	    pickerDiv: null,
	    // TODO: Still don't know what is this for
	    // Options
	    // display or not internal node label
	    show_internal_labels: true,
	    // Redirection url prefix for tooltip on genes
	    oma_info_url_template: '/cgi-bin/gateway.pl?f=DisplayEntry&amp;p1=',
	    // text div id
	    current_level_id: 'current_level_text',
	    post_init: function post_init() {},
	    //
	    label_height: 20,
	    // TODO: definition?
	    gene_data_vis: [{
	      name: 'Query Gene',
	      scale: 'on_off'
	    }, {
	      name: "Gene Length",
	      scale: "linear",
	      field: "sequence_length",
	      func: "color1d"
	    }, {
	      name: "GC Content",
	      scale: "linear",
	      field: "gc_content",
	      func: "color1d"
	    }] // get_fam_gene_data: function (target) {
	    //   axios.get(`/oma/hogdata${this.query_gene}/json`)
	    //     .then(resp => {
	    //       console.log('resp...');
	    //       console.log(resp);
	    //       resp.data.forEach(gene => target[gene.id] = gene);
	    //     });
	    // }

	  };

	  var theme = function theme(div) {
	    // const data = parsers.parse_orthoxml(config.newick, config.orthoxml);
	    // console.log(data);
	    // Mocked data for now...
	    config.data_per_species = JSON.parse('{"Plasmodium falciparum (isolate 3D7)":{"Plasmodium falciparum (isolate 3D7)":[[11605],[11731]],"Eukaryota":[[11605,11731]]},"Schizosaccharomyces pombe (strain 972 / ATCC 24843)":{"Schizosaccharomyces pombe (strain 972 / ATCC 24843)":[[11028]],"Ascomycota":[[11028]],"Eukaryota":[[11028]]},"Saccharomyces cerevisiae (strain ATCC 204508 / S288c)":{"Saccharomyces cerevisiae (strain ATCC 204508 / S288c)":[[12],[5839]],"Ascomycota":[[12,5839]],"Eukaryota":[[12,5839]]}}');
	    config.tree_obj = JSON.parse('{"name":"Eukaryota","children":[{"name":"Plasmodium falciparum (isolate 3D7)"},{"name":"Ascomycota","children":[{"name":"Schizosaccharomyces pombe (strain 972 / ATCC 24843)"},{"name":"Saccharomyces cerevisiae (strain ATCC 204508 / S288c)"}]}]}');
	    var maxs = get_maxs(config.data_per_species);
	    console.log('maxs...');
	    console.log(maxs);

	    var gene_color = function gene_color(gene) {
	      return config.query_gene && gene.id === config.query_gene.id ? "#27ae60" : "#95a5a6";
	    }; // todo -30 should be define by margin variables


	    var tot_width = parseInt(d3.select(div).style('width')) - 30; // Node display

	    var collapsed_node = tnt.tree.node_display.triangle().fill("grey").size(4);
	    var leaf_node = tnt.tree.node_display.circle().fill("#2c3e50").size(4);
	    var int_node = tnt.tree.node_display.circle().fill("#34495e").size(4);
	    var highlight_node = tnt.tree.node_display.circle().fill("#e74c3c").size(6);
	    var node_display = tnt.tree.node_display().display(function (node) {
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
	      board.update(); // and remove all headers not belonging to top level

	      var tracks = board.tracks();
	      var found_first = false;
	      tracks.forEach(function (track) {
	        var header = track.g.select('.tnt_elem_hog_groups').node();

	        if (header && found_first) {
	          track.g.selectAll('.tnt_elem_hog_groups').remove();
	        }

	        if (header) {
	          found_first = true;
	        }
	      });
	    }

	    function update_nodes(node) {
	      current_opened_taxa_name = node.node_name();
	      board.width(compute_size_annotations(maxs, tot_width, node.node_name())); // TODO: At this point we need to call a method to display the current level in the Helader (outside the widget)

	      current_hog_state.reset_on(tree, config.data_per_species, current_opened_taxa_name, column_coverage_threshold); // board.update();

	      update_board(); // add_hog_header(node, current_hog_state, config);
	      // add_hog_header(current_opened_taxa_name, current_hog_state, config);

	      state.highlight_condition = function (n) {
	        return node.id() === n.id();
	      };

	      tree.update_nodes();
	    } // Tree


	    var tree = tnt.tree().data(config.tree_obj).layout(tnt.tree.layout.vertical().width(Math.max(240, ~~(tot_width * 0.4))).scale(false)).label(tnt.tree.label.text().fontsize(12).height(config.label_height).text(function (node) {
	      var limit = 30;
	      var data = node.data();

	      if (node.is_collapsed()) {
	        return "[".concat(node.n_hidden(), " hidden taxa]");
	      }

	      if ((!config.show_internal_labels || !state.highlight_condition(node)) && data.children && data.children.length > 0) {
	        return "";
	      }

	      if (data.name.length > limit) {
	        var truncName = data.name.substr(0, limit - 3) + "...";
	        return truncName.replace(/_/g, ' ');
	      }

	      return data.name.replace(/_/g, ' ');
	    }).color(function (node) {
	      if (node.is_collapsed()) {
	        return 'grey';
	      }

	      return 'black';
	    }).fontweight(function (node) {
	      if (state.highlight_condition(node)) {
	        return "bold";
	      }

	      return "normal";
	    })).on("click", function (node) {// tree_node_tooltip.display.call(this, node);
	    }).on("mouseover", function (node) {
	      update_nodes.call(this, node); // mouse_over_node.display.call(this, node)
	    }).on("mouseout", function () {// mouse_over_node.close();
	    }).node_display(node_display).branch_color("black");
	    current_opened_taxa_name = tree.root().node_name();
	    current_hog_state.reset_on(tree, config.data_per_species, current_opened_taxa_name, column_coverage_threshold); // Board:

	    board = tnt.board().from(0).zoom_in(1).allow_drag(false).to(2) // .width(500) // TODO: This shouldn't be hardcoded?
	    .width(compute_size_annotations(maxs, tot_width, current_opened_taxa_name) * (config.label_height + 2)); // .max(5);
	    // Board's track

	    var track = function track(leaf) {
	      var sp = leaf.node_name();
	      return tnt.board.track().color("#FFF").data(tnt.board.track.data.sync().retriever(function () {
	        // in case the branch is collapsed we still draw empty hogs columns
	        if (leaf.is_collapsed()) {
	          var random_collapse_leaf_name = leaf.get_all_leaves(true)[0].node_name();

	          if (config.data_per_species[random_collapse_leaf_name] !== undefined) {
	            var genes2Xcoords = genes_2_xcoords(config.data_per_species[random_collapse_leaf_name][current_opened_taxa_name], maxs[current_opened_taxa_name], current_hog_state);
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
	      })).display(tnt.board.track.feature.composite().add("genes", hog_gene_feature(gene_color)).add("hogs", hog_feature).add('hog_groups', hog_group));
	    }; // iHam setup


	    var iHamVis = tnt().tree(tree).board(board).track(track);
	    iHamVis(div);
	    update_board();
	  };

	  var api = tnt_api(theme).getset(config);
	  return theme;
	}

	return iHam;

})));
