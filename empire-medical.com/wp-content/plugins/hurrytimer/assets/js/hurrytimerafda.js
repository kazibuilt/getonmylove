/*!
 * The Final Countdown for jQuery v2.2.0 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2016 Edson Hilios
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
!function (a) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery) }(function (a) { "use strict"; function b(a) { if (a instanceof Date) return a; if (String(a).match(g)) return String(a).match(/^[0-9]*$/) && (a = Number(a)), String(a).match(/\-/) && (a = String(a).replace(/\-/g, "/")), new Date(a); throw new Error("Couldn't cast `" + a + "` to a date object.") } function c(a) { var b = a.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"); return new RegExp(b) } function d(a) { return function (b) { var d = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi); if (d) for (var f = 0, g = d.length; f < g; ++f) { var h = d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/), j = c(h[0]), k = h[1] || "", l = h[3] || "", m = null; h = h[2], i.hasOwnProperty(h) && (m = i[h], m = Number(a[m])), null !== m && ("!" === k && (m = e(l, m)), "" === k && m < 10 && (m = "0" + m.toString()), b = b.replace(j, m.toString())) } return b = b.replace(/%%/, "%") } } function e(a, b) { var c = "s", d = ""; return a && (a = a.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === a.length ? c = a[0] : (d = a[0], c = a[1])), Math.abs(b) > 1 ? c : d } var f = [], g = [], h = { precision: 100, elapse: !1, defer: !1 }; g.push(/^[0-9]*$/.source), g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g = new RegExp(g.join("|")); var i = { Y: "years", m: "months", n: "daysToMonth", d: "daysToWeek", w: "weeks", W: "weeksToMonth", H: "hours", M: "minutes", S: "seconds", D: "totalDays", I: "totalHours", N: "totalMinutes", T: "totalSeconds" }, j = function (b, c, d) { this.el = b, this.$el = a(b), this.interval = null, this.offset = {}, this.options = a.extend({}, h), this.instanceNumber = f.length, f.push(this), this.$el.data("countdown-instance", this.instanceNumber), d && ("function" == typeof d ? (this.$el.on("update.countdown", d), this.$el.on("stoped.countdown", d), this.$el.on("finish.countdown", d)) : this.options = a.extend({}, h, d)), this.setFinalDate(c), this.options.defer === !1 && this.start() }; a.extend(j.prototype, { start: function () { null !== this.interval && clearInterval(this.interval); var a = this; this.update(), this.interval = setInterval(function () { a.update.call(a) }, this.options.precision) }, stop: function () { clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped") }, toggle: function () { this.interval ? this.stop() : this.start() }, pause: function () { this.stop() }, resume: function () { this.start() }, remove: function () { this.stop.call(this), f[this.instanceNumber] = null, delete this.$el.data().countdownInstance }, setFinalDate: function (a) { this.finalDate = b(a) }, update: function () { if (0 === this.$el.closest("html").length) return void this.remove(); var b, c = void 0 !== a._data(this.el, "events"), d = new Date; b = this.finalDate.getTime() - d.getTime(), b = Math.ceil(b / 1e3), b = !this.options.elapse && b < 0 ? 0 : Math.abs(b), this.totalSecsLeft !== b && c && (this.totalSecsLeft = b, this.elapsed = d >= this.finalDate, this.offset = { seconds: this.totalSecsLeft % 60, minutes: Math.floor(this.totalSecsLeft / 60) % 60, hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24, days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7, daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7, daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368), weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7), weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4, months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368), years: Math.abs(this.finalDate.getFullYear() - d.getFullYear()), totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24), totalHours: Math.floor(this.totalSecsLeft / 60 / 60), totalMinutes: Math.floor(this.totalSecsLeft / 60), totalSeconds: this.totalSecsLeft }, this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(), this.dispatchEvent("finish"))) }, dispatchEvent: function (b) { var c = a.Event(b + ".countdown"); c.finalDate = this.finalDate, c.elapsed = this.elapsed, c.offset = a.extend({}, this.offset), c.strftime = d(this.offset), this.$el.trigger(c) } }), a.fn.countdown = function () { var b = Array.prototype.slice.call(arguments, 0); return this.each(function () { var c = a(this).data("countdown-instance"); if (void 0 !== c) { var d = f[c], e = b[0]; j.prototype.hasOwnProperty(e) ? d[e].apply(d, b.slice(1)) : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (d.setFinalDate.call(d, e), d.start()) : a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, e)) } else new j(this, b[0], b[1]) }) } });
(function ($) {
	"use strict";

	var Hurrytimer = {
		/**
		 * Countdown selector.
		 */
		countdownSelector: ".hurrytimer-cdt",

		/**
		 * Available end actions.
		 */
		endActions: hurrytimer_object.countdown_end_actions,

		/**
		 * Restart behaviors.
		 */
		restart: hurrytimer_object.restart,

		/**
		 * Create/override cookie.
		 * @param {string} cookieName
		 * @param {number} endsAtMs
		 */
		setCookie: function (cookieName, endsAtMs) {
			var expiryDate = new Date();
			expiryDate.setMonth(expiryDate.getMonth() + 12);
			document.cookie = cookieName + "=" + endsAtMs + ";expires=" + expiryDate.toUTCString() + ";path=/";
		},

		/**
		 * Duration in seconds.
		 *
		 * @param {number} duration
		 */
		endsAt: function (duration) {
			var date = new Date();
			date.setSeconds(date.getSeconds() + duration);
			return date;
		},

		/**
		 * Run end action.
		 * @param {object} $el
		 * @param {number} action
		 * @param {string} redirectUrl
		 */
		runEndAction: function ($el, action, redirectUrl) {
			switch (action) {
				case this.endActions.hide:
					$el.hide();
					break;
				case this.endActions.redirect:
					window.location.href = redirectUrl;
					break;
			}
		},

		/**
		 * Initialize coutdown.
		 */
		init: function () {
			// Hurrytimer object.
			var _this = this;

			$(_this.countdownSelector).each(function () {
				// Countdown element.
				var $this = $(this);

				// Countdown config.
				var config = $this.data("config");

				// Clean up DOM.
				$this.removeAttr("data-config");

				// Latest `endsAt`.
				var endsAt;
				if (isNaN(config.endsAt)) {
					endsAt = new Date(config.endsAt);
				} else {
					endsAt = new Date(+config.endsAt);
				}

				// Ensure given `endsAt` is a valid date.
				if (isNaN(endsAt)) throw "Invalid date.";

				// Current date.
				var now = new Date();

				// Create a new `endsAt` if is null or restart's enabled.
				if (
					endsAt.getTime() <= 0 ||
					config.reset ||
					(endsAt < now && config.restart === _this.restart.after_reload) ||
					(endsAt < now && config.restart === _this.restart.immediately)
				) {
					endsAt = _this.endsAt(config.duration);
				}

				// Override/create cookie.
				_this.setCookie(config.cookieName, endsAt.getTime());

				// Prepare end action.
				var runEndAction = function () {
					_this.runEndAction($this, config.endAction, config.redirectUrl);
				};

				// Run timer.
				$this
					.countdown(endsAt, function (event) {
						if (event.elapsed && config.endAction != _this.endActions.none) {
							runEndAction();
						} else {
							$this.html(event.strftime(config.template));
						}
					})
					.on("finish.countdown", function () {
						runEndAction();
						// Wait for 1s to mark countdown end.
						setTimeout(function () {
							// Restart immediatly if applicable.
							if (config.restart === _this.restart.immediately) {
								endsAt = _this.endsAt(config.duration);
								_this.setCookie(config.cookieName, endsAt.getTime());
								$this.countdown(endsAt);
							}
						}, 1000);
					});
			});
		}
	};

	// Initialize Countdown.
	Hurrytimer.init();
})(jQuery);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS5jb3VudGRvd24ubWluLmpzIiwiaHVycnl0aW1lci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Imh1cnJ5dGltZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIFRoZSBGaW5hbCBDb3VudGRvd24gZm9yIGpRdWVyeSB2Mi4yLjAgKGh0dHA6Ly9oaWxpb3MuZ2l0aHViLmlvL2pRdWVyeS5jb3VudGRvd24vKVxuICogQ29weXJpZ2h0IChjKSAyMDE2IEVkc29uIEhpbGlvc1xuICogXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4gKiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4gKiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4gKiB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuICogdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKiBcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqIFxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1NcbiAqIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuICogQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuICogQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuIWZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW1wianF1ZXJ5XCJdLGEpOmEoalF1ZXJ5KX0oZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYihhKXtpZihhIGluc3RhbmNlb2YgRGF0ZSlyZXR1cm4gYTtpZihTdHJpbmcoYSkubWF0Y2goZykpcmV0dXJuIFN0cmluZyhhKS5tYXRjaCgvXlswLTldKiQvKSYmKGE9TnVtYmVyKGEpKSxTdHJpbmcoYSkubWF0Y2goL1xcLS8pJiYoYT1TdHJpbmcoYSkucmVwbGFjZSgvXFwtL2csXCIvXCIpKSxuZXcgRGF0ZShhKTt0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBjYXN0IGBcIithK1wiYCB0byBhIGRhdGUgb2JqZWN0LlwiKX1mdW5jdGlvbiBjKGEpe3ZhciBiPWEudG9TdHJpbmcoKS5yZXBsYWNlKC8oWy4/KiteJFtcXF1cXFxcKCl7fXwtXSkvZyxcIlxcXFwkMVwiKTtyZXR1cm4gbmV3IFJlZ0V4cChiKX1mdW5jdGlvbiBkKGEpe3JldHVybiBmdW5jdGlvbihiKXt2YXIgZD1iLm1hdGNoKC8lKC18ISk/W0EtWl17MX0oOlteO10rOyk/L2dpKTtpZihkKWZvcih2YXIgZj0wLGc9ZC5sZW5ndGg7ZjxnOysrZil7dmFyIGg9ZFtmXS5tYXRjaCgvJSgtfCEpPyhbYS16QS1aXXsxfSkoOlteO10rOyk/Lyksaj1jKGhbMF0pLGs9aFsxXXx8XCJcIixsPWhbM118fFwiXCIsbT1udWxsO2g9aFsyXSxpLmhhc093blByb3BlcnR5KGgpJiYobT1pW2hdLG09TnVtYmVyKGFbbV0pKSxudWxsIT09bSYmKFwiIVwiPT09ayYmKG09ZShsLG0pKSxcIlwiPT09ayYmbTwxMCYmKG09XCIwXCIrbS50b1N0cmluZygpKSxiPWIucmVwbGFjZShqLG0udG9TdHJpbmcoKSkpfXJldHVybiBiPWIucmVwbGFjZSgvJSUvLFwiJVwiKX19ZnVuY3Rpb24gZShhLGIpe3ZhciBjPVwic1wiLGQ9XCJcIjtyZXR1cm4gYSYmKGE9YS5yZXBsYWNlKC8oOnw7fFxccykvZ2ksXCJcIikuc3BsaXQoL1xcLC8pLDE9PT1hLmxlbmd0aD9jPWFbMF06KGQ9YVswXSxjPWFbMV0pKSxNYXRoLmFicyhiKT4xP2M6ZH12YXIgZj1bXSxnPVtdLGg9e3ByZWNpc2lvbjoxMDAsZWxhcHNlOiExLGRlZmVyOiExfTtnLnB1c2goL15bMC05XSokLy5zb3VyY2UpLGcucHVzaCgvKFswLTldezEsMn1cXC8pezJ9WzAtOV17NH0oIFswLTldezEsMn0oOlswLTldezJ9KXsyfSk/Ly5zb3VyY2UpLGcucHVzaCgvWzAtOV17NH0oW1xcL1xcLV1bMC05XXsxLDJ9KXsyfSggWzAtOV17MSwyfSg6WzAtOV17Mn0pezJ9KT8vLnNvdXJjZSksZz1uZXcgUmVnRXhwKGcuam9pbihcInxcIikpO3ZhciBpPXtZOlwieWVhcnNcIixtOlwibW9udGhzXCIsbjpcImRheXNUb01vbnRoXCIsZDpcImRheXNUb1dlZWtcIix3Olwid2Vla3NcIixXOlwid2Vla3NUb01vbnRoXCIsSDpcImhvdXJzXCIsTTpcIm1pbnV0ZXNcIixTOlwic2Vjb25kc1wiLEQ6XCJ0b3RhbERheXNcIixJOlwidG90YWxIb3Vyc1wiLE46XCJ0b3RhbE1pbnV0ZXNcIixUOlwidG90YWxTZWNvbmRzXCJ9LGo9ZnVuY3Rpb24oYixjLGQpe3RoaXMuZWw9Yix0aGlzLiRlbD1hKGIpLHRoaXMuaW50ZXJ2YWw9bnVsbCx0aGlzLm9mZnNldD17fSx0aGlzLm9wdGlvbnM9YS5leHRlbmQoe30saCksdGhpcy5pbnN0YW5jZU51bWJlcj1mLmxlbmd0aCxmLnB1c2godGhpcyksdGhpcy4kZWwuZGF0YShcImNvdW50ZG93bi1pbnN0YW5jZVwiLHRoaXMuaW5zdGFuY2VOdW1iZXIpLGQmJihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkPyh0aGlzLiRlbC5vbihcInVwZGF0ZS5jb3VudGRvd25cIixkKSx0aGlzLiRlbC5vbihcInN0b3BlZC5jb3VudGRvd25cIixkKSx0aGlzLiRlbC5vbihcImZpbmlzaC5jb3VudGRvd25cIixkKSk6dGhpcy5vcHRpb25zPWEuZXh0ZW5kKHt9LGgsZCkpLHRoaXMuc2V0RmluYWxEYXRlKGMpLHRoaXMub3B0aW9ucy5kZWZlcj09PSExJiZ0aGlzLnN0YXJ0KCl9O2EuZXh0ZW5kKGoucHJvdG90eXBlLHtzdGFydDpmdW5jdGlvbigpe251bGwhPT10aGlzLmludGVydmFsJiZjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO3ZhciBhPXRoaXM7dGhpcy51cGRhdGUoKSx0aGlzLmludGVydmFsPXNldEludGVydmFsKGZ1bmN0aW9uKCl7YS51cGRhdGUuY2FsbChhKX0sdGhpcy5vcHRpb25zLnByZWNpc2lvbil9LHN0b3A6ZnVuY3Rpb24oKXtjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpLHRoaXMuaW50ZXJ2YWw9bnVsbCx0aGlzLmRpc3BhdGNoRXZlbnQoXCJzdG9wZWRcIil9LHRvZ2dsZTpmdW5jdGlvbigpe3RoaXMuaW50ZXJ2YWw/dGhpcy5zdG9wKCk6dGhpcy5zdGFydCgpfSxwYXVzZTpmdW5jdGlvbigpe3RoaXMuc3RvcCgpfSxyZXN1bWU6ZnVuY3Rpb24oKXt0aGlzLnN0YXJ0KCl9LHJlbW92ZTpmdW5jdGlvbigpe3RoaXMuc3RvcC5jYWxsKHRoaXMpLGZbdGhpcy5pbnN0YW5jZU51bWJlcl09bnVsbCxkZWxldGUgdGhpcy4kZWwuZGF0YSgpLmNvdW50ZG93bkluc3RhbmNlfSxzZXRGaW5hbERhdGU6ZnVuY3Rpb24oYSl7dGhpcy5maW5hbERhdGU9YihhKX0sdXBkYXRlOmZ1bmN0aW9uKCl7aWYoMD09PXRoaXMuJGVsLmNsb3Nlc3QoXCJodG1sXCIpLmxlbmd0aClyZXR1cm4gdm9pZCB0aGlzLnJlbW92ZSgpO3ZhciBiLGM9dm9pZCAwIT09YS5fZGF0YSh0aGlzLmVsLFwiZXZlbnRzXCIpLGQ9bmV3IERhdGU7Yj10aGlzLmZpbmFsRGF0ZS5nZXRUaW1lKCktZC5nZXRUaW1lKCksYj1NYXRoLmNlaWwoYi8xZTMpLGI9IXRoaXMub3B0aW9ucy5lbGFwc2UmJmI8MD8wOk1hdGguYWJzKGIpLHRoaXMudG90YWxTZWNzTGVmdCE9PWImJmMmJih0aGlzLnRvdGFsU2Vjc0xlZnQ9Yix0aGlzLmVsYXBzZWQ9ZD49dGhpcy5maW5hbERhdGUsdGhpcy5vZmZzZXQ9e3NlY29uZHM6dGhpcy50b3RhbFNlY3NMZWZ0JTYwLG1pbnV0ZXM6TWF0aC5mbG9vcih0aGlzLnRvdGFsU2Vjc0xlZnQvNjApJTYwLGhvdXJzOk1hdGguZmxvb3IodGhpcy50b3RhbFNlY3NMZWZ0LzYwLzYwKSUyNCxkYXlzOk1hdGguZmxvb3IodGhpcy50b3RhbFNlY3NMZWZ0LzYwLzYwLzI0KSU3LGRheXNUb1dlZWs6TWF0aC5mbG9vcih0aGlzLnRvdGFsU2Vjc0xlZnQvNjAvNjAvMjQpJTcsZGF5c1RvTW9udGg6TWF0aC5mbG9vcih0aGlzLnRvdGFsU2Vjc0xlZnQvNjAvNjAvMjQlMzAuNDM2OCksd2Vla3M6TWF0aC5mbG9vcih0aGlzLnRvdGFsU2Vjc0xlZnQvNjAvNjAvMjQvNyksd2Vla3NUb01vbnRoOk1hdGguZmxvb3IodGhpcy50b3RhbFNlY3NMZWZ0LzYwLzYwLzI0LzcpJTQsbW9udGhzOk1hdGguZmxvb3IodGhpcy50b3RhbFNlY3NMZWZ0LzYwLzYwLzI0LzMwLjQzNjgpLHllYXJzOk1hdGguYWJzKHRoaXMuZmluYWxEYXRlLmdldEZ1bGxZZWFyKCktZC5nZXRGdWxsWWVhcigpKSx0b3RhbERheXM6TWF0aC5mbG9vcih0aGlzLnRvdGFsU2Vjc0xlZnQvNjAvNjAvMjQpLHRvdGFsSG91cnM6TWF0aC5mbG9vcih0aGlzLnRvdGFsU2Vjc0xlZnQvNjAvNjApLHRvdGFsTWludXRlczpNYXRoLmZsb29yKHRoaXMudG90YWxTZWNzTGVmdC82MCksdG90YWxTZWNvbmRzOnRoaXMudG90YWxTZWNzTGVmdH0sdGhpcy5vcHRpb25zLmVsYXBzZXx8MCE9PXRoaXMudG90YWxTZWNzTGVmdD90aGlzLmRpc3BhdGNoRXZlbnQoXCJ1cGRhdGVcIik6KHRoaXMuc3RvcCgpLHRoaXMuZGlzcGF0Y2hFdmVudChcImZpbmlzaFwiKSkpfSxkaXNwYXRjaEV2ZW50OmZ1bmN0aW9uKGIpe3ZhciBjPWEuRXZlbnQoYitcIi5jb3VudGRvd25cIik7Yy5maW5hbERhdGU9dGhpcy5maW5hbERhdGUsYy5lbGFwc2VkPXRoaXMuZWxhcHNlZCxjLm9mZnNldD1hLmV4dGVuZCh7fSx0aGlzLm9mZnNldCksYy5zdHJmdGltZT1kKHRoaXMub2Zmc2V0KSx0aGlzLiRlbC50cmlnZ2VyKGMpfX0pLGEuZm4uY291bnRkb3duPWZ1bmN0aW9uKCl7dmFyIGI9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDApO3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgYz1hKHRoaXMpLmRhdGEoXCJjb3VudGRvd24taW5zdGFuY2VcIik7aWYodm9pZCAwIT09Yyl7dmFyIGQ9ZltjXSxlPWJbMF07ai5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoZSk/ZFtlXS5hcHBseShkLGIuc2xpY2UoMSkpOm51bGw9PT1TdHJpbmcoZSkubWF0Y2goL15bJEEtWl9dWzAtOUEtWl8kXSokL2kpPyhkLnNldEZpbmFsRGF0ZS5jYWxsKGQsZSksZC5zdGFydCgpKTphLmVycm9yKFwiTWV0aG9kICVzIGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS5jb3VudGRvd25cIi5yZXBsYWNlKC9cXCVzL2dpLGUpKX1lbHNlIG5ldyBqKHRoaXMsYlswXSxiWzFdKX0pfX0pOyIsIihmdW5jdGlvbigkKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdHZhciBIdXJyeXRpbWVyID0ge1xuXHRcdC8qKlxuXHRcdCAqIENvdW50ZG93biBzZWxlY3Rvci5cblx0XHQgKi9cblx0XHRjb3VudGRvd25TZWxlY3RvcjogXCIuaHVycnl0aW1lci1jZHRcIixcblxuXHRcdC8qKlxuXHRcdCAqIEF2YWlsYWJsZSBlbmQgYWN0aW9ucy5cblx0XHQgKi9cblx0XHRlbmRBY3Rpb25zOiBodXJyeXRpbWVyX29iamVjdC5jb3VudGRvd25fZW5kX2FjdGlvbnMsXG5cblx0XHQvKipcblx0XHQgKiBSZXN0YXJ0IGJlaGF2aW9ycy5cblx0XHQgKi9cblx0XHRyZXN0YXJ0OiBodXJyeXRpbWVyX29iamVjdC5yZXN0YXJ0LFxuXG5cdFx0LyoqXG5cdFx0ICogQ3JlYXRlL292ZXJyaWRlIGNvb2tpZS5cblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gY29va2llTmFtZVxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSBlbmRzQXRNc1xuXHRcdCAqL1xuXHRcdHNldENvb2tpZTogZnVuY3Rpb24oY29va2llTmFtZSwgZW5kc0F0TXMpIHtcblx0XHRcdGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZU5hbWUgKyBcIj1cIiArIGVuZHNBdE1zICsgXCI7cGF0aD0vXCI7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIER1cmF0aW9uIGluIHNlY29uZHMuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb25cblx0XHQgKi9cblx0XHRlbmRzQXQ6IGZ1bmN0aW9uKGR1cmF0aW9uKSB7XG5cdFx0XHR2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0XHRkYXRlLnNldFNlY29uZHMoZGF0ZS5nZXRTZWNvbmRzKCkgKyBkdXJhdGlvbik7XG5cdFx0XHRyZXR1cm4gZGF0ZTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUnVuIGVuZCBhY3Rpb24uXG5cdFx0ICogQHBhcmFtIHtvYmplY3R9ICRlbFxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSBhY3Rpb25cblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gcmVkaXJlY3RVcmxcblx0XHQgKi9cblx0XHRydW5FbmRBY3Rpb246IGZ1bmN0aW9uKCRlbCwgYWN0aW9uLCByZWRpcmVjdFVybCkge1xuXHRcdFx0c3dpdGNoIChhY3Rpb24pIHtcblx0XHRcdFx0Y2FzZSB0aGlzLmVuZEFjdGlvbnMuaGlkZTpcblx0XHRcdFx0XHQkZWwuaGlkZSgpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIHRoaXMuZW5kQWN0aW9ucy5yZWRpcmVjdDpcblx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlZGlyZWN0VXJsO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbml0aWFsaXplIGNvdXRkb3duLlxuXHRcdCAqL1xuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gSHVycnl0aW1lciBvYmplY3QuXG5cdFx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdFx0XHQkKF90aGlzLmNvdW50ZG93blNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQvLyBDb3VudGRvd24gZWxlbWVudC5cblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcblxuXHRcdFx0XHQvLyBDb3VudGRvd24gY29uZmlnLlxuXHRcdFx0XHR2YXIgY29uZmlnID0gJHRoaXMuZGF0YShcImNvbmZpZ1wiKTtcblxuXHRcdFx0XHQvLyBDbGVhbiB1cCBET00uXG5cdFx0XHRcdCR0aGlzLnJlbW92ZUF0dHIoXCJkYXRhLWNvbmZpZ1wiKTtcblxuXHRcdFx0XHQvLyBMYXRlc3QgYGVuZHNBdGAuXG5cdFx0XHRcdHZhciBlbmRzQXQ7XG5cdFx0XHRcdGlmIChpc05hTihjb25maWcuZW5kc0F0KSkge1xuXHRcdFx0XHRcdGVuZHNBdCA9IG5ldyBEYXRlKGNvbmZpZy5lbmRzQXQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGVuZHNBdCA9IG5ldyBEYXRlKCtjb25maWcuZW5kc0F0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEVuc3VyZSBnaXZlbiBgZW5kc0F0YCBpcyBhIHZhbGlkIGRhdGUuXG5cdFx0XHRcdGlmIChpc05hTihlbmRzQXQpKSB0aHJvdyBcIkludmFsaWQgZGF0ZS5cIjtcblxuXHRcdFx0XHQvLyBDdXJyZW50IGRhdGUuXG5cdFx0XHRcdHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuXG5cdFx0XHRcdC8vIENyZWF0ZSBhIG5ldyBgZW5kc0F0YCBpZiBpcyBudWxsIG9yIHJlc3RhcnQncyBlbmFibGVkLlxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0ZW5kc0F0LmdldFRpbWUoKSA8PSAwIHx8XG5cdFx0XHRcdFx0Y29uZmlnLnJlc2V0IHx8XG5cdFx0XHRcdFx0KGVuZHNBdCA8IG5vdyAmJiBjb25maWcucmVzdGFydCA9PT0gX3RoaXMucmVzdGFydC5hZnRlcl9yZWxvYWQpIHx8XG5cdFx0XHRcdFx0KGVuZHNBdCA8IG5vdyAmJiBjb25maWcucmVzdGFydCA9PT0gX3RoaXMucmVzdGFydC5pbW1lZGlhdGVseSlcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0ZW5kc0F0ID0gX3RoaXMuZW5kc0F0KGNvbmZpZy5kdXJhdGlvbik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBPdmVycmlkZS9jcmVhdGUgY29va2llLlxuXHRcdFx0XHRfdGhpcy5zZXRDb29raWUoY29uZmlnLmNvb2tpZU5hbWUsIGVuZHNBdC5nZXRUaW1lKCkpO1xuXG5cdFx0XHRcdC8vIFByZXBhcmUgZW5kIGFjdGlvbi5cblx0XHRcdFx0dmFyIHJ1bkVuZEFjdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdF90aGlzLnJ1bkVuZEFjdGlvbigkdGhpcywgY29uZmlnLmVuZEFjdGlvbiwgY29uZmlnLnJlZGlyZWN0VXJsKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQvLyBSdW4gdGltZXIuXG5cdFx0XHRcdCR0aGlzXG5cdFx0XHRcdFx0LmNvdW50ZG93bihlbmRzQXQsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRpZiAoZXZlbnQuZWxhcHNlZCAmJiBjb25maWcuZW5kQWN0aW9uICE9IF90aGlzLmVuZEFjdGlvbnMubm9uZSkge1xuXHRcdFx0XHRcdFx0XHRydW5FbmRBY3Rpb24oKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdCR0aGlzLmh0bWwoZXZlbnQuc3RyZnRpbWUoY29uZmlnLnRlbXBsYXRlKSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQub24oXCJmaW5pc2guY291bnRkb3duXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cnVuRW5kQWN0aW9uKCk7XG5cdFx0XHRcdFx0XHQvLyBXYWl0IGZvciAxcyB0byBtYXJrIGNvdW50ZG93biBlbmQuXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHQvLyBSZXN0YXJ0IGltbWVkaWF0bHkgaWYgYXBwbGljYWJsZS5cblx0XHRcdFx0XHRcdFx0aWYgKGNvbmZpZy5yZXN0YXJ0ID09PSBfdGhpcy5yZXN0YXJ0LmltbWVkaWF0ZWx5KSB7XG5cdFx0XHRcdFx0XHRcdFx0ZW5kc0F0ID0gX3RoaXMuZW5kc0F0KGNvbmZpZy5kdXJhdGlvbik7XG5cdFx0XHRcdFx0XHRcdFx0X3RoaXMuc2V0Q29va2llKGNvbmZpZy5jb29raWVOYW1lLCBlbmRzQXQuZ2V0VGltZSgpKTtcblx0XHRcdFx0XHRcdFx0XHQkdGhpcy5jb3VudGRvd24oZW5kc0F0KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSwgMTAwMCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cblx0Ly8gSW5pdGlhbGl6ZSBDb3VudGRvd24uXG5cdEh1cnJ5dGltZXIuaW5pdCgpO1xufSkoalF1ZXJ5KTtcbiJdfQ==
