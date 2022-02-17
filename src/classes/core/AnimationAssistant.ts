import Libraries from '../abstract/Libraries';
import Animator from './Animator';
import Events from './Events';
import LocationData from './LocationData';
import IAnimationAssistant from '../../interfaces/IAnimationAssistant';
import IAnimator from '../../interfaces/IAnimator';
import IAnimationIO from '../../interfaces/IAnimationIO';
import {info} from '../../types';
import AnimationIO from './../AnimationIO';

export default class AnimationAssistant extends Libraries implements IAnimationAssistant {
    constructor(
        protected readonly elements: NodeListOf<HTMLElement>,
        protected stop: boolean = false,
        protected library = '',
    ) {
        super(elements);
    }

    public addClasses(classes: string[]): IAnimationAssistant {
        this.elements.forEach((element) => {
            classes.forEach((className) => element.classList.add(className));
        });

        return this;
    }

    public hide(): IAnimationAssistant {
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

    public cancelOnStartScreen(): IAnimationAssistant {
        this.stop = true;
        return this;
    }

    public setLibrary(library = ''): IAnimationAssistant {
        this.library = library;
        this.elements.forEach((element) => {
            const prefix = this.getLibraryPrefix(this.library);
            if (prefix) {
                element.classList.add(prefix);
            }
        });

        return this;
    }

    public getInstance(): IAnimator {
        return new Animator(this.elements, this.stop, new Events, new LocationData);
    }

    public getAnimationIOInstance(): IAnimationIO {
        return new AnimationIO(this.elements, this.stop, new Events, new LocationData);
    }

    public static getInfo(): info {
        return {
            version: AnimationAssistant.version,
            support: AnimationAssistant.supports,
            git: 'https://github.com/DenisLopatin/animation-assistant',
            documentation: 'https://denislopatin.github.io/animation-assistant/index.html'
        };
    }
}
