import { AppState, initialAppState } from '../states';
import { AppAction, AppActions } from '../actions';

export function appReducer ( state = initialAppState, action: AppActions ): AppState {
  switch ( action.type ) {
    case AppAction.APP_STARTED:
      return {
        status: AppAction.APP_STARTED
      };
    case AppAction.APP_STATUS_RENDER:
      return {
        status: action.payload
      };
    default:
      return state;
  }
}
