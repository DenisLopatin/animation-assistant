export default interface ILocationDate {
    getOffsetTop(element: HTMLElement): number;
    getOffsetBottom(element: HTMLElement): number;
    getPercentOfOffset(top: number): number;
    getUserViewportAfterLoading(): number;
    getLocationElementAfterLoading(element: HTMLElement): number;
    getMaxHeightOfPage(): number;
    isElementAtTheTop(element: HTMLElement): boolean;
    isElementInViewImmediatelyAfterLoading(element: HTMLElement): boolean;
    isEndOfPage(): boolean;
}
