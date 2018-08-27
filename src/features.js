// hog feature
// TnT doesn't have the features we need, so create our own

module.exports = {
  hog_feature: tnt.board.track.feature()
    .index(function (d) {
      return d.id;
    })
    .create(function (new_hog, x_scale) {
      const track = this;
      const padding = ~~(track.height() - (track.height() * 0.8)) / 2;

      const height = track.height() - ~~(padding * 2);
      const dom1 = x_scale.domain()[1];

      new_hog
        .append("line")
        .attr("class", "hog_boundary")
        .attr("x1", function (d) {
          const width = d3.min([x_scale(dom1 / d.max), height]);
          const x = width * (d.max_in_hog - 1);
          const xnext = width * d.max_in_hog;
          return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
        })
        .attr("x2", function (d) {
          const width = d3.min([x_scale(dom1 / d.max), height]);
          const x = width * (d.max_in_hog - 1);
          const xnext = width * d.max_in_hog;
          return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
        })
        .attr("y1", 0)
        .attr("y2", track.height())
        .attr("stroke-width", 2)
        .attr("stroke", "black");
    })
    .distribute(function (hogs, x_scale) {
      const track = this;
      const padding = ~~(track.height() - (track.height() * 0.8)) / 2;

      const height = track.height() - ~~(padding * 2);
      const dom1 = x_scale.domain()[1];

      hogs.select("line")
        .transition()
        .duration(200)
        .attr("x1", function (d) {
          const width = d3.min([x_scale(dom1 / d.max), height]);
          const x = width * (d.max_in_hog - 1);
          const xnext = width * d.max_in_hog;
          return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
        })
        .attr("x2", function (d) {
          const width = d3.min([x_scale(dom1 / d.max), height]);
          const x = width * (d.max_in_hog - 1);
          const xnext = width * d.max_in_hog;

          return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
        });
    }),
  hog_gene_feature: function () {
    const feature = tnt.board.track.feature();

    let color = () => "grey";

    feature.colors = function (c) {
      if (!arguments.length) {
        return color;
      }
      color = c;
      return this;
    };

    feature
      .index(function (d) {
        return d.id;
      })
      .create(function (new_elems, x_scale) {
        const track = this;
        const padding = ~~(track.height() - (track.height() * 0.8)) / 2;
        const height = track.height() - ~~(padding * 2);
        const dom1 = x_scale.domain()[1];

        new_elems
          .append("rect")
          .attr("class", "hog_gene")
          .attr("x", function (d) {
            const width = d3.min([x_scale(dom1 / d.max), height]);
            const x = width * d.pos;
            return x + padding;
          })
          .attr("y", padding)
          .attr("width", function (d) {
            const width = d3.min([x_scale(dom1 / d.max), height]);
            return width - 2 * padding;
          })
          .attr("height", height)
          .attr("fill", color);
      })
      .distribute(function (elems, x_scale) {
        const track = this;
        const padding = ~~(track.height() - (track.height() * 0.8)) / 2;
        const height = track.height() - ~~(padding * 2);
        const dom1 = x_scale.domain()[1];

        elems.select("rect")
          .transition()
          .attr("x", function (d) {
            const width = d3.min([x_scale(dom1 / d.max), height]);
            const x = width * d.pos;
            return x + padding;
          })
          .attr("width", function (d) {
            const width = d3.min([x_scale(dom1 / d.max), height]);
            return width - 2 * padding;
          });
      });

    return feature;

  },
  hog_group: tnt.board.track.feature()
    .index(d => d.name)
    .create(function (new_group, x_scale) {
      const track = this;
      const padding = ~~(track.height() - (track.height() * 0.8)) / 2;
      const height = track.height() - ~~(padding * 2);
      const dom1 = x_scale.domain()[1];

      const g = new_group
        .append('g')
        .attr('transform', (g) => {
          const width = d3.min([x_scale(dom1 / g.max), height]);
          const posx = (g.hog_start * width) + (g.max_in_hog * width) / 2;
          return `translate(${posx}, 0)`;
        })
        .style('cursor', 'pointer')
        .attr('class', d => d.name);

      g
        .append('circle')
        .attr('cx', 0)
        .attr('cy', -12)
        .attr('r', 6)
        .attr('stroke', '#95a5a6')
        .style('cursor', 'pointer')
        .style('fill', 'none');

      g
        .append('text')
        .attr('x', 0)
        .attr('y', -11)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style('fill', '#95a5a6')
        .style('font-size', '9px')
        .style('cursor', 'pointer')
        .text('?');
    })
    .distribute(function (elems, x_scale) {
      const track = this;
      const padding = ~~(track.height() - (track.height() * 0.8)) / 2;
      const height = track.height() - ~~(padding * 2);
      const dom1 = x_scale.domain()[1];

      elems.select('g')
        .transition()
        .attr('transform', function (g) {
          const width = d3.min([x_scale(dom1 / g.max), height]);
          const posx = (g.hog_start * width) + (g.max_in_hog * width) / 2;
          return `translate(${posx}, 0)`;
        })
    })
};

