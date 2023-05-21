import IPlayback from '../../Playback/contract/IPlayback';
import { animationendCallback, nodeIterable } from '../../../types';

export default interface IAnimator {
    setAnimation(offset: number, name: string, animationend?: animationendCallback): IPlayback;
    setMiddleware(place: string, callback: (elements: nodeIterable) => void): IAnimator;
}
