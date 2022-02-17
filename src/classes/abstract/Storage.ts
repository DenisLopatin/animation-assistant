import {listeners} from '../../types';

export default abstract class Storage {
    protected static listeners: listeners = {
        length: 0
    }

    protected static eventNumber(): number {
        Storage.listeners.length += 1;
        return Storage.listeners.length;
    }

    protected static recordEvent(currentListener: () => void, count: number): void {
        Storage.listeners[count] = currentListener;
    }
}
