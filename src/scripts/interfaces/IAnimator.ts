interface IAnimator {
    setAnimation(offset: number, name: string, animationend?: (event: AnimationEventInit) => (target: HTMLElement) => void): this;
    play(name: string, timeout: number): Promise<any>;
}
