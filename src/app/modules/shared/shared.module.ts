import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule } from 'angular-6-datatable';
import { CustomSelectboxComponent } from './forms/custom-selectbox/custom-selectbox.component';

// ngrx
import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
import { SharedReducers, SharedEffects } from './index';
import { CustomFormsModule } from './forms/customforms.module';

/** I18N **/
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from './utils/translate';
import { CommonModule } from '@angular/common';

// components
import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { ListComponent } from './list-component/list-component.component';
import { CardContentComponent } from './card/card-content/card-content.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DataTableModule,
    CustomFormsModule,
    // StoreModule.forFeature( 'shared', SharedReducers ),
    // EffectsModule.forFeature( SharedEffects ),

    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      },
      isolate: true
    })
  ],
  declarations: [
    CardComponent,
    TableComponent,
    ListComponent,
    CustomSelectboxComponent,
    CardContentComponent,
    CarouselComponent
  ],
  exports: [
    CustomFormsModule,
    CardComponent,
    TableComponent,
    ListComponent,
    CustomSelectboxComponent,
    CardContentComponent,
    CarouselComponent,
  ],
  entryComponents: [
    CardComponent,
    CarouselComponent
  ],
})
export class SharedModule { }
