import { Action } from '@ngrx/store';

import { INotify } from './../../notify.model';

export enum NotifyAction {
  NOTIFY_ADD = '[Notify] Add Notify',
  NOTIFY_REMOVE = '[Notify] Remove Notify'
}

export class NotifyAdd implements Action {
  public readonly type = NotifyAction.NOTIFY_ADD;
  public constructor( public payload: INotify ) { }
}

export class NotifyRemove implements Action {
  public readonly type = NotifyAction.NOTIFY_REMOVE;
  public constructor( public payload: INotify ) { }
}

export type NotifyActions = NotifyAdd | NotifyRemove;
