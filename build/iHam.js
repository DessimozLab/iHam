var iHam = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/d3/d3.js
  var require_d3 = __commonJS({
    "node_modules/d3/d3.js"(exports, module) {
      !(function() {
        var d32 = {
          version: "3.5.17"
        };
        var d3_arraySlice = [].slice, d3_array = function(list) {
          return d3_arraySlice.call(list);
        };
        var d3_document = this.document;
        function d3_documentElement(node) {
          return node && (node.ownerDocument || node.document || node).documentElement;
        }
        function d3_window(node) {
          return node && (node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView);
        }
        if (d3_document) {
          try {
            d3_array(d3_document.documentElement.childNodes)[0].nodeType;
          } catch (e) {
            d3_array = function(list) {
              var i = list.length, array = new Array(i);
              while (i--) array[i] = list[i];
              return array;
            };
          }
        }
        if (!Date.now) Date.now = function() {
          return +/* @__PURE__ */ new Date();
        };
        if (d3_document) {
          try {
            d3_document.createElement("DIV").style.setProperty("opacity", 0, "");
          } catch (error) {
            var d3_element_prototype = this.Element.prototype, d3_element_setAttribute = d3_element_prototype.setAttribute, d3_element_setAttributeNS = d3_element_prototype.setAttributeNS, d3_style_prototype = this.CSSStyleDeclaration.prototype, d3_style_setProperty = d3_style_prototype.setProperty;
            d3_element_prototype.setAttribute = function(name, value) {
              d3_element_setAttribute.call(this, name, value + "");
            };
            d3_element_prototype.setAttributeNS = function(space, local, value) {
              d3_element_setAttributeNS.call(this, space, local, value + "");
            };
            d3_style_prototype.setProperty = function(name, value, priority) {
              d3_style_setProperty.call(this, name, value + "", priority);
            };
          }
        }
        d32.ascending = d3_ascending;
        function d3_ascending(a, b) {
          return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
        }
        d32.descending = function(a, b) {
          return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
        };
        d32.min = function(array, f) {
          var i = -1, n = array.length, a, b;
          if (arguments.length === 1) {
            while (++i < n) if ((b = array[i]) != null && b >= b) {
              a = b;
              break;
            }
            while (++i < n) if ((b = array[i]) != null && a > b) a = b;
          } else {
            while (++i < n) if ((b = f.call(array, array[i], i)) != null && b >= b) {
              a = b;
              break;
            }
            while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
          }
          return a;
        };
        d32.max = function(array, f) {
          var i = -1, n = array.length, a, b;
          if (arguments.length === 1) {
            while (++i < n) if ((b = array[i]) != null && b >= b) {
              a = b;
              break;
            }
            while (++i < n) if ((b = array[i]) != null && b > a) a = b;
          } else {
            while (++i < n) if ((b = f.call(array, array[i], i)) != null && b >= b) {
              a = b;
              break;
            }
            while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
          }
          return a;
        };
        d32.extent = function(array, f) {
          var i = -1, n = array.length, a, b, c;
          if (arguments.length === 1) {
            while (++i < n) if ((b = array[i]) != null && b >= b) {
              a = c = b;
              break;
            }
            while (++i < n) if ((b = array[i]) != null) {
              if (a > b) a = b;
              if (c < b) c = b;
            }
          } else {
            while (++i < n) if ((b = f.call(array, array[i], i)) != null && b >= b) {
              a = c = b;
              break;
            }
            while (++i < n) if ((b = f.call(array, array[i], i)) != null) {
              if (a > b) a = b;
              if (c < b) c = b;
            }
          }
          return [a, c];
        };
        function d3_number(x) {
          return x === null ? NaN : +x;
        }
        function d3_numeric(x) {
          return !isNaN(x);
        }
        d32.sum = function(array, f) {
          var s = 0, n = array.length, a, i = -1;
          if (arguments.length === 1) {
            while (++i < n) if (d3_numeric(a = +array[i])) s += a;
          } else {
            while (++i < n) if (d3_numeric(a = +f.call(array, array[i], i))) s += a;
          }
          return s;
        };
        d32.mean = function(array, f) {
          var s = 0, n = array.length, a, i = -1, j = n;
          if (arguments.length === 1) {
            while (++i < n) if (d3_numeric(a = d3_number(array[i]))) s += a;
            else --j;
          } else {
            while (++i < n) if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) s += a;
            else --j;
          }
          if (j) return s / j;
        };
        d32.quantile = function(values, p) {
          var H = (values.length - 1) * p + 1, h = Math.floor(H), v = +values[h - 1], e = H - h;
          return e ? v + e * (values[h] - v) : v;
        };
        d32.median = function(array, f) {
          var numbers = [], n = array.length, a, i = -1;
          if (arguments.length === 1) {
            while (++i < n) if (d3_numeric(a = d3_number(array[i]))) numbers.push(a);
          } else {
            while (++i < n) if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) numbers.push(a);
          }
          if (numbers.length) return d32.quantile(numbers.sort(d3_ascending), 0.5);
        };
        d32.variance = function(array, f) {
          var n = array.length, m = 0, a, d, s = 0, i = -1, j = 0;
          if (arguments.length === 1) {
            while (++i < n) {
              if (d3_numeric(a = d3_number(array[i]))) {
                d = a - m;
                m += d / ++j;
                s += d * (a - m);
              }
            }
          } else {
            while (++i < n) {
              if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) {
                d = a - m;
                m += d / ++j;
                s += d * (a - m);
              }
            }
          }
          if (j > 1) return s / (j - 1);
        };
        d32.deviation = function() {
          var v = d32.variance.apply(this, arguments);
          return v ? Math.sqrt(v) : v;
        };
        function d3_bisector(compare) {
          return {
            left: function(a, x, lo, hi) {
              if (arguments.length < 3) lo = 0;
              if (arguments.length < 4) hi = a.length;
              while (lo < hi) {
                var mid = lo + hi >>> 1;
                if (compare(a[mid], x) < 0) lo = mid + 1;
                else hi = mid;
              }
              return lo;
            },
            right: function(a, x, lo, hi) {
              if (arguments.length < 3) lo = 0;
              if (arguments.length < 4) hi = a.length;
              while (lo < hi) {
                var mid = lo + hi >>> 1;
                if (compare(a[mid], x) > 0) hi = mid;
                else lo = mid + 1;
              }
              return lo;
            }
          };
        }
        var d3_bisect = d3_bisector(d3_ascending);
        d32.bisectLeft = d3_bisect.left;
        d32.bisect = d32.bisectRight = d3_bisect.right;
        d32.bisector = function(f) {
          return d3_bisector(f.length === 1 ? function(d, x) {
            return d3_ascending(f(d), x);
          } : f);
        };
        d32.shuffle = function(array, i0, i1) {
          if ((m = arguments.length) < 3) {
            i1 = array.length;
            if (m < 2) i0 = 0;
          }
          var m = i1 - i0, t, i;
          while (m) {
            i = Math.random() * m-- | 0;
            t = array[m + i0], array[m + i0] = array[i + i0], array[i + i0] = t;
          }
          return array;
        };
        d32.permute = function(array, indexes) {
          var i = indexes.length, permutes = new Array(i);
          while (i--) permutes[i] = array[indexes[i]];
          return permutes;
        };
        d32.pairs = function(array) {
          var i = 0, n = array.length - 1, p0, p1 = array[0], pairs = new Array(n < 0 ? 0 : n);
          while (i < n) pairs[i] = [p0 = p1, p1 = array[++i]];
          return pairs;
        };
        d32.transpose = function(matrix) {
          if (!(n = matrix.length)) return [];
          for (var i = -1, m = d32.min(matrix, d3_transposeLength), transpose = new Array(m); ++i < m; ) {
            for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n; ) {
              row[j] = matrix[j][i];
            }
          }
          return transpose;
        };
        function d3_transposeLength(d) {
          return d.length;
        }
        d32.zip = function() {
          return d32.transpose(arguments);
        };
        d32.keys = function(map) {
          var keys = [];
          for (var key in map) keys.push(key);
          return keys;
        };
        d32.values = function(map) {
          var values = [];
          for (var key in map) values.push(map[key]);
          return values;
        };
        d32.entries = function(map) {
          var entries = [];
          for (var key in map) entries.push({
            key,
            value: map[key]
          });
          return entries;
        };
        d32.merge = function(arrays) {
          var n = arrays.length, m, i = -1, j = 0, merged, array;
          while (++i < n) j += arrays[i].length;
          merged = new Array(j);
          while (--n >= 0) {
            array = arrays[n];
            m = array.length;
            while (--m >= 0) {
              merged[--j] = array[m];
            }
          }
          return merged;
        };
        var abs = Math.abs;
        d32.range = function(start, stop, step) {
          if (arguments.length < 3) {
            step = 1;
            if (arguments.length < 2) {
              stop = start;
              start = 0;
            }
          }
          if ((stop - start) / step === Infinity) throw new Error("infinite range");
          var range = [], k = d3_range_integerScale(abs(step)), i = -1, j;
          start *= k, stop *= k, step *= k;
          if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k);
          else while ((j = start + step * ++i) < stop) range.push(j / k);
          return range;
        };
        function d3_range_integerScale(x) {
          var k = 1;
          while (x * k % 1) k *= 10;
          return k;
        }
        function d3_class(ctor, properties) {
          for (var key in properties) {
            Object.defineProperty(ctor.prototype, key, {
              value: properties[key],
              enumerable: false
            });
          }
        }
        d32.map = function(object, f) {
          var map = new d3_Map();
          if (object instanceof d3_Map) {
            object.forEach(function(key2, value) {
              map.set(key2, value);
            });
          } else if (Array.isArray(object)) {
            var i = -1, n = object.length, o;
            if (arguments.length === 1) while (++i < n) map.set(i, object[i]);
            else while (++i < n) map.set(f.call(object, o = object[i], i), o);
          } else {
            for (var key in object) map.set(key, object[key]);
          }
          return map;
        };
        function d3_Map() {
          this._ = /* @__PURE__ */ Object.create(null);
        }
        var d3_map_proto = "__proto__", d3_map_zero = "\0";
        d3_class(d3_Map, {
          has: d3_map_has,
          get: function(key) {
            return this._[d3_map_escape(key)];
          },
          set: function(key, value) {
            return this._[d3_map_escape(key)] = value;
          },
          remove: d3_map_remove,
          keys: d3_map_keys,
          values: function() {
            var values = [];
            for (var key in this._) values.push(this._[key]);
            return values;
          },
          entries: function() {
            var entries = [];
            for (var key in this._) entries.push({
              key: d3_map_unescape(key),
              value: this._[key]
            });
            return entries;
          },
          size: d3_map_size,
          empty: d3_map_empty,
          forEach: function(f) {
            for (var key in this._) f.call(this, d3_map_unescape(key), this._[key]);
          }
        });
        function d3_map_escape(key) {
          return (key += "") === d3_map_proto || key[0] === d3_map_zero ? d3_map_zero + key : key;
        }
        function d3_map_unescape(key) {
          return (key += "")[0] === d3_map_zero ? key.slice(1) : key;
        }
        function d3_map_has(key) {
          return d3_map_escape(key) in this._;
        }
        function d3_map_remove(key) {
          return (key = d3_map_escape(key)) in this._ && delete this._[key];
        }
        function d3_map_keys() {
          var keys = [];
          for (var key in this._) keys.push(d3_map_unescape(key));
          return keys;
        }
        function d3_map_size() {
          var size = 0;
          for (var key in this._) ++size;
          return size;
        }
        function d3_map_empty() {
          for (var key in this._) return false;
          return true;
        }
        d32.nest = function() {
          var nest = {}, keys = [], sortKeys = [], sortValues, rollup;
          function map(mapType, array, depth) {
            if (depth >= keys.length) return rollup ? rollup.call(nest, array) : sortValues ? array.sort(sortValues) : array;
            var i = -1, n = array.length, key = keys[depth++], keyValue, object, setter, valuesByKey = new d3_Map(), values;
            while (++i < n) {
              if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
                values.push(object);
              } else {
                valuesByKey.set(keyValue, [object]);
              }
            }
            if (mapType) {
              object = mapType();
              setter = function(keyValue2, values2) {
                object.set(keyValue2, map(mapType, values2, depth));
              };
            } else {
              object = {};
              setter = function(keyValue2, values2) {
                object[keyValue2] = map(mapType, values2, depth);
              };
            }
            valuesByKey.forEach(setter);
            return object;
          }
          function entries(map2, depth) {
            if (depth >= keys.length) return map2;
            var array = [], sortKey = sortKeys[depth++];
            map2.forEach(function(key, keyMap) {
              array.push({
                key,
                values: entries(keyMap, depth)
              });
            });
            return sortKey ? array.sort(function(a, b) {
              return sortKey(a.key, b.key);
            }) : array;
          }
          nest.map = function(array, mapType) {
            return map(mapType, array, 0);
          };
          nest.entries = function(array) {
            return entries(map(d32.map, array, 0), 0);
          };
          nest.key = function(d) {
            keys.push(d);
            return nest;
          };
          nest.sortKeys = function(order) {
            sortKeys[keys.length - 1] = order;
            return nest;
          };
          nest.sortValues = function(order) {
            sortValues = order;
            return nest;
          };
          nest.rollup = function(f) {
            rollup = f;
            return nest;
          };
          return nest;
        };
        d32.set = function(array) {
          var set = new d3_Set();
          if (array) for (var i = 0, n = array.length; i < n; ++i) set.add(array[i]);
          return set;
        };
        function d3_Set() {
          this._ = /* @__PURE__ */ Object.create(null);
        }
        d3_class(d3_Set, {
          has: d3_map_has,
          add: function(key) {
            this._[d3_map_escape(key += "")] = true;
            return key;
          },
          remove: d3_map_remove,
          values: d3_map_keys,
          size: d3_map_size,
          empty: d3_map_empty,
          forEach: function(f) {
            for (var key in this._) f.call(this, d3_map_unescape(key));
          }
        });
        d32.behavior = {};
        function d3_identity(d) {
          return d;
        }
        d32.rebind = function(target, source) {
          var i = 1, n = arguments.length, method;
          while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
          return target;
        };
        function d3_rebind(target, source, method) {
          return function() {
            var value = method.apply(source, arguments);
            return value === source ? target : value;
          };
        }
        function d3_vendorSymbol(object, name) {
          if (name in object) return name;
          name = name.charAt(0).toUpperCase() + name.slice(1);
          for (var i = 0, n = d3_vendorPrefixes.length; i < n; ++i) {
            var prefixName = d3_vendorPrefixes[i] + name;
            if (prefixName in object) return prefixName;
          }
        }
        var d3_vendorPrefixes = ["webkit", "ms", "moz", "Moz", "o", "O"];
        function d3_noop() {
        }
        d32.dispatch = function() {
          var dispatch = new d3_dispatch(), i = -1, n = arguments.length;
          while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
          return dispatch;
        };
        function d3_dispatch() {
        }
        d3_dispatch.prototype.on = function(type, listener) {
          var i = type.indexOf("."), name = "";
          if (i >= 0) {
            name = type.slice(i + 1);
            type = type.slice(0, i);
          }
          if (type) return arguments.length < 2 ? this[type].on(name) : this[type].on(name, listener);
          if (arguments.length === 2) {
            if (listener == null) for (type in this) {
              if (this.hasOwnProperty(type)) this[type].on(name, null);
            }
            return this;
          }
        };
        function d3_dispatch_event(dispatch) {
          var listeners = [], listenerByName = new d3_Map();
          function event() {
            var z = listeners, i = -1, n = z.length, l;
            while (++i < n) if (l = z[i].on) l.apply(this, arguments);
            return dispatch;
          }
          event.on = function(name, listener) {
            var l = listenerByName.get(name), i;
            if (arguments.length < 2) return l && l.on;
            if (l) {
              l.on = null;
              listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
              listenerByName.remove(name);
            }
            if (listener) listeners.push(listenerByName.set(name, {
              on: listener
            }));
            return dispatch;
          };
          return event;
        }
        d32.event = null;
        function d3_eventPreventDefault() {
          d32.event.preventDefault();
        }
        function d3_eventSource() {
          var e = d32.event, s;
          while (s = e.sourceEvent) e = s;
          return e;
        }
        function d3_eventDispatch(target) {
          var dispatch = new d3_dispatch(), i = 0, n = arguments.length;
          while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
          dispatch.of = function(thiz, argumentz) {
            return function(e1) {
              try {
                var e0 = e1.sourceEvent = d32.event;
                e1.target = target;
                d32.event = e1;
                dispatch[e1.type].apply(thiz, argumentz);
              } finally {
                d32.event = e0;
              }
            };
          };
          return dispatch;
        }
        d32.requote = function(s) {
          return s.replace(d3_requote_re, "\\$&");
        };
        var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
        var d3_subclass = {}.__proto__ ? function(object, prototype) {
          object.__proto__ = prototype;
        } : function(object, prototype) {
          for (var property in prototype) object[property] = prototype[property];
        };
        function d3_selection(groups) {
          d3_subclass(groups, d3_selectionPrototype);
          return groups;
        }
        var d3_select = function(s, n) {
          return n.querySelector(s);
        }, d3_selectAll = function(s, n) {
          return n.querySelectorAll(s);
        }, d3_selectMatches = function(n, s) {
          var d3_selectMatcher = n.matches || n[d3_vendorSymbol(n, "matchesSelector")];
          d3_selectMatches = function(n2, s2) {
            return d3_selectMatcher.call(n2, s2);
          };
          return d3_selectMatches(n, s);
        };
        if (typeof Sizzle === "function") {
          d3_select = function(s, n) {
            return Sizzle(s, n)[0] || null;
          };
          d3_selectAll = Sizzle;
          d3_selectMatches = Sizzle.matchesSelector;
        }
        d32.selection = function() {
          return d32.select(d3_document.documentElement);
        };
        var d3_selectionPrototype = d32.selection.prototype = [];
        d3_selectionPrototype.select = function(selector) {
          var subgroups = [], subgroup, subnode, group, node;
          selector = d3_selection_selector(selector);
          for (var j = -1, m = this.length; ++j < m; ) {
            subgroups.push(subgroup = []);
            subgroup.parentNode = (group = this[j]).parentNode;
            for (var i = -1, n = group.length; ++i < n; ) {
              if (node = group[i]) {
                subgroup.push(subnode = selector.call(node, node.__data__, i, j));
                if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
              } else {
                subgroup.push(null);
              }
            }
          }
          return d3_selection(subgroups);
        };
        function d3_selection_selector(selector) {
          return typeof selector === "function" ? selector : function() {
            return d3_select(selector, this);
          };
        }
        d3_selectionPrototype.selectAll = function(selector) {
          var subgroups = [], subgroup, node;
          selector = d3_selection_selectorAll(selector);
          for (var j = -1, m = this.length; ++j < m; ) {
            for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
              if (node = group[i]) {
                subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i, j)));
                subgroup.parentNode = node;
              }
            }
          }
          return d3_selection(subgroups);
        };
        function d3_selection_selectorAll(selector) {
          return typeof selector === "function" ? selector : function() {
            return d3_selectAll(selector, this);
          };
        }
        var d3_nsXhtml = "http://www.w3.org/1999/xhtml";
        var d3_nsPrefix = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: d3_nsXhtml,
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/"
        };
        d32.ns = {
          prefix: d3_nsPrefix,
          qualify: function(name) {
            var i = name.indexOf(":"), prefix = name;
            if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
            return d3_nsPrefix.hasOwnProperty(prefix) ? {
              space: d3_nsPrefix[prefix],
              local: name
            } : name;
          }
        };
        d3_selectionPrototype.attr = function(name, value) {
          if (arguments.length < 2) {
            if (typeof name === "string") {
              var node = this.node();
              name = d32.ns.qualify(name);
              return name.local ? node.getAttributeNS(name.space, name.local) : node.getAttribute(name);
            }
            for (value in name) this.each(d3_selection_attr(value, name[value]));
            return this;
          }
          return this.each(d3_selection_attr(name, value));
        };
        function d3_selection_attr(name, value) {
          name = d32.ns.qualify(name);
          function attrNull() {
            this.removeAttribute(name);
          }
          function attrNullNS() {
            this.removeAttributeNS(name.space, name.local);
          }
          function attrConstant() {
            this.setAttribute(name, value);
          }
          function attrConstantNS() {
            this.setAttributeNS(name.space, name.local, value);
          }
          function attrFunction() {
            var x = value.apply(this, arguments);
            if (x == null) this.removeAttribute(name);
            else this.setAttribute(name, x);
          }
          function attrFunctionNS() {
            var x = value.apply(this, arguments);
            if (x == null) this.removeAttributeNS(name.space, name.local);
            else this.setAttributeNS(name.space, name.local, x);
          }
          return value == null ? name.local ? attrNullNS : attrNull : typeof value === "function" ? name.local ? attrFunctionNS : attrFunction : name.local ? attrConstantNS : attrConstant;
        }
        function d3_collapse(s) {
          return s.trim().replace(/\s+/g, " ");
        }
        d3_selectionPrototype.classed = function(name, value) {
          if (arguments.length < 2) {
            if (typeof name === "string") {
              var node = this.node(), n = (name = d3_selection_classes(name)).length, i = -1;
              if (value = node.classList) {
                while (++i < n) if (!value.contains(name[i])) return false;
              } else {
                value = node.getAttribute("class");
                while (++i < n) if (!d3_selection_classedRe(name[i]).test(value)) return false;
              }
              return true;
            }
            for (value in name) this.each(d3_selection_classed(value, name[value]));
            return this;
          }
          return this.each(d3_selection_classed(name, value));
        };
        function d3_selection_classedRe(name) {
          return new RegExp("(?:^|\\s+)" + d32.requote(name) + "(?:\\s+|$)", "g");
        }
        function d3_selection_classes(name) {
          return (name + "").trim().split(/^|\s+/);
        }
        function d3_selection_classed(name, value) {
          name = d3_selection_classes(name).map(d3_selection_classedName);
          var n = name.length;
          function classedConstant() {
            var i = -1;
            while (++i < n) name[i](this, value);
          }
          function classedFunction() {
            var i = -1, x = value.apply(this, arguments);
            while (++i < n) name[i](this, x);
          }
          return typeof value === "function" ? classedFunction : classedConstant;
        }
        function d3_selection_classedName(name) {
          var re = d3_selection_classedRe(name);
          return function(node, value) {
            if (c = node.classList) return value ? c.add(name) : c.remove(name);
            var c = node.getAttribute("class") || "";
            if (value) {
              re.lastIndex = 0;
              if (!re.test(c)) node.setAttribute("class", d3_collapse(c + " " + name));
            } else {
              node.setAttribute("class", d3_collapse(c.replace(re, " ")));
            }
          };
        }
        d3_selectionPrototype.style = function(name, value, priority) {
          var n = arguments.length;
          if (n < 3) {
            if (typeof name !== "string") {
              if (n < 2) value = "";
              for (priority in name) this.each(d3_selection_style(priority, name[priority], value));
              return this;
            }
            if (n < 2) {
              var node = this.node();
              return d3_window(node).getComputedStyle(node, null).getPropertyValue(name);
            }
            priority = "";
          }
          return this.each(d3_selection_style(name, value, priority));
        };
        function d3_selection_style(name, value, priority) {
          function styleNull() {
            this.style.removeProperty(name);
          }
          function styleConstant() {
            this.style.setProperty(name, value, priority);
          }
          function styleFunction() {
            var x = value.apply(this, arguments);
            if (x == null) this.style.removeProperty(name);
            else this.style.setProperty(name, x, priority);
          }
          return value == null ? styleNull : typeof value === "function" ? styleFunction : styleConstant;
        }
        d3_selectionPrototype.property = function(name, value) {
          if (arguments.length < 2) {
            if (typeof name === "string") return this.node()[name];
            for (value in name) this.each(d3_selection_property(value, name[value]));
            return this;
          }
          return this.each(d3_selection_property(name, value));
        };
        function d3_selection_property(name, value) {
          function propertyNull() {
            delete this[name];
          }
          function propertyConstant() {
            this[name] = value;
          }
          function propertyFunction() {
            var x = value.apply(this, arguments);
            if (x == null) delete this[name];
            else this[name] = x;
          }
          return value == null ? propertyNull : typeof value === "function" ? propertyFunction : propertyConstant;
        }
        d3_selectionPrototype.text = function(value) {
          return arguments.length ? this.each(typeof value === "function" ? function() {
            var v = value.apply(this, arguments);
            this.textContent = v == null ? "" : v;
          } : value == null ? function() {
            this.textContent = "";
          } : function() {
            this.textContent = value;
          }) : this.node().textContent;
        };
        d3_selectionPrototype.html = function(value) {
          return arguments.length ? this.each(typeof value === "function" ? function() {
            var v = value.apply(this, arguments);
            this.innerHTML = v == null ? "" : v;
          } : value == null ? function() {
            this.innerHTML = "";
          } : function() {
            this.innerHTML = value;
          }) : this.node().innerHTML;
        };
        d3_selectionPrototype.append = function(name) {
          name = d3_selection_creator(name);
          return this.select(function() {
            return this.appendChild(name.apply(this, arguments));
          });
        };
        function d3_selection_creator(name) {
          function create() {
            var document2 = this.ownerDocument, namespace = this.namespaceURI;
            return namespace === d3_nsXhtml && document2.documentElement.namespaceURI === d3_nsXhtml ? document2.createElement(name) : document2.createElementNS(namespace, name);
          }
          function createNS() {
            return this.ownerDocument.createElementNS(name.space, name.local);
          }
          return typeof name === "function" ? name : (name = d32.ns.qualify(name)).local ? createNS : create;
        }
        d3_selectionPrototype.insert = function(name, before) {
          name = d3_selection_creator(name);
          before = d3_selection_selector(before);
          return this.select(function() {
            return this.insertBefore(name.apply(this, arguments), before.apply(this, arguments) || null);
          });
        };
        d3_selectionPrototype.remove = function() {
          return this.each(d3_selectionRemove);
        };
        function d3_selectionRemove() {
          var parent = this.parentNode;
          if (parent) parent.removeChild(this);
        }
        d3_selectionPrototype.data = function(value, key) {
          var i = -1, n = this.length, group, node;
          if (!arguments.length) {
            value = new Array(n = (group = this[0]).length);
            while (++i < n) {
              if (node = group[i]) {
                value[i] = node.__data__;
              }
            }
            return value;
          }
          function bind(group2, groupData) {
            var i2, n2 = group2.length, m = groupData.length, n0 = Math.min(n2, m), updateNodes = new Array(m), enterNodes = new Array(m), exitNodes = new Array(n2), node2, nodeData;
            if (key) {
              var nodeByKeyValue = new d3_Map(), keyValues = new Array(n2), keyValue;
              for (i2 = -1; ++i2 < n2; ) {
                if (node2 = group2[i2]) {
                  if (nodeByKeyValue.has(keyValue = key.call(node2, node2.__data__, i2))) {
                    exitNodes[i2] = node2;
                  } else {
                    nodeByKeyValue.set(keyValue, node2);
                  }
                  keyValues[i2] = keyValue;
                }
              }
              for (i2 = -1; ++i2 < m; ) {
                if (!(node2 = nodeByKeyValue.get(keyValue = key.call(groupData, nodeData = groupData[i2], i2)))) {
                  enterNodes[i2] = d3_selection_dataNode(nodeData);
                } else if (node2 !== true) {
                  updateNodes[i2] = node2;
                  node2.__data__ = nodeData;
                }
                nodeByKeyValue.set(keyValue, true);
              }
              for (i2 = -1; ++i2 < n2; ) {
                if (i2 in keyValues && nodeByKeyValue.get(keyValues[i2]) !== true) {
                  exitNodes[i2] = group2[i2];
                }
              }
            } else {
              for (i2 = -1; ++i2 < n0; ) {
                node2 = group2[i2];
                nodeData = groupData[i2];
                if (node2) {
                  node2.__data__ = nodeData;
                  updateNodes[i2] = node2;
                } else {
                  enterNodes[i2] = d3_selection_dataNode(nodeData);
                }
              }
              for (; i2 < m; ++i2) {
                enterNodes[i2] = d3_selection_dataNode(groupData[i2]);
              }
              for (; i2 < n2; ++i2) {
                exitNodes[i2] = group2[i2];
              }
            }
            enterNodes.update = updateNodes;
            enterNodes.parentNode = updateNodes.parentNode = exitNodes.parentNode = group2.parentNode;
            enter.push(enterNodes);
            update.push(updateNodes);
            exit.push(exitNodes);
          }
          var enter = d3_selection_enter([]), update = d3_selection([]), exit = d3_selection([]);
          if (typeof value === "function") {
            while (++i < n) {
              bind(group = this[i], value.call(group, group.parentNode.__data__, i));
            }
          } else {
            while (++i < n) {
              bind(group = this[i], value);
            }
          }
          update.enter = function() {
            return enter;
          };
          update.exit = function() {
            return exit;
          };
          return update;
        };
        function d3_selection_dataNode(data) {
          return {
            __data__: data
          };
        }
        d3_selectionPrototype.datum = function(value) {
          return arguments.length ? this.property("__data__", value) : this.property("__data__");
        };
        d3_selectionPrototype.filter = function(filter) {
          var subgroups = [], subgroup, group, node;
          if (typeof filter !== "function") filter = d3_selection_filter(filter);
          for (var j = 0, m = this.length; j < m; j++) {
            subgroups.push(subgroup = []);
            subgroup.parentNode = (group = this[j]).parentNode;
            for (var i = 0, n = group.length; i < n; i++) {
              if ((node = group[i]) && filter.call(node, node.__data__, i, j)) {
                subgroup.push(node);
              }
            }
          }
          return d3_selection(subgroups);
        };
        function d3_selection_filter(selector) {
          return function() {
            return d3_selectMatches(this, selector);
          };
        }
        d3_selectionPrototype.order = function() {
          for (var j = -1, m = this.length; ++j < m; ) {
            for (var group = this[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
              if (node = group[i]) {
                if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
                next = node;
              }
            }
          }
          return this;
        };
        d3_selectionPrototype.sort = function(comparator) {
          comparator = d3_selection_sortComparator.apply(this, arguments);
          for (var j = -1, m = this.length; ++j < m; ) this[j].sort(comparator);
          return this.order();
        };
        function d3_selection_sortComparator(comparator) {
          if (!arguments.length) comparator = d3_ascending;
          return function(a, b) {
            return a && b ? comparator(a.__data__, b.__data__) : !a - !b;
          };
        }
        d3_selectionPrototype.each = function(callback) {
          return d3_selection_each(this, function(node, i, j) {
            callback.call(node, node.__data__, i, j);
          });
        };
        function d3_selection_each(groups, callback) {
          for (var j = 0, m = groups.length; j < m; j++) {
            for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
              if (node = group[i]) callback(node, i, j);
            }
          }
          return groups;
        }
        d3_selectionPrototype.call = function(callback) {
          var args = d3_array(arguments);
          callback.apply(args[0] = this, args);
          return this;
        };
        d3_selectionPrototype.empty = function() {
          return !this.node();
        };
        d3_selectionPrototype.node = function() {
          for (var j = 0, m = this.length; j < m; j++) {
            for (var group = this[j], i = 0, n = group.length; i < n; i++) {
              var node = group[i];
              if (node) return node;
            }
          }
          return null;
        };
        d3_selectionPrototype.size = function() {
          var n = 0;
          d3_selection_each(this, function() {
            ++n;
          });
          return n;
        };
        function d3_selection_enter(selection) {
          d3_subclass(selection, d3_selection_enterPrototype);
          return selection;
        }
        var d3_selection_enterPrototype = [];
        d32.selection.enter = d3_selection_enter;
        d32.selection.enter.prototype = d3_selection_enterPrototype;
        d3_selection_enterPrototype.append = d3_selectionPrototype.append;
        d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
        d3_selection_enterPrototype.node = d3_selectionPrototype.node;
        d3_selection_enterPrototype.call = d3_selectionPrototype.call;
        d3_selection_enterPrototype.size = d3_selectionPrototype.size;
        d3_selection_enterPrototype.select = function(selector) {
          var subgroups = [], subgroup, subnode, upgroup, group, node;
          for (var j = -1, m = this.length; ++j < m; ) {
            upgroup = (group = this[j]).update;
            subgroups.push(subgroup = []);
            subgroup.parentNode = group.parentNode;
            for (var i = -1, n = group.length; ++i < n; ) {
              if (node = group[i]) {
                subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i, j));
                subnode.__data__ = node.__data__;
              } else {
                subgroup.push(null);
              }
            }
          }
          return d3_selection(subgroups);
        };
        d3_selection_enterPrototype.insert = function(name, before) {
          if (arguments.length < 2) before = d3_selection_enterInsertBefore(this);
          return d3_selectionPrototype.insert.call(this, name, before);
        };
        function d3_selection_enterInsertBefore(enter) {
          var i0, j0;
          return function(d, i, j) {
            var group = enter[j].update, n = group.length, node;
            if (j != j0) j0 = j, i0 = 0;
            if (i >= i0) i0 = i + 1;
            while (!(node = group[i0]) && ++i0 < n) ;
            return node;
          };
        }
        d32.select = function(node) {
          var group;
          if (typeof node === "string") {
            group = [d3_select(node, d3_document)];
            group.parentNode = d3_document.documentElement;
          } else {
            group = [node];
            group.parentNode = d3_documentElement(node);
          }
          return d3_selection([group]);
        };
        d32.selectAll = function(nodes) {
          var group;
          if (typeof nodes === "string") {
            group = d3_array(d3_selectAll(nodes, d3_document));
            group.parentNode = d3_document.documentElement;
          } else {
            group = d3_array(nodes);
            group.parentNode = null;
          }
          return d3_selection([group]);
        };
        d3_selectionPrototype.on = function(type, listener, capture) {
          var n = arguments.length;
          if (n < 3) {
            if (typeof type !== "string") {
              if (n < 2) listener = false;
              for (capture in type) this.each(d3_selection_on(capture, type[capture], listener));
              return this;
            }
            if (n < 2) return (n = this.node()["__on" + type]) && n._;
            capture = false;
          }
          return this.each(d3_selection_on(type, listener, capture));
        };
        function d3_selection_on(type, listener, capture) {
          var name = "__on" + type, i = type.indexOf("."), wrap = d3_selection_onListener;
          if (i > 0) type = type.slice(0, i);
          var filter = d3_selection_onFilters.get(type);
          if (filter) type = filter, wrap = d3_selection_onFilter;
          function onRemove() {
            var l = this[name];
            if (l) {
              this.removeEventListener(type, l, l.$);
              delete this[name];
            }
          }
          function onAdd() {
            var l = wrap(listener, d3_array(arguments));
            onRemove.call(this);
            this.addEventListener(type, this[name] = l, l.$ = capture);
            l._ = listener;
          }
          function removeAll() {
            var re = new RegExp("^__on([^.]+)" + d32.requote(type) + "$"), match;
            for (var name2 in this) {
              if (match = name2.match(re)) {
                var l = this[name2];
                this.removeEventListener(match[1], l, l.$);
                delete this[name2];
              }
            }
          }
          return i ? listener ? onAdd : onRemove : listener ? d3_noop : removeAll;
        }
        var d3_selection_onFilters = d32.map({
          mouseenter: "mouseover",
          mouseleave: "mouseout"
        });
        if (d3_document) {
          d3_selection_onFilters.forEach(function(k) {
            if ("on" + k in d3_document) d3_selection_onFilters.remove(k);
          });
        }
        function d3_selection_onListener(listener, argumentz) {
          return function(e) {
            var o = d32.event;
            d32.event = e;
            argumentz[0] = this.__data__;
            try {
              listener.apply(this, argumentz);
            } finally {
              d32.event = o;
            }
          };
        }
        function d3_selection_onFilter(listener, argumentz) {
          var l = d3_selection_onListener(listener, argumentz);
          return function(e) {
            var target = this, related = e.relatedTarget;
            if (!related || related !== target && !(related.compareDocumentPosition(target) & 8)) {
              l.call(target, e);
            }
          };
        }
        var d3_event_dragSelect, d3_event_dragId = 0;
        function d3_event_dragSuppress(node) {
          var name = ".dragsuppress-" + ++d3_event_dragId, click = "click" + name, w = d32.select(d3_window(node)).on("touchmove" + name, d3_eventPreventDefault).on("dragstart" + name, d3_eventPreventDefault).on("selectstart" + name, d3_eventPreventDefault);
          if (d3_event_dragSelect == null) {
            d3_event_dragSelect = "onselectstart" in node ? false : d3_vendorSymbol(node.style, "userSelect");
          }
          if (d3_event_dragSelect) {
            var style = d3_documentElement(node).style, select = style[d3_event_dragSelect];
            style[d3_event_dragSelect] = "none";
          }
          return function(suppressClick) {
            w.on(name, null);
            if (d3_event_dragSelect) style[d3_event_dragSelect] = select;
            if (suppressClick) {
              var off = function() {
                w.on(click, null);
              };
              w.on(click, function() {
                d3_eventPreventDefault();
                off();
              }, true);
              setTimeout(off, 0);
            }
          };
        }
        d32.mouse = function(container) {
          return d3_mousePoint(container, d3_eventSource());
        };
        var d3_mouse_bug44083 = this.navigator && /WebKit/.test(this.navigator.userAgent) ? -1 : 0;
        function d3_mousePoint(container, e) {
          if (e.changedTouches) e = e.changedTouches[0];
          var svg = container.ownerSVGElement || container;
          if (svg.createSVGPoint) {
            var point = svg.createSVGPoint();
            if (d3_mouse_bug44083 < 0) {
              var window2 = d3_window(container);
              if (window2.scrollX || window2.scrollY) {
                svg = d32.select("body").append("svg").style({
                  position: "absolute",
                  top: 0,
                  left: 0,
                  margin: 0,
                  padding: 0,
                  border: "none"
                }, "important");
                var ctm = svg[0][0].getScreenCTM();
                d3_mouse_bug44083 = !(ctm.f || ctm.e);
                svg.remove();
              }
            }
            if (d3_mouse_bug44083) point.x = e.pageX, point.y = e.pageY;
            else point.x = e.clientX, point.y = e.clientY;
            point = point.matrixTransform(container.getScreenCTM().inverse());
            return [point.x, point.y];
          }
          var rect = container.getBoundingClientRect();
          return [e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop];
        }
        d32.touch = function(container, touches, identifier) {
          if (arguments.length < 3) identifier = touches, touches = d3_eventSource().changedTouches;
          if (touches) for (var i = 0, n = touches.length, touch; i < n; ++i) {
            if ((touch = touches[i]).identifier === identifier) {
              return d3_mousePoint(container, touch);
            }
          }
        };
        d32.behavior.drag = function() {
          var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"), origin = null, mousedown = dragstart(d3_noop, d32.mouse, d3_window, "mousemove", "mouseup"), touchstart = dragstart(d3_behavior_dragTouchId, d32.touch, d3_identity, "touchmove", "touchend");
          function drag() {
            this.on("mousedown.drag", mousedown).on("touchstart.drag", touchstart);
          }
          function dragstart(id, position, subject, move, end) {
            return function() {
              var that = this, target = d32.event.target.correspondingElement || d32.event.target, parent = that.parentNode, dispatch = event.of(that, arguments), dragged = 0, dragId = id(), dragName = ".drag" + (dragId == null ? "" : "-" + dragId), dragOffset, dragSubject = d32.select(subject(target)).on(move + dragName, moved).on(end + dragName, ended), dragRestore = d3_event_dragSuppress(target), position0 = position(parent, dragId);
              if (origin) {
                dragOffset = origin.apply(that, arguments);
                dragOffset = [dragOffset.x - position0[0], dragOffset.y - position0[1]];
              } else {
                dragOffset = [0, 0];
              }
              dispatch({
                type: "dragstart"
              });
              function moved() {
                var position1 = position(parent, dragId), dx, dy;
                if (!position1) return;
                dx = position1[0] - position0[0];
                dy = position1[1] - position0[1];
                dragged |= dx | dy;
                position0 = position1;
                dispatch({
                  type: "drag",
                  x: position1[0] + dragOffset[0],
                  y: position1[1] + dragOffset[1],
                  dx,
                  dy
                });
              }
              function ended() {
                if (!position(parent, dragId)) return;
                dragSubject.on(move + dragName, null).on(end + dragName, null);
                dragRestore(dragged);
                dispatch({
                  type: "dragend"
                });
              }
            };
          }
          drag.origin = function(x) {
            if (!arguments.length) return origin;
            origin = x;
            return drag;
          };
          return d32.rebind(drag, event, "on");
        };
        function d3_behavior_dragTouchId() {
          return d32.event.changedTouches[0].identifier;
        }
        d32.touches = function(container, touches) {
          if (arguments.length < 2) touches = d3_eventSource().touches;
          return touches ? d3_array(touches).map(function(touch) {
            var point = d3_mousePoint(container, touch);
            point.identifier = touch.identifier;
            return point;
          }) : [];
        };
        var \u03B5 = 1e-6, \u03B52 = \u03B5 * \u03B5, \u03C0 = Math.PI, \u03C4 = 2 * \u03C0, \u03C4\u03B5 = \u03C4 - \u03B5, half\u03C0 = \u03C0 / 2, d3_radians = \u03C0 / 180, d3_degrees = 180 / \u03C0;
        function d3_sgn(x) {
          return x > 0 ? 1 : x < 0 ? -1 : 0;
        }
        function d3_cross2d(a, b, c) {
          return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
        }
        function d3_acos(x) {
          return x > 1 ? 0 : x < -1 ? \u03C0 : Math.acos(x);
        }
        function d3_asin(x) {
          return x > 1 ? half\u03C0 : x < -1 ? -half\u03C0 : Math.asin(x);
        }
        function d3_sinh(x) {
          return ((x = Math.exp(x)) - 1 / x) / 2;
        }
        function d3_cosh(x) {
          return ((x = Math.exp(x)) + 1 / x) / 2;
        }
        function d3_tanh(x) {
          return ((x = Math.exp(2 * x)) - 1) / (x + 1);
        }
        function d3_haversin(x) {
          return (x = Math.sin(x / 2)) * x;
        }
        var \u03C1 = Math.SQRT2, \u03C12 = 2, \u03C14 = 4;
        d32.interpolateZoom = function(p0, p1) {
          var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
          if (d2 < \u03B52) {
            S = Math.log(w1 / w0) / \u03C1;
            i = function(t) {
              return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(\u03C1 * t * S)];
            };
          } else {
            var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + \u03C14 * d2) / (2 * w0 * \u03C12 * d1), b1 = (w1 * w1 - w0 * w0 - \u03C14 * d2) / (2 * w1 * \u03C12 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
            S = (r1 - r0) / \u03C1;
            i = function(t) {
              var s = t * S, coshr0 = d3_cosh(r0), u = w0 / (\u03C12 * d1) * (coshr0 * d3_tanh(\u03C1 * s + r0) - d3_sinh(r0));
              return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / d3_cosh(\u03C1 * s + r0)];
            };
          }
          i.duration = S * 1e3;
          return i;
        };
        d32.behavior.zoom = function() {
          var view = {
            x: 0,
            y: 0,
            k: 1
          }, translate0, center0, center, size = [960, 500], scaleExtent = d3_behavior_zoomInfinity, duration = 250, zooming = 0, mousedown = "mousedown.zoom", mousemove = "mousemove.zoom", mouseup = "mouseup.zoom", mousewheelTimer, touchstart = "touchstart.zoom", touchtime, event = d3_eventDispatch(zoom, "zoomstart", "zoom", "zoomend"), x0, x1, y0, y1;
          if (!d3_behavior_zoomWheel) {
            d3_behavior_zoomWheel = "onwheel" in d3_document ? (d3_behavior_zoomDelta = function() {
              return -d32.event.deltaY * (d32.event.deltaMode ? 120 : 1);
            }, "wheel") : "onmousewheel" in d3_document ? (d3_behavior_zoomDelta = function() {
              return d32.event.wheelDelta;
            }, "mousewheel") : (d3_behavior_zoomDelta = function() {
              return -d32.event.detail;
            }, "MozMousePixelScroll");
          }
          function zoom(g) {
            g.on(mousedown, mousedowned).on(d3_behavior_zoomWheel + ".zoom", mousewheeled).on("dblclick.zoom", dblclicked).on(touchstart, touchstarted);
          }
          zoom.event = function(g) {
            g.each(function() {
              var dispatch = event.of(this, arguments), view1 = view;
              if (d3_transitionInheritId) {
                d32.select(this).transition().each("start.zoom", function() {
                  view = this.__chart__ || {
                    x: 0,
                    y: 0,
                    k: 1
                  };
                  zoomstarted(dispatch);
                }).tween("zoom:zoom", function() {
                  var dx = size[0], dy = size[1], cx = center0 ? center0[0] : dx / 2, cy = center0 ? center0[1] : dy / 2, i = d32.interpolateZoom([(cx - view.x) / view.k, (cy - view.y) / view.k, dx / view.k], [(cx - view1.x) / view1.k, (cy - view1.y) / view1.k, dx / view1.k]);
                  return function(t) {
                    var l = i(t), k = dx / l[2];
                    this.__chart__ = view = {
                      x: cx - l[0] * k,
                      y: cy - l[1] * k,
                      k
                    };
                    zoomed(dispatch);
                  };
                }).each("interrupt.zoom", function() {
                  zoomended(dispatch);
                }).each("end.zoom", function() {
                  zoomended(dispatch);
                });
              } else {
                this.__chart__ = view;
                zoomstarted(dispatch);
                zoomed(dispatch);
                zoomended(dispatch);
              }
            });
          };
          zoom.translate = function(_) {
            if (!arguments.length) return [view.x, view.y];
            view = {
              x: +_[0],
              y: +_[1],
              k: view.k
            };
            rescale();
            return zoom;
          };
          zoom.scale = function(_) {
            if (!arguments.length) return view.k;
            view = {
              x: view.x,
              y: view.y,
              k: null
            };
            scaleTo(+_);
            rescale();
            return zoom;
          };
          zoom.scaleExtent = function(_) {
            if (!arguments.length) return scaleExtent;
            scaleExtent = _ == null ? d3_behavior_zoomInfinity : [+_[0], +_[1]];
            return zoom;
          };
          zoom.center = function(_) {
            if (!arguments.length) return center;
            center = _ && [+_[0], +_[1]];
            return zoom;
          };
          zoom.size = function(_) {
            if (!arguments.length) return size;
            size = _ && [+_[0], +_[1]];
            return zoom;
          };
          zoom.duration = function(_) {
            if (!arguments.length) return duration;
            duration = +_;
            return zoom;
          };
          zoom.x = function(z) {
            if (!arguments.length) return x1;
            x1 = z;
            x0 = z.copy();
            view = {
              x: 0,
              y: 0,
              k: 1
            };
            return zoom;
          };
          zoom.y = function(z) {
            if (!arguments.length) return y1;
            y1 = z;
            y0 = z.copy();
            view = {
              x: 0,
              y: 0,
              k: 1
            };
            return zoom;
          };
          function location(p) {
            return [(p[0] - view.x) / view.k, (p[1] - view.y) / view.k];
          }
          function point(l) {
            return [l[0] * view.k + view.x, l[1] * view.k + view.y];
          }
          function scaleTo(s) {
            view.k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
          }
          function translateTo(p, l) {
            l = point(l);
            view.x += p[0] - l[0];
            view.y += p[1] - l[1];
          }
          function zoomTo(that, p, l, k) {
            that.__chart__ = {
              x: view.x,
              y: view.y,
              k: view.k
            };
            scaleTo(Math.pow(2, k));
            translateTo(center0 = p, l);
            that = d32.select(that);
            if (duration > 0) that = that.transition().duration(duration);
            that.call(zoom.event);
          }
          function rescale() {
            if (x1) x1.domain(x0.range().map(function(x) {
              return (x - view.x) / view.k;
            }).map(x0.invert));
            if (y1) y1.domain(y0.range().map(function(y) {
              return (y - view.y) / view.k;
            }).map(y0.invert));
          }
          function zoomstarted(dispatch) {
            if (!zooming++) dispatch({
              type: "zoomstart"
            });
          }
          function zoomed(dispatch) {
            rescale();
            dispatch({
              type: "zoom",
              scale: view.k,
              translate: [view.x, view.y]
            });
          }
          function zoomended(dispatch) {
            if (!--zooming) dispatch({
              type: "zoomend"
            }), center0 = null;
          }
          function mousedowned() {
            var that = this, dispatch = event.of(that, arguments), dragged = 0, subject = d32.select(d3_window(that)).on(mousemove, moved).on(mouseup, ended), location0 = location(d32.mouse(that)), dragRestore = d3_event_dragSuppress(that);
            d3_selection_interrupt.call(that);
            zoomstarted(dispatch);
            function moved() {
              dragged = 1;
              translateTo(d32.mouse(that), location0);
              zoomed(dispatch);
            }
            function ended() {
              subject.on(mousemove, null).on(mouseup, null);
              dragRestore(dragged);
              zoomended(dispatch);
            }
          }
          function touchstarted() {
            var that = this, dispatch = event.of(that, arguments), locations0 = {}, distance0 = 0, scale0, zoomName = ".zoom-" + d32.event.changedTouches[0].identifier, touchmove = "touchmove" + zoomName, touchend = "touchend" + zoomName, targets = [], subject = d32.select(that), dragRestore = d3_event_dragSuppress(that);
            started();
            zoomstarted(dispatch);
            subject.on(mousedown, null).on(touchstart, started);
            function relocate() {
              var touches = d32.touches(that);
              scale0 = view.k;
              touches.forEach(function(t) {
                if (t.identifier in locations0) locations0[t.identifier] = location(t);
              });
              return touches;
            }
            function started() {
              var target = d32.event.target;
              d32.select(target).on(touchmove, moved).on(touchend, ended);
              targets.push(target);
              var changed = d32.event.changedTouches;
              for (var i = 0, n = changed.length; i < n; ++i) {
                locations0[changed[i].identifier] = null;
              }
              var touches = relocate(), now = Date.now();
              if (touches.length === 1) {
                if (now - touchtime < 500) {
                  var p = touches[0];
                  zoomTo(that, p, locations0[p.identifier], Math.floor(Math.log(view.k) / Math.LN2) + 1);
                  d3_eventPreventDefault();
                }
                touchtime = now;
              } else if (touches.length > 1) {
                var p = touches[0], q = touches[1], dx = p[0] - q[0], dy = p[1] - q[1];
                distance0 = dx * dx + dy * dy;
              }
            }
            function moved() {
              var touches = d32.touches(that), p0, l0, p1, l1;
              d3_selection_interrupt.call(that);
              for (var i = 0, n = touches.length; i < n; ++i, l1 = null) {
                p1 = touches[i];
                if (l1 = locations0[p1.identifier]) {
                  if (l0) break;
                  p0 = p1, l0 = l1;
                }
              }
              if (l1) {
                var distance1 = (distance1 = p1[0] - p0[0]) * distance1 + (distance1 = p1[1] - p0[1]) * distance1, scale1 = distance0 && Math.sqrt(distance1 / distance0);
                p0 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
                l0 = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
                scaleTo(scale1 * scale0);
              }
              touchtime = null;
              translateTo(p0, l0);
              zoomed(dispatch);
            }
            function ended() {
              if (d32.event.touches.length) {
                var changed = d32.event.changedTouches;
                for (var i = 0, n = changed.length; i < n; ++i) {
                  delete locations0[changed[i].identifier];
                }
                for (var identifier in locations0) {
                  return void relocate();
                }
              }
              d32.selectAll(targets).on(zoomName, null);
              subject.on(mousedown, mousedowned).on(touchstart, touchstarted);
              dragRestore();
              zoomended(dispatch);
            }
          }
          function mousewheeled() {
            var dispatch = event.of(this, arguments);
            if (mousewheelTimer) clearTimeout(mousewheelTimer);
            else d3_selection_interrupt.call(this), translate0 = location(center0 = center || d32.mouse(this)), zoomstarted(dispatch);
            mousewheelTimer = setTimeout(function() {
              mousewheelTimer = null;
              zoomended(dispatch);
            }, 50);
            d3_eventPreventDefault();
            scaleTo(Math.pow(2, d3_behavior_zoomDelta() * 2e-3) * view.k);
            translateTo(center0, translate0);
            zoomed(dispatch);
          }
          function dblclicked() {
            var p = d32.mouse(this), k = Math.log(view.k) / Math.LN2;
            zoomTo(this, p, location(p), d32.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1);
          }
          return d32.rebind(zoom, event, "on");
        };
        var d3_behavior_zoomInfinity = [0, Infinity], d3_behavior_zoomDelta, d3_behavior_zoomWheel;
        d32.color = d3_color;
        function d3_color() {
        }
        d3_color.prototype.toString = function() {
          return this.rgb() + "";
        };
        d32.hsl = d3_hsl;
        function d3_hsl(h, s, l) {
          return this instanceof d3_hsl ? void (this.h = +h, this.s = +s, this.l = +l) : arguments.length < 2 ? h instanceof d3_hsl ? new d3_hsl(h.h, h.s, h.l) : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl) : new d3_hsl(h, s, l);
        }
        var d3_hslPrototype = d3_hsl.prototype = new d3_color();
        d3_hslPrototype.brighter = function(k) {
          k = Math.pow(0.7, arguments.length ? k : 1);
          return new d3_hsl(this.h, this.s, this.l / k);
        };
        d3_hslPrototype.darker = function(k) {
          k = Math.pow(0.7, arguments.length ? k : 1);
          return new d3_hsl(this.h, this.s, k * this.l);
        };
        d3_hslPrototype.rgb = function() {
          return d3_hsl_rgb(this.h, this.s, this.l);
        };
        function d3_hsl_rgb(h, s, l) {
          var m1, m2;
          h = isNaN(h) ? 0 : (h %= 360) < 0 ? h + 360 : h;
          s = isNaN(s) ? 0 : s < 0 ? 0 : s > 1 ? 1 : s;
          l = l < 0 ? 0 : l > 1 ? 1 : l;
          m2 = l <= 0.5 ? l * (1 + s) : l + s - l * s;
          m1 = 2 * l - m2;
          function v(h2) {
            if (h2 > 360) h2 -= 360;
            else if (h2 < 0) h2 += 360;
            if (h2 < 60) return m1 + (m2 - m1) * h2 / 60;
            if (h2 < 180) return m2;
            if (h2 < 240) return m1 + (m2 - m1) * (240 - h2) / 60;
            return m1;
          }
          function vv(h2) {
            return Math.round(v(h2) * 255);
          }
          return new d3_rgb(vv(h + 120), vv(h), vv(h - 120));
        }
        d32.hcl = d3_hcl;
        function d3_hcl(h, c, l) {
          return this instanceof d3_hcl ? void (this.h = +h, this.c = +c, this.l = +l) : arguments.length < 2 ? h instanceof d3_hcl ? new d3_hcl(h.h, h.c, h.l) : h instanceof d3_lab ? d3_lab_hcl(h.l, h.a, h.b) : d3_lab_hcl((h = d3_rgb_lab((h = d32.rgb(h)).r, h.g, h.b)).l, h.a, h.b) : new d3_hcl(h, c, l);
        }
        var d3_hclPrototype = d3_hcl.prototype = new d3_color();
        d3_hclPrototype.brighter = function(k) {
          return new d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)));
        };
        d3_hclPrototype.darker = function(k) {
          return new d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)));
        };
        d3_hclPrototype.rgb = function() {
          return d3_hcl_lab(this.h, this.c, this.l).rgb();
        };
        function d3_hcl_lab(h, c, l) {
          if (isNaN(h)) h = 0;
          if (isNaN(c)) c = 0;
          return new d3_lab(l, Math.cos(h *= d3_radians) * c, Math.sin(h) * c);
        }
        d32.lab = d3_lab;
        function d3_lab(l, a, b) {
          return this instanceof d3_lab ? void (this.l = +l, this.a = +a, this.b = +b) : arguments.length < 2 ? l instanceof d3_lab ? new d3_lab(l.l, l.a, l.b) : l instanceof d3_hcl ? d3_hcl_lab(l.h, l.c, l.l) : d3_rgb_lab((l = d3_rgb(l)).r, l.g, l.b) : new d3_lab(l, a, b);
        }
        var d3_lab_K = 18;
        var d3_lab_X = 0.95047, d3_lab_Y = 1, d3_lab_Z = 1.08883;
        var d3_labPrototype = d3_lab.prototype = new d3_color();
        d3_labPrototype.brighter = function(k) {
          return new d3_lab(Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
        };
        d3_labPrototype.darker = function(k) {
          return new d3_lab(Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
        };
        d3_labPrototype.rgb = function() {
          return d3_lab_rgb(this.l, this.a, this.b);
        };
        function d3_lab_rgb(l, a, b) {
          var y = (l + 16) / 116, x = y + a / 500, z = y - b / 200;
          x = d3_lab_xyz(x) * d3_lab_X;
          y = d3_lab_xyz(y) * d3_lab_Y;
          z = d3_lab_xyz(z) * d3_lab_Z;
          return new d3_rgb(d3_xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z), d3_xyz_rgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z), d3_xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z));
        }
        function d3_lab_hcl(l, a, b) {
          return l > 0 ? new d3_hcl(Math.atan2(b, a) * d3_degrees, Math.sqrt(a * a + b * b), l) : new d3_hcl(NaN, NaN, l);
        }
        function d3_lab_xyz(x) {
          return x > 0.206893034 ? x * x * x : (x - 4 / 29) / 7.787037;
        }
        function d3_xyz_lab(x) {
          return x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787037 * x + 4 / 29;
        }
        function d3_xyz_rgb(r) {
          return Math.round(255 * (r <= 304e-5 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - 0.055));
        }
        d32.rgb = d3_rgb;
        function d3_rgb(r, g, b) {
          return this instanceof d3_rgb ? void (this.r = ~~r, this.g = ~~g, this.b = ~~b) : arguments.length < 2 ? r instanceof d3_rgb ? new d3_rgb(r.r, r.g, r.b) : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb) : new d3_rgb(r, g, b);
        }
        function d3_rgbNumber(value) {
          return new d3_rgb(value >> 16, value >> 8 & 255, value & 255);
        }
        function d3_rgbString(value) {
          return d3_rgbNumber(value) + "";
        }
        var d3_rgbPrototype = d3_rgb.prototype = new d3_color();
        d3_rgbPrototype.brighter = function(k) {
          k = Math.pow(0.7, arguments.length ? k : 1);
          var r = this.r, g = this.g, b = this.b, i = 30;
          if (!r && !g && !b) return new d3_rgb(i, i, i);
          if (r && r < i) r = i;
          if (g && g < i) g = i;
          if (b && b < i) b = i;
          return new d3_rgb(Math.min(255, r / k), Math.min(255, g / k), Math.min(255, b / k));
        };
        d3_rgbPrototype.darker = function(k) {
          k = Math.pow(0.7, arguments.length ? k : 1);
          return new d3_rgb(k * this.r, k * this.g, k * this.b);
        };
        d3_rgbPrototype.hsl = function() {
          return d3_rgb_hsl(this.r, this.g, this.b);
        };
        d3_rgbPrototype.toString = function() {
          return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
        };
        function d3_rgb_hex(v) {
          return v < 16 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16);
        }
        function d3_rgb_parse(format, rgb, hsl) {
          var r = 0, g = 0, b = 0, m1, m2, color;
          m1 = /([a-z]+)\((.*)\)/.exec(format = format.toLowerCase());
          if (m1) {
            m2 = m1[2].split(",");
            switch (m1[1]) {
              case "hsl": {
                return hsl(parseFloat(m2[0]), parseFloat(m2[1]) / 100, parseFloat(m2[2]) / 100);
              }
              case "rgb": {
                return rgb(d3_rgb_parseNumber(m2[0]), d3_rgb_parseNumber(m2[1]), d3_rgb_parseNumber(m2[2]));
              }
            }
          }
          if (color = d3_rgb_names.get(format)) {
            return rgb(color.r, color.g, color.b);
          }
          if (format != null && format.charAt(0) === "#" && !isNaN(color = parseInt(format.slice(1), 16))) {
            if (format.length === 4) {
              r = (color & 3840) >> 4;
              r = r >> 4 | r;
              g = color & 240;
              g = g >> 4 | g;
              b = color & 15;
              b = b << 4 | b;
            } else if (format.length === 7) {
              r = (color & 16711680) >> 16;
              g = (color & 65280) >> 8;
              b = color & 255;
            }
          }
          return rgb(r, g, b);
        }
        function d3_rgb_hsl(r, g, b) {
          var min = Math.min(r /= 255, g /= 255, b /= 255), max = Math.max(r, g, b), d = max - min, h, s, l = (max + min) / 2;
          if (d) {
            s = l < 0.5 ? d / (max + min) : d / (2 - max - min);
            if (r == max) h = (g - b) / d + (g < b ? 6 : 0);
            else if (g == max) h = (b - r) / d + 2;
            else h = (r - g) / d + 4;
            h *= 60;
          } else {
            h = NaN;
            s = l > 0 && l < 1 ? 0 : h;
          }
          return new d3_hsl(h, s, l);
        }
        function d3_rgb_lab(r, g, b) {
          r = d3_rgb_xyz(r);
          g = d3_rgb_xyz(g);
          b = d3_rgb_xyz(b);
          var x = d3_xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / d3_lab_X), y = d3_xyz_lab((0.2126729 * r + 0.7151522 * g + 0.072175 * b) / d3_lab_Y), z = d3_xyz_lab((0.0193339 * r + 0.119192 * g + 0.9503041 * b) / d3_lab_Z);
          return d3_lab(116 * y - 16, 500 * (x - y), 200 * (y - z));
        }
        function d3_rgb_xyz(r) {
          return (r /= 255) <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
        }
        function d3_rgb_parseNumber(c) {
          var f = parseFloat(c);
          return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f;
        }
        var d3_rgb_names = d32.map({
          aliceblue: 15792383,
          antiquewhite: 16444375,
          aqua: 65535,
          aquamarine: 8388564,
          azure: 15794175,
          beige: 16119260,
          bisque: 16770244,
          black: 0,
          blanchedalmond: 16772045,
          blue: 255,
          blueviolet: 9055202,
          brown: 10824234,
          burlywood: 14596231,
          cadetblue: 6266528,
          chartreuse: 8388352,
          chocolate: 13789470,
          coral: 16744272,
          cornflowerblue: 6591981,
          cornsilk: 16775388,
          crimson: 14423100,
          cyan: 65535,
          darkblue: 139,
          darkcyan: 35723,
          darkgoldenrod: 12092939,
          darkgray: 11119017,
          darkgreen: 25600,
          darkgrey: 11119017,
          darkkhaki: 12433259,
          darkmagenta: 9109643,
          darkolivegreen: 5597999,
          darkorange: 16747520,
          darkorchid: 10040012,
          darkred: 9109504,
          darksalmon: 15308410,
          darkseagreen: 9419919,
          darkslateblue: 4734347,
          darkslategray: 3100495,
          darkslategrey: 3100495,
          darkturquoise: 52945,
          darkviolet: 9699539,
          deeppink: 16716947,
          deepskyblue: 49151,
          dimgray: 6908265,
          dimgrey: 6908265,
          dodgerblue: 2003199,
          firebrick: 11674146,
          floralwhite: 16775920,
          forestgreen: 2263842,
          fuchsia: 16711935,
          gainsboro: 14474460,
          ghostwhite: 16316671,
          gold: 16766720,
          goldenrod: 14329120,
          gray: 8421504,
          green: 32768,
          greenyellow: 11403055,
          grey: 8421504,
          honeydew: 15794160,
          hotpink: 16738740,
          indianred: 13458524,
          indigo: 4915330,
          ivory: 16777200,
          khaki: 15787660,
          lavender: 15132410,
          lavenderblush: 16773365,
          lawngreen: 8190976,
          lemonchiffon: 16775885,
          lightblue: 11393254,
          lightcoral: 15761536,
          lightcyan: 14745599,
          lightgoldenrodyellow: 16448210,
          lightgray: 13882323,
          lightgreen: 9498256,
          lightgrey: 13882323,
          lightpink: 16758465,
          lightsalmon: 16752762,
          lightseagreen: 2142890,
          lightskyblue: 8900346,
          lightslategray: 7833753,
          lightslategrey: 7833753,
          lightsteelblue: 11584734,
          lightyellow: 16777184,
          lime: 65280,
          limegreen: 3329330,
          linen: 16445670,
          magenta: 16711935,
          maroon: 8388608,
          mediumaquamarine: 6737322,
          mediumblue: 205,
          mediumorchid: 12211667,
          mediumpurple: 9662683,
          mediumseagreen: 3978097,
          mediumslateblue: 8087790,
          mediumspringgreen: 64154,
          mediumturquoise: 4772300,
          mediumvioletred: 13047173,
          midnightblue: 1644912,
          mintcream: 16121850,
          mistyrose: 16770273,
          moccasin: 16770229,
          navajowhite: 16768685,
          navy: 128,
          oldlace: 16643558,
          olive: 8421376,
          olivedrab: 7048739,
          orange: 16753920,
          orangered: 16729344,
          orchid: 14315734,
          palegoldenrod: 15657130,
          palegreen: 10025880,
          paleturquoise: 11529966,
          palevioletred: 14381203,
          papayawhip: 16773077,
          peachpuff: 16767673,
          peru: 13468991,
          pink: 16761035,
          plum: 14524637,
          powderblue: 11591910,
          purple: 8388736,
          rebeccapurple: 6697881,
          red: 16711680,
          rosybrown: 12357519,
          royalblue: 4286945,
          saddlebrown: 9127187,
          salmon: 16416882,
          sandybrown: 16032864,
          seagreen: 3050327,
          seashell: 16774638,
          sienna: 10506797,
          silver: 12632256,
          skyblue: 8900331,
          slateblue: 6970061,
          slategray: 7372944,
          slategrey: 7372944,
          snow: 16775930,
          springgreen: 65407,
          steelblue: 4620980,
          tan: 13808780,
          teal: 32896,
          thistle: 14204888,
          tomato: 16737095,
          turquoise: 4251856,
          violet: 15631086,
          wheat: 16113331,
          white: 16777215,
          whitesmoke: 16119285,
          yellow: 16776960,
          yellowgreen: 10145074
        });
        d3_rgb_names.forEach(function(key, value) {
          d3_rgb_names.set(key, d3_rgbNumber(value));
        });
        function d3_functor(v) {
          return typeof v === "function" ? v : function() {
            return v;
          };
        }
        d32.functor = d3_functor;
        d32.xhr = d3_xhrType(d3_identity);
        function d3_xhrType(response) {
          return function(url, mimeType, callback) {
            if (arguments.length === 2 && typeof mimeType === "function") callback = mimeType, mimeType = null;
            return d3_xhr(url, mimeType, response, callback);
          };
        }
        function d3_xhr(url, mimeType, response, callback) {
          var xhr = {}, dispatch = d32.dispatch("beforesend", "progress", "load", "error"), headers = {}, request = new XMLHttpRequest(), responseType = null;
          if (this.XDomainRequest && !("withCredentials" in request) && /^(http(s)?:)?\/\//.test(url)) request = new XDomainRequest();
          "onload" in request ? request.onload = request.onerror = respond : request.onreadystatechange = function() {
            request.readyState > 3 && respond();
          };
          function respond() {
            var status = request.status, result;
            if (!status && d3_xhrHasResponse(request) || status >= 200 && status < 300 || status === 304) {
              try {
                result = response.call(xhr, request);
              } catch (e) {
                dispatch.error.call(xhr, e);
                return;
              }
              dispatch.load.call(xhr, result);
            } else {
              dispatch.error.call(xhr, request);
            }
          }
          request.onprogress = function(event) {
            var o = d32.event;
            d32.event = event;
            try {
              dispatch.progress.call(xhr, request);
            } finally {
              d32.event = o;
            }
          };
          xhr.header = function(name, value) {
            name = (name + "").toLowerCase();
            if (arguments.length < 2) return headers[name];
            if (value == null) delete headers[name];
            else headers[name] = value + "";
            return xhr;
          };
          xhr.mimeType = function(value) {
            if (!arguments.length) return mimeType;
            mimeType = value == null ? null : value + "";
            return xhr;
          };
          xhr.responseType = function(value) {
            if (!arguments.length) return responseType;
            responseType = value;
            return xhr;
          };
          xhr.response = function(value) {
            response = value;
            return xhr;
          };
          ["get", "post"].forEach(function(method) {
            xhr[method] = function() {
              return xhr.send.apply(xhr, [method].concat(d3_array(arguments)));
            };
          });
          xhr.send = function(method, data, callback2) {
            if (arguments.length === 2 && typeof data === "function") callback2 = data, data = null;
            request.open(method, url, true);
            if (mimeType != null && !("accept" in headers)) headers["accept"] = mimeType + ",*/*";
            if (request.setRequestHeader) for (var name in headers) request.setRequestHeader(name, headers[name]);
            if (mimeType != null && request.overrideMimeType) request.overrideMimeType(mimeType);
            if (responseType != null) request.responseType = responseType;
            if (callback2 != null) xhr.on("error", callback2).on("load", function(request2) {
              callback2(null, request2);
            });
            dispatch.beforesend.call(xhr, request);
            request.send(data == null ? null : data);
            return xhr;
          };
          xhr.abort = function() {
            request.abort();
            return xhr;
          };
          d32.rebind(xhr, dispatch, "on");
          return callback == null ? xhr : xhr.get(d3_xhr_fixCallback(callback));
        }
        function d3_xhr_fixCallback(callback) {
          return callback.length === 1 ? function(error, request) {
            callback(error == null ? request : null);
          } : callback;
        }
        function d3_xhrHasResponse(request) {
          var type = request.responseType;
          return type && type !== "text" ? request.response : request.responseText;
        }
        d32.dsv = function(delimiter, mimeType) {
          var reFormat = new RegExp('["' + delimiter + "\n]"), delimiterCode = delimiter.charCodeAt(0);
          function dsv(url, row, callback) {
            if (arguments.length < 3) callback = row, row = null;
            var xhr = d3_xhr(url, mimeType, row == null ? response : typedResponse(row), callback);
            xhr.row = function(_) {
              return arguments.length ? xhr.response((row = _) == null ? response : typedResponse(_)) : row;
            };
            return xhr;
          }
          function response(request) {
            return dsv.parse(request.responseText);
          }
          function typedResponse(f) {
            return function(request) {
              return dsv.parse(request.responseText, f);
            };
          }
          dsv.parse = function(text, f) {
            var o;
            return dsv.parseRows(text, function(row, i) {
              if (o) return o(row, i - 1);
              var a = new Function("d", "return {" + row.map(function(name, i2) {
                return JSON.stringify(name) + ": d[" + i2 + "]";
              }).join(",") + "}");
              o = f ? function(row2, i2) {
                return f(a(row2), i2);
              } : a;
            });
          };
          dsv.parseRows = function(text, f) {
            var EOL = {}, EOF = {}, rows = [], N = text.length, I = 0, n = 0, t, eol;
            function token() {
              if (I >= N) return EOF;
              if (eol) return eol = false, EOL;
              var j = I;
              if (text.charCodeAt(j) === 34) {
                var i = j;
                while (i++ < N) {
                  if (text.charCodeAt(i) === 34) {
                    if (text.charCodeAt(i + 1) !== 34) break;
                    ++i;
                  }
                }
                I = i + 2;
                var c = text.charCodeAt(i + 1);
                if (c === 13) {
                  eol = true;
                  if (text.charCodeAt(i + 2) === 10) ++I;
                } else if (c === 10) {
                  eol = true;
                }
                return text.slice(j + 1, i).replace(/""/g, '"');
              }
              while (I < N) {
                var c = text.charCodeAt(I++), k = 1;
                if (c === 10) eol = true;
                else if (c === 13) {
                  eol = true;
                  if (text.charCodeAt(I) === 10) ++I, ++k;
                } else if (c !== delimiterCode) continue;
                return text.slice(j, I - k);
              }
              return text.slice(j);
            }
            while ((t = token()) !== EOF) {
              var a = [];
              while (t !== EOL && t !== EOF) {
                a.push(t);
                t = token();
              }
              if (f && (a = f(a, n++)) == null) continue;
              rows.push(a);
            }
            return rows;
          };
          dsv.format = function(rows) {
            if (Array.isArray(rows[0])) return dsv.formatRows(rows);
            var fieldSet = new d3_Set(), fields = [];
            rows.forEach(function(row) {
              for (var field in row) {
                if (!fieldSet.has(field)) {
                  fields.push(fieldSet.add(field));
                }
              }
            });
            return [fields.map(formatValue).join(delimiter)].concat(rows.map(function(row) {
              return fields.map(function(field) {
                return formatValue(row[field]);
              }).join(delimiter);
            })).join("\n");
          };
          dsv.formatRows = function(rows) {
            return rows.map(formatRow).join("\n");
          };
          function formatRow(row) {
            return row.map(formatValue).join(delimiter);
          }
          function formatValue(text) {
            return reFormat.test(text) ? '"' + text.replace(/\"/g, '""') + '"' : text;
          }
          return dsv;
        };
        d32.csv = d32.dsv(",", "text/csv");
        d32.tsv = d32.dsv("	", "text/tab-separated-values");
        var d3_timer_queueHead, d3_timer_queueTail, d3_timer_interval, d3_timer_timeout, d3_timer_frame = this[d3_vendorSymbol(this, "requestAnimationFrame")] || function(callback) {
          setTimeout(callback, 17);
        };
        d32.timer = function() {
          d3_timer.apply(this, arguments);
        };
        function d3_timer(callback, delay, then) {
          var n = arguments.length;
          if (n < 2) delay = 0;
          if (n < 3) then = Date.now();
          var time = then + delay, timer = {
            c: callback,
            t: time,
            n: null
          };
          if (d3_timer_queueTail) d3_timer_queueTail.n = timer;
          else d3_timer_queueHead = timer;
          d3_timer_queueTail = timer;
          if (!d3_timer_interval) {
            d3_timer_timeout = clearTimeout(d3_timer_timeout);
            d3_timer_interval = 1;
            d3_timer_frame(d3_timer_step);
          }
          return timer;
        }
        function d3_timer_step() {
          var now = d3_timer_mark(), delay = d3_timer_sweep() - now;
          if (delay > 24) {
            if (isFinite(delay)) {
              clearTimeout(d3_timer_timeout);
              d3_timer_timeout = setTimeout(d3_timer_step, delay);
            }
            d3_timer_interval = 0;
          } else {
            d3_timer_interval = 1;
            d3_timer_frame(d3_timer_step);
          }
        }
        d32.timer.flush = function() {
          d3_timer_mark();
          d3_timer_sweep();
        };
        function d3_timer_mark() {
          var now = Date.now(), timer = d3_timer_queueHead;
          while (timer) {
            if (now >= timer.t && timer.c(now - timer.t)) timer.c = null;
            timer = timer.n;
          }
          return now;
        }
        function d3_timer_sweep() {
          var t0, t1 = d3_timer_queueHead, time = Infinity;
          while (t1) {
            if (t1.c) {
              if (t1.t < time) time = t1.t;
              t1 = (t0 = t1).n;
            } else {
              t1 = t0 ? t0.n = t1.n : d3_timer_queueHead = t1.n;
            }
          }
          d3_timer_queueTail = t0;
          return time;
        }
        function d3_format_precision(x, p) {
          return p - (x ? Math.ceil(Math.log(x) / Math.LN10) : 1);
        }
        d32.round = function(x, n) {
          return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x);
        };
        var d3_formatPrefixes = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(d3_formatPrefix);
        d32.formatPrefix = function(value, precision) {
          var i = 0;
          if (value = +value) {
            if (value < 0) value *= -1;
            if (precision) value = d32.round(value, d3_format_precision(value, precision));
            i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
            i = Math.max(-24, Math.min(24, Math.floor((i - 1) / 3) * 3));
          }
          return d3_formatPrefixes[8 + i / 3];
        };
        function d3_formatPrefix(d, i) {
          var k = Math.pow(10, abs(8 - i) * 3);
          return {
            scale: i > 8 ? function(d2) {
              return d2 / k;
            } : function(d2) {
              return d2 * k;
            },
            symbol: d
          };
        }
        function d3_locale_numberFormat(locale) {
          var locale_decimal = locale.decimal, locale_thousands = locale.thousands, locale_grouping = locale.grouping, locale_currency = locale.currency, formatGroup = locale_grouping && locale_thousands ? function(value, width) {
            var i = value.length, t = [], j = 0, g = locale_grouping[0], length = 0;
            while (i > 0 && g > 0) {
              if (length + g + 1 > width) g = Math.max(1, width - length);
              t.push(value.substring(i -= g, i + g));
              if ((length += g + 1) > width) break;
              g = locale_grouping[j = (j + 1) % locale_grouping.length];
            }
            return t.reverse().join(locale_thousands);
          } : d3_identity;
          return function(specifier) {
            var match = d3_format_re.exec(specifier), fill = match[1] || " ", align = match[2] || ">", sign = match[3] || "-", symbol = match[4] || "", zfill = match[5], width = +match[6], comma = match[7], precision = match[8], type = match[9], scale = 1, prefix = "", suffix = "", integer = false, exponent = true;
            if (precision) precision = +precision.substring(1);
            if (zfill || fill === "0" && align === "=") {
              zfill = fill = "0";
              align = "=";
            }
            switch (type) {
              case "n":
                comma = true;
                type = "g";
                break;
              case "%":
                scale = 100;
                suffix = "%";
                type = "f";
                break;
              case "p":
                scale = 100;
                suffix = "%";
                type = "r";
                break;
              case "b":
              case "o":
              case "x":
              case "X":
                if (symbol === "#") prefix = "0" + type.toLowerCase();
              case "c":
                exponent = false;
              case "d":
                integer = true;
                precision = 0;
                break;
              case "s":
                scale = -1;
                type = "r";
                break;
            }
            if (symbol === "$") prefix = locale_currency[0], suffix = locale_currency[1];
            if (type == "r" && !precision) type = "g";
            if (precision != null) {
              if (type == "g") precision = Math.max(1, Math.min(21, precision));
              else if (type == "e" || type == "f") precision = Math.max(0, Math.min(20, precision));
            }
            type = d3_format_types.get(type) || d3_format_typeDefault;
            var zcomma = zfill && comma;
            return function(value) {
              var fullSuffix = suffix;
              if (integer && value % 1) return "";
              var negative = value < 0 || value === 0 && 1 / value < 0 ? (value = -value, "-") : sign === "-" ? "" : sign;
              if (scale < 0) {
                var unit = d32.formatPrefix(value, precision);
                value = unit.scale(value);
                fullSuffix = unit.symbol + suffix;
              } else {
                value *= scale;
              }
              value = type(value, precision);
              var i = value.lastIndexOf("."), before, after;
              if (i < 0) {
                var j = exponent ? value.lastIndexOf("e") : -1;
                if (j < 0) before = value, after = "";
                else before = value.substring(0, j), after = value.substring(j);
              } else {
                before = value.substring(0, i);
                after = locale_decimal + value.substring(i + 1);
              }
              if (!zfill && comma) before = formatGroup(before, Infinity);
              var length = prefix.length + before.length + after.length + (zcomma ? 0 : negative.length), padding = length < width ? new Array(length = width - length + 1).join(fill) : "";
              if (zcomma) before = formatGroup(padding + before, padding.length ? width - after.length : Infinity);
              negative += prefix;
              value = before + after;
              return (align === "<" ? negative + value + padding : align === ">" ? padding + negative + value : align === "^" ? padding.substring(0, length >>= 1) + negative + value + padding.substring(length) : negative + (zcomma ? value : padding + value)) + fullSuffix;
            };
          };
        }
        var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i;
        var d3_format_types = d32.map({
          b: function(x) {
            return x.toString(2);
          },
          c: function(x) {
            return String.fromCharCode(x);
          },
          o: function(x) {
            return x.toString(8);
          },
          x: function(x) {
            return x.toString(16);
          },
          X: function(x) {
            return x.toString(16).toUpperCase();
          },
          g: function(x, p) {
            return x.toPrecision(p);
          },
          e: function(x, p) {
            return x.toExponential(p);
          },
          f: function(x, p) {
            return x.toFixed(p);
          },
          r: function(x, p) {
            return (x = d32.round(x, d3_format_precision(x, p))).toFixed(Math.max(0, Math.min(20, d3_format_precision(x * (1 + 1e-15), p))));
          }
        });
        function d3_format_typeDefault(x) {
          return x + "";
        }
        var d3_time = d32.time = {}, d3_date = Date;
        function d3_date_utc() {
          this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]);
        }
        d3_date_utc.prototype = {
          getDate: function() {
            return this._.getUTCDate();
          },
          getDay: function() {
            return this._.getUTCDay();
          },
          getFullYear: function() {
            return this._.getUTCFullYear();
          },
          getHours: function() {
            return this._.getUTCHours();
          },
          getMilliseconds: function() {
            return this._.getUTCMilliseconds();
          },
          getMinutes: function() {
            return this._.getUTCMinutes();
          },
          getMonth: function() {
            return this._.getUTCMonth();
          },
          getSeconds: function() {
            return this._.getUTCSeconds();
          },
          getTime: function() {
            return this._.getTime();
          },
          getTimezoneOffset: function() {
            return 0;
          },
          valueOf: function() {
            return this._.valueOf();
          },
          setDate: function() {
            d3_time_prototype.setUTCDate.apply(this._, arguments);
          },
          setDay: function() {
            d3_time_prototype.setUTCDay.apply(this._, arguments);
          },
          setFullYear: function() {
            d3_time_prototype.setUTCFullYear.apply(this._, arguments);
          },
          setHours: function() {
            d3_time_prototype.setUTCHours.apply(this._, arguments);
          },
          setMilliseconds: function() {
            d3_time_prototype.setUTCMilliseconds.apply(this._, arguments);
          },
          setMinutes: function() {
            d3_time_prototype.setUTCMinutes.apply(this._, arguments);
          },
          setMonth: function() {
            d3_time_prototype.setUTCMonth.apply(this._, arguments);
          },
          setSeconds: function() {
            d3_time_prototype.setUTCSeconds.apply(this._, arguments);
          },
          setTime: function() {
            d3_time_prototype.setTime.apply(this._, arguments);
          }
        };
        var d3_time_prototype = Date.prototype;
        function d3_time_interval(local, step, number) {
          function round(date) {
            var d0 = local(date), d1 = offset(d0, 1);
            return date - d0 < d1 - date ? d0 : d1;
          }
          function ceil(date) {
            step(date = local(new d3_date(date - 1)), 1);
            return date;
          }
          function offset(date, k) {
            step(date = new d3_date(+date), k);
            return date;
          }
          function range(t0, t1, dt) {
            var time = ceil(t0), times = [];
            if (dt > 1) {
              while (time < t1) {
                if (!(number(time) % dt)) times.push(/* @__PURE__ */ new Date(+time));
                step(time, 1);
              }
            } else {
              while (time < t1) times.push(/* @__PURE__ */ new Date(+time)), step(time, 1);
            }
            return times;
          }
          function range_utc(t0, t1, dt) {
            try {
              d3_date = d3_date_utc;
              var utc2 = new d3_date_utc();
              utc2._ = t0;
              return range(utc2, t1, dt);
            } finally {
              d3_date = Date;
            }
          }
          local.floor = local;
          local.round = round;
          local.ceil = ceil;
          local.offset = offset;
          local.range = range;
          var utc = local.utc = d3_time_interval_utc(local);
          utc.floor = utc;
          utc.round = d3_time_interval_utc(round);
          utc.ceil = d3_time_interval_utc(ceil);
          utc.offset = d3_time_interval_utc(offset);
          utc.range = range_utc;
          return local;
        }
        function d3_time_interval_utc(method) {
          return function(date, k) {
            try {
              d3_date = d3_date_utc;
              var utc = new d3_date_utc();
              utc._ = date;
              return method(utc, k)._;
            } finally {
              d3_date = Date;
            }
          };
        }
        d3_time.year = d3_time_interval(function(date) {
          date = d3_time.day(date);
          date.setMonth(0, 1);
          return date;
        }, function(date, offset) {
          date.setFullYear(date.getFullYear() + offset);
        }, function(date) {
          return date.getFullYear();
        });
        d3_time.years = d3_time.year.range;
        d3_time.years.utc = d3_time.year.utc.range;
        d3_time.day = d3_time_interval(function(date) {
          var day = new d3_date(2e3, 0);
          day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
          return day;
        }, function(date, offset) {
          date.setDate(date.getDate() + offset);
        }, function(date) {
          return date.getDate() - 1;
        });
        d3_time.days = d3_time.day.range;
        d3_time.days.utc = d3_time.day.utc.range;
        d3_time.dayOfYear = function(date) {
          var year = d3_time.year(date);
          return Math.floor((date - year - (date.getTimezoneOffset() - year.getTimezoneOffset()) * 6e4) / 864e5);
        };
        ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(function(day, i) {
          i = 7 - i;
          var interval = d3_time[day] = d3_time_interval(function(date) {
            (date = d3_time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7);
            return date;
          }, function(date, offset) {
            date.setDate(date.getDate() + Math.floor(offset) * 7);
          }, function(date) {
            var day2 = d3_time.year(date).getDay();
            return Math.floor((d3_time.dayOfYear(date) + (day2 + i) % 7) / 7) - (day2 !== i);
          });
          d3_time[day + "s"] = interval.range;
          d3_time[day + "s"].utc = interval.utc.range;
          d3_time[day + "OfYear"] = function(date) {
            var day2 = d3_time.year(date).getDay();
            return Math.floor((d3_time.dayOfYear(date) + (day2 + i) % 7) / 7);
          };
        });
        d3_time.week = d3_time.sunday;
        d3_time.weeks = d3_time.sunday.range;
        d3_time.weeks.utc = d3_time.sunday.utc.range;
        d3_time.weekOfYear = d3_time.sundayOfYear;
        function d3_locale_timeFormat(locale) {
          var locale_dateTime = locale.dateTime, locale_date = locale.date, locale_time = locale.time, locale_periods = locale.periods, locale_days = locale.days, locale_shortDays = locale.shortDays, locale_months = locale.months, locale_shortMonths = locale.shortMonths;
          function d3_time_format2(template) {
            var n = template.length;
            function format(date) {
              var string = [], i = -1, j = 0, c, p, f;
              while (++i < n) {
                if (template.charCodeAt(i) === 37) {
                  string.push(template.slice(j, i));
                  if ((p = d3_time_formatPads[c = template.charAt(++i)]) != null) c = template.charAt(++i);
                  if (f = d3_time_formats[c]) c = f(date, p == null ? c === "e" ? " " : "0" : p);
                  string.push(c);
                  j = i + 1;
                }
              }
              string.push(template.slice(j, i));
              return string.join("");
            }
            format.parse = function(string) {
              var d = {
                y: 1900,
                m: 0,
                d: 1,
                H: 0,
                M: 0,
                S: 0,
                L: 0,
                Z: null
              }, i = d3_time_parse(d, template, string, 0);
              if (i != string.length) return null;
              if ("p" in d) d.H = d.H % 12 + d.p * 12;
              var localZ = d.Z != null && d3_date !== d3_date_utc, date = new (localZ ? d3_date_utc : d3_date)();
              if ("j" in d) date.setFullYear(d.y, 0, d.j);
              else if ("W" in d || "U" in d) {
                if (!("w" in d)) d.w = "W" in d ? 1 : 0;
                date.setFullYear(d.y, 0, 1);
                date.setFullYear(d.y, 0, "W" in d ? (d.w + 6) % 7 + d.W * 7 - (date.getDay() + 5) % 7 : d.w + d.U * 7 - (date.getDay() + 6) % 7);
              } else date.setFullYear(d.y, d.m, d.d);
              date.setHours(d.H + (d.Z / 100 | 0), d.M + d.Z % 100, d.S, d.L);
              return localZ ? date._ : date;
            };
            format.toString = function() {
              return template;
            };
            return format;
          }
          function d3_time_parse(date, template, string, j) {
            var c, p, t, i = 0, n = template.length, m = string.length;
            while (i < n) {
              if (j >= m) return -1;
              c = template.charCodeAt(i++);
              if (c === 37) {
                t = template.charAt(i++);
                p = d3_time_parsers[t in d3_time_formatPads ? template.charAt(i++) : t];
                if (!p || (j = p(date, string, j)) < 0) return -1;
              } else if (c != string.charCodeAt(j++)) {
                return -1;
              }
            }
            return j;
          }
          d3_time_format2.utc = function(template) {
            var local = d3_time_format2(template);
            function format(date) {
              try {
                d3_date = d3_date_utc;
                var utc = new d3_date();
                utc._ = date;
                return local(utc);
              } finally {
                d3_date = Date;
              }
            }
            format.parse = function(string) {
              try {
                d3_date = d3_date_utc;
                var date = local.parse(string);
                return date && date._;
              } finally {
                d3_date = Date;
              }
            };
            format.toString = local.toString;
            return format;
          };
          d3_time_format2.multi = d3_time_format2.utc.multi = d3_time_formatMulti;
          var d3_time_periodLookup = d32.map(), d3_time_dayRe = d3_time_formatRe(locale_days), d3_time_dayLookup = d3_time_formatLookup(locale_days), d3_time_dayAbbrevRe = d3_time_formatRe(locale_shortDays), d3_time_dayAbbrevLookup = d3_time_formatLookup(locale_shortDays), d3_time_monthRe = d3_time_formatRe(locale_months), d3_time_monthLookup = d3_time_formatLookup(locale_months), d3_time_monthAbbrevRe = d3_time_formatRe(locale_shortMonths), d3_time_monthAbbrevLookup = d3_time_formatLookup(locale_shortMonths);
          locale_periods.forEach(function(p, i) {
            d3_time_periodLookup.set(p.toLowerCase(), i);
          });
          var d3_time_formats = {
            a: function(d) {
              return locale_shortDays[d.getDay()];
            },
            A: function(d) {
              return locale_days[d.getDay()];
            },
            b: function(d) {
              return locale_shortMonths[d.getMonth()];
            },
            B: function(d) {
              return locale_months[d.getMonth()];
            },
            c: d3_time_format2(locale_dateTime),
            d: function(d, p) {
              return d3_time_formatPad(d.getDate(), p, 2);
            },
            e: function(d, p) {
              return d3_time_formatPad(d.getDate(), p, 2);
            },
            H: function(d, p) {
              return d3_time_formatPad(d.getHours(), p, 2);
            },
            I: function(d, p) {
              return d3_time_formatPad(d.getHours() % 12 || 12, p, 2);
            },
            j: function(d, p) {
              return d3_time_formatPad(1 + d3_time.dayOfYear(d), p, 3);
            },
            L: function(d, p) {
              return d3_time_formatPad(d.getMilliseconds(), p, 3);
            },
            m: function(d, p) {
              return d3_time_formatPad(d.getMonth() + 1, p, 2);
            },
            M: function(d, p) {
              return d3_time_formatPad(d.getMinutes(), p, 2);
            },
            p: function(d) {
              return locale_periods[+(d.getHours() >= 12)];
            },
            S: function(d, p) {
              return d3_time_formatPad(d.getSeconds(), p, 2);
            },
            U: function(d, p) {
              return d3_time_formatPad(d3_time.sundayOfYear(d), p, 2);
            },
            w: function(d) {
              return d.getDay();
            },
            W: function(d, p) {
              return d3_time_formatPad(d3_time.mondayOfYear(d), p, 2);
            },
            x: d3_time_format2(locale_date),
            X: d3_time_format2(locale_time),
            y: function(d, p) {
              return d3_time_formatPad(d.getFullYear() % 100, p, 2);
            },
            Y: function(d, p) {
              return d3_time_formatPad(d.getFullYear() % 1e4, p, 4);
            },
            Z: d3_time_zone,
            "%": function() {
              return "%";
            }
          };
          var d3_time_parsers = {
            a: d3_time_parseWeekdayAbbrev,
            A: d3_time_parseWeekday,
            b: d3_time_parseMonthAbbrev,
            B: d3_time_parseMonth,
            c: d3_time_parseLocaleFull,
            d: d3_time_parseDay,
            e: d3_time_parseDay,
            H: d3_time_parseHour24,
            I: d3_time_parseHour24,
            j: d3_time_parseDayOfYear,
            L: d3_time_parseMilliseconds,
            m: d3_time_parseMonthNumber,
            M: d3_time_parseMinutes,
            p: d3_time_parseAmPm,
            S: d3_time_parseSeconds,
            U: d3_time_parseWeekNumberSunday,
            w: d3_time_parseWeekdayNumber,
            W: d3_time_parseWeekNumberMonday,
            x: d3_time_parseLocaleDate,
            X: d3_time_parseLocaleTime,
            y: d3_time_parseYear,
            Y: d3_time_parseFullYear,
            Z: d3_time_parseZone,
            "%": d3_time_parseLiteralPercent
          };
          function d3_time_parseWeekdayAbbrev(date, string, i) {
            d3_time_dayAbbrevRe.lastIndex = 0;
            var n = d3_time_dayAbbrevRe.exec(string.slice(i));
            return n ? (date.w = d3_time_dayAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
          }
          function d3_time_parseWeekday(date, string, i) {
            d3_time_dayRe.lastIndex = 0;
            var n = d3_time_dayRe.exec(string.slice(i));
            return n ? (date.w = d3_time_dayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
          }
          function d3_time_parseMonthAbbrev(date, string, i) {
            d3_time_monthAbbrevRe.lastIndex = 0;
            var n = d3_time_monthAbbrevRe.exec(string.slice(i));
            return n ? (date.m = d3_time_monthAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
          }
          function d3_time_parseMonth(date, string, i) {
            d3_time_monthRe.lastIndex = 0;
            var n = d3_time_monthRe.exec(string.slice(i));
            return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
          }
          function d3_time_parseLocaleFull(date, string, i) {
            return d3_time_parse(date, d3_time_formats.c.toString(), string, i);
          }
          function d3_time_parseLocaleDate(date, string, i) {
            return d3_time_parse(date, d3_time_formats.x.toString(), string, i);
          }
          function d3_time_parseLocaleTime(date, string, i) {
            return d3_time_parse(date, d3_time_formats.X.toString(), string, i);
          }
          function d3_time_parseAmPm(date, string, i) {
            var n = d3_time_periodLookup.get(string.slice(i, i += 2).toLowerCase());
            return n == null ? -1 : (date.p = n, i);
          }
          return d3_time_format2;
        }
        var d3_time_formatPads = {
          "-": "",
          _: " ",
          "0": "0"
        }, d3_time_numberRe = /^\s*\d+/, d3_time_percentRe = /^%/;
        function d3_time_formatPad(value, fill, width) {
          var sign = value < 0 ? "-" : "", string = (sign ? -value : value) + "", length = string.length;
          return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
        }
        function d3_time_formatRe(names) {
          return new RegExp("^(?:" + names.map(d32.requote).join("|") + ")", "i");
        }
        function d3_time_formatLookup(names) {
          var map = new d3_Map(), i = -1, n = names.length;
          while (++i < n) map.set(names[i].toLowerCase(), i);
          return map;
        }
        function d3_time_parseWeekdayNumber(date, string, i) {
          d3_time_numberRe.lastIndex = 0;
          var n = d3_time_numberRe.exec(string.slice(i, i + 1));
          return n ? (date.w = +n[0], i + n[0].length) : -1;
        }
        function d3_time_parseWeekNumberSunday(date, string, i) {
          d3_time_numberRe.lastIndex = 0;
          var n = d3_time_numberRe.exec(string.slice(i));
          return n ? (date.U = +n[0], i + n[0].length) : -1;
        }
        function d3_time_parseWeekNumberMonday(date, string, i) {
          d3_time_numberRe.lastIndex = 0;
          var n = d3_time_numberRe.exec(string.slice(i));
          return n ? (date.W = +n[0], i + n[0].length) : -1;
        }
        function d3_time_parseFullYear(date, string, i) {
          d3_time_numberRe.lastIndex = 0;
          var n = d3_time_numberRe.exec(string.slice(i, i + 4));
          return n ? (date.y = +n[0], i + n[0].length) : -1;
        }
        function d3_time_parseYear(date, string, i) {
          d3_time_numberRe.lastIndex = 0;
          var n = d3_time_numberRe.exec(string.slice(i, i + 2));
          return n ? (date.y = d3_time_expandYear(+n[0]), i + n[0].length) : -1;
        }
        function d3_time_parseZone(date, string, i) {
          return /^[+-]\d{4}$/.test(string = string.slice(i, i + 5)) ? (date.Z = -string, i + 5) : -1;
        }
        function d3_time_expandYear(d) {
          return d + (d > 68 ? 1900 : 2e3);
        }
        function d3_time_parseMonthNumber(date, string, i) {
          d3_time_numberRe.lastIndex = 0;
          var n = d3_time_numberRe.exec(string.slice(i, i + 2));
          return n ? (date.m = n[0] - 1, i + n[0].length) : -1;
        }
        function d3_time_parseDay(date, string, i) {
          d3_time_numberRe.lastIndex = 0;
          var n = d3_time_numberRe.exec(string.slice(i, i + 2));
          return n ? (date.d = +n[0], i + n[0].length) : -1;
        }
        function d3_time_parseDayOfYear(date, string, i) {
          d3_time_numberRe.lastIndex = 0;
          var n = d3_time_numberRe.exec(string.slice(i, i + 3));
          return n ? (date.j = +n[0], i + n[0].length) : -1;
        }
        function d3_time_parseHour24(date, string, i) {
          d3_time_numberRe.lastIndex = 0;
          var n = d3_time_numberRe.exec(string.slice(i, i + 2));
          return n ? (date.H = +n[0], i + n[0].length) : -1;
        }
        function d3_time_parseMinutes(date, string, i) {
          d3_time_numberRe.lastIndex = 0;
          var n = d3_time_numberRe.exec(string.slice(i, i + 2));
          return n ? (date.M = +n[0], i + n[0].length) : -1;
        }
        function d3_time_parseSeconds(date, string, i) {
          d3_time_numberRe.lastIndex = 0;
          var n = d3_time_numberRe.exec(string.slice(i, i + 2));
          return n ? (date.S = +n[0], i + n[0].length) : -1;
        }
        function d3_time_parseMilliseconds(date, string, i) {
          d3_time_numberRe.lastIndex = 0;
          var n = d3_time_numberRe.exec(string.slice(i, i + 3));
          return n ? (date.L = +n[0], i + n[0].length) : -1;
        }
        function d3_time_zone(d) {
          var z = d.getTimezoneOffset(), zs = z > 0 ? "-" : "+", zh = abs(z) / 60 | 0, zm = abs(z) % 60;
          return zs + d3_time_formatPad(zh, "0", 2) + d3_time_formatPad(zm, "0", 2);
        }
        function d3_time_parseLiteralPercent(date, string, i) {
          d3_time_percentRe.lastIndex = 0;
          var n = d3_time_percentRe.exec(string.slice(i, i + 1));
          return n ? i + n[0].length : -1;
        }
        function d3_time_formatMulti(formats) {
          var n = formats.length, i = -1;
          while (++i < n) formats[i][0] = this(formats[i][0]);
          return function(date) {
            var i2 = 0, f = formats[i2];
            while (!f[1](date)) f = formats[++i2];
            return f[0](date);
          };
        }
        d32.locale = function(locale) {
          return {
            numberFormat: d3_locale_numberFormat(locale),
            timeFormat: d3_locale_timeFormat(locale)
          };
        };
        var d3_locale_enUS = d32.locale({
          decimal: ".",
          thousands: ",",
          grouping: [3],
          currency: ["$", ""],
          dateTime: "%a %b %e %X %Y",
          date: "%m/%d/%Y",
          time: "%H:%M:%S",
          periods: ["AM", "PM"],
          days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        });
        d32.format = d3_locale_enUS.numberFormat;
        d32.geo = {};
        function d3_adder() {
        }
        d3_adder.prototype = {
          s: 0,
          t: 0,
          add: function(y) {
            d3_adderSum(y, this.t, d3_adderTemp);
            d3_adderSum(d3_adderTemp.s, this.s, this);
            if (this.s) this.t += d3_adderTemp.t;
            else this.s = d3_adderTemp.t;
          },
          reset: function() {
            this.s = this.t = 0;
          },
          valueOf: function() {
            return this.s;
          }
        };
        var d3_adderTemp = new d3_adder();
        function d3_adderSum(a, b, o) {
          var x = o.s = a + b, bv = x - a, av = x - bv;
          o.t = a - av + (b - bv);
        }
        d32.geo.stream = function(object, listener) {
          if (object && d3_geo_streamObjectType.hasOwnProperty(object.type)) {
            d3_geo_streamObjectType[object.type](object, listener);
          } else {
            d3_geo_streamGeometry(object, listener);
          }
        };
        function d3_geo_streamGeometry(geometry, listener) {
          if (geometry && d3_geo_streamGeometryType.hasOwnProperty(geometry.type)) {
            d3_geo_streamGeometryType[geometry.type](geometry, listener);
          }
        }
        var d3_geo_streamObjectType = {
          Feature: function(feature, listener) {
            d3_geo_streamGeometry(feature.geometry, listener);
          },
          FeatureCollection: function(object, listener) {
            var features = object.features, i = -1, n = features.length;
            while (++i < n) d3_geo_streamGeometry(features[i].geometry, listener);
          }
        };
        var d3_geo_streamGeometryType = {
          Sphere: function(object, listener) {
            listener.sphere();
          },
          Point: function(object, listener) {
            object = object.coordinates;
            listener.point(object[0], object[1], object[2]);
          },
          MultiPoint: function(object, listener) {
            var coordinates = object.coordinates, i = -1, n = coordinates.length;
            while (++i < n) object = coordinates[i], listener.point(object[0], object[1], object[2]);
          },
          LineString: function(object, listener) {
            d3_geo_streamLine(object.coordinates, listener, 0);
          },
          MultiLineString: function(object, listener) {
            var coordinates = object.coordinates, i = -1, n = coordinates.length;
            while (++i < n) d3_geo_streamLine(coordinates[i], listener, 0);
          },
          Polygon: function(object, listener) {
            d3_geo_streamPolygon(object.coordinates, listener);
          },
          MultiPolygon: function(object, listener) {
            var coordinates = object.coordinates, i = -1, n = coordinates.length;
            while (++i < n) d3_geo_streamPolygon(coordinates[i], listener);
          },
          GeometryCollection: function(object, listener) {
            var geometries = object.geometries, i = -1, n = geometries.length;
            while (++i < n) d3_geo_streamGeometry(geometries[i], listener);
          }
        };
        function d3_geo_streamLine(coordinates, listener, closed) {
          var i = -1, n = coordinates.length - closed, coordinate;
          listener.lineStart();
          while (++i < n) coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1], coordinate[2]);
          listener.lineEnd();
        }
        function d3_geo_streamPolygon(coordinates, listener) {
          var i = -1, n = coordinates.length;
          listener.polygonStart();
          while (++i < n) d3_geo_streamLine(coordinates[i], listener, 1);
          listener.polygonEnd();
        }
        d32.geo.area = function(object) {
          d3_geo_areaSum = 0;
          d32.geo.stream(object, d3_geo_area);
          return d3_geo_areaSum;
        };
        var d3_geo_areaSum, d3_geo_areaRingSum = new d3_adder();
        var d3_geo_area = {
          sphere: function() {
            d3_geo_areaSum += 4 * \u03C0;
          },
          point: d3_noop,
          lineStart: d3_noop,
          lineEnd: d3_noop,
          polygonStart: function() {
            d3_geo_areaRingSum.reset();
            d3_geo_area.lineStart = d3_geo_areaRingStart;
          },
          polygonEnd: function() {
            var area = 2 * d3_geo_areaRingSum;
            d3_geo_areaSum += area < 0 ? 4 * \u03C0 + area : area;
            d3_geo_area.lineStart = d3_geo_area.lineEnd = d3_geo_area.point = d3_noop;
          }
        };
        function d3_geo_areaRingStart() {
          var \u03BB00, \u03C600, \u03BB0, cos\u03C60, sin\u03C60;
          d3_geo_area.point = function(\u03BB, \u03C6) {
            d3_geo_area.point = nextPoint;
            \u03BB0 = (\u03BB00 = \u03BB) * d3_radians, cos\u03C60 = Math.cos(\u03C6 = (\u03C600 = \u03C6) * d3_radians / 2 + \u03C0 / 4), sin\u03C60 = Math.sin(\u03C6);
          };
          function nextPoint(\u03BB, \u03C6) {
            \u03BB *= d3_radians;
            \u03C6 = \u03C6 * d3_radians / 2 + \u03C0 / 4;
            var d\u03BB = \u03BB - \u03BB0, sd\u03BB = d\u03BB >= 0 ? 1 : -1, ad\u03BB = sd\u03BB * d\u03BB, cos\u03C6 = Math.cos(\u03C6), sin\u03C6 = Math.sin(\u03C6), k = sin\u03C60 * sin\u03C6, u = cos\u03C60 * cos\u03C6 + k * Math.cos(ad\u03BB), v = k * sd\u03BB * Math.sin(ad\u03BB);
            d3_geo_areaRingSum.add(Math.atan2(v, u));
            \u03BB0 = \u03BB, cos\u03C60 = cos\u03C6, sin\u03C60 = sin\u03C6;
          }
          d3_geo_area.lineEnd = function() {
            nextPoint(\u03BB00, \u03C600);
          };
        }
        function d3_geo_cartesian(spherical) {
          var \u03BB = spherical[0], \u03C6 = spherical[1], cos\u03C6 = Math.cos(\u03C6);
          return [cos\u03C6 * Math.cos(\u03BB), cos\u03C6 * Math.sin(\u03BB), Math.sin(\u03C6)];
        }
        function d3_geo_cartesianDot(a, b) {
          return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        }
        function d3_geo_cartesianCross(a, b) {
          return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
        }
        function d3_geo_cartesianAdd(a, b) {
          a[0] += b[0];
          a[1] += b[1];
          a[2] += b[2];
        }
        function d3_geo_cartesianScale(vector, k) {
          return [vector[0] * k, vector[1] * k, vector[2] * k];
        }
        function d3_geo_cartesianNormalize(d) {
          var l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
          d[0] /= l;
          d[1] /= l;
          d[2] /= l;
        }
        function d3_geo_spherical(cartesian) {
          return [Math.atan2(cartesian[1], cartesian[0]), d3_asin(cartesian[2])];
        }
        function d3_geo_sphericalEqual(a, b) {
          return abs(a[0] - b[0]) < \u03B5 && abs(a[1] - b[1]) < \u03B5;
        }
        d32.geo.bounds = /* @__PURE__ */ (function() {
          var \u03BB0, \u03C60, \u03BB1, \u03C61, \u03BB_, \u03BB__, \u03C6__, p0, d\u03BBSum, ranges, range;
          var bound = {
            point,
            lineStart,
            lineEnd,
            polygonStart: function() {
              bound.point = ringPoint;
              bound.lineStart = ringStart;
              bound.lineEnd = ringEnd;
              d\u03BBSum = 0;
              d3_geo_area.polygonStart();
            },
            polygonEnd: function() {
              d3_geo_area.polygonEnd();
              bound.point = point;
              bound.lineStart = lineStart;
              bound.lineEnd = lineEnd;
              if (d3_geo_areaRingSum < 0) \u03BB0 = -(\u03BB1 = 180), \u03C60 = -(\u03C61 = 90);
              else if (d\u03BBSum > \u03B5) \u03C61 = 90;
              else if (d\u03BBSum < -\u03B5) \u03C60 = -90;
              range[0] = \u03BB0, range[1] = \u03BB1;
            }
          };
          function point(\u03BB, \u03C6) {
            ranges.push(range = [\u03BB0 = \u03BB, \u03BB1 = \u03BB]);
            if (\u03C6 < \u03C60) \u03C60 = \u03C6;
            if (\u03C6 > \u03C61) \u03C61 = \u03C6;
          }
          function linePoint(\u03BB, \u03C6) {
            var p = d3_geo_cartesian([\u03BB * d3_radians, \u03C6 * d3_radians]);
            if (p0) {
              var normal = d3_geo_cartesianCross(p0, p), equatorial = [normal[1], -normal[0], 0], inflection = d3_geo_cartesianCross(equatorial, normal);
              d3_geo_cartesianNormalize(inflection);
              inflection = d3_geo_spherical(inflection);
              var d\u03BB = \u03BB - \u03BB_, s = d\u03BB > 0 ? 1 : -1, \u03BBi = inflection[0] * d3_degrees * s, antimeridian = abs(d\u03BB) > 180;
              if (antimeridian ^ (s * \u03BB_ < \u03BBi && \u03BBi < s * \u03BB)) {
                var \u03C6i = inflection[1] * d3_degrees;
                if (\u03C6i > \u03C61) \u03C61 = \u03C6i;
              } else if (\u03BBi = (\u03BBi + 360) % 360 - 180, antimeridian ^ (s * \u03BB_ < \u03BBi && \u03BBi < s * \u03BB)) {
                var \u03C6i = -inflection[1] * d3_degrees;
                if (\u03C6i < \u03C60) \u03C60 = \u03C6i;
              } else {
                if (\u03C6 < \u03C60) \u03C60 = \u03C6;
                if (\u03C6 > \u03C61) \u03C61 = \u03C6;
              }
              if (antimeridian) {
                if (\u03BB < \u03BB_) {
                  if (angle(\u03BB0, \u03BB) > angle(\u03BB0, \u03BB1)) \u03BB1 = \u03BB;
                } else {
                  if (angle(\u03BB, \u03BB1) > angle(\u03BB0, \u03BB1)) \u03BB0 = \u03BB;
                }
              } else {
                if (\u03BB1 >= \u03BB0) {
                  if (\u03BB < \u03BB0) \u03BB0 = \u03BB;
                  if (\u03BB > \u03BB1) \u03BB1 = \u03BB;
                } else {
                  if (\u03BB > \u03BB_) {
                    if (angle(\u03BB0, \u03BB) > angle(\u03BB0, \u03BB1)) \u03BB1 = \u03BB;
                  } else {
                    if (angle(\u03BB, \u03BB1) > angle(\u03BB0, \u03BB1)) \u03BB0 = \u03BB;
                  }
                }
              }
            } else {
              point(\u03BB, \u03C6);
            }
            p0 = p, \u03BB_ = \u03BB;
          }
          function lineStart() {
            bound.point = linePoint;
          }
          function lineEnd() {
            range[0] = \u03BB0, range[1] = \u03BB1;
            bound.point = point;
            p0 = null;
          }
          function ringPoint(\u03BB, \u03C6) {
            if (p0) {
              var d\u03BB = \u03BB - \u03BB_;
              d\u03BBSum += abs(d\u03BB) > 180 ? d\u03BB + (d\u03BB > 0 ? 360 : -360) : d\u03BB;
            } else \u03BB__ = \u03BB, \u03C6__ = \u03C6;
            d3_geo_area.point(\u03BB, \u03C6);
            linePoint(\u03BB, \u03C6);
          }
          function ringStart() {
            d3_geo_area.lineStart();
          }
          function ringEnd() {
            ringPoint(\u03BB__, \u03C6__);
            d3_geo_area.lineEnd();
            if (abs(d\u03BBSum) > \u03B5) \u03BB0 = -(\u03BB1 = 180);
            range[0] = \u03BB0, range[1] = \u03BB1;
            p0 = null;
          }
          function angle(\u03BB02, \u03BB12) {
            return (\u03BB12 -= \u03BB02) < 0 ? \u03BB12 + 360 : \u03BB12;
          }
          function compareRanges(a, b) {
            return a[0] - b[0];
          }
          function withinRange(x, range2) {
            return range2[0] <= range2[1] ? range2[0] <= x && x <= range2[1] : x < range2[0] || range2[1] < x;
          }
          return function(feature) {
            \u03C61 = \u03BB1 = -(\u03BB0 = \u03C60 = Infinity);
            ranges = [];
            d32.geo.stream(feature, bound);
            var n = ranges.length;
            if (n) {
              ranges.sort(compareRanges);
              for (var i = 1, a = ranges[0], b, merged = [a]; i < n; ++i) {
                b = ranges[i];
                if (withinRange(b[0], a) || withinRange(b[1], a)) {
                  if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
                  if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0];
                } else {
                  merged.push(a = b);
                }
              }
              var best = -Infinity, d\u03BB;
              for (var n = merged.length - 1, i = 0, a = merged[n], b; i <= n; a = b, ++i) {
                b = merged[i];
                if ((d\u03BB = angle(a[1], b[0])) > best) best = d\u03BB, \u03BB0 = b[0], \u03BB1 = a[1];
              }
            }
            ranges = range = null;
            return \u03BB0 === Infinity || \u03C60 === Infinity ? [[NaN, NaN], [NaN, NaN]] : [[\u03BB0, \u03C60], [\u03BB1, \u03C61]];
          };
        })();
        d32.geo.centroid = function(object) {
          d3_geo_centroidW0 = d3_geo_centroidW1 = d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
          d32.geo.stream(object, d3_geo_centroid);
          var x = d3_geo_centroidX2, y = d3_geo_centroidY2, z = d3_geo_centroidZ2, m = x * x + y * y + z * z;
          if (m < \u03B52) {
            x = d3_geo_centroidX1, y = d3_geo_centroidY1, z = d3_geo_centroidZ1;
            if (d3_geo_centroidW1 < \u03B5) x = d3_geo_centroidX0, y = d3_geo_centroidY0, z = d3_geo_centroidZ0;
            m = x * x + y * y + z * z;
            if (m < \u03B52) return [NaN, NaN];
          }
          return [Math.atan2(y, x) * d3_degrees, d3_asin(z / Math.sqrt(m)) * d3_degrees];
        };
        var d3_geo_centroidW0, d3_geo_centroidW1, d3_geo_centroidX0, d3_geo_centroidY0, d3_geo_centroidZ0, d3_geo_centroidX1, d3_geo_centroidY1, d3_geo_centroidZ1, d3_geo_centroidX2, d3_geo_centroidY2, d3_geo_centroidZ2;
        var d3_geo_centroid = {
          sphere: d3_noop,
          point: d3_geo_centroidPoint,
          lineStart: d3_geo_centroidLineStart,
          lineEnd: d3_geo_centroidLineEnd,
          polygonStart: function() {
            d3_geo_centroid.lineStart = d3_geo_centroidRingStart;
          },
          polygonEnd: function() {
            d3_geo_centroid.lineStart = d3_geo_centroidLineStart;
          }
        };
        function d3_geo_centroidPoint(\u03BB, \u03C6) {
          \u03BB *= d3_radians;
          var cos\u03C6 = Math.cos(\u03C6 *= d3_radians);
          d3_geo_centroidPointXYZ(cos\u03C6 * Math.cos(\u03BB), cos\u03C6 * Math.sin(\u03BB), Math.sin(\u03C6));
        }
        function d3_geo_centroidPointXYZ(x, y, z) {
          ++d3_geo_centroidW0;
          d3_geo_centroidX0 += (x - d3_geo_centroidX0) / d3_geo_centroidW0;
          d3_geo_centroidY0 += (y - d3_geo_centroidY0) / d3_geo_centroidW0;
          d3_geo_centroidZ0 += (z - d3_geo_centroidZ0) / d3_geo_centroidW0;
        }
        function d3_geo_centroidLineStart() {
          var x0, y0, z0;
          d3_geo_centroid.point = function(\u03BB, \u03C6) {
            \u03BB *= d3_radians;
            var cos\u03C6 = Math.cos(\u03C6 *= d3_radians);
            x0 = cos\u03C6 * Math.cos(\u03BB);
            y0 = cos\u03C6 * Math.sin(\u03BB);
            z0 = Math.sin(\u03C6);
            d3_geo_centroid.point = nextPoint;
            d3_geo_centroidPointXYZ(x0, y0, z0);
          };
          function nextPoint(\u03BB, \u03C6) {
            \u03BB *= d3_radians;
            var cos\u03C6 = Math.cos(\u03C6 *= d3_radians), x = cos\u03C6 * Math.cos(\u03BB), y = cos\u03C6 * Math.sin(\u03BB), z = Math.sin(\u03C6), w = Math.atan2(Math.sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
            d3_geo_centroidW1 += w;
            d3_geo_centroidX1 += w * (x0 + (x0 = x));
            d3_geo_centroidY1 += w * (y0 + (y0 = y));
            d3_geo_centroidZ1 += w * (z0 + (z0 = z));
            d3_geo_centroidPointXYZ(x0, y0, z0);
          }
        }
        function d3_geo_centroidLineEnd() {
          d3_geo_centroid.point = d3_geo_centroidPoint;
        }
        function d3_geo_centroidRingStart() {
          var \u03BB00, \u03C600, x0, y0, z0;
          d3_geo_centroid.point = function(\u03BB, \u03C6) {
            \u03BB00 = \u03BB, \u03C600 = \u03C6;
            d3_geo_centroid.point = nextPoint;
            \u03BB *= d3_radians;
            var cos\u03C6 = Math.cos(\u03C6 *= d3_radians);
            x0 = cos\u03C6 * Math.cos(\u03BB);
            y0 = cos\u03C6 * Math.sin(\u03BB);
            z0 = Math.sin(\u03C6);
            d3_geo_centroidPointXYZ(x0, y0, z0);
          };
          d3_geo_centroid.lineEnd = function() {
            nextPoint(\u03BB00, \u03C600);
            d3_geo_centroid.lineEnd = d3_geo_centroidLineEnd;
            d3_geo_centroid.point = d3_geo_centroidPoint;
          };
          function nextPoint(\u03BB, \u03C6) {
            \u03BB *= d3_radians;
            var cos\u03C6 = Math.cos(\u03C6 *= d3_radians), x = cos\u03C6 * Math.cos(\u03BB), y = cos\u03C6 * Math.sin(\u03BB), z = Math.sin(\u03C6), cx = y0 * z - z0 * y, cy = z0 * x - x0 * z, cz = x0 * y - y0 * x, m = Math.sqrt(cx * cx + cy * cy + cz * cz), u = x0 * x + y0 * y + z0 * z, v = m && -d3_acos(u) / m, w = Math.atan2(m, u);
            d3_geo_centroidX2 += v * cx;
            d3_geo_centroidY2 += v * cy;
            d3_geo_centroidZ2 += v * cz;
            d3_geo_centroidW1 += w;
            d3_geo_centroidX1 += w * (x0 + (x0 = x));
            d3_geo_centroidY1 += w * (y0 + (y0 = y));
            d3_geo_centroidZ1 += w * (z0 + (z0 = z));
            d3_geo_centroidPointXYZ(x0, y0, z0);
          }
        }
        function d3_geo_compose(a, b) {
          function compose(x, y) {
            return x = a(x, y), b(x[0], x[1]);
          }
          if (a.invert && b.invert) compose.invert = function(x, y) {
            return x = b.invert(x, y), x && a.invert(x[0], x[1]);
          };
          return compose;
        }
        function d3_true() {
          return true;
        }
        function d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener) {
          var subject = [], clip = [];
          segments.forEach(function(segment) {
            if ((n2 = segment.length - 1) <= 0) return;
            var n2, p0 = segment[0], p1 = segment[n2];
            if (d3_geo_sphericalEqual(p0, p1)) {
              listener.lineStart();
              for (var i2 = 0; i2 < n2; ++i2) listener.point((p0 = segment[i2])[0], p0[1]);
              listener.lineEnd();
              return;
            }
            var a = new d3_geo_clipPolygonIntersection(p0, segment, null, true), b = new d3_geo_clipPolygonIntersection(p0, null, a, false);
            a.o = b;
            subject.push(a);
            clip.push(b);
            a = new d3_geo_clipPolygonIntersection(p1, segment, null, false);
            b = new d3_geo_clipPolygonIntersection(p1, null, a, true);
            a.o = b;
            subject.push(a);
            clip.push(b);
          });
          clip.sort(compare);
          d3_geo_clipPolygonLinkCircular(subject);
          d3_geo_clipPolygonLinkCircular(clip);
          if (!subject.length) return;
          for (var i = 0, entry = clipStartInside, n = clip.length; i < n; ++i) {
            clip[i].e = entry = !entry;
          }
          var start = subject[0], points, point;
          while (1) {
            var current = start, isSubject = true;
            while (current.v) if ((current = current.n) === start) return;
            points = current.z;
            listener.lineStart();
            do {
              current.v = current.o.v = true;
              if (current.e) {
                if (isSubject) {
                  for (var i = 0, n = points.length; i < n; ++i) listener.point((point = points[i])[0], point[1]);
                } else {
                  interpolate(current.x, current.n.x, 1, listener);
                }
                current = current.n;
              } else {
                if (isSubject) {
                  points = current.p.z;
                  for (var i = points.length - 1; i >= 0; --i) listener.point((point = points[i])[0], point[1]);
                } else {
                  interpolate(current.x, current.p.x, -1, listener);
                }
                current = current.p;
              }
              current = current.o;
              points = current.z;
              isSubject = !isSubject;
            } while (!current.v);
            listener.lineEnd();
          }
        }
        function d3_geo_clipPolygonLinkCircular(array) {
          if (!(n = array.length)) return;
          var n, i = 0, a = array[0], b;
          while (++i < n) {
            a.n = b = array[i];
            b.p = a;
            a = b;
          }
          a.n = b = array[0];
          b.p = a;
        }
        function d3_geo_clipPolygonIntersection(point, points, other, entry) {
          this.x = point;
          this.z = points;
          this.o = other;
          this.e = entry;
          this.v = false;
          this.n = this.p = null;
        }
        function d3_geo_clip(pointVisible, clipLine, interpolate, clipStart) {
          return function(rotate, listener) {
            var line = clipLine(listener), rotatedClipStart = rotate.invert(clipStart[0], clipStart[1]);
            var clip = {
              point,
              lineStart,
              lineEnd,
              polygonStart: function() {
                clip.point = pointRing;
                clip.lineStart = ringStart;
                clip.lineEnd = ringEnd;
                segments = [];
                polygon = [];
              },
              polygonEnd: function() {
                clip.point = point;
                clip.lineStart = lineStart;
                clip.lineEnd = lineEnd;
                segments = d32.merge(segments);
                var clipStartInside = d3_geo_pointInPolygon(rotatedClipStart, polygon);
                if (segments.length) {
                  if (!polygonStarted) listener.polygonStart(), polygonStarted = true;
                  d3_geo_clipPolygon(segments, d3_geo_clipSort, clipStartInside, interpolate, listener);
                } else if (clipStartInside) {
                  if (!polygonStarted) listener.polygonStart(), polygonStarted = true;
                  listener.lineStart();
                  interpolate(null, null, 1, listener);
                  listener.lineEnd();
                }
                if (polygonStarted) listener.polygonEnd(), polygonStarted = false;
                segments = polygon = null;
              },
              sphere: function() {
                listener.polygonStart();
                listener.lineStart();
                interpolate(null, null, 1, listener);
                listener.lineEnd();
                listener.polygonEnd();
              }
            };
            function point(\u03BB, \u03C6) {
              var point2 = rotate(\u03BB, \u03C6);
              if (pointVisible(\u03BB = point2[0], \u03C6 = point2[1])) listener.point(\u03BB, \u03C6);
            }
            function pointLine(\u03BB, \u03C6) {
              var point2 = rotate(\u03BB, \u03C6);
              line.point(point2[0], point2[1]);
            }
            function lineStart() {
              clip.point = pointLine;
              line.lineStart();
            }
            function lineEnd() {
              clip.point = point;
              line.lineEnd();
            }
            var segments;
            var buffer = d3_geo_clipBufferListener(), ringListener = clipLine(buffer), polygonStarted = false, polygon, ring;
            function pointRing(\u03BB, \u03C6) {
              ring.push([\u03BB, \u03C6]);
              var point2 = rotate(\u03BB, \u03C6);
              ringListener.point(point2[0], point2[1]);
            }
            function ringStart() {
              ringListener.lineStart();
              ring = [];
            }
            function ringEnd() {
              pointRing(ring[0][0], ring[0][1]);
              ringListener.lineEnd();
              var clean = ringListener.clean(), ringSegments = buffer.buffer(), segment, n = ringSegments.length;
              ring.pop();
              polygon.push(ring);
              ring = null;
              if (!n) return;
              if (clean & 1) {
                segment = ringSegments[0];
                var n = segment.length - 1, i = -1, point2;
                if (n > 0) {
                  if (!polygonStarted) listener.polygonStart(), polygonStarted = true;
                  listener.lineStart();
                  while (++i < n) listener.point((point2 = segment[i])[0], point2[1]);
                  listener.lineEnd();
                }
                return;
              }
              if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
              segments.push(ringSegments.filter(d3_geo_clipSegmentLength1));
            }
            return clip;
          };
        }
        function d3_geo_clipSegmentLength1(segment) {
          return segment.length > 1;
        }
        function d3_geo_clipBufferListener() {
          var lines = [], line;
          return {
            lineStart: function() {
              lines.push(line = []);
            },
            point: function(\u03BB, \u03C6) {
              line.push([\u03BB, \u03C6]);
            },
            lineEnd: d3_noop,
            buffer: function() {
              var buffer = lines;
              lines = [];
              line = null;
              return buffer;
            },
            rejoin: function() {
              if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
            }
          };
        }
        function d3_geo_clipSort(a, b) {
          return ((a = a.x)[0] < 0 ? a[1] - half\u03C0 - \u03B5 : half\u03C0 - a[1]) - ((b = b.x)[0] < 0 ? b[1] - half\u03C0 - \u03B5 : half\u03C0 - b[1]);
        }
        var d3_geo_clipAntimeridian = d3_geo_clip(d3_true, d3_geo_clipAntimeridianLine, d3_geo_clipAntimeridianInterpolate, [-\u03C0, -\u03C0 / 2]);
        function d3_geo_clipAntimeridianLine(listener) {
          var \u03BB0 = NaN, \u03C60 = NaN, s\u03BB0 = NaN, clean;
          return {
            lineStart: function() {
              listener.lineStart();
              clean = 1;
            },
            point: function(\u03BB1, \u03C61) {
              var s\u03BB1 = \u03BB1 > 0 ? \u03C0 : -\u03C0, d\u03BB = abs(\u03BB1 - \u03BB0);
              if (abs(d\u03BB - \u03C0) < \u03B5) {
                listener.point(\u03BB0, \u03C60 = (\u03C60 + \u03C61) / 2 > 0 ? half\u03C0 : -half\u03C0);
                listener.point(s\u03BB0, \u03C60);
                listener.lineEnd();
                listener.lineStart();
                listener.point(s\u03BB1, \u03C60);
                listener.point(\u03BB1, \u03C60);
                clean = 0;
              } else if (s\u03BB0 !== s\u03BB1 && d\u03BB >= \u03C0) {
                if (abs(\u03BB0 - s\u03BB0) < \u03B5) \u03BB0 -= s\u03BB0 * \u03B5;
                if (abs(\u03BB1 - s\u03BB1) < \u03B5) \u03BB1 -= s\u03BB1 * \u03B5;
                \u03C60 = d3_geo_clipAntimeridianIntersect(\u03BB0, \u03C60, \u03BB1, \u03C61);
                listener.point(s\u03BB0, \u03C60);
                listener.lineEnd();
                listener.lineStart();
                listener.point(s\u03BB1, \u03C60);
                clean = 0;
              }
              listener.point(\u03BB0 = \u03BB1, \u03C60 = \u03C61);
              s\u03BB0 = s\u03BB1;
            },
            lineEnd: function() {
              listener.lineEnd();
              \u03BB0 = \u03C60 = NaN;
            },
            clean: function() {
              return 2 - clean;
            }
          };
        }
        function d3_geo_clipAntimeridianIntersect(\u03BB0, \u03C60, \u03BB1, \u03C61) {
          var cos\u03C60, cos\u03C61, sin\u03BB0_\u03BB1 = Math.sin(\u03BB0 - \u03BB1);
          return abs(sin\u03BB0_\u03BB1) > \u03B5 ? Math.atan((Math.sin(\u03C60) * (cos\u03C61 = Math.cos(\u03C61)) * Math.sin(\u03BB1) - Math.sin(\u03C61) * (cos\u03C60 = Math.cos(\u03C60)) * Math.sin(\u03BB0)) / (cos\u03C60 * cos\u03C61 * sin\u03BB0_\u03BB1)) : (\u03C60 + \u03C61) / 2;
        }
        function d3_geo_clipAntimeridianInterpolate(from, to, direction, listener) {
          var \u03C6;
          if (from == null) {
            \u03C6 = direction * half\u03C0;
            listener.point(-\u03C0, \u03C6);
            listener.point(0, \u03C6);
            listener.point(\u03C0, \u03C6);
            listener.point(\u03C0, 0);
            listener.point(\u03C0, -\u03C6);
            listener.point(0, -\u03C6);
            listener.point(-\u03C0, -\u03C6);
            listener.point(-\u03C0, 0);
            listener.point(-\u03C0, \u03C6);
          } else if (abs(from[0] - to[0]) > \u03B5) {
            var s = from[0] < to[0] ? \u03C0 : -\u03C0;
            \u03C6 = direction * s / 2;
            listener.point(-s, \u03C6);
            listener.point(0, \u03C6);
            listener.point(s, \u03C6);
          } else {
            listener.point(to[0], to[1]);
          }
        }
        function d3_geo_pointInPolygon(point, polygon) {
          var meridian = point[0], parallel = point[1], meridianNormal = [Math.sin(meridian), -Math.cos(meridian), 0], polarAngle = 0, winding = 0;
          d3_geo_areaRingSum.reset();
          for (var i = 0, n = polygon.length; i < n; ++i) {
            var ring = polygon[i], m = ring.length;
            if (!m) continue;
            var point0 = ring[0], \u03BB0 = point0[0], \u03C60 = point0[1] / 2 + \u03C0 / 4, sin\u03C60 = Math.sin(\u03C60), cos\u03C60 = Math.cos(\u03C60), j = 1;
            while (true) {
              if (j === m) j = 0;
              point = ring[j];
              var \u03BB = point[0], \u03C6 = point[1] / 2 + \u03C0 / 4, sin\u03C6 = Math.sin(\u03C6), cos\u03C6 = Math.cos(\u03C6), d\u03BB = \u03BB - \u03BB0, sd\u03BB = d\u03BB >= 0 ? 1 : -1, ad\u03BB = sd\u03BB * d\u03BB, antimeridian = ad\u03BB > \u03C0, k = sin\u03C60 * sin\u03C6;
              d3_geo_areaRingSum.add(Math.atan2(k * sd\u03BB * Math.sin(ad\u03BB), cos\u03C60 * cos\u03C6 + k * Math.cos(ad\u03BB)));
              polarAngle += antimeridian ? d\u03BB + sd\u03BB * \u03C4 : d\u03BB;
              if (antimeridian ^ \u03BB0 >= meridian ^ \u03BB >= meridian) {
                var arc = d3_geo_cartesianCross(d3_geo_cartesian(point0), d3_geo_cartesian(point));
                d3_geo_cartesianNormalize(arc);
                var intersection = d3_geo_cartesianCross(meridianNormal, arc);
                d3_geo_cartesianNormalize(intersection);
                var \u03C6arc = (antimeridian ^ d\u03BB >= 0 ? -1 : 1) * d3_asin(intersection[2]);
                if (parallel > \u03C6arc || parallel === \u03C6arc && (arc[0] || arc[1])) {
                  winding += antimeridian ^ d\u03BB >= 0 ? 1 : -1;
                }
              }
              if (!j++) break;
              \u03BB0 = \u03BB, sin\u03C60 = sin\u03C6, cos\u03C60 = cos\u03C6, point0 = point;
            }
          }
          return (polarAngle < -\u03B5 || polarAngle < \u03B5 && d3_geo_areaRingSum < -\u03B5) ^ winding & 1;
        }
        function d3_geo_clipCircle(radius) {
          var cr = Math.cos(radius), smallRadius = cr > 0, notHemisphere = abs(cr) > \u03B5, interpolate = d3_geo_circleInterpolate(radius, 6 * d3_radians);
          return d3_geo_clip(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-\u03C0, radius - \u03C0]);
          function visible(\u03BB, \u03C6) {
            return Math.cos(\u03BB) * Math.cos(\u03C6) > cr;
          }
          function clipLine(listener) {
            var point0, c0, v0, v00, clean;
            return {
              lineStart: function() {
                v00 = v0 = false;
                clean = 1;
              },
              point: function(\u03BB, \u03C6) {
                var point1 = [\u03BB, \u03C6], point2, v = visible(\u03BB, \u03C6), c = smallRadius ? v ? 0 : code(\u03BB, \u03C6) : v ? code(\u03BB + (\u03BB < 0 ? \u03C0 : -\u03C0), \u03C6) : 0;
                if (!point0 && (v00 = v0 = v)) listener.lineStart();
                if (v !== v0) {
                  point2 = intersect(point0, point1);
                  if (d3_geo_sphericalEqual(point0, point2) || d3_geo_sphericalEqual(point1, point2)) {
                    point1[0] += \u03B5;
                    point1[1] += \u03B5;
                    v = visible(point1[0], point1[1]);
                  }
                }
                if (v !== v0) {
                  clean = 0;
                  if (v) {
                    listener.lineStart();
                    point2 = intersect(point1, point0);
                    listener.point(point2[0], point2[1]);
                  } else {
                    point2 = intersect(point0, point1);
                    listener.point(point2[0], point2[1]);
                    listener.lineEnd();
                  }
                  point0 = point2;
                } else if (notHemisphere && point0 && smallRadius ^ v) {
                  var t;
                  if (!(c & c0) && (t = intersect(point1, point0, true))) {
                    clean = 0;
                    if (smallRadius) {
                      listener.lineStart();
                      listener.point(t[0][0], t[0][1]);
                      listener.point(t[1][0], t[1][1]);
                      listener.lineEnd();
                    } else {
                      listener.point(t[1][0], t[1][1]);
                      listener.lineEnd();
                      listener.lineStart();
                      listener.point(t[0][0], t[0][1]);
                    }
                  }
                }
                if (v && (!point0 || !d3_geo_sphericalEqual(point0, point1))) {
                  listener.point(point1[0], point1[1]);
                }
                point0 = point1, v0 = v, c0 = c;
              },
              lineEnd: function() {
                if (v0) listener.lineEnd();
                point0 = null;
              },
              clean: function() {
                return clean | (v00 && v0) << 1;
              }
            };
          }
          function intersect(a, b, two) {
            var pa = d3_geo_cartesian(a), pb = d3_geo_cartesian(b);
            var n1 = [1, 0, 0], n2 = d3_geo_cartesianCross(pa, pb), n2n2 = d3_geo_cartesianDot(n2, n2), n1n2 = n2[0], determinant = n2n2 - n1n2 * n1n2;
            if (!determinant) return !two && a;
            var c1 = cr * n2n2 / determinant, c2 = -cr * n1n2 / determinant, n1xn2 = d3_geo_cartesianCross(n1, n2), A = d3_geo_cartesianScale(n1, c1), B = d3_geo_cartesianScale(n2, c2);
            d3_geo_cartesianAdd(A, B);
            var u = n1xn2, w = d3_geo_cartesianDot(A, u), uu = d3_geo_cartesianDot(u, u), t2 = w * w - uu * (d3_geo_cartesianDot(A, A) - 1);
            if (t2 < 0) return;
            var t = Math.sqrt(t2), q = d3_geo_cartesianScale(u, (-w - t) / uu);
            d3_geo_cartesianAdd(q, A);
            q = d3_geo_spherical(q);
            if (!two) return q;
            var \u03BB0 = a[0], \u03BB1 = b[0], \u03C60 = a[1], \u03C61 = b[1], z;
            if (\u03BB1 < \u03BB0) z = \u03BB0, \u03BB0 = \u03BB1, \u03BB1 = z;
            var \u03B4\u03BB = \u03BB1 - \u03BB0, polar = abs(\u03B4\u03BB - \u03C0) < \u03B5, meridian = polar || \u03B4\u03BB < \u03B5;
            if (!polar && \u03C61 < \u03C60) z = \u03C60, \u03C60 = \u03C61, \u03C61 = z;
            if (meridian ? polar ? \u03C60 + \u03C61 > 0 ^ q[1] < (abs(q[0] - \u03BB0) < \u03B5 ? \u03C60 : \u03C61) : \u03C60 <= q[1] && q[1] <= \u03C61 : \u03B4\u03BB > \u03C0 ^ (\u03BB0 <= q[0] && q[0] <= \u03BB1)) {
              var q1 = d3_geo_cartesianScale(u, (-w + t) / uu);
              d3_geo_cartesianAdd(q1, A);
              return [q, d3_geo_spherical(q1)];
            }
          }
          function code(\u03BB, \u03C6) {
            var r = smallRadius ? radius : \u03C0 - radius, code2 = 0;
            if (\u03BB < -r) code2 |= 1;
            else if (\u03BB > r) code2 |= 2;
            if (\u03C6 < -r) code2 |= 4;
            else if (\u03C6 > r) code2 |= 8;
            return code2;
          }
        }
        function d3_geom_clipLine(x0, y0, x1, y1) {
          return function(line) {
            var a = line.a, b = line.b, ax = a.x, ay = a.y, bx = b.x, by = b.y, t0 = 0, t1 = 1, dx = bx - ax, dy = by - ay, r;
            r = x0 - ax;
            if (!dx && r > 0) return;
            r /= dx;
            if (dx < 0) {
              if (r < t0) return;
              if (r < t1) t1 = r;
            } else if (dx > 0) {
              if (r > t1) return;
              if (r > t0) t0 = r;
            }
            r = x1 - ax;
            if (!dx && r < 0) return;
            r /= dx;
            if (dx < 0) {
              if (r > t1) return;
              if (r > t0) t0 = r;
            } else if (dx > 0) {
              if (r < t0) return;
              if (r < t1) t1 = r;
            }
            r = y0 - ay;
            if (!dy && r > 0) return;
            r /= dy;
            if (dy < 0) {
              if (r < t0) return;
              if (r < t1) t1 = r;
            } else if (dy > 0) {
              if (r > t1) return;
              if (r > t0) t0 = r;
            }
            r = y1 - ay;
            if (!dy && r < 0) return;
            r /= dy;
            if (dy < 0) {
              if (r > t1) return;
              if (r > t0) t0 = r;
            } else if (dy > 0) {
              if (r < t0) return;
              if (r < t1) t1 = r;
            }
            if (t0 > 0) line.a = {
              x: ax + t0 * dx,
              y: ay + t0 * dy
            };
            if (t1 < 1) line.b = {
              x: ax + t1 * dx,
              y: ay + t1 * dy
            };
            return line;
          };
        }
        var d3_geo_clipExtentMAX = 1e9;
        d32.geo.clipExtent = function() {
          var x0, y0, x1, y1, stream, clip, clipExtent = {
            stream: function(output) {
              if (stream) stream.valid = false;
              stream = clip(output);
              stream.valid = true;
              return stream;
            },
            extent: function(_) {
              if (!arguments.length) return [[x0, y0], [x1, y1]];
              clip = d3_geo_clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]);
              if (stream) stream.valid = false, stream = null;
              return clipExtent;
            }
          };
          return clipExtent.extent([[0, 0], [960, 500]]);
        };
        function d3_geo_clipExtent(x0, y0, x1, y1) {
          return function(listener) {
            var listener_ = listener, bufferListener = d3_geo_clipBufferListener(), clipLine = d3_geom_clipLine(x0, y0, x1, y1), segments, polygon, ring;
            var clip = {
              point,
              lineStart,
              lineEnd,
              polygonStart: function() {
                listener = bufferListener;
                segments = [];
                polygon = [];
                clean = true;
              },
              polygonEnd: function() {
                listener = listener_;
                segments = d32.merge(segments);
                var clipStartInside = insidePolygon([x0, y1]), inside = clean && clipStartInside, visible = segments.length;
                if (inside || visible) {
                  listener.polygonStart();
                  if (inside) {
                    listener.lineStart();
                    interpolate(null, null, 1, listener);
                    listener.lineEnd();
                  }
                  if (visible) {
                    d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener);
                  }
                  listener.polygonEnd();
                }
                segments = polygon = ring = null;
              }
            };
            function insidePolygon(p) {
              var wn = 0, n = polygon.length, y = p[1];
              for (var i = 0; i < n; ++i) {
                for (var j = 1, v = polygon[i], m = v.length, a = v[0], b; j < m; ++j) {
                  b = v[j];
                  if (a[1] <= y) {
                    if (b[1] > y && d3_cross2d(a, b, p) > 0) ++wn;
                  } else {
                    if (b[1] <= y && d3_cross2d(a, b, p) < 0) --wn;
                  }
                  a = b;
                }
              }
              return wn !== 0;
            }
            function interpolate(from, to, direction, listener2) {
              var a = 0, a1 = 0;
              if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoints(from, to) < 0 ^ direction > 0) {
                do {
                  listener2.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
                } while ((a = (a + direction + 4) % 4) !== a1);
              } else {
                listener2.point(to[0], to[1]);
              }
            }
            function pointVisible(x, y) {
              return x0 <= x && x <= x1 && y0 <= y && y <= y1;
            }
            function point(x, y) {
              if (pointVisible(x, y)) listener.point(x, y);
            }
            var x__, y__, v__, x_, y_, v_, first, clean;
            function lineStart() {
              clip.point = linePoint;
              if (polygon) polygon.push(ring = []);
              first = true;
              v_ = false;
              x_ = y_ = NaN;
            }
            function lineEnd() {
              if (segments) {
                linePoint(x__, y__);
                if (v__ && v_) bufferListener.rejoin();
                segments.push(bufferListener.buffer());
              }
              clip.point = point;
              if (v_) listener.lineEnd();
            }
            function linePoint(x, y) {
              x = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, x));
              y = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, y));
              var v = pointVisible(x, y);
              if (polygon) ring.push([x, y]);
              if (first) {
                x__ = x, y__ = y, v__ = v;
                first = false;
                if (v) {
                  listener.lineStart();
                  listener.point(x, y);
                }
              } else {
                if (v && v_) listener.point(x, y);
                else {
                  var l = {
                    a: {
                      x: x_,
                      y: y_
                    },
                    b: {
                      x,
                      y
                    }
                  };
                  if (clipLine(l)) {
                    if (!v_) {
                      listener.lineStart();
                      listener.point(l.a.x, l.a.y);
                    }
                    listener.point(l.b.x, l.b.y);
                    if (!v) listener.lineEnd();
                    clean = false;
                  } else if (v) {
                    listener.lineStart();
                    listener.point(x, y);
                    clean = false;
                  }
                }
              }
              x_ = x, y_ = y, v_ = v;
            }
            return clip;
          };
          function corner(p, direction) {
            return abs(p[0] - x0) < \u03B5 ? direction > 0 ? 0 : 3 : abs(p[0] - x1) < \u03B5 ? direction > 0 ? 2 : 1 : abs(p[1] - y0) < \u03B5 ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2;
          }
          function compare(a, b) {
            return comparePoints(a.x, b.x);
          }
          function comparePoints(a, b) {
            var ca = corner(a, 1), cb = corner(b, 1);
            return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
          }
        }
        function d3_geo_conic(projectAt) {
          var \u03C60 = 0, \u03C61 = \u03C0 / 3, m = d3_geo_projectionMutator(projectAt), p = m(\u03C60, \u03C61);
          p.parallels = function(_) {
            if (!arguments.length) return [\u03C60 / \u03C0 * 180, \u03C61 / \u03C0 * 180];
            return m(\u03C60 = _[0] * \u03C0 / 180, \u03C61 = _[1] * \u03C0 / 180);
          };
          return p;
        }
        function d3_geo_conicEqualArea(\u03C60, \u03C61) {
          var sin\u03C60 = Math.sin(\u03C60), n = (sin\u03C60 + Math.sin(\u03C61)) / 2, C = 1 + sin\u03C60 * (2 * n - sin\u03C60), \u03C10 = Math.sqrt(C) / n;
          function forward(\u03BB, \u03C6) {
            var \u03C13 = Math.sqrt(C - 2 * n * Math.sin(\u03C6)) / n;
            return [\u03C13 * Math.sin(\u03BB *= n), \u03C10 - \u03C13 * Math.cos(\u03BB)];
          }
          forward.invert = function(x, y) {
            var \u03C10_y = \u03C10 - y;
            return [Math.atan2(x, \u03C10_y) / n, d3_asin((C - (x * x + \u03C10_y * \u03C10_y) * n * n) / (2 * n))];
          };
          return forward;
        }
        (d32.geo.conicEqualArea = function() {
          return d3_geo_conic(d3_geo_conicEqualArea);
        }).raw = d3_geo_conicEqualArea;
        d32.geo.albers = function() {
          return d32.geo.conicEqualArea().rotate([96, 0]).center([-0.6, 38.7]).parallels([29.5, 45.5]).scale(1070);
        };
        d32.geo.albersUsa = function() {
          var lower48 = d32.geo.albers();
          var alaska = d32.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]);
          var hawaii = d32.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]);
          var point, pointStream = {
            point: function(x, y) {
              point = [x, y];
            }
          }, lower48Point, alaskaPoint, hawaiiPoint;
          function albersUsa(coordinates) {
            var x = coordinates[0], y = coordinates[1];
            point = null;
            (lower48Point(x, y), point) || (alaskaPoint(x, y), point) || hawaiiPoint(x, y);
            return point;
          }
          albersUsa.invert = function(coordinates) {
            var k = lower48.scale(), t = lower48.translate(), x = (coordinates[0] - t[0]) / k, y = (coordinates[1] - t[1]) / k;
            return (y >= 0.12 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii : lower48).invert(coordinates);
          };
          albersUsa.stream = function(stream) {
            var lower48Stream = lower48.stream(stream), alaskaStream = alaska.stream(stream), hawaiiStream = hawaii.stream(stream);
            return {
              point: function(x, y) {
                lower48Stream.point(x, y);
                alaskaStream.point(x, y);
                hawaiiStream.point(x, y);
              },
              sphere: function() {
                lower48Stream.sphere();
                alaskaStream.sphere();
                hawaiiStream.sphere();
              },
              lineStart: function() {
                lower48Stream.lineStart();
                alaskaStream.lineStart();
                hawaiiStream.lineStart();
              },
              lineEnd: function() {
                lower48Stream.lineEnd();
                alaskaStream.lineEnd();
                hawaiiStream.lineEnd();
              },
              polygonStart: function() {
                lower48Stream.polygonStart();
                alaskaStream.polygonStart();
                hawaiiStream.polygonStart();
              },
              polygonEnd: function() {
                lower48Stream.polygonEnd();
                alaskaStream.polygonEnd();
                hawaiiStream.polygonEnd();
              }
            };
          };
          albersUsa.precision = function(_) {
            if (!arguments.length) return lower48.precision();
            lower48.precision(_);
            alaska.precision(_);
            hawaii.precision(_);
            return albersUsa;
          };
          albersUsa.scale = function(_) {
            if (!arguments.length) return lower48.scale();
            lower48.scale(_);
            alaska.scale(_ * 0.35);
            hawaii.scale(_);
            return albersUsa.translate(lower48.translate());
          };
          albersUsa.translate = function(_) {
            if (!arguments.length) return lower48.translate();
            var k = lower48.scale(), x = +_[0], y = +_[1];
            lower48Point = lower48.translate(_).clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]]).stream(pointStream).point;
            alaskaPoint = alaska.translate([x - 0.307 * k, y + 0.201 * k]).clipExtent([[x - 0.425 * k + \u03B5, y + 0.12 * k + \u03B5], [x - 0.214 * k - \u03B5, y + 0.234 * k - \u03B5]]).stream(pointStream).point;
            hawaiiPoint = hawaii.translate([x - 0.205 * k, y + 0.212 * k]).clipExtent([[x - 0.214 * k + \u03B5, y + 0.166 * k + \u03B5], [x - 0.115 * k - \u03B5, y + 0.234 * k - \u03B5]]).stream(pointStream).point;
            return albersUsa;
          };
          return albersUsa.scale(1070);
        };
        var d3_geo_pathAreaSum, d3_geo_pathAreaPolygon, d3_geo_pathArea = {
          point: d3_noop,
          lineStart: d3_noop,
          lineEnd: d3_noop,
          polygonStart: function() {
            d3_geo_pathAreaPolygon = 0;
            d3_geo_pathArea.lineStart = d3_geo_pathAreaRingStart;
          },
          polygonEnd: function() {
            d3_geo_pathArea.lineStart = d3_geo_pathArea.lineEnd = d3_geo_pathArea.point = d3_noop;
            d3_geo_pathAreaSum += abs(d3_geo_pathAreaPolygon / 2);
          }
        };
        function d3_geo_pathAreaRingStart() {
          var x00, y00, x0, y0;
          d3_geo_pathArea.point = function(x, y) {
            d3_geo_pathArea.point = nextPoint;
            x00 = x0 = x, y00 = y0 = y;
          };
          function nextPoint(x, y) {
            d3_geo_pathAreaPolygon += y0 * x - x0 * y;
            x0 = x, y0 = y;
          }
          d3_geo_pathArea.lineEnd = function() {
            nextPoint(x00, y00);
          };
        }
        var d3_geo_pathBoundsX0, d3_geo_pathBoundsY0, d3_geo_pathBoundsX1, d3_geo_pathBoundsY1;
        var d3_geo_pathBounds = {
          point: d3_geo_pathBoundsPoint,
          lineStart: d3_noop,
          lineEnd: d3_noop,
          polygonStart: d3_noop,
          polygonEnd: d3_noop
        };
        function d3_geo_pathBoundsPoint(x, y) {
          if (x < d3_geo_pathBoundsX0) d3_geo_pathBoundsX0 = x;
          if (x > d3_geo_pathBoundsX1) d3_geo_pathBoundsX1 = x;
          if (y < d3_geo_pathBoundsY0) d3_geo_pathBoundsY0 = y;
          if (y > d3_geo_pathBoundsY1) d3_geo_pathBoundsY1 = y;
        }
        function d3_geo_pathBuffer() {
          var pointCircle = d3_geo_pathBufferCircle(4.5), buffer = [];
          var stream = {
            point,
            lineStart: function() {
              stream.point = pointLineStart;
            },
            lineEnd,
            polygonStart: function() {
              stream.lineEnd = lineEndPolygon;
            },
            polygonEnd: function() {
              stream.lineEnd = lineEnd;
              stream.point = point;
            },
            pointRadius: function(_) {
              pointCircle = d3_geo_pathBufferCircle(_);
              return stream;
            },
            result: function() {
              if (buffer.length) {
                var result = buffer.join("");
                buffer = [];
                return result;
              }
            }
          };
          function point(x, y) {
            buffer.push("M", x, ",", y, pointCircle);
          }
          function pointLineStart(x, y) {
            buffer.push("M", x, ",", y);
            stream.point = pointLine;
          }
          function pointLine(x, y) {
            buffer.push("L", x, ",", y);
          }
          function lineEnd() {
            stream.point = point;
          }
          function lineEndPolygon() {
            buffer.push("Z");
          }
          return stream;
        }
        function d3_geo_pathBufferCircle(radius) {
          return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z";
        }
        var d3_geo_pathCentroid = {
          point: d3_geo_pathCentroidPoint,
          lineStart: d3_geo_pathCentroidLineStart,
          lineEnd: d3_geo_pathCentroidLineEnd,
          polygonStart: function() {
            d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidRingStart;
          },
          polygonEnd: function() {
            d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
            d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidLineStart;
            d3_geo_pathCentroid.lineEnd = d3_geo_pathCentroidLineEnd;
          }
        };
        function d3_geo_pathCentroidPoint(x, y) {
          d3_geo_centroidX0 += x;
          d3_geo_centroidY0 += y;
          ++d3_geo_centroidZ0;
        }
        function d3_geo_pathCentroidLineStart() {
          var x0, y0;
          d3_geo_pathCentroid.point = function(x, y) {
            d3_geo_pathCentroid.point = nextPoint;
            d3_geo_pathCentroidPoint(x0 = x, y0 = y);
          };
          function nextPoint(x, y) {
            var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
            d3_geo_centroidX1 += z * (x0 + x) / 2;
            d3_geo_centroidY1 += z * (y0 + y) / 2;
            d3_geo_centroidZ1 += z;
            d3_geo_pathCentroidPoint(x0 = x, y0 = y);
          }
        }
        function d3_geo_pathCentroidLineEnd() {
          d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
        }
        function d3_geo_pathCentroidRingStart() {
          var x00, y00, x0, y0;
          d3_geo_pathCentroid.point = function(x, y) {
            d3_geo_pathCentroid.point = nextPoint;
            d3_geo_pathCentroidPoint(x00 = x0 = x, y00 = y0 = y);
          };
          function nextPoint(x, y) {
            var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
            d3_geo_centroidX1 += z * (x0 + x) / 2;
            d3_geo_centroidY1 += z * (y0 + y) / 2;
            d3_geo_centroidZ1 += z;
            z = y0 * x - x0 * y;
            d3_geo_centroidX2 += z * (x0 + x);
            d3_geo_centroidY2 += z * (y0 + y);
            d3_geo_centroidZ2 += z * 3;
            d3_geo_pathCentroidPoint(x0 = x, y0 = y);
          }
          d3_geo_pathCentroid.lineEnd = function() {
            nextPoint(x00, y00);
          };
        }
        function d3_geo_pathContext(context) {
          var pointRadius = 4.5;
          var stream = {
            point,
            lineStart: function() {
              stream.point = pointLineStart;
            },
            lineEnd,
            polygonStart: function() {
              stream.lineEnd = lineEndPolygon;
            },
            polygonEnd: function() {
              stream.lineEnd = lineEnd;
              stream.point = point;
            },
            pointRadius: function(_) {
              pointRadius = _;
              return stream;
            },
            result: d3_noop
          };
          function point(x, y) {
            context.moveTo(x + pointRadius, y);
            context.arc(x, y, pointRadius, 0, \u03C4);
          }
          function pointLineStart(x, y) {
            context.moveTo(x, y);
            stream.point = pointLine;
          }
          function pointLine(x, y) {
            context.lineTo(x, y);
          }
          function lineEnd() {
            stream.point = point;
          }
          function lineEndPolygon() {
            context.closePath();
          }
          return stream;
        }
        function d3_geo_resample(project) {
          var \u03B42 = 0.5, cosMinDistance = Math.cos(30 * d3_radians), maxDepth = 16;
          function resample(stream) {
            return (maxDepth ? resampleRecursive : resampleNone)(stream);
          }
          function resampleNone(stream) {
            return d3_geo_transformPoint(stream, function(x, y) {
              x = project(x, y);
              stream.point(x[0], x[1]);
            });
          }
          function resampleRecursive(stream) {
            var \u03BB00, \u03C600, x00, y00, a00, b00, c00, \u03BB0, x0, y0, a0, b0, c0;
            var resample2 = {
              point,
              lineStart,
              lineEnd,
              polygonStart: function() {
                stream.polygonStart();
                resample2.lineStart = ringStart;
              },
              polygonEnd: function() {
                stream.polygonEnd();
                resample2.lineStart = lineStart;
              }
            };
            function point(x, y) {
              x = project(x, y);
              stream.point(x[0], x[1]);
            }
            function lineStart() {
              x0 = NaN;
              resample2.point = linePoint;
              stream.lineStart();
            }
            function linePoint(\u03BB, \u03C6) {
              var c = d3_geo_cartesian([\u03BB, \u03C6]), p = project(\u03BB, \u03C6);
              resampleLineTo(x0, y0, \u03BB0, a0, b0, c0, x0 = p[0], y0 = p[1], \u03BB0 = \u03BB, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
              stream.point(x0, y0);
            }
            function lineEnd() {
              resample2.point = point;
              stream.lineEnd();
            }
            function ringStart() {
              lineStart();
              resample2.point = ringPoint;
              resample2.lineEnd = ringEnd;
            }
            function ringPoint(\u03BB, \u03C6) {
              linePoint(\u03BB00 = \u03BB, \u03C600 = \u03C6), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
              resample2.point = linePoint;
            }
            function ringEnd() {
              resampleLineTo(x0, y0, \u03BB0, a0, b0, c0, x00, y00, \u03BB00, a00, b00, c00, maxDepth, stream);
              resample2.lineEnd = lineEnd;
              lineEnd();
            }
            return resample2;
          }
          function resampleLineTo(x0, y0, \u03BB0, a0, b0, c0, x1, y1, \u03BB1, a1, b1, c1, depth, stream) {
            var dx = x1 - x0, dy = y1 - y0, d2 = dx * dx + dy * dy;
            if (d2 > 4 * \u03B42 && depth--) {
              var a = a0 + a1, b = b0 + b1, c = c0 + c1, m = Math.sqrt(a * a + b * b + c * c), \u03C62 = Math.asin(c /= m), \u03BB2 = abs(abs(c) - 1) < \u03B5 || abs(\u03BB0 - \u03BB1) < \u03B5 ? (\u03BB0 + \u03BB1) / 2 : Math.atan2(b, a), p = project(\u03BB2, \u03C62), x2 = p[0], y2 = p[1], dx2 = x2 - x0, dy2 = y2 - y0, dz = dy * dx2 - dx * dy2;
              if (dz * dz / d2 > \u03B42 || abs((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
                resampleLineTo(x0, y0, \u03BB0, a0, b0, c0, x2, y2, \u03BB2, a /= m, b /= m, c, depth, stream);
                stream.point(x2, y2);
                resampleLineTo(x2, y2, \u03BB2, a, b, c, x1, y1, \u03BB1, a1, b1, c1, depth, stream);
              }
            }
          }
          resample.precision = function(_) {
            if (!arguments.length) return Math.sqrt(\u03B42);
            maxDepth = (\u03B42 = _ * _) > 0 && 16;
            return resample;
          };
          return resample;
        }
        d32.geo.path = function() {
          var pointRadius = 4.5, projection, context, projectStream, contextStream, cacheStream;
          function path(object) {
            if (object) {
              if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
              if (!cacheStream || !cacheStream.valid) cacheStream = projectStream(contextStream);
              d32.geo.stream(object, cacheStream);
            }
            return contextStream.result();
          }
          path.area = function(object) {
            d3_geo_pathAreaSum = 0;
            d32.geo.stream(object, projectStream(d3_geo_pathArea));
            return d3_geo_pathAreaSum;
          };
          path.centroid = function(object) {
            d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
            d32.geo.stream(object, projectStream(d3_geo_pathCentroid));
            return d3_geo_centroidZ2 ? [d3_geo_centroidX2 / d3_geo_centroidZ2, d3_geo_centroidY2 / d3_geo_centroidZ2] : d3_geo_centroidZ1 ? [d3_geo_centroidX1 / d3_geo_centroidZ1, d3_geo_centroidY1 / d3_geo_centroidZ1] : d3_geo_centroidZ0 ? [d3_geo_centroidX0 / d3_geo_centroidZ0, d3_geo_centroidY0 / d3_geo_centroidZ0] : [NaN, NaN];
          };
          path.bounds = function(object) {
            d3_geo_pathBoundsX1 = d3_geo_pathBoundsY1 = -(d3_geo_pathBoundsX0 = d3_geo_pathBoundsY0 = Infinity);
            d32.geo.stream(object, projectStream(d3_geo_pathBounds));
            return [[d3_geo_pathBoundsX0, d3_geo_pathBoundsY0], [d3_geo_pathBoundsX1, d3_geo_pathBoundsY1]];
          };
          path.projection = function(_) {
            if (!arguments.length) return projection;
            projectStream = (projection = _) ? _.stream || d3_geo_pathProjectStream(_) : d3_identity;
            return reset();
          };
          path.context = function(_) {
            if (!arguments.length) return context;
            contextStream = (context = _) == null ? new d3_geo_pathBuffer() : new d3_geo_pathContext(_);
            if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
            return reset();
          };
          path.pointRadius = function(_) {
            if (!arguments.length) return pointRadius;
            pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
            return path;
          };
          function reset() {
            cacheStream = null;
            return path;
          }
          return path.projection(d32.geo.albersUsa()).context(null);
        };
        function d3_geo_pathProjectStream(project) {
          var resample = d3_geo_resample(function(x, y) {
            return project([x * d3_degrees, y * d3_degrees]);
          });
          return function(stream) {
            return d3_geo_projectionRadians(resample(stream));
          };
        }
        d32.geo.transform = function(methods) {
          return {
            stream: function(stream) {
              var transform = new d3_geo_transform(stream);
              for (var k in methods) transform[k] = methods[k];
              return transform;
            }
          };
        };
        function d3_geo_transform(stream) {
          this.stream = stream;
        }
        d3_geo_transform.prototype = {
          point: function(x, y) {
            this.stream.point(x, y);
          },
          sphere: function() {
            this.stream.sphere();
          },
          lineStart: function() {
            this.stream.lineStart();
          },
          lineEnd: function() {
            this.stream.lineEnd();
          },
          polygonStart: function() {
            this.stream.polygonStart();
          },
          polygonEnd: function() {
            this.stream.polygonEnd();
          }
        };
        function d3_geo_transformPoint(stream, point) {
          return {
            point,
            sphere: function() {
              stream.sphere();
            },
            lineStart: function() {
              stream.lineStart();
            },
            lineEnd: function() {
              stream.lineEnd();
            },
            polygonStart: function() {
              stream.polygonStart();
            },
            polygonEnd: function() {
              stream.polygonEnd();
            }
          };
        }
        d32.geo.projection = d3_geo_projection;
        d32.geo.projectionMutator = d3_geo_projectionMutator;
        function d3_geo_projection(project) {
          return d3_geo_projectionMutator(function() {
            return project;
          })();
        }
        function d3_geo_projectionMutator(projectAt) {
          var project, rotate, projectRotate, projectResample = d3_geo_resample(function(x2, y2) {
            x2 = project(x2, y2);
            return [x2[0] * k + \u03B4x, \u03B4y - x2[1] * k];
          }), k = 150, x = 480, y = 250, \u03BB = 0, \u03C6 = 0, \u03B4\u03BB = 0, \u03B4\u03C6 = 0, \u03B4\u03B3 = 0, \u03B4x, \u03B4y, preclip = d3_geo_clipAntimeridian, postclip = d3_identity, clipAngle = null, clipExtent = null, stream;
          function projection(point) {
            point = projectRotate(point[0] * d3_radians, point[1] * d3_radians);
            return [point[0] * k + \u03B4x, \u03B4y - point[1] * k];
          }
          function invert(point) {
            point = projectRotate.invert((point[0] - \u03B4x) / k, (\u03B4y - point[1]) / k);
            return point && [point[0] * d3_degrees, point[1] * d3_degrees];
          }
          projection.stream = function(output) {
            if (stream) stream.valid = false;
            stream = d3_geo_projectionRadians(preclip(rotate, projectResample(postclip(output))));
            stream.valid = true;
            return stream;
          };
          projection.clipAngle = function(_) {
            if (!arguments.length) return clipAngle;
            preclip = _ == null ? (clipAngle = _, d3_geo_clipAntimeridian) : d3_geo_clipCircle((clipAngle = +_) * d3_radians);
            return invalidate();
          };
          projection.clipExtent = function(_) {
            if (!arguments.length) return clipExtent;
            clipExtent = _;
            postclip = _ ? d3_geo_clipExtent(_[0][0], _[0][1], _[1][0], _[1][1]) : d3_identity;
            return invalidate();
          };
          projection.scale = function(_) {
            if (!arguments.length) return k;
            k = +_;
            return reset();
          };
          projection.translate = function(_) {
            if (!arguments.length) return [x, y];
            x = +_[0];
            y = +_[1];
            return reset();
          };
          projection.center = function(_) {
            if (!arguments.length) return [\u03BB * d3_degrees, \u03C6 * d3_degrees];
            \u03BB = _[0] % 360 * d3_radians;
            \u03C6 = _[1] % 360 * d3_radians;
            return reset();
          };
          projection.rotate = function(_) {
            if (!arguments.length) return [\u03B4\u03BB * d3_degrees, \u03B4\u03C6 * d3_degrees, \u03B4\u03B3 * d3_degrees];
            \u03B4\u03BB = _[0] % 360 * d3_radians;
            \u03B4\u03C6 = _[1] % 360 * d3_radians;
            \u03B4\u03B3 = _.length > 2 ? _[2] % 360 * d3_radians : 0;
            return reset();
          };
          d32.rebind(projection, projectResample, "precision");
          function reset() {
            projectRotate = d3_geo_compose(rotate = d3_geo_rotation(\u03B4\u03BB, \u03B4\u03C6, \u03B4\u03B3), project);
            var center = project(\u03BB, \u03C6);
            \u03B4x = x - center[0] * k;
            \u03B4y = y + center[1] * k;
            return invalidate();
          }
          function invalidate() {
            if (stream) stream.valid = false, stream = null;
            return projection;
          }
          return function() {
            project = projectAt.apply(this, arguments);
            projection.invert = project.invert && invert;
            return reset();
          };
        }
        function d3_geo_projectionRadians(stream) {
          return d3_geo_transformPoint(stream, function(x, y) {
            stream.point(x * d3_radians, y * d3_radians);
          });
        }
        function d3_geo_equirectangular(\u03BB, \u03C6) {
          return [\u03BB, \u03C6];
        }
        (d32.geo.equirectangular = function() {
          return d3_geo_projection(d3_geo_equirectangular);
        }).raw = d3_geo_equirectangular.invert = d3_geo_equirectangular;
        d32.geo.rotation = function(rotate) {
          rotate = d3_geo_rotation(rotate[0] % 360 * d3_radians, rotate[1] * d3_radians, rotate.length > 2 ? rotate[2] * d3_radians : 0);
          function forward(coordinates) {
            coordinates = rotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
            return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
          }
          forward.invert = function(coordinates) {
            coordinates = rotate.invert(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
            return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
          };
          return forward;
        };
        function d3_geo_identityRotation(\u03BB, \u03C6) {
          return [\u03BB > \u03C0 ? \u03BB - \u03C4 : \u03BB < -\u03C0 ? \u03BB + \u03C4 : \u03BB, \u03C6];
        }
        d3_geo_identityRotation.invert = d3_geo_equirectangular;
        function d3_geo_rotation(\u03B4\u03BB, \u03B4\u03C6, \u03B4\u03B3) {
          return \u03B4\u03BB ? \u03B4\u03C6 || \u03B4\u03B3 ? d3_geo_compose(d3_geo_rotation\u03BB(\u03B4\u03BB), d3_geo_rotation\u03C6\u03B3(\u03B4\u03C6, \u03B4\u03B3)) : d3_geo_rotation\u03BB(\u03B4\u03BB) : \u03B4\u03C6 || \u03B4\u03B3 ? d3_geo_rotation\u03C6\u03B3(\u03B4\u03C6, \u03B4\u03B3) : d3_geo_identityRotation;
        }
        function d3_geo_forwardRotation\u03BB(\u03B4\u03BB) {
          return function(\u03BB, \u03C6) {
            return \u03BB += \u03B4\u03BB, [\u03BB > \u03C0 ? \u03BB - \u03C4 : \u03BB < -\u03C0 ? \u03BB + \u03C4 : \u03BB, \u03C6];
          };
        }
        function d3_geo_rotation\u03BB(\u03B4\u03BB) {
          var rotation = d3_geo_forwardRotation\u03BB(\u03B4\u03BB);
          rotation.invert = d3_geo_forwardRotation\u03BB(-\u03B4\u03BB);
          return rotation;
        }
        function d3_geo_rotation\u03C6\u03B3(\u03B4\u03C6, \u03B4\u03B3) {
          var cos\u03B4\u03C6 = Math.cos(\u03B4\u03C6), sin\u03B4\u03C6 = Math.sin(\u03B4\u03C6), cos\u03B4\u03B3 = Math.cos(\u03B4\u03B3), sin\u03B4\u03B3 = Math.sin(\u03B4\u03B3);
          function rotation(\u03BB, \u03C6) {
            var cos\u03C6 = Math.cos(\u03C6), x = Math.cos(\u03BB) * cos\u03C6, y = Math.sin(\u03BB) * cos\u03C6, z = Math.sin(\u03C6), k = z * cos\u03B4\u03C6 + x * sin\u03B4\u03C6;
            return [Math.atan2(y * cos\u03B4\u03B3 - k * sin\u03B4\u03B3, x * cos\u03B4\u03C6 - z * sin\u03B4\u03C6), d3_asin(k * cos\u03B4\u03B3 + y * sin\u03B4\u03B3)];
          }
          rotation.invert = function(\u03BB, \u03C6) {
            var cos\u03C6 = Math.cos(\u03C6), x = Math.cos(\u03BB) * cos\u03C6, y = Math.sin(\u03BB) * cos\u03C6, z = Math.sin(\u03C6), k = z * cos\u03B4\u03B3 - y * sin\u03B4\u03B3;
            return [Math.atan2(y * cos\u03B4\u03B3 + z * sin\u03B4\u03B3, x * cos\u03B4\u03C6 + k * sin\u03B4\u03C6), d3_asin(k * cos\u03B4\u03C6 - x * sin\u03B4\u03C6)];
          };
          return rotation;
        }
        d32.geo.circle = function() {
          var origin = [0, 0], angle, precision = 6, interpolate;
          function circle() {
            var center = typeof origin === "function" ? origin.apply(this, arguments) : origin, rotate = d3_geo_rotation(-center[0] * d3_radians, -center[1] * d3_radians, 0).invert, ring = [];
            interpolate(null, null, 1, {
              point: function(x, y) {
                ring.push(x = rotate(x, y));
                x[0] *= d3_degrees, x[1] *= d3_degrees;
              }
            });
            return {
              type: "Polygon",
              coordinates: [ring]
            };
          }
          circle.origin = function(x) {
            if (!arguments.length) return origin;
            origin = x;
            return circle;
          };
          circle.angle = function(x) {
            if (!arguments.length) return angle;
            interpolate = d3_geo_circleInterpolate((angle = +x) * d3_radians, precision * d3_radians);
            return circle;
          };
          circle.precision = function(_) {
            if (!arguments.length) return precision;
            interpolate = d3_geo_circleInterpolate(angle * d3_radians, (precision = +_) * d3_radians);
            return circle;
          };
          return circle.angle(90);
        };
        function d3_geo_circleInterpolate(radius, precision) {
          var cr = Math.cos(radius), sr = Math.sin(radius);
          return function(from, to, direction, listener) {
            var step = direction * precision;
            if (from != null) {
              from = d3_geo_circleAngle(cr, from);
              to = d3_geo_circleAngle(cr, to);
              if (direction > 0 ? from < to : from > to) from += direction * \u03C4;
            } else {
              from = radius + direction * \u03C4;
              to = radius - 0.5 * step;
            }
            for (var point, t = from; direction > 0 ? t > to : t < to; t -= step) {
              listener.point((point = d3_geo_spherical([cr, -sr * Math.cos(t), -sr * Math.sin(t)]))[0], point[1]);
            }
          };
        }
        function d3_geo_circleAngle(cr, point) {
          var a = d3_geo_cartesian(point);
          a[0] -= cr;
          d3_geo_cartesianNormalize(a);
          var angle = d3_acos(-a[1]);
          return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI - \u03B5) % (2 * Math.PI);
        }
        d32.geo.distance = function(a, b) {
          var \u0394\u03BB = (b[0] - a[0]) * d3_radians, \u03C60 = a[1] * d3_radians, \u03C61 = b[1] * d3_radians, sin\u0394\u03BB = Math.sin(\u0394\u03BB), cos\u0394\u03BB = Math.cos(\u0394\u03BB), sin\u03C60 = Math.sin(\u03C60), cos\u03C60 = Math.cos(\u03C60), sin\u03C61 = Math.sin(\u03C61), cos\u03C61 = Math.cos(\u03C61), t;
          return Math.atan2(Math.sqrt((t = cos\u03C61 * sin\u0394\u03BB) * t + (t = cos\u03C60 * sin\u03C61 - sin\u03C60 * cos\u03C61 * cos\u0394\u03BB) * t), sin\u03C60 * sin\u03C61 + cos\u03C60 * cos\u03C61 * cos\u0394\u03BB);
        };
        d32.geo.graticule = function() {
          var x1, x0, X1, X0, y1, y0, Y1, Y0, dx = 10, dy = dx, DX = 90, DY = 360, x, y, X, Y, precision = 2.5;
          function graticule() {
            return {
              type: "MultiLineString",
              coordinates: lines()
            };
          }
          function lines() {
            return d32.range(Math.ceil(X0 / DX) * DX, X1, DX).map(X).concat(d32.range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y)).concat(d32.range(Math.ceil(x0 / dx) * dx, x1, dx).filter(function(x2) {
              return abs(x2 % DX) > \u03B5;
            }).map(x)).concat(d32.range(Math.ceil(y0 / dy) * dy, y1, dy).filter(function(y2) {
              return abs(y2 % DY) > \u03B5;
            }).map(y));
          }
          graticule.lines = function() {
            return lines().map(function(coordinates) {
              return {
                type: "LineString",
                coordinates
              };
            });
          };
          graticule.outline = function() {
            return {
              type: "Polygon",
              coordinates: [X(X0).concat(Y(Y1).slice(1), X(X1).reverse().slice(1), Y(Y0).reverse().slice(1))]
            };
          };
          graticule.extent = function(_) {
            if (!arguments.length) return graticule.minorExtent();
            return graticule.majorExtent(_).minorExtent(_);
          };
          graticule.majorExtent = function(_) {
            if (!arguments.length) return [[X0, Y0], [X1, Y1]];
            X0 = +_[0][0], X1 = +_[1][0];
            Y0 = +_[0][1], Y1 = +_[1][1];
            if (X0 > X1) _ = X0, X0 = X1, X1 = _;
            if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
            return graticule.precision(precision);
          };
          graticule.minorExtent = function(_) {
            if (!arguments.length) return [[x0, y0], [x1, y1]];
            x0 = +_[0][0], x1 = +_[1][0];
            y0 = +_[0][1], y1 = +_[1][1];
            if (x0 > x1) _ = x0, x0 = x1, x1 = _;
            if (y0 > y1) _ = y0, y0 = y1, y1 = _;
            return graticule.precision(precision);
          };
          graticule.step = function(_) {
            if (!arguments.length) return graticule.minorStep();
            return graticule.majorStep(_).minorStep(_);
          };
          graticule.majorStep = function(_) {
            if (!arguments.length) return [DX, DY];
            DX = +_[0], DY = +_[1];
            return graticule;
          };
          graticule.minorStep = function(_) {
            if (!arguments.length) return [dx, dy];
            dx = +_[0], dy = +_[1];
            return graticule;
          };
          graticule.precision = function(_) {
            if (!arguments.length) return precision;
            precision = +_;
            x = d3_geo_graticuleX(y0, y1, 90);
            y = d3_geo_graticuleY(x0, x1, precision);
            X = d3_geo_graticuleX(Y0, Y1, 90);
            Y = d3_geo_graticuleY(X0, X1, precision);
            return graticule;
          };
          return graticule.majorExtent([[-180, -90 + \u03B5], [180, 90 - \u03B5]]).minorExtent([[-180, -80 - \u03B5], [180, 80 + \u03B5]]);
        };
        function d3_geo_graticuleX(y0, y1, dy) {
          var y = d32.range(y0, y1 - \u03B5, dy).concat(y1);
          return function(x) {
            return y.map(function(y2) {
              return [x, y2];
            });
          };
        }
        function d3_geo_graticuleY(x0, x1, dx) {
          var x = d32.range(x0, x1 - \u03B5, dx).concat(x1);
          return function(y) {
            return x.map(function(x2) {
              return [x2, y];
            });
          };
        }
        function d3_source(d) {
          return d.source;
        }
        function d3_target(d) {
          return d.target;
        }
        d32.geo.greatArc = function() {
          var source = d3_source, source_, target = d3_target, target_;
          function greatArc() {
            return {
              type: "LineString",
              coordinates: [source_ || source.apply(this, arguments), target_ || target.apply(this, arguments)]
            };
          }
          greatArc.distance = function() {
            return d32.geo.distance(source_ || source.apply(this, arguments), target_ || target.apply(this, arguments));
          };
          greatArc.source = function(_) {
            if (!arguments.length) return source;
            source = _, source_ = typeof _ === "function" ? null : _;
            return greatArc;
          };
          greatArc.target = function(_) {
            if (!arguments.length) return target;
            target = _, target_ = typeof _ === "function" ? null : _;
            return greatArc;
          };
          greatArc.precision = function() {
            return arguments.length ? greatArc : 0;
          };
          return greatArc;
        };
        d32.geo.interpolate = function(source, target) {
          return d3_geo_interpolate(source[0] * d3_radians, source[1] * d3_radians, target[0] * d3_radians, target[1] * d3_radians);
        };
        function d3_geo_interpolate(x0, y0, x1, y1) {
          var cy0 = Math.cos(y0), sy0 = Math.sin(y0), cy1 = Math.cos(y1), sy1 = Math.sin(y1), kx0 = cy0 * Math.cos(x0), ky0 = cy0 * Math.sin(x0), kx1 = cy1 * Math.cos(x1), ky1 = cy1 * Math.sin(x1), d = 2 * Math.asin(Math.sqrt(d3_haversin(y1 - y0) + cy0 * cy1 * d3_haversin(x1 - x0))), k = 1 / Math.sin(d);
          var interpolate = d ? function(t) {
            var B = Math.sin(t *= d) * k, A = Math.sin(d - t) * k, x = A * kx0 + B * kx1, y = A * ky0 + B * ky1, z = A * sy0 + B * sy1;
            return [Math.atan2(y, x) * d3_degrees, Math.atan2(z, Math.sqrt(x * x + y * y)) * d3_degrees];
          } : function() {
            return [x0 * d3_degrees, y0 * d3_degrees];
          };
          interpolate.distance = d;
          return interpolate;
        }
        d32.geo.length = function(object) {
          d3_geo_lengthSum = 0;
          d32.geo.stream(object, d3_geo_length);
          return d3_geo_lengthSum;
        };
        var d3_geo_lengthSum;
        var d3_geo_length = {
          sphere: d3_noop,
          point: d3_noop,
          lineStart: d3_geo_lengthLineStart,
          lineEnd: d3_noop,
          polygonStart: d3_noop,
          polygonEnd: d3_noop
        };
        function d3_geo_lengthLineStart() {
          var \u03BB0, sin\u03C60, cos\u03C60;
          d3_geo_length.point = function(\u03BB, \u03C6) {
            \u03BB0 = \u03BB * d3_radians, sin\u03C60 = Math.sin(\u03C6 *= d3_radians), cos\u03C60 = Math.cos(\u03C6);
            d3_geo_length.point = nextPoint;
          };
          d3_geo_length.lineEnd = function() {
            d3_geo_length.point = d3_geo_length.lineEnd = d3_noop;
          };
          function nextPoint(\u03BB, \u03C6) {
            var sin\u03C6 = Math.sin(\u03C6 *= d3_radians), cos\u03C6 = Math.cos(\u03C6), t = abs((\u03BB *= d3_radians) - \u03BB0), cos\u0394\u03BB = Math.cos(t);
            d3_geo_lengthSum += Math.atan2(Math.sqrt((t = cos\u03C6 * Math.sin(t)) * t + (t = cos\u03C60 * sin\u03C6 - sin\u03C60 * cos\u03C6 * cos\u0394\u03BB) * t), sin\u03C60 * sin\u03C6 + cos\u03C60 * cos\u03C6 * cos\u0394\u03BB);
            \u03BB0 = \u03BB, sin\u03C60 = sin\u03C6, cos\u03C60 = cos\u03C6;
          }
        }
        function d3_geo_azimuthal(scale, angle) {
          function azimuthal(\u03BB, \u03C6) {
            var cos\u03BB = Math.cos(\u03BB), cos\u03C6 = Math.cos(\u03C6), k = scale(cos\u03BB * cos\u03C6);
            return [k * cos\u03C6 * Math.sin(\u03BB), k * Math.sin(\u03C6)];
          }
          azimuthal.invert = function(x, y) {
            var \u03C13 = Math.sqrt(x * x + y * y), c = angle(\u03C13), sinc = Math.sin(c), cosc = Math.cos(c);
            return [Math.atan2(x * sinc, \u03C13 * cosc), Math.asin(\u03C13 && y * sinc / \u03C13)];
          };
          return azimuthal;
        }
        var d3_geo_azimuthalEqualArea = d3_geo_azimuthal(function(cos\u03BBcos\u03C6) {
          return Math.sqrt(2 / (1 + cos\u03BBcos\u03C6));
        }, function(\u03C13) {
          return 2 * Math.asin(\u03C13 / 2);
        });
        (d32.geo.azimuthalEqualArea = function() {
          return d3_geo_projection(d3_geo_azimuthalEqualArea);
        }).raw = d3_geo_azimuthalEqualArea;
        var d3_geo_azimuthalEquidistant = d3_geo_azimuthal(function(cos\u03BBcos\u03C6) {
          var c = Math.acos(cos\u03BBcos\u03C6);
          return c && c / Math.sin(c);
        }, d3_identity);
        (d32.geo.azimuthalEquidistant = function() {
          return d3_geo_projection(d3_geo_azimuthalEquidistant);
        }).raw = d3_geo_azimuthalEquidistant;
        function d3_geo_conicConformal(\u03C60, \u03C61) {
          var cos\u03C60 = Math.cos(\u03C60), t = function(\u03C6) {
            return Math.tan(\u03C0 / 4 + \u03C6 / 2);
          }, n = \u03C60 === \u03C61 ? Math.sin(\u03C60) : Math.log(cos\u03C60 / Math.cos(\u03C61)) / Math.log(t(\u03C61) / t(\u03C60)), F = cos\u03C60 * Math.pow(t(\u03C60), n) / n;
          if (!n) return d3_geo_mercator;
          function forward(\u03BB, \u03C6) {
            if (F > 0) {
              if (\u03C6 < -half\u03C0 + \u03B5) \u03C6 = -half\u03C0 + \u03B5;
            } else {
              if (\u03C6 > half\u03C0 - \u03B5) \u03C6 = half\u03C0 - \u03B5;
            }
            var \u03C13 = F / Math.pow(t(\u03C6), n);
            return [\u03C13 * Math.sin(n * \u03BB), F - \u03C13 * Math.cos(n * \u03BB)];
          }
          forward.invert = function(x, y) {
            var \u03C10_y = F - y, \u03C13 = d3_sgn(n) * Math.sqrt(x * x + \u03C10_y * \u03C10_y);
            return [Math.atan2(x, \u03C10_y) / n, 2 * Math.atan(Math.pow(F / \u03C13, 1 / n)) - half\u03C0];
          };
          return forward;
        }
        (d32.geo.conicConformal = function() {
          return d3_geo_conic(d3_geo_conicConformal);
        }).raw = d3_geo_conicConformal;
        function d3_geo_conicEquidistant(\u03C60, \u03C61) {
          var cos\u03C60 = Math.cos(\u03C60), n = \u03C60 === \u03C61 ? Math.sin(\u03C60) : (cos\u03C60 - Math.cos(\u03C61)) / (\u03C61 - \u03C60), G = cos\u03C60 / n + \u03C60;
          if (abs(n) < \u03B5) return d3_geo_equirectangular;
          function forward(\u03BB, \u03C6) {
            var \u03C13 = G - \u03C6;
            return [\u03C13 * Math.sin(n * \u03BB), G - \u03C13 * Math.cos(n * \u03BB)];
          }
          forward.invert = function(x, y) {
            var \u03C10_y = G - y;
            return [Math.atan2(x, \u03C10_y) / n, G - d3_sgn(n) * Math.sqrt(x * x + \u03C10_y * \u03C10_y)];
          };
          return forward;
        }
        (d32.geo.conicEquidistant = function() {
          return d3_geo_conic(d3_geo_conicEquidistant);
        }).raw = d3_geo_conicEquidistant;
        var d3_geo_gnomonic = d3_geo_azimuthal(function(cos\u03BBcos\u03C6) {
          return 1 / cos\u03BBcos\u03C6;
        }, Math.atan);
        (d32.geo.gnomonic = function() {
          return d3_geo_projection(d3_geo_gnomonic);
        }).raw = d3_geo_gnomonic;
        function d3_geo_mercator(\u03BB, \u03C6) {
          return [\u03BB, Math.log(Math.tan(\u03C0 / 4 + \u03C6 / 2))];
        }
        d3_geo_mercator.invert = function(x, y) {
          return [x, 2 * Math.atan(Math.exp(y)) - half\u03C0];
        };
        function d3_geo_mercatorProjection(project) {
          var m = d3_geo_projection(project), scale = m.scale, translate = m.translate, clipExtent = m.clipExtent, clipAuto;
          m.scale = function() {
            var v = scale.apply(m, arguments);
            return v === m ? clipAuto ? m.clipExtent(null) : m : v;
          };
          m.translate = function() {
            var v = translate.apply(m, arguments);
            return v === m ? clipAuto ? m.clipExtent(null) : m : v;
          };
          m.clipExtent = function(_) {
            var v = clipExtent.apply(m, arguments);
            if (v === m) {
              if (clipAuto = _ == null) {
                var k = \u03C0 * scale(), t = translate();
                clipExtent([[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]]);
              }
            } else if (clipAuto) {
              v = null;
            }
            return v;
          };
          return m.clipExtent(null);
        }
        (d32.geo.mercator = function() {
          return d3_geo_mercatorProjection(d3_geo_mercator);
        }).raw = d3_geo_mercator;
        var d3_geo_orthographic = d3_geo_azimuthal(function() {
          return 1;
        }, Math.asin);
        (d32.geo.orthographic = function() {
          return d3_geo_projection(d3_geo_orthographic);
        }).raw = d3_geo_orthographic;
        var d3_geo_stereographic = d3_geo_azimuthal(function(cos\u03BBcos\u03C6) {
          return 1 / (1 + cos\u03BBcos\u03C6);
        }, function(\u03C13) {
          return 2 * Math.atan(\u03C13);
        });
        (d32.geo.stereographic = function() {
          return d3_geo_projection(d3_geo_stereographic);
        }).raw = d3_geo_stereographic;
        function d3_geo_transverseMercator(\u03BB, \u03C6) {
          return [Math.log(Math.tan(\u03C0 / 4 + \u03C6 / 2)), -\u03BB];
        }
        d3_geo_transverseMercator.invert = function(x, y) {
          return [-y, 2 * Math.atan(Math.exp(x)) - half\u03C0];
        };
        (d32.geo.transverseMercator = function() {
          var projection = d3_geo_mercatorProjection(d3_geo_transverseMercator), center = projection.center, rotate = projection.rotate;
          projection.center = function(_) {
            return _ ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
          };
          projection.rotate = function(_) {
            return _ ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
          };
          return rotate([0, 0, 90]);
        }).raw = d3_geo_transverseMercator;
        d32.geom = {};
        function d3_geom_pointX(d) {
          return d[0];
        }
        function d3_geom_pointY(d) {
          return d[1];
        }
        d32.geom.hull = function(vertices) {
          var x = d3_geom_pointX, y = d3_geom_pointY;
          if (arguments.length) return hull(vertices);
          function hull(data) {
            if (data.length < 3) return [];
            var fx = d3_functor(x), fy = d3_functor(y), i, n = data.length, points = [], flippedPoints = [];
            for (i = 0; i < n; i++) {
              points.push([+fx.call(this, data[i], i), +fy.call(this, data[i], i), i]);
            }
            points.sort(d3_geom_hullOrder);
            for (i = 0; i < n; i++) flippedPoints.push([points[i][0], -points[i][1]]);
            var upper = d3_geom_hullUpper(points), lower = d3_geom_hullUpper(flippedPoints);
            var skipLeft = lower[0] === upper[0], skipRight = lower[lower.length - 1] === upper[upper.length - 1], polygon = [];
            for (i = upper.length - 1; i >= 0; --i) polygon.push(data[points[upper[i]][2]]);
            for (i = +skipLeft; i < lower.length - skipRight; ++i) polygon.push(data[points[lower[i]][2]]);
            return polygon;
          }
          hull.x = function(_) {
            return arguments.length ? (x = _, hull) : x;
          };
          hull.y = function(_) {
            return arguments.length ? (y = _, hull) : y;
          };
          return hull;
        };
        function d3_geom_hullUpper(points) {
          var n = points.length, hull = [0, 1], hs = 2;
          for (var i = 2; i < n; i++) {
            while (hs > 1 && d3_cross2d(points[hull[hs - 2]], points[hull[hs - 1]], points[i]) <= 0) --hs;
            hull[hs++] = i;
          }
          return hull.slice(0, hs);
        }
        function d3_geom_hullOrder(a, b) {
          return a[0] - b[0] || a[1] - b[1];
        }
        d32.geom.polygon = function(coordinates) {
          d3_subclass(coordinates, d3_geom_polygonPrototype);
          return coordinates;
        };
        var d3_geom_polygonPrototype = d32.geom.polygon.prototype = [];
        d3_geom_polygonPrototype.area = function() {
          var i = -1, n = this.length, a, b = this[n - 1], area = 0;
          while (++i < n) {
            a = b;
            b = this[i];
            area += a[1] * b[0] - a[0] * b[1];
          }
          return area * 0.5;
        };
        d3_geom_polygonPrototype.centroid = function(k) {
          var i = -1, n = this.length, x = 0, y = 0, a, b = this[n - 1], c;
          if (!arguments.length) k = -1 / (6 * this.area());
          while (++i < n) {
            a = b;
            b = this[i];
            c = a[0] * b[1] - b[0] * a[1];
            x += (a[0] + b[0]) * c;
            y += (a[1] + b[1]) * c;
          }
          return [x * k, y * k];
        };
        d3_geom_polygonPrototype.clip = function(subject) {
          var input, closed = d3_geom_polygonClosed(subject), i = -1, n = this.length - d3_geom_polygonClosed(this), j, m, a = this[n - 1], b, c, d;
          while (++i < n) {
            input = subject.slice();
            subject.length = 0;
            b = this[i];
            c = input[(m = input.length - closed) - 1];
            j = -1;
            while (++j < m) {
              d = input[j];
              if (d3_geom_polygonInside(d, a, b)) {
                if (!d3_geom_polygonInside(c, a, b)) {
                  subject.push(d3_geom_polygonIntersect(c, d, a, b));
                }
                subject.push(d);
              } else if (d3_geom_polygonInside(c, a, b)) {
                subject.push(d3_geom_polygonIntersect(c, d, a, b));
              }
              c = d;
            }
            if (closed) subject.push(subject[0]);
            a = b;
          }
          return subject;
        };
        function d3_geom_polygonInside(p, a, b) {
          return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
        }
        function d3_geom_polygonIntersect(c, d, a, b) {
          var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3, y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3, ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
          return [x1 + ua * x21, y1 + ua * y21];
        }
        function d3_geom_polygonClosed(coordinates) {
          var a = coordinates[0], b = coordinates[coordinates.length - 1];
          return !(a[0] - b[0] || a[1] - b[1]);
        }
        var d3_geom_voronoiEdges, d3_geom_voronoiCells, d3_geom_voronoiBeaches, d3_geom_voronoiBeachPool = [], d3_geom_voronoiFirstCircle, d3_geom_voronoiCircles, d3_geom_voronoiCirclePool = [];
        function d3_geom_voronoiBeach() {
          d3_geom_voronoiRedBlackNode(this);
          this.edge = this.site = this.circle = null;
        }
        function d3_geom_voronoiCreateBeach(site) {
          var beach = d3_geom_voronoiBeachPool.pop() || new d3_geom_voronoiBeach();
          beach.site = site;
          return beach;
        }
        function d3_geom_voronoiDetachBeach(beach) {
          d3_geom_voronoiDetachCircle(beach);
          d3_geom_voronoiBeaches.remove(beach);
          d3_geom_voronoiBeachPool.push(beach);
          d3_geom_voronoiRedBlackNode(beach);
        }
        function d3_geom_voronoiRemoveBeach(beach) {
          var circle = beach.circle, x = circle.x, y = circle.cy, vertex = {
            x,
            y
          }, previous = beach.P, next = beach.N, disappearing = [beach];
          d3_geom_voronoiDetachBeach(beach);
          var lArc = previous;
          while (lArc.circle && abs(x - lArc.circle.x) < \u03B5 && abs(y - lArc.circle.cy) < \u03B5) {
            previous = lArc.P;
            disappearing.unshift(lArc);
            d3_geom_voronoiDetachBeach(lArc);
            lArc = previous;
          }
          disappearing.unshift(lArc);
          d3_geom_voronoiDetachCircle(lArc);
          var rArc = next;
          while (rArc.circle && abs(x - rArc.circle.x) < \u03B5 && abs(y - rArc.circle.cy) < \u03B5) {
            next = rArc.N;
            disappearing.push(rArc);
            d3_geom_voronoiDetachBeach(rArc);
            rArc = next;
          }
          disappearing.push(rArc);
          d3_geom_voronoiDetachCircle(rArc);
          var nArcs = disappearing.length, iArc;
          for (iArc = 1; iArc < nArcs; ++iArc) {
            rArc = disappearing[iArc];
            lArc = disappearing[iArc - 1];
            d3_geom_voronoiSetEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
          }
          lArc = disappearing[0];
          rArc = disappearing[nArcs - 1];
          rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, rArc.site, null, vertex);
          d3_geom_voronoiAttachCircle(lArc);
          d3_geom_voronoiAttachCircle(rArc);
        }
        function d3_geom_voronoiAddBeach(site) {
          var x = site.x, directrix = site.y, lArc, rArc, dxl, dxr, node = d3_geom_voronoiBeaches._;
          while (node) {
            dxl = d3_geom_voronoiLeftBreakPoint(node, directrix) - x;
            if (dxl > \u03B5) node = node.L;
            else {
              dxr = x - d3_geom_voronoiRightBreakPoint(node, directrix);
              if (dxr > \u03B5) {
                if (!node.R) {
                  lArc = node;
                  break;
                }
                node = node.R;
              } else {
                if (dxl > -\u03B5) {
                  lArc = node.P;
                  rArc = node;
                } else if (dxr > -\u03B5) {
                  lArc = node;
                  rArc = node.N;
                } else {
                  lArc = rArc = node;
                }
                break;
              }
            }
          }
          var newArc = d3_geom_voronoiCreateBeach(site);
          d3_geom_voronoiBeaches.insert(lArc, newArc);
          if (!lArc && !rArc) return;
          if (lArc === rArc) {
            d3_geom_voronoiDetachCircle(lArc);
            rArc = d3_geom_voronoiCreateBeach(lArc.site);
            d3_geom_voronoiBeaches.insert(newArc, rArc);
            newArc.edge = rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
            d3_geom_voronoiAttachCircle(lArc);
            d3_geom_voronoiAttachCircle(rArc);
            return;
          }
          if (!rArc) {
            newArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
            return;
          }
          d3_geom_voronoiDetachCircle(lArc);
          d3_geom_voronoiDetachCircle(rArc);
          var lSite = lArc.site, ax = lSite.x, ay = lSite.y, bx = site.x - ax, by = site.y - ay, rSite = rArc.site, cx = rSite.x - ax, cy = rSite.y - ay, d = 2 * (bx * cy - by * cx), hb = bx * bx + by * by, hc = cx * cx + cy * cy, vertex = {
            x: (cy * hb - by * hc) / d + ax,
            y: (bx * hc - cx * hb) / d + ay
          };
          d3_geom_voronoiSetEdgeEnd(rArc.edge, lSite, rSite, vertex);
          newArc.edge = d3_geom_voronoiCreateEdge(lSite, site, null, vertex);
          rArc.edge = d3_geom_voronoiCreateEdge(site, rSite, null, vertex);
          d3_geom_voronoiAttachCircle(lArc);
          d3_geom_voronoiAttachCircle(rArc);
        }
        function d3_geom_voronoiLeftBreakPoint(arc, directrix) {
          var site = arc.site, rfocx = site.x, rfocy = site.y, pby2 = rfocy - directrix;
          if (!pby2) return rfocx;
          var lArc = arc.P;
          if (!lArc) return -Infinity;
          site = lArc.site;
          var lfocx = site.x, lfocy = site.y, plby2 = lfocy - directrix;
          if (!plby2) return lfocx;
          var hl = lfocx - rfocx, aby2 = 1 / pby2 - 1 / plby2, b = hl / plby2;
          if (aby2) return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;
          return (rfocx + lfocx) / 2;
        }
        function d3_geom_voronoiRightBreakPoint(arc, directrix) {
          var rArc = arc.N;
          if (rArc) return d3_geom_voronoiLeftBreakPoint(rArc, directrix);
          var site = arc.site;
          return site.y === directrix ? site.x : Infinity;
        }
        function d3_geom_voronoiCell(site) {
          this.site = site;
          this.edges = [];
        }
        d3_geom_voronoiCell.prototype.prepare = function() {
          var halfEdges = this.edges, iHalfEdge = halfEdges.length, edge;
          while (iHalfEdge--) {
            edge = halfEdges[iHalfEdge].edge;
            if (!edge.b || !edge.a) halfEdges.splice(iHalfEdge, 1);
          }
          halfEdges.sort(d3_geom_voronoiHalfEdgeOrder);
          return halfEdges.length;
        };
        function d3_geom_voronoiCloseCells(extent) {
          var x0 = extent[0][0], x1 = extent[1][0], y0 = extent[0][1], y1 = extent[1][1], x2, y2, x3, y3, cells = d3_geom_voronoiCells, iCell = cells.length, cell, iHalfEdge, halfEdges, nHalfEdges, start, end;
          while (iCell--) {
            cell = cells[iCell];
            if (!cell || !cell.prepare()) continue;
            halfEdges = cell.edges;
            nHalfEdges = halfEdges.length;
            iHalfEdge = 0;
            while (iHalfEdge < nHalfEdges) {
              end = halfEdges[iHalfEdge].end(), x3 = end.x, y3 = end.y;
              start = halfEdges[++iHalfEdge % nHalfEdges].start(), x2 = start.x, y2 = start.y;
              if (abs(x3 - x2) > \u03B5 || abs(y3 - y2) > \u03B5) {
                halfEdges.splice(iHalfEdge, 0, new d3_geom_voronoiHalfEdge(d3_geom_voronoiCreateBorderEdge(cell.site, end, abs(x3 - x0) < \u03B5 && y1 - y3 > \u03B5 ? {
                  x: x0,
                  y: abs(x2 - x0) < \u03B5 ? y2 : y1
                } : abs(y3 - y1) < \u03B5 && x1 - x3 > \u03B5 ? {
                  x: abs(y2 - y1) < \u03B5 ? x2 : x1,
                  y: y1
                } : abs(x3 - x1) < \u03B5 && y3 - y0 > \u03B5 ? {
                  x: x1,
                  y: abs(x2 - x1) < \u03B5 ? y2 : y0
                } : abs(y3 - y0) < \u03B5 && x3 - x0 > \u03B5 ? {
                  x: abs(y2 - y0) < \u03B5 ? x2 : x0,
                  y: y0
                } : null), cell.site, null));
                ++nHalfEdges;
              }
            }
          }
        }
        function d3_geom_voronoiHalfEdgeOrder(a, b) {
          return b.angle - a.angle;
        }
        function d3_geom_voronoiCircle() {
          d3_geom_voronoiRedBlackNode(this);
          this.x = this.y = this.arc = this.site = this.cy = null;
        }
        function d3_geom_voronoiAttachCircle(arc) {
          var lArc = arc.P, rArc = arc.N;
          if (!lArc || !rArc) return;
          var lSite = lArc.site, cSite = arc.site, rSite = rArc.site;
          if (lSite === rSite) return;
          var bx = cSite.x, by = cSite.y, ax = lSite.x - bx, ay = lSite.y - by, cx = rSite.x - bx, cy = rSite.y - by;
          var d = 2 * (ax * cy - ay * cx);
          if (d >= -\u03B52) return;
          var ha = ax * ax + ay * ay, hc = cx * cx + cy * cy, x = (cy * ha - ay * hc) / d, y = (ax * hc - cx * ha) / d, cy = y + by;
          var circle = d3_geom_voronoiCirclePool.pop() || new d3_geom_voronoiCircle();
          circle.arc = arc;
          circle.site = cSite;
          circle.x = x + bx;
          circle.y = cy + Math.sqrt(x * x + y * y);
          circle.cy = cy;
          arc.circle = circle;
          var before = null, node = d3_geom_voronoiCircles._;
          while (node) {
            if (circle.y < node.y || circle.y === node.y && circle.x <= node.x) {
              if (node.L) node = node.L;
              else {
                before = node.P;
                break;
              }
            } else {
              if (node.R) node = node.R;
              else {
                before = node;
                break;
              }
            }
          }
          d3_geom_voronoiCircles.insert(before, circle);
          if (!before) d3_geom_voronoiFirstCircle = circle;
        }
        function d3_geom_voronoiDetachCircle(arc) {
          var circle = arc.circle;
          if (circle) {
            if (!circle.P) d3_geom_voronoiFirstCircle = circle.N;
            d3_geom_voronoiCircles.remove(circle);
            d3_geom_voronoiCirclePool.push(circle);
            d3_geom_voronoiRedBlackNode(circle);
            arc.circle = null;
          }
        }
        function d3_geom_voronoiClipEdges(extent) {
          var edges = d3_geom_voronoiEdges, clip = d3_geom_clipLine(extent[0][0], extent[0][1], extent[1][0], extent[1][1]), i = edges.length, e;
          while (i--) {
            e = edges[i];
            if (!d3_geom_voronoiConnectEdge(e, extent) || !clip(e) || abs(e.a.x - e.b.x) < \u03B5 && abs(e.a.y - e.b.y) < \u03B5) {
              e.a = e.b = null;
              edges.splice(i, 1);
            }
          }
        }
        function d3_geom_voronoiConnectEdge(edge, extent) {
          var vb = edge.b;
          if (vb) return true;
          var va = edge.a, x0 = extent[0][0], x1 = extent[1][0], y0 = extent[0][1], y1 = extent[1][1], lSite = edge.l, rSite = edge.r, lx = lSite.x, ly = lSite.y, rx = rSite.x, ry = rSite.y, fx = (lx + rx) / 2, fy = (ly + ry) / 2, fm, fb;
          if (ry === ly) {
            if (fx < x0 || fx >= x1) return;
            if (lx > rx) {
              if (!va) va = {
                x: fx,
                y: y0
              };
              else if (va.y >= y1) return;
              vb = {
                x: fx,
                y: y1
              };
            } else {
              if (!va) va = {
                x: fx,
                y: y1
              };
              else if (va.y < y0) return;
              vb = {
                x: fx,
                y: y0
              };
            }
          } else {
            fm = (lx - rx) / (ry - ly);
            fb = fy - fm * fx;
            if (fm < -1 || fm > 1) {
              if (lx > rx) {
                if (!va) va = {
                  x: (y0 - fb) / fm,
                  y: y0
                };
                else if (va.y >= y1) return;
                vb = {
                  x: (y1 - fb) / fm,
                  y: y1
                };
              } else {
                if (!va) va = {
                  x: (y1 - fb) / fm,
                  y: y1
                };
                else if (va.y < y0) return;
                vb = {
                  x: (y0 - fb) / fm,
                  y: y0
                };
              }
            } else {
              if (ly < ry) {
                if (!va) va = {
                  x: x0,
                  y: fm * x0 + fb
                };
                else if (va.x >= x1) return;
                vb = {
                  x: x1,
                  y: fm * x1 + fb
                };
              } else {
                if (!va) va = {
                  x: x1,
                  y: fm * x1 + fb
                };
                else if (va.x < x0) return;
                vb = {
                  x: x0,
                  y: fm * x0 + fb
                };
              }
            }
          }
          edge.a = va;
          edge.b = vb;
          return true;
        }
        function d3_geom_voronoiEdge(lSite, rSite) {
          this.l = lSite;
          this.r = rSite;
          this.a = this.b = null;
        }
        function d3_geom_voronoiCreateEdge(lSite, rSite, va, vb) {
          var edge = new d3_geom_voronoiEdge(lSite, rSite);
          d3_geom_voronoiEdges.push(edge);
          if (va) d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, va);
          if (vb) d3_geom_voronoiSetEdgeEnd(edge, rSite, lSite, vb);
          d3_geom_voronoiCells[lSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, lSite, rSite));
          d3_geom_voronoiCells[rSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, rSite, lSite));
          return edge;
        }
        function d3_geom_voronoiCreateBorderEdge(lSite, va, vb) {
          var edge = new d3_geom_voronoiEdge(lSite, null);
          edge.a = va;
          edge.b = vb;
          d3_geom_voronoiEdges.push(edge);
          return edge;
        }
        function d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, vertex) {
          if (!edge.a && !edge.b) {
            edge.a = vertex;
            edge.l = lSite;
            edge.r = rSite;
          } else if (edge.l === rSite) {
            edge.b = vertex;
          } else {
            edge.a = vertex;
          }
        }
        function d3_geom_voronoiHalfEdge(edge, lSite, rSite) {
          var va = edge.a, vb = edge.b;
          this.edge = edge;
          this.site = lSite;
          this.angle = rSite ? Math.atan2(rSite.y - lSite.y, rSite.x - lSite.x) : edge.l === lSite ? Math.atan2(vb.x - va.x, va.y - vb.y) : Math.atan2(va.x - vb.x, vb.y - va.y);
        }
        d3_geom_voronoiHalfEdge.prototype = {
          start: function() {
            return this.edge.l === this.site ? this.edge.a : this.edge.b;
          },
          end: function() {
            return this.edge.l === this.site ? this.edge.b : this.edge.a;
          }
        };
        function d3_geom_voronoiRedBlackTree() {
          this._ = null;
        }
        function d3_geom_voronoiRedBlackNode(node) {
          node.U = node.C = node.L = node.R = node.P = node.N = null;
        }
        d3_geom_voronoiRedBlackTree.prototype = {
          insert: function(after, node) {
            var parent, grandpa, uncle;
            if (after) {
              node.P = after;
              node.N = after.N;
              if (after.N) after.N.P = node;
              after.N = node;
              if (after.R) {
                after = after.R;
                while (after.L) after = after.L;
                after.L = node;
              } else {
                after.R = node;
              }
              parent = after;
            } else if (this._) {
              after = d3_geom_voronoiRedBlackFirst(this._);
              node.P = null;
              node.N = after;
              after.P = after.L = node;
              parent = after;
            } else {
              node.P = node.N = null;
              this._ = node;
              parent = null;
            }
            node.L = node.R = null;
            node.U = parent;
            node.C = true;
            after = node;
            while (parent && parent.C) {
              grandpa = parent.U;
              if (parent === grandpa.L) {
                uncle = grandpa.R;
                if (uncle && uncle.C) {
                  parent.C = uncle.C = false;
                  grandpa.C = true;
                  after = grandpa;
                } else {
                  if (after === parent.R) {
                    d3_geom_voronoiRedBlackRotateLeft(this, parent);
                    after = parent;
                    parent = after.U;
                  }
                  parent.C = false;
                  grandpa.C = true;
                  d3_geom_voronoiRedBlackRotateRight(this, grandpa);
                }
              } else {
                uncle = grandpa.L;
                if (uncle && uncle.C) {
                  parent.C = uncle.C = false;
                  grandpa.C = true;
                  after = grandpa;
                } else {
                  if (after === parent.L) {
                    d3_geom_voronoiRedBlackRotateRight(this, parent);
                    after = parent;
                    parent = after.U;
                  }
                  parent.C = false;
                  grandpa.C = true;
                  d3_geom_voronoiRedBlackRotateLeft(this, grandpa);
                }
              }
              parent = after.U;
            }
            this._.C = false;
          },
          remove: function(node) {
            if (node.N) node.N.P = node.P;
            if (node.P) node.P.N = node.N;
            node.N = node.P = null;
            var parent = node.U, sibling, left = node.L, right = node.R, next, red;
            if (!left) next = right;
            else if (!right) next = left;
            else next = d3_geom_voronoiRedBlackFirst(right);
            if (parent) {
              if (parent.L === node) parent.L = next;
              else parent.R = next;
            } else {
              this._ = next;
            }
            if (left && right) {
              red = next.C;
              next.C = node.C;
              next.L = left;
              left.U = next;
              if (next !== right) {
                parent = next.U;
                next.U = node.U;
                node = next.R;
                parent.L = node;
                next.R = right;
                right.U = next;
              } else {
                next.U = parent;
                parent = next;
                node = next.R;
              }
            } else {
              red = node.C;
              node = next;
            }
            if (node) node.U = parent;
            if (red) return;
            if (node && node.C) {
              node.C = false;
              return;
            }
            do {
              if (node === this._) break;
              if (node === parent.L) {
                sibling = parent.R;
                if (sibling.C) {
                  sibling.C = false;
                  parent.C = true;
                  d3_geom_voronoiRedBlackRotateLeft(this, parent);
                  sibling = parent.R;
                }
                if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
                  if (!sibling.R || !sibling.R.C) {
                    sibling.L.C = false;
                    sibling.C = true;
                    d3_geom_voronoiRedBlackRotateRight(this, sibling);
                    sibling = parent.R;
                  }
                  sibling.C = parent.C;
                  parent.C = sibling.R.C = false;
                  d3_geom_voronoiRedBlackRotateLeft(this, parent);
                  node = this._;
                  break;
                }
              } else {
                sibling = parent.L;
                if (sibling.C) {
                  sibling.C = false;
                  parent.C = true;
                  d3_geom_voronoiRedBlackRotateRight(this, parent);
                  sibling = parent.L;
                }
                if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
                  if (!sibling.L || !sibling.L.C) {
                    sibling.R.C = false;
                    sibling.C = true;
                    d3_geom_voronoiRedBlackRotateLeft(this, sibling);
                    sibling = parent.L;
                  }
                  sibling.C = parent.C;
                  parent.C = sibling.L.C = false;
                  d3_geom_voronoiRedBlackRotateRight(this, parent);
                  node = this._;
                  break;
                }
              }
              sibling.C = true;
              node = parent;
              parent = parent.U;
            } while (!node.C);
            if (node) node.C = false;
          }
        };
        function d3_geom_voronoiRedBlackRotateLeft(tree, node) {
          var p = node, q = node.R, parent = p.U;
          if (parent) {
            if (parent.L === p) parent.L = q;
            else parent.R = q;
          } else {
            tree._ = q;
          }
          q.U = parent;
          p.U = q;
          p.R = q.L;
          if (p.R) p.R.U = p;
          q.L = p;
        }
        function d3_geom_voronoiRedBlackRotateRight(tree, node) {
          var p = node, q = node.L, parent = p.U;
          if (parent) {
            if (parent.L === p) parent.L = q;
            else parent.R = q;
          } else {
            tree._ = q;
          }
          q.U = parent;
          p.U = q;
          p.L = q.R;
          if (p.L) p.L.U = p;
          q.R = p;
        }
        function d3_geom_voronoiRedBlackFirst(node) {
          while (node.L) node = node.L;
          return node;
        }
        function d3_geom_voronoi(sites, bbox) {
          var site = sites.sort(d3_geom_voronoiVertexOrder).pop(), x0, y0, circle;
          d3_geom_voronoiEdges = [];
          d3_geom_voronoiCells = new Array(sites.length);
          d3_geom_voronoiBeaches = new d3_geom_voronoiRedBlackTree();
          d3_geom_voronoiCircles = new d3_geom_voronoiRedBlackTree();
          while (true) {
            circle = d3_geom_voronoiFirstCircle;
            if (site && (!circle || site.y < circle.y || site.y === circle.y && site.x < circle.x)) {
              if (site.x !== x0 || site.y !== y0) {
                d3_geom_voronoiCells[site.i] = new d3_geom_voronoiCell(site);
                d3_geom_voronoiAddBeach(site);
                x0 = site.x, y0 = site.y;
              }
              site = sites.pop();
            } else if (circle) {
              d3_geom_voronoiRemoveBeach(circle.arc);
            } else {
              break;
            }
          }
          if (bbox) d3_geom_voronoiClipEdges(bbox), d3_geom_voronoiCloseCells(bbox);
          var diagram = {
            cells: d3_geom_voronoiCells,
            edges: d3_geom_voronoiEdges
          };
          d3_geom_voronoiBeaches = d3_geom_voronoiCircles = d3_geom_voronoiEdges = d3_geom_voronoiCells = null;
          return diagram;
        }
        function d3_geom_voronoiVertexOrder(a, b) {
          return b.y - a.y || b.x - a.x;
        }
        d32.geom.voronoi = function(points) {
          var x = d3_geom_pointX, y = d3_geom_pointY, fx = x, fy = y, clipExtent = d3_geom_voronoiClipExtent;
          if (points) return voronoi(points);
          function voronoi(data) {
            var polygons = new Array(data.length), x0 = clipExtent[0][0], y0 = clipExtent[0][1], x1 = clipExtent[1][0], y1 = clipExtent[1][1];
            d3_geom_voronoi(sites(data), clipExtent).cells.forEach(function(cell, i) {
              var edges = cell.edges, site = cell.site, polygon = polygons[i] = edges.length ? edges.map(function(e) {
                var s = e.start();
                return [s.x, s.y];
              }) : site.x >= x0 && site.x <= x1 && site.y >= y0 && site.y <= y1 ? [[x0, y1], [x1, y1], [x1, y0], [x0, y0]] : [];
              polygon.point = data[i];
            });
            return polygons;
          }
          function sites(data) {
            return data.map(function(d, i) {
              return {
                x: Math.round(fx(d, i) / \u03B5) * \u03B5,
                y: Math.round(fy(d, i) / \u03B5) * \u03B5,
                i
              };
            });
          }
          voronoi.links = function(data) {
            return d3_geom_voronoi(sites(data)).edges.filter(function(edge) {
              return edge.l && edge.r;
            }).map(function(edge) {
              return {
                source: data[edge.l.i],
                target: data[edge.r.i]
              };
            });
          };
          voronoi.triangles = function(data) {
            var triangles = [];
            d3_geom_voronoi(sites(data)).cells.forEach(function(cell, i) {
              var site = cell.site, edges = cell.edges.sort(d3_geom_voronoiHalfEdgeOrder), j = -1, m = edges.length, e0, s0, e1 = edges[m - 1].edge, s1 = e1.l === site ? e1.r : e1.l;
              while (++j < m) {
                e0 = e1;
                s0 = s1;
                e1 = edges[j].edge;
                s1 = e1.l === site ? e1.r : e1.l;
                if (i < s0.i && i < s1.i && d3_geom_voronoiTriangleArea(site, s0, s1) < 0) {
                  triangles.push([data[i], data[s0.i], data[s1.i]]);
                }
              }
            });
            return triangles;
          };
          voronoi.x = function(_) {
            return arguments.length ? (fx = d3_functor(x = _), voronoi) : x;
          };
          voronoi.y = function(_) {
            return arguments.length ? (fy = d3_functor(y = _), voronoi) : y;
          };
          voronoi.clipExtent = function(_) {
            if (!arguments.length) return clipExtent === d3_geom_voronoiClipExtent ? null : clipExtent;
            clipExtent = _ == null ? d3_geom_voronoiClipExtent : _;
            return voronoi;
          };
          voronoi.size = function(_) {
            if (!arguments.length) return clipExtent === d3_geom_voronoiClipExtent ? null : clipExtent && clipExtent[1];
            return voronoi.clipExtent(_ && [[0, 0], _]);
          };
          return voronoi;
        };
        var d3_geom_voronoiClipExtent = [[-1e6, -1e6], [1e6, 1e6]];
        function d3_geom_voronoiTriangleArea(a, b, c) {
          return (a.x - c.x) * (b.y - a.y) - (a.x - b.x) * (c.y - a.y);
        }
        d32.geom.delaunay = function(vertices) {
          return d32.geom.voronoi().triangles(vertices);
        };
        d32.geom.quadtree = function(points, x1, y1, x2, y2) {
          var x = d3_geom_pointX, y = d3_geom_pointY, compat;
          if (compat = arguments.length) {
            x = d3_geom_quadtreeCompatX;
            y = d3_geom_quadtreeCompatY;
            if (compat === 3) {
              y2 = y1;
              x2 = x1;
              y1 = x1 = 0;
            }
            return quadtree(points);
          }
          function quadtree(data) {
            var d, fx = d3_functor(x), fy = d3_functor(y), xs, ys, i, n, x1_, y1_, x2_, y2_;
            if (x1 != null) {
              x1_ = x1, y1_ = y1, x2_ = x2, y2_ = y2;
            } else {
              x2_ = y2_ = -(x1_ = y1_ = Infinity);
              xs = [], ys = [];
              n = data.length;
              if (compat) for (i = 0; i < n; ++i) {
                d = data[i];
                if (d.x < x1_) x1_ = d.x;
                if (d.y < y1_) y1_ = d.y;
                if (d.x > x2_) x2_ = d.x;
                if (d.y > y2_) y2_ = d.y;
                xs.push(d.x);
                ys.push(d.y);
              }
              else for (i = 0; i < n; ++i) {
                var x_ = +fx(d = data[i], i), y_ = +fy(d, i);
                if (x_ < x1_) x1_ = x_;
                if (y_ < y1_) y1_ = y_;
                if (x_ > x2_) x2_ = x_;
                if (y_ > y2_) y2_ = y_;
                xs.push(x_);
                ys.push(y_);
              }
            }
            var dx = x2_ - x1_, dy = y2_ - y1_;
            if (dx > dy) y2_ = y1_ + dx;
            else x2_ = x1_ + dy;
            function insert(n2, d2, x3, y3, x12, y12, x22, y22) {
              if (isNaN(x3) || isNaN(y3)) return;
              if (n2.leaf) {
                var nx = n2.x, ny = n2.y;
                if (nx != null) {
                  if (abs(nx - x3) + abs(ny - y3) < 0.01) {
                    insertChild(n2, d2, x3, y3, x12, y12, x22, y22);
                  } else {
                    var nPoint = n2.point;
                    n2.x = n2.y = n2.point = null;
                    insertChild(n2, nPoint, nx, ny, x12, y12, x22, y22);
                    insertChild(n2, d2, x3, y3, x12, y12, x22, y22);
                  }
                } else {
                  n2.x = x3, n2.y = y3, n2.point = d2;
                }
              } else {
                insertChild(n2, d2, x3, y3, x12, y12, x22, y22);
              }
            }
            function insertChild(n2, d2, x3, y3, x12, y12, x22, y22) {
              var xm = (x12 + x22) * 0.5, ym = (y12 + y22) * 0.5, right = x3 >= xm, below = y3 >= ym, i2 = below << 1 | right;
              n2.leaf = false;
              n2 = n2.nodes[i2] || (n2.nodes[i2] = d3_geom_quadtreeNode());
              if (right) x12 = xm;
              else x22 = xm;
              if (below) y12 = ym;
              else y22 = ym;
              insert(n2, d2, x3, y3, x12, y12, x22, y22);
            }
            var root = d3_geom_quadtreeNode();
            root.add = function(d2) {
              insert(root, d2, +fx(d2, ++i), +fy(d2, i), x1_, y1_, x2_, y2_);
            };
            root.visit = function(f) {
              d3_geom_quadtreeVisit(f, root, x1_, y1_, x2_, y2_);
            };
            root.find = function(point) {
              return d3_geom_quadtreeFind(root, point[0], point[1], x1_, y1_, x2_, y2_);
            };
            i = -1;
            if (x1 == null) {
              while (++i < n) {
                insert(root, data[i], xs[i], ys[i], x1_, y1_, x2_, y2_);
              }
              --i;
            } else data.forEach(root.add);
            xs = ys = data = d = null;
            return root;
          }
          quadtree.x = function(_) {
            return arguments.length ? (x = _, quadtree) : x;
          };
          quadtree.y = function(_) {
            return arguments.length ? (y = _, quadtree) : y;
          };
          quadtree.extent = function(_) {
            if (!arguments.length) return x1 == null ? null : [[x1, y1], [x2, y2]];
            if (_ == null) x1 = y1 = x2 = y2 = null;
            else x1 = +_[0][0], y1 = +_[0][1], x2 = +_[1][0], y2 = +_[1][1];
            return quadtree;
          };
          quadtree.size = function(_) {
            if (!arguments.length) return x1 == null ? null : [x2 - x1, y2 - y1];
            if (_ == null) x1 = y1 = x2 = y2 = null;
            else x1 = y1 = 0, x2 = +_[0], y2 = +_[1];
            return quadtree;
          };
          return quadtree;
        };
        function d3_geom_quadtreeCompatX(d) {
          return d.x;
        }
        function d3_geom_quadtreeCompatY(d) {
          return d.y;
        }
        function d3_geom_quadtreeNode() {
          return {
            leaf: true,
            nodes: [],
            point: null,
            x: null,
            y: null
          };
        }
        function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
          if (!f(node, x1, y1, x2, y2)) {
            var sx = (x1 + x2) * 0.5, sy = (y1 + y2) * 0.5, children = node.nodes;
            if (children[0]) d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy);
            if (children[1]) d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy);
            if (children[2]) d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2);
            if (children[3]) d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2);
          }
        }
        function d3_geom_quadtreeFind(root, x, y, x0, y0, x3, y3) {
          var minDistance2 = Infinity, closestPoint;
          (function find(node, x1, y1, x2, y2) {
            if (x1 > x3 || y1 > y3 || x2 < x0 || y2 < y0) return;
            if (point = node.point) {
              var point, dx = x - node.x, dy = y - node.y, distance2 = dx * dx + dy * dy;
              if (distance2 < minDistance2) {
                var distance = Math.sqrt(minDistance2 = distance2);
                x0 = x - distance, y0 = y - distance;
                x3 = x + distance, y3 = y + distance;
                closestPoint = point;
              }
            }
            var children = node.nodes, xm = (x1 + x2) * 0.5, ym = (y1 + y2) * 0.5, right = x >= xm, below = y >= ym;
            for (var i = below << 1 | right, j = i + 4; i < j; ++i) {
              if (node = children[i & 3]) switch (i & 3) {
                case 0:
                  find(node, x1, y1, xm, ym);
                  break;
                case 1:
                  find(node, xm, y1, x2, ym);
                  break;
                case 2:
                  find(node, x1, ym, xm, y2);
                  break;
                case 3:
                  find(node, xm, ym, x2, y2);
                  break;
              }
            }
          })(root, x0, y0, x3, y3);
          return closestPoint;
        }
        d32.interpolateRgb = d3_interpolateRgb;
        function d3_interpolateRgb(a, b) {
          a = d32.rgb(a);
          b = d32.rgb(b);
          var ar = a.r, ag = a.g, ab = a.b, br = b.r - ar, bg = b.g - ag, bb = b.b - ab;
          return function(t) {
            return "#" + d3_rgb_hex(Math.round(ar + br * t)) + d3_rgb_hex(Math.round(ag + bg * t)) + d3_rgb_hex(Math.round(ab + bb * t));
          };
        }
        d32.interpolateObject = d3_interpolateObject;
        function d3_interpolateObject(a, b) {
          var i = {}, c = {}, k;
          for (k in a) {
            if (k in b) {
              i[k] = d3_interpolate(a[k], b[k]);
            } else {
              c[k] = a[k];
            }
          }
          for (k in b) {
            if (!(k in a)) {
              c[k] = b[k];
            }
          }
          return function(t) {
            for (k in i) c[k] = i[k](t);
            return c;
          };
        }
        d32.interpolateNumber = d3_interpolateNumber;
        function d3_interpolateNumber(a, b) {
          a = +a, b = +b;
          return function(t) {
            return a * (1 - t) + b * t;
          };
        }
        d32.interpolateString = d3_interpolateString;
        function d3_interpolateString(a, b) {
          var bi = d3_interpolate_numberA.lastIndex = d3_interpolate_numberB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
          a = a + "", b = b + "";
          while ((am = d3_interpolate_numberA.exec(a)) && (bm = d3_interpolate_numberB.exec(b))) {
            if ((bs = bm.index) > bi) {
              bs = b.slice(bi, bs);
              if (s[i]) s[i] += bs;
              else s[++i] = bs;
            }
            if ((am = am[0]) === (bm = bm[0])) {
              if (s[i]) s[i] += bm;
              else s[++i] = bm;
            } else {
              s[++i] = null;
              q.push({
                i,
                x: d3_interpolateNumber(am, bm)
              });
            }
            bi = d3_interpolate_numberB.lastIndex;
          }
          if (bi < b.length) {
            bs = b.slice(bi);
            if (s[i]) s[i] += bs;
            else s[++i] = bs;
          }
          return s.length < 2 ? q[0] ? (b = q[0].x, function(t) {
            return b(t) + "";
          }) : function() {
            return b;
          } : (b = q.length, function(t) {
            for (var i2 = 0, o; i2 < b; ++i2) s[(o = q[i2]).i] = o.x(t);
            return s.join("");
          });
        }
        var d3_interpolate_numberA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, d3_interpolate_numberB = new RegExp(d3_interpolate_numberA.source, "g");
        d32.interpolate = d3_interpolate;
        function d3_interpolate(a, b) {
          var i = d32.interpolators.length, f;
          while (--i >= 0 && !(f = d32.interpolators[i](a, b))) ;
          return f;
        }
        d32.interpolators = [function(a, b) {
          var t = typeof b;
          return (t === "string" ? d3_rgb_names.has(b.toLowerCase()) || /^(#|rgb\(|hsl\()/i.test(b) ? d3_interpolateRgb : d3_interpolateString : b instanceof d3_color ? d3_interpolateRgb : Array.isArray(b) ? d3_interpolateArray : t === "object" && isNaN(b) ? d3_interpolateObject : d3_interpolateNumber)(a, b);
        }];
        d32.interpolateArray = d3_interpolateArray;
        function d3_interpolateArray(a, b) {
          var x = [], c = [], na = a.length, nb = b.length, n0 = Math.min(a.length, b.length), i;
          for (i = 0; i < n0; ++i) x.push(d3_interpolate(a[i], b[i]));
          for (; i < na; ++i) c[i] = a[i];
          for (; i < nb; ++i) c[i] = b[i];
          return function(t) {
            for (i = 0; i < n0; ++i) c[i] = x[i](t);
            return c;
          };
        }
        var d3_ease_default = function() {
          return d3_identity;
        };
        var d3_ease = d32.map({
          linear: d3_ease_default,
          poly: d3_ease_poly,
          quad: function() {
            return d3_ease_quad;
          },
          cubic: function() {
            return d3_ease_cubic;
          },
          sin: function() {
            return d3_ease_sin;
          },
          exp: function() {
            return d3_ease_exp;
          },
          circle: function() {
            return d3_ease_circle;
          },
          elastic: d3_ease_elastic,
          back: d3_ease_back,
          bounce: function() {
            return d3_ease_bounce;
          }
        });
        var d3_ease_mode = d32.map({
          "in": d3_identity,
          out: d3_ease_reverse,
          "in-out": d3_ease_reflect,
          "out-in": function(f) {
            return d3_ease_reflect(d3_ease_reverse(f));
          }
        });
        d32.ease = function(name) {
          var i = name.indexOf("-"), t = i >= 0 ? name.slice(0, i) : name, m = i >= 0 ? name.slice(i + 1) : "in";
          t = d3_ease.get(t) || d3_ease_default;
          m = d3_ease_mode.get(m) || d3_identity;
          return d3_ease_clamp(m(t.apply(null, d3_arraySlice.call(arguments, 1))));
        };
        function d3_ease_clamp(f) {
          return function(t) {
            return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
          };
        }
        function d3_ease_reverse(f) {
          return function(t) {
            return 1 - f(1 - t);
          };
        }
        function d3_ease_reflect(f) {
          return function(t) {
            return 0.5 * (t < 0.5 ? f(2 * t) : 2 - f(2 - 2 * t));
          };
        }
        function d3_ease_quad(t) {
          return t * t;
        }
        function d3_ease_cubic(t) {
          return t * t * t;
        }
        function d3_ease_cubicInOut(t) {
          if (t <= 0) return 0;
          if (t >= 1) return 1;
          var t2 = t * t, t3 = t2 * t;
          return 4 * (t < 0.5 ? t3 : 3 * (t - t2) + t3 - 0.75);
        }
        function d3_ease_poly(e) {
          return function(t) {
            return Math.pow(t, e);
          };
        }
        function d3_ease_sin(t) {
          return 1 - Math.cos(t * half\u03C0);
        }
        function d3_ease_exp(t) {
          return Math.pow(2, 10 * (t - 1));
        }
        function d3_ease_circle(t) {
          return 1 - Math.sqrt(1 - t * t);
        }
        function d3_ease_elastic(a, p) {
          var s;
          if (arguments.length < 2) p = 0.45;
          if (arguments.length) s = p / \u03C4 * Math.asin(1 / a);
          else a = 1, s = p / 4;
          return function(t) {
            return 1 + a * Math.pow(2, -10 * t) * Math.sin((t - s) * \u03C4 / p);
          };
        }
        function d3_ease_back(s) {
          if (!s) s = 1.70158;
          return function(t) {
            return t * t * ((s + 1) * t - s);
          };
        }
        function d3_ease_bounce(t) {
          return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        }
        d32.interpolateHcl = d3_interpolateHcl;
        function d3_interpolateHcl(a, b) {
          a = d32.hcl(a);
          b = d32.hcl(b);
          var ah = a.h, ac = a.c, al = a.l, bh = b.h - ah, bc = b.c - ac, bl = b.l - al;
          if (isNaN(bc)) bc = 0, ac = isNaN(ac) ? b.c : ac;
          if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah;
          else if (bh > 180) bh -= 360;
          else if (bh < -180) bh += 360;
          return function(t) {
            return d3_hcl_lab(ah + bh * t, ac + bc * t, al + bl * t) + "";
          };
        }
        d32.interpolateHsl = d3_interpolateHsl;
        function d3_interpolateHsl(a, b) {
          a = d32.hsl(a);
          b = d32.hsl(b);
          var ah = a.h, as = a.s, al = a.l, bh = b.h - ah, bs = b.s - as, bl = b.l - al;
          if (isNaN(bs)) bs = 0, as = isNaN(as) ? b.s : as;
          if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah;
          else if (bh > 180) bh -= 360;
          else if (bh < -180) bh += 360;
          return function(t) {
            return d3_hsl_rgb(ah + bh * t, as + bs * t, al + bl * t) + "";
          };
        }
        d32.interpolateLab = d3_interpolateLab;
        function d3_interpolateLab(a, b) {
          a = d32.lab(a);
          b = d32.lab(b);
          var al = a.l, aa = a.a, ab = a.b, bl = b.l - al, ba = b.a - aa, bb = b.b - ab;
          return function(t) {
            return d3_lab_rgb(al + bl * t, aa + ba * t, ab + bb * t) + "";
          };
        }
        d32.interpolateRound = d3_interpolateRound;
        function d3_interpolateRound(a, b) {
          b -= a;
          return function(t) {
            return Math.round(a + b * t);
          };
        }
        d32.transform = function(string) {
          var g = d3_document.createElementNS(d32.ns.prefix.svg, "g");
          return (d32.transform = function(string2) {
            if (string2 != null) {
              g.setAttribute("transform", string2);
              var t = g.transform.baseVal.consolidate();
            }
            return new d3_transform(t ? t.matrix : d3_transformIdentity);
          })(string);
        };
        function d3_transform(m) {
          var r0 = [m.a, m.b], r1 = [m.c, m.d], kx = d3_transformNormalize(r0), kz = d3_transformDot(r0, r1), ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
          if (r0[0] * r1[1] < r1[0] * r0[1]) {
            r0[0] *= -1;
            r0[1] *= -1;
            kx *= -1;
            kz *= -1;
          }
          this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_degrees;
          this.translate = [m.e, m.f];
          this.scale = [kx, ky];
          this.skew = ky ? Math.atan2(kz, ky) * d3_degrees : 0;
        }
        d3_transform.prototype.toString = function() {
          return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")";
        };
        function d3_transformDot(a, b) {
          return a[0] * b[0] + a[1] * b[1];
        }
        function d3_transformNormalize(a) {
          var k = Math.sqrt(d3_transformDot(a, a));
          if (k) {
            a[0] /= k;
            a[1] /= k;
          }
          return k;
        }
        function d3_transformCombine(a, b, k) {
          a[0] += k * b[0];
          a[1] += k * b[1];
          return a;
        }
        var d3_transformIdentity = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: 0,
          f: 0
        };
        d32.interpolateTransform = d3_interpolateTransform;
        function d3_interpolateTransformPop(s) {
          return s.length ? s.pop() + "," : "";
        }
        function d3_interpolateTranslate(ta, tb, s, q) {
          if (ta[0] !== tb[0] || ta[1] !== tb[1]) {
            var i = s.push("translate(", null, ",", null, ")");
            q.push({
              i: i - 4,
              x: d3_interpolateNumber(ta[0], tb[0])
            }, {
              i: i - 2,
              x: d3_interpolateNumber(ta[1], tb[1])
            });
          } else if (tb[0] || tb[1]) {
            s.push("translate(" + tb + ")");
          }
        }
        function d3_interpolateRotate(ra, rb, s, q) {
          if (ra !== rb) {
            if (ra - rb > 180) rb += 360;
            else if (rb - ra > 180) ra += 360;
            q.push({
              i: s.push(d3_interpolateTransformPop(s) + "rotate(", null, ")") - 2,
              x: d3_interpolateNumber(ra, rb)
            });
          } else if (rb) {
            s.push(d3_interpolateTransformPop(s) + "rotate(" + rb + ")");
          }
        }
        function d3_interpolateSkew(wa, wb, s, q) {
          if (wa !== wb) {
            q.push({
              i: s.push(d3_interpolateTransformPop(s) + "skewX(", null, ")") - 2,
              x: d3_interpolateNumber(wa, wb)
            });
          } else if (wb) {
            s.push(d3_interpolateTransformPop(s) + "skewX(" + wb + ")");
          }
        }
        function d3_interpolateScale(ka, kb, s, q) {
          if (ka[0] !== kb[0] || ka[1] !== kb[1]) {
            var i = s.push(d3_interpolateTransformPop(s) + "scale(", null, ",", null, ")");
            q.push({
              i: i - 4,
              x: d3_interpolateNumber(ka[0], kb[0])
            }, {
              i: i - 2,
              x: d3_interpolateNumber(ka[1], kb[1])
            });
          } else if (kb[0] !== 1 || kb[1] !== 1) {
            s.push(d3_interpolateTransformPop(s) + "scale(" + kb + ")");
          }
        }
        function d3_interpolateTransform(a, b) {
          var s = [], q = [];
          a = d32.transform(a), b = d32.transform(b);
          d3_interpolateTranslate(a.translate, b.translate, s, q);
          d3_interpolateRotate(a.rotate, b.rotate, s, q);
          d3_interpolateSkew(a.skew, b.skew, s, q);
          d3_interpolateScale(a.scale, b.scale, s, q);
          a = b = null;
          return function(t) {
            var i = -1, n = q.length, o;
            while (++i < n) s[(o = q[i]).i] = o.x(t);
            return s.join("");
          };
        }
        function d3_uninterpolateNumber(a, b) {
          b = (b -= a = +a) || 1 / b;
          return function(x) {
            return (x - a) / b;
          };
        }
        function d3_uninterpolateClamp(a, b) {
          b = (b -= a = +a) || 1 / b;
          return function(x) {
            return Math.max(0, Math.min(1, (x - a) / b));
          };
        }
        d32.layout = {};
        d32.layout.bundle = function() {
          return function(links) {
            var paths = [], i = -1, n = links.length;
            while (++i < n) paths.push(d3_layout_bundlePath(links[i]));
            return paths;
          };
        };
        function d3_layout_bundlePath(link) {
          var start = link.source, end = link.target, lca = d3_layout_bundleLeastCommonAncestor(start, end), points = [start];
          while (start !== lca) {
            start = start.parent;
            points.push(start);
          }
          var k = points.length;
          while (end !== lca) {
            points.splice(k, 0, end);
            end = end.parent;
          }
          return points;
        }
        function d3_layout_bundleAncestors(node) {
          var ancestors = [], parent = node.parent;
          while (parent != null) {
            ancestors.push(node);
            node = parent;
            parent = parent.parent;
          }
          ancestors.push(node);
          return ancestors;
        }
        function d3_layout_bundleLeastCommonAncestor(a, b) {
          if (a === b) return a;
          var aNodes = d3_layout_bundleAncestors(a), bNodes = d3_layout_bundleAncestors(b), aNode = aNodes.pop(), bNode = bNodes.pop(), sharedNode = null;
          while (aNode === bNode) {
            sharedNode = aNode;
            aNode = aNodes.pop();
            bNode = bNodes.pop();
          }
          return sharedNode;
        }
        d32.layout.chord = function() {
          var chord = {}, chords, groups, matrix, n, padding = 0, sortGroups, sortSubgroups, sortChords;
          function relayout() {
            var subgroups = {}, groupSums = [], groupIndex = d32.range(n), subgroupIndex = [], k, x, x0, i, j;
            chords = [];
            groups = [];
            k = 0, i = -1;
            while (++i < n) {
              x = 0, j = -1;
              while (++j < n) {
                x += matrix[i][j];
              }
              groupSums.push(x);
              subgroupIndex.push(d32.range(n));
              k += x;
            }
            if (sortGroups) {
              groupIndex.sort(function(a, b) {
                return sortGroups(groupSums[a], groupSums[b]);
              });
            }
            if (sortSubgroups) {
              subgroupIndex.forEach(function(d, i2) {
                d.sort(function(a, b) {
                  return sortSubgroups(matrix[i2][a], matrix[i2][b]);
                });
              });
            }
            k = (\u03C4 - padding * n) / k;
            x = 0, i = -1;
            while (++i < n) {
              x0 = x, j = -1;
              while (++j < n) {
                var di = groupIndex[i], dj = subgroupIndex[di][j], v = matrix[di][dj], a0 = x, a1 = x += v * k;
                subgroups[di + "-" + dj] = {
                  index: di,
                  subindex: dj,
                  startAngle: a0,
                  endAngle: a1,
                  value: v
                };
              }
              groups[di] = {
                index: di,
                startAngle: x0,
                endAngle: x,
                value: groupSums[di]
              };
              x += padding;
            }
            i = -1;
            while (++i < n) {
              j = i - 1;
              while (++j < n) {
                var source = subgroups[i + "-" + j], target = subgroups[j + "-" + i];
                if (source.value || target.value) {
                  chords.push(source.value < target.value ? {
                    source: target,
                    target: source
                  } : {
                    source,
                    target
                  });
                }
              }
            }
            if (sortChords) resort();
          }
          function resort() {
            chords.sort(function(a, b) {
              return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2);
            });
          }
          chord.matrix = function(x) {
            if (!arguments.length) return matrix;
            n = (matrix = x) && matrix.length;
            chords = groups = null;
            return chord;
          };
          chord.padding = function(x) {
            if (!arguments.length) return padding;
            padding = x;
            chords = groups = null;
            return chord;
          };
          chord.sortGroups = function(x) {
            if (!arguments.length) return sortGroups;
            sortGroups = x;
            chords = groups = null;
            return chord;
          };
          chord.sortSubgroups = function(x) {
            if (!arguments.length) return sortSubgroups;
            sortSubgroups = x;
            chords = null;
            return chord;
          };
          chord.sortChords = function(x) {
            if (!arguments.length) return sortChords;
            sortChords = x;
            if (chords) resort();
            return chord;
          };
          chord.chords = function() {
            if (!chords) relayout();
            return chords;
          };
          chord.groups = function() {
            if (!groups) relayout();
            return groups;
          };
          return chord;
        };
        d32.layout.force = function() {
          var force = {}, event = d32.dispatch("start", "tick", "end"), timer, size = [1, 1], drag, alpha, friction = 0.9, linkDistance = d3_layout_forceLinkDistance, linkStrength = d3_layout_forceLinkStrength, charge = -30, chargeDistance2 = d3_layout_forceChargeDistance2, gravity = 0.1, theta2 = 0.64, nodes = [], links = [], distances, strengths, charges;
          function repulse(node) {
            return function(quad, x1, _, x2) {
              if (quad.point !== node) {
                var dx = quad.cx - node.x, dy = quad.cy - node.y, dw = x2 - x1, dn = dx * dx + dy * dy;
                if (dw * dw / theta2 < dn) {
                  if (dn < chargeDistance2) {
                    var k = quad.charge / dn;
                    node.px -= dx * k;
                    node.py -= dy * k;
                  }
                  return true;
                }
                if (quad.point && dn && dn < chargeDistance2) {
                  var k = quad.pointCharge / dn;
                  node.px -= dx * k;
                  node.py -= dy * k;
                }
              }
              return !quad.charge;
            };
          }
          force.tick = function() {
            if ((alpha *= 0.99) < 5e-3) {
              timer = null;
              event.end({
                type: "end",
                alpha: alpha = 0
              });
              return true;
            }
            var n = nodes.length, m = links.length, q, i, o, s, t, l, k, x, y;
            for (i = 0; i < m; ++i) {
              o = links[i];
              s = o.source;
              t = o.target;
              x = t.x - s.x;
              y = t.y - s.y;
              if (l = x * x + y * y) {
                l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
                x *= l;
                y *= l;
                t.x -= x * (k = s.weight + t.weight ? s.weight / (s.weight + t.weight) : 0.5);
                t.y -= y * k;
                s.x += x * (k = 1 - k);
                s.y += y * k;
              }
            }
            if (k = alpha * gravity) {
              x = size[0] / 2;
              y = size[1] / 2;
              i = -1;
              if (k) while (++i < n) {
                o = nodes[i];
                o.x += (x - o.x) * k;
                o.y += (y - o.y) * k;
              }
            }
            if (charge) {
              d3_layout_forceAccumulate(q = d32.geom.quadtree(nodes), alpha, charges);
              i = -1;
              while (++i < n) {
                if (!(o = nodes[i]).fixed) {
                  q.visit(repulse(o));
                }
              }
            }
            i = -1;
            while (++i < n) {
              o = nodes[i];
              if (o.fixed) {
                o.x = o.px;
                o.y = o.py;
              } else {
                o.x -= (o.px - (o.px = o.x)) * friction;
                o.y -= (o.py - (o.py = o.y)) * friction;
              }
            }
            event.tick({
              type: "tick",
              alpha
            });
          };
          force.nodes = function(x) {
            if (!arguments.length) return nodes;
            nodes = x;
            return force;
          };
          force.links = function(x) {
            if (!arguments.length) return links;
            links = x;
            return force;
          };
          force.size = function(x) {
            if (!arguments.length) return size;
            size = x;
            return force;
          };
          force.linkDistance = function(x) {
            if (!arguments.length) return linkDistance;
            linkDistance = typeof x === "function" ? x : +x;
            return force;
          };
          force.distance = force.linkDistance;
          force.linkStrength = function(x) {
            if (!arguments.length) return linkStrength;
            linkStrength = typeof x === "function" ? x : +x;
            return force;
          };
          force.friction = function(x) {
            if (!arguments.length) return friction;
            friction = +x;
            return force;
          };
          force.charge = function(x) {
            if (!arguments.length) return charge;
            charge = typeof x === "function" ? x : +x;
            return force;
          };
          force.chargeDistance = function(x) {
            if (!arguments.length) return Math.sqrt(chargeDistance2);
            chargeDistance2 = x * x;
            return force;
          };
          force.gravity = function(x) {
            if (!arguments.length) return gravity;
            gravity = +x;
            return force;
          };
          force.theta = function(x) {
            if (!arguments.length) return Math.sqrt(theta2);
            theta2 = x * x;
            return force;
          };
          force.alpha = function(x) {
            if (!arguments.length) return alpha;
            x = +x;
            if (alpha) {
              if (x > 0) {
                alpha = x;
              } else {
                timer.c = null, timer.t = NaN, timer = null;
                event.end({
                  type: "end",
                  alpha: alpha = 0
                });
              }
            } else if (x > 0) {
              event.start({
                type: "start",
                alpha: alpha = x
              });
              timer = d3_timer(force.tick);
            }
            return force;
          };
          force.start = function() {
            var i, n = nodes.length, m = links.length, w = size[0], h = size[1], neighbors, o;
            for (i = 0; i < n; ++i) {
              (o = nodes[i]).index = i;
              o.weight = 0;
            }
            for (i = 0; i < m; ++i) {
              o = links[i];
              if (typeof o.source == "number") o.source = nodes[o.source];
              if (typeof o.target == "number") o.target = nodes[o.target];
              ++o.source.weight;
              ++o.target.weight;
            }
            for (i = 0; i < n; ++i) {
              o = nodes[i];
              if (isNaN(o.x)) o.x = position("x", w);
              if (isNaN(o.y)) o.y = position("y", h);
              if (isNaN(o.px)) o.px = o.x;
              if (isNaN(o.py)) o.py = o.y;
            }
            distances = [];
            if (typeof linkDistance === "function") for (i = 0; i < m; ++i) distances[i] = +linkDistance.call(this, links[i], i);
            else for (i = 0; i < m; ++i) distances[i] = linkDistance;
            strengths = [];
            if (typeof linkStrength === "function") for (i = 0; i < m; ++i) strengths[i] = +linkStrength.call(this, links[i], i);
            else for (i = 0; i < m; ++i) strengths[i] = linkStrength;
            charges = [];
            if (typeof charge === "function") for (i = 0; i < n; ++i) charges[i] = +charge.call(this, nodes[i], i);
            else for (i = 0; i < n; ++i) charges[i] = charge;
            function position(dimension, size2) {
              if (!neighbors) {
                neighbors = new Array(n);
                for (j = 0; j < n; ++j) {
                  neighbors[j] = [];
                }
                for (j = 0; j < m; ++j) {
                  var o2 = links[j];
                  neighbors[o2.source.index].push(o2.target);
                  neighbors[o2.target.index].push(o2.source);
                }
              }
              var candidates = neighbors[i], j = -1, l = candidates.length, x;
              while (++j < l) if (!isNaN(x = candidates[j][dimension])) return x;
              return Math.random() * size2;
            }
            return force.resume();
          };
          force.resume = function() {
            return force.alpha(0.1);
          };
          force.stop = function() {
            return force.alpha(0);
          };
          force.drag = function() {
            if (!drag) drag = d32.behavior.drag().origin(d3_identity).on("dragstart.force", d3_layout_forceDragstart).on("drag.force", dragmove).on("dragend.force", d3_layout_forceDragend);
            if (!arguments.length) return drag;
            this.on("mouseover.force", d3_layout_forceMouseover).on("mouseout.force", d3_layout_forceMouseout).call(drag);
          };
          function dragmove(d) {
            d.px = d32.event.x, d.py = d32.event.y;
            force.resume();
          }
          return d32.rebind(force, event, "on");
        };
        function d3_layout_forceDragstart(d) {
          d.fixed |= 2;
        }
        function d3_layout_forceDragend(d) {
          d.fixed &= ~6;
        }
        function d3_layout_forceMouseover(d) {
          d.fixed |= 4;
          d.px = d.x, d.py = d.y;
        }
        function d3_layout_forceMouseout(d) {
          d.fixed &= ~4;
        }
        function d3_layout_forceAccumulate(quad, alpha, charges) {
          var cx = 0, cy = 0;
          quad.charge = 0;
          if (!quad.leaf) {
            var nodes = quad.nodes, n = nodes.length, i = -1, c;
            while (++i < n) {
              c = nodes[i];
              if (c == null) continue;
              d3_layout_forceAccumulate(c, alpha, charges);
              quad.charge += c.charge;
              cx += c.charge * c.cx;
              cy += c.charge * c.cy;
            }
          }
          if (quad.point) {
            if (!quad.leaf) {
              quad.point.x += Math.random() - 0.5;
              quad.point.y += Math.random() - 0.5;
            }
            var k = alpha * charges[quad.point.index];
            quad.charge += quad.pointCharge = k;
            cx += k * quad.point.x;
            cy += k * quad.point.y;
          }
          quad.cx = cx / quad.charge;
          quad.cy = cy / quad.charge;
        }
        var d3_layout_forceLinkDistance = 20, d3_layout_forceLinkStrength = 1, d3_layout_forceChargeDistance2 = Infinity;
        d32.layout.hierarchy = function() {
          var sort = d3_layout_hierarchySort, children = d3_layout_hierarchyChildren, value = d3_layout_hierarchyValue;
          function hierarchy(root) {
            var stack = [root], nodes = [], node;
            root.depth = 0;
            while ((node = stack.pop()) != null) {
              nodes.push(node);
              if ((childs = children.call(hierarchy, node, node.depth)) && (n = childs.length)) {
                var n, childs, child;
                while (--n >= 0) {
                  stack.push(child = childs[n]);
                  child.parent = node;
                  child.depth = node.depth + 1;
                }
                if (value) node.value = 0;
                node.children = childs;
              } else {
                if (value) node.value = +value.call(hierarchy, node, node.depth) || 0;
                delete node.children;
              }
            }
            d3_layout_hierarchyVisitAfter(root, function(node2) {
              var childs2, parent;
              if (sort && (childs2 = node2.children)) childs2.sort(sort);
              if (value && (parent = node2.parent)) parent.value += node2.value;
            });
            return nodes;
          }
          hierarchy.sort = function(x) {
            if (!arguments.length) return sort;
            sort = x;
            return hierarchy;
          };
          hierarchy.children = function(x) {
            if (!arguments.length) return children;
            children = x;
            return hierarchy;
          };
          hierarchy.value = function(x) {
            if (!arguments.length) return value;
            value = x;
            return hierarchy;
          };
          hierarchy.revalue = function(root) {
            if (value) {
              d3_layout_hierarchyVisitBefore(root, function(node) {
                if (node.children) node.value = 0;
              });
              d3_layout_hierarchyVisitAfter(root, function(node) {
                var parent;
                if (!node.children) node.value = +value.call(hierarchy, node, node.depth) || 0;
                if (parent = node.parent) parent.value += node.value;
              });
            }
            return root;
          };
          return hierarchy;
        };
        function d3_layout_hierarchyRebind(object, hierarchy) {
          d32.rebind(object, hierarchy, "sort", "children", "value");
          object.nodes = object;
          object.links = d3_layout_hierarchyLinks;
          return object;
        }
        function d3_layout_hierarchyVisitBefore(node, callback) {
          var nodes = [node];
          while ((node = nodes.pop()) != null) {
            callback(node);
            if ((children = node.children) && (n = children.length)) {
              var n, children;
              while (--n >= 0) nodes.push(children[n]);
            }
          }
        }
        function d3_layout_hierarchyVisitAfter(node, callback) {
          var nodes = [node], nodes2 = [];
          while ((node = nodes.pop()) != null) {
            nodes2.push(node);
            if ((children = node.children) && (n = children.length)) {
              var i = -1, n, children;
              while (++i < n) nodes.push(children[i]);
            }
          }
          while ((node = nodes2.pop()) != null) {
            callback(node);
          }
        }
        function d3_layout_hierarchyChildren(d) {
          return d.children;
        }
        function d3_layout_hierarchyValue(d) {
          return d.value;
        }
        function d3_layout_hierarchySort(a, b) {
          return b.value - a.value;
        }
        function d3_layout_hierarchyLinks(nodes) {
          return d32.merge(nodes.map(function(parent) {
            return (parent.children || []).map(function(child) {
              return {
                source: parent,
                target: child
              };
            });
          }));
        }
        d32.layout.partition = function() {
          var hierarchy = d32.layout.hierarchy(), size = [1, 1];
          function position(node, x, dx, dy) {
            var children = node.children;
            node.x = x;
            node.y = node.depth * dy;
            node.dx = dx;
            node.dy = dy;
            if (children && (n = children.length)) {
              var i = -1, n, c, d;
              dx = node.value ? dx / node.value : 0;
              while (++i < n) {
                position(c = children[i], x, d = c.value * dx, dy);
                x += d;
              }
            }
          }
          function depth(node) {
            var children = node.children, d = 0;
            if (children && (n = children.length)) {
              var i = -1, n;
              while (++i < n) d = Math.max(d, depth(children[i]));
            }
            return 1 + d;
          }
          function partition(d, i) {
            var nodes = hierarchy.call(this, d, i);
            position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
            return nodes;
          }
          partition.size = function(x) {
            if (!arguments.length) return size;
            size = x;
            return partition;
          };
          return d3_layout_hierarchyRebind(partition, hierarchy);
        };
        d32.layout.pie = function() {
          var value = Number, sort = d3_layout_pieSortByValue, startAngle = 0, endAngle = \u03C4, padAngle = 0;
          function pie(data) {
            var n = data.length, values = data.map(function(d, i) {
              return +value.call(pie, d, i);
            }), a = +(typeof startAngle === "function" ? startAngle.apply(this, arguments) : startAngle), da = (typeof endAngle === "function" ? endAngle.apply(this, arguments) : endAngle) - a, p = Math.min(Math.abs(da) / n, +(typeof padAngle === "function" ? padAngle.apply(this, arguments) : padAngle)), pa = p * (da < 0 ? -1 : 1), sum = d32.sum(values), k = sum ? (da - n * pa) / sum : 0, index = d32.range(n), arcs = [], v;
            if (sort != null) index.sort(sort === d3_layout_pieSortByValue ? function(i, j) {
              return values[j] - values[i];
            } : function(i, j) {
              return sort(data[i], data[j]);
            });
            index.forEach(function(i) {
              arcs[i] = {
                data: data[i],
                value: v = values[i],
                startAngle: a,
                endAngle: a += v * k + pa,
                padAngle: p
              };
            });
            return arcs;
          }
          pie.value = function(_) {
            if (!arguments.length) return value;
            value = _;
            return pie;
          };
          pie.sort = function(_) {
            if (!arguments.length) return sort;
            sort = _;
            return pie;
          };
          pie.startAngle = function(_) {
            if (!arguments.length) return startAngle;
            startAngle = _;
            return pie;
          };
          pie.endAngle = function(_) {
            if (!arguments.length) return endAngle;
            endAngle = _;
            return pie;
          };
          pie.padAngle = function(_) {
            if (!arguments.length) return padAngle;
            padAngle = _;
            return pie;
          };
          return pie;
        };
        var d3_layout_pieSortByValue = {};
        d32.layout.stack = function() {
          var values = d3_identity, order = d3_layout_stackOrderDefault, offset = d3_layout_stackOffsetZero, out = d3_layout_stackOut, x = d3_layout_stackX, y = d3_layout_stackY;
          function stack(data, index) {
            if (!(n = data.length)) return data;
            var series = data.map(function(d, i2) {
              return values.call(stack, d, i2);
            });
            var points = series.map(function(d) {
              return d.map(function(v, i2) {
                return [x.call(stack, v, i2), y.call(stack, v, i2)];
              });
            });
            var orders = order.call(stack, points, index);
            series = d32.permute(series, orders);
            points = d32.permute(points, orders);
            var offsets = offset.call(stack, points, index);
            var m = series[0].length, n, i, j, o;
            for (j = 0; j < m; ++j) {
              out.call(stack, series[0][j], o = offsets[j], points[0][j][1]);
              for (i = 1; i < n; ++i) {
                out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
              }
            }
            return data;
          }
          stack.values = function(x2) {
            if (!arguments.length) return values;
            values = x2;
            return stack;
          };
          stack.order = function(x2) {
            if (!arguments.length) return order;
            order = typeof x2 === "function" ? x2 : d3_layout_stackOrders.get(x2) || d3_layout_stackOrderDefault;
            return stack;
          };
          stack.offset = function(x2) {
            if (!arguments.length) return offset;
            offset = typeof x2 === "function" ? x2 : d3_layout_stackOffsets.get(x2) || d3_layout_stackOffsetZero;
            return stack;
          };
          stack.x = function(z) {
            if (!arguments.length) return x;
            x = z;
            return stack;
          };
          stack.y = function(z) {
            if (!arguments.length) return y;
            y = z;
            return stack;
          };
          stack.out = function(z) {
            if (!arguments.length) return out;
            out = z;
            return stack;
          };
          return stack;
        };
        function d3_layout_stackX(d) {
          return d.x;
        }
        function d3_layout_stackY(d) {
          return d.y;
        }
        function d3_layout_stackOut(d, y0, y) {
          d.y0 = y0;
          d.y = y;
        }
        var d3_layout_stackOrders = d32.map({
          "inside-out": function(data) {
            var n = data.length, i, j, max = data.map(d3_layout_stackMaxIndex), sums = data.map(d3_layout_stackReduceSum), index = d32.range(n).sort(function(a, b) {
              return max[a] - max[b];
            }), top = 0, bottom = 0, tops = [], bottoms = [];
            for (i = 0; i < n; ++i) {
              j = index[i];
              if (top < bottom) {
                top += sums[j];
                tops.push(j);
              } else {
                bottom += sums[j];
                bottoms.push(j);
              }
            }
            return bottoms.reverse().concat(tops);
          },
          reverse: function(data) {
            return d32.range(data.length).reverse();
          },
          "default": d3_layout_stackOrderDefault
        });
        var d3_layout_stackOffsets = d32.map({
          silhouette: function(data) {
            var n = data.length, m = data[0].length, sums = [], max = 0, i, j, o, y0 = [];
            for (j = 0; j < m; ++j) {
              for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
              if (o > max) max = o;
              sums.push(o);
            }
            for (j = 0; j < m; ++j) {
              y0[j] = (max - sums[j]) / 2;
            }
            return y0;
          },
          wiggle: function(data) {
            var n = data.length, x = data[0], m = x.length, i, j, k, s1, s2, s3, dx, o, o0, y0 = [];
            y0[0] = o = o0 = 0;
            for (j = 1; j < m; ++j) {
              for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j][1];
              for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0]; i < n; ++i) {
                for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); k < i; ++k) {
                  s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
                }
                s2 += s3 * data[i][j][1];
              }
              y0[j] = o -= s1 ? s2 / s1 * dx : 0;
              if (o < o0) o0 = o;
            }
            for (j = 0; j < m; ++j) y0[j] -= o0;
            return y0;
          },
          expand: function(data) {
            var n = data.length, m = data[0].length, k = 1 / n, i, j, o, y0 = [];
            for (j = 0; j < m; ++j) {
              for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
              if (o) for (i = 0; i < n; i++) data[i][j][1] /= o;
              else for (i = 0; i < n; i++) data[i][j][1] = k;
            }
            for (j = 0; j < m; ++j) y0[j] = 0;
            return y0;
          },
          zero: d3_layout_stackOffsetZero
        });
        function d3_layout_stackOrderDefault(data) {
          return d32.range(data.length);
        }
        function d3_layout_stackOffsetZero(data) {
          var j = -1, m = data[0].length, y0 = [];
          while (++j < m) y0[j] = 0;
          return y0;
        }
        function d3_layout_stackMaxIndex(array) {
          var i = 1, j = 0, v = array[0][1], k, n = array.length;
          for (; i < n; ++i) {
            if ((k = array[i][1]) > v) {
              j = i;
              v = k;
            }
          }
          return j;
        }
        function d3_layout_stackReduceSum(d) {
          return d.reduce(d3_layout_stackSum, 0);
        }
        function d3_layout_stackSum(p, d) {
          return p + d[1];
        }
        d32.layout.histogram = function() {
          var frequency = true, valuer = Number, ranger = d3_layout_histogramRange, binner = d3_layout_histogramBinSturges;
          function histogram(data, i) {
            var bins = [], values = data.map(valuer, this), range = ranger.call(this, values, i), thresholds = binner.call(this, range, values, i), bin, i = -1, n = values.length, m = thresholds.length - 1, k = frequency ? 1 : 1 / n, x;
            while (++i < m) {
              bin = bins[i] = [];
              bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
              bin.y = 0;
            }
            if (m > 0) {
              i = -1;
              while (++i < n) {
                x = values[i];
                if (x >= range[0] && x <= range[1]) {
                  bin = bins[d32.bisect(thresholds, x, 1, m) - 1];
                  bin.y += k;
                  bin.push(data[i]);
                }
              }
            }
            return bins;
          }
          histogram.value = function(x) {
            if (!arguments.length) return valuer;
            valuer = x;
            return histogram;
          };
          histogram.range = function(x) {
            if (!arguments.length) return ranger;
            ranger = d3_functor(x);
            return histogram;
          };
          histogram.bins = function(x) {
            if (!arguments.length) return binner;
            binner = typeof x === "number" ? function(range) {
              return d3_layout_histogramBinFixed(range, x);
            } : d3_functor(x);
            return histogram;
          };
          histogram.frequency = function(x) {
            if (!arguments.length) return frequency;
            frequency = !!x;
            return histogram;
          };
          return histogram;
        };
        function d3_layout_histogramBinSturges(range, values) {
          return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
        }
        function d3_layout_histogramBinFixed(range, n) {
          var x = -1, b = +range[0], m = (range[1] - b) / n, f = [];
          while (++x <= n) f[x] = m * x + b;
          return f;
        }
        function d3_layout_histogramRange(values) {
          return [d32.min(values), d32.max(values)];
        }
        d32.layout.pack = function() {
          var hierarchy = d32.layout.hierarchy().sort(d3_layout_packSort), padding = 0, size = [1, 1], radius;
          function pack(d, i) {
            var nodes = hierarchy.call(this, d, i), root = nodes[0], w = size[0], h = size[1], r = radius == null ? Math.sqrt : typeof radius === "function" ? radius : function() {
              return radius;
            };
            root.x = root.y = 0;
            d3_layout_hierarchyVisitAfter(root, function(d2) {
              d2.r = +r(d2.value);
            });
            d3_layout_hierarchyVisitAfter(root, d3_layout_packSiblings);
            if (padding) {
              var dr = padding * (radius ? 1 : Math.max(2 * root.r / w, 2 * root.r / h)) / 2;
              d3_layout_hierarchyVisitAfter(root, function(d2) {
                d2.r += dr;
              });
              d3_layout_hierarchyVisitAfter(root, d3_layout_packSiblings);
              d3_layout_hierarchyVisitAfter(root, function(d2) {
                d2.r -= dr;
              });
            }
            d3_layout_packTransform(root, w / 2, h / 2, radius ? 1 : 1 / Math.max(2 * root.r / w, 2 * root.r / h));
            return nodes;
          }
          pack.size = function(_) {
            if (!arguments.length) return size;
            size = _;
            return pack;
          };
          pack.radius = function(_) {
            if (!arguments.length) return radius;
            radius = _ == null || typeof _ === "function" ? _ : +_;
            return pack;
          };
          pack.padding = function(_) {
            if (!arguments.length) return padding;
            padding = +_;
            return pack;
          };
          return d3_layout_hierarchyRebind(pack, hierarchy);
        };
        function d3_layout_packSort(a, b) {
          return a.value - b.value;
        }
        function d3_layout_packInsert(a, b) {
          var c = a._pack_next;
          a._pack_next = b;
          b._pack_prev = a;
          b._pack_next = c;
          c._pack_prev = b;
        }
        function d3_layout_packSplice(a, b) {
          a._pack_next = b;
          b._pack_prev = a;
        }
        function d3_layout_packIntersects(a, b) {
          var dx = b.x - a.x, dy = b.y - a.y, dr = a.r + b.r;
          return 0.999 * dr * dr > dx * dx + dy * dy;
        }
        function d3_layout_packSiblings(node) {
          if (!(nodes = node.children) || !(n = nodes.length)) return;
          var nodes, xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity, a, b, c, i, j, k, n;
          function bound(node2) {
            xMin = Math.min(node2.x - node2.r, xMin);
            xMax = Math.max(node2.x + node2.r, xMax);
            yMin = Math.min(node2.y - node2.r, yMin);
            yMax = Math.max(node2.y + node2.r, yMax);
          }
          nodes.forEach(d3_layout_packLink);
          a = nodes[0];
          a.x = -a.r;
          a.y = 0;
          bound(a);
          if (n > 1) {
            b = nodes[1];
            b.x = b.r;
            b.y = 0;
            bound(b);
            if (n > 2) {
              c = nodes[2];
              d3_layout_packPlace(a, b, c);
              bound(c);
              d3_layout_packInsert(a, c);
              a._pack_prev = c;
              d3_layout_packInsert(c, b);
              b = a._pack_next;
              for (i = 3; i < n; i++) {
                d3_layout_packPlace(a, b, c = nodes[i]);
                var isect = 0, s1 = 1, s2 = 1;
                for (j = b._pack_next; j !== b; j = j._pack_next, s1++) {
                  if (d3_layout_packIntersects(j, c)) {
                    isect = 1;
                    break;
                  }
                }
                if (isect == 1) {
                  for (k = a._pack_prev; k !== j._pack_prev; k = k._pack_prev, s2++) {
                    if (d3_layout_packIntersects(k, c)) {
                      break;
                    }
                  }
                }
                if (isect) {
                  if (s1 < s2 || s1 == s2 && b.r < a.r) d3_layout_packSplice(a, b = j);
                  else d3_layout_packSplice(a = k, b);
                  i--;
                } else {
                  d3_layout_packInsert(a, c);
                  b = c;
                  bound(c);
                }
              }
            }
          }
          var cx = (xMin + xMax) / 2, cy = (yMin + yMax) / 2, cr = 0;
          for (i = 0; i < n; i++) {
            c = nodes[i];
            c.x -= cx;
            c.y -= cy;
            cr = Math.max(cr, c.r + Math.sqrt(c.x * c.x + c.y * c.y));
          }
          node.r = cr;
          nodes.forEach(d3_layout_packUnlink);
        }
        function d3_layout_packLink(node) {
          node._pack_next = node._pack_prev = node;
        }
        function d3_layout_packUnlink(node) {
          delete node._pack_next;
          delete node._pack_prev;
        }
        function d3_layout_packTransform(node, x, y, k) {
          var children = node.children;
          node.x = x += k * node.x;
          node.y = y += k * node.y;
          node.r *= k;
          if (children) {
            var i = -1, n = children.length;
            while (++i < n) d3_layout_packTransform(children[i], x, y, k);
          }
        }
        function d3_layout_packPlace(a, b, c) {
          var db = a.r + c.r, dx = b.x - a.x, dy = b.y - a.y;
          if (db && (dx || dy)) {
            var da = b.r + c.r, dc = dx * dx + dy * dy;
            da *= da;
            db *= db;
            var x = 0.5 + (db - da) / (2 * dc), y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
            c.x = a.x + x * dx + y * dy;
            c.y = a.y + x * dy - y * dx;
          } else {
            c.x = a.x + db;
            c.y = a.y;
          }
        }
        d32.layout.tree = function() {
          var hierarchy = d32.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [1, 1], nodeSize = null;
          function tree(d, i) {
            var nodes = hierarchy.call(this, d, i), root0 = nodes[0], root1 = wrapTree(root0);
            d3_layout_hierarchyVisitAfter(root1, firstWalk), root1.parent.m = -root1.z;
            d3_layout_hierarchyVisitBefore(root1, secondWalk);
            if (nodeSize) d3_layout_hierarchyVisitBefore(root0, sizeNode);
            else {
              var left = root0, right = root0, bottom = root0;
              d3_layout_hierarchyVisitBefore(root0, function(node) {
                if (node.x < left.x) left = node;
                if (node.x > right.x) right = node;
                if (node.depth > bottom.depth) bottom = node;
              });
              var tx = separation(left, right) / 2 - left.x, kx = size[0] / (right.x + separation(right, left) / 2 + tx), ky = size[1] / (bottom.depth || 1);
              d3_layout_hierarchyVisitBefore(root0, function(node) {
                node.x = (node.x + tx) * kx;
                node.y = node.depth * ky;
              });
            }
            return nodes;
          }
          function wrapTree(root0) {
            var root1 = {
              A: null,
              children: [root0]
            }, queue = [root1], node1;
            while ((node1 = queue.pop()) != null) {
              for (var children = node1.children, child, i = 0, n = children.length; i < n; ++i) {
                queue.push((children[i] = child = {
                  _: children[i],
                  parent: node1,
                  children: (child = children[i].children) && child.slice() || [],
                  A: null,
                  a: null,
                  z: 0,
                  m: 0,
                  c: 0,
                  s: 0,
                  t: null,
                  i
                }).a = child);
              }
            }
            return root1.children[0];
          }
          function firstWalk(v) {
            var children = v.children, siblings = v.parent.children, w = v.i ? siblings[v.i - 1] : null;
            if (children.length) {
              d3_layout_treeShift(v);
              var midpoint = (children[0].z + children[children.length - 1].z) / 2;
              if (w) {
                v.z = w.z + separation(v._, w._);
                v.m = v.z - midpoint;
              } else {
                v.z = midpoint;
              }
            } else if (w) {
              v.z = w.z + separation(v._, w._);
            }
            v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
          }
          function secondWalk(v) {
            v._.x = v.z + v.parent.m;
            v.m += v.parent.m;
          }
          function apportion(v, w, ancestor) {
            if (w) {
              var vip = v, vop = v, vim = w, vom = vip.parent.children[0], sip = vip.m, sop = vop.m, sim = vim.m, som = vom.m, shift;
              while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
                vom = d3_layout_treeLeft(vom);
                vop = d3_layout_treeRight(vop);
                vop.a = v;
                shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
                if (shift > 0) {
                  d3_layout_treeMove(d3_layout_treeAncestor(vim, v, ancestor), v, shift);
                  sip += shift;
                  sop += shift;
                }
                sim += vim.m;
                sip += vip.m;
                som += vom.m;
                sop += vop.m;
              }
              if (vim && !d3_layout_treeRight(vop)) {
                vop.t = vim;
                vop.m += sim - sop;
              }
              if (vip && !d3_layout_treeLeft(vom)) {
                vom.t = vip;
                vom.m += sip - som;
                ancestor = v;
              }
            }
            return ancestor;
          }
          function sizeNode(node) {
            node.x *= size[0];
            node.y = node.depth * size[1];
          }
          tree.separation = function(x) {
            if (!arguments.length) return separation;
            separation = x;
            return tree;
          };
          tree.size = function(x) {
            if (!arguments.length) return nodeSize ? null : size;
            nodeSize = (size = x) == null ? sizeNode : null;
            return tree;
          };
          tree.nodeSize = function(x) {
            if (!arguments.length) return nodeSize ? size : null;
            nodeSize = (size = x) == null ? null : sizeNode;
            return tree;
          };
          return d3_layout_hierarchyRebind(tree, hierarchy);
        };
        function d3_layout_treeSeparation(a, b) {
          return a.parent == b.parent ? 1 : 2;
        }
        function d3_layout_treeLeft(v) {
          var children = v.children;
          return children.length ? children[0] : v.t;
        }
        function d3_layout_treeRight(v) {
          var children = v.children, n;
          return (n = children.length) ? children[n - 1] : v.t;
        }
        function d3_layout_treeMove(wm, wp, shift) {
          var change = shift / (wp.i - wm.i);
          wp.c -= change;
          wp.s += shift;
          wm.c += change;
          wp.z += shift;
          wp.m += shift;
        }
        function d3_layout_treeShift(v) {
          var shift = 0, change = 0, children = v.children, i = children.length, w;
          while (--i >= 0) {
            w = children[i];
            w.z += shift;
            w.m += shift;
            shift += w.s + (change += w.c);
          }
        }
        function d3_layout_treeAncestor(vim, v, ancestor) {
          return vim.a.parent === v.parent ? vim.a : ancestor;
        }
        d32.layout.cluster = function() {
          var hierarchy = d32.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [1, 1], nodeSize = false;
          function cluster(d, i) {
            var nodes = hierarchy.call(this, d, i), root = nodes[0], previousNode, x = 0;
            d3_layout_hierarchyVisitAfter(root, function(node) {
              var children = node.children;
              if (children && children.length) {
                node.x = d3_layout_clusterX(children);
                node.y = d3_layout_clusterY(children);
              } else {
                node.x = previousNode ? x += separation(node, previousNode) : 0;
                node.y = 0;
                previousNode = node;
              }
            });
            var left = d3_layout_clusterLeft(root), right = d3_layout_clusterRight(root), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2;
            d3_layout_hierarchyVisitAfter(root, nodeSize ? function(node) {
              node.x = (node.x - root.x) * size[0];
              node.y = (root.y - node.y) * size[1];
            } : function(node) {
              node.x = (node.x - x0) / (x1 - x0) * size[0];
              node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1];
            });
            return nodes;
          }
          cluster.separation = function(x) {
            if (!arguments.length) return separation;
            separation = x;
            return cluster;
          };
          cluster.size = function(x) {
            if (!arguments.length) return nodeSize ? null : size;
            nodeSize = (size = x) == null;
            return cluster;
          };
          cluster.nodeSize = function(x) {
            if (!arguments.length) return nodeSize ? size : null;
            nodeSize = (size = x) != null;
            return cluster;
          };
          return d3_layout_hierarchyRebind(cluster, hierarchy);
        };
        function d3_layout_clusterY(children) {
          return 1 + d32.max(children, function(child) {
            return child.y;
          });
        }
        function d3_layout_clusterX(children) {
          return children.reduce(function(x, child) {
            return x + child.x;
          }, 0) / children.length;
        }
        function d3_layout_clusterLeft(node) {
          var children = node.children;
          return children && children.length ? d3_layout_clusterLeft(children[0]) : node;
        }
        function d3_layout_clusterRight(node) {
          var children = node.children, n;
          return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node;
        }
        d32.layout.treemap = function() {
          var hierarchy = d32.layout.hierarchy(), round = Math.round, size = [1, 1], padding = null, pad = d3_layout_treemapPadNull, sticky = false, stickies, mode = "squarify", ratio = 0.5 * (1 + Math.sqrt(5));
          function scale(children, k) {
            var i = -1, n = children.length, child, area;
            while (++i < n) {
              area = (child = children[i]).value * (k < 0 ? 0 : k);
              child.area = isNaN(area) || area <= 0 ? 0 : area;
            }
          }
          function squarify(node) {
            var children = node.children;
            if (children && children.length) {
              var rect = pad(node), row = [], remaining = children.slice(), child, best = Infinity, score, u = mode === "slice" ? rect.dx : mode === "dice" ? rect.dy : mode === "slice-dice" ? node.depth & 1 ? rect.dy : rect.dx : Math.min(rect.dx, rect.dy), n;
              scale(remaining, rect.dx * rect.dy / node.value);
              row.area = 0;
              while ((n = remaining.length) > 0) {
                row.push(child = remaining[n - 1]);
                row.area += child.area;
                if (mode !== "squarify" || (score = worst(row, u)) <= best) {
                  remaining.pop();
                  best = score;
                } else {
                  row.area -= row.pop().area;
                  position(row, u, rect, false);
                  u = Math.min(rect.dx, rect.dy);
                  row.length = row.area = 0;
                  best = Infinity;
                }
              }
              if (row.length) {
                position(row, u, rect, true);
                row.length = row.area = 0;
              }
              children.forEach(squarify);
            }
          }
          function stickify(node) {
            var children = node.children;
            if (children && children.length) {
              var rect = pad(node), remaining = children.slice(), child, row = [];
              scale(remaining, rect.dx * rect.dy / node.value);
              row.area = 0;
              while (child = remaining.pop()) {
                row.push(child);
                row.area += child.area;
                if (child.z != null) {
                  position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length);
                  row.length = row.area = 0;
                }
              }
              children.forEach(stickify);
            }
          }
          function worst(row, u) {
            var s = row.area, r, rmax = 0, rmin = Infinity, i = -1, n = row.length;
            while (++i < n) {
              if (!(r = row[i].area)) continue;
              if (r < rmin) rmin = r;
              if (r > rmax) rmax = r;
            }
            s *= s;
            u *= u;
            return s ? Math.max(u * rmax * ratio / s, s / (u * rmin * ratio)) : Infinity;
          }
          function position(row, u, rect, flush) {
            var i = -1, n = row.length, x = rect.x, y = rect.y, v = u ? round(row.area / u) : 0, o;
            if (u == rect.dx) {
              if (flush || v > rect.dy) v = rect.dy;
              while (++i < n) {
                o = row[i];
                o.x = x;
                o.y = y;
                o.dy = v;
                x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0);
              }
              o.z = true;
              o.dx += rect.x + rect.dx - x;
              rect.y += v;
              rect.dy -= v;
            } else {
              if (flush || v > rect.dx) v = rect.dx;
              while (++i < n) {
                o = row[i];
                o.x = x;
                o.y = y;
                o.dx = v;
                y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0);
              }
              o.z = false;
              o.dy += rect.y + rect.dy - y;
              rect.x += v;
              rect.dx -= v;
            }
          }
          function treemap(d) {
            var nodes = stickies || hierarchy(d), root = nodes[0];
            root.x = root.y = 0;
            if (root.value) root.dx = size[0], root.dy = size[1];
            else root.dx = root.dy = 0;
            if (stickies) hierarchy.revalue(root);
            scale([root], root.dx * root.dy / root.value);
            (stickies ? stickify : squarify)(root);
            if (sticky) stickies = nodes;
            return nodes;
          }
          treemap.size = function(x) {
            if (!arguments.length) return size;
            size = x;
            return treemap;
          };
          treemap.padding = function(x) {
            if (!arguments.length) return padding;
            function padFunction(node) {
              var p = x.call(treemap, node, node.depth);
              return p == null ? d3_layout_treemapPadNull(node) : d3_layout_treemapPad(node, typeof p === "number" ? [p, p, p, p] : p);
            }
            function padConstant(node) {
              return d3_layout_treemapPad(node, x);
            }
            var type;
            pad = (padding = x) == null ? d3_layout_treemapPadNull : (type = typeof x) === "function" ? padFunction : type === "number" ? (x = [x, x, x, x], padConstant) : padConstant;
            return treemap;
          };
          treemap.round = function(x) {
            if (!arguments.length) return round != Number;
            round = x ? Math.round : Number;
            return treemap;
          };
          treemap.sticky = function(x) {
            if (!arguments.length) return sticky;
            sticky = x;
            stickies = null;
            return treemap;
          };
          treemap.ratio = function(x) {
            if (!arguments.length) return ratio;
            ratio = x;
            return treemap;
          };
          treemap.mode = function(x) {
            if (!arguments.length) return mode;
            mode = x + "";
            return treemap;
          };
          return d3_layout_hierarchyRebind(treemap, hierarchy);
        };
        function d3_layout_treemapPadNull(node) {
          return {
            x: node.x,
            y: node.y,
            dx: node.dx,
            dy: node.dy
          };
        }
        function d3_layout_treemapPad(node, padding) {
          var x = node.x + padding[3], y = node.y + padding[0], dx = node.dx - padding[1] - padding[3], dy = node.dy - padding[0] - padding[2];
          if (dx < 0) {
            x += dx / 2;
            dx = 0;
          }
          if (dy < 0) {
            y += dy / 2;
            dy = 0;
          }
          return {
            x,
            y,
            dx,
            dy
          };
        }
        d32.random = {
          normal: function(\u00B5, \u03C3) {
            var n = arguments.length;
            if (n < 2) \u03C3 = 1;
            if (n < 1) \u00B5 = 0;
            return function() {
              var x, y, r;
              do {
                x = Math.random() * 2 - 1;
                y = Math.random() * 2 - 1;
                r = x * x + y * y;
              } while (!r || r > 1);
              return \u00B5 + \u03C3 * x * Math.sqrt(-2 * Math.log(r) / r);
            };
          },
          logNormal: function() {
            var random = d32.random.normal.apply(d32, arguments);
            return function() {
              return Math.exp(random());
            };
          },
          bates: function(m) {
            var random = d32.random.irwinHall(m);
            return function() {
              return random() / m;
            };
          },
          irwinHall: function(m) {
            return function() {
              for (var s = 0, j = 0; j < m; j++) s += Math.random();
              return s;
            };
          }
        };
        d32.scale = {};
        function d3_scaleExtent(domain) {
          var start = domain[0], stop = domain[domain.length - 1];
          return start < stop ? [start, stop] : [stop, start];
        }
        function d3_scaleRange(scale) {
          return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
        }
        function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
          var u = uninterpolate(domain[0], domain[1]), i = interpolate(range[0], range[1]);
          return function(x) {
            return i(u(x));
          };
        }
        function d3_scale_nice(domain, nice) {
          var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], dx;
          if (x1 < x0) {
            dx = i0, i0 = i1, i1 = dx;
            dx = x0, x0 = x1, x1 = dx;
          }
          domain[i0] = nice.floor(x0);
          domain[i1] = nice.ceil(x1);
          return domain;
        }
        function d3_scale_niceStep(step) {
          return step ? {
            floor: function(x) {
              return Math.floor(x / step) * step;
            },
            ceil: function(x) {
              return Math.ceil(x / step) * step;
            }
          } : d3_scale_niceIdentity;
        }
        var d3_scale_niceIdentity = {
          floor: d3_identity,
          ceil: d3_identity
        };
        function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
          var u = [], i = [], j = 0, k = Math.min(domain.length, range.length) - 1;
          if (domain[k] < domain[0]) {
            domain = domain.slice().reverse();
            range = range.slice().reverse();
          }
          while (++j <= k) {
            u.push(uninterpolate(domain[j - 1], domain[j]));
            i.push(interpolate(range[j - 1], range[j]));
          }
          return function(x) {
            var j2 = d32.bisect(domain, x, 1, k) - 1;
            return i[j2](u[j2](x));
          };
        }
        d32.scale.linear = function() {
          return d3_scale_linear([0, 1], [0, 1], d3_interpolate, false);
        };
        function d3_scale_linear(domain, range, interpolate, clamp) {
          var output, input;
          function rescale() {
            var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear, uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
            output = linear(domain, range, uninterpolate, interpolate);
            input = linear(range, domain, uninterpolate, d3_interpolate);
            return scale;
          }
          function scale(x) {
            return output(x);
          }
          scale.invert = function(y) {
            return input(y);
          };
          scale.domain = function(x) {
            if (!arguments.length) return domain;
            domain = x.map(Number);
            return rescale();
          };
          scale.range = function(x) {
            if (!arguments.length) return range;
            range = x;
            return rescale();
          };
          scale.rangeRound = function(x) {
            return scale.range(x).interpolate(d3_interpolateRound);
          };
          scale.clamp = function(x) {
            if (!arguments.length) return clamp;
            clamp = x;
            return rescale();
          };
          scale.interpolate = function(x) {
            if (!arguments.length) return interpolate;
            interpolate = x;
            return rescale();
          };
          scale.ticks = function(m) {
            return d3_scale_linearTicks(domain, m);
          };
          scale.tickFormat = function(m, format) {
            return d3_scale_linearTickFormat(domain, m, format);
          };
          scale.nice = function(m) {
            d3_scale_linearNice(domain, m);
            return rescale();
          };
          scale.copy = function() {
            return d3_scale_linear(domain, range, interpolate, clamp);
          };
          return rescale();
        }
        function d3_scale_linearRebind(scale, linear) {
          return d32.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
        }
        function d3_scale_linearNice(domain, m) {
          d3_scale_nice(domain, d3_scale_niceStep(d3_scale_linearTickRange(domain, m)[2]));
          d3_scale_nice(domain, d3_scale_niceStep(d3_scale_linearTickRange(domain, m)[2]));
          return domain;
        }
        function d3_scale_linearTickRange(domain, m) {
          if (m == null) m = 10;
          var extent = d3_scaleExtent(domain), span = extent[1] - extent[0], step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)), err = m / span * step;
          if (err <= 0.15) step *= 10;
          else if (err <= 0.35) step *= 5;
          else if (err <= 0.75) step *= 2;
          extent[0] = Math.ceil(extent[0] / step) * step;
          extent[1] = Math.floor(extent[1] / step) * step + step * 0.5;
          extent[2] = step;
          return extent;
        }
        function d3_scale_linearTicks(domain, m) {
          return d32.range.apply(d32, d3_scale_linearTickRange(domain, m));
        }
        function d3_scale_linearTickFormat(domain, m, format) {
          var range = d3_scale_linearTickRange(domain, m);
          if (format) {
            var match = d3_format_re.exec(format);
            match.shift();
            if (match[8] === "s") {
              var prefix = d32.formatPrefix(Math.max(abs(range[0]), abs(range[1])));
              if (!match[7]) match[7] = "." + d3_scale_linearPrecision(prefix.scale(range[2]));
              match[8] = "f";
              format = d32.format(match.join(""));
              return function(d) {
                return format(prefix.scale(d)) + prefix.symbol;
              };
            }
            if (!match[7]) match[7] = "." + d3_scale_linearFormatPrecision(match[8], range);
            format = match.join("");
          } else {
            format = ",." + d3_scale_linearPrecision(range[2]) + "f";
          }
          return d32.format(format);
        }
        var d3_scale_linearFormatSignificant = {
          s: 1,
          g: 1,
          p: 1,
          r: 1,
          e: 1
        };
        function d3_scale_linearPrecision(value) {
          return -Math.floor(Math.log(value) / Math.LN10 + 0.01);
        }
        function d3_scale_linearFormatPrecision(type, range) {
          var p = d3_scale_linearPrecision(range[2]);
          return type in d3_scale_linearFormatSignificant ? Math.abs(p - d3_scale_linearPrecision(Math.max(abs(range[0]), abs(range[1])))) + +(type !== "e") : p - (type === "%") * 2;
        }
        d32.scale.log = function() {
          return d3_scale_log(d32.scale.linear().domain([0, 1]), 10, true, [1, 10]);
        };
        function d3_scale_log(linear, base, positive, domain) {
          function log(x) {
            return (positive ? Math.log(x < 0 ? 0 : x) : -Math.log(x > 0 ? 0 : -x)) / Math.log(base);
          }
          function pow(x) {
            return positive ? Math.pow(base, x) : -Math.pow(base, -x);
          }
          function scale(x) {
            return linear(log(x));
          }
          scale.invert = function(x) {
            return pow(linear.invert(x));
          };
          scale.domain = function(x) {
            if (!arguments.length) return domain;
            positive = x[0] >= 0;
            linear.domain((domain = x.map(Number)).map(log));
            return scale;
          };
          scale.base = function(_) {
            if (!arguments.length) return base;
            base = +_;
            linear.domain(domain.map(log));
            return scale;
          };
          scale.nice = function() {
            var niced = d3_scale_nice(domain.map(log), positive ? Math : d3_scale_logNiceNegative);
            linear.domain(niced);
            domain = niced.map(pow);
            return scale;
          };
          scale.ticks = function() {
            var extent = d3_scaleExtent(domain), ticks = [], u = extent[0], v = extent[1], i = Math.floor(log(u)), j = Math.ceil(log(v)), n = base % 1 ? 2 : base;
            if (isFinite(j - i)) {
              if (positive) {
                for (; i < j; i++) for (var k = 1; k < n; k++) ticks.push(pow(i) * k);
                ticks.push(pow(i));
              } else {
                ticks.push(pow(i));
                for (; i++ < j; ) for (var k = n - 1; k > 0; k--) ticks.push(pow(i) * k);
              }
              for (i = 0; ticks[i] < u; i++) {
              }
              for (j = ticks.length; ticks[j - 1] > v; j--) {
              }
              ticks = ticks.slice(i, j);
            }
            return ticks;
          };
          scale.tickFormat = function(n, format) {
            if (!arguments.length) return d3_scale_logFormat;
            if (arguments.length < 2) format = d3_scale_logFormat;
            else if (typeof format !== "function") format = d32.format(format);
            var k = Math.max(1, base * n / scale.ticks().length);
            return function(d) {
              var i = d / pow(Math.round(log(d)));
              if (i * base < base - 0.5) i *= base;
              return i <= k ? format(d) : "";
            };
          };
          scale.copy = function() {
            return d3_scale_log(linear.copy(), base, positive, domain);
          };
          return d3_scale_linearRebind(scale, linear);
        }
        var d3_scale_logFormat = d32.format(".0e"), d3_scale_logNiceNegative = {
          floor: function(x) {
            return -Math.ceil(-x);
          },
          ceil: function(x) {
            return -Math.floor(-x);
          }
        };
        d32.scale.pow = function() {
          return d3_scale_pow(d32.scale.linear(), 1, [0, 1]);
        };
        function d3_scale_pow(linear, exponent, domain) {
          var powp = d3_scale_powPow(exponent), powb = d3_scale_powPow(1 / exponent);
          function scale(x) {
            return linear(powp(x));
          }
          scale.invert = function(x) {
            return powb(linear.invert(x));
          };
          scale.domain = function(x) {
            if (!arguments.length) return domain;
            linear.domain((domain = x.map(Number)).map(powp));
            return scale;
          };
          scale.ticks = function(m) {
            return d3_scale_linearTicks(domain, m);
          };
          scale.tickFormat = function(m, format) {
            return d3_scale_linearTickFormat(domain, m, format);
          };
          scale.nice = function(m) {
            return scale.domain(d3_scale_linearNice(domain, m));
          };
          scale.exponent = function(x) {
            if (!arguments.length) return exponent;
            powp = d3_scale_powPow(exponent = x);
            powb = d3_scale_powPow(1 / exponent);
            linear.domain(domain.map(powp));
            return scale;
          };
          scale.copy = function() {
            return d3_scale_pow(linear.copy(), exponent, domain);
          };
          return d3_scale_linearRebind(scale, linear);
        }
        function d3_scale_powPow(e) {
          return function(x) {
            return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e);
          };
        }
        d32.scale.sqrt = function() {
          return d32.scale.pow().exponent(0.5);
        };
        d32.scale.ordinal = function() {
          return d3_scale_ordinal([], {
            t: "range",
            a: [[]]
          });
        };
        function d3_scale_ordinal(domain, ranger) {
          var index, range, rangeBand;
          function scale(x) {
            return range[((index.get(x) || (ranger.t === "range" ? index.set(x, domain.push(x)) : NaN)) - 1) % range.length];
          }
          function steps(start, step) {
            return d32.range(domain.length).map(function(i) {
              return start + step * i;
            });
          }
          scale.domain = function(x) {
            if (!arguments.length) return domain;
            domain = [];
            index = new d3_Map();
            var i = -1, n = x.length, xi;
            while (++i < n) if (!index.has(xi = x[i])) index.set(xi, domain.push(xi));
            return scale[ranger.t].apply(scale, ranger.a);
          };
          scale.range = function(x) {
            if (!arguments.length) return range;
            range = x;
            rangeBand = 0;
            ranger = {
              t: "range",
              a: arguments
            };
            return scale;
          };
          scale.rangePoints = function(x, padding) {
            if (arguments.length < 2) padding = 0;
            var start = x[0], stop = x[1], step = domain.length < 2 ? (start = (start + stop) / 2, 0) : (stop - start) / (domain.length - 1 + padding);
            range = steps(start + step * padding / 2, step);
            rangeBand = 0;
            ranger = {
              t: "rangePoints",
              a: arguments
            };
            return scale;
          };
          scale.rangeRoundPoints = function(x, padding) {
            if (arguments.length < 2) padding = 0;
            var start = x[0], stop = x[1], step = domain.length < 2 ? (start = stop = Math.round((start + stop) / 2), 0) : (stop - start) / (domain.length - 1 + padding) | 0;
            range = steps(start + Math.round(step * padding / 2 + (stop - start - (domain.length - 1 + padding) * step) / 2), step);
            rangeBand = 0;
            ranger = {
              t: "rangeRoundPoints",
              a: arguments
            };
            return scale;
          };
          scale.rangeBands = function(x, padding, outerPadding) {
            if (arguments.length < 2) padding = 0;
            if (arguments.length < 3) outerPadding = padding;
            var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = (stop - start) / (domain.length - padding + 2 * outerPadding);
            range = steps(start + step * outerPadding, step);
            if (reverse) range.reverse();
            rangeBand = step * (1 - padding);
            ranger = {
              t: "rangeBands",
              a: arguments
            };
            return scale;
          };
          scale.rangeRoundBands = function(x, padding, outerPadding) {
            if (arguments.length < 2) padding = 0;
            if (arguments.length < 3) outerPadding = padding;
            var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = Math.floor((stop - start) / (domain.length - padding + 2 * outerPadding));
            range = steps(start + Math.round((stop - start - (domain.length - padding) * step) / 2), step);
            if (reverse) range.reverse();
            rangeBand = Math.round(step * (1 - padding));
            ranger = {
              t: "rangeRoundBands",
              a: arguments
            };
            return scale;
          };
          scale.rangeBand = function() {
            return rangeBand;
          };
          scale.rangeExtent = function() {
            return d3_scaleExtent(ranger.a[0]);
          };
          scale.copy = function() {
            return d3_scale_ordinal(domain, ranger);
          };
          return scale.domain(domain);
        }
        d32.scale.category10 = function() {
          return d32.scale.ordinal().range(d3_category10);
        };
        d32.scale.category20 = function() {
          return d32.scale.ordinal().range(d3_category20);
        };
        d32.scale.category20b = function() {
          return d32.scale.ordinal().range(d3_category20b);
        };
        d32.scale.category20c = function() {
          return d32.scale.ordinal().range(d3_category20c);
        };
        var d3_category10 = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(d3_rgbString);
        var d3_category20 = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(d3_rgbString);
        var d3_category20b = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(d3_rgbString);
        var d3_category20c = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(d3_rgbString);
        d32.scale.quantile = function() {
          return d3_scale_quantile([], []);
        };
        function d3_scale_quantile(domain, range) {
          var thresholds;
          function rescale() {
            var k = 0, q = range.length;
            thresholds = [];
            while (++k < q) thresholds[k - 1] = d32.quantile(domain, k / q);
            return scale;
          }
          function scale(x) {
            if (!isNaN(x = +x)) return range[d32.bisect(thresholds, x)];
          }
          scale.domain = function(x) {
            if (!arguments.length) return domain;
            domain = x.map(d3_number).filter(d3_numeric).sort(d3_ascending);
            return rescale();
          };
          scale.range = function(x) {
            if (!arguments.length) return range;
            range = x;
            return rescale();
          };
          scale.quantiles = function() {
            return thresholds;
          };
          scale.invertExtent = function(y) {
            y = range.indexOf(y);
            return y < 0 ? [NaN, NaN] : [y > 0 ? thresholds[y - 1] : domain[0], y < thresholds.length ? thresholds[y] : domain[domain.length - 1]];
          };
          scale.copy = function() {
            return d3_scale_quantile(domain, range);
          };
          return rescale();
        }
        d32.scale.quantize = function() {
          return d3_scale_quantize(0, 1, [0, 1]);
        };
        function d3_scale_quantize(x0, x1, range) {
          var kx, i;
          function scale(x) {
            return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
          }
          function rescale() {
            kx = range.length / (x1 - x0);
            i = range.length - 1;
            return scale;
          }
          scale.domain = function(x) {
            if (!arguments.length) return [x0, x1];
            x0 = +x[0];
            x1 = +x[x.length - 1];
            return rescale();
          };
          scale.range = function(x) {
            if (!arguments.length) return range;
            range = x;
            return rescale();
          };
          scale.invertExtent = function(y) {
            y = range.indexOf(y);
            y = y < 0 ? NaN : y / kx + x0;
            return [y, y + 1 / kx];
          };
          scale.copy = function() {
            return d3_scale_quantize(x0, x1, range);
          };
          return rescale();
        }
        d32.scale.threshold = function() {
          return d3_scale_threshold([0.5], [0, 1]);
        };
        function d3_scale_threshold(domain, range) {
          function scale(x) {
            if (x <= x) return range[d32.bisect(domain, x)];
          }
          scale.domain = function(_) {
            if (!arguments.length) return domain;
            domain = _;
            return scale;
          };
          scale.range = function(_) {
            if (!arguments.length) return range;
            range = _;
            return scale;
          };
          scale.invertExtent = function(y) {
            y = range.indexOf(y);
            return [domain[y - 1], domain[y]];
          };
          scale.copy = function() {
            return d3_scale_threshold(domain, range);
          };
          return scale;
        }
        d32.scale.identity = function() {
          return d3_scale_identity([0, 1]);
        };
        function d3_scale_identity(domain) {
          function identity(x) {
            return +x;
          }
          identity.invert = identity;
          identity.domain = identity.range = function(x) {
            if (!arguments.length) return domain;
            domain = x.map(identity);
            return identity;
          };
          identity.ticks = function(m) {
            return d3_scale_linearTicks(domain, m);
          };
          identity.tickFormat = function(m, format) {
            return d3_scale_linearTickFormat(domain, m, format);
          };
          identity.copy = function() {
            return d3_scale_identity(domain);
          };
          return identity;
        }
        d32.svg = {};
        function d3_zero() {
          return 0;
        }
        d32.svg.arc = function() {
          var innerRadius = d3_svg_arcInnerRadius, outerRadius = d3_svg_arcOuterRadius, cornerRadius = d3_zero, padRadius = d3_svg_arcAuto, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle, padAngle = d3_svg_arcPadAngle;
          function arc() {
            var r0 = Math.max(0, +innerRadius.apply(this, arguments)), r1 = Math.max(0, +outerRadius.apply(this, arguments)), a0 = startAngle.apply(this, arguments) - half\u03C0, a1 = endAngle.apply(this, arguments) - half\u03C0, da = Math.abs(a1 - a0), cw = a0 > a1 ? 0 : 1;
            if (r1 < r0) rc = r1, r1 = r0, r0 = rc;
            if (da >= \u03C4\u03B5) return circleSegment(r1, cw) + (r0 ? circleSegment(r0, 1 - cw) : "") + "Z";
            var rc, cr, rp, ap, p0 = 0, p1 = 0, x0, y0, x1, y1, x2, y2, x3, y3, path = [];
            if (ap = (+padAngle.apply(this, arguments) || 0) / 2) {
              rp = padRadius === d3_svg_arcAuto ? Math.sqrt(r0 * r0 + r1 * r1) : +padRadius.apply(this, arguments);
              if (!cw) p1 *= -1;
              if (r1) p1 = d3_asin(rp / r1 * Math.sin(ap));
              if (r0) p0 = d3_asin(rp / r0 * Math.sin(ap));
            }
            if (r1) {
              x0 = r1 * Math.cos(a0 + p1);
              y0 = r1 * Math.sin(a0 + p1);
              x1 = r1 * Math.cos(a1 - p1);
              y1 = r1 * Math.sin(a1 - p1);
              var l1 = Math.abs(a1 - a0 - 2 * p1) <= \u03C0 ? 0 : 1;
              if (p1 && d3_svg_arcSweep(x0, y0, x1, y1) === cw ^ l1) {
                var h1 = (a0 + a1) / 2;
                x0 = r1 * Math.cos(h1);
                y0 = r1 * Math.sin(h1);
                x1 = y1 = null;
              }
            } else {
              x0 = y0 = 0;
            }
            if (r0) {
              x2 = r0 * Math.cos(a1 - p0);
              y2 = r0 * Math.sin(a1 - p0);
              x3 = r0 * Math.cos(a0 + p0);
              y3 = r0 * Math.sin(a0 + p0);
              var l0 = Math.abs(a0 - a1 + 2 * p0) <= \u03C0 ? 0 : 1;
              if (p0 && d3_svg_arcSweep(x2, y2, x3, y3) === 1 - cw ^ l0) {
                var h0 = (a0 + a1) / 2;
                x2 = r0 * Math.cos(h0);
                y2 = r0 * Math.sin(h0);
                x3 = y3 = null;
              }
            } else {
              x2 = y2 = 0;
            }
            if (da > \u03B5 && (rc = Math.min(Math.abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments))) > 1e-3) {
              cr = r0 < r1 ^ cw ? 0 : 1;
              var rc1 = rc, rc0 = rc;
              if (da < \u03C0) {
                var oc = x3 == null ? [x2, y2] : x1 == null ? [x0, y0] : d3_geom_polygonIntersect([x0, y0], [x3, y3], [x1, y1], [x2, y2]), ax = x0 - oc[0], ay = y0 - oc[1], bx = x1 - oc[0], by = y1 - oc[1], kc = 1 / Math.sin(Math.acos((ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))) / 2), lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
                rc0 = Math.min(rc, (r0 - lc) / (kc - 1));
                rc1 = Math.min(rc, (r1 - lc) / (kc + 1));
              }
              if (x1 != null) {
                var t30 = d3_svg_arcCornerTangents(x3 == null ? [x2, y2] : [x3, y3], [x0, y0], r1, rc1, cw), t12 = d3_svg_arcCornerTangents([x1, y1], [x2, y2], r1, rc1, cw);
                if (rc === rc1) {
                  path.push("M", t30[0], "A", rc1, ",", rc1, " 0 0,", cr, " ", t30[1], "A", r1, ",", r1, " 0 ", 1 - cw ^ d3_svg_arcSweep(t30[1][0], t30[1][1], t12[1][0], t12[1][1]), ",", cw, " ", t12[1], "A", rc1, ",", rc1, " 0 0,", cr, " ", t12[0]);
                } else {
                  path.push("M", t30[0], "A", rc1, ",", rc1, " 0 1,", cr, " ", t12[0]);
                }
              } else {
                path.push("M", x0, ",", y0);
              }
              if (x3 != null) {
                var t03 = d3_svg_arcCornerTangents([x0, y0], [x3, y3], r0, -rc0, cw), t21 = d3_svg_arcCornerTangents([x2, y2], x1 == null ? [x0, y0] : [x1, y1], r0, -rc0, cw);
                if (rc === rc0) {
                  path.push("L", t21[0], "A", rc0, ",", rc0, " 0 0,", cr, " ", t21[1], "A", r0, ",", r0, " 0 ", cw ^ d3_svg_arcSweep(t21[1][0], t21[1][1], t03[1][0], t03[1][1]), ",", 1 - cw, " ", t03[1], "A", rc0, ",", rc0, " 0 0,", cr, " ", t03[0]);
                } else {
                  path.push("L", t21[0], "A", rc0, ",", rc0, " 0 0,", cr, " ", t03[0]);
                }
              } else {
                path.push("L", x2, ",", y2);
              }
            } else {
              path.push("M", x0, ",", y0);
              if (x1 != null) path.push("A", r1, ",", r1, " 0 ", l1, ",", cw, " ", x1, ",", y1);
              path.push("L", x2, ",", y2);
              if (x3 != null) path.push("A", r0, ",", r0, " 0 ", l0, ",", 1 - cw, " ", x3, ",", y3);
            }
            path.push("Z");
            return path.join("");
          }
          function circleSegment(r1, cw) {
            return "M0," + r1 + "A" + r1 + "," + r1 + " 0 1," + cw + " 0," + -r1 + "A" + r1 + "," + r1 + " 0 1," + cw + " 0," + r1;
          }
          arc.innerRadius = function(v) {
            if (!arguments.length) return innerRadius;
            innerRadius = d3_functor(v);
            return arc;
          };
          arc.outerRadius = function(v) {
            if (!arguments.length) return outerRadius;
            outerRadius = d3_functor(v);
            return arc;
          };
          arc.cornerRadius = function(v) {
            if (!arguments.length) return cornerRadius;
            cornerRadius = d3_functor(v);
            return arc;
          };
          arc.padRadius = function(v) {
            if (!arguments.length) return padRadius;
            padRadius = v == d3_svg_arcAuto ? d3_svg_arcAuto : d3_functor(v);
            return arc;
          };
          arc.startAngle = function(v) {
            if (!arguments.length) return startAngle;
            startAngle = d3_functor(v);
            return arc;
          };
          arc.endAngle = function(v) {
            if (!arguments.length) return endAngle;
            endAngle = d3_functor(v);
            return arc;
          };
          arc.padAngle = function(v) {
            if (!arguments.length) return padAngle;
            padAngle = d3_functor(v);
            return arc;
          };
          arc.centroid = function() {
            var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2, a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - half\u03C0;
            return [Math.cos(a) * r, Math.sin(a) * r];
          };
          return arc;
        };
        var d3_svg_arcAuto = "auto";
        function d3_svg_arcInnerRadius(d) {
          return d.innerRadius;
        }
        function d3_svg_arcOuterRadius(d) {
          return d.outerRadius;
        }
        function d3_svg_arcStartAngle(d) {
          return d.startAngle;
        }
        function d3_svg_arcEndAngle(d) {
          return d.endAngle;
        }
        function d3_svg_arcPadAngle(d) {
          return d && d.padAngle;
        }
        function d3_svg_arcSweep(x0, y0, x1, y1) {
          return (x0 - x1) * y0 - (y0 - y1) * x0 > 0 ? 0 : 1;
        }
        function d3_svg_arcCornerTangents(p0, p1, r1, rc, cw) {
          var x01 = p0[0] - p1[0], y01 = p0[1] - p1[1], lo = (cw ? rc : -rc) / Math.sqrt(x01 * x01 + y01 * y01), ox = lo * y01, oy = -lo * x01, x1 = p0[0] + ox, y1 = p0[1] + oy, x2 = p1[0] + ox, y2 = p1[1] + oy, x3 = (x1 + x2) / 2, y3 = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, d2 = dx * dx + dy * dy, r = r1 - rc, D = x1 * y2 - x2 * y1, d = (dy < 0 ? -1 : 1) * Math.sqrt(Math.max(0, r * r * d2 - D * D)), cx0 = (D * dy - dx * d) / d2, cy0 = (-D * dx - dy * d) / d2, cx1 = (D * dy + dx * d) / d2, cy1 = (-D * dx + dy * d) / d2, dx0 = cx0 - x3, dy0 = cy0 - y3, dx1 = cx1 - x3, dy1 = cy1 - y3;
          if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
          return [[cx0 - ox, cy0 - oy], [cx0 * r1 / r, cy0 * r1 / r]];
        }
        function d3_svg_line(projection) {
          var x = d3_geom_pointX, y = d3_geom_pointY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, tension = 0.7;
          function line(data) {
            var segments = [], points = [], i = -1, n = data.length, d, fx = d3_functor(x), fy = d3_functor(y);
            function segment() {
              segments.push("M", interpolate(projection(points), tension));
            }
            while (++i < n) {
              if (defined.call(this, d = data[i], i)) {
                points.push([+fx.call(this, d, i), +fy.call(this, d, i)]);
              } else if (points.length) {
                segment();
                points = [];
              }
            }
            if (points.length) segment();
            return segments.length ? segments.join("") : null;
          }
          line.x = function(_) {
            if (!arguments.length) return x;
            x = _;
            return line;
          };
          line.y = function(_) {
            if (!arguments.length) return y;
            y = _;
            return line;
          };
          line.defined = function(_) {
            if (!arguments.length) return defined;
            defined = _;
            return line;
          };
          line.interpolate = function(_) {
            if (!arguments.length) return interpolateKey;
            if (typeof _ === "function") interpolateKey = interpolate = _;
            else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
            return line;
          };
          line.tension = function(_) {
            if (!arguments.length) return tension;
            tension = _;
            return line;
          };
          return line;
        }
        d32.svg.line = function() {
          return d3_svg_line(d3_identity);
        };
        var d3_svg_lineInterpolators = d32.map({
          linear: d3_svg_lineLinear,
          "linear-closed": d3_svg_lineLinearClosed,
          step: d3_svg_lineStep,
          "step-before": d3_svg_lineStepBefore,
          "step-after": d3_svg_lineStepAfter,
          basis: d3_svg_lineBasis,
          "basis-open": d3_svg_lineBasisOpen,
          "basis-closed": d3_svg_lineBasisClosed,
          bundle: d3_svg_lineBundle,
          cardinal: d3_svg_lineCardinal,
          "cardinal-open": d3_svg_lineCardinalOpen,
          "cardinal-closed": d3_svg_lineCardinalClosed,
          monotone: d3_svg_lineMonotone
        });
        d3_svg_lineInterpolators.forEach(function(key, value) {
          value.key = key;
          value.closed = /-closed$/.test(key);
        });
        function d3_svg_lineLinear(points) {
          return points.length > 1 ? points.join("L") : points + "Z";
        }
        function d3_svg_lineLinearClosed(points) {
          return points.join("L") + "Z";
        }
        function d3_svg_lineStep(points) {
          var i = 0, n = points.length, p = points[0], path = [p[0], ",", p[1]];
          while (++i < n) path.push("H", (p[0] + (p = points[i])[0]) / 2, "V", p[1]);
          if (n > 1) path.push("H", p[0]);
          return path.join("");
        }
        function d3_svg_lineStepBefore(points) {
          var i = 0, n = points.length, p = points[0], path = [p[0], ",", p[1]];
          while (++i < n) path.push("V", (p = points[i])[1], "H", p[0]);
          return path.join("");
        }
        function d3_svg_lineStepAfter(points) {
          var i = 0, n = points.length, p = points[0], path = [p[0], ",", p[1]];
          while (++i < n) path.push("H", (p = points[i])[0], "V", p[1]);
          return path.join("");
        }
        function d3_svg_lineCardinalOpen(points, tension) {
          return points.length < 4 ? d3_svg_lineLinear(points) : points[1] + d3_svg_lineHermite(points.slice(1, -1), d3_svg_lineCardinalTangents(points, tension));
        }
        function d3_svg_lineCardinalClosed(points, tension) {
          return points.length < 3 ? d3_svg_lineLinearClosed(points) : points[0] + d3_svg_lineHermite((points.push(points[0]), points), d3_svg_lineCardinalTangents([points[points.length - 2]].concat(points, [points[1]]), tension));
        }
        function d3_svg_lineCardinal(points, tension) {
          return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineCardinalTangents(points, tension));
        }
        function d3_svg_lineHermite(points, tangents) {
          if (tangents.length < 1 || points.length != tangents.length && points.length != tangents.length + 2) {
            return d3_svg_lineLinear(points);
          }
          var quad = points.length != tangents.length, path = "", p0 = points[0], p = points[1], t0 = tangents[0], t = t0, pi = 1;
          if (quad) {
            path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3) + "," + p[0] + "," + p[1];
            p0 = points[1];
            pi = 2;
          }
          if (tangents.length > 1) {
            t = tangents[1];
            p = points[pi];
            pi++;
            path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1]) + "," + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
            for (var i = 2; i < tangents.length; i++, pi++) {
              p = points[pi];
              t = tangents[i];
              path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
            }
          }
          if (quad) {
            var lp = points[pi];
            path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3) + "," + lp[0] + "," + lp[1];
          }
          return path;
        }
        function d3_svg_lineCardinalTangents(points, tension) {
          var tangents = [], a = (1 - tension) / 2, p0, p1 = points[0], p2 = points[1], i = 1, n = points.length;
          while (++i < n) {
            p0 = p1;
            p1 = p2;
            p2 = points[i];
            tangents.push([a * (p2[0] - p0[0]), a * (p2[1] - p0[1])]);
          }
          return tangents;
        }
        function d3_svg_lineBasis(points) {
          if (points.length < 3) return d3_svg_lineLinear(points);
          var i = 1, n = points.length, pi = points[0], x0 = pi[0], y0 = pi[1], px = [x0, x0, x0, (pi = points[1])[0]], py = [y0, y0, y0, pi[1]], path = [x0, ",", y0, "L", d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)];
          points.push(points[n - 1]);
          while (++i <= n) {
            pi = points[i];
            px.shift();
            px.push(pi[0]);
            py.shift();
            py.push(pi[1]);
            d3_svg_lineBasisBezier(path, px, py);
          }
          points.pop();
          path.push("L", pi);
          return path.join("");
        }
        function d3_svg_lineBasisOpen(points) {
          if (points.length < 4) return d3_svg_lineLinear(points);
          var path = [], i = -1, n = points.length, pi, px = [0], py = [0];
          while (++i < 3) {
            pi = points[i];
            px.push(pi[0]);
            py.push(pi[1]);
          }
          path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px) + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py));
          --i;
          while (++i < n) {
            pi = points[i];
            px.shift();
            px.push(pi[0]);
            py.shift();
            py.push(pi[1]);
            d3_svg_lineBasisBezier(path, px, py);
          }
          return path.join("");
        }
        function d3_svg_lineBasisClosed(points) {
          var path, i = -1, n = points.length, m = n + 4, pi, px = [], py = [];
          while (++i < 4) {
            pi = points[i % n];
            px.push(pi[0]);
            py.push(pi[1]);
          }
          path = [d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)];
          --i;
          while (++i < m) {
            pi = points[i % n];
            px.shift();
            px.push(pi[0]);
            py.shift();
            py.push(pi[1]);
            d3_svg_lineBasisBezier(path, px, py);
          }
          return path.join("");
        }
        function d3_svg_lineBundle(points, tension) {
          var n = points.length - 1;
          if (n) {
            var x0 = points[0][0], y0 = points[0][1], dx = points[n][0] - x0, dy = points[n][1] - y0, i = -1, p, t;
            while (++i <= n) {
              p = points[i];
              t = i / n;
              p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx);
              p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
            }
          }
          return d3_svg_lineBasis(points);
        }
        function d3_svg_lineDot4(a, b) {
          return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
        }
        var d3_svg_lineBasisBezier1 = [0, 2 / 3, 1 / 3, 0], d3_svg_lineBasisBezier2 = [0, 1 / 3, 2 / 3, 0], d3_svg_lineBasisBezier3 = [0, 1 / 6, 2 / 3, 1 / 6];
        function d3_svg_lineBasisBezier(path, x, y) {
          path.push("C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
        }
        function d3_svg_lineSlope(p0, p1) {
          return (p1[1] - p0[1]) / (p1[0] - p0[0]);
        }
        function d3_svg_lineFiniteDifferences(points) {
          var i = 0, j = points.length - 1, m = [], p0 = points[0], p1 = points[1], d = m[0] = d3_svg_lineSlope(p0, p1);
          while (++i < j) {
            m[i] = (d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]))) / 2;
          }
          m[i] = d;
          return m;
        }
        function d3_svg_lineMonotoneTangents(points) {
          var tangents = [], d, a, b, s, m = d3_svg_lineFiniteDifferences(points), i = -1, j = points.length - 1;
          while (++i < j) {
            d = d3_svg_lineSlope(points[i], points[i + 1]);
            if (abs(d) < \u03B5) {
              m[i] = m[i + 1] = 0;
            } else {
              a = m[i] / d;
              b = m[i + 1] / d;
              s = a * a + b * b;
              if (s > 9) {
                s = d * 3 / Math.sqrt(s);
                m[i] = s * a;
                m[i + 1] = s * b;
              }
            }
          }
          i = -1;
          while (++i <= j) {
            s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (6 * (1 + m[i] * m[i]));
            tangents.push([s || 0, m[i] * s || 0]);
          }
          return tangents;
        }
        function d3_svg_lineMonotone(points) {
          return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points));
        }
        d32.svg.line.radial = function() {
          var line = d3_svg_line(d3_svg_lineRadial);
          line.radius = line.x, delete line.x;
          line.angle = line.y, delete line.y;
          return line;
        };
        function d3_svg_lineRadial(points) {
          var point, i = -1, n = points.length, r, a;
          while (++i < n) {
            point = points[i];
            r = point[0];
            a = point[1] - half\u03C0;
            point[0] = r * Math.cos(a);
            point[1] = r * Math.sin(a);
          }
          return points;
        }
        function d3_svg_area(projection) {
          var x0 = d3_geom_pointX, x1 = d3_geom_pointX, y0 = 0, y1 = d3_geom_pointY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, interpolateReverse = interpolate, L = "L", tension = 0.7;
          function area(data) {
            var segments = [], points0 = [], points1 = [], i = -1, n = data.length, d, fx0 = d3_functor(x0), fy0 = d3_functor(y0), fx1 = x0 === x1 ? function() {
              return x;
            } : d3_functor(x1), fy1 = y0 === y1 ? function() {
              return y;
            } : d3_functor(y1), x, y;
            function segment() {
              segments.push("M", interpolate(projection(points1), tension), L, interpolateReverse(projection(points0.reverse()), tension), "Z");
            }
            while (++i < n) {
              if (defined.call(this, d = data[i], i)) {
                points0.push([x = +fx0.call(this, d, i), y = +fy0.call(this, d, i)]);
                points1.push([+fx1.call(this, d, i), +fy1.call(this, d, i)]);
              } else if (points0.length) {
                segment();
                points0 = [];
                points1 = [];
              }
            }
            if (points0.length) segment();
            return segments.length ? segments.join("") : null;
          }
          area.x = function(_) {
            if (!arguments.length) return x1;
            x0 = x1 = _;
            return area;
          };
          area.x0 = function(_) {
            if (!arguments.length) return x0;
            x0 = _;
            return area;
          };
          area.x1 = function(_) {
            if (!arguments.length) return x1;
            x1 = _;
            return area;
          };
          area.y = function(_) {
            if (!arguments.length) return y1;
            y0 = y1 = _;
            return area;
          };
          area.y0 = function(_) {
            if (!arguments.length) return y0;
            y0 = _;
            return area;
          };
          area.y1 = function(_) {
            if (!arguments.length) return y1;
            y1 = _;
            return area;
          };
          area.defined = function(_) {
            if (!arguments.length) return defined;
            defined = _;
            return area;
          };
          area.interpolate = function(_) {
            if (!arguments.length) return interpolateKey;
            if (typeof _ === "function") interpolateKey = interpolate = _;
            else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
            interpolateReverse = interpolate.reverse || interpolate;
            L = interpolate.closed ? "M" : "L";
            return area;
          };
          area.tension = function(_) {
            if (!arguments.length) return tension;
            tension = _;
            return area;
          };
          return area;
        }
        d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter;
        d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore;
        d32.svg.area = function() {
          return d3_svg_area(d3_identity);
        };
        d32.svg.area.radial = function() {
          var area = d3_svg_area(d3_svg_lineRadial);
          area.radius = area.x, delete area.x;
          area.innerRadius = area.x0, delete area.x0;
          area.outerRadius = area.x1, delete area.x1;
          area.angle = area.y, delete area.y;
          area.startAngle = area.y0, delete area.y0;
          area.endAngle = area.y1, delete area.y1;
          return area;
        };
        d32.svg.chord = function() {
          var source = d3_source, target = d3_target, radius = d3_svg_chordRadius, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle;
          function chord(d, i) {
            var s = subgroup(this, source, d, i), t = subgroup(this, target, d, i);
            return "M" + s.p0 + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t) ? curve(s.r, s.p1, s.r, s.p0) : curve(s.r, s.p1, t.r, t.p0) + arc(t.r, t.p1, t.a1 - t.a0) + curve(t.r, t.p1, s.r, s.p0)) + "Z";
          }
          function subgroup(self, f, d, i) {
            var subgroup2 = f.call(self, d, i), r = radius.call(self, subgroup2, i), a0 = startAngle.call(self, subgroup2, i) - half\u03C0, a1 = endAngle.call(self, subgroup2, i) - half\u03C0;
            return {
              r,
              a0,
              a1,
              p0: [r * Math.cos(a0), r * Math.sin(a0)],
              p1: [r * Math.cos(a1), r * Math.sin(a1)]
            };
          }
          function equals(a, b) {
            return a.a0 == b.a0 && a.a1 == b.a1;
          }
          function arc(r, p, a) {
            return "A" + r + "," + r + " 0 " + +(a > \u03C0) + ",1 " + p;
          }
          function curve(r0, p0, r1, p1) {
            return "Q 0,0 " + p1;
          }
          chord.radius = function(v) {
            if (!arguments.length) return radius;
            radius = d3_functor(v);
            return chord;
          };
          chord.source = function(v) {
            if (!arguments.length) return source;
            source = d3_functor(v);
            return chord;
          };
          chord.target = function(v) {
            if (!arguments.length) return target;
            target = d3_functor(v);
            return chord;
          };
          chord.startAngle = function(v) {
            if (!arguments.length) return startAngle;
            startAngle = d3_functor(v);
            return chord;
          };
          chord.endAngle = function(v) {
            if (!arguments.length) return endAngle;
            endAngle = d3_functor(v);
            return chord;
          };
          return chord;
        };
        function d3_svg_chordRadius(d) {
          return d.radius;
        }
        d32.svg.diagonal = function() {
          var source = d3_source, target = d3_target, projection = d3_svg_diagonalProjection;
          function diagonal(d, i) {
            var p0 = source.call(this, d, i), p3 = target.call(this, d, i), m = (p0.y + p3.y) / 2, p = [p0, {
              x: p0.x,
              y: m
            }, {
              x: p3.x,
              y: m
            }, p3];
            p = p.map(projection);
            return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3];
          }
          diagonal.source = function(x) {
            if (!arguments.length) return source;
            source = d3_functor(x);
            return diagonal;
          };
          diagonal.target = function(x) {
            if (!arguments.length) return target;
            target = d3_functor(x);
            return diagonal;
          };
          diagonal.projection = function(x) {
            if (!arguments.length) return projection;
            projection = x;
            return diagonal;
          };
          return diagonal;
        };
        function d3_svg_diagonalProjection(d) {
          return [d.x, d.y];
        }
        d32.svg.diagonal.radial = function() {
          var diagonal = d32.svg.diagonal(), projection = d3_svg_diagonalProjection, projection_ = diagonal.projection;
          diagonal.projection = function(x) {
            return arguments.length ? projection_(d3_svg_diagonalRadialProjection(projection = x)) : projection;
          };
          return diagonal;
        };
        function d3_svg_diagonalRadialProjection(projection) {
          return function() {
            var d = projection.apply(this, arguments), r = d[0], a = d[1] - half\u03C0;
            return [r * Math.cos(a), r * Math.sin(a)];
          };
        }
        d32.svg.symbol = function() {
          var type = d3_svg_symbolType, size = d3_svg_symbolSize;
          function symbol(d, i) {
            return (d3_svg_symbols.get(type.call(this, d, i)) || d3_svg_symbolCircle)(size.call(this, d, i));
          }
          symbol.type = function(x) {
            if (!arguments.length) return type;
            type = d3_functor(x);
            return symbol;
          };
          symbol.size = function(x) {
            if (!arguments.length) return size;
            size = d3_functor(x);
            return symbol;
          };
          return symbol;
        };
        function d3_svg_symbolSize() {
          return 64;
        }
        function d3_svg_symbolType() {
          return "circle";
        }
        function d3_svg_symbolCircle(size) {
          var r = Math.sqrt(size / \u03C0);
          return "M0," + r + "A" + r + "," + r + " 0 1,1 0," + -r + "A" + r + "," + r + " 0 1,1 0," + r + "Z";
        }
        var d3_svg_symbols = d32.map({
          circle: d3_svg_symbolCircle,
          cross: function(size) {
            var r = Math.sqrt(size / 5) / 2;
            return "M" + -3 * r + "," + -r + "H" + -r + "V" + -3 * r + "H" + r + "V" + -r + "H" + 3 * r + "V" + r + "H" + r + "V" + 3 * r + "H" + -r + "V" + r + "H" + -3 * r + "Z";
          },
          diamond: function(size) {
            var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)), rx = ry * d3_svg_symbolTan30;
            return "M0," + -ry + "L" + rx + ",0 0," + ry + " " + -rx + ",0Z";
          },
          square: function(size) {
            var r = Math.sqrt(size) / 2;
            return "M" + -r + "," + -r + "L" + r + "," + -r + " " + r + "," + r + " " + -r + "," + r + "Z";
          },
          "triangle-down": function(size) {
            var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
            return "M0," + ry + "L" + rx + "," + -ry + " " + -rx + "," + -ry + "Z";
          },
          "triangle-up": function(size) {
            var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
            return "M0," + -ry + "L" + rx + "," + ry + " " + -rx + "," + ry + "Z";
          }
        });
        d32.svg.symbolTypes = d3_svg_symbols.keys();
        var d3_svg_symbolSqrt3 = Math.sqrt(3), d3_svg_symbolTan30 = Math.tan(30 * d3_radians);
        d3_selectionPrototype.transition = function(name) {
          var id = d3_transitionInheritId || ++d3_transitionId, ns = d3_transitionNamespace(name), subgroups = [], subgroup, node, transition = d3_transitionInherit || {
            time: Date.now(),
            ease: d3_ease_cubicInOut,
            delay: 0,
            duration: 250
          };
          for (var j = -1, m = this.length; ++j < m; ) {
            subgroups.push(subgroup = []);
            for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
              if (node = group[i]) d3_transitionNode(node, i, ns, id, transition);
              subgroup.push(node);
            }
          }
          return d3_transition(subgroups, ns, id);
        };
        d3_selectionPrototype.interrupt = function(name) {
          return this.each(name == null ? d3_selection_interrupt : d3_selection_interruptNS(d3_transitionNamespace(name)));
        };
        var d3_selection_interrupt = d3_selection_interruptNS(d3_transitionNamespace());
        function d3_selection_interruptNS(ns) {
          return function() {
            var lock, activeId, active;
            if ((lock = this[ns]) && (active = lock[activeId = lock.active])) {
              active.timer.c = null;
              active.timer.t = NaN;
              if (--lock.count) delete lock[activeId];
              else delete this[ns];
              lock.active += 0.5;
              active.event && active.event.interrupt.call(this, this.__data__, active.index);
            }
          };
        }
        function d3_transition(groups, ns, id) {
          d3_subclass(groups, d3_transitionPrototype);
          groups.namespace = ns;
          groups.id = id;
          return groups;
        }
        var d3_transitionPrototype = [], d3_transitionId = 0, d3_transitionInheritId, d3_transitionInherit;
        d3_transitionPrototype.call = d3_selectionPrototype.call;
        d3_transitionPrototype.empty = d3_selectionPrototype.empty;
        d3_transitionPrototype.node = d3_selectionPrototype.node;
        d3_transitionPrototype.size = d3_selectionPrototype.size;
        d32.transition = function(selection, name) {
          return selection && selection.transition ? d3_transitionInheritId ? selection.transition(name) : selection : d32.selection().transition(selection);
        };
        d32.transition.prototype = d3_transitionPrototype;
        d3_transitionPrototype.select = function(selector) {
          var id = this.id, ns = this.namespace, subgroups = [], subgroup, subnode, node;
          selector = d3_selection_selector(selector);
          for (var j = -1, m = this.length; ++j < m; ) {
            subgroups.push(subgroup = []);
            for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
              if ((node = group[i]) && (subnode = selector.call(node, node.__data__, i, j))) {
                if ("__data__" in node) subnode.__data__ = node.__data__;
                d3_transitionNode(subnode, i, ns, id, node[ns][id]);
                subgroup.push(subnode);
              } else {
                subgroup.push(null);
              }
            }
          }
          return d3_transition(subgroups, ns, id);
        };
        d3_transitionPrototype.selectAll = function(selector) {
          var id = this.id, ns = this.namespace, subgroups = [], subgroup, subnodes, node, subnode, transition;
          selector = d3_selection_selectorAll(selector);
          for (var j = -1, m = this.length; ++j < m; ) {
            for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
              if (node = group[i]) {
                transition = node[ns][id];
                subnodes = selector.call(node, node.__data__, i, j);
                subgroups.push(subgroup = []);
                for (var k = -1, o = subnodes.length; ++k < o; ) {
                  if (subnode = subnodes[k]) d3_transitionNode(subnode, k, ns, id, transition);
                  subgroup.push(subnode);
                }
              }
            }
          }
          return d3_transition(subgroups, ns, id);
        };
        d3_transitionPrototype.filter = function(filter) {
          var subgroups = [], subgroup, group, node;
          if (typeof filter !== "function") filter = d3_selection_filter(filter);
          for (var j = 0, m = this.length; j < m; j++) {
            subgroups.push(subgroup = []);
            for (var group = this[j], i = 0, n = group.length; i < n; i++) {
              if ((node = group[i]) && filter.call(node, node.__data__, i, j)) {
                subgroup.push(node);
              }
            }
          }
          return d3_transition(subgroups, this.namespace, this.id);
        };
        d3_transitionPrototype.tween = function(name, tween) {
          var id = this.id, ns = this.namespace;
          if (arguments.length < 2) return this.node()[ns][id].tween.get(name);
          return d3_selection_each(this, tween == null ? function(node) {
            node[ns][id].tween.remove(name);
          } : function(node) {
            node[ns][id].tween.set(name, tween);
          });
        };
        function d3_transition_tween(groups, name, value, tween) {
          var id = groups.id, ns = groups.namespace;
          return d3_selection_each(groups, typeof value === "function" ? function(node, i, j) {
            node[ns][id].tween.set(name, tween(value.call(node, node.__data__, i, j)));
          } : (value = tween(value), function(node) {
            node[ns][id].tween.set(name, value);
          }));
        }
        d3_transitionPrototype.attr = function(nameNS, value) {
          if (arguments.length < 2) {
            for (value in nameNS) this.attr(value, nameNS[value]);
            return this;
          }
          var interpolate = nameNS == "transform" ? d3_interpolateTransform : d3_interpolate, name = d32.ns.qualify(nameNS);
          function attrNull() {
            this.removeAttribute(name);
          }
          function attrNullNS() {
            this.removeAttributeNS(name.space, name.local);
          }
          function attrTween(b) {
            return b == null ? attrNull : (b += "", function() {
              var a = this.getAttribute(name), i;
              return a !== b && (i = interpolate(a, b), function(t) {
                this.setAttribute(name, i(t));
              });
            });
          }
          function attrTweenNS(b) {
            return b == null ? attrNullNS : (b += "", function() {
              var a = this.getAttributeNS(name.space, name.local), i;
              return a !== b && (i = interpolate(a, b), function(t) {
                this.setAttributeNS(name.space, name.local, i(t));
              });
            });
          }
          return d3_transition_tween(this, "attr." + nameNS, value, name.local ? attrTweenNS : attrTween);
        };
        d3_transitionPrototype.attrTween = function(nameNS, tween) {
          var name = d32.ns.qualify(nameNS);
          function attrTween(d, i) {
            var f = tween.call(this, d, i, this.getAttribute(name));
            return f && function(t) {
              this.setAttribute(name, f(t));
            };
          }
          function attrTweenNS(d, i) {
            var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
            return f && function(t) {
              this.setAttributeNS(name.space, name.local, f(t));
            };
          }
          return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween);
        };
        d3_transitionPrototype.style = function(name, value, priority) {
          var n = arguments.length;
          if (n < 3) {
            if (typeof name !== "string") {
              if (n < 2) value = "";
              for (priority in name) this.style(priority, name[priority], value);
              return this;
            }
            priority = "";
          }
          function styleNull() {
            this.style.removeProperty(name);
          }
          function styleString(b) {
            return b == null ? styleNull : (b += "", function() {
              var a = d3_window(this).getComputedStyle(this, null).getPropertyValue(name), i;
              return a !== b && (i = d3_interpolate(a, b), function(t) {
                this.style.setProperty(name, i(t), priority);
              });
            });
          }
          return d3_transition_tween(this, "style." + name, value, styleString);
        };
        d3_transitionPrototype.styleTween = function(name, tween, priority) {
          if (arguments.length < 3) priority = "";
          function styleTween(d, i) {
            var f = tween.call(this, d, i, d3_window(this).getComputedStyle(this, null).getPropertyValue(name));
            return f && function(t) {
              this.style.setProperty(name, f(t), priority);
            };
          }
          return this.tween("style." + name, styleTween);
        };
        d3_transitionPrototype.text = function(value) {
          return d3_transition_tween(this, "text", value, d3_transition_text);
        };
        function d3_transition_text(b) {
          if (b == null) b = "";
          return function() {
            this.textContent = b;
          };
        }
        d3_transitionPrototype.remove = function() {
          var ns = this.namespace;
          return this.each("end.transition", function() {
            var p;
            if (this[ns].count < 2 && (p = this.parentNode)) p.removeChild(this);
          });
        };
        d3_transitionPrototype.ease = function(value) {
          var id = this.id, ns = this.namespace;
          if (arguments.length < 1) return this.node()[ns][id].ease;
          if (typeof value !== "function") value = d32.ease.apply(d32, arguments);
          return d3_selection_each(this, function(node) {
            node[ns][id].ease = value;
          });
        };
        d3_transitionPrototype.delay = function(value) {
          var id = this.id, ns = this.namespace;
          if (arguments.length < 1) return this.node()[ns][id].delay;
          return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
            node[ns][id].delay = +value.call(node, node.__data__, i, j);
          } : (value = +value, function(node) {
            node[ns][id].delay = value;
          }));
        };
        d3_transitionPrototype.duration = function(value) {
          var id = this.id, ns = this.namespace;
          if (arguments.length < 1) return this.node()[ns][id].duration;
          return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
            node[ns][id].duration = Math.max(1, value.call(node, node.__data__, i, j));
          } : (value = Math.max(1, value), function(node) {
            node[ns][id].duration = value;
          }));
        };
        d3_transitionPrototype.each = function(type, listener) {
          var id = this.id, ns = this.namespace;
          if (arguments.length < 2) {
            var inherit = d3_transitionInherit, inheritId = d3_transitionInheritId;
            try {
              d3_transitionInheritId = id;
              d3_selection_each(this, function(node, i, j) {
                d3_transitionInherit = node[ns][id];
                type.call(node, node.__data__, i, j);
              });
            } finally {
              d3_transitionInherit = inherit;
              d3_transitionInheritId = inheritId;
            }
          } else {
            d3_selection_each(this, function(node) {
              var transition = node[ns][id];
              (transition.event || (transition.event = d32.dispatch("start", "end", "interrupt"))).on(type, listener);
            });
          }
          return this;
        };
        d3_transitionPrototype.transition = function() {
          var id0 = this.id, id1 = ++d3_transitionId, ns = this.namespace, subgroups = [], subgroup, group, node, transition;
          for (var j = 0, m = this.length; j < m; j++) {
            subgroups.push(subgroup = []);
            for (var group = this[j], i = 0, n = group.length; i < n; i++) {
              if (node = group[i]) {
                transition = node[ns][id0];
                d3_transitionNode(node, i, ns, id1, {
                  time: transition.time,
                  ease: transition.ease,
                  delay: transition.delay + transition.duration,
                  duration: transition.duration
                });
              }
              subgroup.push(node);
            }
          }
          return d3_transition(subgroups, ns, id1);
        };
        function d3_transitionNamespace(name) {
          return name == null ? "__transition__" : "__transition_" + name + "__";
        }
        function d3_transitionNode(node, i, ns, id, inherit) {
          var lock = node[ns] || (node[ns] = {
            active: 0,
            count: 0
          }), transition = lock[id], time, timer, duration, ease, tweens;
          function schedule(elapsed) {
            var delay = transition.delay;
            timer.t = delay + time;
            if (delay <= elapsed) return start(elapsed - delay);
            timer.c = start;
          }
          function start(elapsed) {
            var activeId = lock.active, active = lock[activeId];
            if (active) {
              active.timer.c = null;
              active.timer.t = NaN;
              --lock.count;
              delete lock[activeId];
              active.event && active.event.interrupt.call(node, node.__data__, active.index);
            }
            for (var cancelId in lock) {
              if (+cancelId < id) {
                var cancel = lock[cancelId];
                cancel.timer.c = null;
                cancel.timer.t = NaN;
                --lock.count;
                delete lock[cancelId];
              }
            }
            timer.c = tick;
            d3_timer(function() {
              if (timer.c && tick(elapsed || 1)) {
                timer.c = null;
                timer.t = NaN;
              }
              return 1;
            }, 0, time);
            lock.active = id;
            transition.event && transition.event.start.call(node, node.__data__, i);
            tweens = [];
            transition.tween.forEach(function(key, value) {
              if (value = value.call(node, node.__data__, i)) {
                tweens.push(value);
              }
            });
            ease = transition.ease;
            duration = transition.duration;
          }
          function tick(elapsed) {
            var t = elapsed / duration, e = ease(t), n = tweens.length;
            while (n > 0) {
              tweens[--n].call(node, e);
            }
            if (t >= 1) {
              transition.event && transition.event.end.call(node, node.__data__, i);
              if (--lock.count) delete lock[id];
              else delete node[ns];
              return 1;
            }
          }
          if (!transition) {
            time = inherit.time;
            timer = d3_timer(schedule, 0, time);
            transition = lock[id] = {
              tween: new d3_Map(),
              time,
              timer,
              delay: inherit.delay,
              duration: inherit.duration,
              ease: inherit.ease,
              index: i
            };
            inherit = null;
            ++lock.count;
          }
        }
        d32.svg.axis = function() {
          var scale = d32.scale.linear(), orient = d3_svg_axisDefaultOrient, innerTickSize = 6, outerTickSize = 6, tickPadding = 3, tickArguments_ = [10], tickValues = null, tickFormat_;
          function axis(g) {
            g.each(function() {
              var g2 = d32.select(this);
              var scale0 = this.__chart__ || scale, scale1 = this.__chart__ = scale.copy();
              var ticks = tickValues == null ? scale1.ticks ? scale1.ticks.apply(scale1, tickArguments_) : scale1.domain() : tickValues, tickFormat = tickFormat_ == null ? scale1.tickFormat ? scale1.tickFormat.apply(scale1, tickArguments_) : d3_identity : tickFormat_, tick = g2.selectAll(".tick").data(ticks, scale1), tickEnter = tick.enter().insert("g", ".domain").attr("class", "tick").style("opacity", \u03B5), tickExit = d32.transition(tick.exit()).style("opacity", \u03B5).remove(), tickUpdate = d32.transition(tick.order()).style("opacity", 1), tickSpacing = Math.max(innerTickSize, 0) + tickPadding, tickTransform;
              var range = d3_scaleRange(scale1), path = g2.selectAll(".domain").data([0]), pathUpdate = (path.enter().append("path").attr("class", "domain"), d32.transition(path));
              tickEnter.append("line");
              tickEnter.append("text");
              var lineEnter = tickEnter.select("line"), lineUpdate = tickUpdate.select("line"), text = tick.select("text").text(tickFormat), textEnter = tickEnter.select("text"), textUpdate = tickUpdate.select("text"), sign = orient === "top" || orient === "left" ? -1 : 1, x1, x2, y1, y2;
              if (orient === "bottom" || orient === "top") {
                tickTransform = d3_svg_axisX, x1 = "x", y1 = "y", x2 = "x2", y2 = "y2";
                text.attr("dy", sign < 0 ? "0em" : ".71em").style("text-anchor", "middle");
                pathUpdate.attr("d", "M" + range[0] + "," + sign * outerTickSize + "V0H" + range[1] + "V" + sign * outerTickSize);
              } else {
                tickTransform = d3_svg_axisY, x1 = "y", y1 = "x", x2 = "y2", y2 = "x2";
                text.attr("dy", ".32em").style("text-anchor", sign < 0 ? "end" : "start");
                pathUpdate.attr("d", "M" + sign * outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + sign * outerTickSize);
              }
              lineEnter.attr(y2, sign * innerTickSize);
              textEnter.attr(y1, sign * tickSpacing);
              lineUpdate.attr(x2, 0).attr(y2, sign * innerTickSize);
              textUpdate.attr(x1, 0).attr(y1, sign * tickSpacing);
              if (scale1.rangeBand) {
                var x = scale1, dx = x.rangeBand() / 2;
                scale0 = scale1 = function(d) {
                  return x(d) + dx;
                };
              } else if (scale0.rangeBand) {
                scale0 = scale1;
              } else {
                tickExit.call(tickTransform, scale1, scale0);
              }
              tickEnter.call(tickTransform, scale0, scale1);
              tickUpdate.call(tickTransform, scale1, scale1);
            });
          }
          axis.scale = function(x) {
            if (!arguments.length) return scale;
            scale = x;
            return axis;
          };
          axis.orient = function(x) {
            if (!arguments.length) return orient;
            orient = x in d3_svg_axisOrients ? x + "" : d3_svg_axisDefaultOrient;
            return axis;
          };
          axis.ticks = function() {
            if (!arguments.length) return tickArguments_;
            tickArguments_ = d3_array(arguments);
            return axis;
          };
          axis.tickValues = function(x) {
            if (!arguments.length) return tickValues;
            tickValues = x;
            return axis;
          };
          axis.tickFormat = function(x) {
            if (!arguments.length) return tickFormat_;
            tickFormat_ = x;
            return axis;
          };
          axis.tickSize = function(x) {
            var n = arguments.length;
            if (!n) return innerTickSize;
            innerTickSize = +x;
            outerTickSize = +arguments[n - 1];
            return axis;
          };
          axis.innerTickSize = function(x) {
            if (!arguments.length) return innerTickSize;
            innerTickSize = +x;
            return axis;
          };
          axis.outerTickSize = function(x) {
            if (!arguments.length) return outerTickSize;
            outerTickSize = +x;
            return axis;
          };
          axis.tickPadding = function(x) {
            if (!arguments.length) return tickPadding;
            tickPadding = +x;
            return axis;
          };
          axis.tickSubdivide = function() {
            return arguments.length && axis;
          };
          return axis;
        };
        var d3_svg_axisDefaultOrient = "bottom", d3_svg_axisOrients = {
          top: 1,
          right: 1,
          bottom: 1,
          left: 1
        };
        function d3_svg_axisX(selection, x0, x1) {
          selection.attr("transform", function(d) {
            var v0 = x0(d);
            return "translate(" + (isFinite(v0) ? v0 : x1(d)) + ",0)";
          });
        }
        function d3_svg_axisY(selection, y0, y1) {
          selection.attr("transform", function(d) {
            var v0 = y0(d);
            return "translate(0," + (isFinite(v0) ? v0 : y1(d)) + ")";
          });
        }
        d32.svg.brush = function() {
          var event = d3_eventDispatch(brush, "brushstart", "brush", "brushend"), x = null, y = null, xExtent = [0, 0], yExtent = [0, 0], xExtentDomain, yExtentDomain, xClamp = true, yClamp = true, resizes = d3_svg_brushResizes[0];
          function brush(g) {
            g.each(function() {
              var g2 = d32.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", brushstart).on("touchstart.brush", brushstart);
              var background = g2.selectAll(".background").data([0]);
              background.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair");
              g2.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
              var resize = g2.selectAll(".resize").data(resizes, d3_identity);
              resize.exit().remove();
              resize.enter().append("g").attr("class", function(d) {
                return "resize " + d;
              }).style("cursor", function(d) {
                return d3_svg_brushCursor[d];
              }).append("rect").attr("x", function(d) {
                return /[ew]$/.test(d) ? -3 : null;
              }).attr("y", function(d) {
                return /^[ns]/.test(d) ? -3 : null;
              }).attr("width", 6).attr("height", 6).style("visibility", "hidden");
              resize.style("display", brush.empty() ? "none" : null);
              var gUpdate = d32.transition(g2), backgroundUpdate = d32.transition(background), range;
              if (x) {
                range = d3_scaleRange(x);
                backgroundUpdate.attr("x", range[0]).attr("width", range[1] - range[0]);
                redrawX(gUpdate);
              }
              if (y) {
                range = d3_scaleRange(y);
                backgroundUpdate.attr("y", range[0]).attr("height", range[1] - range[0]);
                redrawY(gUpdate);
              }
              redraw(gUpdate);
            });
          }
          brush.event = function(g) {
            g.each(function() {
              var event_ = event.of(this, arguments), extent1 = {
                x: xExtent,
                y: yExtent,
                i: xExtentDomain,
                j: yExtentDomain
              }, extent0 = this.__chart__ || extent1;
              this.__chart__ = extent1;
              if (d3_transitionInheritId) {
                d32.select(this).transition().each("start.brush", function() {
                  xExtentDomain = extent0.i;
                  yExtentDomain = extent0.j;
                  xExtent = extent0.x;
                  yExtent = extent0.y;
                  event_({
                    type: "brushstart"
                  });
                }).tween("brush:brush", function() {
                  var xi = d3_interpolateArray(xExtent, extent1.x), yi = d3_interpolateArray(yExtent, extent1.y);
                  xExtentDomain = yExtentDomain = null;
                  return function(t) {
                    xExtent = extent1.x = xi(t);
                    yExtent = extent1.y = yi(t);
                    event_({
                      type: "brush",
                      mode: "resize"
                    });
                  };
                }).each("end.brush", function() {
                  xExtentDomain = extent1.i;
                  yExtentDomain = extent1.j;
                  event_({
                    type: "brush",
                    mode: "resize"
                  });
                  event_({
                    type: "brushend"
                  });
                });
              } else {
                event_({
                  type: "brushstart"
                });
                event_({
                  type: "brush",
                  mode: "resize"
                });
                event_({
                  type: "brushend"
                });
              }
            });
          };
          function redraw(g) {
            g.selectAll(".resize").attr("transform", function(d) {
              return "translate(" + xExtent[+/e$/.test(d)] + "," + yExtent[+/^s/.test(d)] + ")";
            });
          }
          function redrawX(g) {
            g.select(".extent").attr("x", xExtent[0]);
            g.selectAll(".extent,.n>rect,.s>rect").attr("width", xExtent[1] - xExtent[0]);
          }
          function redrawY(g) {
            g.select(".extent").attr("y", yExtent[0]);
            g.selectAll(".extent,.e>rect,.w>rect").attr("height", yExtent[1] - yExtent[0]);
          }
          function brushstart() {
            var target = this, eventTarget = d32.select(d32.event.target), event_ = event.of(target, arguments), g = d32.select(target), resizing = eventTarget.datum(), resizingX = !/^(n|s)$/.test(resizing) && x, resizingY = !/^(e|w)$/.test(resizing) && y, dragging = eventTarget.classed("extent"), dragRestore = d3_event_dragSuppress(target), center, origin = d32.mouse(target), offset;
            var w = d32.select(d3_window(target)).on("keydown.brush", keydown).on("keyup.brush", keyup);
            if (d32.event.changedTouches) {
              w.on("touchmove.brush", brushmove).on("touchend.brush", brushend);
            } else {
              w.on("mousemove.brush", brushmove).on("mouseup.brush", brushend);
            }
            g.interrupt().selectAll("*").interrupt();
            if (dragging) {
              origin[0] = xExtent[0] - origin[0];
              origin[1] = yExtent[0] - origin[1];
            } else if (resizing) {
              var ex = +/w$/.test(resizing), ey = +/^n/.test(resizing);
              offset = [xExtent[1 - ex] - origin[0], yExtent[1 - ey] - origin[1]];
              origin[0] = xExtent[ex];
              origin[1] = yExtent[ey];
            } else if (d32.event.altKey) center = origin.slice();
            g.style("pointer-events", "none").selectAll(".resize").style("display", null);
            d32.select("body").style("cursor", eventTarget.style("cursor"));
            event_({
              type: "brushstart"
            });
            brushmove();
            function keydown() {
              if (d32.event.keyCode == 32) {
                if (!dragging) {
                  center = null;
                  origin[0] -= xExtent[1];
                  origin[1] -= yExtent[1];
                  dragging = 2;
                }
                d3_eventPreventDefault();
              }
            }
            function keyup() {
              if (d32.event.keyCode == 32 && dragging == 2) {
                origin[0] += xExtent[1];
                origin[1] += yExtent[1];
                dragging = 0;
                d3_eventPreventDefault();
              }
            }
            function brushmove() {
              var point = d32.mouse(target), moved = false;
              if (offset) {
                point[0] += offset[0];
                point[1] += offset[1];
              }
              if (!dragging) {
                if (d32.event.altKey) {
                  if (!center) center = [(xExtent[0] + xExtent[1]) / 2, (yExtent[0] + yExtent[1]) / 2];
                  origin[0] = xExtent[+(point[0] < center[0])];
                  origin[1] = yExtent[+(point[1] < center[1])];
                } else center = null;
              }
              if (resizingX && move1(point, x, 0)) {
                redrawX(g);
                moved = true;
              }
              if (resizingY && move1(point, y, 1)) {
                redrawY(g);
                moved = true;
              }
              if (moved) {
                redraw(g);
                event_({
                  type: "brush",
                  mode: dragging ? "move" : "resize"
                });
              }
            }
            function move1(point, scale, i) {
              var range = d3_scaleRange(scale), r0 = range[0], r1 = range[1], position = origin[i], extent = i ? yExtent : xExtent, size = extent[1] - extent[0], min, max;
              if (dragging) {
                r0 -= position;
                r1 -= size + position;
              }
              min = (i ? yClamp : xClamp) ? Math.max(r0, Math.min(r1, point[i])) : point[i];
              if (dragging) {
                max = (min += position) + size;
              } else {
                if (center) position = Math.max(r0, Math.min(r1, 2 * center[i] - min));
                if (position < min) {
                  max = min;
                  min = position;
                } else {
                  max = position;
                }
              }
              if (extent[0] != min || extent[1] != max) {
                if (i) yExtentDomain = null;
                else xExtentDomain = null;
                extent[0] = min;
                extent[1] = max;
                return true;
              }
            }
            function brushend() {
              brushmove();
              g.style("pointer-events", "all").selectAll(".resize").style("display", brush.empty() ? "none" : null);
              d32.select("body").style("cursor", null);
              w.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null);
              dragRestore();
              event_({
                type: "brushend"
              });
            }
          }
          brush.x = function(z) {
            if (!arguments.length) return x;
            x = z;
            resizes = d3_svg_brushResizes[!x << 1 | !y];
            return brush;
          };
          brush.y = function(z) {
            if (!arguments.length) return y;
            y = z;
            resizes = d3_svg_brushResizes[!x << 1 | !y];
            return brush;
          };
          brush.clamp = function(z) {
            if (!arguments.length) return x && y ? [xClamp, yClamp] : x ? xClamp : y ? yClamp : null;
            if (x && y) xClamp = !!z[0], yClamp = !!z[1];
            else if (x) xClamp = !!z;
            else if (y) yClamp = !!z;
            return brush;
          };
          brush.extent = function(z) {
            var x0, x1, y0, y1, t;
            if (!arguments.length) {
              if (x) {
                if (xExtentDomain) {
                  x0 = xExtentDomain[0], x1 = xExtentDomain[1];
                } else {
                  x0 = xExtent[0], x1 = xExtent[1];
                  if (x.invert) x0 = x.invert(x0), x1 = x.invert(x1);
                  if (x1 < x0) t = x0, x0 = x1, x1 = t;
                }
              }
              if (y) {
                if (yExtentDomain) {
                  y0 = yExtentDomain[0], y1 = yExtentDomain[1];
                } else {
                  y0 = yExtent[0], y1 = yExtent[1];
                  if (y.invert) y0 = y.invert(y0), y1 = y.invert(y1);
                  if (y1 < y0) t = y0, y0 = y1, y1 = t;
                }
              }
              return x && y ? [[x0, y0], [x1, y1]] : x ? [x0, x1] : y && [y0, y1];
            }
            if (x) {
              x0 = z[0], x1 = z[1];
              if (y) x0 = x0[0], x1 = x1[0];
              xExtentDomain = [x0, x1];
              if (x.invert) x0 = x(x0), x1 = x(x1);
              if (x1 < x0) t = x0, x0 = x1, x1 = t;
              if (x0 != xExtent[0] || x1 != xExtent[1]) xExtent = [x0, x1];
            }
            if (y) {
              y0 = z[0], y1 = z[1];
              if (x) y0 = y0[1], y1 = y1[1];
              yExtentDomain = [y0, y1];
              if (y.invert) y0 = y(y0), y1 = y(y1);
              if (y1 < y0) t = y0, y0 = y1, y1 = t;
              if (y0 != yExtent[0] || y1 != yExtent[1]) yExtent = [y0, y1];
            }
            return brush;
          };
          brush.clear = function() {
            if (!brush.empty()) {
              xExtent = [0, 0], yExtent = [0, 0];
              xExtentDomain = yExtentDomain = null;
            }
            return brush;
          };
          brush.empty = function() {
            return !!x && xExtent[0] == xExtent[1] || !!y && yExtent[0] == yExtent[1];
          };
          return d32.rebind(brush, event, "on");
        };
        var d3_svg_brushCursor = {
          n: "ns-resize",
          e: "ew-resize",
          s: "ns-resize",
          w: "ew-resize",
          nw: "nwse-resize",
          ne: "nesw-resize",
          se: "nwse-resize",
          sw: "nesw-resize"
        };
        var d3_svg_brushResizes = [["n", "e", "s", "w", "nw", "ne", "se", "sw"], ["e", "w"], ["n", "s"], []];
        var d3_time_format = d3_time.format = d3_locale_enUS.timeFormat;
        var d3_time_formatUtc = d3_time_format.utc;
        var d3_time_formatIso = d3_time_formatUtc("%Y-%m-%dT%H:%M:%S.%LZ");
        d3_time_format.iso = Date.prototype.toISOString && +/* @__PURE__ */ new Date("2000-01-01T00:00:00.000Z") ? d3_time_formatIsoNative : d3_time_formatIso;
        function d3_time_formatIsoNative(date) {
          return date.toISOString();
        }
        d3_time_formatIsoNative.parse = function(string) {
          var date = new Date(string);
          return isNaN(date) ? null : date;
        };
        d3_time_formatIsoNative.toString = d3_time_formatIso.toString;
        d3_time.second = d3_time_interval(function(date) {
          return new d3_date(Math.floor(date / 1e3) * 1e3);
        }, function(date, offset) {
          date.setTime(date.getTime() + Math.floor(offset) * 1e3);
        }, function(date) {
          return date.getSeconds();
        });
        d3_time.seconds = d3_time.second.range;
        d3_time.seconds.utc = d3_time.second.utc.range;
        d3_time.minute = d3_time_interval(function(date) {
          return new d3_date(Math.floor(date / 6e4) * 6e4);
        }, function(date, offset) {
          date.setTime(date.getTime() + Math.floor(offset) * 6e4);
        }, function(date) {
          return date.getMinutes();
        });
        d3_time.minutes = d3_time.minute.range;
        d3_time.minutes.utc = d3_time.minute.utc.range;
        d3_time.hour = d3_time_interval(function(date) {
          var timezone = date.getTimezoneOffset() / 60;
          return new d3_date((Math.floor(date / 36e5 - timezone) + timezone) * 36e5);
        }, function(date, offset) {
          date.setTime(date.getTime() + Math.floor(offset) * 36e5);
        }, function(date) {
          return date.getHours();
        });
        d3_time.hours = d3_time.hour.range;
        d3_time.hours.utc = d3_time.hour.utc.range;
        d3_time.month = d3_time_interval(function(date) {
          date = d3_time.day(date);
          date.setDate(1);
          return date;
        }, function(date, offset) {
          date.setMonth(date.getMonth() + offset);
        }, function(date) {
          return date.getMonth();
        });
        d3_time.months = d3_time.month.range;
        d3_time.months.utc = d3_time.month.utc.range;
        function d3_time_scale(linear, methods, format) {
          function scale(x) {
            return linear(x);
          }
          scale.invert = function(x) {
            return d3_time_scaleDate(linear.invert(x));
          };
          scale.domain = function(x) {
            if (!arguments.length) return linear.domain().map(d3_time_scaleDate);
            linear.domain(x);
            return scale;
          };
          function tickMethod(extent, count) {
            var span = extent[1] - extent[0], target = span / count, i = d32.bisect(d3_time_scaleSteps, target);
            return i == d3_time_scaleSteps.length ? [methods.year, d3_scale_linearTickRange(extent.map(function(d) {
              return d / 31536e6;
            }), count)[2]] : !i ? [d3_time_scaleMilliseconds, d3_scale_linearTickRange(extent, count)[2]] : methods[target / d3_time_scaleSteps[i - 1] < d3_time_scaleSteps[i] / target ? i - 1 : i];
          }
          scale.nice = function(interval, skip) {
            var domain = scale.domain(), extent = d3_scaleExtent(domain), method = interval == null ? tickMethod(extent, 10) : typeof interval === "number" && tickMethod(extent, interval);
            if (method) interval = method[0], skip = method[1];
            function skipped(date) {
              return !isNaN(date) && !interval.range(date, d3_time_scaleDate(+date + 1), skip).length;
            }
            return scale.domain(d3_scale_nice(domain, skip > 1 ? {
              floor: function(date) {
                while (skipped(date = interval.floor(date))) date = d3_time_scaleDate(date - 1);
                return date;
              },
              ceil: function(date) {
                while (skipped(date = interval.ceil(date))) date = d3_time_scaleDate(+date + 1);
                return date;
              }
            } : interval));
          };
          scale.ticks = function(interval, skip) {
            var extent = d3_scaleExtent(scale.domain()), method = interval == null ? tickMethod(extent, 10) : typeof interval === "number" ? tickMethod(extent, interval) : !interval.range && [{
              range: interval
            }, skip];
            if (method) interval = method[0], skip = method[1];
            return interval.range(extent[0], d3_time_scaleDate(+extent[1] + 1), skip < 1 ? 1 : skip);
          };
          scale.tickFormat = function() {
            return format;
          };
          scale.copy = function() {
            return d3_time_scale(linear.copy(), methods, format);
          };
          return d3_scale_linearRebind(scale, linear);
        }
        function d3_time_scaleDate(t) {
          return new Date(t);
        }
        var d3_time_scaleSteps = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6];
        var d3_time_scaleLocalMethods = [[d3_time.second, 1], [d3_time.second, 5], [d3_time.second, 15], [d3_time.second, 30], [d3_time.minute, 1], [d3_time.minute, 5], [d3_time.minute, 15], [d3_time.minute, 30], [d3_time.hour, 1], [d3_time.hour, 3], [d3_time.hour, 6], [d3_time.hour, 12], [d3_time.day, 1], [d3_time.day, 2], [d3_time.week, 1], [d3_time.month, 1], [d3_time.month, 3], [d3_time.year, 1]];
        var d3_time_scaleLocalFormat = d3_time_format.multi([[".%L", function(d) {
          return d.getMilliseconds();
        }], [":%S", function(d) {
          return d.getSeconds();
        }], ["%I:%M", function(d) {
          return d.getMinutes();
        }], ["%I %p", function(d) {
          return d.getHours();
        }], ["%a %d", function(d) {
          return d.getDay() && d.getDate() != 1;
        }], ["%b %d", function(d) {
          return d.getDate() != 1;
        }], ["%B", function(d) {
          return d.getMonth();
        }], ["%Y", d3_true]]);
        var d3_time_scaleMilliseconds = {
          range: function(start, stop, step) {
            return d32.range(Math.ceil(start / step) * step, +stop, step).map(d3_time_scaleDate);
          },
          floor: d3_identity,
          ceil: d3_identity
        };
        d3_time_scaleLocalMethods.year = d3_time.year;
        d3_time.scale = function() {
          return d3_time_scale(d32.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat);
        };
        var d3_time_scaleUtcMethods = d3_time_scaleLocalMethods.map(function(m) {
          return [m[0].utc, m[1]];
        });
        var d3_time_scaleUtcFormat = d3_time_formatUtc.multi([[".%L", function(d) {
          return d.getUTCMilliseconds();
        }], [":%S", function(d) {
          return d.getUTCSeconds();
        }], ["%I:%M", function(d) {
          return d.getUTCMinutes();
        }], ["%I %p", function(d) {
          return d.getUTCHours();
        }], ["%a %d", function(d) {
          return d.getUTCDay() && d.getUTCDate() != 1;
        }], ["%b %d", function(d) {
          return d.getUTCDate() != 1;
        }], ["%B", function(d) {
          return d.getUTCMonth();
        }], ["%Y", d3_true]]);
        d3_time_scaleUtcMethods.year = d3_time.year.utc;
        d3_time.scale.utc = function() {
          return d3_time_scale(d32.scale.linear(), d3_time_scaleUtcMethods, d3_time_scaleUtcFormat);
        };
        d32.text = d3_xhrType(function(request) {
          return request.responseText;
        });
        d32.json = function(url, callback) {
          return d3_xhr(url, "application/json", d3_json, callback);
        };
        function d3_json(request) {
          return JSON.parse(request.responseText);
        }
        d32.html = function(url, callback) {
          return d3_xhr(url, "text/html", d3_html, callback);
        };
        function d3_html(request) {
          var range = d3_document.createRange();
          range.selectNode(d3_document.body);
          return range.createContextualFragment(request.responseText);
        }
        d32.xml = d3_xhrType(function(request) {
          return request.responseXML;
        });
        if (typeof define === "function" && define.amd) this.d3 = d32, define(d32);
        else if (typeof module === "object" && module.exports) module.exports = d32;
        else this.d3 = d32;
      })();
    }
  });

  // node_modules/tnt.api/src/api.js
  var require_api = __commonJS({
    "node_modules/tnt.api/src/api.js"(exports, module) {
      var api = function(who) {
        var _methods = function() {
          var m = [];
          m.add_batch = function(obj) {
            m.unshift(obj);
          };
          m.update = function(method, value) {
            for (var i = 0; i < m.length; i++) {
              for (var p in m[i]) {
                if (p === method) {
                  m[i][p] = value;
                  return true;
                }
              }
            }
            return false;
          };
          m.add = function(method, value) {
            if (m.update(method, value)) {
            } else {
              var reg = {};
              reg[method] = value;
              m.add_batch(reg);
            }
          };
          m.get = function(method) {
            for (var i = 0; i < m.length; i++) {
              for (var p in m[i]) {
                if (p === method) {
                  return m[i][p];
                }
              }
            }
          };
          return m;
        };
        var methods = _methods();
        var api2 = function() {
        };
        api2.check = function(method, check, msg) {
          if (method instanceof Array) {
            for (var i = 0; i < method.length; i++) {
              api2.check(method[i], check, msg);
            }
            return;
          }
          if (typeof method === "function") {
            method.check(check, msg);
          } else {
            who[method].check(check, msg);
          }
          return api2;
        };
        api2.transform = function(method, cbak) {
          if (method instanceof Array) {
            for (var i = 0; i < method.length; i++) {
              api2.transform(method[i], cbak);
            }
            return;
          }
          if (typeof method === "function") {
            method.transform(cbak);
          } else {
            who[method].transform(cbak);
          }
          return api2;
        };
        var attach_method = function(method, opts) {
          var checks = [];
          var transforms = [];
          var getter = opts.on_getter || function() {
            return methods.get(method);
          };
          var setter = opts.on_setter || function(x) {
            for (var i = 0; i < transforms.length; i++) {
              x = transforms[i](x);
            }
            for (var j = 0; j < checks.length; j++) {
              if (!checks[j].check(x)) {
                var msg = checks[j].msg || "Value " + x + " doesn't seem to be valid for this method";
                throw msg;
              }
            }
            methods.add(method, x);
          };
          var new_method = function(new_val) {
            if (!arguments.length) {
              return getter();
            }
            setter(new_val);
            return who;
          };
          new_method.check = function(cbak, msg) {
            if (!arguments.length) {
              return checks;
            }
            checks.push({
              check: cbak,
              msg
            });
            return this;
          };
          new_method.transform = function(cbak) {
            if (!arguments.length) {
              return transforms;
            }
            transforms.push(cbak);
            return this;
          };
          who[method] = new_method;
        };
        var getset = function(param, opts) {
          if (typeof param === "object") {
            methods.add_batch(param);
            for (var p in param) {
              attach_method(p, opts);
            }
          } else {
            methods.add(param, opts.default_value);
            attach_method(param, opts);
          }
        };
        api2.getset = function(param, def) {
          getset(param, { default_value: def });
          return api2;
        };
        api2.get = function(param, def) {
          var on_setter = function() {
            throw "Method defined only as a getter (you are trying to use it as a setter";
          };
          getset(
            param,
            {
              default_value: def,
              on_setter
            }
          );
          return api2;
        };
        api2.set = function(param, def) {
          var on_getter = function() {
            throw "Method defined only as a setter (you are trying to use it as a getter";
          };
          getset(
            param,
            {
              default_value: def,
              on_getter
            }
          );
          return api2;
        };
        api2.method = function(name, cbak) {
          if (typeof name === "object") {
            for (var p in name) {
              who[p] = name[p];
            }
          } else {
            who[name] = cbak;
          }
          return api2;
        };
        return api2;
      };
      module.exports = exports = api;
    }
  });

  // node_modules/tnt.api/index.js
  var require_tnt = __commonJS({
    "node_modules/tnt.api/index.js"(exports, module) {
      module.exports = require_api();
    }
  });

  // node_modules/tnt.utils/src/utils.js
  var require_utils = __commonJS({
    "node_modules/tnt.utils/src/utils.js"(exports, module) {
      module.exports = {
        iterator: function(init_val) {
          var i = init_val || 0;
          var iter = function() {
            return i++;
          };
          return iter;
        },
        script_path: function(script_name) {
          var script_scaped = script_name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
          var script_re = new RegExp(script_scaped + "$");
          var script_re_sub = new RegExp("(.*)" + script_scaped + "$");
          var scripts = document.getElementsByTagName("script");
          var path = "";
          if (scripts !== void 0) {
            for (var i in scripts) {
              if (scripts[i].src && scripts[i].src.match(script_re)) {
                return scripts[i].src.replace(script_re_sub, "$1");
              }
            }
          }
          return path;
        },
        defer_cancel: function(cbak, time) {
          var tick;
          var defer_cancel = function() {
            var args = Array.prototype.slice.call(arguments);
            var that = this;
            clearTimeout(tick);
            tick = setTimeout(function() {
              cbak.apply(that, args);
            }, time);
          };
          return defer_cancel;
        }
      };
    }
  });

  // node_modules/tnt.utils/src/reduce.js
  var require_reduce = __commonJS({
    "node_modules/tnt.utils/src/reduce.js"(exports, module) {
      var reduce = function() {
        var smooth = 5;
        var value = "val";
        var redundant = function(a, b) {
          if (a < b) {
            return b - a <= b * 0.2;
          }
          return a - b <= a * 0.2;
        };
        var perform_reduce = function(arr) {
          return arr;
        };
        var reduce2 = function(arr) {
          if (!arr.length) {
            return arr;
          }
          var smoothed = perform_smooth(arr);
          var reduced = perform_reduce(smoothed);
          return reduced;
        };
        var median = function(v, arr) {
          arr.sort(function(a, b) {
            return a[value] - b[value];
          });
          if (arr.length % 2) {
            v[value] = arr[~~(arr.length / 2)][value];
          } else {
            var n = ~~(arr.length / 2) - 1;
            v[value] = (arr[n][value] + arr[n + 1][value]) / 2;
          }
          return v;
        };
        var clone = function(source) {
          var target = {};
          for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
              target[prop] = source[prop];
            }
          }
          return target;
        };
        var perform_smooth = function(arr) {
          if (smooth === 0) {
            return arr;
          }
          var smooth_arr = [];
          for (var i = 0; i < arr.length; i++) {
            var low = i < smooth ? 0 : i - smooth;
            var high = i > arr.length - smooth ? arr.length : i + smooth;
            smooth_arr[i] = median(clone(arr[i]), arr.slice(low, high + 1));
          }
          return smooth_arr;
        };
        reduce2.reducer = function(cbak) {
          if (!arguments.length) {
            return perform_reduce;
          }
          perform_reduce = cbak;
          return reduce2;
        };
        reduce2.redundant = function(cbak) {
          if (!arguments.length) {
            return redundant;
          }
          redundant = cbak;
          return reduce2;
        };
        reduce2.value = function(val) {
          if (!arguments.length) {
            return value;
          }
          value = val;
          return reduce2;
        };
        reduce2.smooth = function(val) {
          if (!arguments.length) {
            return smooth;
          }
          smooth = val;
          return reduce2;
        };
        return reduce2;
      };
      var block = function() {
        var red = reduce().value("start");
        var value2 = "end";
        var join = function(obj1, obj2) {
          return {
            "object": {
              "start": obj1.object[red.value()],
              "end": obj2[value2]
            },
            "value": obj2[value2]
          };
        };
        red.reducer(function(arr) {
          var value = red.value();
          var redundant = red.redundant();
          var reduced_arr = [];
          var curr = {
            "object": arr[0],
            "value": arr[0][value2]
          };
          for (var i = 1; i < arr.length; i++) {
            if (redundant(arr[i][value], curr.value)) {
              curr = join(curr, arr[i]);
              continue;
            }
            reduced_arr.push(curr.object);
            curr.object = arr[i];
            curr.value = arr[i].end;
          }
          reduced_arr.push(curr.object);
          return reduced_arr;
        });
        reduce.join = function(cbak) {
          if (!arguments.length) {
            return join;
          }
          join = cbak;
          return red;
        };
        reduce.value2 = function(field) {
          if (!arguments.length) {
            return value2;
          }
          value2 = field;
          return red;
        };
        return red;
      };
      var line = function() {
        var red = reduce();
        red.reducer(function(arr) {
          var redundant = red.redundant();
          var value = red.value();
          var reduced_arr = [];
          var curr = arr[0];
          for (var i = 1; i < arr.length - 1; i++) {
            if (redundant(arr[i][value], curr[value])) {
              continue;
            }
            reduced_arr.push(curr);
            curr = arr[i];
          }
          reduced_arr.push(curr);
          reduced_arr.push(arr[arr.length - 1]);
          return reduced_arr;
        });
        return red;
      };
      module.exports = reduce;
      module.exports.line = line;
      module.exports.block = block;
    }
  });

  // node_modules/tnt.utils/src/png.js
  var require_png = __commonJS({
    "node_modules/tnt.utils/src/png.js"(exports, module) {
      var png = function() {
        var doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
        var scale_factor = 1;
        var css;
        var img_cbak = function() {
        };
        var png_export = function(from_svg) {
          from_svg = from_svg.node();
          var inline_images = function(cbak) {
            var images = d3.select(from_svg).selectAll("image");
            var remaining = images[0].length;
            if (remaining === 0) {
              cbak();
            }
            images.each(function() {
              var image = d3.select(this);
              var img = new Image();
              img.onload = function() {
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                var uri = canvas.toDataURL("image/png");
                image.attr("href", uri);
                remaining--;
                if (remaining === 0) {
                  cbak();
                }
              };
              img.src = image.attr("href");
            });
          };
          var move_children = function(src, dest) {
            var children = src.children || src.childNodes;
            while (children.length > 0) {
              var child = children[0];
              if (child.nodeType !== 1) continue;
              dest.appendChild(child);
            }
            return dest;
          };
          var styling = function(dom) {
            var used = "";
            var sheets = document.styleSheets;
            for (var i = 0; i < sheets.length; i++) {
              var href = sheets[i].href || "";
              if (css) {
                var skip = true;
                for (var c = 0; c < css.length; c++) {
                  if (href.indexOf(css[c]) > -1) {
                    skip = false;
                    break;
                  }
                }
                if (skip) {
                  continue;
                }
              }
              var rules = sheets[i].cssRules || [];
              for (var j = 0; j < rules.length; j++) {
                var rule = rules[j];
                if (typeof rule.style != "undefined") {
                  var elems = dom.querySelectorAll(rule.selectorText);
                  if (elems.length > 0) {
                    used += rule.selectorText + " { " + rule.style.cssText + " }\n";
                  }
                }
              }
            }
            var defs = dom.querySelector("defs") || document.createElement("defs");
            var s = document.createElement("style");
            s.setAttribute("type", "text/css");
            s.innerHTML = "<![CDATA[\n" + used + "\n]]>";
            defs.appendChild(s);
            return defs;
          };
          inline_images(function() {
            var outer = document.createElement("div");
            var clone = from_svg.cloneNode(true);
            var width = parseInt(clone.getAttribute("width"));
            var height = parseInt(clone.getAttribute("height"));
            clone.setAttribute("version", "1.1");
            clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
            clone.setAttribute("width", width * scale_factor);
            clone.setAttribute("height", height * scale_factor);
            var scaling = document.createElement("g");
            scaling.setAttribute("transform", "scale(" + scale_factor + ")");
            clone.appendChild(move_children(clone, scaling));
            outer.appendChild(clone);
            clone.insertBefore(styling(clone), clone.firstChild);
            var svg = doctype + outer.innerHTML;
            svg = svg.replace("none", "block");
            var image = new Image();
            image.src = "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svg)));
            image.onload = function() {
              var canvas = document.createElement("canvas");
              canvas.width = image.width;
              canvas.height = image.height;
              var context = canvas.getContext("2d");
              context.drawImage(image, 0, 0);
              var src = canvas.toDataURL("image/png");
              img_cbak(src);
            };
          });
        };
        png_export.scale_factor = function(f) {
          if (!arguments.length) {
            return scale_factor;
          }
          scale_factor = f;
          return this;
        };
        png_export.callback = function(cbak) {
          if (!arguments.length) {
            return img_cbak;
          }
          img_cbak = cbak;
          return this;
        };
        png_export.stylesheets = function(restrictCss) {
          if (!arguments.length) {
            return css;
          }
          css = restrictCss;
          return this;
        };
        return png_export;
      };
      var download = function() {
        var filename = "image.png";
        var max_size = {
          limit: Infinity,
          onError: function() {
            console.log("image too large");
          }
        };
        var png_export = png().callback(function(src) {
          var a = document.createElement("a");
          a.download = filename;
          a.href = src;
          document.body.appendChild(a);
          if (a.href.length > max_size.limit) {
            a.parentNode.removeChild(a);
            max_size.onError();
          } else {
            a.click();
          }
        });
        png_export.filename = function(fn) {
          if (!arguments.length) {
            return filename;
          }
          filename = fn;
          return png_export;
        };
        png_export.limit = function(l) {
          if (!arguments.length) {
            return max_size;
          }
          max_size = l;
          return this;
        };
        return png_export;
      };
      module.exports = exports = download;
    }
  });

  // node_modules/tnt.utils/src/index.js
  var require_src = __commonJS({
    "node_modules/tnt.utils/src/index.js"(exports, module) {
      var utils = require_utils();
      utils.reduce = require_reduce();
      utils.png = require_png();
      module.exports = exports = utils;
    }
  });

  // node_modules/tnt.utils/index.js
  var require_tnt2 = __commonJS({
    "node_modules/tnt.utils/index.js"(exports, module) {
      module.exports = require_src();
    }
  });

  // node_modules/tntvis/src/ta.js
  var require_ta = __commonJS({
    "node_modules/tntvis/src/ta.js"(exports, module) {
      var apijs = require_tnt();
      var defer_cancel = require_tnt2().defer_cancel;
      var ta = function() {
        "use strict";
        var dispatch = d3.dispatch("drag");
        var no_track = true;
        var div_id;
        var tree_conf = {
          tree: void 0,
          track: function() {
            var t = tnt.board.track().color("#EBF5FF").data(tnt.board.track.data().update(
              tnt.board.track.retriever.sync().retriever(function() {
                return [];
              })
            )).display(
              tnt.board.track.feature.block().color("steelblue").index(function(d) {
                return d.start;
              })
            );
            return t;
          },
          board: void 0,
          top: void 0,
          bottom: void 0,
          key: void 0
        };
        var tree_annot = function(div) {
          div_id = d3.select(div).attr("id");
          var group_div = d3.select(div).append("div").attr("class", "tnt_groupDiv");
          var tree_div = group_div.append("div").attr("id", "tnt_tree_container_" + div_id).attr("class", "tnt_tree_container");
          var annot_div = group_div.append("div").attr("id", "tnt_annot_container_" + div_id).attr("class", "tnt_annot_container");
          var curr_tree_width = tree_conf.tree.layout().width();
          var drag = group_div.append("div").attr("id", "tnt_annot_drag").style("left", curr_tree_width + "px");
          drag.on("mousedown", function() {
            var resizing_pos = d3.event.clientX;
            curr_tree_width = tree_conf.tree.layout().width();
            var curr_board_width = tree_conf.board.width();
            var deferred = defer_cancel(function mousemove(clientX) {
              var current_pos = clientX;
              var diff = current_pos - resizing_pos;
              tree_conf.tree.layout().width(curr_tree_width + diff);
              tree_conf.board.width(curr_board_width - diff);
              tree_conf.tree.update();
              tree_conf.board.update();
              resizing_pos = current_pos;
              dispatch.drag.call(this);
            }, 300);
            var w = d3.select(window).on("mousemove", function() {
              deferred(d3.event.clientX);
              var curr_tree_width2 = tree_conf.tree.layout().width();
              var diff = d3.event.clientX - resizing_pos;
              drag.style("left", curr_tree_width2 + diff + "px");
            }).on("mouseup", mouseup);
            function mouseup() {
              w.on("mousemove", null).on("mouseup", null);
            }
          });
          tree_conf.tree(tree_div.node());
          var leaves = tree_conf.tree.root().get_all_leaves();
          var tracks = [];
          var height = tree_conf.tree.label().height();
          for (var i = 0; i < leaves.length; i++) {
            (function(leaf) {
              tnt.board.track.id = function() {
                if (tree_conf.key === void 0) {
                  return leaf.id();
                }
                if (typeof tree_conf.key === "function") {
                  return tree_conf.key(leaf);
                }
                return leaf.property(tree_conf.key);
              };
              var track = tree_conf.track(leaves[i]).height(height);
              tracks.push(track);
            })(leaves[i]);
          }
          if (tree_conf.board) {
            if (tree_conf.top) {
              tree_conf.board.add_track(tree_conf.top);
            }
            tree_conf.board.add_track(tracks);
            if (tree_conf.bottom) {
              tree_conf.board.add_track(tree_conf.bottom);
            }
            tree_conf.board(annot_div.node());
            tree_conf.board.start();
          }
          api.method("update", function() {
            tree_conf.tree.update();
            if (tree_conf.board) {
              var leaves2 = tree_conf.tree.root().get_all_leaves();
              var new_tracks = [];
              if (tree_conf.top) {
                console.log("top height is...");
                console.log(tree_conf.top.height());
                new_tracks.push(tree_conf.top);
              }
              for (var i2 = 0; i2 < leaves2.length; i2++) {
                var id;
                if (tree_conf.key === void 0) {
                  id = leaves2[i2].id();
                } else if (typeof tree_conf.key === "function") {
                  id = tree_conf.key(leaves2[i2]);
                } else {
                  id = leaves2[i2].property(tree_conf.key);
                }
                var curr_track = tree_conf.board.find_track(id);
                if (curr_track === void 0) {
                  (function(leaf) {
                    tnt.board.track.id = function() {
                      if (tree_conf.key === void 0) {
                        return leaf.id();
                      }
                      if (typeof tree_conf.key === "function") {
                        return tree_conf.key(leaf);
                      }
                      return leaf.property(tree_conf.key);
                    };
                    curr_track = tree_conf.track(leaves2[i2]).height(height);
                  })(leaves2[i2]);
                }
                new_tracks.push(curr_track);
              }
              if (tree_conf.bottom) {
                new_tracks.push(tree_conf.bottom);
              }
              tree_conf.board.tracks(new_tracks);
            }
          });
          return tree_annot;
        };
        var api = apijs(tree_annot).getset(tree_conf);
        tree_annot.track = function(new_track) {
          if (!arguments.length) {
            return tree_conf.track;
          }
          if (no_track) {
            tree_conf.track = new_track;
            no_track = false;
            return tree_annot;
          }
          var tracks = tree_conf.board.tracks();
          var start_index = 0;
          var n_index = 0;
          if (tree_conf.top && tree_conf.bottom) {
            start_index = 1;
            n_index = 2;
          } else if (tree_conf.top) {
            start_index = 1;
            n_index = 1;
          } else if (tree_conf.bottom) {
            n_index = 1;
          }
          if (start_index > 0) {
            tracks[0].display().reset.call(tracks[0]);
          }
          if (n_index > start_index) {
            var n = tracks.length - 1;
            tracks[n].display().reset.call(tracks[n]);
          }
          for (var i = start_index; i <= tracks.length - n_index; i++) {
            var t = tracks[i];
            t.display().reset.call(t);
            var leaf;
            tree_conf.tree.root().apply(function(node) {
              if (node.id() === t.id()) {
                leaf = node;
              }
            });
            var n_track;
            (function(leaf2) {
              tnt.board.track.id = function() {
                if (tree_conf.key === void 0) {
                  return leaf2.id();
                }
                if (typeof (tree_conf.key === "function")) {
                  return tree_conf.key(leaf2);
                }
                return leaf2.property(tree_conf.key);
              };
              n_track = new_track(leaf2).height(tree_conf.tree.label().height());
            })(leaf);
            tracks[i] = n_track;
          }
          tree_conf.track = new_track;
          tree_conf.board.start();
        };
        return d3.rebind(tree_annot, dispatch, "on");
      };
      module.exports = exports = ta;
    }
  });

  // node_modules/backbone-events-standalone/backbone-events-standalone.js
  var require_backbone_events_standalone = __commonJS({
    "node_modules/backbone-events-standalone/backbone-events-standalone.js"(exports, module) {
      (function() {
        var root = this, nativeForEach = Array.prototype.forEach, hasOwnProperty = Object.prototype.hasOwnProperty, slice = Array.prototype.slice, idCounter = 0;
        function miniscore() {
          return {
            keys: Object.keys || function(obj) {
              if (typeof obj !== "object" && typeof obj !== "function" || obj === null) {
                throw new TypeError("keys() called on a non-object");
              }
              var key, keys = [];
              for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                  keys[keys.length] = key;
                }
              }
              return keys;
            },
            uniqueId: function(prefix) {
              var id = ++idCounter + "";
              return prefix ? prefix + id : id;
            },
            has: function(obj, key) {
              return hasOwnProperty.call(obj, key);
            },
            each: function(obj, iterator, context) {
              if (obj == null) return;
              if (nativeForEach && obj.forEach === nativeForEach) {
                obj.forEach(iterator, context);
              } else if (obj.length === +obj.length) {
                for (var i = 0, l = obj.length; i < l; i++) {
                  iterator.call(context, obj[i], i, obj);
                }
              } else {
                for (var key in obj) {
                  if (this.has(obj, key)) {
                    iterator.call(context, obj[key], key, obj);
                  }
                }
              }
            },
            once: function(func) {
              var ran = false, memo;
              return function() {
                if (ran) return memo;
                ran = true;
                memo = func.apply(this, arguments);
                func = null;
                return memo;
              };
            }
          };
        }
        var _ = miniscore(), Events;
        Events = {
          // Bind an event to a `callback` function. Passing `"all"` will bind
          // the callback to all events fired.
          on: function(name, callback, context) {
            if (!eventsApi(this, "on", name, [callback, context]) || !callback) return this;
            this._events || (this._events = {});
            var events = this._events[name] || (this._events[name] = []);
            events.push({ callback, context, ctx: context || this });
            return this;
          },
          // Bind an event to only be triggered a single time. After the first time
          // the callback is invoked, it will be removed.
          once: function(name, callback, context) {
            if (!eventsApi(this, "once", name, [callback, context]) || !callback) return this;
            var self = this;
            var once = _.once(function() {
              self.off(name, once);
              callback.apply(this, arguments);
            });
            once._callback = callback;
            return this.on(name, once, context);
          },
          // Remove one or many callbacks. If `context` is null, removes all
          // callbacks with that function. If `callback` is null, removes all
          // callbacks for the event. If `name` is null, removes all bound
          // callbacks for all events.
          off: function(name, callback, context) {
            var retain, ev, events, names, i, l, j, k;
            if (!this._events || !eventsApi(this, "off", name, [callback, context])) return this;
            if (!name && !callback && !context) {
              this._events = {};
              return this;
            }
            names = name ? [name] : _.keys(this._events);
            for (i = 0, l = names.length; i < l; i++) {
              name = names[i];
              if (events = this._events[name]) {
                this._events[name] = retain = [];
                if (callback || context) {
                  for (j = 0, k = events.length; j < k; j++) {
                    ev = events[j];
                    if (callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) {
                      retain.push(ev);
                    }
                  }
                }
                if (!retain.length) delete this._events[name];
              }
            }
            return this;
          },
          // Trigger one or many events, firing all bound callbacks. Callbacks are
          // passed the same arguments as `trigger` is, apart from the event name
          // (unless you're listening on `"all"`, which will cause your callback to
          // receive the true name of the event as the first argument).
          trigger: function(name) {
            if (!this._events) return this;
            var args = slice.call(arguments, 1);
            if (!eventsApi(this, "trigger", name, args)) return this;
            var events = this._events[name];
            var allEvents = this._events.all;
            if (events) triggerEvents(events, args);
            if (allEvents) triggerEvents(allEvents, arguments);
            return this;
          },
          // Tell this object to stop listening to either specific events ... or
          // to every object it's currently listening to.
          stopListening: function(obj, name, callback) {
            var listeners = this._listeners;
            if (!listeners) return this;
            var deleteListener = !name && !callback;
            if (typeof name === "object") callback = this;
            if (obj) (listeners = {})[obj._listenerId] = obj;
            for (var id in listeners) {
              listeners[id].off(name, callback, this);
              if (deleteListener) delete this._listeners[id];
            }
            return this;
          }
        };
        var eventSplitter = /\s+/;
        var eventsApi = function(obj, action, name, rest) {
          if (!name) return true;
          if (typeof name === "object") {
            for (var key in name) {
              obj[action].apply(obj, [key, name[key]].concat(rest));
            }
            return false;
          }
          if (eventSplitter.test(name)) {
            var names = name.split(eventSplitter);
            for (var i = 0, l = names.length; i < l; i++) {
              obj[action].apply(obj, [names[i]].concat(rest));
            }
            return false;
          }
          return true;
        };
        var triggerEvents = function(events, args) {
          var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
          switch (args.length) {
            case 0:
              while (++i < l) (ev = events[i]).callback.call(ev.ctx);
              return;
            case 1:
              while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1);
              return;
            case 2:
              while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2);
              return;
            case 3:
              while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
              return;
            default:
              while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
          }
        };
        var listenMethods = { listenTo: "on", listenToOnce: "once" };
        _.each(listenMethods, function(implementation, method) {
          Events[method] = function(obj, name, callback) {
            var listeners = this._listeners || (this._listeners = {});
            var id = obj._listenerId || (obj._listenerId = _.uniqueId("l"));
            listeners[id] = obj;
            if (typeof name === "object") callback = this;
            obj[implementation](name, callback, this);
            return this;
          };
        });
        Events.bind = Events.on;
        Events.unbind = Events.off;
        Events.mixin = function(proto) {
          var exports2 = [
            "on",
            "once",
            "off",
            "trigger",
            "stopListening",
            "listenTo",
            "listenToOnce",
            "bind",
            "unbind"
          ];
          _.each(exports2, function(name) {
            proto[name] = this[name];
          }, this);
          return proto;
        };
        if (typeof exports !== "undefined") {
          if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = Events;
          }
          exports.BackboneEvents = Events;
        } else if (typeof define === "function" && typeof define.amd == "object") {
          define(function() {
            return Events;
          });
        } else {
          root.BackboneEvents = Events;
        }
      })(exports);
    }
  });

  // node_modules/backbone-events-standalone/index.js
  var require_backbone_events_standalone2 = __commonJS({
    "node_modules/backbone-events-standalone/index.js"(exports, module) {
      module.exports = require_backbone_events_standalone();
    }
  });

  // node_modules/biojs-events/index.js
  var require_biojs_events = __commonJS({
    "node_modules/biojs-events/index.js"(exports, module) {
      var events = require_backbone_events_standalone2();
      events.onAll = function(callback, context) {
        this.on("all", callback, context);
        return this;
      };
      events.oldMixin = events.mixin;
      events.mixin = function(proto) {
        events.oldMixin(proto);
        var exports2 = ["onAll"];
        for (var i = 0; i < exports2.length; i++) {
          var name = exports2[i];
          proto[name] = this[name];
        }
        return proto;
      };
      module.exports = events;
    }
  });

  // node_modules/tnt.tree.node/src/node.js
  var require_node = __commonJS({
    "node_modules/tnt.tree.node/src/node.js"(exports, module) {
      var apijs = require_tnt();
      var iterator = require_tnt2().iterator;
      var tnt_node = function(data) {
        "use strict";
        var node = function() {
        };
        var api = apijs(node);
        var apply_to_data = function(data2, cbak) {
          cbak(data2);
          if (data2.children !== void 0) {
            for (var i = 0; i < data2.children.length; i++) {
              apply_to_data(data2.children[i], cbak);
            }
          }
        };
        var create_ids = function() {
          var i = iterator(1);
          apply_to_data(data, function(d) {
            if (d._id === void 0) {
              d._id = i();
            }
          });
        };
        var link_parents = function(data2) {
          if (data2 === void 0) {
            return;
          }
          if (data2.children === void 0) {
            return;
          }
          for (var i = 0; i < data2.children.length; i++) {
            data2.children[i]._parent = data2;
            link_parents(data2.children[i]);
          }
        };
        var compute_root_dists = function(data2) {
          apply_to_data(data2, function(d) {
            var l;
            if (d._parent === void 0) {
              d._root_dist = 0;
            } else {
              var l = 0;
              if (d.branch_length) {
                l = d.branch_length;
              }
              d._root_dist = l + d._parent._root_dist;
            }
          });
        };
        node.data = function(new_data) {
          if (!arguments.length) {
            return data;
          }
          data = new_data;
          create_ids();
          link_parents(data);
          compute_root_dists(data);
          return node;
        };
        node.data(data);
        api.method("find_all", function(cbak, deep) {
          var nodes = [];
          node.apply(function(n) {
            if (cbak(n)) {
              nodes.push(n);
            }
          });
          return nodes;
        });
        api.method("find_node", function(cbak, deep) {
          if (cbak(node)) {
            return node;
          }
          if (data.children !== void 0) {
            for (var j = 0; j < data.children.length; j++) {
              var found = tnt_node(data.children[j]).find_node(cbak, deep);
              if (found) {
                return found;
              }
            }
          }
          if (deep && data._children !== void 0) {
            for (var i = 0; i < data._children.length; i++) {
              tnt_node(data._children[i]).find_node(cbak, deep);
              var found = tnt_node(data._children[i]).find_node(cbak, deep);
              if (found) {
                return found;
              }
            }
          }
        });
        api.method("find_node_by_name", function(name, deep) {
          return node.find_node(function(node2) {
            return node2.node_name() === name;
          }, deep);
        });
        api.method("toggle", function() {
          if (data) {
            if (data.children) {
              var hidden = 0;
              node.apply(function(n) {
                var hidden_here = n.n_hidden() || 0;
                hidden += (n.n_hidden() || 0) + 1;
              });
              node.n_hidden(hidden - 1);
              data._children = data.children;
              data.children = void 0;
            } else {
              node.n_hidden(0);
              data.children = data._children;
              data._children = void 0;
            }
          }
          return this;
        });
        api.method("is_collapsed", function() {
          return data._children !== void 0 && data.children === void 0;
        });
        var has_ancestor = function(n, ancestor) {
          n = n.data();
          ancestor = ancestor.data();
          if (n._parent === void 0) {
            return false;
          }
          n = n._parent;
          for (; ; ) {
            if (n === void 0) {
              return false;
            }
            if (n === ancestor) {
              return true;
            }
            n = n._parent;
          }
        };
        api.method("lca", function(nodes) {
          if (nodes.length === 1) {
            return nodes[0];
          }
          var lca_node = nodes[0];
          for (var i = 1; i < nodes.length; i++) {
            lca_node = _lca(lca_node, nodes[i]);
          }
          return lca_node;
        });
        var _lca = function(node1, node2) {
          if (node1.data() === node2.data()) {
            return node1;
          }
          if (has_ancestor(node1, node2)) {
            return node2;
          }
          return _lca(node1, node2.parent());
        };
        api.method("n_hidden", function(val) {
          if (!arguments.length) {
            return node.property("_hidden");
          }
          node.property("_hidden", val);
          return node;
        });
        api.method("get_all_nodes", function(deep) {
          var nodes = [];
          node.apply(function(n) {
            nodes.push(n);
          }, deep);
          return nodes;
        });
        api.method("get_all_leaves", function(deep) {
          var leaves = [];
          node.apply(function(n) {
            if (n.is_leaf(deep)) {
              leaves.push(n);
            }
          }, deep);
          return leaves;
        });
        api.method("upstream", function(cbak) {
          cbak(node);
          var parent = node.parent();
          if (parent !== void 0) {
            parent.upstream(cbak);
          }
        });
        api.method("subtree", function(nodes, keep_singletons) {
          if (keep_singletons === void 0) {
            keep_singletons = false;
          }
          var node_counts = {};
          for (var i = 0; i < nodes.length; i++) {
            var n = nodes[i];
            if (n !== void 0) {
              n.upstream(function(this_node) {
                var id = this_node.id();
                if (node_counts[id] === void 0) {
                  node_counts[id] = 0;
                }
                node_counts[id]++;
              });
            }
          }
          var is_singleton = function(node_data) {
            var n_children = 0;
            if (node_data.children === void 0) {
              return false;
            }
            for (var i2 = 0; i2 < node_data.children.length; i2++) {
              var id = node_data.children[i2]._id;
              if (node_counts[id] > 0) {
                n_children++;
              }
            }
            return n_children === 1;
          };
          var subtree = {};
          copy_data(data, subtree, 0, function(node_data) {
            var node_id = node_data._id;
            var counts = node_counts[node_id];
            if (counts > 0) {
              if (is_singleton(node_data) && !keep_singletons) {
                return false;
              }
              return true;
            }
            return false;
          });
          return tnt_node(subtree.children[0]);
        });
        var copy_data = function(orig_data, subtree, currBranchLength, condition) {
          if (orig_data === void 0) {
            return;
          }
          if (condition(orig_data)) {
            var copy = copy_node(orig_data, currBranchLength);
            if (subtree.children === void 0) {
              subtree.children = [];
            }
            subtree.children.push(copy);
            if (orig_data.children === void 0) {
              return;
            }
            for (var i = 0; i < orig_data.children.length; i++) {
              copy_data(orig_data.children[i], copy, 0, condition);
            }
          } else {
            if (orig_data.children === void 0) {
              return;
            }
            currBranchLength += orig_data.branch_length || 0;
            for (var i = 0; i < orig_data.children.length; i++) {
              copy_data(orig_data.children[i], subtree, currBranchLength, condition);
            }
          }
        };
        var copy_node = function(node_data, extraBranchLength) {
          var copy = {};
          for (var param in node_data) {
            if (param === "children" || param === "_children" || param === "_parent" || param === "depth") {
              continue;
            }
            if (node_data.hasOwnProperty(param)) {
              copy[param] = node_data[param];
            }
          }
          if (copy.branch_length !== void 0 && extraBranchLength !== void 0) {
            copy.branch_length += extraBranchLength;
          }
          return copy;
        };
        api.method("present", function(cbak) {
          var is_true = false;
          node.apply(function(n) {
            if (cbak(n) === true) {
              is_true = true;
            }
          });
          return is_true;
        });
        api.method("sort", function(cbak) {
          if (data.children === void 0) {
            return;
          }
          var new_children = [];
          for (var i = 0; i < data.children.length; i++) {
            new_children.push(tnt_node(data.children[i]));
          }
          new_children.sort(cbak);
          data.children = [];
          for (var i = 0; i < new_children.length; i++) {
            data.children.push(new_children[i].data());
          }
          for (var i = 0; i < data.children.length; i++) {
            tnt_node(data.children[i]).sort(cbak);
          }
        });
        api.method("flatten", function(preserve_internal) {
          if (node.is_leaf()) {
            return node;
          }
          var data2 = node.data();
          var newroot = copy_node(data2);
          var nodes;
          if (preserve_internal) {
            nodes = node.get_all_nodes();
            nodes.shift();
          } else {
            nodes = node.get_all_leaves();
          }
          newroot.children = [];
          for (var i = 0; i < nodes.length; i++) {
            delete nodes[i].children;
            newroot.children.push(copy_node(nodes[i].data()));
          }
          return tnt_node(newroot);
        });
        api.method("apply", function(cbak, deep) {
          if (deep === void 0) {
            deep = false;
          }
          cbak(node);
          if (data.children !== void 0) {
            for (var i = 0; i < data.children.length; i++) {
              var n = tnt_node(data.children[i]);
              n.apply(cbak, deep);
            }
          }
          if (data._children !== void 0 && deep) {
            for (var j = 0; j < data._children.length; j++) {
              var n = tnt_node(data._children[j]);
              n.apply(cbak, deep);
            }
          }
        });
        api.method("property", function(prop, value) {
          if (arguments.length === 1) {
            if (typeof prop === "function") {
              return prop(data);
            }
            return data[prop];
          }
          if (typeof prop === "function") {
            prop(data, value);
          }
          data[prop] = value;
          return node;
        });
        api.method("is_leaf", function(deep) {
          if (deep) {
            return data.children === void 0 && data._children === void 0;
          }
          return data.children === void 0;
        });
        api.method("id", function() {
          return node.property("_id");
        });
        api.method("node_name", function() {
          return node.property("name");
        });
        api.method("branch_length", function() {
          return node.property("branch_length");
        });
        api.method("root_dist", function() {
          return node.property("_root_dist");
        });
        api.method("children", function(deep) {
          var children = [];
          if (data.children) {
            for (var i = 0; i < data.children.length; i++) {
              children.push(tnt_node(data.children[i]));
            }
          }
          if (data._children && deep) {
            for (var j = 0; j < data._children.length; j++) {
              children.push(tnt_node(data._children[j]));
            }
          }
          if (children.length === 0) {
            return void 0;
          }
          return children;
        });
        api.method("parent", function() {
          if (data._parent === void 0) {
            return void 0;
          }
          return tnt_node(data._parent);
        });
        return node;
      };
      module.exports = exports = tnt_node;
    }
  });

  // node_modules/tnt.tree.node/index.js
  var require_tnt_tree = __commonJS({
    "node_modules/tnt.tree.node/index.js"(exports, module) {
      var node = require_node();
      module.exports = exports = node;
    }
  });

  // node_modules/tnt.tree/src/tree.js
  var require_tree = __commonJS({
    "node_modules/tnt.tree/src/tree.js"(exports, module) {
      var apijs = require_tnt();
      var tnt_tree_node = require_tnt_tree();
      var tree = function() {
        "use strict";
        var dispatch = d3.dispatch("click", "dblclick", "mouseover", "mouseout", "load");
        var conf = {
          duration: 500,
          // Duration of the transitions
          node_display: tree.node_display.circle(),
          label: tree.label.text(),
          layout: tree.layout.vertical(),
          // on_click         : function () {},
          // on_dbl_click     : function () {},
          // on_mouseover     : function () {},
          branch_color: "black",
          id: function(d) {
            return d._id;
          }
        };
        var delay = 0;
        var ease = "cubic-in-out";
        var div_id;
        var svg;
        var vis;
        var links_g;
        var nodes_g;
        var counts = {};
        var base = {
          tree: void 0,
          data: void 0,
          nodes: void 0,
          links: void 0
        };
        var curr = {
          tree: void 0,
          data: void 0,
          nodes: void 0,
          links: void 0
        };
        var t = function(div) {
          div_id = d3.select(div).attr("id");
          var tree_div = d3.select(div).append("div").style("width", conf.layout.width() + "px").attr("class", "tnt_groupDiv");
          var cluster = conf.layout.cluster;
          var n_leaves = curr.tree.get_all_leaves().length;
          var max_leaf_label_length = function(tree2) {
            var max = 0;
            var leaves = tree2.get_all_leaves();
            for (var i = 0; i < leaves.length; i++) {
              var label_width = conf.label.width()(leaves[i]) + d3.functor(conf.node_display.size())(leaves[i]);
              if (label_width > max) {
                max = label_width;
              }
            }
            return max;
          };
          var max_leaf_node_height = function(tree2) {
            var max = 0;
            var leaves = tree2.get_all_leaves();
            for (var i = 0; i < leaves.length; i++) {
              var node_height = d3.functor(conf.node_display.size())(leaves[i]) * 2;
              var label_height = d3.functor(conf.label.height())(leaves[i]);
              max = d3.max([max, node_height, label_height]);
            }
            return max;
          };
          var max_label_length = max_leaf_label_length(curr.tree);
          conf.layout.max_leaf_label_width(max_label_length);
          var max_node_height = max_leaf_node_height(curr.tree);
          var cluster_size_params = {
            n_leaves,
            label_height: max_node_height,
            label_padding: 15
          };
          conf.layout.adjust_cluster_size(cluster_size_params);
          var diagonal = conf.layout.diagonal();
          var transform = conf.layout.transform_node;
          svg = tree_div.append("svg").attr("width", conf.layout.width()).attr("height", conf.layout.height(cluster_size_params) + 30).attr("fill", "none");
          vis = svg.append("g").attr("id", "tnt_st_" + div_id).attr(
            "transform",
            "translate(" + conf.layout.translate_vis()[0] + "," + conf.layout.translate_vis()[1] + ")"
          );
          curr.nodes = cluster.nodes(curr.data);
          conf.layout.scale_branch_lengths(curr);
          curr.links = cluster.links(curr.nodes);
          links_g = vis.append("g").attr("class", "links");
          nodes_g = vis.append("g").attr("class", "nodes");
          var link = links_g.selectAll("path.tnt_tree_link").data(curr.links, function(d) {
            return conf.id(d.target);
          });
          link.enter().append("path").attr("class", "tnt_tree_link").attr("id", function(d) {
            return "tnt_tree_link_" + div_id + "_" + conf.id(d.target);
          }).style("stroke", function(d) {
            return d3.functor(conf.branch_color)(tnt_tree_node(d.source), tnt_tree_node(d.target));
          }).attr("d", diagonal);
          var node = nodes_g.selectAll("g.tnt_tree_node").data(curr.nodes, function(d) {
            return conf.id(d);
          });
          var new_node = node.enter().append("g").attr("class", function(n) {
            if (n.children) {
              if (n.depth === 0) {
                return "root tnt_tree_node";
              } else {
                return "inner tnt_tree_node";
              }
            } else {
              return "leaf tnt_tree_node";
            }
          }).attr("id", function(d) {
            return "tnt_tree_node_" + div_id + "_" + d._id;
          }).attr("transform", transform);
          new_node.each(function(d) {
            conf.node_display.call(this, tnt_tree_node(d));
          });
          new_node.each(function(d) {
            conf.label.call(this, tnt_tree_node(d), conf.layout.type, d3.functor(conf.node_display.size())(tnt_tree_node(d)));
          });
          new_node.on("click", function(node2) {
            var my_node = tnt_tree_node(node2);
            tree.trigger("node:click", my_node);
            dispatch.click.call(this, my_node);
          });
          new_node.on("dblclick", function(node2) {
            var my_node = tnt_tree_node(node2);
            tree.trigger("node:dblclick", my_node);
            dispatch.dblclick.call(this, my_node);
          });
          new_node.on("mouseover", function(node2) {
            var my_node = tnt_tree_node(node2);
            tree.trigger("node:hover", tnt_tree_node(node2));
            dispatch.mouseover.call(this, my_node);
          });
          new_node.on("mouseout", function(node2) {
            var my_node = tnt_tree_node(node2);
            tree.trigger("node:mouseout", tnt_tree_node(node2));
            dispatch.mouseout.call(this, my_node);
          });
          dispatch.load();
          api.method("update", function() {
            tree_div.style("width", conf.layout.width() + "px");
            svg.attr("width", conf.layout.width());
            var cluster2 = conf.layout.cluster;
            var diagonal2 = conf.layout.diagonal();
            var transform2 = conf.layout.transform_node;
            var max_label_length2 = max_leaf_label_length(curr.tree);
            conf.layout.max_leaf_label_width(max_label_length2);
            var max_node_height2 = max_leaf_node_height(curr.tree);
            var n_leaves2 = curr.tree.get_all_leaves().length;
            var cluster_size_params2 = {
              n_leaves: n_leaves2,
              label_height: max_node_height2,
              label_padding: 15
            };
            conf.layout.adjust_cluster_size(cluster_size_params2);
            svg.transition().duration(conf.duration).ease(ease).attr("height", conf.layout.height(cluster_size_params2) + 30);
            vis.transition().duration(conf.duration).attr(
              "transform",
              "translate(" + conf.layout.translate_vis()[0] + "," + conf.layout.translate_vis()[1] + ")"
            );
            curr.nodes = cluster2.nodes(curr.data);
            conf.layout.scale_branch_lengths(curr);
            curr.links = cluster2.links(curr.nodes);
            var link2 = links_g.selectAll("path.tnt_tree_link").data(curr.links, function(d) {
              return conf.id(d.target);
            });
            var node2 = nodes_g.selectAll("g.tnt_tree_node").data(curr.nodes, function(d) {
              return conf.id(d);
            });
            var exit_link = link2.exit().remove();
            link2.enter().append("path").attr("class", "tnt_tree_link").attr("id", function(d) {
              return "tnt_tree_link_" + div_id + "_" + conf.id(d.target);
            }).attr("stroke", function(d) {
              return d3.functor(conf.branch_color)(tnt_tree_node(d.source), tnt_tree_node(d.target));
            }).attr("d", diagonal2);
            link2.transition().ease(ease).duration(conf.duration).attr("d", diagonal2);
            var new_node2 = node2.enter().append("g").attr("class", function(n) {
              if (n.children) {
                if (n.depth === 0) {
                  return "root tnt_tree_node";
                } else {
                  return "inner tnt_tree_node";
                }
              } else {
                return "leaf tnt_tree_node";
              }
            }).attr("id", function(d) {
              return "tnt_tree_node_" + div_id + "_" + d._id;
            }).attr("transform", transform2);
            node2.exit().remove();
            new_node2.on("click", function(node3) {
              var my_node = tnt_tree_node(node3);
              tree.trigger("node:click", my_node);
              dispatch.click.call(this, my_node);
            });
            new_node2.on("dblclick", function(node3) {
              var my_node = tnt_tree_node(node3);
              tree.trigger("node:dblclick", my_node);
              dispatch.dblclick.call(this, my_node);
            });
            new_node2.on("mouseover", function(node3) {
              var my_node = tnt_tree_node(node3);
              tree.trigger("node:hover", tnt_tree_node(node3));
              dispatch.mouseover.call(this, my_node);
            });
            new_node2.on("mouseout", function(node3) {
              var my_node = tnt_tree_node(node3);
              tree.trigger("node:mouseout", tnt_tree_node(node3));
              dispatch.mouseout.call(this, my_node);
            });
            t.update_nodes();
            node2.transition().ease(ease).duration(conf.duration).attr("transform", transform2);
          });
          api.method("update_nodes", function() {
            var node2 = nodes_g.selectAll("g.tnt_tree_node");
            node2.each(function() {
              conf.node_display.reset.call(this);
            });
            node2.each(function(d) {
              conf.node_display.call(this, tnt_tree_node(d));
            });
            node2.each(function(d) {
              conf.label.call(this, tnt_tree_node(d), conf.layout.type, d3.functor(conf.node_display.size())(tnt_tree_node(d)));
            });
          });
        };
        var api = apijs(t).getset(conf);
        api.method("scale_bar", function(n, units) {
          if (!t.layout().scale()) {
            return;
          }
          if (!units) {
            units = "pixel";
          }
          var val;
          links_g.selectAll("path").each(function(p) {
            if (val) return;
            var d = this.getAttribute("d");
            var pathParts = d.split(/[MLA]/);
            var toStr = pathParts.pop();
            var fromStr = pathParts.pop();
            var from = fromStr.split(",");
            var to = toStr.split(",");
            var deltaX = to[0] - from[0];
            var deltaY = to[1] - from[1];
            var pixelsDist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            var source = p.source;
            var target = p.target;
            var branchDist = target._root_dist - source._root_dist;
            if (branchDist) {
              if (units === "pixel") {
                val = branchDist / pixelsDist * n;
              } else if (units === "tree") {
                val = pixelsDist / branchDist * n;
              }
            }
          });
          return val;
        });
        api.method("data", function(d) {
          if (!arguments.length) {
            return base.data;
          }
          base.data = d;
          curr.data = d;
          var newtree = tnt_tree_node(base.data);
          t.root(newtree);
          base.tree = newtree;
          curr.tree = base.tree;
          tree.trigger("data:hasChanged", base.data);
          return this;
        });
        api.method("root", function() {
          return curr.tree;
        });
        return d3.rebind(t, dispatch, "on");
      };
      module.exports = exports = tree;
    }
  });

  // node_modules/tnt.tree/src/label.js
  var require_label = __commonJS({
    "node_modules/tnt.tree/src/label.js"(exports, module) {
      var apijs = require_tnt();
      var tree = {};
      tree.label = function() {
        "use strict";
        var dispatch = d3.dispatch("click", "dblclick", "mouseover", "mouseout");
        var label = function(node, layout_type, node_size) {
          if (typeof node !== "function") {
            throw node;
          }
          label.display().call(this, node, layout_type).attr("class", "tnt_tree_label").attr("transform", function(d) {
            var t = label.transform()(node, layout_type);
            return "translate (" + (t.translate[0] + node_size) + " " + t.translate[1] + ")rotate(" + t.rotate + ")";
          }).on("click", function() {
            dispatch.click.call(this, node);
          }).on("dblclick", function() {
            dispatch.dblclick.call(this, node);
          }).on("mouseover", function() {
            dispatch.mouseover.call(this, node);
          }).on("mouseout", function() {
            dispatch.mouseout.call(this, node);
          });
        };
        var api = apijs(label).getset("width", function() {
          throw "Need a width callback";
        }).getset("height", function() {
          throw "Need a height callback";
        }).getset("display", function() {
          throw "Need a display callback";
        }).getset("transform", function() {
          throw "Need a transform callback";
        });
        return d3.rebind(label, dispatch, "on");
      };
      tree.label.text = function() {
        var label = tree.label();
        var api = apijs(label).getset("fontsize", 10).getset("fontweight", "normal").getset("color", "#000").getset("text", function(d) {
          return d.data().name;
        });
        label.display(function(node, layout_type) {
          var l = d3.select(this).append("text").attr("text-anchor", function(d) {
            if (layout_type === "radial") {
              return d.x % 360 < 180 ? "start" : "end";
            }
            return "start";
          }).text(function() {
            return label.text()(node);
          }).style("font-size", function() {
            return d3.functor(label.fontsize())(node) + "px";
          }).style("font-weight", function() {
            return d3.functor(label.fontweight())(node);
          }).style("fill", d3.functor(label.color())(node));
          return l;
        });
        label.transform(function(node, layout_type) {
          var d = node.data();
          var t = {
            translate: [5, 5],
            rotate: 0
          };
          if (layout_type === "radial") {
            t.translate[1] = t.translate[1] - (d.x % 360 < 180 ? 0 : label.fontsize());
            t.rotate = d.x % 360 < 180 ? 0 : 180;
          }
          return t;
        });
        label.width(function(node) {
          var svg = d3.select("body").append("svg").attr("height", 0).style("visibility", "hidden");
          var text = svg.append("text").style("font-size", d3.functor(label.fontsize())(node) + "px").text(label.text()(node));
          var width = text.node().getBBox().width;
          svg.remove();
          return width;
        });
        label.height(function(node) {
          return d3.functor(label.fontsize())(node);
        });
        return label;
      };
      tree.label.svg = function() {
        var label = tree.label();
        var api = apijs(label).getset("element", function(d) {
          return d.data().element;
        });
        label.display(function(node, layout_type) {
          var n = label.element()(node);
          this.appendChild(n.node());
          return n;
        });
        label.transform(function(node, layout_type) {
          var d = node.data();
          var t = {
            translate: [10, -label.height()() / 2],
            rotate: 0
          };
          if (layout_type === "radial") {
            t.translate[0] = t.translate[0] + (d.x % 360 < 180 ? 0 : label.width()()), t.translate[1] = t.translate[1] + (d.x % 360 < 180 ? 0 : label.height()()), t.rotate = d.x % 360 < 180 ? 0 : 180;
          }
          return t;
        });
        return label;
      };
      tree.label.img = function() {
        var label = tree.label();
        var api = apijs(label).getset("src", function() {
        });
        label.display(function(node, layout_type) {
          if (label.src()(node)) {
            var l = d3.select(this).append("image").attr("width", label.width()()).attr("height", label.height()()).attr("xlink:href", label.src()(node));
            return l;
          }
          return d3.select(this).append("text").text("");
        });
        label.transform(function(node, layout_type) {
          var d = node.data();
          var t = {
            translate: [10, -label.height()() / 2],
            rotate: 0
          };
          if (layout_type === "radial") {
            t.translate[0] = t.translate[0] + (d.x % 360 < 180 ? 0 : label.width()()), t.translate[1] = t.translate[1] + (d.x % 360 < 180 ? 0 : label.height()()), t.rotate = d.x % 360 < 180 ? 0 : 180;
          }
          return t;
        });
        return label;
      };
      tree.label.composite = function() {
        var labels = [];
        var label = function(node, layout_type, node_size) {
          var curr_xoffset = 0;
          for (var i = 0; i < labels.length; i++) {
            var display = labels[i];
            (function(offset) {
              display.transform(function(node2, layout_type2) {
                var tsuper = display._super_.transform()(node2, layout_type2);
                var t = {
                  translate: [offset + tsuper.translate[0], tsuper.translate[1]],
                  rotate: tsuper.rotate
                };
                return t;
              });
            })(curr_xoffset);
            curr_xoffset += 10;
            curr_xoffset += display.width()(node);
            display.call(this, node, layout_type, node_size);
          }
        };
        var api = apijs(label);
        api.method("add_label", function(display, node) {
          display._super_ = {};
          apijs(display._super_).get("transform", display.transform());
          labels.push(display);
          return label;
        });
        api.method("width", function() {
          return function(node) {
            var tot_width = 0;
            for (var i = 0; i < labels.length; i++) {
              tot_width += parseInt(labels[i].width()(node));
              tot_width += parseInt(labels[i]._super_.transform()(node).translate[0]);
            }
            return tot_width;
          };
        });
        api.method("height", function() {
          return function(node) {
            var max_height = 0;
            for (var i = 0; i < labels.length; i++) {
              var curr_height = labels[i].height()(node);
              if (curr_height > max_height) {
                max_height = curr_height;
              }
            }
            return max_height;
          };
        });
        return label;
      };
      module.exports = exports = tree.label;
    }
  });

  // node_modules/tnt.tree/src/diagonal.js
  var require_diagonal = __commonJS({
    "node_modules/tnt.tree/src/diagonal.js"(exports, module) {
      var apijs = require_tnt();
      var tree = {};
      tree.diagonal = function() {
        var d = function(diagonalPath) {
          var source = diagonalPath.source;
          var target = diagonalPath.target;
          var midpointX = (source.x + target.x) / 2;
          var midpointY = (source.y + target.y) / 2;
          var pathData = [source, { x: target.x, y: source.y }, target];
          pathData = pathData.map(d.projection());
          return d.path()(pathData, radial_calc.call(this, pathData));
        };
        var api = apijs(d).getset("projection").getset("path");
        var coordinateToAngle = function(coord, radius) {
          var wholeAngle = 2 * Math.PI, quarterAngle = wholeAngle / 4;
          var coordQuad = coord[0] >= 0 ? coord[1] >= 0 ? 1 : 2 : coord[1] >= 0 ? 4 : 3, coordBaseAngle = Math.abs(Math.asin(coord[1] / radius));
          var coordAngle;
          switch (coordQuad) {
            case 1:
              coordAngle = quarterAngle - coordBaseAngle;
              break;
            case 2:
              coordAngle = quarterAngle + coordBaseAngle;
              break;
            case 3:
              coordAngle = 2 * quarterAngle + quarterAngle - coordBaseAngle;
              break;
            case 4:
              coordAngle = 3 * quarterAngle + coordBaseAngle;
          }
          return coordAngle;
        };
        var radial_calc = function(pathData) {
          var src = pathData[0];
          var mid = pathData[1];
          var dst = pathData[2];
          var radius = Math.sqrt(src[0] * src[0] + src[1] * src[1]);
          var srcAngle = coordinateToAngle(src, radius);
          var midAngle = coordinateToAngle(mid, radius);
          var clockwise = Math.abs(midAngle - srcAngle) > Math.PI ? midAngle <= srcAngle : midAngle > srcAngle;
          return {
            radius,
            clockwise
          };
        };
        return d;
      };
      tree.diagonal.vertical = function(useArc) {
        var path = function(pathData, obj) {
          var src = pathData[0];
          var mid = pathData[1];
          var dst = pathData[2];
          var radius = (mid[1] - src[1]) * 2e3;
          return "M" + src + " A" + [radius, radius] + " 0 0,0 " + mid + "M" + mid + "L" + dst;
        };
        var projection = function(d) {
          return [d.y, d.x];
        };
        return tree.diagonal().path(path).projection(projection);
      };
      tree.diagonal.radial = function() {
        var path = function(pathData, obj) {
          var src = pathData[0];
          var mid = pathData[1];
          var dst = pathData[2];
          var radius = obj.radius;
          var clockwise = obj.clockwise;
          if (clockwise) {
            return "M" + src + " A" + [radius, radius] + " 0 0,0 " + mid + "M" + mid + "L" + dst;
          } else {
            return "M" + mid + " A" + [radius, radius] + " 0 0,0 " + src + "M" + mid + "L" + dst;
          }
        };
        var projection = function(d) {
          var r = d.y, a = (d.x - 90) / 180 * Math.PI;
          return [r * Math.cos(a), r * Math.sin(a)];
        };
        return tree.diagonal().path(path).projection(projection);
      };
      module.exports = exports = tree.diagonal;
    }
  });

  // node_modules/tnt.tree/src/layout.js
  var require_layout = __commonJS({
    "node_modules/tnt.tree/src/layout.js"(exports, module) {
      var apijs = require_tnt();
      var diagonal = require_diagonal();
      var tree = {};
      tree.layout = function() {
        var l = function() {
        };
        var cluster = d3.layout.cluster().sort(null).value(function(d) {
          return d.length;
        }).separation(function() {
          return 1;
        });
        var api = apijs(l).getset("scale", true).getset("max_leaf_label_width", 0).method("cluster", cluster).method("yscale", function() {
          throw "yscale is not defined in the base object";
        }).method("adjust_cluster_size", function() {
          throw "adjust_cluster_size is not defined in the base object";
        }).method("width", function() {
          throw "width is not defined in the base object";
        }).method("height", function() {
          throw "height is not defined in the base object";
        });
        api.method("scale_branch_lengths", function(curr) {
          if (l.scale() === false) {
            return;
          }
          var nodes = curr.nodes;
          var tree2 = curr.tree;
          var root_dists = nodes.map(function(d) {
            return d._root_dist;
          });
          var yscale = l.yscale(root_dists);
          tree2.apply(function(node) {
            node.property("y", yscale(node.root_dist()));
          });
        });
        return l;
      };
      tree.layout.vertical = function() {
        var layout = tree.layout();
        layout.type = "vertical";
        var api = apijs(layout).getset("width", 360).get("translate_vis", [20, 20]).method("diagonal", diagonal.vertical).method("transform_node", function(d) {
          return "translate(" + d.y + "," + d.x + ")";
        });
        api.method("height", function(params) {
          return params.n_leaves * params.label_height;
        });
        api.method("yscale", function(dists) {
          return d3.scale.linear().domain([0, d3.max(dists)]).range([0, layout.width() - 20 - layout.max_leaf_label_width()]);
        });
        api.method("adjust_cluster_size", function(params) {
          var h = layout.height(params);
          var w = layout.width() - layout.max_leaf_label_width() - layout.translate_vis()[0] - params.label_padding;
          layout.cluster.size([h, w]);
          return layout;
        });
        return layout;
      };
      tree.layout.radial = function() {
        var layout = tree.layout();
        layout.type = "radial";
        var default_width = 360;
        var r = default_width / 2;
        var conf = {
          width: 360
        };
        var api = apijs(layout).getset(conf).getset("translate_vis", [r, r]).method("transform_node", function(d) {
          return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
        }).method("diagonal", diagonal.radial).method("height", function() {
          return conf.width;
        });
        layout.width.transform(function(val) {
          r = val / 2;
          layout.cluster.size([360, r]);
          layout.translate_vis([r, r]);
          return val;
        });
        api.method("yscale", function(dists) {
          return d3.scale.linear().domain([0, d3.max(dists)]).range([0, r]);
        });
        api.method("adjust_cluster_size", function(params) {
          r = layout.width() / 2 - layout.max_leaf_label_width() - 20;
          layout.cluster.size([360, r]);
          return layout;
        });
        return layout;
      };
      module.exports = exports = tree.layout;
    }
  });

  // node_modules/tnt.tree/src/node_display.js
  var require_node_display = __commonJS({
    "node_modules/tnt.tree/src/node_display.js"(exports, module) {
      var apijs = require_tnt();
      var tree = {};
      tree.node_display = function() {
        "use strict";
        var n = function(node) {
          var proxy;
          var thisProxy = d3.select(this).select(".tnt_tree_node_proxy");
          if (thisProxy[0][0] === null) {
            proxy = d3.select(this).append("rect").attr("class", "tnt_tree_node_proxy");
          } else {
            proxy = thisProxy;
          }
          n.display().call(this, node);
          var size = d3.functor(n.size())(node);
          proxy.attr("x", -size).attr("y", -size).attr("width", size * 2).attr("height", size * 2);
        };
        var api = apijs(n).getset("size", 4.4).getset("fill", "black").getset("stroke", "black").getset("stroke_width", "1px").getset("display", function() {
          throw "display is not defined in the base object";
        });
        api.method("reset", function() {
          d3.select(this).selectAll("*:not(.tnt_tree_node_proxy)").remove();
        });
        return n;
      };
      tree.node_display.circle = function() {
        var n = tree.node_display();
        n.display(function(node) {
          d3.select(this).append("circle").attr("r", function(d) {
            return d3.functor(n.size())(node);
          }).attr("fill", function(d) {
            return d3.functor(n.fill())(node);
          }).attr("stroke", function(d) {
            return d3.functor(n.stroke())(node);
          }).attr("stroke-width", function(d) {
            return d3.functor(n.stroke_width())(node);
          }).attr("class", "tnt_node_display_elem");
        });
        return n;
      };
      tree.node_display.square = function() {
        var n = tree.node_display();
        n.display(function(node) {
          var s = d3.functor(n.size())(node);
          d3.select(this).append("rect").attr("x", function(d) {
            return -s;
          }).attr("y", function(d) {
            return -s;
          }).attr("width", function(d) {
            return s * 2;
          }).attr("height", function(d) {
            return s * 2;
          }).attr("fill", function(d) {
            return d3.functor(n.fill())(node);
          }).attr("stroke", function(d) {
            return d3.functor(n.stroke())(node);
          }).attr("stroke-width", function(d) {
            return d3.functor(n.stroke_width())(node);
          }).attr("class", "tnt_node_display_elem");
        });
        return n;
      };
      tree.node_display.triangle = function() {
        var n = tree.node_display();
        n.display(function(node) {
          var s = d3.functor(n.size())(node);
          d3.select(this).append("polygon").attr("points", -s + ",0 " + s + "," + -s + " " + s + "," + s).attr("fill", function(d) {
            return d3.functor(n.fill())(node);
          }).attr("stroke", function(d) {
            return d3.functor(n.stroke())(node);
          }).attr("stroke-width", function(d) {
            return d3.functor(n.stroke_width())(node);
          }).attr("class", "tnt_node_display_elem");
        });
        return n;
      };
      module.exports = exports = tree.node_display;
    }
  });

  // node_modules/tnt.tree/src/index.js
  var require_src2 = __commonJS({
    "node_modules/tnt.tree/src/index.js"(exports, module) {
      var tree = require_tree();
      tree.label = require_label();
      tree.diagonal = require_diagonal();
      tree.layout = require_layout();
      tree.node_display = require_node_display();
      module.exports = exports = tree;
    }
  });

  // node_modules/tnt.tree/index.js
  var require_tnt3 = __commonJS({
    "node_modules/tnt.tree/index.js"(exports, module) {
      var tree;
      module.exports = tree = require_src2();
      var eventsystem = require_biojs_events();
      eventsystem.mixin(tree);
    }
  });

  // node_modules/tnt.newick/src/newick.js
  var require_newick = __commonJS({
    "node_modules/tnt.newick/src/newick.js"(exports, module) {
      module.exports = {
        parse_newick: function(s) {
          var ancestors = [];
          var tree = {};
          var tokens = s.split(/\s*(;|\(|\)|,|:)\s*/);
          var subtree;
          for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            switch (token) {
              case "(":
                subtree = {};
                tree.children = [subtree];
                ancestors.push(tree);
                tree = subtree;
                break;
              case ",":
                subtree = {};
                ancestors[ancestors.length - 1].children.push(subtree);
                tree = subtree;
                break;
              case ")":
                tree = ancestors.pop();
                break;
              case ":":
                break;
              default:
                var x = tokens[i - 1];
                if (x == ")" || x == "(" || x == ",") {
                  tree.name = token;
                } else if (x == ":") {
                  tree.branch_length = parseFloat(token);
                }
            }
          }
          return tree;
        },
        parse_nhx: function(s) {
          var ancestors = [];
          var tree = {};
          var subtree;
          var tokens = s.split(/\s*(;|\(|\)|\[|\]|,|:|=)\s*/);
          for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            switch (token) {
              case "(":
                subtree = {};
                tree.children = [subtree];
                ancestors.push(tree);
                tree = subtree;
                break;
              case ",":
                subtree = {};
                ancestors[ancestors.length - 1].children.push(subtree);
                tree = subtree;
                break;
              case ")":
                tree = ancestors.pop();
                break;
              case ":":
                break;
              default:
                var x = tokens[i - 1];
                if (x == ")" || x == "(" || x == ",") {
                  tree.name = token;
                } else if (x == ":") {
                  var test_type = typeof token;
                  if (!isNaN(token)) {
                    tree.branch_length = parseFloat(token);
                  }
                } else if (x == "=") {
                  var x2 = tokens[i - 2];
                  switch (x2) {
                    case "D":
                      tree.duplication = token;
                      break;
                    case "G":
                      tree.gene_id = token;
                      break;
                    case "T":
                      tree.taxon_id = token;
                      break;
                    default:
                      tree[tokens[i - 2]] = token;
                  }
                } else {
                  var test;
                }
            }
          }
          return tree;
        }
      };
    }
  });

  // node_modules/tnt.newick/index.js
  var require_tnt4 = __commonJS({
    "node_modules/tnt.newick/index.js"(exports, module) {
      module.exports = require_newick();
    }
  });

  // node_modules/tnt.board/src/board.js
  var require_board = __commonJS({
    "node_modules/tnt.board/src/board.js"(exports, module) {
      var apijs = require_tnt();
      var deferCancel = require_tnt2().defer_cancel;
      var board = function() {
        "use strict";
        var svg;
        var div_id;
        var tracks = [];
        var min_width = 50;
        var height = 0;
        var width = 920;
        var height_offset = 20;
        var loc = {
          species: void 0,
          chr: void 0,
          from: 0,
          to: 500
        };
        var caps = {
          left: void 0,
          right: void 0
        };
        var cap_width = 3;
        var bgColor = d3.rgb("#F8FBEF");
        var pane;
        var svg_g;
        var xScale;
        var zoomEventHandler = d3.behavior.zoom();
        var limits = {
          min: 0,
          max: 1e3,
          zoom_out: 1e3,
          zoom_in: 100
        };
        var dur = 500;
        var drag_allowed = true;
        var exports2 = {
          ease: d3.ease("cubic-in-out"),
          extend_canvas: {
            left: 0,
            right: 0
          },
          show_frame: true
          // limits        : function () {throw "The limits method should be defined"}
        };
        var track_vis = function(div) {
          div_id = d3.select(div).attr("id");
          d3.select(div).classed("tnt", true);
          var browserDiv = d3.select(div).append("div").attr("id", "tnt_" + div_id).style("position", "relative").classed("tnt_framed", exports2.show_frame ? true : false).style("width", width + cap_width * 2 + exports2.extend_canvas.right + exports2.extend_canvas.left + "px");
          var groupDiv = browserDiv.append("div").attr("class", "tnt_groupDiv");
          svg = groupDiv.append("svg").attr("class", "tnt_svg").attr("width", width).attr("height", height).attr("pointer-events", "all");
          svg_g = svg.append("g").attr("transform", "translate(0,20)").append("g").attr("class", "tnt_g");
          caps.left = svg_g.append("rect").attr("id", "tnt_" + div_id + "_5pcap").attr("x", 0).attr("y", 0).attr("width", 0).attr("height", height).attr("fill", "red");
          caps.right = svg_g.append("rect").attr("id", "tnt_" + div_id + "_3pcap").attr("x", width - cap_width).attr("y", 0).attr("width", 0).attr("height", height).attr("fill", "red");
          pane = svg_g.append("rect").attr("class", "tnt_pane").attr("id", "tnt_" + div_id + "_pane").attr("width", width).attr("height", height).style("fill", bgColor);
        };
        var api = apijs(track_vis).getset(exports2).getset(limits).getset(loc);
        api.transform(track_vis.extend_canvas, function(val) {
          var prev_val = track_vis.extend_canvas();
          val.left = val.left || prev_val.left;
          val.right = val.right || prev_val.right;
          return val;
        });
        api.method("start", function() {
          if (limits.max - limits.min < limits.zoom_out) {
            limits.zoom_out = limits.max - limits.min;
          }
          plot();
          for (var i = 0; i < tracks.length; i++) {
            if (tracks[i].g) {
              tracks[i].g.remove();
            }
            _init_track(tracks[i]);
          }
          _place_tracks();
          var cont = function() {
            if (loc.to - loc.from < limits.zoom_in) {
              if (loc.from + limits.zoom_in > limits.max) {
                loc.to = limits.max;
              } else {
                loc.to = loc.from + limits.zoom_in;
              }
            }
            for (var i2 = 0; i2 < tracks.length; i2++) {
              _update_track(tracks[i2], loc);
            }
          };
          cont();
        });
        api.method("update", function() {
          for (var i = 0; i < tracks.length; i++) {
            _update_track(tracks[i]);
          }
        });
        var _update_track = function(track, where) {
          if (track.data()) {
            var track_data = track.data();
            var data_updater = track_data;
            data_updater.call(track, {
              "loc": where,
              "on_success": function() {
                track.display().update.call(track, where);
              }
            });
          }
        };
        var plot = function() {
          xScale = d3.scale.linear().domain([loc.from, loc.to]).range([0, width]);
          if (drag_allowed) {
            svg_g.call(
              zoomEventHandler.x(xScale).scaleExtent([(loc.to - loc.from) / (limits.zoom_out - 1), (loc.to - loc.from) / limits.zoom_in]).on("zoom", _move)
            );
          }
        };
        var _reorder = function(new_tracks) {
          var found_indexes = [];
          for (var j = 0; j < new_tracks.length; j++) {
            var found = false;
            for (var i = 0; i < tracks.length; i++) {
              if (tracks[i].id() === new_tracks[j].id()) {
                found = true;
                found_indexes[i] = true;
                break;
              }
            }
            if (!found) {
              _init_track(new_tracks[j]);
              _update_track(new_tracks[j], { from: loc.from, to: loc.to });
            }
          }
          for (var x = 0; x < tracks.length; x++) {
            if (!found_indexes[x]) {
              tracks[x].g.remove();
            }
          }
          tracks = new_tracks;
          _place_tracks();
        };
        api.method("scroll", function(factor) {
          var amount = Math.abs(factor);
          if (factor > 0) {
            _manual_move(amount, 1);
          } else if (factor < 0) {
            _manual_move(amount, -1);
          }
        });
        api.method("zoom", function(factor) {
          _manual_move(1 / factor, 0);
        });
        api.method("find_track", function(id) {
          for (var i = 0; i < tracks.length; i++) {
            if (tracks[i].id() === id) {
              return tracks[i];
            }
          }
        });
        api.method("remove_track", function(track) {
          track.g.remove();
        });
        api.method("add_track", function(track) {
          if (track instanceof Array) {
            for (var i = 0; i < track.length; i++) {
              track_vis.add_track(track[i]);
            }
            return track_vis;
          }
          tracks.push(track);
          return track_vis;
        });
        api.method("tracks", function(ts) {
          if (!arguments.length) {
            return tracks;
          }
          _reorder(ts);
          return this;
        });
        api.method("width", function(w) {
          if (!arguments.length) {
            return width;
          }
          if (w < min_width) {
            w = min_width;
          }
          if (div_id !== void 0) {
            d3.select("#tnt_" + div_id).select("svg").attr("width", w);
            d3.select("#tnt_" + div_id).style("width", parseInt(w) + cap_width * 2 + "px");
            d3.select("#tnt_" + div_id + "_pane").attr("width", w);
            caps.right.attr("x", w - cap_width);
            width = w;
            xScale.range([0, width]);
            plot();
            for (var i = 0; i < tracks.length; i++) {
              tracks[i].g.select("rect").attr("width", w);
              tracks[i].display().scale(xScale);
              tracks[i].display().reset.call(tracks[i]);
              tracks[i].display().init.call(tracks[i], w);
              tracks[i].display().update.call(tracks[i], loc);
            }
          } else {
            width = w;
          }
          return track_vis;
        });
        api.method("allow_drag", function(b) {
          if (!arguments.length) {
            return drag_allowed;
          }
          drag_allowed = b;
          if (drag_allowed) {
            if (xScale !== void 0) {
              svg_g.call(zoomEventHandler.x(xScale).scaleExtent([(loc.to - loc.from) / (limits.zoom_out - 1), (loc.to - loc.from) / limits.zoom_in]).on("zoom", _move));
            }
          } else {
            zoomEventHandler.x(d3.scale.linear()).on("zoom", null);
          }
          return track_vis;
        });
        var _place_tracks = function() {
          var h = 0;
          for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            if (track.g.attr("transform")) {
              track.g.transition().duration(dur).attr("transform", "translate(" + exports2.extend_canvas.left + "," + h + ")");
            } else {
              track.g.attr("transform", "translate(" + exports2.extend_canvas.left + "," + h + ")");
            }
            h += track.height();
          }
          svg.attr("height", h + height_offset);
          d3.select("#tnt_" + div_id).style("height", h + 10 + height_offset + "px");
          d3.select("#tnt_" + div_id + "_5pcap").attr("height", h).each(function(d) {
            move_to_front(this);
          });
          d3.select("#tnt_" + div_id + "_3pcap").attr("height", h).each(function(d) {
            move_to_front(this);
          });
          pane.attr("height", h + height_offset);
          return track_vis;
        };
        var _init_track = function(track) {
          track.g = svg.select("g").select("g").append("g").attr("class", "tnt_track").attr("height", track.height());
          track.g.append("rect").attr("x", 0).attr("y", 0).attr("width", track_vis.width()).attr("height", track.height()).style("fill", track.color()).style("pointer-events", "none");
          if (track.display()) {
            track.display().scale(xScale).init.call(track, width);
          }
          return track_vis;
        };
        var _manual_move = function(factor, direction) {
          var oldDomain = xScale.domain();
          var span = oldDomain[1] - oldDomain[0];
          var offset = span * factor - span;
          var newDomain;
          switch (direction) {
            case 1:
              newDomain = [~~oldDomain[0] - offset, ~~(oldDomain[1] - offset)];
              break;
            case -1:
              newDomain = [~~oldDomain[0] + offset, ~~(oldDomain[1] - offset)];
              break;
            case 0:
              newDomain = [oldDomain[0] - ~~(offset / 2), oldDomain[1] + ~~offset / 2];
          }
          var interpolator = d3.interpolateNumber(oldDomain[0], newDomain[0]);
          var ease = exports2.ease;
          var x = 0;
          d3.timer(function() {
            var curr_start = interpolator(ease(x));
            var curr_end;
            switch (direction) {
              case -1:
                curr_end = curr_start + span;
                break;
              case 1:
                curr_end = curr_start + span;
                break;
              case 0:
                curr_end = oldDomain[1] + oldDomain[0] - curr_start;
                break;
            }
            var currDomain = [curr_start, curr_end];
            xScale.domain(currDomain);
            _move(xScale);
            x += 0.02;
            return x > 1;
          });
        };
        var _move_cbak = function() {
          var currDomain = xScale.domain();
          track_vis.from(~~currDomain[0]);
          track_vis.to(~~currDomain[1]);
          for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            _update_track(track, loc);
          }
        };
        var _deferred = deferCancel(_move_cbak, 300);
        var _move = function(new_xScale) {
          if (new_xScale !== void 0 && drag_allowed) {
            zoomEventHandler.x(new_xScale);
          }
          var domain = xScale.domain();
          if (domain[0] <= limits.min + 5) {
            d3.select("#tnt_" + div_id + "_5pcap").attr("width", cap_width).transition().duration(200).attr("width", 0);
          }
          if (domain[1] >= limits.max - 5) {
            d3.select("#tnt_" + div_id + "_3pcap").attr("width", cap_width).transition().duration(200).attr("width", 0);
          }
          if (domain[0] < limits.min) {
            zoomEventHandler.translate([zoomEventHandler.translate()[0] - xScale(limits.min) + xScale.range()[0], zoomEventHandler.translate()[1]]);
          } else if (domain[1] > limits.max) {
            zoomEventHandler.translate([zoomEventHandler.translate()[0] - xScale(limits.max) + xScale.range()[1], zoomEventHandler.translate()[1]]);
          }
          _deferred();
          for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            track.display().mover.call(track);
          }
        };
        function move_to_front(elem) {
          elem.parentNode.appendChild(elem);
        }
        return track_vis;
      };
      module.exports = exports = board;
    }
  });

  // node_modules/tnt.board/src/track.js
  var require_track = __commonJS({
    "node_modules/tnt.board/src/track.js"(exports, module) {
      var apijs = require_tnt();
      var iterator = require_tnt2().iterator;
      var track = function() {
        "use strict";
        var display;
        var conf = {
          color: d3.rgb("#CCCCCC"),
          height: 250,
          // data is the object (normally a tnt.track.data object) used to retrieve and update data for the track
          data: track.data.empty(),
          // display          : undefined,
          label: "",
          id: track.id()
        };
        var t = {};
        var api = apijs(t).getset(conf);
        t.display = function(new_plotter) {
          if (!arguments.length) {
            return display;
          }
          display = new_plotter;
          if (typeof display === "function") {
            display.layout && display.layout().height(conf.height);
          } else {
            for (var key in display) {
              if (display.hasOwnProperty(key)) {
                display[key].layout && display[key].layout().height(conf.height);
              }
            }
          }
          return this;
        };
        return t;
      };
      track.id = iterator(1);
      module.exports = exports = track;
    }
  });

  // node_modules/tnt.board/src/spinner.js
  var require_spinner = __commonJS({
    "node_modules/tnt.board/src/spinner.js"(exports, module) {
      var spinner = function() {
        var sp_elem;
        var sp = {};
        sp.on = function() {
          var track = this;
          if (!track.spinner) {
            track.spinner = 1;
          } else {
            track.spinner++;
          }
          if (track.spinner == 1) {
            var container = track.g;
            var bgColor = track.color();
            sp_elem = container.append("svg").attr("class", "tnt_spinner").attr("width", "30px").attr("height", "30px").attr("xmls", "http://www.w3.org/2000/svg").attr("viewBox", "0 0 100 100").attr("preserveAspectRatio", "xMidYMid");
            sp_elem.append("rect").attr("x", "0").attr("y", "0").attr("width", "100").attr("height", "100").attr("rx", "50").attr("ry", "50").attr("fill", bgColor);
            for (var i = 0; i < 12; i++) {
              tick(sp_elem, i, bgColor);
            }
          } else if (track.spinner > 0) {
            var node = sp_elem.node();
            if (node.parentNode) {
              node.parentNode.appendChild(node);
            }
          }
        };
        sp.off = function() {
          var track = this;
          track.spinner--;
          if (!track.spinner) {
            var container = track.g;
            container.selectAll(".tnt_spinner").remove();
          }
        };
        function tick(elem, i, bgColor) {
          elem.append("rect").attr("x", "46.5").attr("y", "40").attr("width", "7").attr("height", "20").attr("rx", "5").attr("ry", "5").attr("fill", d3.rgb(bgColor).darker(2)).attr("transform", "rotate(" + 360 / 12 * i + " 50 50) translate(0 -30)").append("animate").attr("attributeName", "opacity").attr("from", "1").attr("to", "0").attr("dur", "1s").attr("begin", 1 / 12 * i + "s").attr("repeatCount", "indefinite");
        }
        return sp;
      };
      module.exports = exports = spinner;
    }
  });

  // node_modules/tnt.board/src/data.js
  var require_data = __commonJS({
    "node_modules/tnt.board/src/data.js"(exports, module) {
      var apijs = require_tnt();
      var spinner = require_spinner()();
      var tnt_data = {};
      tnt_data.sync = function() {
        var update_track = function(obj) {
          var track = this;
          track.data().elements(update_track.retriever().call(track, obj.loc));
          obj.on_success();
        };
        apijs(update_track).getset("elements", []).getset("retriever", function() {
        });
        return update_track;
      };
      tnt_data.async = function() {
        var update_track = function(obj) {
          var track = this;
          spinner.on.call(track);
          update_track.retriever().call(track, obj.loc).then(function(resp) {
            track.data().elements(resp);
            obj.on_success();
            spinner.off.call(track);
          });
        };
        var api = apijs(update_track).getset("elements", []).getset("retriever");
        return update_track;
      };
      tnt_data.empty = function() {
        var updater = tnt_data.sync();
        return updater;
      };
      module.exports = exports = tnt_data;
    }
  });

  // node_modules/tnt.board/src/layout.js
  var require_layout2 = __commonJS({
    "node_modules/tnt.board/src/layout.js"(exports, module) {
      var apijs = require_tnt();
      var layout = function() {
        var l = function(new_elems) {
          var track = this;
          l.elements().call(track, new_elems);
          return new_elems;
        };
        var api = apijs(l).getset("elements", function() {
        });
        return l;
      };
      layout.identity = function() {
        return layout().elements(function(e) {
          return e;
        });
      };
      module.exports = exports = layout;
    }
  });

  // node_modules/tnt.board/src/feature.js
  var require_feature = __commonJS({
    "node_modules/tnt.board/src/feature.js"(exports, module) {
      var apijs = require_tnt();
      var layout = require_layout2();
      var tnt_feature = function() {
        var dispatch = d3.dispatch("click", "dblclick", "mouseover", "mouseout");
        var config = {
          create: function() {
            throw "create_elem is not defined in the base feature object";
          },
          move: function() {
            throw "move_elem is not defined in the base feature object";
          },
          distribute: function() {
          },
          fixed: function() {
          },
          //layout   : function () {},
          index: void 0,
          layout: layout.identity(),
          color: "#000",
          scale: void 0
        };
        var feature = {};
        var reset = function() {
          var track = this;
          track.g.selectAll(".tnt_elem").remove();
          track.g.selectAll(".tnt_guider").remove();
          track.g.selectAll(".tnt_fixed").remove();
        };
        var init = function(width) {
          var track = this;
          track.g.append("text").attr("class", "tnt_fixed").attr("x", 5).attr("y", 12).attr("font-size", 11).attr("fill", "grey").text(track.label());
          config.fixed.call(track, width);
        };
        var plot = function(new_elems, track, xScale) {
          new_elems.on("click", function(d, i) {
            if (d3.event.defaultPrevented) {
              return;
            }
            dispatch.click.call(this, d, i);
          });
          new_elems.on("mouseover", function(d, i) {
            if (d3.event.defaultPrevented) {
              return;
            }
            dispatch.mouseover.call(this, d, i);
          });
          new_elems.on("dblclick", function(d, i) {
            if (d3.event.defaultPrevented) {
              return;
            }
            dispatch.dblclick.call(this, d, i);
          });
          new_elems.on("mouseout", function(d, i) {
            if (d3.event.defaultPrevented) {
              return;
            }
            dispatch.mouseout.call(this, d, i);
          });
          config.create.call(track, new_elems, xScale);
        };
        var update = function(loc, field) {
          var track = this;
          var svg_g = track.g;
          var elements = track.data().elements();
          if (field !== void 0) {
            elements = elements[field];
          }
          var data_elems = config.layout.call(track, elements);
          if (data_elems === void 0) {
            return;
          }
          var vis_sel;
          var vis_elems;
          if (field !== void 0) {
            vis_sel = svg_g.selectAll(".tnt_elem_" + field);
          } else {
            vis_sel = svg_g.selectAll(".tnt_elem");
          }
          if (config.index) {
            vis_elems = vis_sel.data(data_elems, function(d) {
              if (d !== void 0) {
                return config.index(d);
              }
            });
          } else {
            vis_elems = vis_sel.data(data_elems);
          }
          config.distribute.call(track, vis_elems, config.scale);
          var new_elem = vis_elems.enter();
          new_elem.append("g").attr("class", "tnt_elem").classed("tnt_elem_" + field, field).call(feature.plot, track, config.scale);
          vis_elems.exit().remove();
        };
        var mover = function(field) {
          var track = this;
          var svg_g = track.g;
          var elems;
          if (field !== void 0) {
            elems = svg_g.selectAll(".tnt_elem_" + field);
          } else {
            elems = svg_g.selectAll(".tnt_elem");
          }
          config.move.call(this, elems);
        };
        var mtf = function(elem) {
          elem.parentNode.appendChild(elem);
        };
        var move_to_front = function(field) {
          if (field !== void 0) {
            var track = this;
            var svg_g = track.g;
            svg_g.selectAll(".tnt_elem_" + field).each(function() {
              mtf(this);
            });
          }
        };
        apijs(feature).getset(config).method({
          reset,
          plot,
          update,
          mover,
          init,
          move_to_front
        });
        return d3.rebind(feature, dispatch, "on");
      };
      tnt_feature.composite = function() {
        var displays = {};
        var display_order = [];
        var features = {};
        var reset = function() {
          var track = this;
          for (var display in displays) {
            if (displays.hasOwnProperty(display)) {
              displays[display].reset.call(track);
            }
          }
        };
        var init = function(width) {
          var track = this;
          for (var display in displays) {
            if (displays.hasOwnProperty(display)) {
              displays[display].scale(features.scale());
              displays[display].init.call(track, width);
            }
          }
        };
        var update = function() {
          var track = this;
          for (var i = 0; i < display_order.length; i++) {
            displays[display_order[i]].update.call(track, void 0, display_order[i]);
            displays[display_order[i]].move_to_front.call(track, display_order[i]);
          }
        };
        var mover = function() {
          var track = this;
          for (var display in displays) {
            if (displays.hasOwnProperty(display)) {
              displays[display].mover.call(track, display);
            }
          }
        };
        var add = function(key, display) {
          displays[key] = display;
          display_order.push(key);
          return features;
        };
        var get_displays = function() {
          var ds = [];
          for (var i = 0; i < display_order.length; i++) {
            ds.push(displays[display_order[i]]);
          }
          return ds;
        };
        apijs(features).getset("scale").method({
          reset,
          update,
          mover,
          init,
          add,
          displays: get_displays
        });
        return features;
      };
      tnt_feature.area = function() {
        var feature = tnt_feature.line();
        var line = feature.line();
        var area = d3.svg.area().interpolate(line.interpolate()).tension(feature.tension());
        var data_points;
        var line_create = feature.create();
        feature.create(function(points) {
          var track = this;
          var xScale = feature.scale();
          if (data_points !== void 0) {
            track.g.select("path").remove();
          }
          line_create.call(track, points, xScale);
          area.x(line.x()).y1(line.y()).y0(track.height());
          data_points = points.data();
          points.remove();
          track.g.append("path").attr("class", "tnt_area").classed("tnt_elem", true).datum(data_points).attr("d", area).attr("fill", d3.rgb(feature.color()).brighter());
        });
        var line_move = feature.move();
        feature.move(function(path) {
          var track = this;
          var xScale = feature.scale();
          line_move.call(track, path, xScale);
          area.x(line.x());
          track.g.select(".tnt_area").datum(data_points).attr("d", area);
        });
        return feature;
      };
      tnt_feature.line = function() {
        var feature = tnt_feature();
        var x = function(d) {
          return d.pos;
        };
        var y = function(d) {
          return d.val;
        };
        var tension = 0.7;
        var yScale = d3.scale.linear();
        var line = d3.svg.line().interpolate("basis");
        feature.line = function() {
          return line;
        };
        feature.x = function(cbak) {
          if (!arguments.length) {
            return x;
          }
          x = cbak;
          return feature;
        };
        feature.y = function(cbak) {
          if (!arguments.length) {
            return y;
          }
          y = cbak;
          return feature;
        };
        feature.tension = function(t) {
          if (!arguments.length) {
            return tension;
          }
          tension = t;
          return feature;
        };
        var data_points;
        feature.create(function(points) {
          var track = this;
          var xScale = feature.scale();
          if (data_points !== void 0) {
            track.g.select("path").remove();
          }
          line.tension(tension).x(function(d) {
            return xScale(x(d));
          }).y(function(d) {
            return track.height() - yScale(y(d));
          });
          data_points = points.data();
          points.remove();
          yScale.domain([0, 1]).range([0, track.height() - 2]);
          track.g.append("path").attr("class", "tnt_elem").attr("d", line(data_points)).style("stroke", feature.color()).style("stroke-width", 4).style("fill", "none");
        });
        feature.move(function(path) {
          var track = this;
          var xScale = feature.scale();
          line.x(function(d) {
            return xScale(x(d));
          });
          track.g.select("path").attr("d", line(data_points));
        });
        return feature;
      };
      tnt_feature.conservation = function() {
        var feature = tnt_feature.area();
        var area_create = feature.create();
        feature.create(function(points) {
          var track = this;
          var xScale = feature.scale();
          area_create.call(track, d3.select(points[0][0]), xScale);
        });
        return feature;
      };
      tnt_feature.ensembl = function() {
        var feature = tnt_feature();
        var color2 = "#7FFF00";
        var color3 = "#00BB00";
        feature.fixed(function(width) {
          var track = this;
          var height_offset = ~~(track.height() - track.height() * 0.8) / 2;
          track.g.append("line").attr("class", "tnt_guider tnt_fixed").attr("x1", 0).attr("x2", width).attr("y1", height_offset).attr("y2", height_offset).style("stroke", feature.color()).style("stroke-width", 1);
          track.g.append("line").attr("class", "tnt_guider tnt_fixed").attr("x1", 0).attr("x2", width).attr("y1", track.height() - height_offset).attr("y2", track.height() - height_offset).style("stroke", feature.color()).style("stroke-width", 1);
        });
        feature.create(function(new_elems) {
          var track = this;
          var xScale = feature.scale();
          var height_offset = ~~(track.height() - track.height() * 0.8) / 2;
          new_elems.append("rect").attr("x", function(d) {
            return xScale(d.start);
          }).attr("y", height_offset).attr("width", function(d) {
            return xScale(d.end) - xScale(d.start);
          }).attr("height", track.height() - ~~(height_offset * 2)).attr("fill", track.color()).transition().duration(500).attr("fill", function(d) {
            if (d.type === "high") {
              return d3.rgb(feature.color());
            }
            if (d.type === "low") {
              return d3.rgb(feature.color2());
            }
            return d3.rgb(feature.color3());
          });
        });
        feature.distribute(function(blocks) {
          var xScale = feature.scale();
          blocks.select("rect").attr("width", function(d) {
            return xScale(d.end) - xScale(d.start);
          });
        });
        feature.move(function(blocks) {
          var xScale = feature.scale();
          blocks.select("rect").attr("x", function(d) {
            return xScale(d.start);
          }).attr("width", function(d) {
            return xScale(d.end) - xScale(d.start);
          });
        });
        feature.color2 = function(col) {
          if (!arguments.length) {
            return color2;
          }
          color2 = col;
          return feature;
        };
        feature.color3 = function(col) {
          if (!arguments.length) {
            return color3;
          }
          color3 = col;
          return feature;
        };
        return feature;
      };
      tnt_feature.vline = function() {
        var feature = tnt_feature();
        feature.create(function(new_elems) {
          var xScale = feature.scale();
          var track = this;
          new_elems.append("line").attr("x1", function(d) {
            return xScale(feature.index()(d));
          }).attr("x2", function(d) {
            return xScale(feature.index()(d));
          }).attr("y1", 0).attr("y2", track.height()).attr("stroke", feature.color()).attr("stroke-width", 1);
        });
        feature.move(function(vlines) {
          var xScale = feature.scale();
          vlines.select("line").attr("x1", function(d) {
            return xScale(feature.index()(d));
          }).attr("x2", function(d) {
            return xScale(feature.index()(d));
          });
        });
        return feature;
      };
      tnt_feature.pin = function() {
        var feature = tnt_feature();
        var yScale = d3.scale.linear().domain([0, 0]).range([0, 0]);
        var opts = {
          pos: d3.functor("pos"),
          val: d3.functor("val"),
          domain: [0, 1]
        };
        var pin_ball_r = 5;
        apijs(feature).getset(opts);
        feature.create(function(new_pins) {
          var track = this;
          var xScale = feature.scale();
          yScale.domain(feature.domain()).range([pin_ball_r, track.height() - pin_ball_r - 10]);
          new_pins.append("line").attr("x1", function(d, i) {
            return xScale(d[opts.pos(d, i)]);
          }).attr("y1", function(d) {
            return track.height();
          }).attr("x2", function(d, i) {
            return xScale(d[opts.pos(d, i)]);
          }).attr("y2", function(d, i) {
            return track.height() - yScale(d[opts.val(d, i)]);
          }).attr("stroke", function(d) {
            return d3.functor(feature.color())(d);
          });
          new_pins.append("circle").attr("cx", function(d, i) {
            return xScale(d[opts.pos(d, i)]);
          }).attr("cy", function(d, i) {
            return track.height() - yScale(d[opts.val(d, i)]);
          }).attr("r", pin_ball_r).attr("fill", function(d) {
            return d3.functor(feature.color())(d);
          });
          new_pins.append("text").attr("font-size", "13").attr("x", function(d, i) {
            return xScale(d[opts.pos(d, i)]);
          }).attr("y", function(d, i) {
            return 10;
          }).style("text-anchor", "middle").style("fill", function(d) {
            return d3.functor(feature.color())(d);
          }).text(function(d) {
            return d.label || "";
          });
        });
        feature.distribute(function(pins) {
          pins.select("text").text(function(d) {
            return d.label || "";
          });
        });
        feature.move(function(pins) {
          var track = this;
          var xScale = feature.scale();
          pins.select("line").attr("x1", function(d, i) {
            return xScale(d[opts.pos(d, i)]);
          }).attr("y1", function(d) {
            return track.height();
          }).attr("x2", function(d, i) {
            return xScale(d[opts.pos(d, i)]);
          }).attr("y2", function(d, i) {
            return track.height() - yScale(d[opts.val(d, i)]);
          });
          pins.select("circle").attr("cx", function(d, i) {
            return xScale(d[opts.pos(d, i)]);
          }).attr("cy", function(d, i) {
            return track.height() - yScale(d[opts.val(d, i)]);
          });
          pins.select("text").attr("x", function(d, i) {
            return xScale(d[opts.pos(d, i)]);
          }).text(function(d) {
            return d.label || "";
          });
        });
        feature.fixed(function(width) {
          var track = this;
          track.g.append("line").attr("class", "tnt_fixed").attr("x1", 0).attr("x2", width).attr("y1", track.height()).attr("y2", track.height()).style("stroke", "black").style("stroke-with", "1px");
        });
        return feature;
      };
      tnt_feature.block = function() {
        var feature = tnt_feature();
        apijs(feature).getset("from", function(d) {
          return d.start;
        }).getset("to", function(d) {
          return d.end;
        });
        feature.create(function(new_elems) {
          var track = this;
          var xScale = feature.scale();
          new_elems.append("rect").attr("x", function(d, i) {
            return xScale(feature.from()(d, i));
          }).attr("y", 0).attr("width", function(d, i) {
            return xScale(feature.to()(d, i)) - xScale(feature.from()(d, i));
          }).attr("height", track.height()).attr("fill", track.color()).transition().duration(500).attr("fill", function(d) {
            if (d.color === void 0) {
              return feature.color();
            } else {
              return d.color;
            }
          });
        });
        feature.distribute(function(elems) {
          var xScale = feature.scale();
          elems.select("rect").attr("width", function(d) {
            return xScale(d.end) - xScale(d.start);
          });
        });
        feature.move(function(blocks) {
          var xScale = feature.scale();
          blocks.select("rect").attr("x", function(d) {
            return xScale(d.start);
          }).attr("width", function(d) {
            return xScale(d.end) - xScale(d.start);
          });
        });
        return feature;
      };
      tnt_feature.axis = function() {
        var xAxis;
        var orientation = "top";
        var xScale;
        var feature = {};
        feature.reset = function() {
          xAxis = void 0;
          var track = this;
          track.g.selectAll(".tick").remove();
        };
        feature.plot = function() {
        };
        feature.mover = function() {
          var track = this;
          var svg_g = track.g;
          svg_g.call(xAxis);
        };
        feature.init = function() {
          xAxis = void 0;
        };
        feature.update = function() {
          if (xAxis === void 0) {
            xAxis = d3.svg.axis().scale(xScale).orient(orientation);
          }
          var track = this;
          var svg_g = track.g;
          svg_g.call(xAxis);
        };
        feature.orientation = function(pos) {
          if (!arguments.length) {
            return orientation;
          }
          orientation = pos;
          return this;
        };
        feature.scale = function(s) {
          if (!arguments.length) {
            return xScale;
          }
          xScale = s;
          return this;
        };
        return feature;
      };
      tnt_feature.location = function() {
        var row;
        var xScale;
        var feature = {};
        feature.reset = function() {
          row = void 0;
        };
        feature.plot = function() {
        };
        feature.init = function() {
          row = void 0;
          var track = this;
          track.g.select("text").remove();
        };
        feature.mover = function() {
          var domain = xScale.domain();
          row.select("text").text("Location: " + ~~domain[0] + "-" + ~~domain[1]);
        };
        feature.scale = function(sc) {
          if (!arguments.length) {
            return xScale;
          }
          xScale = sc;
          return this;
        };
        feature.update = function(loc) {
          var track = this;
          var svg_g = track.g;
          var domain = xScale.domain();
          if (row === void 0) {
            row = svg_g;
            row.append("text").text("Location: " + Math.round(domain[0]) + "-" + Math.round(domain[1]));
          }
        };
        return feature;
      };
      module.exports = exports = tnt_feature;
    }
  });

  // node_modules/tnt.board/src/index.js
  var require_src3 = __commonJS({
    "node_modules/tnt.board/src/index.js"(exports, module) {
      var board = require_board();
      board.track = require_track();
      board.track.data = require_data();
      board.track.layout = require_layout2();
      board.track.feature = require_feature();
      board.track.layout = require_layout2();
      module.exports = exports = board;
    }
  });

  // node_modules/tnt.board/index.js
  var require_tnt5 = __commonJS({
    "node_modules/tnt.board/index.js"(exports, module) {
      module.exports = require_src3();
    }
  });

  // node_modules/tntvis/index.js
  var require_tntvis = __commonJS({
    "node_modules/tntvis/index.js"(exports, module) {
      if (typeof tnt === "undefined") {
        module.exports = tnt = require_ta();
      }
      var eventsystem = require_biojs_events();
      eventsystem.mixin(tnt);
      tnt.utils = require_tnt2();
      tnt.tree = require_tnt3();
      tnt.tree.node = require_tnt_tree();
      tnt.tree.parse_newick = require_tnt4().parse_newick;
      tnt.tree.parse_nhx = require_tnt4().parse_nhx;
      tnt.board = require_tnt5();
    }
  });

  // src/utils.js
  var require_utils2 = __commonJS({
    "src/utils.js"(exports, module) {
      module.exports = {
        get_maxs: function(data) {
          const maxs = {};
          let i;
          let sp;
          let internal;
          for (sp in data) {
            if (data.hasOwnProperty(sp)) {
              const sp_data = data[sp];
              for (internal in sp_data) {
                if (maxs[internal] === void 0) {
                  maxs[internal] = [];
                }
                if (sp_data.hasOwnProperty(internal)) {
                  const internal_data = sp_data[internal];
                  for (i = 0; i < internal_data.length; i++) {
                    if (maxs[internal][i] === void 0 || maxs[internal][i] < internal_data[i].length) {
                      maxs[internal][i] = internal_data[i].length;
                    }
                  }
                }
              }
            }
          }
          return maxs;
        }
      };
    }
  });

  // src/hog_state.js
  var require_hog_state = __commonJS({
    "src/hog_state.js"(exports, module) {
      module.exports = function Hog_state() {
        this.current_level = "";
        this.hogs = void 0;
        this.number_species = 0;
        this.removed_hogs = [];
        const that = this;
        this.reset_on = function(tree, per_species3, tax_name, threshold, fam_data, hog_metadata) {
          that.current_level = tax_name;
          that.hogs = void 0;
          that.number_species = 0;
          that.removed_hogs = [];
          that.hog_metadata = hog_metadata;
          const leaves = tree.root().get_all_leaves(true);
          for (let i = 0; i < leaves.length; i++) {
            if (per_species3[leaves[i].property("name")] !== void 0 && per_species3[leaves[i].property("name")][tax_name] !== void 0) {
              const slice = per_species3[leaves[i].property("name")][tax_name];
              if (slice && slice.length > 0) {
                that.number_species += 1;
                that.add_genes(slice);
              }
            }
          }
          if (that.hogs !== void 0) {
            for (let i = 0; i < that.hogs.length; i++) {
              const cov = that.hogs[i].number_species * 100 / that.number_species;
              if (cov >= threshold) {
                that.hogs[i].coverage = cov;
              } else {
                that.removed_hogs.push(i);
              }
            }
            for (let i = that.removed_hogs.length - 1; i >= 0; i--) {
              that.hogs.splice(that.removed_hogs[i], 1);
            }
          }
          let genes_so_far = 0;
          if (that.hogs) {
            for (let i = 0; i < that.hogs.length; i++) {
              that.hogs[i].hog_start = genes_so_far;
              const protid = get_protid_for_genes(fam_data, that.hogs[i].genes);
              if (protid) {
                that.hogs[i].protid = protid;
                if (that.hog_metadata != false) {
                  that.hogs[i].name = that.hog_metadata[that.hogs[i].genes[0]][that.current_level].split("_")[0];
                }
              }
              genes_so_far += that.hogs[i].max_in_hog;
            }
          }
          return that.removed_hogs;
        };
        this.add_genes = function(array_hogs_with_genes) {
          if (!that.hogs) {
            that.hogs = [];
            for (let i = 0; i < array_hogs_with_genes.length; i++) {
              const h = {
                genes: [],
                name: `hog_${i}`,
                number_species: 0,
                max_in_hog: 0,
                coverage: 0,
                hog_pos: i,
                total_hogs: array_hogs_with_genes.length
              };
              that.hogs.push(h);
            }
          }
          for (let i = 0; i < array_hogs_with_genes.length; i++) {
            if (array_hogs_with_genes[i].length > 0) {
              that.hogs[i].genes = that.hogs[i].genes.concat(array_hogs_with_genes[i]);
              that.hogs[i].number_species += 1;
              if (that.hogs[i].max_in_hog < array_hogs_with_genes[i].length) {
                that.hogs[i].max_in_hog = array_hogs_with_genes[i].length;
              }
            }
          }
        };
      };
      function get_protid_for_genes(fam_data, genes) {
        if (!genes || !genes.length) {
          return;
        }
        for (let i = 0; i < genes.length; i++) {
          if (fam_data[genes[i]]) {
            return fam_data[genes[i]].protid;
          }
        }
      }
    }
  });

  // src/features.js
  var require_features = __commonJS({
    "src/features.js"(exports, module) {
      module.exports = {
        hog_feature: tnt.board.track.feature().index(function(d) {
          return d.id;
        }).create(function(new_hog, x_scale) {
          const track = this;
          const padding = ~~(track.height() - track.height() * 0.8) / 2;
          const height = track.height() - ~~(padding * 2);
          const dom1 = x_scale.domain()[1];
          new_hog.append("line").attr("class", "hog_boundary").attr("x1", function(d) {
            const width = 16;
            const x = width * (d.max_in_hog - 1);
            const xnext = width * d.max_in_hog;
            return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
          }).attr("x2", function(d) {
            const width = 16;
            const x = width * (d.max_in_hog - 1);
            const xnext = width * d.max_in_hog;
            return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
          }).attr("y1", 0).attr("y2", track.height()).attr("stroke-width", 2).attr("stroke", "black");
        }).distribute(function(hogs, x_scale) {
          const track = this;
          const padding = ~~(track.height() - track.height() * 0.8) / 2;
          const height = track.height() - ~~(padding * 2);
          const dom1 = x_scale.domain()[1];
          hogs.select("line").transition().duration(200).attr("x1", function(d) {
            const width = 16;
            const x = width * (d.max_in_hog - 1);
            const xnext = width * d.max_in_hog;
            return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
          }).attr("x2", function(d) {
            const width = 16;
            const x = width * (d.max_in_hog - 1);
            const xnext = width * d.max_in_hog;
            return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
          });
        }),
        hog_gene_feature: function() {
          const feature = tnt.board.track.feature();
          var width = 16;
          let color = () => "grey";
          feature.colors = function(c) {
            if (!arguments.length) {
              return color;
            }
            color = c;
            return this;
          };
          feature.index(function(d) {
            return d.id;
          }).create(function(new_elems, x_scale) {
            const track = this;
            const padding = ~~(track.height() - track.height() * 0.8) / 2;
            const height = track.height() - ~~(padding * 2);
            new_elems.append("rect").attr("class", "hog_gene").attr("x", function(d) {
              const x = width * d.pos;
              return x + padding;
            }).attr("y", padding).attr("width", function(d) {
              return width - 2 * padding;
            }).attr("height", height).attr("fill", color);
          }).distribute(function(elems, x_scale) {
            const track = this;
            const padding = ~~(track.height() - track.height() * 0.8) / 2;
            elems.select("rect").transition().attr("x", function(d) {
              const x = width * d.pos;
              return x + padding;
            }).attr("width", function(d) {
              return width - 2 * padding;
            });
          });
          return feature;
        },
        hog_group: tnt.board.track.feature().index((d) => d.name).create(function(new_group, x_scale) {
          const track = this;
          const padding = ~~(track.height() - track.height() * 0.8) / 2;
          const g = new_group.append("g").attr("transform", (g2) => {
            const width = 16;
            const posx = g2.hog_start * width + g2.max_in_hog * width / 2;
            return `translate(${posx}, 0)`;
          }).style("cursor", "pointer").attr("class", (d) => d.name);
          g.append("circle").attr("cx", 0).attr("cy", -12).attr("r", 6).attr("stroke", "#95a5a6").style("cursor", "pointer").style("fill", "none");
          g.append("text").attr("x", 0).attr("y", -11).attr("text-anchor", "middle").attr("alignment-baseline", "middle").style("fill", "#95a5a6").style("font-size", "9px").style("cursor", "pointer").text("?");
        }).distribute(function(elems, x_scale) {
          elems.select("g").transition().attr("transform", function(g) {
            const width = 16;
            const posx = g.hog_start * width + g.max_in_hog * width / 2;
            return `translate(${posx}, 0)`;
          });
        })
      };
    }
  });

  // node_modules/iham-parsers/src/newick.js
  var require_newick2 = __commonJS({
    "node_modules/iham-parsers/src/newick.js"(exports, module) {
      module.exports = {
        parse: function(s) {
          var ancestors = [];
          var tree = {};
          var tokens = s.split(/(\s*;|\(|\)|,|:|"\s*)/);
          var subtree;
          var in_quoted_label = false;
          for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (in_quoted_label && token !== '"') {
              if (tree.name === void 0) {
                tree.name = "";
              }
              tree.name += token;
            } else {
              token = token.trim();
              switch (token) {
                case '"':
                  in_quoted_label = !in_quoted_label;
                  break;
                case "(":
                  subtree = {};
                  tree.children = [subtree];
                  ancestors.push(tree);
                  tree = subtree;
                  break;
                case ",":
                  subtree = {};
                  ancestors[ancestors.length - 1].children.push(subtree);
                  tree = subtree;
                  break;
                case ")":
                  tree = ancestors.pop();
                  break;
                case ":":
                  break;
                default:
                  var x = tokens[i - 1];
                  if (x == ")" || x == "(" || x == ",") {
                    tree.name = token;
                  } else if (x == ":") {
                    tree.branch_length = parseFloat(token);
                  }
              }
            }
          }
          return tree;
        }
      };
    }
  });

  // node_modules/sax/lib/sax.js
  var require_sax = __commonJS({
    "node_modules/sax/lib/sax.js"(exports) {
      (function(sax) {
        sax.parser = function(strict, opt) {
          return new SAXParser(strict, opt);
        };
        sax.SAXParser = SAXParser;
        sax.SAXStream = SAXStream;
        sax.createStream = createStream;
        sax.MAX_BUFFER_LENGTH = 64 * 1024;
        var buffers = [
          "comment",
          "sgmlDecl",
          "textNode",
          "tagName",
          "doctype",
          "procInstName",
          "procInstBody",
          "entity",
          "attribName",
          "attribValue",
          "cdata",
          "script"
        ];
        sax.EVENTS = [
          "text",
          "processinginstruction",
          "sgmldeclaration",
          "doctype",
          "comment",
          "opentagstart",
          "attribute",
          "opentag",
          "closetag",
          "opencdata",
          "cdata",
          "closecdata",
          "error",
          "end",
          "ready",
          "script",
          "opennamespace",
          "closenamespace"
        ];
        function SAXParser(strict, opt) {
          if (!(this instanceof SAXParser)) {
            return new SAXParser(strict, opt);
          }
          var parser = this;
          clearBuffers(parser);
          parser.q = parser.c = "";
          parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH;
          parser.encoding = null;
          parser.opt = opt || {};
          parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags;
          parser.looseCase = parser.opt.lowercase ? "toLowerCase" : "toUpperCase";
          parser.opt.maxEntityCount = parser.opt.maxEntityCount || 512;
          parser.opt.maxEntityDepth = parser.opt.maxEntityDepth || 4;
          parser.entityCount = parser.entityDepth = 0;
          parser.tags = [];
          parser.closed = parser.closedRoot = parser.sawRoot = false;
          parser.tag = parser.error = null;
          parser.strict = !!strict;
          parser.noscript = !!(strict || parser.opt.noscript);
          parser.state = S.BEGIN;
          parser.strictEntities = parser.opt.strictEntities;
          parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES);
          parser.attribList = [];
          if (parser.opt.xmlns) {
            parser.ns = Object.create(rootNS);
          }
          if (parser.opt.unquotedAttributeValues === void 0) {
            parser.opt.unquotedAttributeValues = !strict;
          }
          parser.trackPosition = parser.opt.position !== false;
          if (parser.trackPosition) {
            parser.position = parser.line = parser.column = 0;
          }
          emit(parser, "onready");
        }
        if (!Object.create) {
          Object.create = function(o) {
            function F() {
            }
            F.prototype = o;
            var newf = new F();
            return newf;
          };
        }
        if (!Object.keys) {
          Object.keys = function(o) {
            var a = [];
            for (var i in o) if (o.hasOwnProperty(i)) a.push(i);
            return a;
          };
        }
        function checkBufferLength(parser) {
          var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10);
          var maxActual = 0;
          for (var i = 0, l = buffers.length; i < l; i++) {
            var len = parser[buffers[i]].length;
            if (len > maxAllowed) {
              switch (buffers[i]) {
                case "textNode":
                  closeText(parser);
                  break;
                case "cdata":
                  emitNode(parser, "oncdata", parser.cdata);
                  parser.cdata = "";
                  break;
                case "script":
                  emitNode(parser, "onscript", parser.script);
                  parser.script = "";
                  break;
                default:
                  error(parser, "Max buffer length exceeded: " + buffers[i]);
              }
            }
            maxActual = Math.max(maxActual, len);
          }
          var m = sax.MAX_BUFFER_LENGTH - maxActual;
          parser.bufferCheckPosition = m + parser.position;
        }
        function clearBuffers(parser) {
          for (var i = 0, l = buffers.length; i < l; i++) {
            parser[buffers[i]] = "";
          }
        }
        function flushBuffers(parser) {
          closeText(parser);
          if (parser.cdata !== "") {
            emitNode(parser, "oncdata", parser.cdata);
            parser.cdata = "";
          }
          if (parser.script !== "") {
            emitNode(parser, "onscript", parser.script);
            parser.script = "";
          }
        }
        SAXParser.prototype = {
          end: function() {
            end(this);
          },
          write,
          resume: function() {
            this.error = null;
            return this;
          },
          close: function() {
            return this.write(null);
          },
          flush: function() {
            flushBuffers(this);
          }
        };
        var Stream;
        try {
          Stream = __require("stream").Stream;
        } catch (ex) {
          Stream = function() {
          };
        }
        if (!Stream) Stream = function() {
        };
        var streamWraps = sax.EVENTS.filter(function(ev) {
          return ev !== "error" && ev !== "end";
        });
        function createStream(strict, opt) {
          return new SAXStream(strict, opt);
        }
        function determineBufferEncoding(data, isEnd) {
          if (data.length >= 2) {
            if (data[0] === 255 && data[1] === 254) {
              return "utf-16le";
            }
            if (data[0] === 254 && data[1] === 255) {
              return "utf-16be";
            }
          }
          if (data.length >= 3 && data[0] === 239 && data[1] === 187 && data[2] === 191) {
            return "utf8";
          }
          if (data.length >= 4) {
            if (data[0] === 60 && data[1] === 0 && data[2] === 63 && data[3] === 0) {
              return "utf-16le";
            }
            if (data[0] === 0 && data[1] === 60 && data[2] === 0 && data[3] === 63) {
              return "utf-16be";
            }
            return "utf8";
          }
          return isEnd ? "utf8" : null;
        }
        function SAXStream(strict, opt) {
          if (!(this instanceof SAXStream)) {
            return new SAXStream(strict, opt);
          }
          Stream.apply(this);
          this._parser = new SAXParser(strict, opt);
          this.writable = true;
          this.readable = true;
          var me = this;
          this._parser.onend = function() {
            me.emit("end");
          };
          this._parser.onerror = function(er) {
            me.emit("error", er);
            me._parser.error = null;
          };
          this._decoder = null;
          this._decoderBuffer = null;
          streamWraps.forEach(function(ev) {
            Object.defineProperty(me, "on" + ev, {
              get: function() {
                return me._parser["on" + ev];
              },
              set: function(h) {
                if (!h) {
                  me.removeAllListeners(ev);
                  me._parser["on" + ev] = h;
                  return h;
                }
                me.on(ev, h);
              },
              enumerable: true,
              configurable: false
            });
          });
        }
        SAXStream.prototype = Object.create(Stream.prototype, {
          constructor: {
            value: SAXStream
          }
        });
        SAXStream.prototype._decodeBuffer = function(data, isEnd) {
          if (this._decoderBuffer) {
            data = Buffer.concat([this._decoderBuffer, data]);
            this._decoderBuffer = null;
          }
          if (!this._decoder) {
            var encoding = determineBufferEncoding(data, isEnd);
            if (!encoding) {
              this._decoderBuffer = data;
              return "";
            }
            this._parser.encoding = encoding;
            this._decoder = new TextDecoder(encoding);
          }
          return this._decoder.decode(data, { stream: !isEnd });
        };
        SAXStream.prototype.write = function(data) {
          if (typeof Buffer === "function" && typeof Buffer.isBuffer === "function" && Buffer.isBuffer(data)) {
            data = this._decodeBuffer(data, false);
          } else if (this._decoderBuffer) {
            var remaining = this._decodeBuffer(Buffer.alloc(0), true);
            if (remaining) {
              this._parser.write(remaining);
              this.emit("data", remaining);
            }
          }
          this._parser.write(data.toString());
          this.emit("data", data);
          return true;
        };
        SAXStream.prototype.end = function(chunk) {
          if (chunk && chunk.length) {
            this.write(chunk);
          }
          if (this._decoderBuffer) {
            var finalChunk = this._decodeBuffer(Buffer.alloc(0), true);
            if (finalChunk) {
              this._parser.write(finalChunk);
              this.emit("data", finalChunk);
            }
          } else if (this._decoder) {
            var remaining = this._decoder.decode();
            if (remaining) {
              this._parser.write(remaining);
              this.emit("data", remaining);
            }
          }
          this._parser.end();
          return true;
        };
        SAXStream.prototype.on = function(ev, handler) {
          var me = this;
          if (!me._parser["on" + ev] && streamWraps.indexOf(ev) !== -1) {
            me._parser["on" + ev] = function() {
              var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
              args.splice(0, 0, ev);
              me.emit.apply(me, args);
            };
          }
          return Stream.prototype.on.call(me, ev, handler);
        };
        var CDATAre = /^\[CDATA\[$/i;
        var DOCTYPEre = /^DOCTYPE$/i;
        var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
        var XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
        var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE };
        var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
        var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
        var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
        var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
        function isWhitespace(c) {
          return c === " " || c === "\n" || c === "\r" || c === "	";
        }
        function isQuote(c) {
          return c === '"' || c === "'";
        }
        function isAttribEnd(c) {
          return c === ">" || isWhitespace(c);
        }
        function isMatch(regex, c) {
          return regex.test(c);
        }
        function notMatch(regex, c) {
          return !isMatch(regex, c);
        }
        var S = 0;
        sax.STATE = {
          BEGIN: S++,
          // leading byte order mark or whitespace
          BEGIN_WHITESPACE: S++,
          // leading whitespace
          TEXT: S++,
          // general stuff
          TEXT_ENTITY: S++,
          // &amp and such.
          OPEN_WAKA: S++,
          // <
          SGML_DECL: S++,
          // <!BLARG
          SGML_DECL_QUOTED: S++,
          // <!BLARG foo "bar
          DOCTYPE: S++,
          // <!DOCTYPE
          DOCTYPE_QUOTED: S++,
          // <!DOCTYPE "//blah
          DOCTYPE_DTD: S++,
          // <!DOCTYPE "//blah" [ ...
          DOCTYPE_DTD_QUOTED: S++,
          // <!DOCTYPE "//blah" [ "foo
          COMMENT_STARTING: S++,
          // <!-
          COMMENT: S++,
          // <!--
          COMMENT_ENDING: S++,
          // <!-- blah -
          COMMENT_ENDED: S++,
          // <!-- blah --
          CDATA: S++,
          // <![CDATA[ something
          CDATA_ENDING: S++,
          // ]
          CDATA_ENDING_2: S++,
          // ]]
          PROC_INST: S++,
          // <?hi
          PROC_INST_BODY: S++,
          // <?hi there
          PROC_INST_ENDING: S++,
          // <?hi "there" ?
          OPEN_TAG: S++,
          // <strong
          OPEN_TAG_SLASH: S++,
          // <strong /
          ATTRIB: S++,
          // <a
          ATTRIB_NAME: S++,
          // <a foo
          ATTRIB_NAME_SAW_WHITE: S++,
          // <a foo _
          ATTRIB_VALUE: S++,
          // <a foo=
          ATTRIB_VALUE_QUOTED: S++,
          // <a foo="bar
          ATTRIB_VALUE_CLOSED: S++,
          // <a foo="bar"
          ATTRIB_VALUE_UNQUOTED: S++,
          // <a foo=bar
          ATTRIB_VALUE_ENTITY_Q: S++,
          // <foo bar="&quot;"
          ATTRIB_VALUE_ENTITY_U: S++,
          // <foo bar=&quot
          CLOSE_TAG: S++,
          // </a
          CLOSE_TAG_SAW_WHITE: S++,
          // </a   >
          SCRIPT: S++,
          // <script> ...
          SCRIPT_ENDING: S++
          // <script> ... <
        };
        sax.XML_ENTITIES = Object.assign(/* @__PURE__ */ Object.create(null), {
          amp: "&",
          gt: ">",
          lt: "<",
          quot: '"',
          apos: "'"
        });
        sax.ENTITIES = Object.assign(/* @__PURE__ */ Object.create(null), {
          amp: "&",
          gt: ">",
          lt: "<",
          quot: '"',
          apos: "'",
          AElig: 198,
          Aacute: 193,
          Acirc: 194,
          Agrave: 192,
          Aring: 197,
          Atilde: 195,
          Auml: 196,
          Ccedil: 199,
          ETH: 208,
          Eacute: 201,
          Ecirc: 202,
          Egrave: 200,
          Euml: 203,
          Iacute: 205,
          Icirc: 206,
          Igrave: 204,
          Iuml: 207,
          Ntilde: 209,
          Oacute: 211,
          Ocirc: 212,
          Ograve: 210,
          Oslash: 216,
          Otilde: 213,
          Ouml: 214,
          THORN: 222,
          Uacute: 218,
          Ucirc: 219,
          Ugrave: 217,
          Uuml: 220,
          Yacute: 221,
          aacute: 225,
          acirc: 226,
          aelig: 230,
          agrave: 224,
          aring: 229,
          atilde: 227,
          auml: 228,
          ccedil: 231,
          eacute: 233,
          ecirc: 234,
          egrave: 232,
          eth: 240,
          euml: 235,
          iacute: 237,
          icirc: 238,
          igrave: 236,
          iuml: 239,
          ntilde: 241,
          oacute: 243,
          ocirc: 244,
          ograve: 242,
          oslash: 248,
          otilde: 245,
          ouml: 246,
          szlig: 223,
          thorn: 254,
          uacute: 250,
          ucirc: 251,
          ugrave: 249,
          uuml: 252,
          yacute: 253,
          yuml: 255,
          copy: 169,
          reg: 174,
          nbsp: 160,
          iexcl: 161,
          cent: 162,
          pound: 163,
          curren: 164,
          yen: 165,
          brvbar: 166,
          sect: 167,
          uml: 168,
          ordf: 170,
          laquo: 171,
          not: 172,
          shy: 173,
          macr: 175,
          deg: 176,
          plusmn: 177,
          sup1: 185,
          sup2: 178,
          sup3: 179,
          acute: 180,
          micro: 181,
          para: 182,
          middot: 183,
          cedil: 184,
          ordm: 186,
          raquo: 187,
          frac14: 188,
          frac12: 189,
          frac34: 190,
          iquest: 191,
          times: 215,
          divide: 247,
          OElig: 338,
          oelig: 339,
          Scaron: 352,
          scaron: 353,
          Yuml: 376,
          fnof: 402,
          circ: 710,
          tilde: 732,
          Alpha: 913,
          Beta: 914,
          Gamma: 915,
          Delta: 916,
          Epsilon: 917,
          Zeta: 918,
          Eta: 919,
          Theta: 920,
          Iota: 921,
          Kappa: 922,
          Lambda: 923,
          Mu: 924,
          Nu: 925,
          Xi: 926,
          Omicron: 927,
          Pi: 928,
          Rho: 929,
          Sigma: 931,
          Tau: 932,
          Upsilon: 933,
          Phi: 934,
          Chi: 935,
          Psi: 936,
          Omega: 937,
          alpha: 945,
          beta: 946,
          gamma: 947,
          delta: 948,
          epsilon: 949,
          zeta: 950,
          eta: 951,
          theta: 952,
          iota: 953,
          kappa: 954,
          lambda: 955,
          mu: 956,
          nu: 957,
          xi: 958,
          omicron: 959,
          pi: 960,
          rho: 961,
          sigmaf: 962,
          sigma: 963,
          tau: 964,
          upsilon: 965,
          phi: 966,
          chi: 967,
          psi: 968,
          omega: 969,
          thetasym: 977,
          upsih: 978,
          piv: 982,
          ensp: 8194,
          emsp: 8195,
          thinsp: 8201,
          zwnj: 8204,
          zwj: 8205,
          lrm: 8206,
          rlm: 8207,
          ndash: 8211,
          mdash: 8212,
          lsquo: 8216,
          rsquo: 8217,
          sbquo: 8218,
          ldquo: 8220,
          rdquo: 8221,
          bdquo: 8222,
          dagger: 8224,
          Dagger: 8225,
          bull: 8226,
          hellip: 8230,
          permil: 8240,
          prime: 8242,
          Prime: 8243,
          lsaquo: 8249,
          rsaquo: 8250,
          oline: 8254,
          frasl: 8260,
          euro: 8364,
          image: 8465,
          weierp: 8472,
          real: 8476,
          trade: 8482,
          alefsym: 8501,
          larr: 8592,
          uarr: 8593,
          rarr: 8594,
          darr: 8595,
          harr: 8596,
          crarr: 8629,
          lArr: 8656,
          uArr: 8657,
          rArr: 8658,
          dArr: 8659,
          hArr: 8660,
          forall: 8704,
          part: 8706,
          exist: 8707,
          empty: 8709,
          nabla: 8711,
          isin: 8712,
          notin: 8713,
          ni: 8715,
          prod: 8719,
          sum: 8721,
          minus: 8722,
          lowast: 8727,
          radic: 8730,
          prop: 8733,
          infin: 8734,
          ang: 8736,
          and: 8743,
          or: 8744,
          cap: 8745,
          cup: 8746,
          int: 8747,
          there4: 8756,
          sim: 8764,
          cong: 8773,
          asymp: 8776,
          ne: 8800,
          equiv: 8801,
          le: 8804,
          ge: 8805,
          sub: 8834,
          sup: 8835,
          nsub: 8836,
          sube: 8838,
          supe: 8839,
          oplus: 8853,
          otimes: 8855,
          perp: 8869,
          sdot: 8901,
          lceil: 8968,
          rceil: 8969,
          lfloor: 8970,
          rfloor: 8971,
          lang: 9001,
          rang: 9002,
          loz: 9674,
          spades: 9824,
          clubs: 9827,
          hearts: 9829,
          diams: 9830
        });
        Object.keys(sax.ENTITIES).forEach(function(key) {
          var e = sax.ENTITIES[key];
          var s2 = typeof e === "number" ? String.fromCharCode(e) : e;
          sax.ENTITIES[key] = s2;
        });
        for (var s in sax.STATE) {
          sax.STATE[sax.STATE[s]] = s;
        }
        S = sax.STATE;
        function emit(parser, event, data) {
          parser[event] && parser[event](data);
        }
        function getDeclaredEncoding(body) {
          var match = body && body.match(/(?:^|\s)encoding\s*=\s*(['"])([^'"]+)\1/i);
          return match ? match[2] : null;
        }
        function normalizeEncodingName(encoding) {
          if (!encoding) {
            return null;
          }
          return encoding.toLowerCase().replace(/[^a-z0-9]/g, "");
        }
        function encodingsMatch(detectedEncoding, declaredEncoding) {
          const detected = normalizeEncodingName(detectedEncoding);
          const declared = normalizeEncodingName(declaredEncoding);
          if (!detected || !declared) {
            return true;
          }
          if (declared === "utf16") {
            return detected === "utf16le" || detected === "utf16be";
          }
          return detected === declared;
        }
        function validateXmlDeclarationEncoding(parser, data) {
          if (!parser.strict || !parser.encoding || !data || data.name !== "xml") {
            return;
          }
          var declaredEncoding = getDeclaredEncoding(data.body);
          if (declaredEncoding && !encodingsMatch(parser.encoding, declaredEncoding)) {
            strictFail(
              parser,
              "XML declaration encoding " + declaredEncoding + " does not match detected stream encoding " + parser.encoding.toUpperCase()
            );
          }
        }
        function emitNode(parser, nodeType, data) {
          if (parser.textNode) closeText(parser);
          emit(parser, nodeType, data);
        }
        function closeText(parser) {
          parser.textNode = textopts(parser.opt, parser.textNode);
          if (parser.textNode) emit(parser, "ontext", parser.textNode);
          parser.textNode = "";
        }
        function textopts(opt, text) {
          if (opt.trim) text = text.trim();
          if (opt.normalize) text = text.replace(/\s+/g, " ");
          return text;
        }
        function error(parser, er) {
          closeText(parser);
          if (parser.trackPosition) {
            er += "\nLine: " + parser.line + "\nColumn: " + parser.column + "\nChar: " + parser.c;
          }
          er = new Error(er);
          parser.error = er;
          emit(parser, "onerror", er);
          return parser;
        }
        function end(parser) {
          if (parser.sawRoot && !parser.closedRoot)
            strictFail(parser, "Unclosed root tag");
          if (parser.state !== S.BEGIN && parser.state !== S.BEGIN_WHITESPACE && parser.state !== S.TEXT) {
            error(parser, "Unexpected end");
          }
          closeText(parser);
          parser.c = "";
          parser.closed = true;
          emit(parser, "onend");
          SAXParser.call(parser, parser.strict, parser.opt);
          return parser;
        }
        function strictFail(parser, message) {
          if (typeof parser !== "object" || !(parser instanceof SAXParser)) {
            throw new Error("bad call to strictFail");
          }
          if (parser.strict) {
            error(parser, message);
          }
        }
        function newTag(parser) {
          if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]();
          var parent = parser.tags[parser.tags.length - 1] || parser;
          var tag = parser.tag = { name: parser.tagName, attributes: {} };
          if (parser.opt.xmlns) {
            tag.ns = parent.ns;
          }
          parser.attribList.length = 0;
          emitNode(parser, "onopentagstart", tag);
        }
        function qname(name, attribute) {
          var i = name.indexOf(":");
          var qualName = i < 0 ? ["", name] : name.split(":");
          var prefix = qualName[0];
          var local = qualName[1];
          if (attribute && name === "xmlns") {
            prefix = "xmlns";
            local = "";
          }
          return { prefix, local };
        }
        function attrib(parser) {
          if (!parser.strict) {
            parser.attribName = parser.attribName[parser.looseCase]();
          }
          if (parser.attribList.indexOf(parser.attribName) !== -1 || parser.tag.attributes.hasOwnProperty(parser.attribName)) {
            parser.attribName = parser.attribValue = "";
            return;
          }
          if (parser.opt.xmlns) {
            var qn = qname(parser.attribName, true);
            var prefix = qn.prefix;
            var local = qn.local;
            if (prefix === "xmlns") {
              if (local === "xml" && parser.attribValue !== XML_NAMESPACE) {
                strictFail(
                  parser,
                  "xml: prefix must be bound to " + XML_NAMESPACE + "\nActual: " + parser.attribValue
                );
              } else if (local === "xmlns" && parser.attribValue !== XMLNS_NAMESPACE) {
                strictFail(
                  parser,
                  "xmlns: prefix must be bound to " + XMLNS_NAMESPACE + "\nActual: " + parser.attribValue
                );
              } else {
                var tag = parser.tag;
                var parent = parser.tags[parser.tags.length - 1] || parser;
                if (tag.ns === parent.ns) {
                  tag.ns = Object.create(parent.ns);
                }
                tag.ns[local] = parser.attribValue;
              }
            }
            parser.attribList.push([parser.attribName, parser.attribValue]);
          } else {
            parser.tag.attributes[parser.attribName] = parser.attribValue;
            emitNode(parser, "onattribute", {
              name: parser.attribName,
              value: parser.attribValue
            });
          }
          parser.attribName = parser.attribValue = "";
        }
        function openTag(parser, selfClosing) {
          if (parser.opt.xmlns) {
            var tag = parser.tag;
            var qn = qname(parser.tagName);
            tag.prefix = qn.prefix;
            tag.local = qn.local;
            tag.uri = tag.ns[qn.prefix] || "";
            if (tag.prefix && !tag.uri) {
              strictFail(
                parser,
                "Unbound namespace prefix: " + JSON.stringify(parser.tagName)
              );
              tag.uri = qn.prefix;
            }
            var parent = parser.tags[parser.tags.length - 1] || parser;
            if (tag.ns && parent.ns !== tag.ns) {
              Object.keys(tag.ns).forEach(function(p) {
                emitNode(parser, "onopennamespace", {
                  prefix: p,
                  uri: tag.ns[p]
                });
              });
            }
            for (var i = 0, l = parser.attribList.length; i < l; i++) {
              var nv = parser.attribList[i];
              var name = nv[0];
              var value = nv[1];
              var qualName = qname(name, true);
              var prefix = qualName.prefix;
              var local = qualName.local;
              var uri = prefix === "" ? "" : tag.ns[prefix] || "";
              var a = {
                name,
                value,
                prefix,
                local,
                uri
              };
              if (prefix && prefix !== "xmlns" && !uri) {
                strictFail(
                  parser,
                  "Unbound namespace prefix: " + JSON.stringify(prefix)
                );
                a.uri = prefix;
              }
              parser.tag.attributes[name] = a;
              emitNode(parser, "onattribute", a);
            }
            parser.attribList.length = 0;
          }
          parser.tag.isSelfClosing = !!selfClosing;
          parser.sawRoot = true;
          parser.tags.push(parser.tag);
          emitNode(parser, "onopentag", parser.tag);
          if (!selfClosing) {
            if (!parser.noscript && parser.tagName.toLowerCase() === "script") {
              parser.state = S.SCRIPT;
            } else {
              parser.state = S.TEXT;
            }
            parser.tag = null;
            parser.tagName = "";
          }
          parser.attribName = parser.attribValue = "";
          parser.attribList.length = 0;
        }
        function closeTag(parser) {
          if (!parser.tagName) {
            strictFail(parser, "Weird empty close tag.");
            parser.textNode += "</>";
            parser.state = S.TEXT;
            return;
          }
          if (parser.script) {
            if (parser.tagName !== "script") {
              parser.script += "</" + parser.tagName + ">";
              parser.tagName = "";
              parser.state = S.SCRIPT;
              return;
            }
            emitNode(parser, "onscript", parser.script);
            parser.script = "";
          }
          var t = parser.tags.length;
          var tagName = parser.tagName;
          if (!parser.strict) {
            tagName = tagName[parser.looseCase]();
          }
          var closeTo = tagName;
          while (t--) {
            var close = parser.tags[t];
            if (close.name !== closeTo) {
              strictFail(parser, "Unexpected close tag");
            } else {
              break;
            }
          }
          if (t < 0) {
            strictFail(parser, "Unmatched closing tag: " + parser.tagName);
            parser.textNode += "</" + parser.tagName + ">";
            parser.state = S.TEXT;
            return;
          }
          parser.tagName = tagName;
          var s2 = parser.tags.length;
          while (s2-- > t) {
            var tag = parser.tag = parser.tags.pop();
            parser.tagName = parser.tag.name;
            emitNode(parser, "onclosetag", parser.tagName);
            var x = {};
            for (var i in tag.ns) {
              x[i] = tag.ns[i];
            }
            var parent = parser.tags[parser.tags.length - 1] || parser;
            if (parser.opt.xmlns && tag.ns !== parent.ns) {
              Object.keys(tag.ns).forEach(function(p) {
                var n = tag.ns[p];
                emitNode(parser, "onclosenamespace", { prefix: p, uri: n });
              });
            }
          }
          if (t === 0) parser.closedRoot = true;
          parser.tagName = parser.attribValue = parser.attribName = "";
          parser.attribList.length = 0;
          parser.state = S.TEXT;
        }
        function parseEntity(parser) {
          var entity = parser.entity;
          var entityLC = entity.toLowerCase();
          var num;
          var numStr = "";
          if (parser.ENTITIES[entity]) {
            return parser.ENTITIES[entity];
          }
          if (parser.ENTITIES[entityLC]) {
            return parser.ENTITIES[entityLC];
          }
          entity = entityLC;
          if (entity.charAt(0) === "#") {
            if (entity.charAt(1) === "x") {
              entity = entity.slice(2);
              num = parseInt(entity, 16);
              numStr = num.toString(16);
            } else {
              entity = entity.slice(1);
              num = parseInt(entity, 10);
              numStr = num.toString(10);
            }
          }
          entity = entity.replace(/^0+/, "");
          if (isNaN(num) || numStr.toLowerCase() !== entity || num < 0 || num > 1114111 || !isXmlChar(num)) {
            strictFail(parser, "Invalid character entity");
            return "&" + parser.entity + ";";
          }
          return String.fromCodePoint(num);
        }
        function isXmlChar(num) {
          return num === 9 || num === 10 || num === 13 || num >= 32 && num <= 55295 || num >= 57344 && num <= 65533 || num >= 65536 && num <= 1114111;
        }
        function beginWhiteSpace(parser, c) {
          if (c === "<") {
            parser.state = S.OPEN_WAKA;
            parser.startTagPosition = parser.position;
          } else if (!isWhitespace(c)) {
            strictFail(parser, "Non-whitespace before first tag.");
            parser.textNode = c;
            parser.state = S.TEXT;
          }
        }
        function charAt(chunk, i) {
          var result = "";
          if (i < chunk.length) {
            result = chunk.charAt(i);
          }
          return result;
        }
        function write(chunk) {
          var parser = this;
          if (this.error) {
            throw this.error;
          }
          if (parser.closed) {
            return error(
              parser,
              "Cannot write after close. Assign an onready handler."
            );
          }
          if (chunk === null) {
            return end(parser);
          }
          if (typeof chunk === "object") {
            chunk = chunk.toString();
          }
          var i = 0;
          var c = "";
          while (true) {
            c = charAt(chunk, i++);
            parser.c = c;
            if (!c) {
              break;
            }
            if (parser.trackPosition) {
              parser.position++;
              if (c === "\n") {
                parser.line++;
                parser.column = 0;
              } else {
                parser.column++;
              }
            }
            switch (parser.state) {
              case S.BEGIN:
                parser.state = S.BEGIN_WHITESPACE;
                if (c === "\uFEFF") {
                  continue;
                }
                beginWhiteSpace(parser, c);
                continue;
              case S.BEGIN_WHITESPACE:
                beginWhiteSpace(parser, c);
                continue;
              case S.TEXT:
                if (parser.sawRoot && !parser.closedRoot) {
                  var starti = i - 1;
                  while (c && c !== "<" && c !== "&") {
                    c = charAt(chunk, i++);
                    if (c && parser.trackPosition) {
                      parser.position++;
                      if (c === "\n") {
                        parser.line++;
                        parser.column = 0;
                      } else {
                        parser.column++;
                      }
                    }
                  }
                  parser.textNode += chunk.substring(starti, i - 1);
                }
                if (c === "<" && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
                  parser.state = S.OPEN_WAKA;
                  parser.startTagPosition = parser.position;
                } else {
                  if (!isWhitespace(c) && (!parser.sawRoot || parser.closedRoot)) {
                    strictFail(parser, "Text data outside of root node.");
                  }
                  if (c === "&") {
                    parser.state = S.TEXT_ENTITY;
                  } else {
                    parser.textNode += c;
                  }
                }
                continue;
              case S.SCRIPT:
                if (c === "<") {
                  parser.state = S.SCRIPT_ENDING;
                } else {
                  parser.script += c;
                }
                continue;
              case S.SCRIPT_ENDING:
                if (c === "/") {
                  parser.state = S.CLOSE_TAG;
                } else {
                  parser.script += "<" + c;
                  parser.state = S.SCRIPT;
                }
                continue;
              case S.OPEN_WAKA:
                if (c === "!") {
                  parser.state = S.SGML_DECL;
                  parser.sgmlDecl = "";
                } else if (isWhitespace(c)) {
                } else if (isMatch(nameStart, c)) {
                  parser.state = S.OPEN_TAG;
                  parser.tagName = c;
                } else if (c === "/") {
                  parser.state = S.CLOSE_TAG;
                  parser.tagName = "";
                } else if (c === "?") {
                  parser.state = S.PROC_INST;
                  parser.procInstName = parser.procInstBody = "";
                } else {
                  strictFail(parser, "Unencoded <");
                  if (parser.startTagPosition + 1 < parser.position) {
                    var pad = parser.position - parser.startTagPosition;
                    c = new Array(pad).join(" ") + c;
                  }
                  parser.textNode += "<" + c;
                  parser.state = S.TEXT;
                }
                continue;
              case S.SGML_DECL:
                if (parser.sgmlDecl + c === "--") {
                  parser.state = S.COMMENT;
                  parser.comment = "";
                  parser.sgmlDecl = "";
                  continue;
                }
                if (parser.doctype && parser.doctype !== true && parser.sgmlDecl) {
                  parser.state = S.DOCTYPE_DTD;
                  parser.doctype += "<!" + parser.sgmlDecl + c;
                  parser.sgmlDecl = "";
                } else if (CDATAre.test(parser.sgmlDecl + c)) {
                  emitNode(parser, "onopencdata");
                  parser.state = S.CDATA;
                  parser.sgmlDecl = "";
                  parser.cdata = "";
                } else if (DOCTYPEre.test(parser.sgmlDecl + c)) {
                  parser.state = S.DOCTYPE;
                  if (parser.doctype || parser.sawRoot) {
                    strictFail(
                      parser,
                      "Inappropriately located doctype declaration"
                    );
                  }
                  parser.doctype = "";
                  parser.sgmlDecl = "";
                } else if (c === ">") {
                  emitNode(parser, "onsgmldeclaration", parser.sgmlDecl);
                  parser.sgmlDecl = "";
                  parser.state = S.TEXT;
                } else if (isQuote(c)) {
                  parser.state = S.SGML_DECL_QUOTED;
                  parser.sgmlDecl += c;
                } else {
                  parser.sgmlDecl += c;
                }
                continue;
              case S.SGML_DECL_QUOTED:
                if (c === parser.q) {
                  parser.state = S.SGML_DECL;
                  parser.q = "";
                }
                parser.sgmlDecl += c;
                continue;
              case S.DOCTYPE:
                if (c === ">") {
                  parser.state = S.TEXT;
                  emitNode(parser, "ondoctype", parser.doctype);
                  parser.doctype = true;
                } else {
                  parser.doctype += c;
                  if (c === "[") {
                    parser.state = S.DOCTYPE_DTD;
                  } else if (isQuote(c)) {
                    parser.state = S.DOCTYPE_QUOTED;
                    parser.q = c;
                  }
                }
                continue;
              case S.DOCTYPE_QUOTED:
                parser.doctype += c;
                if (c === parser.q) {
                  parser.q = "";
                  parser.state = S.DOCTYPE;
                }
                continue;
              case S.DOCTYPE_DTD:
                if (c === "]") {
                  parser.doctype += c;
                  parser.state = S.DOCTYPE;
                } else if (c === "<") {
                  parser.state = S.OPEN_WAKA;
                  parser.startTagPosition = parser.position;
                } else if (isQuote(c)) {
                  parser.doctype += c;
                  parser.state = S.DOCTYPE_DTD_QUOTED;
                  parser.q = c;
                } else {
                  parser.doctype += c;
                }
                continue;
              case S.DOCTYPE_DTD_QUOTED:
                parser.doctype += c;
                if (c === parser.q) {
                  parser.state = S.DOCTYPE_DTD;
                  parser.q = "";
                }
                continue;
              case S.COMMENT:
                if (c === "-") {
                  parser.state = S.COMMENT_ENDING;
                } else {
                  parser.comment += c;
                }
                continue;
              case S.COMMENT_ENDING:
                if (c === "-") {
                  parser.state = S.COMMENT_ENDED;
                  parser.comment = textopts(parser.opt, parser.comment);
                  if (parser.comment) {
                    emitNode(parser, "oncomment", parser.comment);
                  }
                  parser.comment = "";
                } else {
                  parser.comment += "-" + c;
                  parser.state = S.COMMENT;
                }
                continue;
              case S.COMMENT_ENDED:
                if (c !== ">") {
                  strictFail(parser, "Malformed comment");
                  parser.comment += "--" + c;
                  parser.state = S.COMMENT;
                } else if (parser.doctype && parser.doctype !== true) {
                  parser.state = S.DOCTYPE_DTD;
                } else {
                  parser.state = S.TEXT;
                }
                continue;
              case S.CDATA:
                var starti = i - 1;
                while (c && c !== "]") {
                  c = charAt(chunk, i++);
                  if (c && parser.trackPosition) {
                    parser.position++;
                    if (c === "\n") {
                      parser.line++;
                      parser.column = 0;
                    } else {
                      parser.column++;
                    }
                  }
                }
                parser.cdata += chunk.substring(starti, i - 1);
                if (c === "]") {
                  parser.state = S.CDATA_ENDING;
                }
                continue;
              case S.CDATA_ENDING:
                if (c === "]") {
                  parser.state = S.CDATA_ENDING_2;
                } else {
                  parser.cdata += "]" + c;
                  parser.state = S.CDATA;
                }
                continue;
              case S.CDATA_ENDING_2:
                if (c === ">") {
                  if (parser.cdata) {
                    emitNode(parser, "oncdata", parser.cdata);
                  }
                  emitNode(parser, "onclosecdata");
                  parser.cdata = "";
                  parser.state = S.TEXT;
                } else if (c === "]") {
                  parser.cdata += "]";
                } else {
                  parser.cdata += "]]" + c;
                  parser.state = S.CDATA;
                }
                continue;
              case S.PROC_INST:
                if (c === "?") {
                  parser.state = S.PROC_INST_ENDING;
                } else if (isWhitespace(c)) {
                  parser.state = S.PROC_INST_BODY;
                } else {
                  parser.procInstName += c;
                }
                continue;
              case S.PROC_INST_BODY:
                if (!parser.procInstBody && isWhitespace(c)) {
                  continue;
                } else if (c === "?") {
                  parser.state = S.PROC_INST_ENDING;
                } else {
                  parser.procInstBody += c;
                }
                continue;
              case S.PROC_INST_ENDING:
                if (c === ">") {
                  const procInstEndData = {
                    name: parser.procInstName,
                    body: parser.procInstBody
                  };
                  validateXmlDeclarationEncoding(parser, procInstEndData);
                  emitNode(parser, "onprocessinginstruction", procInstEndData);
                  parser.procInstName = parser.procInstBody = "";
                  parser.state = S.TEXT;
                } else {
                  parser.procInstBody += "?" + c;
                  parser.state = S.PROC_INST_BODY;
                }
                continue;
              case S.OPEN_TAG:
                if (isMatch(nameBody, c)) {
                  parser.tagName += c;
                } else {
                  newTag(parser);
                  if (c === ">") {
                    openTag(parser);
                  } else if (c === "/") {
                    parser.state = S.OPEN_TAG_SLASH;
                  } else {
                    if (!isWhitespace(c)) {
                      strictFail(parser, "Invalid character in tag name");
                    }
                    parser.state = S.ATTRIB;
                  }
                }
                continue;
              case S.OPEN_TAG_SLASH:
                if (c === ">") {
                  openTag(parser, true);
                  closeTag(parser);
                } else {
                  strictFail(
                    parser,
                    "Forward-slash in opening tag not followed by >"
                  );
                  parser.state = S.ATTRIB;
                }
                continue;
              case S.ATTRIB:
                if (isWhitespace(c)) {
                  continue;
                } else if (c === ">") {
                  openTag(parser);
                } else if (c === "/") {
                  parser.state = S.OPEN_TAG_SLASH;
                } else if (isMatch(nameStart, c)) {
                  parser.attribName = c;
                  parser.attribValue = "";
                  parser.state = S.ATTRIB_NAME;
                } else {
                  strictFail(parser, "Invalid attribute name");
                }
                continue;
              case S.ATTRIB_NAME:
                if (c === "=") {
                  parser.state = S.ATTRIB_VALUE;
                } else if (c === ">") {
                  strictFail(parser, "Attribute without value");
                  parser.attribValue = parser.attribName;
                  attrib(parser);
                  openTag(parser);
                } else if (isWhitespace(c)) {
                  parser.state = S.ATTRIB_NAME_SAW_WHITE;
                } else if (isMatch(nameBody, c)) {
                  parser.attribName += c;
                } else {
                  strictFail(parser, "Invalid attribute name");
                }
                continue;
              case S.ATTRIB_NAME_SAW_WHITE:
                if (c === "=") {
                  parser.state = S.ATTRIB_VALUE;
                } else if (isWhitespace(c)) {
                  continue;
                } else {
                  strictFail(parser, "Attribute without value");
                  parser.tag.attributes[parser.attribName] = "";
                  parser.attribValue = "";
                  emitNode(parser, "onattribute", {
                    name: parser.attribName,
                    value: ""
                  });
                  parser.attribName = "";
                  if (c === ">") {
                    openTag(parser);
                  } else if (isMatch(nameStart, c)) {
                    parser.attribName = c;
                    parser.state = S.ATTRIB_NAME;
                  } else {
                    strictFail(parser, "Invalid attribute name");
                    parser.state = S.ATTRIB;
                  }
                }
                continue;
              case S.ATTRIB_VALUE:
                if (isWhitespace(c)) {
                  continue;
                } else if (isQuote(c)) {
                  parser.q = c;
                  parser.state = S.ATTRIB_VALUE_QUOTED;
                } else {
                  if (!parser.opt.unquotedAttributeValues) {
                    error(parser, "Unquoted attribute value");
                  }
                  parser.state = S.ATTRIB_VALUE_UNQUOTED;
                  parser.attribValue = c;
                }
                continue;
              case S.ATTRIB_VALUE_QUOTED:
                if (c !== parser.q) {
                  if (c === "&") {
                    parser.state = S.ATTRIB_VALUE_ENTITY_Q;
                  } else {
                    parser.attribValue += c;
                  }
                  continue;
                }
                attrib(parser);
                parser.q = "";
                parser.state = S.ATTRIB_VALUE_CLOSED;
                continue;
              case S.ATTRIB_VALUE_CLOSED:
                if (isWhitespace(c)) {
                  parser.state = S.ATTRIB;
                } else if (c === ">") {
                  openTag(parser);
                } else if (c === "/") {
                  parser.state = S.OPEN_TAG_SLASH;
                } else if (isMatch(nameStart, c)) {
                  strictFail(parser, "No whitespace between attributes");
                  parser.attribName = c;
                  parser.attribValue = "";
                  parser.state = S.ATTRIB_NAME;
                } else {
                  strictFail(parser, "Invalid attribute name");
                }
                continue;
              case S.ATTRIB_VALUE_UNQUOTED:
                if (!isAttribEnd(c)) {
                  if (c === "&") {
                    parser.state = S.ATTRIB_VALUE_ENTITY_U;
                  } else {
                    parser.attribValue += c;
                  }
                  continue;
                }
                attrib(parser);
                if (c === ">") {
                  openTag(parser);
                } else {
                  parser.state = S.ATTRIB;
                }
                continue;
              case S.CLOSE_TAG:
                if (!parser.tagName) {
                  if (isWhitespace(c)) {
                    continue;
                  } else if (notMatch(nameStart, c)) {
                    if (parser.script) {
                      parser.script += "</" + c;
                      parser.state = S.SCRIPT;
                    } else {
                      strictFail(parser, "Invalid tagname in closing tag.");
                    }
                  } else {
                    parser.tagName = c;
                  }
                } else if (c === ">") {
                  closeTag(parser);
                } else if (isMatch(nameBody, c)) {
                  parser.tagName += c;
                } else if (parser.script) {
                  parser.script += "</" + parser.tagName + c;
                  parser.tagName = "";
                  parser.state = S.SCRIPT;
                } else {
                  if (!isWhitespace(c)) {
                    strictFail(parser, "Invalid tagname in closing tag");
                  }
                  parser.state = S.CLOSE_TAG_SAW_WHITE;
                }
                continue;
              case S.CLOSE_TAG_SAW_WHITE:
                if (isWhitespace(c)) {
                  continue;
                }
                if (c === ">") {
                  closeTag(parser);
                } else {
                  strictFail(parser, "Invalid characters in closing tag");
                }
                continue;
              case S.TEXT_ENTITY:
              case S.ATTRIB_VALUE_ENTITY_Q:
              case S.ATTRIB_VALUE_ENTITY_U:
                var returnState;
                var buffer;
                switch (parser.state) {
                  case S.TEXT_ENTITY:
                    returnState = S.TEXT;
                    buffer = "textNode";
                    break;
                  case S.ATTRIB_VALUE_ENTITY_Q:
                    returnState = S.ATTRIB_VALUE_QUOTED;
                    buffer = "attribValue";
                    break;
                  case S.ATTRIB_VALUE_ENTITY_U:
                    returnState = S.ATTRIB_VALUE_UNQUOTED;
                    buffer = "attribValue";
                    break;
                }
                if (c === ";") {
                  var parsedEntity = parseEntity(parser);
                  if (parser.opt.unparsedEntities && !Object.values(sax.XML_ENTITIES).includes(parsedEntity)) {
                    if ((parser.entityCount += 1) > parser.opt.maxEntityCount) {
                      error(
                        parser,
                        "Parsed entity count exceeds max entity count"
                      );
                    }
                    if ((parser.entityDepth += 1) > parser.opt.maxEntityDepth) {
                      error(
                        parser,
                        "Parsed entity depth exceeds max entity depth"
                      );
                    }
                    parser.entity = "";
                    parser.state = returnState;
                    parser.write(parsedEntity);
                    parser.entityDepth -= 1;
                  } else {
                    parser[buffer] += parsedEntity;
                    parser.entity = "";
                    parser.state = returnState;
                  }
                } else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) {
                  parser.entity += c;
                } else {
                  strictFail(parser, "Invalid character in entity name");
                  parser[buffer] += "&" + parser.entity + c;
                  parser.entity = "";
                  parser.state = returnState;
                }
                continue;
              default: {
                throw new Error(parser, "Unknown state: " + parser.state);
              }
            }
          }
          if (parser.position >= parser.bufferCheckPosition) {
            checkBufferLength(parser);
          }
          return parser;
        }
        if (!String.fromCodePoint) {
          ;
          (function() {
            var stringFromCharCode = String.fromCharCode;
            var floor = Math.floor;
            var fromCodePoint = function() {
              var MAX_SIZE = 16384;
              var codeUnits = [];
              var highSurrogate;
              var lowSurrogate;
              var index = -1;
              var length = arguments.length;
              if (!length) {
                return "";
              }
              var result = "";
              while (++index < length) {
                var codePoint = Number(arguments[index]);
                if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
                codePoint < 0 || // not a valid Unicode code point
                codePoint > 1114111 || // not a valid Unicode code point
                floor(codePoint) !== codePoint) {
                  throw RangeError("Invalid code point: " + codePoint);
                }
                if (codePoint <= 65535) {
                  codeUnits.push(codePoint);
                } else {
                  codePoint -= 65536;
                  highSurrogate = (codePoint >> 10) + 55296;
                  lowSurrogate = codePoint % 1024 + 56320;
                  codeUnits.push(highSurrogate, lowSurrogate);
                }
                if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                  result += stringFromCharCode.apply(null, codeUnits);
                  codeUnits.length = 0;
                }
              }
              return result;
            };
            if (Object.defineProperty) {
              Object.defineProperty(String, "fromCodePoint", {
                value: fromCodePoint,
                configurable: true,
                writable: true
              });
            } else {
              String.fromCodePoint = fromCodePoint;
            }
          })();
        }
      })(typeof exports === "undefined" ? exports.sax = {} : exports);
    }
  });

  // node_modules/iham-parsers/src/phyloxml.js
  var require_phyloxml = __commonJS({
    "node_modules/iham-parsers/src/phyloxml.js"(exports, module) {
      (function phyloXml() {
        "use strict";
        var sax = require_sax();
        var ACCESSION = "accession";
        var ACCESSION_SOURCE_ATTR = "source";
        var ACCESSION_COMMENT_ATTR = "comment";
        var ANNOTATION = "annotation";
        var ANNOTATION_REF_ATTR = "ref";
        var ANNOTATION_SOURCE_ATTR = "source";
        var ANNOTATION_EVIDENCE_ATTR = "evidence";
        var ANNOTATION_TYPE_ATTR = "type";
        var ANNOTATION_DESC = "desc";
        var CLADE = "clade";
        var CLADE_BRANCH_LENGTH = "branch_length";
        var CLADE_ID_SOURCE_ATTR = "id_source";
        var CLADE_COLLAPSE_ATTR = "collapse";
        var CLADE_NAME = "name";
        var CLADE_WIDTH = "width";
        var CLADE_RELATION = "clade_relation";
        var CLADE_RELATION_DISTANCE_ATTR = "distance";
        var CLADE_RELATION_ID_REF_0_ATTR = "id_ref_0";
        var CLADE_RELATION_ID_REF_1_ATTR = "id_ref_1";
        var CLADE_RELATION_TYPE_ATTR = "type";
        var SEQUENCE_RELATION = "sequence_relation";
        var SEQUENCE_RELATION_DISTANCE_ATTR = "distance";
        var SEQUENCE_RELATION_ID_REF_0_ATTR = "id_ref_0";
        var SEQUENCE_RELATION_ID_REF_1_ATTR = "id_ref_1";
        var SEQUENCE_RELATION_TYPE_ATTR = "type";
        var COLOR = "color";
        var COLOR_RED = "red";
        var COLOR_GREEN = "green";
        var COLOR_BLUE = "blue";
        var COLOR_ALPHA = "alpha";
        var CONFIDENCE = "confidence";
        var CONFIDENCE_TYPE_ATTR = "type";
        var CONFIDENCE_STDDEV_ATTR = "stddev";
        var CONFIDENCES = "confidences";
        var CROSS_REFERENCES = "cross_references";
        var DATE = "date";
        var DATE_UNIT_ATTR = "unit";
        var DATE_DESC = "desc";
        var DATE_VALUE = "value";
        var DATE_MINIMUM = "minimum";
        var DATE_MAXIMUM = "maximum";
        var DISTRIBUTION = "distribution";
        var DISTRIBUTION_DESC = "desc";
        var DOMAIN_ARCHITECTURE = "domain_architecture";
        var DOMAIN_ARCHITECTURE_LENGTH_ATTR = "length";
        var EVENTS = "events";
        var EVENTS_TYPE = "type";
        var EVENTS_DUPLICATIONS = "duplications";
        var EVENTS_SPECIATIONS = "speciations";
        var EVENTS_LOSSES = "losses";
        var ID = "id";
        var ID_PROVIDER_ATTR = "provider";
        var MOLSEQ = "mol_seq";
        var MOLSEQ_IS_ALIGNED_ATTR = "is_aligned";
        var PHYLOGENY = "phylogeny";
        var PHYLOXML = "phyloxml";
        var POINT = "point";
        var POINT_ALT_UNIT_ATTR = "alt_unit";
        var POINT_GEODETIC_DATUM_ATTR = "geodetic_datum";
        var POINT_LAT = "lat";
        var POINT_LONG = "long";
        var POINT_ALT = "alt";
        var PROPERTY = "property";
        var PROPERTY_REF_ATTR = "ref";
        var PROPERTY_ID_REF_ATTR = "id_ref";
        var PROPERTY_UNIT_ATTR = "unit";
        var PROPERTY_DATATYPE_ATTR = "datatype";
        var PROPERTY_APPLIES_TO_ATTR = "applies_to";
        var PROPERTIES = "properties";
        var PROTEINDOMAIN = "domain";
        var PROTEINDOMAIN_FROM_ATTR = "from";
        var PROTEINDOMAIN_TO_ATTR = "to";
        var PROTEINDOMAIN_CONFIDENCE_ATTR = "confidence";
        var PROTEINDOMAIN_ID_ATTR = "id";
        var REFERENCE = "reference";
        var REFERENCE_DOI_ATTR = "doi";
        var REFERENCE_DESC = "desc";
        var SEQUENCE = "sequence";
        var SEQUENCE_ID_SOURCE_ATTR = "id_source";
        var SEQUENCE_ID_REF_ATTR = "id_ref";
        var SEQUENCE_TYPE_ATTR = "type";
        var SEQUENCE_SYMBOL = "symbol";
        var SEQUENCE_NAME = "name";
        var SEQUENCE_GENE_NAME = "gene_name";
        var SEQUENCE_LOCATION = "location";
        var SEQUENCES = "sequences";
        var TAXONOMY = "taxonomy";
        var TAXONOMY_ID_SOURCE_ATTR = "id_source";
        var TAXONOMY_CODE = "code";
        var TAXONOMY_SCIENTIFIC_NAME = "scientific_name";
        var TAXONOMY_AUTHORITY = "authority";
        var TAXONOMY_COMMON_NAME = "common_name";
        var TAXONOMY_SYNONYM = "synonym";
        var TAXONOMY_RANK = "rank";
        var TAXONOMIES = "taxonomies";
        var TAXONOMY_SYNONYMS = "synonyms";
        var URI = "uri";
        var URI_TYPE_ATTR = "type";
        var URI_DESC_ATTR = "desc";
        var PHYLOGENY_ROOTED_ATTR = "rooted";
        var PHYLOGENY_REROOTABLE_ATTR = "rerootable";
        var PHYLOGENY_BRANCH_LENGTH_UNIT_ATTR = "branch_length_unit";
        var PHYLOGENY_TYPE_ATTR = "type";
        var PHYLOGENY_NAME = "name";
        var PHYLOGENY_DESCRIPTION = "description";
        var PHYLOGENY_DATE = "date";
        var X_SIMPLE_CHARACTERISTICS = "Simple_Characteristics";
        var X_SIMPLE_CHARACTERISTIC_COUNTRY = "Country";
        var X_SIMPLE_CHARACTERISTIC_YEAR = "Year";
        var X_SIMPLE_CHARACTERISTIC_HOST = "Host";
        var X_SIMPLE_CHARACTERISTIC_HA = "HA";
        var X_SIMPLE_CHARACTERISTIC_NA = "NA";
        var APPTYPE = "flu_type";
        var UNKNOWN = "unknown";
        var _phylogenies = null;
        var _phylogeny = null;
        var _cladeStack = null;
        var _tagStack = null;
        var _objectStack = null;
        var PROPERTY_REF_RE = /[a-zA-Z0-9_]+:\S+/;
        var PROPERTY_UNIT_RE = /[a-zA-Z0-9_]+:\S+/;
        var PROPERTY_DATATYPE_RE = /xsd:\S+/;
        function newAccession(tag) {
          var parent = _tagStack.get(1);
          if (!(parent === SEQUENCE || parent === CROSS_REFERENCES)) {
            throw new PhyloXmlError("found accession outside of sequence or cross-references");
          }
          var acc = {};
          acc.value = null;
          acc.source = getAttribute(ACCESSION_SOURCE_ATTR, tag.attributes);
          acc.comment = getAttribute(ACCESSION_COMMENT_ATTR, tag.attributes);
          if (!acc.source) {
            acc.source = UNKNOWN;
          }
          if (parent === SEQUENCE) {
            getCurrentObject().accession = acc;
          } else {
            addToArrayInCurrentObjectUnnamed(acc);
          }
          _objectStack.push(acc);
        }
        function newAnnotation(tag) {
          var parent = _tagStack.get(1);
          if (parent != SEQUENCE) {
            throw new PhyloXmlError("found annotation outside of sequence");
          }
          var ann = {};
          ann.evidence = getAttribute(ANNOTATION_EVIDENCE_ATTR, tag.attributes);
          ann.ref = getAttribute(ANNOTATION_REF_ATTR, tag.attributes);
          ann.source = getAttribute(ANNOTATION_SOURCE_ATTR, tag.attributes);
          ann.type = getAttribute(ANNOTATION_TYPE_ATTR, tag.attributes);
          addToArrayInCurrentObject("annotations", ann);
          _objectStack.push(ann);
        }
        function newBranchColor() {
          var parent = _tagStack.get(1);
          if (parent != CLADE) {
            throw new PhyloXmlError("found branch color outside of clade");
          }
          var col = {};
          col.red = 0;
          col.green = 0;
          col.blue = 0;
          getCurrentObject().color = col;
          _objectStack.push(col);
        }
        function newClade(tag) {
          var newClade2 = {};
          newClade2.branch_length = getAttributeAsFloat(CLADE_BRANCH_LENGTH, tag.attributes);
          newClade2.collapse = getAttributeAsBoolean(CLADE_COLLAPSE_ATTR, tag.attributes);
          if (CLADE_ID_SOURCE_ATTR in tag.attributes) {
            newClade2.id_source = tag.attributes[CLADE_ID_SOURCE_ATTR];
          }
          if (_phylogeny === null) {
            var phylogeny_data = _objectStack.pop();
            if (!_objectStack.isEmpty()) {
              throw new PhyloXmlError("severe phyloXML format error");
            }
            _phylogeny = phylogeny_data;
            _phylogeny.children = [newClade2];
          } else {
            var currClade = getCurrentClade();
            if (currClade.children === void 0) {
              currClade.children = [newClade2];
            } else {
              currClade.children.push(newClade2);
            }
          }
          _cladeStack.push(newClade2);
          _objectStack.push(newClade2);
        }
        function newCladeRelation(tag) {
          var cr = {};
          cr.distance = getAttributeAsFloat(CLADE_RELATION_DISTANCE_ATTR, tag.attributes);
          cr.id_ref_0 = getAttribute(CLADE_RELATION_ID_REF_0_ATTR, tag.attributes);
          cr.id_ref_1 = getAttribute(CLADE_RELATION_ID_REF_1_ATTR, tag.attributes);
          cr.type = getAttribute(CLADE_RELATION_TYPE_ATTR, tag.attributes);
          addToArrayInCurrentObject("clade_relations", cr);
          _objectStack.push(cr);
        }
        function newSequenceRelation(tag) {
          var sr = {};
          sr.distance = getAttributeAsFloat(SEQUENCE_RELATION_DISTANCE_ATTR, tag.attributes);
          sr.id_ref_0 = getAttribute(SEQUENCE_RELATION_ID_REF_0_ATTR, tag.attributes);
          sr.id_ref_1 = getAttribute(SEQUENCE_RELATION_ID_REF_1_ATTR, tag.attributes);
          sr.type = getAttribute(SEQUENCE_RELATION_TYPE_ATTR, tag.attributes);
          addToArrayInCurrentObject("sequence_relations", sr);
          _objectStack.push(sr);
        }
        function newConfidence(tag) {
          var conf = {};
          conf.value = null;
          conf.type = getAttribute(CONFIDENCE_TYPE_ATTR, tag.attributes);
          conf.stddev = getAttributeAsFloat(CONFIDENCE_STDDEV_ATTR, tag.attributes);
          var parent = _tagStack.get(1);
          if (parent === CLADE || parent === PHYLOGENY) {
            addToArrayInCurrentObject(CONFIDENCES, conf);
          } else if (parent === ANNOTATION || parent === EVENTS || parent === CLADE_RELATION || parent === SEQUENCE_RELATION) {
            getCurrentObject().confidence = conf;
          }
          _objectStack.push(conf);
        }
        function newCrossReferences() {
          var parent = _tagStack.get(1);
          if (parent != SEQUENCE) {
            throw new PhyloXmlError("found cross-reference outside of sequence");
          }
          var xrefs = [];
          getCurrentObject().cross_references = xrefs;
          _objectStack.push(xrefs);
        }
        function newDate(tag) {
          var date = {};
          date.unit = getAttribute(DATE_UNIT_ATTR, tag.attributes);
          getCurrentObject().date = date;
          _objectStack.push(date);
        }
        function newDistribution(tag) {
          var dist = {};
          dist.desc = null;
          dist.unit = getAttribute(DATE_UNIT_ATTR, tag.attributes);
          addToArrayInCurrentObject("distributions", dist);
          _objectStack.push(dist);
        }
        function newDomainArchitecture(tag) {
          var da = {};
          da.domains = null;
          da.length = getAttributeAsInt(DOMAIN_ARCHITECTURE_LENGTH_ATTR, tag.attributes);
          getCurrentObject().domain_architecture = da;
          _objectStack.push(da);
        }
        function newEvents() {
          var events = {};
          getCurrentObject().events = events;
          _objectStack.push(events);
        }
        function newId(tag) {
          var i = {};
          i.value = null;
          i.provider = getAttribute(ID_PROVIDER_ATTR, tag.attributes);
          getCurrentObject().id = i;
          _objectStack.push(i);
        }
        function newMolecularSequence(tag) {
          var mol_seq = {};
          mol_seq.is_aligned = getAttributeAsBoolean(MOLSEQ_IS_ALIGNED_ATTR, tag.attributes);
          getCurrentObject().mol_seq = mol_seq;
          _objectStack.push(mol_seq);
        }
        function newPoint(tag) {
          var p = {};
          p.alt_unit = getAttribute(POINT_ALT_UNIT_ATTR, tag.attributes);
          p.geodetic_datum = getAttribute(POINT_GEODETIC_DATUM_ATTR, tag.attributes);
          var parent = _tagStack.get(1);
          if (parent === DISTRIBUTION) {
            addToArrayInCurrentObject("points", p);
          }
          _objectStack.push(p);
        }
        function newProperty(tag) {
          var prop = {};
          prop.ref = getAttribute(PROPERTY_REF_ATTR, tag.attributes);
          prop.unit = getAttribute(PROPERTY_UNIT_ATTR, tag.attributes);
          prop.datatype = getAttribute(PROPERTY_DATATYPE_ATTR, tag.attributes);
          prop.applies_to = getAttribute(PROPERTY_APPLIES_TO_ATTR, tag.attributes);
          prop.id_ref = getAttribute(PROPERTY_ID_REF_ATTR, tag.attributes);
          if (!prop.ref) {
            throw new PhyloXmlError("property ref is missing");
          }
          if (!prop.datatype) {
            throw new PhyloXmlError("property data-type is missing");
          }
          if (!prop.applies_to) {
            throw new PhyloXmlError("property applies-to is missing");
          }
          if (!PROPERTY_REF_RE.test(prop.ref)) {
            throw new PhyloXmlError("property ref is ill-formatted: " + prop.ref);
          }
          if (!PROPERTY_DATATYPE_RE.test(prop.datatype)) {
            throw new PhyloXmlError("property data-type is ill-formatted: " + prop.datatype);
          }
          if (prop.unit && !PROPERTY_UNIT_RE.test(prop.unit)) {
            throw new PhyloXmlError("property unit is ill-formatted: " + prop.unit);
          }
          addToArrayInCurrentObject(PROPERTIES, prop);
          _objectStack.push(prop);
        }
        function newProteinDomain(tag) {
          var pd = {};
          pd.name = null;
          pd.from = getAttributeAsInt(PROTEINDOMAIN_FROM_ATTR, tag.attributes);
          pd.to = getAttributeAsInt(PROTEINDOMAIN_TO_ATTR, tag.attributes);
          pd.confidence = getAttributeAsFloat(PROTEINDOMAIN_CONFIDENCE_ATTR, tag.attributes);
          pd.id = getAttribute(PROTEINDOMAIN_ID_ATTR, tag.attributes);
          addToArrayInCurrentObject("domains", pd);
          _objectStack.push(pd);
        }
        function newReference(tag) {
          var reference = {};
          reference.doi = getAttribute(REFERENCE_DOI_ATTR, tag.attributes);
          addToArrayInCurrentObject("references", reference);
          _objectStack.push(reference);
        }
        function newSequence(tag) {
          var seq = {};
          seq.type = getAttribute(SEQUENCE_TYPE_ATTR, tag.attributes);
          seq.id_source = getAttribute(SEQUENCE_ID_SOURCE_ATTR, tag.attributes);
          seq.id_ref = getAttribute(SEQUENCE_ID_REF_ATTR, tag.attributes);
          addToArrayInCurrentObject(SEQUENCES, seq);
          _objectStack.push(seq);
        }
        function newTaxonomy(tag) {
          var tax = {};
          tax.id_source = getAttribute(TAXONOMY_ID_SOURCE_ATTR, tag.attributes);
          addToArrayInCurrentObject(TAXONOMIES, tax);
          _objectStack.push(tax);
        }
        function newUri(tag) {
          var uri = {};
          uri.value = null;
          uri.desc = getAttribute(URI_DESC_ATTR, tag.attributes);
          uri.type = getAttribute(URI_TYPE_ATTR, tag.attributes);
          addToArrayInCurrentObject("uris", uri);
          _objectStack.push(uri);
        }
        function newPhylogeny(tag) {
          var phy = {};
          phy.rooted = getAttributeAsBoolean(PHYLOGENY_ROOTED_ATTR, tag.attributes);
          if (phy.rooted === void 0) {
            phy.rooted = true;
          }
          phy.rerootable = getAttributeAsBoolean(PHYLOGENY_REROOTABLE_ATTR, tag.attributes);
          if (phy.rerootable === void 0) {
            phy.rerootable = true;
          }
          phy.branch_length_unit = getAttribute(PHYLOGENY_BRANCH_LENGTH_UNIT_ATTR, tag.attributes);
          phy.type = getAttribute(PHYLOGENY_TYPE_ATTR, tag.attributes);
          _objectStack.push(phy);
        }
        function newSimpleCharacteristics() {
          var sc = {};
          getCurrentObject().simple_characteristics = sc;
          _objectStack.push(sc);
        }
        function inAccession(text) {
          getCurrentObject().value = text;
        }
        function inAnnotation(text) {
          if (getCurrentTag() === ANNOTATION_DESC) {
            getCurrentObject().desc = text;
          }
        }
        function inAppType(text) {
          if (getCurrentTag() === APPTYPE) {
            getCurrentObject().desc = text;
          }
        }
        function inBranchColor(text) {
          if (getCurrentTag() === COLOR_RED) {
            getCurrentObject().red = parseIntNumber(text);
          } else if (getCurrentTag() === COLOR_GREEN) {
            getCurrentObject().green = parseIntNumber(text);
          } else if (getCurrentTag() === COLOR_BLUE) {
            getCurrentObject().blue = parseIntNumber(text);
          }
          if (getCurrentTag() === COLOR_ALPHA) {
            getCurrentObject().alpha = parseIntNumber(text);
          }
        }
        function inClade(text) {
          if (getCurrentTag() === CLADE_NAME) {
            getCurrentClade().name = text;
          } else if (getCurrentTag() === CLADE_BRANCH_LENGTH) {
            getCurrentClade().branch_length = parseFloatNumber(text);
          } else if (getCurrentTag() === CLADE_WIDTH) {
            getCurrentClade().width = parseFloatNumber(text);
          }
        }
        function inConfidence(text) {
          getCurrentObject().value = parseFloatNumber(text);
        }
        function inDate(text) {
          if (getCurrentTag() === DATE_DESC) {
            getCurrentObject().desc = text;
          } else if (getCurrentTag() === DATE_VALUE) {
            getCurrentObject().value = parseFloatNumber(text);
          } else if (getCurrentTag() === DATE_MINIMUM) {
            getCurrentObject().minimum = parseFloatNumber(text);
          } else if (getCurrentTag() === DATE_MAXIMUM) {
            getCurrentObject().maximum = parseFloatNumber(text);
          }
        }
        function inDistribution(text) {
          if (getCurrentTag() === DISTRIBUTION_DESC) {
            getCurrentObject().desc = text;
          }
        }
        function inEvents(text) {
          if (getCurrentTag() === EVENTS_TYPE) {
            getCurrentObject().type = text;
          } else if (getCurrentTag() === EVENTS_DUPLICATIONS) {
            getCurrentObject().duplications = parseIntNumber(text);
          } else if (getCurrentTag() === EVENTS_SPECIATIONS) {
            getCurrentObject().speciations = parseIntNumber(text);
          } else if (getCurrentTag() === EVENTS_LOSSES) {
            getCurrentObject().losses = parseIntNumber(text);
          }
        }
        function inId(text) {
          getCurrentObject().value = text;
        }
        function inMolecularSequence(text) {
          getCurrentObject().value = text;
        }
        function inPoint(text) {
          if (getCurrentTag() === POINT_LAT) {
            getCurrentObject().lat = text;
          } else if (getCurrentTag() === POINT_LONG) {
            getCurrentObject().long = text;
          } else if (getCurrentTag() === POINT_ALT) {
            getCurrentObject().alt = text;
          }
        }
        function inProperty(text) {
          getCurrentObject().value = text;
        }
        function inProteinDomain(text) {
          getCurrentObject().name = text;
        }
        function inPhylogeny(text) {
          if (getCurrentTag() === PHYLOGENY_NAME) {
            getCurrentObject().name = text;
          } else if (getCurrentTag() === PHYLOGENY_DESCRIPTION) {
            getCurrentObject().description = text;
          } else if (getCurrentTag() === PHYLOGENY_DATE) {
            getCurrentObject().date = text;
          }
        }
        function inReference(text) {
          if (getCurrentTag() === REFERENCE_DESC) {
            getCurrentObject().desc = text;
          }
        }
        function inSequence(text) {
          if (getCurrentTag() === SEQUENCE_SYMBOL) {
            getCurrentObject().symbol = text;
          } else if (getCurrentTag() === SEQUENCE_NAME) {
            getCurrentObject().name = text;
          } else if (getCurrentTag() === SEQUENCE_GENE_NAME) {
            getCurrentObject().gene_name = text;
          } else if (getCurrentTag() === SEQUENCE_LOCATION) {
            getCurrentObject().location = text;
          }
        }
        function inTaxonomy(text) {
          if (getCurrentTag() === TAXONOMY_CODE) {
            getCurrentObject().code = text;
          } else if (getCurrentTag() === TAXONOMY_SCIENTIFIC_NAME) {
            getCurrentObject().scientific_name = text;
          } else if (getCurrentTag() === TAXONOMY_AUTHORITY) {
            getCurrentObject().authority = text;
          } else if (getCurrentTag() === TAXONOMY_COMMON_NAME) {
            getCurrentObject().common_name = text;
          } else if (getCurrentTag() === TAXONOMY_SYNONYM) {
            addToArrayInCurrentObject(TAXONOMY_SYNONYMS, text);
          } else if (getCurrentTag() === TAXONOMY_RANK) {
            getCurrentObject().rank = text;
          }
        }
        function inUri(text) {
          getCurrentObject().value = text;
        }
        function inSimpleCharacteristics(text) {
          if (getCurrentTag() === X_SIMPLE_CHARACTERISTIC_COUNTRY) {
            getCurrentObject().country = text;
          } else if (getCurrentTag() === X_SIMPLE_CHARACTERISTIC_HOST) {
            getCurrentObject().host = text;
          } else if (getCurrentTag() === X_SIMPLE_CHARACTERISTIC_YEAR) {
            getCurrentObject().year = text;
          } else if (getCurrentTag() === X_SIMPLE_CHARACTERISTIC_HA) {
            getCurrentObject().ha = text;
          } else if (getCurrentTag() === X_SIMPLE_CHARACTERISTIC_NA) {
            getCurrentObject().na = text;
          }
        }
        function phyloxmlOnopentag(tag) {
          _tagStack.push(tag.name);
          switch (tag.name) {
            case CLADE:
              newClade(tag);
              break;
            case ACCESSION:
              newAccession(tag);
              break;
            case ANNOTATION:
              newAnnotation(tag);
              break;
            case CLADE_RELATION:
              if (_tagStack.get(1) === PHYLOGENY) {
                newCladeRelation(tag);
              }
              break;
            case COLOR:
              newBranchColor();
              break;
            case CONFIDENCE:
              newConfidence(tag);
              break;
            case CROSS_REFERENCES:
              newCrossReferences();
              break;
            case DATE:
              if (_tagStack.get(1) === CLADE) {
                newDate(tag);
              }
              break;
            case DISTRIBUTION:
              newDistribution(tag);
              break;
            case DOMAIN_ARCHITECTURE:
              newDomainArchitecture(tag);
              break;
            case EVENTS:
              newEvents();
              break;
            case ID:
              newId(tag);
              break;
            case MOLSEQ:
              newMolecularSequence(tag);
              break;
            case POINT:
              newPoint(tag);
              break;
            case PROTEINDOMAIN:
              newProteinDomain(tag);
              break;
            case PHYLOGENY:
              newPhylogeny(tag);
              break;
            case PROPERTY:
              newProperty(tag);
              break;
            case REFERENCE:
              newReference(tag);
              break;
            case SEQUENCE:
              newSequence(tag);
              break;
            case SEQUENCE_RELATION:
              if (_tagStack.get(1) === PHYLOGENY) {
                newSequenceRelation(tag);
              }
              break;
            case TAXONOMY:
              newTaxonomy(tag);
              break;
            case URI:
              newUri(tag);
              break;
            case X_SIMPLE_CHARACTERISTICS:
              newSimpleCharacteristics();
              break;
            default:
          }
        }
        function phyloxmlOnclosetag(tag) {
          if (tag === CLADE) {
            _tagStack.pop();
            _objectStack.pop();
            _cladeStack.pop();
          } else if (tag === ACCESSION || tag === ANNOTATION || tag === CLADE_RELATION && _tagStack.get(1) === PHYLOGENY || tag === COLOR || tag === CONFIDENCE || tag === CROSS_REFERENCES || tag === DATE && _tagStack.get(1) === CLADE || tag === DISTRIBUTION || tag === TAXONOMY || tag === ID || tag === EVENTS || tag === MOLSEQ || tag === REFERENCE || tag === DOMAIN_ARCHITECTURE || tag === PROTEINDOMAIN || tag === SEQUENCE || tag === SEQUENCE_RELATION && _tagStack.get(1) === PHYLOGENY || tag === PROPERTY || tag === POINT || tag === URI || tag === X_SIMPLE_CHARACTERISTICS) {
            _tagStack.pop();
            _objectStack.pop();
          } else if (!(tag === PHYLOGENY || tag === PHYLOXML)) {
            _tagStack.pop();
          } else if (tag === PHYLOGENY) {
            phyloxmlOnClosetagSanityCheck();
            _phylogenies.push(_phylogeny);
            startNewPhylogeny();
          }
        }
        function phyloxmlOntext(text) {
          var parentTag = _tagStack.get(1);
          var currentTag = _tagStack.peek();
          if (parentTag === CLADE) {
            inClade(text);
          } else if (parentTag === ANNOTATION) {
            inAnnotation(text);
          } else if (parentTag === COLOR) {
            inBranchColor(text);
          } else if (parentTag === DATE) {
            inDate(text);
          } else if (parentTag === DISTRIBUTION) {
            inDistribution(text);
          } else if (parentTag === EVENTS) {
            inEvents(text);
          } else if (parentTag === REFERENCE) {
            inReference(text);
          } else if (parentTag === PHYLOGENY) {
            inPhylogeny(text);
          } else if (parentTag === POINT) {
            inPoint(text);
          } else if (parentTag === SEQUENCE) {
            inSequence(text);
          } else if (parentTag === TAXONOMY) {
            inTaxonomy(text);
          }
          if (currentTag === ACCESSION) {
            inAccession(text);
          } else if (currentTag === APPTYPE) {
            inAppType(text);
          } else if (currentTag === CONFIDENCE) {
            inConfidence(text);
          } else if (currentTag === ID) {
            inId(text);
          } else if (currentTag === MOLSEQ) {
            inMolecularSequence(text);
          } else if (currentTag === PROTEINDOMAIN) {
            inProteinDomain(text);
          } else if (currentTag === PROPERTY) {
            inProperty(text);
          } else if (currentTag === URI) {
            inUri(text);
          } else if (parentTag === X_SIMPLE_CHARACTERISTICS) {
            inSimpleCharacteristics(text);
          }
        }
        function phyloxmlOnerror(error) {
          throw error;
        }
        function addPhyloxmlParserEvents(sax_parser) {
          sax_parser.onopentag = phyloxmlOnopentag;
          sax_parser.onclosetag = phyloxmlOnclosetag;
          sax_parser.ontext = phyloxmlOntext;
          sax_parser.onerror = phyloxmlOnerror;
        }
        function getCurrentClade() {
          return _cladeStack.peek();
        }
        function getCurrentTag() {
          return _tagStack.peek();
        }
        function getCurrentObject() {
          return _objectStack.peek();
        }
        function getAttribute(attribute_name, attributes) {
          if (attribute_name in attributes) {
            return attributes[attribute_name];
          }
          return void 0;
        }
        function getAttributeAsInt(attribute_name, attributes) {
          if (attribute_name in attributes) {
            return parseIntNumber(attributes[attribute_name]);
          }
          return void 0;
        }
        function getAttributeAsFloat(attribute_name, attributes) {
          if (attribute_name in attributes) {
            return parseFloatNumber(attributes[attribute_name]);
          }
          return void 0;
        }
        function getAttributeAsBoolean(attribute_name, attributes) {
          if (attribute_name in attributes) {
            return parseBoolean(attributes[attribute_name]);
          }
          return void 0;
        }
        function addToArrayInCurrentObject(name, value) {
          var parent = null;
          if (getCurrentObject()) {
            parent = getCurrentObject();
          } else {
            parent = _phylogeny;
          }
          var ary = parent[name];
          if (ary) {
            ary.push(value);
          } else {
            parent[name] = [value];
          }
        }
        function addToArrayInCurrentObjectUnnamed(value) {
          var obj = getCurrentObject();
          obj.push(value);
        }
        function parseFloatNumber(text) {
          var f = parseFloat(text);
          if (isNaN(f)) {
            throw new PhyloXmlError("could not parse floating point number from '" + text + "'");
          }
          return f;
        }
        function parseIntNumber(text) {
          var i = parseInt(text);
          if (isNaN(i)) {
            throw new PhyloXmlError("could not parse integer number from '" + text + "'");
          }
          return i;
        }
        function parseBoolean(text) {
          if (text === "true") {
            return true;
          } else if (text === "false") {
            return false;
          } else {
            throw new PhyloXmlError("could not parse boolean from '" + text + "'");
          }
        }
        function startNewPhylogeny() {
          _phylogeny = null;
          _cladeStack = new Stack();
          _tagStack = new Stack();
          _objectStack = new Stack();
        }
        function phyloxmlOnClosetagSanityCheck() {
          if (!(_cladeStack.isEmpty() && _objectStack.isEmpty())) {
            throw new PhyloXmlError("severe phyloXML format error");
          }
        }
        function finalSanityCheck() {
          if (!_tagStack.isEmpty()) {
            throw new PhyloXmlError("severe phyloXML format error");
          }
        }
        function Stack() {
          this._stack = [];
          this.pop = function() {
            var p = this._stack.pop();
            if (p === void 0) {
              throw new Error("severe phyloXML format error");
            }
            return p;
          };
          this.push = function(item) {
            this._stack.push(item);
          };
          this.peek = function() {
            return this._stack[this._stack.length - 1];
          };
          this.get = function(i) {
            return this._stack[this._stack.length - (1 + i)];
          };
          this.length = function() {
            return this._stack.length;
          };
          this.isEmpty = function() {
            return this._stack.length < 1;
          };
        }
        function PhyloXmlError(message) {
          this.name = "phyloXmlError";
          this.message = message || "phyloXML format error";
        }
        PhyloXmlError.prototype = Object.create(Error.prototype);
        phyloXml.toPhyloXML_ = function(phy, dec) {
          var x = "";
          var ind = "";
          openPhyloXml();
          openPhylogeny(phy, [
            PHYLOGENY_ROOTED_ATTR,
            PHYLOGENY_REROOTABLE_ATTR,
            PHYLOGENY_BRANCH_LENGTH_UNIT_ATTR,
            PHYLOGENY_TYPE_ATTR
          ]);
          addSingleElement(PHYLOGENY_NAME, phy.name);
          addSingleElement(PHYLOGENY_DESCRIPTION, phy.description);
          addSingleElement(PHYLOGENY_DATE, phy.date);
          if (phy.children && phy.children.length === 1) {
            toPhyloXMLhelper(phy.children[0]);
          }
          closePhylogeny();
          closePhyloXml();
          return x;
          function toPhyloXMLhelper(node) {
            var l;
            var i;
            openClade(node, [CLADE_ID_SOURCE_ATTR, CLADE_COLLAPSE_ATTR]);
            addSingleElement(CLADE_NAME, node.name);
            if (node[CLADE_BRANCH_LENGTH]) {
              addSingleElement(CLADE_BRANCH_LENGTH, dec && dec > 0 ? roundNumber(node[CLADE_BRANCH_LENGTH], dec) : node[CLADE_BRANCH_LENGTH]);
            }
            if (node[CONFIDENCES] && node[CONFIDENCES].length > 0) {
              l = node[CONFIDENCES].length;
              for (i = 0; i < l; ++i) {
                var conf = node[CONFIDENCES][i];
                if (!conf[CONFIDENCE_TYPE_ATTR]) {
                  conf[CONFIDENCE_TYPE_ATTR] = UNKNOWN;
                }
                addSingleElement(
                  CONFIDENCE,
                  conf.value,
                  conf,
                  [CONFIDENCE_TYPE_ATTR, CONFIDENCE_STDDEV_ATTR]
                );
              }
            }
            addSingleElement(CLADE_WIDTH, node[CLADE_WIDTH]);
            if (node[COLOR]) {
              var col = node[COLOR];
              open(COLOR);
              addSingleElement(COLOR_RED, col[COLOR_RED]);
              addSingleElement(COLOR_GREEN, col[COLOR_GREEN]);
              addSingleElement(COLOR_BLUE, col[COLOR_BLUE]);
              addSingleElement(COLOR_ALPHA, col[COLOR_ALPHA]);
              close(COLOR);
            }
            if (node[TAXONOMIES] && node[TAXONOMIES].length > 0) {
              l = node[TAXONOMIES].length;
              for (i = 0; i < l; ++i) {
                var tax = node[TAXONOMIES][i];
                open(TAXONOMY, tax, [TAXONOMY_ID_SOURCE_ATTR]);
                if (tax[ID]) {
                  if (!tax[ID][ID_PROVIDER_ATTR]) {
                    tax[ID][ID_PROVIDER_ATTR] = UNKNOWN;
                  }
                  addSingleElement(
                    ID,
                    tax[ID].value,
                    tax[ID],
                    [ID_PROVIDER_ATTR]
                  );
                }
                addSingleElement(TAXONOMY_CODE, tax[TAXONOMY_CODE]);
                addSingleElement(TAXONOMY_SCIENTIFIC_NAME, tax[TAXONOMY_SCIENTIFIC_NAME]);
                addSingleElement(TAXONOMY_AUTHORITY, tax[TAXONOMY_AUTHORITY]);
                addSingleElement(TAXONOMY_COMMON_NAME, tax[TAXONOMY_COMMON_NAME]);
                if (tax[TAXONOMY_SYNONYMS] && tax[TAXONOMY_SYNONYMS].length > 0) {
                  var ll = tax[TAXONOMY_SYNONYMS].length;
                  for (var ii = 0; ii < ll; ++ii) {
                    addSingleElement(TAXONOMY_SYNONYM, tax[TAXONOMY_SYNONYMS][ii]);
                  }
                }
                addSingleElement(TAXONOMY_RANK, tax[TAXONOMY_RANK]);
                close(TAXONOMY);
              }
            }
            if (node[SEQUENCES] && node[SEQUENCES].length > 0) {
              l = node[SEQUENCES].length;
              for (i = 0; i < l; ++i) {
                var seq = node[SEQUENCES][i];
                open(SEQUENCE, seq, [SEQUENCE_TYPE_ATTR, SEQUENCE_ID_SOURCE_ATTR, SEQUENCE_ID_REF_ATTR]);
                addSingleElement(SEQUENCE_SYMBOL, seq[SEQUENCE_SYMBOL]);
                if (seq[ACCESSION]) {
                  if (!seq[ACCESSION][ACCESSION_SOURCE_ATTR]) {
                    seq[ACCESSION][ACCESSION_SOURCE_ATTR] = UNKNOWN;
                  }
                  addSingleElement(
                    ACCESSION,
                    seq[ACCESSION].value,
                    seq[ACCESSION],
                    [ACCESSION_SOURCE_ATTR, ACCESSION_COMMENT_ATTR]
                  );
                }
                addSingleElement(SEQUENCE_NAME, seq[SEQUENCE_NAME]);
                addSingleElement(SEQUENCE_GENE_NAME, seq[SEQUENCE_GENE_NAME]);
                addSingleElement(SEQUENCE_LOCATION, seq[SEQUENCE_LOCATION]);
                if (seq[MOLSEQ]) {
                  addSingleElement(
                    MOLSEQ,
                    seq[MOLSEQ].value,
                    seq[MOLSEQ],
                    [MOLSEQ_IS_ALIGNED_ATTR]
                  );
                }
                close(SEQUENCE);
              }
            }
            if (node[EVENTS]) {
              var ev = node[EVENTS];
              open(EVENTS);
              addSingleElement(EVENTS_TYPE, ev[EVENTS_TYPE]);
              addSingleElement(EVENTS_DUPLICATIONS, ev[EVENTS_DUPLICATIONS]);
              addSingleElement(EVENTS_SPECIATIONS, ev[EVENTS_SPECIATIONS]);
              addSingleElement(EVENTS_LOSSES, ev[EVENTS_LOSSES]);
              if (ev[CONFIDENCE]) {
                var evconf = ev[CONFIDENCE];
                addSingleElement(
                  CONFIDENCE,
                  evconf.value,
                  evconf,
                  [CONFIDENCE_TYPE_ATTR, CONFIDENCE_STDDEV_ATTR]
                );
              }
              close(EVENTS);
            }
            if (node[PROPERTIES] && node[PROPERTIES].length > 0) {
              l = node[PROPERTIES].length;
              for (i = 0; i < l; ++i) {
                var prop = node[PROPERTIES][i];
                if (!prop[PROPERTY_APPLIES_TO_ATTR]) {
                  throw new PhyloXmlError("property applies-to is missing");
                }
                if (!prop[PROPERTY_DATATYPE_ATTR]) {
                  throw new PhyloXmlError("property data-type is missing");
                }
                if (!prop[PROPERTY_REF_ATTR]) {
                  throw new PhyloXmlError("property ref is missing");
                }
                addSingleElement(PROPERTY, prop.value, prop, [
                  PROPERTY_REF_ATTR,
                  PROPERTY_UNIT_ATTR,
                  PROPERTY_DATATYPE_ATTR,
                  PROPERTY_APPLIES_TO_ATTR,
                  PROPERTY_ID_REF_ATTR
                ]);
              }
            }
            if (node.children) {
              l = node.children.length;
              for (i = 0; i < l; ++i) {
                toPhyloXMLhelper(node.children[i]);
              }
            } else if (node._children) {
              l = node._children.length;
              for (i = 0; i < l; ++i) {
                toPhyloXMLhelper(node._children[i]);
              }
            }
            closeClade();
          }
          function addSingleElement(elemName, elemValue, object, attributeNames) {
            if (elemValue !== null && elemValue !== void 0) {
              if (typeof elemValue === "string" || elemValue instanceof String) {
                elemValue = elemValue.trim();
                if (elemValue.length > 0) {
                  if (elemValue.indexOf("&") > -1 || elemValue.indexOf("<") > -1 || elemValue.indexOf(">") > -1 || elemValue.indexOf('"') > -1 || elemValue.indexOf("'") > -1) {
                    elemValue = replaceUnsafeChars(elemValue);
                  }
                } else {
                  return;
                }
              }
              x += ind + "<" + elemName;
              if (object && attributeNames && attributeNames.length > 0) {
                addAttributes(object, attributeNames);
              }
              x += ">" + elemValue + "</" + elemName + ">\n";
            }
          }
          function open(elemName, object, attributeNames) {
            if (object && attributeNames && attributeNames.length > 0) {
              x += ind + "<" + elemName;
              addAttributes(object, attributeNames);
              x += ">\n";
            } else {
              x += ind + "<" + elemName + ">\n";
            }
            ind = ind + " ";
          }
          function close(elemName) {
            reduceInd();
            x += ind + "</" + elemName + ">\n";
          }
          function openClade(object, attributeNames) {
            if (object && attributeNames && attributeNames.length > 0) {
              x += ind + "<clade";
              addAttributes(object, attributeNames);
              x += ">\n";
            } else {
              x += ind + "<clade>\n";
            }
            ind = ind + " ";
          }
          function closeClade() {
            reduceInd();
            x += ind + "</clade>\n";
          }
          function openPhylogeny(object, attributeNames) {
            if (object[PHYLOGENY_ROOTED_ATTR] === void 0 || object[PHYLOGENY_ROOTED_ATTR] === null) {
              object[PHYLOGENY_ROOTED_ATTR] = true;
            }
            if (object[PHYLOGENY_REROOTABLE_ATTR] === void 0 || object[PHYLOGENY_REROOTABLE_ATTR] === null) {
              object[PHYLOGENY_REROOTABLE_ATTR] = true;
            }
            if (object && attributeNames && attributeNames.length > 0) {
              x += " <phylogeny";
              addAttributes(object, attributeNames);
              x += ">\n";
            } else {
              x += " <phylogeny>\n";
            }
            ind = "  ";
          }
          function closePhylogeny() {
            ind = " ";
            x += " </phylogeny>\n";
          }
          function openPhyloXml() {
            ind = "";
            x += '<?xml version="1.0" encoding="UTF-8"?>\n';
            x += '<phyloxml xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.phyloxml.org http://www.phyloxml.org/1.20/phyloxml.xsd" xmlns="http://www.phyloxml.org">\n';
          }
          function closePhyloXml() {
            x += "</phyloxml>\n";
          }
          function addAttributes(object, attributeNames) {
            var l = attributeNames.length;
            for (var i = 0; i < l; ++i) {
              var attributeName = attributeNames[i];
              if (attributeName && (object[attributeName] !== void 0 && object[attributeName] !== null)) {
                x += " " + attributeName + '="' + object[attributeName] + '"';
              }
            }
          }
          function roundNumber(num, dec2) {
            return Math.round(num * Math.pow(10, dec2)) / Math.pow(10, dec2);
          }
          function replaceUnsafeChars(str) {
            return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
          }
          function reduceInd() {
            var l = ind.length;
            ind = "";
            for (var i = 0; i <= l - 2; ++i) {
              ind += " ";
            }
          }
        };
        phyloXml.parseAsync = function(stream, parseOptions) {
          _phylogenies = [];
          startNewPhylogeny();
          var sax_parser = sax.createStream(true, parseOptions);
          addPhyloxmlParserEvents(sax_parser);
          stream.pipe(sax_parser);
          sax_parser.on("end", function() {
            finalSanityCheck();
            var len = _phylogenies.length;
            console.log("parsed " + len + " trees");
          });
          process.stdout.on("drain", function() {
            stream.resume();
          });
        };
        phyloXml.parse = function(source, parseOptions) {
          source && (source = source.toString().trim());
          if (!source) {
            throw new Error("phyloXML source is empty");
          }
          _phylogenies = [];
          startNewPhylogeny();
          var sax_parser = sax.parser(true, parseOptions);
          addPhyloxmlParserEvents(sax_parser);
          sax_parser.onend = function() {
            finalSanityCheck();
          };
          sax_parser.write(source).close();
          return _phylogenies;
        };
        phyloXml.toPhyloXML = function(phy, decPointsMax) {
          return phyloXml.toPhyloXML_(phy, decPointsMax);
        };
        if (typeof module !== "undefined" && module.exports && !window.xmldocAssumeBrowser)
          module.exports.phyloXml = phyloXml;
        else if (typeof window !== "undefined")
          window.phyloXml = phyloXml;
        else
          this.phyloXml = phyloXml;
      })();
    }
  });

  // node_modules/iham-parsers/src/tree_utils.js
  var require_tree_utils = __commonJS({
    "node_modules/iham-parsers/src/tree_utils.js"(exports, module) {
      module.exports = {
        extractParentRelations: function(tree) {
          var uprels = {};
          var rec_trav = function(node) {
            if (node !== void 0 && node.children !== void 0) {
              node.children.forEach(function(child) {
                uprels[child.name] = node.name;
              });
              node.children.map(rec_trav);
            }
          };
          rec_trav(tree);
          return uprels;
        },
        ladderize: function(tree) {
          var rec_trav = function(node) {
            var tot_children;
            if (node.children !== void 0) {
              var rec_res = node.children.map(rec_trav);
              rec_res.sort(function(a, b) {
                if (a.cnts !== b.cnts) {
                  return a.cnts - b.cnts;
                } else {
                  return a.data.name.localeCompare(b.data.name);
                }
              });
              tot_children = rec_res.map((x) => x.cnts).reduce((a, b) => a + b, 0);
              node.children = rec_res.map((x) => x.data);
            } else {
              tot_children = 1;
            }
            return { cnts: tot_children, data: node };
          };
          return rec_trav(tree).data;
        },
        extractTree: function(xmltree) {
          if (xmltree && xmltree.constructor === Array && xmltree[0].rooted !== void 0) {
            return xmltree[0].children[0];
          } else {
            return xmltree;
          }
        },
        add_nodenames_from_taxonomy_if_needed: function(tree) {
          var rec_trav = function(node) {
            if (node.name === void 0 && node.taxonomies !== void 0) {
              node.name = node.taxonomies[0].scientific_name;
            }
            if (node.children !== void 0) {
              node.children.map(rec_trav);
            }
          };
          rec_trav(tree);
          return tree;
        },
        same_trees: function(t1, t2) {
          var rec_trav = function(n1, n2) {
            if (n1.name !== n2.name) return false;
            if (!n1.children && !n2.children) return true;
            if (!n1.children && n2.children || n1.children && !n2.children || n1.children.length !== n2.children.length) return false;
            let sames = n1.children.map(function(e, i) {
              return rec_trav(e, n2.children[i]);
            });
            return sames.every((x) => x);
          };
          return rec_trav(t1, t2);
        }
      };
    }
  });

  // node_modules/iham-parsers/src/xmlconverter.js
  var require_xmlconverter = __commonJS({
    "node_modules/iham-parsers/src/xmlconverter.js"(exports, module) {
      var sax = require_sax();
      var newick = require_newick2();
      var phyloxml = require_phyloxml();
      var tree_tool = require_tree_utils();
      var LevelIndexCreator = function() {
        this.levels = {};
        this.next_index = function(level) {
          if (this.levels[level] === void 0) {
            this.levels[level] = 0;
          } else {
            this.levels[level] += 1;
          }
          return this.levels[level];
        };
        this.current_index = function(level) {
          return this.levels[level];
        };
      };
      module.exports = function(tree, source, params) {
        params = params || {};
        var saxOptions = params.saxOptions || {};
        var augmented = params.augmented || false;
        var query_hog = params.query_hog || false;
        var parser = sax.parser(true, saxOptions);
        var per_species = {};
        var hog_metadata = {};
        var query_members = {};
        var gene2sp = {};
        var xrefs = {};
        var orgs = [];
        var sptree = {};
        var _sptree_parent_relations = {};
        var _lev = 0;
        var _cur_sp = "";
        var _og_stack = [];
        var _skipped_levels = [];
        var _level_index_creator = new LevelIndexCreator();
        var parsed_tree = (function() {
          if (typeof tree === "string") {
            if (tree.startsWith("<?xml") || tree.startsWith("<phyloxml")) {
              var xmltree = phyloxml.phyloXml.parse(tree);
              return tree_tool.add_nodenames_from_taxonomy_if_needed(tree_tool.extractTree(xmltree));
            } else {
              return newick.parse(tree);
            }
          } else {
            return tree;
          }
        })();
        var trimSpeciesTree = function() {
          var rec_trav = function(node) {
            if (node !== void 0 && node.children !== void 0) {
              var childs = node.children.map(rec_trav).filter((el) => el !== void 0);
              var is_internal_species = orgs.indexOf(node.name) >= 0;
              if (is_internal_species) {
                for (let gene in gene2sp) {
                  if (gene2sp.hasOwnProperty(gene)) {
                    if (gene2sp[gene] === node.name) {
                      gene2sp[gene] += " (species)";
                    }
                  }
                }
                orgs[orgs.indexOf(node.name)] += " (species)";
                childs.push({ name: node.name + " (species)" });
              }
              if (childs.length === 0) {
                return void 0;
              } else if (childs.length === 1) {
                _skipped_levels.push(node.name);
                return childs[0];
              } else {
                return { name: node.name, children: childs };
              }
            } else {
              if (orgs.indexOf(node.name) >= 0) {
                return { name: node.name };
              } else {
                return void 0;
              }
            }
          };
          return rec_trav(parsed_tree);
        };
        var openTag = function(args) {
          var tagName = saxOptions.xmlns ? args.local : args.name;
          var prev, og, geneId;
          if (tagName === "species") {
            _cur_sp = args.attributes.name;
            orgs.push(args.attributes.name);
          } else if (tagName === "gene") {
            geneId = parseInt(args.attributes.id, 10);
            gene2sp[geneId] = _cur_sp;
            xrefs[geneId] = args.attributes.protId;
          } else if (tagName === "geneRef") {
            geneId = parseInt(args.attributes.id, 10);
            prev = _og_stack[_og_stack.length - 1];
            prev.memb.push(geneId);
            if (!augmented) {
              let sp2 = gene2sp[geneId];
              let lev_cnt = _level_index_creator.next_index(sp2);
              add_elements_to_per_species([geneId], sp2, lev_cnt);
              if (prev.species_sublevels[sp2] === void 0) {
                prev.species_sublevels[sp2] = [];
              }
              prev.species_sublevels[sp2].push(geneId);
            } else {
              let metadata = {};
              _og_stack.forEach((item) => metadata[item.lev] = item.hog_id);
              hog_metadata[geneId] = metadata;
            }
          } else if (tagName === "orthologGroup") {
            og = { memb: [], lev: void 0, species_sublevels: {} };
            if (augmented) {
              og.hog_id = args.attributes.id;
            }
            _lev += 1;
            _og_stack.push(og);
          } else if (tagName === "property" && args.attributes.name === "TaxRange") {
            prev = _og_stack[_og_stack.length - 1];
            prev.lev = args.attributes.value;
          } else if (tagName === "property" && args.attributes.name === "taxid") {
            prev = _og_stack[_og_stack.length - 1];
            prev.taxid = args.attributes.value;
          } else if (tagName === "score") {
            prev = _og_stack[_og_stack.length - 1];
            prev[args.attributes.id] = args.attributes.value;
          } else if (tagName === "groups") {
            var sp = trimSpeciesTree();
            sptree = sp;
            _sptree_parent_relations = tree_tool.extractParentRelations(sp);
          }
        };
        var add_elements_to_per_species = function(members, lev, anc_gene_idx) {
          members.forEach(function(member) {
            let sp = gene2sp[member];
            if (per_species[sp] === void 0) {
              per_species[sp] = {};
            }
            if (per_species[sp][lev] === void 0) {
              per_species[sp][lev] = [];
            }
            let levPerSpeciesObj = per_species[sp][lev];
            while (levPerSpeciesObj.length <= anc_gene_idx) {
              levPerSpeciesObj.push([]);
            }
            levPerSpeciesObj[anc_gene_idx].push(member);
          });
        };
        var mrca = function(members) {
          const lineage = function(gene) {
            let sp = gene2sp[gene];
            var lin2 = [sp];
            let parent = _sptree_parent_relations[sp];
            while (parent !== void 0) {
              lin2.push(parent);
              parent = _sptree_parent_relations[parent];
            }
            return lin2;
          };
          const lin = lineage(members[0]);
          var cnts = Array.from({ length: lin.length }, () => 0);
          members.forEach(function(member) {
            let ca = lineage(member).findIndex((x) => lin.indexOf(x) >= 0);
            for (let x = ca; x < lin.length; x++) {
              cnts[x]++;
            }
          });
          let sel = cnts.indexOf(members.length);
          return lin[sel];
        };
        var add_levels_for_single_species_hogs = function(og) {
          let direct_species_levs = Object.keys(og.species_sublevels);
          if (direct_species_levs.length === 0) {
            return;
          }
          direct_species_levs.forEach(function(sp) {
            let sp_memb = og.species_sublevels[sp];
            if (sp === og.lev) {
              return;
            }
            let lev_node = _sptree_parent_relations[sp];
            while (lev_node !== void 0 && lev_node !== og.lev) {
              let idx = _level_index_creator.next_index(lev_node);
              add_elements_to_per_species(sp_memb, lev_node, idx);
              lev_node = _sptree_parent_relations[lev_node];
            }
          });
        };
        var closeTag = function(name) {
          name = saxOptions.xmlns ? name.replace(/.+?:/, "") : name;
          if (name === "orthologGroup") {
            var og = _og_stack.pop();
            if (og.hog_id) {
              if (query_hog == og.hog_id) {
                query_members = og.memb;
              }
            }
            if (og.lev === void 0) {
              og.lev = mrca(og.memb);
            }
            if (_skipped_levels.indexOf(og.lev) === -1) {
              var lev_cnt = _level_index_creator.next_index(og.lev);
              add_elements_to_per_species(og.memb, og.lev, lev_cnt);
              add_levels_for_single_species_hogs(og);
            }
            _lev -= 1;
            if (_lev === 0) {
            } else {
              var prev = _og_stack[_og_stack.length - 1];
              prev.memb.push.apply(prev.memb, og.memb);
              if (!augmented) {
                let lev_node = _sptree_parent_relations[og.lev];
                while (lev_node !== void 0 && lev_node !== prev.lev) {
                  let idx = _level_index_creator.next_index(lev_node);
                  add_elements_to_per_species(og.memb, lev_node, idx);
                  lev_node = _sptree_parent_relations[lev_node];
                }
              }
            }
          } else if (name === "paralogGroup") {
          }
        };
        var create_remaining_empty_hogs_at_all_levels = function() {
          for (var sp in per_species) {
            if (per_species.hasOwnProperty(sp)) {
              var spObj = per_species[sp];
              for (var tax in spObj) {
                if (spObj.hasOwnProperty(tax)) {
                  for (var i = 0; i < spObj[tax].length; i++) {
                    spObj[tax][i].sort();
                  }
                  while (_level_index_creator.current_index(tax) >= spObj[tax].length) {
                    spObj[tax].push([]);
                  }
                }
              }
            }
          }
        };
        parser.onopentag = openTag;
        parser.onclosetag = closeTag;
        parser.write(source).close();
        create_remaining_empty_hogs_at_all_levels();
        return {
          per_species,
          hog_metadata,
          query_members,
          tree: tree_tool.ladderize(sptree),
          xrefs
        };
      };
    }
  });

  // node_modules/iham-parsers/index.js
  var require_iham_parsers = __commonJS({
    "node_modules/iham-parsers/index.js"(exports, module) {
      module.exports.parse_newick = require_newick2();
      module.exports.parse_orthoxml = require_xmlconverter();
      module.exports.tree_tool = require_tree_utils();
      module.exports.parse_phyloxml = require_phyloxml();
    }
  });

  // src/xcoords.js
  var require_xcoords = __commonJS({
    "src/xcoords.js"(exports, module) {
      module.exports = function(arr, maxs, current_hog_state, fam_data, is_first) {
        if (arr === void 0) {
          return {
            genes: [],
            hogs: [],
            hog_groups: []
          };
        }
        const genes = [];
        const hogs_boundaries = [];
        let total_pos = 0;
        const max = d3.sum(maxs);
        arr.forEach((hog_genes, hog) => {
          if (current_hog_state.removed_hogs.indexOf(hog) === -1) {
            const hog_gene_names = [];
            hog_genes.sort();
            hog_genes.forEach(function(gene, gene_pos) {
              genes.push({
                id: gene,
                gene: fam_data[gene],
                hog,
                pos: total_pos + gene_pos,
                max,
                max_in_hog: maxs[hog],
                pos_in_hog: gene_pos
              });
              hog_gene_names.push(gene);
            });
            total_pos += maxs[hog];
            hogs_boundaries.push({
              max: d3.sum(maxs),
              max_in_hog: total_pos,
              hog,
              id: hog_gene_names.length ? hog_gene_names.join("_") : "hog_" + hog
            });
          }
        });
        let hogs = [];
        if (is_first && current_hog_state.hogs) {
          current_hog_state.hogs.forEach((hog) => {
            hog.max = max;
          });
          hogs = current_hog_state.hogs;
        }
        return {
          genes,
          hogs: hogs_boundaries.slice(0, -1),
          hog_groups: hogs
        };
      };
    }
  });

  // node_modules/tnt.tooltip/src/tooltip.js
  var require_tooltip = __commonJS({
    "node_modules/tnt.tooltip/src/tooltip.js"(exports, module) {
      var apijs = require_tnt();
      var tooltip2 = function() {
        "use strict";
        var drag = d3.behavior.drag();
        var tooltip_div;
        var conf = {
          container: void 0,
          position: "right",
          allow_drag: true,
          show_closer: true,
          fill: function() {
            throw "fill is not defined in the base object";
          },
          width: 180,
          id: 1
        };
        var t = function(data, event) {
          drag.origin(function() {
            return {
              x: parseInt(d3.select(this).style("left")),
              y: parseInt(d3.select(this).style("top"))
            };
          }).on("drag", function() {
            if (conf.allow_drag) {
              d3.select(this).style("left", d3.event.x + "px").style("top", d3.event.y + "px");
            }
          });
          var containerElem = conf.container;
          if (!containerElem) {
            containerElem = selectAncestor(this, "div");
            if (containerElem === void 0) {
              return;
            }
          }
          tooltip_div = d3.select(containerElem).append("div").attr("class", "tnt_tooltip").classed("tnt_tooltip_active", true).call(drag);
          d3.select("#tnt_tooltip_" + conf.id).remove();
          if (d3.event === null && event) {
            d3.event = event;
          }
          var d3mouse = d3.mouse(containerElem);
          d3.event = null;
          var xoffset = 0;
          if (conf.position === "left") {
            xoffset = conf.width;
          }
          tooltip_div.attr("id", "tnt_tooltip_" + conf.id);
          tooltip_div.style("left", d3mouse[0] - xoffset + "px").style("top", d3mouse[1] + "px");
          if (conf.show_closer) {
            tooltip_div.append("div").attr("class", "tnt_tooltip_closer").on("click", function() {
              t.close();
            });
          }
          conf.fill.call(tooltip_div.node(), data);
          return t;
        };
        function selectAncestor(elem, type) {
          type = type.toLowerCase();
          if (elem.parentNode === null) {
            console.log("No more parents");
            return void 0;
          }
          var tagName = elem.parentNode.tagName;
          if (tagName !== void 0 && tagName.toLowerCase() === type) {
            return elem.parentNode;
          } else {
            return selectAncestor(elem.parentNode, type);
          }
        }
        var api = apijs(t).getset(conf);
        api.check("position", function(val) {
          return val === "left" || val === "right";
        }, "Only 'left' or 'right' values are allowed for position");
        api.method("close", function() {
          if (tooltip_div) {
            tooltip_div.remove();
          }
        });
        return t;
      };
      tooltip2.list = function() {
        var t = tooltip2();
        var width = 180;
        t.fill(function(obj) {
          var tooltip_div = d3.select(this);
          var obj_info_list = tooltip_div.append("table").attr("class", "tnt_zmenu").attr("border", "solid").style("width", t.width() + "px");
          if (obj.header) {
            obj_info_list.append("tr").attr("class", "tnt_zmenu_header").append("th").text(obj.header);
          }
          var table_rows = obj_info_list.selectAll(".tnt_zmenu_row").data(obj.rows).enter().append("tr").attr("class", "tnt_zmenu_row");
          table_rows.append("td").style("text-align", "center").html(function(d, i) {
            return obj.rows[i].value;
          }).each(function(d) {
            if (d.link === void 0) {
              return;
            }
            d3.select(this).classed("link", 1).on("click", function(d2) {
              d2.link(d2.obj);
              t.close.call(this);
            });
          });
        });
        return t;
      };
      tooltip2.table = function() {
        var t = tooltip2();
        var width = 180;
        t.fill(function(obj) {
          var tooltip_div = d3.select(this);
          var obj_info_table = tooltip_div.append("table").attr("class", "tnt_zmenu").attr("border", "solid").style("width", t.width() + "px");
          if (obj.header) {
            obj_info_table.append("tr").attr("class", "tnt_zmenu_header").append("th").attr("colspan", 2).text(obj.header);
          }
          var table_rows = obj_info_table.selectAll(".tnt_zmenu_row").data(obj.rows).enter().append("tr").attr("class", "tnt_zmenu_row");
          table_rows.append("th").attr("colspan", function(d, i) {
            if (d.value === "") {
              return 2;
            }
            return 1;
          }).attr("class", function(d) {
            if (d.value === "") {
              return "tnt_zmenu_inner_header";
            }
            return "tnt_zmenu_cell";
          }).html(function(d, i) {
            return obj.rows[i].label;
          });
          table_rows.append("td").html(function(d, i) {
            if (typeof obj.rows[i].value === "function") {
              obj.rows[i].value.call(this, d);
            } else {
              return obj.rows[i].value;
            }
          }).each(function(d) {
            if (d.value === "") {
              d3.select(this).remove();
            }
          }).each(function(d) {
            if (d.link === void 0) {
              return;
            }
            d3.select(this).classed("link", 1).on("click", function(d2) {
              d2.link(d2.obj);
              t.close.call(this);
            });
          });
        });
        return t;
      };
      tooltip2.plain = function() {
        var t = tooltip2();
        t.fill(function(obj) {
          var tooltip_div = d3.select(this);
          var obj_info_table = tooltip_div.append("table").attr("class", "tnt_zmenu").attr("border", "solid").style("width", t.width() + "px");
          if (obj.header) {
            obj_info_table.append("tr").attr("class", "tnt_zmenu_header").append("th").text(obj.header);
          }
          if (obj.body) {
            obj_info_table.append("tr").attr("class", "tnt_zmenu_row").append("td").style("text-align", "center").html(obj.body);
          }
        });
        return t;
      };
      module.exports = exports = tooltip2;
    }
  });

  // node_modules/tnt.tooltip/index.js
  var require_tnt6 = __commonJS({
    "node_modules/tnt.tooltip/index.js"(exports, module) {
      module.exports = tooltip = require_tooltip();
    }
  });

  // node_modules/jquery/dist/jquery.js
  var require_jquery = __commonJS({
    "node_modules/jquery/dist/jquery.js"(exports, module) {
      (function(global2, factory) {
        "use strict";
        if (typeof module === "object" && typeof module.exports === "object") {
          module.exports = global2.document ? factory(global2, true) : function(w) {
            if (!w.document) {
              throw new Error("jQuery requires a window with a document");
            }
            return factory(w);
          };
        } else {
          factory(global2);
        }
      })(typeof window !== "undefined" ? window : exports, function(window2, noGlobal) {
        "use strict";
        var arr = [];
        var getProto = Object.getPrototypeOf;
        var slice = arr.slice;
        var flat = arr.flat ? function(array) {
          return arr.flat.call(array);
        } : function(array) {
          return arr.concat.apply([], array);
        };
        var push = arr.push;
        var indexOf = arr.indexOf;
        var class2type = {};
        var toString = class2type.toString;
        var hasOwn = class2type.hasOwnProperty;
        var fnToString = hasOwn.toString;
        var ObjectFunctionString = fnToString.call(Object);
        var support = {};
        var isFunction = function isFunction2(obj) {
          return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
        };
        var isWindow = function isWindow2(obj) {
          return obj != null && obj === obj.window;
        };
        var document2 = window2.document;
        var preservedScriptAttributes = {
          type: true,
          src: true,
          nonce: true,
          noModule: true
        };
        function DOMEval(code, node, doc) {
          doc = doc || document2;
          var i, val, script = doc.createElement("script");
          script.text = code;
          if (node) {
            for (i in preservedScriptAttributes) {
              val = node[i] || node.getAttribute && node.getAttribute(i);
              if (val) {
                script.setAttribute(i, val);
              }
            }
          }
          doc.head.appendChild(script).parentNode.removeChild(script);
        }
        function toType(obj) {
          if (obj == null) {
            return obj + "";
          }
          return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
        }
        var version = "3.7.1", rhtmlSuffix = /HTML$/i, jQuery = function(selector, context) {
          return new jQuery.fn.init(selector, context);
        };
        jQuery.fn = jQuery.prototype = {
          // The current version of jQuery being used
          jquery: version,
          constructor: jQuery,
          // The default length of a jQuery object is 0
          length: 0,
          toArray: function() {
            return slice.call(this);
          },
          // Get the Nth element in the matched element set OR
          // Get the whole matched element set as a clean array
          get: function(num) {
            if (num == null) {
              return slice.call(this);
            }
            return num < 0 ? this[num + this.length] : this[num];
          },
          // Take an array of elements and push it onto the stack
          // (returning the new matched element set)
          pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            return ret;
          },
          // Execute a callback for every element in the matched set.
          each: function(callback) {
            return jQuery.each(this, callback);
          },
          map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
              return callback.call(elem, i, elem);
            }));
          },
          slice: function() {
            return this.pushStack(slice.apply(this, arguments));
          },
          first: function() {
            return this.eq(0);
          },
          last: function() {
            return this.eq(-1);
          },
          even: function() {
            return this.pushStack(jQuery.grep(this, function(_elem, i) {
              return (i + 1) % 2;
            }));
          },
          odd: function() {
            return this.pushStack(jQuery.grep(this, function(_elem, i) {
              return i % 2;
            }));
          },
          eq: function(i) {
            var len = this.length, j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
          },
          end: function() {
            return this.prevObject || this.constructor();
          },
          // For internal use only.
          // Behaves like an Array's method, not like a jQuery method.
          push,
          sort: arr.sort,
          splice: arr.splice
        };
        jQuery.extend = jQuery.fn.extend = function() {
          var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
          if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
          }
          if (typeof target !== "object" && !isFunction(target)) {
            target = {};
          }
          if (i === length) {
            target = this;
            i--;
          }
          for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
              for (name in options) {
                copy = options[name];
                if (name === "__proto__" || target === copy) {
                  continue;
                }
                if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                  src = target[name];
                  if (copyIsArray && !Array.isArray(src)) {
                    clone = [];
                  } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                    clone = {};
                  } else {
                    clone = src;
                  }
                  copyIsArray = false;
                  target[name] = jQuery.extend(deep, clone, copy);
                } else if (copy !== void 0) {
                  target[name] = copy;
                }
              }
            }
          }
          return target;
        };
        jQuery.extend({
          // Unique for each copy of jQuery on the page
          expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
          // Assume jQuery is ready without the ready module
          isReady: true,
          error: function(msg) {
            throw new Error(msg);
          },
          noop: function() {
          },
          isPlainObject: function(obj) {
            var proto, Ctor;
            if (!obj || toString.call(obj) !== "[object Object]") {
              return false;
            }
            proto = getProto(obj);
            if (!proto) {
              return true;
            }
            Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
            return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
          },
          isEmptyObject: function(obj) {
            var name;
            for (name in obj) {
              return false;
            }
            return true;
          },
          // Evaluates a script in a provided context; falls back to the global one
          // if not specified.
          globalEval: function(code, options, doc) {
            DOMEval(code, { nonce: options && options.nonce }, doc);
          },
          each: function(obj, callback) {
            var length, i = 0;
            if (isArrayLike(obj)) {
              length = obj.length;
              for (; i < length; i++) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                  break;
                }
              }
            } else {
              for (i in obj) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                  break;
                }
              }
            }
            return obj;
          },
          // Retrieve the text value of an array of DOM nodes
          text: function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (!nodeType) {
              while (node = elem[i++]) {
                ret += jQuery.text(node);
              }
            }
            if (nodeType === 1 || nodeType === 11) {
              return elem.textContent;
            }
            if (nodeType === 9) {
              return elem.documentElement.textContent;
            }
            if (nodeType === 3 || nodeType === 4) {
              return elem.nodeValue;
            }
            return ret;
          },
          // results is for internal usage only
          makeArray: function(arr2, results) {
            var ret = results || [];
            if (arr2 != null) {
              if (isArrayLike(Object(arr2))) {
                jQuery.merge(
                  ret,
                  typeof arr2 === "string" ? [arr2] : arr2
                );
              } else {
                push.call(ret, arr2);
              }
            }
            return ret;
          },
          inArray: function(elem, arr2, i) {
            return arr2 == null ? -1 : indexOf.call(arr2, elem, i);
          },
          isXMLDoc: function(elem) {
            var namespace = elem && elem.namespaceURI, docElem = elem && (elem.ownerDocument || elem).documentElement;
            return !rhtmlSuffix.test(namespace || docElem && docElem.nodeName || "HTML");
          },
          // Support: Android <=4.0 only, PhantomJS 1 only
          // push.apply(_, arraylike) throws on ancient WebKit
          merge: function(first, second) {
            var len = +second.length, j = 0, i = first.length;
            for (; j < len; j++) {
              first[i++] = second[j];
            }
            first.length = i;
            return first;
          },
          grep: function(elems, callback, invert) {
            var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
            for (; i < length; i++) {
              callbackInverse = !callback(elems[i], i);
              if (callbackInverse !== callbackExpect) {
                matches.push(elems[i]);
              }
            }
            return matches;
          },
          // arg is for internal usage only
          map: function(elems, callback, arg) {
            var length, value, i = 0, ret = [];
            if (isArrayLike(elems)) {
              length = elems.length;
              for (; i < length; i++) {
                value = callback(elems[i], i, arg);
                if (value != null) {
                  ret.push(value);
                }
              }
            } else {
              for (i in elems) {
                value = callback(elems[i], i, arg);
                if (value != null) {
                  ret.push(value);
                }
              }
            }
            return flat(ret);
          },
          // A global GUID counter for objects
          guid: 1,
          // jQuery.support is not used in Core but other projects attach their
          // properties to it so it needs to exist.
          support
        });
        if (typeof Symbol === "function") {
          jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
        }
        jQuery.each(
          "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
          function(_i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
          }
        );
        function isArrayLike(obj) {
          var length = !!obj && "length" in obj && obj.length, type = toType(obj);
          if (isFunction(obj) || isWindow(obj)) {
            return false;
          }
          return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
        }
        function nodeName(elem, name) {
          return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        }
        var pop = arr.pop;
        var sort = arr.sort;
        var splice = arr.splice;
        var whitespace = "[\\x20\\t\\r\\n\\f]";
        var rtrimCSS = new RegExp(
          "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
          "g"
        );
        jQuery.contains = function(a, b) {
          var bup = b && b.parentNode;
          return a === bup || !!(bup && bup.nodeType === 1 && // Support: IE 9 - 11+
          // IE doesn't have `contains` on SVG.
          (a.contains ? a.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
        };
        var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
        function fcssescape(ch, asCodePoint) {
          if (asCodePoint) {
            if (ch === "\0") {
              return "\uFFFD";
            }
            return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
          }
          return "\\" + ch;
        }
        jQuery.escapeSelector = function(sel) {
          return (sel + "").replace(rcssescape, fcssescape);
        };
        var preferredDoc = document2, pushNative = push;
        (function() {
          var i, Expr, outermostContext, sortInput, hasDuplicate, push2 = pushNative, document3, documentElement2, documentIsHTML, rbuggyQSA, matches, expando = jQuery.expando, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), nonnativeSelectorCache = createCache(), sortOrder = function(a, b) {
            if (a === b) {
              hasDuplicate = true;
            }
            return 0;
          }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + // Operator (capture 2)
          "*([*^$|!~]?=)" + whitespace + // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
          `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + identifier + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rleadingCombinator = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rdescend = new RegExp(whitespace + "|>"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + identifier + ")"),
            CLASS: new RegExp("^\\.(" + identifier + ")"),
            TAG: new RegExp("^(" + identifier + "|[*])"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp(
              "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)",
              "i"
            ),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            // For use in libraries implementing .is()
            // We use this for POS matching in `select`
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
          }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rquickExpr2 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"), funescape = function(escape, nonHex) {
            var high = "0x" + escape.slice(1) - 65536;
            if (nonHex) {
              return nonHex;
            }
            return high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
          }, unloadHandler = function() {
            setDocument();
          }, inDisabledFieldset = addCombinator(
            function(elem) {
              return elem.disabled === true && nodeName(elem, "fieldset");
            },
            { dir: "parentNode", next: "legend" }
          );
          function safeActiveElement() {
            try {
              return document3.activeElement;
            } catch (err) {
            }
          }
          try {
            push2.apply(
              arr = slice.call(preferredDoc.childNodes),
              preferredDoc.childNodes
            );
            arr[preferredDoc.childNodes.length].nodeType;
          } catch (e) {
            push2 = {
              apply: function(target, els) {
                pushNative.apply(target, slice.call(els));
              },
              call: function(target) {
                pushNative.apply(target, slice.call(arguments, 1));
              }
            };
          }
          function find(selector, context, results, seed) {
            var m, i2, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
            results = results || [];
            if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
              return results;
            }
            if (!seed) {
              setDocument(context);
              context = context || document3;
              if (documentIsHTML) {
                if (nodeType !== 11 && (match = rquickExpr2.exec(selector))) {
                  if (m = match[1]) {
                    if (nodeType === 9) {
                      if (elem = context.getElementById(m)) {
                        if (elem.id === m) {
                          push2.call(results, elem);
                          return results;
                        }
                      } else {
                        return results;
                      }
                    } else {
                      if (newContext && (elem = newContext.getElementById(m)) && find.contains(context, elem) && elem.id === m) {
                        push2.call(results, elem);
                        return results;
                      }
                    }
                  } else if (match[2]) {
                    push2.apply(results, context.getElementsByTagName(selector));
                    return results;
                  } else if ((m = match[3]) && context.getElementsByClassName) {
                    push2.apply(results, context.getElementsByClassName(m));
                    return results;
                  }
                }
                if (!nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                  newSelector = selector;
                  newContext = context;
                  if (nodeType === 1 && (rdescend.test(selector) || rleadingCombinator.test(selector))) {
                    newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                    if (newContext != context || !support.scope) {
                      if (nid = context.getAttribute("id")) {
                        nid = jQuery.escapeSelector(nid);
                      } else {
                        context.setAttribute("id", nid = expando);
                      }
                    }
                    groups = tokenize(selector);
                    i2 = groups.length;
                    while (i2--) {
                      groups[i2] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i2]);
                    }
                    newSelector = groups.join(",");
                  }
                  try {
                    push2.apply(
                      results,
                      newContext.querySelectorAll(newSelector)
                    );
                    return results;
                  } catch (qsaError) {
                    nonnativeSelectorCache(selector, true);
                  } finally {
                    if (nid === expando) {
                      context.removeAttribute("id");
                    }
                  }
                }
              }
            }
            return select(selector.replace(rtrimCSS, "$1"), context, results, seed);
          }
          function createCache() {
            var keys = [];
            function cache(key, value) {
              if (keys.push(key + " ") > Expr.cacheLength) {
                delete cache[keys.shift()];
              }
              return cache[key + " "] = value;
            }
            return cache;
          }
          function markFunction(fn) {
            fn[expando] = true;
            return fn;
          }
          function assert(fn) {
            var el = document3.createElement("fieldset");
            try {
              return !!fn(el);
            } catch (e) {
              return false;
            } finally {
              if (el.parentNode) {
                el.parentNode.removeChild(el);
              }
              el = null;
            }
          }
          function createInputPseudo(type) {
            return function(elem) {
              return nodeName(elem, "input") && elem.type === type;
            };
          }
          function createButtonPseudo(type) {
            return function(elem) {
              return (nodeName(elem, "input") || nodeName(elem, "button")) && elem.type === type;
            };
          }
          function createDisabledPseudo(disabled) {
            return function(elem) {
              if ("form" in elem) {
                if (elem.parentNode && elem.disabled === false) {
                  if ("label" in elem) {
                    if ("label" in elem.parentNode) {
                      return elem.parentNode.disabled === disabled;
                    } else {
                      return elem.disabled === disabled;
                    }
                  }
                  return elem.isDisabled === disabled || // Where there is no isDisabled, check manually
                  elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
                }
                return elem.disabled === disabled;
              } else if ("label" in elem) {
                return elem.disabled === disabled;
              }
              return false;
            };
          }
          function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
              argument = +argument;
              return markFunction(function(seed, matches2) {
                var j, matchIndexes = fn([], seed.length, argument), i2 = matchIndexes.length;
                while (i2--) {
                  if (seed[j = matchIndexes[i2]]) {
                    seed[j] = !(matches2[j] = seed[j]);
                  }
                }
              });
            });
          }
          function testContext(context) {
            return context && typeof context.getElementsByTagName !== "undefined" && context;
          }
          function setDocument(node) {
            var subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
            if (doc == document3 || doc.nodeType !== 9 || !doc.documentElement) {
              return document3;
            }
            document3 = doc;
            documentElement2 = document3.documentElement;
            documentIsHTML = !jQuery.isXMLDoc(document3);
            matches = documentElement2.matches || documentElement2.webkitMatchesSelector || documentElement2.msMatchesSelector;
            if (documentElement2.msMatchesSelector && // Support: IE 11+, Edge 17 - 18+
            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
            // two documents; shallow comparisons work.
            // eslint-disable-next-line eqeqeq
            preferredDoc != document3 && (subWindow = document3.defaultView) && subWindow.top !== subWindow) {
              subWindow.addEventListener("unload", unloadHandler);
            }
            support.getById = assert(function(el) {
              documentElement2.appendChild(el).id = jQuery.expando;
              return !document3.getElementsByName || !document3.getElementsByName(jQuery.expando).length;
            });
            support.disconnectedMatch = assert(function(el) {
              return matches.call(el, "*");
            });
            support.scope = assert(function() {
              return document3.querySelectorAll(":scope");
            });
            support.cssHas = assert(function() {
              try {
                document3.querySelector(":has(*,:jqfake)");
                return false;
              } catch (e) {
                return true;
              }
            });
            if (support.getById) {
              Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                  return elem.getAttribute("id") === attrId;
                };
              };
              Expr.find.ID = function(id, context) {
                if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                  var elem = context.getElementById(id);
                  return elem ? [elem] : [];
                }
              };
            } else {
              Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                  var node2 = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                  return node2 && node2.value === attrId;
                };
              };
              Expr.find.ID = function(id, context) {
                if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                  var node2, i2, elems, elem = context.getElementById(id);
                  if (elem) {
                    node2 = elem.getAttributeNode("id");
                    if (node2 && node2.value === id) {
                      return [elem];
                    }
                    elems = context.getElementsByName(id);
                    i2 = 0;
                    while (elem = elems[i2++]) {
                      node2 = elem.getAttributeNode("id");
                      if (node2 && node2.value === id) {
                        return [elem];
                      }
                    }
                  }
                  return [];
                }
              };
            }
            Expr.find.TAG = function(tag, context) {
              if (typeof context.getElementsByTagName !== "undefined") {
                return context.getElementsByTagName(tag);
              } else {
                return context.querySelectorAll(tag);
              }
            };
            Expr.find.CLASS = function(className, context) {
              if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                return context.getElementsByClassName(className);
              }
            };
            rbuggyQSA = [];
            assert(function(el) {
              var input;
              documentElement2.appendChild(el).innerHTML = "<a id='" + expando + "' href='' disabled='disabled'></a><select id='" + expando + "-\r\\' disabled='disabled'><option selected=''></option></select>";
              if (!el.querySelectorAll("[selected]").length) {
                rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
              }
              if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                rbuggyQSA.push("~=");
              }
              if (!el.querySelectorAll("a#" + expando + "+*").length) {
                rbuggyQSA.push(".#.+[+~]");
              }
              if (!el.querySelectorAll(":checked").length) {
                rbuggyQSA.push(":checked");
              }
              input = document3.createElement("input");
              input.setAttribute("type", "hidden");
              el.appendChild(input).setAttribute("name", "D");
              documentElement2.appendChild(el).disabled = true;
              if (el.querySelectorAll(":disabled").length !== 2) {
                rbuggyQSA.push(":enabled", ":disabled");
              }
              input = document3.createElement("input");
              input.setAttribute("name", "");
              el.appendChild(input);
              if (!el.querySelectorAll("[name='']").length) {
                rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + `*(?:''|"")`);
              }
            });
            if (!support.cssHas) {
              rbuggyQSA.push(":has");
            }
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            sortOrder = function(a, b) {
              if (a === b) {
                hasDuplicate = true;
                return 0;
              }
              var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
              if (compare) {
                return compare;
              }
              compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : (
                // Otherwise we know they are disconnected
                1
              );
              if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
                if (a === document3 || a.ownerDocument == preferredDoc && find.contains(preferredDoc, a)) {
                  return -1;
                }
                if (b === document3 || b.ownerDocument == preferredDoc && find.contains(preferredDoc, b)) {
                  return 1;
                }
                return sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
              }
              return compare & 4 ? -1 : 1;
            };
            return document3;
          }
          find.matches = function(expr, elements) {
            return find(expr, null, null, elements);
          };
          find.matchesSelector = function(elem, expr) {
            setDocument(elem);
            if (documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
              try {
                var ret = matches.call(elem, expr);
                if (ret || support.disconnectedMatch || // As well, disconnected nodes are said to be in a document
                // fragment in IE 9
                elem.document && elem.document.nodeType !== 11) {
                  return ret;
                }
              } catch (e) {
                nonnativeSelectorCache(expr, true);
              }
            }
            return find(expr, document3, null, [elem]).length > 0;
          };
          find.contains = function(context, elem) {
            if ((context.ownerDocument || context) != document3) {
              setDocument(context);
            }
            return jQuery.contains(context, elem);
          };
          find.attr = function(elem, name) {
            if ((elem.ownerDocument || elem) != document3) {
              setDocument(elem);
            }
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            if (val !== void 0) {
              return val;
            }
            return elem.getAttribute(name);
          };
          find.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
          };
          jQuery.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i2 = 0;
            hasDuplicate = !support.sortStable;
            sortInput = !support.sortStable && slice.call(results, 0);
            sort.call(results, sortOrder);
            if (hasDuplicate) {
              while (elem = results[i2++]) {
                if (elem === results[i2]) {
                  j = duplicates.push(i2);
                }
              }
              while (j--) {
                splice.call(results, duplicates[j], 1);
              }
            }
            sortInput = null;
            return results;
          };
          jQuery.fn.uniqueSort = function() {
            return this.pushStack(jQuery.uniqueSort(slice.apply(this)));
          };
          Expr = jQuery.expr = {
            // Can be adjusted by the user
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
              ">": { dir: "parentNode", first: true },
              " ": { dir: "parentNode" },
              "+": { dir: "previousSibling", first: true },
              "~": { dir: "previousSibling" }
            },
            preFilter: {
              ATTR: function(match) {
                match[1] = match[1].replace(runescape, funescape);
                match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                if (match[2] === "~=") {
                  match[3] = " " + match[3] + " ";
                }
                return match.slice(0, 4);
              },
              CHILD: function(match) {
                match[1] = match[1].toLowerCase();
                if (match[1].slice(0, 3) === "nth") {
                  if (!match[3]) {
                    find.error(match[0]);
                  }
                  match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                  match[5] = +(match[7] + match[8] || match[3] === "odd");
                } else if (match[3]) {
                  find.error(match[0]);
                }
                return match;
              },
              PSEUDO: function(match) {
                var excess, unquoted = !match[6] && match[2];
                if (matchExpr.CHILD.test(match[0])) {
                  return null;
                }
                if (match[3]) {
                  match[2] = match[4] || match[5] || "";
                } else if (unquoted && rpseudo.test(unquoted) && // Get excess from tokenize (recursively)
                (excess = tokenize(unquoted, true)) && // advance to the next closing parenthesis
                (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                  match[0] = match[0].slice(0, excess);
                  match[2] = unquoted.slice(0, excess);
                }
                return match.slice(0, 3);
              }
            },
            filter: {
              TAG: function(nodeNameSelector) {
                var expectedNodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                return nodeNameSelector === "*" ? function() {
                  return true;
                } : function(elem) {
                  return nodeName(elem, expectedNodeName);
                };
              },
              CLASS: function(className) {
                var pattern = classCache[className + " "];
                return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                  return pattern.test(
                    typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || ""
                  );
                });
              },
              ATTR: function(name, operator, check) {
                return function(elem) {
                  var result = find.attr(elem, name);
                  if (result == null) {
                    return operator === "!=";
                  }
                  if (!operator) {
                    return true;
                  }
                  result += "";
                  if (operator === "=") {
                    return result === check;
                  }
                  if (operator === "!=") {
                    return result !== check;
                  }
                  if (operator === "^=") {
                    return check && result.indexOf(check) === 0;
                  }
                  if (operator === "*=") {
                    return check && result.indexOf(check) > -1;
                  }
                  if (operator === "$=") {
                    return check && result.slice(-check.length) === check;
                  }
                  if (operator === "~=") {
                    return (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1;
                  }
                  if (operator === "|=") {
                    return result === check || result.slice(0, check.length + 1) === check + "-";
                  }
                  return false;
                };
              },
              CHILD: function(type, what, _argument, first, last) {
                var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
                return first === 1 && last === 0 ? (
                  // Shortcut for :nth-*(n)
                  function(elem) {
                    return !!elem.parentNode;
                  }
                ) : function(elem, _context, xml) {
                  var cache, outerCache, node, nodeIndex, start, dir2 = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
                  if (parent) {
                    if (simple) {
                      while (dir2) {
                        node = elem;
                        while (node = node[dir2]) {
                          if (ofType ? nodeName(node, name) : node.nodeType === 1) {
                            return false;
                          }
                        }
                        start = dir2 = type === "only" && !start && "nextSibling";
                      }
                      return true;
                    }
                    start = [forward ? parent.firstChild : parent.lastChild];
                    if (forward && useCache) {
                      outerCache = parent[expando] || (parent[expando] = {});
                      cache = outerCache[type] || [];
                      nodeIndex = cache[0] === dirruns && cache[1];
                      diff = nodeIndex && cache[2];
                      node = nodeIndex && parent.childNodes[nodeIndex];
                      while (node = ++nodeIndex && node && node[dir2] || // Fallback to seeking `elem` from the start
                      (diff = nodeIndex = 0) || start.pop()) {
                        if (node.nodeType === 1 && ++diff && node === elem) {
                          outerCache[type] = [dirruns, nodeIndex, diff];
                          break;
                        }
                      }
                    } else {
                      if (useCache) {
                        outerCache = elem[expando] || (elem[expando] = {});
                        cache = outerCache[type] || [];
                        nodeIndex = cache[0] === dirruns && cache[1];
                        diff = nodeIndex;
                      }
                      if (diff === false) {
                        while (node = ++nodeIndex && node && node[dir2] || (diff = nodeIndex = 0) || start.pop()) {
                          if ((ofType ? nodeName(node, name) : node.nodeType === 1) && ++diff) {
                            if (useCache) {
                              outerCache = node[expando] || (node[expando] = {});
                              outerCache[type] = [dirruns, diff];
                            }
                            if (node === elem) {
                              break;
                            }
                          }
                        }
                      }
                    }
                    diff -= last;
                    return diff === first || diff % first === 0 && diff / first >= 0;
                  }
                };
              },
              PSEUDO: function(pseudo, argument) {
                var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || find.error("unsupported pseudo: " + pseudo);
                if (fn[expando]) {
                  return fn(argument);
                }
                if (fn.length > 1) {
                  args = [pseudo, pseudo, "", argument];
                  return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches2) {
                    var idx, matched = fn(seed, argument), i2 = matched.length;
                    while (i2--) {
                      idx = indexOf.call(seed, matched[i2]);
                      seed[idx] = !(matches2[idx] = matched[i2]);
                    }
                  }) : function(elem) {
                    return fn(elem, 0, args);
                  };
                }
                return fn;
              }
            },
            pseudos: {
              // Potentially complex pseudos
              not: markFunction(function(selector) {
                var input = [], results = [], matcher = compile(selector.replace(rtrimCSS, "$1"));
                return matcher[expando] ? markFunction(function(seed, matches2, _context, xml) {
                  var elem, unmatched = matcher(seed, null, xml, []), i2 = seed.length;
                  while (i2--) {
                    if (elem = unmatched[i2]) {
                      seed[i2] = !(matches2[i2] = elem);
                    }
                  }
                }) : function(elem, _context, xml) {
                  input[0] = elem;
                  matcher(input, null, xml, results);
                  input[0] = null;
                  return !results.pop();
                };
              }),
              has: markFunction(function(selector) {
                return function(elem) {
                  return find(selector, elem).length > 0;
                };
              }),
              contains: markFunction(function(text) {
                text = text.replace(runescape, funescape);
                return function(elem) {
                  return (elem.textContent || jQuery.text(elem)).indexOf(text) > -1;
                };
              }),
              // "Whether an element is represented by a :lang() selector
              // is based solely on the element's language value
              // being equal to the identifier C,
              // or beginning with the identifier C immediately followed by "-".
              // The matching of C against the element's language value is performed case-insensitively.
              // The identifier C does not have to be a valid language name."
              // https://www.w3.org/TR/selectors/#lang-pseudo
              lang: markFunction(function(lang) {
                if (!ridentifier.test(lang || "")) {
                  find.error("unsupported lang: " + lang);
                }
                lang = lang.replace(runescape, funescape).toLowerCase();
                return function(elem) {
                  var elemLang;
                  do {
                    if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                      elemLang = elemLang.toLowerCase();
                      return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                    }
                  } while ((elem = elem.parentNode) && elem.nodeType === 1);
                  return false;
                };
              }),
              // Miscellaneous
              target: function(elem) {
                var hash = window2.location && window2.location.hash;
                return hash && hash.slice(1) === elem.id;
              },
              root: function(elem) {
                return elem === documentElement2;
              },
              focus: function(elem) {
                return elem === safeActiveElement() && document3.hasFocus() && !!(elem.type || elem.href || ~elem.tabIndex);
              },
              // Boolean properties
              enabled: createDisabledPseudo(false),
              disabled: createDisabledPseudo(true),
              checked: function(elem) {
                return nodeName(elem, "input") && !!elem.checked || nodeName(elem, "option") && !!elem.selected;
              },
              selected: function(elem) {
                if (elem.parentNode) {
                  elem.parentNode.selectedIndex;
                }
                return elem.selected === true;
              },
              // Contents
              empty: function(elem) {
                for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                  if (elem.nodeType < 6) {
                    return false;
                  }
                }
                return true;
              },
              parent: function(elem) {
                return !Expr.pseudos.empty(elem);
              },
              // Element/input types
              header: function(elem) {
                return rheader.test(elem.nodeName);
              },
              input: function(elem) {
                return rinputs.test(elem.nodeName);
              },
              button: function(elem) {
                return nodeName(elem, "input") && elem.type === "button" || nodeName(elem, "button");
              },
              text: function(elem) {
                var attr;
                return nodeName(elem, "input") && elem.type === "text" && // Support: IE <10 only
                // New HTML5 attribute values (e.g., "search") appear
                // with elem.type === "text"
                ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
              },
              // Position-in-collection
              first: createPositionalPseudo(function() {
                return [0];
              }),
              last: createPositionalPseudo(function(_matchIndexes, length) {
                return [length - 1];
              }),
              eq: createPositionalPseudo(function(_matchIndexes, length, argument) {
                return [argument < 0 ? argument + length : argument];
              }),
              even: createPositionalPseudo(function(matchIndexes, length) {
                var i2 = 0;
                for (; i2 < length; i2 += 2) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              }),
              odd: createPositionalPseudo(function(matchIndexes, length) {
                var i2 = 1;
                for (; i2 < length; i2 += 2) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              }),
              lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                var i2;
                if (argument < 0) {
                  i2 = argument + length;
                } else if (argument > length) {
                  i2 = length;
                } else {
                  i2 = argument;
                }
                for (; --i2 >= 0; ) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              }),
              gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                var i2 = argument < 0 ? argument + length : argument;
                for (; ++i2 < length; ) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              })
            }
          };
          Expr.pseudos.nth = Expr.pseudos.eq;
          for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
            Expr.pseudos[i] = createInputPseudo(i);
          }
          for (i in { submit: true, reset: true }) {
            Expr.pseudos[i] = createButtonPseudo(i);
          }
          function setFilters() {
          }
          setFilters.prototype = Expr.filters = Expr.pseudos;
          Expr.setFilters = new setFilters();
          function tokenize(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) {
              return parseOnly ? 0 : cached.slice(0);
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
              if (!matched || (match = rcomma.exec(soFar))) {
                if (match) {
                  soFar = soFar.slice(match[0].length) || soFar;
                }
                groups.push(tokens = []);
              }
              matched = false;
              if (match = rleadingCombinator.exec(soFar)) {
                matched = match.shift();
                tokens.push({
                  value: matched,
                  // Cast descendant combinators to space
                  type: match[0].replace(rtrimCSS, " ")
                });
                soFar = soFar.slice(matched.length);
              }
              for (type in Expr.filter) {
                if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                  matched = match.shift();
                  tokens.push({
                    value: matched,
                    type,
                    matches: match
                  });
                  soFar = soFar.slice(matched.length);
                }
              }
              if (!matched) {
                break;
              }
            }
            if (parseOnly) {
              return soFar.length;
            }
            return soFar ? find.error(selector) : (
              // Cache the tokens
              tokenCache(selector, groups).slice(0)
            );
          }
          function toSelector(tokens) {
            var i2 = 0, len = tokens.length, selector = "";
            for (; i2 < len; i2++) {
              selector += tokens[i2].value;
            }
            return selector;
          }
          function addCombinator(matcher, combinator, base) {
            var dir2 = combinator.dir, skip = combinator.next, key = skip || dir2, checkNonElements = base && key === "parentNode", doneName = done++;
            return combinator.first ? (
              // Check against closest ancestor/preceding element
              function(elem, context, xml) {
                while (elem = elem[dir2]) {
                  if (elem.nodeType === 1 || checkNonElements) {
                    return matcher(elem, context, xml);
                  }
                }
                return false;
              }
            ) : (
              // Check against all ancestor/preceding elements
              function(elem, context, xml) {
                var oldCache, outerCache, newCache = [dirruns, doneName];
                if (xml) {
                  while (elem = elem[dir2]) {
                    if (elem.nodeType === 1 || checkNonElements) {
                      if (matcher(elem, context, xml)) {
                        return true;
                      }
                    }
                  }
                } else {
                  while (elem = elem[dir2]) {
                    if (elem.nodeType === 1 || checkNonElements) {
                      outerCache = elem[expando] || (elem[expando] = {});
                      if (skip && nodeName(elem, skip)) {
                        elem = elem[dir2] || elem;
                      } else if ((oldCache = outerCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                        return newCache[2] = oldCache[2];
                      } else {
                        outerCache[key] = newCache;
                        if (newCache[2] = matcher(elem, context, xml)) {
                          return true;
                        }
                      }
                    }
                  }
                }
                return false;
              }
            );
          }
          function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
              var i2 = matchers.length;
              while (i2--) {
                if (!matchers[i2](elem, context, xml)) {
                  return false;
                }
              }
              return true;
            } : matchers[0];
          }
          function multipleContexts(selector, contexts, results) {
            var i2 = 0, len = contexts.length;
            for (; i2 < len; i2++) {
              find(selector, contexts[i2], results);
            }
            return results;
          }
          function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [], i2 = 0, len = unmatched.length, mapped = map != null;
            for (; i2 < len; i2++) {
              if (elem = unmatched[i2]) {
                if (!filter || filter(elem, context, xml)) {
                  newUnmatched.push(elem);
                  if (mapped) {
                    map.push(i2);
                  }
                }
              }
            }
            return newUnmatched;
          }
          function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
              postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
              postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function(seed, results, context, xml) {
              var temp, i2, elem, matcherOut, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(
                selector || "*",
                context.nodeType ? [context] : context,
                []
              ), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems;
              if (matcher) {
                matcherOut = postFinder || (seed ? preFilter : preexisting || postFilter) ? (
                  // ...intermediate processing is necessary
                  []
                ) : (
                  // ...otherwise use results directly
                  results
                );
                matcher(matcherIn, matcherOut, context, xml);
              } else {
                matcherOut = matcherIn;
              }
              if (postFilter) {
                temp = condense(matcherOut, postMap);
                postFilter(temp, [], context, xml);
                i2 = temp.length;
                while (i2--) {
                  if (elem = temp[i2]) {
                    matcherOut[postMap[i2]] = !(matcherIn[postMap[i2]] = elem);
                  }
                }
              }
              if (seed) {
                if (postFinder || preFilter) {
                  if (postFinder) {
                    temp = [];
                    i2 = matcherOut.length;
                    while (i2--) {
                      if (elem = matcherOut[i2]) {
                        temp.push(matcherIn[i2] = elem);
                      }
                    }
                    postFinder(null, matcherOut = [], temp, xml);
                  }
                  i2 = matcherOut.length;
                  while (i2--) {
                    if ((elem = matcherOut[i2]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i2]) > -1) {
                      seed[temp] = !(results[temp] = elem);
                    }
                  }
                }
              } else {
                matcherOut = condense(
                  matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut
                );
                if (postFinder) {
                  postFinder(null, results, matcherOut, xml);
                } else {
                  push2.apply(results, matcherOut);
                }
              }
            });
          }
          function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i2 = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
              return elem === checkContext;
            }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
              return indexOf.call(checkContext, elem) > -1;
            }, implicitRelative, true), matchers = [function(elem, context, xml) {
              var ret = !leadingRelative && (xml || context != outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
              checkContext = null;
              return ret;
            }];
            for (; i2 < len; i2++) {
              if (matcher = Expr.relative[tokens[i2].type]) {
                matchers = [addCombinator(elementMatcher(matchers), matcher)];
              } else {
                matcher = Expr.filter[tokens[i2].type].apply(null, tokens[i2].matches);
                if (matcher[expando]) {
                  j = ++i2;
                  for (; j < len; j++) {
                    if (Expr.relative[tokens[j].type]) {
                      break;
                    }
                  }
                  return setMatcher(
                    i2 > 1 && elementMatcher(matchers),
                    i2 > 1 && toSelector(
                      // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                      tokens.slice(0, i2 - 1).concat({ value: tokens[i2 - 2].type === " " ? "*" : "" })
                    ).replace(rtrimCSS, "$1"),
                    matcher,
                    i2 < j && matcherFromTokens(tokens.slice(i2, j)),
                    j < len && matcherFromTokens(tokens = tokens.slice(j)),
                    j < len && toSelector(tokens)
                  );
                }
                matchers.push(matcher);
              }
            }
            return elementMatcher(matchers);
          }
          function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
              var elem, j, matcher, matchedCount = 0, i2 = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1, len = elems.length;
              if (outermost) {
                outermostContext = context == document3 || context || outermost;
              }
              for (; i2 !== len && (elem = elems[i2]) != null; i2++) {
                if (byElement && elem) {
                  j = 0;
                  if (!context && elem.ownerDocument != document3) {
                    setDocument(elem);
                    xml = !documentIsHTML;
                  }
                  while (matcher = elementMatchers[j++]) {
                    if (matcher(elem, context || document3, xml)) {
                      push2.call(results, elem);
                      break;
                    }
                  }
                  if (outermost) {
                    dirruns = dirrunsUnique;
                  }
                }
                if (bySet) {
                  if (elem = !matcher && elem) {
                    matchedCount--;
                  }
                  if (seed) {
                    unmatched.push(elem);
                  }
                }
              }
              matchedCount += i2;
              if (bySet && i2 !== matchedCount) {
                j = 0;
                while (matcher = setMatchers[j++]) {
                  matcher(unmatched, setMatched, context, xml);
                }
                if (seed) {
                  if (matchedCount > 0) {
                    while (i2--) {
                      if (!(unmatched[i2] || setMatched[i2])) {
                        setMatched[i2] = pop.call(results);
                      }
                    }
                  }
                  setMatched = condense(setMatched);
                }
                push2.apply(results, setMatched);
                if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
                  jQuery.uniqueSort(results);
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
                outermostContext = contextBackup;
              }
              return unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
          }
          function compile(selector, match) {
            var i2, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
              if (!match) {
                match = tokenize(selector);
              }
              i2 = match.length;
              while (i2--) {
                cached = matcherFromTokens(match[i2]);
                if (cached[expando]) {
                  setMatchers.push(cached);
                } else {
                  elementMatchers.push(cached);
                }
              }
              cached = compilerCache(
                selector,
                matcherFromGroupMatchers(elementMatchers, setMatchers)
              );
              cached.selector = selector;
            }
            return cached;
          }
          function select(selector, context, results, seed) {
            var i2, tokens, token, type, find2, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            results = results || [];
            if (match.length === 1) {
              tokens = match[0] = match[0].slice(0);
              if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                context = (Expr.find.ID(
                  token.matches[0].replace(runescape, funescape),
                  context
                ) || [])[0];
                if (!context) {
                  return results;
                } else if (compiled) {
                  context = context.parentNode;
                }
                selector = selector.slice(tokens.shift().value.length);
              }
              i2 = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
              while (i2--) {
                token = tokens[i2];
                if (Expr.relative[type = token.type]) {
                  break;
                }
                if (find2 = Expr.find[type]) {
                  if (seed = find2(
                    token.matches[0].replace(runescape, funescape),
                    rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
                  )) {
                    tokens.splice(i2, 1);
                    selector = seed.length && toSelector(tokens);
                    if (!selector) {
                      push2.apply(results, seed);
                      return results;
                    }
                    break;
                  }
                }
              }
            }
            (compiled || compile(selector, match))(
              seed,
              context,
              !documentIsHTML,
              results,
              !context || rsibling.test(selector) && testContext(context.parentNode) || context
            );
            return results;
          }
          support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
          setDocument();
          support.sortDetached = assert(function(el) {
            return el.compareDocumentPosition(document3.createElement("fieldset")) & 1;
          });
          jQuery.find = find;
          jQuery.expr[":"] = jQuery.expr.pseudos;
          jQuery.unique = jQuery.uniqueSort;
          find.compile = compile;
          find.select = select;
          find.setDocument = setDocument;
          find.tokenize = tokenize;
          find.escape = jQuery.escapeSelector;
          find.getText = jQuery.text;
          find.isXML = jQuery.isXMLDoc;
          find.selectors = jQuery.expr;
          find.support = jQuery.support;
          find.uniqueSort = jQuery.uniqueSort;
        })();
        var dir = function(elem, dir2, until) {
          var matched = [], truncate = until !== void 0;
          while ((elem = elem[dir2]) && elem.nodeType !== 9) {
            if (elem.nodeType === 1) {
              if (truncate && jQuery(elem).is(until)) {
                break;
              }
              matched.push(elem);
            }
          }
          return matched;
        };
        var siblings = function(n, elem) {
          var matched = [];
          for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== elem) {
              matched.push(n);
            }
          }
          return matched;
        };
        var rneedsContext = jQuery.expr.match.needsContext;
        var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        function winnow(elements, qualifier, not) {
          if (isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem, i) {
              return !!qualifier.call(elem, i, elem) !== not;
            });
          }
          if (qualifier.nodeType) {
            return jQuery.grep(elements, function(elem) {
              return elem === qualifier !== not;
            });
          }
          if (typeof qualifier !== "string") {
            return jQuery.grep(elements, function(elem) {
              return indexOf.call(qualifier, elem) > -1 !== not;
            });
          }
          return jQuery.filter(qualifier, elements, not);
        }
        jQuery.filter = function(expr, elems, not) {
          var elem = elems[0];
          if (not) {
            expr = ":not(" + expr + ")";
          }
          if (elems.length === 1 && elem.nodeType === 1) {
            return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
          }
          return jQuery.find.matches(expr, jQuery.grep(elems, function(elem2) {
            return elem2.nodeType === 1;
          }));
        };
        jQuery.fn.extend({
          find: function(selector) {
            var i, ret, len = this.length, self = this;
            if (typeof selector !== "string") {
              return this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; i < len; i++) {
                  if (jQuery.contains(self[i], this)) {
                    return true;
                  }
                }
              }));
            }
            ret = this.pushStack([]);
            for (i = 0; i < len; i++) {
              jQuery.find(selector, self[i], ret);
            }
            return len > 1 ? jQuery.uniqueSort(ret) : ret;
          },
          filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], false));
          },
          not: function(selector) {
            return this.pushStack(winnow(this, selector || [], true));
          },
          is: function(selector) {
            return !!winnow(
              this,
              // If this is a positional/relative selector, check membership in the returned set
              // so $("p:first").is("p:last") won't return true for a doc with two "p".
              typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [],
              false
            ).length;
          }
        });
        var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init = jQuery.fn.init = function(selector, context, root) {
          var match, elem;
          if (!selector) {
            return this;
          }
          root = root || rootjQuery;
          if (typeof selector === "string") {
            if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
              match = [null, selector, null];
            } else {
              match = rquickExpr.exec(selector);
            }
            if (match && (match[1] || !context)) {
              if (match[1]) {
                context = context instanceof jQuery ? context[0] : context;
                jQuery.merge(this, jQuery.parseHTML(
                  match[1],
                  context && context.nodeType ? context.ownerDocument || context : document2,
                  true
                ));
                if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                  for (match in context) {
                    if (isFunction(this[match])) {
                      this[match](context[match]);
                    } else {
                      this.attr(match, context[match]);
                    }
                  }
                }
                return this;
              } else {
                elem = document2.getElementById(match[2]);
                if (elem) {
                  this[0] = elem;
                  this.length = 1;
                }
                return this;
              }
            } else if (!context || context.jquery) {
              return (context || root).find(selector);
            } else {
              return this.constructor(context).find(selector);
            }
          } else if (selector.nodeType) {
            this[0] = selector;
            this.length = 1;
            return this;
          } else if (isFunction(selector)) {
            return root.ready !== void 0 ? root.ready(selector) : (
              // Execute immediately if ready is not present
              selector(jQuery)
            );
          }
          return jQuery.makeArray(selector, this);
        };
        init.prototype = jQuery.fn;
        rootjQuery = jQuery(document2);
        var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
          children: true,
          contents: true,
          next: true,
          prev: true
        };
        jQuery.fn.extend({
          has: function(target) {
            var targets = jQuery(target, this), l = targets.length;
            return this.filter(function() {
              var i = 0;
              for (; i < l; i++) {
                if (jQuery.contains(this, targets[i])) {
                  return true;
                }
              }
            });
          },
          closest: function(selectors, context) {
            var cur, i = 0, l = this.length, matched = [], targets = typeof selectors !== "string" && jQuery(selectors);
            if (!rneedsContext.test(selectors)) {
              for (; i < l; i++) {
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                  if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : (
                    // Don't pass non-elements to jQuery#find
                    cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors)
                  ))) {
                    matched.push(cur);
                    break;
                  }
                }
              }
            }
            return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
          },
          // Determine the position of an element within the set
          index: function(elem) {
            if (!elem) {
              return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            }
            if (typeof elem === "string") {
              return indexOf.call(jQuery(elem), this[0]);
            }
            return indexOf.call(
              this,
              // If it receives a jQuery object, the first element is used
              elem.jquery ? elem[0] : elem
            );
          },
          add: function(selector, context) {
            return this.pushStack(
              jQuery.uniqueSort(
                jQuery.merge(this.get(), jQuery(selector, context))
              )
            );
          },
          addBack: function(selector) {
            return this.add(
              selector == null ? this.prevObject : this.prevObject.filter(selector)
            );
          }
        });
        function sibling(cur, dir2) {
          while ((cur = cur[dir2]) && cur.nodeType !== 1) {
          }
          return cur;
        }
        jQuery.each({
          parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
          },
          parents: function(elem) {
            return dir(elem, "parentNode");
          },
          parentsUntil: function(elem, _i, until) {
            return dir(elem, "parentNode", until);
          },
          next: function(elem) {
            return sibling(elem, "nextSibling");
          },
          prev: function(elem) {
            return sibling(elem, "previousSibling");
          },
          nextAll: function(elem) {
            return dir(elem, "nextSibling");
          },
          prevAll: function(elem) {
            return dir(elem, "previousSibling");
          },
          nextUntil: function(elem, _i, until) {
            return dir(elem, "nextSibling", until);
          },
          prevUntil: function(elem, _i, until) {
            return dir(elem, "previousSibling", until);
          },
          siblings: function(elem) {
            return siblings((elem.parentNode || {}).firstChild, elem);
          },
          children: function(elem) {
            return siblings(elem.firstChild);
          },
          contents: function(elem) {
            if (elem.contentDocument != null && // Support: IE 11+
            // <object> elements with no `data` attribute has an object
            // `contentDocument` with a `null` prototype.
            getProto(elem.contentDocument)) {
              return elem.contentDocument;
            }
            if (nodeName(elem, "template")) {
              elem = elem.content || elem;
            }
            return jQuery.merge([], elem.childNodes);
          }
        }, function(name, fn) {
          jQuery.fn[name] = function(until, selector) {
            var matched = jQuery.map(this, fn, until);
            if (name.slice(-5) !== "Until") {
              selector = until;
            }
            if (selector && typeof selector === "string") {
              matched = jQuery.filter(selector, matched);
            }
            if (this.length > 1) {
              if (!guaranteedUnique[name]) {
                jQuery.uniqueSort(matched);
              }
              if (rparentsprev.test(name)) {
                matched.reverse();
              }
            }
            return this.pushStack(matched);
          };
        });
        var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
        function createOptions(options) {
          var object = {};
          jQuery.each(options.match(rnothtmlwhite) || [], function(_, flag) {
            object[flag] = true;
          });
          return object;
        }
        jQuery.Callbacks = function(options) {
          options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
          var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function() {
            locked = locked || options.once;
            fired = firing = true;
            for (; queue.length; firingIndex = -1) {
              memory = queue.shift();
              while (++firingIndex < list.length) {
                if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                  firingIndex = list.length;
                  memory = false;
                }
              }
            }
            if (!options.memory) {
              memory = false;
            }
            firing = false;
            if (locked) {
              if (memory) {
                list = [];
              } else {
                list = "";
              }
            }
          }, self = {
            // Add a callback or a collection of callbacks to the list
            add: function() {
              if (list) {
                if (memory && !firing) {
                  firingIndex = list.length - 1;
                  queue.push(memory);
                }
                (function add(args) {
                  jQuery.each(args, function(_, arg) {
                    if (isFunction(arg)) {
                      if (!options.unique || !self.has(arg)) {
                        list.push(arg);
                      }
                    } else if (arg && arg.length && toType(arg) !== "string") {
                      add(arg);
                    }
                  });
                })(arguments);
                if (memory && !firing) {
                  fire();
                }
              }
              return this;
            },
            // Remove a callback from the list
            remove: function() {
              jQuery.each(arguments, function(_, arg) {
                var index;
                while ((index = jQuery.inArray(arg, list, index)) > -1) {
                  list.splice(index, 1);
                  if (index <= firingIndex) {
                    firingIndex--;
                  }
                }
              });
              return this;
            },
            // Check if a given callback is in the list.
            // If no argument is given, return whether or not list has callbacks attached.
            has: function(fn) {
              return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
            },
            // Remove all callbacks from the list
            empty: function() {
              if (list) {
                list = [];
              }
              return this;
            },
            // Disable .fire and .add
            // Abort any current/pending executions
            // Clear all callbacks and values
            disable: function() {
              locked = queue = [];
              list = memory = "";
              return this;
            },
            disabled: function() {
              return !list;
            },
            // Disable .fire
            // Also disable .add unless we have memory (since it would have no effect)
            // Abort any pending executions
            lock: function() {
              locked = queue = [];
              if (!memory && !firing) {
                list = memory = "";
              }
              return this;
            },
            locked: function() {
              return !!locked;
            },
            // Call all callbacks with the given context and arguments
            fireWith: function(context, args) {
              if (!locked) {
                args = args || [];
                args = [context, args.slice ? args.slice() : args];
                queue.push(args);
                if (!firing) {
                  fire();
                }
              }
              return this;
            },
            // Call all the callbacks with the given arguments
            fire: function() {
              self.fireWith(this, arguments);
              return this;
            },
            // To know if the callbacks have already been called at least once
            fired: function() {
              return !!fired;
            }
          };
          return self;
        };
        function Identity(v) {
          return v;
        }
        function Thrower(ex) {
          throw ex;
        }
        function adoptValue(value, resolve, reject, noValue) {
          var method;
          try {
            if (value && isFunction(method = value.promise)) {
              method.call(value).done(resolve).fail(reject);
            } else if (value && isFunction(method = value.then)) {
              method.call(value, resolve, reject);
            } else {
              resolve.apply(void 0, [value].slice(noValue));
            }
          } catch (value2) {
            reject.apply(void 0, [value2]);
          }
        }
        jQuery.extend({
          Deferred: function(func) {
            var tuples = [
              // action, add listener, callbacks,
              // ... .then handlers, argument index, [final state]
              [
                "notify",
                "progress",
                jQuery.Callbacks("memory"),
                jQuery.Callbacks("memory"),
                2
              ],
              [
                "resolve",
                "done",
                jQuery.Callbacks("once memory"),
                jQuery.Callbacks("once memory"),
                0,
                "resolved"
              ],
              [
                "reject",
                "fail",
                jQuery.Callbacks("once memory"),
                jQuery.Callbacks("once memory"),
                1,
                "rejected"
              ]
            ], state = "pending", promise = {
              state: function() {
                return state;
              },
              always: function() {
                deferred.done(arguments).fail(arguments);
                return this;
              },
              "catch": function(fn) {
                return promise.then(null, fn);
              },
              // Keep pipe for back-compat
              pipe: function() {
                var fns = arguments;
                return jQuery.Deferred(function(newDefer) {
                  jQuery.each(tuples, function(_i, tuple) {
                    var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];
                    deferred[tuple[1]](function() {
                      var returned = fn && fn.apply(this, arguments);
                      if (returned && isFunction(returned.promise)) {
                        returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                      } else {
                        newDefer[tuple[0] + "With"](
                          this,
                          fn ? [returned] : arguments
                        );
                      }
                    });
                  });
                  fns = null;
                }).promise();
              },
              then: function(onFulfilled, onRejected, onProgress) {
                var maxDepth = 0;
                function resolve(depth, deferred2, handler, special) {
                  return function() {
                    var that = this, args = arguments, mightThrow = function() {
                      var returned, then;
                      if (depth < maxDepth) {
                        return;
                      }
                      returned = handler.apply(that, args);
                      if (returned === deferred2.promise()) {
                        throw new TypeError("Thenable self-resolution");
                      }
                      then = returned && // Support: Promises/A+ section 2.3.4
                      // https://promisesaplus.com/#point-64
                      // Only check objects and functions for thenability
                      (typeof returned === "object" || typeof returned === "function") && returned.then;
                      if (isFunction(then)) {
                        if (special) {
                          then.call(
                            returned,
                            resolve(maxDepth, deferred2, Identity, special),
                            resolve(maxDepth, deferred2, Thrower, special)
                          );
                        } else {
                          maxDepth++;
                          then.call(
                            returned,
                            resolve(maxDepth, deferred2, Identity, special),
                            resolve(maxDepth, deferred2, Thrower, special),
                            resolve(
                              maxDepth,
                              deferred2,
                              Identity,
                              deferred2.notifyWith
                            )
                          );
                        }
                      } else {
                        if (handler !== Identity) {
                          that = void 0;
                          args = [returned];
                        }
                        (special || deferred2.resolveWith)(that, args);
                      }
                    }, process2 = special ? mightThrow : function() {
                      try {
                        mightThrow();
                      } catch (e) {
                        if (jQuery.Deferred.exceptionHook) {
                          jQuery.Deferred.exceptionHook(
                            e,
                            process2.error
                          );
                        }
                        if (depth + 1 >= maxDepth) {
                          if (handler !== Thrower) {
                            that = void 0;
                            args = [e];
                          }
                          deferred2.rejectWith(that, args);
                        }
                      }
                    };
                    if (depth) {
                      process2();
                    } else {
                      if (jQuery.Deferred.getErrorHook) {
                        process2.error = jQuery.Deferred.getErrorHook();
                      } else if (jQuery.Deferred.getStackHook) {
                        process2.error = jQuery.Deferred.getStackHook();
                      }
                      window2.setTimeout(process2);
                    }
                  };
                }
                return jQuery.Deferred(function(newDefer) {
                  tuples[0][3].add(
                    resolve(
                      0,
                      newDefer,
                      isFunction(onProgress) ? onProgress : Identity,
                      newDefer.notifyWith
                    )
                  );
                  tuples[1][3].add(
                    resolve(
                      0,
                      newDefer,
                      isFunction(onFulfilled) ? onFulfilled : Identity
                    )
                  );
                  tuples[2][3].add(
                    resolve(
                      0,
                      newDefer,
                      isFunction(onRejected) ? onRejected : Thrower
                    )
                  );
                }).promise();
              },
              // Get a promise for this deferred
              // If obj is provided, the promise aspect is added to the object
              promise: function(obj) {
                return obj != null ? jQuery.extend(obj, promise) : promise;
              }
            }, deferred = {};
            jQuery.each(tuples, function(i, tuple) {
              var list = tuple[2], stateString = tuple[5];
              promise[tuple[1]] = list.add;
              if (stateString) {
                list.add(
                  function() {
                    state = stateString;
                  },
                  // rejected_callbacks.disable
                  // fulfilled_callbacks.disable
                  tuples[3 - i][2].disable,
                  // rejected_handlers.disable
                  // fulfilled_handlers.disable
                  tuples[3 - i][3].disable,
                  // progress_callbacks.lock
                  tuples[0][2].lock,
                  // progress_handlers.lock
                  tuples[0][3].lock
                );
              }
              list.add(tuple[3].fire);
              deferred[tuple[0]] = function() {
                deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments);
                return this;
              };
              deferred[tuple[0] + "With"] = list.fireWith;
            });
            promise.promise(deferred);
            if (func) {
              func.call(deferred, deferred);
            }
            return deferred;
          },
          // Deferred helper
          when: function(singleValue) {
            var remaining = arguments.length, i = remaining, resolveContexts = Array(i), resolveValues = slice.call(arguments), primary = jQuery.Deferred(), updateFunc = function(i2) {
              return function(value) {
                resolveContexts[i2] = this;
                resolveValues[i2] = arguments.length > 1 ? slice.call(arguments) : value;
                if (!--remaining) {
                  primary.resolveWith(resolveContexts, resolveValues);
                }
              };
            };
            if (remaining <= 1) {
              adoptValue(
                singleValue,
                primary.done(updateFunc(i)).resolve,
                primary.reject,
                !remaining
              );
              if (primary.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {
                return primary.then();
              }
            }
            while (i--) {
              adoptValue(resolveValues[i], updateFunc(i), primary.reject);
            }
            return primary.promise();
          }
        });
        var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        jQuery.Deferred.exceptionHook = function(error, asyncError) {
          if (window2.console && window2.console.warn && error && rerrorNames.test(error.name)) {
            window2.console.warn(
              "jQuery.Deferred exception: " + error.message,
              error.stack,
              asyncError
            );
          }
        };
        jQuery.readyException = function(error) {
          window2.setTimeout(function() {
            throw error;
          });
        };
        var readyList = jQuery.Deferred();
        jQuery.fn.ready = function(fn) {
          readyList.then(fn).catch(function(error) {
            jQuery.readyException(error);
          });
          return this;
        };
        jQuery.extend({
          // Is the DOM ready to be used? Set to true once it occurs.
          isReady: false,
          // A counter to track how many items to wait for before
          // the ready event fires. See trac-6781
          readyWait: 1,
          // Handle when the DOM is ready
          ready: function(wait) {
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
              return;
            }
            jQuery.isReady = true;
            if (wait !== true && --jQuery.readyWait > 0) {
              return;
            }
            readyList.resolveWith(document2, [jQuery]);
          }
        });
        jQuery.ready.then = readyList.then;
        function completed() {
          document2.removeEventListener("DOMContentLoaded", completed);
          window2.removeEventListener("load", completed);
          jQuery.ready();
        }
        if (document2.readyState === "complete" || document2.readyState !== "loading" && !document2.documentElement.doScroll) {
          window2.setTimeout(jQuery.ready);
        } else {
          document2.addEventListener("DOMContentLoaded", completed);
          window2.addEventListener("load", completed);
        }
        var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
          var i = 0, len = elems.length, bulk = key == null;
          if (toType(key) === "object") {
            chainable = true;
            for (i in key) {
              access(elems, fn, i, key[i], true, emptyGet, raw);
            }
          } else if (value !== void 0) {
            chainable = true;
            if (!isFunction(value)) {
              raw = true;
            }
            if (bulk) {
              if (raw) {
                fn.call(elems, value);
                fn = null;
              } else {
                bulk = fn;
                fn = function(elem, _key, value2) {
                  return bulk.call(jQuery(elem), value2);
                };
              }
            }
            if (fn) {
              for (; i < len; i++) {
                fn(
                  elems[i],
                  key,
                  raw ? value : value.call(elems[i], i, fn(elems[i], key))
                );
              }
            }
          }
          if (chainable) {
            return elems;
          }
          if (bulk) {
            return fn.call(elems);
          }
          return len ? fn(elems[0], key) : emptyGet;
        };
        var rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g;
        function fcamelCase(_all, letter) {
          return letter.toUpperCase();
        }
        function camelCase(string) {
          return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        }
        var acceptData = function(owner) {
          return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
        };
        function Data() {
          this.expando = jQuery.expando + Data.uid++;
        }
        Data.uid = 1;
        Data.prototype = {
          cache: function(owner) {
            var value = owner[this.expando];
            if (!value) {
              value = {};
              if (acceptData(owner)) {
                if (owner.nodeType) {
                  owner[this.expando] = value;
                } else {
                  Object.defineProperty(owner, this.expando, {
                    value,
                    configurable: true
                  });
                }
              }
            }
            return value;
          },
          set: function(owner, data, value) {
            var prop, cache = this.cache(owner);
            if (typeof data === "string") {
              cache[camelCase(data)] = value;
            } else {
              for (prop in data) {
                cache[camelCase(prop)] = data[prop];
              }
            }
            return cache;
          },
          get: function(owner, key) {
            return key === void 0 ? this.cache(owner) : (
              // Always use camelCase key (gh-2257)
              owner[this.expando] && owner[this.expando][camelCase(key)]
            );
          },
          access: function(owner, key, value) {
            if (key === void 0 || key && typeof key === "string" && value === void 0) {
              return this.get(owner, key);
            }
            this.set(owner, key, value);
            return value !== void 0 ? value : key;
          },
          remove: function(owner, key) {
            var i, cache = owner[this.expando];
            if (cache === void 0) {
              return;
            }
            if (key !== void 0) {
              if (Array.isArray(key)) {
                key = key.map(camelCase);
              } else {
                key = camelCase(key);
                key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
              }
              i = key.length;
              while (i--) {
                delete cache[key[i]];
              }
            }
            if (key === void 0 || jQuery.isEmptyObject(cache)) {
              if (owner.nodeType) {
                owner[this.expando] = void 0;
              } else {
                delete owner[this.expando];
              }
            }
          },
          hasData: function(owner) {
            var cache = owner[this.expando];
            return cache !== void 0 && !jQuery.isEmptyObject(cache);
          }
        };
        var dataPriv = new Data();
        var dataUser = new Data();
        var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
        function getData(data) {
          if (data === "true") {
            return true;
          }
          if (data === "false") {
            return false;
          }
          if (data === "null") {
            return null;
          }
          if (data === +data + "") {
            return +data;
          }
          if (rbrace.test(data)) {
            return JSON.parse(data);
          }
          return data;
        }
        function dataAttr(elem, key, data) {
          var name;
          if (data === void 0 && elem.nodeType === 1) {
            name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
              try {
                data = getData(data);
              } catch (e) {
              }
              dataUser.set(elem, key, data);
            } else {
              data = void 0;
            }
          }
          return data;
        }
        jQuery.extend({
          hasData: function(elem) {
            return dataUser.hasData(elem) || dataPriv.hasData(elem);
          },
          data: function(elem, name, data) {
            return dataUser.access(elem, name, data);
          },
          removeData: function(elem, name) {
            dataUser.remove(elem, name);
          },
          // TODO: Now that all calls to _data and _removeData have been replaced
          // with direct calls to dataPriv methods, these can be deprecated.
          _data: function(elem, name, data) {
            return dataPriv.access(elem, name, data);
          },
          _removeData: function(elem, name) {
            dataPriv.remove(elem, name);
          }
        });
        jQuery.fn.extend({
          data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (key === void 0) {
              if (this.length) {
                data = dataUser.get(elem);
                if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                  i = attrs.length;
                  while (i--) {
                    if (attrs[i]) {
                      name = attrs[i].name;
                      if (name.indexOf("data-") === 0) {
                        name = camelCase(name.slice(5));
                        dataAttr(elem, name, data[name]);
                      }
                    }
                  }
                  dataPriv.set(elem, "hasDataAttrs", true);
                }
              }
              return data;
            }
            if (typeof key === "object") {
              return this.each(function() {
                dataUser.set(this, key);
              });
            }
            return access(this, function(value2) {
              var data2;
              if (elem && value2 === void 0) {
                data2 = dataUser.get(elem, key);
                if (data2 !== void 0) {
                  return data2;
                }
                data2 = dataAttr(elem, key);
                if (data2 !== void 0) {
                  return data2;
                }
                return;
              }
              this.each(function() {
                dataUser.set(this, key, value2);
              });
            }, null, value, arguments.length > 1, null, true);
          },
          removeData: function(key) {
            return this.each(function() {
              dataUser.remove(this, key);
            });
          }
        });
        jQuery.extend({
          queue: function(elem, type, data) {
            var queue;
            if (elem) {
              type = (type || "fx") + "queue";
              queue = dataPriv.get(elem, type);
              if (data) {
                if (!queue || Array.isArray(data)) {
                  queue = dataPriv.access(elem, type, jQuery.makeArray(data));
                } else {
                  queue.push(data);
                }
              }
              return queue || [];
            }
          },
          dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
              jQuery.dequeue(elem, type);
            };
            if (fn === "inprogress") {
              fn = queue.shift();
              startLength--;
            }
            if (fn) {
              if (type === "fx") {
                queue.unshift("inprogress");
              }
              delete hooks.stop;
              fn.call(elem, next, hooks);
            }
            if (!startLength && hooks) {
              hooks.empty.fire();
            }
          },
          // Not public - generate a queueHooks object, or return the current one
          _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
              empty: jQuery.Callbacks("once memory").add(function() {
                dataPriv.remove(elem, [type + "queue", key]);
              })
            });
          }
        });
        jQuery.fn.extend({
          queue: function(type, data) {
            var setter = 2;
            if (typeof type !== "string") {
              data = type;
              type = "fx";
              setter--;
            }
            if (arguments.length < setter) {
              return jQuery.queue(this[0], type);
            }
            return data === void 0 ? this : this.each(function() {
              var queue = jQuery.queue(this, type, data);
              jQuery._queueHooks(this, type);
              if (type === "fx" && queue[0] !== "inprogress") {
                jQuery.dequeue(this, type);
              }
            });
          },
          dequeue: function(type) {
            return this.each(function() {
              jQuery.dequeue(this, type);
            });
          },
          clearQueue: function(type) {
            return this.queue(type || "fx", []);
          },
          // Get a promise resolved when queues of a certain type
          // are emptied (fx is the type by default)
          promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
              if (!--count) {
                defer.resolveWith(elements, [elements]);
              }
            };
            if (typeof type !== "string") {
              obj = type;
              type = void 0;
            }
            type = type || "fx";
            while (i--) {
              tmp = dataPriv.get(elements[i], type + "queueHooks");
              if (tmp && tmp.empty) {
                count++;
                tmp.empty.add(resolve);
              }
            }
            resolve();
            return defer.promise(obj);
          }
        });
        var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
        var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
        var cssExpand = ["Top", "Right", "Bottom", "Left"];
        var documentElement = document2.documentElement;
        var isAttached = function(elem) {
          return jQuery.contains(elem.ownerDocument, elem);
        }, composed = { composed: true };
        if (documentElement.getRootNode) {
          isAttached = function(elem) {
            return jQuery.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
          };
        }
        var isHiddenWithinTree = function(elem, el) {
          elem = el || elem;
          return elem.style.display === "none" || elem.style.display === "" && // Otherwise, check computed style
          // Support: Firefox <=43 - 45
          // Disconnected elements can have computed display: none, so first confirm that elem is
          // in the document.
          isAttached(elem) && jQuery.css(elem, "display") === "none";
        };
        function adjustCSS(elem, prop, valueParts, tween) {
          var adjusted, scale, maxIterations = 20, currentValue = tween ? function() {
            return tween.cur();
          } : function() {
            return jQuery.css(elem, prop, "");
          }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"), initialInUnit = elem.nodeType && (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
          if (initialInUnit && initialInUnit[3] !== unit) {
            initial = initial / 2;
            unit = unit || initialInUnit[3];
            initialInUnit = +initial || 1;
            while (maxIterations--) {
              jQuery.style(elem, prop, initialInUnit + unit);
              if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
                maxIterations = 0;
              }
              initialInUnit = initialInUnit / scale;
            }
            initialInUnit = initialInUnit * 2;
            jQuery.style(elem, prop, initialInUnit + unit);
            valueParts = valueParts || [];
          }
          if (valueParts) {
            initialInUnit = +initialInUnit || +initial || 0;
            adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
            if (tween) {
              tween.unit = unit;
              tween.start = initialInUnit;
              tween.end = adjusted;
            }
          }
          return adjusted;
        }
        var defaultDisplayMap = {};
        function getDefaultDisplay(elem) {
          var temp, doc = elem.ownerDocument, nodeName2 = elem.nodeName, display = defaultDisplayMap[nodeName2];
          if (display) {
            return display;
          }
          temp = doc.body.appendChild(doc.createElement(nodeName2));
          display = jQuery.css(temp, "display");
          temp.parentNode.removeChild(temp);
          if (display === "none") {
            display = "block";
          }
          defaultDisplayMap[nodeName2] = display;
          return display;
        }
        function showHide(elements, show) {
          var display, elem, values = [], index = 0, length = elements.length;
          for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
              continue;
            }
            display = elem.style.display;
            if (show) {
              if (display === "none") {
                values[index] = dataPriv.get(elem, "display") || null;
                if (!values[index]) {
                  elem.style.display = "";
                }
              }
              if (elem.style.display === "" && isHiddenWithinTree(elem)) {
                values[index] = getDefaultDisplay(elem);
              }
            } else {
              if (display !== "none") {
                values[index] = "none";
                dataPriv.set(elem, "display", display);
              }
            }
          }
          for (index = 0; index < length; index++) {
            if (values[index] != null) {
              elements[index].style.display = values[index];
            }
          }
          return elements;
        }
        jQuery.fn.extend({
          show: function() {
            return showHide(this, true);
          },
          hide: function() {
            return showHide(this);
          },
          toggle: function(state) {
            if (typeof state === "boolean") {
              return state ? this.show() : this.hide();
            }
            return this.each(function() {
              if (isHiddenWithinTree(this)) {
                jQuery(this).show();
              } else {
                jQuery(this).hide();
              }
            });
          }
        });
        var rcheckableType = /^(?:checkbox|radio)$/i;
        var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
        var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;
        (function() {
          var fragment = document2.createDocumentFragment(), div = fragment.appendChild(document2.createElement("div")), input = document2.createElement("input");
          input.setAttribute("type", "radio");
          input.setAttribute("checked", "checked");
          input.setAttribute("name", "t");
          div.appendChild(input);
          support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
          div.innerHTML = "<textarea>x</textarea>";
          support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
          div.innerHTML = "<option></option>";
          support.option = !!div.lastChild;
        })();
        var wrapMap = {
          // XHTML parsers do not magically insert elements in the
          // same way that tag soup parsers do. So we cannot shorten
          // this by omitting <tbody> or other required elements.
          thead: [1, "<table>", "</table>"],
          col: [2, "<table><colgroup>", "</colgroup></table>"],
          tr: [2, "<table><tbody>", "</tbody></table>"],
          td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
          _default: [0, "", ""]
        };
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;
        if (!support.option) {
          wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
        }
        function getAll(context, tag) {
          var ret;
          if (typeof context.getElementsByTagName !== "undefined") {
            ret = context.getElementsByTagName(tag || "*");
          } else if (typeof context.querySelectorAll !== "undefined") {
            ret = context.querySelectorAll(tag || "*");
          } else {
            ret = [];
          }
          if (tag === void 0 || tag && nodeName(context, tag)) {
            return jQuery.merge([context], ret);
          }
          return ret;
        }
        function setGlobalEval(elems, refElements) {
          var i = 0, l = elems.length;
          for (; i < l; i++) {
            dataPriv.set(
              elems[i],
              "globalEval",
              !refElements || dataPriv.get(refElements[i], "globalEval")
            );
          }
        }
        var rhtml = /<|&#?\w+;/;
        function buildFragment(elems, context, scripts, selection, ignored) {
          var elem, tmp, tag, wrap, attached, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
          for (; i < l; i++) {
            elem = elems[i];
            if (elem || elem === 0) {
              if (toType(elem) === "object") {
                jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
              } else if (!rhtml.test(elem)) {
                nodes.push(context.createTextNode(elem));
              } else {
                tmp = tmp || fragment.appendChild(context.createElement("div"));
                tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                wrap = wrapMap[tag] || wrapMap._default;
                tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
                j = wrap[0];
                while (j--) {
                  tmp = tmp.lastChild;
                }
                jQuery.merge(nodes, tmp.childNodes);
                tmp = fragment.firstChild;
                tmp.textContent = "";
              }
            }
          }
          fragment.textContent = "";
          i = 0;
          while (elem = nodes[i++]) {
            if (selection && jQuery.inArray(elem, selection) > -1) {
              if (ignored) {
                ignored.push(elem);
              }
              continue;
            }
            attached = isAttached(elem);
            tmp = getAll(fragment.appendChild(elem), "script");
            if (attached) {
              setGlobalEval(tmp);
            }
            if (scripts) {
              j = 0;
              while (elem = tmp[j++]) {
                if (rscriptType.test(elem.type || "")) {
                  scripts.push(elem);
                }
              }
            }
          }
          return fragment;
        }
        var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
        function returnTrue() {
          return true;
        }
        function returnFalse() {
          return false;
        }
        function on(elem, types, selector, data, fn, one) {
          var origFn, type;
          if (typeof types === "object") {
            if (typeof selector !== "string") {
              data = data || selector;
              selector = void 0;
            }
            for (type in types) {
              on(elem, type, selector, data, types[type], one);
            }
            return elem;
          }
          if (data == null && fn == null) {
            fn = selector;
            data = selector = void 0;
          } else if (fn == null) {
            if (typeof selector === "string") {
              fn = data;
              data = void 0;
            } else {
              fn = data;
              data = selector;
              selector = void 0;
            }
          }
          if (fn === false) {
            fn = returnFalse;
          } else if (!fn) {
            return elem;
          }
          if (one === 1) {
            origFn = fn;
            fn = function(event) {
              jQuery().off(event);
              return origFn.apply(this, arguments);
            };
            fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
          }
          return elem.each(function() {
            jQuery.event.add(this, types, fn, data, selector);
          });
        }
        jQuery.event = {
          global: {},
          add: function(elem, types, handler, data, selector) {
            var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
            if (!acceptData(elem)) {
              return;
            }
            if (handler.handler) {
              handleObjIn = handler;
              handler = handleObjIn.handler;
              selector = handleObjIn.selector;
            }
            if (selector) {
              jQuery.find.matchesSelector(documentElement, selector);
            }
            if (!handler.guid) {
              handler.guid = jQuery.guid++;
            }
            if (!(events = elemData.events)) {
              events = elemData.events = /* @__PURE__ */ Object.create(null);
            }
            if (!(eventHandle = elemData.handle)) {
              eventHandle = elemData.handle = function(e) {
                return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0;
              };
            }
            types = (types || "").match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
              tmp = rtypenamespace.exec(types[t]) || [];
              type = origType = tmp[1];
              namespaces = (tmp[2] || "").split(".").sort();
              if (!type) {
                continue;
              }
              special = jQuery.event.special[type] || {};
              type = (selector ? special.delegateType : special.bindType) || type;
              special = jQuery.event.special[type] || {};
              handleObj = jQuery.extend({
                type,
                origType,
                data,
                handler,
                guid: handler.guid,
                selector,
                needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                namespace: namespaces.join(".")
              }, handleObjIn);
              if (!(handlers = events[type])) {
                handlers = events[type] = [];
                handlers.delegateCount = 0;
                if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                  if (elem.addEventListener) {
                    elem.addEventListener(type, eventHandle);
                  }
                }
              }
              if (special.add) {
                special.add.call(elem, handleObj);
                if (!handleObj.handler.guid) {
                  handleObj.handler.guid = handler.guid;
                }
              }
              if (selector) {
                handlers.splice(handlers.delegateCount++, 0, handleObj);
              } else {
                handlers.push(handleObj);
              }
              jQuery.event.global[type] = true;
            }
          },
          // Detach an event or set of events from an element
          remove: function(elem, types, handler, selector, mappedTypes) {
            var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
            if (!elemData || !(events = elemData.events)) {
              return;
            }
            types = (types || "").match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
              tmp = rtypenamespace.exec(types[t]) || [];
              type = origType = tmp[1];
              namespaces = (tmp[2] || "").split(".").sort();
              if (!type) {
                for (type in events) {
                  jQuery.event.remove(elem, type + types[t], handler, selector, true);
                }
                continue;
              }
              special = jQuery.event.special[type] || {};
              type = (selector ? special.delegateType : special.bindType) || type;
              handlers = events[type] || [];
              tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
              origCount = j = handlers.length;
              while (j--) {
                handleObj = handlers[j];
                if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                  handlers.splice(j, 1);
                  if (handleObj.selector) {
                    handlers.delegateCount--;
                  }
                  if (special.remove) {
                    special.remove.call(elem, handleObj);
                  }
                }
              }
              if (origCount && !handlers.length) {
                if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                  jQuery.removeEvent(elem, type, elemData.handle);
                }
                delete events[type];
              }
            }
            if (jQuery.isEmptyObject(events)) {
              dataPriv.remove(elem, "handle events");
            }
          },
          dispatch: function(nativeEvent) {
            var i, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), event = jQuery.event.fix(nativeEvent), handlers = (dataPriv.get(this, "events") || /* @__PURE__ */ Object.create(null))[event.type] || [], special = jQuery.event.special[event.type] || {};
            args[0] = event;
            for (i = 1; i < arguments.length; i++) {
              args[i] = arguments[i];
            }
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
              return;
            }
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
              event.currentTarget = matched.elem;
              j = 0;
              while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
                  event.handleObj = handleObj;
                  event.data = handleObj.data;
                  ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                  if (ret !== void 0) {
                    if ((event.result = ret) === false) {
                      event.preventDefault();
                      event.stopPropagation();
                    }
                  }
                }
              }
            }
            if (special.postDispatch) {
              special.postDispatch.call(this, event);
            }
            return event.result;
          },
          handlers: function(event, handlers) {
            var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && // Support: IE <=9
            // Black-hole SVG <use> instance trees (trac-13180)
            cur.nodeType && // Support: Firefox <=42
            // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
            // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
            // Support: IE 11 only
            // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
            !(event.type === "click" && event.button >= 1)) {
              for (; cur !== this; cur = cur.parentNode || this) {
                if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                  matchedHandlers = [];
                  matchedSelectors = {};
                  for (i = 0; i < delegateCount; i++) {
                    handleObj = handlers[i];
                    sel = handleObj.selector + " ";
                    if (matchedSelectors[sel] === void 0) {
                      matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
                    }
                    if (matchedSelectors[sel]) {
                      matchedHandlers.push(handleObj);
                    }
                  }
                  if (matchedHandlers.length) {
                    handlerQueue.push({ elem: cur, handlers: matchedHandlers });
                  }
                }
              }
            }
            cur = this;
            if (delegateCount < handlers.length) {
              handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
            }
            return handlerQueue;
          },
          addProp: function(name, hook) {
            Object.defineProperty(jQuery.Event.prototype, name, {
              enumerable: true,
              configurable: true,
              get: isFunction(hook) ? function() {
                if (this.originalEvent) {
                  return hook(this.originalEvent);
                }
              } : function() {
                if (this.originalEvent) {
                  return this.originalEvent[name];
                }
              },
              set: function(value) {
                Object.defineProperty(this, name, {
                  enumerable: true,
                  configurable: true,
                  writable: true,
                  value
                });
              }
            });
          },
          fix: function(originalEvent) {
            return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
          },
          special: {
            load: {
              // Prevent triggered image.load events from bubbling to window.load
              noBubble: true
            },
            click: {
              // Utilize native event to ensure correct state for checkable inputs
              setup: function(data) {
                var el = this || data;
                if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                  leverageNative(el, "click", true);
                }
                return false;
              },
              trigger: function(data) {
                var el = this || data;
                if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                  leverageNative(el, "click");
                }
                return true;
              },
              // For cross-browser consistency, suppress native .click() on links
              // Also prevent it if we're currently inside a leveraged native-event stack
              _default: function(event) {
                var target = event.target;
                return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
              }
            },
            beforeunload: {
              postDispatch: function(event) {
                if (event.result !== void 0 && event.originalEvent) {
                  event.originalEvent.returnValue = event.result;
                }
              }
            }
          }
        };
        function leverageNative(el, type, isSetup) {
          if (!isSetup) {
            if (dataPriv.get(el, type) === void 0) {
              jQuery.event.add(el, type, returnTrue);
            }
            return;
          }
          dataPriv.set(el, type, false);
          jQuery.event.add(el, type, {
            namespace: false,
            handler: function(event) {
              var result, saved = dataPriv.get(this, type);
              if (event.isTrigger & 1 && this[type]) {
                if (!saved) {
                  saved = slice.call(arguments);
                  dataPriv.set(this, type, saved);
                  this[type]();
                  result = dataPriv.get(this, type);
                  dataPriv.set(this, type, false);
                  if (saved !== result) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    return result;
                  }
                } else if ((jQuery.event.special[type] || {}).delegateType) {
                  event.stopPropagation();
                }
              } else if (saved) {
                dataPriv.set(this, type, jQuery.event.trigger(
                  saved[0],
                  saved.slice(1),
                  this
                ));
                event.stopPropagation();
                event.isImmediatePropagationStopped = returnTrue;
              }
            }
          });
        }
        jQuery.removeEvent = function(elem, type, handle) {
          if (elem.removeEventListener) {
            elem.removeEventListener(type, handle);
          }
        };
        jQuery.Event = function(src, props) {
          if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
          }
          if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === void 0 && // Support: Android <=2.3 only
            src.returnValue === false ? returnTrue : returnFalse;
            this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
            this.currentTarget = src.currentTarget;
            this.relatedTarget = src.relatedTarget;
          } else {
            this.type = src;
          }
          if (props) {
            jQuery.extend(this, props);
          }
          this.timeStamp = src && src.timeStamp || Date.now();
          this[jQuery.expando] = true;
        };
        jQuery.Event.prototype = {
          constructor: jQuery.Event,
          isDefaultPrevented: returnFalse,
          isPropagationStopped: returnFalse,
          isImmediatePropagationStopped: returnFalse,
          isSimulated: false,
          preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (e && !this.isSimulated) {
              e.preventDefault();
            }
          },
          stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (e && !this.isSimulated) {
              e.stopPropagation();
            }
          },
          stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue;
            if (e && !this.isSimulated) {
              e.stopImmediatePropagation();
            }
            this.stopPropagation();
          }
        };
        jQuery.each({
          altKey: true,
          bubbles: true,
          cancelable: true,
          changedTouches: true,
          ctrlKey: true,
          detail: true,
          eventPhase: true,
          metaKey: true,
          pageX: true,
          pageY: true,
          shiftKey: true,
          view: true,
          "char": true,
          code: true,
          charCode: true,
          key: true,
          keyCode: true,
          button: true,
          buttons: true,
          clientX: true,
          clientY: true,
          offsetX: true,
          offsetY: true,
          pointerId: true,
          pointerType: true,
          screenX: true,
          screenY: true,
          targetTouches: true,
          toElement: true,
          touches: true,
          which: true
        }, jQuery.event.addProp);
        jQuery.each({ focus: "focusin", blur: "focusout" }, function(type, delegateType) {
          function focusMappedHandler(nativeEvent) {
            if (document2.documentMode) {
              var handle = dataPriv.get(this, "handle"), event = jQuery.event.fix(nativeEvent);
              event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
              event.isSimulated = true;
              handle(nativeEvent);
              if (event.target === event.currentTarget) {
                handle(event);
              }
            } else {
              jQuery.event.simulate(
                delegateType,
                nativeEvent.target,
                jQuery.event.fix(nativeEvent)
              );
            }
          }
          jQuery.event.special[type] = {
            // Utilize native event if possible so blur/focus sequence is correct
            setup: function() {
              var attaches;
              leverageNative(this, type, true);
              if (document2.documentMode) {
                attaches = dataPriv.get(this, delegateType);
                if (!attaches) {
                  this.addEventListener(delegateType, focusMappedHandler);
                }
                dataPriv.set(this, delegateType, (attaches || 0) + 1);
              } else {
                return false;
              }
            },
            trigger: function() {
              leverageNative(this, type);
              return true;
            },
            teardown: function() {
              var attaches;
              if (document2.documentMode) {
                attaches = dataPriv.get(this, delegateType) - 1;
                if (!attaches) {
                  this.removeEventListener(delegateType, focusMappedHandler);
                  dataPriv.remove(this, delegateType);
                } else {
                  dataPriv.set(this, delegateType, attaches);
                }
              } else {
                return false;
              }
            },
            // Suppress native focus or blur if we're currently inside
            // a leveraged native-event stack
            _default: function(event) {
              return dataPriv.get(event.target, type);
            },
            delegateType
          };
          jQuery.event.special[delegateType] = {
            setup: function() {
              var doc = this.ownerDocument || this.document || this, dataHolder = document2.documentMode ? this : doc, attaches = dataPriv.get(dataHolder, delegateType);
              if (!attaches) {
                if (document2.documentMode) {
                  this.addEventListener(delegateType, focusMappedHandler);
                } else {
                  doc.addEventListener(type, focusMappedHandler, true);
                }
              }
              dataPriv.set(dataHolder, delegateType, (attaches || 0) + 1);
            },
            teardown: function() {
              var doc = this.ownerDocument || this.document || this, dataHolder = document2.documentMode ? this : doc, attaches = dataPriv.get(dataHolder, delegateType) - 1;
              if (!attaches) {
                if (document2.documentMode) {
                  this.removeEventListener(delegateType, focusMappedHandler);
                } else {
                  doc.removeEventListener(type, focusMappedHandler, true);
                }
                dataPriv.remove(dataHolder, delegateType);
              } else {
                dataPriv.set(dataHolder, delegateType, attaches);
              }
            }
          };
        });
        jQuery.each({
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout"
        }, function(orig, fix) {
          jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
              var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
              if (!related || related !== target && !jQuery.contains(target, related)) {
                event.type = handleObj.origType;
                ret = handleObj.handler.apply(this, arguments);
                event.type = fix;
              }
              return ret;
            }
          };
        });
        jQuery.fn.extend({
          on: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn);
          },
          one: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn, 1);
          },
          off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
              handleObj = types.handleObj;
              jQuery(types.delegateTarget).off(
                handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
                handleObj.selector,
                handleObj.handler
              );
              return this;
            }
            if (typeof types === "object") {
              for (type in types) {
                this.off(type, selector, types[type]);
              }
              return this;
            }
            if (selector === false || typeof selector === "function") {
              fn = selector;
              selector = void 0;
            }
            if (fn === false) {
              fn = returnFalse;
            }
            return this.each(function() {
              jQuery.event.remove(this, types, fn, selector);
            });
          }
        });
        var rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
        function manipulationTarget(elem, content) {
          if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
            return jQuery(elem).children("tbody")[0] || elem;
          }
          return elem;
        }
        function disableScript(elem) {
          elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
          return elem;
        }
        function restoreScript(elem) {
          if ((elem.type || "").slice(0, 5) === "true/") {
            elem.type = elem.type.slice(5);
          } else {
            elem.removeAttribute("type");
          }
          return elem;
        }
        function cloneCopyEvent(src, dest) {
          var i, l, type, pdataOld, udataOld, udataCur, events;
          if (dest.nodeType !== 1) {
            return;
          }
          if (dataPriv.hasData(src)) {
            pdataOld = dataPriv.get(src);
            events = pdataOld.events;
            if (events) {
              dataPriv.remove(dest, "handle events");
              for (type in events) {
                for (i = 0, l = events[type].length; i < l; i++) {
                  jQuery.event.add(dest, type, events[type][i]);
                }
              }
            }
          }
          if (dataUser.hasData(src)) {
            udataOld = dataUser.access(src);
            udataCur = jQuery.extend({}, udataOld);
            dataUser.set(dest, udataCur);
          }
        }
        function fixInput(src, dest) {
          var nodeName2 = dest.nodeName.toLowerCase();
          if (nodeName2 === "input" && rcheckableType.test(src.type)) {
            dest.checked = src.checked;
          } else if (nodeName2 === "input" || nodeName2 === "textarea") {
            dest.defaultValue = src.defaultValue;
          }
        }
        function domManip(collection, args, callback, ignored) {
          args = flat(args);
          var fragment, first, scripts, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], valueIsFunction = isFunction(value);
          if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
            return collection.each(function(index) {
              var self = collection.eq(index);
              if (valueIsFunction) {
                args[0] = value.call(this, index, self.html());
              }
              domManip(self, args, callback, ignored);
            });
          }
          if (l) {
            fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
            first = fragment.firstChild;
            if (fragment.childNodes.length === 1) {
              fragment = first;
            }
            if (first || ignored) {
              scripts = jQuery.map(getAll(fragment, "script"), disableScript);
              hasScripts = scripts.length;
              for (; i < l; i++) {
                node = fragment;
                if (i !== iNoClone) {
                  node = jQuery.clone(node, true, true);
                  if (hasScripts) {
                    jQuery.merge(scripts, getAll(node, "script"));
                  }
                }
                callback.call(collection[i], node, i);
              }
              if (hasScripts) {
                doc = scripts[scripts.length - 1].ownerDocument;
                jQuery.map(scripts, restoreScript);
                for (i = 0; i < hasScripts; i++) {
                  node = scripts[i];
                  if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
                    if (node.src && (node.type || "").toLowerCase() !== "module") {
                      if (jQuery._evalUrl && !node.noModule) {
                        jQuery._evalUrl(node.src, {
                          nonce: node.nonce || node.getAttribute("nonce")
                        }, doc);
                      }
                    } else {
                      DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
                    }
                  }
                }
              }
            }
          }
          return collection;
        }
        function remove(elem, selector, keepData) {
          var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0;
          for (; (node = nodes[i]) != null; i++) {
            if (!keepData && node.nodeType === 1) {
              jQuery.cleanData(getAll(node));
            }
            if (node.parentNode) {
              if (keepData && isAttached(node)) {
                setGlobalEval(getAll(node, "script"));
              }
              node.parentNode.removeChild(node);
            }
          }
          return elem;
        }
        jQuery.extend({
          htmlPrefilter: function(html) {
            return html;
          },
          clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = isAttached(elem);
            if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
              destElements = getAll(clone);
              srcElements = getAll(elem);
              for (i = 0, l = srcElements.length; i < l; i++) {
                fixInput(srcElements[i], destElements[i]);
              }
            }
            if (dataAndEvents) {
              if (deepDataAndEvents) {
                srcElements = srcElements || getAll(elem);
                destElements = destElements || getAll(clone);
                for (i = 0, l = srcElements.length; i < l; i++) {
                  cloneCopyEvent(srcElements[i], destElements[i]);
                }
              } else {
                cloneCopyEvent(elem, clone);
              }
            }
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
              setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            }
            return clone;
          },
          cleanData: function(elems) {
            var data, elem, type, special = jQuery.event.special, i = 0;
            for (; (elem = elems[i]) !== void 0; i++) {
              if (acceptData(elem)) {
                if (data = elem[dataPriv.expando]) {
                  if (data.events) {
                    for (type in data.events) {
                      if (special[type]) {
                        jQuery.event.remove(elem, type);
                      } else {
                        jQuery.removeEvent(elem, type, data.handle);
                      }
                    }
                  }
                  elem[dataPriv.expando] = void 0;
                }
                if (elem[dataUser.expando]) {
                  elem[dataUser.expando] = void 0;
                }
              }
            }
          }
        });
        jQuery.fn.extend({
          detach: function(selector) {
            return remove(this, selector, true);
          },
          remove: function(selector) {
            return remove(this, selector);
          },
          text: function(value) {
            return access(this, function(value2) {
              return value2 === void 0 ? jQuery.text(this) : this.empty().each(function() {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                  this.textContent = value2;
                }
              });
            }, null, value, arguments.length);
          },
          append: function() {
            return domManip(this, arguments, function(elem) {
              if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                var target = manipulationTarget(this, elem);
                target.appendChild(elem);
              }
            });
          },
          prepend: function() {
            return domManip(this, arguments, function(elem) {
              if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                var target = manipulationTarget(this, elem);
                target.insertBefore(elem, target.firstChild);
              }
            });
          },
          before: function() {
            return domManip(this, arguments, function(elem) {
              if (this.parentNode) {
                this.parentNode.insertBefore(elem, this);
              }
            });
          },
          after: function() {
            return domManip(this, arguments, function(elem) {
              if (this.parentNode) {
                this.parentNode.insertBefore(elem, this.nextSibling);
              }
            });
          },
          empty: function() {
            var elem, i = 0;
            for (; (elem = this[i]) != null; i++) {
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.textContent = "";
              }
            }
            return this;
          },
          clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
              return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
          },
          html: function(value) {
            return access(this, function(value2) {
              var elem = this[0] || {}, i = 0, l = this.length;
              if (value2 === void 0 && elem.nodeType === 1) {
                return elem.innerHTML;
              }
              if (typeof value2 === "string" && !rnoInnerhtml.test(value2) && !wrapMap[(rtagName.exec(value2) || ["", ""])[1].toLowerCase()]) {
                value2 = jQuery.htmlPrefilter(value2);
                try {
                  for (; i < l; i++) {
                    elem = this[i] || {};
                    if (elem.nodeType === 1) {
                      jQuery.cleanData(getAll(elem, false));
                      elem.innerHTML = value2;
                    }
                  }
                  elem = 0;
                } catch (e) {
                }
              }
              if (elem) {
                this.empty().append(value2);
              }
            }, null, value, arguments.length);
          },
          replaceWith: function() {
            var ignored = [];
            return domManip(this, arguments, function(elem) {
              var parent = this.parentNode;
              if (jQuery.inArray(this, ignored) < 0) {
                jQuery.cleanData(getAll(this));
                if (parent) {
                  parent.replaceChild(elem, this);
                }
              }
            }, ignored);
          }
        });
        jQuery.each({
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith"
        }, function(name, original) {
          jQuery.fn[name] = function(selector) {
            var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
            for (; i <= last; i++) {
              elems = i === last ? this : this.clone(true);
              jQuery(insert[i])[original](elems);
              push.apply(ret, elems.get());
            }
            return this.pushStack(ret);
          };
        });
        var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
        var rcustomProp = /^--/;
        var getStyles = function(elem) {
          var view = elem.ownerDocument.defaultView;
          if (!view || !view.opener) {
            view = window2;
          }
          return view.getComputedStyle(elem);
        };
        var swap = function(elem, options, callback) {
          var ret, name, old = {};
          for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
          }
          ret = callback.call(elem);
          for (name in options) {
            elem.style[name] = old[name];
          }
          return ret;
        };
        var rboxStyle = new RegExp(cssExpand.join("|"), "i");
        (function() {
          function computeStyleTests() {
            if (!div) {
              return;
            }
            container.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
            div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
            documentElement.appendChild(container).appendChild(div);
            var divStyle = window2.getComputedStyle(div);
            pixelPositionVal = divStyle.top !== "1%";
            reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;
            div.style.right = "60%";
            pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;
            boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;
            div.style.position = "absolute";
            scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
            documentElement.removeChild(container);
            div = null;
          }
          function roundPixelMeasures(measure) {
            return Math.round(parseFloat(measure));
          }
          var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal, reliableTrDimensionsVal, reliableMarginLeftVal, container = document2.createElement("div"), div = document2.createElement("div");
          if (!div.style) {
            return;
          }
          div.style.backgroundClip = "content-box";
          div.cloneNode(true).style.backgroundClip = "";
          support.clearCloneStyle = div.style.backgroundClip === "content-box";
          jQuery.extend(support, {
            boxSizingReliable: function() {
              computeStyleTests();
              return boxSizingReliableVal;
            },
            pixelBoxStyles: function() {
              computeStyleTests();
              return pixelBoxStylesVal;
            },
            pixelPosition: function() {
              computeStyleTests();
              return pixelPositionVal;
            },
            reliableMarginLeft: function() {
              computeStyleTests();
              return reliableMarginLeftVal;
            },
            scrollboxSize: function() {
              computeStyleTests();
              return scrollboxSizeVal;
            },
            // Support: IE 9 - 11+, Edge 15 - 18+
            // IE/Edge misreport `getComputedStyle` of table rows with width/height
            // set in CSS while `offset*` properties report correct values.
            // Behavior in IE 9 is more subtle than in newer versions & it passes
            // some versions of this test; make sure not to make it pass there!
            //
            // Support: Firefox 70+
            // Only Firefox includes border widths
            // in computed dimensions. (gh-4529)
            reliableTrDimensions: function() {
              var table, tr, trChild, trStyle;
              if (reliableTrDimensionsVal == null) {
                table = document2.createElement("table");
                tr = document2.createElement("tr");
                trChild = document2.createElement("div");
                table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
                tr.style.cssText = "box-sizing:content-box;border:1px solid";
                tr.style.height = "1px";
                trChild.style.height = "9px";
                trChild.style.display = "block";
                documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
                trStyle = window2.getComputedStyle(tr);
                reliableTrDimensionsVal = parseInt(trStyle.height, 10) + parseInt(trStyle.borderTopWidth, 10) + parseInt(trStyle.borderBottomWidth, 10) === tr.offsetHeight;
                documentElement.removeChild(table);
              }
              return reliableTrDimensionsVal;
            }
          });
        })();
        function curCSS(elem, name, computed) {
          var width, minWidth, maxWidth, ret, isCustomProp = rcustomProp.test(name), style = elem.style;
          computed = computed || getStyles(elem);
          if (computed) {
            ret = computed.getPropertyValue(name) || computed[name];
            if (isCustomProp && ret) {
              ret = ret.replace(rtrimCSS, "$1") || void 0;
            }
            if (ret === "" && !isAttached(elem)) {
              ret = jQuery.style(elem, name);
            }
            if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
              width = style.width;
              minWidth = style.minWidth;
              maxWidth = style.maxWidth;
              style.minWidth = style.maxWidth = style.width = ret;
              ret = computed.width;
              style.width = width;
              style.minWidth = minWidth;
              style.maxWidth = maxWidth;
            }
          }
          return ret !== void 0 ? (
            // Support: IE <=9 - 11 only
            // IE returns zIndex value as an integer.
            ret + ""
          ) : ret;
        }
        function addGetHookIf(conditionFn, hookFn) {
          return {
            get: function() {
              if (conditionFn()) {
                delete this.get;
                return;
              }
              return (this.get = hookFn).apply(this, arguments);
            }
          };
        }
        var cssPrefixes = ["Webkit", "Moz", "ms"], emptyStyle = document2.createElement("div").style, vendorProps = {};
        function vendorPropName(name) {
          var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length;
          while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in emptyStyle) {
              return name;
            }
          }
        }
        function finalPropName(name) {
          var final = jQuery.cssProps[name] || vendorProps[name];
          if (final) {
            return final;
          }
          if (name in emptyStyle) {
            return name;
          }
          return vendorProps[name] = vendorPropName(name) || name;
        }
        var rdisplayswap = /^(none|table(?!-c[ea]).+)/, cssShow = { position: "absolute", visibility: "hidden", display: "block" }, cssNormalTransform = {
          letterSpacing: "0",
          fontWeight: "400"
        };
        function setPositiveNumber(_elem, value, subtract) {
          var matches = rcssNum.exec(value);
          return matches ? (
            // Guard against undefined "subtract", e.g., when used as in cssHooks
            Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px")
          ) : value;
        }
        function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
          var i = dimension === "width" ? 1 : 0, extra = 0, delta = 0, marginDelta = 0;
          if (box === (isBorderBox ? "border" : "content")) {
            return 0;
          }
          for (; i < 4; i += 2) {
            if (box === "margin") {
              marginDelta += jQuery.css(elem, box + cssExpand[i], true, styles);
            }
            if (!isBorderBox) {
              delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
              if (box !== "padding") {
                delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
              } else {
                extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
              }
            } else {
              if (box === "content") {
                delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
              }
              if (box !== "margin") {
                delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
              }
            }
          }
          if (!isBorderBox && computedVal >= 0) {
            delta += Math.max(0, Math.ceil(
              elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5
              // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
              // Use an explicit zero to avoid NaN (gh-3964)
            )) || 0;
          }
          return delta + marginDelta;
        }
        function getWidthOrHeight(elem, dimension, extra) {
          var styles = getStyles(elem), boxSizingNeeded = !support.boxSizingReliable() || extra, isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box", valueIsBorderBox = isBorderBox, val = curCSS(elem, dimension, styles), offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
          if (rnumnonpx.test(val)) {
            if (!extra) {
              return val;
            }
            val = "auto";
          }
          if ((!support.boxSizingReliable() && isBorderBox || // Support: IE 10 - 11+, Edge 15 - 18+
          // IE/Edge misreport `getComputedStyle` of table rows with width/height
          // set in CSS while `offset*` properties report correct values.
          // Interestingly, in some cases IE 9 doesn't suffer from this issue.
          !support.reliableTrDimensions() && nodeName(elem, "tr") || // Fall back to offsetWidth/offsetHeight when value is "auto"
          // This happens for inline elements with no explicit setting (gh-3571)
          val === "auto" || // Support: Android <=4.1 - 4.3 only
          // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
          !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") && // Make sure the element is visible & connected
          elem.getClientRects().length) {
            isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
            valueIsBorderBox = offsetProp in elem;
            if (valueIsBorderBox) {
              val = elem[offsetProp];
            }
          }
          val = parseFloat(val) || 0;
          return val + boxModelAdjustment(
            elem,
            dimension,
            extra || (isBorderBox ? "border" : "content"),
            valueIsBorderBox,
            styles,
            // Provide the current computed size to request scroll gutter calculation (gh-3589)
            val
          ) + "px";
        }
        jQuery.extend({
          // Add in style property hooks for overriding the default
          // behavior of getting and setting a style property
          cssHooks: {
            opacity: {
              get: function(elem, computed) {
                if (computed) {
                  var ret = curCSS(elem, "opacity");
                  return ret === "" ? "1" : ret;
                }
              }
            }
          },
          // Don't automatically add "px" to these possibly-unitless properties
          cssNumber: {
            animationIterationCount: true,
            aspectRatio: true,
            borderImageSlice: true,
            columnCount: true,
            flexGrow: true,
            flexShrink: true,
            fontWeight: true,
            gridArea: true,
            gridColumn: true,
            gridColumnEnd: true,
            gridColumnStart: true,
            gridRow: true,
            gridRowEnd: true,
            gridRowStart: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            scale: true,
            widows: true,
            zIndex: true,
            zoom: true,
            // SVG-related
            fillOpacity: true,
            floodOpacity: true,
            stopOpacity: true,
            strokeMiterlimit: true,
            strokeOpacity: true
          },
          // Add in properties whose names you wish to fix before
          // setting or getting the value
          cssProps: {},
          // Get and set the style property on a DOM Node
          style: function(elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
              return;
            }
            var ret, type, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name), style = elem.style;
            if (!isCustomProp) {
              name = finalPropName(origName);
            }
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (value !== void 0) {
              type = typeof value;
              if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
                value = adjustCSS(elem, name, ret);
                type = "number";
              }
              if (value == null || value !== value) {
                return;
              }
              if (type === "number" && !isCustomProp) {
                value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
              }
              if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                style[name] = "inherit";
              }
              if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== void 0) {
                if (isCustomProp) {
                  style.setProperty(name, value);
                } else {
                  style[name] = value;
                }
              }
            } else {
              if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== void 0) {
                return ret;
              }
              return style[name];
            }
          },
          css: function(elem, name, extra, styles) {
            var val, num, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name);
            if (!isCustomProp) {
              name = finalPropName(origName);
            }
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (hooks && "get" in hooks) {
              val = hooks.get(elem, true, extra);
            }
            if (val === void 0) {
              val = curCSS(elem, name, styles);
            }
            if (val === "normal" && name in cssNormalTransform) {
              val = cssNormalTransform[name];
            }
            if (extra === "" || extra) {
              num = parseFloat(val);
              return extra === true || isFinite(num) ? num || 0 : val;
            }
            return val;
          }
        });
        jQuery.each(["height", "width"], function(_i, dimension) {
          jQuery.cssHooks[dimension] = {
            get: function(elem, computed, extra) {
              if (computed) {
                return rdisplayswap.test(jQuery.css(elem, "display")) && // Support: Safari 8+
                // Table columns in Safari have non-zero offsetWidth & zero
                // getBoundingClientRect().width unless display is changed.
                // Support: IE <=11 only
                // Running getBoundingClientRect on a disconnected node
                // in IE throws an error.
                (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function() {
                  return getWidthOrHeight(elem, dimension, extra);
                }) : getWidthOrHeight(elem, dimension, extra);
              }
            },
            set: function(elem, value, extra) {
              var matches, styles = getStyles(elem), scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute", boxSizingNeeded = scrollboxSizeBuggy || extra, isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box", subtract = extra ? boxModelAdjustment(
                elem,
                dimension,
                extra,
                isBorderBox,
                styles
              ) : 0;
              if (isBorderBox && scrollboxSizeBuggy) {
                subtract -= Math.ceil(
                  elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5
                );
              }
              if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
                elem.style[dimension] = value;
                value = jQuery.css(elem, dimension);
              }
              return setPositiveNumber(elem, value, subtract);
            }
          };
        });
        jQuery.cssHooks.marginLeft = addGetHookIf(
          support.reliableMarginLeft,
          function(elem, computed) {
            if (computed) {
              return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function() {
                return elem.getBoundingClientRect().left;
              })) + "px";
            }
          }
        );
        jQuery.each({
          margin: "",
          padding: "",
          border: "Width"
        }, function(prefix, suffix) {
          jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
              var i = 0, expanded = {}, parts = typeof value === "string" ? value.split(" ") : [value];
              for (; i < 4; i++) {
                expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
              }
              return expanded;
            }
          };
          if (prefix !== "margin") {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
          }
        });
        jQuery.fn.extend({
          css: function(name, value) {
            return access(this, function(elem, name2, value2) {
              var styles, len, map = {}, i = 0;
              if (Array.isArray(name2)) {
                styles = getStyles(elem);
                len = name2.length;
                for (; i < len; i++) {
                  map[name2[i]] = jQuery.css(elem, name2[i], false, styles);
                }
                return map;
              }
              return value2 !== void 0 ? jQuery.style(elem, name2, value2) : jQuery.css(elem, name2);
            }, name, value, arguments.length > 1);
          }
        });
        function Tween(elem, options, prop, end, easing) {
          return new Tween.prototype.init(elem, options, prop, end, easing);
        }
        jQuery.Tween = Tween;
        Tween.prototype = {
          constructor: Tween,
          init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || jQuery.easing._default;
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
          },
          cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
          },
          run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
              this.pos = eased = jQuery.easing[this.easing](
                percent,
                this.options.duration * percent,
                0,
                1,
                this.options.duration
              );
            } else {
              this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
              this.options.step.call(this.elem, this.now, this);
            }
            if (hooks && hooks.set) {
              hooks.set(this);
            } else {
              Tween.propHooks._default.set(this);
            }
            return this;
          }
        };
        Tween.prototype.init.prototype = Tween.prototype;
        Tween.propHooks = {
          _default: {
            get: function(tween) {
              var result;
              if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                return tween.elem[tween.prop];
              }
              result = jQuery.css(tween.elem, tween.prop, "");
              return !result || result === "auto" ? 0 : result;
            },
            set: function(tween) {
              if (jQuery.fx.step[tween.prop]) {
                jQuery.fx.step[tween.prop](tween);
              } else if (tween.elem.nodeType === 1 && (jQuery.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
                jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
              } else {
                tween.elem[tween.prop] = tween.now;
              }
            }
          }
        };
        Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
          set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
              tween.elem[tween.prop] = tween.now;
            }
          }
        };
        jQuery.easing = {
          linear: function(p) {
            return p;
          },
          swing: function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
          },
          _default: "swing"
        };
        jQuery.fx = Tween.prototype.init;
        jQuery.fx.step = {};
        var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
        function schedule() {
          if (inProgress) {
            if (document2.hidden === false && window2.requestAnimationFrame) {
              window2.requestAnimationFrame(schedule);
            } else {
              window2.setTimeout(schedule, jQuery.fx.interval);
            }
            jQuery.fx.tick();
          }
        }
        function createFxNow() {
          window2.setTimeout(function() {
            fxNow = void 0;
          });
          return fxNow = Date.now();
        }
        function genFx(type, includeWidth) {
          var which, i = 0, attrs = { height: type };
          includeWidth = includeWidth ? 1 : 0;
          for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
          }
          if (includeWidth) {
            attrs.opacity = attrs.width = type;
          }
          return attrs;
        }
        function createTween(value, prop, animation) {
          var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length;
          for (; index < length; index++) {
            if (tween = collection[index].call(animation, prop, value)) {
              return tween;
            }
          }
        }
        function defaultPrefilter(elem, props, opts) {
          var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
          if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
              hooks.unqueued = 0;
              oldfire = hooks.empty.fire;
              hooks.empty.fire = function() {
                if (!hooks.unqueued) {
                  oldfire();
                }
              };
            }
            hooks.unqueued++;
            anim.always(function() {
              anim.always(function() {
                hooks.unqueued--;
                if (!jQuery.queue(elem, "fx").length) {
                  hooks.empty.fire();
                }
              });
            });
          }
          for (prop in props) {
            value = props[prop];
            if (rfxtypes.test(value)) {
              delete props[prop];
              toggle = toggle || value === "toggle";
              if (value === (hidden ? "hide" : "show")) {
                if (value === "show" && dataShow && dataShow[prop] !== void 0) {
                  hidden = true;
                } else {
                  continue;
                }
              }
              orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
            }
          }
          propTween = !jQuery.isEmptyObject(props);
          if (!propTween && jQuery.isEmptyObject(orig)) {
            return;
          }
          if (isBox && elem.nodeType === 1) {
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];
            restoreDisplay = dataShow && dataShow.display;
            if (restoreDisplay == null) {
              restoreDisplay = dataPriv.get(elem, "display");
            }
            display = jQuery.css(elem, "display");
            if (display === "none") {
              if (restoreDisplay) {
                display = restoreDisplay;
              } else {
                showHide([elem], true);
                restoreDisplay = elem.style.display || restoreDisplay;
                display = jQuery.css(elem, "display");
                showHide([elem]);
              }
            }
            if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
              if (jQuery.css(elem, "float") === "none") {
                if (!propTween) {
                  anim.done(function() {
                    style.display = restoreDisplay;
                  });
                  if (restoreDisplay == null) {
                    display = style.display;
                    restoreDisplay = display === "none" ? "" : display;
                  }
                }
                style.display = "inline-block";
              }
            }
          }
          if (opts.overflow) {
            style.overflow = "hidden";
            anim.always(function() {
              style.overflow = opts.overflow[0];
              style.overflowX = opts.overflow[1];
              style.overflowY = opts.overflow[2];
            });
          }
          propTween = false;
          for (prop in orig) {
            if (!propTween) {
              if (dataShow) {
                if ("hidden" in dataShow) {
                  hidden = dataShow.hidden;
                }
              } else {
                dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
              }
              if (toggle) {
                dataShow.hidden = !hidden;
              }
              if (hidden) {
                showHide([elem], true);
              }
              anim.done(function() {
                if (!hidden) {
                  showHide([elem]);
                }
                dataPriv.remove(elem, "fxshow");
                for (prop in orig) {
                  jQuery.style(elem, prop, orig[prop]);
                }
              });
            }
            propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
            if (!(prop in dataShow)) {
              dataShow[prop] = propTween.start;
              if (hidden) {
                propTween.end = propTween.start;
                propTween.start = 0;
              }
            }
          }
        }
        function propFilter(props, specialEasing) {
          var index, name, easing, value, hooks;
          for (index in props) {
            name = camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (Array.isArray(value)) {
              easing = value[1];
              value = props[index] = value[0];
            }
            if (index !== name) {
              props[name] = value;
              delete props[index];
            }
            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
              value = hooks.expand(value);
              delete props[name];
              for (index in value) {
                if (!(index in props)) {
                  props[index] = value[index];
                  specialEasing[index] = easing;
                }
              }
            } else {
              specialEasing[name] = easing;
            }
          }
        }
        function Animation(elem, properties, options) {
          var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
          }), tick = function() {
            if (stopped) {
              return false;
            }
            var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index2 = 0, length2 = animation.tweens.length;
            for (; index2 < length2; index2++) {
              animation.tweens[index2].run(percent);
            }
            deferred.notifyWith(elem, [animation, percent, remaining]);
            if (percent < 1 && length2) {
              return remaining;
            }
            if (!length2) {
              deferred.notifyWith(elem, [animation, 1, 0]);
            }
            deferred.resolveWith(elem, [animation]);
            return false;
          }, animation = deferred.promise({
            elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(true, {
              specialEasing: {},
              easing: jQuery.easing._default
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
              var tween = jQuery.Tween(
                elem,
                animation.opts,
                prop,
                end,
                animation.opts.specialEasing[prop] || animation.opts.easing
              );
              animation.tweens.push(tween);
              return tween;
            },
            stop: function(gotoEnd) {
              var index2 = 0, length2 = gotoEnd ? animation.tweens.length : 0;
              if (stopped) {
                return this;
              }
              stopped = true;
              for (; index2 < length2; index2++) {
                animation.tweens[index2].run(1);
              }
              if (gotoEnd) {
                deferred.notifyWith(elem, [animation, 1, 0]);
                deferred.resolveWith(elem, [animation, gotoEnd]);
              } else {
                deferred.rejectWith(elem, [animation, gotoEnd]);
              }
              return this;
            }
          }), props = animation.props;
          propFilter(props, animation.opts.specialEasing);
          for (; index < length; index++) {
            result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
              if (isFunction(result.stop)) {
                jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
              }
              return result;
            }
          }
          jQuery.map(props, createTween, animation);
          if (isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
          }
          animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
          jQuery.fx.timer(
            jQuery.extend(tick, {
              elem,
              anim: animation,
              queue: animation.opts.queue
            })
          );
          return animation;
        }
        jQuery.Animation = jQuery.extend(Animation, {
          tweeners: {
            "*": [function(prop, value) {
              var tween = this.createTween(prop, value);
              adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
              return tween;
            }]
          },
          tweener: function(props, callback) {
            if (isFunction(props)) {
              callback = props;
              props = ["*"];
            } else {
              props = props.match(rnothtmlwhite);
            }
            var prop, index = 0, length = props.length;
            for (; index < length; index++) {
              prop = props[index];
              Animation.tweeners[prop] = Animation.tweeners[prop] || [];
              Animation.tweeners[prop].unshift(callback);
            }
          },
          prefilters: [defaultPrefilter],
          prefilter: function(callback, prepend) {
            if (prepend) {
              Animation.prefilters.unshift(callback);
            } else {
              Animation.prefilters.push(callback);
            }
          }
        });
        jQuery.speed = function(speed, easing, fn) {
          var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !isFunction(easing) && easing
          };
          if (jQuery.fx.off) {
            opt.duration = 0;
          } else {
            if (typeof opt.duration !== "number") {
              if (opt.duration in jQuery.fx.speeds) {
                opt.duration = jQuery.fx.speeds[opt.duration];
              } else {
                opt.duration = jQuery.fx.speeds._default;
              }
            }
          }
          if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
          }
          opt.old = opt.complete;
          opt.complete = function() {
            if (isFunction(opt.old)) {
              opt.old.call(this);
            }
            if (opt.queue) {
              jQuery.dequeue(this, opt.queue);
            }
          };
          return opt;
        };
        jQuery.fn.extend({
          fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({ opacity: to }, speed, easing, callback);
          },
          animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
              var anim = Animation(this, jQuery.extend({}, prop), optall);
              if (empty || dataPriv.get(this, "finish")) {
                anim.stop(true);
              }
            };
            doAnimation.finish = doAnimation;
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
          },
          stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
              var stop = hooks.stop;
              delete hooks.stop;
              stop(gotoEnd);
            };
            if (typeof type !== "string") {
              gotoEnd = clearQueue;
              clearQueue = type;
              type = void 0;
            }
            if (clearQueue) {
              this.queue(type || "fx", []);
            }
            return this.each(function() {
              var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery.timers, data = dataPriv.get(this);
              if (index) {
                if (data[index] && data[index].stop) {
                  stopQueue(data[index]);
                }
              } else {
                for (index in data) {
                  if (data[index] && data[index].stop && rrun.test(index)) {
                    stopQueue(data[index]);
                  }
                }
              }
              for (index = timers.length; index--; ) {
                if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                  timers[index].anim.stop(gotoEnd);
                  dequeue = false;
                  timers.splice(index, 1);
                }
              }
              if (dequeue || !gotoEnd) {
                jQuery.dequeue(this, type);
              }
            });
          },
          finish: function(type) {
            if (type !== false) {
              type = type || "fx";
            }
            return this.each(function() {
              var index, data = dataPriv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
              data.finish = true;
              jQuery.queue(this, type, []);
              if (hooks && hooks.stop) {
                hooks.stop.call(this, true);
              }
              for (index = timers.length; index--; ) {
                if (timers[index].elem === this && timers[index].queue === type) {
                  timers[index].anim.stop(true);
                  timers.splice(index, 1);
                }
              }
              for (index = 0; index < length; index++) {
                if (queue[index] && queue[index].finish) {
                  queue[index].finish.call(this);
                }
              }
              delete data.finish;
            });
          }
        });
        jQuery.each(["toggle", "show", "hide"], function(_i, name) {
          var cssFn = jQuery.fn[name];
          jQuery.fn[name] = function(speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
          };
        });
        jQuery.each({
          slideDown: genFx("show"),
          slideUp: genFx("hide"),
          slideToggle: genFx("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" }
        }, function(name, props) {
          jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
          };
        });
        jQuery.timers = [];
        jQuery.fx.tick = function() {
          var timer, i = 0, timers = jQuery.timers;
          fxNow = Date.now();
          for (; i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) {
              timers.splice(i--, 1);
            }
          }
          if (!timers.length) {
            jQuery.fx.stop();
          }
          fxNow = void 0;
        };
        jQuery.fx.timer = function(timer) {
          jQuery.timers.push(timer);
          jQuery.fx.start();
        };
        jQuery.fx.interval = 13;
        jQuery.fx.start = function() {
          if (inProgress) {
            return;
          }
          inProgress = true;
          schedule();
        };
        jQuery.fx.stop = function() {
          inProgress = null;
        };
        jQuery.fx.speeds = {
          slow: 600,
          fast: 200,
          // Default speed
          _default: 400
        };
        jQuery.fn.delay = function(time, type) {
          time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
          type = type || "fx";
          return this.queue(type, function(next, hooks) {
            var timeout = window2.setTimeout(next, time);
            hooks.stop = function() {
              window2.clearTimeout(timeout);
            };
          });
        };
        (function() {
          var input = document2.createElement("input"), select = document2.createElement("select"), opt = select.appendChild(document2.createElement("option"));
          input.type = "checkbox";
          support.checkOn = input.value !== "";
          support.optSelected = opt.selected;
          input = document2.createElement("input");
          input.value = "t";
          input.type = "radio";
          support.radioValue = input.value === "t";
        })();
        var boolHook, attrHandle = jQuery.expr.attrHandle;
        jQuery.fn.extend({
          attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
          },
          removeAttr: function(name) {
            return this.each(function() {
              jQuery.removeAttr(this, name);
            });
          }
        });
        jQuery.extend({
          attr: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (nType === 3 || nType === 8 || nType === 2) {
              return;
            }
            if (typeof elem.getAttribute === "undefined") {
              return jQuery.prop(elem, name, value);
            }
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
              hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : void 0);
            }
            if (value !== void 0) {
              if (value === null) {
                jQuery.removeAttr(elem, name);
                return;
              }
              if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
                return ret;
              }
              elem.setAttribute(name, value + "");
              return value;
            }
            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
              return ret;
            }
            ret = jQuery.find.attr(elem, name);
            return ret == null ? void 0 : ret;
          },
          attrHooks: {
            type: {
              set: function(elem, value) {
                if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
                  var val = elem.value;
                  elem.setAttribute("type", value);
                  if (val) {
                    elem.value = val;
                  }
                  return value;
                }
              }
            }
          },
          removeAttr: function(elem, value) {
            var name, i = 0, attrNames = value && value.match(rnothtmlwhite);
            if (attrNames && elem.nodeType === 1) {
              while (name = attrNames[i++]) {
                elem.removeAttribute(name);
              }
            }
          }
        });
        boolHook = {
          set: function(elem, value, name) {
            if (value === false) {
              jQuery.removeAttr(elem, name);
            } else {
              elem.setAttribute(name, name);
            }
            return name;
          }
        };
        jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(_i, name) {
          var getter = attrHandle[name] || jQuery.find.attr;
          attrHandle[name] = function(elem, name2, isXML) {
            var ret, handle, lowercaseName = name2.toLowerCase();
            if (!isXML) {
              handle = attrHandle[lowercaseName];
              attrHandle[lowercaseName] = ret;
              ret = getter(elem, name2, isXML) != null ? lowercaseName : null;
              attrHandle[lowercaseName] = handle;
            }
            return ret;
          };
        });
        var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
        jQuery.fn.extend({
          prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
          },
          removeProp: function(name) {
            return this.each(function() {
              delete this[jQuery.propFix[name] || name];
            });
          }
        });
        jQuery.extend({
          prop: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (nType === 3 || nType === 8 || nType === 2) {
              return;
            }
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
              name = jQuery.propFix[name] || name;
              hooks = jQuery.propHooks[name];
            }
            if (value !== void 0) {
              if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
                return ret;
              }
              return elem[name] = value;
            }
            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
              return ret;
            }
            return elem[name];
          },
          propHooks: {
            tabIndex: {
              get: function(elem) {
                var tabindex = jQuery.find.attr(elem, "tabindex");
                if (tabindex) {
                  return parseInt(tabindex, 10);
                }
                if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
                  return 0;
                }
                return -1;
              }
            }
          },
          propFix: {
            "for": "htmlFor",
            "class": "className"
          }
        });
        if (!support.optSelected) {
          jQuery.propHooks.selected = {
            get: function(elem) {
              var parent = elem.parentNode;
              if (parent && parent.parentNode) {
                parent.parentNode.selectedIndex;
              }
              return null;
            },
            set: function(elem) {
              var parent = elem.parentNode;
              if (parent) {
                parent.selectedIndex;
                if (parent.parentNode) {
                  parent.parentNode.selectedIndex;
                }
              }
            }
          };
        }
        jQuery.each([
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable"
        ], function() {
          jQuery.propFix[this.toLowerCase()] = this;
        });
        function stripAndCollapse(value) {
          var tokens = value.match(rnothtmlwhite) || [];
          return tokens.join(" ");
        }
        function getClass(elem) {
          return elem.getAttribute && elem.getAttribute("class") || "";
        }
        function classesToArray(value) {
          if (Array.isArray(value)) {
            return value;
          }
          if (typeof value === "string") {
            return value.match(rnothtmlwhite) || [];
          }
          return [];
        }
        jQuery.fn.extend({
          addClass: function(value) {
            var classNames, cur, curValue, className, i, finalValue;
            if (isFunction(value)) {
              return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, getClass(this)));
              });
            }
            classNames = classesToArray(value);
            if (classNames.length) {
              return this.each(function() {
                curValue = getClass(this);
                cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
                if (cur) {
                  for (i = 0; i < classNames.length; i++) {
                    className = classNames[i];
                    if (cur.indexOf(" " + className + " ") < 0) {
                      cur += className + " ";
                    }
                  }
                  finalValue = stripAndCollapse(cur);
                  if (curValue !== finalValue) {
                    this.setAttribute("class", finalValue);
                  }
                }
              });
            }
            return this;
          },
          removeClass: function(value) {
            var classNames, cur, curValue, className, i, finalValue;
            if (isFunction(value)) {
              return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, getClass(this)));
              });
            }
            if (!arguments.length) {
              return this.attr("class", "");
            }
            classNames = classesToArray(value);
            if (classNames.length) {
              return this.each(function() {
                curValue = getClass(this);
                cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
                if (cur) {
                  for (i = 0; i < classNames.length; i++) {
                    className = classNames[i];
                    while (cur.indexOf(" " + className + " ") > -1) {
                      cur = cur.replace(" " + className + " ", " ");
                    }
                  }
                  finalValue = stripAndCollapse(cur);
                  if (curValue !== finalValue) {
                    this.setAttribute("class", finalValue);
                  }
                }
              });
            }
            return this;
          },
          toggleClass: function(value, stateVal) {
            var classNames, className, i, self, type = typeof value, isValidValue = type === "string" || Array.isArray(value);
            if (isFunction(value)) {
              return this.each(function(i2) {
                jQuery(this).toggleClass(
                  value.call(this, i2, getClass(this), stateVal),
                  stateVal
                );
              });
            }
            if (typeof stateVal === "boolean" && isValidValue) {
              return stateVal ? this.addClass(value) : this.removeClass(value);
            }
            classNames = classesToArray(value);
            return this.each(function() {
              if (isValidValue) {
                self = jQuery(this);
                for (i = 0; i < classNames.length; i++) {
                  className = classNames[i];
                  if (self.hasClass(className)) {
                    self.removeClass(className);
                  } else {
                    self.addClass(className);
                  }
                }
              } else if (value === void 0 || type === "boolean") {
                className = getClass(this);
                if (className) {
                  dataPriv.set(this, "__className__", className);
                }
                if (this.setAttribute) {
                  this.setAttribute(
                    "class",
                    className || value === false ? "" : dataPriv.get(this, "__className__") || ""
                  );
                }
              }
            });
          },
          hasClass: function(selector) {
            var className, elem, i = 0;
            className = " " + selector + " ";
            while (elem = this[i++]) {
              if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
                return true;
              }
            }
            return false;
          }
        });
        var rreturn = /\r/g;
        jQuery.fn.extend({
          val: function(value) {
            var hooks, ret, valueIsFunction, elem = this[0];
            if (!arguments.length) {
              if (elem) {
                hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== void 0) {
                  return ret;
                }
                ret = elem.value;
                if (typeof ret === "string") {
                  return ret.replace(rreturn, "");
                }
                return ret == null ? "" : ret;
              }
              return;
            }
            valueIsFunction = isFunction(value);
            return this.each(function(i) {
              var val;
              if (this.nodeType !== 1) {
                return;
              }
              if (valueIsFunction) {
                val = value.call(this, i, jQuery(this).val());
              } else {
                val = value;
              }
              if (val == null) {
                val = "";
              } else if (typeof val === "number") {
                val += "";
              } else if (Array.isArray(val)) {
                val = jQuery.map(val, function(value2) {
                  return value2 == null ? "" : value2 + "";
                });
              }
              hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
              if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === void 0) {
                this.value = val;
              }
            });
          }
        });
        jQuery.extend({
          valHooks: {
            option: {
              get: function(elem) {
                var val = jQuery.find.attr(elem, "value");
                return val != null ? val : (
                  // Support: IE <=10 - 11 only
                  // option.text throws exceptions (trac-14686, trac-14858)
                  // Strip and collapse whitespace
                  // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                  stripAndCollapse(jQuery.text(elem))
                );
              }
            },
            select: {
              get: function(elem) {
                var value, option, i, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one", values = one ? null : [], max = one ? index + 1 : options.length;
                if (index < 0) {
                  i = max;
                } else {
                  i = one ? index : 0;
                }
                for (; i < max; i++) {
                  option = options[i];
                  if ((option.selected || i === index) && // Don't return options that are disabled or in a disabled optgroup
                  !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
                    value = jQuery(option).val();
                    if (one) {
                      return value;
                    }
                    values.push(value);
                  }
                }
                return values;
              },
              set: function(elem, value) {
                var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
                while (i--) {
                  option = options[i];
                  if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
                    optionSet = true;
                  }
                }
                if (!optionSet) {
                  elem.selectedIndex = -1;
                }
                return values;
              }
            }
          }
        });
        jQuery.each(["radio", "checkbox"], function() {
          jQuery.valHooks[this] = {
            set: function(elem, value) {
              if (Array.isArray(value)) {
                return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
              }
            }
          };
          if (!support.checkOn) {
            jQuery.valHooks[this].get = function(elem) {
              return elem.getAttribute("value") === null ? "on" : elem.value;
            };
          }
        });
        var location = window2.location;
        var nonce = { guid: Date.now() };
        var rquery = /\?/;
        jQuery.parseXML = function(data) {
          var xml, parserErrorElem;
          if (!data || typeof data !== "string") {
            return null;
          }
          try {
            xml = new window2.DOMParser().parseFromString(data, "text/xml");
          } catch (e) {
          }
          parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
          if (!xml || parserErrorElem) {
            jQuery.error("Invalid XML: " + (parserErrorElem ? jQuery.map(parserErrorElem.childNodes, function(el) {
              return el.textContent;
            }).join("\n") : data));
          }
          return xml;
        };
        var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, stopPropagationCallback = function(e) {
          e.stopPropagation();
        };
        jQuery.extend(jQuery.event, {
          trigger: function(event, data, elem, onlyHandlers) {
            var i, cur, tmp, bubbleType, ontype, handle, special, lastElement, eventPath = [elem || document2], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            cur = lastElement = tmp = elem = elem || document2;
            if (elem.nodeType === 3 || elem.nodeType === 8) {
              return;
            }
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
              return;
            }
            if (type.indexOf(".") > -1) {
              namespaces = type.split(".");
              type = namespaces.shift();
              namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;
            event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            event.result = void 0;
            if (!event.target) {
              event.target = elem;
            }
            data = data == null ? [event] : jQuery.makeArray(data, [event]);
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
              return;
            }
            if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
              bubbleType = special.delegateType || type;
              if (!rfocusMorph.test(bubbleType + type)) {
                cur = cur.parentNode;
              }
              for (; cur; cur = cur.parentNode) {
                eventPath.push(cur);
                tmp = cur;
              }
              if (tmp === (elem.ownerDocument || document2)) {
                eventPath.push(tmp.defaultView || tmp.parentWindow || window2);
              }
            }
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
              lastElement = cur;
              event.type = i > 1 ? bubbleType : special.bindType || type;
              handle = (dataPriv.get(cur, "events") || /* @__PURE__ */ Object.create(null))[event.type] && dataPriv.get(cur, "handle");
              if (handle) {
                handle.apply(cur, data);
              }
              handle = ontype && cur[ontype];
              if (handle && handle.apply && acceptData(cur)) {
                event.result = handle.apply(cur, data);
                if (event.result === false) {
                  event.preventDefault();
                }
              }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
              if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
                if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
                  tmp = elem[ontype];
                  if (tmp) {
                    elem[ontype] = null;
                  }
                  jQuery.event.triggered = type;
                  if (event.isPropagationStopped()) {
                    lastElement.addEventListener(type, stopPropagationCallback);
                  }
                  elem[type]();
                  if (event.isPropagationStopped()) {
                    lastElement.removeEventListener(type, stopPropagationCallback);
                  }
                  jQuery.event.triggered = void 0;
                  if (tmp) {
                    elem[ontype] = tmp;
                  }
                }
              }
            }
            return event.result;
          },
          // Piggyback on a donor event to simulate a different one
          // Used only for `focus(in | out)` events
          simulate: function(type, elem, event) {
            var e = jQuery.extend(
              new jQuery.Event(),
              event,
              {
                type,
                isSimulated: true
              }
            );
            jQuery.event.trigger(e, null, elem);
          }
        });
        jQuery.fn.extend({
          trigger: function(type, data) {
            return this.each(function() {
              jQuery.event.trigger(type, data, this);
            });
          },
          triggerHandler: function(type, data) {
            var elem = this[0];
            if (elem) {
              return jQuery.event.trigger(type, data, elem, true);
            }
          }
        });
        var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
        function buildParams(prefix, obj, traditional, add) {
          var name;
          if (Array.isArray(obj)) {
            jQuery.each(obj, function(i, v) {
              if (traditional || rbracket.test(prefix)) {
                add(prefix, v);
              } else {
                buildParams(
                  prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]",
                  v,
                  traditional,
                  add
                );
              }
            });
          } else if (!traditional && toType(obj) === "object") {
            for (name in obj) {
              buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }
          } else {
            add(prefix, obj);
          }
        }
        jQuery.param = function(a, traditional) {
          var prefix, s = [], add = function(key, valueOrFunction) {
            var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
          };
          if (a == null) {
            return "";
          }
          if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
            jQuery.each(a, function() {
              add(this.name, this.value);
            });
          } else {
            for (prefix in a) {
              buildParams(prefix, a[prefix], traditional, add);
            }
          }
          return s.join("&");
        };
        jQuery.fn.extend({
          serialize: function() {
            return jQuery.param(this.serializeArray());
          },
          serializeArray: function() {
            return this.map(function() {
              var elements = jQuery.prop(this, "elements");
              return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
              var type = this.type;
              return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(_i, elem) {
              var val = jQuery(this).val();
              if (val == null) {
                return null;
              }
              if (Array.isArray(val)) {
                return jQuery.map(val, function(val2) {
                  return { name: elem.name, value: val2.replace(rCRLF, "\r\n") };
                });
              }
              return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
            }).get();
          }
        });
        var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), originAnchor = document2.createElement("a");
        originAnchor.href = location.href;
        function addToPrefiltersOrTransports(structure) {
          return function(dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
              func = dataTypeExpression;
              dataTypeExpression = "*";
            }
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
            if (isFunction(func)) {
              while (dataType = dataTypes[i++]) {
                if (dataType[0] === "+") {
                  dataType = dataType.slice(1) || "*";
                  (structure[dataType] = structure[dataType] || []).unshift(func);
                } else {
                  (structure[dataType] = structure[dataType] || []).push(func);
                }
              }
            }
          };
        }
        function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
          var inspected = {}, seekingTransport = structure === transports;
          function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
              var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
              if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                options.dataTypes.unshift(dataTypeOrTransport);
                inspect(dataTypeOrTransport);
                return false;
              } else if (seekingTransport) {
                return !(selected = dataTypeOrTransport);
              }
            });
            return selected;
          }
          return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
        }
        function ajaxExtend(target, src) {
          var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
          for (key in src) {
            if (src[key] !== void 0) {
              (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
            }
          }
          if (deep) {
            jQuery.extend(true, target, deep);
          }
          return target;
        }
        function ajaxHandleResponses(s, jqXHR, responses) {
          var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
          while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === void 0) {
              ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
          }
          if (ct) {
            for (type in contents) {
              if (contents[type] && contents[type].test(ct)) {
                dataTypes.unshift(type);
                break;
              }
            }
          }
          if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
          } else {
            for (type in responses) {
              if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                finalDataType = type;
                break;
              }
              if (!firstDataType) {
                firstDataType = type;
              }
            }
            finalDataType = finalDataType || firstDataType;
          }
          if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
              dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
          }
        }
        function ajaxConvert(s, response, jqXHR, isSuccess) {
          var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
          if (dataTypes[1]) {
            for (conv in s.converters) {
              converters[conv.toLowerCase()] = s.converters[conv];
            }
          }
          current = dataTypes.shift();
          while (current) {
            if (s.responseFields[current]) {
              jqXHR[s.responseFields[current]] = response;
            }
            if (!prev && isSuccess && s.dataFilter) {
              response = s.dataFilter(response, s.dataType);
            }
            prev = current;
            current = dataTypes.shift();
            if (current) {
              if (current === "*") {
                current = prev;
              } else if (prev !== "*" && prev !== current) {
                conv = converters[prev + " " + current] || converters["* " + current];
                if (!conv) {
                  for (conv2 in converters) {
                    tmp = conv2.split(" ");
                    if (tmp[1] === current) {
                      conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                      if (conv) {
                        if (conv === true) {
                          conv = converters[conv2];
                        } else if (converters[conv2] !== true) {
                          current = tmp[0];
                          dataTypes.unshift(tmp[1]);
                        }
                        break;
                      }
                    }
                  }
                }
                if (conv !== true) {
                  if (conv && s.throws) {
                    response = conv(response);
                  } else {
                    try {
                      response = conv(response);
                    } catch (e) {
                      return {
                        state: "parsererror",
                        error: conv ? e : "No conversion from " + prev + " to " + current
                      };
                    }
                  }
                }
              }
            }
          }
          return { state: "success", data: response };
        }
        jQuery.extend({
          // Counter for holding the number of active queries
          active: 0,
          // Last-Modified header cache for next request
          lastModified: {},
          etag: {},
          ajaxSettings: {
            url: location.href,
            type: "GET",
            isLocal: rlocalProtocol.test(location.protocol),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            /*
            timeout: 0,
            data: null,
            dataType: null,
            username: null,
            password: null,
            cache: null,
            throws: false,
            traditional: false,
            headers: {},
            */
            accepts: {
              "*": allTypes,
              text: "text/plain",
              html: "text/html",
              xml: "application/xml, text/xml",
              json: "application/json, text/javascript"
            },
            contents: {
              xml: /\bxml\b/,
              html: /\bhtml/,
              json: /\bjson\b/
            },
            responseFields: {
              xml: "responseXML",
              text: "responseText",
              json: "responseJSON"
            },
            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {
              // Convert anything to text
              "* text": String,
              // Text to html (true = no transformation)
              "text html": true,
              // Evaluate text as a json expression
              "text json": JSON.parse,
              // Parse text as xml
              "text xml": jQuery.parseXML
            },
            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
              url: true,
              context: true
            }
          },
          // Creates a full fledged settings object into target
          // with both ajaxSettings and settings fields.
          // If target is omitted, writes into ajaxSettings.
          ajaxSetup: function(target, settings) {
            return settings ? (
              // Building a settings object
              ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings)
            ) : (
              // Extending ajaxSettings
              ajaxExtend(jQuery.ajaxSettings, target)
            );
          },
          ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
          ajaxTransport: addToPrefiltersOrTransports(transports),
          // Main method
          ajax: function(url, options) {
            if (typeof url === "object") {
              options = url;
              url = void 0;
            }
            options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed2, fireGlobals, i, uncached, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, strAbort = "canceled", jqXHR = {
              readyState: 0,
              // Builds headers hashtable if needed
              getResponseHeader: function(key) {
                var match;
                if (completed2) {
                  if (!responseHeaders) {
                    responseHeaders = {};
                    while (match = rheaders.exec(responseHeadersString)) {
                      responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
                    }
                  }
                  match = responseHeaders[key.toLowerCase() + " "];
                }
                return match == null ? null : match.join(", ");
              },
              // Raw string
              getAllResponseHeaders: function() {
                return completed2 ? responseHeadersString : null;
              },
              // Caches the header
              setRequestHeader: function(name, value) {
                if (completed2 == null) {
                  name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
                  requestHeaders[name] = value;
                }
                return this;
              },
              // Overrides response content-type header
              overrideMimeType: function(type) {
                if (completed2 == null) {
                  s.mimeType = type;
                }
                return this;
              },
              // Status-dependent callbacks
              statusCode: function(map) {
                var code;
                if (map) {
                  if (completed2) {
                    jqXHR.always(map[jqXHR.status]);
                  } else {
                    for (code in map) {
                      statusCode[code] = [statusCode[code], map[code]];
                    }
                  }
                }
                return this;
              },
              // Cancel the request
              abort: function(statusText) {
                var finalText = statusText || strAbort;
                if (transport) {
                  transport.abort(finalText);
                }
                done(0, finalText);
                return this;
              }
            };
            deferred.promise(jqXHR);
            s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");
            s.type = options.method || options.type || s.method || s.type;
            s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
            if (s.crossDomain == null) {
              urlAnchor = document2.createElement("a");
              try {
                urlAnchor.href = s.url;
                urlAnchor.href = urlAnchor.href;
                s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
              } catch (e) {
                s.crossDomain = true;
              }
            }
            if (s.data && s.processData && typeof s.data !== "string") {
              s.data = jQuery.param(s.data, s.traditional);
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (completed2) {
              return jqXHR;
            }
            fireGlobals = jQuery.event && s.global;
            if (fireGlobals && jQuery.active++ === 0) {
              jQuery.event.trigger("ajaxStart");
            }
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            cacheURL = s.url.replace(rhash, "");
            if (!s.hasContent) {
              uncached = s.url.slice(cacheURL.length);
              if (s.data && (s.processData || typeof s.data === "string")) {
                cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
                delete s.data;
              }
              if (s.cache === false) {
                cacheURL = cacheURL.replace(rantiCache, "$1");
                uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
              }
              s.url = cacheURL + uncached;
            } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
              s.data = s.data.replace(r20, "+");
            }
            if (s.ifModified) {
              if (jQuery.lastModified[cacheURL]) {
                jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
              }
              if (jQuery.etag[cacheURL]) {
                jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
              }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
              jqXHR.setRequestHeader("Content-Type", s.contentType);
            }
            jqXHR.setRequestHeader(
              "Accept",
              s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]
            );
            for (i in s.headers) {
              jqXHR.setRequestHeader(i, s.headers[i]);
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed2)) {
              return jqXHR.abort();
            }
            strAbort = "abort";
            completeDeferred.add(s.complete);
            jqXHR.done(s.success);
            jqXHR.fail(s.error);
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
              done(-1, "No Transport");
            } else {
              jqXHR.readyState = 1;
              if (fireGlobals) {
                globalEventContext.trigger("ajaxSend", [jqXHR, s]);
              }
              if (completed2) {
                return jqXHR;
              }
              if (s.async && s.timeout > 0) {
                timeoutTimer = window2.setTimeout(function() {
                  jqXHR.abort("timeout");
                }, s.timeout);
              }
              try {
                completed2 = false;
                transport.send(requestHeaders, done);
              } catch (e) {
                if (completed2) {
                  throw e;
                }
                done(-1, e);
              }
            }
            function done(status, nativeStatusText, responses, headers) {
              var isSuccess, success, error, response, modified, statusText = nativeStatusText;
              if (completed2) {
                return;
              }
              completed2 = true;
              if (timeoutTimer) {
                window2.clearTimeout(timeoutTimer);
              }
              transport = void 0;
              responseHeadersString = headers || "";
              jqXHR.readyState = status > 0 ? 4 : 0;
              isSuccess = status >= 200 && status < 300 || status === 304;
              if (responses) {
                response = ajaxHandleResponses(s, jqXHR, responses);
              }
              if (!isSuccess && jQuery.inArray("script", s.dataTypes) > -1 && jQuery.inArray("json", s.dataTypes) < 0) {
                s.converters["text script"] = function() {
                };
              }
              response = ajaxConvert(s, response, jqXHR, isSuccess);
              if (isSuccess) {
                if (s.ifModified) {
                  modified = jqXHR.getResponseHeader("Last-Modified");
                  if (modified) {
                    jQuery.lastModified[cacheURL] = modified;
                  }
                  modified = jqXHR.getResponseHeader("etag");
                  if (modified) {
                    jQuery.etag[cacheURL] = modified;
                  }
                }
                if (status === 204 || s.type === "HEAD") {
                  statusText = "nocontent";
                } else if (status === 304) {
                  statusText = "notmodified";
                } else {
                  statusText = response.state;
                  success = response.data;
                  error = response.error;
                  isSuccess = !error;
                }
              } else {
                error = statusText;
                if (status || !statusText) {
                  statusText = "error";
                  if (status < 0) {
                    status = 0;
                  }
                }
              }
              jqXHR.status = status;
              jqXHR.statusText = (nativeStatusText || statusText) + "";
              if (isSuccess) {
                deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
              } else {
                deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
              }
              jqXHR.statusCode(statusCode);
              statusCode = void 0;
              if (fireGlobals) {
                globalEventContext.trigger(
                  isSuccess ? "ajaxSuccess" : "ajaxError",
                  [jqXHR, s, isSuccess ? success : error]
                );
              }
              completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
              if (fireGlobals) {
                globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                if (!--jQuery.active) {
                  jQuery.event.trigger("ajaxStop");
                }
              }
            }
            return jqXHR;
          },
          getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
          },
          getScript: function(url, callback) {
            return jQuery.get(url, void 0, callback, "script");
          }
        });
        jQuery.each(["get", "post"], function(_i, method) {
          jQuery[method] = function(url, data, callback, type) {
            if (isFunction(data)) {
              type = type || callback;
              callback = data;
              data = void 0;
            }
            return jQuery.ajax(jQuery.extend({
              url,
              type: method,
              dataType: type,
              data,
              success: callback
            }, jQuery.isPlainObject(url) && url));
          };
        });
        jQuery.ajaxPrefilter(function(s) {
          var i;
          for (i in s.headers) {
            if (i.toLowerCase() === "content-type") {
              s.contentType = s.headers[i] || "";
            }
          }
        });
        jQuery._evalUrl = function(url, options, doc) {
          return jQuery.ajax({
            url,
            // Make this explicit, since user can override this through ajaxSetup (trac-11264)
            type: "GET",
            dataType: "script",
            cache: true,
            async: false,
            global: false,
            // Only evaluate the response if it is successful (gh-4126)
            // dataFilter is not invoked for failure responses, so using it instead
            // of the default converter is kludgy but it works.
            converters: {
              "text script": function() {
              }
            },
            dataFilter: function(response) {
              jQuery.globalEval(response, options, doc);
            }
          });
        };
        jQuery.fn.extend({
          wrapAll: function(html) {
            var wrap;
            if (this[0]) {
              if (isFunction(html)) {
                html = html.call(this[0]);
              }
              wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
              if (this[0].parentNode) {
                wrap.insertBefore(this[0]);
              }
              wrap.map(function() {
                var elem = this;
                while (elem.firstElementChild) {
                  elem = elem.firstElementChild;
                }
                return elem;
              }).append(this);
            }
            return this;
          },
          wrapInner: function(html) {
            if (isFunction(html)) {
              return this.each(function(i) {
                jQuery(this).wrapInner(html.call(this, i));
              });
            }
            return this.each(function() {
              var self = jQuery(this), contents = self.contents();
              if (contents.length) {
                contents.wrapAll(html);
              } else {
                self.append(html);
              }
            });
          },
          wrap: function(html) {
            var htmlIsFunction = isFunction(html);
            return this.each(function(i) {
              jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
            });
          },
          unwrap: function(selector) {
            this.parent(selector).not("body").each(function() {
              jQuery(this).replaceWith(this.childNodes);
            });
            return this;
          }
        });
        jQuery.expr.pseudos.hidden = function(elem) {
          return !jQuery.expr.pseudos.visible(elem);
        };
        jQuery.expr.pseudos.visible = function(elem) {
          return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
        };
        jQuery.ajaxSettings.xhr = function() {
          try {
            return new window2.XMLHttpRequest();
          } catch (e) {
          }
        };
        var xhrSuccessStatus = {
          // File protocol always yields status code 0, assume 200
          0: 200,
          // Support: IE <=9 only
          // trac-1450: sometimes IE returns 1223 when it should be 204
          1223: 204
        }, xhrSupported = jQuery.ajaxSettings.xhr();
        support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
        support.ajax = xhrSupported = !!xhrSupported;
        jQuery.ajaxTransport(function(options) {
          var callback, errorCallback;
          if (support.cors || xhrSupported && !options.crossDomain) {
            return {
              send: function(headers, complete) {
                var i, xhr = options.xhr();
                xhr.open(
                  options.type,
                  options.url,
                  options.async,
                  options.username,
                  options.password
                );
                if (options.xhrFields) {
                  for (i in options.xhrFields) {
                    xhr[i] = options.xhrFields[i];
                  }
                }
                if (options.mimeType && xhr.overrideMimeType) {
                  xhr.overrideMimeType(options.mimeType);
                }
                if (!options.crossDomain && !headers["X-Requested-With"]) {
                  headers["X-Requested-With"] = "XMLHttpRequest";
                }
                for (i in headers) {
                  xhr.setRequestHeader(i, headers[i]);
                }
                callback = function(type) {
                  return function() {
                    if (callback) {
                      callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
                      if (type === "abort") {
                        xhr.abort();
                      } else if (type === "error") {
                        if (typeof xhr.status !== "number") {
                          complete(0, "error");
                        } else {
                          complete(
                            // File: protocol always yields status 0; see trac-8605, trac-14207
                            xhr.status,
                            xhr.statusText
                          );
                        }
                      } else {
                        complete(
                          xhrSuccessStatus[xhr.status] || xhr.status,
                          xhr.statusText,
                          // Support: IE <=9 only
                          // IE9 has no XHR2 but throws on binary (trac-11426)
                          // For XHR2 non-text, let the caller handle it (gh-2498)
                          (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText },
                          xhr.getAllResponseHeaders()
                        );
                      }
                    }
                  };
                };
                xhr.onload = callback();
                errorCallback = xhr.onerror = xhr.ontimeout = callback("error");
                if (xhr.onabort !== void 0) {
                  xhr.onabort = errorCallback;
                } else {
                  xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                      window2.setTimeout(function() {
                        if (callback) {
                          errorCallback();
                        }
                      });
                    }
                  };
                }
                callback = callback("abort");
                try {
                  xhr.send(options.hasContent && options.data || null);
                } catch (e) {
                  if (callback) {
                    throw e;
                  }
                }
              },
              abort: function() {
                if (callback) {
                  callback();
                }
              }
            };
          }
        });
        jQuery.ajaxPrefilter(function(s) {
          if (s.crossDomain) {
            s.contents.script = false;
          }
        });
        jQuery.ajaxSetup({
          accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
          },
          contents: {
            script: /\b(?:java|ecma)script\b/
          },
          converters: {
            "text script": function(text) {
              jQuery.globalEval(text);
              return text;
            }
          }
        });
        jQuery.ajaxPrefilter("script", function(s) {
          if (s.cache === void 0) {
            s.cache = false;
          }
          if (s.crossDomain) {
            s.type = "GET";
          }
        });
        jQuery.ajaxTransport("script", function(s) {
          if (s.crossDomain || s.scriptAttrs) {
            var script, callback;
            return {
              send: function(_, complete) {
                script = jQuery("<script>").attr(s.scriptAttrs || {}).prop({ charset: s.scriptCharset, src: s.url }).on("load error", callback = function(evt) {
                  script.remove();
                  callback = null;
                  if (evt) {
                    complete(evt.type === "error" ? 404 : 200, evt.type);
                  }
                });
                document2.head.appendChild(script[0]);
              },
              abort: function() {
                if (callback) {
                  callback();
                }
              }
            };
          }
        });
        var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
        jQuery.ajaxSetup({
          jsonp: "callback",
          jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce.guid++;
            this[callback] = true;
            return callback;
          }
        });
        jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
          var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
          if (jsonProp || s.dataTypes[0] === "jsonp") {
            callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            if (jsonProp) {
              s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
              s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }
            s.converters["script json"] = function() {
              if (!responseContainer) {
                jQuery.error(callbackName + " was not called");
              }
              return responseContainer[0];
            };
            s.dataTypes[0] = "json";
            overwritten = window2[callbackName];
            window2[callbackName] = function() {
              responseContainer = arguments;
            };
            jqXHR.always(function() {
              if (overwritten === void 0) {
                jQuery(window2).removeProp(callbackName);
              } else {
                window2[callbackName] = overwritten;
              }
              if (s[callbackName]) {
                s.jsonpCallback = originalSettings.jsonpCallback;
                oldCallbacks.push(callbackName);
              }
              if (responseContainer && isFunction(overwritten)) {
                overwritten(responseContainer[0]);
              }
              responseContainer = overwritten = void 0;
            });
            return "script";
          }
        });
        support.createHTMLDocument = (function() {
          var body = document2.implementation.createHTMLDocument("").body;
          body.innerHTML = "<form></form><form></form>";
          return body.childNodes.length === 2;
        })();
        jQuery.parseHTML = function(data, context, keepScripts) {
          if (typeof data !== "string") {
            return [];
          }
          if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
          }
          var base, parsed, scripts;
          if (!context) {
            if (support.createHTMLDocument) {
              context = document2.implementation.createHTMLDocument("");
              base = context.createElement("base");
              base.href = document2.location.href;
              context.head.appendChild(base);
            } else {
              context = document2;
            }
          }
          parsed = rsingleTag.exec(data);
          scripts = !keepScripts && [];
          if (parsed) {
            return [context.createElement(parsed[1])];
          }
          parsed = buildFragment([data], context, scripts);
          if (scripts && scripts.length) {
            jQuery(scripts).remove();
          }
          return jQuery.merge([], parsed.childNodes);
        };
        jQuery.fn.load = function(url, params, callback) {
          var selector, type, response, self = this, off = url.indexOf(" ");
          if (off > -1) {
            selector = stripAndCollapse(url.slice(off));
            url = url.slice(0, off);
          }
          if (isFunction(params)) {
            callback = params;
            params = void 0;
          } else if (params && typeof params === "object") {
            type = "POST";
          }
          if (self.length > 0) {
            jQuery.ajax({
              url,
              // If "type" variable is undefined, then "GET" method will be used.
              // Make value of this field explicit since
              // user can override it through ajaxSetup method
              type: type || "GET",
              dataType: "html",
              data: params
            }).done(function(responseText) {
              response = arguments;
              self.html(selector ? (
                // If a selector was specified, locate the right elements in a dummy div
                // Exclude scripts to avoid IE 'Permission Denied' errors
                jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector)
              ) : (
                // Otherwise use the full result
                responseText
              ));
            }).always(callback && function(jqXHR, status) {
              self.each(function() {
                callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
              });
            });
          }
          return this;
        };
        jQuery.expr.pseudos.animated = function(elem) {
          return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
          }).length;
        };
        jQuery.offset = {
          setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            if (position === "static") {
              elem.style.position = "relative";
            }
            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem, "top");
            curCSSLeft = jQuery.css(elem, "left");
            calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
            if (calculatePosition) {
              curPosition = curElem.position();
              curTop = curPosition.top;
              curLeft = curPosition.left;
            } else {
              curTop = parseFloat(curCSSTop) || 0;
              curLeft = parseFloat(curCSSLeft) || 0;
            }
            if (isFunction(options)) {
              options = options.call(elem, i, jQuery.extend({}, curOffset));
            }
            if (options.top != null) {
              props.top = options.top - curOffset.top + curTop;
            }
            if (options.left != null) {
              props.left = options.left - curOffset.left + curLeft;
            }
            if ("using" in options) {
              options.using.call(elem, props);
            } else {
              curElem.css(props);
            }
          }
        };
        jQuery.fn.extend({
          // offset() relates an element's border box to the document origin
          offset: function(options) {
            if (arguments.length) {
              return options === void 0 ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i);
              });
            }
            var rect, win, elem = this[0];
            if (!elem) {
              return;
            }
            if (!elem.getClientRects().length) {
              return { top: 0, left: 0 };
            }
            rect = elem.getBoundingClientRect();
            win = elem.ownerDocument.defaultView;
            return {
              top: rect.top + win.pageYOffset,
              left: rect.left + win.pageXOffset
            };
          },
          // position() relates an element's margin box to its offset parent's padding box
          // This corresponds to the behavior of CSS absolute positioning
          position: function() {
            if (!this[0]) {
              return;
            }
            var offsetParent, offset, doc, elem = this[0], parentOffset = { top: 0, left: 0 };
            if (jQuery.css(elem, "position") === "fixed") {
              offset = elem.getBoundingClientRect();
            } else {
              offset = this.offset();
              doc = elem.ownerDocument;
              offsetParent = elem.offsetParent || doc.documentElement;
              while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery.css(offsetParent, "position") === "static") {
                offsetParent = offsetParent.parentNode;
              }
              if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
                parentOffset = jQuery(offsetParent).offset();
                parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
                parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
              }
            }
            return {
              top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
              left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            };
          },
          // This method will return documentElement in the following cases:
          // 1) For the element inside the iframe without offsetParent, this method will return
          //    documentElement of the parent window
          // 2) For the hidden or detached element
          // 3) For body or html element, i.e. in case of the html node - it will return itself
          //
          // but those exceptions were never presented as a real life use-cases
          // and might be considered as more preferable results.
          //
          // This logic, however, is not guaranteed and can change at any point in the future
          offsetParent: function() {
            return this.map(function() {
              var offsetParent = this.offsetParent;
              while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
                offsetParent = offsetParent.offsetParent;
              }
              return offsetParent || documentElement;
            });
          }
        });
        jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(method, prop) {
          var top = "pageYOffset" === prop;
          jQuery.fn[method] = function(val) {
            return access(this, function(elem, method2, val2) {
              var win;
              if (isWindow(elem)) {
                win = elem;
              } else if (elem.nodeType === 9) {
                win = elem.defaultView;
              }
              if (val2 === void 0) {
                return win ? win[prop] : elem[method2];
              }
              if (win) {
                win.scrollTo(
                  !top ? val2 : win.pageXOffset,
                  top ? val2 : win.pageYOffset
                );
              } else {
                elem[method2] = val2;
              }
            }, method, val, arguments.length);
          };
        });
        jQuery.each(["top", "left"], function(_i, prop) {
          jQuery.cssHooks[prop] = addGetHookIf(
            support.pixelPosition,
            function(elem, computed) {
              if (computed) {
                computed = curCSS(elem, prop);
                return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
              }
            }
          );
        });
        jQuery.each({ Height: "height", Width: "width" }, function(name, type) {
          jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
          }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
              var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
              return access(this, function(elem, type2, value2) {
                var doc;
                if (isWindow(elem)) {
                  return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
                }
                if (elem.nodeType === 9) {
                  doc = elem.documentElement;
                  return Math.max(
                    elem.body["scroll" + name],
                    doc["scroll" + name],
                    elem.body["offset" + name],
                    doc["offset" + name],
                    doc["client" + name]
                  );
                }
                return value2 === void 0 ? (
                  // Get width or height on the element, requesting but not forcing parseFloat
                  jQuery.css(elem, type2, extra)
                ) : (
                  // Set width or height on the element
                  jQuery.style(elem, type2, value2, extra)
                );
              }, type, chainable ? margin : void 0, chainable);
            };
          });
        });
        jQuery.each([
          "ajaxStart",
          "ajaxStop",
          "ajaxComplete",
          "ajaxError",
          "ajaxSuccess",
          "ajaxSend"
        ], function(_i, type) {
          jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
          };
        });
        jQuery.fn.extend({
          bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
          },
          unbind: function(types, fn) {
            return this.off(types, null, fn);
          },
          delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
          },
          undelegate: function(selector, types, fn) {
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
          },
          hover: function(fnOver, fnOut) {
            return this.on("mouseenter", fnOver).on("mouseleave", fnOut || fnOver);
          }
        });
        jQuery.each(
          "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),
          function(_i, name) {
            jQuery.fn[name] = function(data, fn) {
              return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
            };
          }
        );
        var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
        jQuery.proxy = function(fn, context) {
          var tmp, args, proxy;
          if (typeof context === "string") {
            tmp = fn[context];
            context = fn;
            fn = tmp;
          }
          if (!isFunction(fn)) {
            return void 0;
          }
          args = slice.call(arguments, 2);
          proxy = function() {
            return fn.apply(context || this, args.concat(slice.call(arguments)));
          };
          proxy.guid = fn.guid = fn.guid || jQuery.guid++;
          return proxy;
        };
        jQuery.holdReady = function(hold) {
          if (hold) {
            jQuery.readyWait++;
          } else {
            jQuery.ready(true);
          }
        };
        jQuery.isArray = Array.isArray;
        jQuery.parseJSON = JSON.parse;
        jQuery.nodeName = nodeName;
        jQuery.isFunction = isFunction;
        jQuery.isWindow = isWindow;
        jQuery.camelCase = camelCase;
        jQuery.type = toType;
        jQuery.now = Date.now;
        jQuery.isNumeric = function(obj) {
          var type = jQuery.type(obj);
          return (type === "number" || type === "string") && // parseFloat NaNs numeric-cast false positives ("")
          // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
          // subtraction forces infinities to NaN
          !isNaN(obj - parseFloat(obj));
        };
        jQuery.trim = function(text) {
          return text == null ? "" : (text + "").replace(rtrim, "$1");
        };
        if (typeof define === "function" && define.amd) {
          define("jquery", [], function() {
            return jQuery;
          });
        }
        var _jQuery = window2.jQuery, _$ = window2.$;
        jQuery.noConflict = function(deep) {
          if (window2.$ === jQuery) {
            window2.$ = _$;
          }
          if (deep && window2.jQuery === jQuery) {
            window2.jQuery = _jQuery;
          }
          return jQuery;
        };
        if (typeof noGlobal === "undefined") {
          window2.jQuery = window2.$ = jQuery;
        }
        return jQuery;
      });
    }
  });

  // src/tooltips.js
  var require_tooltips = __commonJS({
    "src/tooltips.js"(exports, module) {
      var _tree_node_tooltip;
      var _gene_tooltip;
      var _hog_header_tooltip;
      var tooltip2 = require_tnt6();
      var $ = require_jquery();
      var d32 = require_d3();
      module.exports = {
        tree_node_tooltip: {
          display: function(node, div, actions, frozen) {
            const obj = {};
            obj.header = node.node_name();
            obj.rows = [];
            if (!node.is_leaf() || node.is_collapsed()) {
              obj.rows.push({
                value: node.is_collapsed() ? "Expand node" : "Collapse node",
                link: function(n) {
                  _tree_node_tooltip.close();
                  actions.on_collapse(n);
                },
                obj: node
              });
            }
            if (!frozen) {
              obj.rows.push({
                value: "Freeze at this node",
                link: function() {
                  _tree_node_tooltip.close();
                  actions.on_freeze("freeze");
                }
              });
            }
            if (frozen && frozen !== node.id()) {
              obj.rows.push({
                value: "Unfreeze the tree",
                link: function() {
                  _tree_node_tooltip.close();
                  actions.on_freeze("unfreeze");
                }
              });
              obj.rows.push({
                value: "Re-freeze tree at this node",
                link: function() {
                  _tree_node_tooltip.close();
                  actions.on_freeze("refreeze");
                }
              });
            }
            if (frozen && frozen === node.id()) {
              obj.rows.push({
                value: "Unfreeze the tree",
                link: function(n) {
                  _tree_node_tooltip.close();
                  actions.on_freeze("unfreeze");
                },
                obj: node
              });
            }
            _tree_node_tooltip = tooltip2.list().width(120).id("node_click_tooltip").container(div).call(this, obj);
          },
          close: () => _tree_node_tooltip.close()
        },
        gene_tooltip: {
          display: function(gene, div, mouseover, show_oma_link) {
            const obj = {};
            obj.header = gene.gene.protid;
            function fetch_annots(gene_tooltip_obj, protid, mouseover2) {
              $.ajax({
                type: "get",
                url: "/api/protein/" + protid + "/gene_ontology/?format=json",
                dataType: "json",
                success: function(data) {
                  var seen = /* @__PURE__ */ new Set();
                  var go_annots = [];
                  $.each(data, function(i, item) {
                    if (!seen.has(item.GO_term)) {
                      go_annots.push({ id: item.GO_term, name: item.name });
                      seen.add(item.GO_term);
                    }
                  });
                  if (go_annots.length == 0) {
                    go_annots.push({ id: "N/A", name: "N/A" });
                  }
                  gene.gene.go_terms = go_annots;
                  var rect = gene_tooltip_obj.getBoundingClientRect();
                  var type_event = "click";
                  if (mouseover2) {
                    type_event = "mouseover";
                  }
                  var evt = new MouseEvent(type_event, { bubbles: true, clientX: rect.right, clientY: rect.bottom });
                  gene_tooltip_obj.dispatchEvent(evt);
                },
                error: function(request, status, errorThrown) {
                  gene.gene.go_terms = [{ id: "N/A", name: "N/A" }];
                  var rect = gene_tooltip_obj.getBoundingClientRect();
                  var type_event = "click";
                  if (mouseover2) {
                    type_event = "mouseover";
                  }
                  var evt = new MouseEvent(type_event, { bubbles: true, clientX: rect.right, clientY: rect.bottom });
                  gene_tooltip_obj.dispatchEvent(evt);
                }
              });
            }
            ;
            if (gene.gene.go_terms == "") {
              fetch_annots(this, gene.gene.protid, mouseover);
            }
            obj.rows = [];
            obj.rows.push({
              label: "Cross reference",
              value: show_oma_link ? '<a target="_blank" href="/oma/vps/' + gene.gene.xrefid + '/">' + gene.gene.xrefid + " </a>" : gene.gene.xrefid
            });
            obj.rows.push({ label: "GO Annotations" });
            $.each(gene.gene.go_terms, function(i, item) {
              obj.rows.push({ label: item.id, value: item.name });
            });
            _gene_tooltip = tooltip2.table().width(240).id("gene_tooltip").container(div);
            if (mouseover) {
              _gene_tooltip.show_closer(false);
              _gene_tooltip.id("gene_tooltip_mouseover");
            }
            _gene_tooltip.call(this, obj);
          },
          close: () => _gene_tooltip.close()
        },
        hog_header_tooltip: {
          display: function(hog, taxa_name, div, show_oma_link, remote_data, augmented_orthoxml) {
            const elem = this;
            const event = d32.event;
            function create_tooltip(hog2, header, hogid, level, with_links) {
              var obj = {};
              obj.header = header;
              obj.rows = [];
              obj.rows.push({
                value: hog2.genes.length + " " + (hog2.genes.length === 1 ? "gene" : "genes")
              });
              obj.rows.push({
                value: hog2.coverage.toFixed(2) + "% species represented"
              });
              if (show_oma_link && with_links) {
                obj.rows.push({
                  value: '<a href="/oma/hog/' + hogid + "/" + level + '/fasta" target="_blank">Sequences (Fasta)</a>'
                });
                obj.rows.push({ value: '<a href="/oma/hog/' + hogid + "/" + level + '/table/" target="_blank"> Show ' + header + " members</a>" });
                obj.rows.push({ value: '<a href="/oma/hog/' + hogid + "/" + level + '/iham/" target="_blank"> Set focal to ' + header + " </a>" });
                obj.rows.push({ value: '<a href="/oma/ancestralgenome/' + level + "/chromosome/?query=" + hogid + '" target="_blank"> Locate in chromosome viewer </a>' });
              }
              _hog_header_tooltip = tooltip2.list().width(180).id("hog_header_tooltip").container(div).call(elem, obj, event);
            }
            if (remote_data && augmented_orthoxml != true) {
              $.ajax({
                url: "/api/hog/" + hog.protid + "/members/?level=" + encodeURIComponent(taxa_name),
                dataType: "json",
                success: function(data) {
                  create_tooltip(hog, data.hog_id, encodeURIComponent(data.hog_id), encodeURIComponent(data.level), true);
                },
                error: function() {
                  create_tooltip(hog, hog.name, null, null, false);
                }
              });
            } else {
              create_tooltip(hog, hog.name, hog.name, encodeURIComponent(taxa_name), true);
            }
          },
          close: () => _hog_header_tooltip.close()
        }
      };
    }
  });

  // src/iHam.js
  var require_iHam = __commonJS({
    "src/iHam.js"(exports, module) {
      var apijs = require_tnt();
      var tnt2 = require_tntvis();
      var d32 = require_d3();
      var { get_maxs } = require_utils2();
      var hog_state = require_hog_state();
      var { hog_feature, hog_gene_feature, hog_group } = require_features();
      var { parse_orthoxml } = require_iham_parsers();
      var genes_2_xcoords = require_xcoords();
      var { gene_tooltip, tree_node_tooltip, hog_header_tooltip } = require_tooltips();
      function hogs_width(hog_state_obj) {
        let w = 0;
        (hog_state_obj.hogs || []).forEach((hog) => {
          w += hog.max_in_hog * 16;
        });
        return w;
      }
      function iHam() {
        const dispatch = d32.dispatch("node_selected", "hogs_removed", "click", "updating", "updated");
        const state = {
          highlight_condition: () => false
        };
        let genes_feature;
        let board;
        let tree;
        let iHamVis;
        let current_opened_taxa_name = "";
        let current_opened_node = null;
        let curr_node;
        let column_coverage_threshold = 0;
        let tree_width = 200;
        let board_width = 800;
        let gene_color;
        let update_nodes;
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
          label_height: 20
        };
        const theme = (div) => {
          const data = parse_orthoxml(config.newick, config.orthoxml, { augmented: config.augmented_orthoxml, query_hog: config.query_hog });
          const data_per_species = data.per_species;
          const tree_obj = data.tree;
          const fam_data_obj = {};
          var hog_metadata;
          if (config.augmented_orthoxml) {
            hog_metadata = data.hog_metadata;
          } else {
            hog_metadata = false;
          }
          var query_members;
          if (config.augmented_orthoxml) {
            query_members = data.query_members;
          } else {
            query_members = false;
          }
          config.fam_data.forEach((gene) => {
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
          d32.select(div).style("position", "relative");
          const maxs = get_maxs(data_per_species);
          const current_hog_state = new hog_state(maxs);
          const default_gene_color = (gene) => {
            if (config.query_gene && gene.id === config.query_gene.id) {
              return "#27ae60";
            }
            if (config.query_hog && query_members && query_members.indexOf(gene.id) !== -1) {
              return "#27ae60";
            }
            return "#95a5a6";
          };
          if (!gene_color) {
            gene_color = default_gene_color;
          }
          const collapsed_node = tnt2.tree.node_display.triangle().fill("grey").size(4);
          const leaf_node = tnt2.tree.node_display.circle().fill("#2c3e50").size(4);
          const int_node = tnt2.tree.node_display.circle().fill("#34495e").size(4);
          const highlight_node = tnt2.tree.node_display.circle().fill("#e74c3c").size(6);
          const node_display = tnt2.tree.node_display().display(function(node) {
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
          update_nodes = function(node) {
            dispatch.updating.call(this);
            if (config.frozen_node) {
              const removed_hogs2 = current_hog_state.reset_on(tree, data_per_species, current_opened_taxa_name, column_coverage_threshold, fam_data_obj, hog_metadata);
              dispatch.hogs_removed.call(this, removed_hogs2);
              board.width(hogs_width(current_hog_state));
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
            board.width(hogs_width(current_hog_state));
            board.update();
            state.highlight_condition = (n) => node.id() === n.id();
            tree.update_nodes();
            dispatch.updated.call(this);
            const collapsedIndexes = [];
            var i = 0;
            tree.root().get_all_leaves().forEach(function(leaf) {
              if (leaf.is_collapsed()) {
                collapsedIndexes.push(i);
              }
              i++;
            });
            const tracks = board.tracks();
            for (let i2 = 0; i2 < collapsedIndexes.length; i2++) {
              const track2 = tracks[collapsedIndexes[i2]];
              const g = track2.g;
              const g_node = g.node();
              g_node.parentNode.insertBefore(g_node, g_node.parentNode.firstChild.nextSibling);
            }
          };
          tree = tnt2.tree().data(tree_obj).layout(
            tnt2.tree.layout.vertical().width(tree_width).scale(false)
          ).label(
            tnt2.tree.label.text().fontsize(12).height(config.label_height).text((node) => {
              const limit = 30;
              const data2 = node.data();
              if (node.is_collapsed()) {
                if (data2.name.length > limit - 16) {
                  const truncName_col = data2.name.substr(0, limit - 19) + "...";
                  return `[Collapsed taxa] ${truncName_col.replace(/_/g, " ")}`;
                }
                return `[Collapsed taxa] ${data2.name}`;
              }
              if ((!config.show_internal_labels || !state.highlight_condition(node)) && data2.children && data2.children.length > 0) {
                return "";
              }
              if (data2.name.length > limit) {
                const truncName = data2.name.substr(0, limit - 3) + "...";
                return truncName.replace(/_/g, " ");
              }
              return data2.name.replace(/_/g, " ");
            }).color((node) => {
              if (node.is_collapsed()) {
                return "grey";
              }
              return "black";
            }).fontweight((node) => {
              if (state.highlight_condition(node)) {
                return "bold";
              }
              return "normal";
            })
          ).on("click", function(node) {
            tree_node_tooltip.display.call(
              this,
              node,
              div,
              {
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
                }
              },
              config.frozen_node
            );
          }).on("mouseover", function(node) {
            update_nodes.call(this, node);
          }).node_display(node_display).branch_color("black");
          current_opened_node = tree.root();
          current_opened_taxa_name = tree.root().node_name();
          var reopen = false;
          tree.root().get_all_nodes().forEach(function(node) {
            if (node.node_name() == config.start_opened_at) {
              current_opened_node = node;
              current_opened_taxa_name = node.node_name();
              reopen = node;
            }
          });
          current_hog_state.reset_on(tree, data_per_species, current_opened_taxa_name, column_coverage_threshold, fam_data_obj, hog_metadata);
          const w = hogs_width(current_hog_state);
          board = tnt2.board().from(0).zoom_in(1).allow_drag(false).to(2).width(w);
          genes_feature = hog_gene_feature().colors(gene_color);
          function track(leaf) {
            const sp = leaf.node_name();
            return tnt2.board.track().color("#FFF").data(
              tnt2.board.track.data.sync().retriever(() => {
                if (leaf.is_collapsed()) {
                  const random_collapse_leaf_name = leaf.get_all_leaves(true)[0].node_name();
                  if (data_per_species[random_collapse_leaf_name] !== void 0) {
                    const genes2Xcoords = genes_2_xcoords(data_per_species[random_collapse_leaf_name][current_opened_taxa_name], maxs[current_opened_taxa_name], current_hog_state, fam_data_obj, false);
                    genes2Xcoords.genes = [];
                    return genes2Xcoords;
                  }
                }
                if (data_per_species[sp] === void 0) {
                  return {
                    genes: [],
                    hogs: [],
                    hog_groups: []
                  };
                }
                const all_leaves = current_opened_node.get_all_leaves();
                let first_node_with_data;
                for (var i = 0; i < all_leaves.length; i++) {
                  const leaf2 = all_leaves[i];
                  if (leaf2.is_collapsed()) {
                    continue;
                  }
                  first_node_with_data = leaf2;
                  break;
                }
                let is_first = false;
                if (first_node_with_data) {
                  is_first = first_node_with_data.node_name() === leaf.node_name();
                }
                const g2c = genes_2_xcoords(data_per_species[sp][current_opened_taxa_name], maxs[current_opened_taxa_name], current_hog_state, fam_data_obj, is_first);
                return g2c;
              })
            ).display(
              tnt2.board.track.feature.composite().add(
                "genes",
                genes_feature.on("click", function(gene) {
                  if (config.gene_tooltips_on === "click") {
                    gene_tooltip.display.call(this, gene, div, false, config.show_oma_link);
                  }
                }).on("mouseover", function(gene) {
                  if (config.gene_tooltips_on === "mouseover") {
                    gene_tooltip.display.call(this, gene, div, true, config.show_oma_link);
                  }
                }).on("mouseout", function() {
                  if (config.gene_tooltips_on === "mouseover") {
                    gene_tooltip.close();
                  }
                })
              ).add("hogs", hog_feature).add(
                "hog_groups",
                hog_group.on("click", function(hog) {
                  hog_header_tooltip.display.call(this, hog, current_opened_taxa_name, div, config.show_oma_link, config.remote_data, config.augmented_orthoxml);
                })
              )
            );
          }
          iHamVis = tnt2().tree(tree).board(board).track(track);
          iHamVis(div);
          d32.select(".tnt_pane").style("fill", "#FFFFFF");
          if (reopen != false) {
            update_nodes.call(this, reopen);
          }
        };
        apijs(theme).getset(config);
        function set_widths() {
          if (board) {
            board.width(board_width).update();
            d32.select("#tnt_tree_container_hogvis_container").style("width", board_width);
          }
          if (tree) {
            tree.layout().width(tree_width);
            tree.update();
          }
          if (board) {
            board.update();
          }
        }
        theme.board_width = function(w) {
          if (!arguments.length) {
            return board_width;
          }
          board_width = w;
          set_widths();
          return this;
        };
        theme.tree_width = function(w) {
          if (!arguments.length) {
            return tree_width;
          }
          tree_width = w;
          set_widths();
          return this;
        };
        theme.gene_colors = function(cb) {
          if (!arguments.length) {
            return gene_color;
          }
          gene_color = cb;
          if (genes_feature) {
            genes_feature.colors(cb);
            board.width(board_width);
            board.update();
          }
          return this;
        };
        theme.coverage_threshold = function(min) {
          if (!arguments.length) {
            return column_coverage_threshold;
          }
          column_coverage_threshold = min;
          if (update_nodes) {
            update_nodes(curr_node || current_opened_node);
          }
          return this;
        };
        return d32.rebind(theme, dispatch, "on");
      }
      module.exports = iHam;
    }
  });

  // index.js
  var require_index = __commonJS({
    "index.js"(exports, module) {
      module.exports = require_iHam();
    }
  });

  // browser.js
  var require_browser = __commonJS({
    "browser.js"(exports, module) {
      window.d3 = require_d3();
      module.exports = require_index();
    }
  });
  return require_browser();
})();
/*! Bundled license information:

sax/lib/sax.js:
  (*! http://mths.be/fromcodepoint v0.1.0 by @mathias *)

jquery/dist/jquery.js:
  (*!
   * jQuery JavaScript Library v3.7.1
   * https://jquery.com/
   *
   * Copyright OpenJS Foundation and other contributors
   * Released under the MIT license
   * https://jquery.org/license
   *
   * Date: 2023-08-28T13:37Z
   *)
*/
