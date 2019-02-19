import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';


/** ENVIRONMENT **/
import { environment } from '../../../environments/environment';

import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// NGRX implemets
import { AppEffects } from './store/effects/app.effects';
import { metaReducers } from './store/localStorage.config';
import { AppReducers } from './store/app.reducers';


/** PERSON MODEL **/
import { CustomSerializer } from './store/serializers';


/** I18N **/
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { translateLoaderAPP } from './../shared/utils/translate';

/** services */
import { SessionStorageService } from './storage/session-storage.service';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreRouterConnectingModule,
    StoreModule.forRoot( AppReducers, { metaReducers } ),
    EffectsModule.forRoot( AppEffects ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      serialize: true
    }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (translateLoaderAPP),
          deps: [HttpClient]
      },
      isolate: true
    })
  ],
  declarations: [],
  exports: [
    HttpClientModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-PT' },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    SessionStorageService,
  ],
  entryComponents: [
  ]
})
export class CoreModule { }
