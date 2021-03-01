export default class AnimationAssistant {
    constructor(selector) {
        this.selector = selector;
        this.elements = AnimationAssistant.getElementsBySelector(this.selector);
        this.offset = null;
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

    addEventForGetOffset(element) {
        const offsetTop = AnimationAssistant.getOffsetTop(element);
        const percentOfOffset = AnimationAssistant.getPercentOfOffset(offsetTop);
        if (this.offset > percentOfOffset) {
            element.animationAssistantIsReady = true;
        }
    }

    setTrigger(offset) {
        this.offset = offset;
        this.elements.forEach((element) => {
            window.addEventListener('scroll', this.addEventForGetOffset.bind(this, element));
        });
    }

    setAnimation(name, timeout = 2000) {
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
