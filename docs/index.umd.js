!function(i,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):i.Scroller=t()}(this,function(){var i=function(i){var t=i.container,n=i.offset;void 0===n&&(n=.5);var e=i.scenes;this.observer=null,this.i={},this.t=t,this.s=n+.01,this.o=0,this.h=e};return i.prototype.on=function(i,t){(this.i[i]||(this.i[i]=[])).push(t)},i.prototype.off=function(i,t){this.i[i]&&this.i[i].splice(this.i[i].indexOf(t)>>>0,1)},i.prototype.u=function(i,t){(this.i[i]||[]).slice().map(function(i){i(t)})},i.prototype.init=function(){var i=this,t=[];this.observer=new IntersectionObserver(function(n){var e=i.v();n.forEach(function(n){var s=n.target,o={bounds:n.boundingClientRect,element:s,index:t.indexOf(s),isScrollingDown:e},h=s===i.t?"container":"scene";i.u(n.isIntersecting?h+":enter":h+":exit",o)})},{rootMargin:-100*(1-this.s)+"% 0px "+-100*this.s+"%"});for(var n=0;n<this.h.length;n++){var e=this.h[n];t.push(e),this.observer.observe(e)}this.t&&this.observer.observe(this.t),this.u("init")},i.prototype.v=function(){var i=window.pageYOffset,t=i>this.o;return this.o=i,t},i});
//# sourceMappingURL=index.umd.js.map
