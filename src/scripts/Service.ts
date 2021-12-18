export default class Service {
    constructor(
        protected readonly elements: NodeListOf<HTMLElement>,
        protected readonly queue: [string, number][],
        protected currentClasses: string,
        protected animate: boolean,
    ) {
        this.elements = elements;
    }

    protected static listeners: {[key: number]: Function, length: number} = {
        length: 0
    }

    protected static eventNumber(): number {
        this.listeners.length += 1;
        return this.listeners.length;
    }

    protected static recordEvent(currentListener: Function, count: number): void {
        this.listeners[count] = currentListener;
    }

    protected getOffsetTop(element: HTMLElement): number {
        return element.getBoundingClientRect().top;
    }

    protected getOffsetBottom(element: HTMLElement): number {
        return element.getBoundingClientRect().bottom;
    }

    protected getPercentOfOffset(top: number): number {
        return Math.trunc((top / document.documentElement.clientHeight) * 100);
    }

    protected getMaxHeightOfPage(): number {
        return Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight,
        );
    }

    protected isEndOfPage(): boolean {
        const offsetTop = this.getOffsetTop(document.documentElement);
        const maxHeightOfPage = this.getMaxHeightOfPage();
        const clientHeight = document.documentElement.clientHeight;
        const documentElementOffsetTop = (maxHeightOfPage - clientHeight) * -1;
        return offsetTop === documentElementOffsetTop;
    }
}