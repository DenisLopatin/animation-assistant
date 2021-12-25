import Storage from '../abstract/Storage';

export default class Events extends Storage implements IEvent {
    public getEventNumber(): number {
        return Events.eventNumber();
    }

    public getCurrentListener(currentListener: number): EventListener {
        return Events.listeners[currentListener] as EventListener;
    }

    public setRecordEvent(currentListener: () => void, count: number): void {
        Events.recordEvent(currentListener, count);
    }
}