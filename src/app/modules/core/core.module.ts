import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';

/** ENVIRONMENT **/
import { environment } from '../../../environments/environment';

// import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

/** INTERCEPTOR **/
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptors';
import { SharedModule } from '../shared/shared.module';


/** PERSON CUSTOM **/
import { NotFoundComponent } from './not-found/not-found.component';

/** PERSON MODEL **/
import { CustomSerializer } from './store/serializers';
import { createTranslateLoader } from './../shared/utils/translate';

/** I18N **/
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

/** Log & Error Handling **/
// import { CustomErrorHandler } from './log/custom-error-handler';
// import { LogService } from './log/log.service';
// import { LogApiService } from './log/log.api.service';

/** services */
import { SessionStorageService } from './storage/session-storage.service';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    CommonModule,
    // StoreRouterConnectingModule,
    // StoreModule.forRoot( AppReducers, { metaReducers } ),
    // EffectsModule.forRoot( AppEffects ),
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25,
    //   logOnly: environment.production,
    //   // serialize: true
    // }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      },
      isolate: true
    })
  ],
  declarations: [],
  exports: [],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-PT' },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: Interceptor,
    //   multi: true
    // },
    // { provide: ErrorHandler, useClass: CustomErrorHandler },
    // LogService,
    // LogApiService,
    SessionStorageService,
  ],
  entryComponents: [
  ]
})
export class CoreModule { }
