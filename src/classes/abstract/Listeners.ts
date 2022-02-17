import {animationend} from '../../types';
import IEvent from '../../interfaces/IEvent';
import ILocationDate from '../../interfaces/ILocationDate';

export default abstract class Listeners {
    protected constructor(
        protected readonly elements: NodeListOf<HTMLElement>,
        protected readonly stop: boolean,
        protected readonly storage: IEvent,
        protected readonly support: ILocationDate,
        protected readonly queue: [string, number][] = [],
        protected currentClass: string = '',
        protected timeouts: {[key: number]: ReturnType<typeof setTimeout>} = {},
    ) {
        this.elements = elements;
        this.stop = stop;
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
        const isElementVisible = this.support.isElementInViewImmediatelyAfterLoading(element);
        const conditionsIfElementOnTop = (elementOnTop && offset > percentOfOffset && percentOfOffset >= 0) || isEndOfPage;
        const conditionsIfElementOnBottom = !elementOnTop && elementOffsetBottom > 0 && isElementVisible;
        const conditions = conditionsIfElementOnTop || conditionsIfElementOnBottom;

        if (conditions) {
            if (this.timeouts[eventNumber]) clearTimeout(this.timeouts[eventNumber]);

            this.timeouts[eventNumber] = setTimeout(() => {
                this.executeListener(element, animationend);

                const currentListener = this.storage.getCurrentListener(eventNumber);
                window.removeEventListener('scroll', currentListener);
            });
        }

        if (!conditions) {
            clearTimeout(this.timeouts[eventNumber]);
        }
    }

    protected executeListener(element: HTMLElement, animationend?: animationend): void {
        const copyQueue = [...this.queue];
        let animationendFirstRun = true;
        let animationendCallback: (target: HTMLElement) => void;
        let currentClass = this.currentClass.trim();
        element.classList.add(...currentClass.split(' '));
        element.style.visibility = '';

        const animationEndWrapper = (event: AnimationEventInit) => {
            if (animationendFirstRun && animationend) {
                animationendCallback = animationend(event);
            }

            if (!copyQueue.length && animationendCallback) {
                animationendCallback(element);
            }

            if (copyQueue.length) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
