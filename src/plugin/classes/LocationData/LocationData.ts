import ILocationDate from './contract/ILocationDate';

export default class LocationData implements ILocationDate {
    public isElementInViewImmediatelyAfterLoading(element: Element): boolean {
        const userViewingArea = this.getUserViewportAfterLoading();
        const areaElementLocation = this.getLocationElementAfterLoading(element);

        return (userViewingArea - areaElementLocation > 0) &&
            (userViewingArea - areaElementLocation <= document.documentElement.clientHeight);
    }

    public isEndOfPage(): boolean {
        const offsetTop = this.getOffsetTopBy(document.documentElement);
        const maxHeightOfPage = this.getMaxHeightOfPage();
        const { clientHeight } = document.documentElement;
        const documentElementOffsetTop = (maxHeightOfPage - clientHeight) * -1;

        return offsetTop === documentElementOffsetTop;
    }

    public getElementLocation(element: Element): 'top' | 'bottom' {
        return window.scrollY < (this.getOffsetTopBy(element) + window.scrollY) ? 'bottom' : 'top';
    }

    public getPercentOfOffsetByElement(location: 'top' | 'bottom', element: Element): number {
        return location === 'top' ?
            this.getPercentOfOffset(this.getOffsetBottomBy(element)) :
            this.getPercentOfOffset(this.getOffsetTopBy(element));
    }

    public getOffsetTopBy(element: Element): number {
        return element.getBoundingClientRect().top;
    }

    public getOffsetBottomBy(element: Element): number {
        return element.getBoundingClientRect().bottom;
    }

    public getPercentOfOffset(top: number): number {
        return Math.trunc((top / document.documentElement.clientHeight) * 100);
    }

    public getUserViewportAfterLoading(): number {
        return document.documentElement.clientHeight + window.scrollY;
    }

    public getLocationElementAfterLoading(element: Element): number {
        return this.getElementLocation(element) === 'bottom' ?
            this.getOffsetBottomBy(element) + window.scrollY :
            this.getOffsetTopBy(element) + window.scrollY;
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
}
