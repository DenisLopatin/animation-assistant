import Animator from './core/Animator';
import IEvent from '../interfaces/IEvent';
import ILocationDate from '../interfaces/ILocationDate';
import IAnimator from '../interfaces/IAnimator';
import IAnimationIO from '../interfaces/IAnimationIO';

export default class AnimationIO extends Animator implements IAnimationIO {
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

    public sequence(interval = 200): IAnimator {
        const delay = interval;
        this.elements.forEach((element) => {
            interval = delay;
            [...element.children].forEach((item) => {
                (item as HTMLElement).style.animationDelay = `${interval}ms`;
                interval += delay;
            });
        });

        return new Animator(this.elements, this.stop, this.storage, this.support);
    }
}
