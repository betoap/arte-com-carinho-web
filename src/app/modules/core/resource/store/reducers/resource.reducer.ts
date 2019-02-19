import { ResourceState, ResourceInitial } from '../states';
import { ResourceActions, ResourceAction } from '../actions';

export function resourceReducer( state = ResourceInitial, action: ResourceActions ): ResourceState {
  switch ( action.type ) {
    case ResourceAction.POST:
    case ResourceAction.PUT:
    case ResourceAction.DELETE:
    case ResourceAction.GET:
      return {
        ...state,
        loading: true,
        loaded: false,
        identity: action.payload.identity,
        data: [],
        error: null,
      };
    case ResourceAction.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        identity: action.request.identity,
        data: action.payload,
        error: null
      };
    case ResourceAction.FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        identity: action.request.identity,
        data: action.request,
        error: action.payload,
      };
    default:
      return state;
  }
}
