import IAnimator from './IAnimator';

export default interface IAnimationIO extends IAnimator {
    sequence (interval: number): IAnimator;
}
