import { INotify } from './../../notify.model';

export interface NotifyState {
  notifies: Array<INotify>;
}

export const NotifyInitial = {
  notifies: []
};

