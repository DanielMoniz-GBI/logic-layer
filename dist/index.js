!function(e){var n={};function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)o.d(t,r,function(n){return e[n]}.bind(null,r));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="",o(o.s=0)}([function(e,n,o){"use strict";o.r(n);var t=(console.log("Loading Core module..."),{addPlugin:function(e){this.plugins[e.name]=e,console.log("Plugin added:",e.name)},dispatch:function(e,n,o){console.log(`Core - dispatching: ${e}, ${n}`);const t=this.plugins[e];if(void 0===t)return`Plugin ${e} does not exist.`;const r=t[n];return void 0===r?`Method ${n} does not exist in plugin ${e}.`:"function"!=typeof r?`${n} in plugin ${e} is not a method, but a ${typeof r}.`:r.apply(t,o)},plugins:{}});var r=(console.log("Loading Events module..."),{name:"events",description:"Events module",testFunc:function(e,n,o){console.log("In test func with args:",e,n,o)}});var l=(console.log("Loading Search module..."),{name:"search",description:"Search module",testFunc:function(e,n,o){console.log("In Search.testFunc")}});console.log(t),console.log("Core module loaded."),console.log(r),console.log("Events module loaded."),console.log(l),console.log("Search module loaded."),t.addPlugin(r),t.addPlugin(l),t.dispatch("events","testFunc",["arg1","arg2","arg3"]),t.dispatch("search","testFunc",["arg1","arg2"]),t.dispatch("asdf","testFunc"),t.dispatch("search","asdfsfgj"),t.dispatch("events","asdfsfgj")}]);