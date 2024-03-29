let _mouse_over_node;
let _tree_node_tooltip;
let _gene_tooltip;
let _hog_header_tooltip;

const tooltip = require('tnt.tooltip');
const $ = require('jquery');


module.exports = {
  tree_node_tooltip: {
    display: function (node, div, actions, frozen) { // actions: (on collapse / expand) and (on freeze)
      const obj = {};
      obj.header = node.node_name();
      obj.rows = [];

      // collapse / uncollapse if internal node
      if (!node.is_leaf() || node.is_collapsed()) {
        obj.rows.push({
          value: node.is_collapsed() ? "Expand node" : "Collapse node",
          link: function (n) {
            _tree_node_tooltip.close();
            actions.on_collapse(n);
          },
          obj: node
        });
      }

      // There are 3 freezing possibilites:
      // "Freeze tree at this node",
      // "Unfreeze the tree",
      // "Re-freeze tree at this node"
      // If no frozen, freeze at this node
      if (!frozen) {
        obj.rows.push({
          value: 'Freeze at this node',
          link: function () {
            _tree_node_tooltip.close();
            actions.on_freeze("freeze");
          }
        })
      }
      // If frozen at other node, unfreeze and freeze here
      if (frozen && (frozen !== node.id())) {
        obj.rows.push({
          value: 'Unfreeze the tree',
          link: function () {
            _tree_node_tooltip.close();
            actions.on_freeze("unfreeze");
          }
        });
        obj.rows.push({
          value: 'Re-freeze tree at this node',
          link: function () {
            _tree_node_tooltip.close();
            actions.on_freeze("refreeze");
          }
        });
      }
      if (frozen && (frozen === node.id())) {
        obj.rows.push({
          value: 'Unfreeze the tree',
          link: function (n) {
            _tree_node_tooltip.close();
            actions.on_freeze("unfreeze");
          },
          obj: node
        });
      }


      _tree_node_tooltip = tooltip.list()
        .width(120)
        .id('node_click_tooltip')
        .container(div)
        .call(this, obj);
    },
    close: () => _tree_node_tooltip.close()
  },
  gene_tooltip: {
    display: function (gene, div, mouseover, show_oma_link) {
      const obj = {};
      obj.header = gene.gene.protid;
      
      function fetch_annots(gene_tooltip_obj, protid, mouseover){
          $.ajax({
            type:'get',
            url: '/api/protein/' + protid + '/gene_ontology/?format=json',
            dataType:'json',
            success: function(data) {

                var seen = new Set();
                var go_annots = []
                $.each(data, function(i, item) {
                    // console.log(item.GO_term);
                    //temp = temp + item.GO_term + " - " + item.name;
                    if (!seen.has(item.GO_term)){
                        go_annots.push({id: item.GO_term, name: item.name});
                        seen.add(item.GO_term);
                    }
                });

                if(go_annots.length==0) {
                    go_annots.push({id: "N/A", name: "N/A"});
                }

                gene.gene.go_terms = go_annots;
                // gene_tooltip_obj.call.display(gene, div, mouseover);
                var rect = gene_tooltip_obj.getBoundingClientRect();

                // console.log(type_event);

                var type_event = "click";
                if(mouseover){
                  type_event = "mouseover";
                }
                var evt = new MouseEvent(type_event, {bubbles: true, clientX: rect.right, clientY: rect.bottom});
                gene_tooltip_obj.dispatchEvent(evt);

            },
            error: function(request,status,errorThrown) {
              console.log("YES");
                gene.gene.go_terms = [{id: "N/A", name: "N/A"}];
                // gene_tooltip_obj.call.display(gene, div, mouseover);
                var rect = gene_tooltip_obj.getBoundingClientRect();

                // console.log(type_event);

                var type_event = "click";
                if(mouseover){
                  type_event = "mouseover";
                }
                var evt = new MouseEvent(type_event, {bubbles: true, clientX: rect.right, clientY: rect.bottom});
                gene_tooltip_obj.dispatchEvent(evt);

            }
        });
      };

      if(gene.gene.go_terms==""){
        fetch_annots(this, gene.gene.protid, mouseover);
      }

      obj.rows = [];
      obj.rows.push({
        label: "Cross reference",
        value:  show_oma_link ? '<a target="_blank" href="/oma/vps/' + gene.gene.xrefid +'/">' +  gene.gene.xrefid + ' </a>' : gene.gene.xrefid
      });
      obj.rows.push({label:"GO Annotations"});
      $.each(gene.gene.go_terms, function(i, item){
          obj.rows.push({label: item.id, value: item.name});
      });

      _gene_tooltip = tooltip.table()
        .width(240)
        .id('gene_tooltip')
        .container(div);

      if (mouseover) {
        _gene_tooltip.show_closer(false);
        _gene_tooltip.id("gene_tooltip_mouseover");
      }

      _gene_tooltip.call(this, obj);
    },
    close: () => _gene_tooltip.close()
  },
  hog_header_tooltip: {
    display: function (hog, taxa_name, div, show_oma_link, remote_data, augmented_orthoxml) {

      function create_tooltip(hog, header, hogid, level){

        var obj = {};
        obj.header = header ;
        obj.rows = [];
        obj.rows.push({
          value: hog.genes.length + " " + (hog.genes.length === 1 ? 'gene' : 'genes')
        });
        obj.rows.push({
          value: hog.coverage.toFixed(2) + "% species represented"
        });
        if (show_oma_link) {

          obj.rows.push({
            value: "<a href=\"/oma/hog/" + hogid + "/" + level + "/fasta\" target=\"_blank\">Sequences (Fasta)</a>"
          });
          obj.rows.push({value: "<a href=\"/oma/hog/" + hogid + "/" + level + "/table/\" target=\"_blank\"> Show "+header+ " members</a>"});

          obj.rows.push({value: "<a href=\"/oma/hog/" + hogid + "/" + level + "/iham/\" target=\"_blank\"> Set focal to "+header+ " </a>"});

        }

        _hog_header_tooltip = tooltip.list().width(180).id('hog_header_tooltip').container(div).call(this, obj);

      }

      if (remote_data  && augmented_orthoxml != true){
        $.ajax({
          url: '/api/hog/' + hog.protid + '/members/?level=' + taxa_name,
          async: false, //blocks window close
          success: function(data) {
            create_tooltip(hog, data.hog_id, encodeURIComponent(data.hog_id), encodeURIComponent(data.level))
          }
        });
      }

      else{
        create_tooltip(hog, hog.name, hog.name,  taxa_name.replace(" ", "%20") )
      }

    },
    close: () => _hog_header_tooltip.close()
  }
};


