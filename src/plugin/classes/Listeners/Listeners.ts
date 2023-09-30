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
            void this.executeListener({ element, classNames, queue, middlewareContainer, animationend });
            const currentListener = this.eventsStorage.getCurrentListener(eventNumber);
            window.removeEventListener('scroll', currentListener);
        }
    }

    // eslint-disable-next-line max-lines-per-function
    public async executeListener(listenerParams: ListenerParams): Promise<void> {
        const { element, classNames, queue, middlewareContainer, animationend } = listenerParams;
        const { middleware, middlewares } = middlewareContainer;
        let firstRun = true;
        let currentClassNames = classNames;

        await middleware.applyMiddleware('beforeAnimation', middlewares, element);

        element.classList.add(...currentClassNames.split(' '));

        const animationEndWrapper = async(event: AnimationEvent) => {
            if (firstRun) {
                await middleware.applyMiddleware('afterAnimation', middlewares, element);
                firstRun = false;
            }

            if (!queue.length) {
                await middleware.applyMiddleware('end', middlewares, element);
                if (animationend) {
                    const callbackFromAnimationend = animationend(event);

                    // eslint-disable-next-line max-depth
                    if (callbackFromAnimationend && !(callbackFromAnimationend instanceof Promise)) {
                        callbackFromAnimationend(element);
                    }
                }
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

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        element.addEventListener('animationend', animationEndWrapper);
    }
}
