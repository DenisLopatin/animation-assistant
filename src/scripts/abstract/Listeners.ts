import {animationend} from '../types';

export default abstract class Listeners {
    protected constructor(
        protected readonly elements: NodeListOf<HTMLElement>,
        protected readonly storage: IEvent,
        protected readonly support: ILocationDate,
        protected readonly queue: [string, number][] = [],
        protected currentClass: string = '',
    ) {
        this.elements = elements;
        this.storage = storage;
        this.support = support;
    }

    protected createListener(
        element: HTMLElement,
        offset: number,
        elementOnTop: boolean,
        eventNumber: number,
        animationend?: animationend): void
    {
        const elementOffsetTop = this.support.getOffsetTop(element);
        const elementOffsetBottom = this.support.getOffsetBottom(element);
        const percentOfOffset = this.support.getPercentOfOffset(elementOffsetTop);
        const isEndOfPage = this.support.isEndOfPage();
        const conditionsIfElementOnTop = elementOnTop && (offset > percentOfOffset || isEndOfPage);
        const conditionsIfElementOnBottom = !elementOnTop && elementOffsetBottom > 0;
        const conditions = conditionsIfElementOnTop || conditionsIfElementOnBottom;
        // console.log(eventNumber)
        if (conditions) {
            this.executeListener(element, animationend);

            const currentListener = this.storage.getCurrentListener(eventNumber);
            window.removeEventListener('scroll', currentListener);
        }
    }

    protected executeListener(element: HTMLElement, animationend?: animationend): void {
        const copyQueue = [...this.queue];
        let animationendFirstRun = true;
        let animationendCallback: (target: HTMLElement) => void;
        let currentClass = this.currentClass;

        element.classList.add(currentClass);
        element.style.visibility = '';

        const animationEndWrapper = (event: AnimationEventInit) => {
            if (animationendFirstRun && animationend) {
                animationendCallback = animationend(event);
            }

            if (!copyQueue.length && animationendCallback) {
                animationendCallback(element);
            }

            if (copyQueue.length) {
                const [anotherName, timer] = copyQueue.shift()!;
                setTimeout(() => {
                    element.classList.remove(currentClass);
                    element.classList.add(anotherName);
                    currentClass = anotherName;
                }, animationendFirstRun ? 0 : timer);
            }

            animationendFirstRun = false;
        };

        element.addEventListener('animationend',  animationEndWrapper);
    }
}