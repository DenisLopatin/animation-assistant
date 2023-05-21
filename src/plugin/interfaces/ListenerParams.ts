import { animationendCallback } from '../types';
import { MiddlewareContainer } from './MiddlewareContainer';

export interface ListenerParams {
    element: HTMLElement;
    classNames: string;
    queue: [string, number][];
    middlewareContainer: MiddlewareContainer;
    animationend?: animationendCallback;
}
