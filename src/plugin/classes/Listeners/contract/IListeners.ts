import { ListenerInfo, ListenerParams } from '../../../interfaces';

export default interface IListeners {
    createListener(listenerInfo: ListenerInfo): void;
    executeListener(listenerParams: ListenerParams): Promise<void>;
}
