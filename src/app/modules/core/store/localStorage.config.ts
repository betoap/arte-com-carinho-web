import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';


export function localStorageSyncReducer(
  reducers: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [
      'ACC'
    ],
    rehydrate: true
  })(reducers);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];













