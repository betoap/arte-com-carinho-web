import { Injectable, ViewContainerRef, ChangeDetectorRef } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { map, catchError, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


import { Notify, INotify, NotifyComponent } from './../../../../shared/notify';
import { LoadingComponent } from './../../../../shared/loading/loading.component';

import { ResourceService } from './../../services';
import { DynamicComponentLoader } from './../../../dynamic-component-loader/dynamic-component-loader.service';
import { DynamicComponent } from './../../../dynamic-component-loader/dynamicComponent.utils';

import {
  ResourceAction,
  ResourcePost,
  ResourceGet,
  ResourcePut,
  ResourceDelete,
  ResourceSuccess,
  ResourceFail
} from './../actions';


@Injectable({
  providedIn: 'root'
})
export class ResourceEffects {

  @Effect( )
  post$: Observable<Action> = this.actions$
    .pipe(
      ofType<ResourcePost>(ResourceAction.POST),
      mergeMap( async ( data ) => {
        data.payload['elementRefCreated'] = null;
        if ( data.payload.elementRef ) {
          data.payload['elementRefCreated'] = this.createLoader( data.payload.elementRef );
        }
        return { data };
      }),
      mergeMap (
        action => this.resourceService.post( action.data.payload )
          .pipe(
            map (
              ( result ) => new ResourceSuccess( result, action.data.payload )
            ),
            catchError( (error) => of( new ResourceFail( error, action.data.payload ) ) )
          )
      )
    );


  @Effect( )
  read$ = this.actions$
  .pipe(
    ofType<ResourceGet>(ResourceAction.GET),
    mergeMap( async ( data ) => {
      data.payload['elementRefCreated'] = null;
      if ( data.payload.elementRef ) {
        data.payload['elementRefCreated'] = this.createLoader( data.payload.elementRef );
      }
      return { data };
    }),
    mergeMap (
      action => this.resourceService.get( action.data.payload )
        .pipe(
          map (
            ( result ) =>  new ResourceSuccess( result, action.data.payload )
          ),
          catchError( (error) => of( new ResourceFail( error, action.data.payload ) ) )
        )
    )
  );

  @Effect( )
  put$: Observable<Action> = this.actions$
    .pipe(ofType<ResourcePut>(ResourceAction.PUT),
      mergeMap( async ( data ) => {
        data.payload['elementRefCreated'] = null;
        if ( data.payload.elementRef ) {
          data.payload['elementRefCreated'] = this.createLoader( data.payload.elementRef );
        }
        return { data };
      }),
      mergeMap (
        action => this.resourceService.put( action.data.payload )
          .pipe(
            map (
              ( result ) => new ResourceSuccess( result, action.data.payload )
            ),
            catchError( (error) => of( new ResourceFail( error, action.data.payload ) ) )
          )
      )
    );

  @Effect( )
  delete$: Observable<Action> = this.actions$
    .pipe(
      ofType<ResourceDelete>(ResourceAction.DELETE),
      mergeMap( async ( data ) => {
        data.payload['elementRefCreated'] = null;
        if ( data.payload.elementRef ) {
          data.payload['elementRefCreated'] = this.createLoader( data.payload.elementRef );
        }
        return { data };
      }),
      mergeMap (
        action => this.resourceService.delete( action.data.payload )
          .pipe(
            map (
              ( result ) => new ResourceSuccess( result, action.data.payload )
            ),
            catchError( (error) => of( new ResourceFail( error, action.data.payload ) ) )
          )
      )
    );

  @Effect({dispatch: false})
  success$: Observable<Action> = this.actions$
    .pipe(
    ofType<ResourceSuccess>(ResourceAction.SUCCESS),
    map( action => {
      if ( action.request['elementRefCreated'] ) {
        this.removeLoader( action.request['elementRefCreated'] );
      }
      return action.payload;
    })
  );

  @Effect({dispatch: false})
  fail$: Observable<Action> = this.actions$
    .pipe(
    ofType<ResourceFail>(ResourceAction.FAIL),
    map( action => {
      if ( action.request['elementRefCreated'] ) {
        this.removeLoader( action.request['elementRefCreated'] );
      }

      if ( action.payload.error.error ) {
        const _data = action.payload.error.error.standard.faultDetail;
        const _errors = _data.reduce( ( a, k ) => {
          a.push( `${k.text}` );
          return a;
          }, []).join('<br />') + '<br />';

        /**
         * Caso não seja declarado um showError, sempre mostrar o notify
        */
        const showError = ( action.request['showError'] !== undefined ) ? action.request['showError'] : true;

        if ( showError ) {
          const nt: INotify = new Notify( {
            theme: 'error',
            icon: 'fa-warning',
            title: 'Erro ao processar dados',
            content: _errors,
            timeout: 4,
            canClose: true
          });
          const el = document.body;
          this._dynamicComponentLoader.appendComponentTo( NotifyComponent, el, { notifies: [nt] });
        }
        return action.payload;
      }

    })
    );

  public factoryResolver;

  constructor(
    private readonly actions$: Actions,
    private resourceService: ResourceService,
    private _dynamicComponentLoader: DynamicComponentLoader
  ) {
  }

  private createLoader( _element: any ) {
    if ( !_element ) {
      return null;
    }
    return this._dynamicComponentLoader.appendComponentTo( LoadingComponent, _element.nativeElement, {});
  }

  private removeLoader( _element: any ) {
    setTimeout( () => {
      _element.remove();
    }, 0 );
  }

}
