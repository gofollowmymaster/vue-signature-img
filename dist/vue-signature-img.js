!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var i in n)("object"==typeof exports?exports:t)[i]=n[i]}}("undefined"!=typeof self?self:this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=2)}([function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=function(){function t(e,n,r){i(this,t),this.x=e,this.y=n,this.time=r||Date.now()}return r(t,[{key:"distanceTo",value:function(t){return Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2))}},{key:"equals",value:function(t){return this.x===t.x&&this.y===t.y&&this.time===t.time}},{key:"velocityFrom",value:function(t){return this.time!==t.time?this.distanceTo(t)/(this.time-t.time):0}}]),t}();e.a=o},function(t,e,n){"use strict";function i(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){function i(r,o){try{var a=e[r](o),s=a.value}catch(t){return void n(t)}if(!a.done)return Promise.resolve(s).then(function(t){i("next",t)},function(t){i("throw",t)});t(s)}return i("next")})}}var r=n(10),o=n.n(r),a=n(13),s=n(17),u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t};e.a={name:"vueSignature",props:{customStyle:{type:Object,default:function(){return{}}},img:{type:String,default:""},brushWidth:{type:Number,default:3},options:{type:Object,default:function(){return{}}}},data:function(){return{signaturePad:{},onResizeHandler:null,ratioWidth:1,ratioHeight:1,canvasSize:{}}},computed:{brushOptions:function(){var t=u({},s.a[this.brushWidth],{minDistance:3,dotSize:.1});for(var e in t)t[e]=t[e]/this.ratioWidth;return t}},watch:{brushOptions:function(t){this.updateOptions(t)},options:{handler:function(t){var e={};Object.keys(t).filter(function(t){return!["minWidth","maxWidth","minDistance","dotSize","brushMode","brushWidth"].includes(t)}).forEach(function(n){e[n]=t[n]}),this.updateOptions(e)},deep:!0},img:function(t){this.destoryBoard(),t&&this.initBoard()}},mounted:function(){this.resizeHandler=this.resizeHandler.bind(this),this.initBoard()},methods:{initBoard:function(){var t=this;return i(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.c.handle(t.$refs.bgImg);case 2:t.canvasSize=e.sent,t.$refs.signaturePadCanvas.width=t.canvasSize.w,t.$refs.signaturePadCanvas.height=t.canvasSize.h,t.setBoardSize(),t.signature=new a.a(t.$refs.signaturePadCanvas,u({},t.options,t.brushOptions,{boardScale:t.ratioWidth})),t.$emit("loaded"),window.addEventListener("resize",t.resizeHandler);case 10:case"end":return e.stop()}},e,t)}))()},resizeHandler:function(){this.setBoardSize(),this.updateOptions({boardScale:this.ratioWidth})},setBoardSize:function(){var t=this.$refs.signaturePadCanvas.getBoundingClientRect();this.ratioWidth=this.canvasSize.w/t.width,this.ratioHeight=this.canvasSize.h/t.height,this.$refs.signaturePadCanvas.getContext("2d").restore(),this.$refs.signaturePadCanvas.getContext("2d").save(),this.$refs.signaturePadCanvas.getContext("2d").scale(this.ratioWidth,this.ratioHeight)},destoryBoard:function(){window.removeEventListener("resize",this.resizeHandler,!1)},clearBoard:function(){this.signature.clear()},switchToEraser:function(){this.signature.switchToEraser()},on:function(){this.signature._ctx.globalCompositeOperation="source-over",this.updateOptions(this.brushOptions),this.signature.on()},off:function(){this.signature._ctx.globalCompositeOperation="source-over",this.updateOptions(this.brushOptions),this.signature.off()},toDataUrl:function(){var t=Object(s.b)(this.$refs.signaturePadCanvas);return t.getContext("2d").globalCompositeOperation="destination-over",t.getContext("2d").drawImage(this.$refs.bgImg,0,0),t.getContext("2d").scale(this.ratioWidth,this.ratioHeight),t.toDataURL()},updateOptions:function(t){var e=this;Object.keys(t).forEach(function(n){e.signature&&e.signature.setPenOption(n,t[n])})},toData:function(){return this.signature.toData()},fromData:function(t){return this.signature.fromData(t)}},render:function(t){var e=this.customStyle;return t("div",{style:u({},e),attrs:{class:"signature-board"}},[t("canvas",{style:{width:"100%",height:"100%"},ref:"signaturePadCanvas"}),t("img",{style:{width:"100%",display:"block",position:"absolute",top:0,left:0,zIndex:-1},attrs:{src:this.img,id:"bg-img"},ref:"bgImg"})])}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(3);i.a.install=function(t){return t.component(i.a.name,i.a)};"undefined"!=typeof window&&window.Vue&&function(t){arguments.length>1&&void 0!==arguments[1]&&arguments[1];t.component(i.a.name,i.a)}(window.Vue),e.default=i.a},function(t,e,n){"use strict";function i(t){n(4)}var r=n(1),o=n(9),a=i,s=o(r.a,null,!1,a,"data-v-2358df41",null);e.a=s.exports},function(t,e,n){var i=n(5);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n(7)("0eaac190",i,!0,{})},function(t,e,n){e=t.exports=n(6)(!1),e.push([t.i,".signature-board[data-v-2358df41]{position:relative;top:0;left:0;height:100%}",""])},function(t,e){function n(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var o=i(r);return[n].concat(r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"})).concat([o]).join("\n")}return[n].join("\n")}function i(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var i=n(e,t);return e[2]?"@media "+e[2]+"{"+i+"}":i}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var i={},r=0;r<this.length;r++){var o=this[r][0];"number"==typeof o&&(i[o]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&i[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){function i(t){for(var e=0;e<t.length;e++){var n=t[e],i=h[n.id];if(i){i.refs++;for(var r=0;r<i.parts.length;r++)i.parts[r](n.parts[r]);for(;r<n.parts.length;r++)i.parts.push(o(n.parts[r]));i.parts.length>n.parts.length&&(i.parts.length=n.parts.length)}else{for(var a=[],r=0;r<n.parts.length;r++)a.push(o(n.parts[r]));h[n.id]={id:n.id,refs:1,parts:a}}}}function r(){var t=document.createElement("style");return t.type="text/css",l.appendChild(t),t}function o(t){var e,n,i=document.querySelector("style["+m+'~="'+t.id+'"]');if(i){if(v)return p;i.parentNode.removeChild(i)}if(g){var o=f++;i=d||(d=r()),e=a.bind(null,i,o,!1),n=a.bind(null,i,o,!0)}else i=r(),e=s.bind(null,i),n=function(){i.parentNode.removeChild(i)};return e(t),function(i){if(i){if(i.css===t.css&&i.media===t.media&&i.sourceMap===t.sourceMap)return;e(t=i)}else n()}}function a(t,e,n,i){var r=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=w(e,r);else{var o=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function s(t,e){var n=e.css,i=e.media,r=e.sourceMap;if(i&&t.setAttribute("media",i),y.ssrId&&t.setAttribute(m,e.id),r&&(n+="\n/*# sourceURL="+r.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var u="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!u)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=n(8),h={},l=u&&(document.head||document.getElementsByTagName("head")[0]),d=null,f=0,v=!1,p=function(){},y=null,m="data-vue-ssr-id",g="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,n,r){v=n,y=r||{};var o=c(t,e);return i(o),function(e){for(var n=[],r=0;r<o.length;r++){var a=o[r],s=h[a.id];s.refs--,n.push(s)}e?(o=c(t,e),i(o)):o=[];for(var r=0;r<n.length;r++){var s=n[r];if(0===s.refs){for(var u=0;u<s.parts.length;u++)s.parts[u]();delete h[s.id]}}}};var w=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var n=[],i={},r=0;r<e.length;r++){var o=e[r],a=o[0],s=o[1],u=o[2],c=o[3],h={id:t+":"+r,css:s,media:u,sourceMap:c};i[a]?i[a].parts.push(h):n.push(i[a]={id:a,parts:[h]})}return n}},function(t,e){t.exports=function(t,e,n,i,r,o){var a,s=t=t||{},u=typeof t.default;"object"!==u&&"function"!==u||(a=t,s=t.default);var c="function"==typeof s?s.options:s;e&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0),n&&(c.functional=!0),r&&(c._scopeId=r);var h;if(o?(h=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},c._ssrRegister=h):i&&(h=i),h){var l=c.functional,d=l?c.render:c.beforeCreate;l?(c._injectStyles=h,c.render=function(t,e){return h.call(e),d(t,e)}):c.beforeCreate=d?[].concat(d,h):[h]}return{esModule:a,exports:s,options:c}}},function(t,e,n){t.exports=n(11)},function(t,e,n){var i=function(){return this}()||Function("return this")(),r=i.regeneratorRuntime&&Object.getOwnPropertyNames(i).indexOf("regeneratorRuntime")>=0,o=r&&i.regeneratorRuntime;if(i.regeneratorRuntime=void 0,t.exports=n(12),r)i.regeneratorRuntime=o;else try{delete i.regeneratorRuntime}catch(t){i.regeneratorRuntime=void 0}},function(t,e){!function(e){"use strict";function n(t,e,n,i){var o=e&&e.prototype instanceof r?e:r,a=Object.create(o.prototype),s=new f(i||[]);return a._invoke=c(t,n,s),a}function i(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}function r(){}function o(){}function a(){}function s(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function u(t){function e(n,r,o,a){var s=i(t[n],t,r);if("throw"!==s.type){var u=s.arg,c=u.value;return c&&"object"==typeof c&&g.call(c,"__await")?Promise.resolve(c.__await).then(function(t){e("next",t,o,a)},function(t){e("throw",t,o,a)}):Promise.resolve(c).then(function(t){u.value=t,o(u)},a)}a(s.arg)}function n(t,n){function i(){return new Promise(function(i,r){e(t,n,i,r)})}return r=r?r.then(i,i):i()}var r;this._invoke=n}function c(t,e,n){var r=W;return function(o,a){if(r===C)throw new Error("Generator is already running");if(r===O){if("throw"===o)throw a;return p()}for(n.method=o,n.arg=a;;){var s=n.delegate;if(s){var u=h(s,n);if(u){if(u===P)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===W)throw r=O,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=C;var c=i(t,e,n);if("normal"===c.type){if(r=n.done?O:S,c.arg===P)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=O,n.method="throw",n.arg=c.arg)}}}function h(t,e){var n=t.iterator[e.method];if(n===y){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=y,h(t,e),"throw"===e.method))return P;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return P}var r=i(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,P;var o=r.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=y),e.delegate=null,P):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,P)}function l(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function d(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function f(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(l,this),this.reset(!0)}function v(t){if(t){var e=t[x];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(g.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=y,e.done=!0,e};return i.next=i}}return{next:p}}function p(){return{value:y,done:!0}}var y,m=Object.prototype,g=m.hasOwnProperty,w="function"==typeof Symbol?Symbol:{},x=w.iterator||"@@iterator",_=w.asyncIterator||"@@asyncIterator",b=w.toStringTag||"@@toStringTag",E="object"==typeof t,k=e.regeneratorRuntime;if(k)return void(E&&(t.exports=k));k=e.regeneratorRuntime=E?t.exports:{},k.wrap=n;var W="suspendedStart",S="suspendedYield",C="executing",O="completed",P={},L={};L[x]=function(){return this};var T=Object.getPrototypeOf,D=T&&T(T(v([])));D&&D!==m&&g.call(D,x)&&(L=D);var M=a.prototype=r.prototype=Object.create(L);o.prototype=M.constructor=a,a.constructor=o,a[b]=o.displayName="GeneratorFunction",k.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===o||"GeneratorFunction"===(e.displayName||e.name))},k.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,a):(t.__proto__=a,b in t||(t[b]="GeneratorFunction")),t.prototype=Object.create(M),t},k.awrap=function(t){return{__await:t}},s(u.prototype),u.prototype[_]=function(){return this},k.AsyncIterator=u,k.async=function(t,e,i,r){var o=new u(n(t,e,i,r));return k.isGeneratorFunction(e)?o:o.next().then(function(t){return t.done?t.value:o.next()})},s(M),M[b]="Generator",M[x]=function(){return this},M.toString=function(){return"[object Generator]"},k.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var i=e.pop();if(i in t)return n.value=i,n.done=!1,n}return n.done=!0,n}},k.values=v,f.prototype={constructor:f,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=y,this.done=!1,this.delegate=null,this.method="next",this.arg=y,this.tryEntries.forEach(d),!t)for(var e in this)"t"===e.charAt(0)&&g.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=y)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){function e(e,i){return o.type="throw",o.arg=t,n.next=e,i&&(n.method="next",n.arg=y),!!i}if(this.done)throw t;for(var n=this,i=this.tryEntries.length-1;i>=0;--i){var r=this.tryEntries[i],o=r.completion;if("root"===r.tryLoc)return e("end");if(r.tryLoc<=this.prev){var a=g.call(r,"catchLoc"),s=g.call(r,"finallyLoc");if(a&&s){if(this.prev<r.catchLoc)return e(r.catchLoc,!0);if(this.prev<r.finallyLoc)return e(r.finallyLoc)}else if(a){if(this.prev<r.catchLoc)return e(r.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<r.finallyLoc)return e(r.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&g.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var r=i;break}}r&&("break"===t||"continue"===t)&&r.tryLoc<=e&&e<=r.finallyLoc&&(r=null);var o=r?r.completion:{};return o.type=t,o.arg=e,r?(this.method="next",this.next=r.finallyLoc,P):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),P},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),d(n),P}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var i=n.completion;if("throw"===i.type){var r=i.arg;d(n)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:v(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=y),P}}}(function(){return this}()||Function("return this")())},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}/*!
 * Signature Pad v3.0.0-beta.4 | https://github.com/szimek/signature_pad
 * (c) 2020 Szymon Nowak | Released under the MIT license
 */
function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:250,n=0,i=null,r=void 0,o=void 0,a=void 0,s=function(){n=Date.now(),i=null,r=t.apply(o,a),i||(o=null,a=[])};return function(){var u=Date.now(),c=e-(u-n);o=this;for(var h=arguments.length,l=Array(h),d=0;d<h;d++)l[d]=arguments[d];return a=l,c<=0||c>e?(i&&(clearTimeout(i),i=null),n=u,r=t.apply(o,a),i||(o=null,a=[])):i||(i=window.setTimeout(s,c)),r}}var o=n(14),a=n(0),s=n(16),u=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),c=function(){function t(e,n){var a=this,u=n.parmFilterWeight,c=void 0===u?.7:u,h=n.minWidth,l=void 0===h?.5:h,d=n.maxWidth,f=void 0===d?2.5:d,v=n.throttleTime,p=void 0===v?16:v,y=n.minDistance,m=void 0===y?5:y,g=n.dotSize,w=void 0===g?(l+f)/2:g,x=n.penColor,_=void 0===x?"black":x,b=n.touchsStrategy,E=void 0===b?"mix":b,k=n.boardScale,W=void 0===k?1.5:k,S=n.onBegin,C=void 0===S?function(){}:S,O=n.onEnd,P=void 0===O?function(){}:O,L=n.backgroundColor,T=void 0===L?"rgba(0,0,0,0)":L;i(this,t),this.canvas=e,this.onBegin=C,this.onEnd=P,this.backgroundColor=T,this.minDistance=m,this._strokeMoveUpdate=p>0?r(t.prototype._strokeUpdate,p):t.prototype._strokeUpdate,E=["pressure","mix"].includes(E)&&("ontouchstart"in window||"PointerEvent"in window)?E:"speed";var D=e.getContext("2d");this._ctx=D,this.penOptions={ctx:D,parmFilterWeight:c,minWidth:l,maxWidth:f,minDistance:m,dotSize:w,penColor:_,touchsStrategy:E,boardScale:W},this.pen=new o.a(this.penOptions),this.converter=new s.a(e),this._handleMouseDown=function(t){t.preventDefault(),1!==t.which&&a._pointerId||(a._pointerId=t.pointerId||1,a._strokeBegin(t))},this._handleMouseMove=function(t){t.preventDefault(),a._pointerId==(t.pointerId||1)&&(a._lastTouch={x:t.clientX,y:t.clientY},a._strokeMoveUpdate(t))},this._handleMouseUp=function(t){1===t.which&&a._pointerId==(t.pointerId||1)&&(a._pointerId=null,a._lastTouch.x==t.clientX&&a._lastTouch.y==t.clientY&&a._strokeEnd(t))},this._handleTouchStart=function(t){if(t.preventDefault(),1===t.targetTouches.length){a._touchStarted=!0;var e=t.changedTouches[0];a._lastTouch={x:e.clientX,y:e.clientY},a._strokeBegin(e)}},this._handleTouchMove=function(t){if(t.preventDefault(),a._touchStarted){var e=t.targetTouches[0];a._lastTouch={x:e.clientX,y:e.clientY},a._strokeMoveUpdate(e)}},this._handleTouchEnd=function(t){if(t.target===a.canvas&&a._touchStarted){t.preventDefault();var e=t.changedTouches[0];a._lastTouch.x==e.clientX&&a._lastTouch.y==e.clientY&&(a._strokeEnd(e),a._touchStarted=!1)}},this.clear(),this.on()}return u(t,[{key:"setPenOption",value:function(t,e){this.pen.setOption(t,e)}},{key:"clear",value:function(){var t=this._ctx,e=this.canvas;t.fillStyle=this.backgroundColor,t.clearRect(0,0,e.width,e.height),t.fillRect(0,0,e.width,e.height),this._data=[],this.pen.reset(this.penOptions),this._isEmpty=!0}},{key:"on",value:function(){this.canvas.style.touchAction="none",this.canvas.style.msTouchAction="none",this._ctx.globalCompositeOperation="source-over",window.PointerEvent?this._handlePointerEvents():(this._handleMouseEvents(),"ontouchstart"in window&&this._handleTouchEvents())}},{key:"off",value:function(){this._ctx.globalCompositeOperation="source-over",this.canvas.style.touchAction="auto",this.canvas.style.msTouchAction="auto",this.canvas.removeEventListener("pointerdown",this._handleMouseDown),this.canvas.removeEventListener("pointermove",this._handleMouseMove),document.removeEventListener("pointerup",this._handleMouseUp),this.canvas.removeEventListener("mousedown",this._handleMouseDown),this.canvas.removeEventListener("mousemove",this._handleMouseMove),document.removeEventListener("mouseup",this._handleMouseUp),this.canvas.removeEventListener("touchstart",this._handleTouchStart),this.canvas.removeEventListener("touchmove",this._handleTouchMove),this.canvas.removeEventListener("touchend",this._handleTouchEnd)}},{key:"isEmpty",value:function(){return this._isEmpty}},{key:"switchToEraser",value:function(){this._ctx.globalCompositeOperation="destination-out",this.pen.setOption("minWidth",10),this.pen.setOption("maxWidth",10)}},{key:"_strokeBegin",value:function(t){var e={penOptions:this.pen.outputOptions(),points:[]};"function"==typeof this.onBegin&&this.onBegin(t),this._data.push(e),this.pen.newOperation(),this._strokeUpdate(t),this._isEmpty=!1}},{key:"_strokeUpdate",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(0===this._data.length)return void this._strokeBegin(t);var n=t.clientX,i=t.clientY,r=this._data[this._data.length-1],o=r.points,a=o.length>0&&o[o.length-1],s=this._createPoint(n,i);s.pressure=this._getPressure(t),s.type=this._setPointType(e,a),s.isLastPointTooClose=!!a&&s.distanceTo(a)<=this.minDistance,this._isNeedDraw(s)&&(this.pen.draw(s),o.push({time:s.time,x:s.x,y:s.y,type:s.type,pressure:s.pressure}))}},{key:"_getPressure",value:function(t){var e=t.pressure||t.force;return e>.5?e:0}},{key:"_isNeedDraw",value:function(t){return"start"===t.type||"start"!==t.type&&!t.isLastPointTooClose||"end"==t.type}},{key:"_setPointType",value:function(t,e){return t&&this._data[this._data.length-1].points.length>5?"end":e?"common":"start"}},{key:"_strokeEnd",value:function(t){this._strokeUpdate(t,!0),"function"==typeof this.onEnd&&this.onEnd(t)}},{key:"_handlePointerEvents",value:function(){this._pointerId=null,this.eventType="point",this.canvas.addEventListener("pointerdown",this._handleMouseDown),this.canvas.addEventListener("pointermove",this._handleMouseMove),document.addEventListener("pointerup",this._handleMouseUp)}},{key:"_handleMouseEvents",value:function(){this._pointerId=null,this.eventType="mouse",this.canvas.addEventListener("mousedown",this._handleMouseDown),this.canvas.addEventListener("mousemove",this._handleMouseMove),document.addEventListener("mouseup",this._handleMouseUp)}},{key:"_handleTouchEvents",value:function(){this._touchStarted=!1,this.eventType="touch",this.canvas.addEventListener("touchstart",this._handleTouchStart),this.canvas.addEventListener("touchmove",this._handleTouchMove),this.canvas.addEventListener("touchend",this._handleTouchEnd)}},{key:"_createPoint",value:function(t,e){var n=this.canvas.getBoundingClientRect();return new a.a(t-n.left,e-n.top,(new Date).getTime())}},{key:"fromDataURL",value:function(t){var e=(arguments.length>1&&void 0!==arguments[1]&&arguments[1],arguments[2]);this.converter.fromDataURL(t,{},e),this._isEmpty=!1}},{key:"toDataURL",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"image/png",e=arguments[1];this.converter.toDataURL(t,e)}},{key:"fromData",value:function(t){this.clear(),this.converter.fromData(t,this.pen),this._data=t,this._isEmpty=!1}},{key:"toData",value:function(){return this._data}}]),t}();e.a=c},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=n(15),o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(){function t(e){i(this,t),this.reset(e)}return o(t,[{key:"reset",value:function(t){var e=t.touchsStrategy,n=void 0===e?"mix":e,i=t.parmFilterWeight,r=void 0===i?.7:i,o=t.defaultLastVelocity,a=void 0===o?0:o,s=t.minWidth,u=void 0===s?.5:s,c=t.maxWidth,h=void 0===c?2.5:c,l=t.ctx,d=t.boardScale,f=void 0===d?1:d,v=t.lastWidth,p=void 0===v?(u+h)/10:v,y=t.minDistance,m=void 0===y?5:y,g=t.dotSize,w=void 0===g?.2:g,x=t.penColor,_=void 0===x?"black":x;this.touchsStrategy=n,this.parmFilterWeight=r,this.defaultLastVelocity=this.lastVelocity=a,this.lastWidth=p,this.maxWidth=h,this.minWidth=u,this.boardScale=f,this.minDistance=m,this.dotSize=w,this.penColor=_,this._lastPoints=[],this.ctx=l}},{key:"outputOptions",value:function(){return{touchsStrategy:this.touchsStrategy,parmFilterWeight:this.parmFilterWeight,lastVelocity:this.defaultLastVelocity,lastWidth:(this.minWidth+this.maxWidth)/10,maxWidth:this.maxWidth,minWidth:this.minWidth,boardScale:this.boardScale,minDistance:this.minDistance,dotSize:this.dotSize,penColor:this.penColor}}},{key:"newOperation",value:function(){this._lastPoints=[],this.lastVelocity=this.defaultLastVelocity,this.lastWidth=(this.minWidth+this.maxWidth)/10,this.ctx.fillStyle=this.penColor}},{key:"setOption",value:function(t,e){this[t]=e}},{key:"draw",value:function(t){var e=this.addPoint(t);"start"===t.type?this.drawDot(t):e&&this.drawCurve(e)}},{key:"addPoint",value:function(t){var e=this._lastPoints;if(e.push(t),e.length>2){3===e.length&&e.unshift(e[0]);var n=this.calculateCurveWidths(e[1],e[2],t),i=r.a.fromPoints(e,n);return e.shift(),i}return null}},{key:"calculateCurveWidths",value:function(t,e,n){var i=1,r=n.pressure,o="end"==n.type;if("pressure"==this.touchsStrategy&&r)r*=r,i=r;else if("mix"==this.touchsStrategy&&r){var a=e.velocityFrom(t);r/=2,i=r/(this.parmFilterWeight*Math.pow(a,2)+(1-this.parmFilterWeight)*this.lastVelocity+1)}else{var s=e.velocityFrom(t);i=1/(this.parmFilterWeight*Math.pow(s,2)+(1-this.parmFilterWeight)*this.lastVelocity+1)}var u=o?this.minWidth:this.strokeWidth(i),c={end:u,start:this.lastWidth};return this.lastVelocity=i,this.lastWidth=u,c}},{key:"strokeWidth",value:function(t){return Math.max(this.maxWidth*t,this.minWidth)}},{key:"drawCurveSegment",value:function(t,e,n){var i=this.ctx;i.moveTo(t,e),i.arc(t,e,n,0,2*Math.PI,!1)}},{key:"drawCurve",value:function(t){var e=this.ctx,n=t.endWidth-t.startWidth,i=Math.ceil(2.5*t.length());e.beginPath(),e.fillStyle=this.penColor;for(var r=0;r<i;r+=1){var o=r/i,a=o*o,s=a*o,u=1-o,c=u*u,h=c*u,l=h*t.startPoint.x;l+=3*c*o*t.control1.x,l+=3*u*a*t.control2.x,l+=s*t.endPoint.x;var d=h*t.startPoint.y;d+=3*c*o*t.control1.y,d+=3*u*a*t.control2.y,d+=s*t.endPoint.y;var f=Math.min(t.startWidth+o*n,this.maxWidth);this.drawCurveSegment(l,d,f)}e.closePath(),e.fill()}},{key:"drawDot",value:function(t){var e=this.ctx,n="function"==typeof this.dotSize?this.dotSize():this.dotSize;e.beginPath(),this.drawCurveSegment(t.x,t.y,n),e.closePath(),e.fillStyle=this.penColor,e.fill()}}]),t}();e.a=a},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=n(0),o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(){function t(e,n,r,o,a,s){i(this,t),this.startPoint=e,this.control2=n,this.control1=r,this.endPoint=o,this.startWidth=a,this.endWidth=s}return o(t,[{key:"length",value:function(){for(var t=0,e=void 0,n=void 0,i=0;i<=10;i+=1){var r=i/10,o=this.point(r,this.startPoint.x,this.control1.x,this.control2.x,this.endPoint.x),a=this.point(r,this.startPoint.y,this.control1.y,this.control2.y,this.endPoint.y);if(i>0){var s=o-e,u=a-n;t+=Math.sqrt(s*s+u*u)}e=o,n=a}return t}},{key:"point",value:function(t,e,n,i,r){return e*(1-t)*(1-t)*(1-t)+3*n*(1-t)*(1-t)*t+3*i*(1-t)*t*t+r*t*t*t}}],[{key:"fromPoints",value:function(e,n){var i=this.calculateControlPoints(e[0],e[1],e[2]).c2,r=this.calculateControlPoints(e[1],e[2],e[3]).c1;return new t(e[1],i,r,e[2],n.start,n.end)}},{key:"calculateControlPoints",value:function(t,e,n){var i=t.x-e.x,o=t.y-e.y,a=e.x-n.x,s=e.y-n.y,u={x:(t.x+e.x)/2,y:(t.y+e.y)/2},c={x:(e.x+n.x)/2,y:(e.y+n.y)/2},h=Math.sqrt(i*i+o*o),l=Math.sqrt(a*a+s*s),d=u.x-c.x,f=u.y-c.y,v=l/(h+l),p={x:c.x+d*v,y:c.y+f*v},y=e.x-p.x,m=e.y-p.y;return{c1:new r.a(u.x+y,u.y+m),c2:new r.a(c.x+y,c.y+m)}}}]),t}();e.a=a},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=n(0),o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(){function t(){i(this,t)}return o(t,[{key:"fromData",value:function(t,e){var n=!0,i=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done);n=!0){var u=a.value;!function(t){var n=t.penOptions,i=t.points,o=n.boardScale/e.boardScale;if(Object.keys(n).forEach(function(t){"boardScale"!==t&&(["minWidth","maxWidth","minDistance","dotSize"].includes(t)?e.setOption(t,n[t]*o):e.setOption(t,n[t]))}),i.length>1)for(var a=0;a<i.length;a+=1){var s=i[a],u=new r.a(s.x*o,s.y*o,s.time);0===a&&e.newOperation();var c=e.addPoint(u);c&&e.drawCurve(c)}else e.newOperation(),e.drawDot(i[0])}(u)}}catch(t){i=!0,o=t}finally{try{!n&&s.return&&s.return()}finally{if(i)throw o}}}}],[{key:"init",value:function(t){this.canvas=t}},{key:"fromDataURL",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments[2],r=new Image,o=n.ratio||window.devicePixelRatio||1,a=n.width||this.canvas.width/o,s=n.height||this.canvas.height/o;this._reset(),r.onload=function(){e._ctx.drawImage(r,0,0,a,s),i&&i()},r.onerror=function(t){i&&i(t)},r.src=t}},{key:"toDataURL",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"image/png",e=arguments[1];return this.canvas.toDataURL(t,e)}}]),t}();e.a=a},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t){var e=document.createElement("canvas"),n=e.getContext("2d");return e.width=t.width,e.height=t.height,n.drawImage(t,0,0),e}n.d(e,"c",function(){return a}),e.b=r,n.d(e,"a",function(){return s});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(){function t(){i(this,t)}return o(t,null,[{key:"getImgNaturalDimensions",value:function(t){var e,n;return t.naturalWidth?(e=t.naturalWidth,n=t.naturalHeight):(e=t.width,n=t.height),{w:e,h:n}}},{key:"handle",value:function(t){var e=this;return new Promise(function(n,i){if(e.isLoaded(t))n(e.getImgNaturalDimensions(t));else{var r=setTimeout(function(){t.onload=null,i("img load failed")},5e3);t.addEventListener("load",function(){clearTimeout(r),n(e.getImgNaturalDimensions(t))}),t.addEventListener("error",function(){clearTimeout(r),n({w:300,h:400})})}})}},{key:"isLoaded",value:function(t){return t.complete||"complete"==t.readyState||"loaded"==t.readyState}}]),t}(),s={1:{minWidth:.2,maxWidth:1.3},2:{minWidth:.3,maxWidth:2},3:{minWidth:.4,maxWidth:3.5},4:{minWidth:.5,maxWidth:3},5:{minWidth:.6,maxWidth:3.5},6:{minWidth:.7,maxWidth:4},7:{minWidth:.8,maxWidth:5},8:{minWidth:.9,maxWidth:8},9:{minWidth:1,maxWidth:10}}}])});