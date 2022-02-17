export type animationend = (event: AnimationEventInit) => (target: HTMLElement) => void;
export type listeners = {[key: number]: () => void, length: number};
export type libraries = {[key: string]: string};
export type info = {[key: string]: string | string[]};
export type playReturnType = Promise<(name: string, timeout?: number) => unknown> | Promise<unknown>;
