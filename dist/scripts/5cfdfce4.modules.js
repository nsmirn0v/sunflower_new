!function(a,b){"use strict";function c(){function a(a,c){return b.extend(new(b.extend(function(){},{prototype:a})),c)}function c(a,b){var c=b.caseInsensitiveMatch,d={originalPath:a,regexp:a},e=d.keys=[];return a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?|\*])?/g,function(a,b,c,d){var f="?"===d?d:null,g="*"===d?d:null;return e.push({name:c,optional:!!f}),b=b||"",""+(f?"":b)+"(?:"+(f?b:"")+(g&&"(.+?)"||"([^/]+)")+(f||"")+")"+(f||"")}).replace(/([\/$\*])/g,"\\$1"),d.regexp=new RegExp("^"+a+"$",c?"i":""),d}var d={};this.when=function(a,e){if(d[a]=b.extend({reloadOnSearch:!0},e,a&&c(a,e)),a){var f="/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";d[f]=b.extend({redirectTo:a},c(f,e))}return this},this.otherwise=function(a){return this.when(null,a),this},this.$get=["$rootScope","$location","$routeParams","$q","$injector","$http","$templateCache","$sce",function(c,e,f,g,h,i,j,k){function l(a,b){var c=b.keys,d={};if(!b.regexp)return null;var e=b.regexp.exec(a);if(!e)return null;for(var f=1,g=e.length;g>f;++f){var h=c[f-1],i="string"==typeof e[f]?decodeURIComponent(e[f]):e[f];h&&i&&(d[h.name]=i)}return d}function m(){var a=n(),d=q.current;a&&d&&a.$$route===d.$$route&&b.equals(a.pathParams,d.pathParams)&&!a.reloadOnSearch&&!p?(d.params=a.params,b.copy(d.params,f),c.$broadcast("$routeUpdate",d)):(a||d)&&(p=!1,c.$broadcast("$routeChangeStart",a,d),q.current=a,a&&a.redirectTo&&(b.isString(a.redirectTo)?e.path(o(a.redirectTo,a.params)).search(a.params).replace():e.url(a.redirectTo(a.pathParams,e.path(),e.search())).replace()),g.when(a).then(function(){if(a){var c,d,e=b.extend({},a.resolve);return b.forEach(e,function(a,c){e[c]=b.isString(a)?h.get(a):h.invoke(a)}),b.isDefined(c=a.template)?b.isFunction(c)&&(c=c(a.params)):b.isDefined(d=a.templateUrl)&&(b.isFunction(d)&&(d=d(a.params)),d=k.getTrustedResourceUrl(d),b.isDefined(d)&&(a.loadedTemplateUrl=d,c=i.get(d,{cache:j}).then(function(a){return a.data}))),b.isDefined(c)&&(e.$template=c),g.all(e)}}).then(function(e){a==q.current&&(a&&(a.locals=e,b.copy(a.params,f)),c.$broadcast("$routeChangeSuccess",a,d))},function(b){a==q.current&&c.$broadcast("$routeChangeError",a,d,b)}))}function n(){var c,f;return b.forEach(d,function(d){!f&&(c=l(e.path(),d))&&(f=a(d,{params:b.extend({},e.search(),c),pathParams:c}),f.$$route=d)}),f||d[null]&&a(d[null],{params:{},pathParams:{}})}function o(a,c){var d=[];return b.forEach((a||"").split(":"),function(a,b){if(0===b)d.push(a);else{var e=a.match(/(\w+)(.*)/),f=e[1];d.push(c[f]),d.push(e[2]||""),delete c[f]}}),d.join("")}var p=!1,q={routes:d,reload:function(){p=!0,c.$evalAsync(m)}};return c.$on("$locationChangeSuccess",m),q}]}function d(){this.$get=function(){return{}}}function e(a,c,d,e,f){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(g,h,i,j,k){function l(){n&&(n.$destroy(),n=null),o&&(f.leave(o),o=null)}function m(){var i=a.current&&a.current.locals,j=i&&i.$template;if(j){var m=g.$new(),r=k(m,b.noop);r.html(j),f.enter(r,null,o||h,function(){!b.isDefined(p)||p&&!g.$eval(p)||c()}),l();var s=d(r.contents()),t=a.current;if(n=t.scope=m,o=r,t.controller){i.$scope=n;var u=e(t.controller,i);t.controllerAs&&(n[t.controllerAs]=u),r.data("$ngControllerController",u),r.children().data("$ngControllerController",u)}s(n),n.$emit("$viewContentLoaded"),n.$eval(q)}else l()}var n,o,p=i.autoscroll,q=i.onload||"";g.$on("$routeChangeSuccess",m),m()}}}var f=b.module("ngRoute",["ng"]).provider("$route",c);f.provider("$routeParams",d),f.directive("ngView",e),e.$inject=["$route","$anchorScroll","$compile","$controller","$animate"]}(window,window.angular),function(a,b,c){"use strict";b.module("ngAnimate",["ng"]).config(["$provide","$animateProvider",function(d,e){var f=b.noop,g=b.forEach,h=e.$$selectors,i=1,j="$$ngAnimateState",k="ng-animate",l={running:!0};d.decorator("$animate",["$delegate","$injector","$sniffer","$rootElement","$timeout","$rootScope","$document",function(a,c,d,e,m,n){function o(a){if(a){var b=[],e={},f=a.substr(1).split(".");(d.transitions||d.animations)&&f.push("");for(var g=0;g<f.length;g++){var i=f[g],j=h[i];j&&!e[i]&&(b.push(c.get(j)),e[i]=!0)}return b}}function p(a,b,c,d,e,h,i){function l(a){if(q(),a===!0)return u(),void 0;var b=c.data(j);b&&(b.done=u,c.data(j,b)),n(B,"after",u)}function n(d,e,h){function i(a,b){var c=b+"Complete",e=d[a];e[c]=!0,(e[j]||f)();for(var g=0;g<d.length;g++)if(!d[g][c])return;h()}var j=e+"End";g(d,function(d,f){var g=function(){i(f,e)};return"before"!=e||"enter"!=a&&"move"!=a?(d[e]?d[j]=z?d[e](c,b,g):d[e](c,g):g(),void 0):(g(),void 0)})}function p(){i&&m(i,0,!1)}function q(){q.hasBeenRun||(q.hasBeenRun=!0,h())}function u(){if(!u.hasBeenRun){u.hasBeenRun=!0;var a=c.data(j);a&&(z?s(c):(a.closeAnimationTimeout=m(function(){s(c)},0,!1),c.data(j,a))),p()}}var v=c.attr("class")||"",w=v+" "+b,x=(" "+w).replace(/\s+/g,".");d||(d=e?e.parent():c.parent());var y=o(x),z="addClass"==a||"removeClass"==a,A=c.data(j)||{};if(t(c,d)||0===y.length)return q(),u(),void 0;var B=[];if(A.running&&z&&A.structural||g(y,function(d){if(!d.allowCancel||d.allowCancel(c,a,b)){var e,f=d[a];"leave"==a?(e=f,f=null):e=d["before"+a.charAt(0).toUpperCase()+a.substr(1)],B.push({before:e,after:f})}}),0===B.length)return q(),p(),void 0;var C=" "+v+" ";A.running&&(m.cancel(A.closeAnimationTimeout),s(c),r(A.animations),A.beforeComplete?(A.done||f)(!0):z&&!A.structural&&(C="removeClass"==A.event?C.replace(A.className,""):C+A.className+" "));var D=" "+b+" ";return"addClass"==a&&C.indexOf(D)>=0||"removeClass"==a&&-1==C.indexOf(D)?(q(),p(),void 0):(c.addClass(k),c.data(j,{running:!0,event:a,className:b,structural:!z,animations:B,done:l}),n(B,"before",l),void 0)}function q(a){var c=a[0];c.nodeType==i&&g(c.querySelectorAll("."+k),function(a){a=b.element(a);var c=a.data(j);c&&(r(c.animations),s(a))})}function r(a){var b=!0;g(a,function(c){a.beforeComplete||(c.beforeEnd||f)(b),a.afterComplete||(c.afterEnd||f)(b)})}function s(a){a[0]==e[0]?l.disabled||(l.running=!1,l.structural=!1):(a.removeClass(k),a.removeData(j))}function t(a,b){if(l.disabled)return!0;if(a[0]==e[0])return l.disabled||l.running;do{if(0===b.length)break;var c=b[0]==e[0],d=c?l:b.data(j),f=d&&(!!d.disabled||!!d.running);if(c||f)return f;if(c)return!0}while(b=b.parent());return!0}return e.data(j,l),n.$$postDigest(function(){n.$$postDigest(function(){l.running=!1})}),{enter:function(b,c,d,e){this.enabled(!1,b),a.enter(b,c,d),n.$$postDigest(function(){p("enter","ng-enter",b,c,d,f,e)})},leave:function(b,c){q(b),this.enabled(!1,b),n.$$postDigest(function(){p("leave","ng-leave",b,null,null,function(){a.leave(b)},c)})},move:function(b,c,d,e){q(b),this.enabled(!1,b),a.move(b,c,d),n.$$postDigest(function(){p("move","ng-move",b,c,d,f,e)})},addClass:function(b,c,d){p("addClass",c,b,null,null,function(){a.addClass(b,c)},d)},removeClass:function(b,c,d){p("removeClass",c,b,null,null,function(){a.removeClass(b,c)},d)},enabled:function(a,b){switch(arguments.length){case 2:if(a)s(b);else{var c=b.data(j)||{};c.disabled=!0,b.data(j,c)}break;case 1:l.disabled=!a;break;default:a=!l.disabled}return!!a}}}]),e.register("",["$window","$sniffer","$timeout",function(d,e,h){function j(a){P.push(a),h.cancel(E),E=h(function(){g(P,function(a){a()}),P=[],E=null,N={}},10,!1)}function k(a,b){var c=b?N[b]:null;if(!c){var e,f,h,j,k=0,m=0,n=0,o=0;g(a,function(a){if(a.nodeType==i){var b=d.getComputedStyle(a)||{};h=b[z+F],k=Math.max(l(h),k),j=b[z+G],e=b[z+H],m=Math.max(l(e),m),f=b[B+H],o=Math.max(l(f),o);var c=l(b[B+F]);c>0&&(c*=parseInt(b[B+I],10)||1),n=Math.max(c,n)}}),c={total:0,transitionPropertyStyle:j,transitionDurationStyle:h,transitionDelayStyle:e,transitionDelay:m,transitionDuration:k,animationDelayStyle:f,animationDelay:o,animationDuration:n},b&&(N[b]=c)}return c}function l(a){var c=0,d=b.isString(a)?a.split(/\s*,\s*/):[];return g(d,function(a){c=Math.max(parseFloat(a)||0,c)}),c}function m(a){var b=a.parent(),c=b.data(J);return c||(b.data(J,++O),c=O),c+"-"+a[0].className}function n(a,b){var c=m(a),d=c+" "+b,e={},f=N[d]?++N[d].total:0;if(f>0){var h=b+"-stagger",i=c+" "+h,j=!N[i];j&&a.addClass(h),e=k(a,i),j&&a.removeClass(h)}a.addClass(b);var l=k(a,d),n=Math.max(l.transitionDuration,l.animationDuration);if(0===n)return a.removeClass(b),!1;var q=(a[0],"");return l.transitionDuration>0?(a.addClass(L),q+=M+" ",o(a)):p(a),g(b.split(" "),function(a,b){q+=(b>0?" ":"")+a+"-active"}),a.data(K,{className:b,activeClassName:q,maxDuration:n,classes:b+" "+q,timings:l,stagger:e,ii:f}),!0}function o(a){a[0].style[z+G]="none"}function p(a){a[0].style[B]="none 0s"}function q(a){var b=a[0],c=z+G;b.style[c]&&b.style[c].length>0&&(b.style[c]="")}function r(a){var b=a[0],c=B;b.style[c]&&b.style[c].length>0&&(a[0].style[c]="")}function s(a,b,c){function d(a){a.stopPropagation();var b=a.originalEvent||a,d=b.$manualTimeStamp||b.timeStamp||Date.now();Math.max(d-n,0)>=m&&b.elapsedTime>=k&&c()}var f=a.data(K);if(!a.hasClass(b)||!f)return c(),void 0;var g,h=a[0],i=f.timings,j=f.stagger,k=f.maxDuration,l=f.activeClassName,m=1e3*Math.max(i.transitionDelay,i.animationDelay),n=Date.now(),o=C+" "+A,p=f.ii,q="",r=[];if(i.transitionDuration>0){var s=i.transitionPropertyStyle;if(-1==s.indexOf("all")){g=!0;var u=e.msie?"-ms-zoom":"border-spacing";q+=D+"transition-property: "+s+", "+u+"; ",q+=D+"transition-duration: "+i.transitionDurationStyle+", "+i.transitionDuration+"s; ",r.push(D+"transition-property"),r.push(D+"transition-duration")}}if(p>0){if(j.transitionDelay>0&&0===j.transitionDuration){var v=i.transitionDelayStyle;g&&(v+=", "+i.transitionDelay+"s"),q+=D+"transition-delay: "+t(v,j.transitionDelay,p)+"; ",r.push(D+"transition-delay")}j.animationDelay>0&&0===j.animationDuration&&(q+=D+"animation-delay: "+t(i.animationDelayStyle,j.animationDelay,p)+"; ",r.push(D+"animation-delay"))}if(r.length>0){var w=h.getAttribute("style")||"";h.setAttribute("style",w+" "+q)}return a.on(o,d),a.addClass(l),function(){a.off(o,d),a.removeClass(l),x(a,b);for(var c in r)h.style.removeProperty(r[c])}}function t(a,b,c){var d="";return g(a.split(","),function(a,e){d+=(e>0?",":"")+(c*b+parseInt(a,10))+"s"}),d}function u(a,b){return n(a,b)?function(c){c&&x(a,b)}:void 0}function v(a,b,c){return a.data(K)?s(a,b,c):(x(a,b),c(),void 0)}function w(a,b,c){var d=u(a,b);if(!d)return c(),void 0;var e=d;return j(function(){q(a),r(a),e=v(a,b,c)}),function(a){(e||f)(a)}}function x(a,b){a.removeClass(b),a.removeClass(L),a.removeData(K)}function y(a,c){var d="";return a=b.isArray(a)?a:a.split(/\s+/),g(a,function(a,b){a&&a.length>0&&(d+=(b>0?" ":"")+a+c)}),d}var z,A,B,C,D="";a.ontransitionend===c&&a.onwebkittransitionend!==c?(D="-webkit-",z="WebkitTransition",A="webkitTransitionEnd transitionend"):(z="transition",A="transitionend"),a.onanimationend===c&&a.onwebkitanimationend!==c?(D="-webkit-",B="WebkitAnimation",C="webkitAnimationEnd animationend"):(B="animation",C="animationend");var E,F="Duration",G="Property",H="Delay",I="IterationCount",J="$$ngAnimateKey",K="$$ngAnimateCSS3Data",L="ng-animate-start",M="ng-animate-active",N={},O=0,P=[];return{allowCancel:function(a,c,d){var e=(a.data(K)||{}).classes;if(!e||["enter","leave","move"].indexOf(c)>=0)return!0;var f=a.parent(),h=b.element(a[0].cloneNode());h.attr("style","position:absolute; top:-9999px; left:-9999px"),h.removeAttr("id"),h.html(""),g(e.split(" "),function(a){h.removeClass(a)});var i="addClass"==c?"-add":"-remove";h.addClass(y(d,i)),f.append(h);var j=k(h);return h.remove(),Math.max(j.transitionDuration,j.animationDuration)>0},enter:function(a,b){return w(a,"ng-enter",b)},leave:function(a,b){return w(a,"ng-leave",b)},move:function(a,b){return w(a,"ng-move",b)},beforeAddClass:function(a,b,c){var d=u(a,y(b,"-add"));return d?(j(function(){q(a),r(a),c()}),d):(c(),void 0)},addClass:function(a,b,c){return v(a,y(b,"-add"),c)},beforeRemoveClass:function(a,b,c){var d=u(a,y(b,"-remove"));return d?(j(function(){q(a),r(a),c()}),d):(c(),void 0)},removeClass:function(a,b,c){return v(a,y(b,"-remove"),c)}}}])}])}(window,window.angular);