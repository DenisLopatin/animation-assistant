export interface ListenersStorage {
    [key: number]: () => void, length: number;
}
