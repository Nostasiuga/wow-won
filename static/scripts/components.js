function AjaxContent(t) {
    this.elem = t, this.elem.ajaxContent = this, this.url = t.data("url"), this.init()
}
Object.assign(AjaxContent, {
    init: function() {
        document.querySelectorAlways(".AjaxContent", AjaxContent.create)
    },
    create: function(t) {
        return new AjaxContent(t)
    },
    createElement: function(t) {
        var t = t || {},
            e = document.createElement("div");
        return e.classList.add("AjaxContent"), t.url && e.data("url", t.url), t.child && e.appendChild(t.child), e
    }
}), AjaxContent.prototype = {
    init: function() {
        this.ajax(this.url, this.load.bind(this))
    },
    ajax: function(t, e) {
        function n() {
            this.stopLoading(), i.status < 400 ? e(i.responseText, i) : this.error(i)
        }
        if (!t) return null;
        this.startLoading();
        var i = new XMLHttpRequest;
        return i.onerror = this.error.bind(this), i.onload = n.bind(this), i.open("GET", encodeURI(t), !0), i.send(), i
    },
    update: function(t) {
        t && this.elem.attr("url", t), this.url = this.elem.attr("url"), this.ajax(this.url, this.load.bind(this))
    },
    error: function(t) {
        this.elem.attr("disabled", !0), this.elem.trigger("error", t.status)
    },
    load: function(t) {
        this.elem.innerHTML = t, document.querySelectorAlways.update(), this.elem.trigger("load")
    },
    startLoading: function() {
        this.elem.classList.add("is-loading"), this.elem.trigger("loading")
    },
    stopLoading: function() {
        this.elem.classList.remove("is-loading")
    }
}, AjaxContent.init();
//# sourceMappingURL=AjaxContent.js.map
function Art(t) {
    this.elem = t, this.elem.art = this, this.image = t.querySelector(".Art-image"), this.video = t.querySelector(".Art-video"), this.init()
}
Object.assign(Art, {
    init: function() {
        document.querySelectorAlways(".Art", Art.create)
    },
    create: function(t) {
        return new Art(t)
    }
}), Art.prototype = {
    init: function() {
        this.video && (this.listen(), this.update())
    },
    url: function() {
        return this.image.style.backgroundImage.replace(/^url\(['"]?/, "").replace(/['"]?\)/, "")
    },
    set: function(t) {
        this.image.style.backgroundImage = 'url("' + t + '")'
    },
    listen: function() {
        window.addEventListener("resize", this.update.bind(this))
    },
    disabled: function() {
        return this.elem.classList.contains("Art--disabled")
    },
    update: function() {
        this.disabled() ? this.video.classList.add("VideoPane--disabled") : this.video.classList.remove("VideoPane--disabled")
    }
}, Art.init();
//# sourceMappingURL=Art.js.map
function Blog(t) {
    this.elem = t, this.elem.blog = this, this.links = t.querySelectorAll("a.lightbox"), this.init()
}
Object.assign(Blog, {
    init: function() {
        document.querySelectorAlways(".Blog", Blog.create)
    },
    create: function(t) {
        return new Blog(t)
    }
}), Blog.prototype = {
    init: function() {
        this.links.each(this.listen.bind(this))
    },
    listen: function(t) {
        t.addEventListener("click", this.click.bind(this, t))
    },
    click: function(t, i) {
        function e() {
            n.naturalWidth && (o.stop(), this.lightbox({
                src: n.src,
                msrc: n.src,
                w: n.naturalWidth,
                h: n.naturalHeight
            }))
        }
        i.preventDefault();
        var n = new Image;
        n.src = t.href;
        var o = new Animation(e.bind(this));
        o.start()
    },
    lightbox: function(t) {
        var i = {
                bgOpacity: 1,
                history: !1,
                showHideOpacity: !1,
                index: 0,
                arrowEl: !1,
                shareEl: !1
            },
            e = Photoswipe.layers.lightbox.photoswipe.elem;
        new PhotoSwipe(e, PhotoSwipeUI_Default, [t], i).init()
    }
}, Blog.init();
//# sourceMappingURL=Blog.js.map
function BrowserWarning(r) {
    this.elem = r, this.elem.browserWarning = this, this.init()
}
Object.assign(BrowserWarning, {
    init: function() {
        document.querySelectorAlways(".BrowserWarning", BrowserWarning.create)
    },
    create: function(r) {
        return new BrowserWarning(r)
    },
    oldIEregex: /MSIE [5-8]\.\d+;/
}), BrowserWarning.prototype = {
    init: function() {
        var r = BrowserWarning.oldIEregex.test(navigator.userAgent);
        r && this.elem.classList.add("is-active")
    }
}, BrowserWarning.init();
//# sourceMappingURL=BrowserWarning.js.map
function Carousel(e) {
    this.elem = e, this.id = e.data("identifier"), this.carouselItems = Array.prototype.slice.call(e.querySelectorAll(".Carousel-item")), this.next = this.elem.querySelector(".Carousel-next"), this.previous = this.elem.querySelector(".Carousel-prev"), this.isSnap = this.elem.classList.contains("Carousel--snap"), this.isSticky = this.elem.classList.contains("Carousel--sticky"), this.hasTimedInterval = this.elem.classList.contains("Carousel--timedInterval"), this.hasLayout = this.elem.classList.contains("Carousel--hasLayout"), this.isAnimating = !1, this.isChanging = !1, this.isSwiping = !1, this.isTouchMoved = !1, this.isScrollChecked = !1, this.swipeThreshold = 10, this.swipeMomentumMultiplier = 300, this.swipeMoveTimestamp = 0, this.swipeMoveThreshold = 1e3 / 60, this.timedIntervalLength = 5e3, this.isAnimatedShortDistance = this.elem.classList.contains("Carousel--animatedShortDistance"), this.fixedShortDistance = 100, this.init()
}

function CarouselTimelineReboot(e) {
    this.elem = e, this.elem.CarouselTimelineReboot = this, this.next = e.querySelector(".Carousel-next"), this.previous = e.querySelector(".Carousel-prev"), this.hasTimelineArrows = e.classList.contains("Carousel-timelineArrows"), this.init()
}
Object.assign(Carousel, {
    init: function() {
        document.querySelectorAlways(".Carousel", Carousel.create), document.querySelectorAlways(".CarouselLink", Carousel.listen)
    },
    create: function(e) {
        return new Carousel(e)
    },
    listen: function(e) {
        e.addEventListener("click", Carousel.click.bind(this, e))
    },
    allCarouselsById: {},
    click: function(e) {
        var t = e.data("carousel"),
            i = Carousel.allCarouselsById[t];
        if (i && !i.isChanging) {
            var s = ".Carousel-item" + e.attributeSelector("data-carousel", "data-carousel-index"),
                n = document.querySelector(s);
            if (n) {
                var a = i.elem.querySelector(".Carousel-item.is-selected");
                Carousel.select(i, a, n)
            }
        }
    },
    calculateMomentumDistance: function(e, t, i, s, n) {
        var a = t - e;
        if (0 != s) {
            var r = Date.now() - i;
            a += Math.round(n * (a / r))
        }
        return a
    },
    "switch": function(e, t, i, s) {
        if (t) {
            t.classList.remove("is-selected");
            var n = ".CarouselLink" + t.attributeSelector("data-carousel", "data-carousel-index");
            document.querySelectorAll(n).map(function(e) {
                e.classList.remove("is-selected")
            })
        }
        i.classList.add("is-selected"), n = ".CarouselLink" + i.attributeSelector("data-carousel", "data-carousel-index"), document.querySelectorAll(n).map(function(e) {
            e.classList.add("is-selected")
        }), !s && e.isSnap && e.snapToTop(e.elem), e.elem.trigger("carouselchange")
    },
    select: function(e, t, i, s, n) {
        if (t != i)
            if (Carousel["switch"](e, t, i, s), null != t && !s && e.isAnimated && supports.transitionEnd) {
                var a = Carousel.getTransitionDistance(e),
                    r = e.carouselItems.indexOf(t),
                    o = e.carouselItems.indexOf(i),
                    l = "left" == n,
                    u = "right" == n;
                if (o > r && !l || u) return Carousel.setupAnimation(e, null, t, i), Carousel.startSnapAnimation(e), void Carousel.snapRight(e, a);
                (o < r || l) && (Carousel.setupAnimation(e, i, t, null), Carousel.startSnapAnimation(e), Carousel.snapLeft(e, a))
            } else trigger("resize"), e.isChanging = !1
    },
    setupAnimation: function(e, t, i, s) {
        e.isAnimating = !0;
        var n = Carousel.getTransitionDistance(e);
        t && (e.swipeLeftElem = t, t.classList.add("Carousel-prevFrame"), t.style.transform = "translate(" + -n + "px, 0)", window.getComputedStyle(t).transform), e.swipeCenterElem = i, i.classList.add("Carousel-currentFrame"), i.style.transform = "translate(0, 0)", window.getComputedStyle(i).transform, s && (e.swipeRightElem = s, s.classList.add("Carousel-nextFrame"), s.style.transform = "translate(" + n + "px, 0)", window.getComputedStyle(s).transform), e.hasLayout || trigger("resize")
    },
    endAnimation: function(e) {
        e.swipeLeftElem && (e.swipeLeftElem.classList.remove("Carousel-prevFrame"), e.swipeLeftElem.style.transform = "", e.swipeLeftElem.classList.remove("is-active"), e.swipeLeftElem = null), e.swipeRightElem && (e.swipeRightElem.classList.remove("Carousel-nextFrame"), e.swipeRightElem.style.transform = "", e.swipeRightElem.classList.remove("is-active"), e.swipeRightElem = null), e.swipeCenterElem && (e.swipeCenterElem.classList.remove("Carousel-currentFrame"), e.swipeCenterElem.style.transform = "", e.swipeCenterElem = null), e.hasLayout || trigger("resize"), e.isAnimating = !1
    },
    startSnapAnimation: function(e) {
        e.isChanging = !0, e.swipeLeftElem && e.swipeLeftElem.classList.add("Carousel-transitioning"), e.swipeRightElem && e.swipeRightElem.classList.add("Carousel-transitioning"), e.swipeCenterElem && (e.swipeCenterElem.classList.add("Carousel-transitioning"), e.swipeCenterElem.addEventListener(supports.transitionEnd, e.transitionEventHandler))
    },
    translateViewportLeft: function(e, t) {
        e.style.transform = "translate(" + -t + "px, 0)"
    },
    translateViewportCenter: function(e) {
        e.style.transform = "translate(0, 0)"
    },
    translateViewportRight: function(e, t) {
        e.style.transform = "translate(" + t + "px, 0)"
    },
    snapBack: function(e, t) {
        e.swipeLeftElem && Carousel.translateViewportLeft(e.swipeLeftElem, t), Carousel.translateViewportCenter(e.swipeCenterElem), e.swipeRightElem && Carousel.translateViewportRight(e.swipeRightElem, t)
    },
    snapLeft: function(e, t) {
        e.swipeLeftElem && (Carousel.translateViewportCenter(e.swipeLeftElem), e.swipeLeftElem.classList.add("is-active")), e.swipeCenterElem && Carousel.translateViewportRight(e.swipeCenterElem, t), e.swipeRightElem && Carousel.translateViewportRight(e.swipeRightElem, t)
    },
    snapRight: function(e, t) {
        e.swipeLeftElem && Carousel.translateViewportLeft(e.swipeLeftElem, t), e.swipeCenterElem && Carousel.translateViewportLeft(e.swipeCenterElem, t), e.swipeRightElem && (Carousel.translateViewportCenter(e.swipeRightElem), e.swipeRightElem.classList.add("is-active"))
    },
    stopSnapAnimation: function(e) {
        e.swipeLeftElem && (e.swipeLeftElem.classList.remove("Carousel-transitioning"), e.swipeLeftElem.classList.remove("is-active")), e.swipeRightElem && (e.swipeRightElem.classList.remove("Carousel-transitioning"), e.swipeRightElem.classList.remove("is-active")), e.swipeCenterElem && e.swipeCenterElem.classList.remove("Carousel-transitioning"), e.isChanging = !1
    },
    getTransitionDistance: function(e) {
        return e.isAnimatedShortDistance && !e.isSwiping ? e.fixedShortDistance : window.innerWidth || document.documentElement.clientWidth
    }
}), Carousel.prototype = {
    init: function() {
        this.findDefault(), this.selectDefault(), this.toggle(), this.listenTouch(), this.listenSticky(), this.setupTimedInterval(), Carousel.allCarouselsById[this.id] = this
    },
    get isAnimated() {
        return this.elem.classList.contains("Carousel--animated")
    },
    findDefault: function() {
        this.defaultCarouselItem = this.carouselItems[0]
    },
    selectDefault: function() {
        this.defaultCarouselItem && Carousel.select(this, null, this.defaultCarouselItem, !0)
    },
    hasSelection: function(e) {
        return e.classList.contains("is-selected")
    },
    toggle: function() {
        this.next.addEventListener("click", this.showNext.bind(this)), this.previous.addEventListener("click", this.showPrevious.bind(this))
    },
    showNext: function() {
        if (!this.isChanging) {
            this.isChanging = !0;
            var e, t = this.elem,
                i = t.querySelector(".Carousel-item.is-selected"),
                s = this.carouselItems.indexOf(i);
            e = s >= this.carouselItems.length - 1 ? this.carouselItems[0] : this.carouselItems[s + 1], Carousel.select(this, i, e, null, "right")
        }
    },
    showPrevious: function() {
        if (!this.isChanging) {
            this.isChanging = !0;
            var e, t = this.elem,
                i = t.querySelector(".Carousel-item.is-selected"),
                s = this.carouselItems.indexOf(i);
            e = s <= 0 ? this.carouselItems[this.carouselItems.length - 1] : this.carouselItems[s - 1], Carousel.select(this, i, e, null, "left")
        }
    },
    getCurrentItem: function() {
        return this.elem.querySelector(".Carousel-item.is-selected")
    },
    getCurrentItemIndex: function() {
        return this.carouselItems.indexOf(this.elem.querySelector(".Carousel-item.is-selected"))
    },
    listenTouch: function() {
        this.elem;
        this.isAnimated && (this.startSwipeAnimationBound = this.startSwipeAnimation.bind(this), this.updateSwipeAnimationBound = this.updateSwipeAnimation.bind(this), this.endSwipeAnimationBound = this.endSwipeAnimation.bind(this), this.transitionEventHandler = function() {
            Carousel.stopSnapAnimation(this), requestAnimationFrame(this.endSwipeAnimationBound)
        }.bind(this))
    },
    touchStart: function(e) {
        if (1 != e.touches.length || this.isChanging) this.isSwiping = !1;
        else {
            this.isSwiping = !0, this.elem.classList.add("is-swiping");
            var t = e.touches[0];
            this.startX = t.pageX, this.startY = t.pageY, this.currentX = t.pageX, this.currentY = t.pageY, this.swipeDistance = 0, this.startTimestamp = Date.now(), this.isTouchMoved = !1, this.isScrollChecked = !1
        }
    },
    touchEnd: function(e) {
        if (this.isSwiping) {
            if (this.isTouchMoved) {
                e.stopPropagation(), e.preventDefault();
                var t = Carousel.getTransitionDistance(this),
                    i = Carousel.calculateMomentumDistance(this.startX, this.currentX, this.startTimestamp, this.swipeDistance, this.swipeMomentumMultiplier);
                i > t / 2 ? (Carousel["switch"](this, this.swipeCenterElem, this.swipeLeftElem), this.isAnimated && (supports.transitionEnd ? (Carousel.startSnapAnimation(this), Carousel.snapLeft(this, t)) : requestAnimationFrame(this.endSwipeAnimationBound))) : i < -(t / 2) ? (Carousel["switch"](this, this.swipeCenterElem, this.swipeRightElem), this.isAnimated && (supports.transitionEnd ? (Carousel.startSnapAnimation(this), Carousel.snapRight(this, t)) : requestAnimationFrame(this.endSwipeAnimationBound))) : this.isAnimated && (supports.transitionEnd ? (Carousel.startSnapAnimation(this), Carousel.snapBack(this, t)) : requestAnimationFrame(this.endSwipeAnimationBound))
            }
            this.isSwiping = !1, this.elem.classList.remove("is-swiping")
        }
    },
    touchMove: function(e) {
        if (this.isSwiping)
            if (1 != e.touches.length) this.isSwiping = !1, this.isAnimated && requestAnimationFrame(this.endSwipeAnimationBound);
            else {
                e.stopPropagation(), e.preventDefault();
                var t = Date.now() - this.swipeMoveTimestamp;
                if (t >= this.swipeMoveThreshold) {
                    this.swipeMoveTimestamp = Date.now();
                    var i = e.touches[0],
                        s = i.pageX - this.currentX,
                        n = i.pageY - this.currentY;
                    if (this.swipeDistance += Math.sqrt(s * s + n * n), this.currentX = i.pageX, this.currentY = i.pageY, !this.isScrollChecked && this.swipeDistance > this.swipeThreshold) {
                        this.isTouchMoved = !0, this.isScrollChecked = !0;
                        var a = Math.abs(this.currentY - this.startY) > Math.abs(this.currentX - this.startX);
                        if (a) return this.isSwiping = !1, void(this.isAnimated && requestAnimationFrame(this.endSwipeAnimationBound));
                        this.isAnimated && requestAnimationFrame(this.startSwipeAnimationBound)
                    }
                    this.isAnimated && requestAnimationFrame(this.updateSwipeAnimationBound)
                }
            }
    },
    startSwipeAnimation: function() {
        var e, t = this.elem.querySelector(".Carousel-item.is-selected"),
            i = this.carouselItems.indexOf(t);
        e = i < 1 ? this.carouselItems[this.carouselItems.length - 1] : this.carouselItems[i - 1];
        var s;
        s = i > this.carouselItems.length - 2 ? this.carouselItems[0] : this.carouselItems[i + 1], Carousel.setupAnimation(this, e, t, s)
    },
    endSwipeAnimation: function() {
        Carousel.endAnimation(this)
    },
    updateSwipeAnimation: function() {
        var e = Carousel.getTransitionDistance(this),
            t = this.currentX - this.startX;
        this.swipeLeftElem.style.transform = "translate(" + (-e + t).toFixed(0) + "px, 0)", this.swipeCenterElem.style.transform = "translate(" + t.toFixed(0) + "px, 0)", this.swipeRightElem.style.transform = "translate(" + (e + t).toFixed(0) + "px, 0)", t > 0 ? (this.swipeLeftElem.classList.add("is-active"), this.swipeRightElem.classList.remove("is-active")) : (this.swipeLeftElem.classList.remove("is-active"), this.swipeRightElem.classList.add("is-active"))
    },
    listenSticky: function() {
        this.isSticky && (this.stickyUpdateBound = this.stickyUpdate.bind(this), window.addEventListener("scroll", this.stickyListener.bind(this)))
    },
    stickyListener: function() {
        requestAnimationFrame(this.stickyUpdateBound)
    },
    stickyUpdate: function() {
        var e = window.innerHeight || document.documentElement.clientHeight,
            t = this.elem.getBoundingClientRect(),
            i = this.elem.offsetHeight,
            s = t.top,
            n = Math.max(0, Math.min(-s, i - e).toFixed(2));
        this.previous.style.transform = "translateY(" + n + "px)", this.next.style.transform = "translateY(" + n + "px)"
    },
    snapToTop: function(e) {
        var t = e.getBoundingClientRect();
        0 != t.top && window.scrollBy(0, t.top)
    },
    setupTimedInterval: function() {
        this.hasTimedInterval && setInterval(this.showNext.bind(this), this.timedIntervalLength)
    }
}, Carousel.init(), Object.assign(CarouselTimelineReboot, {
    init: function() {
        document.querySelectorAlways(".CarouselTimelineReboot", CarouselTimelineReboot.create)
    },
    create: function(e) {
        return new CarouselTimelineReboot(e)
    }
}), CarouselTimelineReboot.prototype = {
    init: function() {
        var e = this.elem.classList.contains("Carousel-timelineArrows");
        e && this.handleTimelineArrows()
    },
    handleTimelineArrows: function() {
        var e, t, i = document.querySelector(".Carousel-desktopView");
        i.data("prev-url") || (document.querySelector(".Carousel-prev").classList.add("hide"), t = !0), i.data("next-url") || (document.querySelector(".Carousel-next").classList.add("hide"), e = !0), e || this.handleTimelineNextNavigation(), t || this.handleTimelinePrevNavigation()
    },
    handleTimelineNextNavigation: function() {
        var e = document.querySelector(".Carousel-desktopView"),
            t = e.data("next-url");
        document.querySelector(".Carousel-next").attr("href", "/story/timeline" + t)
    },
    handleTimelinePrevNavigation: function() {
        var e = document.querySelector(".Carousel-desktopView"),
            t = e.data("prev-url");
        document.querySelector(".Carousel-prev").attr("href", "/story/timeline" + t)
    }
}, CarouselTimelineReboot.init();
//# sourceMappingURL=Carousel.js.map
function CarouselIndicator(e) {
    this.elem = e, e.carouselIndicator = this, this.carouselIdentifier = e.data("indicator"), this.nodeContainer = e.querySelector(".CarouselIndicator-nodes"), this.nodes = e.querySelectorAll(".CarouselIndicator-node"), this.activeNodeIndex = null, this.init()
}
Object.assign(CarouselIndicator, {
    init: function() {
        document.querySelectorAlways(".CarouselIndicator", CarouselIndicator.create)
    },
    create: function(e) {
        return new CarouselIndicator(e)
    }
}), CarouselIndicator.prototype = {
    init: function() {
        this.nodeContainer && !this.nodes.length && (this.getCarouselItems(), this.populateNodes())
    },
    getCarouselItems: function() {
        this.carouselItems = document.querySelectorAll(".Carousel-item[data-carousel='" + this.carouselIdentifier + "']")
    },
    populateNodes: function() {
        if (this.carouselItems) {
            for (var e = 0; e < this.carouselItems.length; e++) this.buildNodeElement(e);
            this.nodes = this.elem.querySelectorAll(".CarouselIndicator-node"), document.querySelectorAlways.update(), this.selectActiveNode()
        }
    },
    buildNodeElement: function(e) {
        var t = document.createElement("div");
        t.classList.add("CarouselIndicator-node"), t.data("indicator-index", e);
        var i = document.createElement("div");
        i.classList.add("CarouselLink"), i.data("carousel", this.carouselIdentifier), i.data("carousel-index", e);
        var s = document.createElement("div");
        s.classList.add("CarouselIndicator-link");
        var o = document.createElement("div");
        o.classList.add("CarouselIndicator-dot"), s.appendChild(o), i.appendChild(s), t.appendChild(i), this.nodeContainer.appendChild(t)
    },
    selectActiveNode: function() {
        if (this.carouselItems) {
            for (var e = 0, t = 0; t < this.carouselItems.length; t++) this.carouselItems[t].classList.contains("is-selected") && (e = this.carouselItems[t].data("carousel-index"));
            for (var i = 0; i < this.nodes.length; i++) {
                var s = this.nodes[i].querySelector(".CarouselLink"),
                    o = s.data("carousel-index");
                o == e && s.classList.add("is-selected")
            }
        }
    },
    updateActiveNode: function() {
        if (this.nodeContainer.querySelectorAll(".CarouselIndicator-node.is-selected").map(function(e) {
                e.classList.remove("is-selected")
            }), null != this.activeNodeIndex) {
            var e = '.CarouselIndicator-node[data-indicator-index="' + this.activeNodeIndex + '"]',
                t = this.nodeContainer.querySelector(e);
            t.classList.add("is-selected")
        }
    }
}, CarouselIndicator.init();
//# sourceMappingURL=CarouselIndicator.js.map
function CarouselTimeline(e) {
    this.elem = e, this.carouselIdentifier = e.data("timeline"), this.leftEndCap = e.querySelector(".CarouselTimeline-endCapLeft"), this.rightEndCap = e.querySelector(".CarouselTimeline-endCapRight"), this.scrollable = e.querySelector(".Scrollable"), this.nodeContainer = e.querySelector(".CarouselTimeline-nodes"), this.nodes = e.querySelectorAll(".CarouselTimeline-node"), this.isInline = e.classList.contains("CarouselTimeline--inline"), this.maxWidth = .8, this.maxNodeWidth = 25, this.dotWidth = 15, this.endCapAdditionalWidth = 20, this.isConstrained = !1, this.isCompact = !1, this.isTouching = !1, this.activeNodeIndex = null, this.startX = 0, this.nodeWidth = this.maxNodeWidth, this.init()
}
Object.assign(CarouselTimeline, {
    init: function() {
        document.querySelectorAlways(".CarouselTimeline", CarouselTimeline.create)
    },
    create: function(e) {
        return new CarouselTimeline(e)
    },
    calcFullWidth: function(e) {
        if (e.nodes && e.nodes.length > 0) {
            var i = e.nodes.length * e.maxNodeWidth;
            return i += Math.min(e.nodes.length, 2) * e.endCapAdditionalWidth
        }
        return 0
    },
    calcIndex: function(e, i, t, n) {
        var s = t + n / i;
        return s = n < 0 ? Math.ceil(s) : Math.floor(s), Math.max(0, Math.min(s, e.length - 1))
    }
}), CarouselTimeline.prototype = {
    init: function() {
        this.listen()
    },
    listen: function() {
        if (window.addEventListener("resize", this.resize.bind(this)), this.nodes.map(function(e) {
                e.addEventListener("touchstart", this.touchStart.bind(this, ~~e.data("timeline-index"))), e.addEventListener("touchmove", this.touchMove.bind(this, ~~e.data("timeline-index")))
            }.bind(this)), this.nodeContainer.addEventListener("touchend", this.touchEnd.bind(this)), this.nodeContainer.addEventListener("touchcancel", this.touchCancel.bind(this)), this.updateActiveNodeBound = this.updateActiveNode.bind(this), this.updateBound = this.update.bind(this), this.updateBound(), this.carouselIdentifier) {
            var e = Carousel.allCarouselsById[this.carouselIdentifier];
            e && e.elem && e.elem.addEventListener("carouselchange", this.change.bind(this))
        }
    },
    resize: function() {
        requestAnimationFrame(this.updateBound)
    },
    update: function() {
        var e = window.innerWidth || document.documentElement.clientWidth,
            i = Math.floor(e * this.maxWidth),
            t = CarouselTimeline.calcFullWidth(this);
        if (t > i) {
            this.isConstrained = !0;
            var n = i - this.endCapAdditionalWidth - 2 * this.maxNodeWidth,
                s = Math.floor(n / (this.nodes.length - 2)),
                o = this.nodes[0],
                a = this.nodes[this.nodes.length - 1];
            this.nodes.map(function(e) {
                e != o && e != a && (e.style.width = s + "px")
            }), s < this.dotWidth ? this.isCompact || (this.isCompact = !0, this.nodeContainer.classList.add("is-compact")) : this.isCompact && (this.isCompact = !1, this.nodeContainer.classList.remove("is-compact")), this.nodeWidth = parseInt(s), this.nodeContainer.classList.add("is-constrained")
        } else this.isConstrained && (this.isConstrained = !1, this.nodes.map(function(e) {
            e.style.width = ""
        }), this.nodeContainer.classList.remove("is-constrained"));
        this.isInline = this.elem.classList.contains("CarouselTimeline--inline")
    },
    touchStart: function(e, i) {
        i.stopPropagation(), i.preventDefault(), this.isTouching = !0, this.activeNodeIndex = e, requestAnimationFrame(this.updateActiveNodeBound), this.isTouching = !0;
        var t = i.touches[0];
        this.startX = t.pageX
    },
    touchEnd: function(e) {
        this.isTouching && (this.isTouching = !1, e.stopPropagation(), e.preventDefault(), null != this.activeNodeIndex && (this.nodes[this.activeNodeIndex].querySelector(".CarouselLink").click(), this.activeNodeIndex = null, requestAnimationFrame(this.updateActiveNodeBound)))
    },
    touchCancel: function(e, i) {
        this.isTouching && (this.isTouching = !1, i.stopPropagation(), i.preventDefault(), this.activeNodeIndex = null, requestAnimationFrame(this.updateActiveNodeBound))
    },
    touchMove: function(e, i) {
        if (this.isTouching) {
            i.stopPropagation(), i.preventDefault();
            var t = i.touches[0],
                n = CarouselTimeline.calcIndex(this.nodes, this.nodeWidth, e, t.pageX - this.startX);
            this.activeNodeIndex != n && (this.activeNodeIndex = n, requestAnimationFrame(this.updateActiveNodeBound))
        }
    },
    updateActiveNode: function() {
        if (this.nodeContainer.querySelectorAll(".CarouselTimeline-node.is-selected").map(function(e) {
                e.classList.remove("is-selected")
            }), null != this.activeNodeIndex) {
            var e = '.CarouselTimeline-node[data-timeline-index="' + this.activeNodeIndex + '"]',
                i = this.nodeContainer.querySelector(e);
            i.classList.add("is-selected")
        }
    },
    change: function(e) {
        if (this.isInline && this.carouselIdentifier) {
            var i = Carousel.allCarouselsById[this.carouselIdentifier],
                t = i.getCurrentItem(),
                n = t.data("carousel-index"),
                s = this.nodes[n];
            if (s) {
                var o = s.getBoundingClientRect(),
                    a = window.innerWidth || document.documentElement.clientWidth,
                    d = Math.round(o.left + s.offsetWidth / 2 - a / 2);
                this.scrollable.scrollLeft = this.scrollable.scrollLeft + d
            }
        }
    }
}, CarouselTimeline.init();
//# sourceMappingURL=CarouselTimeline.js.map
function CharacterProfile(e) {
    this.elem = e, this.elem.characterProfile = this, this.image = this.elem.querySelector(".CharacterProfile-image"), this.fallback = this.image.data("fallback"), this.init()
}
Object.assign(CharacterProfile, {
    init: function() {
        document.querySelectorAlways(".CharacterProfile", CharacterProfile.create)
    },
    create: function(e) {
        return new CharacterProfile(e)
    }
}), CharacterProfile.prototype = {
    init: function() {
        if (this.image && this.fallback) {
            var e = new Image;
            e.addEventListener("error", this.onerror.bind(this)), e.src = this.image.art.url()
        }
    },
    onerror: function() {
        this.image.art.set(this.fallback)
    }
}, CharacterProfile.init();
//# sourceMappingURL=CharacterProfile.js.map
function Clone(e) {
    this.elem = e, this.elem.Clone = this, this.init()
}
Object.assign(Clone, {
    cloneClass: "is-cloned",
    attr: "data-clone",
    init: function() {
        document.querySelectorAlways(".Clone", Clone.create)
    },
    create: function(e) {
        return new Clone(e)
    },
    find: function(e) {
        return document.querySelector(".CloneSource" + e.attributeSelector(Clone.attr))
    },
    load: function(e) {
        var n = document.querySelectorAll(".Clone" + e.attributeSelector(Clone.attr));
        n.each(function(n) {
            n.Clone.load(e)
        })
    }
}), Clone.prototype = {
    init: function() {
        this.load(Clone.find(this.elem))
    },
    get isCloned() {
        return this.elem.classList.contains(Clone.cloneClass)
    },
    load: function(e) {
        e && !this.isCloned && (this.elem.classList.add(Clone.cloneClass), e.classList.add(Clone.cloneClass), e.childNodes.each(function(e) {
            this.elem.appendChild(e.cloneNode(!0))
        }.bind(this)))
    }
}, Clone.init();
//# sourceMappingURL=Clone.js.map
function CloneSource(e) {
    this.elem = e, this.elem.CloneSource = this, this.init()
}
Object.assign(CloneSource, {
    init: function() {
        document.querySelectorAlways(".CloneSource", CloneSource.create)
    },
    create: function(e) {
        return new CloneSource(e)
    }
}), CloneSource.prototype = {
    init: function() {
        Clone.load(this.elem)
    }
}, CloneSource.init();
//# sourceMappingURL=CloneSource.js.map
function Dropdown(o) {
    this.elem = o, this.elem.dropdown = this, this.init()
}
Object.assign(Dropdown, {
    elems: [],
    active: !1,
    activeClass: "is-active",
    attr: "data-dropdown",
    groupAttr: "data-dropdown-group",
    init: function() {
        document.querySelectorAlways(".Dropdown", Dropdown.create), document.addEventListener("click", Dropdown.onclick)
    },
    create: function(o) {
        return new Dropdown(o)
    },
    addActive: function(o) {
        o.classList.add(Dropdown.activeClass), o.querySelectorAll(".SyncHeight").map(Dropdown.updateSync)
    },
    removeActive: function(o) {
        o.classList.remove(Dropdown.activeClass)
    },
    updateSync: function(o) {
        o.syncHeight.update()
    },
    addOverlap: function(o) {
        var e = document.querySelector(".DropdownLink" + o.attributeSelector("data-dropdown-anchor")),
            n = document.querySelector(".Dropdown" + o.attributeSelector("data-dropdown-anchor"));
        if (e && n) {
            var t = e.offsetLeft,
                r = e.offsetWidth;
            n.style.left = t + "px", n.style.width = r + "px"
        }
    },
    select: function(o) {
        var e = o.classList.contains(Dropdown.activeClass),
            n = o.attr(Dropdown.groupAttr);
        n ? (Dropdown.findAllInGroup(o).map(Dropdown.removeActive), DropdownLink.findAllInGroup(o).map(Dropdown.removeActive)) : (Dropdown.elems.map(Dropdown.removeActive), DropdownLink.elems.map(Dropdown.removeActive)), e ? Dropdown.active = !1 : (Dropdown.findAll(o).map(Dropdown.addActive), DropdownLink.findAll(o).map(Dropdown.addActive), DropdownLink.findAll(o).map(Dropdown.addOverlap), Dropdown.active = !0)
    },
    findAll: function(o) {
        var e = ".Dropdown" + o.attributeSelector(Dropdown.attr);
        return NodeList.prototype.matches.call(Dropdown.elems, e)
    },
    findAllInGroup: function(o) {
        var e = ".Dropdown" + o.attributeSelector(Dropdown.groupAttr);
        return NodeList.prototype.matches.call(Dropdown.elems, e)
    },
    onclick: function(o) {
        if (Dropdown.active) {
            for (var e = o.target; e !== document;) {
                var n = e.classList.contains("Dropdown"),
                    t = e.classList.contains("Dropdown--closedOnClick"),
                    r = e.classList.contains("DropdownLink");
                if (n && !t || r) return;
                e = e.parentNode
            }
            Dropdown.closeAll(), Dropdown.active = !1
        }
    },
    closeAll: function() {
        Dropdown.elems.map(Dropdown.removeActive), DropdownLink.elems.map(Dropdown.removeActive)
    }
}), Dropdown.prototype = {
    init: function() {
        Dropdown.elems.push(this.elem)
    },
    get dropdowns() {
        return Dropdown.findAll(this.elem)
    },
    get links() {
        return DropdownLink.findAll(this.elem)
    },
    select: function() {
        Dropdown.select(this.elem)
    }
}, Dropdown.init();
//# sourceMappingURL=Dropdown.js.map
function DropdownLink(t) {
    this.elem = t, this.elem.dropdownLink = this, this.hasDropdownExternal = this.elem.classList.contains("DropdownLink--external"), this.init()
}
Object.assign(DropdownLink, {
    elems: [],
    init: function() {
        document.querySelectorAlways(".DropdownLink", DropdownLink.create)
    },
    create: function(t) {
        return new DropdownLink(t)
    },
    findAll: function(t) {
        var n = ".DropdownLink" + t.attributeSelector(Dropdown.attr);
        return NodeList.prototype.matches.call(DropdownLink.elems, n)
    },
    findAllInGroup: function(t) {
        var n = ".DropdownLink" + t.attributeSelector(Dropdown.groupAttr);
        return NodeList.prototype.matches.call(DropdownLink.elems, n)
    },
    stop: function(t) {
        "INPUT" != t.target.nodeName && t.preventDefault()
    }
}), DropdownLink.prototype = {
    init: function() {
        if (DropdownLink.elems.push(this.elem), this.elem.addEventListener("click", this.select.bind(this, this.elem)), this.elem.addEventListener("mousedown", DropdownLink.stop), this.hasDropdownExternal = this.elem.classList.contains("DropdownLink--external"), this.hasDropdownExternal) {
            var t = window.location.pathname.split("/");
            if (t[t.length - 1] || t.pop(), this.slug = t.pop(), this.slug) {
                var n = "/story/timeline/" + this.slug,
                    e = document.querySelectorAll(".TabsLink.DropdownMenu-menuLink").filter(function(t) {
                        if (t.attr("href") == n || t.attr("href") + "timeline" == n) return t
                    }),
                    o = e[0].firstChild.innerHTML;
                document.querySelector(".DropdownMenu-toggle").firstChild.innerHTML = o
            }
        }
    },
    get dropdowns() {
        return Dropdown.findAll(this.elem)
    },
    get links() {
        return DropdownLink.findAll(this.elem)
    },
    select: function(t, n) {
        this.hasDropdownExternal && document.querySelector(".Dropdown--timelineAbsolute").classList.add("is-active"), "INPUT" === n.target.nodeName && t.classList.contains(Dropdown.activeClass) || Dropdown.select(t), n.stopPropagation()
    }
}, DropdownLink.init();
//# sourceMappingURL=DropdownLink.js.map
function Expand(n) {
    this.elem = n, this.elem.expand = this, this.expandLinks = [], this.isAnimated = !1, this.animation = null, this.contentContainer = null, this.init()
}
Object.assign(Expand, {
    elems: [],
    activeClass: "is-active",
    attr: "data-expand",
    animationClasses: ["Expand--fade", "Expand--grow"],
    contententContainerClass: "Expand-content",
    init: function() {
        document.querySelectorAlways(".Expand", Expand.create)
    },
    create: function(n) {
        return new Expand(n)
    },
    isActive: function(n) {
        return n.classList.contains(Expand.activeClass)
    },
    addActive: function(n) {
        n.classList.add(Expand.activeClass), n.expand.expandLinks.map(ExpandLink.addActive.bind(this))
    },
    removeActive: function(n) {
        n.classList.remove(Expand.activeClass), n.expand.expandLinks.map(ExpandLink.removeActive.bind(this))
    },
    select: function(n) {
        Expand.findAll(n).map(function(n) {
            n.expand.select()
        })
    },
    findAll: function(n) {
        var t = ".Expand" + n.attributeSelector(Expand.attr);
        return NodeList.prototype.matches.call(Expand.elems, t)
    },
    isAnimated: function(n) {
        for (var t in Expand.animationClasses)
            if (n.classList.contains(Expand.animationClasses[t])) return !0;
        return !1
    }
}), Expand.prototype = {
    init: function() {
        Expand.elems.push(this.elem), this.isAnimated = Expand.isAnimated(this.elem), this.isAnimated && (this.elem.classList.contains("Expand--fade") ? this.animation = new ExpandAnimationFade(this) : this.elem.classList.contains("Expand--grow") && (this.animation = new ExpandAnimationGrow(this))), this.contentContainer = this.elem.querySelector("." + Expand.contententContainerClass), this.expandLinks = document.querySelectorAll(".ExpandLink" + this.elem.attributeSelector(Expand.attr))
    },
    select: function() {
        this.toggle()
    },
    toggle: function() {
        this.isAnimated ? this.animation.animate() : Expand.isActive(this.elem) ? Expand.removeActive(this.elem) : Expand.addActive(this.elem)
    }
}, Expand.init();
//# sourceMappingURL=Expand.js.map
function ExpandAnimationFade(n) {
    this.expand = n, this.expand.elem.addEventListener("animationend", ExpandAnimationFade.endAnimation, !1)
}
Object.assign(ExpandAnimationFade, {
    inClass: "is-fading-in",
    outClass: "is-fading-out",
    AnimationKeyFrameIn: "Expand-Animation-Fade-In",
    AnimationKeyFrameOut: "Expand-Animation-Fade-Out",
    "in": function(n) {
        Expand.addActive(n), ExpandAnimationFade.removeOutClass(n), ExpandAnimationFade.addInClass(n)
    },
    out: function(n) {
        ExpandAnimationFade.removeInClass(n), ExpandAnimationFade.addOutClass(n)
    },
    addInClass: function(n) {
        n.classList.add(this.inClass)
    },
    addOutClass: function(n) {
        n.classList.add(this.outClass)
    },
    removeInClass: function(n) {
        n.classList.remove(this.inClass)
    },
    removeOutClass: function(n) {
        n.classList.remove(this.outClass)
    },
    endAnimation: function(n) {
        var a = n.animationName,
            i = n.target;
        a == ExpandAnimationFade.AnimationKeyFrameIn ? Expand.addActive(i) : a == ExpandAnimationFade.AnimationKeyFrameOut && Expand.removeActive(i)
    }
}), ExpandAnimationFade.prototype = {
    animate: function() {
        Expand.isActive(this.expand.elem) ? ExpandAnimationFade.out(this.expand.elem) : ExpandAnimationFade["in"](this.expand.elem)
    }
};
//# sourceMappingURL=ExpandAnimationFade.js.map
function ExpandAnimationGrow(n) {
    this.expand = n, this.expand.elem.addEventListener("transitionend", ExpandAnimationGrow.endTransition, !1), this.init()
}
Object.assign(ExpandAnimationGrow, {
    inClass: "is-growing-in",
    outClass: "is-growing-out",
    expands: [],
    init: function() {},
    addInClass: function(n) {
        n.classList.add(this.inClass)
    },
    addOutClass: function(n) {
        n.classList.add(this.outClass)
    },
    removeInClass: function(n) {
        n.classList.remove(this.inClass)
    },
    removeOutClass: function(n) {
        n.classList.remove(this.outClass)
    },
    setHeight: function(n, i) {
        if (void 0 === i) n.style.height = n.expand.contentContainer.clientHeight + "px";
        else if (null === i) n.style.removeProperty("height");
        else {
            var t = !isNaN(i);
            t ? n.style.height = i + "px" : n.style.height = i
        }
    },
    endTransition: function(n) {
        var i = n.target;
        Expand.isActive(i) && ExpandAnimationGrow.setHeight(i, "auto"), ExpandAnimationGrow.removeInClass(i), ExpandAnimationGrow.removeOutClass(i)
    }
}), ExpandAnimationGrow.prototype = {
    init: function() {
        ExpandAnimationGrow.expands.push(this.expand)
    },
    animate: function() {
        var n = this.expand.elem;
        Expand.isActive(this.expand.elem) ? (ExpandAnimationGrow.removeInClass(n), ExpandAnimationGrow.addOutClass(n), ExpandAnimationGrow.setHeight(n), requestAnimationFrame(function() {
            ExpandAnimationGrow.setHeight(n, 0), Expand.removeActive(n)
        })) : (Expand.addActive(n), ExpandAnimationGrow.removeOutClass(n), ExpandAnimationGrow.addInClass(n), ExpandAnimationGrow.setHeight(n))
    }
}, ExpandAnimationGrow.init();
//# sourceMappingURL=ExpandAnimationGrow.js.map
function ExpandLink(n) {
    this.elem = n, this.elem.expandLink = this, this.init()
}
Object.assign(ExpandLink, {
    activeClass: "is-active",
    defaultOpenClass: "ExpandLink--default",
    init: function() {
        document.querySelectorAlways(".ExpandLink", ExpandLink.create)
    },
    create: function(n) {
        return new ExpandLink(n)
    },
    findAll: function(n) {
        var t = ".ExpandLink" + n.attributeSelector(Expand.attr);
        return NodeList.prototype.matches.call(ExpandLink.elems, t)
    },
    stop: function(n) {
        "INPUT" != n.target.nodeName && (n.preventDefault(), n.stopPropagation())
    },
    addActive: function(n) {
        n.classList.add(ExpandLink.activeClass)
    },
    removeActive: function(n) {
        n.classList.remove(ExpandLink.activeClass)
    }
}), ExpandLink.prototype = {
    init: function() {
        this.elem.addEventListener("click", this.select.bind(this)), this.elem.addEventListener("click", ExpandLink.stop);
        var n = this.elem.classList.contains(ExpandLink.defaultOpenClass);
        n && this.select()
    },
    select: function() {
        Expand.select(this.elem)
    }
}, ExpandLink.init();
//# sourceMappingURL=ExpandLink.js.map
function GameTooltip(t) {
    this.elem = t, this.elem.GameTooltip = this, this.init()
}
Object.assign(GameTooltip, {
    init: function() {
        document.querySelectorAlways(".GameTooltip", GameTooltip.create)
    },
    create: function(t) {
        return new GameTooltip(t)
    }
}), GameTooltip.prototype = {
    init: function() {
        this.elem.querySelectorAll("a").forEach(function(t) {
            t.addEventListener("click", function(t) {
                t.preventDefault()
            })
        })
    }
}, GameTooltip.init();
//# sourceMappingURL=GameTooltip.js.map
function ImageNav(t) {
    this.elem = t, this.elem.imageNav = this, this.imageNavList = t.querySelector(".ImageNav-list"), this.imageNavListItems = t.querySelectorAll(".ImageNav-listItem"), this.isDefault = t.classList.contains("ImageNav--default"), this.isMatchSlug = t.classList.contains("ImageNav--matchSlug"), this.imageNavTimeline = 0 != document.querySelector(".Carousel-desktopView"), this.init()
}
Object.assign(ImageNav, {
    init: function() {
        document.querySelectorAlways(".ImageNav", ImageNav.create)
    },
    create: function(t) {
        return new ImageNav(t)
    }
}), ImageNav.prototype = {
    init: function() {
        this.findDefault(), this.selectDefault(), this.findSlug(), this.findSlugMatch(), this.scrollToSelected()
    },
    findDefault: function() {
        var t = this.elem.querySelector(".ImageNav-listItem--default"),
            e = this.imageNavListItems[0];
        this.defaultItem = t || e
    },
    selectDefault: function() {
        return !!this.isDefault && void(this.defaultItem && this.selectItem(this.defaultItem))
    },
    findSlug: function() {
        var t = window.location.pathname.split("/");
        t[t.length - 1] || t.pop(), this.slug = t.pop()
    },
    findSlugMatch: function() {
        if (!this.isMatchSlug) return !1;
        if (this.slug) {
            var t, e = this.imageNavTimeline,
                i = e ? "/" + this.slug : this.slug;
            this.imageNavListItems.forEach(function(e) {
                e.data("imagenav-item") != i && e.data("imagenav-item") + "timeline" != i || (t = e)
            }), t && this.selectItem(t)
        }
    },
    selectItem: function(t) {
        this.removeSelection(), t.classList.add("ImageNav-listItem--selected")
    },
    removeSelection: function() {
        this.imageNavListItems.forEach(function(t) {
            t.classList.remove("ImageNav-listItem--selected")
        })
    },
    scrollToSelected: function() {
        var t = this.imageNavList.querySelector(".ImageNav-listItem--selected"),
            e = this.imageNavList.querySelector(".ImageNav-listItem:not(.ImageNav-listItem--selected)");
        if (t && e) {
            var i = this.imageNavListItems.indexOf(t),
                a = e.offsetWidth || ~~window.getComputedStyle(e).width,
                s = window.getComputedStyle(this.imageNavList).marginLeft;
            this.imageNavList.style.marginLeft = parseInt(s) - a * i + "px"
        }
    }
}, ImageNav.init();
//# sourceMappingURL=ImageNav.js.map
function Link(i) {
    this.elem = i, this.elem.link = this, this.type = this.elem.type, this.image = this.elem.data("image"), this.video = this.elem.data("video"), this.comic = this.elem.data("comic"), this.modal = this.elem.data("modal"), this.tooltip = this.elem.data("tooltip"), this.init()
}
Object.assign(Link, {
    init: function() {
        document.querySelectorAlways(".Link:not([href])", Link.create)
    },
    create: function(i) {
        return new Link(i)
    }
}), Link.prototype = {
    init: function() {
        setImmediate(this.link.bind(this))
    },
    link: function() {
        this.image && Modal.link(this.elem, this.image, "IMAGE"), this.video && Modal.link(this.elem, this.video, "VIDEO"), this.comic && Modal.link(this.elem, this.comic, "COMIC"), this.modal && Modal.link(this.elem, this.modal, "MODAL"), this.tooltip && Tooltip.link(this.elem, this.tooltip)
    }
}, Link.init();
//# sourceMappingURL=Link.js.map
function Modal(t) {
    this.elem = t, this.elem.modal = this, this.type = this.elem.attr("type"), this.name = this.elem.attr("name"), this.group = this.elem.data("group"), this.thumb = this.elem.data("thumb"), this.back = this.elem.querySelector(".Modal-back"), this.close = this.elem.querySelector(".Modal-close"), this.init()
}
Object.assign(Modal, {
    groups: {},
    plugins: {},
    hasHistoryClass: "Modal--hasHistory",
    init: function() {
        document.querySelectorAlways(".Modal", Modal.create)
    },
    create: function(t) {
        return new Modal(t)
    },
    find: function(t, i) {
        var e = Modal.plugins[i];
        if (e) return e.modals[t]
    },
    link: function(t, i, e) {
        var o = Modal.find(i, e);
        o && o.link(t)
    },
    stop: function(t) {
        if ("INPUT" != t.target.nodeName && !t.ctrlKey) return t.preventDefault(), !0
    },
    group: function(t) {
        return Modal.groups[t] || (Modal.groups[t] = [])
    },
    plugin: function(t) {
        Modal.plugins[t.type] = t, t.modals = {}
    }
}), Modal.prototype = {
    init: function() {
        var t = Modal.plugins[this.type];
        t && (this.plugin = t, t.modals[this.name] = this, this.elem.remove(), this.group && Modal.group(this.group).push(this), t.init && t.init.call(this), this.back.addEventListener("click", Photoswipe.back), this.close.addEventListener("touchend", this.hide.bind(this)))
    },
    link: function(t) {
        t.addEventListener("click", this.show.bind(this, t)), t.addEventListener("touchend", this.show.bind(this, t)), t.addEventListener("mousedown", Modal.stop), this.firstLink || (this.firstLink = t), this.plugin.link && this.plugin.link.call(this, t)
    },
    findGroup: function() {
        return Modal.groups[this.group] || [this]
    },
    item: function() {
        var t = this.plugin.item.call(this, this.elem);
        if (t) return t.modal = this, t
    },
    index: function() {
        return this.findGroup().indexOf(this)
    },
    items: function() {
        return this.findGroup().map(function(t) {
            return t.item()
        })
    },
    show: function(t, i) {
        if (Modal.stop(i)) {
            var e = this.plugin.layer,
                o = this.items(),
                n = this.index();
            o[n].elem = t, Photoswipe.show(e, o, n)
        }
    },
    hide: function(t) {
        Modal.stop(t), Photoswipe.hide(this.plugin.layer)
    },
    showBackButton: function() {
        this.elem.classList.add(Modal.hasHistoryClass)
    },
    hideBackButton: function() {
        this.elem.classList.remove(Modal.hasHistoryClass)
    }
}, Modal.plugin({
    type: "IMAGE",
    layer: "lightbox",
    init: function() {
        this.image = this.elem.data("image"), this.width = ~~this.elem.attr("width"), this.height = ~~this.elem.attr("height")
    },
    link: function(t) {
        t.href = this.image
    },
    item: function() {
        return {
            src: this.image,
            msrc: this.thumb,
            w: this.width,
            h: this.height,
            elem: this.firstLink
        }
    }
}), Modal.plugin(Modal.video = {
    type: "VIDEO",
    layer: "modal",
    neteaseFallbackElem: null,
    sites: [],
    a: function(t) {
        var i = document.createElement("a");
        return i.href = t, i
    },
    site: function(t) {
        return Modal.video.sites[Modal.video.a(t).hostname]
    },
    init: function() {
        this.video = this.elem.data("video");
        var t = Modal.video.site(this.video);
        if (t) {
            var i = t.call(this);
            this.elem.appendChild(i)
        }
    },
    link: function(t) {
        t.href = this.video
    },
    item: function() {
        return {
            html: this.elem
        }
    }
}), Modal.video.youtube = function(t) {
    var i = document.createElement("iframe");
    return i.classList.add("Modal-video"), i.attr("src", "//www.youtube.com/embed/" + t + "?autoplay=1&showinfo=0"), i.attr("frameborder", "0"), i.attr("allowfullscreen", !0), i
}, Modal.video.netease = function(t) {
    return NeteaseVideoPlayer.createElement(t)
}, Modal.video.sites["youtu.be"] = function() {
    var t = /\/([-\w]+)/.exec(Modal.video.a(this.video).pathname);
    if (t) return Modal.video.youtube(t[1])
}, Modal.video.sites["www.youtube.com"] = Modal.video.sites["youtube.com"] = function() {
    var t = /(?:(?:\?|&)v=|\/embed\/)([-\w]+)/.exec(this.video);
    if (t) return Modal.video.youtube(t[1])
}, Modal.video.sites["www.v.163.com"] = Modal.video.sites["v.163.com"] = function() {
    var t = NeteaseVideoPlayer.parseUrl(this.video);
    return Modal.video.netease(t)
}, Modal.plugin({
    type: "COMIC",
    layer: "modal",
    init: function() {
        if (this.comic = this.elem.data("comic"), this.comic) {
            var t = document.createElement("iframe");
            t.classList.add("Modal-comic"), t.attr("src", this.comic + "/modal"), t.attr("frameborder", "0"), t.attr("allowfullscreen", !0), this.elem.appendChild(t)
        }
    },
    item: function() {
        return {
            html: this.elem
        }
    }
}), Modal.plugin({
    type: "MODAL",
    layer: "modal",
    init: function() {
        if (this.url = this.elem.data("url"), this.url) {
            var t = Spinner.createElement();
            t.classList.add("Spinner--donut"), t.classList.add("contain-center");
            var i = AjaxContent.createElement({
                url: this.url,
                child: t
            });
            this.elem.appendChild(i)
        }
    },
    item: function() {
        return {
            html: this.elem
        }
    }
}), Modal.init();
//# sourceMappingURL=Modal.js.map
function ModalLink(e) {
    this.elem = e, this.elem.modalLink = this, this.modalType = e.data("modal"), this.youtubeId = e.data("youtube-id"), this.neteaseId = e.data("netease-id"), this.contentFlex = e.data("content-flex"), this.init()
}
Object.assign(ModalLink, {
    html: {},
    activeModal: null,
    buildModal: function(e, a) {
        function t(e) {
            return document.querySelector('[data-modal-name="' + e + '"]') || document.getElementById(e)
        }
        var d = a.data("modal-name"),
            l = a.data("youtube-id"),
            i = a.data("netease-id"),
            o = a.data("content-flex"),
            n = a.attr("href"),
            c = document.createElement("div");
        c.classList.add("Modal");
        var s = document.createElement("div");
        s.classList.add("Modal-backdrop"), s.addEventListener("click", ModalLink.closeModal);
        var r = document.createElement("div");
        r.classList.add("Modal-dialog"), r.addEventListener("click", ModalLink.closeModal);
        var u = document.createElement("div");
        u.classList.add("Modal-close"), u.addEventListener("click", ModalLink.closeModal);
        var m = document.createElement("div");
        m.classList.add("Icon"), m.classList.add("Icon--closeGold"), m.classList.add("Modal-closeIcon");
        var p = document.createElement("div");
        p.classList.add("Modal-content"), o && p.classList.add("Modal-content-flex"), p.addEventListener("click", ModalLink.closeModal);
        var v;
        if ("video" == e)
            if (l) v = ModalLink.buildYouTubePlayer(l);
            else {
                var h = a.data("netease-topic-id"),
                    M = a.data("netease-sid"),
                    L = a.data("netease-coverpic"),
                    k = a.data("netease-fallback-text"),
                    f = a.data("netease-fallback-link-label"),
                    b = a.data("netease-fallback-link-url");
                v = ModalLink.buildNetEasePlayer(i, h, M, L, k, f, b)
            }
        else if ("image" == e) v = ModalLink.buildImage(n);
        else if ("comic" == e) {
            var y = a.data("comic-url");
            v = ModalLink.buildComicViewer(y), r.classList.add("Modal-dialog--comic")
        } else if ("html" == e) {
            var E = d || "#" == n[0];
            E ? (d = d || n.slice(1), v = ModalLink.html[d], v || (v = ModalLink.html[d] = t(d))) : v = AjaxContent.createElement({
                url: n
            })
        }
        v && p.appendChild(v), u.appendChild(m), r.appendChild(p), r.appendChild(u), c.appendChild(s), c.appendChild(r), ModalLink.pauseVideos(), document.body.appendChild(c), ModalLink.activeModal = c
    },
    buildComicViewer: function(e) {
        var a = document.createElement("iframe");
        return a.classList.add("Modal-comic"), a.attr("src", e + "/modal"), a.attr("frameborder", "0"), a.attr("allowfullscreen", !0), a
    },
    buildYouTubePlayer: function(e) {
        var a = document.createElement("iframe");
        return a.classList.add("Modal-video"), a.attr("src", "//www.youtube.com/embed/" + e + "?autoplay=1"), a.attr("frameborder", "0"), a.attr("allowfullscreen", !0), a
    },
    buildNetEasePlayer: function(e, a, t, d, l, i, o) {
        function n(e, a, t, d) {
            var l = ["topicid=" + a, "vid=" + e, "sid=" + t, "coverpic=" + d, "autoplay=true"].join("&");
            return l
        }
        var c = document.createElement("object");
        c.classList.add("Modal-video"), c.attr("width", "100%"), c.attr("height", "100%"), c.attr("data", "https://nos.163.com/wow/1/swf/NetEaseFlvPlayerV3.swf"), c.attr("type", "application/x-shockwave-flash");
        var s = document.createElement("param"),
            r = document.createElement("param"),
            u = document.createElement("param"),
            m = document.createElement("param");
        s.attr("value", "true"), s.attr("name", "allowFullScreen"), r.attr("value", "always"), r.attr("name", "allowscriptaccess"), u.attr("value", "https://nos.163.com/wow/1/swf/NetEaseFlvPlayerV3.swf"), u.attr("allownetworking", "all"), u.attr("name", "movie"), m.attr("value", n(e, a, t, d)), m.attr("name", "flashvars"), c.appendChild(s), c.appendChild(r), c.appendChild(u), c.appendChild(m);
        var p = ModalLink.buildNetEaseFallback(l, i, o);
        return p && c.appendChild(p), c
    },
    buildNetEaseFallback: function(e, a, t) {
        if (!e) return !1;
        var d = document.createElement("div");
        d.classList.add("Modal-videoFallback");
        var l = document.createElement("p"),
            i = document.createTextNode(e);
        if (l.classList.add("Modal-videoFallbackMessage"), l.appendChild(i), a && t) {
            var o = document.createElement("a"),
                n = document.createTextNode(a);
            o.attr("href", t), o.classList.add("Modal-videoFallbackLink"), o.appendChild(n), l.appendChild(o)
        }
        return d.appendChild(l), d
    },
    buildImage: function(e) {
        var a = document.createElement("img");
        return a.classList.add("Modal-image"), a.attr("src", e), a
    },
    buildHTML: function(e) {
        var a = document.createElement("div");
        return a.classList.add("Modal-html"), e && (e.style.display = "block", e.classList.remove("hide"), a.appendChild(e)), a
    },
    closeModal: function(e) {
        this == e.target && ModalLink.activeModal && (ModalLink.resumeVideos(), document.body.removeChild(ModalLink.activeModal), ModalLink.activeModal = null)
    },
    pauseVideos: function() {
        ModalLink.videos || (ModalLink.videos = []), document.querySelectorAll("video").map(function(e) {
            e.paused || (e.pause(), ModalLink.videos.push(e))
        })
    },
    resumeVideos: function() {
        ModalLink.videos && (ModalLink.videos.map(function(e) {
            e.play()
        }), ModalLink.videos = null)
    },
    create: function(e) {
        return new ModalLink(e)
    },
    init: function() {
        document.querySelectorAlways(".ModalLink", ModalLink.create), document.addEventListener("keydown", ModalLink.keydown.bind(this))
    },
    stop: function(e) {
        e.preventDefault(), e.stopPropagation()
    },
    keydown: function(e) {
        switch (e.keyCode || e.which) {
            case 27:
                ModalLink.closeModal(e)
        }
    }
}), ModalLink.prototype = {
    init: function() {
        this.elem.classList.contains("lightbox") && (this.modalType = "image"), ("comic" == this.modalType || "image" == this.modalType || "html" == this.modalType || "video" == this.modalType && (this.youtubeId || this.neteaseId) && supports.video) && this.elem.addEventListener("click", this.onclick.bind(this))
    },
    onclick: function(e) {
        (media.matches["media-wide"] || "html" == this.modalType) && (this.buildModal(), ModalLink.stop(e))
    },
    buildModal: function() {
        ModalLink.buildModal(this.modalType, this.elem)
    }
}, ModalLink.init();
//# sourceMappingURL=ModalLink.js.map
function NeteaseVideoPlayer(e) {
    this.elem = e, this.elem.neteaseVideoPlayer = this, this.url = this.elem.data("url"), this.topicid = this.elem.data("topicid"), this.sid = this.elem.data("sid"), this.vid = this.elem.data("vid"), this.thumb = this.elem.data("thumb"), this.autoplay = "false" !== this.elem.data("autoplay"), this.init()
}
Object.assign(NeteaseVideoPlayer, {
    init: function() {
        document.querySelectorAlways(".NeteaseVideoPlayer", NeteaseVideoPlayer.create)
    },
    create: function(e) {
        return new NeteaseVideoPlayer(e)
    },
    createElement: function(e) {
        var t = document.createElement("div");
        return t.classList.add("NeteaseVideoPlayer"), t.data("url", e.url), t.data("topicid", e.topicid), t.data("vid", e.vid), t.data("sid", e.sid), t.data("thumb", e.thumb), t.data("autoplay", e.autoplay), t
    },
    createPlayerElement: function(e) {
        function t() {
            var t = void 0 == e.autoplay || e.autoplay,
                a = ["topicid=" + e.topicid, "vid=" + e.vid, "sid=" + e.sid, "autoplay=" + t];
            return e.thumb && a.push("coverpic=" + encodeURIComponent(e.thumb)), a.join("&")
        }
        var a = document.createElement("object");
        a.classList.add("NeteaseVideoPlayer-player"), a.attr("width", "100%"), a.attr("height", "100%"), a.attr("data", "https://nos.163.com/wow/1/swf/NetEaseFlvPlayerV3.swf"), a.attr("type", "application/x-shockwave-flash");
        var i = document.createElement("param");
        i.attr("name", "AllowFullScreen"), i.attr("value", "true");
        var l = document.createElement("param");
        l.attr("name", "AllowScriptAccess"), l.attr("value", "always");
        var d = document.createElement("param");
        d.attr("name", "allowNetworking"), d.attr("value", "all");
        var r = document.createElement("param");
        r.attr("name", "movie"), r.attr("value", "https://nos.163.com/wow/1/swf/NetEaseFlvPlayerV3.swf");
        var s = document.createElement("param");
        return s.attr("name", "flashvars"), s.attr("value", t()), a.appendChild(i), a.appendChild(l), a.appendChild(d), a.appendChild(r), a.appendChild(s), a
    },
    parseUrl: function(e) {
        var t = /(?:(?:\?|&)topicid=)([-\w]+)/.exec(e),
            a = /(?:(?:\?|&)vid=)([-\w]+)/.exec(e),
            i = /(?:(?:\?|&)sid=)([-\w]+)/.exec(e),
            l = /(?:(?:\?|&)autoplay=)([-\w]+)/.exec(e);
        return {
            topicid: t ? t[1] : null,
            vid: a ? a[1] : null,
            sid: i ? i[1] : null,
            autoplay: l ? l[1] : null,
            thumb: this.thumb || null
        }
    }
}), NeteaseVideoPlayer.prototype = {
    init: function() {
        var e = NeteaseVideoPlayer.parseUrl(this.url || "");
        this.topicid = e.topicid || this.topicid, this.vid = e.vid || this.vid, this.sid = e.sid || this.sid, this.autoplay = e.autoplay || this.autoplay;
        var t = NeteaseVideoPlayer.createPlayerElement({
            topicid: this.topicid,
            vid: this.vid,
            sid: this.sid,
            autoplay: this.autoplay
        });
        this.playerElem = t, this.elem.appendChild(t)
    }
}, NeteaseVideoPlayer.init();
//# sourceMappingURL=NeteaseVideoPlayer.js.map
function Pagination(t) {
    this.elem = t, this.elem.Pagination = this, this.url = t.data("url"), this.page = ~~t.data("page") || 1, this.total = ~~t.data("total") || 1, this.size = t.data("size"), this.start = t.data("start"), this.end = t.data("end"), this.nav = t.querySelector(".Pagination-nav"), this.loadmore = t.querySelector(".Pagination-loadmore"), this.container = t.querySelector(".Pagination-pages"), this.pages = [], this.pages.length = this.total, this.init()
}
Object.assign(Pagination, {
    init: function() {
        document.querySelectorAlways(".Pagination", Pagination.create)
    },
    create: function(t) {
        return new Pagination(t)
    }
}), Pagination.prototype = {
    init: function() {
        this.initPage(), this.loadmore && this.loadmore.addEventListener("click", this.nextPage.bind(this)), this.setPage()
    },
    initPage: function() {
        this.elem.querySelectorAll(".Pagination-page").map(this.savePage.bind(this))
    },
    savePage: function(t) {
        var i = ~~t.data("page") || 1;
        this.pages[i - 1] = t
    },
    nextPage: function() {
        this.page < this.total && this.setPage(this.page + 1)
    },
    setPage: function(t) {
        t && (this.loadmore || this.hidePage(this.page), this.page = t), this.showPage(this.page);
        var i = this.page == this.total;
        i ? this.loadmore && this.nav.classList.add("hide") : this.preloadPage(this.page + 1)
    },
    hidePage: function(t) {
        var i = this.pages[t - 1];
        i && i.classList.add("hide")
    },
    showPage: function(t) {
        var i = this.pages[t - 1];
        i ? (i.classList.remove("hide"), window.trigger("resize")) : this.addPage(t)
    },
    preloadPage: function(t) {
        var i = this.pages[t - 1];
        i || (i = this.addPage(t), i.addEventListener("loading", function() {
            i.classList.add("hide")
        }))
    },
    addPage: function(t) {
        var i = this.createPage(t);
        this.pages[t - 1] = i, i.addEventListener("load", this.stopLoading.bind(this)), this.startLoading();
        var a = this.findNextPage(t);
        return a ? this.container.insertBefore(i, a) : this.container.appendChild(i), i
    },
    createPage: function(t) {
        var i = AjaxContent.createElement({
            url: this.createUrl(t)
        });
        return i.classList.add("Pagination-page"), i.data("page", t), i
    },
    createUrl: function(t) {
        var i = this.url + "?page=" + t || this.page;
        return this.size && (i += "&size=" + this.size), this.start && (i += "&start=" + this.start), this.end && (i += "&end=" + this.end), i
    },
    findNextPage: function(t) {
        for (; !this.pages[t] && t < this.total;) t++;
        return this.pages[t]
    },
    startLoading: function() {
        this.loadmore && this.loadmore.attr("disabled", !0), this.elem.classList.add("is-loading")
    },
    stopLoading: function() {
        this.loadmore && this.loadmore.attr("disabled", null), this.elem.classList.remove("is-loading")
    }
}, Pagination.init();
//# sourceMappingURL=Pagination.js.map
function Pane(t) {
    this.elem = t, this.elem.pane = this, this.bg = t.querySelector(".Pane-bg"), this.forceStickyUpdate = !1, this.forceFadeUpdate = !1, this.parallaxSpeed = 50, this.isParallax = t.classList.contains("Pane--parallax"), this.isParallaxReverse = t.classList.contains("Pane--parallaxReverse"), this.isSticky = t.classList.contains("Pane--sticky"), this.isStuck = !1, this.fadeSpeed = 2, this.fadeMinimum = .1, this.fadeMaximum = 1, this.isFading = t.classList.contains("Pane--fade"), this.isFaded = !1, this.init()
}
Object.assign(Pane, {
    init: function() {
        document.querySelectorAlways(".Pane", Pane.create)
    },
    create: function(t) {
        return new Pane(t)
    }
}), Pane.isInView = function(t, i) {
    var e = t.getBoundingClientRect(),
        s = e.top + t.offsetHeight,
        a = e.bottom - t.offsetHeight;
    return s >= 0 && a <= i
}, Pane.prototype = {
    init: function() {
        this.listen()
    },
    listen: function() {
        this.updateBound = this.update.bind(this), window.addEventListener("scroll", this.updateBound), window.addEventListener("resize", function() {
            this.forceStickyUpdate = !0, this.forceFadeUpdate = !0, this.updateBound()
        }.bind(this)), this.update()
    },
    update: function() {
        this.elem.classList.contains("Pane--parallax") ? (requestAnimationFrame(this.renderParallax.bind(this)), this.isParallax = !0) : this.isParallax && (this.bg.style.top = "", this.isParallax = !1), this.isSticky && requestAnimationFrame(this.renderSticky.bind(this)), this.isFading && requestAnimationFrame(this.renderFading.bind(this))
    },
    renderParallax: function() {
        var t = window.innerHeight || document.documentElement.clientHeight;
        if (Pane.isInView(this.elem, t)) {
            var i = this.elem.getBoundingClientRect(),
                e = i.top + i.height / 2,
                s = (this.parallaxSpeed * (0 - e / t)).toFixed(2);
            this.isParallaxReverse && (s = -s - 50), this.bg.style.top = s + "%"
        }
    },
    renderSticky: function() {
        var t = this.elem.getBoundingClientRect();
        if (t.top > 0)(this.isStuck || this.forceStickyUpdate) && (this.bg.classList.remove("is-active"), this.bg.style.height = "", this.isStuck = !1, this.forceStickyUpdate = !1);
        else if (!this.isStuck || this.forceStickyUpdate) {
            var i = window.innerHeight || document.documentElement.clientHeight;
            this.bg.classList.add("is-active"), this.bg.style.height = i + "px", this.isStuck = !0, this.forceStickyUpdate = !1
        }
    },
    renderFading: function() {
        var t = this.elem.getBoundingClientRect();
        if (t.top >= 0)(this.isFaded || this.forceFadeUpdate) && (this.bg.style.opacity = "", this.isFaded = !1, this.forceFadeUpdate = !1);
        else {
            var i = window.innerHeight || document.documentElement.clientHeight,
                e = Math.max(this.fadeMinimum, Math.min(1 - this.fadeSpeed * Math.abs(t.top) / i, this.fadeMaximum));
            this.bg.style.opacity = e < 1 ? e.toFixed(2) : null, this.isFaded = !0, this.forceFadeUpdate = !1
        }
    }
}, Pane.init();
//# sourceMappingURL=Pane.js.map
function Panel(i) {
    this.elem = i, this.elem.panel = this, this.video = i.querySelector(".Panel-video"), this.videoInitialized = !1, this.init()
}
Object.assign(Panel, {
    init: function() {
        document.querySelectorAlways(".Panel", Panel.create)
    },
    create: function(i) {
        return new Panel(i)
    }
}), Panel.prototype = {
    init: function() {
        this.video && (this.videoInit(), this.listen())
    },
    listen: function() {
        window.addEventListener("resize", this.update.bind(this)), document.addEventListener("visibilitychange", this.update.bind(this))
    },
    disabled: function() {
        return this.elem.classList.contains("Panel-video--disabled") || document.hidden
    },
    update: function() {
        this.disabled() ? this.videoInitialized && this.pause() : this.videoInitialized ? this.play() : this.videoInit()
    },
    play: function() {
        this.video.play()
    },
    pause: function() {
        this.video.pause()
    },
    videoInit: function() {
        this.disabled() ? this.video.src = "" : (this.video.src = this.video.data("src"), this.video.play(), this.videoInitialized = !0)
    }
}, Panel.init();
//# sourceMappingURL=Panel.js.map
function PatchNotes(e) {
    this.elem = e, this.elem.patchNotes = this, this.body = e.querySelector(".PatchNotes-body"), this.expandElem = e.querySelector(".PatchNotes-expand"), this.collapseElem = e.querySelector(".PatchNotes-collapse"), this.init()
}
Object.assign(PatchNotes, {
    init: function() {
        document.querySelectorAlways(".PatchNotes", PatchNotes.create)
    },
    create: function(e) {
        return new PatchNotes(e)
    },
    stop: function(e) {
        e.preventDefault()
    }
}), PatchNotes.prototype = {
    init: function() {
        this.listen(this.expandElem, this.expand), this.listen(this.collapseElem, this.collapse)
    },
    listen: function(e, t) {
        e.addEventListener("click", t.bind(this, e)), e.addEventListener("mousedown", PatchNotes.stop)
    },
    expand: function() {
        this.elem.classList.add("is-expanded"), this.body.scrollTop = 0, this.elem.SyncHeight && this.elem.SyncHeight.update()
    },
    collapse: function() {
        this.elem.classList.remove("is-expanded"), this.elem.SyncHeight && this.elem.SyncHeight.update()
    }
}, PatchNotes.init();
//# sourceMappingURL=PatchNotes.js.map
function Photoswipe(e) {
    this.elem = e, this.elem.photoswipe = this, this.name = this.elem.attr("name"), this.prevElem = this.elem.querySelector(".Photoswipe-prev"), this.nextElem = this.elem.querySelector(".Photoswipe-next"), this.init()
}
Object.assign(Photoswipe, {
    layers: {},
    history: [],
    init: function() {
        document.querySelectorAlways(".Photoswipe", Photoswipe.create)
    },
    create: function(e) {
        return new Photoswipe(e)
    },
    show: function(e, t, i, s) {
        e = Photoswipe.layers[e], e && e.show.call(e.photoswipe, t, i, s)
    },
    hide: function(e) {
        e = Photoswipe.layers[e], e && e.photoswipe.hide.call(e.photoswipe)
    },
    layer: function(e) {
        Photoswipe.layers[e.name] = e
    },
    back: function() {
        if (Photoswipe.history.length > 0) {
            var e = Photoswipe.history.pop(),
                t = e.item;
            Photoswipe.show(t.plugin.layer, t.items(), t.index(), !1)
        }
    }
}), Photoswipe.prototype = {
    init: function() {
        var e = this.layer();
        e && (e.photoswipe = this, e.init && e.init.call(this), this.prevElem.addEventListener("click", this.prev.bind(this)), this.nextElem.addEventListener("click", this.next.bind(this)))
    },
    layer: function() {
        return Photoswipe.layers[this.name]
    },
    prev: function() {
        this.pswp && this.pswp.prev()
    },
    next: function() {
        this.pswp && this.pswp.next()
    },
    show: function(e, t) {
        this.layer().show.call(this, e, t)
    },
    hide: function() {
        this.pswp && this.pswp.close()
    }
}, Photoswipe.layer({
    name: "lightbox",
    show: function(e, t) {
        var i = {
            bgOpacity: 1,
            history: !1,
            showHideOpacity: !1,
            index: t,
            arrowEl: !1,
            shareEl: !1,
            getThumbBoundsFn: function(t) {
                var i = e[t].elem.getBoundingClientRect();
                return {
                    x: i.left,
                    y: i.top + document.body.scrollTop,
                    w: i.width
                }
            }
        };
        this.pswp = new PhotoSwipe(this.elem, PhotoSwipeUI_Default, e, i), this.pswp.listen("destroy", function() {
            delete this.pswp
        }.bind(this)), this.pswp.init()
    }
}), Photoswipe.layer(Photoswipe.modal = {
    name: "modal",
    item: function() {
        var e = document.createElement("div");
        e.classList.add("Photoswipe-wrap"), e.classList.add("pswp__close");
        var t = document.createElement("div");
        t.classList.add("Photoswipe-item"), t.classList.add("pswp__close"), e.appendChild(t);
        var i = scrollbar.width ? scrollbar.width + 1 : 0;
        return e.style.right = -i + "px", e
    }(),
    wrap: function(e) {
        if (e.html) {
            var t = Photoswipe.modal.item.cloneNode(!0);
            e.html.tagName ? t.firstChild.appendChild(e.html) : t.firstChild.innerHTML = e.html, e.html = t
        }
    },
    show: function(e, t, i) {
        if (e.each(function(e) {
                Photoswipe.modal.wrap(e), e.modal.hideBackButton()
            }), this.pswp) return i !== !1 && Photoswipe.history.push({
            item: this.pswp.currItem.modal
        }), Photoswipe.history.length > 0 && e[t].modal.showBackButton(), Photoswipe.modal.replaceItems.call(this, e), void this.pswp.goTo(t);
        var s = {
            bgOpacity: .7,
            history: !1,
            showHideOpacity: !1,
            index: t,
            closeOnScroll: !1,
            closeOnVerticalDrag: !1,
            closeElClasses: ["close"],
            closeEl: !1,
            captionEl: !1,
            fullscreenEl: !1,
            zoomEl: !1,
            shareEl: !1,
            counterEl: !1,
            arrowEl: !1,
            preloaderEl: !1,
            isClickableElement: function(e) {
                return "A" === e.tagName || e.matches(".Photoswipe-item")
            }
        };
        document.body.classList.add("is-overlayed");
        var o = this.pswp = new PhotoSwipe(this.elem, PhotoSwipeUI_Default, e, s);
        o.listen("close", function() {
            document.body.classList.remove("is-overlayed")
        }), o.listen("destroy", function() {
            e.map(function(e) {
                e.html.remove()
            }), delete this.pswp, Photoswipe.history = []
        }.bind(this)), o.init(), o.listen("bindEvents", function() {
            ["wheel", "mousewheel", "DOMMouseScroll"].each(function(e) {
                o.template.removeEventListener(e, o.handleMouseWheel)
            })
        })
    },
    replaceItems: function(e) {
        this.pswp.items.splice.apply(this.pswp.items, [0, this.pswp.items.length].concat(e)), this.pswp.invalidateCurrItems(), this.pswp.updateSize(!0)
    }
}), Photoswipe.init();
//# sourceMappingURL=Photoswipe.js.map
function Poll(e) {
    this.elem = e, this.elem.Poll = this, this.form = e.querySelector(".Poll-vote"), this.url = e.data("url"), this.maxChoices = this.form ? ~~this.form.data("choices") : 0, this.numSelected = 0, this.submitted = !1, this.init()
}
Object.assign(Poll, {
    init: function() {
        document.querySelectorAlways(".Poll", Poll.create)
    },
    create: function(e) {
        return new Poll(e)
    }
}), Poll.prototype = {
    init: function() {
        if (this.form) {
            this.form.addEventListener("submit", this.onSubmit.bind(this)), this.selectionBoxes = this.form.elements["selection[]"];
            for (var e = 0; e < this.selectionBoxes.length; e++) this.selectionBoxes[e].addEventListener("click", this.onSelect.bind(this, this.selectionBoxes[e]))
        }
    },
    onSubmit: function(e) {
        function t() {
            this.elem.outerHTML = s.responseText
        }
        if (this.submitted) return !1;
        e.preventDefault(), this.form.submitBtn.disabled = !0, this.submitted = !0;
        for (var i = this.form.action, s = new XMLHttpRequest, n = [], o = 0; o < this.form.elements.length; o++) {
            var l = this.form.elements[o];
            ("_csrf" == l.name || l.checked) && n.push(encodeURIComponent(l.name) + "=" + encodeURIComponent(l.value))
        }
        s.open("POST", i), s.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), s.onload = t.bind(this), s.send(n.join("&"))
    },
    onSelect: function(e) {
        1 == this.maxChoices ? this.submitted || (this.form.submitBtn.disabled = !1) : (e.checked ? this.numSelected >= this.maxChoices ? e.checked = !1 : this.numSelected++ : this.numSelected--, this.form.submitBtn.disabled = this.numSelected <= 0 || this.submitted)
    }
}, Poll.init();
//# sourceMappingURL=Poll.js.map
function ProgressDonut(t) {
    this.elem = t, this.elem.progressDonut = this, this.borderPath = this.elem.querySelector(".ProgressDonut-border"), this.filledPath = this.elem.querySelector(".ProgressDonut-filled"), this.unfilledPath = this.elem.querySelector(".ProgressDonut-unfilled"), this.decimal = this.elem.data("decimal"), this.init()
}
Object.assign(ProgressDonut, {
    init: function() {
        document.querySelectorAlways(".ProgressDonut", ProgressDonut.create)
    },
    create: function(t) {
        return new ProgressDonut(t)
    }
}), ProgressDonut.createPath = function(t, e) {
    this.percent = 100 * t, t <= 0 && (this.percent = 100, e = !0), this.progress = "", this.points = 2 * Math.PI / 100, this.endpointX = 50 + 50 * Math.sin(this.points * this.percent), this.endpointY = 50 - 50 * Math.cos(this.points * this.percent), this.largeFlag = 0;
    var s = e && this.percent > 50,
        i = !e && this.percent < 50;
    return (s || i) && (this.largeFlag = 1), this.sweepFlag = 1, e || (this.sweepFlag = 0), this.percent >= 100 && (this.endpointX = 49.9999, this.endpointY = 0), this.progress += "M50 0 A 50 50, 0, " + this.largeFlag + ", " + this.sweepFlag + ", " + this.endpointX + " " + this.endpointY, this.progress
}, ProgressDonut.prototype = {
    init: function() {
        null != this.borderPath && this.borderPath.attr("d", ProgressDonut.createPath(1, !0)), null != this.borderPath && this.unfilledPath.attr("d", ProgressDonut.createPath(this.decimal, !1));
        var t = this.decimal > 0;
        t && null != this.filledPath && this.filledPath.attr("d", ProgressDonut.createPath(this.decimal, !0))
    }
}, ProgressDonut.init();
//# sourceMappingURL=ProgressDonut.js.map
function ScrollAnchor(t) {
    this.elem = t, this.control = t.querySelector(".ScrollAnchor-control > .Sticky"), this.icon = t.querySelector(".ScrollAnchor-icon"), this.indicator = this.icon.querySelector(".ScrollAnchor-indicator"), this.overlay = t.querySelector(".ScrollAnchor-overlay"), this.isScrolled = !1, this.isMaxedOut = !1, this.scrollFrom = 0, this.scrollDelta = 0, this.scrollStart = 0, this.scrollProgress = 0, this.scrollEnd = 0, this.scrollDuration = 500, this.scrollThreshold = .6, this.scrollDistance = ScrollAnchor.calcScrollDistance(this.scrollThreshold), this.init()
}
Object.assign(ScrollAnchor, {
    init: function() {
        document.querySelectorAlways(".ScrollAnchor", ScrollAnchor.create)
    },
    create: function(t) {
        return new ScrollAnchor(t)
    },
    ease: function(t, s, i, o) {
        return t = t / o - 1, i * (t * t * t + 1) + s
    },
    calcScrollDistance: function(t) {
        return Math.floor(t * (window.innerHeight || document.documentElement.clientHeight))
    }
}), ScrollAnchor.prototype = {
    init: function() {
        this.listen()
    },
    listen: function() {
        this.updateBound = this.update.bind(this), window.addEventListener("scroll", this.updateBound), window.addEventListener("resize", function() {
            this.scrollDistance = ScrollAnchor.calcScrollDistance(this.scrollThreshold), this.updateBound()
        }.bind(this)), this.animateBound = this.animate.bind(this), this.scrollBound = this.scroll.bind(this), this.icon.addEventListener("click", this.scrollBound), this.update()
    },
    update: function() {
        requestAnimationFrame(this.render.bind(this))
    },
    showOpenIcon: function() {
        this.indicator.classList.contains("Icon--closeSwitchOff") && (this.indicator.classList.remove("Icon--closeSwitchOff"), this.indicator.classList.add("Icon--closeSwitchOn"))
    },
    showCloseIcon: function() {
        this.indicator.classList.contains("Icon--closeSwitchOn") && (this.indicator.classList.remove("Icon--closeSwitchOn"), this.indicator.classList.add("Icon--closeSwitchOff"))
    },
    render: function() {
        var t = this.control.getBoundingClientRect();
        t.top >= this.scrollDistance ? (this.isStuck || this.isMaxedOut) && (this.isStuck = !1, this.isMaxedOut = !1, this.showOpenIcon()) : t.top > 0 ? (this.isStuck = !0, this.isMaxedOut = !1, t.top >= this.scrollDistance / 2 ? this.showOpenIcon() : this.showCloseIcon()) : this.isMaxedOut || (this.isStuck = !0, this.isMaxedOut = !0, this.showCloseIcon())
    },
    scroll: function() {
        var t = this.control.getBoundingClientRect();
        this.scrollFrom = window.scrollY, t.top >= this.scrollDistance / 2 ? this.scrollDelta = t.top : this.scrollDelta = -Math.round(this.scrollDistance - t.top), this.scrollEnd = (this.scrollStart = this.scrollProgress = (new Date).getTime()) + this.scrollDuration, requestAnimationFrame(this.animateBound)
    },
    animate: function() {
        if (this.scrollProgress < this.scrollEnd) {
            this.scrollProgress += (new Date).getTime() - this.scrollProgress;
            var t = Math.min(this.scrollDuration, this.scrollProgress - this.scrollStart),
                s = ScrollAnchor.ease(t, this.scrollFrom, this.scrollDelta, this.scrollDuration);
            window.scrollTo(window.scrollX, s), this.scrollBound || (this.scrollBound = this.scroll.bind(this)), requestAnimationFrame(this.animateBound)
        }
    }
}, ScrollAnchor.init();
//# sourceMappingURL=ScrollAnchor.js.map
function Scrollable(e) {
    this.elem = e, this.elem.scrollable = this, this.lastMove = 0, this.init()
}
Object.assign(Scrollable, {
    minimumDeltaY: 100,
    init: function() {
        document.querySelectorAlways(".Scrollable", Scrollable.create)
    },
    create: function(e) {
        return new Scrollable(e)
    }
}), Scrollable.prototype = {
    movingThreshold: 200,
    init: function() {
        this.elem.addEventListener("wheel", this.onmousewheel.bind(this)), this.elem.Scrollable = this, window.addEventListener("resize", this.onresize.bind(this))
    },
    get isDisabled() {
        return this.elem.classList.contains("Scrollable--disabled")
    },
    reset: function() {
        this.elem.scrollLeft = 0
    },
    onresize: function() {
        setTimeout(function() {
            this.isDisabled && this.reset()
        }, 10)
    },
    onmousewheel: function(e) {
        if (this.isDisabled) return !1;
        var t = performance.now(),
            l = this.elem.scrollLeft,
            i = Math.max(Math.abs(e.deltaY), Scrollable.minimumDeltaY) * (e.deltaY < 0 ? -1 : 1);
        this.elem.scrollLeft += i;
        var s = this.elem.scrollLeft,
            n = l != s;
        if (n) e.preventDefault(), this.lastMove = t;
        else {
            var o = t - this.lastMove,
                r = o < this.movingThreshold;
            r && (this.lastMove = t, e.preventDefault())
        }
    }
}, Scrollable.init();
//# sourceMappingURL=Scrollable.js.map
function SelectMenu(e) {
    this.elem = e, this.elem.SelectMenu = this, this.elem.destroyComponent = this.destroyComponent.bind(this), this.windowListening = !1, this.maxResults = this.elem.data("max-results") || SelectMenu.maxResults, this.toggle = this.elem.querySelector(".SelectMenu-toggle"), this.menu = this.elem.querySelector(".SelectMenu-menu"), this.itemsContainer = this.elem.querySelector(".SelectMenu-items"), this.input = this.menu.querySelector(".SelectMenu-input"), this.exception = this.menu.querySelector(".SelectMenu-exception"), this.defaultsContainer = this.menu.querySelector(".SelectMenu-defaults"), this.groups = this.menu.querySelectorAll(".SelectMenu-group"), this.items = this.menu.querySelectorAll(".SelectMenu-item"), this.init()
}
Object.assign(SelectMenu, {
    activeClass: "is-active",
    hasMatchesClass: "has-matches",
    hasInputClass: "has-input",
    maxResults: 10,
    elems: [],
    init: function() {
        document.querySelectorAlways(".SelectMenu", SelectMenu.create)
    },
    create: function(e) {
        return new SelectMenu(e)
    },
    closeAll: function() {
        SelectMenu.elems.map(function(e) {
            e.SelectMenu.closeMenu()
        })
    }
}), SelectMenu.prototype = {
    init: function() {
        SelectMenu.elems.push(this.elem), this.items = this.filterItems(), this.listen()
    },
    filterItems: function() {
        var e = this,
            t = Array.prototype.filter,
            s = Array.prototype.slice.call(this.items);
        return t.call(s, function(t) {
            return t.parentNode != e.defaultsContainer
        })
    },
    listen: function() {
        var e = this;
        e.input.addEventListener("input", e.onInput.bind(e)), e.toggle.addEventListener("click", e.onToggleClick.bind(e)), e.items.map(function(t) {
            t.addEventListener("click", e.onItemClick.bind(e))
        })
    },
    openMenu: function() {
        if (SelectMenu.closeAll(), this.elem.classList.contains("SelectMenu--mobileMenu")) {
            var e = this.elem.cloneNode(!0);
            return e.removeAttribute("querySelectorAlways"), e.classList.add("is-inside-mobileMenu"), SiteNav.setMobileMenuContents(e)
        }
        this.menu.classList.add(SelectMenu.activeClass), this.focusInput(), this.windowListening || (window.addEventListener("click", this.onWindowClick.bind(this)), this.windowListening = !0)
    },
    closeMenu: function() {
        this.menu.classList.remove(SelectMenu.activeClass)
    },
    focusInput: function() {
        this.input.focus()
    },
    showItem: function(e) {
        e.classList.add(SelectMenu.activeClass)
    },
    hideItem: function(e) {
        e.classList.remove(SelectMenu.activeClass)
    },
    showException: function() {
        this.exception.classList.add(SelectMenu.activeClass)
    },
    hideException: function() {
        this.exception.classList.remove(SelectMenu.activeClass)
    },
    showDefaults: function() {
        this.elem.classList.remove(SelectMenu.hasInputClass)
    },
    hideDefaults: function() {
        this.elem.classList.add(SelectMenu.hasInputClass)
    },
    addHasMatches: function() {
        this.elem.classList.add(SelectMenu.hasMatchesClass)
    },
    removeHasMatches: function() {
        this.elem.classList.remove(SelectMenu.hasMatchesClass)
    },
    onWindowClick: function(e) {
        e.stopPropagation();
        var t = this.menu.contains(e.target);
        t || this.closeMenu()
    },
    onToggleClick: function(e) {
        e.stopPropagation();
        var t = this.menu.classList.contains(SelectMenu.activeClass);
        t ? this.closeMenu() : this.openMenu()
    },
    onItemClick: function(e) {
        this.closeMenu()
    },
    onInput: function() {
        var e = this.input.value;
        if (this.hideException(), this.items.map(this.hideItem.bind(this)), this.groups.map(this.hideItem.bind(this)), "" == e) return this.showDefaults(), void this.removeHasMatches();
        this.hideDefaults(), e = e.toLowerCase();
        for (var t = [], s = 0; s < this.items.length && !(this.valueMatches(this.items[s], e) && (t.push(this.items[s]), t.length >= this.maxResults)); s++);
        for (var i = t.length > this.maxResults ? this.maxResults : t.length, s = 0; s < i; s++) this.showItem(t[s]), this.showItem(t[s].parentNode);
        var n = t.length > 0;
        n ? this.addHasMatches() : (this.removeHasMatches(), this.showException())
    },
    valueMatches: function(e, t) {
        var s = e.data("value").toLowerCase();
        return 0 == s.indexOf(t)
    },
    destroyComponent: function() {
        SelectMenu.elems.splice(SelectMenu.elems.indexOf(this.elem), 1), this.elem.remove()
    }
}, SelectMenu.init();
//# sourceMappingURL=SelectMenu.js.map
function SiteNav(e) {
    this.elem = e, this.elem.siteNav = this, this.searchInput = e.querySelector(".SiteNav-searchInput"), this.searchDropdown = e.querySelector(".SiteNav-searchDropdown"), this.searchLinks = e.querySelectorAll(".SiteNav-searchLink"), this.searchInline = e.querySelector(".SiteNav-searchInlineInput"), this.searchInlineDropdown = e.querySelector(".SiteNav-searchInlineDropdown"), this.stickyElem = e.querySelector(".SiteNav-sticky"), this.mobileMenu = e.querySelector(".SiteNav-mobile-menu"), this.mobileMenuContentArea = e.querySelector(".SiteNav-mobileSiteMenuBody"), this.mobileMenuDynamicContentArea = e.querySelector(".SiteNav-mobileSiteMenuDynamicBody"), this.globalMenu = e.querySelector(".SiteNav-global-menu"), this.navbar = document.querySelector(".BnetNav .nav-global-menu-icon"), this.overlay = e.querySelector(".SiteNav-mobileOverlay"), this.init()
}
Object.assign(SiteNav, {
    elems: [],
    dynamicContentClass: "has-dynamic-content",
    init: function() {
        document.querySelectorAlways(".SiteNav", SiteNav.create)
    },
    create: function(e) {
        return new SiteNav(e)
    },
    getStickyOffset: function() {
        for (var e, t, i = document.querySelectorAll(".SiteNav"), n = 0, s = 0; s < i.length; s++) e = i[s].querySelector(".SiteNav-sticky"), e && e.classList.contains("is-active") && (t = i[s].querySelector(".SiteNav-area"), t && (n += t.offsetHeight));
        return n
    },
    setMobileMenuContents: function(e) {
        SiteNav.elems.map(function(t) {
            t.siteNav.setMobileMenuContents(e)
        })
    }
}), SiteNav.prototype = {
    init: function() {
        function e() {
            requestAnimationFrame(this.onStickyUpdate.bind(this))
        }

        function t(e) {
            return function(t) {
                t.preventDefault(), e.click()
            }
        }
        SiteNav.elems.push(this.elem), document.addEventListener("keydown", this.keydown.bind(this)), this.searchInline.addEventListener("focus", this.focus.bind(this)), this.searchInline.addEventListener("blur", this.clear.bind(this, this.searchInline)), this.listen(this.searchInline), this.searchLinks.map(this.listen.bind(this)), this.stickyElem.addEventListener("update", e.bind(this)), window.addEventListener("resize", e.bind(this)), this.globalMenu.addEventListener("click", t(this.navbar)), this.overlay.addEventListener("click", t(this.mobileMenu)), this.mobileMenu.addEventListener("click", this.onMobileMenuClick.bind(this))
    },
    listen: function(e) {
        function t() {
            requestAnimationFrame(i)
        }
        var i = this.click.bind(this);
        e.addEventListener("click", t)
    },
    get isSearchInline() {
        return !1
    },
    get active() {
        return this.isSearchInline ? this.searchInlineDropdown.classList.contains("is-active") : this.searchDropdown.classList.contains("is-active")
    },
    get search() {
        return this.isSearchInline ? this.searchInline : this.searchInput
    },
    get searchLink() {
        return this.isSearchInline ? this.searchInline : this.searchLinks[0]
    },
    click: function() {
        this.active ? this.focus() : this.blur()
    },
    clear: function(e) {
        e.value = ""
    },
    focus: function() {
        this.search.value = "", this.search.focus(), this.active || this.searchLink.click()
    },
    blur: function() {
        this.search.value = "", this.search.blur()
    },
    open: function() {
        this.active || this.searchLink.click()
    },
    close: function() {
        this.active && !this.search.value && this.searchLink.click()
    },
    keydown: function(e) {
        var t = e.target === this.search,
            i = "INPUT" === e.target.nodeName,
            n = "TEXTAREA" === e.target.nodeName;
        if (t || !i && !n) switch (e.keyCode) {
            case 27:
                this.close();
                break;
            case 9:
                if (this.active) {
                    this.close(), e.preventDefault();
                    break
                }
            case 191:
                this.active || (this.open(), e.preventDefault())
        }
    },
    onStickyUpdate: function() {
        var e = this.stickyElem.classList.contains("is-active");
        e ? this.elem.classList.add("SiteNav--thinFull") : this.elem.classList.remove("SiteNav--thinFull"), this.elem.trigger("update")
    },
    onMobileMenuClick: function(e) {
        this.elem.classList.remove(SiteNav.dynamicContentClass), this.removeDynamicContent()
    },
    removeDynamicContent: function() {
        for (var e = this.mobileMenuDynamicContentArea.firstChild; e;) e && (e.destroyComponent ? e.destroyComponent() : this.mobileMenuDynamicContentArea.removeChild(this.mobileMenuDynamicContentArea.firstChild), e = this.mobileMenuDynamicContentArea.firstChild)
    },
    setMobileMenuContents: function(e) {
        this.toggleMobileMenu(), this.elem.classList.add(SiteNav.dynamicContentClass), this.mobileMenuDynamicContentArea.appendChild(e)
    },
    toggleMobileMenu: function() {
        this.mobileMenu.click()
    }
}, SiteNav.init();
//# sourceMappingURL=SiteNav.js.map
function SocialButtons(t) {
    this.elem = t, this.elem.SocialButtons = this, this.init()
}
Object.assign(SocialButtons, {
    init: function() {
        document.querySelectorAlways(".SocialButtons", SocialButtons.create)
    },
    create: function(t) {
        return new SocialButtons(t)
    },
    openPopup: function(t, o, i) {
        window.open(t, "", "height=" + o + ",width=" + i).focus()
    }
}), SocialButtons.prototype = {
    init: function() {
        for (var t = this.elem.getElementsByClassName("SocialButtons-link"), o = 0; o < t.length; o++) t[o].onclick = function() {
            return SocialButtons.openPopup(this.attr("href"), this.data("popup-height"), this.data("popup-width")), !1
        }
    }
}, SocialButtons.init();
//# sourceMappingURL=SocialButtons.js.map
function SortTable(t) {
    this.elem = t, this.elem.sortTable = this, this.rows = t.querySelectorAll(".SortTable-row"), this.labels = Array.from(t.querySelectorAll(".SortTable-label")), this.labels.map(function(t, e) {
        t.index = e
    }), this.labels.sortBy(function() {
        return SortTable.priority(this)
    }), this.body = t.querySelector(".SortTable-body"), this.isDisabled = !1, this.init()
}
Object.assign(SortTable, {
    init: function() {
        document.querySelectorAlways(".SortTable", SortTable.create)
    },
    create: function(t) {
        return new SortTable(t)
    },
    stop: function(t) {
        t.preventDefault()
    },
    priority: function(t) {
        return ~~t.data("priority")
    },
    colWidth: function(t) {
        var e = t.map(SortTable.elemWidth);
        return Math.max.apply(Math, e)
    },
    colHide: function(t) {
        t.map(SortTable.elemHide)
    },
    colShow: function(t) {
        t.map(SortTable.elemShow)
    },
    elemWidth: function(t) {
        return t.offsetWidth
    },
    elemHide: function(t) {
        t.classList.add("is-hidden")
    },
    elemShow: function(t) {
        t.classList.remove("is-hidden")
    }
}), SortTable.prototype = {
    init: function() {
        this.isDisabled = this.elem.classList.contains("SortTable--disabled"), this.cols = this.labels.map(this.findCols.bind(this)), this.isDisabled || this.labels.map(this.listen.bind(this)), window.addEventListener("resize", this.update.bind(this)), this.update()
    },
    listen: function(t) {
        t.addEventListener("click", this.onclick.bind(this, t))
    },
    onclick: function(t) {
        function e(t) {
            t.classList.remove("is-sorted"), t.classList.remove("is-sorted-reverse")
        }
        if (t.classList.contains("is-sorted")) t.classList.remove("is-sorted"), t.classList.add("is-sorted-reverse");
        else if (t.classList.contains("is-sorted-reverse")) t.classList.remove("is-sorted-reverse"), t.classList.add("is-sorted");
        else {
            this.labels.map(e);
            var s = t.classList.contains("sort-reverse");
            t.classList.add(s ? "is-sorted-reverse" : "is-sorted")
        }
        this.sort()
    },
    update: function() {
        function t(t, e) {
            s += i[e], s <= l && SortTable.colShow(t)
        }
        var e = media.matches["media-huge"] ? "huge" : media.matches["media-large"] ? "large" : "small";
        this.size != e && (this.size = e, this.saveWidths());
        var s = 0,
            i = this.widths;
        this.cols.map(SortTable.colHide);
        var l = this.width();
        this.cols.map(t)
    },
    findCols: function(t) {
        return this.elem.querySelectorAll(".SortTable-col:nth-child(" + (t.index + 1) + ")")
    },
    width: function() {
        var t = this.elem.style,
            e = t.width;
        t.width = "100%";
        var s = this.elem.offsetWidth;
        return t.width = e, s
    },
    saveWidths: function() {
        function t(t) {
            for (; t != document;) e(t), t = t.parentNode
        }

        function e(t) {
            "none" == getComputedStyle(t).display && (i.push({
                node: t,
                display: t.style.display
            }), t.style.display = "block")
        }

        function s(t) {
            t.node.style.display = t.display
        }
        var i = [];
        t(this.elem), this.elem.classList.add("is-resizing"), this.labels.map(e), this.cols.map(function(t) {
            t.map(e)
        }), this.widths = this.cols.map(SortTable.colWidth), i.map(s), this.elem.classList.remove("is-resizing")
    },
    sort: function() {
        function t(t) {
            var e = t.querySelector(".SortTable-data:nth-child(" + (a + 1) + ")"),
                s = null;
            e && (s = e.data("value"), s || (s = e.textContent));
            var i = parseFloat(s);
            return isNaN(i) || (s = i), {
                row: t,
                value: s
            }
        }

        function e(t) {
            return null != t.value
        }

        function s(t) {
            o.appendChild(t.row)
        }
        var i = null,
            l = !1;
        if (this.labels.map(function(t) {
                t.classList.contains("is-sorted") ? (i = t, l = !1) : t.classList.contains("is-sorted-reverse") && (i = t, l = !0)
            }), i) {
            var a = i.index,
                o = this.body,
                r = this.rows.map(t).filter(e);
            r = r.sortBy("value"), l && (r = r.reverse()), r.map(s)
        }
    }
}, SortTable.init();
//# sourceMappingURL=SortTable.js.map
function Spinner(n) {
    this.elem = n, this.elem.spinner = this, this.init()
}
Object.assign(Spinner, {
    init: function() {
        document.querySelectorAlways(".Spinner", Spinner.create)
    },
    create: function(n) {
        return new Spinner(n)
    },
    createElement: function() {
        var n = document.createElement("div");
        n.classList.add("Spinner");
        var i = ["<div class='Spinner-orange'></div>"].join(""),
            e = document.createElement("div");
        e.innerHTML = i, n.appendChild(e.firstChild);
        var t = ["<div class='Spinner-donut'>", "<div class='Spinner-donut-icon'>", "<div class='Spinner-donut-cut'>", "<div class='Spinner-donut-donut'></div>", "</div>", "</div>", "</div>"].join(""),
            e = document.createElement("div");
        return e.innerHTML = t, n.appendChild(e.firstChild), n
    }
}), Spinner.prototype = {
    init: function() {}
}, Spinner.init();
//# sourceMappingURL=Spinner.js.map
function Sticky(t) {
    this.elem = t, this.elem.sticky = this, this.content = t.querySelector(".Sticky-content"), this.limiter = t.data("limiter"), this.offset = 0, this.isActive = Sticky.checkActive(t), this.isStuck = !1, this.isFixedWidth = t.classList.contains("Sticky--fixedWidth"), this.isReversed = t.classList.contains("Sticky--reverse"), this.isOffscreen = t.classList.contains("Sticky--offscreen"), this.forceUpdate = !1, this.zIndex = 999, this.init()
}
Object.assign(Sticky, {
    init: function() {
        document.querySelectorAlways(".Sticky", Sticky.create), window.addEventListener("resize", Sticky.resize)
    },
    create: function(t) {
        return new Sticky(t)
    },
    allElements: [],
    checkActive: function(t) {
        var e = t.classList.contains("is-disabled"),
            i = t.classList.contains("hide"),
            s = "none" === window.getComputedStyle(t).display;
        return !(e || i || s)
    },
    resize: function() {
        var t = 0,
            e = 999,
            i = [];
        Sticky.allElements.map(function(s) {
            return s.isActive = Sticky.checkActive(s.elem), s.isFixedWidth = s.elem.classList.contains("Sticky--fixedWidth"), s.isReversed ? void i.unshift(s) : (s.offset = t, s.forceUpdate = !0, s.isActive || (s.isStuck = !1), void(s.update() && (s.zIndex = e, e++, t += s.isActive ? s.content.offsetHeight : 0)))
        }), t = 0, e = 999, i.map(function(i) {
            i.offset = t, i.forceUpdate = !0, i.isActive || (i.isStuck = !1), i.update() && (i.zIndex = e, e++, t += i.isActive ? i.content.offsetHeight : 0)
        })
    },
    isScrolledOff: function(t, e, i, s) {
        var n = t.getBoundingClientRect();
        if (i) {
            var c = window.innerHeight || document.documentElement.clientHeight;
            return n.bottom >= c - e
        }
        return (s ? n.bottom : n.top) <= e
    },
    calcLimiterOffset: function(t, e, i, s, n) {
        var c;
        if (t) {
            var o = window.innerHeight || document.documentElement.clientHeight;
            c = o - s - e.getBoundingClientRect().bottom
        } else c = e.getBoundingClientRect().top - s;
        return c < n ? (i.style.zIndex = "", c) : n
    }
}), Sticky.prototype = {
    init: function() {
        this.listen()
    },
    listen: function() {
        function t() {
            this.elem.trigger("update")
        }

        function e() {
            requestAnimationFrame(t.bind(this))
        }
        document.querySelector(".body").addEventListener("scroll", e.bind(this)), this.elem.addEventListener("update", this.update.bind(this)), Sticky.allElements.push(this), this.update()
    },
    update: function() {
        if (null == this.elem || null == this.content) return this.destroy(), !1;
        var t = this.content.style;
        if (this.isActive && Sticky.isScrolledOff(this.elem, this.offset, this.isReversed, this.isOffscreen)) {
            if (!this.isStuck || this.forceUpdate || this.limiter) {
                var e = this.content.offsetHeight;
                this.elem.style.height = this.content.offsetHeight + "px", this.elem.classList.add("is-active"), t.zIndex = this.zIndex;
                var i = this.offset,
                    s = this.limiter ? document.querySelector(this.limiter) : null;
                if (s && (i = Sticky.calcLimiterOffset(this.isReversed, s, this.content, this.elem.offsetHeight, i)), this.isReversed ? t.bottom = i + "px" : (this.isOffscreen && (i -= e), t.top = i + "px"), this.isFixedWidth) {
                    var n = this.elem.getBoundingClientRect();
                    t.left = n.left + "px", t.right = "", t.width = this.elem.offsetWidth + "px"
                } else t.left = "", t.right = scrollbar.width + "px";
                this.isStuck = !0, this.forceUpdate = !1
            }
        } else(this.isStuck || this.forceUpdate) && (this.elem.style.height = "", this.elem.classList.remove("is-active"), t.top = "", t.bottom = "", t.left = "", t.right = "", t.zIndex = "", t.width = "", this.isStuck = !1, this.forceUpdate = !1);
        return !0
    },
    destroy: function() {
        document.removeEventListener("scroll", this.updateBound);
        var t = Sticky.allElements.indexOf(this);
        t > -1 && Sticky.allElements.splice(t, 1)
    }
}, Sticky.init();
//# sourceMappingURL=Sticky.js.map
function SyncHeight(t) {
    this.elem = t, this.elem.syncHeight = this, this.height = 0, this.items = t.querySelectorAll(".SyncHeight-item"), this.init()
}
Object.assign(SyncHeight, {
    init: function() {
        document.querySelectorAlways(".SyncHeight", SyncHeight.create)
    },
    create: function(t) {
        return new SyncHeight(t)
    }
}), SyncHeight.prototype = {
    init: function() {
        this.listen(), requestAnimationFrame(this.update.bind(this))
    },
    listen: function() {
        window.addEventListener("resize", this.update.bind(this)), window.addEventListener("load", this.update.bind(this))
    },
    removeHeight: function(t) {
        t.style.removeProperty("height")
    },
    getHeight: function(t) {
        var i = t.offsetHeight;
        return t.hasAttribute("data-syncheight-multiplier") && (i /= t.data("syncheight-multiplier")), i
    },
    setHeight: function(t) {
        var i = this.height;
        t.hasAttribute("data-syncheight-multiplier") && (i *= t.data("syncheight-multiplier")), t.style.height = i + "px"
    },
    reset: function() {
        this.items.map(this.removeHeight.bind(this))
    },
    update: function() {
        function t() {
            var t = this.items.map(this.getHeight.bind(this));
            this.height = Math.max.apply(Math, t), this.height && this.items.map(this.setHeight.bind(this))
        }
        return document.body.classList.contains("is-preloading") ? requestAnimationFrame(this.update.bind(this)) : (this.reset(), void(this.elem.classList.contains("SyncHeight--disabled") || requestAnimationFrame(t.bind(this))))
    }
}, SyncHeight.init();
//# sourceMappingURL=SyncHeight.js.map
function Tabs(t) {
    this.elem = t, this.elem.tabs = this, this.tabs = t.querySelectorAll(".Tabs-link"), this.tabsName = t.data("tabs"), this.isUnselectable = t.classList.contains("Tabs--unselectable"), this.isDefault = t.classList.contains("Tabs--default"), this.isSave = t.classList.contains("Tabs--save"), this.init()
}
Object.assign(Tabs, {
    hashReg: /(#.*)?$/,
    init: function() {
        document.querySelectorAlways(".Tabs", Tabs.create), document.querySelectorAlways(".TabsLink", Tabs.listen)
    },
    create: function(t) {
        return new Tabs(t)
    },
    stop: function(t) {
        t.preventDefault()
    },
    listen: function(t) {
        t.addEventListener("click", function(e) {
            Tabs.onclick(t, e)
        })
    },
    onclick: function(t, e) {
        var i = document.querySelectorAll(".Tabs-link" + t.attributeSelector("data-tab"));
        i.length && (e && e.preventDefault(), Dropdown.closeAll()), i.map(function(t) {
            for (var e = t, i = null; e && e != document.body;) {
                if (e.classList.contains("Tabs")) {
                    i = e;
                    break
                }
                e = e.parentElement
            }
            i.tabs.click(t), i && i.offsetWidth > 0 && i.offsetHeight > 0 && Tabs.scrollTo(i)
        })
    },
    scrollTo: function(t, e) {
        for (var i = 0, s = t; s && s != document.body;) i += s.offsetTop, s = s.offsetParent;
        var a = Tabs.getScrollTop(),
            n = document.body.clientHeight,
            c = a > i,
            l = a + n < i;
        SiteNav && SiteNav.getStickyOffset && (i -= SiteNav.getStickyOffset()), (c || l || e) && Tabs.setScrollTop(i)
    },
    getScrollTop: function() {
        return window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0)
    },
    setScrollTop: function(t) {
        "undefined" != typeof window.scroll && window.scroll(window.scrollX || window.pageXOffset || 0, t)
    }
}), Tabs.prototype = {
    init: function() {
        this.tabs.map(this.listen.bind(this)), this.findDefault(), this.load() || this.selectDefault()
    },
    listen: function(t) {
        t.addEventListener("click", this.onclick.bind(this, t)), t.addEventListener("dblclick", this.onclick.bind(this, t)), t.addEventListener("mousedown", Tabs.stop)
    },
    click: function(t) {
        this.click.active = !0, t.trigger("dblclick")
    },
    onclick: function(t) {
        this.click.active ? (this.click.active = !1, this.select(t)) : Tabs.onclick(t)
    },
    save: function() {
        if (!this.isSave) return !1;
        if (this.isDefault) return this.isDefault = !1, !1;
        var t = "",
            e = this.tabs.match(".is-selected");
        e && (t = e.data("tab"));
        var i = !t || e == this.defaultTab;
        i && history.replaceState ? history.replaceState({}, null, location.href.replace(Tabs.hashReg, "")) : location.replace(location.href.replace(Tabs.hashReg, "#" + t))
    },
    load: function() {
        function t() {
            a || (a = setTimeout(function() {
                s.removeEventListener("update", t)
            }, 100)), Tabs.scrollTo(i, !0)
        }
        if (!this.isSave) return !1;
        var e = location.hash.substr(1),
            i = this.tabs.match('[data-tab="' + e + '"]');
        if (i) {
            this.select(i), Tabs.scrollTo(i, !0);
            var s = document.querySelector(".SiteNav"),
                a = 0;
            return s.addEventListener("update", t), !0
        }
        return !1
    },
    findDefault: function() {
        var t = this.tabs.match(".Tabs-link--default"),
            e = this.tabs[0];
        this.defaultTab = t || e
    },
    selectDefault: function() {
        return !!this.isDefault && void(this.defaultTab && this.defaultTab.click())
    },
    select: function(t) {
        var e = this.hasSelection(t);
        e ? this.isUnselectable && (this.tabs.map(this.clearSelection.bind(this)), this.removeSelection(this.elem)) : (this.tabs.map(this.clearSelection.bind(this)), this.addSelection(this.elem), this.addSelection(t), this.findTab(t).map(this.addSelection.bind(this))), window.trigger("resize"), this.save()
    },
    hasSelection: function(t) {
        return t.classList.contains("is-selected")
    },
    addSelection: function(t) {
        t.classList.add("is-selected"), this.updateTabsLabel(t)
    },
    removeSelection: function(t) {
        t.classList.remove("is-selected")
    },
    clearSelection: function(t) {
        var e = this.hasSelection(t);
        this.removeSelection(t), e && this.findTab(t).map(this.removeSelection.bind(this))
    },
    findTab: function(t) {
        return document.querySelectorAll(".Tab" + t.attributeSelector("data-tab"))
    },
    updateTabsLabel: function(t) {
        if (this.tabsName && t.classList.contains("Tabs-link")) {
            var e = t.querySelector(".Tabs-linkLabel"),
                i = document.querySelector('.Tabs-label[data-tabs="' + this.tabsName + '"]');
            e && i && (i.textContent = e.textContent)
        }
    }
}, Tabs.init();
//# sourceMappingURL=Tabs.js.map
function Talent(e) {
    this.elem = e, this.elem.Talent = this, this.checkbox = null, this.checkboxInput = null, this.init()
}
Object.assign(Talent, {
    activeClass: "is-selected",
    smallModifier: "Talent--small",
    init: function() {
        document.querySelectorAlways(".Talent", Talent.create)
    },
    create: function(e) {
        return new Talent(e)
    }
}), Talent.prototype = {
    init: function() {
        this.checkbox = this.elem.querySelector(".Talent-checkbox"), this.checkboxInput = this.elem.querySelector(".Talent-checkboxInput")
    },
    get isSelected() {
        return this.elem.classList.contains(Talent.activeClass)
    },
    get isCollapsed() {
        return this.elem.classList.contains(Talent.smallModifier)
    },
    select: function() {
        this.elem.classList.add(Talent.activeClass), this.checkboxInput.checked = !0
    },
    unselect: function() {
        this.elem.classList.remove(Talent.activeClass), this.checkboxInput.checked = !1
    },
    expand: function() {
        this.elem.classList.remove(Talent.smallModifier)
    },
    collapse: function() {
        this.elem.classList.add(Talent.smallModifier)
    }
}, Talent.init();
//# sourceMappingURL=Talent.js.map
function TalentCalculator(t) {
    this.elem = t, this.elem.talentCalculator = this, this.classes = t.querySelectorAll(".TalentCalculator-class"), this.specs = t.querySelectorAll(".TalentCalculator-spec"), this.shares = t.querySelectorAll(".TalentCalculator-share"), this.resets = t.querySelectorAll(".TalentCalculator-reset"), this.tiers = t.querySelectorAll(".TalentCalculator-tier"), this.talents = this.tiers.map(function(t) {
        return t.querySelectorAll(".TalentCalculator-talent")
    }), this.petSpecOptions = t.querySelectorAll(".TalentCalculator-petSpecOption"), this.petSpecs = t.querySelectorAll(".TalentCalculator-petSpecAbilities"), this.init()
}
Object.assign(TalentCalculator, {
    init: function() {
        document.querySelectorAlways(".TalentCalculator", TalentCalculator.create)
    },
    create: function(t) {
        talentCalculator = new TalentCalculator(t)
    }
}), TalentCalculator.prototype = {
    init: function() {
        this.shares.map(this.listen.bind(this, this.share)), this.resets.map(this.listen.bind(this, this.reset)), this.tiers.map(this.listenTier.bind(this)), this.classes.map(this.listenClass.bind(this)), this.classes.map(this.listen.bind(this, this.save)), this.specs.map(this.listen.bind(this, this.save)), this.petSpecOptions.map(this.linkPetSpecs.bind(this)), this.petSpecs.map(this.listenPetSpec.bind(this)), this.load()
    },
    hideIntro: function() {
        this.elem.querySelectorAll(".TalentCalculator-intro").map(function(t) {
            t.classList.add("hide")
        })
    },
    setSubtitle: function(t) {
        this.elem.querySelector(".TalentCalculator-subtitle").textContent = t
    },
    listen: function(t, e) {
        e.addEventListener("click", t.bind(this, e))
    },
    listenClass: function(t) {
        var e = this.elem.querySelector(".Tab" + t.attributeSelector("data-tab") + " .TalentCalculator-specs");
        t.addEventListener("click", this.handleClassClick.bind(this, e, !0))
    },
    listenTier: function(t, e) {
        var i = this,
            s = this.talents[e];
        s.map(function(e) {
            e.addEventListener("click", i.toggleTier.bind(i, t, s)), e.querySelector(".TalentCalculator-select").addEventListener("click", i.select.bind(i, t, s, e)), e.querySelector(".TalentCalculator-unselect").addEventListener("click", i.unselect.bind(i, t, s, e)), e.querySelector(".Talent-checkboxInput").addEventListener("click", i.handleTalentCheckboxClick.bind(i, t, s, e))
        })
    },
    listenPetSpec: function(t) {
        t.querySelector(".TalentCalculator-select").addEventListener("click", this.selectPetSpec.bind(this, t)), t.querySelector(".TalentCalculator-unselect").addEventListener("click", this.unselectPetSpec.bind(this, t)), t.querySelector(".TalentCalculator-petSpecAbilitiesClose").addEventListener("click", function(e) {
            t.petSpecTabLink.click()
        })
    },
    linkPetSpecs: function(t) {
        var e = t.querySelector(".Tabs-link"),
            i = document.querySelector(".TalentCalculator-petSpecAbilities" + e.attributeSelector("data-tab"));
        t.petSpecTab = i, i.petSpecTabLink = e, e.petSpecOption = t
    },
    share: function(t) {
        this.save(), window.prompt("Shareable Permalink", location.href)
    },
    reset: function(t) {
        function e(t) {
            t.map(i)
        }
        var i = this.removeSelection.bind(this);
        this.talents.map(e), this.tiers.map(i), this.petSpecs.map(this.unselectPetSpec.bind(this)), this.save()
    },
    handleTalentCheckboxClick: function(t, e, i, s) {
        s.stopPropagation(), s.currentTarget.checked ? this.selectTalent(t, e, i) : this.unselectTalent(t, e, i)
    },
    handleClassClick: function(t, e, i) {
        var s = i.currentTarget.data("subtitle");
        this.setSubtitle(s), this.hideIntro(), this.syncHeightUpdate(t, e)
    },
    syncHeightUpdate: function(t, e) {
        var i = t.syncHeight;
        i && (e ? setTimeout(i.update.bind(i), 1) : i.reset())
    },
    toggleTier: function(t, e) {
        t.classList.toggle("TalentCalculator-tier--active"), this.syncHeightUpdate(t, t.classList.contains("TalentCalculator-tier--active")), e.map(this.toggleTalent.bind(this))
    },
    collapseTier: function(t, e) {
        t.classList.remove("TalentCalculator-tier--active"), this.syncHeightUpdate(t, t.classList.contains("TalentCalculator-tier--active")), e.map(function(t) {
            t.Talent.collapse()
        })
    },
    toggleTalent: function(t) {
        t.Talent.isCollapsed ? t.Talent.expand() : t.Talent.collapse()
    },
    selectTalent: function(t, e, i) {
        this.select(t, e, i)
    },
    select: function(t, e, i) {
        e.map(this.removeSelection.bind(this)), this.addSelection(i), this.addSelection(t), this.save()
    },
    selectPetSpec: function(t, e) {
        this.petSpecOptions.map(function(t) {
            t.classList.remove("is-active"), t.petSpecTab.classList.remove("is-active")
        }), t.classList.add("is-active"), t.petSpecTabLink.petSpecOption.classList.add("is-active"), this.save()
    },
    addSelection: function(t) {
        t.Talent ? t.Talent.select() : t.classList.add("is-selected")
    },
    unselectTalent: function(t, e, i) {
        this.unselect(t, e, i)
    },
    unselect: function(t, e) {
        e.map(this.removeSelection.bind(this)), this.removeSelection(t), this.save()
    },
    unselectPetSpec: function(t) {
        t.classList.remove("is-active"), t.petSpecTabLink.petSpecOption.classList.remove("is-active"), this.save()
    },
    removeSelection: function(t) {
        t.Talent && t.Talent.unselect(), t.classList.remove("is-selected")
    },
    save: function() {
        var t = this;
        setTimeout(function() {
            var e = "#" + t["export"]();
            location.replace(location.href.replace(/(#.*)?$/, e))
        }, 100)
    },
    load: function() {
        var t = this;
        setTimeout(function() {
            t["import"](location.hash.substr(1))
        }, 100)
    },
    "export": function() {
        function t(t) {
            function e(t, e) {
                t.classList.contains("is-selected") && (s = e + 1)
            }
            var i = t.querySelectorAll(".TalentCalculator-talent"),
                s = 0;
            return i.map(e), s
        }
        var e, i, s, a, l, c, n, r, o, h = [];
        return i = this.classes.match(".is-selected"), i && (e = i.data("tab"), a = this.specs.match('[data-tab^="' + e + '/"].is-selected'), a ? (s = a.data("tab"), l = this.elem.querySelector('.Tab[data-tab="' + s + '"]'), h.push(s)) : h.push(e)), l && (tiers = l.querySelectorAll(".TalentCalculator-tier"), c = tiers.map(t).join("").replace(/0+$/, ""), c && h.push("talents=" + c)), r = this.petSpecOptions.match(".is-active"), r && (o = r.querySelector(".Tabs-link"), n = o.data("tab"), h.push("pet=" + n)), h.join("/")
    },
    "import": function(t) {
        var e, i, s, a, l, c, n, r, o, h = this,
            u = t.split("/"),
            p = u.shift(),
            d = u.shift();
        if (p && (e = this.classes.match('[data-tab="' + p + '"]'), e && e.click()), d && (i = this.specs.match('[data-tab="' + p + "/" + d + '"]'), i && (i.click(), s = this.elem.querySelector(".Tab" + i.attributeSelector("data-tab")))), s) {
            for (l = s.querySelectorAll(".TalentCalculator-tier"); c = u.shift();)
                if (n = c.split("=").shift().toLowerCase(), r = c.split("=").slice(1).join("="), n && r) switch (n) {
                    case "talents":
                        o = r.replace(/\D/g, "").split(""), o.map(function(t, e) {
                            var i = ~~t,
                                s = l[e];
                            if (i > 0 && s) {
                                var a = s.querySelectorAll(".TalentCalculator-talent"),
                                    c = a[i - 1];
                                c ? h.select(s, a, c) : h.syncHeightUpdate(s)
                            }
                        });
                        break;
                    case "pet":
                        a = this.petSpecs.match('[data-tab="' + r + '"]'), a && h.selectPetSpec(a, !1);
                        break;
                    case "glyphs":
                }
            this.save()
        }
    }
}, TalentCalculator.init();
//# sourceMappingURL=TalentCalculator.js.map
function Tooltip(t) {
    this.elem = t, this.elem.tooltip = this, this.name = t.attr("name"), this.offset = parseFloat(t.data("offset") || 20), this.init()
}
Object.assign(Tooltip, {
    tooltips: {},
    active: !1,
    activeClass: "is-active",
    init: function() {
        document.querySelectorAlways(".Tooltip", Tooltip.create)
    },
    create: function(t) {
        return new Tooltip(t)
    },
    addActive: function(t) {
        t.classList.add(Tooltip.activeClass)
    },
    removeActive: function(t) {
        t.classList.remove(Tooltip.activeClass)
    },
    find: function(t) {
        return Tooltip.tooltips[t]
    },
    show: function(t) {
        var i = Tooltip.find(t);
        i && i.show()
    },
    hide: function(t) {
        var i = Tooltip.find(t);
        i && i.hide()
    },
    link: function(t, i) {
        var o = Tooltip.find(i);
        o && o.link(t)
    }
}), Tooltip.prototype = {
    init: function() {
        this.remove(), Tooltip.tooltips[this.name] = this, this.animation = new Animation(this.update.bind(this))
    },
    link: function(t) {
        t.addEventListener("mouseover", this.show.bind(this)), t.addEventListener("mouseout", this.hide.bind(this))
    },
    position: function(t) {
        this.orient(t)
    },
    orient: function(t) {
        var i = Math.min(document.body.clientHeight - this.height - this.offset, t.y + this.offset),
            o = t.x + this.offset,
            e = t.x + this.width + 2 * this.offset > document.body.clientWidth;
        if (e) {
            var s = t.x - this.width < 0;
            o = s ? document.body.clientWidth - this.width - this.offset : t.x - this.width - this.offset
        }
        this.elem.style.top = i + "px", this.elem.style.left = o + "px"
    },
    add: function() {
        document.body.appendChild(this.elem)
    },
    remove: function() {
        this.elem.remove()
    },
    show: function() {
        Tooltip.addActive(this.elem), this.add(), this.width = this.elem.offsetWidth, this.height = this.elem.offsetHeight, this.update(), this.animation.start()
    },
    hide: function() {
        this.animation.stop(), this.remove(), Tooltip.removeActive(this.elem)
    },
    update: function() {
        this.position(mouse)
    }
}, Tooltip.init();
//# sourceMappingURL=Tooltip.js.map
function Typeahead(e) {
    this.elem = e, this.elem.Typeahead = this, this.defaultContentDiv = e.querySelector(".Typeahead-defaultContent"), this.resultsContentDiv = e.querySelector(".Typeahead-resultsContent"), this.loadingMask = e.querySelector(".Typeahead-loadingMask"), this.url = e.data("typeahead-url"), this.searchInput = document.querySelector("#" + e.data("typeahead-input-id")), this.isActive = !1, this.typeaheadResultsDiv = null, this.pendingSearchRequestId = -1, this.searchRequestDelay = 350, this.init()
}
Object.assign(Typeahead, {
    activeClass: "is-active",
    init: function() {
        document.querySelectorAlways(".Typeahead", Typeahead.create)
    },
    create: function(e) {
        return new Typeahead(e)
    }
}), Typeahead.prototype = {
    init: function() {
        this.searchInput && (this.searchInput.addEventListener("input", this.onInputChange.bind(this)), this.searchInput.addEventListener("blur", this.clearTypeaheadResults.bind(this))), document.addEventListener("click", this.onClick.bind(this))
    },
    addActive: function() {
        this.defaultContentDiv.classList.remove(Typeahead.activeClass), this.resultsContentDiv.classList.add(Typeahead.activeClass), this.resultsContentDiv.classList.remove(Typeahead.activeClass), this.active = !0
    },
    removeActive: function() {
        this.defaultContentDiv.classList.add(Typeahead.activeClass), this.loadingMask.classList.remove(Typeahead.activeClass), this.resultsContentDiv.classList.remove(Typeahead.activeClass), this.active = !1
    },
    onInputChange: function(e) {
        var t = e.target.value;
        t && t.trim().length >= 3 ? (this.active || this.addActive(), this.insertTypeaheadResultsDiv(t)) : this.active && this.clearTypeaheadResults()
    },
    clearTypeaheadResults: function() {
        clearTimeout(this.pendingSearchRequestId), this.removeActive(), this.typeaheadResultsDiv && (this.resultsContentDiv.removeChild(this.typeaheadResultsDiv), this.typeaheadResultsDiv = null)
    },
    onClick: function(e) {
        if (this.active) {
            for (var t = e.target; t !== document;) {
                var s = t.classList.contains("Typeahead-defaultContent"),
                    a = t.classList.contains("Typeahead-resultsContent");
                if (s || a) return void e.stopPropagation();
                t = t.parentNode
            }
            this.removeActive(), this.resultsContentDiv.removeChild(this.typeaheadResultsDiv), this.typeaheadResultsDiv = null
        }
    },
    insertTypeaheadResultsDiv: function(e) {
        var t = this.url + "?q=" + e;
        null != this.typeaheadResultsDiv ? this.typeaheadResultsDiv.innerHTML = "" : (this.typeaheadResultsDiv = AjaxContent.createElement(), this.typeaheadResultsDiv.classList.add("Typeahead-results"), this.typeaheadResultsDiv.addEventListener("load", this.stopLoading.bind(this)), this.resultsContentDiv.appendChild(this.typeaheadResultsDiv)), clearTimeout(this.pendingSearchRequestId), this.pendingSearchRequestId = setTimeout(function() {
            this.typeaheadResultsDiv.ajaxContent.update(t)
        }.bind(this), this.searchRequestDelay), this.startLoading()
    },
    startLoading: function() {
        this.loadingMask.classList.add(Typeahead.activeClass)
    },
    stopLoading: function() {
        this.loadingMask.classList.remove(Typeahead.activeClass)
    }
}, Typeahead.init();
//# sourceMappingURL=Typeahead.js.map
function Video(i) {
    this.elem = i, this.elem.video = this, this.video = i.querySelector(".Video-video"), this.started = i.classList.contains("is-started"), this.init()
}
Object.assign(Video, {
    init: function() {
        document.querySelectorAlways(".Video", Video.create)
    },
    create: function(i) {
        return new Video(i)
    }
}), Video.prototype = {
    init: function() {
        this.youtube(), this.listen()
    },
    listen: function() {
        this.elem.addEventListener("click", this.onclick.bind(this)), this.elem.addEventListener("dblclick", this.ondblclick.bind(this)), this.video.addEventListener("ended", this.onended.bind(this))
    },
    start: function() {
        if (!this.started) {
            this.started = !0, this.elem.classList.add("is-started");
            var i = this.video.data("src");
            i && this.video.attr("src", i)
        }
    },
    play: function() {
        this.elem.classList.add("is-playing"), this.video.play()
    },
    pause: function() {
        this.elem.classList.remove("is-playing"), this.video.pause()
    },
    toggle: function() {
        this.video.paused ? this.play() : this.pause()
    },
    onclick: function(i) {
        this.isDummy() || (this.start(), this.toggle())
    },
    ondblclick: function(i) {
        i.stopPropagation(), this.isDummy() || (this.elem.webkitRequestFullscreen(), this.play())
    },
    onended: function(i) {
        this.elem.classList.remove("is-playing")
    },
    youtube: function() {
        var i = this.video.data("src"),
            t = /^https?:\/\/(?:www\.)?youtube.com\/(?:watch\?v=|embed\/)(\w+)/.exec(i),
            e = t && t[1];
        if (e) {
            var s = document.createElement("iframe");
            s.src = "https://www.youtube.com/embed/" + e + "?wmode=transparent&autohide=1&showinfo=0&controls=0", s.attr("allowfullscreen", !0), s.classList.add("Video-iframe"), this.iframe = s, this.elem.insertBefore(this.iframe, this.elem.firstChild)
        }
    },
    isDummy: function() {
        return this.elem.classList.contains("Video--disabled")
    }
}, Video.init();
//# sourceMappingURL=Video.js.map
function VideoPane(i) {
    this.elem = i, this.elem.videoPane = this, this.video = i.querySelector(".VideoPane-video"), this.videoInitialized = !1, this.init()
}
Object.assign(VideoPane, {
    init: function() {
        document.querySelectorAlways(".VideoPane", VideoPane.create)
    },
    create: function(i) {
        return new VideoPane(i)
    }
}), VideoPane.prototype = {
    init: function() {
        this.videoInit(), this.listen()
    },
    listen: function() {
        window.addEventListener("resize", this.update.bind(this)), document.addEventListener("visibilitychange", this.update.bind(this))
    },
    disabled: function() {
        return this.elem.classList.contains("VideoPane--disabled") || document.hidden
    },
    update: function() {
        this.disabled() ? this.videoInitialized && this.pause() : this.videoInitialized ? this.play() : this.videoInit()
    },
    play: function() {
        this.video.play()
    },
    pause: function() {
        this.video.pause()
    },
    videoInit: function() {
        this.disabled() ? this.video.src = "" : (this.video.src = this.video.data("src"), this.video.play(), this.videoInitialized = !0)
    }
}, VideoPane.init();
//# sourceMappingURL=VideoPane.js.map