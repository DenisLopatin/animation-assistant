import IListeners from './contract/IListeners';
import IEvent from '../Events/contract/IEvent';
import ILocationDate from '../LocationData/contract/ILocationDate';
import { ListenerInfo, ListenerParams } from '../../interfaces';

export default class Listeners implements IListeners {
    constructor(protected readonly eventsStorage: IEvent, protected readonly locationData: ILocationDate) {}

    public createListener(listenerInfo: ListenerInfo): void
    {
        const {
            element, offset, elementLocation, eventNumber, classNames, queue, middlewareContainer, animationend,
        } = listenerInfo;
        const percentOfOffset = this.locationData.getPercentOfOffsetByElement(elementLocation, element);
        const isEndOfPage = this.locationData.isEndOfPage();
        const elementLocatedAtBottom = elementLocation === 'bottom';
        const conditionsIfElementOnBottom = elementLocatedAtBottom && offset > percentOfOffset;
        const conditionsIfElementOnTop = !elementLocatedAtBottom && 100 - offset < percentOfOffset;
        const conditionForInaccessibleElement = elementLocatedAtBottom && isEndOfPage;
        const conditionsForExecuteListener = conditionsIfElementOnBottom
            || conditionsIfElementOnTop || conditionForInaccessibleElement;

        if (conditionsForExecuteListener) {
            this.executeListener({ element, classNames, queue, middlewareContainer, animationend });
            const currentListener = this.eventsStorage.getCurrentListener(eventNumber);
            window.removeEventListener('scroll', currentListener);
        }
    }

    public executeListener(listenerParams: ListenerParams): void {
        const { element, classNames, queue, middlewareContainer, animationend } = listenerParams;
        const { middleware, middlewares, elements } = middlewareContainer;
        let firstRun = true;
        let currentClassNames = classNames;
        element.classList.add(...currentClassNames.split(' '));
        middleware.applyMiddleware('beforeAnimation', middlewares, elements);

        const animationEndWrapper = (event: AnimationEvent) => {
            if (firstRun) {
                middleware.applyMiddleware('afterAnimation', middlewares, elements);
                firstRun = false;
            }

            if (!queue.length && animationend) {
                middleware.applyMiddleware('end', middlewares, elements);
                animationend(event)(element);
            }

            if (queue.length) {
                const [[ nextClassName, timer ]] = queue.splice(0, 1);

                setTimeout(() => {
                    element.classList.remove(currentClassNames);
                    element.classList.add(nextClassName);
                    currentClassNames = nextClassName;
                }, timer);
            }
        };

        element.addEventListener('animationend', animationEndWrapper);
    }
}
