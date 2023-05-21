import IPlayback from './contract/IPlayback';

export default class Playback implements IPlayback {
    constructor(private queue: [string, number][]) {}

    public play(name: string, timeout = 1000): IPlayback {
        this.queue.push([ name, timeout ]);
        return this;
    }
}
