import { NotifyInitial, NotifyState } from './../states';
import { NotifyAction, NotifyActions } from './../actions';

export function notifyReducer (
  state = NotifyInitial,
  action: NotifyActions
): NotifyState {

  switch ( action.type ) {
    case NotifyAction.NOTIFY_ADD:
      return {
        notifies: [
        ...state.notifies,
        action.payload
      ]};
    case NotifyAction.NOTIFY_REMOVE:
      return {
        notifies: state.notifies.filter( notify => notify.id !== action.payload.id )
      };
  }

  return state;
}
