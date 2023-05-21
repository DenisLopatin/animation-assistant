import Playback from '../Playback/Playback';
import IPlayback from '../Playback/contract/IPlayback';
import IAnimator from './contract/IAnimator';
import IEvent from '../Events/contract/IEvent';
import ILocationDate from '../LocationData/contract/ILocationDate';
import IListeners from '../Listeners/contract/IListeners';
import IMiddleware from '../Middleware/contract/IMiddleware';
import { animationendCallback, middlewarePlaces, nodeIterable, middlewares as M } from '../../types';

export default class Animator implements IAnimator {
    private readonly payloadAnimationsQueue: [string, number][] = [];
    private readonly middlewares: M = [];

    // eslint-disable-next-line max-params
    constructor(
        private readonly elements: nodeIterable,
        private readonly listeners: IListeners,
        private readonly eventsStorage: IEvent,
        private readonly locationData: ILocationDate,
        private readonly middleware: IMiddleware,
    ) {}

    public setAnimation(offset: number, classNames: string, animationend?: animationendCallback): IPlayback {
        const manageListeners = (element: HTMLElement): void => {
            const queue = this.payloadAnimationsQueue;
            const { middleware } = this;
            const { middlewares } = this;
            const { elements } = this;
            const middlewareContainer = { middleware, middlewares, elements };
            const elementLocation = this.locationData.getElementLocation(element);
            const shouldAnimateElementNow = this.locationData.isElementInViewImmediatelyAfterLoading(element);
            const eventNumber = this.eventsStorage.getEventNumber();

            const listener = () => (
                this.listeners.createListener({
                    element, offset, elementLocation, eventNumber, classNames, queue, animationend, middlewareContainer,
                })
            );

            if (shouldAnimateElementNow) {
                this.listeners.executeListener({ element, classNames, queue, middlewareContainer, animationend });
            }

            if (!shouldAnimateElementNow) {
                this.eventsStorage.setRecordEvent(listener, eventNumber);
                window.addEventListener('scroll', listener);
            }
        };

        this.middleware.applyMiddleware('start', this.middlewares, this.elements);

        this.elements.forEach(manageListeners);
        return new Playback(this.payloadAnimationsQueue);
    }

    public setMiddleware(place: middlewarePlaces, callback: (elements: nodeIterable) => void): IAnimator {
        this.middlewares.push([ place, callback ]);
        return this;
    }
}