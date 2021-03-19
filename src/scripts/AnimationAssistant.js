class AnimationAssistant {
    constructor(selector) {
        this.selector = selector;
        this.elements = AnimationAssistant.getElementsBySelector(this.selector);
        this.library = null;
        this.hide = false;
    }

    static getElementsBySelector(selector) {
        return document.querySelectorAll(`.${selector}`);
    }

    static getOffsetTop(element) {
        return element.getBoundingClientRect().top;
    }

    static getOffsetBottom(element) {
        return element.getBoundingClientRect().bottom;
    }

    static getPercentOfOffset(top) {
        return Math.trunc((top / document.documentElement.clientHeight) * 100);
    }

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

    static isEndOfPage() {
        const offsetTop = AnimationAssistant.getOffsetTop(document.documentElement);
        const maxHeightOfPage = AnimationAssistant.getMaxHeightOfPage();
        const clientHeight = document.documentElement.clientHeight;
        const documentElementOffsetTop = (maxHeightOfPage - clientHeight) * -1;
        return offsetTop === documentElementOffsetTop;
    }

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

    setLibrary(library) {
        this.library = library;
        this.elements.forEach((element) => {
            element.classList.add(AnimationAssistant.getLibraryPrefix(this.library));
        });
    }

    addClasses(classes) {
        this.elements.forEach((element) => {
            classes.forEach((className) => element.classList.add(className));
        });
    }

    hideAtStart() {
        this.hide = true;
        this.elements.forEach((element) => {
            element.style.visibility = 'hidden';
        });
    }

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
