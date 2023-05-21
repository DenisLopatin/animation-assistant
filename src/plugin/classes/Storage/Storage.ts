import { ListenersStorage } from '../../interfaces';

export default abstract class Storage {
    public static listeners: ListenersStorage = {
        length: 0,
    };

    public static eventNumber(): number {
        Storage.listeners.length += 1;
        return Storage.listeners.length;
    }

    public static recordEvent(currentListener: () => void, count: number): void {
        Storage.listeners[count] = currentListener;
    }
}
