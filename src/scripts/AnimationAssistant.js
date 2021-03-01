export default class AnimationAssistant {
    constructor(selector) {
        this.selector = selector;
        this.elements = AnimationAssistant.getElementsBySelector(this.selector);
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

    addEventForGetOffset(element, offset) {
        const offsetTop = AnimationAssistant.getOffsetTop(element);
        const percentOfOffset = AnimationAssistant.getPercentOfOffset(offsetTop);
        if (offset > percentOfOffset) {
            this.a = 1;
        }
    }

    setAnimation(name, offset = null, timeout = 2000) {
        if (offset) {
            return this.promiseOffset(name, offset, timeout);
        }
        return this.promise(name, timeout);
    }

    promise(name, timeout = 2000) {
        return new Promise((resolve) => {
            this.elements.forEach((element) => {
                name.forEach((className) => element.classList.toggle(className));
            });
            setTimeout(() => {
                resolve(this.setAnimation.bind(this));
            }, timeout);
        });
    }

    promiseOffset(name, offset, timeout = 2000) {
        return new Promise((resolve) => {
            this.elements.forEach((element) => {
                name.forEach((className) => element.classList.toggle(className));
            });
            setTimeout(() => {
                resolve(this.setAnimation.bind(this));
            }, timeout);
        });
    }
}
