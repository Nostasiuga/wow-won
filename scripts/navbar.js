function getParent(e){var t,n=e.attr("data-target");return n||(n=e.attr("href"),n=n&&/#/.test(n)&&n.replace(/.*(?=#[^\s]*$)/,"")),t=$(n),t.length||(t=e.parent()),t}function clearMenus(){$(toggle).each(function(){getParent($(this)).removeClass("open")})}var toggle="[data-toggle='dropdown']",NavbarDropdown=function(e){var t=$(e).on("click.dropdown.data-api",this.toggle);$("html").on("click.dropdown.data-api",function(){t.parent().removeClass("open")})};NavbarDropdown.prototype={constructor:NavbarDropdown,toggle:function(){var e,t,n=$(this);if(!n.is(".disabled, :disabled"))return e=getParent(n),t=e.hasClass("open"),clearMenus(),t||e.toggleClass("open"),n.focus(),e.trigger("toggle.dropdown.data-api",[!t]),!1},keydown:function(e){var t,n,o,i,a;if(/(38|40|27)/.test(e.keyCode)&&(t=$(this),e.preventDefault(),e.stopPropagation(),!t.is(".disabled, :disabled"))){if(o=getParent(t),i=o.hasClass("open"),!i||i&&27===e.keyCode)return t.click();n=$("[role=menu] li:not(.divider):visible a",o),n.length&&(a=n.index(n.filter(":focus")),38===e.keyCode&&a>0&&a--,40===e.keyCode&&a<n.length-1&&a++,~a||(a=0),n.eq(a).focus())}}},$.fn.dropdown=function(e){return this.each(function(){var t=$(this),n=t.data("dropdown");n||t.data("dropdown",n=new NavbarDropdown(this)),"string"==typeof e&&n[e].call(t)})},$.fn.dropdown.Constructor=NavbarDropdown,$(document).on("click.dropdown.data-api touchstart.dropdown.data-api",clearMenus).on("click.dropdown touchstart.dropdown.data-api",".dropdown form",function(e){e.stopPropagation()}).on("touchstart.dropdown.data-api",".dropdown-menu",function(e){e.stopPropagation()}).on("click.dropdown.data-api touchstart.dropdown.data-api",toggle,NavbarDropdown.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api",toggle+", [role=menu]",NavbarDropdown.prototype.keydown),!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.nav=e()}}(function(){var e;return function t(e,n,o){function i(r,c){if(!n[r]){if(!e[r]){var s="function"==typeof require&&require;if(!c&&s)return s(r,!0);if(a)return a(r,!0);var l=new Error("Cannot find module '"+r+"'");throw l.code="MODULE_NOT_FOUND",l}var d=n[r]={exports:{}};e[r][0].call(d.exports,function(t){var n=e[r][1][t];return i(n?n:t)},d,d.exports,t,e,n,o)}return n[r].exports}for(var a="function"==typeof require&&require,r=0;r<o.length;r++)i(o[r]);return i}({1:[function(e,t,n){var o=function(e){e.preventDefault();var t=$(this).attr("data-target");$(t).toggleClass("in"),$(t).prev().toggleClass("open")},i=function(){$("[data-toggle='nav-collapse']").on("click",o)};t.exports=i},{}],2:[function(e,t,n){(function(n){function o(e){e||(e=window.event),e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}var i="undefined"!=typeof window?window.$:"undefined"!=typeof n?n.$:null,a=e("./modals"),r=e("./login"),c=e("./collapsible"),s=e("./locale"),l=e("./notifications"),d=e("./tickets");e("./mobile"),i(function(){a.init(".eu-cookie-compliance"),s.init(".nav-international-container"),d.init(".nav-support-ticket-counter"),r(),c(),l.init(),document.addEventListener&&i("#nav-client-header .dropdown-menu, #nav-client-footer .dropdown-menu").on("click",function(e){o(e)})}),t.exports={modals:a,locale:s,tickets:d,login:r,collapsible:c,notifications:l}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./collapsible":1,"./locale":3,"./login":4,"./mobile":5,"./modals":6,"./notifications":7,"./tickets":8}],3:[function(e,t,n){(function(e){var n="undefined"!=typeof window?window.$:"undefined"!=typeof e?e.$:null,o={activeRegion:null,activeTarget:null,activeLanguage:null,init:function(e){this.container=n(e),this.container.on("click","a.select-region",n.proxy(this.changeRegion,this)),this.container.on("click","a.select-language",n.proxy(this.changeLanguage,this)),this.activeRegion=this.container.find("#select-regions .active"),this.activeLanguage=this.container.find("#select-language .active").find("li"),this.activeLanguageGroup=this.container.find("#select-language .active"),this.currentRegion=this.container.find("#select-regions .current"),this.currentLanguage=this.container.find("#select-language .current").find("li.current"),this.btn=n(".nav-lang-change"),this.btn.addClass("disabled")},disableSelection:function(){this.btn.addClass("disabled"),this.activeRegion.removeClass("active"),this.activeLanguage.removeClass("active"),this.activeLanguageGroup.removeClass("active")},changeRegion:function(e){e.preventDefault(),e.stopPropagation();var t=n(e.target);this.disableSelection(),this.btn.attr("href","javascript:;"),this.activeRegion=t.parent(),this.activeLanguageGroup=t.parents(".nav-international-container").find("[data-region='"+t.attr("data-target")+"']");var o=this.activeLanguageGroup.find("li");this.activeLanguageGroup.addClass("active"),this.activeRegion.addClass("active"),this.activeRegion.hasClass("current")&&0===o.find("active").length&&this.currentLanguage.addClass("active"),1===o.length&&(o.addClass("active"),this.btn.removeClass("disabled"),this.btn.attr("href",o.find("a").attr("href")))},changeLanguage:function(e){e.preventDefault(),e.stopPropagation();var t=n(e.target),o=t.attr("href");this.activeLanguage.removeClass("active"),this.currentLanguage.removeClass("active"),this.btn.addClass("disabled"),this.btn.attr("href","javascript:;"),this.activeLanguage=t.parent(),this.activeLanguage.addClass("active"),this.activeLanguage.hasClass("current")||(this.btn.attr("href",o),this.btn.removeClass("disabled"))}};t.exports=o}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],4:[function(e,t,n){var o=function(){};t.exports=o},{}],5:[function(e,t,n){(function(e){var n="undefined"!=typeof window?window.$:"undefined"!=typeof e?e.$:null,o=!1,i=function(){n(".nav-mobile-menu-wrap").removeClass("out"),n(".nav-hamburger-menu-icon").removeClass("active"),o=!1};n(function(){var e=n(".nav-mobile-menu-wrap"),t=e.filter(".left"),a=e.filter(".right"),r=n(".nav-client #nav-blackout"),c=n(".nav-hamburger-menu-icon"),s=function(e){return"right"===e?(t.removeClass("out"),a.addClass("out"),c.removeClass("active")):"left"===e&&(a.removeClass("out"),t.addClass("out"),c.addClass("active")),o=!0};n(".nav-remove-icon").on("click",i),n(".nav-global-menu-icon").on("click",function(e){s("right")}),c.on("click",function(e){o?i():s("left")}),r.on("click",function(e){o&&i()})}),t.exports=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],6:[function(e,t,n){(function(n){var o="undefined"!=typeof window?window.$:"undefined"!=typeof n?n.$:null,i=e("@blizzard/cookie-client"),a={euCookieComplianceAgreed:null,init:function(e){this.container=o(e),this.euCookieComplianceAgreed=i.read("eu-cookie-compliance-agreed"),this.euCookieComplianceAgreed||(this.container.removeClass("hide"),i.create("eu-cookie-compliance-agreed",1,{expires:8760,path:"/"}),this.container.on("click","#cookie-compliance-close",o.proxy(this.closeCookieModal,this)),this.container.on("click","#cookie-compliance-agree",o.proxy(this.closeCookieModal,this)))},closeCookieModal:function(){o(".eu-cookie-compliance.desktop").addClass("hide"),o(".eu-cookie-compliance.mobile").addClass("hide"),i.create("eu-cookie-compliance-agreed",1,{expires:8760,path:"/"})}};t.exports=a}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"@blizzard/cookie-client":10}],7:[function(e,t,n){(function(n){function o(e){e||(e=window.event),e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}var i="undefined"!=typeof window?window.$:"undefined"!=typeof n?n.$:null,a=e("@blizzard/satchel"),r=e("./mobile"),c={config:{},selectors:{},analytics:{namespace:"global-notification",dismiss:{close:"Close - X"},button:{click:"Click - Button"},bell:{open:"Open - Bell",close:"Close - Bell",auto:"Open - Automatic"},background:{close:"Close - Background"},event:"globalNotification",notification:{title:"",id:""},sendEvent:function(e,t){""!==this.notification.id&&window.dataLayer&&window.dataLayer.push({"analytics.eventPanel":c.analytics.getPanel(),"analytics.eventPlacement":c.analytics[e][t],event:"globalNotification"})},getPanel:function(){return"id:"+this.notification.id+" || "+this.notification.title}},init:function(){this.selectors.$icon=i(".nav-notification-icon"),this.selectors.$dropdown=i(".nav-notification-dropdown"),this.config.allowMultiNotifications=!1,this.config.localStorageNotificationDismiss="dismiss";var e=c.selectors,t=c.analytics;this.selectors.$icon.on("click",function(n){o(n),i(this).hasClass("open")?(c.set(e.notification.first().attr("data-notification-id"),c.config.localStorageNotificationDismiss,!0),c.closeDropdown(),t.sendEvent("bell","close")):(c.openDropdown(),t.sendEvent("bell","open"))}),this.selectors.$dropdown.on("click",function(e){o(e)}),i(document).on("click.nav.notifications.dropdown.close",function(){e.$dropdown.hasClass("open")&&(c.closeDropdown(),t.sendEvent("background","close"))}),i("[data-toggle=dropdown]").on("click.nav.notifications.dropdown.close",function(){e.$dropdown.hasClass("open")&&(c.closeDropdown(),t.sendEvent("background","close"))}),this.configEndpoint(),this.load()},closeDropdown:function(){this.selectors.$icon.add(this.selectors.$dropdown).removeClass("open")},openDropdown:function(){clearMenus(),r(),this.selectors.$icon.add(this.selectors.$dropdown).addClass("open")},configEndpoint:function(){c.endpoint=c.endpoint||"",""===this.endpoint&&(this.endpoint=window.blizzard.projectUrl+"/notification/list")},load:function(){var e=window.blizzard.locale;e.split("-").length>1&&(e=e.split("-"),e=e[0]+"_"+e[1].toUpperCase()),i.ajax({headers:{Accept:"application/json"},type:"GET",url:c.endpoint,data:{locale:e,community:window.blizzard.project}}).done(function(e){var t=e.notifications||[];if(t.length>0){c.showIcon();var n=!1;if(c.config.allowMultiNotifications)for(var o=0;o<t.length;o++)c.populate(t[o])&&(n=!0);else c.populate(t[0])&&(n=!0);n&&(c.openDropdown(),c.analytics.sendEvent("bell","auto"))}c.selectors.notification=i(".nav-notification")})},showIcon:function(){this.selectors.$icon.show()},populate:function(e){var t=this;this.selectors.$dropdown.append(this.NavNotificationComponent(e,t));var n=!c.get(e.id,"dismiss");return n},get:function(e,t){var n="notification."+e;return a.hasKey(n)?a.get(n)[t]:null},set:function(e,t,n){var o="notification."+e,i=a.get(o)||{};i[t]=n,a.set(o,i)},NavNotificationComponent:function(e,t){function n(t){var n=i("<div>",{"class":"nav-notification-header"});e.img&&n.append("<img class='nav-notification-img' src='"+e.img.url+"'/>"),n.append("<h1 class='nav-notification-title'>"+e.title+"</h1>"),t.append(n)}function a(t){if(e.content&&t.append("<p class='nav-notification-content'>"+e.content+"</p>"),e.httpLink){var n=i("<a class='nav-notification-btn nav-item nav-btn nav-btn-block' href='"+e.httpLink.link+"'>"+e.httpLink.content+"</a>");t.append(n)}}var r=this.analytics,s=(this.selectors,i("<div>",{"class":"nav-notification"}).attr("data-notification-id",e.id)),l=i("<a class='nav-notification-remove'><i class='nav-close'></i></a>");return s.append(l),n(s),a(s),s.find(".nav-notification-remove, .nav-notification-btn").click(function(e){o(e),c.closeDropdown(),i(this).hasClass("nav-notification-remove")?r.sendEvent("dismiss","close"):r.sendEvent("button","click"),c.set(s.attr("data-notification-id"),"dismiss",!0)}),r.notification.title=e.title,r.notification.id=e.id,s}};t.exports=c}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./mobile":5,"@blizzard/satchel":11}],8:[function(e,t,n){var o={};o.init=function(e){window.blizzard.loggedIn&&(this.self=this,this.counters=$(e),this.ajaxSettings={timeout:3e3,url:window.blizzard.secureSupportUrl+"update/json",ifModified:!0,global:!1,dataType:"jsonp",jsonpCallback:"getStatus",contentType:"application/json; charset=utf-8",crossDomain:!0,cache:!1,data:{supportToken:window.supportToken}},this.loadStatus())},o.loadStatus=function(e){if(this.counters.length){var t=this,n=this.getUpdates(),e=e||this.handleResponse;n.done(function(e,n){t.handleResponse.call(t,e,n)})}},o.handleResponse=function(e,t){"notmodified"!==t&&this.updateTotal(e.total)},o.getUpdates=function(){return $.ajax(this.ajaxSettings)},o.updateTotal=function(e){e="number"==typeof e?e:0,this.counters.text(e)[e>0?"removeClass":"addClass"]("no-updates")},t.exports=o},{}],9:[function(e,t,n){function o(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2])}return e.apply(t,n)}function i(e,t){for(var n=-1,o=Array(e);++n<e;)o[n]=t(n);return o}function a(e,t){return function(n){return e(t(n))}}function r(e,t){var n=B(e)||h(e)?i(e.length,String):[],o=n.length,a=!!o;for(var r in e)!t&&!z.call(e,r)||a&&("length"==r||f(r,o))||n.push(r);return n}function c(e,t,n){var o=e[t];z.call(e,t)&&v(o,n)&&(void 0!==n||t in e)||(e[t]=n)}function s(e){if(!g(e))return M(e);var t=[];for(var n in Object(e))z.call(e,n)&&"constructor"!=n&&t.push(n);return t}function l(e,t){return t=D(void 0===t?e.length-1:t,0),function(){for(var n=arguments,i=-1,a=D(n.length-t,0),r=Array(a);++i<a;)r[i]=n[t+i];i=-1;for(var c=Array(t+1);++i<t;)c[i]=n[i];return c[t]=r,o(e,this,c)}}function d(e,t,n,o){n||(n={});for(var i=-1,a=t.length;++i<a;){var r=t[i],s=o?o(n[r],e[r],r,n,e):void 0;c(n,r,void 0===s?e[r]:s)}return n}function u(e){return l(function(t,n){var o=-1,i=n.length,a=i>1?n[i-1]:void 0,r=i>2?n[2]:void 0;for(a=e.length>3&&"function"==typeof a?(i--,a):void 0,r&&p(n[0],n[1],r)&&(a=i<3?void 0:a,i=1),t=Object(t);++o<i;){var c=n[o];c&&e(t,c,o,a)}return t})}function f(e,t){return t=null==t?E:t,!!t&&("number"==typeof e||S.test(e))&&e>-1&&e%1==0&&e<t}function p(e,t,n){if(!k(n))return!1;var o=typeof t;return!!("number"==o?m(n)&&f(t,n.length):"string"==o&&t in n)&&v(n[t],e)}function g(e){var t=e&&e.constructor,n="function"==typeof t&&t.prototype||N;return e===n}function v(e,t){return e===t||e!==e&&t!==t}function h(e){return w(e)&&z.call(e,"callee")&&(!O.call(e,"callee")||T.call(e)==L)}function m(e){return null!=e&&b(e.length)&&!y(e)}function w(e){return C(e)&&m(e)}function y(e){var t=k(e)?T.call(e):"";return t==R||t==$}function b(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=E}function k(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function C(e){return!!e&&"object"==typeof e}function x(e){return m(e)?r(e):s(e)}var E=9007199254740991,L="[object Arguments]",R="[object Function]",$="[object GeneratorFunction]",S=/^(?:0|[1-9]\d*)$/,N=Object.prototype,z=N.hasOwnProperty,T=N.toString,O=N.propertyIsEnumerable,M=a(Object.keys,Object),D=Math.max,j=!O.call({valueOf:1},"valueOf"),B=Array.isArray,A=u(function(e,t){if(j||g(t)||m(t))return void d(t,x(t),e);for(var n in t)z.call(t,n)&&c(e,n,t[n])});t.exports=A},{}],10:[function(e,t,n){String.prototype.trim||!function(){var e=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;String.prototype.trim=function(){return this.replace(e,"")}}();var o=e("lodash.assign"),i={cache:{},create:function(e,t,n){n=o({},n),n.expires=n.expires||1;var a=n.expires;a="number"==typeof n.expires?n.expires:1,n.expires=new Date,n.expires.setTime(n.expires.getTime()+36e5*a);var r=[encodeURIComponent(e)+"=",n.escape?encodeURIComponent(t):t,"; expires="+n.expires.toUTCString(),n.path?"; path="+n.path:"",n.domain?"; domain="+n.domain:"",n.secure?"; secure":""];document.cookie=r.join(""),i.cache&&(n.expires.getTime()<(new Date).getTime()?delete i.cache[e]:i.cache[e]=t)},read:function(e){if(i.cache[e])return i.cache[e];if(null==document.cookie)return null;for(var t={},n=document.cookie.split(";"),o=0;o<n.length;o++){var a=n[o].split("=");a.length>=2&&(t[a[0].trim()]=a[1])}return i.cache=t,t[e]||null},erase:function(e,t){t?t.expires=-1:t={expires:-1},i.create(e,0,t)},isSupported:function(){return document.cookie.indexOf("=")!==-1}};t.exports=i},{"lodash.assign":9}],11:[function(t,n,o){!function(t,o){"function"==typeof e&&e.amd?e([],o):"object"==typeof n&&n.exports?n.exports=o():t.Satchel=o()}(this,function(){var e={isSupported:!1,get:function(t){if(e.isSupported&&t){var n=localStorage.getItem(t);try{return JSON.parse(n)}catch(o){return n}}return null},getAll:function(t){var n=[];if(!e.isSupported)return n;for(var o=0,i=localStorage.length,a=null;o<i;o++)a=localStorage.key(o),t&&0!==a.indexOf(t)||n.push({key:a,value:e.get(a)});return n},getKeys:function(t){var n=[];if(!e.isSupported)return n;for(var o=0,i=localStorage.length,a=null;o<i;o++)a=localStorage.key(o),t&&0!==a.indexOf(t)||n.push(a);return n},hasKey:function(t){return!(!e.isSupported||!t)&&(localStorage.getItem(t)&&!0||!1)},set:function(t,n){if(e.isSupported&&t){try{localStorage.setItem(t,JSON.stringify(n||""))}catch(o){return!1}return!0}return!1},remove:function(t){return!(!e.isSupported||!t||(localStorage.removeItem(t),0))},clear:function(){return!!e.isSupported&&(localStorage.clear(),!0)},size:function(t){return e.isSupported&&t?e.getAll(t).length:localStorage.length||0}};return window.localStorage&&(e.isSupported=!0),e})},{}]},{},[2])(2)}),function e(t,n,o){function i(r,c){if(!n[r]){if(!t[r]){var s="function"==typeof require&&require;if(!c&&s)return s(r,!0);if(a)return a(r,!0);var l=new Error("Cannot find module '"+r+"'");throw l.code="MODULE_NOT_FOUND",l}var d=n[r]={exports:{}};t[r][0].call(d.exports,function(e){var n=t[r][1][e];return i(n?n:e)},d,d.exports,e,t,n,o)}return n[r].exports}for(var a="function"==typeof require&&require,r=0;r<o.length;r++)i(o[r]);return i}({1:[function(e,t,n){!function(e,t){"use strict";if(t&&t.richMediaOverlayConfig){var n=function(e){this.campaign=null,this.config=e,this.init=function(){if(1===this.config.variant){var e=document.getElementsByClassName("BnetNav");if(1===e.length){e[0].classList.add("Rmo-BnetNav");var t=document.getElementById("nav-client-account-menu");if(t){var n=document.createElement("li");n.setAttribute("id","rmo-badge"),n.setAttribute("class","Rmo-badge-placeholder");var o=document.getElementsByClassName("Rmo-badge");1===o.length&&(n.appendChild(o[0]),t.appendChild(n))}}}"undefined"!=typeof dataLayer&&dataLayer.push({experimentId:this.config.ga_expId,experimentVariant:this.config.variant})},this.setCookie=function(e,t){document.cookie=e+"="+t+"; path=/; expires="+new Date(this.config.campaignCookieExpires).toUTCString()}};t.richMediaOverlay=new n(t.richMediaOverlayConfig),t.richMediaOverlay.init()}}(window,window.blizzard),function(e){"use strict";if(e.blizzard&&e.blizzard.richMediaOverlayConfig){var t=function(){var t=e.blizzard.richMediaOverlay,n=null,o=("rmo-"+t.config.campaignId,document.getElementsByTagName("html")[0]);this.init=function(){var e=this;if(2===t.config.variant){if(1!==t.config.watchedTeaser){t.setCookie("rmo-watched-teaser-"+t.config.campaignId,"1"),this.trackEvent("overlayTestClassic","Impression");var n=document.getElementsByClassName("Rmo-navbar-takeover");1===n.length&&n[0].addEventListener("click",function(){e.trackEvent("overlayTestClassic","Click - Continue")});var o=document.getElementsByClassName("Rmo-overlay-click-catcher");1===o.length&&o[0].addEventListener("click",function(){e.trackEvent("overlayTestClassic","Click - Ad")})}}else if(1===t.config.variant){var i=document.getElementsByClassName("Rmo-teaser"),a=document.getElementsByClassName("Rmo-teaser-container"),r=document.getElementsByClassName("Rmo-mobile-badge");1===i.length&&1===a.length&&(this.trackEvent("overlayTestRichMedia","Video Teaser"),t.setCookie("rmo-watched-teaser-"+t.config.campaignId,"1"));var c=document.getElementsByClassName("Rmo-badge");1===c.length&&c[0].addEventListener("click",function(t){e.toggle("badge-click")}),1===r.length&&r[0].addEventListener("click",function(t){e.toggle("badge-mobile-click")});var s=document.getElementsByClassName("Rmo-overlay-content-close");1===s.length&&s[0].addEventListener("click",function(t){e.close("cross-click")});var l=document.getElementsByClassName("Rmo-overlay-heroes-block");1===l.length&&l[0].addEventListener("click",function(){e.trackEvent("overlayTestRichMedia","Click - Heroes Block")});var d=document.getElementsByClassName("Rmo-overlay-button");1===d.length&&d[0].addEventListener("click",function(){e.trackEvent("overlayTestRichMedia","Click - Button")});var u=document.getElementsByClassName("Rmo-overlay-content");1===u.length&&u[0].addEventListener("click",function(t){for(var n=t.target;n;){if(n instanceof HTMLAnchorElement&&n.getAttribute("href"))return;n=n.parentNode}e.trackEvent("overlayTestRichMedia","Click - Other")})}},this.open=function(t){o.classList.contains("Rmo-open")===!1&&(e.scrollTo(0,0),o.classList.add("Rmo-open"),"badge-click"!==t&&"badge-mobile-click"!==t||this.trackEvent("overlayTestRichMedia","Open"))},this.close=function(e){o.classList.contains("Rmo-open")===!0&&(o.classList.contains("Rmo-animation")||o.classList.add("Rmo-animation"),n&&(clearTimeout(n),n=null),n=setTimeout(function(){o.classList.remove("Rmo-animation")},300),o.classList.remove("Rmo-open"),"cross-click"===e?this.trackEvent("overlayTestRichMedia","Close - X"):"badge-click"===e?this.trackEvent("overlayTestRichMedia","Close - Badge"):this.trackEvent("overlayTestRichMedia","Close - Other"))},this.toggle=function(e){o.classList.contains("Rmo-open")===!1?this.open(e):this.close(e)},this.resizeVideoEvent=function(t,n){return e.blizzard.richMediaOverlayResizeVideoEvent(t,n)},this.trackEvent=function(e,t){"undefined"!=typeof dataLayer&&dataLayer.push({event:e,"analytics.eventPlacement":t})}};e.blizzard.richMediaOverlay.campaign=new t,e.blizzard.richMediaOverlay.campaign.init()}}(window)},{}]},{},[1]);