import { ActionReducerMap } from '@ngrx/store';
import { translateReducer } from './reducers';
import { appReducer } from './reducers';
import { resourceReducer } from './../resource';
import { AppStateUnion } from './states/app.state';

export const AppReducers: ActionReducerMap<AppStateUnion> = {
    app: appReducer,
    languages: translateReducer,
    resources: resourceReducer
};
