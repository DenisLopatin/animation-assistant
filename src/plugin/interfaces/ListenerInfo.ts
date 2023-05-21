import { ListenerParams } from './ListenerParams';

export interface ListenerInfo extends ListenerParams {
    offset: number;
    elementLocation: 'top' | 'bottom';
    eventNumber: number;
}
