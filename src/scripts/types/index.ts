export type animationend = (event: AnimationEventInit) => (target: HTMLElement) => void;
export type listeners = {[key: number]: () => void, length: number};
export type libraries = {[key: string]: string};
