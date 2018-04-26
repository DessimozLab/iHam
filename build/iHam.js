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
	// TnT doesn't have the features we need, so create our own
	var hog_feature = tnt.board.track.feature().index(function (d) {
	  return d.id;
	}).create(function (new_hog, x_scale) {
	  var track = this;
	  var padding = ~~(track.height() - track.height() * 0.8) / 2;
	  var height = track.height() - ~~(padding * 2);
	  var dom1 = x_scale.domain()[1];
	  new_hog.append("line").attr("class", "hog_boundary").attr("x1", function (d) {
	    var width = d3.min([x_scale(dom1 / d.max), height]);
	    var x = width * (d.max_in_hog - 1);
	    var xnext = width * d.max_in_hog;
	    return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
	  }).attr("x2", function (d) {
	    var width = d3.min([x_scale(dom1 / d.max), height]);
	    var x = width * (d.max_in_hog - 1);
	    var xnext = width * d.max_in_hog;
	    return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
	  }).attr("y1", 0).attr("y2", track.height()).attr("stroke-width", 2).attr("stroke", "black");
	}).distribute(function (hogs, x_scale) {
	  var track = this;
	  var padding = ~~(track.height() - track.height() * 0.8) / 2;
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
	    var padding = ~~(track.height() - track.height() * 0.8) / 2;
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
	    var padding = ~~(track.height() - track.height() * 0.8) / 2;
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
	  var track = this;
	  var padding = ~~(track.height() - track.height() * 0.8) / 2;
	  var height = track.height() - ~~(padding * 2);
	  var dom1 = x_scale.domain()[1];
	  var g = new_group.append('g').attr('transform', function (g) {
	    var width = d3.min([x_scale(dom1 / g.max), height]);
	    var posx = g.hog_start * width + g.max_in_hog * width / 2;
	    return "translate(".concat(posx, ", 0)");
	  }).attr('class', function (d) {
	    return d.name;
	  });
	  g.append('circle').attr('cx', 0).attr('cy', -6).attr('r', 2).attr('fill', 'black');
	  g.append('circle').attr('cx', 0).attr('cy', -12).attr('r', 2).attr('fill', 'black');
	  g.append('circle').attr('cx', 0).attr('cy', -18).attr('r', 2).attr('fill', 'black');
	}).distribute(function (elems, x_scale) {
	  var track = this;
	  var padding = ~~(track.height() - track.height() * 0.8) / 2;
	  var height = track.height() - ~~(padding * 2);
	  var dom1 = x_scale.domain()[1];
	  elems.select('g').transition().attr('transform', function (g) {
	    var width = d3.min([x_scale(dom1 / g.max), height]);
	    var posx = g.hog_start * width + g.max_in_hog * width / 2;
	    return "translate(".concat(posx, ", 0)");
	  });
	});

	function Hog_state(fam_data) {
	  this.current_level = '';
	  this.hogs = undefined;
	  this.number_species = 0;
	  this.removed_hogs = [];
	  var that = this;

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
	    } // TODO: Convert this to event


	    d3.select('.alert_remove').attr('display', function () {
	      return that.removed_hogs.length ? 'block' : 'none';
	    }); // if (that.removed_hogs.length > 0) {
	    //   $('.alert_remove').show();}
	    // else {
	    //   $('.alert_remove').hide();}
	  };

	  this.add_genes = function (array_hogs_with_genes) {
	    if (!that.hogs) {
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

	    for (var _i3 = 0; _i3 < array_hogs_with_genes.length; _i3++) {
	      if (array_hogs_with_genes[_i3].length > 0) {
	        that.hogs[_i3].genes = that.hogs[_i3].genes.concat(array_hogs_with_genes[_i3]);
	        that.hogs[_i3].number_species += 1;

	        if (that.hogs[_i3].max_in_hog < array_hogs_with_genes[_i3].length) {
	          that.hogs[_i3].max_in_hog = array_hogs_with_genes[_i3].length;
	        }
	      }
	    }

	    var genes_so_far = 0;

	    for (var _i4 = 0; _i4 < this.hogs.length; _i4++) {
	      this.hogs[_i4].hog_start = genes_so_far;
	      genes_so_far += this.hogs[_i4].max_in_hog;
	    }
	  };
	}

	var filter = function filter(id, all) {
	  var found = all.filter(function (d) {
	    return d.id === id;
	  });
	  return found[0];
	};

	function genes_2_xcoords(arr, maxs, current_hog_state, fam_data) {
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
	    if (current_hog_state.removed_hogs.indexOf(hog) === -1) {
	      var hog_gene_names = [];
	      hog_genes.sort();
	      hog_genes.forEach(function (gene, gene_pos) {
	        genes.push({
	          id: gene,
	          gene: filter(gene, fam_data),
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

	var _mouse_over_node;

	var mouse_over_node = {
	  display: function display(node, div) {
	    var obj = {
	      // header: "Mouse over tooltip",
	      body: node.node_name()
	    };
	    _mouse_over_node = tooltip.plain().id('node_over_tooltip').width(140).show_closer(false).container(div).call(this, obj);
	  },
	  close: function close() {
	    _mouse_over_node.close();
	  }
	};

	var _tree_node_tooltip;

	var tree_node_tooltip = {
	  display: function display(node, div, actions, frozen) {
	    // actions: (on collapse / expand) and (on freeze)
	    var obj = {};
	    obj.header = node.node_name();
	    obj.rows = []; // collapse / uncollapse if internal node

	    if (!node.is_leaf()) {
	      obj.rows.push({
	        value: node.is_collapsed() ? "Expand node" : "Collapse node",
	        link: function link(n) {
	          tree_node_tooltip.close();
	          actions.on_collapse();
	        },
	        obj: node
	      });
	    } // There are 3 freezing possibilites:
	    // "Freeze tree at this node",
	    // "Unfreeze the tree",
	    // "Re-freeze tree at this node"


	    obj.rows.push({
	      value: frozen === node.id() ? 'Unfreeze the tree' : 'Freeze at this node',
	      link: function link(n) {
	        tree_node_tooltip.close();
	        actions.on_freeze();
	      },
	      obj: node
	    });
	    _tree_node_tooltip = tooltip.list().width(120).id('node_click_tooltip').container(div).call(this, obj);
	  },
	  close: function close() {
	    return _tree_node_tooltip.close();
	  }
	};

	var _gene_tooltip;

	var gene_tooltip = {
	  display: function display(gene, div) {
	    var obj = {};
	    obj.header = gene.gene.protid;
	    obj.rows = [];
	    obj.rows.push({
	      label: "Name",
	      value: gene.gene.xrefid
	    });
	    _gene_tooltip = tooltip.table().width(120).id('gene_tooltip').container(div).call(this, obj);
	  },
	  close: function close() {
	    return _gene_tooltip.close();
	  }
	};

	var _hog_header_tooltip;

	var hog_header_tooltip = {
	  display: function display(hog, div) {
	    var obj = {};
	    obj.header = hog.name;
	    obj.rows = [];
	    obj.rows.push({
	      value: "Number of genes: ".concat(hog.genes.length)
	    });
	    obj.rows.push({
	      value: "Coverage: ".concat(hog.coverage, " %")
	    });
	    obj.rows.push({
	      value: "Sequences (Fasta)",
	      link: function link() {}
	    });
	    obj.rows.push({
	      value: "HOGs tables",
	      link: function link() {}
	    });
	    _hog_header_tooltip = tooltip.list().width(120).id('hog_header_tooltip').container(div).call(this, obj);
	  },
	  close: function close() {
	    return _hog_header_tooltip.close();
	  }
	};

	/* global d3 */
	var dispatch = d3.dispatch("node_selected", "click");

	function iHam() {
	  // internal (non API) options
	  var state = {
	    highlight_condition: function highlight_condition() {
	      return false;
	    }
	  };
	  var current_hog_state = new Hog_state();
	  var board;
	  var tree;
	  var current_opened_taxa_name = '';
	  var column_coverage_threshold = 0; // width for tree and board

	  var tree_width = 200;
	  var board_width = 800;

	  var config = {
	    div_id: null,
	    query_gene: {},
	    data_per_species: null,
	    // TODO: this should be called simply data?
	    tree_obj: null,
	    fam_data: null,
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
	    frozen_node: null,
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
	    d3.select(div).style("position", "relative"); // const data = parsers.parse_orthoxml(config.newick, config.orthoxml);
	    // Mocked data for now...
	    // config.data_per_species = JSON.parse('{"Plasmodium falciparum (isolate 3D7)":{"Plasmodium falciparum (isolate 3D7)":[[11605],[11731]],"Eukaryota":[[11605,11731]]},"Schizosaccharomyces pombe (strain 972 / ATCC 24843)":{"Schizosaccharomyces pombe (strain 972 / ATCC 24843)":[[11028]],"Ascomycota":[[11028]],"Eukaryota":[[11028]]},"Saccharomyces cerevisiae (strain ATCC 204508 / S288c)":{"Saccharomyces cerevisiae (strain ATCC 204508 / S288c)":[[12],[5839]],"Ascomycota":[[12,5839]],"Eukaryota":[[12,5839]]}}');
	    // config.tree_obj = JSON.parse('{"name":"Eukaryota","children":[{"name":"Plasmodium falciparum (isolate 3D7)"},{"name":"Ascomycota","children":[{"name":"Schizosaccharomyces pombe (strain 972 / ATCC 24843)"},{"name":"Saccharomyces cerevisiae (strain ATCC 204508 / S288c)"}]}]}');
	    // config.fam_data = JSON.parse('[{"id": 12, "protid": "YEAST00012", "sequence_length": 457, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "DHE5_YEAST", "gc_content": 0.4868995633187773}, {"id": 5839, "protid": "YEAST05839", "sequence_length": 454, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "DHE4_YEAST", "gc_content": 0.4468864468864469}, {"id": 11028, "protid": "SCHPO04676", "sequence_length": 451, "taxon": {"species": "Schizosaccharomyces pombe ", "strain": "(strain 972 / ATCC 24843)"}, "xrefid": "DHE4_SCHPO", "gc_content": 0.5007374631268436}, {"id": 11605, "protid": "PLAF700166", "sequence_length": 470, "taxon": {"species": "Plasmodium falciparum ", "strain": "(isolate 3D7)"}, "xrefid": "Q8ILT0", "gc_content": 0.3043170559094126}, {"id": 11731, "protid": "PLAF700292", "sequence_length": 510, "taxon": {"species": "Plasmodium falciparum ", "strain": "(isolate 3D7)"}, "xrefid": "Q8ILF7", "gc_content": 0.299412915851272}]');

	    config.data_per_species = JSON.parse('{"Plasmodium falciparum (isolate 3D7)":{"Plasmodium falciparum (isolate 3D7)":[[13190]],"Eukaryota":[[13190]]},"Schizosaccharomyces pombe (strain 972 / ATCC 24843)":{"Schizosaccharomyces pombe (strain 972 / ATCC 24843)":[[6375],[8693],[8663],[10053],[10579],[10582],[10587],[10588]],"Ascomycota":[[10053,10579,10582,10587,10588,8663],[6375,8693],[]],"Eukaryota":[[10053,10579,10582,10587,10588,6375,8663,8693]]},"Ashbya gossypii (strain ATCC 10895 / CBS 109.51 / FGSC 9923 / NRRL Y-1056)":{"Ashbya gossypii (strain ATCC 10895 / CBS 109.51 / FGSC 9923 / NRRL Y-1056)":[[19423],[19949],[19951],[19952]],"Saccharomycetaceae":[[19949,19951,19952],[],[19423]],"Ascomycota":[[19949,19951,19952],[],[19423]],"Eukaryota":[[19423,19949,19951,19952]]},"Saccharomyces cerevisiae (strain ATCC 204508 / S288c)":{"Saccharomyces cerevisiae (strain ATCC 204508 / S288c)":[[718],[1791],[3104],[3475],[5277],[1323],[1324],[1326],[2154],[2952],[2954],[2956],[3099],[3965],[4524],[5297]],"Saccharomycetaceae":[[1323,1324,1326,2154,2952,2954,2956,3099,3965,4524,5297],[1791,3104,3475,5277,718],[]],"Ascomycota":[[1323,1324,1326,1791,2154,2952,2954,2956,3099,3104,3475,3965,4524,5277,5297,718],[],[]],"Eukaryota":[[1323,1324,1326,1791,2154,2952,2954,2956,3099,3104,3475,3965,4524,5277,5297,718]]}}');
	    config.tree_obj = JSON.parse('{"name":"Eukaryota","children":[{"name":"Plasmodium falciparum (isolate 3D7)"},{"name":"Ascomycota","children":[{"name":"Schizosaccharomyces pombe (strain 972 / ATCC 24843)"},{"name":"Saccharomycetaceae","children":[{"name":"Ashbya gossypii (strain ATCC 10895 / CBS 109.51 / FGSC 9923 / NRRL Y-1056)"},{"name":"Saccharomyces cerevisiae (strain ATCC 204508 / S288c)"}]}]}]}');
	    config.fam_data = JSON.parse('[{"id": 718, "protid": "YEAST00718", "sequence_length": 567, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT15_YEAST", "gc_content": 0.41901408450704225}, {"id": 1323, "protid": "YEAST01323", "sequence_length": 570, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT7_YEAST", "gc_content": 0.4138937536485698}, {"id": 1324, "protid": "YEAST01324", "sequence_length": 570, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT6_YEAST", "gc_content": 0.4133099824868651}, {"id": 1326, "protid": "YEAST01326", "sequence_length": 567, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT3_YEAST", "gc_content": 0.4055164319248826}, {"id": 1791, "protid": "YEAST01791", "sequence_length": 564, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT13_YEAST", "gc_content": 0.4230088495575221}, {"id": 2154, "protid": "YEAST02154", "sequence_length": 546, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT10_YEAST", "gc_content": 0.4113345521023766}, {"id": 2952, "protid": "YEAST02952", "sequence_length": 576, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT4_YEAST", "gc_content": 0.3928365106874639}, {"id": 2954, "protid": "YEAST02954", "sequence_length": 570, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT1_YEAST", "gc_content": 0.4115586690017513}, {"id": 2956, "protid": "YEAST02956", "sequence_length": 592, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT5_YEAST", "gc_content": 0.418212478920742}, {"id": 3099, "protid": "YEAST03099", "sequence_length": 567, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT9_YEAST", "gc_content": 0.43896713615023475}, {"id": 3104, "protid": "YEAST03104", "sequence_length": 569, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT8_YEAST", "gc_content": 0.4087719298245614}, {"id": 3475, "protid": "YEAST03475", "sequence_length": 567, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT16_YEAST", "gc_content": 0.42018779342723006}, {"id": 3965, "protid": "YEAST03965", "sequence_length": 574, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "GAL2_YEAST", "gc_content": 0.42144927536231885}, {"id": 4524, "protid": "YEAST04524", "sequence_length": 541, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT2_YEAST", "gc_content": 0.3985239852398524}, {"id": 5277, "protid": "YEAST05277", "sequence_length": 564, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT17_YEAST", "gc_content": 0.4176991150442478}, {"id": 5297, "protid": "YEAST05297", "sequence_length": 567, "taxon": {"species": "Saccharomyces cerevisiae ", "strain": "(strain ATCC 204508 / S288c)"}, "xrefid": "HXT11_YEAST", "gc_content": 0.43896713615023475}, {"id": 6375, "protid": "SCHPO00023", "sequence_length": 555, "taxon": {"species": "Schizosaccharomyces pombe ", "strain": "(strain 972 / ATCC 24843)"}, "xrefid": "GHT3_SCHPO", "gc_content": 0.38968824940047964}, {"id": 8663, "protid": "SCHPO02311", "sequence_length": 518, "taxon": {"species": "Schizosaccharomyces pombe ", "strain": "(strain 972 / ATCC 24843)"}, "xrefid": "GHT7_SCHPO", "gc_content": 0.4007707129094412}, {"id": 8693, "protid": "SCHPO02341", "sequence_length": 557, "taxon": {"species": "Schizosaccharomyces pombe ", "strain": "(strain 972 / ATCC 24843)"}, "xrefid": "GHT4_SCHPO", "gc_content": 0.4074074074074074}, {"id": 10053, "protid": "SCHPO03701", "sequence_length": 531, "taxon": {"species": "Schizosaccharomyces pombe ", "strain": "(strain 972 / ATCC 24843)"}, "xrefid": "GHT2_SCHPO", "gc_content": 0.4166666666666667}, {"id": 10579, "protid": "SCHPO04227", "sequence_length": 535, "taxon": {"species": "Schizosaccharomyces pombe ", "strain": "(strain 972 / ATCC 24843)"}, "xrefid": "GHT6_SCHPO", "gc_content": 0.43781094527363185}, {"id": 10582, "protid": "SCHPO04230", "sequence_length": 546, "taxon": {"species": "Schizosaccharomyces pombe ", "strain": "(strain 972 / ATCC 24843)"}, "xrefid": "GHT5_SCHPO", "gc_content": 0.44363193174893356}, {"id": 10587, "protid": "SCHPO04235", "sequence_length": 547, "taxon": {"species": "Schizosaccharomyces pombe ", "strain": "(strain 972 / ATCC 24843)"}, "xrefid": "GHT8_SCHPO", "gc_content": 0.44038929440389296}, {"id": 10588, "protid": "SCHPO04236", "sequence_length": 557, "taxon": {"species": "Schizosaccharomyces pombe ", "strain": "(strain 972 / ATCC 24843)"}, "xrefid": "GHT1_SCHPO", "gc_content": 0.45340501792114696}, {"id": 13190, "protid": "PLAF701751", "sequence_length": 504, "taxon": {"species": "Plasmodium falciparum ", "strain": "(isolate 3D7)"}, "xrefid": "Q7KWJ5", "gc_content": 0.2963696369636964}, {"id": 19423, "protid": "ASHGO02481", "sequence_length": 547, "taxon": {"species": "Ashbya gossypii ", "strain": "(strain ATCC 10895 / CBS 109.51 / FGSC 9923 / NRRL Y-1056)"}, "xrefid": "Q757Q4", "gc_content": 0.5371046228710462}, {"id": 19949, "protid": "ASHGO03007", "sequence_length": 539, "taxon": {"species": "Ashbya gossypii ", "strain": "(strain ATCC 10895 / CBS 109.51 / FGSC 9923 / NRRL Y-1056)"}, "xrefid": "Q755M1", "gc_content": 0.45555555555555555}, {"id": 19951, "protid": "ASHGO03009", "sequence_length": 546, "taxon": {"species": "Ashbya gossypii ", "strain": "(strain ATCC 10895 / CBS 109.51 / FGSC 9923 / NRRL Y-1056)"}, "xrefid": "Q755L9", "gc_content": 0.47592931139549055}, {"id": 19952, "protid": "ASHGO03010", "sequence_length": 535, "taxon": {"species": "Ashbya gossypii ", "strain": "(strain ATCC 10895 / CBS 109.51 / FGSC 9923 / NRRL Y-1056)"}, "xrefid": "Q755L8", "gc_content": 0.4732587064676617}]');
	    var maxs = get_maxs(config.data_per_species);

	    var gene_color = function gene_color(gene) {
	      return config.query_gene && gene.id === config.query_gene.id ? "#27ae60" : "#95a5a6";
	    }; // todo -30 should be define by margin variables

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

	    function update_nodes(node) {
	      if (config.frozen_node) {
	        return;
	      }

	      dispatch.node_selected.call(this, node);
	      current_opened_taxa_name = node.node_name(); // board.width(compute_size_annotations(maxs, tot_width, node.node_name()));

	      board.width(board_width); // TODO: At this point we need to call a method to display the current level in the Heaader (outside the widget)

	      current_hog_state.reset_on(tree, config.data_per_species, current_opened_taxa_name, column_coverage_threshold); // board.update();

	      update_board(); // add_hog_header(node, current_hog_state, config);
	      // add_hog_header(current_opened_taxa_name, current_hog_state, config);

	      state.highlight_condition = function (n) {
	        return node.id() === n.id();
	      };

	      tree.update_nodes();
	    } // Tree


	    tree = tnt.tree().data(config.tree_obj).layout(tnt.tree.layout.vertical() // .width(Math.max(240, ~~(tot_width * 0.4)))
	    .width(tree_width).scale(false)).label(tnt.tree.label.text().fontsize(12).height(config.label_height).text(function (node) {
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
	    })).on("click", function (node) {
	      tree_node_tooltip.display.call(this, node, div, {
	        on_collapse: function on_collapse() {
	          node.toggle();
	          iHamVis.update();
	        },
	        on_freeze: function on_freeze() {
	          if (config.frozen_node) {
	            config.frozen_node = null;
	          } else {
	            config.frozen_node = node.id();
	          }
	        }
	      }, config.frozen_node);
	    }).on("mouseover", function (node) {
	      update_nodes.call(this, node);
	      mouse_over_node.display.call(this, node, div);
	    }).on("mouseout", function () {
	      mouse_over_node.close();
	    }).node_display(node_display).branch_color("black");
	    current_opened_taxa_name = tree.root().node_name();
	    current_hog_state.reset_on(tree, config.data_per_species, current_opened_taxa_name, column_coverage_threshold); // Board:

	    board = tnt.board().from(0).zoom_in(1).allow_drag(false).to(2) // .width(compute_size_annotations(maxs, tot_width, current_opened_taxa_name) * (config.label_height + 2));
	    .width(board_width); // Board's track

	    var track = function track(leaf) {
	      var sp = leaf.node_name();
	      return tnt.board.track().color("#FFF").data(tnt.board.track.data.sync().retriever(function () {
	        // in case the branch is collapsed we still draw empty hogs columns
	        if (leaf.is_collapsed()) {
	          var random_collapse_leaf_name = leaf.get_all_leaves(true)[0].node_name();

	          if (config.data_per_species[random_collapse_leaf_name] !== undefined) {
	            var genes2Xcoords = genes_2_xcoords(config.data_per_species[random_collapse_leaf_name][current_opened_taxa_name], maxs[current_opened_taxa_name], current_hog_state, config.fam_data);
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
	      })).display(tnt.board.track.feature.composite().add("genes", hog_gene_feature(gene_color).on("click", function (gene) {
	        gene_tooltip.display.call(this, gene, div);
	      })).add("hogs", hog_feature).add('hog_groups', hog_group.on('click', function (hog) {
	        hog_header_tooltip.display.call(this, hog, div);
	      })));
	    }; // iHam setup


	    var iHamVis = tnt().tree(tree).board(board).track(track);
	    iHamVis(div);
	    update_nodes(tree.root());
	    set_widths();
	  };

	  tnt_api(theme).getset(config); // resize the board container to fill space between tree panel and right

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

	  function set_widths() {
	    if (board) {
	      board.width(board_width).update();
	      d3.select("#tnt_tree_container_hogvis_container").style("width", board_width);
	    }

	    if (tree) {
	      tree.layout().width(tree_width);
	      tree.update();
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

	  return d3.rebind(theme, dispatch, "on");
	}

	return iHam;

})));
