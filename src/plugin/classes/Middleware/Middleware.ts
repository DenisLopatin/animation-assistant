import IMiddleware from './contract/IMiddleware';
import { middlewarePlaces, nodeIterable, middlewares as M } from '../../types';

export default class Middleware implements IMiddleware {
    applyMiddleware(place: middlewarePlaces, middlewares: M, elements: nodeIterable): void {
        middlewares.forEach(([ middlewarePlace, middleware ]) => middlewarePlace === place && middleware(elements));
    }
}
