import Animator from './Animator';

export default class AnimationAssistant {
    constructor(
        protected readonly elements: NodeListOf<any>,
        protected library: string = '',
    ) {
        this.elements = elements;
    }

    public addClasses(classes: string[]): AnimationAssistant {
        this.elements.forEach((element) => {
            classes.forEach((className) => element.classList.add(className));
        });

        return this;
    }

    public hiddenLaunch(): AnimationAssistant {
        this.elements.forEach((element) => {
            element.style.visibility = 'hidden';
        });

        return this;
    }

    public adaptation(): AnimationAssistant {
        this.elements.forEach((element): void => {
            const parent: Element = element.parentElement;
            if (parent && parent.tagName !== 'BODY' && parent.tagName !== 'HTML') {
                element.parentElement.style.overflow = 'hidden';
            }
        });

        return this;
    }

    public setLibrary(library: string): Animator {
        this.library = library;
        this.elements.forEach((element) => {
            element.classList.add(this.getLibraryPrefix(this.library));
        });

        return this.prepare();
    }

    private getLibraryPrefix(library: string): string {
        return this.libraries[library] || '';
    }

    private libraries: {[key: string]: string} = {
        'animate.css': 'animate__animated',
        'css-animation': 'cssanimation',
        'css-shake': 'shake',
        'magic.css': 'magictime',
        'repaintless-css': 'element-animated',
        'tuesday-css': 'animated',
    };

    private prepare() {
        return new Animator(this.elements, [], '', false);
    }
}
