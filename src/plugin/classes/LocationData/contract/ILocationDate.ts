export default interface ILocationDate {
    isElementInViewImmediatelyAfterLoading(element: Element): boolean;
    isEndOfPage(): boolean;
    getPercentOfOffsetByElement(location: 'top' | 'bottom', element: Element): number;
    getUserViewportAfterLoading(): number;
    getOffsetTopBy(element: Element): number;
    getOffsetBottomBy(element: Element): number;
    getPercentOfOffset(top: number): number;
    getLocationElementAfterLoading(element: Element): number;
    getMaxHeightOfPage(): number;
    getElementLocation(element: Element): 'top' | 'bottom';
}
