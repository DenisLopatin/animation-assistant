interface IEvent {
    getEventNumber(): number;
    getCurrentListener(currentListener: number): EventListener;
    setRecordEvent(currentListener: () => void, count: number): void;
}
