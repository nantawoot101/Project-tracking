/** 
 * Kendo UI v2016.2.714 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2016 Telerik AD. All rights reserved.                                                                                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
																																																	   
																																																	   
																																																	   
																																																	   
																																																	   
																																																	   
																																																	   
																																																	   
																																																	   
																																																	   
																																																	   
																																																	   
																																																	   
																																																	   
																																																	   

*/
! 
	function (e, define) {
		define("kendo.calendar.min", ["kendo.core.min"], e)
	}(function () {
		return function (e, t) {
			function getAddYear() {
				//deaw
				var language = '';
				try {
					var _language = localStorage.getItem("language");
					language = (_language == 'en') ? 'en' : 'th';
				} catch (e) { }
				var add_y = 0;
				if (language == 'th') {
					//add_y = 543;
				}
				return add_y;
			}

			function n(e, t, n, i) {
				//deaw 
				var add_y = getAddYear();
				var o, r = e.getFullYear(),
					a = t.getFullYear(),
					s = n.getFullYear();
				return r -= r % i, o = r + (i - 1), a > r && (r = a), o > s && (o = s), (r + add_y) + "-" + (o + add_y)
			}

			function i(e) {
				for (var t, n = 0, i = e.min, o = e.max, r = e.start, a = e.setter, l = e.build, c = e.cells || 12, d = e.perRow || 4, u = e.content || z, h = e.empty || B, f = e.html || '<table tabindex="0" role="grid" class="k-content k-meta-view" cellspacing="0"><tbody><tr role="row">'; c > n; n++) n > 0 && n % d === 0 && (f += '</tr><tr role="row">'), r = new _e(r.getFullYear(), r.getMonth(), r.getDate(), 0, 0, 0), E(r, 0), t = l(r, n, e.disableDates), f += s(r, i, o) ? u(t) : h(t), a(r, 1);
				return f + "</tr></tbody></table>"
			}

			function o(e, t, n) {
				var i = e.getFullYear(),
					o = t.getFullYear(),
					r = o,
					a = 0;
				return n && (o -= o % n, r = o - o % n + n - 1), i > r ? a = 1 : o > i && (a = -1), a
			}

			function r() {
				var e = new _e;
				return new _e(e.getFullYear(), e.getMonth(), e.getDate())
			}

			function a(e, t, n) {
				var i = r();
				return e && (i = new _e(+e)), t > i ? i = new _e(+t) : i > n && (i = new _e(+n)), i
			}

			function s(e, t, n) {
				return +e >= +t && +n >= +e
			}

			function l(e, t) {
				return e.slice(t).concat(e.slice(0, t))
			}

			function c(e, t, n) {
				t = t instanceof _e ? t.getFullYear() : e.getFullYear() + n * t, e.setFullYear(t)
			}

			function d(t) {
				var n = e(this).hasClass("k-state-disabled");
				n || e(this).toggleClass(X, se.indexOf(t.type) > -1 || t.type == re)
			}

			function u(e) {
				e.preventDefault()
			}

			function h(e) {
				return F(e).calendars.standard
			}

			function f(e) {
				var n = be[e.start],
					i = be[e.depth],
					o = F(e.culture);
				e.format = R(e.format || o.calendars.standard.patterns.d), isNaN(n) && (n = 0, e.start = G), (i === t || i > n) && (e.depth = G), null === e.dates && (e.dates = [])
			}

			function p(e) {
				H && e.find("*").attr("unselectable", "on")
			}

			function m(e, t) {
				for (var n = 0, i = t.length; i > n; n++)
					if (e === +t[n]) return !0;
				return !1
			}

			function g(e, t) {
				return e ? e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate() : !1
			}

			function v(e, t) {
				return e ? e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() : !1
			}

			function _(t) {
				return x.isFunction(t) ? t : e.isArray(t) ? w(t) : e.noop
			}

			function b(e) {
				var t, n = [];
				for (t = 0; e.length > t; t++) n.push(e[t].setHours(0, 0, 0, 0));
				return n
			}

			function w(t) {
				var n, i, o, r, a, s = [],
					l = ["su", "mo", "tu", "we", "th", "fr", "sa"],
					c = "if (found) { return true } else {return false}";
				if (t[0] instanceof _e) s = b(t), n = "var found = date && $.inArray(date.setHours(0, 0, 0, 0),[" + s + "]) > -1;" + c;
				else {
					for (o = 0; t.length > o; o++) r = t[o].slice(0, 2).toLowerCase(), a = e.inArray(r, l), a > -1 && s.push(a);
					n = "var found = date && $.inArray(date.getDay(),[" + s + "]) > -1;" + c
				}
				return i = Function("date", n)
			}

			function y(e, t) {
				return e instanceof Date && t instanceof Date && (e = e.getTime(), t = t.getTime()), e === t
			}
			var k, x = window.kendo,
				C = x.support,
				S = x.ui,
				T = S.Widget,
				D = x.keys,
				A = x.parseDate,
				E = x.date.adjustDST,
				R = x._extractFormat,
				I = x.template,
				F = x.getCulture,
				M = x.support.transitions,
				P = M ? M.css + "transform-origin" : "",
				z = I('<td#=data.cssClass# role="gridcell"><a tabindex="-1" class="k-link" href="\\#" data-#=data.ns#value="#=data.dateString#">#=data.value#</a></td>', {
					useWithBlock: !1
				}),
				B = I('<td role="gridcell">&nbsp;</td>', {
					useWithBlock: !1
				}),
				L = x.support.browser,
				H = L.msie && 9 > L.version,
				N = ".kendoCalendar",
				O = "click" + N,
				V = "keydown" + N,
				U = "id",
				W = "min",
				j = "left",
				q = "slideIn",
				G = "month",
				$ = "century",
				Y = "change",
				K = "navigate",
				Q = "value",
				X = "k-state-hover",
				J = "k-state-disabled",
				Z = "k-state-focused",
				ee = "k-other-month",
				te = ' class="' + ee + '"',
				ne = "k-nav-today",
				ie = "td:has(.k-link)",
				oe = "blur" + N,
				re = "focus",
				ae = re + N,
				se = C.touch ? "touchstart" : "mouseenter",
				le = C.touch ? "touchstart" + N : "mouseenter" + N,
				ce = C.touch ? "touchend" + N + " touchmove" + N : "mouseleave" + N,
				de = 6e4,
				ue = 864e5,
				he = "_prevArrow",
				fe = "_nextArrow",
				pe = "aria-disabled",
				me = "aria-selected",
				ge = e.proxy,
				ve = e.extend,
				_e = Date,
				be = {
					month: 0,
					year: 1,
					decade: 2,
					century: 3
				},
				we = T.extend({
					init: function (t, n) {
						var i, o, s = this;
						T.fn.init.call(s, t, n), t = s.wrapper = s.element, n = s.options, n.url = window.unescape(n.url), s.options.disableDates = _(s.options.disableDates), s._templates(), s._header(), s._footer(s.footer), o = t.addClass("k-widget k-calendar").on(le + " " + ce, ie, d).on(V, "table.k-content", ge(s._move, s)).on(O, ie, function (t) {
							var n = t.currentTarget.firstChild,
								i = s._toDateObject(n); - 1 != n.href.indexOf("#") && t.preventDefault(), s.options.disableDates(i) && "month" == s._view.name || s._click(e(n))
						}).on("mouseup" + N, "table.k-content, .k-footer", function () {
							s._focusView(s.options.focusOnNav !== !1)
						}).attr(U), o && (s._cellID = o + "_cell_selected"), f(n), i = A(n.value, n.format, n.culture), s._index = be[n.start], s._current = new _e(+a(i, n.min, n.max)), s._addClassProxy = function () {
							if (s._active = !0, s._cell.hasClass(J)) {
								var e = s._view.toDateString(r());
								s._cell = s._cellByDate(e)
							}
							s._cell.addClass(Z)
						}, s._removeClassProxy = function () {
							s._active = !1, s._cell.removeClass(Z)
						}, s.value(i), x.notify(s)
					},
					options: {
						name: "Calendar",
						value: null,
						min: new _e(1900, 0, 1),
						max: new _e(2099, 11, 31),
						dates: [],
						url: "",
						culture: "",
						footer: "",
						format: "",
						month: {},
						start: G,
						depth: G,
						animation: {
							horizontal: {
								effects: q,
								reverse: !0,
								duration: 500,
								divisor: 2
							},
							vertical: {
								effects: "zoomIn",
								duration: 400
							}
						}
					},
					events: [Y, K],
					setOptions: function (e) {
						var t = this;
						f(e), e.disableDates = _(e.disableDates), T.fn.setOptions.call(t, e), t._templates(), t._footer(t.footer), t._index = be[t.options.start], t.navigate()
					},
					destroy: function () {
						var e = this,
							t = e._today;
						e.element.off(N), e._title.off(N), e[he].off(N), e[fe].off(N), x.destroy(e._table), t && x.destroy(t.off(N)), T.fn.destroy.call(e)
					},
					current: function () {
						return this._current
					},
					view: function () {
						return this._view
					},
					focus: function (e) {
						e = e || this._table, this._bindTable(e), e.focus()
					},
					min: function (e) {
						return this._option(W, e)
					},
					max: function (e) {
						return this._option("max", e)
					},
					navigateToPast: function () {
						this._navigate(he, -1)
					},
					navigateToFuture: function () {
						this._navigate(fe, 1)
					},
					navigateUp: function () {
						var e = this,
							t = e._index;
						e._title.hasClass(J) || e.navigate(e._current, ++t)
					},
					navigateDown: function (e) {
						var n = this,
							i = n._index,
							o = n.options.depth;
						if (e) return i === be[o] ? (y(n._value, n._current) && y(n._value, e) || (n.value(e), n.trigger(Y)), t) : (n.navigate(e, --i), t)
					},
					navigate: function (n, i) {
						var o, r, s, l, c, d, u, h, f, m, g, v, _, b, w, y, x;
						i = isNaN(i) ? be[i] : i, o = this, r = o.options, s = r.culture, l = r.min, c = r.max, d = o._title, u = o._table, h = o._oldTable, f = o._value, m = o._current, g = n && +n > +m, v = i !== t && i !== o._index, n || (n = m), o._current = n = new _e(+a(n, l, c)), i === t ? i = o._index : o._index = i, o._view = b = k.views[i], w = b.compare, y = i === be[$], d.toggleClass(J, y).attr(pe, y), y = w(n, l) < 1, o[he].toggleClass(J, y).attr(pe, y), y = w(n, c) > -1, o[fe].toggleClass(J, y).attr(pe, y), u && h && h.data("animating") && (h.kendoStop(!0, !0), u.kendoStop(!0, !0)), o._oldTable = u, u && !o._changeView || (d.html(b.title(n, l, c, s)), o._table = _ = e(b.content(ve({
							min: l,
							max: c,
							date: n,
							url: r.url,
							dates: r.dates,
							format: r.format,
							culture: s,
							disableDates: r.disableDates
						}, o[b.name]))), p(_), x = u && u.data("start") === _.data("start"), o._animate({
							from: u,
							to: _,
							vertical: v,
							future: g,
							replace: x
						}), o.trigger(K), o._focus(n)), i === be[r.depth] && f && !o.options.disableDates(f) && o._class("k-state-selected", f), o._class(Z, n), !u && o._cell && o._cell.removeClass(Z), o._changeView = !0
					},
					value: function (e) {
						var n = this,
							i = n._view,
							o = n.options,
							r = n._view,
							a = o.min,
							l = o.max;
						return (e === t) ? n._value : (null === e && (n._current = new Date(n._current.getFullYear(), n._current.getMonth(), n._current.getDate())), e = A(e, o.format, o.culture), null !== e && (e = new _e(+e), s(e, a, l) || (e = null)), null !== e && n.options.disableDates(e) ? n._value === t && (n._value = null) : n._value = e, r && null === e && n._cell ? n._cell.removeClass("k-state-selected") : (n._changeView = !e || i && 0 !== i.compare(e, n._current), n.navigate(e)), t)
					},
					_move: function (t) {
						var n, i, o, r, l = this,
							c = l.options,
							d = t.keyCode,
							u = l._view,
							h = l._index,
							f = l.options.min,
							p = l.options.max,
							m = new _e(+l._current),
							g = x.support.isRtl(l.wrapper),
							v = l.options.disableDates;
						return t.target === l._table[0] && (l._active = !0), t.ctrlKey ? d == D.RIGHT && !g || d == D.LEFT && g ? (l.navigateToFuture(), i = !0) : d == D.LEFT && !g || d == D.RIGHT && g ? (l.navigateToPast(), i = !0) : d == D.UP ? (l.navigateUp(), i = !0) : d == D.DOWN && (l._click(e(l._cell[0].firstChild)), i = !0) : (d == D.RIGHT && !g || d == D.LEFT && g ? (n = 1, i = !0) : d == D.LEFT && !g || d == D.RIGHT && g ? (n = -1, i = !0) : d == D.UP ? (n = 0 === h ? -7 : -4, i = !0) : d == D.DOWN ? (n = 0 === h ? 7 : 4, i = !0) : d == D.ENTER ? (l._click(e(l._cell[0].firstChild)), i = !0) : d == D.HOME || d == D.END ? (o = d == D.HOME ? "first" : "last", r = u[o](m), m = new _e(r.getFullYear(), r.getMonth(), r.getDate(), m.getHours(), m.getMinutes(), m.getSeconds(), m.getMilliseconds()), i = !0) : d == D.PAGEUP ? (i = !0, l.navigateToPast()) : d == D.PAGEDOWN && (i = !0, l.navigateToFuture()), (n || o) && (o || u.setDate(m, n), v(m) && (m = l._nextNavigatable(m, n)), s(m, f, p) && l._focus(a(m, c.min, c.max)))), i && t.preventDefault(), l._current
					},
					_nextNavigatable: function (e, t) {
						var n = this,
							i = !0,
							o = n._view,
							r = n.options.min,
							a = n.options.max,
							l = n.options.disableDates,
							c = new Date(e.getTime());
						for (o.setDate(c, -t); i;) {
							if (o.setDate(e, t), !s(e, r, a)) {
								e = c;
								break
							}
							i = l(e)
						}
						return e
					},
					_animate: function (e) {
						var t = this,
							n = e.from,
							i = e.to,
							o = t._active;
						n ? n.parent().data("animating") ? (n.off(N), n.parent().kendoStop(!0, !0).remove(), n.remove(), i.insertAfter(t.element[0].firstChild), t._focusView(o)) : !n.is(":visible") || t.options.animation === !1 || e.replace ? (i.insertAfter(n), n.off(N).remove(), t._focusView(o)) : t[e.vertical ? "_vertical" : "_horizontal"](n, i, e.future) : (i.insertAfter(t.element[0].firstChild), t._bindTable(i))
					},
					_horizontal: function (e, t, n) {
						var i = this,
							o = i._active,
							r = i.options.animation.horizontal,
							a = r.effects,
							s = e.outerWidth();
						a && -1 != a.indexOf(q) && (e.add(t).css({
							width: s
						}), e.wrap("<div/>"), i._focusView(o, e), e.parent().css({
							position: "relative",
							width: 2 * s,
							"float": j,
							"margin-left": n ? 0 : -s
						}), t[n ? "insertAfter" : "insertBefore"](e), ve(r, {
							effects: q + ":" + (n ? "right" : j),
							complete: function () {
								e.off(N).remove(), i._oldTable = null, t.unwrap(), i._focusView(o)
							}
						}), e.parent().kendoStop(!0, !0).kendoAnimate(r))
					},
					_vertical: function (e, t) {
						var n, i, o = this,
							r = o.options.animation.vertical,
							a = r.effects,
							s = o._active;
						a && -1 != a.indexOf("zoom") && (t.css({
							position: "absolute",
							top: e.prev().outerHeight(),
							left: 0
						}).insertBefore(e), P && (n = o._cellByDate(o._view.toDateString(o._current)), i = n.position(), i = i.left + parseInt(n.width() / 2, 10) + "px " + (i.top + parseInt(n.height() / 2, 10) + "px"), t.css(P, i)), e.kendoStop(!0, !0).kendoAnimate({
							effects: "fadeOut",
							duration: 600,
							complete: function () {
								e.off(N).remove(), o._oldTable = null, t.css({
									position: "static",
									top: 0,
									left: 0
								}), o._focusView(s)
							}
						}), t.kendoStop(!0, !0).kendoAnimate(r))
					},
					_cellByDate: function (t) {
						return this._table.find("td:not(." + ee + ")").filter(function () {
							return e(this.firstChild).attr(x.attr(Q)) === t
						})
					},
					_class: function (t, n) {
						var i, o = this,
							r = o._cellID,
							a = o._cell,
							s = o._view.toDateString(n);
						a && a.removeAttr(me).removeAttr("aria-label").removeAttr(U), n && (i = o.options.disableDates(n)), a = o._table.find("td:not(." + ee + ")").removeClass(t).filter(function () {
							return e(this.firstChild).attr(x.attr(Q)) === s
						}).attr(me, !0), (t === Z && !o._active && o.options.focusOnNav !== !1 || i) && (t = ""), a.addClass(t), a[0] && (o._cell = a), r && (a.attr(U, r), o._table.removeAttr("aria-activedescendant").attr("aria-activedescendant", r))
					},
					_bindTable: function (e) {
						e.on(ae, this._addClassProxy).on(oe, this._removeClassProxy)
					},
					_click: function (e) {
						var t = this,
							n = t.options,
							i = new Date(+t._current),
							o = t._toDateObject(e);
						E(o, 0), t.options.disableDates(o) && "month" == t._view.name && (o = t._value), t._view.setDate(i, o), t.navigateDown(a(i, n.min, n.max))
					},
					_focus: function (e) {
						var t = this,
							n = t._view;
						0 !== n.compare(e, t._current) ? t.navigate(e) : (t._current = e, t._class(Z, e))
					},
					_focusView: function (e, t) {
						e && this.focus(t)
					},
					_footer: function (n) {
						var i = this,
							o = r(),
							a = i.element,
							s = a.find(".k-footer");
						return n ? (s[0] || (s = e('<div class="k-footer"><a href="#" class="k-link k-nav-today"></a></div>').appendTo(a)), i._today = s.show().find(".k-link").html(n(o)).attr("title", x.toString(o, "D", i.options.culture)), i._toggle(), t) : (i._toggle(!1), s.hide(), t)
					},
					_header: function () {
						var e, t = this,
							n = t.element;
						n.find(".k-header")[0] || n.html('<div class="k-header"><a href="#" role="button" class="k-link k-nav-prev"><span class="k-icon k-i-arrow-w"></span></a><a href="#" role="button" aria-live="assertive" aria-atomic="true" class="k-link k-nav-fast"></a><a href="#" role="button" class="k-link k-nav-next"><span class="k-icon k-i-arrow-e"></span></a></div>'), e = n.find(".k-link").on(le + " " + ce + " " + ae + " " + oe, d).click(!1), t._title = e.eq(1).on(O, function () {
							t._active = t.options.focusOnNav !== !1, t.navigateUp()
						}), t[he] = e.eq(0).on(O, function () {
							t._active = t.options.focusOnNav !== !1, t.navigateToPast()
						}), t[fe] = e.eq(2).on(O, function () {
							t._active = t.options.focusOnNav !== !1, t.navigateToFuture()
						})
					},
					_navigate: function (e, t) {
						var n = this,
							i = n._index + 1,
							o = new _e(+n._current);
						e = n[e], e.hasClass(J) || (i > 3 ? o.setFullYear(o.getFullYear() + 100 * t) : k.views[i].setDate(o, t), n.navigate(o))
					},
					_option: function (e, n) {
						var i, o = this,
							r = o.options,
							a = o._value || o._current;
						return n === t ? r[e] : (n = A(n, r.format, r.culture), n && (r[e] = new _e(+n), i = e === W ? n > a : a > n, (i || v(a, n)) && (i && (o._value = null), o._changeView = !0), o._changeView || (o._changeView = !(!r.month.content && !r.month.empty)), o.navigate(o._value), o._toggle()), t)
					},
					_toggle: function (e) {
						var n = this,
							i = n.options,
							o = n.options.disableDates(r()),
							a = n._today;
						e === t && (e = s(r(), i.min, i.max)), a && (a.off(O), e && !o ? a.addClass(ne).removeClass(J).on(O, ge(n._todayClick, n)) : a.removeClass(ne).addClass(J).on(O, u))
					},
					_todayClick: function (e) {
						var t = this,
							n = be[t.options.depth],
							i = t.options.disableDates,
							o = r();
						e.preventDefault(), i(o) || (0 === t._view.compare(t._current, o) && t._index == n && (t._changeView = !1), t._value = o, t.navigate(o, n), t.trigger(Y))
					},
					_toDateObject: function (t) {
						var n = e(t).attr(x.attr(Q)).split("/");
						return n = new _e(n[0], n[1], n[2])
					},
					_templates: function () {
						var e = this,
							t = e.options,
							n = t.footer,
							i = t.month,
							o = i.content,
							r = i.empty;
						e.month = {
							content: I('<td#=data.cssClass# role="gridcell"><a tabindex="-1" class="k-link#=data.linkClass#" href="#=data.url#" ' + x.attr("value") + '="#=data.dateString#" title="#=data.title#">' + (o || "#=data.value#") + "</a></td>", {
								useWithBlock: !!o
							}),
							empty: I('<td role="gridcell">' + (r || "&nbsp;") + "</td>", {
								useWithBlock: !!r
							})
						}, e.footer = n !== !1 ? I(n || '#= kendo.toString(data,"D","' + t.culture + '") #', {
							useWithBlock: !1
						}) : null
					}
				});
			S.plugin(we), k = {
				firstDayOfMonth: function (e) {
					return new _e(e.getFullYear(), e.getMonth(), 1)
				},
				firstVisibleDay: function (e, t) {
					t = t || x.culture().calendar;
					for (var n = t.firstDay, i = new _e(e.getFullYear(), e.getMonth(), 0, e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()); i.getDay() != n;) k.setTime(i, -1 * ue);
					return i
				},
				setTime: function (e, t) {
					var n = e.getTimezoneOffset(),
						i = new _e(e.getTime() + t),
						o = i.getTimezoneOffset() - n;
					e.setTime(i.getTime() + o * de)
				},
				views: [{
					name: G,
					title: function (e, t, n, i) {
						//deaw
						var add_y = getAddYear();
						return h(i).months.names[e.getMonth()] + " " + (e.getFullYear() + add_y)
					},
					content: function (e) {
						for (var t = this, n = 0, o = e.min, r = e.max, a = e.date, s = e.dates, c = e.format, d = e.culture, u = e.url, f = u && s[0], p = h(d), g = p.firstDay, v = p.days, _ = l(v.names, g), b = l(v.namesShort, g), w = k.firstVisibleDay(a, p), y = t.first(a), C = t.last(a), S = t.toDateString, T = new _e, D = '<table tabindex="0" role="grid" class="k-content" cellspacing="0" data-start="' + S(w) + '"><thead><tr role="row">'; 7 > n; n++) D += '<th scope="col" title="' + _[n] + '">' + b[n] + "</th>";
						return T = new _e(T.getFullYear(), T.getMonth(), T.getDate()), E(T, 0), T = +T, i({
							cells: 42,
							perRow: 7,
							html: D += '</tr></thead><tbody><tr role="row">',
							start: w,
							min: new _e(o.getFullYear(), o.getMonth(), o.getDate()),
							max: new _e(r.getFullYear(), r.getMonth(), r.getDate()),
							content: e.content,
							empty: e.empty,
							setter: t.setDate,
							disableDates: e.disableDates,
							build: function (e, t, n) {
								var i = [],
									o = e.getDay(),
									r = "",
									a = "#";
								return (y > e || e > C) && i.push(ee), n(e) && i.push(J), +e === T && i.push("k-today"), 0 !== o && 6 !== o || i.push("k-weekend"), f && m(+e, s) && (a = u.replace("{0}", x.toString(e, c, d)), r = " k-action-link"), {
									date: e,
									dates: s,
									ns: x.ns,
									title: x.toString(e, "D", d),
									value: e.getDate(),
									dateString: S(e),
									cssClass: i[0] ? ' class="' + i.join(" ") + '"' : "",
									linkClass: r,
									url: a
								}
							}
						})
					},
					first: function (e) {
						return k.firstDayOfMonth(e)
					},
					last: function (e) {
						var t = new _e(e.getFullYear(), e.getMonth() + 1, 0),
							n = k.firstDayOfMonth(e),
							i = Math.abs(t.getTimezoneOffset() - n.getTimezoneOffset());
						return i && t.setHours(n.getHours() + i / 60), t
					},
					compare: function (e, t) {
						var n, i = e.getMonth(),
							o = e.getFullYear(),
							r = t.getMonth(),
							a = t.getFullYear();
						return n = o > a ? 1 : a > o ? -1 : i == r ? 0 : i > r ? 1 : -1
					},
					setDate: function (e, t) {
						var n = e.getHours();
						t instanceof _e ? e.setFullYear(t.getFullYear(), t.getMonth(), t.getDate()) : k.setTime(e, t * ue), E(e, n)
					},
					toDateString: function (e) {
						return e.getFullYear() + "/" + e.getMonth() + "/" + e.getDate()
					}
				}, {
					name: "year",
					title: function (e) {
						//deaw
						var add_y = getAddYear();
						return e.getFullYear() + add_y;
					},
					content: function (e) {
						//deaw var t = h(e.culture).months.namesAbbr, var t = h(e.culture).months.namesAbbrNumber
						var t = h(e.culture).months.namesAbbrNumber;
						try {
							if (t == undefined) {
								t = h(e.culture).months.namesAbbr;
							}
						} catch (e) { }
						var n = this.toDateString,
							o = e.min,
							r = e.max;

						return i({
							min: new _e(o.getFullYear(), o.getMonth(), 1),
							max: new _e(r.getFullYear(), r.getMonth(), 1),
							start: new _e(e.date.getFullYear(), 0, 1),
							setter: this.setDate,
							build: function (e) {
								return {
									value: t[e.getMonth()],
									ns: x.ns,
									dateString: n(e),
									cssClass: ""
								}
							}
						})
					},
					first: function (e) {
						return new _e(e.getFullYear(), 0, e.getDate())
					},
					last: function (e) {
						return new _e(e.getFullYear(), 11, e.getDate())
					},
					compare: function (e, t) {
						return o(e, t)
					},
					setDate: function (e, t) {
						var n, i = e.getHours();
						t instanceof _e ? (n = t.getMonth(), e.setFullYear(t.getFullYear(), n, e.getDate()), n !== e.getMonth() && e.setDate(0)) : (n = e.getMonth() + t, e.setMonth(n), n > 11 && (n -= 12), n > 0 && e.getMonth() != n && e.setDate(0)), E(e, i)
					},
					toDateString: function (e) {
						return e.getFullYear() + "/" + e.getMonth() + "/1"
					}
				}, {
					name: "decade",
					title: function (e, t, i) {
						return n(e, t, i, 10);
					},
					content: function (e) {
						var t = e.date.getFullYear(),
							n = this.toDateString;
						//deaw
						var add_y = getAddYear();
						return i({
							start: new _e(t - t % 10 - 1, 0, 1),
							min: new _e(e.min.getFullYear(), 0, 1),
							max: new _e(e.max.getFullYear(), 0, 1),
							setter: this.setDate,
							build: function (e, t) {
								return {
									value: e.getFullYear() + add_y,
									ns: x.ns,
									dateString: n(e),
									cssClass: 0 === t || 11 == t ? te : ""
								}
							}
						})
					},
					first: function (e) {
						var t = e.getFullYear();
						return new _e(t - t % 10, e.getMonth(), e.getDate())
					},
					last: function (e) {
						var t = e.getFullYear();
						return new _e(t - t % 10 + 9, e.getMonth(), e.getDate())
					},
					compare: function (e, t) {
						return o(e, t, 10)
					},
					setDate: function (e, t) {
						c(e, t, 1)
					},
					toDateString: function (e) {
						return e.getFullYear() + "/0/1"
					}
				}, {
					name: $,
					title: function (e, t, i) {
						return n(e, t, i, 100)
					},
					content: function (e) {
						//deaw
						var add_y = getAddYear();
						var t = e.date.getFullYear(),
							n = e.min.getFullYear(),
							o = e.max.getFullYear(),
							r = this.toDateString,
							a = n,
							s = o;
						return a -= a % 10, s -= s % 10, 10 > s - a && (s = a + 9), i({
							start: new _e(t - t % 100 - 10, 0, 1),
							min: new _e(a, 0, 1),
							max: new _e(s, 0, 1),
							setter: this.setDate,
							build: function (e, t) {
								var i = e.getFullYear() + add_y,
									a = i + 9;
								return n > i && (i = n), a > o && (a = o), {
									ns: x.ns,
									value: i + " - " + a,
									dateString: r(e),
									cssClass: 0 === t || 11 == t ? te : ""
								}
							}
						})
					},
					first: function (e) {
						var t = e.getFullYear();
						return new _e(t - t % 100, e.getMonth(), e.getDate())
					},
					last: function (e) {
						var t = e.getFullYear();
						return new _e(t - t % 100 + 99, e.getMonth(), e.getDate())
					},
					compare: function (e, t) {
						return o(e, t, 100)
					},
					setDate: function (e, t) {
						c(e, t, 10)
					},
					toDateString: function (e) {
						var t = e.getFullYear();
						return t - t % 10 + "/0/1"
					}
				}]
			}, k.isEqualDatePart = g, k.makeUnselectable = p, k.restrictValue = a, k.isInRange = s, k.normalize = f, k.viewsEnum = be, k.disabled = _, x.calendar = k
		}(window.kendo.jQuery), window.kendo
	}, "function" == typeof define && define.amd ? define : function (e, t, n) {
		(n || t)()
	}),
	function (e, define) {
		define("kendo.datepicker.min", ["kendo.calendar.min", "kendo.popup.min"], e)
	}(function () {
		return function (e, t) {
			function n(t) {
				var n = t.parseFormats,
					i = t.format;
				z.normalize(t), n = e.isArray(n) ? n : [n], n.length || n.push("yyyy-MM-dd"), -1 === e.inArray(i, n) && n.splice(0, 0, t.format), t.parseFormats = n
			}

			function i(e) {
				e.preventDefault()
			}
			var o, r = window.kendo,
				a = r.ui,
				s = a.Widget,
				l = r.parseDate,
				c = r.keys,
				d = r.template,
				u = r._activeElement,
				h = "<div />",
				f = "<span />",
				p = ".kendoDatePicker",
				m = "click" + p,
				g = "open",
				v = "close",
				_ = "change",
				b = "disabled",
				w = "readonly",
				y = "k-state-default",
				k = "k-state-focused",
				x = "k-state-selected",
				C = "k-state-disabled",
				S = "k-state-hover",
				T = "mouseenter" + p + " mouseleave" + p,
				D = "mousedown" + p,
				A = "id",
				E = "min",
				R = "max",
				I = "month",
				F = "aria-disabled",
				M = "aria-expanded",
				P = "aria-hidden",
				z = r.calendar,
				B = z.isInRange,
				L = z.restrictValue,
				H = z.isEqualDatePart,
				N = e.extend,
				O = e.proxy,
				V = Date,
				U = function (t) {
					var n, i = this,
						o = document.body,
						s = e(h).attr(P, "true").addClass("k-calendar-container").appendTo(o);
					i.options = t = t || {}, n = t.id, n && (n += "_dateview", s.attr(A, n), i._dateViewID = n), i.popup = new a.Popup(s, N(t.popup, t, {
						name: "Popup",
						isRtl: r.support.isRtl(t.anchor)
					})), i.div = s, i.value(t.value)
				};
			U.prototype = {
				_calendar: function () {
					var t, n = this,
						o = n.calendar,
						s = n.options;
					o || (t = e(h).attr(A, r.guid()).appendTo(n.popup.element).on(D, i).on(m, "td:has(.k-link)", O(n._click, n)), n.calendar = o = new a.Calendar(t), n._setOptions(s), r.calendar.makeUnselectable(o.element), o.navigate(n._value || n._current, s.start), n.value(n._value))
				},
				_setOptions: function (e) {
					this.calendar.setOptions({
						focusOnNav: !1,
						change: e.change,
						culture: e.culture,
						dates: e.dates,
						depth: e.depth,
						footer: e.footer,
						format: e.format,
						max: e.max,
						min: e.min,
						month: e.month,
						start: e.start,
						disableDates: e.disableDates
					})
				},
				setOptions: function (e) {
					var t = this.options,
						n = e.disableDates;
					n && (e.disableDates = z.disabled(n)), this.options = N(t, e, {
						change: t.change,
						close: t.close,
						open: t.open
					}), this.calendar && this._setOptions(this.options)
				},
				destroy: function () {
					this.popup.destroy()
				},
				open: function () {
					var e = this;
					e._calendar(), e.popup.open()
				},
				close: function () {
					this.popup.close()
				},
				min: function (e) {
					this._option(E, e)
				},
				max: function (e) {
					this._option(R, e)
				},
				toggle: function () {
					var e = this;
					e[e.popup.visible() ? v : g]()
				},
				move: function (e) {
					var t = this,
						n = e.keyCode,
						i = t.calendar,
						o = e.ctrlKey && n == c.DOWN || n == c.ENTER,
						r = !1;
					if (e.altKey) n == c.DOWN ? (t.open(), e.preventDefault(), r = !0) : n == c.UP && (t.close(), e.preventDefault(), r = !0);
					else if (t.popup.visible()) {
						if (n == c.ESC || o && i._cell.hasClass(x)) return t.close(), e.preventDefault(), !0;
						t._current = i._move(e), r = !0
					}
					return r
				},
				current: function (e) {
					this._current = e, this.calendar._focus(e)
				},
				value: function (e) {
					var t = this,
						n = t.calendar,
						i = t.options,
						o = i.disableDates;
					o && o(e) && (e = null), t._value = e, t._current = new V(+L(e, i.min, i.max)), n && n.value(e)
				},
				_click: function (e) {
					-1 !== e.currentTarget.className.indexOf(x) && this.close()
				},
				_option: function (e, t) {
					var n = this,
						i = n.calendar;
					n.options[e] = t, i && i[e](t)
				}
			}, U.normalize = n, r.DateView = U, o = s.extend({
				init: function (t, i) {
					var o, a, c = this;
					s.fn.init.call(c, t, i), t = c.element, i = c.options, i.disableDates = r.calendar.disabled(i.disableDates), i.min = l(t.attr("min")) || l(i.min), i.max = l(t.attr("max")) || l(i.max), n(i), c._initialOptions = N({}, i), c._wrapper(), c.dateView = new U(N({}, i, {
						id: t.attr(A),
						anchor: c.wrapper,
						change: function () {
							c._change(this.value()), c.close()
						},
						close: function (e) {
							c.trigger(v) ? e.preventDefault() : (t.attr(M, !1), a.attr(P, !0))
						},
						open: function (e) {
							var n, i = c.options;
							c.trigger(g) ? e.preventDefault() : (c.element.val() !== c._oldText && (n = l(t.val(), i.parseFormats, i.culture), c.dateView[n ? "current" : "value"](n)), t.attr(M, !0), a.attr(P, !1), c._updateARIA(n))
						}
					})), a = c.dateView.div, c._icon();
					try {
						t[0].setAttribute("type", "text")
					} catch (d) {
						t[0].type = "text"
					}
					t.addClass("k-input").attr({
						role: "combobox",
						"aria-expanded": !1,
						"aria-owns": c.dateView._dateViewID
					}), c._reset(), c._template(), o = t.is("[disabled]") || e(c.element).parents("fieldset").is(":disabled"), o ? c.enable(!1) : c.readonly(t.is("[readonly]")), c._old = c._update(i.value || c.element.val()), c._oldText = t.val(), r.notify(c)
				},
				events: [g, v, _],
				options: {
					name: "DatePicker",
					value: null,
					footer: "",
					format: "",
					culture: "",
					parseFormats: [],
					min: new Date(1900, 0, 1),
					max: new Date(2699, 11, 31),
					start: I,
					depth: I,
					animation: {},
					month: {},
					dates: [],
					ARIATemplate: 'Current focused date is #=kendo.toString(data.current, "D")#'
				},
				setOptions: function (e) {
					var t = this,
						i = t._value;
					console.log('setOptions')
					s.fn.setOptions.call(t, e), e = t.options, e.min = l(e.min), e.max = l(e.max), n(e), t.dateView.setOptions(e), i && (t.element.val(r.toString(i, e.format, e.culture)), t._updateARIA(i))
				},
				_editable: function (e) {
					var t = this,
						n = t._dateIcon.off(p),
						o = t.element.off(p),
						r = t._inputWrapper.off(p),
						a = e.readonly,
						s = e.disable;
					a || s ? (r.addClass(s ? C : y).removeClass(s ? y : C), o.attr(b, s).attr(w, a).attr(F, s)) : (r.addClass(y).removeClass(C).on(T, t._toggleHover), o.removeAttr(b).removeAttr(w).attr(F, !1).on("keydown" + p, O(t._keydown, t)).on("focusout" + p, O(t._blur, t)).on("focus" + p, function () {
						t._inputWrapper.addClass(k)
					}), n.on(m, O(t._click, t)).on(D, i))
				},
				readonly: function (e) {
					this._editable({
						readonly: e === t ? !0 : e,
						disable: !1
					})
				},
				enable: function (e) {
					this._editable({
						readonly: !1,
						disable: !(e = e === t ? !0 : e)
					})
				},
				destroy: function () {
					var e = this;
					s.fn.destroy.call(e), e.dateView.destroy(), e.element.off(p), e._dateIcon.off(p), e._inputWrapper.off(p), e._form && e._form.off("reset", e._resetHandler)
				},
				open: function () {
					this.dateView.open()
				},
				close: function () {
					this.dateView.close()
				},
				min: function (e) {
					return this._option(E, e)
				},
				max: function (e) {
					return this._option(R, e)
				},
				value: function (e) {
					var n = this;
					return e === t ? n._value : (n._old = n._update(e), null === n._old && n.element.val(""), n._oldText = n.element.val(), t)
				},
				_toggleHover: function (t) {
					e(t.currentTarget).toggleClass(S, "mouseenter" === t.type)
				},
				_blur: function () {
					var e = this,
						t = e.element.val();
					e.close(), t !== e._oldText && e._change(t), e._inputWrapper.removeClass(k)
				},
				_click: function () {
					var e = this,
						t = e.element;
					e.dateView.toggle(), r.support.touch || t[0] === u() || t.focus()
				},
				_change: function (e) {
					var t, n, i, o = this,
						r = o.element.val();
					e = o._update(e), t = +o._old != +e, n = t && !o._typing, i = r !== o.element.val(), (n || i) && o.element.trigger(_), t && (o._old = e, o._oldText = o.element.val(), o.trigger(_)), o._typing = !1
				},
				_keydown: function (e) {
					var t = this,
						n = t.dateView,
						i = t.element.val(),
						o = !1;
					n.popup.visible() || e.keyCode != c.ENTER || i === t._oldText ? (o = n.move(e), t._updateARIA(n._current), o || (t._typing = !0)) : t._change(i)
				},
				_icon: function () {
					var t, n = this,
						i = n.element;
					t = i.next("span.k-select"), t[0] || (t = e('<span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-calendar">select</span></span>').insertAfter(i)), n._dateIcon = t.attr({
						role: "button",
						"aria-controls": n.dateView._dateViewID
					})
				},
				_option: function (e, n) {
					var i = this,
						o = i.options;
					return n === t ? o[e] : (n = l(n, o.parseFormats, o.culture), n && (o[e] = new V(+n), i.dateView[e](n)), t)
				},
				_update: function (e) {
					var t, n = this,
						i = n.options,
						o = i.min,
						a = i.max,
						s = n._value,
						c = l(e, i.parseFormats, i.culture),
						d = null === c && null === s || c instanceof Date && s instanceof Date;
					return i.disableDates(c) && (c = null, n._old || n.element.val() || (e = null)), +c === +s && d ? (t = r.toString(c, i.format, i.culture), t !== e && n.element.val(null === c ? e : t), c) : (null !== c && H(c, o) ? c = L(c, o, a) : B(c, o, a) || (c = null), n._value = c, n.dateView.value(c), n.element.val(c ? r.toString(c, i.format, i.culture) : e), n._updateARIA(c), c)
				},
				_wrapper: function () {
					var t, n = this,
						i = n.element;
					t = i.parents(".k-datepicker"), t[0] || (t = i.wrap(f).parent().addClass("k-picker-wrap k-state-default"), t = t.wrap(f).parent()), t[0].style.cssText = i[0].style.cssText, i.css({
						width: "100%",
						height: i[0].style.height
					}), n.wrapper = t.addClass("k-widget k-datepicker k-header").addClass(i[0].className), n._inputWrapper = e(t[0].firstChild)
				},
				_reset: function () {
					var t = this,
						n = t.element,
						i = n.attr("form"),
						o = i ? e("#" + i) : n.closest("form");
					o[0] && (t._resetHandler = function () {
						t.value(n[0].defaultValue), t.max(t._initialOptions.max), t.min(t._initialOptions.min)
					}, t._form = o.on("reset", t._resetHandler))
				},
				_template: function () {
					this._ariaTemplate = d(this.options.ARIATemplate)
				},
				_updateARIA: function (e) {
					var t, n = this,
						i = n.dateView.calendar;
					n.element.removeAttr("aria-activedescendant"), i && (t = i._cell, t.attr("aria-label", n._ariaTemplate({
						current: e || i.current()
					})), n.element.attr("aria-activedescendant", t.attr("id")))
				}
			}), a.plugin(o)
		}(window.kendo.jQuery), window.kendo
	}, "function" == typeof define && define.amd ? define : function (e, t, n) {
		(n || t)()
	})