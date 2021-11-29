"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var AnimationAssistant = /** @class */ (function () {
    function AnimationAssistant(selector) {
        this.selector = selector;
        this.elements = AnimationAssistant.getElementsBySelector(this.selector);
        this.queue = [];
    }
    AnimationAssistant.counter = function () {
        AnimationAssistant.listeners.length += 1;
        return AnimationAssistant.listeners.length;
    };
    AnimationAssistant.addListener = function (fn, currentListener) {
        AnimationAssistant.listeners[currentListener] = fn;
    };
    AnimationAssistant.getElementsBySelector = function (selector) {
        return document.querySelectorAll(".".concat(selector));
    };
    AnimationAssistant.getOffsetTop = function (element) {
        return element.getBoundingClientRect().top;
    };
    AnimationAssistant.getOffsetBottom = function (element) {
        return element.getBoundingClientRect().bottom;
    };
    AnimationAssistant.getPercentOfOffset = function (top) {
        return Math.trunc((top / document.documentElement.clientHeight) * 100);
    };
    AnimationAssistant.getMaxHeightOfPage = function () {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
    };
    AnimationAssistant.isEndOfPage = function () {
        var offsetTop = AnimationAssistant.getOffsetTop(document.documentElement);
        var maxHeightOfPage = AnimationAssistant.getMaxHeightOfPage();
        var clientHeight = document.documentElement.clientHeight;
        var documentElementOffsetTop = (maxHeightOfPage - clientHeight) * -1;
        return offsetTop === documentElementOffsetTop;
    };
    AnimationAssistant.deferredPlay = function (element, name, newName, timer) {
        element.classList.remove(name);
        element.classList.add(newName);
    };
    AnimationAssistant.scrollEventForElement = function (element, offset, name, animationEnd, elementOnTop, currentListener, queue) {
        var offsetTop = AnimationAssistant.getOffsetTop(element);
        var offsetBottom = AnimationAssistant.getOffsetBottom(element);
        var percentOfOffset = AnimationAssistant.getPercentOfOffset(offsetTop);
        var isEndOfPage = AnimationAssistant.isEndOfPage();
        var conditionsIfElementOnTop = elementOnTop && (offset > percentOfOffset || isEndOfPage);
        var conditionsIfElementOnBottom = !elementOnTop && offsetBottom > 0;
        var conditions = conditionsIfElementOnTop || conditionsIfElementOnBottom;
        var copyOfQueue = __spreadArray([], queue, true);
        var animationendFirstRun = true;
        var animationendCallback;
        if (conditions) {
            element.classList.add(name);
            element.style.visibility = '';
            element.addEventListener('animationend', function () {
                if (animationendFirstRun) {
                    animationendCallback = animationEnd();
                }
                if (!copyOfQueue.length && typeof animationendCallback === 'function') {
                    animationendCallback(element);
                }
                if (copyOfQueue.length) {
                    var _a = copyOfQueue.shift(), newName_1 = _a[0], timer = _a[1];
                    setTimeout(function () {
                        element.classList.remove(name);
                        element.classList.add(newName_1);
                        name = newName_1;
                    }, animationendFirstRun ? 0 : timer);
                }
                animationendFirstRun = false;
            });
            window.removeEventListener('scroll', AnimationAssistant.listeners[currentListener]);
        }
    };
    AnimationAssistant.bindTop = function (parameters, currentListener, queue) {
        var _a;
        return (_a = AnimationAssistant.scrollEventForElement).bind.apply(_a, __spreadArray(__spreadArray([this], parameters, false), [true, currentListener, queue], false));
    };
    AnimationAssistant.bindBottom = function (parameters, currentListener, queue) {
        var _a;
        return (_a = AnimationAssistant.scrollEventForElement).bind.apply(_a, __spreadArray(__spreadArray([this], parameters, false), [false, currentListener, queue], false));
    };
    AnimationAssistant.getLibraryPrefix = function (library) {
        return AnimationAssistant.libraries[library] || '';
    };
    AnimationAssistant.prototype.setLibrary = function (library) {
        var _this = this;
        if (typeof library !== 'string') {
            console.error("The parameter 'library' must be a string. You pass ".concat(typeof library, ". \n                The setLibrary method have been ignored.").replace(/([\t\r\n]|\s{2,})/g, ''));
            return this;
        }
        this.library = library;
        this.elements.forEach(function (element) {
            element.classList.add(AnimationAssistant.getLibraryPrefix(_this.library));
        });
        return this;
    };
    AnimationAssistant.prototype.addClasses = function (classes) {
        if (!Array.isArray(classes)) {
            console.error("The parameter must be an array. You pass ".concat(typeof classes, ". Method addClasses have been ignored"));
            return this;
        }
        this.elements.forEach(function (element) {
            classes.forEach(function (className) { return element.classList.add(className); });
        });
        return this;
    };
    AnimationAssistant.prototype.hiddenLaunch = function () {
        this.elements.forEach(function (element) {
            element.style.visibility = 'hidden';
        });
        return this;
    };
    AnimationAssistant.prototype.adaptEnvironment = function (config) {
        if (config === void 0) { config = { exclude: [] }; }
        if (typeof config !== 'object') {
            console.error("The parameter must be an object. You pass ".concat(typeof config, ". Method adaptEnvironment have been ignored"));
            return this;
        }
        if (config['exclude'] && !Array.isArray(config['exclude'])) {
            console.error("The property config of object 'exclude' must be an array. \n                 You pass ".concat(typeof config['exclude'], ". Method adaptEnvironment have been ignored.")
                .replace(/([\t\r\n]|\s{2,})/g, ''));
        }
        if (config['pass'] && typeof config['pass'] !== 'boolean') {
            console.error("The property of config object 'pass' must be a string. You pass ".concat(typeof config['pass'], ". \n                Method adaptEnvironment will be work, but classes will not transferred.")
                .replace(/([\t\r\n]|\s{2,})/g, ''));
        }
        var callback = function (element) {
            var _a, _b;
            var parent = element.parentElement;
            var classes = [];
            if (pass && exclude) {
                // @ts-ignore
                classes = __spreadArray([], element.classList, true).filter(function (_class) { return !exclude.includes(_class); });
            }
            if (pass && !exclude) {
                // @ts-ignore
                classes = __spreadArray([], element.classList, true);
            }
            if (parent.tagName === 'BODY') {
                var prev = element.previousElementSibling;
                var div = document.createElement('div');
                div.style.overflow = 'hidden';
                (_a = div.classList).add.apply(_a, classes);
                div.append(element);
                prev ?
                    prev.insertAdjacentElement('afterend', div)
                    : document.body.insertAdjacentElement('afterbegin', div);
            }
            else {
                (_b = element.parentElement.classList).add.apply(_b, classes);
                element.parentElement.style.overflow = 'hidden';
            }
        };
        var pass = config['pass'];
        var exclude = config['exclude'];
        this.elements.forEach(callback);
        return this;
    };
    AnimationAssistant.prototype.setAnimation = function (offset, name, animationEnd) {
        var _this = this;
        if (animationEnd === void 0) { animationEnd = function () { }; }
        if (typeof Number(offset) !== 'number') {
            console.error("The parameter 'offset' must be a number. You pass ".concat(typeof offset, ". The setAnimation method have been ignored."));
            return;
        }
        if (typeof name !== 'string') {
            console.error("The parameter 'name' must be a string. You pass ".concat(typeof name, ". The setAnimation method have been ignored."));
            return;
        }
        if (typeof animationEnd !== 'function') {
            console.error("The parameter 'animationEnd' must be a string. You pass ".concat(typeof animationEnd, ". \n                 The setAnimation method will work, but the callback will not work at the end of the animation.")
                .replace(/([\t\r\n]|\s{2,})/g, ''));
        }
        var callback = function (element) {
            var offsetTop = AnimationAssistant.getOffsetTop(element);
            var elementIsTop = window.pageYOffset < (offsetTop + window.pageYOffset);
            var currentListener = AnimationAssistant.counter();
            var parameters = [element, offset, name, animationEnd];
            var queue = _this.queue;
            if (elementIsTop) {
                var bind = AnimationAssistant.bindTop(parameters, currentListener, queue);
                AnimationAssistant.addListener(bind, currentListener);
                window.addEventListener('scroll', bind);
            }
            else {
                var bind = AnimationAssistant.bindBottom(parameters, currentListener, queue);
                AnimationAssistant.addListener(bind, currentListener);
                window.addEventListener('scroll', bind);
            }
        };
        this.elements.forEach(callback);
        this.animate = true;
        return this;
    };
    AnimationAssistant.prototype.play = function (name, timeout) {
        var _this = this;
        if (timeout === void 0) { timeout = 1000; }
        if (typeof name !== 'string') {
            console.error("The parameter 'name' must be a string. You pass ".concat(typeof name, ". The play method have been ignored."));
            return;
        }
        if (typeof Number(timeout) !== 'number') {
            console.error("The parameter 'timeout' must be a number. You pass ".concat(typeof timeout, ". \n                 The playback method will work, but the animations will change each other instantly.")
                .replace(/([\t\r\n]|\s{2,})/g, ''));
        }
        var animationEnd = function (element, resolve) {
            element.classList.remove(_this.currentClasses);
            setTimeout(function () {
                resolve(_this.play.bind(_this));
            }, timeout);
        };
        var each = function (element, resolve) {
            element.classList.add(name);
            _this.currentClasses = name;
            element.addEventListener('animationend', function () { return animationEnd(element, resolve); });
        };
        var callback = function (resolve) {
            _this.elements.forEach(function (element) { return each(element, resolve); });
        };
        if (this.animate) {
            this.queue.push([name, timeout]);
            return Promise.resolve(this.play.bind(this));
        }
        return new Promise(callback);
    };
    AnimationAssistant.libraries = {
        'animate.css': 'animate__animated',
        'css-animation': 'cssanimation',
        'css-shake': 'shake',
        'magic.css': 'magictime',
        'repaintless-css': 'element-animated',
        'tuesday-css': 'animated'
    };
    AnimationAssistant.listeners = {
        length: 0
    };
    return AnimationAssistant;
}());
exports["default"] = AnimationAssistant;
