export default class AnimationAssistant {
    private readonly selector: string;
    private readonly elements: NodeList;
    private library: string;
    private currentClasses: string;
    private animate: boolean;
    private readonly queue: Array<any>

    constructor(selector: string) {
        this.selector = selector;
        this.elements = AnimationAssistant.getElementsBySelector(this.selector);
        this.queue = [];
    }

    protected static libraries = {
        'animate.css': 'animate__animated',
        'css-animation': 'cssanimation',
        'css-shake': 'shake',
        'magic.css': 'magictime',
        'repaintless-css': 'element-animated',
        'tuesday-css': 'animated',
    };

    protected static listeners = {
        length: 0,
    };

    protected static counter(): number {
        AnimationAssistant.listeners.length += 1;
        return AnimationAssistant.listeners.length;
    }

    protected static addListener(fn: EventListener, currentListener: number): void {
        AnimationAssistant.listeners[currentListener] = fn;
    }

    protected static getElementsBySelector(selector: string): NodeList {
        return document.querySelectorAll(`.${selector}`);
    }

    protected static getOffsetTop(element: HTMLElement): number {
        return element.getBoundingClientRect().top;
    }

    protected static getOffsetBottom(element: HTMLElement): number {
        return element.getBoundingClientRect().bottom;
    }

    protected static getPercentOfOffset(top: number): number {
        return Math.trunc((top / document.documentElement.clientHeight) * 100);
    }

    protected static getMaxHeightOfPage(): number {
        return Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight,
        );
    }

    protected static isEndOfPage(): boolean {
        const offsetTop: number = AnimationAssistant.getOffsetTop(document.documentElement);
        const maxHeightOfPage: number = AnimationAssistant.getMaxHeightOfPage();
        const clientHeight: number = document.documentElement.clientHeight;
        const documentElementOffsetTop: number = (maxHeightOfPage - clientHeight) * -1;
        return offsetTop === documentElementOffsetTop;
    }

    protected static deferredPlay(element: Node, name: string, newName: string, timer: number) {
        (element as HTMLElement).classList.remove(name);
        (element as HTMLElement).classList.add(newName);
    }

    protected static scrollEventForElement(
        element: Node, offset: number, name: string, animationEnd: Function, elementOnTop: boolean, currentListener: number, queue: Array<any>
    ): void {
        const offsetTop: number = AnimationAssistant.getOffsetTop(element as HTMLElement);
        const offsetBottom: number = AnimationAssistant.getOffsetBottom(element as HTMLElement);
        const percentOfOffset: number = AnimationAssistant.getPercentOfOffset(offsetTop);
        const isEndOfPage: boolean = AnimationAssistant.isEndOfPage();
        const conditionsIfElementOnTop: boolean = elementOnTop && (offset > percentOfOffset || isEndOfPage);
        const conditionsIfElementOnBottom: boolean = !elementOnTop && offsetBottom > 0;
        const conditions: boolean = conditionsIfElementOnTop || conditionsIfElementOnBottom;
        const copyOfQueue: Array<any> = [...queue];
        let animationendFirstRun: boolean = true;
        let animationendCallback: undefined | Function;
        if (conditions) {
            (element as HTMLElement).classList.add(name);
            (element as HTMLElement).style.visibility = '';
            element.addEventListener('animationend',  () => {
                if (animationendFirstRun) {
                    animationendCallback = animationEnd();
                }

                if (!copyOfQueue.length && typeof animationendCallback === 'function') {
                    animationendCallback(element);
                }

                if (copyOfQueue.length) {
                    const [newName, timer] = copyOfQueue.shift();
                    setTimeout(() => {
                        (element as HTMLElement).classList.remove(name);
                        (element as HTMLElement).classList.add(newName);
                        name = newName;
                    }, animationendFirstRun ? 0 : timer);
                }

                animationendFirstRun = false;
            });
            window.removeEventListener('scroll', AnimationAssistant.listeners[currentListener]);
        }
    }

    protected static bindTop(parameters: Array<any>, currentListener: number, queue: Array<object>) {
        return AnimationAssistant.scrollEventForElement.bind(this, ...parameters, true, currentListener, queue);
    }

    protected static bindBottom(parameters: Array<any>, currentListener: number, queue: Array<object>) {
        return AnimationAssistant.scrollEventForElement.bind(this, ...parameters, false, currentListener, queue);
    }

    protected static getLibraryPrefix(library: string): string {
        return AnimationAssistant.libraries[library] || '';
    }

    public setLibrary(library: string): AnimationAssistant {
        if (typeof library !== 'string') {
            console.error(
                `The parameter 'library' must be a string. You pass ${typeof library}. 
                The setLibrary method have been ignored.`.replace(/([\t\r\n]|\s{2,})/g, '')
            );
            return this;
        }
        this.library = library;
        this.elements.forEach((element) => {
            (element as HTMLElement).classList.add(AnimationAssistant.getLibraryPrefix(this.library));
        });
        return this;
    }

    public addClasses(classes: Array<string>): AnimationAssistant {
        if (!Array.isArray(classes)) {
            console.error(
                `The parameter must be an array. You pass ${typeof classes}. Method addClasses have been ignored`
            );
            return this;
        }
        this.elements.forEach((element) => {
            classes.forEach((className) => (element as HTMLElement).classList.add(className));
        });
        return this;
    }

    public hiddenLaunch(): AnimationAssistant {
        this.elements.forEach((element) => {
            (element as HTMLElement).style.visibility = 'hidden';
        });
        return this;
    }

    public adaptEnvironment(config: Object = { exclude: [] }): AnimationAssistant {
        if (typeof config !== 'object') {
            console.error(
                `The parameter must be an object. You pass ${typeof config}. Method adaptEnvironment have been ignored`
            );
            return this;
        }
        if (config['exclude'] && !Array.isArray(config['exclude'])) {
            console.error(
                `The property config of object 'exclude' must be an array. 
                 You pass ${typeof config['exclude']}. Method adaptEnvironment have been ignored.`
                    .replace(/([\t\r\n]|\s{2,})/g, '')
            );
        }
        if (config['pass'] && typeof config['pass'] !== 'boolean') {
            console.error(
                `The property of config object 'pass' must be a string. You pass ${typeof config['pass']}. 
                Method adaptEnvironment will be work, but classes will not transferred.`
                    .replace(/([\t\r\n]|\s{2,})/g, '')
            );
        }
        const callback = (element: Node): void => {
            const parent: Node = element.parentElement;
            let classes: Array<string> = [];
            if (pass && exclude) {
                // @ts-ignore
                classes = [...(element as HTMLElement).classList]
                    .filter((_class) => !exclude.includes(_class));
            }
            if (pass && !exclude) {
                // @ts-ignore
                classes = [...(element as HTMLElement).classList];
            }
            if ((parent as HTMLElement).tagName === 'BODY') {
                const prev = (element as HTMLElement).previousElementSibling;
                const div = document.createElement('div');
                div.style.overflow = 'hidden';
                div.classList.add(...classes);
                div.append(element);
                prev ?
                    prev.insertAdjacentElement('afterend', div)
                    : document.body.insertAdjacentElement('afterbegin', div);
            } else {
                element.parentElement.classList.add(...classes);
                element.parentElement.style.overflow = 'hidden';
            }
        };
        const pass: string = config['pass'];
        const exclude: Array<string> = config['exclude'];
        this.elements.forEach(callback);
        return this;
    }

    public setAnimation(offset: number, name: string, animationEnd: Function = () => {}): AnimationAssistant | undefined {
        if (typeof Number(offset) !== 'number') {
            console.error(
                `The parameter 'offset' must be a number. You pass ${typeof offset}. The setAnimation method have been ignored.`
            );
            return;
        }
        if (typeof name !== 'string') {
            console.error(
                `The parameter 'name' must be a string. You pass ${typeof name}. The setAnimation method have been ignored.`
            );
            return;
        }
        if (typeof animationEnd !== 'function') {
            console.error(
                `The parameter 'animationEnd' must be a string. You pass ${typeof animationEnd}. 
                 The setAnimation method will work, but the callback will not work at the end of the animation.`
                    .replace(/([\t\r\n]|\s{2,})/g, '')
            );
        }
        const callback = (element: Node): void => {
            const offsetTop: number = AnimationAssistant.getOffsetTop((element as HTMLElement));
            const elementIsTop: boolean = window.pageYOffset < (offsetTop + window.pageYOffset);
            const currentListener: number = AnimationAssistant.counter();
            const parameters: Array<any> = [element, offset, name, animationEnd];
            const queue: Array<any> = this.queue;
            if (elementIsTop) {
                const bind = AnimationAssistant.bindTop(parameters, currentListener, queue);
                AnimationAssistant.addListener(bind, currentListener);
                window.addEventListener('scroll', bind);
            } else {
                const bind = AnimationAssistant.bindBottom(parameters, currentListener, queue);
                AnimationAssistant.addListener(bind, currentListener);
                window.addEventListener('scroll', bind);
            }
        };
        this.elements.forEach(callback);
        this.animate = true;
        return this;
    }

    public play(name: string, timeout: number = 1000): Promise<any> | undefined {
        if (typeof name !== 'string') {
            console.error(
                `The parameter 'name' must be a string. You pass ${typeof name}. The play method have been ignored.`
            );
            return;
        }
        if (typeof Number(timeout) !== 'number') {
            console.error(
                `The parameter 'timeout' must be a number. You pass ${typeof timeout}. 
                 The playback method will work, but the animations will change each other instantly.`
                    .replace(/([\t\r\n]|\s{2,})/g, '')
            );
        }
        const animationEnd = (element: Node, resolve: Function): void => {
            (element as HTMLElement).classList.remove(this.currentClasses);
            setTimeout(() => {
                resolve(this.play.bind(this));
            }, timeout);
        };
        const each = (element: Node, resolve: Function): void => {
            (element as HTMLElement).classList.add(name);
            this.currentClasses = name;
            element.addEventListener('animationend', () => animationEnd(element, resolve));
        };
        const callback = (resolve: Function): void => {
            this.elements.forEach((element) => each(element, resolve));
        };
        if (this.animate) {
            this.queue.push([name, timeout]);
            return Promise.resolve(this.play.bind(this));
        }
        return new Promise(callback);
    }
}
