// node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function e(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var t = {}, n = [], r = () => {}, i = () => !1, a = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), o = (e) => e.startsWith("onUpdate:"), s = Object.assign, c = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, l = Object.prototype.hasOwnProperty, u = (e, t) => l.call(e, t), d = Array.isArray, f = (e) => x(e) === "[object Map]", p = (e) => x(e) === "[object Set]", m = (e) => x(e) === "[object Date]", h = (e) => typeof e == "function", g = (e) => typeof e == "string", _ = (e) => typeof e == "symbol", v = (e) => typeof e == "object" && !!e, y = (e) => (v(e) || h(e)) && h(e.then) && h(e.catch), b = Object.prototype.toString, x = (e) => b.call(e), S = (e) => x(e).slice(8, -1), C = (e) => x(e) === "[object Object]", w = (e) => g(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, T = /* @__PURE__ */ e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), E = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, ee = /-\w/g, D = /* @__PURE__ */ E((e) => e.replace(ee, (e) => e.slice(1).toUpperCase())), te = /\B([A-Z])/g, O = /* @__PURE__ */ E((e) => e.replace(te, "-$1").toLowerCase()), ne = /* @__PURE__ */ E((e) => e.charAt(0).toUpperCase() + e.slice(1)), re = /* @__PURE__ */ E((e) => e ? `on${ne(e)}` : ""), k = (e, t) => !Object.is(e, t), ie = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, A = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, ae = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, oe = (e) => {
	let t = g(e) ? Number(e) : NaN;
	return isNaN(t) ? e : t;
}, se, ce = () => se ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function le(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = g(r) ? pe(r) : le(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	}
	if (g(e) || v(e)) return e;
}
var ue = /;(?![^(]*\))/g, de = /:([^]+)/, fe = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function pe(e) {
	let t = {};
	return e.replace(fe, (e) => e.startsWith("/*") ? "" : e).split(ue).forEach((e) => {
		if (e) {
			let n = e.split(de);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function j(e) {
	let t = "";
	if (g(e)) t = e;
	else if (d(e)) for (let n = 0; n < e.length; n++) {
		let r = j(e[n]);
		r && (t += r + " ");
	}
	else if (v(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
function me(e) {
	if (!e) return null;
	let { class: t, style: n } = e;
	return t && !g(t) && (e.class = j(t)), n && (e.style = le(n)), e;
}
var he = /* @__PURE__ */ e("itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly");
function ge(e) {
	return !!e || e === "";
}
function _e(e, t, n) {
	if (e.length !== t.length) return !1;
	let r = !0;
	for (let i = 0; r && i < e.length; i++) r = xe(e[i], t[i], n);
	return r;
}
function ve(e, t, n) {
	if (e.size !== t.size) return !1;
	let r = Array.from(t), i = new Uint8Array(r.length);
	for (let t of e) {
		let e = -1;
		for (let a = 0; a < r.length; a++) if (!i[a] && xe(t, r[a], n)) {
			e = a;
			break;
		}
		if (e < 0) return !1;
		i[e] = 1;
	}
	return !0;
}
function ye(e, t, n) {
	let r = f(e), i = f(t);
	if (r || i || (r = p(e), i = p(t), r || i)) return r && i ? ve(e, t, n) : !1;
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let r in e) {
		let i = e.hasOwnProperty(r), a = t.hasOwnProperty(r);
		if (i && !a || !i && a || !xe(e[r], t[r], n)) return !1;
	}
	return String(e) === String(t);
}
function be(e, t, n, r) {
	n ||= [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
	let [i, a] = n;
	if (i.has(e) || a.has(t)) return i.get(e) === t && a.get(t) === e;
	i.set(e, t), a.set(t, e);
	let o = r(e, t, n);
	return i.delete(e), a.delete(t), o;
}
function xe(e, t, n) {
	if (e === t) return !0;
	let r = m(e), i = m(t);
	return r || i ? r && i ? e.getTime() === t.getTime() : !1 : (r = _(e), i = _(t), r || i ? e === t : (r = d(e), i = d(t), r || i ? r && i ? be(e, t, n, _e) : !1 : (r = v(e), i = v(t), r || i ? !r || !i ? !1 : be(e, t, n, ye) : String(e) === String(t))));
}
var Se = (e) => !!(e && e.__v_isRef === !0), M = (e) => g(e) ? e : e == null ? "" : d(e) || v(e) && (e.toString === b || !h(e.toString)) ? Se(e) ? M(e.value) : JSON.stringify(e, Ce, 2) : String(e), Ce = (e, t) => Se(t) ? Ce(e, t.value) : f(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[we(t, r) + " =>"] = n, e), {}) } : p(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => we(e)) } : _(t) ? we(t) : v(t) && !d(t) && !C(t) ? String(t) : t, we = (e, t = "") => _(e) ? `Symbol(${e.description ?? t})` : e, N, Te = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && N && (N.active ? (this.parent = N, this.index = (N.scopes || (N.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].pause();
			}
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].resume();
			}
			let n = this.effects.slice();
			for (e = 0, t = n.length; e < t; e++) n[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = N;
			try {
				return N = this, e();
			} finally {
				N = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = N, N = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (N === this) N = this.prevScope;
			else {
				let e = N;
				for (; e;) {
					if (e.prevScope === this) {
						e.prevScope = this.prevScope;
						break;
					}
					e = e.prevScope;
				}
			}
			this.prevScope = void 0;
		}
	}
	stop(e) {
		if (this._active) {
			this._active = !1;
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				let e = this.scopes.slice();
				for (t = 0, n = e.length; t < n; t++) e[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function Ee() {
	return N;
}
var P, De = /* @__PURE__ */ new WeakSet(), Oe = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, N && (N.active ? N.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, De.has(this) && (De.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Me(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, Ge(this), Fe(this);
		let e = P, t = Ve;
		P = this, Ve = !0;
		try {
			return this.fn();
		} finally {
			Ie(this), P = e, Ve = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) ze(e);
			this.deps = this.depsTail = void 0, Ge(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? De.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Le(this) && this.run();
	}
	get dirty() {
		return Le(this);
	}
}, ke = 0, Ae, je;
function Me(e, t = !1) {
	e.flags |= 8, t ? (e.next = je, je = e) : (e.next = Ae, Ae = e);
}
function Ne() {
	ke++;
}
function Pe() {
	if (--ke > 0) return;
	if (je) {
		let e = je;
		for (je = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; Ae;) {
		let t = Ae;
		for (Ae = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function Fe(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ie(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), ze(r), Be(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Le(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Re(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Re(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ke) || (e.globalVersion = Ke, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Le(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = P, r = Ve;
	P = e, Ve = !0;
	try {
		Fe(e);
		let n = e.fn(e._value);
		(t.version === 0 || k(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		P = n, Ve = r, Ie(e), e.flags &= -3;
	}
}
function ze(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) ze(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Be(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var Ve = !0, He = [];
function Ue() {
	He.push(Ve), Ve = !1;
}
function We() {
	let e = He.pop();
	Ve = e === void 0 || e;
}
function Ge(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = P;
		P = void 0;
		try {
			t();
		} finally {
			P = e;
		}
	}
}
var Ke = 0, qe = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, Je = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!P || !Ve || P === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== P) t = this.activeLink = new qe(P, this), P.deps ? (t.prevDep = P.depsTail, P.depsTail.nextDep = t, P.depsTail = t) : P.deps = P.depsTail = t, Ye(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = P.depsTail, t.nextDep = void 0, P.depsTail.nextDep = t, P.depsTail = t, P.deps === t && (P.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, Ke++, this.notify(e);
	}
	notify(e) {
		Ne();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Pe();
		}
	}
};
function Ye(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) Ye(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var Xe = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ Symbol(""), Qe = /* @__PURE__ */ Symbol(""), $e = /* @__PURE__ */ Symbol("");
function F(e, t, n) {
	if (Ve && P) {
		let t = Xe.get(e);
		t || Xe.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new Je()), r.map = t, r.key = n), r.track();
	}
}
function et(e, t, n, r, i, a) {
	let o = Xe.get(e);
	if (!o) {
		Ke++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (Ne(), t === "clear") o.forEach(s);
	else {
		let i = d(e), a = i && w(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === $e || !_(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get($e)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(Ze)), f(e) && s(o.get(Qe)));
				break;
			case "delete":
				i || (s(o.get(Ze)), f(e) && s(o.get(Qe)));
				break;
			case "set": f(e) && s(o.get(Ze));
		}
	}
	Pe();
}
function tt(e, t) {
	let n = Xe.get(e);
	return n && n.get(t);
}
function nt(e) {
	let t = /* @__PURE__ */ I(e);
	return t === e || (F(t, "iterate", $e), /* @__PURE__ */ Ht(e)) ? t : /* @__PURE__ */ Vt(e) ? /* @__PURE__ */ Bt(e) ? t.map((e) => Kt(Gt(e))) : t.map(Kt) : t.map(Gt);
}
function rt(e) {
	return F(e = /* @__PURE__ */ I(e), "iterate", $e), e;
}
function it(e, t) {
	return /* @__PURE__ */ Vt(e) ? Kt(/* @__PURE__ */ Bt(e) ? Gt(t) : t) : Gt(t);
}
var at = {
	__proto__: null,
	[Symbol.iterator]() {
		return ot(this, Symbol.iterator, (e) => it(this, e));
	},
	concat(...e) {
		return nt(this).concat(...e.map((e) => d(e) ? nt(e) : e));
	},
	entries() {
		return ot(this, "entries", (e) => (e[1] = it(this, e[1]), e));
	},
	every(e, t) {
		return lt(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return lt(this, "filter", e, t, (e) => e.map((e) => it(this, e)), arguments);
	},
	find(e, t) {
		return lt(this, "find", e, t, (e) => it(this, e), arguments);
	},
	findIndex(e, t) {
		return lt(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return lt(this, "findLast", e, t, (e) => it(this, e), arguments);
	},
	findLastIndex(e, t) {
		return lt(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return lt(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return dt(this, "includes", e);
	},
	indexOf(...e) {
		return dt(this, "indexOf", e);
	},
	join(e) {
		return nt(this).join(e);
	},
	lastIndexOf(...e) {
		return dt(this, "lastIndexOf", e);
	},
	map(e, t) {
		return lt(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return ft(this, "pop");
	},
	push(...e) {
		return ft(this, "push", e);
	},
	reduce(e, ...t) {
		return ut(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return ut(this, "reduceRight", e, t);
	},
	shift() {
		return ft(this, "shift");
	},
	some(e, t) {
		return lt(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return ft(this, "splice", e);
	},
	toReversed() {
		return nt(this).toReversed();
	},
	toSorted(e) {
		return nt(this).toSorted(e);
	},
	toSpliced(...e) {
		return nt(this).toSpliced(...e);
	},
	unshift(...e) {
		return ft(this, "unshift", e);
	},
	values() {
		return ot(this, "values", (e) => it(this, e));
	}
};
function ot(e, t, n) {
	let r = rt(e), i = r[t], a = i.call(r);
	if (r !== e && !/* @__PURE__ */ Ht(e)) {
		if (a[Symbol.toStringTag] === "Array Iterator") {
			let e = Object.create(Object.getPrototypeOf(a));
			return e.next = () => st(a.next(), n), i !== ct[t] && Object.defineProperties(e, {
				return: { get() {
					let e = a.return;
					return typeof e == "function" ? e.bind(a) : e;
				} },
				throw: { get() {
					let e = a.throw;
					return typeof e == "function" ? e.bind(a) : e;
				} }
			}), e;
		}
		a._next = a.next, a.next = () => st(a._next(), n);
	}
	return a;
}
function st(e, t) {
	return e.done || (e.value = t(e.value)), e;
}
var ct = Array.prototype;
function lt(e, t, n, r, i, a) {
	let o = rt(e), s = o !== e && !/* @__PURE__ */ Ht(e), c = o[t];
	if (c !== ct[t]) {
		let t = c.apply(e, a);
		return s ? Gt(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, it(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function ut(e, t, n, r) {
	let i = rt(e), a = i !== e && !/* @__PURE__ */ Ht(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = it(e, t)), n.call(this, t, it(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? it(e, c) : c;
}
function dt(e, t, n) {
	let r = /* @__PURE__ */ I(e);
	F(r, "iterate", $e);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Ut(n[0]) ? (n[0] = /* @__PURE__ */ I(n[0]), r[t](...n)) : i;
}
function ft(e, t, n = []) {
	Ue(), Ne();
	let r = (/* @__PURE__ */ I(e))[t].apply(e, n);
	return Pe(), We(), r;
}
var pt = /* @__PURE__ */ e("__proto__,__v_isRef,__isVue"), mt = /* @__PURE__ */ new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(_));
function ht(e) {
	_(e) || (e = String(e));
	let t = /* @__PURE__ */ I(this);
	return F(t, "has", e), t.hasOwnProperty(e);
}
var gt = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? Pt : Nt : i ? Mt : jt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = d(e);
		if (!r) {
			let e;
			if (a && (e = at[t])) return e;
			if (t === "hasOwnProperty") return ht;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ L(e) ? e : n);
		if ((_(t) ? mt.has(t) : pt(t)) || (r || F(e, "get", t), i)) return o;
		if (/* @__PURE__ */ L(o)) {
			let e = a && w(t) ? o : o.value;
			return r && v(e) ? /* @__PURE__ */ Rt(e) : e;
		}
		return v(o) ? r ? /* @__PURE__ */ Rt(o) : /* @__PURE__ */ It(o) : o;
	}
}, _t = class extends gt {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = d(e) && w(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Vt(i);
			if (!/* @__PURE__ */ Ht(n) && !/* @__PURE__ */ Vt(n) && (i = /* @__PURE__ */ I(i), n = /* @__PURE__ */ I(n)), !a && /* @__PURE__ */ L(i) && !/* @__PURE__ */ L(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : u(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ L(e) ? e : r);
		return e === /* @__PURE__ */ I(r) && s && (o ? k(n, i) && et(e, "set", t, n, i) : et(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = u(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && et(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return _(t) && mt.has(t) || F(e, "has", t), n;
	}
	ownKeys(e) {
		return F(e, "iterate", d(e) ? "length" : Ze), Reflect.ownKeys(e);
	}
}, vt = class extends gt {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, yt = /* @__PURE__ */ new _t(), bt = /* @__PURE__ */ new vt(), xt = /* @__PURE__ */ new _t(!0), St = (e) => e, Ct = (e) => Reflect.getPrototypeOf(e);
function wt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ I(i), o = f(a), c = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...r), d = n ? St : t ? Kt : Gt;
		return !t && F(a, "iterate", l ? Qe : Ze), s(Object.create(u), { next() {
			let { value: e, done: t } = u.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: c ? [d(e[0]), d(e[1])] : d(e),
				done: t
			};
		} });
	};
}
function Tt(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function Et(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ I(r), a = /* @__PURE__ */ I(n);
			e || (k(n, a) && F(i, "get", n), F(i, "get", a));
			let { has: o } = Ct(i), s = t ? St : e ? Kt : Gt;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && F(/* @__PURE__ */ I(t), "iterate", Ze), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ I(n), i = /* @__PURE__ */ I(t);
			return e || (k(t, i) && F(r, "has", t), F(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ I(a), s = t ? St : e ? Kt : Gt;
			return !e && F(o, "iterate", Ze), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return s(n, e ? {
		add: Tt("add"),
		set: Tt("set"),
		delete: Tt("delete"),
		clear: Tt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ I(this), r = Ct(n), i = /* @__PURE__ */ I(e), a = !t && !/* @__PURE__ */ Ht(e) && !/* @__PURE__ */ Vt(e) ? i : e;
			return r.has.call(n, a) || k(e, a) && r.has.call(n, e) || k(i, a) && r.has.call(n, i) || (n.add(a), et(n, "add", a, a)), this;
		},
		set(e, n) {
			t || /* @__PURE__ */ Ht(n) || /* @__PURE__ */ Vt(n) || (n = /* @__PURE__ */ I(n));
			let r = /* @__PURE__ */ I(this), { has: i, get: a } = Ct(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ I(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? k(n, s) && et(r, "set", e, n, s) : et(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ I(this), { has: n, get: r } = Ct(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ I(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && et(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ I(this), t = e.size !== 0, n = e.clear();
			return t && et(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = wt(r, e, t);
	}), n;
}
function Dt(e, t) {
	let n = Et(e, t);
	return (r, i, a) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? r : Reflect.get(u(n, i) && i in r ? n : r, i, a);
}
var Ot = { get: /* @__PURE__ */ Dt(!1, !1) }, kt = { get: /* @__PURE__ */ Dt(!1, !0) }, At = { get: /* @__PURE__ */ Dt(!0, !1) }, jt = /* @__PURE__ */ new WeakMap(), Mt = /* @__PURE__ */ new WeakMap(), Nt = /* @__PURE__ */ new WeakMap(), Pt = /* @__PURE__ */ new WeakMap();
function Ft(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function It(e) {
	return /* @__PURE__ */ Vt(e) ? e : zt(e, !1, yt, Ot, jt);
}
// @__NO_SIDE_EFFECTS__
function Lt(e) {
	return zt(e, !1, xt, kt, Mt);
}
// @__NO_SIDE_EFFECTS__
function Rt(e) {
	return zt(e, !0, bt, At, Nt);
}
function zt(e, t, n, r, i) {
	if (!v(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = Ft(S(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function Bt(e) {
	return /* @__PURE__ */ Vt(e) ? /* @__PURE__ */ Bt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Vt(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ht(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Ut(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function I(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ I(t) : e;
}
function Wt(e) {
	return !u(e, "__v_skip") && Object.isExtensible(e) && A(e, "__v_skip", !0), e;
}
var Gt = (e) => v(e) ? /* @__PURE__ */ It(e) : e, Kt = (e) => v(e) ? /* @__PURE__ */ Rt(e) : e;
// @__NO_SIDE_EFFECTS__
function L(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function R(e) {
	return Jt(e, !1);
}
// @__NO_SIDE_EFFECTS__
function qt(e) {
	return Jt(e, !0);
}
function Jt(e, t) {
	return /* @__PURE__ */ L(e) ? e : new Yt(e, t);
}
var Yt = class {
	constructor(e, t) {
		this.dep = new Je(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ I(e), this._value = t ? e : Gt(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Ht(e) || /* @__PURE__ */ Vt(e);
		e = n ? e : /* @__PURE__ */ I(e), k(e, t) && (this._rawValue = e, this._value = n ? e : Gt(e), this.dep.trigger());
	}
};
function z(e) {
	return /* @__PURE__ */ L(e) ? e.value : e;
}
var Xt = {
	get: (e, t, n) => t === "__v_raw" ? e : z(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ L(i) && !/* @__PURE__ */ L(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function Zt(e) {
	return /* @__PURE__ */ Bt(e) ? e : new Proxy(e, Xt);
}
var Qt = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = _(t) ? t : String(t), this._raw = /* @__PURE__ */ I(e);
		let r = !0, i = e;
		if (!d(e) || _(this._key) || !w(this._key)) do
			r = !/* @__PURE__ */ Ut(i) || /* @__PURE__ */ Ht(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = z(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ L(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ L(t)) {
				t.value = e;
				return;
			}
		}
		this._object[this._key] = e;
	}
	get dep() {
		return tt(this._raw, this._key);
	}
}, $t = class {
	constructor(e) {
		this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
	}
	get value() {
		return this._value = this._getter();
	}
};
// @__NO_SIDE_EFFECTS__
function en(e, t, n) {
	return /* @__PURE__ */ L(e) ? e : h(e) ? new $t(e) : v(e) && arguments.length > 1 ? tn(e, t, n) : /* @__PURE__ */ R(e);
}
function tn(e, t, n) {
	return new Qt(e, t, n);
}
var nn = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new Je(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ke - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && P !== this) return Me(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Re(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function rn(e, t, n = !1) {
	let r, i;
	return h(e) ? r = e : (r = e.get, i = e.set), new nn(r, i, n);
}
var an = {}, on = /* @__PURE__ */ new WeakMap(), sn = void 0;
function cn(e, t = !1, n = sn) {
	if (n) {
		let t = on.get(n);
		t || on.set(n, t = []), t.push(e);
	}
}
function ln(e, n, i = t) {
	let { immediate: a, deep: o, once: s, scheduler: l, augmentJob: u, call: f } = i, p = (e) => o ? e : /* @__PURE__ */ Ht(e) || o === !1 || o === 0 ? un(e, 1) : un(e), m, g, _, v, y = !1, b = !1;
	if (/* @__PURE__ */ L(e) ? (g = () => e.value, y = /* @__PURE__ */ Ht(e)) : /* @__PURE__ */ Bt(e) ? (g = () => p(e), y = !0) : d(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ Bt(e) || /* @__PURE__ */ Ht(e)), g = () => e.map((e) => {
		if (/* @__PURE__ */ L(e)) return e.value;
		if (/* @__PURE__ */ Bt(e)) return p(e);
		if (h(e)) return f ? f(e, 2) : e();
	})) : g = h(e) ? n ? f ? () => f(e, 2) : e : () => {
		if (_) {
			Ue();
			try {
				_();
			} finally {
				We();
			}
		}
		let t = sn;
		sn = m;
		try {
			return f ? f(e, 3, [v]) : e(v);
		} finally {
			sn = t;
		}
	} : r, n && o) {
		let e = g, t = o === !0 ? Infinity : o;
		g = () => un(e(), t);
	}
	let x = Ee(), S = () => {
		m.stop(), x && x.active && c(x.effects, m);
	};
	if (s && n) {
		let e = n;
		n = (...t) => {
			try {
				return e(...t);
			} finally {
				S();
			}
		};
	}
	let C = b ? Array(e.length).fill(an) : an, w = (e) => {
		if (m.flags & 1 && (m.dirty || e)) {
			if (n) {
				let t = m.run();
				if (e || o || y || (b ? t.some((e, t) => k(e, C[t])) : k(t, C))) {
					let e = sn;
					Ue();
					try {
						_ && _(), sn = m;
						let e = [
							t,
							C === an ? void 0 : b && C[0] === an ? [] : C,
							v
						];
						C = t, f ? f(n, 3, e) : n(...e);
					} finally {
						sn = e, We();
					}
				}
			} else m.run();
		}
	};
	return u && u(w), m = new Oe(g), m.scheduler = l ? () => l(w, !1) : w, v = (e) => cn(e, !1, m), _ = m.onStop = () => {
		let e = on.get(m);
		if (e) {
			if (f) f(e, 4);
			else for (let t of e) t();
			on.delete(m);
		}
	}, n ? a ? w(!0) : C = m.run() : l ? l(w.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function un(e, t = Infinity, n) {
	if (t <= 0 || !v(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ L(e)) un(e.value, t, n);
	else if (d(e)) for (let r = 0; r < e.length; r++) un(e[r], t, n);
	else if (p(e) || f(e)) e.forEach((e) => {
		un(e, t, n);
	});
	else if (C(e)) {
		for (let r in e) un(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && un(e[r], t, n);
	}
	return e;
}
// node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function dn(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		pn(e, t, n);
	}
}
function fn(e, t, n, r) {
	if (h(e)) {
		let i = dn(e, t, n, r);
		return i && y(i) && i.catch((e) => {
			pn(e, t, n, void 0, !0);
		}), i;
	}
	if (d(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(fn(e[a], t, n, r));
		return i;
	}
}
function pn(e, n, r, i = !0, a = !1) {
	let o = n ? n.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: c } = n && n.appContext.config || t;
	if (n) {
		let t = n.parent, i = n.proxy, o = `https://vuejs.org/error-reference/#runtime-${r}`;
		for (; t;) {
			let n = t.ec;
			if (n && !t.isUnmounted && (!a || t.scope.active)) {
				for (let t = 0; t < n.length; t++) if (n[t](e, i, o) === !1) return;
			}
			t = t.parent;
		}
		if (s) {
			Ue(), dn(s, null, 10, [
				e,
				i,
				o
			]), We();
			return;
		}
	}
	mn(e, r, o, i, c);
}
function mn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var B = [], hn = -1, gn = [], _n = null, vn = 0, yn = /* @__PURE__ */ Promise.resolve(), bn = null;
function xn(e) {
	let t = bn || yn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function Sn(e) {
	let t = hn + 1, n = B.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = B[r], a = An(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function Cn(e) {
	if (!(e.flags & 1)) {
		let t = An(e), n = B[B.length - 1];
		!n || !(e.flags & 2) && t >= An(n) ? B.push(e) : B.splice(Sn(t), 0, e), e.flags |= 1, wn();
	}
}
function wn() {
	bn ||= yn.then(jn);
}
function Tn(e) {
	if (!d(e)) _n && e.id === -1 ? _n.splice(vn + 1, 0, e) : e.flags & 1 || (gn.push(e), e.flags |= 1);
	else for (let t = 0; t < e.length; t++) gn.push(e[t]);
	wn();
}
function En(e, t, n, r = hn + 1) {
	for (; r < B.length; r++) {
		let n = B[r];
		if (n && n.flags & 2) {
			if (e && n.id !== e.uid || t !== void 0 && !(n.id >= t)) continue;
			B.splice(r, 1), r = e ? r - 1 : hn, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
		}
	}
}
function Dn(e, t, n = 0) {
	if (gn.length) {
		let e = gn, r = 0;
		if (t) {
			e = [];
			for (let i = 0; i < gn.length; i++) {
				let a = gn[i];
				(a.i === void 0 ? t.has(a) : !a.i || a.i.uid < n) ? gn[r++] = a : e.push(a);
			}
		}
		let i = [...new Set(e)].sort((e, t) => An(e) - An(t));
		if (gn.length = r, _n) {
			for (let e = 0; e < i.length; e++) _n.push(i[e]);
			return;
		}
		for (_n = i, vn = 0; vn < _n.length; vn++) {
			let e = _n[vn];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		_n = null, vn = 0;
	}
}
var On = !1;
function kn(e, t) {
	if (On) {
		e();
		return;
	}
	let n = t === void 0 ? void 0 : new Set(gn);
	e(), On = !0;
	try {
		En(void 0, t), Dn(void 0, n, t);
	} finally {
		On = !1;
	}
}
var An = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function jn(e) {
	try {
		for (hn = 0; hn < B.length; hn++) {
			let e = B[hn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), dn(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; hn < B.length; hn++) {
			let e = B[hn];
			e && (e.flags &= -2);
		}
		hn = -1, B.length = 0, Dn(e), bn = null, (B.length || gn.length) && jn(e);
	}
}
var V = null, Mn = null;
function Nn(e) {
	let t = V;
	return V = e, Mn = e && e.type.__scopeId || null, t;
}
function Pn(e, t = V, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && Gi(-1);
		let i = Nn(t), a = Vi.length, o;
		try {
			o = e(...n);
		} finally {
			for (let e = Vi.length; e > a; e--) Ui();
			Nn(i), r._d && Gi(1);
		}
		return o;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function Fn(e, t, n, r) {
	let i = e;
	if (r === "beforeMount") e._mount = e;
	else if (r === "beforeUpdate") {
		let n = t && t._mount;
		n && (n._latest = e, e._mount = n);
	} else if (r === "mounted") {
		let t = e._latest;
		e._mount = e._latest = void 0, t && (i = t, t._mount = void 0);
	}
	let a = i.dirs, o = t && t.dirs;
	for (let c = 0; c < a.length; c++) {
		let l = a[c];
		o ? l.oldValue = o[c].value : r === "mounted" && l.oldValue !== void 0 && (l = s({}, l, { oldValue: void 0 }));
		let u = l.dir[r];
		u && (Ue(), fn(u, n, 8, [
			e.el,
			l,
			i,
			t
		]), We());
	}
}
function In(e, t) {
	if (Z) {
		let n = Z.provides, r = Z.parent && Z.parent.provides;
		r === n && (n = Z.provides = Object.create(r)), n[e] = t;
	}
}
function Ln(e, t, n = !1) {
	let r = da();
	if (r || qr) {
		let i = qr ? qr._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && h(t) ? t.call(r && r.proxy) : t;
	}
}
var Rn = /* @__PURE__ */ Symbol.for("v-scx"), zn = () => Ln(Rn);
function H(e, t, n) {
	return Bn(e, t, n);
}
function Bn(e, n, i = t) {
	let { immediate: a, deep: o, flush: c, once: l } = i, u = s({}, i), d = n && a || !n && c !== "post", f;
	if (_a) {
		if (c === "sync") {
			let e = zn();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = r, e.resume = r, e.pause = r, e;
		}
	}
	let p = Z;
	u.call = (e, t, n) => fn(e, p, t, n);
	let m = !1;
	c === "post" ? u.scheduler = (e) => {
		e.i = p, W(e, p && p.suspense);
	} : c !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : Cn(e);
	}), u.augmentJob = (e) => {
		n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = ln(e, n, u);
	return _a && (f ? f.push(h) : d && h()), h;
}
function Vn(e, t, n) {
	let r = this.proxy, i = g(e) ? e.includes(".") ? Hn(r, e) : () => r[e] : e.bind(r, r), a;
	h(t) ? a = t : (a = t.handler, n = t);
	let o = ma(this), s = Bn(i, a.bind(r), n);
	return o(), s;
}
function Hn(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Un = /* @__PURE__ */ Symbol("_vte"), Wn = (e) => e.__isTeleport, Gn = /* @__PURE__ */ Symbol("_leaveCb");
function Kn(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== zi) {
			t = n;
			break;
		}
	}
	return t;
}
function qn(e) {
	if (!ir(e)) return Wn(e.type) && e.children ? Kn(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && h(n.default)) return n.default();
	}
}
function Jn(e, t) {
	if (e.shapeFlag & 6 && e.component) {
		e.transition = t;
		let n = e.component.subTree;
		Jn(Wn(n.type) && qn(n) || n, t);
	} else if (e.shapeFlag & 128) {
		let n = e.suspense;
		if (n) {
			let e = n.isHydrating ? n.pendingBranch : n.activeBranch;
			e && Jn(e, t.clone(e));
		} else e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
	} else if (e.transition = t, e.type === G && d(e.children)) {
		let n = ei(e.children, !1);
		n && Jn(n, t);
	}
}
function Yn(e) {
	if (e.component) return Yn(e.component.subTree);
	if (e.type === G) {
		let t = d(e.children) && ei(e.children, !1);
		return t ? Yn(t) : void 0;
	}
	if (e.type !== zi) return e;
}
// @__NO_SIDE_EFFECTS__
function Xn(e, t) {
	return h(e) ? /* @__PURE__ */ s({ name: e.name }, t, { setup: e }) : e;
}
function Zn() {
	let e = da();
	return e ? (e.appContext.config.idPrefix || "v") + "-" + e.ids[0] + e.ids[1]++ : "";
}
function Qn(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function $n(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var er = /* @__PURE__ */ new WeakMap();
function tr(e, n, r, a, o = !1) {
	if (d(e)) {
		e.forEach((e, t) => tr(e, n && (d(n) ? n[t] : n), r, a, o));
		return;
	}
	if (rr(a) && !o) {
		a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && tr(e, n, r, a.component.subTree);
		return;
	}
	let s = a.shapeFlag & 4 ? Ta(a.component) : a.el, l = o ? null : s, { i: f, r: p } = e, m = n && n.r, _ = f.refs === t ? f.refs = {} : f.refs, v = f.setupState, y = /* @__PURE__ */ I(v), b = v === t ? i : (e) => !$n(_, e) && u(y, e), x = (e, t) => !(t && $n(_, t));
	if (m != null && m !== p) {
		if (nr(n), g(m)) _[m] = null, b(m) && (v[m] = null);
		else if (/* @__PURE__ */ L(m)) {
			let e = n;
			x(m, e.k) && (m.value = null), e.k && (_[e.k] = null);
		}
	}
	if (h(p)) dn(p, f, 12, [l, _]);
	else {
		let t = g(p), n = /* @__PURE__ */ L(p);
		if (t || n) {
			let i = () => {
				if (e.f) {
					let n = t ? b(p) ? v[p] : _[p] : x(p) || !e.k ? p.value : _[e.k];
					if (o) d(n) && c(n, s);
					else if (d(n)) n.includes(s) || n.push(s);
					else if (t) _[p] = [s], b(p) && (v[p] = _[p]);
					else {
						let t = [s];
						x(p, e.k) && (p.value = t), e.k && (_[e.k] = t);
					}
				} else t ? (_[p] = l, b(p) && (v[p] = l)) : n && (x(p, e.k) && (p.value = l), e.k && (_[e.k] = l));
			};
			if (l) {
				let t = () => {
					i(), er.delete(e);
				};
				t.id = -1, er.set(e, t), W(t, r);
			} else nr(e), i();
		}
	}
}
function nr(e) {
	let t = er.get(e);
	t && (t.flags |= 8, er.delete(e));
}
ce().requestIdleCallback, ce().cancelIdleCallback;
var rr = (e) => !!e.type.__asyncLoader, ir = (e) => e.type.__isKeepAlive;
function ar(e, t) {
	sr(e, "a", t);
}
function or(e, t) {
	sr(e, "da", t);
}
function sr(e, t, n = Z) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (lr(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) ir(e.parent.vnode) && cr(r, t, n, e), e = e.parent;
	}
}
function cr(e, t, n, r) {
	let i = lr(t, e, r, !0), a = lr("um", () => c(r[t], i), n);
	a.flags = 16;
}
function lr(e, t, n = Z, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			Ue();
			let i = ma(n), a = fn(t, n, e, r);
			return i(), We(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var ur = (e) => (t, n = Z) => {
	_a && e !== "sp" || lr(e, (...e) => t(...e), n);
}, dr = ur("bm"), fr = ur("m"), pr = ur("bu"), mr = ur("u"), hr = ur("bum"), gr = ur("um"), _r = ur("sp"), vr = ur("rtg"), yr = ur("rtc");
function br(e, t = Z) {
	lr("ec", e, t);
}
var xr = /* @__PURE__ */ Symbol.for("v-ndc");
function Sr(e, t, n, r) {
	let i, a = n && n[r], o = d(e);
	if (o || g(e)) {
		let n = o && /* @__PURE__ */ Bt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ Ht(e), s = /* @__PURE__ */ Vt(e), e = rt(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? Kt(Gt(e[n])) : Gt(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		if (!Number.isInteger(e) || e < 0) i = [];
		else {
			i = Array(e);
			for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
		}
	} else if (v(e)) {
		if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
		else {
			let n = Object.keys(e);
			i = Array(n.length);
			for (let r = 0, o = n.length; r < o; r++) {
				let o = n[r];
				i[r] = t(e[o], o, r, a && a[r]);
			}
		}
	} else i = [];
	return n && (n[r] = i), i;
}
function Cr(e, t, n, r, i, a) {
	if (n ??= {}, V.ce || V.parent && rr(V.parent) && V.parent.ce) {
		let e = a != null && n.key == null ? s({}, n, { key: a }) : n, i = Object.keys(e).length > 0;
		return t !== "default" && (e.name = t), K(), qi(G, null, [Y("slot", e, r && r())], i ? -2 : 64);
	}
	let o = e[t];
	o && o._c && (o._d = !1);
	let c = Vi.length;
	K();
	let l;
	try {
		let i = o && wr(o(n)), s = n.key || a || i && i.key;
		l = qi(G, { key: (s && !_(s) ? s : `_${t}`) + (!i && r ? "_fb" : "") }, i || (r ? r() : []), i && e._ === 1 ? 64 : -2);
	} catch (e) {
		for (let e = Vi.length; e > c; e--) Ui();
		throw e;
	} finally {
		o && o._c && (o._d = !0);
	}
	return !i && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), l;
}
function wr(e) {
	return e.some((e) => !Ji(e) || !(e.type === zi || e.type === G && !wr(e.children))) ? e : null;
}
var Tr = (e) => e ? ga(e) ? Ta(e) : Tr(e.parent) : null, Er = /* @__PURE__ */ s(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => Tr(e.parent),
	$root: (e) => Tr(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Fr(e),
	$forceUpdate: (e) => e.f ||= () => {
		Cn(e.update);
	},
	$nextTick: (e) => e.n ||= xn.bind(e.proxy),
	$watch: (e) => Vn.bind(e)
}), Dr = (e, n) => e !== t && !e.__isScriptSetup && u(e, n), Or = {
	get({ _: e }, n) {
		if (n === "__v_skip") return !0;
		let { ctx: r, setupState: i, data: a, props: o, accessCache: s, type: c, appContext: l } = e;
		if (n[0] !== "$") {
			let e = s[n];
			if (e !== void 0) switch (e) {
				case 1: return i[n];
				case 2: return a[n];
				case 4: return r[n];
				case 3: return o[n];
			}
			else if (Dr(i, n)) return s[n] = 1, i[n];
			else if (a !== t && u(a, n)) return s[n] = 2, a[n];
			else if (u(o, n)) return s[n] = 3, o[n];
			else if (r !== t && u(r, n)) return s[n] = 4, r[n];
			else Ar && (s[n] = 0);
		}
		let d = Er[n], f, p;
		if (d) return n === "$attrs" && F(e.attrs, "get", ""), d(e);
		if ((f = c.__cssModules) && (f = f[n])) return f;
		if (r !== t && u(r, n)) return s[n] = 4, r[n];
		if (p = l.config.globalProperties, u(p, n)) return p[n];
	},
	set({ _: e }, n, r) {
		let { data: i, setupState: a, ctx: o } = e;
		return Dr(a, n) ? (a[n] = r, !0) : i !== t && u(i, n) ? (i[n] = r, !0) : u(e.props, n) || n[0] === "$" && n.slice(1) in e ? !1 : (o[n] = r, !0);
	},
	has({ _: { data: e, setupState: n, accessCache: r, ctx: i, appContext: a, props: o, type: s } }, c) {
		let l;
		return !!(r[c] || e !== t && c[0] !== "$" && u(e, c) || Dr(n, c) || u(o, c) || u(i, c) || u(Er, c) || u(a.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? u(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function kr(e) {
	return d(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
var Ar = !0;
function jr(e) {
	let t = Fr(e), n = e.proxy, i = e.ctx;
	Ar = !1, t.beforeCreate && Nr(t.beforeCreate, e, "bc");
	let { data: a, computed: o, methods: s, watch: c, provide: l, inject: u, created: f, beforeMount: p, mounted: m, beforeUpdate: g, updated: _, activated: y, deactivated: b, beforeDestroy: x, beforeUnmount: S, destroyed: C, unmounted: w, render: T, renderTracked: E, renderTriggered: ee, errorCaptured: D, serverPrefetch: te, expose: O, inheritAttrs: ne, components: re, directives: k, filters: ie } = t;
	if (u && Mr(u, i, null), s) for (let e in s) {
		let t = s[e];
		h(t) && (i[e] = t.bind(n));
	}
	if (a) {
		let t = a.call(n, n);
		v(t) && (e.data = /* @__PURE__ */ It(t));
	}
	if (Ar = !0, o) for (let e in o) {
		let t = o[e], a = Q({
			get: h(t) ? t.bind(n, n) : h(t.get) ? t.get.bind(n, n) : r,
			set: !h(t) && h(t.set) ? t.set.bind(n) : r
		});
		Object.defineProperty(i, e, {
			enumerable: !0,
			configurable: !0,
			get: () => a.value,
			set: (e) => a.value = e
		});
	}
	if (c) for (let e in c) Pr(c[e], i, n, e);
	if (l) {
		let e = h(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			In(t, e[t]);
		});
	}
	f && Nr(f, e, "c");
	function A(e, t) {
		d(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (A(dr, p), A(fr, m), A(pr, g), A(mr, _), A(ar, y), A(or, b), A(br, D), A(yr, E), A(vr, ee), A(hr, S), A(gr, w), A(_r, te), d(O)) {
		if (O.length) {
			let t = e.exposed ||= {};
			O.forEach((e) => {
				Object.defineProperty(t, e, {
					get: () => n[e],
					set: (t) => n[e] = t,
					enumerable: !0
				});
			});
		} else e.exposed ||= {};
	}
	T && e.render === r && (e.render = T), ne != null && (e.inheritAttrs = ne), re && (e.components = re), k && (e.directives = k), te && Qn(e);
}
function Mr(e, t, n = r) {
	d(e) && (e = Br(e));
	for (let n in e) {
		let r = e[n], i;
		i = v(r) ? "default" in r ? Ln(r.from || n, r.default, !0) : Ln(r.from || n) : Ln(r), /* @__PURE__ */ L(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function Nr(e, t, n) {
	fn(d(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Pr(e, t, n, r) {
	let i = r.includes(".") ? Hn(n, r) : () => n[r];
	if (g(e)) {
		let n = t[e];
		h(n) && H(i, n);
	} else if (h(e)) H(i, e.bind(n));
	else if (v(e)) {
		if (d(e)) e.forEach((e) => Pr(e, t, n, r));
		else {
			let r = h(e.handler) ? e.handler.bind(n) : t[e.handler];
			h(r) && H(i, r, e);
		}
	}
}
function Fr(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Ir(c, e, o, !0)), Ir(c, t, o)), v(t) && a.set(t, c), c;
}
function Ir(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Ir(e, a, n, !0), i && i.forEach((t) => Ir(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Lr[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Lr = {
	data: Rr,
	props: Hr,
	emits: Hr,
	methods: Vr,
	computed: Vr,
	beforeCreate: U,
	created: U,
	beforeMount: U,
	mounted: U,
	beforeUpdate: U,
	updated: U,
	beforeDestroy: U,
	beforeUnmount: U,
	destroyed: U,
	unmounted: U,
	activated: U,
	deactivated: U,
	errorCaptured: U,
	serverPrefetch: U,
	components: Vr,
	directives: Vr,
	watch: Ur,
	provide: Rr,
	inject: zr
};
function Rr(e, t) {
	return t ? e ? function() {
		return s(h(e) ? e.call(this, this) : e, h(t) ? t.call(this, this) : t);
	} : t : e;
}
function zr(e, t) {
	return Vr(Br(e), Br(t));
}
function Br(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function U(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function Vr(e, t) {
	return e ? s(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Hr(e, t) {
	return e ? d(e) && d(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : s(/* @__PURE__ */ Object.create(null), kr(e), kr(t ?? {})) : t;
}
function Ur(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = s(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = U(e[r], t[r]);
	return n;
}
function Wr() {
	return {
		app: null,
		config: {
			isNativeTag: i,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var Gr = 0;
function Kr(e, t) {
	return function(n, r = null) {
		h(n) || (n = s({}, n)), r != null && !v(r) && (r = null);
		let i = Wr(), a = /* @__PURE__ */ new WeakSet(), o = [], c = !1, l = i.app = {
			_uid: Gr++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Da,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && h(e.install) ? (a.add(e), e.install(l, ...t)) : h(e) && (a.add(e), e(l, ...t))), l;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), l;
			},
			component(e, t) {
				return t ? (i.components[e] = t, l) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, l) : i.directives[e];
			},
			mount(a, o, s) {
				if (!c) {
					let u = l._ceVNode || Y(n, r);
					return u.appContext = i, s === !0 ? s = "svg" : s === !1 && (s = void 0), o && t ? t(u, a) : e(u, a, s), c = !0, l._container = a, a.__vue_app__ = l, Ta(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				c && (fn(o, l._instance, 16), e(null, l._container), delete l._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, l;
			},
			runWithContext(e) {
				let t = qr;
				qr = l;
				try {
					return e();
				} finally {
					qr = t;
				}
			}
		};
		return l;
	};
}
var qr = null, Jr = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${D(t)}Modifiers`] || e[`${O(t)}Modifiers`];
function Yr(e, n, ...r) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || t, a = r, o = n.startsWith("update:"), s = o && Jr(i, n.slice(7));
	s && (s.trim && (a = r.map((e) => g(e) ? e.trim() : e)), s.number && (a = a.map(ae)));
	let c, l = i[c = re(n)] || i[c = re(D(n))];
	!l && o && (l = i[c = re(O(n))]), l && fn(l, e, 6, a);
	let u = i[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, fn(u, e, 6, a);
	}
}
var Xr = /* @__PURE__ */ new WeakMap();
function Zr(e, t, n = !1) {
	let r = n ? Xr : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, c = !1;
	if (!h(e)) {
		let r = (e) => {
			let n = Zr(e, t, !0);
			n && (c = !0, s(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !c ? (v(e) && r.set(e, null), null) : (d(a) ? a.forEach((e) => o[e] = null) : s(o, a), v(e) && r.set(e, o), o);
}
function Qr(e, t) {
	return !e || !a(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, O(t)) || u(e, t));
}
function $r(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: s, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = Nn(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = na(u.call(t, e, d, f, m, p, h)), y = c;
		} else {
			let e = t;
			v = na(e.length > 1 ? e(f, {
				attrs: c,
				slots: s,
				emit: l
			}) : e(f, null)), y = t.props ? c : ti(c);
		}
	} catch (t) {
		Vi.length = 0, pn(t, e, 1), v = Y(zi);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(o) && (y = ni(y, a)), b = ea(b, y, !1, !0));
	}
	return n.dirs && (b = ea(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && Jn(Wn(b.type) && qn(b) || b, n.transition), v = b, Nn(_), v;
}
function ei(e, t = !0) {
	let n;
	for (let t = 0; t < e.length; t++) {
		let r = e[t];
		if (Ji(r)) {
			if (r.type !== zi || r.children === "v-if") {
				if (n) return;
				n = r;
			}
		} else return;
	}
	return n;
}
var ti = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || a(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, ni = (e, t) => {
	let n = {};
	for (let r in e) o(r) && r.slice(9) in t || (n[r] = e[r]);
	return n;
};
function ri(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? ii(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (ai(o, r, n) && !Qr(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? !o || ii(r, o, l) : !!o;
	return !1;
}
function ii(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (!u(e, a) || ai(t, e, a) && !Qr(n, a)) return !0;
	}
	return !1;
}
function ai(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && v(r) && v(i) ? !xe(r, i) : r !== i;
}
function oi({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var si = {}, ci = () => Object.create(si), li = (e) => Object.getPrototypeOf(e) === si;
function ui(e, t, n, r = !1) {
	let i = {}, a = ci();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), fi(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	e.props = n ? r ? i : /* @__PURE__ */ Lt(i) : e.type.props ? i : a, e.attrs = a;
}
function di(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ I(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (Qr(e.emitsOptions, o)) continue;
				let d = t[o];
				if (c) {
					if (u(a, o)) d !== a[o] && (a[o] = d, l = !0);
					else {
						let t = D(o);
						i[t] = pi(c, s, t, d, e, !1);
					}
				} else d !== a[o] && (a[o] = d, l = !0);
			}
		}
	} else {
		fi(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) t && (u(t, a) || (r = O(a)) !== a && u(t, r)) || (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = pi(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) t && u(t, e) || (delete a[e], l = !0);
	}
	l && et(e.attrs, "set", "");
}
function fi(e, n, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (n) for (let t in n) {
		if (T(t)) continue;
		let l = n[t], d;
		a && u(a, d = D(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : Qr(e.emitsOptions, t) || t in i && l === i[t] || (i[t] = l, s = !0);
	}
	if (o) {
		let n = /* @__PURE__ */ I(r), i = c || t;
		for (let t = 0; t < o.length; t++) {
			let s = o[t];
			r[s] = pi(a, n, s, i[s], e, !u(i, s));
		}
	}
	return s;
}
function pi(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = u(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && h(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = ma(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === O(n)) && (r = !0));
	}
	return r;
}
var mi = /* @__PURE__ */ new WeakMap();
function hi(e, r, i = !1) {
	let a = i ? mi : r.propsCache, o = a.get(e);
	if (o) return o;
	let c = e.props, l = {}, f = [], p = !1;
	if (!h(e)) {
		let t = (e) => {
			p = !0;
			let [t, n] = hi(e, r, !0);
			s(l, t), n && f.push(...n);
		};
		!i && r.mixins.length && r.mixins.forEach(t), e.extends && t(e.extends), e.mixins && e.mixins.forEach(t);
	}
	if (!c && !p) return v(e) && a.set(e, n), n;
	if (d(c)) for (let e = 0; e < c.length; e++) {
		let n = D(c[e]);
		gi(n) && (l[n] = t);
	}
	else if (c) for (let e in c) {
		let t = D(e);
		if (gi(t)) {
			let n = c[e], r = l[t] = d(n) || h(n) ? { type: n } : s({}, n), i = r.type, a = !1, o = !0;
			if (d(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = h(t) && t.name;
				if (n === "Boolean") {
					a = !0;
					break;
				}
				n === "String" && (o = !1);
			}
			else a = h(i) && i.name === "Boolean";
			r[0] = a, r[1] = o, (a || u(r, "default")) && f.push(t);
		}
	}
	let m = [l, f];
	return v(e) && a.set(e, m), m;
}
function gi(e) {
	return e[0] !== "$" && !T(e);
}
var _i = (e) => e === "_" || e === "_ctx" || e === "$stable", vi = (e) => d(e) ? e.map(na) : [na(e)], yi = (e, t, n) => {
	if (t._n) return t;
	let r = Pn((...e) => vi(t(...e)), n);
	return r._c = !1, r;
}, bi = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (_i(n)) continue;
		let i = e[n];
		if (h(i)) t[n] = yi(n, i, r);
		else if (i != null) {
			let e = vi(i);
			t[n] = () => e;
		}
	}
}, xi = (e, t) => {
	let n = vi(t);
	e.slots.default = () => n;
}, Si = (e, t, n) => {
	for (let r in t) (n || !_i(r)) && (e[r] = t[r]);
}, Ci = (e, t, n) => {
	let r = e.slots = ci();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Si(r, t, n), n && A(r, "_", e, !0)) : bi(t, r);
	} else t && xi(e, t);
}, wi = (e, n, r) => {
	let { vnode: i, slots: a } = e, o = !0, s = t;
	if (i.shapeFlag & 32) {
		let e = n._;
		e ? r && e === 1 ? o = !1 : Si(a, n, r) : (o = !n.$stable, bi(n, a)), s = n;
	} else n && (xi(e, n), s = { default: 1 });
	if (o) for (let e in a) !_i(e) && s[e] == null && delete a[e];
}, W = Li;
function Ti(e) {
	return Ei(e);
}
function Ei(e, i) {
	let a = ce();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = r, insertStaticContent: _ } = e, v = (e, t, r, i = null, a = null, o = null, s = void 0, c = null, l = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !Yi(e, t) && (i = _e(e), pe(e, a, o, !0), e = null), t.patchFlag === -2 && (l = !1, t.dynamicChildren = null), t.dynamicChildren && e && e.dynamicChildren && e.dynamicChildren.hasOnce && (t.dynamicChildren === n && (t.dynamicChildren = []), t.dynamicChildren.hasOnce = !0);
		let { type: u, ref: d, shapeFlag: f } = t;
		switch (u) {
			case Ri:
				y(e, t, r, i);
				break;
			case zi:
				b(e, t, r, i);
				break;
			case Bi:
				e ?? x(t, r, i, s);
				break;
			case G:
				re(e, t, r, i, a, o, s, c, l);
				break;
			default: f & 1 ? w(e, t, r, i, a, o, s, c, l) : f & 6 ? k(e, t, r, i, a, o, s, c, l) : (f & 64 || f & 128) && u.process(e, t, r, i, a, o, s, c, l, ye);
		}
		d != null && a ? tr(d, e && e.ref, o, t || e, !t) : d == null && e && e.ref != null && tr(e.ref, null, o, e, !0);
	}, y = (e, t, n, r) => {
		if (e == null) o(t.el = u(t.children), n, r);
		else {
			let n = t.el = e.el;
			t.children !== e.children && f(n, t.children);
		}
	}, b = (e, t, n, r) => {
		e == null ? o(t.el = d(t.children || ""), n, r) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, r) => {
		let i;
		for (; e && e !== t;) i = h(e), o(e, n, r), e = i;
		o(t, n, r);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) E(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), te(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, E = (e, t, n, r, i, a, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && D(e.children, d, null, r, i, Di(e, a), s, u), _ && Fn(e, null, r, "created"), ee(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !T(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && oa(f, r, e);
		}
		_ && Fn(e, null, r, "beforeMount");
		let v = ki(i, g);
		v ? g.beforeEnter(d) : g && !g.persisted && (d[Ii] = !0), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && W(() => {
			try {
				f && oa(f, r, e), v && g.enter(d), _ && Fn(e, null, r, "mounted");
			} finally {}
		}, i);
	}, ee = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Fi(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				ee(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, D = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) {
			let c = e[l] = s ? ra(e[l]) : na(e[l]);
			v(null, c, t, n, r, i, a, o, s);
		}
	}, te = (e, n, r, i, a, o, s) => {
		let l = n.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = n;
		u |= e.patchFlag & 16;
		let m = e.props || t, h = n.props || t, g;
		if (r && Oi(r, !1), (g = h.onVnodeBeforeUpdate) && oa(g, r, n, e), f && Fn(n, e, r, "beforeUpdate"), r && Oi(r, !0), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (u = 0, s = !1, d = null), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? O(e.dynamicChildren, d, l, r, i, Di(n, a), o) : s || le(e, n, l, null, r, i, Di(n, a), o, !1), u > 0) {
			if (u & 16) ne(l, m, h, r, a);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, a), u & 4 && c(l, "style", m.style, h.style, a), u & 8) {
				let e = n.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let n = e[t], i = m[n], o = h[n];
					(o !== i || n === "value") && c(l, n, i, o, a, r);
				}
			}
			u & 1 && e.children !== n.children && p(l, n.children);
		} else !s && d == null && ne(l, m, h, r, a);
		((g = h.onVnodeUpdated) || f) && W(() => {
			g && oa(g, r, n, e), f && Fn(n, e, r, "updated");
		}, i);
	}, O = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s], u = c.el || Pi(c), d = u && (c.type === G || !Yi(c, l) || c.shapeFlag & 198) ? m(u) : n;
			v(c, l, d, null, r, i, a, o, !0);
		}
	}, ne = (e, n, r, i, a) => {
		if (n !== r) {
			if (n !== t) for (let t in n) !T(t) && !(t in r) && c(e, t, n[t], null, a, i);
			for (let t in r) {
				if (T(t)) continue;
				let o = r[t], s = n[t];
				o !== s && t !== "value" && c(e, t, s, o, a, i);
			}
			"value" in r && c(e, "value", n.value, r.value, a);
		}
	}, re = (e, t, n, r, i, a, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), D(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (O(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && Ai(e, t, !0)) : le(e, t, n, f, i, a, s, c, l);
	}, k = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : A(t, n, r, i, a, o, c) : ae(e, t, c);
	}, A = (e, t, n, r, i, a, o) => {
		let s = e.component = ua(e, r, i);
		if (ir(e) && (s.ctx.renderer = ye), va(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, oe, o, a), !e.el) {
				let r = s.subTree = Y(zi);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else oe(s, e, t, n, i, a, o);
	}, ae = (e, t, n) => {
		let r = t.component = e.component;
		if (ri(e, t, n)) {
			if (r.asyncDep && !r.asyncResolved) {
				t.el = e.el, t.placeholder = e.placeholder, se(r, t, n);
				return;
			}
			r.next = t, r.update();
		} else t.el = e.el, t.placeholder = e.placeholder, r.vnode = t;
	}, oe = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Mi(e);
					if (n) {
						t && (t.el = c.el, se(e, t, o)), n.asyncDep.then(() => {
							let t = () => {
								e.job.flags & 8 || (i && i.pendingBranch ? W(t, i) : l());
							};
							t.flags = 48, W(t, i);
						});
						return;
					}
				}
				let u = t, d;
				Oi(e, !1), t ? (t.el = c.el, se(e, t, o)) : t = c, n && ie(n), (d = t.props && t.props.onVnodeBeforeUpdate) && oa(d, s, t, c), Oi(e, !0);
				let f = $r(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el || Pi(p)), _e(p), e, i, a), t.el = f.el, u === null && oi(e, f.el), r && W(r, i), (d = t.props && t.props.onVnodeUpdated) && W(() => oa(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = rr(t);
				if (Oi(e, !1), l && ie(l), !m && (o = c && c.onVnodeBeforeMount) && oa(o, d, t), Oi(e, !0), s && xe) {
					let t = () => {
						e.subTree = $r(e), xe(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = $r(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && W(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					W(() => oa(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && rr(d.vnode) && d.vnode.shapeFlag & 256) && e.a && W(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Oe(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => Cn(u), Oi(e, !0), l();
	}, se = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, di(e, t.props, r, n), wi(e, t.children, n), Ue(), En(e), We();
	}, le = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				de(l, d, n, r, i, a, o, s, c);
				return;
			}
			if (f & 256) {
				ue(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && ge(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? de(l, d, n, r, i, a, o, s, c) : ge(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && D(d, n, r, i, a, o, s, c));
	}, ue = (e, t, r, i, a, o, s, c, l) => {
		e ||= n, t ||= n;
		let u = e.length, d = t.length, f = Math.min(u, d), p = 0;
		for (; p < f; p++) {
			let n = t[p] = l ? ra(t[p]) : na(t[p]);
			v(e[p], n, r, null, a, o, s, c, l);
		}
		u > d ? ge(e, a, o, !0, !1, f) : D(t, r, i, a, o, s, c, l, f);
	}, de = (e, t, r, i, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let n = e[u], i = t[u] = l ? ra(t[u]) : na(t[u]);
			if (Yi(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let n = e[f], i = t[p] = l ? ra(t[p]) : na(t[p]);
			if (Yi(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, n = e < d ? t[e].el : i;
				for (; u <= p;) v(null, t[u] = l ? ra(t[u]) : na(t[u]), r, n, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) pe(e[u], a, o, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? ra(t[u]) : na(t[u]);
				e.key != null && g.set(e.key, u);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (u = 0; u < b; u++) C[u] = 0;
			for (u = m; u <= f; u++) {
				let n = e[u];
				if (y >= b) {
					pe(n, a, o, !0);
					continue;
				}
				let i;
				if (n.key != null) i = g.get(n.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && Yi(n, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? pe(n, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(n, t[i], r, null, a, o, s, c, l), y++);
			}
			let w = x ? ji(C) : n;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, n = t[e], f = t[e + 1], p = e + 1 < d ? f.el || Pi(f) : i;
				C[u] === 0 ? v(null, n, r, p, a, o, s, c, l) : x && (_ < 0 || u !== w[_] ? fe(n, r, p, 2) : _--);
			}
		}
	}, fe = (e, t, n, r, i = null) => {
		let { el: a, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) fe(e.component.subTree, t, n, r);
		else if (d & 128) e.suspense.move(t, n, r);
		else if (d & 64) c.move(e, t, n, ye);
		else if (c === G) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) fe(u[e], t, n, r);
			o(e.anchor, t, n);
		} else if (c === Bi) S(e, t, n);
		else if (r !== 2 && d & 1 && l) {
			if (r === 0) l.persisted && !a[Gn] ? o(a, t, n) : (l.beforeEnter(a), o(a, t, n), W(() => l.enter(a), i));
			else {
				let { leave: r, delayLeave: i, afterLeave: c } = l, u = () => {
					e.ctx.isUnmounted ? s(a) : o(a, t, n);
				}, d = () => {
					let e = a._isLeaving || !!a[Gn];
					a._isLeaving && a[Gn](!0), l.persisted && !e ? u() : r(a, () => {
						u(), c && c();
					});
				};
				i ? i(a, u, d) : d();
			}
		} else o(a, t, n);
	}, pe = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if ((d === -2 || l && l.hasOnce) && (i = !1), s != null && (Ue(), tr(s, null, n, e, !0), We()), p == null || e.ctx && e.ctx !== t || (t.renderCache[p] = void 0), u & 256 && t.ctx.deactivate(e)) return;
		let h = u & 1 && f, g = !rr(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && oa(_, t, e), u & 6) he(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Fn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, ye, r) : l && !l.hasOnce && (a !== G || d > 0 && d & 64) ? ge(l, t, n, !1, !0) : (a === G && d & 384 || !i && u & 16) && ge(c, t, n), r && j(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && W(() => {
			_ && oa(_, t, e), h && Fn(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, j = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e, a = t === G;
		if (a && !i) {
			me(n, r);
			return;
		}
		if (t === Bi) {
			C(e), i && !i.persisted && i.afterLeave && i.afterLeave();
			return;
		}
		let o = a ? Yn(e) : e, c = () => {
			a ? m(n) && me(n, r) : s(n), i && !i.persisted && i.afterLeave && i.afterLeave();
		};
		if (o && o.shapeFlag & 1 && i && !i.persisted) {
			let { leave: e, delayLeave: t } = i, n = o.el, r = () => e(n, c);
			t ? t(n, c, r) : r();
		} else c();
	}, me = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, he = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Ni(c), Ni(l), r && ie(r), i.stop(), a ? (a.flags |= 8, pe(o, e, t, n)) : o && (o.transition = e.vnode.transition, pe(o, e, t, n)), s && W(s, t);
		let u = () => {
			e.isUnmounted = !0;
		};
		u.flags = 16, W(u, t);
	}, ge = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) pe(e[o], t, n, r, i);
	}, _e = (e) => {
		if (e.shapeFlag & 6) return _e(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[Un];
		return n ? h(n) : t;
	}, ve = (e, t, n) => {
		kn(() => {
			e == null ? t._vnode && pe(t._vnode, null, null, !0) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e;
		}, e && t._vnode ? void 0 : e && e.component ? e.component.uid : la());
	}, ye = {
		p: v,
		um: pe,
		m: fe,
		r: j,
		mt: A,
		mc: D,
		pc: le,
		pbc: O,
		n: _e,
		o: e
	}, be, xe;
	return i && ([be, xe] = i(ye)), {
		render: ve,
		hydrate: be,
		createApp: Kr(ve, be)
	};
}
function Di({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Oi({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function ki(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ai(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (d(r) && d(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = ra(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Ai(t, a)), a.type === Ri && (a.patchFlag === -1 && (a = i[e] = ra(a)), a.el = t.el), a.type === zi && !a.el && (a.el = t.el);
	}
}
function ji(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function Mi(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Mi(t);
}
function Ni(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Pi(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	if (t) return Pi(t.subTree);
	let n = e.suspense;
	return n && n.activeBranch ? Pi(n.activeBranch) : null;
}
var Fi = (e) => e.__isSuspense, Ii = /* @__PURE__ */ Symbol("_deferredEnter");
function Li(e, t) {
	t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : Tn(e);
}
var G = /* @__PURE__ */ Symbol.for("v-fgt"), Ri = /* @__PURE__ */ Symbol.for("v-txt"), zi = /* @__PURE__ */ Symbol.for("v-cmt"), Bi = /* @__PURE__ */ Symbol.for("v-stc"), Vi = [], Hi = null;
function K(e = !1) {
	Vi.push(Hi = e ? null : []);
}
function Ui() {
	Vi.pop(), Hi = Vi[Vi.length - 1] || null;
}
var Wi = 1;
function Gi(e, t = !1) {
	Wi += e, e < 0 && Hi && t && (Hi.hasOnce = !0);
}
function Ki(e) {
	return e.dynamicChildren = Wi > 0 ? Hi || n : null, Ui(), Wi > 0 && Hi && Hi.push(e), e;
}
function q(e, t, n, r, i, a) {
	return Ki(J(e, t, n, r, i, a, !0));
}
function qi(e, t, n, r, i) {
	return Ki(Y(e, t, n, r, i, !0));
}
function Ji(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Yi(e, t) {
	return e.type === t.type && e.key === t.key;
}
var Xi = ({ key: e }) => e ?? null, Zi = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : g(e) || /* @__PURE__ */ L(e) || h(e) ? {
	i: V,
	r: e,
	k: t,
	f: !!n
} : e);
function J(e, t = null, n = null, r = 0, i = null, a = e === G ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Xi(t),
		ref: t && Zi(t),
		scopeId: Mn,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: V
	};
	return s ? (ia(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= g(n) ? 8 : 16), Wi > 0 && !o && Hi && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && Hi.push(c), c;
}
var Y = Qi;
function Qi(e, t = null, n = null, r = 0, i = null, a = !1) {
	if (e && e !== xr || (e = zi), Ji(e)) {
		let r = ea(e, t, !0);
		return n && ia(r, n), Wi > 0 && !a && Hi && (r.shapeFlag & 6 ? Hi[Hi.indexOf(e)] = r : Hi.push(r)), r.patchFlag = -2, r;
	}
	if (Ea(e) && (e = e.__vccOpts), t) {
		t = $i(t);
		let { class: e, style: n } = t;
		e && !g(e) && (t.class = j(e)), v(n) && (/* @__PURE__ */ Ut(n) && !d(n) && (n = s({}, n)), t.style = le(n));
	}
	let o = g(e) ? 1 : Fi(e) ? 128 : Wn(e) ? 64 : v(e) ? 4 : h(e) ? 2 : 0;
	return J(e, t, n, r, i, o, a, !0);
}
function $i(e) {
	return e ? /* @__PURE__ */ Ut(e) ? s({}, e) : li(e) ? s({}, e[Sa] || e) : e : null;
}
function ea(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? aa(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && Xi(l),
		ref: t && t.ref ? n && a ? d(a) ? a.concat(Zi(t)) : [a, Zi(t)] : Zi(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== G ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && ea(e.ssContent),
		ssFallback: e.ssFallback && ea(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce,
		cacheIndex: e.cacheIndex
	};
	return c && r && Jn(u, c.clone(u)), u;
}
function ta(e = " ", t = 0) {
	return Y(Ri, null, e, t);
}
function X(e = "", t = !1) {
	return t ? (K(), qi(zi, null, e)) : Y(zi, null, e);
}
function na(e) {
	return e == null || typeof e == "boolean" ? Y(zi) : d(e) ? Y(G, null, e.slice()) : Ji(e) ? ra(e) : Y(Ri, null, String(e));
}
function ra(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : ea(e);
}
function ia(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (d(t)) n = 16;
	else if (typeof t == "object") {
		if (r & 65) {
			let n = t.default;
			n && (n._c && (n._d = !1), ia(e, n()), n._c && (n._d = !0));
			return;
		}
		{
			n = 32;
			let r = t._;
			!r && !li(t) ? t._ctx = V : r === 3 && V && (V.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
		}
	} else if (h(t)) {
		if (r & 65) {
			ia(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: V
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [ta(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function aa(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = j([t.class, r.class]));
		else if (e === "style") t.style = le([t.style, r.style]);
		else if (a(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(d(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !o(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function oa(e, t, n, r = null) {
	fn(e, t, 7, [n, r]);
}
var sa = /* @__PURE__ */ Wr(), ca = 0;
function la() {
	return ca;
}
function ua(e, n, r) {
	let i = e.type, a = (n ? n.appContext : e.appContext) || sa, o = {
		uid: ca++,
		vnode: e,
		type: i,
		parent: n,
		appContext: a,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new Te(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: n ? n.provides : Object.create(a.provides),
		ids: n ? n.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: hi(i, a),
		emitsOptions: Zr(i, a),
		emit: null,
		emitted: null,
		propsDefaults: t,
		inheritAttrs: i.inheritAttrs,
		ctx: t,
		data: t,
		props: t,
		attrs: t,
		slots: t,
		refs: t,
		setupState: t,
		setupContext: null,
		suspense: r,
		suspenseId: r ? r.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
		isMounted: !1,
		isUnmounted: !1,
		isDeactivated: !1,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	return o.ctx = { _: o }, o.root = n ? n.root : o, o.emit = Yr.bind(null, o), e.ce && e.ce(o), o;
}
var Z = null, da = () => Z || V, fa, pa;
{
	let e = ce(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	fa = t("__VUE_INSTANCE_SETTERS__", (e) => Z = e), pa = t("__VUE_SSR_SETTERS__", (e) => _a = e);
}
var ma = (e) => {
	let t = Z;
	return fa(e), e.scope.on(), () => {
		e.scope.off(), fa(t);
	};
}, ha = () => {
	Z && Z.scope.off(), fa(null);
};
function ga(e) {
	return e.vnode.shapeFlag & 4;
}
var _a = !1;
function va(e, t = !1, n = !1) {
	t && pa(t);
	let { props: r, children: i } = e.vnode, a = ga(e);
	ui(e, r, a, t), Ci(e, i, n || t);
	let o = a ? ya(e, t) : void 0;
	return t && pa(!1), o;
}
function ya(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Or);
	let { setup: r } = n;
	if (r) {
		Ue();
		let n = e.setupContext = r.length > 1 ? wa(e) : null, i = ma(e), a = dn(r, e, 0, [e.props, n]), o = y(a);
		if (We(), i(), (o || e.sp) && !rr(e) && Qn(e), o) {
			if (a.then(ha, ha), t) return a.then((n) => {
				pa(!0);
				try {
					ba(e, n, t);
				} finally {
					pa(!1);
				}
			}).catch((t) => {
				pn(t, e, 0, void 0, !0), e.ssrRender = (e, t) => t("<!---->");
			});
			e.asyncDep = a;
		} else ba(e, a, t);
	} else xa(e, t);
}
function ba(e, t, n) {
	h(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : v(t) && (e.setupState = Zt(t)), xa(e, n);
}
function xa(e, t, n) {
	let i = e.type;
	e.render ||= i.render || r;
	{
		let t = ma(e);
		Ue();
		try {
			jr(e);
		} finally {
			We(), t();
		}
	}
}
var Sa = /* @__PURE__ */ Symbol(), Ca = { get(e, t) {
	return F(e, "get", ""), t === Sa ? e : e[t];
} };
function wa(e) {
	return {
		attrs: new Proxy(e.attrs, Ca),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function Ta(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(Zt(Wt(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in Er) return Er[n](e);
		},
		has(e, t) {
			return t in e || t in Er;
		}
	}) : e.proxy;
}
function Ea(e) {
	return h(e) && "__vccOpts" in e;
}
var Q = (e, t) => /* @__PURE__ */ rn(e, t, _a), Da = "3.5.45", Oa = void 0, ka = typeof window < "u" && window.trustedTypes;
if (ka) try {
	Oa = /* @__PURE__ */ ka.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Aa = Oa ? (e) => Oa.createHTML(e) : (e) => e, ja = "http://www.w3.org/2000/svg", Ma = "http://www.w3.org/1998/Math/MathML", Na = typeof document < "u" ? document : null, Pa = Na && /* @__PURE__ */ Na.createElement("template"), Fa = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? Na.createElementNS(ja, e) : t === "mathml" ? Na.createElementNS(Ma, e) : n ? Na.createElement(e, { is: n }) : Na.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => Na.createTextNode(e),
	createComment: (e) => Na.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => Na.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), i !== a && (i = i.nextSibling););
		else {
			Pa.innerHTML = Aa(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Pa.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Ia = /* @__PURE__ */ Symbol("_vtc");
function La(e, t, n) {
	let r = e[Ia];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var Ra = /* @__PURE__ */ Symbol("_vod"), za = /* @__PURE__ */ Symbol("_vsh"), Ba = /* @__PURE__ */ Symbol(""), Va = /(?:^|;)\s*display\s*:/;
function Ha(e, t, n) {
	let r = e.style, i = g(n), a = !1;
	if (n && !i) {
		if (t) {
			if (g(t)) for (let e of t.split(";")) {
				let t = e.slice(0, e.indexOf(":")).trim();
				n[t] ?? Wa(r, t, "");
			}
			else for (let e in t) n[e] ?? Wa(r, e, "");
		}
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? Wa(r, i, "") : Ja(e, i, !g(t) && t ? t[i] : void 0, o) || Wa(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[Ba];
			e && (n += ";" + e), r.cssText = n, a = Va.test(n);
		}
	} else t && e.removeAttribute("style");
	Ra in e && (i && t === n || (e[Ra] = a ? r.display : ""), e[za] && (r.display = "none"));
}
var Ua = /\s*!important$/;
function Wa(e, t, n) {
	if (d(n)) n.forEach((n) => Wa(e, t, n));
	else if (n ??= "", t.startsWith("--")) Ua.test(n) ? e.setProperty(t, n.replace(Ua, ""), "important") : e.setProperty(t, n);
	else {
		let r = qa(e, t);
		Ua.test(n) ? e.setProperty(O(r), n.replace(Ua, ""), "important") : e[r] = n;
	}
}
var Ga = [
	"Webkit",
	"Moz",
	"ms"
], Ka = {};
function qa(e, t) {
	let n = Ka[t];
	if (n) return n;
	let r = D(t);
	if (r !== "filter" && r in e) return Ka[t] = r;
	r = ne(r);
	for (let n = 0; n < Ga.length; n++) {
		let i = Ga[n] + r;
		if (i in e) return Ka[t] = i;
	}
	return t;
}
function Ja(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && g(r) && n === r;
}
var Ya = "http://www.w3.org/1999/xlink";
function Xa(e, t, n, r, i, a = he(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ya, t.slice(6, t.length)) : e.setAttributeNS(Ya, t, n) : n == null || a && !ge(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : _(n) ? String(n) : n);
}
function Za(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Aa(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		r === i && "_value" in e || (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = ge(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function Qa(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function $a(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var eo = /* @__PURE__ */ Symbol("_vei");
function to(e, t, n, r, i = null) {
	let a = e[eo] || (e[eo] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = io(t);
		r ? Qa(e, n, a[t] = co(r, i), s) : o && ($a(e, n, o, s), a[t] = void 0);
	}
}
var no = /(Once|Passive|Capture)$/, ro = /^on:?(?:Once|Passive|Capture)$/;
function io(e) {
	let t, n;
	for (; (n = e.match(no)) && !ro.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : O(e.slice(2)), t];
}
var ao = 0, oo = /* @__PURE__ */ Promise.resolve(), so = () => ao ||= (oo.then(() => ao = 0), Date.now());
function co(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (d(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && fn(e, t, 5, a);
			}
		} else fn(r, t, 5, [e]);
	};
	return n.value = e, n.attached = so(), n;
}
var lo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, uo = (e, t, n, r, i, s) => {
	let c = i === "svg";
	t === "class" ? La(e, r, c) : t === "style" ? Ha(e, n, r) : a(t) ? o(t) || to(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), 1) : t[0] === "^" ? (t = t.slice(1), 0) : fo(e, t, r, c)) ? (Za(e, t, r), e.tagName.includes("-") || t !== "value" && t !== "checked" && t !== "selected" || Xa(e, t, r, c, s, t !== "value")) : e._isVueCE && (po(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !g(r))) ? Za(e, D(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Xa(e, t, r, c));
};
function fo(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && lo(t) && h(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return lo(t) && g(n) ? !1 : t in e;
}
function po(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = D(t);
	return Array.isArray(n) ? n.some((e) => D(e) === r) : Object.keys(n).some((e) => D(e) === r);
}
var mo = {};
// @__NO_SIDE_EFFECTS__
function ho(e, t, n) {
	let r = /* @__PURE__ */ Xn(e, t);
	C(r) && (r = s({}, r, t));
	class i extends _o {
		constructor(e) {
			super(r, e, n);
		}
	}
	return i.def = r, i;
}
var go = typeof HTMLElement < "u" ? HTMLElement : class {}, _o = class e extends go {
	constructor(e, t = {}, n = wo) {
		super(), this._def = e, this._props = t, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._styleAnchors = /* @__PURE__ */ new WeakMap(), this._ob = null, this.shadowRoot && n !== wo ? this._root = this.shadowRoot : e.shadowRoot === !1 ? this._root = this : (this.attachShadow(s({}, e.shadowRootOptions, { mode: "open" })), this._root = this.shadowRoot);
	}
	connectedCallback() {
		if (!this.isConnected) return;
		!this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
		let t = this;
		for (; t &&= t.assignedSlot || t.parentNode || t.host;) if (t instanceof e) {
			this._parent = t;
			break;
		}
		this._instance || (this._resolved ? this._mount(this._def) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
			if (this._pendingResolve = void 0, this.isConnected) return this._resolveDef();
		}) : this._resolveDef());
	}
	_setParent(e = this._parent) {
		e && (this._instance.parent = e._instance, this._inheritParentContext(e));
	}
	_inheritParentContext(e = this._parent) {
		e && this._app && Object.setPrototypeOf(this._app._context.provides, e._instance.provides);
	}
	disconnectedCallback() {
		this._connected = !1, xn(() => {
			this._connected || (this._ob &&= (this._ob.disconnect(), null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets &&= (this._teleportTargets.clear(), void 0));
		});
	}
	_processMutations(e) {
		for (let t of e) this._setAttr(t.attributeName);
	}
	_resolveDef() {
		if (this._pendingResolve) return this._pendingResolve;
		for (let e = 0; e < this.attributes.length; e++) this._setAttr(this.attributes[e].name);
		this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: !0 });
		let e = (e, t = !1) => {
			this._resolved = !0, this._pendingResolve = void 0;
			let { props: n, styles: r } = e, i;
			if (n && !d(n)) for (let e in n) {
				let t = n[e];
				(t === Number || t && t.type === Number) && (e in this._props && (this._props[e] = oe(this._props[e])), (i ||= /* @__PURE__ */ Object.create(null))[D(e)] = !0);
			}
			this._numberProps = i, this._resolveProps(e), this.shadowRoot && this._applyStyles(r), this._connected && this._mount(e);
		}, t = this._def.__asyncLoader;
		if (t) return this._pendingResolve = t().then((t) => {
			t.configureApp = this._def.configureApp, e(this._def = t, !0);
		}), this._pendingResolve;
		e(this._def);
	}
	_mount(e) {
		this._app = this._createApp(e), this._inheritParentContext(), e.configureApp && e.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
		let t = this._instance && this._instance.exposed;
		if (t) for (let e in t) u(this, e) || Object.defineProperty(this, e, { get: () => z(t[e]) });
	}
	_resolveProps(e) {
		let { props: t } = e, n = d(t) ? t : Object.keys(t || {});
		for (let e of Object.keys(this)) e[0] !== "_" && n.includes(e) && this._setProp(e, this[e]);
		for (let e of n.map(D)) Object.defineProperty(this, e, {
			get() {
				return this._getProp(e);
			},
			set(t) {
				this._setProp(e, t, !0, !this._patching);
			}
		});
	}
	_setAttr(e) {
		if (e.startsWith("data-v-")) return;
		let t = this.hasAttribute(e), n = t ? this.getAttribute(e) : mo, r = D(e);
		t && this._numberProps && this._numberProps[r] && (n = oe(n)), this._setProp(r, n, !1, !0);
	}
	_getProp(e) {
		return this._props[e];
	}
	_setProp(e, t, n = !0, r = !1) {
		if (t !== this._props[e] && (this._dirty = !0, t === mo ? delete this._props[e] : (this._props[e] = t, e === "key" && this._app && (this._app._ceVNode.key = t)), r && this._instance && this._update(), n)) {
			let n = this._ob;
			n && (this._processMutations(n.takeRecords()), n.disconnect()), t === !0 ? this.setAttribute(O(e), "") : typeof t == "string" || typeof t == "number" ? this.setAttribute(O(e), t + "") : t || this.removeAttribute(O(e)), n && n.observe(this, { attributes: !0 });
		}
	}
	_update() {
		let e = this._createVNode();
		this._app && (e.appContext = this._app._context), Co(e, this._root);
	}
	_createVNode() {
		let e = {};
		this.shadowRoot || (e.onVnodeMounted = e.onVnodeUpdated = this._renderSlots.bind(this));
		let t = Y(this._def, s(e, this._props));
		return this._instance || (t.ce = (e) => {
			this._instance = e, e.ce = this, e.isCE = !0;
			let t = (e, t) => {
				this.dispatchEvent(new CustomEvent(e, C(t[0]) ? s({ detail: t }, t[0]) : { detail: t }));
			};
			e.emit = (e, ...n) => {
				t(e, n), O(e) !== e && t(O(e), n);
			}, this._setParent();
		}), t;
	}
	_applyStyles(e, t, n) {
		if (!e) return;
		if (t) {
			if (t === this._def || this._styleChildren.has(t)) return;
			this._styleChildren.add(t);
		}
		let r = this._nonce, i = this.shadowRoot, a = n ? this._getStyleAnchor(n) || this._getStyleAnchor(this._def) : this._getRootStyleInsertionAnchor(i), o = null;
		for (let s = e.length - 1; s >= 0; s--) {
			let c = document.createElement("style");
			r && c.setAttribute("nonce", r), c.textContent = e[s], i.insertBefore(c, o || a), o = c, s === 0 && (n || this._styleAnchors.set(this._def, c), t && this._styleAnchors.set(t, c));
		}
	}
	_getStyleAnchor(e) {
		if (!e) return null;
		let t = this._styleAnchors.get(e);
		return t && t.parentNode === this.shadowRoot ? t : (t && this._styleAnchors.delete(e), null);
	}
	_getRootStyleInsertionAnchor(e) {
		for (let t = 0; t < e.childNodes.length; t++) {
			let n = e.childNodes[t];
			if (!(n instanceof HTMLStyleElement)) return n;
		}
		return null;
	}
	_parseSlots() {
		let e = this._slots = {}, t;
		for (; t = this.firstChild;) {
			let n = t.nodeType === 1 && t.getAttribute("slot") || "default";
			(e[n] || (e[n] = [])).push(t), this.removeChild(t);
		}
	}
	_renderSlots() {
		let e = this._getSlots(), t = this._instance.type.__scopeId;
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = r.getAttribute("name") || "default", a = this._slots[i], o = r.parentNode;
			if (a) for (let e of a) {
				if (t && e.nodeType === 1) {
					let n = t + "-s", r = document.createTreeWalker(e, 1);
					e.setAttribute(n, "");
					let i;
					for (; i = r.nextNode();) i.setAttribute(n, "");
				}
				o.insertBefore(e, r);
			}
			else for (; r.firstChild;) o.insertBefore(r.firstChild, r);
			o.removeChild(r);
		}
	}
	_getSlots() {
		let e = [this];
		this._teleportTargets && e.push(...this._teleportTargets);
		let t = /* @__PURE__ */ new Set();
		for (let n of e) {
			let e = n.querySelectorAll("slot");
			for (let n = 0; n < e.length; n++) t.add(e[n]);
		}
		return Array.from(t);
	}
	_injectChildStyle(e, t) {
		this._applyStyles(e.styles, e, t);
	}
	_beginPatch() {
		this._patching = !0, this._dirty = !1;
	}
	_endPatch() {
		this._patching = !1, this._dirty && this._instance && this._update();
	}
	_hasShadowRoot() {
		return this._def.shadowRoot !== !1;
	}
	_removeChildStyle(e) {}
}, vo = {
	esc: "escape",
	space: " ",
	up: "arrow-up",
	left: "arrow-left",
	right: "arrow-right",
	down: "arrow-down",
	delete: "backspace"
}, yo = (e, t) => {
	let n = e._withKeys ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n) => {
		if (!("key" in n)) return;
		let r = O(n.key);
		if (t.some((e) => e === r || vo[e] === r)) return e(n);
	}));
}, bo = /* @__PURE__ */ s({ patchProp: uo }, Fa), xo;
function So() {
	return xo ||= Ti(bo);
}
var Co = ((...e) => {
	So().render(...e);
}), wo = ((...e) => {
	let t = So().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = Eo(e);
		if (!r) return;
		let i = t._component;
		h(i) || i.render || i.template || (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, To(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function To(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Eo(e) {
	return g(e) ? document.querySelector(e) : e;
}
// node_modules/d3-array/dist/d3-array.mjs
function Do(e, t) {
	return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Oo(e, t) {
	return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function ko(e) {
	let t, n, r;
	e.length === 2 ? (t = e === Do || e === Oo ? e : Ao, n = e, r = e) : (t = Do, n = (t, n) => Do(e(t), n), r = (t, n) => e(t) - n);
	function i(e, r, i = 0, a = e.length) {
		if (i < a) {
			if (t(r, r) !== 0) return a;
			do {
				let t = i + a >>> 1;
				n(e[t], r) < 0 ? i = t + 1 : a = t;
			} while (i < a);
		}
		return i;
	}
	function a(e, r, i = 0, a = e.length) {
		if (i < a) {
			if (t(r, r) !== 0) return a;
			do {
				let t = i + a >>> 1;
				n(e[t], r) <= 0 ? i = t + 1 : a = t;
			} while (i < a);
		}
		return i;
	}
	function o(e, t, n = 0, a = e.length) {
		let o = i(e, t, n, a - 1);
		return o > n && r(e[o - 1], t) > -r(e[o], t) ? o - 1 : o;
	}
	return {
		left: i,
		center: o,
		right: a
	};
}
function Ao() {
	return 0;
}
function jo(e) {
	return e === null ? NaN : +e;
}
var Mo = ko(Do), No = Mo.right;
Mo.left, ko(jo).center, Array.prototype.slice;
var Po = Math.sqrt(50), Fo = Math.sqrt(10), Io = Math.sqrt(2);
function Lo(e, t, n) {
	let r = (t - e) / Math.max(0, n), i = Math.floor(Math.log10(r)), a = r / 10 ** i, o = a >= Po ? 10 : a >= Fo ? 5 : a >= Io ? 2 : 1, s, c, l;
	return i < 0 ? (l = 10 ** -i / o, s = Math.round(e * l), c = Math.round(t * l), s / l < e && ++s, c / l > t && --c, l = -l) : (l = 10 ** i * o, s = Math.round(e / l), c = Math.round(t / l), s * l < e && ++s, c * l > t && --c), c < s && .5 <= n && n < 2 ? Lo(e, t, n * 2) : [
		s,
		c,
		l
	];
}
function Ro(e, t, n) {
	if (t = +t, e = +e, n = +n, !(n > 0)) return [];
	if (e === t) return [e];
	let r = t < e, [i, a, o] = r ? Lo(t, e, n) : Lo(e, t, n);
	if (!(a >= i)) return [];
	let s = a - i + 1, c = Array(s);
	if (r) {
		if (o < 0) for (let e = 0; e < s; ++e) c[e] = (a - e) / -o;
		else for (let e = 0; e < s; ++e) c[e] = (a - e) * o;
	} else if (o < 0) for (let e = 0; e < s; ++e) c[e] = (i + e) / -o;
	else for (let e = 0; e < s; ++e) c[e] = (i + e) * o;
	return c;
}
function zo(e, t, n) {
	return t = +t, e = +e, n = +n, Lo(e, t, n)[2];
}
function Bo(e, t, n) {
	t = +t, e = +e, n = +n;
	let r = t < e, i = r ? zo(t, e, n) : zo(e, t, n);
	return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
// node_modules/d3-color/dist/d3-color.mjs
function Vo(e, t, n) {
	e.prototype = t.prototype = n, n.constructor = e;
}
function Ho(e, t) {
	var n = Object.create(e.prototype);
	for (var r in t) n[r] = t[r];
	return n;
}
function Uo() {}
var Wo = .7, Go = 1 / Wo, Ko = "\\s*([+-]?\\d+)\\s*", qo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Jo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Yo = /^#([0-9a-f]{3,8})$/, Xo = RegExp(`^rgb\\(${Ko},${Ko},${Ko}\\)$`), Zo = RegExp(`^rgb\\(${Jo},${Jo},${Jo}\\)$`), Qo = RegExp(`^rgba\\(${Ko},${Ko},${Ko},${qo}\\)$`), $o = RegExp(`^rgba\\(${Jo},${Jo},${Jo},${qo}\\)$`), es = RegExp(`^hsl\\(${qo},${Jo},${Jo}\\)$`), ts = RegExp(`^hsla\\(${qo},${Jo},${Jo},${qo}\\)$`), ns = {
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
};
Vo(Uo, ss, {
	copy(e) {
		return Object.assign(new this.constructor(), this, e);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: rs,
	formatHex: rs,
	formatHex8: is,
	formatHsl: as,
	formatRgb: os,
	toString: os
});
function rs() {
	return this.rgb().formatHex();
}
function is() {
	return this.rgb().formatHex8();
}
function as() {
	return ys(this).formatHsl();
}
function os() {
	return this.rgb().formatRgb();
}
function ss(e) {
	var t, n;
	return e = (e + "").trim().toLowerCase(), (t = Yo.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? cs(t) : n === 3 ? new $(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? ls(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? ls(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Xo.exec(e)) ? new $(t[1], t[2], t[3], 1) : (t = Zo.exec(e)) ? new $(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Qo.exec(e)) ? ls(t[1], t[2], t[3], t[4]) : (t = $o.exec(e)) ? ls(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = es.exec(e)) ? vs(t[1], t[2] / 100, t[3] / 100, 1) : (t = ts.exec(e)) ? vs(t[1], t[2] / 100, t[3] / 100, t[4]) : ns.hasOwnProperty(e) ? cs(ns[e]) : e === "transparent" ? new $(NaN, NaN, NaN, 0) : null;
}
function cs(e) {
	return new $(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ls(e, t, n, r) {
	return r <= 0 && (e = t = n = NaN), new $(e, t, n, r);
}
function us(e) {
	return e instanceof Uo || (e = ss(e)), e ? (e = e.rgb(), new $(e.r, e.g, e.b, e.opacity)) : new $();
}
function ds(e, t, n, r) {
	return arguments.length === 1 ? us(e) : new $(e, t, n, r ?? 1);
}
function $(e, t, n, r) {
	this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
Vo($, ds, Ho(Uo, {
	brighter(e) {
		return e = e == null ? Go : Go ** +e, new $(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Wo : Wo ** +e, new $(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	rgb() {
		return this;
	},
	clamp() {
		return new $(gs(this.r), gs(this.g), gs(this.b), hs(this.opacity));
	},
	displayable() {
		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
	},
	hex: fs,
	formatHex: fs,
	formatHex8: ps,
	formatRgb: ms,
	toString: ms
}));
function fs() {
	return `#${_s(this.r)}${_s(this.g)}${_s(this.b)}`;
}
function ps() {
	return `#${_s(this.r)}${_s(this.g)}${_s(this.b)}${_s((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ms() {
	let e = hs(this.opacity);
	return `${e === 1 ? "rgb(" : "rgba("}${gs(this.r)}, ${gs(this.g)}, ${gs(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function hs(e) {
	return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function gs(e) {
	return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function _s(e) {
	return e = gs(e), (e < 16 ? "0" : "") + e.toString(16);
}
function vs(e, t, n, r) {
	return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new xs(e, t, n, r);
}
function ys(e) {
	if (e instanceof xs) return new xs(e.h, e.s, e.l, e.opacity);
	if (e instanceof Uo || (e = ss(e)), !e) return new xs();
	if (e instanceof xs) return e;
	e = e.rgb();
	var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = NaN, s = a - i, c = (a + i) / 2;
	return s ? (o = t === a ? (n - r) / s + (n < r) * 6 : n === a ? (r - t) / s + 2 : (t - n) / s + 4, s /= c < .5 ? a + i : 2 - a - i, o *= 60) : s = c > 0 && c < 1 ? 0 : o, new xs(o, s, c, e.opacity);
}
function bs(e, t, n, r) {
	return arguments.length === 1 ? ys(e) : new xs(e, t, n, r ?? 1);
}
function xs(e, t, n, r) {
	this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
Vo(xs, bs, Ho(Uo, {
	brighter(e) {
		return e = e == null ? Go : Go ** +e, new xs(this.h, this.s, this.l * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Wo : Wo ** +e, new xs(this.h, this.s, this.l * e, this.opacity);
	},
	rgb() {
		var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < .5 ? n : 1 - n) * t, i = 2 * n - r;
		return new $(ws(e >= 240 ? e - 240 : e + 120, i, r), ws(e, i, r), ws(e < 120 ? e + 240 : e - 120, i, r), this.opacity);
	},
	clamp() {
		return new xs(Ss(this.h), Cs(this.s), Cs(this.l), hs(this.opacity));
	},
	displayable() {
		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	},
	formatHsl() {
		let e = hs(this.opacity);
		return `${e === 1 ? "hsl(" : "hsla("}${Ss(this.h)}, ${Cs(this.s) * 100}%, ${Cs(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
	}
}));
function Ss(e) {
	return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Cs(e) {
	return Math.max(0, Math.min(1, e || 0));
}
function ws(e, t, n) {
	return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
var Ts = Math.PI / 180, Es = 180 / Math.PI, Ds = 18, Os = .96422, ks = 1, As = .82521, js = 4 / 29, Ms = 6 / 29, Ns = 3 * Ms * Ms, Ps = Ms * Ms * Ms;
function Fs(e) {
	if (e instanceof Ls) return new Ls(e.l, e.a, e.b, e.opacity);
	if (e instanceof Ws) return Gs(e);
	e instanceof $ || (e = us(e));
	var t = Vs(e.r), n = Vs(e.g), r = Vs(e.b), i = Rs((.2225045 * t + .7168786 * n + .0606169 * r) / ks), a, o;
	return t === n && n === r ? a = o = i : (a = Rs((.4360747 * t + .3850649 * n + .1430804 * r) / Os), o = Rs((.0139322 * t + .0971045 * n + .7141733 * r) / As)), new Ls(116 * i - 16, 500 * (a - i), 200 * (i - o), e.opacity);
}
function Is(e, t, n, r) {
	return arguments.length === 1 ? Fs(e) : new Ls(e, t, n, r ?? 1);
}
function Ls(e, t, n, r) {
	this.l = +e, this.a = +t, this.b = +n, this.opacity = +r;
}
Vo(Ls, Is, Ho(Uo, {
	brighter(e) {
		return new Ls(this.l + Ds * (e ?? 1), this.a, this.b, this.opacity);
	},
	darker(e) {
		return new Ls(this.l - Ds * (e ?? 1), this.a, this.b, this.opacity);
	},
	rgb() {
		var e = (this.l + 16) / 116, t = isNaN(this.a) ? e : e + this.a / 500, n = isNaN(this.b) ? e : e - this.b / 200;
		return t = Os * zs(t), e = ks * zs(e), n = As * zs(n), new $(Bs(3.1338561 * t - 1.6168667 * e - .4906146 * n), Bs(-.9787684 * t + 1.9161415 * e + .033454 * n), Bs(.0719453 * t - .2289914 * e + 1.4052427 * n), this.opacity);
	}
}));
function Rs(e) {
	return e > Ps ? e ** (1 / 3) : e / Ns + js;
}
function zs(e) {
	return e > Ms ? e * e * e : Ns * (e - js);
}
function Bs(e) {
	return 255 * (e <= .0031308 ? 12.92 * e : 1.055 * e ** (1 / 2.4) - .055);
}
function Vs(e) {
	return (e /= 255) <= .04045 ? e / 12.92 : ((e + .055) / 1.055) ** 2.4;
}
function Hs(e) {
	if (e instanceof Ws) return new Ws(e.h, e.c, e.l, e.opacity);
	if (e instanceof Ls || (e = Fs(e)), e.a === 0 && e.b === 0) return new Ws(NaN, 0 < e.l && e.l < 100 ? 0 : NaN, e.l, e.opacity);
	var t = Math.atan2(e.b, e.a) * Es;
	return new Ws(t < 0 ? t + 360 : t, Math.sqrt(e.a * e.a + e.b * e.b), e.l, e.opacity);
}
function Us(e, t, n, r) {
	return arguments.length === 1 ? Hs(e) : new Ws(e, t, n, r ?? 1);
}
function Ws(e, t, n, r) {
	this.h = +e, this.c = +t, this.l = +n, this.opacity = +r;
}
function Gs(e) {
	if (isNaN(e.h)) return new Ls(e.l, 0, 0, e.opacity);
	var t = e.h * Ts;
	return new Ls(e.l, Math.cos(t) * e.c, Math.sin(t) * e.c, e.opacity);
}
Vo(Ws, Us, Ho(Uo, {
	brighter(e) {
		return new Ws(this.h, this.c, this.l + Ds * (e ?? 1), this.opacity);
	},
	darker(e) {
		return new Ws(this.h, this.c, this.l - Ds * (e ?? 1), this.opacity);
	},
	rgb() {
		return Gs(this).rgb();
	}
}));
var Ks = -.14861, qs = 1.78277, Js = -.29227, Ys = -.90649, Xs = 1.97294, Zs = Xs * Ys, Qs = Xs * qs, $s = qs * Js - Ys * Ks;
function ec(e) {
	if (e instanceof nc) return new nc(e.h, e.s, e.l, e.opacity);
	e instanceof $ || (e = us(e));
	var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = ($s * r + Zs * t - Qs * n) / ($s + Zs - Qs), a = r - i, o = (Xs * (n - i) - Js * a) / Ys, s = Math.sqrt(o * o + a * a) / (Xs * i * (1 - i)), c = s ? Math.atan2(o, a) * Es - 120 : NaN;
	return new nc(c < 0 ? c + 360 : c, s, i, e.opacity);
}
function tc(e, t, n, r) {
	return arguments.length === 1 ? ec(e) : new nc(e, t, n, r ?? 1);
}
function nc(e, t, n, r) {
	this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
Vo(nc, tc, Ho(Uo, {
	brighter(e) {
		return e = e == null ? Go : Go ** +e, new nc(this.h, this.s, this.l * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Wo : Wo ** +e, new nc(this.h, this.s, this.l * e, this.opacity);
	},
	rgb() {
		var e = isNaN(this.h) ? 0 : (this.h + 120) * Ts, t = +this.l, n = isNaN(this.s) ? 0 : this.s * t * (1 - t), r = Math.cos(e), i = Math.sin(e);
		return new $(255 * (t + n * (Ks * r + qs * i)), 255 * (t + n * (Js * r + Ys * i)), 255 * (t + Xs * r * n), this.opacity);
	}
}));
var rc = (e) => () => e;
function ic(e, t) {
	return function(n) {
		return e + n * t;
	};
}
function ac(e, t, n) {
	return e **= +n, t = t ** +n - e, n = 1 / n, function(r) {
		return (e + r * t) ** +n;
	};
}
function oc(e, t) {
	var n = t - e;
	return n ? ic(e, n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n) : rc(isNaN(e) ? t : e);
}
function sc(e) {
	return (e = +e) == 1 ? cc : function(t, n) {
		return n - t ? ac(t, n, e) : rc(isNaN(t) ? n : t);
	};
}
function cc(e, t) {
	var n = t - e;
	return n ? ic(e, n) : rc(isNaN(e) ? t : e);
}
var lc = (function e(t) {
	var n = sc(t);
	function r(e, t) {
		var r = n((e = ds(e)).r, (t = ds(t)).r), i = n(e.g, t.g), a = n(e.b, t.b), o = cc(e.opacity, t.opacity);
		return function(t) {
			return e.r = r(t), e.g = i(t), e.b = a(t), e.opacity = o(t), e + "";
		};
	}
	return r.gamma = e, r;
})(1);
function uc(e, t) {
	t ||= [];
	var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), i;
	return function(a) {
		for (i = 0; i < n; ++i) r[i] = e[i] * (1 - a) + t[i] * a;
		return r;
	};
}
function dc(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function fc(e, t) {
	for (var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, i = Array(r), a = Array(n), o = 0; o < r; ++o) i[o] = xc(e[o], t[o]);
	for (; o < n; ++o) a[o] = t[o];
	return function(e) {
		for (o = 0; o < r; ++o) a[o] = i[o](e);
		return a;
	};
}
function pc(e, t) {
	var n = /* @__PURE__ */ new Date();
	return e = +e, t = +t, function(r) {
		return n.setTime(e * (1 - r) + t * r), n;
	};
}
function mc(e, t) {
	return e = +e, t = +t, function(n) {
		return e * (1 - n) + t * n;
	};
}
function hc(e, t) {
	var n = {}, r = {}, i;
	for (i in typeof e == "object" && e || (e = {}), typeof t == "object" && t || (t = {}), t) i in e ? n[i] = xc(e[i], t[i]) : r[i] = t[i];
	return function(e) {
		for (i in n) r[i] = n[i](e);
		return r;
	};
}
var gc = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, _c = new RegExp(gc.source, "g");
function vc(e) {
	return function() {
		return e;
	};
}
function yc(e) {
	return function(t) {
		return e(t) + "";
	};
}
function bc(e, t) {
	var n = gc.lastIndex = _c.lastIndex = 0, r, i, a, o = -1, s = [], c = [];
	for (e += "", t += ""; (r = gc.exec(e)) && (i = _c.exec(t));) (a = i.index) > n && (a = t.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, c.push({
		i: o,
		x: mc(r, i)
	})), n = _c.lastIndex;
	return n < t.length && (a = t.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? c[0] ? yc(c[0].x) : vc(t) : (t = c.length, function(e) {
		for (var n = 0, r; n < t; ++n) s[(r = c[n]).i] = r.x(e);
		return s.join("");
	});
}
function xc(e, t) {
	var n = typeof t, r;
	return t == null || n === "boolean" ? rc(t) : (n === "number" ? mc : n === "string" ? (r = ss(t)) ? (t = r, lc) : bc : t instanceof ss ? lc : t instanceof Date ? pc : dc(t) ? uc : Array.isArray(t) ? fc : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? hc : mc)(e, t);
}
function Sc(e, t) {
	return e = +e, t = +t, function(n) {
		return Math.round(e * (1 - n) + t * n);
	};
}
var Cc = 1e-12;
function wc(e) {
	return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Tc(e) {
	return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Ec(e) {
	return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
(function e(t, n, r) {
	function i(e, i) {
		var a = e[0], o = e[1], s = e[2], c = i[0], l = i[1], u = i[2], d = c - a, f = l - o, p = d * d + f * f, m, h;
		if (p < Cc) h = Math.log(u / s) / t, m = function(e) {
			return [
				a + e * d,
				o + e * f,
				s * Math.exp(t * e * h)
			];
		};
		else {
			var g = Math.sqrt(p), _ = (u * u - s * s + r * p) / (2 * s * n * g), v = (u * u - s * s - r * p) / (2 * u * n * g), y = Math.log(Math.sqrt(_ * _ + 1) - _);
			h = (Math.log(Math.sqrt(v * v + 1) - v) - y) / t, m = function(e) {
				var r = e * h, i = wc(y), c = s / (n * g) * (i * Ec(t * r + y) - Tc(y));
				return [
					a + c * d,
					o + c * f,
					s * i / wc(t * r + y)
				];
			};
		}
		return m.duration = Math.abs(h) * 1e3 * t / Math.SQRT2, m;
	}
	return i.rho = function(t) {
		var n = Math.max(.001, +t), r = n * n;
		return e(n, r, r * r);
	}, i;
})(Math.SQRT2, 2, 4);
function Dc(e) {
	return (function t(n) {
		n = +n;
		function r(t, r) {
			var i = e((t = tc(t)).h, (r = tc(r)).h), a = cc(t.s, r.s), o = cc(t.l, r.l), s = cc(t.opacity, r.opacity);
			return function(e) {
				return t.h = i(e), t.s = a(e), t.l = o(e ** +n), t.opacity = s(e), t + "";
			};
		}
		return r.gamma = t, r;
	})(1);
}
Dc(oc), Dc(cc);
// node_modules/d3-format/dist/d3-format.mjs
function Oc(e) {
	return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function kc(e, t) {
	if (!isFinite(e) || e === 0) return null;
	var n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), r = e.slice(0, n);
	return [r.length > 1 ? r[0] + r.slice(2) : r, +e.slice(n + 1)];
}
function Ac(e) {
	return e = kc(Math.abs(e)), e ? e[1] : NaN;
}
function jc(e, t) {
	return function(n, r) {
		for (var i = n.length, a = [], o = 0, s = e[0], c = 0; i > 0 && s > 0 && (c + s + 1 > r && (s = Math.max(1, r - c)), a.push(n.substring(i -= s, i + s)), !((c += s + 1) > r));) s = e[o = (o + 1) % e.length];
		return a.reverse().join(t);
	};
}
function Mc(e) {
	return function(t) {
		return t.replace(/[0-9]/g, function(t) {
			return e[+t];
		});
	};
}
var Nc = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Pc(e) {
	if (!(t = Nc.exec(e))) throw Error("invalid format: " + e);
	var t;
	return new Fc({
		fill: t[1],
		align: t[2],
		sign: t[3],
		symbol: t[4],
		zero: t[5],
		width: t[6],
		comma: t[7],
		precision: t[8] && t[8].slice(1),
		trim: t[9],
		type: t[10]
	});
}
Pc.prototype = Fc.prototype;
function Fc(e) {
	this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
Fc.prototype.toString = function() {
	return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function Ic(e) {
	out: for (var t = e.length, n = 1, r = -1, i; n < t; ++n) switch (e[n]) {
		case ".":
			r = i = n;
			break;
		case "0":
			r === 0 && (r = n), i = n;
			break;
		default:
			if (!+e[n]) break out;
			r > 0 && (r = 0);
	}
	return r > 0 ? e.slice(0, r) + e.slice(i + 1) : e;
}
var Lc;
function Rc(e, t) {
	var n = kc(e, t);
	if (!n) return Lc = void 0, e.toPrecision(t);
	var r = n[0], i = n[1], a = i - (Lc = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = r.length;
	return a === o ? r : a > o ? r + Array(a - o + 1).join("0") : a > 0 ? r.slice(0, a) + "." + r.slice(a) : "0." + Array(1 - a).join("0") + kc(e, Math.max(0, t + a - 1))[0];
}
function zc(e, t) {
	var n = kc(e, t);
	if (!n) return e + "";
	var r = n[0], i = n[1];
	return i < 0 ? "0." + Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + Array(i - r.length + 2).join("0");
}
var Bc = {
	"%": (e, t) => (e * 100).toFixed(t),
	b: (e) => Math.round(e).toString(2),
	c: (e) => e + "",
	d: Oc,
	e: (e, t) => e.toExponential(t),
	f: (e, t) => e.toFixed(t),
	g: (e, t) => e.toPrecision(t),
	o: (e) => Math.round(e).toString(8),
	p: (e, t) => zc(e * 100, t),
	r: zc,
	s: Rc,
	X: (e) => Math.round(e).toString(16).toUpperCase(),
	x: (e) => Math.round(e).toString(16)
};
function Vc(e) {
	return e;
}
var Hc = Array.prototype.map, Uc = [
	"y",
	"z",
	"a",
	"f",
	"p",
	"n",
	"µ",
	"m",
	"",
	"k",
	"M",
	"G",
	"T",
	"P",
	"E",
	"Z",
	"Y"
];
function Wc(e) {
	var t = e.grouping === void 0 || e.thousands === void 0 ? Vc : jc(Hc.call(e.grouping, Number), e.thousands + ""), n = e.currency === void 0 ? "" : e.currency[0] + "", r = e.currency === void 0 ? "" : e.currency[1] + "", i = e.decimal === void 0 ? "." : e.decimal + "", a = e.numerals === void 0 ? Vc : Mc(Hc.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", s = e.minus === void 0 ? "−" : e.minus + "", c = e.nan === void 0 ? "NaN" : e.nan + "";
	function l(e, l) {
		e = Pc(e);
		var u = e.fill, d = e.align, f = e.sign, p = e.symbol, m = e.zero, h = e.width, g = e.comma, _ = e.precision, v = e.trim, y = e.type;
		y === "n" ? (g = !0, y = "g") : Bc[y] || (_ === void 0 && (_ = 12), v = !0, y = "g"), (m || u === "0" && d === "=") && (m = !0, u = "0", d = "=");
		var b = (l && l.prefix !== void 0 ? l.prefix : "") + (p === "$" ? n : p === "#" && /[boxX]/.test(y) ? "0" + y.toLowerCase() : ""), x = (p === "$" ? r : /[%p]/.test(y) ? o : "") + (l && l.suffix !== void 0 ? l.suffix : ""), S = Bc[y], C = /[defgprs%]/.test(y);
		_ = _ === void 0 ? 6 : /[gprs]/.test(y) ? Math.max(1, Math.min(21, _)) : Math.max(0, Math.min(20, _));
		function w(e) {
			var n = b, r = x, o, l, p;
			if (y === "c") r = S(e) + r, e = "";
			else {
				e = +e;
				var w = e < 0 || 1 / e < 0;
				if (e = isNaN(e) ? c : S(Math.abs(e), _), v && (e = Ic(e)), w && +e == 0 && f !== "+" && (w = !1), n = (w ? f === "(" ? f : s : f === "-" || f === "(" ? "" : f) + n, r = (y === "s" && !isNaN(e) && Lc !== void 0 ? Uc[8 + Lc / 3] : "") + r + (w && f === "(" ? ")" : ""), C) {
					for (o = -1, l = e.length; ++o < l;) if (p = e.charCodeAt(o), 48 > p || p > 57) {
						r = (p === 46 ? i + e.slice(o + 1) : e.slice(o)) + r, e = e.slice(0, o);
						break;
					}
				}
			}
			g && !m && (e = t(e, Infinity));
			var T = n.length + e.length + r.length, E = T < h ? Array(h - T + 1).join(u) : "";
			switch (g && m && (e = t(E + e, E.length ? h - r.length : Infinity), E = ""), d) {
				case "<":
					e = n + e + r + E;
					break;
				case "=":
					e = n + E + e + r;
					break;
				case "^":
					e = E.slice(0, T = E.length >> 1) + n + e + r + E.slice(T);
					break;
				default: e = E + n + e + r;
			}
			return a(e);
		}
		return w.toString = function() {
			return e + "";
		}, w;
	}
	function u(e, t) {
		var n = Math.max(-8, Math.min(8, Math.floor(Ac(t) / 3))) * 3, r = 10 ** -n, i = l((e = Pc(e), e.type = "f", e), { suffix: Uc[8 + n / 3] });
		return function(e) {
			return i(r * e);
		};
	}
	return {
		format: l,
		formatPrefix: u
	};
}
var Gc, Kc, qc;
Jc({
	thousands: ",",
	grouping: [3],
	currency: ["$", ""]
});
function Jc(e) {
	return Gc = Wc(e), Kc = Gc.format, qc = Gc.formatPrefix, Gc;
}
function Yc(e) {
	return Math.max(0, -Ac(Math.abs(e)));
}
function Xc(e, t) {
	return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Ac(t) / 3))) * 3 - Ac(Math.abs(e)));
}
function Zc(e, t) {
	return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, Ac(t) - Ac(e)) + 1;
}
// node_modules/d3-scale/dist/d3-scale.mjs
function Qc(e, t) {
	switch (arguments.length) {
		case 0: break;
		case 1:
			this.range(e);
			break;
		default: this.range(t).domain(e);
	}
	return this;
}
function $c(e) {
	return function() {
		return e;
	};
}
function el(e) {
	return +e;
}
var tl = [0, 1];
function nl(e) {
	return e;
}
function rl(e, t) {
	return (t -= e = +e) ? function(n) {
		return (n - e) / t;
	} : $c(isNaN(t) ? NaN : .5);
}
function il(e, t) {
	var n;
	return e > t && (n = e, e = t, t = n), function(n) {
		return Math.max(e, Math.min(t, n));
	};
}
function al(e, t, n) {
	var r = e[0], i = e[1], a = t[0], o = t[1];
	return i < r ? (r = rl(i, r), a = n(o, a)) : (r = rl(r, i), a = n(a, o)), function(e) {
		return a(r(e));
	};
}
function ol(e, t, n) {
	var r = Math.min(e.length, t.length) - 1, i = Array(r), a = Array(r), o = -1;
	for (e[r] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < r;) i[o] = rl(e[o], e[o + 1]), a[o] = n(t[o], t[o + 1]);
	return function(t) {
		var n = No(e, t, 1, r) - 1;
		return a[n](i[n](t));
	};
}
function sl(e, t) {
	return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function cl() {
	var e = tl, t = tl, n = xc, r, i, a, o = nl, s, c, l;
	function u() {
		var n = Math.min(e.length, t.length);
		return o !== nl && (o = il(e[0], e[n - 1])), s = n > 2 ? ol : al, c = l = null, d;
	}
	function d(i) {
		return i == null || isNaN(i = +i) ? a : (c ||= s(e.map(r), t, n))(r(o(i)));
	}
	return d.invert = function(n) {
		return o(i((l ||= s(t, e.map(r), mc))(n)));
	}, d.domain = function(t) {
		return arguments.length ? (e = Array.from(t, el), u()) : e.slice();
	}, d.range = function(e) {
		return arguments.length ? (t = Array.from(e), u()) : t.slice();
	}, d.rangeRound = function(e) {
		return t = Array.from(e), n = Sc, u();
	}, d.clamp = function(e) {
		return arguments.length ? (o = e ? !0 : nl, u()) : o !== nl;
	}, d.interpolate = function(e) {
		return arguments.length ? (n = e, u()) : n;
	}, d.unknown = function(e) {
		return arguments.length ? (a = e, d) : a;
	}, function(e, t) {
		return r = e, i = t, u();
	};
}
function ll() {
	return cl()(nl, nl);
}
function ul(e, t, n, r) {
	var i = Bo(e, t, n), a;
	switch (r = Pc(r ?? ",f"), r.type) {
		case "s":
			var o = Math.max(Math.abs(e), Math.abs(t));
			return r.precision == null && !isNaN(a = Xc(i, o)) && (r.precision = a), qc(r, o);
		case "":
		case "e":
		case "g":
		case "p":
		case "r":
			r.precision == null && !isNaN(a = Zc(i, Math.max(Math.abs(e), Math.abs(t)))) && (r.precision = a - (r.type === "e"));
			break;
		case "f":
		case "%": r.precision == null && !isNaN(a = Yc(i)) && (r.precision = a - (r.type === "%") * 2);
	}
	return Kc(r);
}
function dl(e) {
	var t = e.domain;
	return e.ticks = function(e) {
		var n = t();
		return Ro(n[0], n[n.length - 1], e ?? 10);
	}, e.tickFormat = function(e, n) {
		var r = t();
		return ul(r[0], r[r.length - 1], e ?? 10, n);
	}, e.nice = function(n) {
		n ??= 10;
		var r = t(), i = 0, a = r.length - 1, o = r[i], s = r[a], c, l, u = 10;
		for (s < o && (l = o, o = s, s = l, l = i, i = a, a = l); u-- > 0;) {
			if (l = zo(o, s, n), l === c) return r[i] = o, r[a] = s, t(r);
			if (l > 0) o = Math.floor(o / l) * l, s = Math.ceil(s / l) * l;
			else if (l < 0) o = Math.ceil(o * l) / l, s = Math.floor(s * l) / l;
			else break;
			c = l;
		}
		return e;
	}, e;
}
function fl() {
	var e = ll();
	return e.copy = function() {
		return sl(e, fl());
	}, Qc.apply(e, arguments), dl(e);
}
// src/core/colors.ts
var pl = "#27ae60", ml = "#95a5a6", hl = "#d5dbdb", gl = {
	query: { label: "Query genes" },
	sequence_length: {
		label: "Protein length",
		field: "sequence_length"
	},
	gc_content: {
		label: "GC content",
		field: "gc_content"
	},
	nr_exons: {
		label: "Number of exons",
		field: "nr_exons"
	},
	similarity: {
		label: "Gene function similarity",
		field: "similarity"
	}
}, _l = ["red", "blue"];
function vl(e) {
	let t = [...e];
	return Object.keys(gl).filter((e) => {
		let n = gl[e].field;
		return !n || t.some((e) => typeof e[n] == "number");
	});
}
function yl(e, t, n) {
	let r = gl[e];
	if (!r.field) return { color: (e, t) => n(t) ? pl : ml };
	let i = r.field, a = [...t].map((e) => e[i]).filter((e) => typeof e == "number"), o = Math.min(...a), s = Math.max(...a), c = a.length ? [o, s === o ? o + 1 : s] : [0, 1], l = fl().domain(c).range(_l);
	return {
		color: (e) => {
			let t = e?.[i];
			return typeof t == "number" ? l(t) : hl;
		},
		legend: {
			label: r.label,
			domain: c,
			colors: _l
		}
	};
}
function bl(e, t = 6) {
	return fl().domain(e).ticks(t);
}
// src/core/levels.ts
function xl(e) {
	let t = {};
	for (let n of Object.keys(e)) {
		let r = e[n];
		for (let e of Object.keys(r)) {
			let n = t[e] ??= [];
			r[e].forEach((e, t) => {
				(n[t] === void 0 || n[t] < e.length) && (n[t] = e.length);
			});
		}
	}
	return t;
}
function Sl(e) {
	let { perSpecies: t, maxima: n, species: r, level: i, famData: a, hogMetadata: o } = e, s = Number(e.coverageThreshold ?? 0), c, l = 0;
	for (let e of r) {
		let n = t[e]?.[i];
		n && n.length !== 0 && (l += 1, c ??= n.map((e, t) => ({
			index: t,
			name: `hog_${t}`,
			genes: [],
			numberSpecies: 0,
			maxInHog: 0
		})), n.forEach((e, t) => {
			if (e.length > 0) {
				let n = c[t];
				n.genes = n.genes.concat(e), n.numberSpecies += 1, n.maxInHog = Math.max(n.maxInHog, e.length);
			}
		}));
	}
	let u = [], d = [], f = 0;
	for (let e of c ?? []) {
		let t = e.numberSpecies * 100 / l;
		if (!(t >= s)) {
			d.push(e.index);
			continue;
		}
		let n = {
			...e,
			coverage: t,
			start: f
		}, r = e.genes.map((e) => a?.get(e)?.protid).find((e) => e);
		r && (n.protId = r);
		let c = o?.[e.genes[0]]?.[i];
		c && (n.hogId = c.split("_")[0], n.name = n.hogId), u.push(n), f += e.maxInHog;
	}
	let p = new Set(d), m = n[i] ?? [], h = /* @__PURE__ */ new Map();
	return {
		level: i,
		columns: u,
		removed: d,
		numberSpecies: l,
		totalSlots: f,
		row: (e) => {
			let n = h.get(e);
			if (n) return n;
			n = [];
			let r = 0;
			return (t[e]?.[i] ?? []).forEach((e, t) => {
				p.has(t) || ([...e].sort().forEach((e, i) => {
					n.push({
						id: e,
						hog: t,
						slot: r + i,
						posInHog: i
					});
				}), r += m[t]);
			}), h.set(e, n), n;
		}
	};
}
// src/core/links.ts
function Cl(e = "") {
	let t = e.replace(/\/$/, "");
	return {
		links: {
			gene: `${t}/oma/vps/{xref}/`,
			hogFasta: `${t}/oma/hog/{hogId}/{level}/fasta`,
			hogMembers: `${t}/oma/hog/{hogId}/{level}/table/`,
			hogViewer: `${t}/oma/hog/{hogId}/{level}/iham/`,
			hogChromosome: `${t}/oma/ancestralgenome/{level}/chromosome/?query={hogId}`
		},
		api: {
			goAnnotations: `${t}/api/protein/{protId}/gene_ontology/?format=json`,
			hogLookup: `${t}/api/hog/{protId}/members/?level={level}`
		}
	};
}
var wl = {
	links: {},
	api: {}
};
function Tl(e, t) {
	if (!e) return;
	let n = !1, r = e.replace(/\{(\w+)\}/g, (e, r) => {
		let i = t[r];
		return i === void 0 || i === "" ? (n = !0, "") : encodeURIComponent(String(i));
	});
	return n || !El(r) ? void 0 : r;
}
function El(e) {
	let t = /^([a-z][a-z0-9+.-]*):/i.exec(e);
	return !t || /^https?$/i.test(t[1]);
}
// src/core/tree.ts
function Dl(e) {
	let t = {}, n = (e) => {
		if (e?.children) {
			for (let n of e.children) t[n.name] = e.name;
			e.children.forEach(n);
		}
	};
	return n(e), t;
}
function Ol(e) {
	let t = (e) => {
		if (!e.children) return {
			cnts: 1,
			data: e
		};
		let n = e.children.map(t);
		return n.sort((e, t) => e.cnts === t.cnts ? e.data.name.localeCompare(t.data.name) : e.cnts - t.cnts), e.children = n.map((e) => e.data), {
			cnts: n.reduce((e, t) => e + t.cnts, 0),
			data: e
		};
	};
	return t(e).data;
}
function kl(e) {
	let t = [], n = (e, r, i) => {
		let a = {
			id: t.length,
			name: e.name ?? "",
			parent: r,
			children: [],
			depth: i,
			leafNames: []
		};
		return t.push(a), a.children = (e.children ?? []).map((e) => n(e, a, i + 1)), a.leafNames = a.children.length ? a.children.flatMap((e) => e.leafNames) : [a.name], a;
	};
	return {
		root: n(e, void 0, 0),
		nodes: t
	};
}
function Al(e, t) {
	let n = [], r = [], i = [], a = /* @__PURE__ */ new Map(), o = (e) => {
		let n = !e.children.length || t.has(e.id) ? 0 : 1 + Math.max(...e.children.map(o));
		return a.set(e.id, n), n;
	}, s = o(e) || 1, c = (e) => {
		let o = t.has(e.id) && e.children.length > 0, l = !e.children.length || o, u = {
			node: e,
			x: 1 - a.get(e.id) / s,
			y: 0,
			isRow: l,
			collapsed: o
		};
		if (n.push(u), l) u.y = r.length, r.push(u);
		else {
			let t = e.children.map(c);
			u.y = (t[0].y + t[t.length - 1].y) / 2;
			for (let e of t) i.push({
				from: u,
				to: e
			});
		}
		return u;
	};
	return c(e), {
		nodes: n,
		rows: r,
		links: i
	};
}
function jl(e, t) {
	let n = new Set(t.leafNames), r = -1, i = -1;
	return e.rows.forEach((e, t) => {
		n.has(e.node.leafNames[0]) && (r < 0 && (r = t), i = t + 1);
	}), r < 0 ? {
		start: 0,
		end: 0
	} : {
		start: r,
		end: i
	};
}
// src/core/newick.ts
function Ml(e) {
	let t = [], n = {}, r = e.split(/(\s*;|\(|\)|,|:|"\s*)/), i = !1;
	for (let e = 0; e < r.length; e++) {
		let a = r[e];
		if (i && a !== "\"") n.name = (n.name ?? "") + a;
		else switch (a = a.trim(), a) {
			case "\"":
				i = !i;
				break;
			case "(": {
				let e = {};
				n.children = [e], t.push(n), n = e;
				break;
			}
			case ",": {
				let e = {};
				t[t.length - 1].children.push(e), n = e;
				break;
			}
			case ")":
				n = t.pop();
				break;
			case ":": break;
			default: {
				let t = r[e - 1];
				t === ")" || t === "(" || t === "," ? n.name = a : t === ":" && (n.branch_length = parseFloat(a));
			}
		}
	}
	return n;
}
// src/core/phyloxml.ts
function Nl(e) {
	let t = new DOMParser().parseFromString(e, "application/xml"), n = t.getElementsByTagName("parsererror")[0];
	if (n) throw Error(`Invalid phyloXML: ${n.textContent?.trim()}`);
	let r = Il(Il(t.documentElement, "phylogeny") ?? t.documentElement, "clade");
	if (!r) throw Error("phyloXML contains no clade");
	return Pl(r);
}
function Pl(e) {
	let t = {}, n = Il(e, "name")?.textContent?.trim();
	if (n) t.name = n;
	else {
		let n = Il(e, "taxonomy"), r = n && Il(n, "scientific_name")?.textContent?.trim();
		r && (t.name = r);
	}
	let r = Il(e, "branch_length")?.textContent ?? e.getAttribute("branch_length");
	r && (t.branch_length = parseFloat(r));
	let i = Fl(e, "clade").map(Pl);
	return i.length && (t.children = i), t;
}
function Fl(e, t) {
	return Array.from(e.children).filter((e) => e.localName === t);
}
function Il(e, t) {
	return Fl(e, t)[0];
}
// src/core/orthoxml.ts
function Ll(e) {
	if (typeof e != "string") return e;
	let t = e.trimStart();
	return t.startsWith("<?xml") || t.startsWith("<phyloxml") ? Nl(t) : Ml(t);
}
function Rl(e, t, n = {}) {
	let r = new DOMParser().parseFromString(t, "application/xml"), i = r.getElementsByTagName("parsererror")[0];
	if (i) throw Error(`Invalid OrthoXML: ${i.textContent?.trim()}`);
	let a = n.augmented ?? zl(r), o = n.queryHog ?? null, s = {}, c = {}, l = [], u = {}, d = {}, f = [], p, m = {}, h = 0, g = "", _ = [], v = /* @__PURE__ */ new Set(), y = {}, b = (e) => (y[e] = y[e] === void 0 ? 0 : y[e] + 1, y[e]), x = Ll(e), S = () => {
		let e = (t) => {
			if (t !== void 0 && t.children !== void 0) {
				let n = t.children.map(e).filter((e) => e !== void 0);
				if (f.indexOf(t.name) >= 0) {
					for (let e in u) u[e] === t.name && (u[e] += " (species)");
					f[f.indexOf(t.name)] += " (species)", n.push({ name: `${t.name} (species)` });
				}
				return n.length === 0 ? void 0 : n.length === 1 ? (v.add(t.name), n[0]) : {
					name: t.name,
					children: n
				};
			}
			if (t && f.indexOf(t.name) >= 0) return { name: t.name };
		};
		return e(x);
	}, C = (e, t, n) => {
		for (let r of e) {
			let e = u[r], i = s[e] ??= {}, a = i[t] ??= [];
			for (; a.length <= n;) a.push([]);
			a[n].push(r);
		}
	}, w = (e) => {
		let t = u[e], n = [t], r = m[t];
		for (; r !== void 0;) n.push(r), r = m[r];
		return n;
	}, T = (e) => {
		let t = w(e[0]), n = t.map(() => 0);
		for (let r of e) {
			let e = w(r).findIndex((e) => t.indexOf(e) >= 0);
			for (let r = e; r < t.length; r++) n[r]++;
		}
		return t[n.indexOf(e.length)];
	}, E = (e) => {
		for (let t of Object.keys(e.speciesSublevels)) {
			if (t === e.lev) continue;
			let n = e.speciesSublevels[t], r = m[t];
			for (; r !== void 0 && r !== e.lev;) C(n, r, b(r)), r = m[r];
		}
	}, ee = (e) => {
		let t = _[_.length - 1];
		switch (e.localName) {
			case "species":
				g = e.getAttribute("name") ?? "", f.push(g);
				break;
			case "gene": {
				let t = parseInt(e.getAttribute("id") ?? "", 10);
				u[t] = g, d[t] = e.getAttribute("protId") ?? "";
				break;
			}
			case "geneRef": {
				let n = parseInt(e.getAttribute("id") ?? "", 10);
				if (t.memb.push(n), a) {
					let e = {};
					for (let t of _) e[String(t.lev)] = t.hogId;
					c[n] = e;
				} else {
					let e = u[n];
					C([n], e, b(e)), (t.speciesSublevels[e] ??= []).push(n);
				}
				break;
			}
			case "orthologGroup": {
				let t = {
					memb: [],
					speciesSublevels: {}
				};
				a && (t.hogId = e.getAttribute("id") ?? void 0), h += 1, _.push(t);
				break;
			}
			case "property":
				e.getAttribute("name") === "TaxRange" && t && (t.lev = e.getAttribute("value") ?? void 0);
				break;
			case "groups": p = S(), m = Dl(p);
		}
	}, D = (e) => {
		if (e.localName !== "orthologGroup") return;
		let t = _.pop();
		if (t.hogId && o === t.hogId && (l = t.memb.slice()), t.lev === void 0 && (t.lev = T(t.memb)), v.has(t.lev) || (C(t.memb, t.lev, b(t.lev)), E(t)), --h, h > 0) {
			let e = _[_.length - 1];
			if (e.memb.push(...t.memb), !a) {
				let n = m[t.lev];
				for (; n !== void 0 && n !== e.lev;) C(t.memb, n, b(n)), n = m[n];
			}
		}
	}, te = (e) => {
		ee(e);
		for (let t of Array.from(e.children)) te(t);
		D(e);
	};
	te(r.documentElement);
	for (let e of Object.keys(s)) {
		let t = s[e];
		for (let e of Object.keys(t)) {
			for (let n of t[e]) n.sort();
			for (; y[e] >= t[e].length;) t[e].push([]);
		}
	}
	if (!p) throw Error("OrthoXML contains no <groups> element");
	return {
		perSpecies: s,
		hogMetadata: c,
		queryMembers: l,
		tree: Ol(p),
		xrefs: d,
		augmented: a
	};
}
function zl(e) {
	let t = Array.from(e.getElementsByTagNameNS("*", "orthologGroup"));
	return t.length > 0 && t.every((e) => e.hasAttribute("taxonId") || /^HOG:.+_\d+$/.test(e.getAttribute("id") ?? ""));
}
// src/composables/useHogData.ts
async function Bl(e) {
	let t = await fetch(e);
	if (!t.ok) throw Error(`${t.status} ${t.statusText} while loading ${e}`);
	return t.text();
}
function Vl() {
	return new Promise((e) => {
		let t = setTimeout(e, 100);
		typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(() => {
			clearTimeout(t), e();
		}));
	});
}
function Hl(e) {
	let t = /* @__PURE__ */ qt(null), n = /* @__PURE__ */ qt([]), r = /* @__PURE__ */ qt("idle"), i = Q(() => r.value !== "idle"), a = /* @__PURE__ */ qt(null), o = /* @__PURE__ */ qt(null), s = 0;
	return H(e, async (e) => {
		let i = e.orthoxml || e.orthoxmlUrl, c = e.speciesTree || e.speciesTreeUrl;
		if (!i || !c) {
			t.value = null;
			return;
		}
		let l = ++s;
		r.value = "loading", a.value = null, o.value = null;
		let u = null, d = e.famData ? Promise.resolve(e.famData) : e.famDataUrl ? Bl(e.famDataUrl).then((e) => JSON.parse(e)).catch((e) => (u = e instanceof Error ? e : Error(String(e)), [])) : Promise.resolve([]);
		try {
			let [i, a, c] = await Promise.all([
				e.orthoxml ?? Bl(e.orthoxmlUrl),
				e.speciesTree ?? Bl(e.speciesTreeUrl),
				d
			]);
			if (l !== s || (r.value = "processing", await Vl(), l !== s)) return;
			let f = Rl(a, i, {
				augmented: e.augmented,
				queryHog: e.queryHog
			});
			n.value = Array.isArray(c) ? c : [], o.value = u, t.value = f;
		} catch (e) {
			l === s && (a.value = e instanceof Error ? e : Error(String(e)), t.value = null);
		} finally {
			l === s && (r.value = "idle");
		}
	}, {
		immediate: !0,
		deep: !0
	}), {
		parsed: t,
		famData: n,
		famMap: Q(() => new Map(n.value.map((e) => [Number(e.id), e]))),
		loading: i,
		phase: r,
		error: a,
		famError: o
	};
}
var Ul = /* @__PURE__ */ new Map();
function Wl(e) {
	let t = Ul.get(e);
	return t || (t = fetch(e).then((e) => {
		if (!e.ok) throw Error(`${e.status} ${e.statusText}`);
		return e.json();
	}), t.catch(() => Ul.delete(e)), Ul.set(e, t)), t;
}
// src/components/GeneInfo.vue?vue&type=script&setup=true&lang.ts
var Gl = ["href"], Kl = { key: 1 }, ql = {
	key: 0,
	class: "iham-muted"
}, Jl = {
	key: 1,
	class: "iham-muted"
}, Yl = {
	key: 2,
	class: "iham-muted"
}, Xl = { key: 3 }, Zl = { class: "iham-muted" }, Ql = /* @__PURE__ */ Xn({
	__name: "GeneInfo",
	props: {
		geneId: { type: Number },
		gene: { type: Object },
		xref: { type: String },
		endpoints: { type: Object }
	},
	setup(e) {
		let t = e, n = Q(() => t.gene?.xrefid ?? t.xref), r = Q(() => Tl(t.endpoints.links.gene, {
			xref: n.value,
			protId: t.gene?.protid,
			geneId: t.geneId
		})), i = Q(() => Tl(t.endpoints.api.goAnnotations, { protId: t.gene?.protid })), a = /* @__PURE__ */ R(null), o = /* @__PURE__ */ R("idle");
		H(i, async (e) => {
			if (a.value = null, !e) o.value = "idle";
			else {
				o.value = "loading";
				try {
					let t = await Wl(e);
					if (e !== i.value) return;
					let n = /* @__PURE__ */ new Set();
					a.value = t.filter((e) => !n.has(e.GO_term) && n.add(e.GO_term)).map((e) => ({
						id: e.GO_term,
						name: e.name
					})), o.value = "done";
				} catch {
					e === i.value && (o.value = "error");
				}
			}
		}, { immediate: !0 });
		let s = Q(() => {
			let e = t.gene;
			return e ? [
				["Protein length", e.sequence_length],
				["GC content", typeof e.gc_content == "number" ? e.gc_content.toFixed(3) : void 0],
				["Exons", e.nr_exons]
			].filter(([, e]) => e != null) : [];
		});
		return (e, t) => (K(), q("dl", null, [
			n.value ? (K(), q(G, { key: 0 }, [t[0] ||= J("dt", null, "Cross reference", -1), J("dd", null, [r.value ? (K(), q("a", {
				key: 0,
				href: r.value,
				target: "_blank",
				rel: "noopener"
			}, M(n.value), 9, Gl)) : (K(), q("span", Kl, M(n.value), 1))])], 64)) : X("", !0),
			(K(!0), q(G, null, Sr(s.value, ([e, t]) => (K(), q(G, { key: e }, [J("dt", null, M(e), 1), J("dd", null, M(t), 1)], 64))), 128)),
			o.value === "idle" ? X("", !0) : (K(), q(G, { key: 1 }, [t[1] ||= J("dt", null, "GO annotations", -1), o.value === "loading" ? (K(), q("dd", ql, "loading…")) : o.value === "error" ? (K(), q("dd", Jl, "could not be loaded")) : a.value?.length ? (K(), q("dd", Xl, [J("ul", null, [(K(!0), q(G, null, Sr(a.value, (e) => (K(), q("li", { key: e.id }, [J("span", Zl, M(e.id), 1), ta(" " + M(e.name), 1)]))), 128))])])) : (K(), q("dd", Yl, "none"))], 64))
		]));
	}
}), $l = ["width", "height"], eu = [
	"aria-label",
	"transform",
	"onClick",
	"onKeydown"
], tu = /*@__PURE__*/ Xn({
	__name: "HogHeader",
	props: {
		columns: { type: Array },
		cellWidth: { type: Number },
		height: { type: Number },
		width: { type: Number },
		activeIndex: { type: [Number, null] }
	},
	emits: ["select"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (K(), q("svg", {
			class: "iham-header",
			width: e.width,
			height: e.height,
			role: "list",
			"aria-label": "HOG columns"
		}, [(K(!0), q(G, null, Sr(e.columns, (t) => (K(), q("g", {
			key: t.index,
			class: j(["iham-header-col", { "is-active": t.index === e.activeIndex }]),
			role: "listitem",
			tabindex: "0",
			"aria-label": `${t.name}: ${t.genes.length} genes, ${t.coverage.toFixed(0)}% of species`,
			transform: `translate(${(t.start + t.maxInHog / 2) * e.cellWidth},${e.height / 2})`,
			onClick: (e) => n("select", t, e),
			onKeydown: yo((e) => n("select", t, e), ["enter"])
		}, [
			J("title", null, M(t.name), 1),
			r[0] ||= J("circle", { r: "7" }, null, -1),
			r[1] ||= J("text", { dy: "0.35em" }, "?", -1)
		], 42, eu))), 128))], 8, $l));
	}
}), nu = ".iham-header{display:block}.iham-header-col{cursor:pointer}.iham-header-col circle{fill:var(--iham-bg,#fff);stroke:var(--iham-muted,#95a5a6)}.iham-header-col text{fill:var(--iham-muted,#95a5a6);text-anchor:middle;-webkit-user-select:none;user-select:none;font-size:9px}.iham-header-col:hover circle,.iham-header-col.is-active circle,.iham-header-col:focus-visible circle{stroke:var(--iham-accent,#2c3e50);stroke-width:2px}.iham-header-col:focus{outline:none}", ru = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, iu = /*#__PURE__*/ ru(tu, [["styles", [nu]]]), au = {
	key: 0,
	class: "iham-muted"
}, ou = ["href"], su = /* @__PURE__ */ Xn({
	__name: "HogInfo",
	props: {
		column: { type: Object },
		level: { type: String },
		endpoints: { type: Object }
	},
	emits: ["resolved"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = /* @__PURE__ */ R(null), a = /* @__PURE__ */ R("idle");
		H(() => [n.column, n.level], async ([e, t]) => {
			i.value = e.hogId ? {
				hogId: e.hogId,
				level: t
			} : null, a.value = "idle";
			let o = !e.hogId && Tl(n.endpoints.api.hogLookup, {
				protId: e.protId,
				level: t
			});
			if (o) {
				a.value = "loading";
				try {
					let t = await Wl(o);
					if (e !== n.column) return;
					i.value = {
						hogId: t.hog_id,
						level: t.level
					}, a.value = "idle", r("resolved", t.hog_id);
				} catch {
					e === n.column && (a.value = "error");
				}
			}
		}, { immediate: !0 });
		let o = Q(() => {
			let e = i.value;
			if (!e) return [];
			let t = {
				hogId: e.hogId,
				level: e.level
			}, r = n.endpoints.links;
			return [
				{
					label: "Sequences (FASTA)",
					href: Tl(r.hogFasta, t)
				},
				{
					label: `Show ${e.hogId} members`,
					href: Tl(r.hogMembers, t)
				},
				{
					label: `Set focal to ${e.hogId}`,
					href: Tl(r.hogViewer, t)
				},
				{
					label: "Locate in chromosome viewer",
					href: Tl(r.hogChromosome, t)
				}
			].filter((e) => !!e.href);
		});
		return (t, n) => (K(), q("ul", null, [
			J("li", null, M(e.column.genes.length) + " " + M(e.column.genes.length === 1 ? "gene" : "genes"), 1),
			J("li", null, M(e.column.coverage.toFixed(2)) + "% species represented", 1),
			a.value === "loading" ? (K(), q("li", au, "resolving HOG…")) : X("", !0),
			(K(!0), q(G, null, Sr(o.value, (e) => (K(), q("li", { key: e.label }, [J("a", {
				href: e.href,
				target: "_blank",
				rel: "noopener"
			}, M(e.label), 9, ou)]))), 128))
		]));
	}
}), cu = ["aria-label"], lu = /*#__PURE__*/ ru(/* @__PURE__ */ Xn({
	__name: "HogMatrix",
	props: {
		view: { type: Object },
		rows: { type: Array },
		famMap: { type: Map },
		color: { type: Function },
		cellWidth: { type: Number },
		rowHeight: { type: Number },
		viewport: { type: Object },
		cladeRows: { type: Object }
	},
	emits: ["geneHover", "geneClick"],
	setup(e, { expose: t, emit: n }) {
		let r = e, i = n, a = /* @__PURE__ */ R(null), o = /* @__PURE__ */ R(null), s = Q(() => Math.max(r.view.totalSlots * r.cellWidth, 1)), c = Q(() => r.rows.length * r.rowHeight), l = Q(() => {
			let e = Math.max(0, Math.min(r.viewport.width, s.value)), t = Math.max(0, Math.min(r.viewport.height, c.value));
			return {
				x: Math.max(0, Math.min(r.viewport.x, s.value - e)),
				y: Math.max(0, Math.min(r.viewport.y, c.value - t)),
				w: e,
				h: t
			};
		});
		function u(e) {
			return e.collapsed ? [] : r.view.row(e.node.name);
		}
		function d(e, t) {
			let n = 0, r = e.length;
			for (; n < r;) {
				let i = n + r >> 1;
				e[i].slot < t ? n = i + 1 : r = i;
			}
			return n;
		}
		let f = 0;
		function p() {
			f ||= requestAnimationFrame(() => {
				f = 0, m();
			});
		}
		function m() {
			let e = a.value, t = e?.getContext("2d");
			if (!e || !t) return;
			let { x: n, y: i, w: s, h: c } = l.value, f = window.devicePixelRatio || 1, p = Math.round(s * f), m = Math.round(c * f);
			(e.width !== p || e.height !== m) && (e.width = p, e.height = m), t.setTransform(f, 0, 0, f, 0, 0), t.clearRect(0, 0, s, c), t.translate(-n, -i);
			let h = r.cellWidth, g = r.rowHeight, _ = Math.floor((g - g * .8) / 2), v = Math.max(0, Math.floor(i / g)), y = Math.min(r.rows.length - 1, Math.ceil((i + c) / g)), b = Math.floor(n / h), x = Math.ceil((n + s) / h);
			for (let e = v; e <= y; e++) {
				let n = u(r.rows[e]);
				for (let i = d(n, b); i < n.length && n[i].slot <= x; i++) {
					let a = n[i];
					t.fillStyle = r.color(r.famMap.get(a.id), a.id), t.fillRect(a.slot * h + _, e * g + _, h - 2 * _, g - 2 * _);
				}
			}
			let S = Math.max(i, r.cladeRows.start * g), C = Math.min(i + c, r.cladeRows.end * g);
			t.strokeStyle = getComputedStyle(e).getPropertyValue("--iham-separator").trim() || "#000", t.lineWidth = 2, t.beginPath();
			let w = r.view.columns;
			for (let e = 0; e < w.length - 1; e++) {
				let r = (w[e].start + w[e].maxInHog) * h;
				C > S && r >= n - 2 && r <= n + s + 2 && (t.moveTo(r, S), t.lineTo(r, C));
			}
			t.stroke();
			let T = o.value;
			T && (t.strokeStyle = "#000", t.lineWidth = 1.5, t.strokeRect(T.cell.slot * h + _ - 1, T.row * g + _ - 1, h - 2 * _ + 2, g - 2 * _ + 2));
		}
		function h(e) {
			let t = a.value.getBoundingClientRect(), n = e.clientX - t.left + l.value.x, i = e.clientY - t.top + l.value.y, o = Math.floor(i / r.rowHeight), s = r.rows[o];
			if (!s) return null;
			let c = Math.floor(n / r.cellWidth), f = u(s), p = f[d(f, c)];
			return p && p.slot === c ? {
				cell: p,
				row: o
			} : null;
		}
		function g(e) {
			let t = h(e);
			t?.cell !== o.value?.cell && (o.value = t, p()), i("geneHover", t?.cell ?? null, e);
		}
		function _(e) {
			o.value && (o.value = null, p()), i("geneHover", null, e);
		}
		function v(e) {
			let t = h(e);
			t && i("geneClick", t.cell, e);
		}
		return H(() => [
			r.view,
			r.rows,
			r.color,
			r.famMap,
			l.value,
			r.cladeRows
		], p), fr(m), t({ redraw: p }), (t, n) => (K(), q("div", {
			class: "iham-matrix",
			style: le({
				width: `${s.value}px`,
				height: `${c.value}px`
			})
		}, [J("canvas", {
			ref_key: "canvas",
			ref: a,
			class: j(["iham-matrix-canvas", { "is-pointer": o.value }]),
			style: le({
				width: `${l.value.w}px`,
				height: `${l.value.h}px`,
				transform: `translate(${l.value.x}px, ${l.value.y}px)`
			}),
			role: "img",
			"aria-label": `Gene matrix: ${e.view.columns.length} HOGs at ${e.view.level}`,
			onMousemove: g,
			onMouseleave: _,
			onClick: v
		}, null, 46, cu)], 4));
	}
}), [["styles", [".iham-matrix{position:relative}.iham-matrix-canvas{display:block;position:absolute;top:0;left:0}.iham-matrix-canvas.is-pointer{cursor:pointer}"]]]), uu = ["aria-label"], du = { class: "iham-popover-title" }, fu = { class: "iham-popover-body" }, pu = /*#__PURE__*/ ru(/* @__PURE__ */ Xn({
	__name: "IHamPopover",
	props: {
		x: { type: Number },
		y: { type: Number },
		title: { type: String },
		passive: { type: Boolean },
		containerWidth: { type: Number }
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = /* @__PURE__ */ R(null), a = /* @__PURE__ */ R(n.x);
		function o() {
			let e = i.value?.offsetWidth ?? 0;
			a.value = n.x + 12 + e > n.containerWidth ? Math.max(0, n.x - e - 12) : n.x + 12;
		}
		H(() => [n.x, n.y], () => xn(o)), fr(() => {
			o(), n.passive || i.value?.focus();
		});
		function s(e) {
			e.key === "Escape" && r("close");
		}
		return fr(() => window.addEventListener("keydown", s)), hr(() => window.removeEventListener("keydown", s)), (t, n) => (K(), q("div", {
			ref_key: "el",
			ref: i,
			class: j(["iham-popover", { "is-passive": e.passive }]),
			style: le({
				left: `${a.value}px`,
				top: `${e.y + 8}px`
			}),
			role: "dialog",
			"aria-label": e.title,
			tabindex: "-1"
		}, [J("div", du, [J("span", null, M(e.title), 1), e.passive ? X("", !0) : (K(), q("button", {
			key: 0,
			type: "button",
			class: "iham-popover-close",
			"aria-label": "Close",
			onClick: n[0] ||= (e) => r("close")
		}, "×"))]), J("div", fu, [Cr(t.$slots, "default")])], 14, uu));
	}
}), [["styles", [".iham-popover{z-index:20;background:var(--iham-bg,#fff);min-width:160px;max-width:320px;color:var(--iham-fg,#222);border:1px solid var(--iham-border,#ccc);border-radius:4px;font-size:12px;position:absolute;box-shadow:0 4px 14px #0000002e}.iham-popover:focus{outline:none}.iham-popover.is-passive{pointer-events:none}.iham-popover-title{background:var(--iham-header-bg,#2c3e50);color:var(--iham-header-fg,#fff);word-break:break-all;border-radius:3px 3px 0 0;justify-content:space-between;align-items:center;gap:8px;padding:6px 8px;font-weight:600;display:flex}.iham-popover-close{color:inherit;cursor:pointer;background:0 0;border:none;padding:0 2px;font-size:16px;line-height:1}.iham-popover-body{max-height:260px;padding:6px 8px;overflow:auto}.iham-popover-body ul{margin:0;padding:0;list-style:none}.iham-popover-body li{padding:2px 0}.iham-popover-body a{color:var(--iham-link,#2a6ebb)}.iham-popover-body button.iham-link-button{color:var(--iham-link,#2a6ebb);cursor:pointer;font:inherit;text-align:left;background:0 0;border:none;padding:2px 0}.iham-popover-body button.iham-link-button:hover{text-decoration:underline}.iham-popover-body dt{margin-top:4px;font-weight:600}.iham-popover-body dd{margin:0}.iham-muted{color:var(--iham-muted,#7f8c8d)}"]]]), mu = ["aria-label"], hu = { class: "iham-legend-label" }, gu = ["width"], _u = ["stop-color"], vu = ["stop-color"], yu = ["fill"], bu = ["transform"], xu = { y: "14" }, Su = 200, Cu = /*#__PURE__*/ ru(/* @__PURE__ */ Xn({
	__name: "ColorLegend",
	props: {
		label: { type: String },
		domain: { type: Array },
		colors: { type: Array }
	},
	setup(e) {
		let t = e, n = `iham-legend-${Zn()}`, r = Q(() => bl(t.domain, 5).map((e) => ({
			value: e,
			x: (e - t.domain[0]) / (t.domain[1] - t.domain[0]) * Su
		}))), i = (e) => Math.abs(e) < 1 && e !== 0 ? e.toFixed(2) : String(Math.round(e * 100) / 100);
		return (t, a) => (K(), q("div", {
			class: "iham-legend",
			role: "img",
			"aria-label": `${e.label} from ${i(e.domain[0])} to ${i(e.domain[1])}`
		}, [J("span", hu, M(e.label), 1), (K(), q("svg", {
			width: 220,
			height: "30"
		}, [
			J("defs", null, [J("linearGradient", { id: n }, [J("stop", {
				offset: "0",
				"stop-color": e.colors[0]
			}, null, 8, _u), J("stop", {
				offset: "1",
				"stop-color": e.colors[1]
			}, null, 8, vu)])]),
			J("rect", {
				x: "10",
				y: "2",
				width: Su,
				height: "10",
				fill: `url(#${n})`
			}, null, 8, yu),
			(K(!0), q(G, null, Sr(r.value, (e) => (K(), q("g", {
				key: e.value,
				transform: `translate(${10 + e.x},12)`
			}, [a[0] ||= J("line", { y2: "4" }, null, -1), J("text", xu, M(i(e.value)), 1)], 8, bu))), 128))
		], 8, gu))], 8, mu));
	}
}), [["styles", [".iham-legend{align-items:center;gap:8px;display:inline-flex}.iham-legend svg line{stroke:currentColor}.iham-legend svg text{fill:currentColor;text-anchor:middle;font-size:10px}"]]]), wu = { class: "iham-toolbar" }, Tu = { class: "iham-toolbar-row" }, Eu = { class: "iham-toolbar-level" }, Du = {
	key: 0,
	class: "iham-badge"
}, Ou = {
	key: 0,
	class: "iham-notice",
	role: "status"
}, ku = ["aria-expanded"], Au = { "aria-hidden": "true" }, ju = {
	key: 0,
	class: "iham-toolbar-row iham-toolbar-settings"
}, Mu = { key: 0 }, Nu = ["value"], Pu = ["value"], Fu = ["value"], Iu = ["value"], Lu = {
	key: 1,
	class: "iham-notice",
	role: "status"
}, Ru = /*#__PURE__*/ ru(/* @__PURE__ */ Xn({
	__name: "IHamToolbar",
	props: {
		level: { type: String },
		collapsible: { type: Boolean },
		frozen: { type: Boolean },
		schemes: { type: Array },
		colorScheme: { type: null },
		legend: { type: Object },
		tooltipTrigger: { type: String },
		coverageThreshold: { type: Number },
		removedCount: { type: Number }
	},
	emits: [
		"update:colorScheme",
		"update:tooltipTrigger",
		"update:coverageThreshold",
		"unfreeze"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = /* @__PURE__ */ R(!n.collapsible);
		function a(e) {
			let t = Number(e.target.value);
			r("update:coverageThreshold", Number.isFinite(t) ? Math.min(100, Math.max(0, t)) : 0);
		}
		return (t, n) => (K(), q("div", wu, [J("div", Tu, [
			J("div", Eu, [
				n[7] ||= ta(" Level: ", -1),
				J("strong", null, M(e.level), 1),
				e.frozen ? (K(), q("span", Du, [n[6] ||= ta(" frozen ", -1), J("button", {
					type: "button",
					class: "iham-badge-button",
					onClick: n[0] ||= (e) => r("unfreeze")
				}, "unfreeze")])) : X("", !0)
			]),
			i.value ? X("", !0) : (K(), q(G, { key: 0 }, [e.removedCount > 0 ? (K(), q("span", Ou, [ta(M(e.removedCount) + " " + M(e.removedCount === 1 ? "HOG" : "HOGs") + " hidden ", 1), J("button", {
				type: "button",
				class: "iham-badge-button",
				onClick: n[1] ||= (e) => r("update:coverageThreshold", 0)
			}, "show all")])) : X("", !0), e.legend ? (K(), qi(Cu, me(aa({ key: 1 }, e.legend)), null, 16)) : X("", !0)], 64)),
			e.collapsible ? (K(), q("button", {
				key: 1,
				type: "button",
				class: "iham-settings-toggle",
				"aria-expanded": i.value,
				onClick: n[2] ||= (e) => i.value = !i.value
			}, [n[8] ||= ta(" Settings ", -1), J("span", Au, M(i.value ? "▴" : "▾"), 1)], 8, ku)) : X("", !0)
		]), i.value ? (K(), q("div", ju, [
			e.colorScheme === null ? X("", !0) : (K(), q("label", Mu, [n[9] ||= ta(" Colour ", -1), J("select", {
				value: e.colorScheme,
				onChange: n[3] ||= (e) => r("update:colorScheme", e.target.value)
			}, [(K(!0), q(G, null, Sr(e.schemes, (e) => (K(), q("option", {
				key: e,
				value: e
			}, M(z(gl)[e].label), 9, Pu))), 128))], 40, Nu)])),
			J("label", null, [n[11] ||= ta(" Gene info on ", -1), J("select", {
				value: e.tooltipTrigger,
				onChange: n[4] ||= (e) => r("update:tooltipTrigger", e.target.value)
			}, [...n[10] ||= [J("option", { value: "click" }, "click", -1), J("option", { value: "hover" }, "hover", -1)]], 40, Fu)]),
			J("label", null, [
				n[12] ||= ta(" Hide HOGs in fewer than ", -1),
				J("input", {
					type: "number",
					min: "0",
					max: "100",
					step: "10",
					value: e.coverageThreshold,
					onInput: a
				}, null, 40, Iu),
				n[13] ||= ta(" % of species ", -1)
			]),
			e.removedCount > 0 ? (K(), q("span", Lu, [ta(M(e.removedCount) + " " + M(e.removedCount === 1 ? "HOG" : "HOGs") + " hidden ", 1), J("button", {
				type: "button",
				class: "iham-badge-button",
				onClick: n[5] ||= (e) => r("update:coverageThreshold", 0)
			}, "show all")])) : X("", !0),
			e.legend ? (K(), qi(Cu, me(aa({ key: 2 }, e.legend)), null, 16)) : X("", !0)
		])) : X("", !0)]));
	}
}), [["styles", [".iham-toolbar{padding:6px 0 8px;font-size:13px}.iham-toolbar-row{flex-wrap:wrap;align-items:center;gap:6px 16px;display:flex}.iham-toolbar-settings{margin-top:6px}.iham-settings-toggle{font:inherit;border:1px solid var(--iham-muted,#95a5a6);color:inherit;cursor:pointer;background:0 0;border-radius:3px;padding:1px 8px}.iham-toolbar label{align-items:center;gap:4px;display:inline-flex}.iham-toolbar select,.iham-toolbar input{font:inherit;padding:1px 4px}.iham-toolbar input[type=number]{width:4.5em}.iham-toolbar-level{margin-right:auto}.iham-badge,.iham-notice{background:var(--iham-notice-bg,#d6eaf8);color:var(--iham-notice-fg,#1b4f72);border-radius:3px;align-items:center;gap:4px;padding:1px 6px;font-size:12px;display:inline-flex}.iham-badge-button{font:inherit;color:inherit;cursor:pointer;background:0 0;border:none;padding:0;text-decoration:underline}"]]]), zu = { key: 0 }, Bu = { key: 1 }, Vu = { key: 0 }, Hu = { class: "iham-muted" }, Uu = /* @__PURE__ */ Xn({
	__name: "NodeMenu",
	props: {
		node: { type: Object },
		collapsed: { type: Boolean },
		frozenAt: { type: [Number, null] }
	},
	emits: [
		"toggleCollapse",
		"freeze",
		"unfreeze"
	],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (K(), q("ul", null, [
			e.node.children.length ? (K(), q("li", zu, [J("button", {
				type: "button",
				class: "iham-link-button",
				onClick: r[0] ||= (e) => n("toggleCollapse")
			}, M(e.collapsed ? "Expand node" : "Collapse node"), 1)])) : X("", !0),
			e.frozenAt === null ? (K(), q("li", Bu, [J("button", {
				type: "button",
				class: "iham-link-button",
				onClick: r[1] ||= (e) => n("freeze")
			}, "Freeze at this node")])) : (K(), q(G, { key: 2 }, [J("li", null, [J("button", {
				type: "button",
				class: "iham-link-button",
				onClick: r[2] ||= (e) => n("unfreeze")
			}, "Unfreeze the tree")]), e.frozenAt === e.node.id ? X("", !0) : (K(), q("li", Vu, [J("button", {
				type: "button",
				class: "iham-link-button",
				onClick: r[3] ||= (e) => n("freeze")
			}, "Re-freeze tree at this node")]))], 64)),
			J("li", Hu, M(e.node.leafNames.length) + " species", 1)
		]));
	}
}), Wu = "bold 12px sans-serif", Gu = (e) => e.length * 7.5;
function Ku(e) {
	let t = typeof document < "u" ? document.createElement("canvas").getContext("2d") : null;
	if (!t) return Gu;
	t.font = Wu, t.font = e;
	let n = /* @__PURE__ */ new Map();
	return (e) => {
		let r = n.get(e);
		return r === void 0 && (r = t.measureText(e).width, n.set(e, r)), r;
	};
}
function qu(e, t, n) {
	if (n(e) <= t) return e;
	let r = 0, i = e.length;
	for (; r < i;) {
		let a = r + i + 1 >> 1;
		n(`${e.slice(0, a).trimEnd()}…`) <= t ? r = a : i = a - 1;
	}
	return r > 0 ? `${e.slice(0, r).trimEnd()}…` : "…";
}
function Ju(e, t, n, r, i) {
	let a = qu(e, Math.max(0, r - n), i), o = i(a), s = t - 6;
	return {
		text: a,
		right: Math.min(r, Math.max(s, n + o)) - t
	};
}
// src/components/SpeciesTree.vue?vue&type=script&setup=true&lang.ts
var Yu = ["width", "height"], Xu = { class: "iham-tree-links" }, Zu = ["d"], Qu = [
	"transform",
	"aria-label",
	"aria-selected",
	"onMouseenter",
	"onClick"
], $u = ["y", "height"], ed = {
	key: 0,
	class: "iham-tree-marker",
	d: "M-4,0L4,-5L4,5Z"
}, td = ["r"], nd = {
	key: 2,
	class: "iham-tree-label",
	x: "9",
	dy: "0.35em"
}, rd = ["x", "y"], id = 30, ad = 10, od = /*#__PURE__*/ ru(/* @__PURE__ */ Xn({
	__name: "SpeciesTree",
	props: {
		layout: { type: Object },
		width: { type: Number },
		rowHeight: { type: Number },
		selectedId: { type: [Number, null] },
		frozen: { type: Boolean },
		showInternalLabels: { type: Boolean }
	},
	emits: ["hover", "click"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = Q(() => Math.min(210, n.width * .6)), a = Q(() => Math.max(20, n.width - i.value - 20)), o = Q(() => n.layout.rows.length * n.rowHeight), s = (e) => ad + e.x * a.value, c = (e) => e.y * n.rowHeight + n.rowHeight / 2, l = (e) => e.node.name.replace(/_/g, " ");
		function u(e) {
			let t = l(e);
			return e.collapsed ? `[Collapsed taxa] ${t.length > 14 ? `${t.slice(0, 11)}...` : t}` : e.isRow ? t.length > id ? `${t.slice(0, 27)}...` : t : "";
		}
		let d = /* @__PURE__ */ R(null), f = /* @__PURE__ */ qt(Gu), p = "";
		function m() {
			if (!d.value) return;
			let e = getComputedStyle(d.value), t = e.fontFamily ? `bold ${e.fontSize || "12px"} ${e.fontFamily}` : Wu;
			t !== p && (p = t, f.value = Ku(t));
		}
		function h() {
			p = "", m();
		}
		let g = typeof document < "u" ? document.fonts : void 0;
		fr(() => {
			m(), g?.ready.then(h), g?.addEventListener?.("loadingdone", h);
		}), hr(() => g?.removeEventListener?.("loadingdone", h));
		let _ = Q(() => {
			if (!n.showInternalLabels) return null;
			let e = n.layout.nodes.find((e) => e.node.id === n.selectedId);
			if (!e || e.isRow) return null;
			let t = ad + a.value, { text: r, right: i } = Ju(l(e), s(e), 2, t - 4, f.value);
			return {
				node: e.node,
				text: r,
				x: s(e) + i,
				y: c(e) - 7
			};
		}), v = Q(() => n.layout.links.map(({ from: e, to: t }) => ({
			key: `${e.node.id}-${t.node.id}`,
			d: `M${s(e)},${c(e)}V${c(t)}H${s(t)}`
		})));
		return (t, n) => (K(), q("svg", {
			ref_key: "svg",
			ref: d,
			class: "iham-tree",
			width: e.width,
			height: o.value,
			role: "tree",
			"aria-label": "Species tree"
		}, [
			J("g", Xu, [(K(!0), q(G, null, Sr(v.value, (e) => (K(), q("path", {
				key: e.key,
				d: e.d
			}, null, 8, Zu))), 128))]),
			(K(!0), q(G, null, Sr(e.layout.nodes, (t) => (K(), q("g", {
				key: t.node.id,
				class: j(["iham-tree-node", {
					"is-selected": t.node.id === e.selectedId,
					"is-leaf": t.isRow && !t.collapsed,
					"is-collapsed": t.collapsed,
					"is-frozen": e.frozen && t.node.id === e.selectedId
				}]),
				transform: `translate(${s(t)},${c(t)})`,
				role: "treeitem",
				"aria-label": t.node.name,
				"aria-selected": t.node.id === e.selectedId,
				onMouseenter: (e) => r("hover", t.node),
				onClick: (e) => r("click", t.node, e)
			}, [
				J("title", null, M(t.node.name), 1),
				J("rect", {
					class: "iham-tree-hit",
					x: "-6",
					y: -e.rowHeight / 2,
					width: 12,
					height: e.rowHeight
				}, null, 8, $u),
				t.collapsed ? (K(), q("path", ed)) : (K(), q("circle", {
					key: 1,
					class: "iham-tree-marker",
					r: t.node.id === e.selectedId ? 6 : 4
				}, null, 8, td)),
				u(t) ? (K(), q("text", nd, M(u(t)), 1)) : X("", !0)
			], 42, Qu))), 128)),
			_.value ? (K(), q("text", {
				key: 0,
				class: "iham-tree-label iham-tree-internal-label",
				x: _.value.x,
				y: _.value.y,
				"text-anchor": "end",
				onMouseenter: n[0] ||= (e) => r("hover", _.value.node),
				onClick: n[1] ||= (e) => r("click", _.value.node, e)
			}, M(_.value.text), 41, rd)) : X("", !0)
		], 8, Yu));
	}
}), [["styles", [".iham-tree{-webkit-user-select:none;user-select:none;font-size:12px;display:block}.iham-tree-links path{fill:none;stroke:var(--iham-tree-branch,#222);stroke-width:1px}.iham-tree-node{cursor:pointer}.iham-tree-hit{fill:#0000}.iham-tree-marker{fill:var(--iham-tree-node,#34495e)}.iham-tree-node.is-leaf .iham-tree-marker{fill:var(--iham-tree-leaf,#2c3e50)}.iham-tree-node.is-collapsed .iham-tree-marker{fill:gray}.iham-tree-node.is-selected .iham-tree-marker{fill:var(--iham-selected,#e74c3c)}.iham-tree-node.is-frozen .iham-tree-marker{stroke:var(--iham-selected,#e74c3c);stroke-width:2px;fill:var(--iham-bg,#fff)}.iham-tree-label{fill:var(--iham-fg,#000);paint-order:stroke;stroke:var(--iham-bg,#fff);stroke-width:3px;stroke-linejoin:round}.iham-tree-internal-label{cursor:pointer;font-weight:700}.iham-tree-internal-label:hover{text-decoration:underline}.iham-tree-node.is-collapsed .iham-tree-label{fill:gray}.iham-tree-node.is-selected .iham-tree-label{font-weight:700}.iham-tree-node:hover .iham-tree-label{text-decoration:underline}"]]]), sd = {
	key: 0,
	class: "iham-message iham-error",
	role: "alert"
}, cd = {
	key: 1,
	class: "iham-message",
	role: "status"
}, ld = {
	key: 1,
	class: "iham-message iham-warning",
	role: "status"
}, ud = { class: "iham-header-cell" }, dd = { class: "iham-tree-cell" }, fd = { class: "iham-matrix-cell" }, pd = 16, md = 30, hd = /* @__PURE__ */ ho(/* @__PURE__ */ ru(/* @__PURE__ */ Xn({
	__name: "IHam",
	props: {
		orthoxml: { type: String },
		orthoxmlUrl: { type: String },
		speciesTree: { type: String },
		speciesTreeUrl: { type: String },
		famData: { type: Array },
		famDataUrl: { type: String },
		augmented: {
			type: Boolean,
			default: void 0
		},
		queryHog: { type: String },
		queryGene: { type: [Number, String] },
		level: { type: String },
		coverageThreshold: {
			default: 0,
			type: Number
		},
		colorScheme: {
			default: "query",
			type: null
		},
		geneColors: { type: Function },
		tooltipTrigger: {
			default: "click",
			type: String
		},
		toolbar: {
			default: "open",
			type: String
		},
		preset: {
			default: "none",
			type: String
		},
		baseUrl: {
			default: "",
			type: String
		},
		links: { type: Object },
		api: { type: Object },
		treeWidth: {
			default: 330,
			type: Number
		},
		rowHeight: {
			default: 20,
			type: Number
		},
		height: {
			default: "80vh",
			type: String
		},
		showInternalLabels: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"update:level",
		"update:coverageThreshold",
		"update:colorScheme",
		"node-selected",
		"hogs-removed",
		"loaded",
		"error"
	],
	setup(e, { expose: t, emit: n }) {
		let r = e, i = n, { parsed: a, famData: o, famMap: s, loading: c, phase: l, error: u, famError: d } = Hl(Q(() => ({
			orthoxml: r.orthoxml,
			orthoxmlUrl: r.orthoxmlUrl,
			speciesTree: r.speciesTree,
			speciesTreeUrl: r.speciesTreeUrl,
			famData: r.famData,
			famDataUrl: r.famDataUrl,
			augmented: r.augmented,
			queryHog: r.queryHog
		}))), f = Q(() => a.value ? kl(a.value.tree) : null), p = Q(() => new Map(f.value?.nodes.map((e) => [e.name, e]) ?? [])), m = Q(() => a.value ? xl(a.value.perSpecies) : {});
		H(a, (e) => {
			e && f.value && i("loaded", {
				species: f.value.root.leafNames.length,
				genes: Object.keys(e.xrefs).length,
				augmented: e.augmented
			});
		}), H(u, (e) => e && i("error", e));
		let h = /* @__PURE__ */ qt(null), g = /* @__PURE__ */ R(null), _ = /* @__PURE__ */ R(/* @__PURE__ */ new Set()), v = /* @__PURE__ */ R(r.coverageThreshold), y = /* @__PURE__ */ R(r.colorScheme), b = /* @__PURE__ */ R(r.tooltipTrigger);
		H(/* @__PURE__ */ en(r, "coverageThreshold"), (e) => v.value = e), H(/* @__PURE__ */ en(r, "colorScheme"), (e) => y.value = e), H(/* @__PURE__ */ en(r, "tooltipTrigger"), (e) => b.value = e);
		function x(e, { force: t = !1 } = {}) {
			(g.value === null || t) && h.value?.id !== e.id && (h.value = e, i("update:level", e.name), i("node-selected", {
				name: e.name,
				id: e.id,
				isLeaf: !e.children.length,
				species: e.leafNames
			}));
		}
		function S(e) {
			return e ? p.value.get(e) : void 0;
		}
		function C(e) {
			x(e, { force: !0 }), se = e.id, xn(ce);
		}
		H(f, (e) => {
			_.value = /* @__PURE__ */ new Set(), g.value = null, h.value = null, e && C(S(r.level) ?? e.root);
		}), H(/* @__PURE__ */ en(r, "level"), (e) => {
			let t = S(e);
			t && t.id !== h.value?.id && C(t);
		});
		let w = Q(() => {
			let e = new Set(a.value?.queryMembers ?? []);
			return r.queryGene !== void 0 && r.queryGene !== "" && e.add(Number(r.queryGene)), e;
		}), T = Q(() => {
			let e = a.value, t = f.value, n = h.value;
			return !e || !t || !n ? null : Sl({
				perSpecies: e.perSpecies,
				maxima: m.value,
				species: t.root.leafNames,
				level: n.name,
				coverageThreshold: v.value,
				famData: s.value,
				hogMetadata: e.augmented ? e.hogMetadata : null
			});
		});
		H(() => T.value?.removed, (e, t) => {
			e && e.join() !== t?.join() && i("hogs-removed", e);
		});
		let E = Q(() => f.value ? Al(f.value.root, _.value) : null), ee = Q(() => E.value && h.value ? jl(E.value, h.value) : {
			start: 0,
			end: 0
		}), D = Q(() => {
			let e = ee.value.start;
			if (e === 0) return 0;
			let t = md + (e - .5) * r.rowHeight - ae.value.top;
			return Math.max(0, Math.round(t - md / 2));
		}), te = Q(() => vl(o.value)), O = Q(() => r.geneColors ? { color: r.geneColors } : yl(y.value, o.value, (e) => w.value.has(e))), ne = Q(() => {
			let e = r.preset === "oma" ? Cl(r.baseUrl) : wl;
			return {
				links: {
					...e.links,
					...r.links
				},
				api: {
					...e.api,
					...r.api
				}
			};
		});
		function re(e) {
			v.value = e, i("update:coverageThreshold", e);
		}
		function k(e) {
			y.value = e, i("update:colorScheme", e);
		}
		let ie = /* @__PURE__ */ R(null), A = /* @__PURE__ */ R(null), ae = /* @__PURE__ */ R({
			left: 0,
			top: 0,
			width: 0,
			height: 0
		}), oe, se = null;
		function ce() {
			let e = ie.value, t = E.value?.nodes.find((e) => e.node.id === se);
			if (!e || !t) return;
			se = null;
			let n = e.clientHeight - md;
			e.scrollTop = Math.max(0, t.y * r.rowHeight + r.rowHeight / 2 - n / 2), ue();
		}
		function ue() {
			let e = ie.value;
			e && (ae.value = {
				left: e.scrollLeft,
				top: e.scrollTop,
				width: e.clientWidth,
				height: e.clientHeight
			});
		}
		H(ie, (e, t) => {
			oe?.disconnect(), t?.removeEventListener("scroll", ue), e && (e.addEventListener("scroll", ue, { passive: !0 }), oe = new ResizeObserver(ue), oe.observe(e), xn(() => {
				ue(), ce();
			}));
		}), hr(() => oe?.disconnect());
		let de = Q(() => Math.max((T.value?.totalSlots ?? 0) * pd, 1)), fe = Q(() => (E.value?.rows.length ?? 0) * r.rowHeight), pe = Q(() => ({
			x: ae.value.left,
			y: ae.value.top,
			width: Math.max(0, ae.value.width - r.treeWidth),
			height: Math.max(0, ae.value.height - md)
		})), j = /* @__PURE__ */ qt(null), me = /* @__PURE__ */ R(0);
		function he(e) {
			let t = A.value.getBoundingClientRect();
			if (me.value = t.width, !e.clientX && !e.clientY && e.target instanceof Element) {
				let n = e.target.getBoundingClientRect();
				return {
					x: n.left - t.left + n.width / 2,
					y: n.bottom - t.top
				};
			}
			return {
				x: e.clientX - t.left,
				y: e.clientY - t.top
			};
		}
		function ge(e, t) {
			j.value = {
				kind: "node",
				node: e,
				...he(t)
			};
		}
		function _e(e) {
			let t = new Set(_.value);
			t.has(e.id) ? t.delete(e.id) : t.add(e.id), _.value = t, j.value = null;
		}
		function ve(e) {
			g.value = null, x(e, { force: !0 }), g.value = e.id, j.value = null;
		}
		function ye() {
			g.value = null, j.value = null;
		}
		function be(e, t) {
			b.value === "hover" && (j.value = e ? {
				kind: "gene",
				cell: e,
				passive: !0,
				...he(t)
			} : null);
		}
		function xe(e, t) {
			b.value === "click" && (j.value = {
				kind: "gene",
				cell: e,
				passive: !1,
				...he(t)
			});
		}
		function Se(e, t) {
			j.value = {
				kind: "hog",
				column: e,
				level: h.value.name,
				title: e.name,
				...he(t)
			};
		}
		function Ce(e) {
			let t = j.value;
			t?.kind === "hog" && (j.value = {
				...t,
				title: e
			});
		}
		H(h, () => {
			j.value?.kind !== "node" && (j.value = null);
		});
		let we = (e) => s.value.get(e.id)?.protid ?? a.value?.xrefs[e.id] ?? String(e.id);
		return t({
			setLevel(e) {
				let t = S(e);
				return t && C(t), !!t;
			},
			freeze: (e) => {
				let t = e ? S(e) : h.value;
				t && ve(t);
			},
			unfreeze: ye
		}), (t, n) => (K(), q("div", {
			ref_key: "rootEl",
			ref: A,
			class: "iham"
		}, [z(u) ? (K(), q("div", sd, "Could not load the HOG: " + M(z(u).message), 1)) : z(c) || !T.value || !E.value ? (K(), q("div", cd, [z(c) ? (K(), q(G, { key: 0 }, [n[4] ||= J("span", {
			class: "iham-spinner",
			"aria-hidden": "true"
		}, null, -1), ta(" " + M(z(l) === "processing" ? "Processing HOG…" : "Loading…"), 1)], 64)) : (K(), q(G, { key: 1 }, [ta("No data")], 64))])) : (K(), q(G, { key: 2 }, [
			e.toolbar === "hidden" ? X("", !0) : (K(), qi(Ru, {
				key: 0,
				collapsible: e.toolbar === "collapsed",
				level: h.value.name,
				frozen: g.value !== null,
				schemes: te.value,
				"color-scheme": e.geneColors ? null : y.value,
				legend: "legend" in O.value ? O.value.legend : void 0,
				"tooltip-trigger": b.value,
				"coverage-threshold": v.value,
				"removed-count": T.value.removed.length,
				"onUpdate:colorScheme": k,
				"onUpdate:tooltipTrigger": n[0] ||= (e) => b.value = e,
				"onUpdate:coverageThreshold": re,
				onUnfreeze: ye
			}, null, 8, [
				"collapsible",
				"level",
				"frozen",
				"schemes",
				"color-scheme",
				"legend",
				"tooltip-trigger",
				"coverage-threshold",
				"removed-count"
			])),
			z(d) ? (K(), q("div", ld, " Gene data could not be loaded (" + M(z(d).message) + "); genes are shown without their details. ", 1)) : X("", !0),
			J("div", {
				ref_key: "scroller",
				ref: ie,
				class: "iham-scroller",
				style: le({ maxHeight: e.height })
			}, [J("div", {
				class: "iham-grid",
				style: le({
					gridTemplateColumns: `${e.treeWidth}px ${de.value}px`,
					gridTemplateRows: `${md}px ${fe.value}px`
				})
			}, [
				n[5] ||= J("div", { class: "iham-corner" }, null, -1),
				J("div", ud, [Y(iu, {
					class: "iham-header-markers",
					style: le(D.value ? { transform: `translateY(${D.value}px)` } : void 0),
					columns: T.value.columns,
					"cell-width": pd,
					height: md,
					width: de.value,
					"active-index": j.value?.kind === "hog" ? j.value.column.index : null,
					onSelect: Se
				}, null, 8, [
					"style",
					"columns",
					"width",
					"active-index"
				])]),
				J("div", dd, [Y(od, {
					layout: E.value,
					width: e.treeWidth,
					"row-height": e.rowHeight,
					"selected-id": h.value?.id ?? null,
					frozen: g.value !== null,
					"show-internal-labels": e.showInternalLabels,
					onHover: x,
					onClick: ge
				}, null, 8, [
					"layout",
					"width",
					"row-height",
					"selected-id",
					"frozen",
					"show-internal-labels"
				])]),
				J("div", fd, [Y(lu, {
					view: T.value,
					rows: E.value.rows,
					"fam-map": z(s),
					color: O.value.color,
					"cell-width": pd,
					"row-height": e.rowHeight,
					viewport: pe.value,
					"clade-rows": ee.value,
					onGeneHover: be,
					onGeneClick: xe
				}, null, 8, [
					"view",
					"rows",
					"fam-map",
					"color",
					"row-height",
					"viewport",
					"clade-rows"
				])])
			], 4)], 4),
			j.value ? (K(), qi(pu, {
				key: j.value.kind,
				x: j.value.x,
				y: j.value.y,
				"container-width": me.value,
				passive: j.value.kind === "gene" && j.value.passive,
				title: j.value.kind === "node" ? j.value.node.name : j.value.kind === "gene" ? we(j.value.cell) : j.value.title,
				onClose: n[3] ||= (e) => j.value = null
			}, {
				default: Pn(() => [j.value.kind === "node" ? (K(), qi(Uu, {
					key: 0,
					node: j.value.node,
					collapsed: _.value.has(j.value.node.id),
					"frozen-at": g.value,
					onToggleCollapse: n[1] ||= (e) => _e(j.value.node),
					onFreeze: n[2] ||= (e) => ve(j.value.node),
					onUnfreeze: ye
				}, null, 8, [
					"node",
					"collapsed",
					"frozen-at"
				])) : j.value.kind === "gene" ? (K(), qi(Ql, {
					key: 1,
					"gene-id": j.value.cell.id,
					gene: z(s).get(j.value.cell.id),
					xref: z(a)?.xrefs[j.value.cell.id],
					endpoints: ne.value
				}, null, 8, [
					"gene-id",
					"gene",
					"xref",
					"endpoints"
				])) : (K(), qi(su, {
					key: 2,
					column: j.value.column,
					level: j.value.level,
					endpoints: ne.value,
					onResolved: Ce
				}, null, 8, [
					"column",
					"level",
					"endpoints"
				]))]),
				_: 1
			}, 8, [
				"x",
				"y",
				"container-width",
				"passive",
				"title"
			])) : X("", !0)
		], 64))], 512));
	}
}), [["styles", [".iham{font-family:var(--iham-font,system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif);color:var(--iham-fg,#222);background:var(--iham-bg,#fff);--iham-separator:#000;position:relative}.iham-scroller{border-top:1px solid var(--iham-border,#e5e5e5);position:relative;overflow:auto}.iham-grid{display:grid}.iham-corner,.iham-header-cell,.iham-tree-cell{background:var(--iham-bg,#fff);position:sticky}.iham-corner{z-index:3;top:0;left:0}.iham-header-cell{z-index:2;border-bottom:1px solid var(--iham-border,#e5e5e5);top:0}.iham-tree-cell{z-index:2;border-right:1px solid var(--iham-border,#e5e5e5);left:0}.iham-matrix-cell{z-index:1;position:relative}.iham-header-markers{pointer-events:none}.iham-header-markers .iham-header-col{pointer-events:all}.iham-message{color:var(--iham-muted,#7f8c8d);padding:16px}.iham-error{color:#c0392b}.iham-warning{color:sienna;padding:4px 8px}.iham-spinner{vertical-align:-2px;border:2px solid;border-right-color:#0000;border-radius:50%;width:12px;height:12px;animation:.8s linear infinite iham-spin;display:inline-block}@keyframes iham-spin{to{transform:rotate(360deg)}}"]]]));
function gd(e = "i-ham") {
	customElements.get(e) || customElements.define(e, hd);
}
gd();
export { hd as IHamElement, Tl as fillTemplate, Cl as omaEndpoints, gd as register };

//# sourceMappingURL=iham-element.js.map