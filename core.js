/*! WoW Game Site Scripts */
function polyfill(t, e, n) {
    t[e] || Object.defineProperty(t, e, {
        enumerable: !1,
        configurable: !0,
        writable: !0,
        value: n
    })
}

function DOMTokenList(t) {
    this.element = t;
    var e = t.className.trim().split(/\s+/);
    Array.prototype.push.apply(this, e)
}

function CustomEvent(t, e) {
    e = e || {};
    var n = document.createEvent("CustomEvent");
    return n.initCustomEvent(t, e.bubbles || !1, e.cancelable || !1, e.detail), n
}

function trigger(t, e) {
    var n;
    switch (t) {
        case "resize":
            "function" == typeof UIEvent ? n = new UIEvent(t) : (n = document.createEvent("UIEvent"), n.initUIEvent(t, !0, !0, window, 1));
            break;
        default:
            var i = null;
            null != e && (i = {
                detail: e
            }), n = new CustomEvent(t, i)
    }
    this.dispatchEvent(n)
}

function querySelectorAlways(t, e) {
    function n() {
        querySelectorAlways.init();
        querySelectorAlways.addSelector(t, e)
    }
    if (!e) throw new Error("querySelectorAlways expects a callback");
    n()
}

function Media() {
    this.elems = [], this.matches = {}
}

function Mouse() {
    this.x = 0, this.y = 0
}

function Scrollbar() {
    this.width = 0
}

function Animation(t) {
    this.fn = t, this.paused = !0, this.timestamp = 0, this.update = this.update.bind(this)
}

function SVG(t) {
    if (this.elem = t, this.href = t.getAttribute("xlink:href"), this.href) {
        var e = this.href.indexOf("#");
        this.url = this.href.substr(0, e), this.id = this.href.substr(e + 1), this.init()
    }
}
polyfill(Array, "from", function(t) {
        return Array.prototype.slice.call(t)
    }), polyfill(Array.prototype, "each", function(t) {
        return this.forEach(t), this
    }), polyfill(Function.prototype, "bind", function(t) {
        function e() {}
        if ("function" != typeof this) throw new TypeError("Bind must be called on a function");
        var n = this,
            i = Array.from(arguments).slice(1),
            r = function() {
                var r = this instanceof e ? this : t;
                return n.apply(r, i.concat(Array.from(arguments)))
            };
        return e.prototype = n.prototype, r.prototype = new e, r
    }), polyfill(Object, "assign", function(t, e) {
        function n(e, n) {
            var i = Object.getOwnPropertyDescriptor(e, n);
            void 0 !== i && i.enumerable && (t[n] = e[n])
        }

        function i(t) {
            null != t && Object.keys(t).map(n.bind(t, t))
        }
        return t = null == t ? {} : Object(t), Array.from(arguments).slice(1).map(i), t
    }), polyfill(Element.prototype, "matches", Element.prototype.msMatchesSelector), ["indexOf", "slice", "forEach", "each", "map", "reduce", "filter", "every", "some"].each(function(t) {
        polyfill(NodeList.prototype, t, Array.prototype[t])
    }), polyfill(NodeList.prototype, "matches", function(t) {
        function e(e) {
            return e.matches(t)
        }
        return this.filter(e)
    }), polyfill(NodeList.prototype, "match", function(t) {
        var e, n = this.length;
        for (e = 0; e < n; e++)
            if (this[e].matches(t)) return this[e];
        return null
    }), Object.defineProperty(Node.prototype, "textNodes", {
        enumerable: !1,
        configurable: !0,
        get: function() {
            for (var t, e = {
                    SCRIPT: !0,
                    NOSCRIPT: !0,
                    STYLE: !0
                }, n = [], i = document.createTreeWalker(this, NodeFilter.SHOW_TEXT, null, !1); t = i.nextNode();) e[t.parentNode.nodeName] || n.push(t);
            return n
        }
    }), polyfill(Element.prototype, "remove", function() {
        this.parentNode && this.parentNode.removeChild(this)
    }), polyfill(Element.prototype, "attr", function(t, e) {
        return t ? (null === e ? this.removeAttribute(t) : void 0 !== e && (e === !0 && (e = ""), this.setAttribute(t, e)), this.getAttribute(t)) : null
    }), polyfill(Element.prototype, "data", function(t, e) {
        return t ? this.attr("data-" + t, e) : null
    }), polyfill(Element.prototype, "attributeSelector", function(t) {
        var e = this,
            n = [];
        return Array.prototype.map.call(arguments, function(t) {
            var i = e.getAttribute(t);
            null == i || "" === i ? n.push("[" + t + "]") : n.push("[" + t + '="' + i + '"]')
        }), n.join("")
    }), polyfill(Array.prototype, "sortBy", function(t, e) {
        if (!this.length) return this;
        var n, i, r = function() {
            return this
        };
        t && (r = "function" == typeof t ? t : function() {
            return this[t]
        });
        var o = !e && "number" == typeof(t ? r.call(this[this.length - 1]) : this[this.length - 1]);
        return o && (e = function(t, e) {
            return t - e
        }), t && (n = Object.prototype.toString, i = Array.prototype.toString, Object.prototype.toString = r, Array.prototype.toString = r), e ? Array.prototype.sort.call(this, e) : Array.prototype.sort.call(this), t && (Object.prototype.toString = n, Array.prototype.toString = i), this
    }), "classList" in document.documentElement || (DOMTokenList.prototype = {
        add: function(t) {
            this.contains(t) || (Array.prototype.push.call(this, t), this.element.className = this.toString())
        },
        contains: function(t) {
            return (" " + this.element.className + " ").indexOf(" " + t + " ") >= 0
        },
        item: function(t) {
            return this[t] || null
        },
        remove: function(t) {
            if (this.contains(t)) {
                for (var e = 0; e < this.length; e++) this[e] == t && Array.prototype.splice.call(this, e--, 1);
                this.element.className = this.toString()
            }
        },
        toString: function() {
            return Array.prototype.join.call(this, " ")
        },
        toggle: function(t) {
            return this.contains(t) ? this.remove(t) : this.add(t), this.contains(t)
        }
    }, window.DOMTokenList = DOMTokenList, Object.defineProperty(Element.prototype, "classList", {
        get: function() {
            return new DOMTokenList(this)
        }
    })), CustomEvent.prototype = window.Event.prototype, window.CustomEvent = CustomEvent, polyfill(Element.prototype, "trigger", trigger), window.trigger = trigger, polyfill(Date, "now", function() {
        return (new Date).getTime()
    }), window.performance = window.performance || {}, polyfill(performance, "now", function() {
        return Date.now()
    }), window.setImmediate || (window.setImmediate = function(t) {
        setTimeout(t, 1)
    }),
    function() {
        for (var t = 0, e = ["ms", "moz", "webkit", "o"], n = 0; n < e.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[e[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[n] + "CancelAnimationFrame"] || window[e[n] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(e) {
            function n() {
                e(i + r)
            }
            var i = (new Date).getTime(),
                r = Math.max(0, 16 - (i - t));
            return t = i + r, window.setTimeout(n, r)
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
            clearTimeout(t)
        })
    }();
var supports = {
    filter: function() {
        var t = document.createElement("fakeelement");
        return t.style.cssText = "-webkit-filter:blur(2px); filter:blur(2px);", !!t.style.length && (document.documentMode || 10) > 9
    }(),
    touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
    transitionEnd: function() {
        var t, e = document.createElement("fakeelement"),
            n = {
                transition: "transitionend",
                OTransition: "oTransitionEnd",
                MozTransition: "transitionend",
                WebkitTransition: "webkitTransitionEnd"
            };
        for (t in n)
            if (void 0 !== e.style[t]) return n[t];
        return !1
    }(),
    video: function() {
        var t = document.createElement("video"),
            e = {};
        return e = "canPlayType" in t ? {
            webm: t.canPlayType("video/webm"),
            mp4: t.canPlayType("video/mp4")
        } : {
            webm: !1,
            mp4: !1
        }, t = null, (e.webm || e.mp4) && !window.navigator.userAgent.match(/iPhone|iPad|iPod/i)
    }()
};
Object.keys(supports).map(function(t) {
    supports[t] && document.documentElement.classList.add(t)
}), querySelectorAlways.attribute = "queryselectoralways", querySelectorAlways.init = function() {
    querySelectorAlways.style || (querySelectorAlways.style = document.createElement("style"), querySelectorAlways.style.id = "querySelectorAlways", querySelectorAlways.style.appendChild(document.createTextNode("")), document.head.appendChild(querySelectorAlways.style), ["animationstart", "MSAnimationStart", "webkitAnimationStart"].map(function(t) {
        document.addEventListener(t, querySelectorAlways.onanimationstart, !1)
    }), document.addEventListener("DOMContentLoaded", querySelectorAlways.update))
}, querySelectorAlways.selectors = {}, querySelectorAlways.callbacks = [], querySelectorAlways.addSelector = function(t, e) {
    t = t.trim();
    var n = querySelectorAlways.selectors[t];
    return n ? querySelectorAlways.callbacks[n].push(e) : (n = querySelectorAlways.callbacks.length, querySelectorAlways.selectors[t] = n, querySelectorAlways.callbacks[n] = [e], querySelectorAlways.install(n, t)), n
}, querySelectorAlways.update = function() {
    var t, e;
    for (t in querySelectorAlways.selectors) {
        e = querySelectorAlways.selectors[t];
        var n = document.querySelectorAll(t);
        Array.prototype.map.call(n, function(t) {
            querySelectorAlways.addNode(e, t)
        })
    }
}, querySelectorAlways.install = function(t, e) {
    function n(t) {
        querySelectorAlways.style.textContent += "\n" + t
    }
    var i = "querySelectorAlways" + t,
        r = "visibility:hidden!important;",
        o = ":not([" + querySelectorAlways.attribute + '~="' + t + '"])';
    e = e.replace(/(,|$)/g, function(t) {
        return o + t
    }), n(e + " { " + r + " animation: 0.01ms " + i + "!important; -webkit-animation: 0.01ms " + i + "!important; }"), n("@keyframes " + i + " { from { opacity: 0.999; } to { opacity: 1; } }"), n("@-webkit-keyframes " + i + " { from { opacity: 0.999; } to { opacity: 1; } }\n")
}, querySelectorAlways.regexEvent = /querySelectorAlways(\d+)/, querySelectorAlways.onanimationstart = function(t) {
    var e = t.animationName.match(querySelectorAlways.regexEvent);
    if (e) {
        var n = parseInt(e[1]),
            i = t.target;
        querySelectorAlways.addNode.call(this, n, i)
    }
}, querySelectorAlways.addNode = function(t, e) {
    var n = e.getAttribute(querySelectorAlways.attribute),
        i = n ? n.split(" ") : [];
    if (i.indexOf(String(t)) < 0) {
        i.push(t), e.setAttribute(querySelectorAlways.attribute, i.join(" "));
        var r = querySelectorAlways.callbacks[t];
        r && r.map(function(t) {
            t(e)
        })
    }
}, document.querySelectorAlways = querySelectorAlways, Media.sizes = ["original", "small", "medium", "large", "wide", "huge", "max", "edge", "over"], Media.attrs = Media.sizes.map(function(t) {
    return "media-" + t
}), Media.query = Media.attrs.map(function(t) {
    return "[" + t + "]"
}).join(","), Media.widths = [0, 320, 540, 720, 980, 1280, 1600, 2400, 9e3], Media.spaceReg = /\s+/, Media.prototype = {
    init: function() {
        this.update(), document.querySelectorAlways(Media.query, this.addElem.bind(this)), window.addEventListener("resize", this.update.bind(this)), window.addEventListener("load", this.resize.bind(this))
    },
    resize: function() {
        window.trigger ? window.trigger("resize") : this.update()
    },
    addElem: function(t) {
        t.setAttribute("media-original", t.className), this.elems.push(t), this.updateElem(t)
    },
    update: function() {
        this.width = window.innerWidth;
        var t = Media.widths[1];
        this.width < t && (this.width = t), Media.widths.map(this.updateWidth.bind(this)), this.elems.map(this.updateElem.bind(this))
    },
    updateWidth: function(t, e) {
        var n = "media-" + Media.sizes[e];
        this.matches[n] = this.width >= t
    },
    updateElem: function(t) {
        Media.attrs.map(this.updateMedia.bind(this, t))
    },
    updateMedia: function(t, e) {
        var n = t.getAttribute(e);
        if (n) {
            var i = n.split(Media.spaceReg);
            i.map(this.updateClass.bind(this, t, e))
        }
    },
    updateClass: function(t, e, n) {
        var i = this.matches[e],
            r = "!" === n.charAt(0);
        if (r) {
            if (i) {
                var o = "!" === n.charAt(1);
                o ? t.classList.add(n.slice(2)) : t.classList.remove(n.slice(1))
            }
        } else t.classList[i ? "add" : "remove"](n)
    }
};
var media = new Media;
media.init(), Mouse.prototype = {
    init: function() {
        window.addEventListener("mousemove", this.update.bind(this)), window.addEventListener("touchstart", this.update.bind(this)), window.addEventListener("touchmove", this.update.bind(this))
    },
    update: function(t) {
        var e = t.changedTouches ? t.changedTouches[0] : t;
        this.x = e.clientX, this.y = e.clientY
    }
};
var mouse = new Mouse;
mouse.init(), Scrollbar.prototype = {
    init: function() {
        var t = document.getElementById("scrollbar");
        t.remove();
        var e = document.querySelector(".body");
        this.width = e.offsetWidth - e.clientWidth
    }
};
var scrollbar = new Scrollbar;
Animation.prototype = {
    start: function() {
        this.paused && (this.paused = !1, this.timestamp = performance.now(), requestAnimationFrame(this.update))
    },
    stop: function(t) {
        this.paused = !0, t !== !0 && (this.timestamp = 0)
    },
    update: function(t) {
        if (this.timestamp) {
            var e = t - this.timestamp;
            this.timestamp = t, this.fn(e), this.paused || requestAnimationFrame(this.update)
        }
    }
}, Object.assign(SVG, {
    svgs: {},
    support: !/\bTrident\/\d+\b/.test(navigator.userAgent),
    init: function() {
        SVG.support || document.querySelectorAlways("svg use", SVG.create)
    },
    create: function(t) {
        new SVG(t)
    }
}), SVG.prototype = {
    init: function() {
        var t = this.svg();
        t instanceof XMLHttpRequest ? t.addEventListener("load", this.load.bind(this)) : this.load()
    },
    svg: function() {
        var t = document;
        return this.url && (t = SVG.svgs[this.url], t || (t = SVG.svgs[this.url] = this.ajax(this.url))), t
    },
    ajax: function(t) {
        function e() {
            if (n.status < 400) {
                var e = document.implementation.createHTMLDocument("");
                e.body.innerHTML = n.responseText, SVG.svgs[t] = e.querySelector("svg")
            }
        }
        var n = new XMLHttpRequest;
        return n.open("GET", encodeURI(t), !0), n.addEventListener("load", e), n.send(), n
    },
    load: function() {
        this.set(this.svg().getElementById(this.id))
    },
    set: function(t) {
        if (t) {
            for (var e = t.cloneNode(!0), n = document.createDocumentFragment(); e.firstChild;) n.appendChild(e.firstChild);
            this.elem.appendChild(n)
        }
    }
}, SVG.init(), window.addEventListener("DOMContentLoaded", function(t) {
    function e(t, e) {
        return function(n) {
            var i = n.textContent;
            if (!(i.indexOf(t) < 0)) {
                var r = document.createDocumentFragment();
                i.split(t).each(function(n, i) {
                    if (i) {
                        var o = document.createElement("span");
                        o.className = e, o.textContent = t, r.appendChild(o)
                    }
                    r.appendChild(document.createTextNode(n))
                }), n.parentNode.replaceChild(r, n)
            }
        }
    }
    var n = e("?", "fontFamily-blizzard"),
        i = e("Â®", "font-legalmark"),
        r = e("Â©", "font-legalmark"),
        o = e("â„¢", "font-legalmark");
    document.body.textNodes.each(n).each(i).each(r).each(o)
}), window.addEventListener("load", function(t) {
    document.body.classList.add("is-preloading");
    var e = document.querySelectorAll(".Tab:not(.is-selected), .Carousel-item:not(.is-selected)");
    e.each(function(t) {
        t.classList.add("preload")
    }), requestAnimationFrame(function() {
        e.each(function(t) {
            t.classList.remove("preload")
        }), document.body.classList.remove("is-preloading")
    })
});