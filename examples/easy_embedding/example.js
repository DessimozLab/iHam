(
  function (div) {
    var theme = iHam()
      .on('node_selected', function (node) {
        d3.select('#current-node')
          .text(node.node_name());
      })
      .query_gene({
        id: 12
      })
        .show_oma_link(false)
      .orthoxml(data.orthoxml)
      .newick(data.tree)
      .fam_data(data.fam_data)
      .tree_width(330)
      .board_width(530)
      .query_gene({id: 3965})
      .on("updating", function() {
        d3.select("#updating")
          .style("display", 'block');
      })
      .on("updated", function () {
        d3.select("#updating")
          .style("display", "none");
      })
      .on("hogs_removed", function (what) {
        if (what.length) {
          d3.select(".alert_remove")
            .style("display", "block")
        } else {
          d3.select(".alert_remove")
            .style("display", "none");
        }
      });

    theme(div);

    // Update the color schemas
    d3.select("#color-schema-dropdown")
      .selectAll("a")
      .on("click", function () {
        // Manage state of menu itself
        d3.select(this.parentNode).selectAll("a").classed("active", false);
        d3.select(this)
          .classed("active", true);

        if (d3.select(this).text() === "Query Gene") {
          theme.gene_colors(function (d) {
            return (d.id === 3965 ? "#27ae60" : "#95a5a6");
          });
        }

        if (d3.select(this).text() === "Gene Length") {
          var data = theme.fam_data();
          var domain = d3.extent(data, function (d) {
            return d.sequence_length
          });
          var colorScale = d3.scale.linear()
            .domain(domain)
            .range(["red", "blue"]);
          theme.gene_colors(function (d) {
            return colorScale(d.gene.sequence_length);
          });
        }

        if (d3.select(this).text() === "GC Content") {
          var data = theme.fam_data();
          var domain = d3.extent(data, function (d) {
            return d.gc_content
          });
          var colorScale = d3.scale.linear()
            .domain(domain)
            .range(["red", "blue"]);
          theme.gene_colors(function (d) {
            return colorScale(d.gene.gc_content);
          });
        }
      });

    // Update event for gene tooltips
    d3.select("#gene-tooltips-dropdown")
      .selectAll("a")
      .on("click", function () {
        // Manage state of menu itself
        d3.select(this.parentNode).selectAll("a").classed("active", false);
        d3.select(this)
          .classed("active", true);

        if (d3.select(this).text() === "Click") {
          theme.gene_tooltips_on("click");
        }
        if (d3.select(this).text() === "Mouseover") {
          theme.gene_tooltips_on("mouseover");
        }
      });

    // Set minimum species coverage
    d3.select("#percentage-coverage-selector").select("input")
      .on("input", function () {
        theme.coverage_threshold(d3.select(this).property("value"));
      });

    // Reset the coverage
    d3.select("#reset_column_filter")
      .on("click", function () {
        d3.select("#percentage-coverage-selector").select("input").property("value", 0);
        theme.coverage_threshold(0);
      })
  }
)(document.getElementById('iham'));
