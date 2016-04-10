(function (window, angular, undefined) {
  'use strict';
  var ngRouteModule = angular.module('ngRoute', ['ng']).provider('$route', $RouteProvider);
  function $RouteProvider() {
    function inherit(parent, extra) {
      return angular.extend(new (angular.extend(function () {
      }, { prototype: parent }))(), extra);
    }
    var routes = {};
    this.when = function (path, route) {
      routes[path] = angular.extend({ reloadOnSearch: true }, route, path && pathRegExp(path, route));
      if (path) {
        var redirectPath = path[path.length - 1] == '/' ? path.substr(0, path.length - 1) : path + '/';
        routes[redirectPath] = angular.extend({ redirectTo: path }, pathRegExp(redirectPath, route));
      }
      return this;
    };
    function pathRegExp(path, opts) {
      var insensitive = opts.caseInsensitiveMatch, ret = {
          originalPath: path,
          regexp: path
        }, keys = ret.keys = [];
      path = path.replace(/([().])/g, '\\$1').replace(/(\/)?:(\w+)([\?|\*])?/g, function (_, slash, key, option) {
        var optional = option === '?' ? option : null;
        var star = option === '*' ? option : null;
        keys.push({
          name: key,
          optional: !!optional
        });
        slash = slash || '';
        return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (star && '(.+?)' || '([^/]+)') + (optional || '') + ')' + (optional || '');
      }).replace(/([\/$\*])/g, '\\$1');
      ret.regexp = new RegExp('^' + path + '$', insensitive ? 'i' : '');
      return ret;
    }
    this.otherwise = function (params) {
      this.when(null, params);
      return this;
    };
    this.$get = [
      '$rootScope',
      '$location',
      '$routeParams',
      '$q',
      '$injector',
      '$http',
      '$templateCache',
      '$sce',
      function ($rootScope, $location, $routeParams, $q, $injector, $http, $templateCache, $sce) {
        var forceReload = false, $route = {
            routes: routes,
            reload: function () {
              forceReload = true;
              $rootScope.$evalAsync(updateRoute);
            }
          };
        $rootScope.$on('$locationChangeSuccess', updateRoute);
        return $route;
        function switchRouteMatcher(on, route) {
          var keys = route.keys, params = {};
          if (!route.regexp)
            return null;
          var m = route.regexp.exec(on);
          if (!m)
            return null;
          for (var i = 1, len = m.length; i < len; ++i) {
            var key = keys[i - 1];
            var val = 'string' == typeof m[i] ? decodeURIComponent(m[i]) : m[i];
            if (key && val) {
              params[key.name] = val;
            }
          }
          return params;
        }
        function updateRoute() {
          var next = parseRoute(), last = $route.current;
          if (next && last && next.$$route === last.$$route && angular.equals(next.pathParams, last.pathParams) && !next.reloadOnSearch && !forceReload) {
            last.params = next.params;
            angular.copy(last.params, $routeParams);
            $rootScope.$broadcast('$routeUpdate', last);
          } else if (next || last) {
            forceReload = false;
            $rootScope.$broadcast('$routeChangeStart', next, last);
            $route.current = next;
            if (next) {
              if (next.redirectTo) {
                if (angular.isString(next.redirectTo)) {
                  $location.path(interpolate(next.redirectTo, next.params)).search(next.params).replace();
                } else {
                  $location.url(next.redirectTo(next.pathParams, $location.path(), $location.search())).replace();
                }
              }
            }
            $q.when(next).then(function () {
              if (next) {
                var locals = angular.extend({}, next.resolve), template, templateUrl;
                angular.forEach(locals, function (value, key) {
                  locals[key] = angular.isString(value) ? $injector.get(value) : $injector.invoke(value);
                });
                if (angular.isDefined(template = next.template)) {
                  if (angular.isFunction(template)) {
                    template = template(next.params);
                  }
                } else if (angular.isDefined(templateUrl = next.templateUrl)) {
                  if (angular.isFunction(templateUrl)) {
                    templateUrl = templateUrl(next.params);
                  }
                  templateUrl = $sce.getTrustedResourceUrl(templateUrl);
                  if (angular.isDefined(templateUrl)) {
                    next.loadedTemplateUrl = templateUrl;
                    template = $http.get(templateUrl, { cache: $templateCache }).then(function (response) {
                      return response.data;
                    });
                  }
                }
                if (angular.isDefined(template)) {
                  locals['$template'] = template;
                }
                return $q.all(locals);
              }
            }).then(function (locals) {
              if (next == $route.current) {
                if (next) {
                  next.locals = locals;
                  angular.copy(next.params, $routeParams);
                }
                $rootScope.$broadcast('$routeChangeSuccess', next, last);
              }
            }, function (error) {
              if (next == $route.current) {
                $rootScope.$broadcast('$routeChangeError', next, last, error);
              }
            });
          }
        }
        function parseRoute() {
          var params, match;
          angular.forEach(routes, function (route, path) {
            if (!match && (params = switchRouteMatcher($location.path(), route))) {
              match = inherit(route, {
                params: angular.extend({}, $location.search(), params),
                pathParams: params
              });
              match.$$route = route;
            }
          });
          return match || routes[null] && inherit(routes[null], {
            params: {},
            pathParams: {}
          });
        }
        function interpolate(string, params) {
          var result = [];
          angular.forEach((string || '').split(':'), function (segment, i) {
            if (i === 0) {
              result.push(segment);
            } else {
              var segmentMatch = segment.match(/(\w+)(.*)/);
              var key = segmentMatch[1];
              result.push(params[key]);
              result.push(segmentMatch[2] || '');
              delete params[key];
            }
          });
          return result.join('');
        }
      }
    ];
  }
  ngRouteModule.provider('$routeParams', $RouteParamsProvider);
  function $RouteParamsProvider() {
    this.$get = function () {
      return {};
    };
  }
  ngRouteModule.directive('ngView', ngViewFactory);
  ngViewFactory.$inject = [
    '$route',
    '$anchorScroll',
    '$compile',
    '$controller',
    '$animate'
  ];
  function ngViewFactory($route, $anchorScroll, $compile, $controller, $animate) {
    return {
      restrict: 'ECA',
      terminal: true,
      priority: 400,
      transclude: 'element',
      link: function (scope, $element, attr, ctrl, $transclude) {
        var currentScope, currentElement, autoScrollExp = attr.autoscroll, onloadExp = attr.onload || '';
        scope.$on('$routeChangeSuccess', update);
        update();
        function cleanupLastView() {
          if (currentScope) {
            currentScope.$destroy();
            currentScope = null;
          }
          if (currentElement) {
            $animate.leave(currentElement);
            currentElement = null;
          }
        }
        function update() {
          var locals = $route.current && $route.current.locals, template = locals && locals.$template;
          if (template) {
            var newScope = scope.$new();
            var clone = $transclude(newScope, angular.noop);
            clone.html(template);
            $animate.enter(clone, null, currentElement || $element, function onNgViewEnter() {
              if (angular.isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                $anchorScroll();
              }
            });
            cleanupLastView();
            var link = $compile(clone.contents()), current = $route.current;
            currentScope = current.scope = newScope;
            currentElement = clone;
            if (current.controller) {
              locals.$scope = currentScope;
              var controller = $controller(current.controller, locals);
              if (current.controllerAs) {
                currentScope[current.controllerAs] = controller;
              }
              clone.data('$ngControllerController', controller);
              clone.children().data('$ngControllerController', controller);
            }
            link(currentScope);
            currentScope.$emit('$viewContentLoaded');
            currentScope.$eval(onloadExp);
          } else {
            cleanupLastView();
          }
        }
      }
    };
  }
}(window, window.angular));
(function (window, angular, undefined) {
  'use strict';
  angular.module('ngAnimate', ['ng']).config([
    '$provide',
    '$animateProvider',
    function ($provide, $animateProvider) {
      var noop = angular.noop;
      var forEach = angular.forEach;
      var selectors = $animateProvider.$$selectors;
      var ELEMENT_NODE = 1;
      var NG_ANIMATE_STATE = '$$ngAnimateState';
      var NG_ANIMATE_CLASS_NAME = 'ng-animate';
      var rootAnimateState = { running: true };
      $provide.decorator('$animate', [
        '$delegate',
        '$injector',
        '$sniffer',
        '$rootElement',
        '$timeout',
        '$rootScope',
        '$document',
        function ($delegate, $injector, $sniffer, $rootElement, $timeout, $rootScope, $document) {
          $rootElement.data(NG_ANIMATE_STATE, rootAnimateState);
          $rootScope.$$postDigest(function () {
            $rootScope.$$postDigest(function () {
              rootAnimateState.running = false;
            });
          });
          function lookup(name) {
            if (name) {
              var matches = [], flagMap = {}, classes = name.substr(1).split('.');
              if ($sniffer.transitions || $sniffer.animations) {
                classes.push('');
              }
              for (var i = 0; i < classes.length; i++) {
                var klass = classes[i], selectorFactoryName = selectors[klass];
                if (selectorFactoryName && !flagMap[klass]) {
                  matches.push($injector.get(selectorFactoryName));
                  flagMap[klass] = true;
                }
              }
              return matches;
            }
          }
          return {
            enter: function (element, parentElement, afterElement, doneCallback) {
              this.enabled(false, element);
              $delegate.enter(element, parentElement, afterElement);
              $rootScope.$$postDigest(function () {
                performAnimation('enter', 'ng-enter', element, parentElement, afterElement, noop, doneCallback);
              });
            },
            leave: function (element, doneCallback) {
              cancelChildAnimations(element);
              this.enabled(false, element);
              $rootScope.$$postDigest(function () {
                performAnimation('leave', 'ng-leave', element, null, null, function () {
                  $delegate.leave(element);
                }, doneCallback);
              });
            },
            move: function (element, parentElement, afterElement, doneCallback) {
              cancelChildAnimations(element);
              this.enabled(false, element);
              $delegate.move(element, parentElement, afterElement);
              $rootScope.$$postDigest(function () {
                performAnimation('move', 'ng-move', element, parentElement, afterElement, noop, doneCallback);
              });
            },
            addClass: function (element, className, doneCallback) {
              performAnimation('addClass', className, element, null, null, function () {
                $delegate.addClass(element, className);
              }, doneCallback);
            },
            removeClass: function (element, className, doneCallback) {
              performAnimation('removeClass', className, element, null, null, function () {
                $delegate.removeClass(element, className);
              }, doneCallback);
            },
            enabled: function (value, element) {
              switch (arguments.length) {
              case 2:
                if (value) {
                  cleanup(element);
                } else {
                  var data = element.data(NG_ANIMATE_STATE) || {};
                  data.disabled = true;
                  element.data(NG_ANIMATE_STATE, data);
                }
                break;
              case 1:
                rootAnimateState.disabled = !value;
                break;
              default:
                value = !rootAnimateState.disabled;
                break;
              }
              return !!value;
            }
          };
          function performAnimation(animationEvent, className, element, parentElement, afterElement, domOperation, doneCallback) {
            var currentClassName = element.attr('class') || '';
            var classes = currentClassName + ' ' + className;
            var animationLookup = (' ' + classes).replace(/\s+/g, '.');
            if (!parentElement) {
              parentElement = afterElement ? afterElement.parent() : element.parent();
            }
            var matches = lookup(animationLookup);
            var isClassBased = animationEvent == 'addClass' || animationEvent == 'removeClass';
            var ngAnimateState = element.data(NG_ANIMATE_STATE) || {};
            if (animationsDisabled(element, parentElement) || matches.length === 0) {
              fireDOMOperation();
              closeAnimation();
              return;
            }
            var animations = [];
            if (!ngAnimateState.running || !(isClassBased && ngAnimateState.structural)) {
              forEach(matches, function (animation) {
                if (!animation.allowCancel || animation.allowCancel(element, animationEvent, className)) {
                  var beforeFn, afterFn = animation[animationEvent];
                  if (animationEvent == 'leave') {
                    beforeFn = afterFn;
                    afterFn = null;
                  } else {
                    beforeFn = animation['before' + animationEvent.charAt(0).toUpperCase() + animationEvent.substr(1)];
                  }
                  animations.push({
                    before: beforeFn,
                    after: afterFn
                  });
                }
              });
            }
            if (animations.length === 0) {
              fireDOMOperation();
              fireDoneCallbackAsync();
              return;
            }
            var futureClassName = ' ' + currentClassName + ' ';
            if (ngAnimateState.running) {
              $timeout.cancel(ngAnimateState.closeAnimationTimeout);
              cleanup(element);
              cancelAnimations(ngAnimateState.animations);
              if (ngAnimateState.beforeComplete) {
                (ngAnimateState.done || noop)(true);
              } else if (isClassBased && !ngAnimateState.structural) {
                futureClassName = ngAnimateState.event == 'removeClass' ? futureClassName.replace(ngAnimateState.className, '') : futureClassName + ngAnimateState.className + ' ';
              }
            }
            var classNameToken = ' ' + className + ' ';
            if (animationEvent == 'addClass' && futureClassName.indexOf(classNameToken) >= 0 || animationEvent == 'removeClass' && futureClassName.indexOf(classNameToken) == -1) {
              fireDOMOperation();
              fireDoneCallbackAsync();
              return;
            }
            element.addClass(NG_ANIMATE_CLASS_NAME);
            element.data(NG_ANIMATE_STATE, {
              running: true,
              event: animationEvent,
              className: className,
              structural: !isClassBased,
              animations: animations,
              done: onBeforeAnimationsComplete
            });
            invokeRegisteredAnimationFns(animations, 'before', onBeforeAnimationsComplete);
            function onBeforeAnimationsComplete(cancelled) {
              fireDOMOperation();
              if (cancelled === true) {
                closeAnimation();
                return;
              }
              var data = element.data(NG_ANIMATE_STATE);
              if (data) {
                data.done = closeAnimation;
                element.data(NG_ANIMATE_STATE, data);
              }
              invokeRegisteredAnimationFns(animations, 'after', closeAnimation);
            }
            function invokeRegisteredAnimationFns(animations, phase, allAnimationFnsComplete) {
              var endFnName = phase + 'End';
              forEach(animations, function (animation, index) {
                var animationPhaseCompleted = function () {
                  progress(index, phase);
                };
                if (phase == 'before' && (animationEvent == 'enter' || animationEvent == 'move')) {
                  animationPhaseCompleted();
                  return;
                }
                if (animation[phase]) {
                  animation[endFnName] = isClassBased ? animation[phase](element, className, animationPhaseCompleted) : animation[phase](element, animationPhaseCompleted);
                } else {
                  animationPhaseCompleted();
                }
              });
              function progress(index, phase) {
                var phaseCompletionFlag = phase + 'Complete';
                var currentAnimation = animations[index];
                currentAnimation[phaseCompletionFlag] = true;
                (currentAnimation[endFnName] || noop)();
                for (var i = 0; i < animations.length; i++) {
                  if (!animations[i][phaseCompletionFlag])
                    return;
                }
                allAnimationFnsComplete();
              }
            }
            function fireDoneCallbackAsync() {
              doneCallback && $timeout(doneCallback, 0, false);
            }
            function fireDOMOperation() {
              if (!fireDOMOperation.hasBeenRun) {
                fireDOMOperation.hasBeenRun = true;
                domOperation();
              }
            }
            function closeAnimation() {
              if (!closeAnimation.hasBeenRun) {
                closeAnimation.hasBeenRun = true;
                var data = element.data(NG_ANIMATE_STATE);
                if (data) {
                  if (isClassBased) {
                    cleanup(element);
                  } else {
                    data.closeAnimationTimeout = $timeout(function () {
                      cleanup(element);
                    }, 0, false);
                    element.data(NG_ANIMATE_STATE, data);
                  }
                }
                fireDoneCallbackAsync();
              }
            }
          }
          function cancelChildAnimations(element) {
            var node = element[0];
            if (node.nodeType != ELEMENT_NODE) {
              return;
            }
            forEach(node.querySelectorAll('.' + NG_ANIMATE_CLASS_NAME), function (element) {
              element = angular.element(element);
              var data = element.data(NG_ANIMATE_STATE);
              if (data) {
                cancelAnimations(data.animations);
                cleanup(element);
              }
            });
          }
          function cancelAnimations(animations) {
            var isCancelledFlag = true;
            forEach(animations, function (animation) {
              if (!animations.beforeComplete) {
                (animation.beforeEnd || noop)(isCancelledFlag);
              }
              if (!animations.afterComplete) {
                (animation.afterEnd || noop)(isCancelledFlag);
              }
            });
          }
          function cleanup(element) {
            if (element[0] == $rootElement[0]) {
              if (!rootAnimateState.disabled) {
                rootAnimateState.running = false;
                rootAnimateState.structural = false;
              }
            } else {
              element.removeClass(NG_ANIMATE_CLASS_NAME);
              element.removeData(NG_ANIMATE_STATE);
            }
          }
          function animationsDisabled(element, parentElement) {
            if (rootAnimateState.disabled)
              return true;
            if (element[0] == $rootElement[0]) {
              return rootAnimateState.disabled || rootAnimateState.running;
            }
            do {
              if (parentElement.length === 0)
                break;
              var isRoot = parentElement[0] == $rootElement[0];
              var state = isRoot ? rootAnimateState : parentElement.data(NG_ANIMATE_STATE);
              var result = state && (!!state.disabled || !!state.running);
              if (isRoot || result) {
                return result;
              }
              if (isRoot)
                return true;
            } while (parentElement = parentElement.parent());
            return true;
          }
        }
      ]);
      $animateProvider.register('', [
        '$window',
        '$sniffer',
        '$timeout',
        function ($window, $sniffer, $timeout) {
          var CSS_PREFIX = '', TRANSITION_PROP, TRANSITIONEND_EVENT, ANIMATION_PROP, ANIMATIONEND_EVENT;
          if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
            CSS_PREFIX = '-webkit-';
            TRANSITION_PROP = 'WebkitTransition';
            TRANSITIONEND_EVENT = 'webkitTransitionEnd transitionend';
          } else {
            TRANSITION_PROP = 'transition';
            TRANSITIONEND_EVENT = 'transitionend';
          }
          if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
            CSS_PREFIX = '-webkit-';
            ANIMATION_PROP = 'WebkitAnimation';
            ANIMATIONEND_EVENT = 'webkitAnimationEnd animationend';
          } else {
            ANIMATION_PROP = 'animation';
            ANIMATIONEND_EVENT = 'animationend';
          }
          var DURATION_KEY = 'Duration';
          var PROPERTY_KEY = 'Property';
          var DELAY_KEY = 'Delay';
          var ANIMATION_ITERATION_COUNT_KEY = 'IterationCount';
          var NG_ANIMATE_PARENT_KEY = '$$ngAnimateKey';
          var NG_ANIMATE_CSS_DATA_KEY = '$$ngAnimateCSS3Data';
          var NG_ANIMATE_FALLBACK_CLASS_NAME = 'ng-animate-start';
          var NG_ANIMATE_FALLBACK_ACTIVE_CLASS_NAME = 'ng-animate-active';
          var lookupCache = {};
          var parentCounter = 0;
          var animationReflowQueue = [], animationTimer, timeOut = false;
          function afterReflow(callback) {
            animationReflowQueue.push(callback);
            $timeout.cancel(animationTimer);
            animationTimer = $timeout(function () {
              forEach(animationReflowQueue, function (fn) {
                fn();
              });
              animationReflowQueue = [];
              animationTimer = null;
              lookupCache = {};
            }, 10, false);
          }
          function getElementAnimationDetails(element, cacheKey) {
            var data = cacheKey ? lookupCache[cacheKey] : null;
            if (!data) {
              var transitionDuration = 0;
              var transitionDelay = 0;
              var animationDuration = 0;
              var animationDelay = 0;
              var transitionDelayStyle;
              var animationDelayStyle;
              var transitionDurationStyle;
              var transitionPropertyStyle;
              forEach(element, function (element) {
                if (element.nodeType == ELEMENT_NODE) {
                  var elementStyles = $window.getComputedStyle(element) || {};
                  transitionDurationStyle = elementStyles[TRANSITION_PROP + DURATION_KEY];
                  transitionDuration = Math.max(parseMaxTime(transitionDurationStyle), transitionDuration);
                  transitionPropertyStyle = elementStyles[TRANSITION_PROP + PROPERTY_KEY];
                  transitionDelayStyle = elementStyles[TRANSITION_PROP + DELAY_KEY];
                  transitionDelay = Math.max(parseMaxTime(transitionDelayStyle), transitionDelay);
                  animationDelayStyle = elementStyles[ANIMATION_PROP + DELAY_KEY];
                  animationDelay = Math.max(parseMaxTime(animationDelayStyle), animationDelay);
                  var aDuration = parseMaxTime(elementStyles[ANIMATION_PROP + DURATION_KEY]);
                  if (aDuration > 0) {
                    aDuration *= parseInt(elementStyles[ANIMATION_PROP + ANIMATION_ITERATION_COUNT_KEY], 10) || 1;
                  }
                  animationDuration = Math.max(aDuration, animationDuration);
                }
              });
              data = {
                total: 0,
                transitionPropertyStyle: transitionPropertyStyle,
                transitionDurationStyle: transitionDurationStyle,
                transitionDelayStyle: transitionDelayStyle,
                transitionDelay: transitionDelay,
                transitionDuration: transitionDuration,
                animationDelayStyle: animationDelayStyle,
                animationDelay: animationDelay,
                animationDuration: animationDuration
              };
              if (cacheKey) {
                lookupCache[cacheKey] = data;
              }
            }
            return data;
          }
          function parseMaxTime(str) {
            var maxValue = 0;
            var values = angular.isString(str) ? str.split(/\s*,\s*/) : [];
            forEach(values, function (value) {
              maxValue = Math.max(parseFloat(value) || 0, maxValue);
            });
            return maxValue;
          }
          function getCacheKey(element) {
            var parentElement = element.parent();
            var parentID = parentElement.data(NG_ANIMATE_PARENT_KEY);
            if (!parentID) {
              parentElement.data(NG_ANIMATE_PARENT_KEY, ++parentCounter);
              parentID = parentCounter;
            }
            return parentID + '-' + element[0].className;
          }
          function animateSetup(element, className) {
            var cacheKey = getCacheKey(element);
            var eventCacheKey = cacheKey + ' ' + className;
            var stagger = {};
            var ii = lookupCache[eventCacheKey] ? ++lookupCache[eventCacheKey].total : 0;
            if (ii > 0) {
              var staggerClassName = className + '-stagger';
              var staggerCacheKey = cacheKey + ' ' + staggerClassName;
              var applyClasses = !lookupCache[staggerCacheKey];
              applyClasses && element.addClass(staggerClassName);
              stagger = getElementAnimationDetails(element, staggerCacheKey);
              applyClasses && element.removeClass(staggerClassName);
            }
            element.addClass(className);
            var timings = getElementAnimationDetails(element, eventCacheKey);
            var maxDuration = Math.max(timings.transitionDuration, timings.animationDuration);
            if (maxDuration === 0) {
              element.removeClass(className);
              return false;
            }
            var node = element[0];
            var activeClassName = '';
            if (timings.transitionDuration > 0) {
              element.addClass(NG_ANIMATE_FALLBACK_CLASS_NAME);
              activeClassName += NG_ANIMATE_FALLBACK_ACTIVE_CLASS_NAME + ' ';
              blockTransitions(element);
            } else {
              blockKeyframeAnimations(element);
            }
            forEach(className.split(' '), function (klass, i) {
              activeClassName += (i > 0 ? ' ' : '') + klass + '-active';
            });
            element.data(NG_ANIMATE_CSS_DATA_KEY, {
              className: className,
              activeClassName: activeClassName,
              maxDuration: maxDuration,
              classes: className + ' ' + activeClassName,
              timings: timings,
              stagger: stagger,
              ii: ii
            });
            return true;
          }
          function blockTransitions(element) {
            element[0].style[TRANSITION_PROP + PROPERTY_KEY] = 'none';
          }
          function blockKeyframeAnimations(element) {
            element[0].style[ANIMATION_PROP] = 'none 0s';
          }
          function unblockTransitions(element) {
            var node = element[0], prop = TRANSITION_PROP + PROPERTY_KEY;
            if (node.style[prop] && node.style[prop].length > 0) {
              node.style[prop] = '';
            }
          }
          function unblockKeyframeAnimations(element) {
            var node = element[0], prop = ANIMATION_PROP;
            if (node.style[prop] && node.style[prop].length > 0) {
              element[0].style[prop] = '';
            }
          }
          function animateRun(element, className, activeAnimationComplete) {
            var data = element.data(NG_ANIMATE_CSS_DATA_KEY);
            if (!element.hasClass(className) || !data) {
              activeAnimationComplete();
              return;
            }
            var node = element[0];
            var timings = data.timings;
            var stagger = data.stagger;
            var maxDuration = data.maxDuration;
            var activeClassName = data.activeClassName;
            var maxDelayTime = Math.max(timings.transitionDelay, timings.animationDelay) * 1000;
            var startTime = Date.now();
            var css3AnimationEvents = ANIMATIONEND_EVENT + ' ' + TRANSITIONEND_EVENT;
            var ii = data.ii;
            var applyFallbackStyle, style = '', appliedStyles = [];
            if (timings.transitionDuration > 0) {
              var propertyStyle = timings.transitionPropertyStyle;
              if (propertyStyle.indexOf('all') == -1) {
                applyFallbackStyle = true;
                var fallbackProperty = $sniffer.msie ? '-ms-zoom' : 'border-spacing';
                style += CSS_PREFIX + 'transition-property: ' + propertyStyle + ', ' + fallbackProperty + '; ';
                style += CSS_PREFIX + 'transition-duration: ' + timings.transitionDurationStyle + ', ' + timings.transitionDuration + 's; ';
                appliedStyles.push(CSS_PREFIX + 'transition-property');
                appliedStyles.push(CSS_PREFIX + 'transition-duration');
              }
            }
            if (ii > 0) {
              if (stagger.transitionDelay > 0 && stagger.transitionDuration === 0) {
                var delayStyle = timings.transitionDelayStyle;
                if (applyFallbackStyle) {
                  delayStyle += ', ' + timings.transitionDelay + 's';
                }
                style += CSS_PREFIX + 'transition-delay: ' + prepareStaggerDelay(delayStyle, stagger.transitionDelay, ii) + '; ';
                appliedStyles.push(CSS_PREFIX + 'transition-delay');
              }
              if (stagger.animationDelay > 0 && stagger.animationDuration === 0) {
                style += CSS_PREFIX + 'animation-delay: ' + prepareStaggerDelay(timings.animationDelayStyle, stagger.animationDelay, ii) + '; ';
                appliedStyles.push(CSS_PREFIX + 'animation-delay');
              }
            }
            if (appliedStyles.length > 0) {
              var oldStyle = node.getAttribute('style') || '';
              node.setAttribute('style', oldStyle + ' ' + style);
            }
            element.on(css3AnimationEvents, onAnimationProgress);
            element.addClass(activeClassName);
            return function onEnd(cancelled) {
              element.off(css3AnimationEvents, onAnimationProgress);
              element.removeClass(activeClassName);
              animateClose(element, className);
              for (var i in appliedStyles) {
                node.style.removeProperty(appliedStyles[i]);
              }
            };
            function onAnimationProgress(event) {
              event.stopPropagation();
              var ev = event.originalEvent || event;
              var timeStamp = ev.$manualTimeStamp || ev.timeStamp || Date.now();
              if (Math.max(timeStamp - startTime, 0) >= maxDelayTime && ev.elapsedTime >= maxDuration) {
                activeAnimationComplete();
              }
            }
          }
          function prepareStaggerDelay(delayStyle, staggerDelay, index) {
            var style = '';
            forEach(delayStyle.split(','), function (val, i) {
              style += (i > 0 ? ',' : '') + (index * staggerDelay + parseInt(val, 10)) + 's';
            });
            return style;
          }
          function animateBefore(element, className) {
            if (animateSetup(element, className)) {
              return function (cancelled) {
                cancelled && animateClose(element, className);
              };
            }
          }
          function animateAfter(element, className, afterAnimationComplete) {
            if (element.data(NG_ANIMATE_CSS_DATA_KEY)) {
              return animateRun(element, className, afterAnimationComplete);
            } else {
              animateClose(element, className);
              afterAnimationComplete();
            }
          }
          function animate(element, className, animationComplete) {
            var preReflowCancellation = animateBefore(element, className);
            if (!preReflowCancellation) {
              animationComplete();
              return;
            }
            var cancel = preReflowCancellation;
            afterReflow(function () {
              unblockTransitions(element);
              unblockKeyframeAnimations(element);
              cancel = animateAfter(element, className, animationComplete);
            });
            return function (cancelled) {
              (cancel || noop)(cancelled);
            };
          }
          function animateClose(element, className) {
            element.removeClass(className);
            element.removeClass(NG_ANIMATE_FALLBACK_CLASS_NAME);
            element.removeData(NG_ANIMATE_CSS_DATA_KEY);
          }
          return {
            allowCancel: function (element, animationEvent, className) {
              var oldClasses = (element.data(NG_ANIMATE_CSS_DATA_KEY) || {}).classes;
              if (!oldClasses || [
                  'enter',
                  'leave',
                  'move'
                ].indexOf(animationEvent) >= 0) {
                return true;
              }
              var parentElement = element.parent();
              var clone = angular.element(element[0].cloneNode());
              clone.attr('style', 'position:absolute; top:-9999px; left:-9999px');
              clone.removeAttr('id');
              clone.html('');
              forEach(oldClasses.split(' '), function (klass) {
                clone.removeClass(klass);
              });
              var suffix = animationEvent == 'addClass' ? '-add' : '-remove';
              clone.addClass(suffixClasses(className, suffix));
              parentElement.append(clone);
              var timings = getElementAnimationDetails(clone);
              clone.remove();
              return Math.max(timings.transitionDuration, timings.animationDuration) > 0;
            },
            enter: function (element, animationCompleted) {
              return animate(element, 'ng-enter', animationCompleted);
            },
            leave: function (element, animationCompleted) {
              return animate(element, 'ng-leave', animationCompleted);
            },
            move: function (element, animationCompleted) {
              return animate(element, 'ng-move', animationCompleted);
            },
            beforeAddClass: function (element, className, animationCompleted) {
              var cancellationMethod = animateBefore(element, suffixClasses(className, '-add'));
              if (cancellationMethod) {
                afterReflow(function () {
                  unblockTransitions(element);
                  unblockKeyframeAnimations(element);
                  animationCompleted();
                });
                return cancellationMethod;
              }
              animationCompleted();
            },
            addClass: function (element, className, animationCompleted) {
              return animateAfter(element, suffixClasses(className, '-add'), animationCompleted);
            },
            beforeRemoveClass: function (element, className, animationCompleted) {
              var cancellationMethod = animateBefore(element, suffixClasses(className, '-remove'));
              if (cancellationMethod) {
                afterReflow(function () {
                  unblockTransitions(element);
                  unblockKeyframeAnimations(element);
                  animationCompleted();
                });
                return cancellationMethod;
              }
              animationCompleted();
            },
            removeClass: function (element, className, animationCompleted) {
              return animateAfter(element, suffixClasses(className, '-remove'), animationCompleted);
            }
          };
          function suffixClasses(classes, suffix) {
            var className = '';
            classes = angular.isArray(classes) ? classes : classes.split(/\s+/);
            forEach(classes, function (klass, i) {
              if (klass && klass.length > 0) {
                className += (i > 0 ? ' ' : '') + klass + suffix;
              }
            });
            return className;
          }
        }
      ]);
    }
  ]);
}(window, window.angular));