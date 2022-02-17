import {playReturnType} from '../types';

export default interface IPlayback {
    play(name: string, timeout: number): playReturnType;
}
