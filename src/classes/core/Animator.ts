import {animationend} from '../../types';
import Listeners from '../abstract/Listeners';
import Playback from './Playback';
import IAnimator from '../../interfaces/IAnimator';
import ILocationDate from '../../interfaces/ILocationDate';
import IEvent from '../../interfaces/IEvent';
import IPlayback from '../../interfaces/IPlayback';

export default class Animator extends Listeners implements IAnimator {
    constructor(
        protected readonly elements: NodeListOf<HTMLElement>,
        protected readonly stop: boolean,
        protected readonly storage: IEvent,
        protected readonly support: ILocationDate,
        protected readonly queue: [string, number][] = [],
        protected currentClass: string = '',
        protected defer: boolean = false,
        protected timeouts: {[key: number]: ReturnType<typeof setTimeout>} = {},
    ) {
        super(elements, stop, storage, support);
    }

    public setAnimation(offset: number, name: string, animationend?: animationend): IPlayback {
        const callback = (element: HTMLElement): void => {
            const isElementAtTheTop = this.support.isElementAtTheTop(element);
            const shouldAnimateElementNow = this.support.isElementInViewImmediatelyAfterLoading(element);
            const eventNumber = this.storage.getEventNumber();

            const listener = () => (
                this.createListener(element, offset, isElementAtTheTop, eventNumber, animationend)
            );

            if (shouldAnimateElementNow && !this.stop) {
                setTimeout(this.executeListener.bind(this), 0, element, animationend);
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

        return new Playback(this.elements, this.queue, this.currentClass);
    }
}
