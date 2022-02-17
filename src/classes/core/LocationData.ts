import ILocationDate from '../../interfaces/ILocationDate';

export default class LocationData implements ILocationDate {
    public getOffsetTop(element: HTMLElement): number {
        return element.getBoundingClientRect().top;
    }

    public getOffsetBottom(element: HTMLElement): number {
        return element.getBoundingClientRect().bottom;
    }

    public getPercentOfOffset(top: number): number {
        return Math.trunc((top / document.documentElement.clientHeight) * 100);
    }

    public getUserViewportAfterLoading(): number {
        return document.documentElement.clientHeight + window.scrollY;
    }

    public getLocationElementAfterLoading(element: HTMLElement): number {
        return this.isElementAtTheTop(element) ?
            this.getOffsetBottom(element) + window.scrollY :
            this.getOffsetTop(element) + window.scrollY;
    }

    public getMaxHeightOfPage(): number {
        return Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight,
        );
    }

    public isElementAtTheTop(element: HTMLElement): boolean {
        return window.scrollY < (this.getOffsetTop(element) + window.scrollY);
    }

    public isElementInViewImmediatelyAfterLoading(element: HTMLElement): boolean {
        const userViewingArea = this.getUserViewportAfterLoading();
        const areaElementLocation = this.getLocationElementAfterLoading(element);

        return (userViewingArea - areaElementLocation > 0) &&
            (userViewingArea - areaElementLocation <= document.documentElement.clientHeight);
    }

    public isEndOfPage(): boolean {
        const offsetTop = this.getOffsetTop(document.documentElement);
        const maxHeightOfPage = this.getMaxHeightOfPage();
        const clientHeight = document.documentElement.clientHeight;
        const documentElementOffsetTop = (maxHeightOfPage - clientHeight) * -1;

        return offsetTop === documentElementOffsetTop;
    }
}
