import { middlewarePlaces } from './middleware-places';
import { nodeIterable } from './node-iterable';

export type middlewares = [middlewarePlaces, (elements: nodeIterable) => void][];
