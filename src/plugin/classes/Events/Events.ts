import Storage from '../Storage/Storage';
import IEvent from './contract/IEvent';

export default class Events implements IEvent {
    public getEventNumber(): number {
        return Storage.eventNumber();
    }

    public getCurrentListener(currentListener: number): EventListener {
        return Storage.listeners[currentListener];
    }

    public setRecordEvent(currentListener: () => void, count: number): void {
        Storage.recordEvent(currentListener, count);
    }
}
