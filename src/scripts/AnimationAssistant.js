export default class AnimationAssistant {
    constructor(selector) {
        this.selector = selector;
        this.elements = AnimationAssistant.getElementsBySelector(this.selector);
        this.library = 'animation-assistant';
        this.hide = false;
    }

    static getElementsBySelector(selector) {
        return document.querySelectorAll(`.${selector}`);
    }

    static getOffsetTop(element) {
        return element.getBoundingClientRect().top;
    }

    static getPercentOfOffset(top) {
        return Math.trunc((top / document.documentElement.clientHeight) * 100);
    }

    static getLibraryPrefix(library) {
        const libraries = {
            'animate.css': 'animate__animated',
        };
        return libraries[library];
    }

    setLibrary(library) {
        this.library = library;
        this.elements.forEach((element) => {
            element.classList.add(AnimationAssistant.getLibraryPrefix(this.library));
        });
    }

    setAnimation(offset, name, animationEnd) {
        window.addEventListener('scroll', () => {
            this.elements.forEach((element) => {
                const offsetTop = AnimationAssistant.getOffsetTop(element);
                const percentOfOffset = AnimationAssistant.getPercentOfOffset(offsetTop);
                if (offset > percentOfOffset) {
                    element.classList.add(name);
                    element.addEventListener('animationend', animationEnd);
                    if (this.hide) {
                        element.style.visibility = '';
                    }
                }
            });
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
            if (parent.tagName === 'HTML' || parent.tagName === 'BODY') {
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

    play(name, timeout = 2000) {
        return new Promise((resolve) => {
            this.elements.forEach((element) => {
                element.classList.toggle(name);
                element.classList.toggle(this.play.oldClassName);
            });
            this.play.oldClassName = name;
            setTimeout(() => {
                resolve(this.play.bind(this));
            }, timeout);
        });
    }
}
