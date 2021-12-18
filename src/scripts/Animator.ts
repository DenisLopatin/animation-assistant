import Service from './Service';
import AnimationAssistant from "./AnimationAssistant";

export default class Animator extends Service {
    constructor(
        protected readonly elements: NodeListOf<HTMLElement>,
        protected readonly queue: [string, number][],
        protected currentClasses: string,
        protected animate: boolean,
    ) {
        super(elements, queue, currentClasses, animate);
    }

    protected scrollEventForElement
        (element: HTMLElement, offset: number, name: string, animationEnd: Function, elementOnTop: boolean, currentListener: number)
    {
        const offsetTop = this.getOffsetTop(element as HTMLElement);
        const offsetBottom = this.getOffsetBottom(element as HTMLElement);
        const percentOfOffset = this.getPercentOfOffset(offsetTop);
        const isEndOfPage = this.isEndOfPage();
        const conditionsIfElementOnTop = elementOnTop && (offset > percentOfOffset || isEndOfPage);
        const conditionsIfElementOnBottom = !elementOnTop && offsetBottom > 0;
        const conditions = conditionsIfElementOnTop || conditionsIfElementOnBottom;
        const copyOfQueue = [...this.queue];
        let animationendFirstRun = true;
        let animationendCallback: undefined | Function;
        console.log(currentListener);
        if (conditions) {
            (element as HTMLElement).classList.add(name);
            (element as HTMLElement).style.visibility = '';
            element.addEventListener('animationend',  () => {
                if (animationendFirstRun) {
                    animationendCallback = animationEnd();
                }

                if (!copyOfQueue.length && typeof animationendCallback === 'function') {
                    animationendCallback(element);
                }

                if (copyOfQueue.length) {
                    const [newName, timer] = copyOfQueue.shift()!;
                    setTimeout(() => {
                        (element as HTMLElement).classList.remove(name);
                        (element as HTMLElement).classList.add(newName);
                        name = newName;
                    }, animationendFirstRun ? 0 : timer);
                }

                animationendFirstRun = false;
            });

            // @ts-ignore
            window.removeEventListener('scroll', Service.listeners[currentListener]);
        }
    }

    protected bindTop(element: HTMLElement, offset: number, name: string, animationEnd: Function, currentListener: number) {
        return () => this.scrollEventForElement(element, offset, name, animationEnd, true, currentListener);
    }

    protected bindBottom(element: HTMLElement, offset: number, name: string, animationEnd: Function, currentListener: number) {
        return () => this.scrollEventForElement(element, offset, name, animationEnd, false, currentListener);
    }

    public setAnimation(offset: number, name: string, animationEnd: Function = () => {}) {
        const callback = (element: HTMLElement): void => {
            const offsetTop = this.getOffsetTop(element);
            const elementIsTop = window.scrollY < (offsetTop + window.scrollY);
            const currentListener = Service.eventNumber();
            if (elementIsTop) {
                const bind = this.bindTop(element, offset, name, animationEnd, currentListener);
                Service.recordEvent(bind, currentListener);
                window.addEventListener('scroll', bind);
            } else {
                const bind = this.bindBottom(element, offset, name, animationEnd, currentListener);
                Service.recordEvent(bind, currentListener);
                window.addEventListener('scroll', bind);
            }
        };
        this.elements.forEach(callback);
        this.animate = true;
        return this;
    }

    public play(name: string, timeout: number = 1000): Promise<any> | undefined {
        const animationEnd = (element: Node, resolve: Function): void => {
            (element as HTMLElement).classList.remove(this.currentClasses);
            setTimeout(() => {
                resolve(this.play.bind(this));
            }, timeout);
        };

        const each = (element: Node, resolve: Function): void => {
            (element as HTMLElement).classList.add(name);
            this.currentClasses = name;
            element.addEventListener('animationend', () => animationEnd(element, resolve));
        };

        const callback = (resolve: Function): void => {
            this.elements.forEach((element) => each(element, resolve));
        };

        if (this.animate) {
            this.queue.push([name, timeout]);
            return Promise.resolve(this.play.bind(this));
        }

        return new Promise(callback);
    }
}