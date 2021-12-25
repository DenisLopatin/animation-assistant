import {animationend} from '../types';
import Listeners from '../abstract/Listeners';
// TODO: {once: true} & freeze animate
export default class Animator extends Listeners implements IAnimator {
    constructor(
        protected readonly elements: NodeListOf<HTMLElement>,
        protected readonly storage: IEvent,
        protected readonly support: ILocationDate,
        protected readonly queue: [string, number][] = [],
        protected currentClass: string = '',
        protected defer: boolean = false,
    ) {
        super(elements, storage, support);
    }

    public setAnimation(offset: number, name: string, animationend?: animationend): this {
        const callback = (element: HTMLElement): void => {
            const isElementAtTheTop = this.support.isElementAtTheTop(element);
            const shouldAnimateElementNow = this.support.isElementInViewImmediatelyAfterLoading(element);
            const eventNumber = this.storage.getEventNumber();

            const listener = () => (
                this.createListener(element, offset, isElementAtTheTop, eventNumber, animationend)
            );

            if (shouldAnimateElementNow) {
                setTimeout(this.executeListener.bind(this), 0, element, name, animationend);
            }

            if (!shouldAnimateElementNow && isElementAtTheTop) {
                this.storage.setRecordEvent(listener, eventNumber);
                window.addEventListener('scroll', listener);
            }

            if (!shouldAnimateElementNow && !isElementAtTheTop) {
                this.storage.setRecordEvent(listener, eventNumber);
                window.addEventListener('scroll', listener);
            }
        };

        this.elements.forEach(callback);
        this.currentClass = name;
        this.defer = true;
        return this;
    }

    public play(name: string, timeout: number = 1000): Promise<any> {
        const animationend = (element: HTMLElement, resolve: Function): void => {
            element.classList.remove(this.currentClass);
            setTimeout(() => {
                resolve(this.play.bind(this));
            }, timeout);
        };

        const each = (element: HTMLElement, resolve: Function): void => {
            element.classList.add(name);
            this.currentClass = name;
            element.addEventListener('animationend', () => animationend(element, resolve));
        };

        const callback = (resolve: Function): void => {
            this.elements.forEach((element) => each(element, resolve));
        };

        if (this.defer) {
            this.queue.push([name, timeout]);
            return Promise.resolve(this.play.bind(this));
        }

        return new Promise(callback);
    }
}