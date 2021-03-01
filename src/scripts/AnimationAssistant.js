export default class AnimationAssistant {
    constructor(selector) {
        this.selector = selector;
        this.elements = AnimationAssistant.getElementsBySelector(this.selector);
        this.library = null;
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

    getLibraryPrefix() {
        const libraries = {
            'animate.css': 'animate__animated',
        };
        return libraries[this.library];
    }

    setLibrary(library) {
        this.library = library;
        this.elements.forEach((element) => {
            element.classList.add(this.getLibraryPrefix());
        });
    }

    setAnimation(offset, name, visibility = true) {
        window.addEventListener('scroll', () => {
            this.elements.forEach((element) => {
                if (!visibility && !element.animationIsOver) {
                    element.style.visibility = 'hidden';
                }
                const offsetTop = AnimationAssistant.getOffsetTop(element);
                const percentOfOffset = AnimationAssistant.getPercentOfOffset(offsetTop);
                const findIndex = offset.findIndex((item) => item > percentOfOffset);
                if (findIndex !== -1) {
                    element.style.visibility = '';
                    element.animationIsOver = true;
                    element.classList.add(name[findIndex]);
                }
            });
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
