import { Injectable, NgZone } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { switchMap, mergeMap } from 'rxjs/operators';
import { Observable, of, timer } from 'rxjs';

import { NotifyAction, NotifyAdd, NotifyRemove } from './../actions';

@Injectable({
  providedIn: 'root'
})
export class NotifyEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly zone: NgZone
  ) { }

  @Effect()
  loadBrands$: Observable<Action> = this.actions$
    .pipe(
    ofType<NotifyAdd>(NotifyAction.NOTIFY_ADD),
      mergeMap( action => {
        if ( !action.payload.timeout ) { return of( null ); }
        return timer( action.payload.timeout )
          .pipe(
            switchMap( (time) => {
              return of(new NotifyRemove( action.payload )) ;
            })
          );
      })
    );
}
