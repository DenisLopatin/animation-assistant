/*
 * Animation Assistant version 1.0.8
 * GITHUB - https://github.com/DenisLopatin/animation-assistant
 * NPM - https://www.npmjs.com/package/animation-assistant
 * */

/**
 * class AnimationAssistant
 * */

class AnimationAssistant {
    /**
     * create new animation
     * @param { string } selector - selector of elements
     * */

    constructor(selector) {
        this.selector = selector;
        this.elements = AnimationAssistant.getElementsBySelector(this.selector);
        this.library = null;
        this.hide = false;
    }
    /**
     * Get all elements by selector
     * @param { string } selector - selector of elements
     * @return { HTMLElement }
     * */

    static getElementsBySelector(selector) {
        return document.querySelectorAll(`.${selector}`);
    }
    /**
     * Get offset top of element
     * @param { HTMLElement, Node } element - HTMElement
     * @return { number }
     * */

    static getOffsetTop(element) {
        return element.getBoundingClientRect().top;
    }
    /**
     * Get offset bottom of element
     * @param { HTMLElement, Node } element - HTMElement
     * @return { number }
     * */

    static getOffsetBottom(element) {
        return element.getBoundingClientRect().bottom;
    }
    /**
     * Get percent of offset relative to the window
     * @param { number } top - the value obtained by the method getOffsetTop
     * @return { number }
     * */

    static getPercentOfOffset(top) {
        return Math.trunc((top / document.documentElement.clientHeight) * 100);
    }
    /**
     * Get maximal height of page
     * @return { number }
     * */

    static getMaxHeightOfPage() {
        return Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight,
        );
    }

    /**
     * Check if the user has reached the end of the page
     * @return { boolean }
     * */
    static isEndOfPage() {
        const offsetTop = AnimationAssistant.getOffsetTop(document.documentElement);
        const maxHeightOfPage = AnimationAssistant.getMaxHeightOfPage();
        const clientHeight = document.documentElement.clientHeight;
        const documentElementOffsetTop = (maxHeightOfPage - clientHeight) * -1;
        return offsetTop === documentElementOffsetTop;
    }
    /**
     * Add event for element
     * @param { NodeList } elements - Elements included in the object
     * @param { boolean } hidden - Hidden items or not
     * @param { number } offset - A custom parameter that sets the indent of the element from the browser window for playing the animation
     * @param { string } name - Name of animation
     * @param { function } animationEnd - callback function that will be executed after the animation is finished
     * @param { boolean } elementFromTop - the element is located at the bottom or top relative to the scrolling of the page at the time of its loading
     * */

    static scrollEventForElement(elements, hidden, offset, name, animationEnd, elementFromTop) {
        elements.forEach((element) => {
            const offsetTop = AnimationAssistant.getOffsetTop(element);
            const offsetBottom = AnimationAssistant.getOffsetBottom(element);
            const percentOfOffset = AnimationAssistant.getPercentOfOffset(offsetTop);
            const isEndOfPage = AnimationAssistant.isEndOfPage();
            if (elementFromTop) {
                if (offset > percentOfOffset || isEndOfPage) {
                    element.classList.add(name);
                    element.addEventListener('animationend', animationEnd);
                    hidden ? (element.style.visibility = '') : '';
                }
            } else if (!elementFromTop) {
                if (offsetBottom > 0) {
                    element.classList.add(name);
                    element.addEventListener('animationend', animationEnd);
                    hidden ? (element.style.visibility = '') : '';
                }
            }
        });
    }
    /**
     * Get prefix of library
     * @param { string } library - library name
     * @return { string }
     * */

    static getLibraryPrefix(library) {
        const libraries = {
            'animate.css': 'animate__animated',
            'css-animation': 'cssanimation',
            'hover.css': '',
            'css-shake': 'shake',
            'magic.css': 'magictime',
            'repaintless-css': 'element-animated',
            'tuesday-css': 'animated',
        };
        return libraries[library];
    }
    /**
     * Set library of animation elements
     * @param { string } library - library name
     * */

    setLibrary(library) {
        this.library = library;
        this.elements.forEach((element) => {
            element.classList.add(AnimationAssistant.getLibraryPrefix(this.library));
        });
    }
    /**
     * Add classes for animation elements
     * @param { array } classes - array with classes
     * */

    addClasses(classes) {
        this.elements.forEach((element) => {
            classes.forEach((className) => element.classList.add(className));
        });
    }
    /**
     * Hidden elements before animation
     * */

    hideAtStart() {
        this.hide = true;
        this.elements.forEach((element) => {
            element.style.visibility = 'hidden';
        });
    }
    /**
     * Adopted environment for animation elements
     * */

    adaptEnvironment() {
        this.elements.forEach((element) => {
            const parent = element.parentElement;
            if (parent.tagName === 'BODY') {
                const prev = element.previousElementSibling;
                const div = document.createElement('div');
                div.style.overflow = 'hidden';
                div.append(element);
                prev
                    ? prev.insertAdjacentElement('afterend', div)
                    : document.body.insertAdjacentElement('afterbegin', element);
            } else {
                element.parentElement.style.overflow = 'hidden';
            }
        });
    }
    /**
     * Set animation
     * @param { number } offset - A custom parameter that sets the indent of the element from the browser window for playing the animation
     * @param { name } name - animation name
     * @param { function } animationEnd - callback function that will be executed after the animation is finished
     * */

    setAnimation(offset, name, animationEnd) {
        this.elements.forEach((element) => {
            const offsetTop = AnimationAssistant.getOffsetTop(element);
            const elementIsTop = window.pageYOffset < offsetTop + window.pageYOffset;
            if (elementIsTop) {
                window.addEventListener(
                    'scroll',
                    AnimationAssistant.scrollEventForElement.bind(
                        null,
                        this.elements,
                        this.hide,
                        offset,
                        name,
                        animationEnd,
                        true,
                    ),
                );
            } else {
                window.addEventListener(
                    'scroll',
                    AnimationAssistant.scrollEventForElement.bind(
                        null,
                        this.elements,
                        this.hide,
                        offset,
                        name,
                        animationEnd,
                        false,
                    ),
                );
            }
        });
    }
    /**
     * Playing an animation
     * @param { string } name - animation name
     * @param { number } timeout - The time after which the next animation will start
     * @return { Promise }
     * */

    play(name, timeout = 2000) {
        return new Promise((resolve) => {
            this.elements.forEach((element) => {
                element.classList.add(name);
                element.classList.remove(element.ASoldClassName);
                element.ASoldClassName = name;
                element.addEventListener('animationend', () => {
                    setTimeout(() => {
                        resolve(this.play.bind(this));
                    }, timeout);
                });
            });
        });
    }
}

export default AnimationAssistant;
