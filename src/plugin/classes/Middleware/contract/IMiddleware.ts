import { middlewarePlaces, nodeIterable, middlewares as M } from '../../../types';

export default interface IMiddleware {
    applyMiddleware(place: middlewarePlaces, middlewares: M, elements: nodeIterable): Promise<void>
}
