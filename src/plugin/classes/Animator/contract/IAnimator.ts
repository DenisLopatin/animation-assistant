import IPlayback from '../../Playback/contract/IPlayback';
import { animationendCallback, middlewarePlaces, nodeIterable } from '../../../types';

export default interface IAnimator {
    setAnimation(offset: number, name: string, animationend?: animationendCallback, playback?: [string, number][])
        : Promise<IPlayback>;
    setMiddleware(place: middlewarePlaces, callback: (elements: nodeIterable|HTMLElement) => void): IAnimator;
}
