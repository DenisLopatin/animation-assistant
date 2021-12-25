import Animator from './Animator';
import Events from './Events';
import LocationData from './LocationData';
import Libraries from "../abstract/Libraries";

export default class AnimationAssistant extends Libraries implements IAnimationAssistant {
    constructor(
        protected readonly elements: NodeListOf<HTMLElement>,
        protected library = '',
    ) {
        super();
        this.elements = elements;
    }

    public addClasses(classes: string[]): IAnimationAssistant {
        this.elements.forEach((element) => {
            classes.forEach((className) => element.classList.add(className));
        });

        return this;
    }

    public hiddenLaunch(): IAnimationAssistant {
        this.elements.forEach((element) => {
            element.style.visibility = 'hidden';
        });

        return this;
    }

    public adaptation(): IAnimationAssistant {
        this.elements.forEach((element): void => {
            const parent = element.parentElement;
            if (parent && parent.tagName !== 'BODY' && parent.tagName !== 'HTML') {
                element.parentElement.style.overflow = 'hidden';
            }
        });

        return this;
    }

    public setLibrary(library: string): IAnimator {
        this.library = library;
        this.elements.forEach((element) => {
            element.classList.add(this.getLibraryPrefix(this.library));
        });

        return new Animator(this.elements, new Events, new LocationData);
    }
}
