import {playReturnType} from '../../types';
import IPlayback from '../../interfaces/IPlayback';

export default class Playback implements IPlayback {
    constructor(
        private elements: NodeListOf<HTMLElement>,
        private queue: [string, number][],
        private currentClass: string,
    ) {
        this.queue = queue;
        this.currentClass = currentClass;
    }

    public play(name: string, timeout = 1000): playReturnType  {
        this.queue.push([name, timeout]);
        return Promise.resolve(this.play.bind(this));
    }
}
