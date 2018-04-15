"use strict";

var hog_theme;

hog_theme = function () {

    // Hogvis is the main object to be created, it take a div and others parameters to set up an hogvis instance
    function Hogvis(hogvis_div_id, query_gene, per_species3, tree_obj, gene_data_obj, options_param, genedata_picker_div) {

        ////////////////////
        ///// METHODS //////
        ////////////////////

        this.set_options = function (options) {

            var options = options || {};

            // display or not internal node label
            options.show_internal_labels = options.hasOwnProperty('show_internal_labels') ? options.show_internal_labels : "true";

            // redirection url prefix for tooltip on genes
            options.oma_info_url_template = options.hasOwnProperty('oma_info_url_template') ? options.oma_info_url_template : "/cgi-bin/gateway.pl?f=DisplayEntry&amp;p1=";

            // div id of the open at "xxx" text div
            options.current_level_div = options.hasOwnProperty('current_level_div') ? options.current_level_div : "current_level_text";
            options.post_init = options.hasOwnProperty('post_init') ? options.post_init : function(){};

            var genedatavis_default = [
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
            ];

            // genedatavis defines the type of data used to color the gene square and the related color scheme.
            options.genedatavis = options.hasOwnProperty('genedatavis') ? options.genedatavis : genedatavis_default;

            // label_height defines the text size of the tree labels and indirectly the square sizes.
            options.label_height = options.hasOwnProperty('label_height') ? options.label_height : 20;


            // this was hardcoded with oma data (just thinking for possible embedded)
            var get_fam_gene_data_default = function (target) {
                //console.log('loading gene data...');
                $.getJSON("/oma/hogdata/" + query_gene.id + "/json", function (data) {
                    data.forEach(function (gene) {
                        target[gene.id] = gene;
                    });
                    //console.log('gene data loaded');
                });
            };

            options.get_fam_gene_data = options.hasOwnProperty('get_fam_gene_data') ? options.get_fam_gene_data : get_fam_gene_data_default;
        }

        // Tree related methods
        this.set_node_display = function () {

            // Nodes shapes / colors
            collapsed_node = tnt.tree.node_display.triangle()
                .fill("grey")
                .size(4);

            leaf_node = tnt.tree.node_display.circle()
                .fill("#2c3e50")
                .size(4);

            int_node = tnt.tree.node_display.circle()
                .fill("#34495e")
                .size(4);

            highlight_node = tnt.tree.node_display.circle()
                .fill("#e74c3c")
                .size(6);

            node_display = tnt.tree.node_display()
                .display(function (node) {
                    if (hogvis.highlight_condition(node)) {
                        highlight_node.display().call(this, node);
                    } else if (node.is_collapsed()) {
                        collapsed_node.display().call(this, node);
                    } else if (node.is_leaf()) {
                        leaf_node.display().call(this, node);
                    } else if (!node.is_leaf()) {
                        int_node.display().call(this, node);
                    }
                });

        };

        this.mouse_over_node = function (node) {
            // Update annotation board
            if (is_node_frozen) {
                return;
            }

            current_opened_taxa_name = node.node_name();
            current_hog_state.reset_on(tree, per_species3, current_opened_taxa_name, column_coverage_threshold);
            div_current_level.innerHTML = current_opened_taxa_name;
            annot.width(hogvis.compute_size_annot(current_opened_taxa_name));

            annot.update();

            hogvis.add_hog_header();

            // when update the board make sure that the scroll is reset to left
            var annot_scroller = $("#tnt_annot_container_hogvis_container");
            annot_scroller.scrollLeft(0);

            hogvis.highlight_condition = function (n) {
                return node.id() === n.id();
            };
            tree.update_nodes();

            // Show a mouse over tooltip for internal nodes
            if (!options.show_internal_labels && node.data().children && node.data().children.length) {
                var obj = {};
                obj.header = "";
                obj.body = node.node_name();
                node_hover_tooltip = tooltip.plain()
                    .width(140)
                    .show_closer(false)
                    .position("left")
                    .call(this, obj);
            }
        };

        this.mouse_out_node = function (node) {
            if (!options.show_internal_labels) {
                node_hover_tooltip.close();
            }
        };

        this.init_tree = function () {

            var t = tnt.tree()
                .data(tree_obj)
                .layout(tnt.tree.layout.vertical()
                    .width(Math.max(240, ~~(tot_width * 0.4)))
                    .scale(false)
                )
                .label(tnt.tree.label.text()
                        .fontsize(12)
                        .height(options.label_height)
                        .text(function (node) {
                            var limit = 30;
                            var data = node.data();
                            if (node.is_collapsed()) {
                                return "[" + node.n_hidden() + " hidden taxa]";
                            }
                            if ((!options.show_internal_labels || !hogvis.highlight_condition(node)) &&
                                data.children && data.children.length > 0) {
                                return "";
                            }
                            if (data.name.length > limit) {
                                var truncName = data.name.substr(0, limit - 3) + "...";
                                return truncName.replace(/_/g, ' ');
                            }
                            return data.name.replace(/_/g, ' ');
                        })
                        .color(function (node) {
                            if (node.is_collapsed()) {
                                return 'grey';
                            }
                            return 'black';
                        })
                        .fontweight(function (node) {
                            if (hogvis.highlight_condition(node)) {
                                return "bold";
                            }
                            return "normal";
                        })
                    /*
                     .transform(function (node) {
                     if (!node.is_leaf()){
                     return {
                     "translate" : [-6, -10],
                     "rotate" : -90
                     };
                     }
                     return {
                     "translate" : [10, 5],
                     "rotate" : 0
                     };
                     })
                     */
                )
                .on("click", function (d) {
                    treeNode_tooltip.call(this, d);
                })
                .on("mouseover", hogvis.mouse_over_node)
                .on("mouseout", hogvis.mouse_out_node)
                .node_display(node_display)
                .branch_color("black");

            return t;
        };
        this.highlight_condition = function () {
            return false;
        };
        this.set_node_tooltip = function () {

            treeNode_tooltip = tnt.tooltip()
                .fill(function (node) {
                    // The DOM element is passed as "this"
                    var container = d3.select(this);


                    var table = container
                        .append("table")
                        .attr("class", "tnt_zmenu")
                        .attr("border", "solid")


                    table
                        .append("tr")
                        .attr("class", "tnt_zmenu_header")
                        .append("th")
                        .text(node.node_name());

                    // There is 3 freezing possibilites: "Freeze tree at this node", "Unfreeze the tree", "Re-freeze tree at this node"

                    table
                        .append("tr")
                        .attr("class", "tnt_zmenu_row")
                        .append("td")
                        .style("text-align", "center")
                        .html(function () {
                            return is_node_frozen ? "<a>Unfreeze the tree</a>" : "<a>Freeze tree at this node</a>"
                        })
                        .on("click", function () {
                            if (is_node_frozen) {
                                is_node_frozen = false;
                            }
                            else {
                                is_node_frozen = node.id();
                            }
                            treeNode_tooltip.close();
                        });

                    if (is_node_frozen && is_node_frozen !== node.id()) {


                        table
                            .append("tr")
                            .attr("class", "tnt_zmenu_row")
                            .append("td")
                            .style("text-align", "center")
                            .html("<a>Re-freeze tree at this node</a>")
                            .on("click", function () {
                                is_node_frozen = false;
                                hogvis.mouse_over_node(node);
                                is_node_frozen = node.id();
                                treeNode_tooltip.close();
                            });

                    }


                    if (!node.is_leaf() || node.is_collapsed()) {
                        table
                            .append("tr")
                            .attr("class", "tnt_zmenu_row")
                            .append("td")
                            .style("text-align", "center")
                            .html(function () {
                                return node.is_collapsed() ? "<a> Uncollapse subtree </a>" : "<a> Collapse subtree </a>"
                            })
                            .on("click", function () {
                                node.toggle();
                                vis.update();
                                treeNode_tooltip.close();
                            });
                    }


                })
        };

        // Gene panel related methods
        this.add_hog_header_icons_with_menu = function () {

            // select the svg parent container where to add the icons with it position
            var svg = document.getElementsByClassName("tnt_svg")[0];
            var container = svg.parentNode;
            var parentPos = container.getBoundingClientRect(), relativePos = {};

            // select all the anchors
            var header_anchor = document.getElementsByClassName("anchor_hog_header");

            for (var i = 0; i < header_anchor.length; i++) {

                // get the individual anchor
                var hog_head = header_anchor[i];
                var childrenPos = hog_head.getBoundingClientRect();

                // compute the relative position of anchor
                relativePos.top = childrenPos.top - parentPos.top,
                    relativePos.right = childrenPos.right - parentPos.right,
                    relativePos.bottom = childrenPos.bottom - parentPos.bottom,
                    relativePos.left = childrenPos.left - parentPos.left;

                // create div for icons
                var header_div = document.createElement("div");
                header_div.innerHTML = '<span id="head_button_' + i + '" class="glyphicon glyphicon-option-vertical" aria-hidden="true"></span>';
                header_div.setAttribute("class", "header_div");
                header_div.setAttribute("id", "header_div_" + i);
                header_div.style.top = relativePos.top - 16 + "px";
                header_div.style.left = relativePos.left - 5 + "px";

                // add div to container
                container.appendChild(header_div);


                //  contextual menu

                var parent_menu = document.getElementsByClassName("tnt_groupDiv")[0]
                var parent_menuPos = parent_menu.getBoundingClientRect(), relative_menuPos = {};

                // compute the relative position of menu
                relative_menuPos.top = childrenPos.top - parent_menuPos.top,
                    relative_menuPos.right = childrenPos.right - parent_menuPos.right,
                    relative_menuPos.bottom = childrenPos.bottom - parent_menuPos.bottom,
                    relative_menuPos.left = childrenPos.left - parent_menuPos.left;

                var hog = current_hog_state.hogs[i];

                // create div for menu
                var toolt_div = document.createElement("div");
                toolt_div.setAttribute("class", "header_menu");
                toolt_div.setAttribute("id", "header_menu_" + i);
                toolt_div.style.top = relative_menuPos.top  + "px";
                toolt_div.style.left = relative_menuPos.left  + "px";

                // add menu table
                toolt_div.innerHTML += '<ul class="list-group ">';

                toolt_div.innerHTML += '<li class="list-group-item menu_hog_li "> <b>'+ hog.name + '</b> '
                + '<span id="closer_menu_' + i + '" class="glyphicon glyphicon-remove pull-right" aria-hidden="true" style="margin-top: 2px;cursor:pointer;"></span> </li>';

                toolt_div.innerHTML += '<li class="list-group-item menu_hog_li" > Number genes: '+ hog.genes.length + '</li>';

                toolt_div.innerHTML += '<li class="list-group-item menu_hog_li"> Coverage: '+ parseInt(hog.coverage) + '%</li>';

                var first_gene = fam_genedata[hog.genes[0]];
                if (first_gene !== undefined) {
                    var fasta_url = '/oma/hogs/' + first_gene.protid + '/' + current_opened_taxa_name.replace(" ", "%20") + '/fasta';
                    var table_url = '/oma/hogs/' + first_gene.protid + '/' + current_opened_taxa_name.replace(" ", "%20") + '/';
                    toolt_div.innerHTML += ' <li class="list-group-item menu_hog_li"> <a target="_blank" href=" ' + fasta_url + '"> Sequences (Fasta) <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> </a> </li> '
                    toolt_div.innerHTML += ' <li class="list-group-item menu_hog_li"> <a target="_blank" href=" ' + table_url + '"> HOGs tables <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> </a> </li> '
                }
                toolt_div.innerHTML += '</ul>';

                // add div to container
                parent_menu.appendChild(toolt_div);

                $(toolt_div).hide();

                // bind hide on menu button close
                document.getElementById('closer_menu_' + i).addEventListener("click", function () {

                    var id_click = parseInt(this.id.split('_')[2]);
                    $("#header_menu_" + id_click).hide();
                });

                // bind click event to icon/button
                document.getElementById('head_button_' + i).addEventListener("click", function () {
                    //if (this.getAttribute("class") === "glyphicon glyphicon-triangle-top")
                    //{this.setAttribute("class","glyphicon glyphicon-triangle-bottom")}
                    //else {this.setAttribute("class","glyphicon glyphicon-triangle-top")}


                    var id_click = parseInt(this.id.split('_')[2]);

                    // little workaround to make the toggle of hide/show on click

                    $('div[id^="header_menu_"]').filter(
                        function(){
                            var id_number = this.id.match(/\d+$/)[0];
                            return (id_number && id_number != id_click );
                        }).hide();

                    $("#header_menu_" + id_click).toggle();


                    /* INFORMATION THAT YOU CAN GET FOR THIS HOG - here in case of later uses

                     var hog = current_hog_state.hogs[id_click];
                     var first_gene = fam_genedata[hog.genes[0]].omaid;

                     //alert('http://localhost:8000/oma/hogs/' + first_gene + '/' + current_opened_taxa_name.replace(" ", "%20") + '/');

                     console.log("Name:", hog.name);

                     console.log("Coverage:", hog.coverage);

                     console.log("Genes:", hog.genes);

                     console.log("Sequences (fasta):", 'http://localhost:8000/oma/hogs/' + first_gene + '/' + current_opened_taxa_name.replace(" ", "%20") + '/fasta');

                     console.log("URL view as tables: ", 'http://localhost:8000/oma/hogs/' + first_gene + '/' + current_opened_taxa_name.replace(" ", "%20") + '/');

                     console.log(hog_head);

                     */

                    //var event = document.createEvent("SVGEvents");
                    //event.initEvent("click",true,true);
                    //hog_head.dispatchEvent(event);

                });

            }

        };
        this.add_hog_header = function () {

            // clean old header elements
            d3.selectAll('.anchor_hog_header').remove();
            d3.selectAll('.header_div').remove();
            d3.selectAll('.tt').remove();
            d3.selectAll('.header_menu').remove();

            // add the invisible anchor
            hogvis.add_hog_header_anchor();

            // add the setting icons
            hogvis.add_hog_header_icons_with_menu();

        };
        this.add_hog_header_anchor = function () {

            if (current_opened_taxa_name != 'LUCA') {

                var first_square = d3.select('.hog_gene');
                var g_first_square = first_square.select(function () {
                    return this.parentNode
                });
                var g_first_displayed_track = g_first_square.select(function () {
                    return this.parentNode
                });

                // keep track of the number of genes already displayed
                var gene_stack = 0;

                // for each hog
                for (var i = 0; i < current_hog_state.hogs.length; i++) {

                    g_first_displayed_track.append('circle')
                        .attr("cx", function () {
                            return (options.label_height * gene_stack) + (options.label_height * current_hog_state.hogs[i].max_in_hog / 2 );
                        })
                        .attr("cy", -2)
                        .attr("r", 2)
                        .attr("id", function () {
                            return "anchor_hog_header_" + i
                        })
                        .attr("class", "anchor_hog_header")
                        .style("fill", "white")

                    gene_stack += current_hog_state.hogs[i].max_in_hog;
                }
            }
        }
        this.set_hog_header_tooltip = function () {
            hog_header_tooltip = function (cv, hog) {

                var hog__ = current_hog_state.hogs[hog];
                var obj = {};
                obj.header = hog__.name;
                obj.rows = [];

                obj.rows.push({label: "Coverage", value: ~~(hog__.coverage) + "%"});
                var first_gene = fam_genedata[hog__.genes[0]];
                if (first_gene !== undefined) {

                    obj.rows.push({
                        label: "Sequences (fasta):",
                        value: "<a href='/oma/hogs/" + first_gene.protid + "/" + current_opened_taxa_name.replace(" ", "%20") + "/fasta'> Download <span class='glyphicon glyphicon-download-alt' aria-hidden='true'></span> </a>"
                    });

                    obj.rows.push({
                        label: "View as tables:",
                        value: "<a href='" + '/oma/hogs/' + first_gene.protid + '/' + current_opened_taxa_name.replace(" ", "%20") + '/' + "'> Open <span class='glyphicon glyphicon-new-window' aria-hidden='true'></span> </a>"
                    });
                }

                tnt.tooltip.table()
                    .container(document.getElementsByClassName("tnt_groupDiv")[0])
                    .call(cv, obj);

                //console.log("Genes:", hog.genes);

            };
        }
        this.set_gene_tooltip = function () {
            gene_tooltip = function (gene) {
                var obj = {};
                var gene_data = fam_genedata[gene.id];
                if (gene_data === undefined){return};

                obj.header = fam_genedata[gene.id].protid;
                obj.rows = [];
                obj.rows.push({label: "Name", value: fam_genedata[gene.id].xrefid});
                obj.rows.push({
                    label: "Information",
                    obj: gene,
                    value: "<a href='" + options.oma_info_url_template + gene.id + "'>" + fam_genedata[gene.id].protid + "</a>"
                });

                tnt.tooltip.table()
                    .container(document.getElementsByClassName("tnt_groupDiv")[0])
                    .call(this, obj);
            };
        }
        this.set_up_hog_feature = function () {
            hog_feature
                .index(function (d) {
                    return d.id;
                })
                .create(function (new_hog, x_scale) {
                    var track = this;
                    var padding = ~~(track.height() - (track.height() * 0.8)) / 2; // TODO: can this be factored out??
                    // otherwise it is repeated with every create event

                    var height = track.height() - ~~(padding * 2);
                    var dom1 = x_scale.domain()[1];

                    // set x1,x2 attr = code duplication
                    new_hog
                        .append("line")
                        .attr("class", "hog_boundary")
                        .attr("x1", function (d) {
                            var width = d3.min([x_scale(dom1 / d.max), height + 2 * padding]);
                            var x = width * (d.max_in_hog - 1);
                            var xnext = width * d.max_in_hog;
                            return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
                        })
                        .attr("x2", function (d) {
                            var width = d3.min([x_scale(dom1 / d.max), height + 2 * padding]);
                            var x = width * (d.max_in_hog - 1);
                            var xnext = width * d.max_in_hog;
                            return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
                        })
                        .attr("y1", 0)
                        .attr("y2", track.height())
                        .attr("stroke-width", 2)
                        .attr("stroke", "#34495e");
                })
                .distribute(function (hogs, x_scale) {
                    var track = this;
                    var padding = ~~(track.height() - (track.height() * 0.8)) / 2; // TODO: can this be factored out??

                    var height = track.height() - ~~(padding * 2);
                    var dom1 = x_scale.domain()[1];

                    hogs.select("line")
                        .transition()
                        .duration(200)
                        .attr("x1", function (d) {
                            var width = d3.min([x_scale(dom1 / d.max), height + 2 * padding]);
                            var x = width * (d.max_in_hog - 1);
                            var xnext = width * d.max_in_hog;
                            return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
                        })
                        .attr("x2", function (d) {
                            var width = d3.min([x_scale(dom1 / d.max), height + 2 * padding]);
                            var x = width * (d.max_in_hog - 1);
                            var xnext = width * d.max_in_hog;
                            return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
                        });
                });
        }
        this.set_up_hog_gene_feature = function () {
            hog_gene_feature
                .index(function (d) {
                    return d.id;
                })
                .create(function (new_elems, x_scale) {
                    var track = this;
                    var padding = ~~(track.height() - (track.height() * 0.8)) / 2; // TODO: can this be factored out??
                    // otherwise it is repeated with every create event

                    var height = track.height() - ~~(padding * 2);
                    var dom1 = x_scale.domain()[1];

                    new_elems
                        .append("rect")
                        .attr("class", function (d) {
                            return "hog_gene" + (query_gene && d.id === query_gene.id ? " ref_gene" : "" )
                        })
                        .attr("x", function (d) {
                            var width = d3.min([x_scale(dom1 / d.max), height + 2 * padding]);
                            var x = width * d.pos;
                            return x + padding;
                        })
                        .attr("y", padding)
                        .attr("width", function (d) {
                            var width = d3.min([x_scale(dom1 / d.max), height + 2 * padding]);
                            return width - 2 * padding;
                        })
                        .attr("height", height)
                        .attr("fill", gene_color_function)
                        .style("cursor", function () {
                            return gene_tooltip_mode === 'click' ? "pointer" : "default"
                        })

                })
                .distribute(function (elems, x_scale) {
                    var track = this;
                    var padding = ~~(track.height() - (track.height() * 0.8)) / 2; // TODO: can this be factored out??
                    // otherwise it is repeated with every create event

                    var height = track.height() - ~~(padding * 2);
                    var dom1 = x_scale.domain()[1];

                    elems.select("rect")
                        .transition()
                        .duration(200)
                        .attr("x", function (d) {
                            var width = d3.min([x_scale(dom1 / d.max), height + 2 * padding]);
                            var x = width * d.pos;
                            return x + padding;
                        })
                        .attr("width", function (d) {
                            var width = d3.min([x_scale(dom1 / d.max), height + 2 * padding]);

                            return width - 2 * padding;
                        })
                        .attr("fill", gene_color_function)
                        .style("cursor", function () {
                            return gene_tooltip_mode === 'click' ? "pointer" : "default"
                        })

                })
                .on('click', function (d) {
                    return (gene_tooltip_mode === 'click' ? gene_tooltip(d) : '')
                })
                .on('mouseover', function (d) {
                    return (gene_tooltip_mode === 'mouseover' ? gene_tooltip(d) : '')
                });
        }
        this.compute_size_annot = function (taxa_name) {

            if (taxa_name === 'LUCA') {
                return ~~(tot_width * 0.6)
            }

            var max_number_square = 0;
            var arrayLength = maxs[taxa_name].length;
            for (var i = 0; i < arrayLength; i++) {
                max_number_square += maxs[current_opened_taxa_name][i];
            }

            return max_number_square * (options.label_height + 2);

        }
        this.init_annot = function () {

            var a = tnt.board()
                .from(0)
                .zoom_in(1)
                .allow_drag(false)
                .to(5)
                .width(hogvis.compute_size_annot(current_opened_taxa_name));
            return a
        }
        this.init_track = function () {

            var track = function (leaf) {

                var sp = leaf.node_name();

                return tnt.board.track()
                    .color("#FFF")
                    .data(tnt.board.track.data.sync()
                        .retriever(function () {

                            // in case the branch is collapse we still draw empty hogs columns
                            if ( leaf.is_collapsed() ){
                               var random_collapse_leaf_name = leaf.get_all_leaves(true)[0].node_name();

                               if (per_species3[random_collapse_leaf_name] !== undefined) {

                                   var genes2Xcoords = genes_2_xcoords(per_species3[random_collapse_leaf_name][current_opened_taxa_name], maxs[current_opened_taxa_name]);
                                   genes2Xcoords.genes = [];

                                   return genes2Xcoords;
                               }

                            }

                            // return _.flatten(per_species2[sp].Vertebrates);
                            // return per_species2[sp].Vertebrates;
                            if (per_species3[sp] === undefined) {
                                return {
                                    genes: [],
                                    hogs: []
                                };
                            }
                            var genes2Xcoords = genes_2_xcoords(per_species3[sp][current_opened_taxa_name], maxs[current_opened_taxa_name]);
                            return genes2Xcoords;
                        })
                    )
                    .display(tnt.board.track.feature.composite()
                        .add("genes", hog_gene_feature)
                        .add("hogs", hog_feature)
                    )
            };

            return track
        }
        this.set_gene_xcoords = function () {

            genes_2_xcoords = function (arr, maxs) {
                if (arr === undefined) {
                    return {
                        genes: [],
                        hogs: []
                    };
                }
                var genes = [];
                var hogs_boundaries = [];
                var total_pos = 0;
                arr.forEach(function (hog_genes, hog) {
                    if (current_hog_state.removed_hogs.indexOf(hog) == -1) {
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
                            id: hog_gene_names.length ? hog_gene_names.join('_') : ("hog_" + hog)
                        });
                    }
                });

                return {
                    genes: genes,
                    hogs: hogs_boundaries.slice(0, -1),
                    //lines: [{pos : 0.7 }, {pos : 3}, {pos : 4}]
                };
            };

        }

// hogvis panel related methods
        this.init_hogvis = function () {

            var h = tnt()
                .tree(tree)
                .board(annot)
                .track(track);
            return h;
        }

// settings related methods
        this.change_genedata_vis = function (d) {
            col_scale = undefined;
            gene_color_function = function (gene) {
                return (query_gene && gene.id === query_gene.id ? "#27ae60" : "#95a5a6");
            };
            if (Object.keys(fam_genedata).length === 0) {
                //options.get_fam_gene_data(d);
                return;
            }

            var field = d.field;
            if (d.func === "color1d") {
                col_scale = d3.scale.linear()
                    .domain(d3.extent(d3.values(fam_genedata)
                        .map(function (gene) {
                            return gene[field];
                        })))
                    .range([d3.rgb("#e74c3c"), d3.rgb('#3498db')]);
                gene_color_function = function (gene) {
                    return col_scale(fam_genedata[gene.id][field]);
                };
            }
            annot.update();
            vis.update();

        };
        this.set_up_gene_tooltip_setting = function () {
            genedata_picker = d3.select("#tooltip_dropdown").selectAll(".tooltip_dropdown-li").on('click', function () {


                if (this.id === 'gt-click') {
                    gene_tooltip_mode = 'click';
                    d3.selectAll('rect.hog_gene').style("cursor", "pointer");
                    d3.select('#setting_ok_click').classed('hidden', false)
                    d3.select('#setting_ok_mouseover').classed('hidden', true)


                }
                else {
                    gene_tooltip_mode = 'mouseover';
                    d3.selectAll('rect.hog_gene').style("cursor", "none");
                    d3.select('#setting_ok_mouseover').classed('hidden', false)
                    d3.select('#setting_ok_click').classed('hidden', true)
                }

                annot.update();
                vis.update();

            });
        }
        this.set_remove_column_setting = function () {

            var update_after_reset = function(){

                current_hog_state.reset_on(tree, per_species3, current_opened_taxa_name, column_coverage_threshold);

                annot.update();
                hogvis.add_hog_header();
                vis.update();

            }

            var reset_filter = d3.select("#reset_column_filter").on('click', function (){

                $('#min_column_setting_id').val(0).change();

                column_coverage_threshold = 0;

                update_after_reset()

            })

            genedata_picker = d3.select("#min_column_setting_id").on('change', function () {

                column_coverage_threshold = this.value;
                console.log(column_coverage_threshold);

                update_after_reset()

            });
        }
        this.set_up_genedata_vis = function () {

            genedata_picker = d3.select(genedata_picker_div).selectAll(".genedata-li")
                .data(options.genedatavis);

            bar = d3.select("#colorbar");
            barText = d3.select('[id="colorbarText"]')[0][0]; // )0_o(

            genedata_picker.enter()
                .append("li")
                .attr("value", function (d) {
                    return d.name
                })
                .html(function (d) {
                    return "<a>" + d.name + '<span id="ok_icon_colorscale_' + d.name.replace(/\s/g, "") + '" class="glyphicon glyphicon-ok pull-right ok_icon_colorscale hidden" aria-hidden="true"></span> </a>'
                })
                .attr("class", "genedata-li")
                .on("click", function (d) {

                    d3.selectAll('.ok_icon_colorscale').classed('hidden', true)
                    d3.select('#ok_icon_colorscale_' + d.name.replace(/\s/g, "") ).classed('hidden', false)

                    hogvis.change_genedata_vis(d);
                    if (col_scale) {
                        colorbar = Colorbar()
                            .origin([Math.max(200, ~~(tot_width * 0.4)), 0])
                            .scale(col_scale)
                            .orient('horizontal')
                            .thickness(18)
                            .barlength(~~(tot_width * 0.8));
                        bar.call(colorbar);
                        barText.innerHTML = d.name;
                       d3.select('#scale-settings-div').classed('hidden',false)

                    } else {
                        d3.select('#scale-settings-div').classed('hidden', true)
                        bar.selectAll("svg").remove();
                        barText.innerHTML = null;
                    }
                });


            d3.select('#ok_icon_colorscale_QueryGene').classed('hidden', false)

        }
        this.add_hogvis_container = function () {
            hogvis_container = document.createElement("div");
            hogvis_container.id = "hogvis_container";
            hogvis_div.appendChild(hogvis_container);
        };

// UI related methods
// function to set up drag to resize tree and board panel
        this.set_resize_on_drag = function () {
            // rearranged code from http://stackoverflow.com/questions/26233180/resize-div-on-border-drag-and-drop

            // Add a drag div between tree and board panel
            var dragDiv = document.createElement("div");
            var tree_panel = document.getElementById("tnt_tree_container_hogvis_container");
            dragDiv.id = 'drag';
            dragDiv.style.height = $("#tnt_tree_container_hogvis_container").height() + "px";
            tree_panel.parentNode.insertBefore(dragDiv, tree_panel.nextSibling);

            var isResizing = false,
                lastDownX = 0;

            var container = $('#hogvis_container'),
                left = $('#tnt_tree_container_hogvis_container'),
                right = $('#tnt_annot_container_hogvis_container'),
                handle = $('#drag');

            if (window.PointerEvent) {
                handle.on('pointerdown', function (e) {
                    isResizing = true;
                    lastDownX = e.clientX;
                });

                $(document).on('pointermove', function (e) {
                    update_drag_move(e)
                })
                    .on('pointerup', function (e) {
                        update_drag_up(e)
                    });

            }
            else {
                //Provide fallback for user agents that do not support Pointer Events
                handle.on('mousedown', function (e) {
                    isResizing = true;
                    lastDownX = e.clientX;
                });

                $(document).on('mousemove', function (e) {
                    update_drag_move(e)
                })
                    .on('mouseup', function (e) {
                        update_drag_up(e)
                    });
            }

            function update_drag_move(e) {
                // we don't want to do anything if we aren't resizing.
                if (!isResizing)
                    return;

                // compute the new width of tree panel
                var nw = e.clientX - container.offset().left;
                //make sure that we leave at least 100 px for the annot panel and that at least 100 px large
                var nwld = Math.min(container.width() - min_width_tree_container, nw);
                nwld = Math.max(min_width_tree_container, nwld);

                // resize tree panel to new width and update board panel
                left.css('width', nwld);
                hogvis.set_scroller_width();

                // update the tree according to the new tree panel size with min 250px width
                tree.layout().width(Math.max(250, nwld - 20));
                tree.update();
            }

            function update_drag_up() {
                // stop resizing
                isResizing = false;

            };
        }
// function to set up automatic board resizing on window resize
        this.set_board_width_on_window_resize = function () {
            hogvis.set_scroller_width();
            window.onresize = function () {
                hogvis.set_scroller_width();
            }
        }
// resize the board container to fill space between tree panel and right
        this.set_scroller_width = function () {

            var viewerC = document.getElementById("hogvis_container");
            var viewerS = document.getElementById("tnt_annot_container_hogvis_container");
            var viewerT = document.getElementById("tnt_tree_container_hogvis_container");

            var scroller_width = viewerC.offsetWidth - viewerT.offsetWidth - 40;
            if (scroller_width > min_width_annot_container) {
                viewerS.style.width = scroller_width + "px";
                $('#hogvisheader').width($('#hogs').width() - 20); // Because padding of #hogs is 10px
            }
            else {
                if (viewerT.offsetWidth - scroller_width > min_width_tree_container) {
                    viewerT.style.width = viewerT.offsetWidth - scroller_width + "px";
                    $('#hogvisheader').width($('#hogs').width() - 20); // Because padding of #hogs is 10px
                }
            }

        }
// function to fixed the hogvis header block to top when scroll
        this.set_fixed_header_on_window_scroll = function () {
            var stickyHeaderTop = $('#hogvisheader').offset().top;
            $(window).scroll(function () {
                if ($(window).scrollTop() > stickyHeaderTop) {
                    $('#hogvisheader').css({
                        position: 'fixed',
                        top: '0px'
                    });
                    $('#hogvis_container').css('margin-top', $('#hogvisheader').outerHeight(true) + parseInt($('#gap_conpenser').css('marginBottom')));
                } else {
                    $('#hogvisheader').css({
                        position: 'static',
                        top: '0px'
                    });
                    $('#hogvis_container').css('margin-top', '0px');
                }
            });
        };


////////////////////
//// VARIABLES /////
////////////////////

        var hogvis = this;
        var hogvis_div = document.getElementById(hogvis_div_id);

// todo add header with function

        var hogvis_container;
        hogvis.add_hogvis_container();

        var min_width_tree_container = 100;
        var min_width_annot_container = 100;

        var tot_width = parseInt(d3.select(hogvis_container).style("width")) - 30; // todo -30 should be define by margin variables
        var maxs = get_maxs(per_species3);

// options is the options variable for Hogvis, it can be customize by using the options parameter
        var options = options_param || {};
        hogvis.set_options(options);

// tree related variable
        var current_opened_taxa_name = '';
        var is_node_frozen = false;
        var div_current_level = document.getElementById(options.current_level_div);

// coloring related variable
        var fam_genedata = {};
        var gene_color_function;
        var gene_color_data;
        var gene_color_scale = d3.scale.category10();
        var col_scale;
        var colorbar;

// settings related variable
        var gene_tooltip_mode = 'click';
        var column_coverage_threshold = 0;

        var current_hog_state = new Hog_state();

/////////////
// TREE /////
/////////////

        var collapsed_node, leaf_node, int_node, highlight_node, node_display;
        var node_hover_tooltip, treeNode_tooltip;

        // set/load the gene_data of the family
        options.get_fam_gene_data(fam_genedata);

        // set up the node appearance
        hogvis.set_node_display();

// set up tooltips on nodes
        hogvis.set_node_tooltip();

// set up the tree object
        var tree = hogvis.init_tree();
        // call callback after initialization is done
        options.post_init();

// Once the tree is build update the current level opened with the root by default
        current_opened_taxa_name = tree.root().node_name();
        current_hog_state.reset_on(tree, per_species3, current_opened_taxa_name, column_coverage_threshold);

/////////////////////////
///// GENES PANEL ///////
/////////////////////////

        var gene_tooltip;
        hogvis.set_gene_tooltip();

        //var hog_header_tooltip;
        //hogvis.set_hog_header_tooltip();

// TnT doesn't have the features we need, so create our own
// This one if for the lines defining hogs

        var hog_feature = tnt.board.track.feature();
        hogvis.set_up_hog_feature();

        var hog_gene_feature = tnt.board.track.feature();
        hogvis.set_up_hog_gene_feature();

        var annot = hogvis.init_annot();

        var track = hogvis.init_track();

        var genes_2_xcoords;
        hogvis.set_gene_xcoords();


///////////////////
///// HEADER  /////
///////////////////

        hogvis.change_genedata_vis(options.genedatavis[0]);

        var genedata_picker, bar, barText;
        hogvis.set_up_genedata_vis();

        hogvis.set_up_gene_tooltip_setting();
        hogvis.set_remove_column_setting();


///////////////////
///// HOGVIS //////
///////////////////

        var vis = hogvis.init_hogvis();
        vis(hogvis_container);

// open at root level when created
        hogvis.mouse_over_node(tree.root());


///////////////
////  UI  /////
///////////////

// make board panel sticky to tree panel and right
        hogvis.set_board_width_on_window_resize();

// make hogvis header block (scale, hogid, etc..) fixed to top when scroll
        hogvis.set_fixed_header_on_window_scroll();

// make the vis panel resizable
        hogvis.set_resize_on_drag(tree);


    }

    function Hog_state() {

        var that = this;

        this.current_level = '';
        this.hogs = undefined;
        this.number_species = 0;
        this.removed_hogs = [];

        this.reset_on = function (tree, per_species3, tax_name, treshold) {
            that.current_level = tax_name;
            that.hogs = undefined;
            that.number_species = 0;
            that.removed_hogs = [];


            var leaves = tree.root().get_all_leaves();

            for (var i = 0; i < leaves.length; i++) {

                if (per_species3[leaves[i].property('name')] != undefined && per_species3[leaves[i].property('name')][tax_name] != undefined) {

                    var slice = per_species3[leaves[i].property('name')][tax_name];

                    if (slice && slice.length > 0) {

                        that.number_species += 1;
                        that.add_genes(slice)

                    }

                }

            }

            if (that.hogs != undefined) {



                for (var i = 0; i < that.hogs.length; i++) {
                    var cov = that.hogs[i].number_species * 100 / that.number_species;
                    if (cov >= treshold) {
                        that.hogs[i].coverage = cov
                    }
                    else {
                        that.removed_hogs.push(i)
                    }
                }

                for (var i = that.removed_hogs.length - 1; i >= 0; i--) {
                    that.hogs.splice(that.removed_hogs[i], 1);
                }
            }

             if (that.removed_hogs.length > 0) {
                    $('.alert_remove').show();}
                else {
                    $('.alert_remove').hide();}

        };

        this.add_genes = function (array_hogs_with_genes) {

            if (that.hogs === undefined) {
                that.hogs = [];
                for (var i = 0; i < array_hogs_with_genes.length; i++) {
                    var h = {
                        genes: [],
                        name: 'hog_' + i,
                        number_species: 0,
                        max_in_hog: 0,
                        coverage: 0
                    };

                    that.hogs.push(h);
                }
            }

            for (var i = 0; i < array_hogs_with_genes.length; i++) {
                if (array_hogs_with_genes[i].length > 0) {
                    that.hogs[i].genes = that.hogs[i].genes.concat(array_hogs_with_genes[i]);
                    that.hogs[i].number_species += 1;
                    if (that.hogs[i].max_in_hog < array_hogs_with_genes[i].length) {
                        that.hogs[i].max_in_hog = array_hogs_with_genes[i].length
                    }
                }
            }

        }
    }

    var truncate = function (text, width) {
        text.each(function () {
            var text = d3.select(this),
                full_text = text.text(),
                low = 0, up = full_text.length, m;
            if (text.node().getComputedTextLength() > width) {
                while (low < up) {
                    m = ~~((low + up) / 2);
                    text.text(full_text.slice(0, m) + "...");
                    if (text.node().getComputedTextLength() < width) {
                        low = m;
                    } else {
                        up = m;
                    }
                }
            }
        })
    }

// get maximum number of genes per hog accross species
    var get_maxs = function (ps2) {
        var maxs = {};
        var i, sp, internal;
        for (sp in ps2) {
            if (ps2.hasOwnProperty(sp)) {
                var sp_data = ps2[sp];
                for (internal in sp_data) {
                    if (maxs[internal] === undefined) {
                        maxs[internal] = [];
                    }
                    if (sp_data.hasOwnProperty(internal)) {
                        var internal_data = sp_data[internal];
                        for (i = 0; i < internal_data.length; i++) {
                            if ((maxs[internal][i] === undefined) ||
                                (maxs[internal][i] < internal_data[i].length)) {
                                maxs[internal][i] = internal_data[i].length;
                            }
                        }
                    }
                }
            }
        }
        return maxs;
    };

    return Hogvis;
};
