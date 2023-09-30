import IMiddleware from './contract/IMiddleware';
import { middlewarePlaces, nodeIterable, middlewares as M } from '../../types';

export default class Middleware implements IMiddleware {
    public async applyMiddleware(place: middlewarePlaces, middlewares: M, elements: nodeIterable|HTMLElement)
        : Promise<void> {
        for(const middlewareInfo of middlewares) {
            const [ middlewarePlace, middleware ] = middlewareInfo;

            if (middlewarePlace === place) {
                await middleware(elements);
            }
        }
    }
}
