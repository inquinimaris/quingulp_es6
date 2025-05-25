(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        function checkValidityName(name) {
            const regexName = /^[a-zA-Zа-яА-ЯёЁ\-'\s]{2,64}$/;
            return regexName.test(name);
        }

        function checkValidityPhone(tel) {
            const regexTel = /^\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
            return regexTel.test(tel);
        }

        function checkValidityConsent(consent) {
            return consent.checked;
        }

        function checkInputValidity(name, tel, consent) {
            let validityName = true;
            let validityTel = true;
            let validityConsent = true;

            if (name) {
            const valueName = name.value.trim();
            if (!checkValidityName(valueName)) {
                if (!name.classList.contains('invalid')) {
                    name.classList.add('invalid');
                }
                validityName = false;
            }
            }

            if (tel) {
            const valueTel = tel.value.trim();
            if (!checkValidityPhone(valueTel)) {
                if (!tel.classList.contains('invalid')) {
                    tel.classList.add('invalid');
                }
                validityTel = false;
            }
            }

            if (consent) {
            if (!checkValidityConsent(consent)) {
                if (!consent.classList.contains('invalid')) {
                    consent.classList.add('invalid');
                }
                validityConsent = false;
            }
            }

            return validityName && validityTel && validityConsent;
        }

        document.querySelectorAll('form').forEach(form => {
            const buttonSubmit = form.querySelector('button[type="submit"]');
            const inputName = form.querySelector('.input_name');
            const inputTel = form.querySelector('.input_tel');
            const inputConsent = form.querySelector('.input_consent');

            form.addEventListener('submit', (event) => {
            buttonSubmit.disabled = true;
            if (!checkInputValidity(inputName, inputTel, inputConsent)) {
                event.preventDefault();
                console.debug('Fields validation failed');
                buttonSubmit.disabled = false;
            } else {
                event.preventDefault();
                const formData = new FormData(form);
                fetch('./send_popup.php', {
                    method: 'POST',
                    body: formData,
                })
                .then(response => {
                    // do something on success
                })
                .catch(error => {
                    console.debug(error);
                })
                .finally(() => {
                    // do something regardless
                });
            }
            });

            form.addEventListener('input', (e) => {
            if (e.target.classList.contains('invalid')) {
                e.target.classList.remove('invalid');
            }
            if (buttonSubmit.disabled) {
                buttonSubmit.disabled = false;
            }
            });
        });
    });

    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

    /*!
     * Splide.js
     * Version  : 4.1.4
     * License  : MIT
     * Copyright: 2022 Naotoshi Fujita
     */
    var MEDIA_PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
    var CREATED = 1;
    var MOUNTED = 2;
    var IDLE = 3;
    var MOVING = 4;
    var SCROLLING = 5;
    var DRAGGING = 6;
    var DESTROYED = 7;
    var STATES = {
      CREATED: CREATED,
      MOUNTED: MOUNTED,
      IDLE: IDLE,
      MOVING: MOVING,
      SCROLLING: SCROLLING,
      DRAGGING: DRAGGING,
      DESTROYED: DESTROYED
    };

    function empty(array) {
      array.length = 0;
    }

    function slice(arrayLike, start, end) {
      return Array.prototype.slice.call(arrayLike, start, end);
    }

    function apply(func) {
      return func.bind.apply(func, [null].concat(slice(arguments, 1)));
    }

    var nextTick = setTimeout;

    var noop = function noop() {};

    function raf(func) {
      return requestAnimationFrame(func);
    }

    function typeOf(type, subject) {
      return typeof subject === type;
    }

    function isObject(subject) {
      return !isNull(subject) && typeOf("object", subject);
    }

    var isArray = Array.isArray;
    var isFunction = apply(typeOf, "function");
    var isString = apply(typeOf, "string");
    var isUndefined = apply(typeOf, "undefined");

    function isNull(subject) {
      return subject === null;
    }

    function isHTMLElement(subject) {
      try {
        return subject instanceof (subject.ownerDocument.defaultView || window).HTMLElement;
      } catch (e) {
        return false;
      }
    }

    function toArray(value) {
      return isArray(value) ? value : [value];
    }

    function forEach(values, iteratee) {
      toArray(values).forEach(iteratee);
    }

    function includes(array, value) {
      return array.indexOf(value) > -1;
    }

    function push(array, items) {
      array.push.apply(array, toArray(items));
      return array;
    }

    function toggleClass(elm, classes, add) {
      if (elm) {
        forEach(classes, function (name) {
          if (name) {
            elm.classList[add ? "add" : "remove"](name);
          }
        });
      }
    }

    function addClass(elm, classes) {
      toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
    }

    function append(parent, children) {
      forEach(children, parent.appendChild.bind(parent));
    }

    function before(nodes, ref) {
      forEach(nodes, function (node) {
        var parent = (ref || node).parentNode;

        if (parent) {
          parent.insertBefore(node, ref);
        }
      });
    }

    function matches(elm, selector) {
      return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
    }

    function children(parent, selector) {
      var children2 = parent ? slice(parent.children) : [];
      return selector ? children2.filter(function (child) {
        return matches(child, selector);
      }) : children2;
    }

    function child(parent, selector) {
      return selector ? children(parent, selector)[0] : parent.firstElementChild;
    }

    var ownKeys = Object.keys;

    function forOwn(object, iteratee, right) {
      if (object) {
        (right ? ownKeys(object).reverse() : ownKeys(object)).forEach(function (key) {
          key !== "__proto__" && iteratee(object[key], key);
        });
      }

      return object;
    }

    function assign(object) {
      slice(arguments, 1).forEach(function (source) {
        forOwn(source, function (value, key) {
          object[key] = source[key];
        });
      });
      return object;
    }

    function merge(object) {
      slice(arguments, 1).forEach(function (source) {
        forOwn(source, function (value, key) {
          if (isArray(value)) {
            object[key] = value.slice();
          } else if (isObject(value)) {
            object[key] = merge({}, isObject(object[key]) ? object[key] : {}, value);
          } else {
            object[key] = value;
          }
        });
      });
      return object;
    }

    function omit(object, keys) {
      forEach(keys || ownKeys(object), function (key) {
        delete object[key];
      });
    }

    function removeAttribute(elms, attrs) {
      forEach(elms, function (elm) {
        forEach(attrs, function (attr) {
          elm && elm.removeAttribute(attr);
        });
      });
    }

    function setAttribute(elms, attrs, value) {
      if (isObject(attrs)) {
        forOwn(attrs, function (value2, name) {
          setAttribute(elms, name, value2);
        });
      } else {
        forEach(elms, function (elm) {
          isNull(value) || value === "" ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
        });
      }
    }

    function create(tag, attrs, parent) {
      var elm = document.createElement(tag);

      if (attrs) {
        isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
      }

      parent && append(parent, elm);
      return elm;
    }

    function style(elm, prop, value) {
      if (isUndefined(value)) {
        return getComputedStyle(elm)[prop];
      }

      if (!isNull(value)) {
        elm.style[prop] = "" + value;
      }
    }

    function display(elm, display2) {
      style(elm, "display", display2);
    }

    function focus(elm) {
      elm["setActive"] && elm["setActive"]() || elm.focus({
        preventScroll: true
      });
    }

    function getAttribute(elm, attr) {
      return elm.getAttribute(attr);
    }

    function hasClass(elm, className) {
      return elm && elm.classList.contains(className);
    }

    function rect(target) {
      return target.getBoundingClientRect();
    }

    function remove(nodes) {
      forEach(nodes, function (node) {
        if (node && node.parentNode) {
          node.parentNode.removeChild(node);
        }
      });
    }

    function parseHtml(html) {
      return child(new DOMParser().parseFromString(html, "text/html").body);
    }

    function prevent(e, stopPropagation) {
      e.preventDefault();

      if (stopPropagation) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }

    function query(parent, selector) {
      return parent && parent.querySelector(selector);
    }

    function queryAll(parent, selector) {
      return selector ? slice(parent.querySelectorAll(selector)) : [];
    }

    function removeClass(elm, classes) {
      toggleClass(elm, classes, false);
    }

    function timeOf(e) {
      return e.timeStamp;
    }

    function unit(value) {
      return isString(value) ? value : value ? value + "px" : "";
    }

    var PROJECT_CODE = "splide";
    var DATA_ATTRIBUTE = "data-" + PROJECT_CODE;

    function assert(condition, message) {
      if (!condition) {
        throw new Error("[" + PROJECT_CODE + "] " + (message || ""));
      }
    }

    var min = Math.min,
        max = Math.max,
        floor = Math.floor,
        ceil = Math.ceil,
        abs = Math.abs;

    function approximatelyEqual(x, y, epsilon) {
      return abs(x - y) < epsilon;
    }

    function between(number, x, y, exclusive) {
      var minimum = min(x, y);
      var maximum = max(x, y);
      return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
    }

    function clamp(number, x, y) {
      var minimum = min(x, y);
      var maximum = max(x, y);
      return min(max(minimum, number), maximum);
    }

    function sign(x) {
      return +(x > 0) - +(x < 0);
    }

    function format(string, replacements) {
      forEach(replacements, function (replacement) {
        string = string.replace("%s", "" + replacement);
      });
      return string;
    }

    function pad(number) {
      return number < 10 ? "0" + number : "" + number;
    }

    var ids = {};

    function uniqueId(prefix) {
      return "" + prefix + pad(ids[prefix] = (ids[prefix] || 0) + 1);
    }

    function EventBinder() {
      var listeners = [];

      function bind(targets, events, callback, options) {
        forEachEvent(targets, events, function (target, event, namespace) {
          var isEventTarget = ("addEventListener" in target);
          var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
          isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
          listeners.push([target, event, namespace, callback, remover]);
        });
      }

      function unbind(targets, events, callback) {
        forEachEvent(targets, events, function (target, event, namespace) {
          listeners = listeners.filter(function (listener) {
            if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
              listener[4]();
              return false;
            }

            return true;
          });
        });
      }

      function dispatch(target, type, detail) {
        var e;
        var bubbles = true;

        if (typeof CustomEvent === "function") {
          e = new CustomEvent(type, {
            bubbles: bubbles,
            detail: detail
          });
        } else {
          e = document.createEvent("CustomEvent");
          e.initCustomEvent(type, bubbles, false, detail);
        }

        target.dispatchEvent(e);
        return e;
      }

      function forEachEvent(targets, events, iteratee) {
        forEach(targets, function (target) {
          target && forEach(events, function (events2) {
            events2.split(" ").forEach(function (eventNS) {
              var fragment = eventNS.split(".");
              iteratee(target, fragment[0], fragment[1]);
            });
          });
        });
      }

      function destroy() {
        listeners.forEach(function (data) {
          data[4]();
        });
        empty(listeners);
      }

      return {
        bind: bind,
        unbind: unbind,
        dispatch: dispatch,
        destroy: destroy
      };
    }

    var EVENT_MOUNTED = "mounted";
    var EVENT_READY = "ready";
    var EVENT_MOVE = "move";
    var EVENT_MOVED = "moved";
    var EVENT_CLICK = "click";
    var EVENT_ACTIVE = "active";
    var EVENT_INACTIVE = "inactive";
    var EVENT_VISIBLE = "visible";
    var EVENT_HIDDEN = "hidden";
    var EVENT_REFRESH = "refresh";
    var EVENT_UPDATED = "updated";
    var EVENT_RESIZE = "resize";
    var EVENT_RESIZED = "resized";
    var EVENT_DRAG = "drag";
    var EVENT_DRAGGING = "dragging";
    var EVENT_DRAGGED = "dragged";
    var EVENT_SCROLL = "scroll";
    var EVENT_SCROLLED = "scrolled";
    var EVENT_OVERFLOW = "overflow";
    var EVENT_DESTROY = "destroy";
    var EVENT_ARROWS_MOUNTED = "arrows:mounted";
    var EVENT_ARROWS_UPDATED = "arrows:updated";
    var EVENT_PAGINATION_MOUNTED = "pagination:mounted";
    var EVENT_PAGINATION_UPDATED = "pagination:updated";
    var EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
    var EVENT_AUTOPLAY_PLAY = "autoplay:play";
    var EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
    var EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
    var EVENT_LAZYLOAD_LOADED = "lazyload:loaded";
    var EVENT_SLIDE_KEYDOWN = "sk";
    var EVENT_SHIFTED = "sh";
    var EVENT_END_INDEX_CHANGED = "ei";

    function EventInterface(Splide2) {
      var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
      var binder = EventBinder();

      function on(events, callback) {
        binder.bind(bus, toArray(events).join(" "), function (e) {
          callback.apply(callback, isArray(e.detail) ? e.detail : []);
        });
      }

      function emit(event) {
        binder.dispatch(bus, event, slice(arguments, 1));
      }

      if (Splide2) {
        Splide2.event.on(EVENT_DESTROY, binder.destroy);
      }

      return assign(binder, {
        bus: bus,
        on: on,
        off: apply(binder.unbind, bus),
        emit: emit
      });
    }

    function RequestInterval(interval, onInterval, onUpdate, limit) {
      var now = Date.now;
      var startTime;
      var rate = 0;
      var id;
      var paused = true;
      var count = 0;

      function update() {
        if (!paused) {
          rate = interval ? min((now() - startTime) / interval, 1) : 1;
          onUpdate && onUpdate(rate);

          if (rate >= 1) {
            onInterval();
            startTime = now();

            if (limit && ++count >= limit) {
              return pause();
            }
          }

          id = raf(update);
        }
      }

      function start(resume) {
        resume || cancel();
        startTime = now() - (resume ? rate * interval : 0);
        paused = false;
        id = raf(update);
      }

      function pause() {
        paused = true;
      }

      function rewind() {
        startTime = now();
        rate = 0;

        if (onUpdate) {
          onUpdate(rate);
        }
      }

      function cancel() {
        id && cancelAnimationFrame(id);
        rate = 0;
        id = 0;
        paused = true;
      }

      function set(time) {
        interval = time;
      }

      function isPaused() {
        return paused;
      }

      return {
        start: start,
        rewind: rewind,
        pause: pause,
        cancel: cancel,
        set: set,
        isPaused: isPaused
      };
    }

    function State(initialState) {
      var state = initialState;

      function set(value) {
        state = value;
      }

      function is(states) {
        return includes(toArray(states), state);
      }

      return {
        set: set,
        is: is
      };
    }

    function Throttle(func, duration) {
      var interval = RequestInterval(0, func, null, 1);
      return function () {
        interval.isPaused() && interval.start();
      };
    }

    function Media(Splide2, Components2, options) {
      var state = Splide2.state;
      var breakpoints = options.breakpoints || {};
      var reducedMotion = options.reducedMotion || {};
      var binder = EventBinder();
      var queries = [];

      function setup() {
        var isMin = options.mediaQuery === "min";
        ownKeys(breakpoints).sort(function (n, m) {
          return isMin ? +n - +m : +m - +n;
        }).forEach(function (key) {
          register(breakpoints[key], "(" + (isMin ? "min" : "max") + "-width:" + key + "px)");
        });
        register(reducedMotion, MEDIA_PREFERS_REDUCED_MOTION);
        update();
      }

      function destroy(completely) {
        if (completely) {
          binder.destroy();
        }
      }

      function register(options2, query) {
        var queryList = matchMedia(query);
        binder.bind(queryList, "change", update);
        queries.push([options2, queryList]);
      }

      function update() {
        var destroyed = state.is(DESTROYED);
        var direction = options.direction;
        var merged = queries.reduce(function (merged2, entry) {
          return merge(merged2, entry[1].matches ? entry[0] : {});
        }, {});
        omit(options);
        set(merged);

        if (options.destroy) {
          Splide2.destroy(options.destroy === "completely");
        } else if (destroyed) {
          destroy(true);
          Splide2.mount();
        } else {
          direction !== options.direction && Splide2.refresh();
        }
      }

      function reduce(enable) {
        if (matchMedia(MEDIA_PREFERS_REDUCED_MOTION).matches) {
          enable ? merge(options, reducedMotion) : omit(options, ownKeys(reducedMotion));
        }
      }

      function set(opts, base, notify) {
        merge(options, opts);
        base && merge(Object.getPrototypeOf(options), opts);

        if (notify || !state.is(CREATED)) {
          Splide2.emit(EVENT_UPDATED, options);
        }
      }

      return {
        setup: setup,
        destroy: destroy,
        reduce: reduce,
        set: set
      };
    }

    var ARROW = "Arrow";
    var ARROW_LEFT = ARROW + "Left";
    var ARROW_RIGHT = ARROW + "Right";
    var ARROW_UP = ARROW + "Up";
    var ARROW_DOWN = ARROW + "Down";
    var RTL = "rtl";
    var TTB = "ttb";
    var ORIENTATION_MAP = {
      width: ["height"],
      left: ["top", "right"],
      right: ["bottom", "left"],
      x: ["y"],
      X: ["Y"],
      Y: ["X"],
      ArrowLeft: [ARROW_UP, ARROW_RIGHT],
      ArrowRight: [ARROW_DOWN, ARROW_LEFT]
    };

    function Direction(Splide2, Components2, options) {
      function resolve(prop, axisOnly, direction) {
        direction = direction || options.direction;
        var index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
        return ORIENTATION_MAP[prop] && ORIENTATION_MAP[prop][index] || prop.replace(/width|left|right/i, function (match, offset) {
          var replacement = ORIENTATION_MAP[match.toLowerCase()][index] || match;
          return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
        });
      }

      function orient(value) {
        return value * (options.direction === RTL ? 1 : -1);
      }

      return {
        resolve: resolve,
        orient: orient
      };
    }

    var ROLE = "role";
    var TAB_INDEX = "tabindex";
    var DISABLED = "disabled";
    var ARIA_PREFIX = "aria-";
    var ARIA_CONTROLS = ARIA_PREFIX + "controls";
    var ARIA_CURRENT = ARIA_PREFIX + "current";
    var ARIA_SELECTED = ARIA_PREFIX + "selected";
    var ARIA_LABEL = ARIA_PREFIX + "label";
    var ARIA_LABELLEDBY = ARIA_PREFIX + "labelledby";
    var ARIA_HIDDEN = ARIA_PREFIX + "hidden";
    var ARIA_ORIENTATION = ARIA_PREFIX + "orientation";
    var ARIA_ROLEDESCRIPTION = ARIA_PREFIX + "roledescription";
    var ARIA_LIVE = ARIA_PREFIX + "live";
    var ARIA_BUSY = ARIA_PREFIX + "busy";
    var ARIA_ATOMIC = ARIA_PREFIX + "atomic";
    var ALL_ATTRIBUTES = [ROLE, TAB_INDEX, DISABLED, ARIA_CONTROLS, ARIA_CURRENT, ARIA_LABEL, ARIA_LABELLEDBY, ARIA_HIDDEN, ARIA_ORIENTATION, ARIA_ROLEDESCRIPTION];
    var CLASS_PREFIX = PROJECT_CODE + "__";
    var STATUS_CLASS_PREFIX = "is-";
    var CLASS_ROOT = PROJECT_CODE;
    var CLASS_TRACK = CLASS_PREFIX + "track";
    var CLASS_LIST = CLASS_PREFIX + "list";
    var CLASS_SLIDE = CLASS_PREFIX + "slide";
    var CLASS_CLONE = CLASS_SLIDE + "--clone";
    var CLASS_CONTAINER = CLASS_SLIDE + "__container";
    var CLASS_ARROWS = CLASS_PREFIX + "arrows";
    var CLASS_ARROW = CLASS_PREFIX + "arrow";
    var CLASS_ARROW_PREV = CLASS_ARROW + "--prev";
    var CLASS_ARROW_NEXT = CLASS_ARROW + "--next";
    var CLASS_PAGINATION = CLASS_PREFIX + "pagination";
    var CLASS_PAGINATION_PAGE = CLASS_PAGINATION + "__page";
    var CLASS_PROGRESS = CLASS_PREFIX + "progress";
    var CLASS_PROGRESS_BAR = CLASS_PROGRESS + "__bar";
    var CLASS_TOGGLE = CLASS_PREFIX + "toggle";
    var CLASS_SPINNER = CLASS_PREFIX + "spinner";
    var CLASS_SR = CLASS_PREFIX + "sr";
    var CLASS_INITIALIZED = STATUS_CLASS_PREFIX + "initialized";
    var CLASS_ACTIVE = STATUS_CLASS_PREFIX + "active";
    var CLASS_PREV = STATUS_CLASS_PREFIX + "prev";
    var CLASS_NEXT = STATUS_CLASS_PREFIX + "next";
    var CLASS_VISIBLE = STATUS_CLASS_PREFIX + "visible";
    var CLASS_LOADING = STATUS_CLASS_PREFIX + "loading";
    var CLASS_FOCUS_IN = STATUS_CLASS_PREFIX + "focus-in";
    var CLASS_OVERFLOW = STATUS_CLASS_PREFIX + "overflow";
    var STATUS_CLASSES = [CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING, CLASS_FOCUS_IN, CLASS_OVERFLOW];
    var CLASSES = {
      slide: CLASS_SLIDE,
      clone: CLASS_CLONE,
      arrows: CLASS_ARROWS,
      arrow: CLASS_ARROW,
      prev: CLASS_ARROW_PREV,
      next: CLASS_ARROW_NEXT,
      pagination: CLASS_PAGINATION,
      page: CLASS_PAGINATION_PAGE,
      spinner: CLASS_SPINNER
    };

    function closest(from, selector) {
      if (isFunction(from.closest)) {
        return from.closest(selector);
      }

      var elm = from;

      while (elm && elm.nodeType === 1) {
        if (matches(elm, selector)) {
          break;
        }

        elm = elm.parentElement;
      }

      return elm;
    }

    var FRICTION = 5;
    var LOG_INTERVAL = 200;
    var POINTER_DOWN_EVENTS = "touchstart mousedown";
    var POINTER_MOVE_EVENTS = "touchmove mousemove";
    var POINTER_UP_EVENTS = "touchend touchcancel mouseup click";

    function Elements(Splide2, Components2, options) {
      var _EventInterface = EventInterface(Splide2),
          on = _EventInterface.on,
          bind = _EventInterface.bind;

      var root = Splide2.root;
      var i18n = options.i18n;
      var elements = {};
      var slides = [];
      var rootClasses = [];
      var trackClasses = [];
      var track;
      var list;
      var isUsingKey;

      function setup() {
        collect();
        init();
        update();
      }

      function mount() {
        on(EVENT_REFRESH, destroy);
        on(EVENT_REFRESH, setup);
        on(EVENT_UPDATED, update);
        bind(document, POINTER_DOWN_EVENTS + " keydown", function (e) {
          isUsingKey = e.type === "keydown";
        }, {
          capture: true
        });
        bind(root, "focusin", function () {
          toggleClass(root, CLASS_FOCUS_IN, !!isUsingKey);
        });
      }

      function destroy(completely) {
        var attrs = ALL_ATTRIBUTES.concat("style");
        empty(slides);
        removeClass(root, rootClasses);
        removeClass(track, trackClasses);
        removeAttribute([track, list], attrs);
        removeAttribute(root, completely ? attrs : ["style", ARIA_ROLEDESCRIPTION]);
      }

      function update() {
        removeClass(root, rootClasses);
        removeClass(track, trackClasses);
        rootClasses = getClasses(CLASS_ROOT);
        trackClasses = getClasses(CLASS_TRACK);
        addClass(root, rootClasses);
        addClass(track, trackClasses);
        setAttribute(root, ARIA_LABEL, options.label);
        setAttribute(root, ARIA_LABELLEDBY, options.labelledby);
      }

      function collect() {
        track = find("." + CLASS_TRACK);
        list = child(track, "." + CLASS_LIST);
        assert(track && list, "A track/list element is missing.");
        push(slides, children(list, "." + CLASS_SLIDE + ":not(." + CLASS_CLONE + ")"));
        forOwn({
          arrows: CLASS_ARROWS,
          pagination: CLASS_PAGINATION,
          prev: CLASS_ARROW_PREV,
          next: CLASS_ARROW_NEXT,
          bar: CLASS_PROGRESS_BAR,
          toggle: CLASS_TOGGLE
        }, function (className, key) {
          elements[key] = find("." + className);
        });
        assign(elements, {
          root: root,
          track: track,
          list: list,
          slides: slides
        });
      }

      function init() {
        var id = root.id || uniqueId(PROJECT_CODE);
        var role = options.role;
        root.id = id;
        track.id = track.id || id + "-track";
        list.id = list.id || id + "-list";

        if (!getAttribute(root, ROLE) && root.tagName !== "SECTION" && role) {
          setAttribute(root, ROLE, role);
        }

        setAttribute(root, ARIA_ROLEDESCRIPTION, i18n.carousel);
        setAttribute(list, ROLE, "presentation");
      }

      function find(selector) {
        var elm = query(root, selector);
        return elm && closest(elm, "." + CLASS_ROOT) === root ? elm : void 0;
      }

      function getClasses(base) {
        return [base + "--" + options.type, base + "--" + options.direction, options.drag && base + "--draggable", options.isNavigation && base + "--nav", base === CLASS_ROOT && CLASS_ACTIVE];
      }

      return assign(elements, {
        setup: setup,
        mount: mount,
        destroy: destroy
      });
    }

    var SLIDE = "slide";
    var LOOP = "loop";
    var FADE = "fade";

    function Slide$1(Splide2, index, slideIndex, slide) {
      var event = EventInterface(Splide2);
      var on = event.on,
          emit = event.emit,
          bind = event.bind;
      var Components = Splide2.Components,
          root = Splide2.root,
          options = Splide2.options;
      var isNavigation = options.isNavigation,
          updateOnMove = options.updateOnMove,
          i18n = options.i18n,
          pagination = options.pagination,
          slideFocus = options.slideFocus;
      var resolve = Components.Direction.resolve;
      var styles = getAttribute(slide, "style");
      var label = getAttribute(slide, ARIA_LABEL);
      var isClone = slideIndex > -1;
      var container = child(slide, "." + CLASS_CONTAINER);
      var destroyed;

      function mount() {
        if (!isClone) {
          slide.id = root.id + "-slide" + pad(index + 1);
          setAttribute(slide, ROLE, pagination ? "tabpanel" : "group");
          setAttribute(slide, ARIA_ROLEDESCRIPTION, i18n.slide);
          setAttribute(slide, ARIA_LABEL, label || format(i18n.slideLabel, [index + 1, Splide2.length]));
        }

        listen();
      }

      function listen() {
        bind(slide, "click", apply(emit, EVENT_CLICK, self));
        bind(slide, "keydown", apply(emit, EVENT_SLIDE_KEYDOWN, self));
        on([EVENT_MOVED, EVENT_SHIFTED, EVENT_SCROLLED], update);
        on(EVENT_NAVIGATION_MOUNTED, initNavigation);

        if (updateOnMove) {
          on(EVENT_MOVE, onMove);
        }
      }

      function destroy() {
        destroyed = true;
        event.destroy();
        removeClass(slide, STATUS_CLASSES);
        removeAttribute(slide, ALL_ATTRIBUTES);
        setAttribute(slide, "style", styles);
        setAttribute(slide, ARIA_LABEL, label || "");
      }

      function initNavigation() {
        var controls = Splide2.splides.map(function (target) {
          var Slide2 = target.splide.Components.Slides.getAt(index);
          return Slide2 ? Slide2.slide.id : "";
        }).join(" ");
        setAttribute(slide, ARIA_LABEL, format(i18n.slideX, (isClone ? slideIndex : index) + 1));
        setAttribute(slide, ARIA_CONTROLS, controls);
        setAttribute(slide, ROLE, slideFocus ? "button" : "");
        slideFocus && removeAttribute(slide, ARIA_ROLEDESCRIPTION);
      }

      function onMove() {
        if (!destroyed) {
          update();
        }
      }

      function update() {
        if (!destroyed) {
          var curr = Splide2.index;
          updateActivity();
          updateVisibility();
          toggleClass(slide, CLASS_PREV, index === curr - 1);
          toggleClass(slide, CLASS_NEXT, index === curr + 1);
        }
      }

      function updateActivity() {
        var active = isActive();

        if (active !== hasClass(slide, CLASS_ACTIVE)) {
          toggleClass(slide, CLASS_ACTIVE, active);
          setAttribute(slide, ARIA_CURRENT, isNavigation && active || "");
          emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
        }
      }

      function updateVisibility() {
        var visible = isVisible();
        var hidden = !visible && (!isActive() || isClone);

        if (!Splide2.state.is([MOVING, SCROLLING])) {
          setAttribute(slide, ARIA_HIDDEN, hidden || "");
        }

        setAttribute(queryAll(slide, options.focusableNodes || ""), TAB_INDEX, hidden ? -1 : "");

        if (slideFocus) {
          setAttribute(slide, TAB_INDEX, hidden ? -1 : 0);
        }

        if (visible !== hasClass(slide, CLASS_VISIBLE)) {
          toggleClass(slide, CLASS_VISIBLE, visible);
          emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self);
        }

        if (!visible && document.activeElement === slide) {
          var Slide2 = Components.Slides.getAt(Splide2.index);
          Slide2 && focus(Slide2.slide);
        }
      }

      function style$1(prop, value, useContainer) {
        style(useContainer && container || slide, prop, value);
      }

      function isActive() {
        var curr = Splide2.index;
        return curr === index || options.cloneStatus && curr === slideIndex;
      }

      function isVisible() {
        if (Splide2.is(FADE)) {
          return isActive();
        }

        var trackRect = rect(Components.Elements.track);
        var slideRect = rect(slide);
        var left = resolve("left", true);
        var right = resolve("right", true);
        return floor(trackRect[left]) <= ceil(slideRect[left]) && floor(slideRect[right]) <= ceil(trackRect[right]);
      }

      function isWithin(from, distance) {
        var diff = abs(from - index);

        if (!isClone && (options.rewind || Splide2.is(LOOP))) {
          diff = min(diff, Splide2.length - diff);
        }

        return diff <= distance;
      }

      var self = {
        index: index,
        slideIndex: slideIndex,
        slide: slide,
        container: container,
        isClone: isClone,
        mount: mount,
        destroy: destroy,
        update: update,
        style: style$1,
        isWithin: isWithin
      };
      return self;
    }

    function Slides(Splide2, Components2, options) {
      var _EventInterface2 = EventInterface(Splide2),
          on = _EventInterface2.on,
          emit = _EventInterface2.emit,
          bind = _EventInterface2.bind;

      var _Components2$Elements = Components2.Elements,
          slides = _Components2$Elements.slides,
          list = _Components2$Elements.list;
      var Slides2 = [];

      function mount() {
        init();
        on(EVENT_REFRESH, destroy);
        on(EVENT_REFRESH, init);
      }

      function init() {
        slides.forEach(function (slide, index) {
          register(slide, index, -1);
        });
      }

      function destroy() {
        forEach$1(function (Slide2) {
          Slide2.destroy();
        });
        empty(Slides2);
      }

      function update() {
        forEach$1(function (Slide2) {
          Slide2.update();
        });
      }

      function register(slide, index, slideIndex) {
        var object = Slide$1(Splide2, index, slideIndex, slide);
        object.mount();
        Slides2.push(object);
        Slides2.sort(function (Slide1, Slide2) {
          return Slide1.index - Slide2.index;
        });
      }

      function get(excludeClones) {
        return excludeClones ? filter(function (Slide2) {
          return !Slide2.isClone;
        }) : Slides2;
      }

      function getIn(page) {
        var Controller = Components2.Controller;
        var index = Controller.toIndex(page);
        var max = Controller.hasFocus() ? 1 : options.perPage;
        return filter(function (Slide2) {
          return between(Slide2.index, index, index + max - 1);
        });
      }

      function getAt(index) {
        return filter(index)[0];
      }

      function add(items, index) {
        forEach(items, function (slide) {
          if (isString(slide)) {
            slide = parseHtml(slide);
          }

          if (isHTMLElement(slide)) {
            var ref = slides[index];
            ref ? before(slide, ref) : append(list, slide);
            addClass(slide, options.classes.slide);
            observeImages(slide, apply(emit, EVENT_RESIZE));
          }
        });
        emit(EVENT_REFRESH);
      }

      function remove$1(matcher) {
        remove(filter(matcher).map(function (Slide2) {
          return Slide2.slide;
        }));
        emit(EVENT_REFRESH);
      }

      function forEach$1(iteratee, excludeClones) {
        get(excludeClones).forEach(iteratee);
      }

      function filter(matcher) {
        return Slides2.filter(isFunction(matcher) ? matcher : function (Slide2) {
          return isString(matcher) ? matches(Slide2.slide, matcher) : includes(toArray(matcher), Slide2.index);
        });
      }

      function style(prop, value, useContainer) {
        forEach$1(function (Slide2) {
          Slide2.style(prop, value, useContainer);
        });
      }

      function observeImages(elm, callback) {
        var images = queryAll(elm, "img");
        var length = images.length;

        if (length) {
          images.forEach(function (img) {
            bind(img, "load error", function () {
              if (! --length) {
                callback();
              }
            });
          });
        } else {
          callback();
        }
      }

      function getLength(excludeClones) {
        return excludeClones ? slides.length : Slides2.length;
      }

      function isEnough() {
        return Slides2.length > options.perPage;
      }

      return {
        mount: mount,
        destroy: destroy,
        update: update,
        register: register,
        get: get,
        getIn: getIn,
        getAt: getAt,
        add: add,
        remove: remove$1,
        forEach: forEach$1,
        filter: filter,
        style: style,
        getLength: getLength,
        isEnough: isEnough
      };
    }

    function Layout(Splide2, Components2, options) {
      var _EventInterface3 = EventInterface(Splide2),
          on = _EventInterface3.on,
          bind = _EventInterface3.bind,
          emit = _EventInterface3.emit;

      var Slides = Components2.Slides;
      var resolve = Components2.Direction.resolve;
      var _Components2$Elements2 = Components2.Elements,
          root = _Components2$Elements2.root,
          track = _Components2$Elements2.track,
          list = _Components2$Elements2.list;
      var getAt = Slides.getAt,
          styleSlides = Slides.style;
      var vertical;
      var rootRect;
      var overflow;

      function mount() {
        init();
        bind(window, "resize load", Throttle(apply(emit, EVENT_RESIZE)));
        on([EVENT_UPDATED, EVENT_REFRESH], init);
        on(EVENT_RESIZE, resize);
      }

      function init() {
        vertical = options.direction === TTB;
        style(root, "maxWidth", unit(options.width));
        style(track, resolve("paddingLeft"), cssPadding(false));
        style(track, resolve("paddingRight"), cssPadding(true));
        resize(true);
      }

      function resize(force) {
        var newRect = rect(root);

        if (force || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
          style(track, "height", cssTrackHeight());
          styleSlides(resolve("marginRight"), unit(options.gap));
          styleSlides("width", cssSlideWidth());
          styleSlides("height", cssSlideHeight(), true);
          rootRect = newRect;
          emit(EVENT_RESIZED);

          if (overflow !== (overflow = isOverflow())) {
            toggleClass(root, CLASS_OVERFLOW, overflow);
            emit(EVENT_OVERFLOW, overflow);
          }
        }
      }

      function cssPadding(right) {
        var padding = options.padding;
        var prop = resolve(right ? "right" : "left");
        return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
      }

      function cssTrackHeight() {
        var height = "";

        if (vertical) {
          height = cssHeight();
          assert(height, "height or heightRatio is missing.");
          height = "calc(" + height + " - " + cssPadding(false) + " - " + cssPadding(true) + ")";
        }

        return height;
      }

      function cssHeight() {
        return unit(options.height || rect(list).width * options.heightRatio);
      }

      function cssSlideWidth() {
        return options.autoWidth ? null : unit(options.fixedWidth) || (vertical ? "" : cssSlideSize());
      }

      function cssSlideHeight() {
        return unit(options.fixedHeight) || (vertical ? options.autoHeight ? null : cssSlideSize() : cssHeight());
      }

      function cssSlideSize() {
        var gap = unit(options.gap);
        return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
      }

      function listSize() {
        return rect(list)[resolve("width")];
      }

      function slideSize(index, withoutGap) {
        var Slide = getAt(index || 0);
        return Slide ? rect(Slide.slide)[resolve("width")] + (withoutGap ? 0 : getGap()) : 0;
      }

      function totalSize(index, withoutGap) {
        var Slide = getAt(index);

        if (Slide) {
          var right = rect(Slide.slide)[resolve("right")];
          var left = rect(list)[resolve("left")];
          return abs(right - left) + (withoutGap ? 0 : getGap());
        }

        return 0;
      }

      function sliderSize(withoutGap) {
        return totalSize(Splide2.length - 1) - totalSize(0) + slideSize(0, withoutGap);
      }

      function getGap() {
        var Slide = getAt(0);
        return Slide && parseFloat(style(Slide.slide, resolve("marginRight"))) || 0;
      }

      function getPadding(right) {
        return parseFloat(style(track, resolve("padding" + (right ? "Right" : "Left")))) || 0;
      }

      function isOverflow() {
        return Splide2.is(FADE) || sliderSize(true) > listSize();
      }

      return {
        mount: mount,
        resize: resize,
        listSize: listSize,
        slideSize: slideSize,
        sliderSize: sliderSize,
        totalSize: totalSize,
        getPadding: getPadding,
        isOverflow: isOverflow
      };
    }

    var MULTIPLIER = 2;

    function Clones(Splide2, Components2, options) {
      var event = EventInterface(Splide2);
      var on = event.on;
      var Elements = Components2.Elements,
          Slides = Components2.Slides;
      var resolve = Components2.Direction.resolve;
      var clones = [];
      var cloneCount;

      function mount() {
        on(EVENT_REFRESH, remount);
        on([EVENT_UPDATED, EVENT_RESIZE], observe);

        if (cloneCount = computeCloneCount()) {
          generate(cloneCount);
          Components2.Layout.resize(true);
        }
      }

      function remount() {
        destroy();
        mount();
      }

      function destroy() {
        remove(clones);
        empty(clones);
        event.destroy();
      }

      function observe() {
        var count = computeCloneCount();

        if (cloneCount !== count) {
          if (cloneCount < count || !count) {
            event.emit(EVENT_REFRESH);
          }
        }
      }

      function generate(count) {
        var slides = Slides.get().slice();
        var length = slides.length;

        if (length) {
          while (slides.length < count) {
            push(slides, slides);
          }

          push(slides.slice(-count), slides.slice(0, count)).forEach(function (Slide, index) {
            var isHead = index < count;
            var clone = cloneDeep(Slide.slide, index);
            isHead ? before(clone, slides[0].slide) : append(Elements.list, clone);
            push(clones, clone);
            Slides.register(clone, index - count + (isHead ? 0 : length), Slide.index);
          });
        }
      }

      function cloneDeep(elm, index) {
        var clone = elm.cloneNode(true);
        addClass(clone, options.classes.clone);
        clone.id = Splide2.root.id + "-clone" + pad(index + 1);
        return clone;
      }

      function computeCloneCount() {
        var clones2 = options.clones;

        if (!Splide2.is(LOOP)) {
          clones2 = 0;
        } else if (isUndefined(clones2)) {
          var fixedSize = options[resolve("fixedWidth")] && Components2.Layout.slideSize(0);
          var fixedCount = fixedSize && ceil(rect(Elements.track)[resolve("width")] / fixedSize);
          clones2 = fixedCount || options[resolve("autoWidth")] && Splide2.length || options.perPage * MULTIPLIER;
        }

        return clones2;
      }

      return {
        mount: mount,
        destroy: destroy
      };
    }

    function Move(Splide2, Components2, options) {
      var _EventInterface4 = EventInterface(Splide2),
          on = _EventInterface4.on,
          emit = _EventInterface4.emit;

      var set = Splide2.state.set;
      var _Components2$Layout = Components2.Layout,
          slideSize = _Components2$Layout.slideSize,
          getPadding = _Components2$Layout.getPadding,
          totalSize = _Components2$Layout.totalSize,
          listSize = _Components2$Layout.listSize,
          sliderSize = _Components2$Layout.sliderSize;
      var _Components2$Directio = Components2.Direction,
          resolve = _Components2$Directio.resolve,
          orient = _Components2$Directio.orient;
      var _Components2$Elements3 = Components2.Elements,
          list = _Components2$Elements3.list,
          track = _Components2$Elements3.track;
      var Transition;

      function mount() {
        Transition = Components2.Transition;
        on([EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH], reposition);
      }

      function reposition() {
        if (!Components2.Controller.isBusy()) {
          Components2.Scroll.cancel();
          jump(Splide2.index);
          Components2.Slides.update();
        }
      }

      function move(dest, index, prev, callback) {
        if (dest !== index && canShift(dest > prev)) {
          cancel();
          translate(shift(getPosition(), dest > prev), true);
        }

        set(MOVING);
        emit(EVENT_MOVE, index, prev, dest);
        Transition.start(index, function () {
          set(IDLE);
          emit(EVENT_MOVED, index, prev, dest);
          callback && callback();
        });
      }

      function jump(index) {
        translate(toPosition(index, true));
      }

      function translate(position, preventLoop) {
        if (!Splide2.is(FADE)) {
          var destination = preventLoop ? position : loop(position);
          style(list, "transform", "translate" + resolve("X") + "(" + destination + "px)");
          position !== destination && emit(EVENT_SHIFTED);
        }
      }

      function loop(position) {
        if (Splide2.is(LOOP)) {
          var index = toIndex(position);
          var exceededMax = index > Components2.Controller.getEnd();
          var exceededMin = index < 0;

          if (exceededMin || exceededMax) {
            position = shift(position, exceededMax);
          }
        }

        return position;
      }

      function shift(position, backwards) {
        var excess = position - getLimit(backwards);
        var size = sliderSize();
        position -= orient(size * (ceil(abs(excess) / size) || 1)) * (backwards ? 1 : -1);
        return position;
      }

      function cancel() {
        translate(getPosition(), true);
        Transition.cancel();
      }

      function toIndex(position) {
        var Slides = Components2.Slides.get();
        var index = 0;
        var minDistance = Infinity;

        for (var i = 0; i < Slides.length; i++) {
          var slideIndex = Slides[i].index;
          var distance = abs(toPosition(slideIndex, true) - position);

          if (distance <= minDistance) {
            minDistance = distance;
            index = slideIndex;
          } else {
            break;
          }
        }

        return index;
      }

      function toPosition(index, trimming) {
        var position = orient(totalSize(index - 1) - offset(index));
        return trimming ? trim(position) : position;
      }

      function getPosition() {
        var left = resolve("left");
        return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
      }

      function trim(position) {
        if (options.trimSpace && Splide2.is(SLIDE)) {
          position = clamp(position, 0, orient(sliderSize(true) - listSize()));
        }

        return position;
      }

      function offset(index) {
        var focus = options.focus;
        return focus === "center" ? (listSize() - slideSize(index, true)) / 2 : +focus * slideSize(index) || 0;
      }

      function getLimit(max) {
        return toPosition(max ? Components2.Controller.getEnd() : 0, !!options.trimSpace);
      }

      function canShift(backwards) {
        var shifted = orient(shift(getPosition(), backwards));
        return backwards ? shifted >= 0 : shifted <= list[resolve("scrollWidth")] - rect(track)[resolve("width")];
      }

      function exceededLimit(max, position) {
        position = isUndefined(position) ? getPosition() : position;
        var exceededMin = max !== true && orient(position) < orient(getLimit(false));
        var exceededMax = max !== false && orient(position) > orient(getLimit(true));
        return exceededMin || exceededMax;
      }

      return {
        mount: mount,
        move: move,
        jump: jump,
        translate: translate,
        shift: shift,
        cancel: cancel,
        toIndex: toIndex,
        toPosition: toPosition,
        getPosition: getPosition,
        getLimit: getLimit,
        exceededLimit: exceededLimit,
        reposition: reposition
      };
    }

    function Controller(Splide2, Components2, options) {
      var _EventInterface5 = EventInterface(Splide2),
          on = _EventInterface5.on,
          emit = _EventInterface5.emit;

      var Move = Components2.Move;
      var getPosition = Move.getPosition,
          getLimit = Move.getLimit,
          toPosition = Move.toPosition;
      var _Components2$Slides = Components2.Slides,
          isEnough = _Components2$Slides.isEnough,
          getLength = _Components2$Slides.getLength;
      var omitEnd = options.omitEnd;
      var isLoop = Splide2.is(LOOP);
      var isSlide = Splide2.is(SLIDE);
      var getNext = apply(getAdjacent, false);
      var getPrev = apply(getAdjacent, true);
      var currIndex = options.start || 0;
      var endIndex;
      var prevIndex = currIndex;
      var slideCount;
      var perMove;
      var perPage;

      function mount() {
        init();
        on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], init);
        on(EVENT_RESIZED, onResized);
      }

      function init() {
        slideCount = getLength(true);
        perMove = options.perMove;
        perPage = options.perPage;
        endIndex = getEnd();
        var index = clamp(currIndex, 0, omitEnd ? endIndex : slideCount - 1);

        if (index !== currIndex) {
          currIndex = index;
          Move.reposition();
        }
      }

      function onResized() {
        if (endIndex !== getEnd()) {
          emit(EVENT_END_INDEX_CHANGED);
        }
      }

      function go(control, allowSameIndex, callback) {
        if (!isBusy()) {
          var dest = parse(control);
          var index = loop(dest);

          if (index > -1 && (allowSameIndex || index !== currIndex)) {
            setIndex(index);
            Move.move(dest, index, prevIndex, callback);
          }
        }
      }

      function scroll(destination, duration, snap, callback) {
        Components2.Scroll.scroll(destination, duration, snap, function () {
          var index = loop(Move.toIndex(getPosition()));
          setIndex(omitEnd ? min(index, endIndex) : index);
          callback && callback();
        });
      }

      function parse(control) {
        var index = currIndex;

        if (isString(control)) {
          var _ref = control.match(/([+\-<>])(\d+)?/) || [],
              indicator = _ref[1],
              number = _ref[2];

          if (indicator === "+" || indicator === "-") {
            index = computeDestIndex(currIndex + +("" + indicator + (+number || 1)), currIndex);
          } else if (indicator === ">") {
            index = number ? toIndex(+number) : getNext(true);
          } else if (indicator === "<") {
            index = getPrev(true);
          }
        } else {
          index = isLoop ? control : clamp(control, 0, endIndex);
        }

        return index;
      }

      function getAdjacent(prev, destination) {
        var number = perMove || (hasFocus() ? 1 : perPage);
        var dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex, !(perMove || hasFocus()));

        if (dest === -1 && isSlide) {
          if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) {
            return prev ? 0 : endIndex;
          }
        }

        return destination ? dest : loop(dest);
      }

      function computeDestIndex(dest, from, snapPage) {
        if (isEnough() || hasFocus()) {
          var index = computeMovableDestIndex(dest);

          if (index !== dest) {
            from = dest;
            dest = index;
            snapPage = false;
          }

          if (dest < 0 || dest > endIndex) {
            if (!perMove && (between(0, dest, from, true) || between(endIndex, from, dest, true))) {
              dest = toIndex(toPage(dest));
            } else {
              if (isLoop) {
                dest = snapPage ? dest < 0 ? -(slideCount % perPage || perPage) : slideCount : dest;
              } else if (options.rewind) {
                dest = dest < 0 ? endIndex : 0;
              } else {
                dest = -1;
              }
            }
          } else {
            if (snapPage && dest !== from) {
              dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
            }
          }
        } else {
          dest = -1;
        }

        return dest;
      }

      function computeMovableDestIndex(dest) {
        if (isSlide && options.trimSpace === "move" && dest !== currIndex) {
          var position = getPosition();

          while (position === toPosition(dest, true) && between(dest, 0, Splide2.length - 1, !options.rewind)) {
            dest < currIndex ? --dest : ++dest;
          }
        }

        return dest;
      }

      function loop(index) {
        return isLoop ? (index + slideCount) % slideCount || 0 : index;
      }

      function getEnd() {
        var end = slideCount - (hasFocus() || isLoop && perMove ? 1 : perPage);

        while (omitEnd && end-- > 0) {
          if (toPosition(slideCount - 1, true) !== toPosition(end, true)) {
            end++;
            break;
          }
        }

        return clamp(end, 0, slideCount - 1);
      }

      function toIndex(page) {
        return clamp(hasFocus() ? page : perPage * page, 0, endIndex);
      }

      function toPage(index) {
        return hasFocus() ? min(index, endIndex) : floor((index >= endIndex ? slideCount - 1 : index) / perPage);
      }

      function toDest(destination) {
        var closest = Move.toIndex(destination);
        return isSlide ? clamp(closest, 0, endIndex) : closest;
      }

      function setIndex(index) {
        if (index !== currIndex) {
          prevIndex = currIndex;
          currIndex = index;
        }
      }

      function getIndex(prev) {
        return prev ? prevIndex : currIndex;
      }

      function hasFocus() {
        return !isUndefined(options.focus) || options.isNavigation;
      }

      function isBusy() {
        return Splide2.state.is([MOVING, SCROLLING]) && !!options.waitForTransition;
      }

      return {
        mount: mount,
        go: go,
        scroll: scroll,
        getNext: getNext,
        getPrev: getPrev,
        getAdjacent: getAdjacent,
        getEnd: getEnd,
        setIndex: setIndex,
        getIndex: getIndex,
        toIndex: toIndex,
        toPage: toPage,
        toDest: toDest,
        hasFocus: hasFocus,
        isBusy: isBusy
      };
    }

    var XML_NAME_SPACE = "http://www.w3.org/2000/svg";
    var PATH = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z";
    var SIZE = 40;

    function Arrows(Splide2, Components2, options) {
      var event = EventInterface(Splide2);
      var on = event.on,
          bind = event.bind,
          emit = event.emit;
      var classes = options.classes,
          i18n = options.i18n;
      var Elements = Components2.Elements,
          Controller = Components2.Controller;
      var placeholder = Elements.arrows,
          track = Elements.track;
      var wrapper = placeholder;
      var prev = Elements.prev;
      var next = Elements.next;
      var created;
      var wrapperClasses;
      var arrows = {};

      function mount() {
        init();
        on(EVENT_UPDATED, remount);
      }

      function remount() {
        destroy();
        mount();
      }

      function init() {
        var enabled = options.arrows;

        if (enabled && !(prev && next)) {
          createArrows();
        }

        if (prev && next) {
          assign(arrows, {
            prev: prev,
            next: next
          });
          display(wrapper, enabled ? "" : "none");
          addClass(wrapper, wrapperClasses = CLASS_ARROWS + "--" + options.direction);

          if (enabled) {
            listen();
            update();
            setAttribute([prev, next], ARIA_CONTROLS, track.id);
            emit(EVENT_ARROWS_MOUNTED, prev, next);
          }
        }
      }

      function destroy() {
        event.destroy();
        removeClass(wrapper, wrapperClasses);

        if (created) {
          remove(placeholder ? [prev, next] : wrapper);
          prev = next = null;
        } else {
          removeAttribute([prev, next], ALL_ATTRIBUTES);
        }
      }

      function listen() {
        on([EVENT_MOUNTED, EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED, EVENT_END_INDEX_CHANGED], update);
        bind(next, "click", apply(go, ">"));
        bind(prev, "click", apply(go, "<"));
      }

      function go(control) {
        Controller.go(control, true);
      }

      function createArrows() {
        wrapper = placeholder || create("div", classes.arrows);
        prev = createArrow(true);
        next = createArrow(false);
        created = true;
        append(wrapper, [prev, next]);
        !placeholder && before(wrapper, track);
      }

      function createArrow(prev2) {
        var arrow = "<button class=\"" + classes.arrow + " " + (prev2 ? classes.prev : classes.next) + "\" type=\"button\"><svg xmlns=\"" + XML_NAME_SPACE + "\" viewBox=\"0 0 " + SIZE + " " + SIZE + "\" width=\"" + SIZE + "\" height=\"" + SIZE + "\" focusable=\"false\"><path d=\"" + (options.arrowPath || PATH) + "\" />";
        return parseHtml(arrow);
      }

      function update() {
        if (prev && next) {
          var index = Splide2.index;
          var prevIndex = Controller.getPrev();
          var nextIndex = Controller.getNext();
          var prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
          var nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
          prev.disabled = prevIndex < 0;
          next.disabled = nextIndex < 0;
          setAttribute(prev, ARIA_LABEL, prevLabel);
          setAttribute(next, ARIA_LABEL, nextLabel);
          emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
        }
      }

      return {
        arrows: arrows,
        mount: mount,
        destroy: destroy,
        update: update
      };
    }

    var INTERVAL_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-interval";

    function Autoplay(Splide2, Components2, options) {
      var _EventInterface6 = EventInterface(Splide2),
          on = _EventInterface6.on,
          bind = _EventInterface6.bind,
          emit = _EventInterface6.emit;

      var interval = RequestInterval(options.interval, Splide2.go.bind(Splide2, ">"), onAnimationFrame);
      var isPaused = interval.isPaused;
      var Elements = Components2.Elements,
          _Components2$Elements4 = Components2.Elements,
          root = _Components2$Elements4.root,
          toggle = _Components2$Elements4.toggle;
      var autoplay = options.autoplay;
      var hovered;
      var focused;
      var stopped = autoplay === "pause";

      function mount() {
        if (autoplay) {
          listen();
          toggle && setAttribute(toggle, ARIA_CONTROLS, Elements.track.id);
          stopped || play();
          update();
        }
      }

      function listen() {
        if (options.pauseOnHover) {
          bind(root, "mouseenter mouseleave", function (e) {
            hovered = e.type === "mouseenter";
            autoToggle();
          });
        }

        if (options.pauseOnFocus) {
          bind(root, "focusin focusout", function (e) {
            focused = e.type === "focusin";
            autoToggle();
          });
        }

        if (toggle) {
          bind(toggle, "click", function () {
            stopped ? play() : pause(true);
          });
        }

        on([EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH], interval.rewind);
        on(EVENT_MOVE, onMove);
      }

      function play() {
        if (isPaused() && Components2.Slides.isEnough()) {
          interval.start(!options.resetProgress);
          focused = hovered = stopped = false;
          update();
          emit(EVENT_AUTOPLAY_PLAY);
        }
      }

      function pause(stop) {
        if (stop === void 0) {
          stop = true;
        }

        stopped = !!stop;
        update();

        if (!isPaused()) {
          interval.pause();
          emit(EVENT_AUTOPLAY_PAUSE);
        }
      }

      function autoToggle() {
        if (!stopped) {
          hovered || focused ? pause(false) : play();
        }
      }

      function update() {
        if (toggle) {
          toggleClass(toggle, CLASS_ACTIVE, !stopped);
          setAttribute(toggle, ARIA_LABEL, options.i18n[stopped ? "play" : "pause"]);
        }
      }

      function onAnimationFrame(rate) {
        var bar = Elements.bar;
        bar && style(bar, "width", rate * 100 + "%");
        emit(EVENT_AUTOPLAY_PLAYING, rate);
      }

      function onMove(index) {
        var Slide = Components2.Slides.getAt(index);
        interval.set(Slide && +getAttribute(Slide.slide, INTERVAL_DATA_ATTRIBUTE) || options.interval);
      }

      return {
        mount: mount,
        destroy: interval.cancel,
        play: play,
        pause: pause,
        isPaused: isPaused
      };
    }

    function Cover(Splide2, Components2, options) {
      var _EventInterface7 = EventInterface(Splide2),
          on = _EventInterface7.on;

      function mount() {
        if (options.cover) {
          on(EVENT_LAZYLOAD_LOADED, apply(toggle, true));
          on([EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH], apply(cover, true));
        }
      }

      function cover(cover2) {
        Components2.Slides.forEach(function (Slide) {
          var img = child(Slide.container || Slide.slide, "img");

          if (img && img.src) {
            toggle(cover2, img, Slide);
          }
        });
      }

      function toggle(cover2, img, Slide) {
        Slide.style("background", cover2 ? "center/cover no-repeat url(\"" + img.src + "\")" : "", true);
        display(img, cover2 ? "none" : "");
      }

      return {
        mount: mount,
        destroy: apply(cover, false)
      };
    }

    var BOUNCE_DIFF_THRESHOLD = 10;
    var BOUNCE_DURATION = 600;
    var FRICTION_FACTOR = 0.6;
    var BASE_VELOCITY = 1.5;
    var MIN_DURATION = 800;

    function Scroll(Splide2, Components2, options) {
      var _EventInterface8 = EventInterface(Splide2),
          on = _EventInterface8.on,
          emit = _EventInterface8.emit;

      var set = Splide2.state.set;
      var Move = Components2.Move;
      var getPosition = Move.getPosition,
          getLimit = Move.getLimit,
          exceededLimit = Move.exceededLimit,
          translate = Move.translate;
      var isSlide = Splide2.is(SLIDE);
      var interval;
      var callback;
      var friction = 1;

      function mount() {
        on(EVENT_MOVE, clear);
        on([EVENT_UPDATED, EVENT_REFRESH], cancel);
      }

      function scroll(destination, duration, snap, onScrolled, noConstrain) {
        var from = getPosition();
        clear();

        if (snap && (!isSlide || !exceededLimit())) {
          var size = Components2.Layout.sliderSize();
          var offset = sign(destination) * size * floor(abs(destination) / size) || 0;
          destination = Move.toPosition(Components2.Controller.toDest(destination % size)) + offset;
        }

        var noDistance = approximatelyEqual(from, destination, 1);
        friction = 1;
        duration = noDistance ? 0 : duration || max(abs(destination - from) / BASE_VELOCITY, MIN_DURATION);
        callback = onScrolled;
        interval = RequestInterval(duration, onEnd, apply(update, from, destination, noConstrain), 1);
        set(SCROLLING);
        emit(EVENT_SCROLL);
        interval.start();
      }

      function onEnd() {
        set(IDLE);
        callback && callback();
        emit(EVENT_SCROLLED);
      }

      function update(from, to, noConstrain, rate) {
        var position = getPosition();
        var target = from + (to - from) * easing(rate);
        var diff = (target - position) * friction;
        translate(position + diff);

        if (isSlide && !noConstrain && exceededLimit()) {
          friction *= FRICTION_FACTOR;

          if (abs(diff) < BOUNCE_DIFF_THRESHOLD) {
            scroll(getLimit(exceededLimit(true)), BOUNCE_DURATION, false, callback, true);
          }
        }
      }

      function clear() {
        if (interval) {
          interval.cancel();
        }
      }

      function cancel() {
        if (interval && !interval.isPaused()) {
          clear();
          onEnd();
        }
      }

      function easing(t) {
        var easingFunc = options.easingFunc;
        return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
      }

      return {
        mount: mount,
        destroy: clear,
        scroll: scroll,
        cancel: cancel
      };
    }

    var SCROLL_LISTENER_OPTIONS = {
      passive: false,
      capture: true
    };

    function Drag(Splide2, Components2, options) {
      var _EventInterface9 = EventInterface(Splide2),
          on = _EventInterface9.on,
          emit = _EventInterface9.emit,
          bind = _EventInterface9.bind,
          unbind = _EventInterface9.unbind;

      var state = Splide2.state;
      var Move = Components2.Move,
          Scroll = Components2.Scroll,
          Controller = Components2.Controller,
          track = Components2.Elements.track,
          reduce = Components2.Media.reduce;
      var _Components2$Directio2 = Components2.Direction,
          resolve = _Components2$Directio2.resolve,
          orient = _Components2$Directio2.orient;
      var getPosition = Move.getPosition,
          exceededLimit = Move.exceededLimit;
      var basePosition;
      var baseEvent;
      var prevBaseEvent;
      var isFree;
      var dragging;
      var exceeded = false;
      var clickPrevented;
      var disabled;
      var target;

      function mount() {
        bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
        bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
        bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
        bind(track, "click", onClick, {
          capture: true
        });
        bind(track, "dragstart", prevent);
        on([EVENT_MOUNTED, EVENT_UPDATED], init);
      }

      function init() {
        var drag = options.drag;
        disable(!drag);
        isFree = drag === "free";
      }

      function onPointerDown(e) {
        clickPrevented = false;

        if (!disabled) {
          var isTouch = isTouchEvent(e);

          if (isDraggable(e.target) && (isTouch || !e.button)) {
            if (!Controller.isBusy()) {
              target = isTouch ? track : window;
              dragging = state.is([MOVING, SCROLLING]);
              prevBaseEvent = null;
              bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
              bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
              Move.cancel();
              Scroll.cancel();
              save(e);
            } else {
              prevent(e, true);
            }
          }
        }
      }

      function onPointerMove(e) {
        if (!state.is(DRAGGING)) {
          state.set(DRAGGING);
          emit(EVENT_DRAG);
        }

        if (e.cancelable) {
          if (dragging) {
            Move.translate(basePosition + constrain(diffCoord(e)));
            var expired = diffTime(e) > LOG_INTERVAL;
            var hasExceeded = exceeded !== (exceeded = exceededLimit());

            if (expired || hasExceeded) {
              save(e);
            }

            clickPrevented = true;
            emit(EVENT_DRAGGING);
            prevent(e);
          } else if (isSliderDirection(e)) {
            dragging = shouldStart(e);
            prevent(e);
          }
        }
      }

      function onPointerUp(e) {
        if (state.is(DRAGGING)) {
          state.set(IDLE);
          emit(EVENT_DRAGGED);
        }

        if (dragging) {
          move(e);
          prevent(e);
        }

        unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
        unbind(target, POINTER_UP_EVENTS, onPointerUp);
        dragging = false;
      }

      function onClick(e) {
        if (!disabled && clickPrevented) {
          prevent(e, true);
        }
      }

      function save(e) {
        prevBaseEvent = baseEvent;
        baseEvent = e;
        basePosition = getPosition();
      }

      function move(e) {
        var velocity = computeVelocity(e);
        var destination = computeDestination(velocity);
        var rewind = options.rewind && options.rewindByDrag;
        reduce(false);

        if (isFree) {
          Controller.scroll(destination, 0, options.snap);
        } else if (Splide2.is(FADE)) {
          Controller.go(orient(sign(velocity)) < 0 ? rewind ? "<" : "-" : rewind ? ">" : "+");
        } else if (Splide2.is(SLIDE) && exceeded && rewind) {
          Controller.go(exceededLimit(true) ? ">" : "<");
        } else {
          Controller.go(Controller.toDest(destination), true);
        }

        reduce(true);
      }

      function shouldStart(e) {
        var thresholds = options.dragMinThreshold;
        var isObj = isObject(thresholds);
        var mouse = isObj && thresholds.mouse || 0;
        var touch = (isObj ? thresholds.touch : +thresholds) || 10;
        return abs(diffCoord(e)) > (isTouchEvent(e) ? touch : mouse);
      }

      function isSliderDirection(e) {
        return abs(diffCoord(e)) > abs(diffCoord(e, true));
      }

      function computeVelocity(e) {
        if (Splide2.is(LOOP) || !exceeded) {
          var time = diffTime(e);

          if (time && time < LOG_INTERVAL) {
            return diffCoord(e) / time;
          }
        }

        return 0;
      }

      function computeDestination(velocity) {
        return getPosition() + sign(velocity) * min(abs(velocity) * (options.flickPower || 600), isFree ? Infinity : Components2.Layout.listSize() * (options.flickMaxPages || 1));
      }

      function diffCoord(e, orthogonal) {
        return coordOf(e, orthogonal) - coordOf(getBaseEvent(e), orthogonal);
      }

      function diffTime(e) {
        return timeOf(e) - timeOf(getBaseEvent(e));
      }

      function getBaseEvent(e) {
        return baseEvent === e && prevBaseEvent || baseEvent;
      }

      function coordOf(e, orthogonal) {
        return (isTouchEvent(e) ? e.changedTouches[0] : e)["page" + resolve(orthogonal ? "Y" : "X")];
      }

      function constrain(diff) {
        return diff / (exceeded && Splide2.is(SLIDE) ? FRICTION : 1);
      }

      function isDraggable(target2) {
        var noDrag = options.noDrag;
        return !matches(target2, "." + CLASS_PAGINATION_PAGE + ", ." + CLASS_ARROW) && (!noDrag || !matches(target2, noDrag));
      }

      function isTouchEvent(e) {
        return typeof TouchEvent !== "undefined" && e instanceof TouchEvent;
      }

      function isDragging() {
        return dragging;
      }

      function disable(value) {
        disabled = value;
      }

      return {
        mount: mount,
        disable: disable,
        isDragging: isDragging
      };
    }

    var NORMALIZATION_MAP = {
      Spacebar: " ",
      Right: ARROW_RIGHT,
      Left: ARROW_LEFT,
      Up: ARROW_UP,
      Down: ARROW_DOWN
    };

    function normalizeKey(key) {
      key = isString(key) ? key : key.key;
      return NORMALIZATION_MAP[key] || key;
    }

    var KEYBOARD_EVENT = "keydown";

    function Keyboard(Splide2, Components2, options) {
      var _EventInterface10 = EventInterface(Splide2),
          on = _EventInterface10.on,
          bind = _EventInterface10.bind,
          unbind = _EventInterface10.unbind;

      var root = Splide2.root;
      var resolve = Components2.Direction.resolve;
      var target;
      var disabled;

      function mount() {
        init();
        on(EVENT_UPDATED, destroy);
        on(EVENT_UPDATED, init);
        on(EVENT_MOVE, onMove);
      }

      function init() {
        var keyboard = options.keyboard;

        if (keyboard) {
          target = keyboard === "global" ? window : root;
          bind(target, KEYBOARD_EVENT, onKeydown);
        }
      }

      function destroy() {
        unbind(target, KEYBOARD_EVENT);
      }

      function disable(value) {
        disabled = value;
      }

      function onMove() {
        var _disabled = disabled;
        disabled = true;
        nextTick(function () {
          disabled = _disabled;
        });
      }

      function onKeydown(e) {
        if (!disabled) {
          var key = normalizeKey(e);

          if (key === resolve(ARROW_LEFT)) {
            Splide2.go("<");
          } else if (key === resolve(ARROW_RIGHT)) {
            Splide2.go(">");
          }
        }
      }

      return {
        mount: mount,
        destroy: destroy,
        disable: disable
      };
    }

    var SRC_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-lazy";
    var SRCSET_DATA_ATTRIBUTE = SRC_DATA_ATTRIBUTE + "-srcset";
    var IMAGE_SELECTOR = "[" + SRC_DATA_ATTRIBUTE + "], [" + SRCSET_DATA_ATTRIBUTE + "]";

    function LazyLoad(Splide2, Components2, options) {
      var _EventInterface11 = EventInterface(Splide2),
          on = _EventInterface11.on,
          off = _EventInterface11.off,
          bind = _EventInterface11.bind,
          emit = _EventInterface11.emit;

      var isSequential = options.lazyLoad === "sequential";
      var events = [EVENT_MOVED, EVENT_SCROLLED];
      var entries = [];

      function mount() {
        if (options.lazyLoad) {
          init();
          on(EVENT_REFRESH, init);
        }
      }

      function init() {
        empty(entries);
        register();

        if (isSequential) {
          loadNext();
        } else {
          off(events);
          on(events, check);
          check();
        }
      }

      function register() {
        Components2.Slides.forEach(function (Slide) {
          queryAll(Slide.slide, IMAGE_SELECTOR).forEach(function (img) {
            var src = getAttribute(img, SRC_DATA_ATTRIBUTE);
            var srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);

            if (src !== img.src || srcset !== img.srcset) {
              var className = options.classes.spinner;
              var parent = img.parentElement;
              var spinner = child(parent, "." + className) || create("span", className, parent);
              entries.push([img, Slide, spinner]);
              img.src || display(img, "none");
            }
          });
        });
      }

      function check() {
        entries = entries.filter(function (data) {
          var distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
          return data[1].isWithin(Splide2.index, distance) ? load(data) : true;
        });
        entries.length || off(events);
      }

      function load(data) {
        var img = data[0];
        addClass(data[1].slide, CLASS_LOADING);
        bind(img, "load error", apply(onLoad, data));
        setAttribute(img, "src", getAttribute(img, SRC_DATA_ATTRIBUTE));
        setAttribute(img, "srcset", getAttribute(img, SRCSET_DATA_ATTRIBUTE));
        removeAttribute(img, SRC_DATA_ATTRIBUTE);
        removeAttribute(img, SRCSET_DATA_ATTRIBUTE);
      }

      function onLoad(data, e) {
        var img = data[0],
            Slide = data[1];
        removeClass(Slide.slide, CLASS_LOADING);

        if (e.type !== "error") {
          remove(data[2]);
          display(img, "");
          emit(EVENT_LAZYLOAD_LOADED, img, Slide);
          emit(EVENT_RESIZE);
        }

        isSequential && loadNext();
      }

      function loadNext() {
        entries.length && load(entries.shift());
      }

      return {
        mount: mount,
        destroy: apply(empty, entries),
        check: check
      };
    }

    function Pagination(Splide2, Components2, options) {
      var event = EventInterface(Splide2);
      var on = event.on,
          emit = event.emit,
          bind = event.bind;
      var Slides = Components2.Slides,
          Elements = Components2.Elements,
          Controller = Components2.Controller;
      var hasFocus = Controller.hasFocus,
          getIndex = Controller.getIndex,
          go = Controller.go;
      var resolve = Components2.Direction.resolve;
      var placeholder = Elements.pagination;
      var items = [];
      var list;
      var paginationClasses;

      function mount() {
        destroy();
        on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], mount);
        var enabled = options.pagination;
        placeholder && display(placeholder, enabled ? "" : "none");

        if (enabled) {
          on([EVENT_MOVE, EVENT_SCROLL, EVENT_SCROLLED], update);
          createPagination();
          update();
          emit(EVENT_PAGINATION_MOUNTED, {
            list: list,
            items: items
          }, getAt(Splide2.index));
        }
      }

      function destroy() {
        if (list) {
          remove(placeholder ? slice(list.children) : list);
          removeClass(list, paginationClasses);
          empty(items);
          list = null;
        }

        event.destroy();
      }

      function createPagination() {
        var length = Splide2.length;
        var classes = options.classes,
            i18n = options.i18n,
            perPage = options.perPage;
        var max = hasFocus() ? Controller.getEnd() + 1 : ceil(length / perPage);
        list = placeholder || create("ul", classes.pagination, Elements.track.parentElement);
        addClass(list, paginationClasses = CLASS_PAGINATION + "--" + getDirection());
        setAttribute(list, ROLE, "tablist");
        setAttribute(list, ARIA_LABEL, i18n.select);
        setAttribute(list, ARIA_ORIENTATION, getDirection() === TTB ? "vertical" : "");

        for (var i = 0; i < max; i++) {
          var li = create("li", null, list);
          var button = create("button", {
            class: classes.page,
            type: "button"
          }, li);
          var controls = Slides.getIn(i).map(function (Slide) {
            return Slide.slide.id;
          });
          var text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
          bind(button, "click", apply(onClick, i));

          if (options.paginationKeyboard) {
            bind(button, "keydown", apply(onKeydown, i));
          }

          setAttribute(li, ROLE, "presentation");
          setAttribute(button, ROLE, "tab");
          setAttribute(button, ARIA_CONTROLS, controls.join(" "));
          setAttribute(button, ARIA_LABEL, format(text, i + 1));
          setAttribute(button, TAB_INDEX, -1);
          items.push({
            li: li,
            button: button,
            page: i
          });
        }
      }

      function onClick(page) {
        go(">" + page, true);
      }

      function onKeydown(page, e) {
        var length = items.length;
        var key = normalizeKey(e);
        var dir = getDirection();
        var nextPage = -1;

        if (key === resolve(ARROW_RIGHT, false, dir)) {
          nextPage = ++page % length;
        } else if (key === resolve(ARROW_LEFT, false, dir)) {
          nextPage = (--page + length) % length;
        } else if (key === "Home") {
          nextPage = 0;
        } else if (key === "End") {
          nextPage = length - 1;
        }

        var item = items[nextPage];

        if (item) {
          focus(item.button);
          go(">" + nextPage);
          prevent(e, true);
        }
      }

      function getDirection() {
        return options.paginationDirection || options.direction;
      }

      function getAt(index) {
        return items[Controller.toPage(index)];
      }

      function update() {
        var prev = getAt(getIndex(true));
        var curr = getAt(getIndex());

        if (prev) {
          var button = prev.button;
          removeClass(button, CLASS_ACTIVE);
          removeAttribute(button, ARIA_SELECTED);
          setAttribute(button, TAB_INDEX, -1);
        }

        if (curr) {
          var _button = curr.button;
          addClass(_button, CLASS_ACTIVE);
          setAttribute(_button, ARIA_SELECTED, true);
          setAttribute(_button, TAB_INDEX, "");
        }

        emit(EVENT_PAGINATION_UPDATED, {
          list: list,
          items: items
        }, prev, curr);
      }

      return {
        items: items,
        mount: mount,
        destroy: destroy,
        getAt: getAt,
        update: update
      };
    }

    var TRIGGER_KEYS = [" ", "Enter"];

    function Sync(Splide2, Components2, options) {
      var isNavigation = options.isNavigation,
          slideFocus = options.slideFocus;
      var events = [];

      function mount() {
        Splide2.splides.forEach(function (target) {
          if (!target.isParent) {
            sync(Splide2, target.splide);
            sync(target.splide, Splide2);
          }
        });

        if (isNavigation) {
          navigate();
        }
      }

      function destroy() {
        events.forEach(function (event) {
          event.destroy();
        });
        empty(events);
      }

      function remount() {
        destroy();
        mount();
      }

      function sync(splide, target) {
        var event = EventInterface(splide);
        event.on(EVENT_MOVE, function (index, prev, dest) {
          target.go(target.is(LOOP) ? dest : index);
        });
        events.push(event);
      }

      function navigate() {
        var event = EventInterface(Splide2);
        var on = event.on;
        on(EVENT_CLICK, onClick);
        on(EVENT_SLIDE_KEYDOWN, onKeydown);
        on([EVENT_MOUNTED, EVENT_UPDATED], update);
        events.push(event);
        event.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
      }

      function update() {
        setAttribute(Components2.Elements.list, ARIA_ORIENTATION, options.direction === TTB ? "vertical" : "");
      }

      function onClick(Slide) {
        Splide2.go(Slide.index);
      }

      function onKeydown(Slide, e) {
        if (includes(TRIGGER_KEYS, normalizeKey(e))) {
          onClick(Slide);
          prevent(e);
        }
      }

      return {
        setup: apply(Components2.Media.set, {
          slideFocus: isUndefined(slideFocus) ? isNavigation : slideFocus
        }, true),
        mount: mount,
        destroy: destroy,
        remount: remount
      };
    }

    function Wheel(Splide2, Components2, options) {
      var _EventInterface12 = EventInterface(Splide2),
          bind = _EventInterface12.bind;

      var lastTime = 0;

      function mount() {
        if (options.wheel) {
          bind(Components2.Elements.track, "wheel", onWheel, SCROLL_LISTENER_OPTIONS);
        }
      }

      function onWheel(e) {
        if (e.cancelable) {
          var deltaY = e.deltaY;
          var backwards = deltaY < 0;
          var timeStamp = timeOf(e);

          var _min = options.wheelMinThreshold || 0;

          var sleep = options.wheelSleep || 0;

          if (abs(deltaY) > _min && timeStamp - lastTime > sleep) {
            Splide2.go(backwards ? "<" : ">");
            lastTime = timeStamp;
          }

          shouldPrevent(backwards) && prevent(e);
        }
      }

      function shouldPrevent(backwards) {
        return !options.releaseWheel || Splide2.state.is(MOVING) || Components2.Controller.getAdjacent(backwards) !== -1;
      }

      return {
        mount: mount
      };
    }

    var SR_REMOVAL_DELAY = 90;

    function Live(Splide2, Components2, options) {
      var _EventInterface13 = EventInterface(Splide2),
          on = _EventInterface13.on;

      var track = Components2.Elements.track;
      var enabled = options.live && !options.isNavigation;
      var sr = create("span", CLASS_SR);
      var interval = RequestInterval(SR_REMOVAL_DELAY, apply(toggle, false));

      function mount() {
        if (enabled) {
          disable(!Components2.Autoplay.isPaused());
          setAttribute(track, ARIA_ATOMIC, true);
          sr.textContent = "\u2026";
          on(EVENT_AUTOPLAY_PLAY, apply(disable, true));
          on(EVENT_AUTOPLAY_PAUSE, apply(disable, false));
          on([EVENT_MOVED, EVENT_SCROLLED], apply(toggle, true));
        }
      }

      function toggle(active) {
        setAttribute(track, ARIA_BUSY, active);

        if (active) {
          append(track, sr);
          interval.start();
        } else {
          remove(sr);
          interval.cancel();
        }
      }

      function destroy() {
        removeAttribute(track, [ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY]);
        remove(sr);
      }

      function disable(disabled) {
        if (enabled) {
          setAttribute(track, ARIA_LIVE, disabled ? "off" : "polite");
        }
      }

      return {
        mount: mount,
        disable: disable,
        destroy: destroy
      };
    }

    var ComponentConstructors = /*#__PURE__*/Object.freeze({
      __proto__: null,
      Media: Media,
      Direction: Direction,
      Elements: Elements,
      Slides: Slides,
      Layout: Layout,
      Clones: Clones,
      Move: Move,
      Controller: Controller,
      Arrows: Arrows,
      Autoplay: Autoplay,
      Cover: Cover,
      Scroll: Scroll,
      Drag: Drag,
      Keyboard: Keyboard,
      LazyLoad: LazyLoad,
      Pagination: Pagination,
      Sync: Sync,
      Wheel: Wheel,
      Live: Live
    });
    var I18N = {
      prev: "Previous slide",
      next: "Next slide",
      first: "Go to first slide",
      last: "Go to last slide",
      slideX: "Go to slide %s",
      pageX: "Go to page %s",
      play: "Start autoplay",
      pause: "Pause autoplay",
      carousel: "carousel",
      slide: "slide",
      select: "Select a slide to show",
      slideLabel: "%s of %s"
    };
    var DEFAULTS = {
      type: "slide",
      role: "region",
      speed: 400,
      perPage: 1,
      cloneStatus: true,
      arrows: true,
      pagination: true,
      paginationKeyboard: true,
      interval: 5e3,
      pauseOnHover: true,
      pauseOnFocus: true,
      resetProgress: true,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      drag: true,
      direction: "ltr",
      trimSpace: true,
      focusableNodes: "a, button, textarea, input, select, iframe",
      live: true,
      classes: CLASSES,
      i18n: I18N,
      reducedMotion: {
        speed: 0,
        rewindSpeed: 0,
        autoplay: "pause"
      }
    };

    function Fade(Splide2, Components2, options) {
      var Slides = Components2.Slides;

      function mount() {
        EventInterface(Splide2).on([EVENT_MOUNTED, EVENT_REFRESH], init);
      }

      function init() {
        Slides.forEach(function (Slide) {
          Slide.style("transform", "translateX(-" + 100 * Slide.index + "%)");
        });
      }

      function start(index, done) {
        Slides.style("transition", "opacity " + options.speed + "ms " + options.easing);
        nextTick(done);
      }

      return {
        mount: mount,
        start: start,
        cancel: noop
      };
    }

    function Slide(Splide2, Components2, options) {
      var Move = Components2.Move,
          Controller = Components2.Controller,
          Scroll = Components2.Scroll;
      var list = Components2.Elements.list;
      var transition = apply(style, list, "transition");
      var endCallback;

      function mount() {
        EventInterface(Splide2).bind(list, "transitionend", function (e) {
          if (e.target === list && endCallback) {
            cancel();
            endCallback();
          }
        });
      }

      function start(index, done) {
        var destination = Move.toPosition(index, true);
        var position = Move.getPosition();
        var speed = getSpeed(index);

        if (abs(destination - position) >= 1 && speed >= 1) {
          if (options.useScroll) {
            Scroll.scroll(destination, speed, false, done);
          } else {
            transition("transform " + speed + "ms " + options.easing);
            Move.translate(destination, true);
            endCallback = done;
          }
        } else {
          Move.jump(index);
          done();
        }
      }

      function cancel() {
        transition("");
        Scroll.cancel();
      }

      function getSpeed(index) {
        var rewindSpeed = options.rewindSpeed;

        if (Splide2.is(SLIDE) && rewindSpeed) {
          var prev = Controller.getIndex(true);
          var end = Controller.getEnd();

          if (prev === 0 && index >= end || prev >= end && index === 0) {
            return rewindSpeed;
          }
        }

        return options.speed;
      }

      return {
        mount: mount,
        start: start,
        cancel: cancel
      };
    }

    var _Splide = /*#__PURE__*/function () {
      function _Splide(target, options) {
        this.event = EventInterface();
        this.Components = {};
        this.state = State(CREATED);
        this.splides = [];
        this._o = {};
        this._E = {};
        var root = isString(target) ? query(document, target) : target;
        assert(root, root + " is invalid.");
        this.root = root;
        options = merge({
          label: getAttribute(root, ARIA_LABEL) || "",
          labelledby: getAttribute(root, ARIA_LABELLEDBY) || ""
        }, DEFAULTS, _Splide.defaults, options || {});

        try {
          merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
        } catch (e) {
          assert(false, "Invalid JSON");
        }

        this._o = Object.create(merge({}, options));
      }

      var _proto = _Splide.prototype;

      _proto.mount = function mount(Extensions, Transition) {
        var _this = this;

        var state = this.state,
            Components2 = this.Components;
        assert(state.is([CREATED, DESTROYED]), "Already mounted!");
        state.set(CREATED);
        this._C = Components2;
        this._T = Transition || this._T || (this.is(FADE) ? Fade : Slide);
        this._E = Extensions || this._E;
        var Constructors = assign({}, ComponentConstructors, this._E, {
          Transition: this._T
        });
        forOwn(Constructors, function (Component, key) {
          var component = Component(_this, Components2, _this._o);
          Components2[key] = component;
          component.setup && component.setup();
        });
        forOwn(Components2, function (component) {
          component.mount && component.mount();
        });
        this.emit(EVENT_MOUNTED);
        addClass(this.root, CLASS_INITIALIZED);
        state.set(IDLE);
        this.emit(EVENT_READY);
        return this;
      };

      _proto.sync = function sync(splide) {
        this.splides.push({
          splide: splide
        });
        splide.splides.push({
          splide: this,
          isParent: true
        });

        if (this.state.is(IDLE)) {
          this._C.Sync.remount();

          splide.Components.Sync.remount();
        }

        return this;
      };

      _proto.go = function go(control) {
        this._C.Controller.go(control);

        return this;
      };

      _proto.on = function on(events, callback) {
        this.event.on(events, callback);
        return this;
      };

      _proto.off = function off(events) {
        this.event.off(events);
        return this;
      };

      _proto.emit = function emit(event) {
        var _this$event;

        (_this$event = this.event).emit.apply(_this$event, [event].concat(slice(arguments, 1)));

        return this;
      };

      _proto.add = function add(slides, index) {
        this._C.Slides.add(slides, index);

        return this;
      };

      _proto.remove = function remove(matcher) {
        this._C.Slides.remove(matcher);

        return this;
      };

      _proto.is = function is(type) {
        return this._o.type === type;
      };

      _proto.refresh = function refresh() {
        this.emit(EVENT_REFRESH);
        return this;
      };

      _proto.destroy = function destroy(completely) {
        if (completely === void 0) {
          completely = true;
        }

        var event = this.event,
            state = this.state;

        if (state.is(CREATED)) {
          EventInterface(this).on(EVENT_READY, this.destroy.bind(this, completely));
        } else {
          forOwn(this._C, function (component) {
            component.destroy && component.destroy(completely);
          }, true);
          event.emit(EVENT_DESTROY);
          event.destroy();
          completely && empty(this.splides);
          state.set(DESTROYED);
        }

        return this;
      };

      _createClass(_Splide, [{
        key: "options",
        get: function get() {
          return this._o;
        },
        set: function set(options) {
          this._C.Media.set(options, true, true);
        }
      }, {
        key: "length",
        get: function get() {
          return this._C.Slides.getLength(true);
        }
      }, {
        key: "index",
        get: function get() {
          return this._C.Controller.getIndex();
        }
      }]);

      return _Splide;
    }();

    var Splide = _Splide;
    Splide.defaults = {};
    Splide.STATES = STATES;

    const t=(t,e=1e4)=>(t=parseFloat(t+"")||0,Math.round((t+Number.EPSILON)*e)/e),e=function(t){if(!(t&&t instanceof Element&&t.offsetParent))return  false;const e=t.scrollHeight>t.clientHeight,i=window.getComputedStyle(t).overflowY,n=-1!==i.indexOf("hidden"),s=-1!==i.indexOf("visible");return e&&!n&&!s},i=function(t,n=void 0){return !(!t||t===document.body||n&&t===n)&&(e(t)?t:i(t.parentElement,n))},n=function(t){var e=(new DOMParser).parseFromString(t,"text/html").body;if(e.childElementCount>1){for(var i=document.createElement("div");e.firstChild;)i.appendChild(e.firstChild);return i}return e.firstChild},s=t=>`${t||""}`.split(" ").filter((t=>!!t)),o=(t,e,i)=>{t&&s(e).forEach((e=>{t.classList.toggle(e,i||false);}));};class a{constructor(t){Object.defineProperty(this,"pageX",{enumerable:true,configurable:true,writable:true,value:void 0}),Object.defineProperty(this,"pageY",{enumerable:true,configurable:true,writable:true,value:void 0}),Object.defineProperty(this,"clientX",{enumerable:true,configurable:true,writable:true,value:void 0}),Object.defineProperty(this,"clientY",{enumerable:true,configurable:true,writable:true,value:void 0}),Object.defineProperty(this,"id",{enumerable:true,configurable:true,writable:true,value:void 0}),Object.defineProperty(this,"time",{enumerable:true,configurable:true,writable:true,value:void 0}),Object.defineProperty(this,"nativePointer",{enumerable:true,configurable:true,writable:true,value:void 0}),this.nativePointer=t,this.pageX=t.pageX,this.pageY=t.pageY,this.clientX=t.clientX,this.clientY=t.clientY,this.id=self.Touch&&t instanceof Touch?t.identifier:-1,this.time=Date.now();}}const r={passive:false};class l{constructor(t,{start:e=(()=>true),move:i=(()=>{}),end:n=(()=>{})}){Object.defineProperty(this,"element",{enumerable:true,configurable:true,writable:true,value:void 0}),Object.defineProperty(this,"startCallback",{enumerable:true,configurable:true,writable:true,value:void 0}),Object.defineProperty(this,"moveCallback",{enumerable:true,configurable:true,writable:true,value:void 0}),Object.defineProperty(this,"endCallback",{enumerable:true,configurable:true,writable:true,value:void 0}),Object.defineProperty(this,"currentPointers",{enumerable:true,configurable:true,writable:true,value:[]}),Object.defineProperty(this,"startPointers",{enumerable:true,configurable:true,writable:true,value:[]}),this.element=t,this.startCallback=e,this.moveCallback=i,this.endCallback=n;for(const t of ["onPointerStart","onTouchStart","onMove","onTouchEnd","onPointerEnd","onWindowBlur"])this[t]=this[t].bind(this);this.element.addEventListener("mousedown",this.onPointerStart,r),this.element.addEventListener("touchstart",this.onTouchStart,r),this.element.addEventListener("touchmove",this.onMove,r),this.element.addEventListener("touchend",this.onTouchEnd),this.element.addEventListener("touchcancel",this.onTouchEnd);}onPointerStart(t){if(!t.buttons||0!==t.button)return;const e=new a(t);this.currentPointers.some((t=>t.id===e.id))||this.triggerPointerStart(e,t)&&(window.addEventListener("mousemove",this.onMove),window.addEventListener("mouseup",this.onPointerEnd),window.addEventListener("blur",this.onWindowBlur));}onTouchStart(t){for(const e of Array.from(t.changedTouches||[]))this.triggerPointerStart(new a(e),t);window.addEventListener("blur",this.onWindowBlur);}onMove(t){const e=this.currentPointers.slice(),i="changedTouches"in t?Array.from(t.changedTouches||[]).map((t=>new a(t))):[new a(t)],n=[];for(const t of i){const e=this.currentPointers.findIndex((e=>e.id===t.id));e<0||(n.push(t),this.currentPointers[e]=t);}n.length&&this.moveCallback(t,this.currentPointers.slice(),e);}onPointerEnd(t){t.buttons>0&&0!==t.button||(this.triggerPointerEnd(t,new a(t)),window.removeEventListener("mousemove",this.onMove),window.removeEventListener("mouseup",this.onPointerEnd),window.removeEventListener("blur",this.onWindowBlur));}onTouchEnd(t){for(const e of Array.from(t.changedTouches||[]))this.triggerPointerEnd(t,new a(e));}triggerPointerStart(t,e){return !!this.startCallback(e,t,this.currentPointers.slice())&&(this.currentPointers.push(t),this.startPointers.push(t),true)}triggerPointerEnd(t,e){const i=this.currentPointers.findIndex((t=>t.id===e.id));i<0||(this.currentPointers.splice(i,1),this.startPointers.splice(i,1),this.endCallback(t,e,this.currentPointers.slice()));}onWindowBlur(){this.clear();}clear(){for(;this.currentPointers.length;){const t=this.currentPointers[this.currentPointers.length-1];this.currentPointers.splice(this.currentPointers.length-1,1),this.startPointers.splice(this.currentPointers.length-1,1),this.endCallback(new Event("touchend",{bubbles:true,cancelable:true,clientX:t.clientX,clientY:t.clientY}),t,this.currentPointers.slice());}}stop(){this.element.removeEventListener("mousedown",this.onPointerStart,r),this.element.removeEventListener("touchstart",this.onTouchStart,r),this.element.removeEventListener("touchmove",this.onMove,r),this.element.removeEventListener("touchend",this.onTouchEnd),this.element.removeEventListener("touchcancel",this.onTouchEnd),window.removeEventListener("mousemove",this.onMove),window.removeEventListener("mouseup",this.onPointerEnd),window.removeEventListener("blur",this.onWindowBlur);}}function c(t,e){return e?Math.sqrt(Math.pow(e.clientX-t.clientX,2)+Math.pow(e.clientY-t.clientY,2)):0}function h(t,e){return e?{clientX:(t.clientX+e.clientX)/2,clientY:(t.clientY+e.clientY)/2}:t}const d=t=>"object"==typeof t&&null!==t&&t.constructor===Object&&"[object Object]"===Object.prototype.toString.call(t),u=(t,...e)=>{const i=e.length;for(let n=0;n<i;n++){const i=e[n]||{};Object.entries(i).forEach((([e,i])=>{const n=Array.isArray(i)?[]:{};t[e]||Object.assign(t,{[e]:n}),d(i)?Object.assign(t[e],u(n,i)):Array.isArray(i)?Object.assign(t,{[e]:[...i]}):Object.assign(t,{[e]:i});}));}return t},p=function(t,e){return t.split(".").reduce(((t,e)=>"object"==typeof t?t[e]:void 0),e)};class f{constructor(t={}){Object.defineProperty(this,"options",{enumerable:true,configurable:true,writable:true,value:t}),Object.defineProperty(this,"events",{enumerable:true,configurable:true,writable:true,value:new Map}),this.setOptions(t);for(const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))t.startsWith("on")&&"function"==typeof this[t]&&(this[t]=this[t].bind(this));}setOptions(t){this.options=t?u({},this.constructor.defaults,t):{};for(const[t,e]of Object.entries(this.option("on")||{}))this.on(t,e);}option(t,...e){let i=p(t,this.options);return i&&"function"==typeof i&&(i=i.call(this,this,...e)),i}optionFor(t,e,i,...n){let s=p(e,t);var o;"string"!=typeof(o=s)||isNaN(o)||isNaN(parseFloat(o))||(s=parseFloat(s)),"true"===s&&(s=true),"false"===s&&(s=false),s&&"function"==typeof s&&(s=s.call(this,this,t,...n));let a=p(e,this.options);return a&&"function"==typeof a?s=a.call(this,this,t,...n,s):void 0===s&&(s=a),void 0===s?i:s}cn(t){const e=this.options.classes;return e&&e[t]||""}localize(t,e=[]){t=String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g,((t,e,i)=>{let n="";return i?n=this.option(`${e[0]+e.toLowerCase().substring(1)}.l10n.${i}`):e&&(n=this.option(`l10n.${e}`)),n||(n=t),n}));for(let i=0;i<e.length;i++)t=t.split(e[i][0]).join(e[i][1]);return t=t.replace(/\{\{(.*?)\}\}/g,((t,e)=>e))}on(t,e){let i=[];"string"==typeof t?i=t.split(" "):Array.isArray(t)&&(i=t),this.events||(this.events=new Map),i.forEach((t=>{let i=this.events.get(t);i||(this.events.set(t,[]),i=[]),i.includes(e)||i.push(e),this.events.set(t,i);}));}off(t,e){let i=[];"string"==typeof t?i=t.split(" "):Array.isArray(t)&&(i=t),i.forEach((t=>{const i=this.events.get(t);if(Array.isArray(i)){const t=i.indexOf(e);t>-1&&i.splice(t,1);}}));}emit(t,...e){[...this.events.get(t)||[]].forEach((t=>t(this,...e))),"*"!==t&&this.emit("*",t,...e);}}Object.defineProperty(f,"version",{enumerable:true,configurable:true,writable:true,value:"5.0.36"}),Object.defineProperty(f,"defaults",{enumerable:true,configurable:true,writable:true,value:{}});class g extends f{constructor(t={}){super(t),Object.defineProperty(this,"plugins",{enumerable:true,configurable:true,writable:true,value:{}});}attachPlugins(t={}){const e=new Map;for(const[i,n]of Object.entries(t)){const t=this.option(i),s=this.plugins[i];s||false===t?s&&false===t&&(s.detach(),delete this.plugins[i]):e.set(i,new n(this,t||{}));}for(const[t,i]of e)this.plugins[t]=i,i.attach();}detachPlugins(t){t=t||Object.keys(this.plugins);for(const e of t){const t=this.plugins[e];t&&t.detach(),delete this.plugins[e];}return this.emit("detachPlugins"),this}}var m;!function(t){t[t.Init=0]="Init",t[t.Error=1]="Error",t[t.Ready=2]="Ready",t[t.Panning=3]="Panning",t[t.Mousemove=4]="Mousemove",t[t.Destroy=5]="Destroy";}(m||(m={}));const v=["a","b","c","d","e","f"],b={PANUP:"Move up",PANDOWN:"Move down",PANLEFT:"Move left",PANRIGHT:"Move right",ZOOMIN:"Zoom in",ZOOMOUT:"Zoom out",TOGGLEZOOM:"Toggle zoom level",TOGGLE1TO1:"Toggle zoom level",ITERATEZOOM:"Toggle zoom level",ROTATECCW:"Rotate counterclockwise",ROTATECW:"Rotate clockwise",FLIPX:"Flip horizontally",FLIPY:"Flip vertically",FITX:"Fit horizontally",FITY:"Fit vertically",RESET:"Reset",TOGGLEFS:"Toggle fullscreen"},y={content:null,width:"auto",height:"auto",panMode:"drag",touch:true,dragMinThreshold:3,lockAxis:false,mouseMoveFactor:1,mouseMoveFriction:.12,zoom:true,pinchToZoom:true,panOnlyZoomed:"auto",minScale:1,maxScale:2,friction:.25,dragFriction:.35,decelFriction:.05,click:"toggleZoom",dblClick:false,wheel:"zoom",wheelLimit:7,spinner:true,bounds:"auto",infinite:false,rubberband:true,bounce:true,maxVelocity:75,transformParent:false,classes:{content:"f-panzoom__content",isLoading:"is-loading",canZoomIn:"can-zoom_in",canZoomOut:"can-zoom_out",isDraggable:"is-draggable",isDragging:"is-dragging",inFullscreen:"in-fullscreen",htmlHasFullscreen:"with-panzoom-in-fullscreen"},l10n:b},w='<circle cx="25" cy="25" r="20"></circle>',x='<div class="f-spinner"><svg viewBox="0 0 50 50">'+w+w+"</svg></div>",E=t=>t&&null!==t&&t instanceof Element&&"nodeType"in t,S=(t,e)=>{t&&s(e).forEach((e=>{t.classList.remove(e);}));},P=(t,e)=>{t&&s(e).forEach((e=>{t.classList.add(e);}));},C={a:1,b:0,c:0,d:1,e:0,f:0},T=1e5,M=1e4,O="mousemove",A="drag",L="content",z="auto";let R=null,k=null;class I extends g{get fits(){return this.contentRect.width-this.contentRect.fitWidth<1&&this.contentRect.height-this.contentRect.fitHeight<1}get isTouchDevice(){return null===k&&(k=window.matchMedia("(hover: none)").matches),k}get isMobile(){return null===R&&(R=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)),R}get panMode(){return this.options.panMode!==O||this.isTouchDevice?A:O}get panOnlyZoomed(){const t=this.options.panOnlyZoomed;return t===z?this.isTouchDevice:t}get isInfinite(){return this.option("infinite")}get angle(){return 180*Math.atan2(this.current.b,this.current.a)/Math.PI||0}get targetAngle(){return 180*Math.atan2(this.target.b,this.target.a)/Math.PI||0}get scale(){const{a:t,b:e}=this.current;return Math.sqrt(t*t+e*e)||1}get targetScale(){const{a:t,b:e}=this.target;return Math.sqrt(t*t+e*e)||1}get minScale(){return this.option("minScale")||1}get fullScale(){const{contentRect:t}=this;return t.fullWidth/t.fitWidth||1}get maxScale(){return this.fullScale*(this.option("maxScale")||1)||1}get coverScale(){const{containerRect:t,contentRect:e}=this,i=Math.max(t.height/e.fitHeight,t.width/e.fitWidth)||1;return Math.min(this.fullScale,i)}get isScaling(){return Math.abs(this.targetScale-this.scale)>1e-5&&!this.isResting}get isContentLoading(){const t=this.content;return !!(t&&t instanceof HTMLImageElement)&&!t.complete}get isResting(){if(this.isBouncingX||this.isBouncingY)return  false;for(const t of v){const e="e"==t||"f"===t?1e-4:1e-5;if(Math.abs(this.target[t]-this.current[t])>e)return  false}return !(!this.ignoreBounds&&!this.checkBounds().inBounds)}constructor(t,e={},i={}){var s;if(super(e),Object.defineProperty(this,"pointerTracker",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"resizeObserver",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"updateTimer",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"clickTimer",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"rAF",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"isTicking",{enumerable:true,configurable:true,writable:true,value:false}),Object.defineProperty(this,"ignoreBounds",{enumerable:true,configurable:true,writable:true,value:false}),Object.defineProperty(this,"isBouncingX",{enumerable:true,configurable:true,writable:true,value:false}),Object.defineProperty(this,"isBouncingY",{enumerable:true,configurable:true,writable:true,value:false}),Object.defineProperty(this,"clicks",{enumerable:true,configurable:true,writable:true,value:0}),Object.defineProperty(this,"trackingPoints",{enumerable:true,configurable:true,writable:true,value:[]}),Object.defineProperty(this,"pwt",{enumerable:true,configurable:true,writable:true,value:0}),Object.defineProperty(this,"cwd",{enumerable:true,configurable:true,writable:true,value:0}),Object.defineProperty(this,"pmme",{enumerable:true,configurable:true,writable:true,value:void 0}),Object.defineProperty(this,"friction",{enumerable:true,configurable:true,writable:true,value:0}),Object.defineProperty(this,"state",{enumerable:true,configurable:true,writable:true,value:m.Init}),Object.defineProperty(this,"isDragging",{enumerable:true,configurable:true,writable:true,value:false}),Object.defineProperty(this,"container",{enumerable:true,configurable:true,writable:true,value:void 0}),Object.defineProperty(this,"content",{enumerable:true,configurable:true,writable:true,value:void 0}),Object.defineProperty(this,"spinner",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"containerRect",{enumerable:true,configurable:true,writable:true,value:{width:0,height:0,innerWidth:0,innerHeight:0}}),Object.defineProperty(this,"contentRect",{enumerable:true,configurable:true,writable:true,value:{top:0,right:0,bottom:0,left:0,fullWidth:0,fullHeight:0,fitWidth:0,fitHeight:0,width:0,height:0}}),Object.defineProperty(this,"dragStart",{enumerable:true,configurable:true,writable:true,value:{x:0,y:0,top:0,left:0,time:0}}),Object.defineProperty(this,"dragOffset",{enumerable:true,configurable:true,writable:true,value:{x:0,y:0,time:0}}),Object.defineProperty(this,"current",{enumerable:true,configurable:true,writable:true,value:Object.assign({},C)}),Object.defineProperty(this,"target",{enumerable:true,configurable:true,writable:true,value:Object.assign({},C)}),Object.defineProperty(this,"velocity",{enumerable:true,configurable:true,writable:true,value:{a:0,b:0,c:0,d:0,e:0,f:0}}),Object.defineProperty(this,"lockedAxis",{enumerable:true,configurable:true,writable:true,value:false}),!t)throw new Error("Container Element Not Found");this.container=t,this.initContent(),this.attachPlugins(Object.assign(Object.assign({},I.Plugins),i)),this.emit("attachPlugins"),this.emit("init");const o=this.content;if(o.addEventListener("load",this.onLoad),o.addEventListener("error",this.onError),this.isContentLoading){if(this.option("spinner")){t.classList.add(this.cn("isLoading"));const e=n(x);!t.contains(o)||o.parentElement instanceof HTMLPictureElement?this.spinner=t.appendChild(e):this.spinner=(null===(s=o.parentElement)||void 0===s?void 0:s.insertBefore(e,o))||null;}this.emit("beforeLoad");}else queueMicrotask((()=>{this.enable();}));}initContent(){const{container:t}=this,e=this.cn(L);let i=this.option(L)||t.querySelector(`.${e}`);if(i||(i=t.querySelector("img,picture")||t.firstElementChild,i&&P(i,e)),i instanceof HTMLPictureElement&&(i=i.querySelector("img")),!i)throw new Error("No content found");this.content=i;}onLoad(){const{spinner:t,container:e,state:i}=this;t&&(t.remove(),this.spinner=null),this.option("spinner")&&e.classList.remove(this.cn("isLoading")),this.emit("afterLoad"),i===m.Init?this.enable():this.updateMetrics();}onError(){this.state!==m.Destroy&&(this.spinner&&(this.spinner.remove(),this.spinner=null),this.stop(),this.detachEvents(),this.state=m.Error,this.emit("error"));}getNextScale(t){const{fullScale:e,targetScale:i,coverScale:n,maxScale:s,minScale:o}=this;let a=o;switch(t){case "toggleMax":a=i-o<.5*(s-o)?s:o;break;case "toggleCover":a=i-o<.5*(n-o)?n:o;break;case "toggleZoom":a=i-o<.5*(e-o)?e:o;break;case "iterateZoom":let t=[1,e,s].sort(((t,e)=>t-e)),r=t.findIndex((t=>t>i+1e-5));a=t[r]||1;}return a}attachObserver(){var t;const e=()=>{const{container:t,containerRect:e}=this;return Math.abs(e.width-t.getBoundingClientRect().width)>.1||Math.abs(e.height-t.getBoundingClientRect().height)>.1};this.resizeObserver||void 0===window.ResizeObserver||(this.resizeObserver=new ResizeObserver((()=>{this.updateTimer||(e()?(this.onResize(),this.isMobile&&(this.updateTimer=setTimeout((()=>{e()&&this.onResize(),this.updateTimer=null;}),500))):this.updateTimer&&(clearTimeout(this.updateTimer),this.updateTimer=null));}))),null===(t=this.resizeObserver)||void 0===t||t.observe(this.container);}detachObserver(){var t;null===(t=this.resizeObserver)||void 0===t||t.disconnect();}attachEvents(){const{container:t}=this;t.addEventListener("click",this.onClick,{passive:false,capture:false}),t.addEventListener("wheel",this.onWheel,{passive:false}),this.pointerTracker=new l(t,{start:this.onPointerDown,move:this.onPointerMove,end:this.onPointerUp}),document.addEventListener(O,this.onMouseMove);}detachEvents(){var t;const{container:e}=this;e.removeEventListener("click",this.onClick,{passive:false,capture:false}),e.removeEventListener("wheel",this.onWheel,{passive:false}),null===(t=this.pointerTracker)||void 0===t||t.stop(),this.pointerTracker=null,document.removeEventListener(O,this.onMouseMove),document.removeEventListener("keydown",this.onKeydown,true),this.clickTimer&&(clearTimeout(this.clickTimer),this.clickTimer=null),this.updateTimer&&(clearTimeout(this.updateTimer),this.updateTimer=null);}animate(){this.setTargetForce();const t=this.friction,e=this.option("maxVelocity");for(const i of v)t?(this.velocity[i]*=1-t,e&&!this.isScaling&&(this.velocity[i]=Math.max(Math.min(this.velocity[i],e),-1*e)),this.current[i]+=this.velocity[i]):this.current[i]=this.target[i];this.setTransform(),this.setEdgeForce(),!this.isResting||this.isDragging?this.rAF=requestAnimationFrame((()=>this.animate())):this.stop("current");}setTargetForce(){for(const t of v)"e"===t&&this.isBouncingX||"f"===t&&this.isBouncingY||(this.velocity[t]=(1/(1-this.friction)-1)*(this.target[t]-this.current[t]));}checkBounds(t=0,e=0){const{current:i}=this,n=i.e+t,s=i.f+e,o=this.getBounds(),{x:a,y:r}=o,l=a.min,c=a.max,h=r.min,d=r.max;let u=0,p=0;return l!==1/0&&n<l?u=l-n:c!==1/0&&n>c&&(u=c-n),h!==1/0&&s<h?p=h-s:d!==1/0&&s>d&&(p=d-s),Math.abs(u)<1e-4&&(u=0),Math.abs(p)<1e-4&&(p=0),Object.assign(Object.assign({},o),{xDiff:u,yDiff:p,inBounds:!u&&!p})}clampTargetBounds(){const{target:t}=this,{x:e,y:i}=this.getBounds();e.min!==1/0&&(t.e=Math.max(t.e,e.min)),e.max!==1/0&&(t.e=Math.min(t.e,e.max)),i.min!==1/0&&(t.f=Math.max(t.f,i.min)),i.max!==1/0&&(t.f=Math.min(t.f,i.max));}calculateContentDim(t=this.current){const{content:e,contentRect:i}=this,{fitWidth:n,fitHeight:s,fullWidth:o,fullHeight:a}=i;let r=o,l=a;if(this.option("zoom")||0!==this.angle){const i=!(e instanceof HTMLImageElement)&&("none"===window.getComputedStyle(e).maxWidth||"none"===window.getComputedStyle(e).maxHeight),c=i?o:n,h=i?a:s,d=this.getMatrix(t),u=new DOMPoint(0,0).matrixTransform(d),p=new DOMPoint(0+c,0).matrixTransform(d),f=new DOMPoint(0+c,0+h).matrixTransform(d),g=new DOMPoint(0,0+h).matrixTransform(d),m=Math.abs(f.x-u.x),v=Math.abs(f.y-u.y),b=Math.abs(g.x-p.x),y=Math.abs(g.y-p.y);r=Math.max(m,b),l=Math.max(v,y);}return {contentWidth:r,contentHeight:l}}setEdgeForce(){if(this.ignoreBounds||this.isDragging||this.panMode===O||this.targetScale<this.scale)return this.isBouncingX=false,void(this.isBouncingY=false);const{target:t}=this,{x:e,y:i,xDiff:n,yDiff:s}=this.checkBounds();const o=this.option("maxVelocity");let a=this.velocity.e,r=this.velocity.f;0!==n?(this.isBouncingX=true,n*a<=0?a+=.14*n:(a=.14*n,e.min!==1/0&&(this.target.e=Math.max(t.e,e.min)),e.max!==1/0&&(this.target.e=Math.min(t.e,e.max))),o&&(a=Math.max(Math.min(a,o),-1*o))):this.isBouncingX=false,0!==s?(this.isBouncingY=true,s*r<=0?r+=.14*s:(r=.14*s,i.min!==1/0&&(this.target.f=Math.max(t.f,i.min)),i.max!==1/0&&(this.target.f=Math.min(t.f,i.max))),o&&(r=Math.max(Math.min(r,o),-1*o))):this.isBouncingY=false,this.isBouncingX&&(this.velocity.e=a),this.isBouncingY&&(this.velocity.f=r);}enable(){const{content:t}=this,e=new DOMMatrixReadOnly(window.getComputedStyle(t).transform);for(const t of v)this.current[t]=this.target[t]=e[t];this.updateMetrics(),this.attachObserver(),this.attachEvents(),this.state=m.Ready,this.emit("ready");}onClick(t){var e;"click"===t.type&&0===t.detail&&(this.dragOffset.x=0,this.dragOffset.y=0),this.isDragging&&(null===(e=this.pointerTracker)||void 0===e||e.clear(),this.trackingPoints=[],this.startDecelAnim());const i=t.target;if(!i||t.defaultPrevented)return;if(i.hasAttribute("disabled"))return t.preventDefault(),void t.stopPropagation();if((()=>{const t=window.getSelection();return t&&"Range"===t.type})()&&!i.closest("button"))return;const n=i.closest("[data-panzoom-action]"),s=i.closest("[data-panzoom-change]"),o=n||s,a=o&&E(o)?o.dataset:null;if(a){const e=a.panzoomChange,i=a.panzoomAction;if((e||i)&&t.preventDefault(),e){let t={};try{t=JSON.parse(e);}catch(t){console&&console.warn("The given data was not valid JSON");}return void this.applyChange(t)}if(i)return void(this[i]&&this[i]())}if(Math.abs(this.dragOffset.x)>3||Math.abs(this.dragOffset.y)>3)return t.preventDefault(),void t.stopPropagation();if(i.closest("[data-fancybox]"))return;const r=this.content.getBoundingClientRect(),l=this.dragStart;if(l.time&&!this.canZoomOut()&&(Math.abs(r.x-l.x)>2||Math.abs(r.y-l.y)>2))return;this.dragStart.time=0;const c=e=>{this.option("zoom",t)&&e&&"string"==typeof e&&/(iterateZoom)|(toggle(Zoom|Full|Cover|Max)|(zoomTo(Fit|Cover|Max)))/.test(e)&&"function"==typeof this[e]&&(t.preventDefault(),this[e]({event:t}));},h=this.option("click",t),d=this.option("dblClick",t);d?(this.clicks++,1==this.clicks&&(this.clickTimer=setTimeout((()=>{1===this.clicks?(this.emit("click",t),!t.defaultPrevented&&h&&c(h)):(this.emit("dblClick",t),t.defaultPrevented||c(d)),this.clicks=0,this.clickTimer=null;}),350))):(this.emit("click",t),!t.defaultPrevented&&h&&c(h));}addTrackingPoint(t){const e=this.trackingPoints.filter((t=>t.time>Date.now()-100));e.push(t),this.trackingPoints=e;}onPointerDown(t,e,i){var n;if(false===this.option("touch",t))return  false;this.pwt=0,this.dragOffset={x:0,y:0,time:0},this.trackingPoints=[];const s=this.content.getBoundingClientRect();if(this.dragStart={x:s.x,y:s.y,top:s.top,left:s.left,time:Date.now()},this.clickTimer)return  false;if(this.panMode===O&&this.targetScale>1)return t.preventDefault(),t.stopPropagation(),false;const o=t.composedPath()[0];if(!i.length){if(["TEXTAREA","OPTION","INPUT","SELECT","VIDEO","IFRAME"].includes(o.nodeName)||o.closest("[contenteditable],[data-selectable],[data-draggable],[data-clickable],[data-panzoom-change],[data-panzoom-action]"))return  false;null===(n=window.getSelection())||void 0===n||n.removeAllRanges();}if("mousedown"===t.type)["A","BUTTON"].includes(o.nodeName)||t.preventDefault();else if(Math.abs(this.velocity.a)>.3)return  false;return this.target.e=this.current.e,this.target.f=this.current.f,this.stop(),this.isDragging||(this.isDragging=true,this.addTrackingPoint(e),this.emit("touchStart",t)),true}onPointerMove(e,n,s){if(false===this.option("touch",e))return;if(!this.isDragging)return;if(n.length<2&&this.panOnlyZoomed&&t(this.targetScale)<=t(this.minScale))return;if(this.emit("touchMove",e),e.defaultPrevented)return;this.addTrackingPoint(n[0]);const{content:o}=this,a=h(s[0],s[1]),r=h(n[0],n[1]);let l=0,d=0;if(n.length>1){const t=o.getBoundingClientRect();l=a.clientX-t.left-.5*t.width,d=a.clientY-t.top-.5*t.height;}const u=c(s[0],s[1]),p=c(n[0],n[1]);let f=u?p/u:1,g=r.clientX-a.clientX,m=r.clientY-a.clientY;this.dragOffset.x+=g,this.dragOffset.y+=m,this.dragOffset.time=Date.now()-this.dragStart.time;let v=t(this.targetScale)===t(this.minScale)&&this.option("lockAxis");if(v&&!this.lockedAxis)if("xy"===v||"y"===v||"touchmove"===e.type){if(Math.abs(this.dragOffset.x)<6&&Math.abs(this.dragOffset.y)<6)return void e.preventDefault();const t=Math.abs(180*Math.atan2(this.dragOffset.y,this.dragOffset.x)/Math.PI);this.lockedAxis=t>45&&t<135?"y":"x",this.dragOffset.x=0,this.dragOffset.y=0,g=0,m=0;}else this.lockedAxis=v;if(i(e.target,this.content)&&(v="x",this.dragOffset.y=0),v&&"xy"!==v&&this.lockedAxis!==v&&t(this.targetScale)===t(this.minScale))return;e.cancelable&&e.preventDefault(),this.container.classList.add(this.cn("isDragging"));const b=this.checkBounds(g,m);this.option("rubberband")?("x"!==this.isInfinite&&(b.xDiff>0&&g<0||b.xDiff<0&&g>0)&&(g*=Math.max(0,.5-Math.abs(.75/this.contentRect.fitWidth*b.xDiff))),"y"!==this.isInfinite&&(b.yDiff>0&&m<0||b.yDiff<0&&m>0)&&(m*=Math.max(0,.5-Math.abs(.75/this.contentRect.fitHeight*b.yDiff)))):(b.xDiff&&(g=0),b.yDiff&&(m=0));const y=this.targetScale,w=this.minScale,x=this.maxScale;y<.5*w&&(f=Math.max(f,w)),y>1.5*x&&(f=Math.min(f,x)),"y"===this.lockedAxis&&t(y)===t(w)&&(g=0),"x"===this.lockedAxis&&t(y)===t(w)&&(m=0),this.applyChange({originX:l,originY:d,panX:g,panY:m,scale:f,friction:this.option("dragFriction"),ignoreBounds:true});}onPointerUp(t,e,n){if(n.length)return this.dragOffset.x=0,this.dragOffset.y=0,void(this.trackingPoints=[]);this.container.classList.remove(this.cn("isDragging")),this.isDragging&&(this.addTrackingPoint(e),this.panOnlyZoomed&&this.contentRect.width-this.contentRect.fitWidth<1&&this.contentRect.height-this.contentRect.fitHeight<1&&(this.trackingPoints=[]),i(t.target,this.content)&&"y"===this.lockedAxis&&(this.trackingPoints=[]),this.emit("touchEnd",t),this.isDragging=false,this.lockedAxis=false,this.state!==m.Destroy&&(t.defaultPrevented||this.startDecelAnim()));}startDecelAnim(){var e;const i=this.isScaling;this.rAF&&(cancelAnimationFrame(this.rAF),this.rAF=null),this.isBouncingX=false,this.isBouncingY=false;for(const t of v)this.velocity[t]=0;this.target.e=this.current.e,this.target.f=this.current.f,S(this.container,"is-scaling"),S(this.container,"is-animating"),this.isTicking=false;const{trackingPoints:n}=this,s=n[0],o=n[n.length-1];let a=0,r=0,l=0;o&&s&&(a=o.clientX-s.clientX,r=o.clientY-s.clientY,l=o.time-s.time);const c=(null===(e=window.visualViewport)||void 0===e?void 0:e.scale)||1;1!==c&&(a*=c,r*=c);let h=0,d=0,u=0,p=0,f=this.option("decelFriction");const g=this.targetScale;if(l>0){u=Math.abs(a)>3?a/(l/30):0,p=Math.abs(r)>3?r/(l/30):0;const t=this.option("maxVelocity");t&&(u=Math.max(Math.min(u,t),-1*t),p=Math.max(Math.min(p,t),-1*t));}u&&(h=u/(1/(1-f)-1)),p&&(d=p/(1/(1-f)-1)),("y"===this.option("lockAxis")||"xy"===this.option("lockAxis")&&"y"===this.lockedAxis&&t(g)===this.minScale)&&(h=u=0),("x"===this.option("lockAxis")||"xy"===this.option("lockAxis")&&"x"===this.lockedAxis&&t(g)===this.minScale)&&(d=p=0);const m=this.dragOffset.x,b=this.dragOffset.y,y=this.option("dragMinThreshold")||0;Math.abs(m)<y&&Math.abs(b)<y&&(h=d=0,u=p=0),(this.option("zoom")&&(g<this.minScale-1e-5||g>this.maxScale+1e-5)||i&&!h&&!d)&&(f=.35),this.applyChange({panX:h,panY:d,friction:f}),this.emit("decel",u,p,m,b);}onWheel(t){var e=[-t.deltaX||0,-t.deltaY||0,-t.detail||0].reduce((function(t,e){return Math.abs(e)>Math.abs(t)?e:t}));const i=Math.max(-1,Math.min(1,e));if(this.emit("wheel",t,i),this.panMode===O)return;if(t.defaultPrevented)return;const n=this.option("wheel");"pan"===n?(t.preventDefault(),this.panOnlyZoomed&&!this.canZoomOut()||this.applyChange({panX:2*-t.deltaX,panY:2*-t.deltaY,bounce:false})):"zoom"===n&&false!==this.option("zoom")&&this.zoomWithWheel(t);}onMouseMove(t){this.panWithMouse(t);}onKeydown(t){"Escape"===t.key&&this.toggleFS();}onResize(){this.updateMetrics(),this.checkBounds().inBounds||this.requestTick();}setTransform(){this.emit("beforeTransform");const{current:e,target:i,content:n,contentRect:s}=this,o=Object.assign({},C);for(const n of v){const s="e"==n||"f"===n?M:T;o[n]=t(e[n],s),Math.abs(i[n]-e[n])<("e"==n||"f"===n?.51:.001)&&(e[n]=i[n]);}let{a:a,b:r,c:l,d:c,e:h,f:d}=o,u=`matrix(${a}, ${r}, ${l}, ${c}, ${h}, ${d})`,p=n.parentElement instanceof HTMLPictureElement?n.parentElement:n;if(this.option("transformParent")&&(p=p.parentElement||p),p.style.transform===u)return;p.style.transform=u;const{contentWidth:f,contentHeight:g}=this.calculateContentDim();s.width=f,s.height=g,this.emit("afterTransform");}updateMetrics(e=false){var i;if(!this||this.state===m.Destroy)return;if(this.isContentLoading)return;const n=Math.max(1,(null===(i=window.visualViewport)||void 0===i?void 0:i.scale)||1),{container:s,content:o}=this,a=o instanceof HTMLImageElement,r=s.getBoundingClientRect(),l=getComputedStyle(this.container);let c=r.width*n,h=r.height*n;const d=parseFloat(l.paddingTop)+parseFloat(l.paddingBottom),u=c-(parseFloat(l.paddingLeft)+parseFloat(l.paddingRight)),p=h-d;this.containerRect={width:c,height:h,innerWidth:u,innerHeight:p};const f=parseFloat(o.dataset.width||"")||(t=>{let e=0;return e=t instanceof HTMLImageElement?t.naturalWidth:t instanceof SVGElement?t.width.baseVal.value:Math.max(t.offsetWidth,t.scrollWidth),e||0})(o),g=parseFloat(o.dataset.height||"")||(t=>{let e=0;return e=t instanceof HTMLImageElement?t.naturalHeight:t instanceof SVGElement?t.height.baseVal.value:Math.max(t.offsetHeight,t.scrollHeight),e||0})(o);let v=this.option("width",f)||z,b=this.option("height",g)||z;const y=v===z,w=b===z;"number"!=typeof v&&(v=f),"number"!=typeof b&&(b=g),y&&(v=f*(b/g)),w&&(b=g/(f/v));let x=o.parentElement instanceof HTMLPictureElement?o.parentElement:o;this.option("transformParent")&&(x=x.parentElement||x);const E=x.getAttribute("style")||"";x.style.setProperty("transform","none","important"),a&&(x.style.width="",x.style.height=""),x.offsetHeight;const S=o.getBoundingClientRect();let P=S.width*n,C=S.height*n,T=P,M=C;P=Math.min(P,v),C=Math.min(C,b),a?({width:P,height:C}=((t,e,i,n)=>{const s=i/t,o=n/e,a=Math.min(s,o);return {width:t*=a,height:e*=a}})(v,b,P,C)):(P=Math.min(P,v),C=Math.min(C,b));let O=.5*(M-C),A=.5*(T-P);this.contentRect=Object.assign(Object.assign({},this.contentRect),{top:S.top-r.top+O,bottom:r.bottom-S.bottom+O,left:S.left-r.left+A,right:r.right-S.right+A,fitWidth:P,fitHeight:C,width:P,height:C,fullWidth:v,fullHeight:b}),x.style.cssText=E,a&&(x.style.width=`${P}px`,x.style.height=`${C}px`),this.setTransform(),true!==e&&this.emit("refresh"),this.ignoreBounds||(t(this.targetScale)<t(this.minScale)?this.zoomTo(this.minScale,{friction:0}):this.targetScale>this.maxScale?this.zoomTo(this.maxScale,{friction:0}):this.state===m.Init||this.checkBounds().inBounds||this.requestTick()),this.updateControls();}calculateBounds(){const{contentWidth:e,contentHeight:i}=this.calculateContentDim(this.target),{targetScale:n,lockedAxis:s}=this,{fitWidth:o,fitHeight:a}=this.contentRect;let r=0,l=0,c=0,h=0;const d=this.option("infinite");if(true===d||s&&d===s)r=-1/0,c=1/0,l=-1/0,h=1/0;else {let{containerRect:s,contentRect:d}=this,u=t(o*n,M),p=t(a*n,M),{innerWidth:f,innerHeight:g}=s;if(s.width===u&&(f=s.width),s.width===p&&(g=s.height),e>f){c=.5*(e-f),r=-1*c;let t=.5*(d.right-d.left);r+=t,c+=t;}if(o>f&&e<f&&(r-=.5*(o-f),c-=.5*(o-f)),i>g){h=.5*(i-g),l=-1*h;let t=.5*(d.bottom-d.top);l+=t,h+=t;}a>g&&i<g&&(r-=.5*(a-g),c-=.5*(a-g));}return {x:{min:r,max:c},y:{min:l,max:h}}}getBounds(){const t=this.option("bounds");return t!==z?t:this.calculateBounds()}updateControls(){const e=this,i=e.container,{panMode:n,contentRect:s,targetScale:a,minScale:r}=e;let l=r,c=e.option("click")||false;c&&(l=e.getNextScale(c));let h=e.canZoomIn(),d=e.canZoomOut(),u=n===A&&!!this.option("touch"),p=d&&u;if(u&&(t(a)<t(r)&&!this.panOnlyZoomed&&(p=true),(t(s.width,1)>t(s.fitWidth,1)||t(s.height,1)>t(s.fitHeight,1))&&(p=true)),t(s.width*a,1)<t(s.fitWidth,1)&&(p=false),n===O&&(p=false),o(i,this.cn("isDraggable"),p),!this.option("zoom"))return;let f=h&&t(l)>t(a),g=!f&&!p&&d&&t(l)<t(a);o(i,this.cn("canZoomIn"),f),o(i,this.cn("canZoomOut"),g);for(const t of i.querySelectorAll("[data-panzoom-action]")){let e=false,i=false;switch(t.dataset.panzoomAction){case "zoomIn":h?e=true:i=true;break;case "zoomOut":d?e=true:i=true;break;case "toggleZoom":case "iterateZoom":h||d?e=true:i=true;const n=t.querySelector("g");n&&(n.style.display=h?"":"none");}e?(t.removeAttribute("disabled"),t.removeAttribute("tabindex")):i&&(t.setAttribute("disabled",""),t.setAttribute("tabindex","-1"));}}panTo({x:t=this.target.e,y:e=this.target.f,scale:i=this.targetScale,friction:n=this.option("friction"),angle:s=0,originX:o=0,originY:a=0,flipX:r=false,flipY:l=false,ignoreBounds:c=false}){this.state!==m.Destroy&&this.applyChange({panX:t-this.target.e,panY:e-this.target.f,scale:i/this.targetScale,angle:s,originX:o,originY:a,friction:n,flipX:r,flipY:l,ignoreBounds:c});}applyChange({panX:e=0,panY:i=0,scale:n=1,angle:s=0,originX:o=-this.current.e,originY:a=-this.current.f,friction:r=this.option("friction"),flipX:l=false,flipY:c=false,ignoreBounds:h=false,bounce:d=this.option("bounce")}){const u=this.state;if(u===m.Destroy)return;this.rAF&&(cancelAnimationFrame(this.rAF),this.rAF=null),this.friction=r||0,this.ignoreBounds=h;const{current:p}=this,f=p.e,g=p.f,b=this.getMatrix(this.target);let y=(new DOMMatrix).translate(f,g).translate(o,a).translate(e,i);if(this.option("zoom")){if(!h){const t=this.targetScale,e=this.minScale,i=this.maxScale;t*n<e&&(n=e/t),t*n>i&&(n=i/t);}y=y.scale(n);}y=y.translate(-o,-a).translate(-f,-g).multiply(b),s&&(y=y.rotate(s)),l&&(y=y.scale(-1,1)),c&&(y=y.scale(1,-1));for(const e of v)"e"!==e&&"f"!==e&&(y[e]>this.minScale+1e-5||y[e]<this.minScale-1e-5)?this.target[e]=y[e]:this.target[e]=t(y[e],M);(this.targetScale<this.scale||Math.abs(n-1)>.1||this.panMode===O||false===d)&&!h&&this.clampTargetBounds(),u===m.Init?this.animate():this.isResting||(this.state=m.Panning,this.requestTick());}stop(t=false){if(this.state===m.Init||this.state===m.Destroy)return;const e=this.isTicking;this.rAF&&(cancelAnimationFrame(this.rAF),this.rAF=null),this.isBouncingX=false,this.isBouncingY=false;for(const e of v)this.velocity[e]=0,"current"===t?this.current[e]=this.target[e]:"target"===t&&(this.target[e]=this.current[e]);this.setTransform(),S(this.container,"is-scaling"),S(this.container,"is-animating"),this.isTicking=false,this.state=m.Ready,e&&(this.emit("endAnimation"),this.updateControls());}requestTick(){this.isTicking||(this.emit("startAnimation"),this.updateControls(),P(this.container,"is-animating"),this.isScaling&&P(this.container,"is-scaling")),this.isTicking=true,this.rAF||(this.rAF=requestAnimationFrame((()=>this.animate())));}panWithMouse(e,i=this.option("mouseMoveFriction")){if(this.pmme=e,this.panMode!==O||!e)return;if(t(this.targetScale)<=t(this.minScale))return;this.emit("mouseMove",e);const{container:n,containerRect:s,contentRect:o}=this,a=s.width,r=s.height,l=n.getBoundingClientRect(),c=(e.clientX||0)-l.left,h=(e.clientY||0)-l.top;let{contentWidth:d,contentHeight:u}=this.calculateContentDim(this.target);const p=this.option("mouseMoveFactor");p>1&&(d!==a&&(d*=p),u!==r&&(u*=p));let f=.5*(d-a)-c/a*100/100*(d-a);f+=.5*(o.right-o.left);let g=.5*(u-r)-h/r*100/100*(u-r);g+=.5*(o.bottom-o.top),this.applyChange({panX:f-this.target.e,panY:g-this.target.f,friction:i});}zoomWithWheel(e){if(this.state===m.Destroy||this.state===m.Init)return;const i=Date.now();if(i-this.pwt<45)return void e.preventDefault();this.pwt=i;var n=[-e.deltaX||0,-e.deltaY||0,-e.detail||0].reduce((function(t,e){return Math.abs(e)>Math.abs(t)?e:t}));const s=Math.max(-1,Math.min(1,n)),{targetScale:o,maxScale:a,minScale:r}=this;let l=o*(100+45*s)/100;t(l)<t(r)&&t(o)<=t(r)?(this.cwd+=Math.abs(s),l=r):t(l)>t(a)&&t(o)>=t(a)?(this.cwd+=Math.abs(s),l=a):(this.cwd=0,l=Math.max(Math.min(l,a),r)),this.cwd>this.option("wheelLimit")||(e.preventDefault(),t(l)!==t(o)&&this.zoomTo(l,{event:e}));}canZoomIn(){return this.option("zoom")&&(t(this.contentRect.width,1)<t(this.contentRect.fitWidth,1)||t(this.targetScale)<t(this.maxScale))}canZoomOut(){return this.option("zoom")&&t(this.targetScale)>t(this.minScale)}zoomIn(t=1.25,e){this.zoomTo(this.targetScale*t,e);}zoomOut(t=.8,e){this.zoomTo(this.targetScale*t,e);}zoomToFit(t){this.zoomTo("fit",t);}zoomToCover(t){this.zoomTo("cover",t);}zoomToFull(t){this.zoomTo("full",t);}zoomToMax(t){this.zoomTo("max",t);}toggleZoom(t){this.zoomTo(this.getNextScale("toggleZoom"),t);}toggleMax(t){this.zoomTo(this.getNextScale("toggleMax"),t);}toggleCover(t){this.zoomTo(this.getNextScale("toggleCover"),t);}iterateZoom(t){this.zoomTo("next",t);}zoomTo(t=1,{friction:e=z,originX:i=z,originY:n=z,event:s}={}){if(this.isContentLoading||this.state===m.Destroy)return;const{targetScale:o,fullScale:a,maxScale:r,coverScale:l}=this;if(this.stop(),this.panMode===O&&(s=this.pmme||s),s||i===z||n===z){const t=this.content.getBoundingClientRect(),e=this.container.getBoundingClientRect(),o=s?s.clientX:e.left+.5*e.width,a=s?s.clientY:e.top+.5*e.height;i=o-t.left-.5*t.width,n=a-t.top-.5*t.height;}let c=1;"number"==typeof t?c=t:"full"===t?c=a:"cover"===t?c=l:"max"===t?c=r:"fit"===t?c=1:"next"===t&&(c=this.getNextScale("iterateZoom")),c=c/o||1,e=e===z?c>1?.15:.25:e,this.applyChange({scale:c,originX:i,originY:n,friction:e}),s&&this.panMode===O&&this.panWithMouse(s,e);}rotateCCW(){this.applyChange({angle:-90});}rotateCW(){this.applyChange({angle:90});}flipX(){this.applyChange({flipX:true});}flipY(){this.applyChange({flipY:true});}fitX(){this.stop("target");const{containerRect:t,contentRect:e,target:i}=this;this.applyChange({panX:.5*t.width-(e.left+.5*e.fitWidth)-i.e,panY:.5*t.height-(e.top+.5*e.fitHeight)-i.f,scale:t.width/e.fitWidth/this.targetScale,originX:0,originY:0,ignoreBounds:true});}fitY(){this.stop("target");const{containerRect:t,contentRect:e,target:i}=this;this.applyChange({panX:.5*t.width-(e.left+.5*e.fitWidth)-i.e,panY:.5*t.innerHeight-(e.top+.5*e.fitHeight)-i.f,scale:t.height/e.fitHeight/this.targetScale,originX:0,originY:0,ignoreBounds:true});}toggleFS(){const{container:t}=this,e=this.cn("inFullscreen"),i=this.cn("htmlHasFullscreen");t.classList.toggle(e);const n=t.classList.contains(e);n?(document.documentElement.classList.add(i),document.addEventListener("keydown",this.onKeydown,true)):(document.documentElement.classList.remove(i),document.removeEventListener("keydown",this.onKeydown,true)),this.updateMetrics(),this.emit(n?"enterFS":"exitFS");}getMatrix(t=this.current){const{a:e,b:i,c:n,d:s,e:o,f:a}=t;return new DOMMatrix([e,i,n,s,o,a])}reset(t){if(this.state!==m.Init&&this.state!==m.Destroy){this.stop("current");for(const t of v)this.target[t]=C[t];this.target.a=this.minScale,this.target.d=this.minScale,this.clampTargetBounds(),this.isResting||(this.friction=void 0===t?this.option("friction"):t,this.state=m.Panning,this.requestTick());}}destroy(){this.stop(),this.state=m.Destroy,this.detachEvents(),this.detachObserver();const{container:t,content:e}=this,i=this.option("classes")||{};for(const e of Object.values(i))t.classList.remove(e+"");e&&(e.removeEventListener("load",this.onLoad),e.removeEventListener("error",this.onError)),this.detachPlugins();}}Object.defineProperty(I,"defaults",{enumerable:true,configurable:true,writable:true,value:y}),Object.defineProperty(I,"Plugins",{enumerable:true,configurable:true,writable:true,value:{}});const D=function(t,e){let i=true;return (...n)=>{i&&(i=false,t(...n),setTimeout((()=>{i=true;}),e));}},F=(t,e)=>{let i=[];return t.childNodes.forEach((t=>{t.nodeType!==Node.ELEMENT_NODE||e&&!t.matches(e)||i.push(t);})),i},j={viewport:null,track:null,enabled:true,slides:[],axis:"x",transition:"fade",preload:1,slidesPerPage:"auto",initialPage:0,friction:.12,Panzoom:{decelFriction:.12},center:true,infinite:true,fill:true,dragFree:false,adaptiveHeight:false,direction:"ltr",classes:{container:"f-carousel",viewport:"f-carousel__viewport",track:"f-carousel__track",slide:"f-carousel__slide",isLTR:"is-ltr",isRTL:"is-rtl",isHorizontal:"is-horizontal",isVertical:"is-vertical",inTransition:"in-transition",isSelected:"is-selected"},l10n:{NEXT:"Next slide",PREV:"Previous slide",GOTO:"Go to slide #%d"}};var B;!function(t){t[t.Init=0]="Init",t[t.Ready=1]="Ready",t[t.Destroy=2]="Destroy";}(B||(B={}));const H=t=>{if("string"==typeof t||t instanceof HTMLElement)t={html:t};else {const e=t.thumb;void 0!==e&&("string"==typeof e&&(t.thumbSrc=e),e instanceof HTMLImageElement&&(t.thumbEl=e,t.thumbElSrc=e.src,t.thumbSrc=e.src),delete t.thumb);}return Object.assign({html:"",el:null,isDom:false,class:"",customClass:"",index:-1,dim:0,gap:0,pos:0,transition:false},t)},N=(t={})=>Object.assign({index:-1,slides:[],dim:0,pos:-1},t);class _ extends f{constructor(t,e){super(e),Object.defineProperty(this,"instance",{enumerable:true,configurable:true,writable:true,value:t});}attach(){}detach(){}}const $={classes:{list:"f-carousel__dots",isDynamic:"is-dynamic",hasDots:"has-dots",dot:"f-carousel__dot",isBeforePrev:"is-before-prev",isPrev:"is-prev",isCurrent:"is-current",isNext:"is-next",isAfterNext:"is-after-next"},dotTpl:'<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"><span class="f-carousel__dot" aria-hidden="true"></span></button>',dynamicFrom:11,maxCount:1/0,minCount:2};class W extends _{constructor(){super(...arguments),Object.defineProperty(this,"isDynamic",{enumerable:true,configurable:true,writable:true,value:false}),Object.defineProperty(this,"list",{enumerable:true,configurable:true,writable:true,value:null});}onRefresh(){this.refresh();}build(){let t=this.list;if(!t){t=document.createElement("ul"),P(t,this.cn("list")),t.setAttribute("role","tablist");const e=this.instance.container;e.appendChild(t),P(e,this.cn("hasDots")),this.list=t;}return t}refresh(){var t;const e=this.instance.pages.length,i=Math.min(2,this.option("minCount")),n=Math.max(2e3,this.option("maxCount")),s=this.option("dynamicFrom");if(e<i||e>n)return void this.cleanup();const a="number"==typeof s&&e>5&&e>=s,r=!this.list||this.isDynamic!==a||this.list.children.length!==e;r&&this.cleanup();const l=this.build();if(o(l,this.cn("isDynamic"),!!a),r)for(let t=0;t<e;t++)l.append(this.createItem(t));let c,h=0;for(const e of [...l.children]){const i=h===this.instance.page;i&&(c=e),o(e,this.cn("isCurrent"),i),null===(t=e.children[0])||void 0===t||t.setAttribute("aria-selected",i?"true":"false");for(const t of ["isBeforePrev","isPrev","isNext","isAfterNext"])S(e,this.cn(t));h++;}if(c=c||l.firstChild,a&&c){const t=c.previousElementSibling,e=t&&t.previousElementSibling;P(t,this.cn("isPrev")),P(e,this.cn("isBeforePrev"));const i=c.nextElementSibling,n=i&&i.nextElementSibling;P(i,this.cn("isNext")),P(n,this.cn("isAfterNext"));}this.isDynamic=a;}createItem(t=0){var e;const i=document.createElement("li");i.setAttribute("role","presentation");const s=n(this.instance.localize(this.option("dotTpl"),[["%d",t+1]]).replace(/\%i/g,t+""));return i.appendChild(s),null===(e=i.children[0])||void 0===e||e.setAttribute("role","tab"),i}cleanup(){this.list&&(this.list.remove(),this.list=null),this.isDynamic=false,S(this.instance.container,this.cn("hasDots"));}attach(){this.instance.on(["refresh","change"],this.onRefresh);}detach(){this.instance.off(["refresh","change"],this.onRefresh),this.cleanup();}}Object.defineProperty(W,"defaults",{enumerable:true,configurable:true,writable:true,value:$});const X="disabled",q="next",Y="prev";class V extends _{constructor(){super(...arguments),Object.defineProperty(this,"container",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"prev",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"next",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"isDom",{enumerable:true,configurable:true,writable:true,value:false});}onRefresh(){const t=this.instance,e=t.pages.length,i=t.page;if(e<2)return void this.cleanup();this.build();let n=this.prev,s=this.next;n&&s&&(n.removeAttribute(X),s.removeAttribute(X),t.isInfinite||(i<=0&&n.setAttribute(X,""),i>=e-1&&s.setAttribute(X,"")));}addBtn(t){var e;const i=this.instance,n=document.createElement("button");n.setAttribute("tabindex","0"),n.setAttribute("title",i.localize(`{{${t.toUpperCase()}}}`)),P(n,this.cn("button")+" "+this.cn(t===q?"isNext":"isPrev"));const s=i.isRTL?t===q?Y:q:t;var o;return n.innerHTML=i.localize(this.option(`${s}Tpl`)),n.dataset[`carousel${o=t,o?o.match("^[a-z]")?o.charAt(0).toUpperCase()+o.substring(1):o:""}`]="true",null===(e=this.container)||void 0===e||e.appendChild(n),n}build(){const t=this.instance.container,e=this.cn("container");let{container:i,prev:n,next:s}=this;i||(i=t.querySelector("."+e),this.isDom=!!i),i||(i=document.createElement("div"),P(i,e),t.appendChild(i)),this.container=i,s||(s=i.querySelector("[data-carousel-next]")),s||(s=this.addBtn(q)),this.next=s,n||(n=i.querySelector("[data-carousel-prev]")),n||(n=this.addBtn(Y)),this.prev=n;}cleanup(){this.isDom||(this.prev&&this.prev.remove(),this.next&&this.next.remove(),this.container&&this.container.remove()),this.prev=null,this.next=null,this.container=null,this.isDom=false;}attach(){this.instance.on(["refresh","change"],this.onRefresh);}detach(){this.instance.off(["refresh","change"],this.onRefresh),this.cleanup();}}Object.defineProperty(V,"defaults",{enumerable:true,configurable:true,writable:true,value:{classes:{container:"f-carousel__nav",button:"f-button",isNext:"is-next",isPrev:"is-prev"},nextTpl:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',prevTpl:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>'}});class Z extends _{constructor(){super(...arguments),Object.defineProperty(this,"selectedIndex",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"target",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"nav",{enumerable:true,configurable:true,writable:true,value:null});}addAsTargetFor(t){this.target=this.instance,this.nav=t,this.attachEvents();}addAsNavFor(t){this.nav=this.instance,this.target=t,this.attachEvents();}attachEvents(){const{nav:t,target:e}=this;t&&e&&(t.options.initialSlide=e.options.initialPage,t.state===B.Ready?this.onNavReady(t):t.on("ready",this.onNavReady),e.state===B.Ready?this.onTargetReady(e):e.on("ready",this.onTargetReady));}onNavReady(t){t.on("createSlide",this.onNavCreateSlide),t.on("Panzoom.click",this.onNavClick),t.on("Panzoom.touchEnd",this.onNavTouch),this.onTargetChange();}onTargetReady(t){t.on("change",this.onTargetChange),t.on("Panzoom.refresh",this.onTargetChange),this.onTargetChange();}onNavClick(t,e,i){this.onNavTouch(t,t.panzoom,i);}onNavTouch(t,e,i){var n,s;if(Math.abs(e.dragOffset.x)>3||Math.abs(e.dragOffset.y)>3)return;const o=i.target,{nav:a,target:r}=this;if(!a||!r||!o)return;const l=o.closest("[data-index]");if(i.stopPropagation(),i.preventDefault(),!l)return;const c=parseInt(l.dataset.index||"",10)||0,h=r.getPageForSlide(c),d=a.getPageForSlide(c);a.slideTo(d),r.slideTo(h,{friction:(null===(s=null===(n=this.nav)||void 0===n?void 0:n.plugins)||void 0===s?void 0:s.Sync.option("friction"))||0}),this.markSelectedSlide(c);}onNavCreateSlide(t,e){e.index===this.selectedIndex&&this.markSelectedSlide(e.index);}onTargetChange(){var t,e;const{target:i,nav:n}=this;if(!i||!n)return;if(n.state!==B.Ready||i.state!==B.Ready)return;const s=null===(e=null===(t=i.pages[i.page])||void 0===t?void 0:t.slides[0])||void 0===e?void 0:e.index,o=n.getPageForSlide(s);this.markSelectedSlide(s),n.slideTo(o,null===n.prevPage&&null===i.prevPage?{friction:0}:void 0);}markSelectedSlide(t){const e=this.nav;e&&e.state===B.Ready&&(this.selectedIndex=t,[...e.slides].map((e=>{e.el&&e.el.classList[e.index===t?"add":"remove"]("is-nav-selected");})));}attach(){const t=this;let e=t.options.target,i=t.options.nav;e?t.addAsNavFor(e):i&&t.addAsTargetFor(i);}detach(){const t=this,e=t.nav,i=t.target;e&&(e.off("ready",t.onNavReady),e.off("createSlide",t.onNavCreateSlide),e.off("Panzoom.click",t.onNavClick),e.off("Panzoom.touchEnd",t.onNavTouch)),t.nav=null,i&&(i.off("ready",t.onTargetReady),i.off("refresh",t.onTargetChange),i.off("change",t.onTargetChange)),t.target=null;}}Object.defineProperty(Z,"defaults",{enumerable:true,configurable:true,writable:true,value:{friction:.35}});const U={Navigation:V,Dots:W,Sync:Z},G="animationend",K="isSelected",J="slide";class Q extends g{get axis(){return this.isHorizontal?"e":"f"}get isEnabled(){return this.state===B.Ready}get isInfinite(){let t=false;const{contentDim:e,viewportDim:i,pages:n,slides:s}=this,o=s[0];return n.length>=2&&o&&e+o.dim>=i&&(t=this.option("infinite")),t}get isRTL(){return "rtl"===this.option("direction")}get isHorizontal(){return "x"===this.option("axis")}constructor(t,e={},i={}){if(super(),Object.defineProperty(this,"bp",{enumerable:true,configurable:true,writable:true,value:""}),Object.defineProperty(this,"lp",{enumerable:true,configurable:true,writable:true,value:0}),Object.defineProperty(this,"userOptions",{enumerable:true,configurable:true,writable:true,value:{}}),Object.defineProperty(this,"userPlugins",{enumerable:true,configurable:true,writable:true,value:{}}),Object.defineProperty(this,"state",{enumerable:true,configurable:true,writable:true,value:B.Init}),Object.defineProperty(this,"page",{enumerable:true,configurable:true,writable:true,value:0}),Object.defineProperty(this,"prevPage",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"container",{enumerable:true,configurable:true,writable:true,value:void 0}),Object.defineProperty(this,"viewport",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"track",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"slides",{enumerable:true,configurable:true,writable:true,value:[]}),Object.defineProperty(this,"pages",{enumerable:true,configurable:true,writable:true,value:[]}),Object.defineProperty(this,"panzoom",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"inTransition",{enumerable:true,configurable:true,writable:true,value:new Set}),Object.defineProperty(this,"contentDim",{enumerable:true,configurable:true,writable:true,value:0}),Object.defineProperty(this,"viewportDim",{enumerable:true,configurable:true,writable:true,value:0}),"string"==typeof t&&(t=document.querySelector(t)),!t||!E(t))throw new Error("No Element found");this.container=t,this.slideNext=D(this.slideNext.bind(this),150),this.slidePrev=D(this.slidePrev.bind(this),150),this.userOptions=e,this.userPlugins=i,queueMicrotask((()=>{this.processOptions();}));}processOptions(){var t,e;const i=u({},Q.defaults,this.userOptions);let n="";const s=i.breakpoints;if(s&&d(s))for(const[t,e]of Object.entries(s))window.matchMedia(t).matches&&d(e)&&(n+=t,u(i,e));n===this.bp&&this.state!==B.Init||(this.bp=n,this.state===B.Ready&&(i.initialSlide=(null===(e=null===(t=this.pages[this.page])||void 0===t?void 0:t.slides[0])||void 0===e?void 0:e.index)||0),this.state!==B.Init&&this.destroy(),super.setOptions(i),false===this.option("enabled")?this.attachEvents():setTimeout((()=>{this.init();}),0));}init(){this.state=B.Init,this.emit("init"),this.attachPlugins(Object.assign(Object.assign({},Q.Plugins),this.userPlugins)),this.emit("attachPlugins"),this.initLayout(),this.initSlides(),this.updateMetrics(),this.setInitialPosition(),this.initPanzoom(),this.attachEvents(),this.state=B.Ready,this.emit("ready");}initLayout(){const{container:t}=this,e=this.option("classes");P(t,this.cn("container")),o(t,e.isLTR,!this.isRTL),o(t,e.isRTL,this.isRTL),o(t,e.isVertical,!this.isHorizontal),o(t,e.isHorizontal,this.isHorizontal);let i=this.option("viewport")||t.querySelector(`.${e.viewport}`);i||(i=document.createElement("div"),P(i,e.viewport),i.append(...F(t,`.${e.slide}`)),t.prepend(i)),i.addEventListener("scroll",this.onScroll);let n=this.option("track")||t.querySelector(`.${e.track}`);n||(n=document.createElement("div"),P(n,e.track),n.append(...Array.from(i.childNodes))),n.setAttribute("aria-live","polite"),i.contains(n)||i.prepend(n),this.viewport=i,this.track=n,this.emit("initLayout");}initSlides(){const{track:t}=this;if(!t)return;const e=[...this.slides],i=[];[...F(t,`.${this.cn(J)}`)].forEach((t=>{if(E(t)){const e=H({el:t,isDom:true,index:this.slides.length});i.push(e);}}));for(let t of [...this.option("slides",[])||[],...e])i.push(H(t));this.slides=i;for(let t=0;t<this.slides.length;t++)this.slides[t].index=t;for(const t of i)this.emit("beforeInitSlide",t,t.index),this.emit("initSlide",t,t.index);this.emit("initSlides");}setInitialPage(){const t=this.option("initialSlide");this.page="number"==typeof t?this.getPageForSlide(t):parseInt(this.option("initialPage",0)+"",10)||0;}setInitialPosition(){const{track:t,pages:e,isHorizontal:i}=this;if(!t||!e.length)return;let n=this.page;e[n]||(this.page=n=0);const s=(e[n].pos||0)*(this.isRTL&&i?1:-1),o=i?`${s}px`:"0",a=i?"0":`${s}px`;t.style.transform=`translate3d(${o}, ${a}, 0) scale(1)`,this.option("adaptiveHeight")&&this.setViewportHeight();}initPanzoom(){this.panzoom&&(this.panzoom.destroy(),this.panzoom=null);const t=this.option("Panzoom")||{};this.panzoom=new I(this.viewport,u({},{content:this.track,zoom:false,panOnlyZoomed:false,lockAxis:this.isHorizontal?"x":"y",infinite:this.isInfinite,click:false,dblClick:false,touch:t=>!(this.pages.length<2&&!t.options.infinite),bounds:()=>this.getBounds(),maxVelocity:t=>Math.abs(t.target[this.axis]-t.current[this.axis])<2*this.viewportDim?100:0},t)),this.panzoom.on("*",((t,e,...i)=>{this.emit(`Panzoom.${e}`,t,...i);})),this.panzoom.on("decel",this.onDecel),this.panzoom.on("refresh",this.onRefresh),this.panzoom.on("beforeTransform",this.onBeforeTransform),this.panzoom.on("endAnimation",this.onEndAnimation);}attachEvents(){const t=this.container;t&&(t.addEventListener("click",this.onClick,{passive:false,capture:false}),t.addEventListener("slideTo",this.onSlideTo)),window.addEventListener("resize",this.onResize);}createPages(){let t=[];const{contentDim:e,viewportDim:i}=this;let n=this.option("slidesPerPage");n=("auto"===n||e<=i)&&false!==this.option("fill")?1/0:parseFloat(n+"");let s=0,o=0,a=0;for(const e of this.slides)(!t.length||o+e.dim-i>.05||a>=n)&&(t.push(N()),s=t.length-1,o=0,a=0),t[s].slides.push(e),o+=e.dim+e.gap,a++;return t}processPages(){const e=this.pages,{contentDim:i,viewportDim:n,isInfinite:s}=this,o=this.option("center"),a=this.option("fill"),r=a&&o&&i>n&&!s;if(e.forEach(((t,e)=>{var s;t.index=e,t.pos=(null===(s=t.slides[0])||void 0===s?void 0:s.pos)||0,t.dim=0;for(const[e,i]of t.slides.entries())t.dim+=i.dim,e<t.slides.length-1&&(t.dim+=i.gap);r&&t.pos+.5*t.dim<.5*n?t.pos=0:r&&t.pos+.5*t.dim>=i-.5*n?t.pos=i-n:o&&(t.pos+=-0.5*(n-t.dim));})),e.forEach((e=>{a&&!s&&i>n&&(e.pos=Math.max(e.pos,0),e.pos=Math.min(e.pos,i-n)),e.pos=t(e.pos,1e3),e.dim=t(e.dim,1e3),Math.abs(e.pos)<=.1&&(e.pos=0);})),s)return e;const l=[];let c;return e.forEach((t=>{const e=Object.assign({},t);c&&e.pos===c.pos?(c.dim+=e.dim,c.slides=[...c.slides,...e.slides]):(e.index=l.length,c=e,l.push(e));})),l}getPageFromIndex(t=0){const e=this.pages.length;let i;return t=parseInt((t||0).toString())||0,i=this.isInfinite?(t%e+e)%e:Math.max(Math.min(t,e-1),0),i}getSlideMetrics(e){var i,n;const s=this.isHorizontal?"width":"height";let o=0,a=0,r=e.el;const l=!(!r||r.parentNode);if(r?o=parseFloat(r.dataset[s]||"")||0:(r=document.createElement("div"),r.style.visibility="hidden",(this.track||document.body).prepend(r)),P(r,this.cn(J)+" "+e.class+" "+e.customClass),o)r.style[s]=`${o}px`,r.style["width"===s?"height":"width"]="";else {l&&(this.track||document.body).prepend(r),o=r.getBoundingClientRect()[s]*Math.max(1,(null===(i=window.visualViewport)||void 0===i?void 0:i.scale)||1);let t=r[this.isHorizontal?"offsetWidth":"offsetHeight"];t-1>o&&(o=t);}const c=getComputedStyle(r);return "content-box"===c.boxSizing&&(this.isHorizontal?(o+=parseFloat(c.paddingLeft)||0,o+=parseFloat(c.paddingRight)||0):(o+=parseFloat(c.paddingTop)||0,o+=parseFloat(c.paddingBottom)||0)),a=parseFloat(c[this.isHorizontal?"marginRight":"marginBottom"])||0,l?null===(n=r.parentElement)||void 0===n||n.removeChild(r):e.el||r.remove(),{dim:t(o,1e3),gap:t(a,1e3)}}getBounds(){const{isInfinite:t,isRTL:e,isHorizontal:i,pages:n}=this;let s={min:0,max:0};if(t)s={min:-1/0,max:1/0};else if(n.length){const t=n[0].pos,o=n[n.length-1].pos;s=e&&i?{min:t,max:o}:{min:-1*o,max:-1*t};}return {x:i?s:{min:0,max:0},y:i?{min:0,max:0}:s}}repositionSlides(){let e,{isHorizontal:i,isRTL:n,isInfinite:s,viewport:o,viewportDim:a,contentDim:r,page:l,pages:c,slides:h,panzoom:d}=this,u=0,p=0,f=0,g=0;d?g=-1*d.current[this.axis]:c[l]&&(g=c[l].pos||0),e=i?n?"right":"left":"top",n&&i&&(g*=-1);for(const i of h){const n=i.el;n?("top"===e?(n.style.right="",n.style.left=""):n.style.top="",i.index!==u?n.style[e]=0===p?"":`${t(p,1e3)}px`:n.style[e]="",f+=i.dim+i.gap,u++):p+=i.dim+i.gap;}if(s&&f&&o){let n=getComputedStyle(o),s="padding",l=i?"Right":"Bottom",c=parseFloat(n[s+(i?"Left":"Top")]);g-=c,a+=c,a+=parseFloat(n[s+l]);for(const i of h)i.el&&(t(i.pos)<t(a)&&t(i.pos+i.dim+i.gap)<t(g)&&t(g)>t(r-a)&&(i.el.style[e]=`${t(p+f,1e3)}px`),t(i.pos+i.gap)>=t(r-a)&&t(i.pos)>t(g+a)&&t(g)<t(a)&&(i.el.style[e]=`-${t(f,1e3)}px`));}let m,v,b=[...this.inTransition];if(b.length>1&&(m=c[b[0]],v=c[b[1]]),m&&v){let i=0;for(const n of h)n.el?this.inTransition.has(n.index)&&m.slides.indexOf(n)<0&&(n.el.style[e]=`${t(i+(m.pos-v.pos),1e3)}px`):i+=n.dim+n.gap;}}createSlideEl(t){const{track:e,slides:i}=this;if(!e||!t)return;if(t.el&&t.el.parentNode)return;const n=t.el||document.createElement("div");P(n,this.cn(J)),P(n,t.class),P(n,t.customClass);const s=t.html;s&&(s instanceof HTMLElement?n.appendChild(s):n.innerHTML=t.html+"");const o=[];i.forEach(((t,e)=>{t.el&&o.push(e);}));const a=t.index;let r=null;if(o.length){r=i[o.reduce(((t,e)=>Math.abs(e-a)<Math.abs(t-a)?e:t))];}const l=r&&r.el&&r.el.parentNode?r.index<t.index?r.el.nextSibling:r.el:null;e.insertBefore(n,e.contains(l)?l:null),t.el=n,this.emit("createSlide",t);}removeSlideEl(t,e=false){const i=null==t?void 0:t.el;if(!i||!i.parentNode)return;const n=this.cn(K);if(i.classList.contains(n)&&(S(i,n),this.emit("unselectSlide",t)),t.isDom&&!e)return i.removeAttribute("aria-hidden"),i.removeAttribute("data-index"),void(i.style.left="");this.emit("removeSlide",t);const s=new CustomEvent(G);i.dispatchEvent(s),t.el&&(t.el.remove(),t.el=null);}transitionTo(t=0,e=this.option("transition")){var i,n,s,o;if(!e)return  false;const a=this.page,{pages:r,panzoom:l}=this;t=parseInt((t||0).toString())||0;const c=this.getPageFromIndex(t);if(!l||!r[c]||r.length<2||Math.abs(((null===(n=null===(i=r[a])||void 0===i?void 0:i.slides[0])||void 0===n?void 0:n.dim)||0)-this.viewportDim)>1)return  false;let h=t>a?1:-1;this.isInfinite&&(0===a&&t===r.length-1&&(h=-1),a===r.length-1&&0===t&&(h=1));const d=r[c].pos*(this.isRTL?1:-1);if(a===c&&Math.abs(d-l.target[this.axis])<1)return  false;this.clearTransitions();const u=l.isResting;P(this.container,this.cn("inTransition"));const p=(null===(s=r[a])||void 0===s?void 0:s.slides[0])||null,f=(null===(o=r[c])||void 0===o?void 0:o.slides[0])||null;this.inTransition.add(f.index),this.createSlideEl(f);let g=p.el,m=f.el;u||e===J||(e="fadeFast",g=null);const v=this.isRTL?"next":"prev",b=this.isRTL?"prev":"next";return g&&(this.inTransition.add(p.index),p.transition=e,g.addEventListener(G,this.onAnimationEnd),g.classList.add(`f-${e}Out`,`to-${h>0?b:v}`)),m&&(f.transition=e,m.addEventListener(G,this.onAnimationEnd),m.classList.add(`f-${e}In`,`from-${h>0?v:b}`)),l.current[this.axis]=d,l.target[this.axis]=d,l.requestTick(),this.onChange(c),true}manageSlideVisiblity(){const t=new Set,e=new Set,i=this.getVisibleSlides(parseFloat(this.option("preload",0)+"")||0);for(const n of this.slides)i.has(n)?t.add(n):e.add(n);for(const e of this.inTransition)t.add(this.slides[e]);for(const e of t)this.createSlideEl(e),this.lazyLoadSlide(e);for(const i of e)t.has(i)||this.removeSlideEl(i);this.markSelectedSlides(),this.repositionSlides();}markSelectedSlides(){if(!this.pages[this.page]||!this.pages[this.page].slides)return;const t="aria-hidden";let e=this.cn(K);if(e)for(const i of this.slides){const n=i.el;n&&(n.dataset.index=`${i.index}`,n.classList.contains("f-thumbs__slide")?this.getVisibleSlides(0).has(i)?n.removeAttribute(t):n.setAttribute(t,"true"):this.pages[this.page].slides.includes(i)?(n.classList.contains(e)||(P(n,e),this.emit("selectSlide",i)),n.removeAttribute(t)):(n.classList.contains(e)&&(S(n,e),this.emit("unselectSlide",i)),n.setAttribute(t,"true")));}}flipInfiniteTrack(){const{axis:t,isHorizontal:e,isInfinite:i,isRTL:n,viewportDim:s,contentDim:o}=this,a=this.panzoom;if(!a||!i)return;let r=a.current[t],l=a.target[t]-r,c=0,h=.5*s;n&&e?(r<-h&&(c=-1,r+=o),r>o-h&&(c=1,r-=o)):(r>h&&(c=1,r-=o),r<-o+h&&(c=-1,r+=o)),c&&(a.current[t]=r,a.target[t]=r+l);}lazyLoadImg(t,e){const i=this,s="f-fadeIn",o="is-preloading";let a=false,r=null;const l=()=>{a||(a=true,r&&(r.remove(),r=null),S(e,o),e.complete&&(P(e,s),setTimeout((()=>{S(e,s);}),350)),this.option("adaptiveHeight")&&t.el&&this.pages[this.page].slides.indexOf(t)>-1&&(i.updateMetrics(),i.setViewportHeight()),this.emit("load",t));};P(e,o),e.src=e.dataset.lazySrcset||e.dataset.lazySrc||"",delete e.dataset.lazySrc,delete e.dataset.lazySrcset,e.addEventListener("error",(()=>{l();})),e.addEventListener("load",(()=>{l();})),setTimeout((()=>{const i=e.parentNode;i&&t.el&&(e.complete?l():a||(r=n(x),i.insertBefore(r,e)));}),300);}lazyLoadSlide(t){const e=t&&t.el;if(!e)return;const i=new Set;let n=Array.from(e.querySelectorAll("[data-lazy-src],[data-lazy-srcset]"));e.dataset.lazySrc&&n.push(e),n.map((t=>{t instanceof HTMLImageElement?i.add(t):t instanceof HTMLElement&&t.dataset.lazySrc&&(t.style.backgroundImage=`url('${t.dataset.lazySrc}')`,delete t.dataset.lazySrc);}));for(const e of i)this.lazyLoadImg(t,e);}onAnimationEnd(t){var e;const i=t.target,n=i?parseInt(i.dataset.index||"",10)||0:-1,s=this.slides[n],o=t.animationName;if(!i||!s||!o)return;const a=!!this.inTransition.has(n)&&s.transition;a&&o.substring(0,a.length+2)===`f-${a}`&&this.inTransition.delete(n),this.inTransition.size||this.clearTransitions(),n===this.page&&(null===(e=this.panzoom)||void 0===e?void 0:e.isResting)&&this.emit("settle");}onDecel(t,e=0,i=0,n=0,s=0){if(this.option("dragFree"))return void this.setPageFromPosition();const{isRTL:o,isHorizontal:a,axis:r,pages:l}=this,c=l.length,h=Math.abs(Math.atan2(i,e)/(Math.PI/180));let d=0;if(d=h>45&&h<135?a?0:i:a?e:0,!c)return;let u=this.page,p=o&&a?1:-1;const f=t.current[r]*p;let{pageIndex:g}=this.getPageFromPosition(f);Math.abs(d)>5?(l[u].dim<document.documentElement["client"+(this.isHorizontal?"Width":"Height")]-1&&(u=g),u=o&&a?d<0?u-1:u+1:d<0?u+1:u-1):u=0===n&&0===s?u:g,this.slideTo(u,{transition:false,friction:t.option("decelFriction")});}onClick(t){const e=t.target,i=e&&E(e)?e.dataset:null;let n,s;i&&(void 0!==i.carouselPage?(s="slideTo",n=i.carouselPage):void 0!==i.carouselNext?s="slideNext":void 0!==i.carouselPrev&&(s="slidePrev")),s?(t.preventDefault(),t.stopPropagation(),e&&!e.hasAttribute("disabled")&&this[s](n)):this.emit("click",t);}onSlideTo(t){const e=t.detail||0;this.slideTo(this.getPageForSlide(e),{friction:0});}onChange(t,e=0){const i=this.page;this.prevPage=i,this.page=t,this.option("adaptiveHeight")&&this.setViewportHeight(),t!==i&&(this.markSelectedSlides(),this.emit("change",t,i,e));}onRefresh(){let t=this.contentDim,e=this.viewportDim;this.updateMetrics(),this.contentDim===t&&this.viewportDim===e||this.slideTo(this.page,{friction:0,transition:false});}onScroll(){var t;null===(t=this.viewport)||void 0===t||t.scroll(0,0);}onResize(){this.option("breakpoints")&&this.processOptions();}onBeforeTransform(t){this.lp!==t.current[this.axis]&&(this.flipInfiniteTrack(),this.manageSlideVisiblity()),this.lp=t.current.e;}onEndAnimation(){this.inTransition.size||this.emit("settle");}reInit(t=null,e=null){this.destroy(),this.state=B.Init,this.prevPage=null,this.userOptions=t||this.userOptions,this.userPlugins=e||this.userPlugins,this.processOptions();}slideTo(t=0,{friction:e=this.option("friction"),transition:i=this.option("transition")}={}){if(this.state===B.Destroy)return;t=parseInt((t||0).toString())||0;const n=this.getPageFromIndex(t),{axis:s,isHorizontal:o,isRTL:a,pages:r,panzoom:l}=this,c=r.length,h=a&&o?1:-1;if(!l||!c)return;if(this.page!==n){const e=new Event("beforeChange",{bubbles:true,cancelable:true});if(this.emit("beforeChange",e,t),e.defaultPrevented)return}if(this.transitionTo(t,i))return;let d=r[n].pos;if(this.isInfinite){const e=this.contentDim,i=l.target[s]*h;if(2===c)d+=e*Math.floor(parseFloat(t+"")/2);else {d=[d,d-e,d+e].reduce((function(t,e){return Math.abs(e-i)<Math.abs(t-i)?e:t}));}}d*=h,Math.abs(l.target[s]-d)<1||(l.panTo({x:o?d:0,y:o?0:d,friction:e}),this.onChange(n));}slideToClosest(t){if(this.panzoom){const{pageIndex:e}=this.getPageFromPosition();this.slideTo(e,t);}}slideNext(){this.slideTo(this.page+1);}slidePrev(){this.slideTo(this.page-1);}clearTransitions(){this.inTransition.clear(),S(this.container,this.cn("inTransition"));const t=["to-prev","to-next","from-prev","from-next"];for(const e of this.slides){const i=e.el;if(i){i.removeEventListener(G,this.onAnimationEnd),i.classList.remove(...t);const n=e.transition;n&&i.classList.remove(`f-${n}Out`,`f-${n}In`);}}this.manageSlideVisiblity();}addSlide(t,e){var i,n,s,o;const a=this.panzoom,r=(null===(i=this.pages[this.page])||void 0===i?void 0:i.pos)||0,l=(null===(n=this.pages[this.page])||void 0===n?void 0:n.dim)||0,c=this.contentDim<this.viewportDim;let h=Array.isArray(e)?e:[e];const d=[];for(const t of h)d.push(H(t));this.slides.splice(t,0,...d);for(let t=0;t<this.slides.length;t++)this.slides[t].index=t;for(const t of d)this.emit("beforeInitSlide",t,t.index);if(this.page>=t&&(this.page+=d.length),this.updateMetrics(),a){const e=(null===(s=this.pages[this.page])||void 0===s?void 0:s.pos)||0,i=(null===(o=this.pages[this.page])||void 0===o?void 0:o.dim)||0,n=this.pages.length||1,h=this.isRTL?l-i:i-l,d=this.isRTL?r-e:e-r;c&&1===n?(t<=this.page&&(a.current[this.axis]-=h,a.target[this.axis]-=h),a.panTo({[this.isHorizontal?"x":"y"]:-1*e})):d&&t<=this.page&&(a.target[this.axis]-=d,a.current[this.axis]-=d,a.requestTick());}for(const t of d)this.emit("initSlide",t,t.index);}prependSlide(t){this.addSlide(0,t);}appendSlide(t){this.addSlide(this.slides.length,t);}removeSlide(t){const e=this.slides.length;t=(t%e+e)%e;const i=this.slides[t];if(i){this.removeSlideEl(i,true),this.slides.splice(t,1);for(let t=0;t<this.slides.length;t++)this.slides[t].index=t;this.updateMetrics(),this.slideTo(this.page,{friction:0,transition:false}),this.emit("destroySlide",i);}}updateMetrics(){const{panzoom:e,viewport:i,track:n,slides:s,isHorizontal:o,isInfinite:a}=this;if(!n)return;const r=o?"width":"height",l=o?"offsetWidth":"offsetHeight";if(i){let e=Math.max(i[l],t(i.getBoundingClientRect()[r],1e3)),n=getComputedStyle(i),s="padding",a=o?"Right":"Bottom";e-=parseFloat(n[s+(o?"Left":"Top")])+parseFloat(n[s+a]),this.viewportDim=e;}let c,h=0;for(const[e,i]of s.entries()){let n=0,o=0;!i.el&&c?(n=c.dim,o=c.gap):(({dim:n,gap:o}=this.getSlideMetrics(i)),c=i),n=t(n,1e3),o=t(o,1e3),i.dim=n,i.gap=o,i.pos=h,h+=n,(a||e<s.length-1)&&(h+=o);}h=t(h,1e3),this.contentDim=h,e&&(e.contentRect[r]=h,e.contentRect[o?"fullWidth":"fullHeight"]=h),this.pages=this.createPages(),this.pages=this.processPages(),this.state===B.Init&&this.setInitialPage(),this.page=Math.max(0,Math.min(this.page,this.pages.length-1)),this.manageSlideVisiblity(),this.emit("refresh");}getProgress(e,i=false,n=false){ void 0===e&&(e=this.page);const s=this,o=s.panzoom,a=s.contentDim,r=s.pages[e]||0;if(!r||!o)return e>this.page?-1:1;let l=-1*o.current.e,c=t((l-r.pos)/(1*r.dim),1e3),h=c,d=c;this.isInfinite&&true!==n&&(h=t((l-r.pos+a)/(1*r.dim),1e3),d=t((l-r.pos-a)/(1*r.dim),1e3));let u=[c,h,d].reduce((function(t,e){return Math.abs(e)<Math.abs(t)?e:t}));return i?u:u>1?1:u<-1?-1:u}setViewportHeight(){const{page:t,pages:e,viewport:i,isHorizontal:n}=this;if(!i||!e[t])return;let s=0;n&&this.track&&(this.track.style.height="auto",e[t].slides.forEach((t=>{t.el&&(s=Math.max(s,t.el.offsetHeight));}))),i.style.height=s?`${s}px`:"";}getPageForSlide(t){for(const e of this.pages)for(const i of e.slides)if(i.index===t)return e.index;return  -1}getVisibleSlides(t=0){var e;const i=new Set;let{panzoom:n,contentDim:s,viewportDim:o,pages:a,page:r}=this;if(o){s=s+(null===(e=this.slides[this.slides.length-1])||void 0===e?void 0:e.gap)||0;let l=0;l=n&&n.state!==m.Init&&n.state!==m.Destroy?-1*n.current[this.axis]:a[r]&&a[r].pos||0,this.isInfinite&&(l-=Math.floor(l/s)*s),this.isRTL&&this.isHorizontal&&(l*=-1);const c=l-o*t,h=l+o*(t+1),d=this.isInfinite?[-1,0,1]:[0];for(const t of this.slides)for(const e of d){const n=t.pos+e*s,o=n+t.dim+t.gap;n<h&&o>c&&i.add(t);}}return i}getPageFromPosition(t){const{viewportDim:e,contentDim:i,slides:n,pages:s,panzoom:o}=this,a=s.length,r=n.length,l=n[0],c=n[r-1],h=this.option("center");let d=0,u=0,p=0,f=void 0===t?-1*((null==o?void 0:o.target[this.axis])||0):t;h&&(f+=.5*e),this.isInfinite?(f<l.pos-.5*c.gap&&(f-=i,p=-1),f>c.pos+c.dim+.5*c.gap&&(f-=i,p=1)):f=Math.max(l.pos||0,Math.min(f,c.pos));let g=c,m=n.find((t=>{const e=t.pos-.5*g.gap,i=t.pos+t.dim+.5*t.gap;return g=t,f>=e&&f<i}));return m||(m=c),u=this.getPageForSlide(m.index),d=u+p*a,{page:d,pageIndex:u}}setPageFromPosition(){const{pageIndex:t}=this.getPageFromPosition();this.onChange(t);}destroy(){if([B.Destroy].includes(this.state))return;this.state=B.Destroy;const{container:t,viewport:e,track:i,slides:n,panzoom:s}=this,o=this.option("classes");t.removeEventListener("click",this.onClick,{passive:false,capture:false}),t.removeEventListener("slideTo",this.onSlideTo),window.removeEventListener("resize",this.onResize),s&&(s.destroy(),this.panzoom=null),n&&n.forEach((t=>{this.removeSlideEl(t);})),this.detachPlugins(),e&&(e.removeEventListener("scroll",this.onScroll),e.offsetParent&&i&&i.offsetParent&&e.replaceWith(...i.childNodes));for(const[e,i]of Object.entries(o))"container"!==e&&i&&t.classList.remove(i);this.track=null,this.viewport=null,this.page=0,this.slides=[];const a=this.events.get("ready");this.events=new Map,a&&this.events.set("ready",a);}}Object.defineProperty(Q,"Panzoom",{enumerable:true,configurable:true,writable:true,value:I}),Object.defineProperty(Q,"defaults",{enumerable:true,configurable:true,writable:true,value:j}),Object.defineProperty(Q,"Plugins",{enumerable:true,configurable:true,writable:true,value:U});const tt=function(t){if(!E(t))return 0;const e=window.scrollY,i=window.innerHeight,n=e+i,s=t.getBoundingClientRect(),o=s.y+e,a=s.height,r=o+a;if(e>r||n<o)return 0;if(e<o&&n>r)return 100;if(o<e&&r>n)return 100;let l=a;o<e&&(l-=e-o),r>n&&(l-=r-n);const c=l/i*100;return Math.round(c)},et=!("undefined"==typeof window||!window.document||!window.document.createElement);let it;const nt=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden]):not(.fancybox-focus-guard)","iframe","object","embed","video","audio","[contenteditable]",'[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])'].join(","),st=t=>{if(t&&et){ void 0===it&&document.createElement("div").focus({get preventScroll(){return it=true,false}});try{if(it)t.focus({preventScroll:!0});else {const e=window.scrollY||document.body.scrollTop,i=window.scrollX||document.body.scrollLeft;t.focus(),document.body.scrollTo({top:e,left:i,behavior:"auto"});}}catch(t){}}},ot=()=>{const t=document;let e,i="",n="",s="";return t.fullscreenEnabled?(i="requestFullscreen",n="exitFullscreen",s="fullscreenElement"):t.webkitFullscreenEnabled&&(i="webkitRequestFullscreen",n="webkitExitFullscreen",s="webkitFullscreenElement"),i&&(e={request:function(e=t.documentElement){return "webkitRequestFullscreen"===i?e[i](Element.ALLOW_KEYBOARD_INPUT):e[i]()},exit:function(){return t[s]&&t[n]()},isFullscreen:function(){return t[s]}}),e},at={animated:true,autoFocus:true,backdropClick:"close",Carousel:{classes:{container:"fancybox__carousel",viewport:"fancybox__viewport",track:"fancybox__track",slide:"fancybox__slide"}},closeButton:"auto",closeExisting:false,commonCaption:false,compact:()=>window.matchMedia("(max-width: 578px), (max-height: 578px)").matches,contentClick:"toggleZoom",contentDblClick:false,defaultType:"image",defaultDisplay:"flex",dragToClose:true,Fullscreen:{autoStart:false},groupAll:false,groupAttr:"data-fancybox",hideClass:"f-fadeOut",hideScrollbar:true,idle:3500,keyboard:{Escape:"close",Delete:"close",Backspace:"close",PageUp:"next",PageDown:"prev",ArrowUp:"prev",ArrowDown:"next",ArrowRight:"next",ArrowLeft:"prev"},l10n:Object.assign(Object.assign({},b),{CLOSE:"Close",NEXT:"Next",PREV:"Previous",MODAL:"You can close this modal content with the ESC key",ERROR:"Something Went Wrong, Please Try Again Later",IMAGE_ERROR:"Image Not Found",ELEMENT_NOT_FOUND:"HTML Element Not Found",AJAX_NOT_FOUND:"Error Loading AJAX : Not Found",AJAX_FORBIDDEN:"Error Loading AJAX : Forbidden",IFRAME_ERROR:"Error Loading Page",TOGGLE_ZOOM:"Toggle zoom level",TOGGLE_THUMBS:"Toggle thumbnails",TOGGLE_SLIDESHOW:"Toggle slideshow",TOGGLE_FULLSCREEN:"Toggle full-screen mode",DOWNLOAD:"Download"}),parentEl:null,placeFocusBack:true,showClass:"f-zoomInUp",startIndex:0,tpl:{closeButton:'<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg></button>',main:'<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">\n    <div class="fancybox__backdrop"></div>\n    <div class="fancybox__carousel"></div>\n    <div class="fancybox__footer"></div>\n  </div>'},trapFocus:true,wheel:"zoom"};var rt,lt;!function(t){t[t.Init=0]="Init",t[t.Ready=1]="Ready",t[t.Closing=2]="Closing",t[t.CustomClosing=3]="CustomClosing",t[t.Destroy=4]="Destroy";}(rt||(rt={})),function(t){t[t.Loading=0]="Loading",t[t.Opening=1]="Opening",t[t.Ready=2]="Ready",t[t.Closing=3]="Closing";}(lt||(lt={}));let ct="",ht=false,dt=false,ut=null;const pt=()=>{let t="",e="";const i=Oe.getInstance();if(i){const n=i.carousel,s=i.getSlide();if(n&&s){let o=s.slug||void 0,a=s.triggerEl||void 0;e=o||(i.option("slug")||""),!e&&a&&a.dataset&&(e=a.dataset.fancybox||""),e&&"true"!==e&&(t="#"+e+(!o&&n.slides.length>1?"-"+(s.index+1):""));}}return {hash:t,slug:e,index:1}},ft=()=>{const t=new URL(document.URL).hash,e=t.slice(1).split("-"),i=e[e.length-1],n=i&&/^\+?\d+$/.test(i)&&parseInt(e.pop()||"1",10)||1;return {hash:t,slug:e.join("-"),index:n}},gt=()=>{const{slug:t,index:e}=ft();if(!t)return;let i=document.querySelector(`[data-slug="${t}"]`);if(i&&i.dispatchEvent(new CustomEvent("click",{bubbles:true,cancelable:true})),Oe.getInstance())return;const n=document.querySelectorAll(`[data-fancybox="${t}"]`);n.length&&(i=n[e-1],i&&i.dispatchEvent(new CustomEvent("click",{bubbles:true,cancelable:true})));},mt=()=>{if(false===Oe.defaults.Hash)return;const t=Oe.getInstance();if(false===(null==t?void 0:t.options.Hash))return;const{slug:e,index:i}=ft(),{slug:n}=pt();t&&(e===n?t.jumpTo(i-1):(ht=true,t.close())),gt();},vt=()=>{ut&&clearTimeout(ut),queueMicrotask((()=>{mt();}));},bt=()=>{window.addEventListener("hashchange",vt,false),setTimeout((()=>{mt();}),500);};et&&(/complete|interactive|loaded/.test(document.readyState)?bt():document.addEventListener("DOMContentLoaded",bt));const yt="is-zooming-in";class wt extends _{onCreateSlide(t,e,i){const n=this.instance.optionFor(i,"src")||"";i.el&&"image"===i.type&&"string"==typeof n&&this.setImage(i,n);}onRemoveSlide(t,e,i){i.panzoom&&i.panzoom.destroy(),i.panzoom=void 0,i.imageEl=void 0;}onChange(t,e,i,n){S(this.instance.container,yt);for(const t of e.slides){const e=t.panzoom;e&&t.index!==i&&e.reset(.35);}}onClose(){var t;const e=this.instance,i=e.container,n=e.getSlide();if(!i||!i.parentElement||!n)return;const{el:s,contentEl:o,panzoom:a,thumbElSrc:r}=n;if(!s||!r||!o||!a||a.isContentLoading||a.state===m.Init||a.state===m.Destroy)return;a.updateMetrics();let l=this.getZoomInfo(n);if(!l)return;this.instance.state=rt.CustomClosing,i.classList.remove(yt),i.classList.add("is-zooming-out"),o.style.backgroundImage=`url('${r}')`;const c=i.getBoundingClientRect();1===((null===(t=window.visualViewport)||void 0===t?void 0:t.scale)||1)&&Object.assign(i.style,{position:"absolute",top:`${i.offsetTop+window.scrollY}px`,left:`${i.offsetLeft+window.scrollX}px`,bottom:"auto",right:"auto",width:`${c.width}px`,height:`${c.height}px`,overflow:"hidden"});const{x:h,y:d,scale:u,opacity:p}=l;if(p){const t=((t,e,i,n)=>{const s=e-t,o=n-i;return e=>i+((e-t)/s*o||0)})(a.scale,u,1,0);a.on("afterTransform",(()=>{o.style.opacity=t(a.scale)+"";}));}a.on("endAnimation",(()=>{e.destroy();})),a.target.a=u,a.target.b=0,a.target.c=0,a.target.d=u,a.panTo({x:h,y:d,scale:u,friction:p?.2:.33,ignoreBounds:true}),a.isResting&&e.destroy();}setImage(t,e){const i=this.instance;t.src=e,this.process(t,e).then((e=>{const{contentEl:n,imageEl:s,thumbElSrc:o,el:a}=t;if(i.isClosing()||!n||!s)return;n.offsetHeight;const r=!!i.isOpeningSlide(t)&&this.getZoomInfo(t);if(this.option("protected")&&a){a.addEventListener("contextmenu",(t=>{t.preventDefault();}));const t=document.createElement("div");P(t,"fancybox-protected"),n.appendChild(t);}if(o&&r){const s=e.contentRect,a=Math.max(s.fullWidth,s.fullHeight);let c=null;!r.opacity&&a>1200&&(c=document.createElement("img"),P(c,"fancybox-ghost"),c.src=o,n.appendChild(c));const h=()=>{c&&(P(c,"f-fadeFastOut"),setTimeout((()=>{c&&(c.remove(),c=null);}),200));};(l=o,new Promise(((t,e)=>{const i=new Image;i.onload=t,i.onerror=e,i.src=l;}))).then((()=>{i.hideLoading(t),t.state=lt.Opening,this.instance.emit("reveal",t),this.zoomIn(t).then((()=>{h(),this.instance.done(t);}),(()=>{})),c&&setTimeout((()=>{h();}),a>2500?800:200);}),(()=>{i.hideLoading(t),i.revealContent(t);}));}else {const n=this.optionFor(t,"initialSize"),s=this.optionFor(t,"zoom"),o={event:i.prevMouseMoveEvent||i.options.event,friction:s?.12:0};let a=i.optionFor(t,"showClass")||void 0,r=true;i.isOpeningSlide(t)&&("full"===n?e.zoomToFull(o):"cover"===n?e.zoomToCover(o):"max"===n?e.zoomToMax(o):r=false,e.stop("current")),r&&a&&(a=e.isDragging?"f-fadeIn":""),i.hideLoading(t),i.revealContent(t,a);}var l;}),(()=>{i.setError(t,"{{IMAGE_ERROR}}");}));}process(t,e){return new Promise(((i,s)=>{var o;const a=this.instance,r=t.el;a.clearContent(t),a.showLoading(t);let l=this.optionFor(t,"content");if("string"==typeof l&&(l=n(l)),!l||!E(l)){if(l=document.createElement("img"),l instanceof HTMLImageElement){let i="",n=t.caption;i="string"==typeof n&&n?n.replace(/<[^>]+>/gi,"").substring(0,1e3):`Image ${t.index+1} of ${(null===(o=a.carousel)||void 0===o?void 0:o.pages.length)||1}`,l.src=e||"",l.alt=i,l.draggable=false,t.srcset&&l.setAttribute("srcset",t.srcset),this.instance.isOpeningSlide(t)&&(l.fetchPriority="high");}t.sizes&&l.setAttribute("sizes",t.sizes);}P(l,"fancybox-image"),t.imageEl=l,a.setContent(t,l,false);t.panzoom=new I(r,u({transformParent:true},this.option("Panzoom")||{},{content:l,width:(e,i)=>a.optionFor(t,"width","auto",i)||"auto",height:(e,i)=>a.optionFor(t,"height","auto",i)||"auto",wheel:()=>{const t=a.option("wheel");return ("zoom"===t||"pan"==t)&&t},click:(e,i)=>{var n,s;if(a.isCompact||a.isClosing())return  false;if(t.index!==(null===(n=a.getSlide())||void 0===n?void 0:n.index))return  false;if(i){const t=i.composedPath()[0];if(["A","BUTTON","TEXTAREA","OPTION","INPUT","SELECT","VIDEO"].includes(t.nodeName))return  false}let o=!i||i.target&&(null===(s=t.contentEl)||void 0===s?void 0:s.contains(i.target));return a.option(o?"contentClick":"backdropClick")||false},dblClick:()=>a.isCompact?"toggleZoom":a.option("contentDblClick")||false,spinner:false,panOnlyZoomed:true,wheelLimit:1/0,on:{ready:t=>{i(t);},error:()=>{s();},destroy:()=>{s();}}}));}))}zoomIn(t){return new Promise(((e,i)=>{const n=this.instance,s=n.container,{panzoom:o,contentEl:a,el:r}=t;o&&o.updateMetrics();const l=this.getZoomInfo(t);if(!(l&&r&&a&&o&&s))return void i();const{x:c,y:h,scale:d,opacity:u}=l,p=()=>{t.state!==lt.Closing&&(u&&(a.style.opacity=Math.max(Math.min(1,1-(1-o.scale)/(1-d)),0)+""),o.scale>=1&&o.scale>o.targetScale-.1&&e(o));},f=t=>{(t.scale<.99||t.scale>1.01)&&!t.isDragging||(S(s,yt),a.style.opacity="",t.off("endAnimation",f),t.off("touchStart",f),t.off("afterTransform",p),e(t));};o.on("endAnimation",f),o.on("touchStart",f),o.on("afterTransform",p),o.on(["error","destroy"],(()=>{i();})),o.panTo({x:c,y:h,scale:d,friction:0,ignoreBounds:true}),o.stop("current");const g={event:"mousemove"===o.panMode?n.prevMouseMoveEvent||n.options.event:void 0},m=this.optionFor(t,"initialSize");P(s,yt),n.hideLoading(t),"full"===m?o.zoomToFull(g):"cover"===m?o.zoomToCover(g):"max"===m?o.zoomToMax(g):o.reset(.172);}))}getZoomInfo(t){const{el:e,imageEl:i,thumbEl:n,panzoom:s}=t,o=this.instance,a=o.container;if(!e||!i||!n||!s||tt(n)<3||!this.optionFor(t,"zoom")||!a||o.state===rt.Destroy)return  false;if("0"===getComputedStyle(a).getPropertyValue("--f-images-zoom"))return  false;const r=window.visualViewport||null;if(1!==(r?r.scale:1))return  false;let{top:l,left:c,width:h,height:d}=n.getBoundingClientRect(),{top:u,left:p,fitWidth:f,fitHeight:g}=s.contentRect;if(!(h&&d&&f&&g))return  false;const m=s.container.getBoundingClientRect();p+=m.left,u+=m.top;const v=-1*(p+.5*f-(c+.5*h)),b=-1*(u+.5*g-(l+.5*d)),y=h/f;let w=this.option("zoomOpacity")||false;return "auto"===w&&(w=Math.abs(h/d-f/g)>.1),{x:v,y:b,scale:y,opacity:w}}attach(){const t=this,e=t.instance;e.on("Carousel.change",t.onChange),e.on("Carousel.createSlide",t.onCreateSlide),e.on("Carousel.removeSlide",t.onRemoveSlide),e.on("close",t.onClose);}detach(){const t=this,e=t.instance;e.off("Carousel.change",t.onChange),e.off("Carousel.createSlide",t.onCreateSlide),e.off("Carousel.removeSlide",t.onRemoveSlide),e.off("close",t.onClose);}}Object.defineProperty(wt,"defaults",{enumerable:true,configurable:true,writable:true,value:{initialSize:"fit",Panzoom:{maxScale:1},protected:false,zoom:true,zoomOpacity:"auto"}}),"function"==typeof SuppressedError&&SuppressedError;const xt="html",Et="image",St="map",Pt="youtube",Ct="vimeo",Tt="html5video",Mt=(t,e={})=>{const i=new URL(t),n=new URLSearchParams(i.search),s=new URLSearchParams;for(const[t,i]of [...n,...Object.entries(e)]){let e=i+"";if("t"===t){let t=e.match(/((\d*)m)?(\d*)s?/);t&&s.set("start",60*parseInt(t[2]||"0")+parseInt(t[3]||"0")+"");}else s.set(t,e);}let o=s+"",a=t.match(/#t=((.*)?\d+s)/);return a&&(o+=`#t=${a[1]}`),o},Ot={ajax:null,autoSize:true,iframeAttr:{allow:"autoplay; fullscreen",scrolling:"auto"},preload:true,videoAutoplay:true,videoRatio:16/9,videoTpl:'<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">\n  <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos.</video>',videoFormat:"",vimeo:{byline:1,color:"00adef",controls:1,dnt:1,muted:0},youtube:{controls:1,enablejsapi:1,nocookie:1,rel:0,fs:1}},At=["image","html","ajax","inline","clone","iframe","map","pdf","html5video","youtube","vimeo"];class Lt extends _{onBeforeInitSlide(t,e,i){this.processType(i);}onCreateSlide(t,e,i){this.setContent(i);}onClearContent(t,e){e.xhr&&(e.xhr.abort(),e.xhr=null);const i=e.iframeEl;i&&(i.onload=i.onerror=null,i.src="//about:blank",e.iframeEl=null);const n=e.contentEl,s=e.placeholderEl;if("inline"===e.type&&n&&s)n.classList.remove("fancybox__content"),"none"!==getComputedStyle(n).getPropertyValue("display")&&(n.style.display="none"),setTimeout((()=>{s&&(n&&s.parentNode&&s.parentNode.insertBefore(n,s),s.remove());}),0),e.contentEl=void 0,e.placeholderEl=void 0;else for(;e.el&&e.el.firstChild;)e.el.removeChild(e.el.firstChild);}onSelectSlide(t,e,i){i.state===lt.Ready&&this.playVideo();}onUnselectSlide(t,e,i){var n,s;if(i.type===Tt){try{null===(s=null===(n=i.el)||void 0===n?void 0:n.querySelector("video"))||void 0===s||s.pause();}catch(t){}return}let o;i.type===Ct?o={method:"pause",value:"true"}:i.type===Pt&&(o={event:"command",func:"pauseVideo"}),o&&i.iframeEl&&i.iframeEl.contentWindow&&i.iframeEl.contentWindow.postMessage(JSON.stringify(o),"*"),i.poller&&clearTimeout(i.poller);}onDone(t,e){t.isCurrentSlide(e)&&!t.isClosing()&&this.playVideo();}onRefresh(t,e){e.slides.forEach((t=>{t.el&&(this.resizeIframe(t),this.setAspectRatio(t));}));}onMessage(t){try{let e=JSON.parse(t.data);if("https://player.vimeo.com"===t.origin){if("ready"===e.event)for(let e of Array.from(document.getElementsByClassName("fancybox__iframe")))e instanceof HTMLIFrameElement&&e.contentWindow===t.source&&(e.dataset.ready="true");}else if(t.origin.match(/^https:\/\/(www.)?youtube(-nocookie)?.com$/)&&"onReady"===e.event){const t=document.getElementById(e.id);t&&(t.dataset.ready="true");}}catch(t){}}loadAjaxContent(t){const e=this.instance.optionFor(t,"src")||"";this.instance.showLoading(t);const i=this.instance,n=new XMLHttpRequest;i.showLoading(t),n.onreadystatechange=function(){n.readyState===XMLHttpRequest.DONE&&i.state===rt.Ready&&(i.hideLoading(t),200===n.status?i.setContent(t,n.responseText):i.setError(t,404===n.status?"{{AJAX_NOT_FOUND}}":"{{AJAX_FORBIDDEN}}"));};const s=t.ajax||null;n.open(s?"POST":"GET",e+""),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n.setRequestHeader("X-Requested-With","XMLHttpRequest"),n.send(s),t.xhr=n;}setInlineContent(t){let e=null;if(E(t.src))e=t.src;else if("string"==typeof t.src){const i=t.src.split("#",2).pop();e=i?document.getElementById(i):null;}if(e){if("clone"===t.type||e.closest(".fancybox__slide")){e=e.cloneNode(true);const i=e.dataset.animationName;i&&(e.classList.remove(i),delete e.dataset.animationName);let n=e.getAttribute("id");n=n?`${n}--clone`:`clone-${this.instance.id}-${t.index}`,e.setAttribute("id",n);}else if(e.parentNode){const i=document.createElement("div");i.classList.add("fancybox-placeholder"),e.parentNode.insertBefore(i,e),t.placeholderEl=i;}this.instance.setContent(t,e);}else this.instance.setError(t,"{{ELEMENT_NOT_FOUND}}");}setIframeContent(t){const{src:e,el:i}=t;if(!e||"string"!=typeof e||!i)return;i.classList.add("is-loading");const n=this.instance,s=document.createElement("iframe");s.className="fancybox__iframe",s.setAttribute("id",`fancybox__iframe_${n.id}_${t.index}`);for(const[e,i]of Object.entries(this.optionFor(t,"iframeAttr")||{}))s.setAttribute(e,i);s.onerror=()=>{n.setError(t,"{{IFRAME_ERROR}}");},t.iframeEl=s;const o=this.optionFor(t,"preload");if("iframe"!==t.type||false===o)return s.setAttribute("src",t.src+""),n.setContent(t,s,false),this.resizeIframe(t),void n.revealContent(t);n.showLoading(t),s.onload=()=>{if(!s.src.length)return;const e="true"!==s.dataset.ready;s.dataset.ready="true",this.resizeIframe(t),e?n.revealContent(t):n.hideLoading(t);},s.setAttribute("src",e),n.setContent(t,s,false);}resizeIframe(t){const{type:e,iframeEl:i}=t;if(e===Pt||e===Ct)return;const n=null==i?void 0:i.parentElement;if(!i||!n)return;let s=t.autoSize;void 0===s&&(s=this.optionFor(t,"autoSize"));let o=t.width||0,a=t.height||0;o&&a&&(s=false);const r=n&&n.style;if(false!==t.preload&&false!==s&&r)try{const t=window.getComputedStyle(n),e=parseFloat(t.paddingLeft)+parseFloat(t.paddingRight),s=parseFloat(t.paddingTop)+parseFloat(t.paddingBottom),l=i.contentWindow;if(l){const t=l.document,i=t.getElementsByTagName(xt)[0],n=t.body;r.width="",n.style.overflow="hidden",o=o||i.scrollWidth+e,r.width=`${o}px`,n.style.overflow="",r.flex="0 0 auto",r.height=`${n.scrollHeight}px`,a=i.scrollHeight+s;}}catch(t){}if(o||a){const t={flex:"0 1 auto",width:"",height:""};o&&"auto"!==o&&(t.width=`${o}px`),a&&"auto"!==a&&(t.height=`${a}px`),Object.assign(r,t);}}playVideo(){const t=this.instance.getSlide();if(!t)return;const{el:e}=t;if(!e||!e.offsetParent)return;if(!this.optionFor(t,"videoAutoplay"))return;if(t.type===Tt)try{const t=e.querySelector("video");if(t){const e=t.play();void 0!==e&&e.then((()=>{})).catch((e=>{t.muted=!0,t.play();}));}}catch(t){}if(t.type!==Pt&&t.type!==Ct)return;const i=()=>{if(t.iframeEl&&t.iframeEl.contentWindow){let e;if("true"===t.iframeEl.dataset.ready)return e=t.type===Pt?{event:"command",func:"playVideo"}:{method:"play",value:"true"},e&&t.iframeEl.contentWindow.postMessage(JSON.stringify(e),"*"),void(t.poller=void 0);t.type===Pt&&(e={event:"listening",id:t.iframeEl.getAttribute("id")},t.iframeEl.contentWindow.postMessage(JSON.stringify(e),"*"));}t.poller=setTimeout(i,250);};i();}processType(t){if(t.html)return t.type=xt,t.src=t.html,void(t.html="");const e=this.instance.optionFor(t,"src","");if(!e||"string"!=typeof e)return;let i=t.type,n=null;if(n=e.match(/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|shorts\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i)){const s=this.optionFor(t,Pt),{nocookie:o}=s,a=function(t,e){var i={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(i[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(n=Object.getOwnPropertySymbols(t);s<n.length;s++)e.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(t,n[s])&&(i[n[s]]=t[n[s]]);}return i}(s,["nocookie"]),r=`www.youtube${o?"-nocookie":""}.com`,l=Mt(e,a),c=encodeURIComponent(n[2]);t.videoId=c,t.src=`https://${r}/embed/${c}?${l}`,t.thumbSrc=t.thumbSrc||`https://i.ytimg.com/vi/${c}/mqdefault.jpg`,i=Pt;}else if(n=e.match(/^.+vimeo.com\/(?:\/)?([\d]+)((\/|\?h=)([a-z0-9]+))?(.*)?/)){const s=Mt(e,this.optionFor(t,Ct)),o=encodeURIComponent(n[1]),a=n[4]||"";t.videoId=o,t.src=`https://player.vimeo.com/video/${o}?${a?`h=${a}${s?"&":""}`:""}${s}`,i=Ct;}if(!i&&t.triggerEl){const e=t.triggerEl.dataset.type;At.includes(e)&&(i=e);}i||"string"==typeof e&&("#"===e.charAt(0)?i="inline":(n=e.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))?(i=Tt,t.videoFormat=t.videoFormat||"video/"+("ogv"===n[1]?"ogg":n[1])):e.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)?i=Et:e.match(/\.(pdf)((\?|#).*)?$/i)&&(i="pdf")),(n=e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i))?(t.src=`https://maps.google.${n[1]}/?ll=${(n[2]?n[2]+"&z="+Math.floor(parseFloat(n[3]))+(n[4]?n[4].replace(/^\//,"&"):""):n[4]+"").replace(/\?/,"&")}&output=${n[4]&&n[4].indexOf("layer=c")>0?"svembed":"embed"}`,i=St):(n=e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i))&&(t.src=`https://maps.google.${n[1]}/maps?q=${n[2].replace("query=","q=").replace("api=1","")}&output=embed`,i=St),i=i||this.instance.option("defaultType"),t.type=i,i===Et&&(t.thumbSrc=t.thumbSrc||t.src);}setContent(t){const e=this.instance.optionFor(t,"src")||"";if(t&&t.type&&e){switch(t.type){case xt:this.instance.setContent(t,e);break;case Tt:const i=this.option("videoTpl");i&&this.instance.setContent(t,i.replace(/\{\{src\}\}/gi,e+"").replace(/\{\{format\}\}/gi,this.optionFor(t,"videoFormat")||"").replace(/\{\{poster\}\}/gi,t.poster||t.thumbSrc||""));break;case "inline":case "clone":this.setInlineContent(t);break;case "ajax":this.loadAjaxContent(t);break;case "pdf":case St:case Pt:case Ct:t.preload=false;case "iframe":this.setIframeContent(t);}this.setAspectRatio(t);}}setAspectRatio(t){const e=t.contentEl;if(!(t.el&&e&&t.type&&[Pt,Ct,Tt].includes(t.type)))return;let i,n=t.width||"auto",s=t.height||"auto";if("auto"===n||"auto"===s){i=this.optionFor(t,"videoRatio");const e=(i+"").match(/(\d+)\s*\/\s?(\d+)/);i=e&&e.length>2?parseFloat(e[1])/parseFloat(e[2]):parseFloat(i+"");}else n&&s&&(i=n/s);if(!i)return;e.style.aspectRatio="",e.style.width="",e.style.height="",e.offsetHeight;const o=e.getBoundingClientRect(),a=o.width||1,r=o.height||1;e.style.aspectRatio=i+"",i<a/r?(s="auto"===s?r:Math.min(r,s),e.style.width="auto",e.style.height=`${s}px`):(n="auto"===n?a:Math.min(a,n),e.style.width=`${n}px`,e.style.height="auto");}attach(){const t=this,e=t.instance;e.on("Carousel.beforeInitSlide",t.onBeforeInitSlide),e.on("Carousel.createSlide",t.onCreateSlide),e.on("Carousel.selectSlide",t.onSelectSlide),e.on("Carousel.unselectSlide",t.onUnselectSlide),e.on("Carousel.Panzoom.refresh",t.onRefresh),e.on("done",t.onDone),e.on("clearContent",t.onClearContent),window.addEventListener("message",t.onMessage);}detach(){const t=this,e=t.instance;e.off("Carousel.beforeInitSlide",t.onBeforeInitSlide),e.off("Carousel.createSlide",t.onCreateSlide),e.off("Carousel.selectSlide",t.onSelectSlide),e.off("Carousel.unselectSlide",t.onUnselectSlide),e.off("Carousel.Panzoom.refresh",t.onRefresh),e.off("done",t.onDone),e.off("clearContent",t.onClearContent),window.removeEventListener("message",t.onMessage);}}Object.defineProperty(Lt,"defaults",{enumerable:true,configurable:true,writable:true,value:Ot});const zt="play",Rt="pause",kt="ready";class It extends _{constructor(){super(...arguments),Object.defineProperty(this,"state",{enumerable:true,configurable:true,writable:true,value:kt}),Object.defineProperty(this,"inHover",{enumerable:true,configurable:true,writable:true,value:false}),Object.defineProperty(this,"timer",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"progressBar",{enumerable:true,configurable:true,writable:true,value:null});}get isActive(){return this.state!==kt}onReady(t){this.option("autoStart")&&(t.isInfinite||t.page<t.pages.length-1)&&this.start();}onChange(){this.removeProgressBar(),this.pause();}onSettle(){this.resume();}onVisibilityChange(){"visible"===document.visibilityState?this.resume():this.pause();}onMouseEnter(){this.inHover=true,this.pause();}onMouseLeave(){var t;this.inHover=false,(null===(t=this.instance.panzoom)||void 0===t?void 0:t.isResting)&&this.resume();}onTimerEnd(){const t=this.instance;"play"===this.state&&(t.isInfinite||t.page!==t.pages.length-1?t.slideNext():t.slideTo(0));}removeProgressBar(){this.progressBar&&(this.progressBar.remove(),this.progressBar=null);}createProgressBar(){var t;if(!this.option("showProgress"))return null;this.removeProgressBar();const e=this.instance,i=(null===(t=e.pages[e.page])||void 0===t?void 0:t.slides)||[];let n=this.option("progressParentEl");if(n||(n=(1===i.length?i[0].el:null)||e.viewport),!n)return null;const s=document.createElement("div");return P(s,"f-progress"),n.prepend(s),this.progressBar=s,s.offsetHeight,s}set(){const t=this,e=t.instance;if(e.pages.length<2)return;if(t.timer)return;const i=t.option("timeout");t.state=zt,P(e.container,"has-autoplay");let n=t.createProgressBar();n&&(n.style.transitionDuration=`${i}ms`,n.style.transform="scaleX(1)"),t.timer=setTimeout((()=>{t.timer=null,t.inHover||t.onTimerEnd();}),i),t.emit("set");}clear(){const t=this;t.timer&&(clearTimeout(t.timer),t.timer=null),t.removeProgressBar();}start(){const t=this;if(t.set(),t.state!==kt){if(t.option("pauseOnHover")){const e=t.instance.container;e.addEventListener("mouseenter",t.onMouseEnter,false),e.addEventListener("mouseleave",t.onMouseLeave,false);}document.addEventListener("visibilitychange",t.onVisibilityChange,false),t.emit("start");}}stop(){const t=this,e=t.state,i=t.instance.container;t.clear(),t.state=kt,i.removeEventListener("mouseenter",t.onMouseEnter,false),i.removeEventListener("mouseleave",t.onMouseLeave,false),document.removeEventListener("visibilitychange",t.onVisibilityChange,false),S(i,"has-autoplay"),e!==kt&&t.emit("stop");}pause(){const t=this;t.state===zt&&(t.state=Rt,t.clear(),t.emit(Rt));}resume(){const t=this,e=t.instance;if(e.isInfinite||e.page!==e.pages.length-1)if(t.state!==zt){if(t.state===Rt&&!t.inHover){const e=new Event("resume",{bubbles:true,cancelable:true});t.emit("resume",e),e.defaultPrevented||t.set();}}else t.set();else t.stop();}toggle(){this.state===zt||this.state===Rt?this.stop():this.start();}attach(){const t=this,e=t.instance;e.on("ready",t.onReady),e.on("Panzoom.startAnimation",t.onChange),e.on("Panzoom.endAnimation",t.onSettle),e.on("Panzoom.touchMove",t.onChange);}detach(){const t=this,e=t.instance;e.off("ready",t.onReady),e.off("Panzoom.startAnimation",t.onChange),e.off("Panzoom.endAnimation",t.onSettle),e.off("Panzoom.touchMove",t.onChange),t.stop();}}Object.defineProperty(It,"defaults",{enumerable:true,configurable:true,writable:true,value:{autoStart:true,pauseOnHover:true,progressParentEl:null,showProgress:true,timeout:3e3}});class Dt extends _{constructor(){super(...arguments),Object.defineProperty(this,"ref",{enumerable:true,configurable:true,writable:true,value:null});}onPrepare(t){const e=t.carousel;if(!e)return;const i=t.container;i&&(e.options.Autoplay=u({autoStart:false},this.option("Autoplay")||{},{pauseOnHover:false,timeout:this.option("timeout"),progressParentEl:()=>this.option("progressParentEl")||null,on:{start:()=>{t.emit("startSlideshow");},set:e=>{var n;i.classList.add("has-slideshow"),(null===(n=t.getSlide())||void 0===n?void 0:n.state)!==lt.Ready&&e.pause();},stop:()=>{i.classList.remove("has-slideshow"),t.isCompact||t.endIdle(),t.emit("endSlideshow");},resume:(e,i)=>{var n,s,o;!i||!i.cancelable||(null===(n=t.getSlide())||void 0===n?void 0:n.state)===lt.Ready&&(null===(o=null===(s=t.carousel)||void 0===s?void 0:s.panzoom)||void 0===o?void 0:o.isResting)||i.preventDefault();}}}),e.attachPlugins({Autoplay:It}),this.ref=e.plugins.Autoplay);}onReady(t){const e=t.carousel,i=this.ref;i&&e&&this.option("playOnStart")&&(e.isInfinite||e.page<e.pages.length-1)&&i.start();}onDone(t,e){const i=this.ref,n=t.carousel;if(!i||!n)return;const s=e.panzoom;s&&s.on("startAnimation",(()=>{t.isCurrentSlide(e)&&i.stop();})),t.isCurrentSlide(e)&&i.resume();}onKeydown(t,e){var i;const n=this.ref;n&&e===this.option("key")&&"BUTTON"!==(null===(i=document.activeElement)||void 0===i?void 0:i.nodeName)&&n.toggle();}attach(){const t=this,e=t.instance;e.on("Carousel.init",t.onPrepare),e.on("Carousel.ready",t.onReady),e.on("done",t.onDone),e.on("keydown",t.onKeydown);}detach(){const t=this,e=t.instance;e.off("Carousel.init",t.onPrepare),e.off("Carousel.ready",t.onReady),e.off("done",t.onDone),e.off("keydown",t.onKeydown);}}Object.defineProperty(Dt,"defaults",{enumerable:true,configurable:true,writable:true,value:{key:" ",playOnStart:false,progressParentEl:t=>{var e;return (null===(e=t.instance.container)||void 0===e?void 0:e.querySelector(".fancybox__toolbar [data-fancybox-toggle-slideshow]"))||t.instance.container},timeout:3e3}});const Ft={classes:{container:"f-thumbs f-carousel__thumbs",viewport:"f-thumbs__viewport",track:"f-thumbs__track",slide:"f-thumbs__slide",isResting:"is-resting",isSelected:"is-selected",isLoading:"is-loading",hasThumbs:"has-thumbs"},minCount:2,parentEl:null,thumbTpl:'<button class="f-thumbs__slide__button" tabindex="0" type="button" aria-label="{{GOTO}}" data-carousel-index="%i"><img class="f-thumbs__slide__img" data-lazy-src="{{%s}}" alt="" /></button>',type:"modern"};var jt;!function(t){t[t.Init=0]="Init",t[t.Ready=1]="Ready",t[t.Hidden=2]="Hidden";}(jt||(jt={}));const Bt="isResting",Ht="thumbWidth",Nt="thumbHeight",_t="thumbClipWidth";let $t=class extends _{constructor(){super(...arguments),Object.defineProperty(this,"type",{enumerable:true,configurable:true,writable:true,value:"modern"}),Object.defineProperty(this,"container",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"track",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"carousel",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"thumbWidth",{enumerable:true,configurable:true,writable:true,value:0}),Object.defineProperty(this,"thumbClipWidth",{enumerable:true,configurable:true,writable:true,value:0}),Object.defineProperty(this,"thumbHeight",{enumerable:true,configurable:true,writable:true,value:0}),Object.defineProperty(this,"thumbGap",{enumerable:true,configurable:true,writable:true,value:0}),Object.defineProperty(this,"thumbExtraGap",{enumerable:true,configurable:true,writable:true,value:0}),Object.defineProperty(this,"state",{enumerable:true,configurable:true,writable:true,value:jt.Init});}get isModern(){return "modern"===this.type}onInitSlide(t,e){const i=e.el?e.el.dataset:void 0;i&&(e.thumbSrc=i.thumbSrc||e.thumbSrc||"",e[_t]=parseFloat(i[_t]||"")||e[_t]||0,e[Nt]=parseFloat(i.thumbHeight||"")||e[Nt]||0),this.addSlide(e);}onInitSlides(){this.build();}onChange(){var t;if(!this.isModern)return;const e=this.container,i=this.instance,n=i.panzoom,s=this.carousel,a=s?s.panzoom:null,r=i.page;if(n&&s&&a){if(n.isDragging){S(e,this.cn(Bt));let n=(null===(t=s.pages[r])||void 0===t?void 0:t.pos)||0;n+=i.getProgress(r)*(this[_t]+this.thumbGap);let o=a.getBounds();-1*n>o.x.min&&-1*n<o.x.max&&a.panTo({x:-1*n,friction:.12});}else o(e,this.cn(Bt),n.isResting);this.shiftModern();}}onRefresh(){this.updateProps();for(const t of this.instance.slides||[])this.resizeModernSlide(t);this.shiftModern();}isDisabled(){const t=this.option("minCount")||0;if(t){const e=this.instance;let i=0;for(const t of e.slides||[])t.thumbSrc&&i++;if(i<t)return  true}const e=this.option("type");return ["modern","classic"].indexOf(e)<0}getThumb(t){const e=this.option("thumbTpl")||"";return {html:this.instance.localize(e,[["%i",t.index],["%d",t.index+1],["%s",t.thumbSrc||"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"]])}}addSlide(t){const e=this.carousel;e&&e.addSlide(t.index,this.getThumb(t));}getSlides(){const t=[];for(const e of this.instance.slides||[])t.push(this.getThumb(e));return t}resizeModernSlide(t){this.isModern&&(t[Ht]=t[_t]&&t[Nt]?Math.round(this[Nt]*(t[_t]/t[Nt])):this[Ht]);}updateProps(){const t=this.container;if(!t)return;const e=e=>parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-"+e))||0;this.thumbGap=e("gap"),this.thumbExtraGap=e("extra-gap"),this[Ht]=e("width")||40,this[_t]=e("clip-width")||40,this[Nt]=e("height")||40;}build(){const t=this;if(t.state!==jt.Init)return;if(t.isDisabled())return void t.emit("disabled");const e=t.instance,i=e.container,n=t.getSlides(),s=t.option("type");t.type=s;const o=t.option("parentEl"),a=t.cn("container"),r=t.cn("track");let l=null==o?void 0:o.querySelector("."+a);l||(l=document.createElement("div"),P(l,a),o?o.appendChild(l):i.after(l)),P(l,`is-${s}`),P(i,t.cn("hasThumbs")),t.container=l,t.updateProps();let c=l.querySelector("."+r);c||(c=document.createElement("div"),P(c,t.cn("track")),l.appendChild(c)),t.track=c;const h=u({},{track:c,infinite:false,center:true,fill:"classic"===s,dragFree:true,slidesPerPage:1,transition:false,preload:.25,friction:.12,Panzoom:{maxVelocity:0},Dots:false,Navigation:false,classes:{container:"f-thumbs",viewport:"f-thumbs__viewport",track:"f-thumbs__track",slide:"f-thumbs__slide"}},t.option("Carousel")||{},{Sync:{target:e},slides:n}),d=new e.constructor(l,h);d.on("createSlide",((e,i)=>{t.setProps(i.index),t.emit("createSlide",i,i.el);})),d.on("ready",(()=>{t.shiftModern(),t.emit("ready");})),d.on("refresh",(()=>{t.shiftModern();})),d.on("Panzoom.click",((e,i,n)=>{t.onClick(n);})),t.carousel=d,t.state=jt.Ready;}onClick(t){t.preventDefault(),t.stopPropagation();const e=this.instance,{pages:i,page:n}=e,s=t=>{if(t){const e=t.closest("[data-carousel-index]");if(e)return [parseInt(e.dataset.carouselIndex||"",10)||0,e]}return [-1,void 0]},o=(t,e)=>{const i=document.elementFromPoint(t,e);return i?s(i):[-1,void 0]};let[a,r]=s(t.target);if(a>-1)return;const l=this[_t],c=t.clientX,h=t.clientY;let[d,u]=o(c-l,h),[p,f]=o(c+l,h);u&&f?(a=Math.abs(c-u.getBoundingClientRect().right)<Math.abs(c-f.getBoundingClientRect().left)?d:p,a===n&&(a=a===d?p:d)):u?a=d:f&&(a=p),a>-1&&i[a]&&e.slideTo(a);}getShift(t){var e;const i=this,{instance:n}=i,s=i.carousel;if(!n||!s)return 0;const o=i[Ht],a=i[_t],r=i.thumbGap,l=i.thumbExtraGap;if(!(null===(e=s.slides[t])||void 0===e?void 0:e.el))return 0;const c=.5*(o-a),h=n.pages.length-1;let d=n.getProgress(0),u=n.getProgress(h),p=n.getProgress(t,false,true),f=0,g=c+l+r;const m=d<0&&d>-1,v=u>0&&u<1;return 0===t?(f=g*Math.abs(d),v&&1===d&&(f-=g*Math.abs(u))):t===h?(f=g*Math.abs(u)*-1,m&&-1===u&&(f+=g*Math.abs(d))):m||v?(f=-1*g,f+=g*Math.abs(d),f+=g*(1-Math.abs(u))):f=g*p,f}setProps(e){var i;const n=this;if(!n.isModern)return;const{instance:s}=n,o=n.carousel;if(s&&o){const a=null===(i=o.slides[e])||void 0===i?void 0:i.el;if(a&&a.childNodes.length){let i=t(1-Math.abs(s.getProgress(e))),o=t(n.getShift(e));a.style.setProperty("--progress",i?i+"":""),a.style.setProperty("--shift",o+"");}}}shiftModern(){const t=this;if(!t.isModern)return;const{instance:e,track:i}=t,n=e.panzoom,s=t.carousel;if(!(e&&i&&n&&s))return;if(n.state===m.Init||n.state===m.Destroy)return;for(const i of e.slides)t.setProps(i.index);let o=(t[_t]+t.thumbGap)*(s.slides.length||0);i.style.setProperty("--width",o+"");}cleanup(){const t=this;t.carousel&&t.carousel.destroy(),t.carousel=null,t.container&&t.container.remove(),t.container=null,t.track&&t.track.remove(),t.track=null,t.state=jt.Init,S(t.instance.container,t.cn("hasThumbs"));}attach(){const t=this,e=t.instance;e.on("initSlide",t.onInitSlide),e.state===B.Init?e.on("initSlides",t.onInitSlides):t.onInitSlides(),e.on(["change","Panzoom.afterTransform"],t.onChange),e.on("Panzoom.refresh",t.onRefresh);}detach(){const t=this,e=t.instance;e.off("initSlide",t.onInitSlide),e.off("initSlides",t.onInitSlides),e.off(["change","Panzoom.afterTransform"],t.onChange),e.off("Panzoom.refresh",t.onRefresh),t.cleanup();}};Object.defineProperty($t,"defaults",{enumerable:true,configurable:true,writable:true,value:Ft});const Wt=Object.assign(Object.assign({},Ft),{key:"t",showOnStart:true,parentEl:null}),Xt="is-masked",qt="aria-hidden";class Yt extends _{constructor(){super(...arguments),Object.defineProperty(this,"ref",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"hidden",{enumerable:true,configurable:true,writable:true,value:false});}get isEnabled(){const t=this.ref;return t&&!t.isDisabled()}get isHidden(){return this.hidden}onClick(t,e){e.stopPropagation();}onCreateSlide(t,e){var i,n,s;const o=(null===(s=null===(n=null===(i=this.instance)||void 0===i?void 0:i.carousel)||void 0===n?void 0:n.slides[e.index])||void 0===s?void 0:s.type)||"",a=e.el;if(a&&o){let t=`for-${o}`;["video","youtube","vimeo","html5video"].includes(o)&&(t+=" for-video"),P(a,t);}}onInit(){var t;const e=this,i=e.instance,n=i.carousel;if(e.ref||!n)return;const s=e.option("parentEl")||i.footer||i.container;if(!s)return;const o=u({},e.options,{parentEl:s,classes:{container:"f-thumbs fancybox__thumbs"},Carousel:{Sync:{friction:i.option("Carousel.friction")||0}},on:{ready:t=>{const i=t.container;i&&this.hidden&&(e.refresh(),i.style.transition="none",e.hide(),i.offsetHeight,queueMicrotask((()=>{i.style.transition="",e.show();})));}}});o.Carousel=o.Carousel||{},o.Carousel.on=u((null===(t=e.options.Carousel)||void 0===t?void 0:t.on)||{},{click:this.onClick,createSlide:this.onCreateSlide}),n.options.Thumbs=o,n.attachPlugins({Thumbs:$t}),e.ref=n.plugins.Thumbs,e.option("showOnStart")||(e.ref.state=jt.Hidden,e.hidden=true);}onResize(){var t;const e=null===(t=this.ref)||void 0===t?void 0:t.container;e&&(e.style.maxHeight="");}onKeydown(t,e){const i=this.option("key");i&&i===e&&this.toggle();}toggle(){const t=this.ref;if(t&&!t.isDisabled())return t.state===jt.Hidden?(t.state=jt.Init,void t.build()):void(this.hidden?this.show():this.hide())}show(){const t=this.ref;if(!t||t.isDisabled())return;const e=t.container;e&&(this.refresh(),e.offsetHeight,e.removeAttribute(qt),e.classList.remove(Xt),this.hidden=false);}hide(){const t=this.ref,e=t&&t.container;e&&(this.refresh(),e.offsetHeight,e.classList.add(Xt),e.setAttribute(qt,"true")),this.hidden=true;}refresh(){const t=this.ref;if(!t||!t.state)return;const e=t.container,i=(null==e?void 0:e.firstChild)||null;e&&i&&i.childNodes.length&&(e.style.maxHeight=`${i.getBoundingClientRect().height}px`);}attach(){const t=this,e=t.instance;e.state===rt.Init?e.on("Carousel.init",t.onInit):t.onInit(),e.on("resize",t.onResize),e.on("keydown",t.onKeydown);}detach(){var t;const e=this,i=e.instance;i.off("Carousel.init",e.onInit),i.off("resize",e.onResize),i.off("keydown",e.onKeydown),null===(t=i.carousel)||void 0===t||t.detachPlugins(["Thumbs"]),e.ref=null;}}Object.defineProperty(Yt,"defaults",{enumerable:true,configurable:true,writable:true,value:Wt});const Vt={panLeft:{icon:'<svg><path d="M5 12h14M5 12l6 6M5 12l6-6"/></svg>',change:{panX:-100}},panRight:{icon:'<svg><path d="M5 12h14M13 18l6-6M13 6l6 6"/></svg>',change:{panX:100}},panUp:{icon:'<svg><path d="M12 5v14M18 11l-6-6M6 11l6-6"/></svg>',change:{panY:-100}},panDown:{icon:'<svg><path d="M12 5v14M18 13l-6 6M6 13l6 6"/></svg>',change:{panY:100}},zoomIn:{icon:'<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>',action:"zoomIn"},zoomOut:{icon:'<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',action:"zoomOut"},toggle1to1:{icon:'<svg><path d="M3.51 3.07c5.74.02 11.48-.02 17.22.02 1.37.1 2.34 1.64 2.18 3.13 0 4.08.02 8.16 0 12.23-.1 1.54-1.47 2.64-2.79 2.46-5.61-.01-11.24.02-16.86-.01-1.36-.12-2.33-1.65-2.17-3.14 0-4.07-.02-8.16 0-12.23.1-1.36 1.22-2.48 2.42-2.46Z"/><path d="M5.65 8.54h1.49v6.92m8.94-6.92h1.49v6.92M11.5 9.4v.02m0 5.18v0"/></svg>',action:"toggleZoom"},toggleZoom:{icon:'<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',action:"toggleZoom"},iterateZoom:{icon:'<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',action:"iterateZoom"},rotateCCW:{icon:'<svg><path d="M15 4.55a8 8 0 0 0-6 14.9M9 15v5H4M18.37 7.16v.01M13 19.94v.01M16.84 18.37v.01M19.37 15.1v.01M19.94 11v.01"/></svg>',action:"rotateCCW"},rotateCW:{icon:'<svg><path d="M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01"/></svg>',action:"rotateCW"},flipX:{icon:'<svg style="stroke-width: 1.3"><path d="M12 3v18M16 7v10h5L16 7M8 7v10H3L8 7"/></svg>',action:"flipX"},flipY:{icon:'<svg style="stroke-width: 1.3"><path d="M3 12h18M7 16h10L7 21v-5M7 8h10L7 3v5"/></svg>',action:"flipY"},fitX:{icon:'<svg><path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M10 18H3M21 18h-7M6 15l-3 3 3 3M18 15l3 3-3 3"/></svg>',action:"fitX"},fitY:{icon:'<svg><path d="M12 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6M18 14v7M18 3v7M15 18l3 3 3-3M15 6l3-3 3 3"/></svg>',action:"fitY"},reset:{icon:'<svg><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>',action:"reset"},toggleFS:{icon:'<svg><g><path d="M14.5 9.5 21 3m0 0h-6m6 0v6M3 21l6.5-6.5M3 21v-6m0 6h6"/></g><g><path d="m14 10 7-7m-7 7h6m-6 0V4M3 21l7-7m0 0v6m0-6H4"/></g></svg>',action:"toggleFS"}};var Zt;!function(t){t[t.Init=0]="Init",t[t.Ready=1]="Ready",t[t.Disabled=2]="Disabled";}(Zt||(Zt={}));const Ut={absolute:"auto",display:{left:["infobar"],middle:[],right:["iterateZoom","slideshow","fullscreen","thumbs","close"]},enabled:"auto",items:{infobar:{tpl:'<div class="fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span>/<span data-fancybox-count></span></div>'},download:{tpl:'<a class="f-button" title="{{DOWNLOAD}}" data-fancybox-download href="javasript:;"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></a>'},prev:{tpl:'<button class="f-button" title="{{PREV}}" data-fancybox-prev><svg><path d="m15 6-6 6 6 6"/></svg></button>'},next:{tpl:'<button class="f-button" title="{{NEXT}}" data-fancybox-next><svg><path d="m9 6 6 6-6 6"/></svg></button>'},slideshow:{tpl:'<button class="f-button" title="{{TOGGLE_SLIDESHOW}}" data-fancybox-toggle-slideshow><svg><g><path d="M8 4v16l13 -8z"></path></g><g><path d="M8 4v15M17 4v15"/></g></svg></button>'},fullscreen:{tpl:'<button class="f-button" title="{{TOGGLE_FULLSCREEN}}" data-fancybox-toggle-fullscreen><svg><g><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2"/></g><g><path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5"/></g></svg></button>'},thumbs:{tpl:'<button class="f-button" title="{{TOGGLE_THUMBS}}" data-fancybox-toggle-thumbs><svg><circle cx="5.5" cy="5.5" r="1"/><circle cx="12" cy="5.5" r="1"/><circle cx="18.5" cy="5.5" r="1"/><circle cx="5.5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18.5" cy="12" r="1"/><circle cx="5.5" cy="18.5" r="1"/><circle cx="12" cy="18.5" r="1"/><circle cx="18.5" cy="18.5" r="1"/></svg></button>'},close:{tpl:'<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg><path d="m19.5 4.5-15 15M4.5 4.5l15 15"/></svg></button>'}},parentEl:null},Gt={tabindex:"-1",width:"24",height:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Kt="has-toolbar",Jt="fancybox__toolbar";class Qt extends _{constructor(){super(...arguments),Object.defineProperty(this,"state",{enumerable:true,configurable:true,writable:true,value:Zt.Init}),Object.defineProperty(this,"container",{enumerable:true,configurable:true,writable:true,value:null});}onReady(t){var e;if(!t.carousel)return;let i=this.option("display"),n=this.option("absolute"),s=this.option("enabled");if("auto"===s){const t=this.instance.carousel;let e=0;if(t)for(const i of t.slides)(i.panzoom||"image"===i.type)&&e++;e||(s=false);}s||(i=void 0);let o=0;const a={left:[],middle:[],right:[]};if(i)for(const t of ["left","middle","right"])for(const n of i[t]){const i=this.createEl(n);i&&(null===(e=a[t])||void 0===e||e.push(i),o++);}let r=null;if(o&&(r=this.createContainer()),r){for(const[t,e]of Object.entries(a)){const i=document.createElement("div");P(i,Jt+"__column is-"+t);for(const t of e)i.appendChild(t);"auto"!==n||"middle"!==t||e.length||(n=true),r.appendChild(i);} true===n&&P(r,"is-absolute"),this.state=Zt.Ready,this.onRefresh();}else this.state=Zt.Disabled;}onClick(t){var e,i;const n=this.instance,s=n.getSlide(),o=null==s?void 0:s.panzoom,a=t.target,r=a&&E(a)?a.dataset:null;if(!r)return;if(void 0!==r.fancyboxToggleThumbs)return t.preventDefault(),t.stopPropagation(),void(null===(e=n.plugins.Thumbs)||void 0===e||e.toggle());if(void 0!==r.fancyboxToggleFullscreen)return t.preventDefault(),t.stopPropagation(),void this.instance.toggleFullscreen();if(void 0!==r.fancyboxToggleSlideshow){t.preventDefault(),t.stopPropagation();const e=null===(i=n.carousel)||void 0===i?void 0:i.plugins.Autoplay;let s=e.isActive;return o&&"mousemove"===o.panMode&&!s&&o.reset(),void(s?e.stop():e.start())}const l=r.panzoomAction,c=r.panzoomChange;if((c||l)&&(t.preventDefault(),t.stopPropagation()),c){let t={};try{t=JSON.parse(c);}catch(t){}o&&o.applyChange(t);}else l&&o&&o[l]&&o[l]();}onChange(){this.onRefresh();}onRefresh(){if(this.instance.isClosing())return;const t=this.container;if(!t)return;const e=this.instance.getSlide();if(!e||e.state!==lt.Ready)return;const i=e&&!e.error&&e.panzoom;for(const e of t.querySelectorAll("[data-panzoom-action]"))i?(e.removeAttribute("disabled"),e.removeAttribute("tabindex")):(e.setAttribute("disabled",""),e.setAttribute("tabindex","-1"));let n=i&&i.canZoomIn(),s=i&&i.canZoomOut();for(const e of t.querySelectorAll('[data-panzoom-action="zoomIn"]'))n?(e.removeAttribute("disabled"),e.removeAttribute("tabindex")):(e.setAttribute("disabled",""),e.setAttribute("tabindex","-1"));for(const e of t.querySelectorAll('[data-panzoom-action="zoomOut"]'))s?(e.removeAttribute("disabled"),e.removeAttribute("tabindex")):(e.setAttribute("disabled",""),e.setAttribute("tabindex","-1"));for(const e of t.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')){s||n?(e.removeAttribute("disabled"),e.removeAttribute("tabindex")):(e.setAttribute("disabled",""),e.setAttribute("tabindex","-1"));const t=e.querySelector("g");t&&(t.style.display=n?"":"none");}}onDone(t,e){var i;null===(i=e.panzoom)||void 0===i||i.on("afterTransform",(()=>{this.instance.isCurrentSlide(e)&&this.onRefresh();})),this.instance.isCurrentSlide(e)&&this.onRefresh();}createContainer(){const t=this.instance.container;if(!t)return null;const e=this.option("parentEl")||t;let i=e.querySelector("."+Jt);return i||(i=document.createElement("div"),P(i,Jt),e.prepend(i)),i.addEventListener("click",this.onClick,{passive:false,capture:true}),t&&P(t,Kt),this.container=i,i}createEl(t){const e=this.instance,i=e.carousel;if(!i)return null;if("toggleFS"===t)return null;if("fullscreen"===t&&!ot())return null;let s=null;const o=i.slides.length||0;let a=0,r=0;for(const t of i.slides)(t.panzoom||"image"===t.type)&&a++,("image"===t.type||t.downloadSrc)&&r++;if(o<2&&["infobar","prev","next"].includes(t))return s;if(void 0!==Vt[t]&&!a)return null;if("download"===t&&!r)return null;if("thumbs"===t){const t=e.plugins.Thumbs;if(!t||!t.isEnabled)return null}if("slideshow"===t){if(!i.plugins.Autoplay||o<2)return null}if(void 0!==Vt[t]){const e=Vt[t];s=document.createElement("button"),s.setAttribute("title",this.instance.localize(`{{${t.toUpperCase()}}}`)),P(s,"f-button"),e.action&&(s.dataset.panzoomAction=e.action),e.change&&(s.dataset.panzoomChange=JSON.stringify(e.change)),s.appendChild(n(this.instance.localize(e.icon)));}else {const e=(this.option("items")||[])[t];e&&(s=n(this.instance.localize(e.tpl)),"function"==typeof e.click&&s.addEventListener("click",(t=>{t.preventDefault(),t.stopPropagation(),"function"==typeof e.click&&e.click.call(this,this,t);})));}const l=null==s?void 0:s.querySelector("svg");if(l)for(const[t,e]of Object.entries(Gt))l.getAttribute(t)||l.setAttribute(t,String(e));return s}removeContainer(){const t=this.container;t&&t.remove(),this.container=null,this.state=Zt.Disabled;const e=this.instance.container;e&&S(e,Kt);}attach(){const t=this,e=t.instance;e.on("Carousel.initSlides",t.onReady),e.on("done",t.onDone),e.on(["reveal","Carousel.change"],t.onChange),t.onReady(t.instance);}detach(){const t=this,e=t.instance;e.off("Carousel.initSlides",t.onReady),e.off("done",t.onDone),e.off(["reveal","Carousel.change"],t.onChange),t.removeContainer();}}Object.defineProperty(Qt,"defaults",{enumerable:true,configurable:true,writable:true,value:Ut});const te={Hash:class extends _{onReady(){ht=false;}onChange(t){ut&&clearTimeout(ut);const{hash:e}=pt(),{hash:i}=ft(),n=t.isOpeningSlide(t.getSlide());n&&(ct=i===e?"":i),e&&e!==i&&(ut=setTimeout((()=>{try{if(t.state===rt.Ready){let t="replaceState";n&&!dt&&(t="pushState",dt=!0),window.history[t]({},document.title,window.location.pathname+window.location.search+e);}}catch(t){}}),300));}onClose(t){if(ut&&clearTimeout(ut),!ht&&dt)return dt=false,ht=false,void window.history.back();if(!ht)try{window.history.replaceState({},document.title,window.location.pathname+window.location.search+(ct||""));}catch(t){}}attach(){const t=this.instance;t.on("ready",this.onReady),t.on(["Carousel.ready","Carousel.change"],this.onChange),t.on("close",this.onClose);}detach(){const t=this.instance;t.off("ready",this.onReady),t.off(["Carousel.ready","Carousel.change"],this.onChange),t.off("close",this.onClose);}static parseURL(){return ft()}static startFromUrl(){gt();}static destroy(){window.removeEventListener("hashchange",vt,false);}},Html:Lt,Images:wt,Slideshow:Dt,Thumbs:Yt,Toolbar:Qt},ee="with-fancybox",ie="hide-scrollbar",ne="--fancybox-scrollbar-compensate",se="--fancybox-body-margin",oe="aria-hidden",ae="is-using-tab",re="is-animated",le="is-compact",ce="is-loading",he="is-opening",de="has-caption",ue="disabled",pe="tabindex",fe="download",ge="href",me="src",ve=t=>"string"==typeof t,be=function(){var t=window.getSelection();return !!t&&"Range"===t.type};let ye,we=null,xe=null,Ee=0,Se=0,Pe=0,Ce=0;const Te=new Map;let Me=0;class Oe extends g{get isIdle(){return this.idle}get isCompact(){return this.option("compact")}constructor(t=[],e={},i={}){super(e),Object.defineProperty(this,"userSlides",{enumerable:true,configurable:true,writable:true,value:[]}),Object.defineProperty(this,"userPlugins",{enumerable:true,configurable:true,writable:true,value:{}}),Object.defineProperty(this,"idle",{enumerable:true,configurable:true,writable:true,value:false}),Object.defineProperty(this,"idleTimer",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"clickTimer",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"pwt",{enumerable:true,configurable:true,writable:true,value:0}),Object.defineProperty(this,"ignoreFocusChange",{enumerable:true,configurable:true,writable:true,value:false}),Object.defineProperty(this,"startedFs",{enumerable:true,configurable:true,writable:true,value:false}),Object.defineProperty(this,"state",{enumerable:true,configurable:true,writable:true,value:rt.Init}),Object.defineProperty(this,"id",{enumerable:true,configurable:true,writable:true,value:0}),Object.defineProperty(this,"container",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"caption",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"footer",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"carousel",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"lastFocus",{enumerable:true,configurable:true,writable:true,value:null}),Object.defineProperty(this,"prevMouseMoveEvent",{enumerable:true,configurable:true,writable:true,value:void 0}),ye||(ye=ot()),this.id=e.id||++Me,Te.set(this.id,this),this.userSlides=t,this.userPlugins=i,queueMicrotask((()=>{this.init();}));}init(){if(this.state===rt.Destroy)return;this.state=rt.Init,this.attachPlugins(Object.assign(Object.assign({},Oe.Plugins),this.userPlugins)),this.emit("init"),this.emit("attachPlugins"),true===this.option("hideScrollbar")&&(()=>{if(!et)return;const t=document,e=t.body,i=t.documentElement;if(e.classList.contains(ie))return;let n=window.innerWidth-i.getBoundingClientRect().width;const s=parseFloat(window.getComputedStyle(e).marginRight);n<0&&(n=0),i.style.setProperty(ne,`${n}px`),s&&e.style.setProperty(se,`${s}px`),e.classList.add(ie);})(),this.initLayout(),this.scale();const t=()=>{this.initCarousel(this.userSlides),this.state=rt.Ready,this.attachEvents(),this.emit("ready"),setTimeout((()=>{this.container&&this.container.setAttribute(oe,"false");}),16);};this.option("Fullscreen.autoStart")&&ye&&!ye.isFullscreen()?ye.request().then((()=>{this.startedFs=true,t();})).catch((()=>t())):t();}initLayout(){var t,e;const i=this.option("parentEl")||document.body,s=n(this.localize(this.option("tpl.main")||""));if(s){if(s.setAttribute("id",`fancybox-${this.id}`),s.setAttribute("aria-label",this.localize("{{MODAL}}")),s.classList.toggle(le,this.isCompact),P(s,this.option("mainClass")||""),P(s,he),this.container=s,this.footer=s.querySelector(".fancybox__footer"),i.appendChild(s),P(document.documentElement,ee),we&&xe||(we=document.createElement("span"),P(we,"fancybox-focus-guard"),we.setAttribute(pe,"0"),we.setAttribute(oe,"true"),we.setAttribute("aria-label","Focus guard"),xe=we.cloneNode(),null===(t=s.parentElement)||void 0===t||t.insertBefore(we,s),null===(e=s.parentElement)||void 0===e||e.append(xe)),s.addEventListener("mousedown",(t=>{Ee=t.pageX,Se=t.pageY,S(s,ae);})),this.option("closeExisting"))for(const t of Te.values())t.id!==this.id&&t.close();else this.option("animated")&&(P(s,re),setTimeout((()=>{this.isClosing()||S(s,re);}),350));this.emit("initLayout");}}initCarousel(t){const i=this.container;if(!i)return;const n=i.querySelector(".fancybox__carousel");if(!n)return;const s=this.carousel=new Q(n,u({},{slides:t,transition:"fade",Panzoom:{lockAxis:this.option("dragToClose")?"xy":"x",infinite:!!this.option("dragToClose")&&"y"},Dots:false,Navigation:{classes:{container:"fancybox__nav",button:"f-button",isNext:"is-next",isPrev:"is-prev"}},initialPage:this.option("startIndex"),l10n:this.option("l10n")},this.option("Carousel")||{}));s.on("*",((t,e,...i)=>{this.emit(`Carousel.${e}`,t,...i);})),s.on(["ready","change"],(()=>{this.manageCaption();})),this.on("Carousel.removeSlide",((t,e,i)=>{this.clearContent(i),i.state=void 0;})),s.on("Panzoom.touchStart",(()=>{var t,e;this.isCompact||this.endIdle(),(null===(t=document.activeElement)||void 0===t?void 0:t.closest(".f-thumbs"))&&(null===(e=this.container)||void 0===e||e.focus());})),s.on("settle",(()=>{this.idleTimer||this.isCompact||!this.option("idle")||this.setIdle(),this.option("autoFocus")&&!this.isClosing&&this.checkFocus();})),this.option("dragToClose")&&(s.on("Panzoom.afterTransform",((t,i)=>{const n=this.getSlide();if(n&&e(n.el))return;const s=this.container;if(s){const t=Math.abs(i.current.f),e=t<1?"":Math.max(.5,Math.min(1,1-t/i.contentRect.fitHeight*1.5));s.style.setProperty("--fancybox-ts",e?"0s":""),s.style.setProperty("--fancybox-opacity",e+"");}})),s.on("Panzoom.touchEnd",((t,i,n)=>{var s;const o=this.getSlide();if(o&&e(o.el))return;if(i.isMobile&&document.activeElement&&-1!==["TEXTAREA","INPUT"].indexOf(null===(s=document.activeElement)||void 0===s?void 0:s.nodeName))return;const a=Math.abs(i.dragOffset.y);"y"===i.lockedAxis&&(a>=200||a>=50&&i.dragOffset.time<300)&&(n&&n.cancelable&&n.preventDefault(),this.close(n,"f-throwOut"+(i.current.f<0?"Up":"Down")));}))),s.on("change",(t=>{var e;let i=null===(e=this.getSlide())||void 0===e?void 0:e.triggerEl;if(i){const e=new CustomEvent("slideTo",{bubbles:true,cancelable:true,detail:t.page});i.dispatchEvent(e);}})),s.on(["refresh","change"],(t=>{const e=this.container;if(!e)return;for(const i of e.querySelectorAll("[data-fancybox-current-index]"))i.innerHTML=t.page+1;for(const i of e.querySelectorAll("[data-fancybox-count]"))i.innerHTML=t.pages.length;if(!t.isInfinite){for(const i of e.querySelectorAll("[data-fancybox-next]"))t.page<t.pages.length-1?(i.removeAttribute(ue),i.removeAttribute(pe)):(i.setAttribute(ue,""),i.setAttribute(pe,"-1"));for(const i of e.querySelectorAll("[data-fancybox-prev]"))t.page>0?(i.removeAttribute(ue),i.removeAttribute(pe)):(i.setAttribute(ue,""),i.setAttribute(pe,"-1"));}const i=this.getSlide();if(!i)return;let n=i.downloadSrc||"";n||"image"!==i.type||i.error||!ve(i[me])||(n=i[me]);for(const t of e.querySelectorAll("[data-fancybox-download]")){const e=i.downloadFilename;n?(t.removeAttribute(ue),t.removeAttribute(pe),t.setAttribute(ge,n),t.setAttribute(fe,e||n),t.setAttribute("target","_blank")):(t.setAttribute(ue,""),t.setAttribute(pe,"-1"),t.removeAttribute(ge),t.removeAttribute(fe));}})),this.emit("initCarousel");}attachEvents(){const t=this,e=t.container;if(!e)return;e.addEventListener("click",t.onClick,{passive:false,capture:false}),e.addEventListener("wheel",t.onWheel,{passive:false,capture:false}),document.addEventListener("keydown",t.onKeydown,{passive:false,capture:true}),document.addEventListener("visibilitychange",t.onVisibilityChange,false),document.addEventListener("mousemove",t.onMousemove),t.option("trapFocus")&&document.addEventListener("focus",t.onFocus,true),window.addEventListener("resize",t.onResize);const i=window.visualViewport;i&&(i.addEventListener("scroll",t.onResize),i.addEventListener("resize",t.onResize));}detachEvents(){const t=this,e=t.container;if(!e)return;document.removeEventListener("keydown",t.onKeydown,{passive:false,capture:true}),e.removeEventListener("wheel",t.onWheel,{passive:false,capture:false}),e.removeEventListener("click",t.onClick,{passive:false,capture:false}),document.removeEventListener("mousemove",t.onMousemove),window.removeEventListener("resize",t.onResize);const i=window.visualViewport;i&&(i.removeEventListener("resize",t.onResize),i.removeEventListener("scroll",t.onResize)),document.removeEventListener("visibilitychange",t.onVisibilityChange,false),document.removeEventListener("focus",t.onFocus,true);}scale(){const t=this.container;if(!t)return;const e=window.visualViewport,i=Math.max(1,(null==e?void 0:e.scale)||1);let n="",s="",o="";if(e&&i>1){let t=`${e.offsetLeft}px`,a=`${e.offsetTop}px`;n=e.width*i+"px",s=e.height*i+"px",o=`translate3d(${t}, ${a}, 0) scale(${1/i})`;}t.style.transform=o,t.style.width=n,t.style.height=s;}onClick(t){var e;const{container:i,isCompact:n}=this;if(!i||this.isClosing())return;!n&&this.option("idle")&&this.resetIdle();const s=t.composedPath()[0];if(s.closest(".fancybox-spinner")||s.closest("[data-fancybox-close]"))return t.preventDefault(),void this.close(t);if(s.closest("[data-fancybox-prev]"))return t.preventDefault(),void this.prev();if(s.closest("[data-fancybox-next]"))return t.preventDefault(),void this.next();if("click"===t.type&&0===t.detail)return;if(Math.abs(t.pageX-Ee)>30||Math.abs(t.pageY-Se)>30)return;const o=document.activeElement;if(be()&&o&&i.contains(o))return;if(n&&"image"===(null===(e=this.getSlide())||void 0===e?void 0:e.type))return void(this.clickTimer?(clearTimeout(this.clickTimer),this.clickTimer=null):this.clickTimer=setTimeout((()=>{this.toggleIdle(),this.clickTimer=null;}),350));if(this.emit("click",t),t.defaultPrevented)return;let a=false;if(s.closest(".fancybox__content")){if(o){if(o.closest("[contenteditable]"))return;s.matches(nt)||o.blur();}if(be())return;a=this.option("contentClick");}else s.closest(".fancybox__carousel")&&!s.matches(nt)&&(a=this.option("backdropClick"));"close"===a?(t.preventDefault(),this.close(t)):"next"===a?(t.preventDefault(),this.next()):"prev"===a&&(t.preventDefault(),this.prev());}onWheel(t){const e=t.target;let n=this.option("wheel",t);e.closest(".fancybox__thumbs")&&(n="slide");const s="slide"===n,o=[-t.deltaX||0,-t.deltaY||0,-t.detail||0].reduce((function(t,e){return Math.abs(e)>Math.abs(t)?e:t})),a=Math.max(-1,Math.min(1,o)),r=Date.now();this.pwt&&r-this.pwt<300?s&&t.preventDefault():(this.pwt=r,this.emit("wheel",t,a),t.defaultPrevented||("close"===n?(t.preventDefault(),this.close(t)):"slide"===n&&(i(e)||(t.preventDefault(),this[a>0?"prev":"next"]()))));}onScroll(){window.scrollTo(Pe,Ce);}onKeydown(t){if(!this.isTopmost())return;this.isCompact||!this.option("idle")||this.isClosing()||this.resetIdle();const e=t.key,i=this.option("keyboard");if(!i)return;const n=t.composedPath()[0],s=document.activeElement&&document.activeElement.classList,o=s&&s.contains("f-button")||n.dataset.carouselPage||n.dataset.carouselIndex;if("Escape"!==e&&!o&&E(n)){if(n.isContentEditable||-1!==["TEXTAREA","OPTION","INPUT","SELECT","VIDEO"].indexOf(n.nodeName))return}if("Tab"===t.key?P(this.container,ae):S(this.container,ae),t.ctrlKey||t.altKey||t.shiftKey)return;this.emit("keydown",e,t);const a=i[e];a&&"function"==typeof this[a]&&(t.preventDefault(),this[a]());}onResize(){const t=this.container;if(!t)return;const e=this.isCompact;t.classList.toggle(le,e),this.manageCaption(this.getSlide()),this.isCompact?this.clearIdle():this.endIdle(),this.scale(),this.emit("resize");}onFocus(t){this.isTopmost()&&this.checkFocus(t);}onMousemove(t){this.prevMouseMoveEvent=t,!this.isCompact&&this.option("idle")&&this.resetIdle();}onVisibilityChange(){"visible"===document.visibilityState?this.checkFocus():this.endIdle();}manageCloseBtn(t){const e=this.optionFor(t,"closeButton")||false;if("auto"===e){const t=this.plugins.Toolbar;if(t&&t.state===Zt.Ready)return}if(!e)return;if(!t.contentEl||t.closeBtnEl)return;const i=this.option("tpl.closeButton");if(i){const e=n(this.localize(i));t.closeBtnEl=t.contentEl.appendChild(e),t.el&&P(t.el,"has-close-btn");}}manageCaption(t=void 0){var e,i;const n="fancybox__caption",s=this.container;if(!s)return;S(s,de);const o=this.isCompact||this.option("commonCaption"),a=!o;if(this.caption&&this.stop(this.caption),a&&this.caption&&(this.caption.remove(),this.caption=null),o&&!this.caption)for(const t of (null===(e=this.carousel)||void 0===e?void 0:e.slides)||[])t.captionEl&&(t.captionEl.remove(),t.captionEl=void 0,S(t.el,de),null===(i=t.el)||void 0===i||i.removeAttribute("aria-labelledby"));if(t||(t=this.getSlide()),!t||o&&!this.isCurrentSlide(t))return;const r=t.el;let l=this.optionFor(t,"caption","");if(!l)return void(o&&this.caption&&this.animate(this.caption,"f-fadeOut",(()=>{this.caption&&(this.caption.innerHTML="");})));let c=null;if(a){if(c=t.captionEl||null,r&&!c){const e=n+`_${this.id}_${t.index}`;c=document.createElement("div"),P(c,n),c.setAttribute("id",e),t.captionEl=r.appendChild(c),P(r,de),r.setAttribute("aria-labelledby",e);}}else {if(c=this.caption,c||(c=s.querySelector("."+n)),!c){c=document.createElement("div"),c.dataset.fancyboxCaption="",P(c,n);(this.footer||s).prepend(c);}P(s,de),this.caption=c;}c&&(c.innerHTML="",ve(l)||"number"==typeof l?c.innerHTML=l+"":l instanceof HTMLElement&&c.appendChild(l));}checkFocus(t){this.focus(t);}focus(t){var e;if(this.ignoreFocusChange)return;const i=document.activeElement||null,n=(null==t?void 0:t.target)||null,s=this.container,o=null===(e=this.carousel)||void 0===e?void 0:e.viewport;if(!s||!o)return;if(!t&&i&&s.contains(i))return;const a=this.getSlide(),r=a&&a.state===lt.Ready?a.el:null;if(!r||r.contains(i)||s===i)return;t&&t.cancelable&&t.preventDefault(),this.ignoreFocusChange=true;const l=Array.from(s.querySelectorAll(nt));let c=[],h=null;for(let t of l){const e=!t.offsetParent||!!t.closest('[aria-hidden="true"]'),i=r&&r.contains(t),n=!o.contains(t);if(t===s||(i||n)&&!e){c.push(t);const e=t.dataset.origTabindex;void 0!==e&&e&&(t.tabIndex=parseFloat(e)),t.removeAttribute("data-orig-tabindex"),!t.hasAttribute("autoFocus")&&h||(h=t);}else {const e=void 0===t.dataset.origTabindex?t.getAttribute("tabindex")||"":t.dataset.origTabindex;e&&(t.dataset.origTabindex=e),t.tabIndex=-1;}}let d=null;t?(!n||c.indexOf(n)<0)&&(d=h||s,c.length&&(i===xe?d=c[0]:this.lastFocus!==s&&i!==we||(d=c[c.length-1]))):d=a&&"image"===a.type?s:h||s,d&&st(d),this.lastFocus=document.activeElement,this.ignoreFocusChange=false;}next(){const t=this.carousel;t&&t.pages.length>1&&t.slideNext();}prev(){const t=this.carousel;t&&t.pages.length>1&&t.slidePrev();}jumpTo(...t){this.carousel&&this.carousel.slideTo(...t);}isTopmost(){var t;return (null===(t=Oe.getInstance())||void 0===t?void 0:t.id)==this.id}animate(t=null,e="",i){if(!t||!e)return void(i&&i());this.stop(t);const n=s=>{s.target===t&&t.dataset.animationName&&(t.removeEventListener("animationend",n),delete t.dataset.animationName,i&&i(),S(t,e));};t.dataset.animationName=e,t.addEventListener("animationend",n),P(t,e);}stop(t){t&&t.dispatchEvent(new CustomEvent("animationend",{bubbles:false,cancelable:true,currentTarget:t}));}setContent(t,e="",i=true){if(this.isClosing())return;const s=t.el;if(!s)return;let o=null;if(E(e)?o=e:(o=n(e+""),E(o)||(o=document.createElement("div"),o.innerHTML=e+"")),["img","picture","iframe","video","audio"].includes(o.nodeName.toLowerCase())){const t=document.createElement("div");t.appendChild(o),o=t;}E(o)&&t.filter&&!t.error&&(o=o.querySelector(t.filter)),o&&E(o)?(P(o,"fancybox__content"),t.id&&o.setAttribute("id",t.id),s.classList.add(`has-${t.error?"error":t.type||"unknown"}`),s.prepend(o),"none"===o.style.display&&(o.style.display=""),"none"===getComputedStyle(o).getPropertyValue("display")&&(o.style.display=t.display||this.option("defaultDisplay")||"flex"),t.contentEl=o,i&&this.revealContent(t),this.manageCloseBtn(t),this.manageCaption(t)):this.setError(t,"{{ELEMENT_NOT_FOUND}}");}revealContent(t,e){const i=t.el,n=t.contentEl;i&&n&&(this.emit("reveal",t),this.hideLoading(t),t.state=lt.Opening,(e=this.isOpeningSlide(t)?void 0===e?this.optionFor(t,"showClass"):e:"f-fadeIn")?this.animate(n,e,(()=>{this.done(t);})):this.done(t));}done(t){this.isClosing()||(t.state=lt.Ready,this.emit("done",t),P(t.el,"is-done"),this.isCurrentSlide(t)&&this.option("autoFocus")&&queueMicrotask((()=>{var e;null===(e=t.panzoom)||void 0===e||e.updateControls(),this.option("autoFocus")&&this.focus();})),this.isOpeningSlide(t)&&(S(this.container,he),!this.isCompact&&this.option("idle")&&this.setIdle()));}isCurrentSlide(t){const e=this.getSlide();return !(!t||!e)&&e.index===t.index}isOpeningSlide(t){var e,i;return null===(null===(e=this.carousel)||void 0===e?void 0:e.prevPage)&&t&&t.index===(null===(i=this.getSlide())||void 0===i?void 0:i.index)}showLoading(t){t.state=lt.Loading;const e=t.el;if(!e)return;P(e,ce),this.emit("loading",t),t.spinnerEl||setTimeout((()=>{if(!this.isClosing()&&!t.spinnerEl&&t.state===lt.Loading){let i=n(x);P(i,"fancybox-spinner"),t.spinnerEl=i,e.prepend(i),this.animate(i,"f-fadeIn");}}),250);}hideLoading(t){const e=t.el;if(!e)return;const i=t.spinnerEl;this.isClosing()?null==i||i.remove():(S(e,ce),i&&this.animate(i,"f-fadeOut",(()=>{i.remove();})),t.state===lt.Loading&&(this.emit("loaded",t),t.state=lt.Ready));}setError(t,e){if(this.isClosing())return;const i=new Event("error",{bubbles:true,cancelable:true});if(this.emit("error",i,t),i.defaultPrevented)return;t.error=e,this.hideLoading(t),this.clearContent(t);const n=document.createElement("div");n.classList.add("fancybox-error"),n.innerHTML=this.localize(e||"<p>{{ERROR}}</p>"),this.setContent(t,n);}clearContent(t){if(void 0===t.state)return;this.emit("clearContent",t),t.contentEl&&(t.contentEl.remove(),t.contentEl=void 0);const e=t.el;e&&(S(e,"has-error"),S(e,"has-unknown"),S(e,`has-${t.type||"unknown"}`)),t.closeBtnEl&&t.closeBtnEl.remove(),t.closeBtnEl=void 0,t.captionEl&&t.captionEl.remove(),t.captionEl=void 0,t.spinnerEl&&t.spinnerEl.remove(),t.spinnerEl=void 0;}getSlide(){var t;const e=this.carousel;return (null===(t=null==e?void 0:e.pages[null==e?void 0:e.page])||void 0===t?void 0:t.slides[0])||void 0}close(t,e){if(this.isClosing())return;const i=new Event("shouldClose",{bubbles:true,cancelable:true});if(this.emit("shouldClose",i,t),i.defaultPrevented)return;t&&t.cancelable&&(t.preventDefault(),t.stopPropagation());const n=()=>{this.proceedClose(t,e);};this.startedFs&&ye&&ye.isFullscreen()?Promise.resolve(ye.exit()).then((()=>n())):n();}clearIdle(){this.idleTimer&&clearTimeout(this.idleTimer),this.idleTimer=null;}setIdle(t=false){const e=()=>{this.clearIdle(),this.idle=true,P(this.container,"is-idle"),this.emit("setIdle");};if(this.clearIdle(),!this.isClosing())if(t)e();else {const t=this.option("idle");t&&(this.idleTimer=setTimeout(e,t));}}endIdle(){this.clearIdle(),this.idle&&!this.isClosing()&&(this.idle=false,S(this.container,"is-idle"),this.emit("endIdle"));}resetIdle(){this.endIdle(),this.setIdle();}toggleIdle(){this.idle?this.endIdle():this.setIdle(true);}toggleFullscreen(){ye&&(ye.isFullscreen()?ye.exit():ye.request().then((()=>{this.startedFs=true;})));}isClosing(){return [rt.Closing,rt.CustomClosing,rt.Destroy].includes(this.state)}proceedClose(t,e){var i,n;this.state=rt.Closing,this.clearIdle(),this.detachEvents();const s=this.container,o=this.carousel,a=this.getSlide(),r=a&&this.option("placeFocusBack")?a.triggerEl||this.option("triggerEl"):null;if(r&&(tt(r)?st(r):r.focus()),s&&(S(s,he),P(s,"is-closing"),s.setAttribute(oe,"true"),this.option("animated")&&P(s,re),s.style.pointerEvents="none"),o){o.clearTransitions(),null===(i=o.panzoom)||void 0===i||i.destroy(),null===(n=o.plugins.Navigation)||void 0===n||n.detach();for(const t of o.slides){t.state=lt.Closing,this.hideLoading(t);const e=t.contentEl;e&&this.stop(e);const i=null==t?void 0:t.panzoom;i&&(i.stop(),i.detachEvents(),i.detachObserver()),this.isCurrentSlide(t)||o.emit("removeSlide",t);}}Pe=window.scrollX,Ce=window.scrollY,window.addEventListener("scroll",this.onScroll),this.emit("close",t),this.state!==rt.CustomClosing?(void 0===e&&a&&(e=this.optionFor(a,"hideClass")),e&&a?(this.animate(a.contentEl,e,(()=>{o&&o.emit("removeSlide",a);})),setTimeout((()=>{this.destroy();}),500)):this.destroy()):setTimeout((()=>{this.destroy();}),500);}destroy(){var t;if(this.state===rt.Destroy)return;window.removeEventListener("scroll",this.onScroll),this.state=rt.Destroy,null===(t=this.carousel)||void 0===t||t.destroy();const e=this.container;e&&e.remove(),Te.delete(this.id);const i=Oe.getInstance();i?i.focus():(we&&(we.remove(),we=null),xe&&(xe.remove(),xe=null),S(document.documentElement,ee),(()=>{if(!et)return;const t=document,e=t.body;e.classList.remove(ie),e.style.setProperty(se,""),t.documentElement.style.setProperty(ne,"");})(),this.emit("destroy"));}static bind(t,e,i){if(!et)return;let n,s="",o={};if(void 0===t?n=document.body:ve(t)?(n=document.body,s=t,"object"==typeof e&&(o=e||{})):(n=t,ve(e)&&(s=e),"object"==typeof i&&(o=i||{})),!n||!E(n))return;s=s||"[data-fancybox]";const a=Oe.openers.get(n)||new Map;a.set(s,o),Oe.openers.set(n,a),1===a.size&&n.addEventListener("click",Oe.fromEvent);}static unbind(t,e){let i,n="";if(ve(t)?(i=document.body,n=t):(i=t,ve(e)&&(n=e)),!i)return;const s=Oe.openers.get(i);s&&n&&s.delete(n),n&&s||(Oe.openers.delete(i),i.removeEventListener("click",Oe.fromEvent));}static destroy(){let t;for(;t=Oe.getInstance();)t.destroy();for(const t of Oe.openers.keys())t.removeEventListener("click",Oe.fromEvent);Oe.openers=new Map;}static fromEvent(t){if(t.defaultPrevented)return;if(t.button&&0!==t.button)return;if(t.ctrlKey||t.metaKey||t.shiftKey)return;let e=t.composedPath()[0];const i=e.closest("[data-fancybox-trigger]");if(i){const t=i.dataset.fancyboxTrigger||"",n=document.querySelectorAll(`[data-fancybox="${t}"]`),s=parseInt(i.dataset.fancyboxIndex||"",10)||0;e=n[s]||e;}if(!(e&&e instanceof Element))return;let n,s,o,a;if([...Oe.openers].reverse().find((([t,i])=>!(!t.contains(e)||![...i].reverse().find((([i,r])=>{let l=e.closest(i);return !!l&&(n=t,s=i,o=l,a=r,true)}))))),!n||!s||!o)return;a=a||{},t.preventDefault(),e=o;let r=[],l=u({},at,a);l.event=t,l.triggerEl=e,l.delegate=i;const c=l.groupAll,h=l.groupAttr,d=h&&e?e.getAttribute(`${h}`):"";if((!e||d||c)&&(r=[].slice.call(n.querySelectorAll(s))),e&&!c&&(r=d?r.filter((t=>t.getAttribute(`${h}`)===d)):[e]),!r.length)return;const p=Oe.getInstance();return p&&p.options.triggerEl&&r.indexOf(p.options.triggerEl)>-1?void 0:(e&&(l.startIndex=r.indexOf(e)),Oe.fromNodes(r,l))}static fromSelector(t,e,i){let n=null,s="",o={};if(ve(t)?(n=document.body,s=t,"object"==typeof e&&(o=e||{})):t instanceof HTMLElement&&ve(e)&&(n=t,s=e,"object"==typeof i&&(o=i||{})),!n||!s)return  false;const a=Oe.openers.get(n);return !!a&&(o=u({},a.get(s)||{},o),!!o&&Oe.fromNodes(Array.from(n.querySelectorAll(s)),o))}static fromNodes(t,e){e=u({},at,e||{});const i=[];for(const n of t){const t=n.dataset||{},s=t[me]||n.getAttribute(ge)||n.getAttribute("currentSrc")||n.getAttribute(me)||void 0;let o;const a=e.delegate;let r;a&&i.length===e.startIndex&&(o=a instanceof HTMLImageElement?a:a.querySelector("img:not([aria-hidden])")),o||(o=n instanceof HTMLImageElement?n:n.querySelector("img:not([aria-hidden])")),o&&(r=o.currentSrc||o[me]||void 0,!r&&o.dataset&&(r=o.dataset.lazySrc||o.dataset[me]||void 0));const l={src:s,triggerEl:n,thumbEl:o,thumbElSrc:r,thumbSrc:r};for(const e in t){let i=t[e]+"";i="false"!==i&&("true"===i||i),l[e]=i;}i.push(l);}return new Oe(i,e)}static getInstance(t){if(t)return Te.get(t);return Array.from(Te.values()).reverse().find((t=>!t.isClosing()&&t))||null}static getSlide(){var t;return (null===(t=Oe.getInstance())||void 0===t?void 0:t.getSlide())||null}static show(t=[],e={}){return new Oe(t,e)}static next(){const t=Oe.getInstance();t&&t.next();}static prev(){const t=Oe.getInstance();t&&t.prev();}static close(t=true,...e){if(t)for(const t of Te.values())t.close(...e);else {const t=Oe.getInstance();t&&t.close(...e);}}}Object.defineProperty(Oe,"version",{enumerable:true,configurable:true,writable:true,value:"5.0.36"}),Object.defineProperty(Oe,"defaults",{enumerable:true,configurable:true,writable:true,value:at}),Object.defineProperty(Oe,"Plugins",{enumerable:true,configurable:true,writable:true,value:te}),Object.defineProperty(Oe,"openers",{enumerable:true,configurable:true,writable:true,value:new Map});

    new Splide('.splide', {
        heightRatio: 0.5625 // 16/9 ratio
    }).mount();

    Oe.bind('[data-fancybox]', {});

})();
//# sourceMappingURL=bundle.js.map
