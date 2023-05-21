import IMiddleware from '../classes/Middleware/contract/IMiddleware';
import { middlewares as M, nodeIterable } from '../types';

export interface MiddlewareContainer {
    middleware: IMiddleware;
    middlewares: M;
    elements: nodeIterable;
}
