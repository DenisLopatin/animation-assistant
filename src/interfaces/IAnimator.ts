import IPlayback from './IPlayback';

export default interface IAnimator {
    setAnimation(offset: number, name: string, animationend?: (event: AnimationEventInit) => (target: HTMLElement) => void): IPlayback;
}
