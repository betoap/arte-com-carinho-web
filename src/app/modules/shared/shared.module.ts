import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CustomSelectboxComponent } from './forms/custom-selectbox/custom-selectbox.component';

// ngrx
import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
import { SharedReducers, SharedEffects } from './index';
import { CustomFormsModule } from './forms/customforms.module';

/** I18N **/
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// components
import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { ListComponent } from './list-component/list-component.component';
import { CardContentComponent } from './card/card-content/card-content.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NotifyComponent } from './notify/notify.component';
import { LoadingComponent } from './loading/loading.component';
import { DynamicComponentLoaderModule } from './../core/dynamic-component-loader/dynamic-component-loader.module';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CustomFormsModule,
    DynamicComponentLoaderModule.forChild([
      LoadingComponent,
      ModalComponent,
    ]),
    // StoreModule.forFeature( 'shared', SharedReducers ),
    // EffectsModule.forFeature( SharedEffects ),
  ],
  declarations: [
    CardComponent,
    TableComponent,
    ListComponent,
    CustomSelectboxComponent,
    CardContentComponent,
    CarouselComponent,
    NotifyComponent,
    LoadingComponent,
    ModalComponent,
  ],
  exports: [
    CustomFormsModule,
    CardComponent,
    TableComponent,
    ListComponent,
    CustomSelectboxComponent,
    CardContentComponent,
    CarouselComponent,
    NotifyComponent,
    LoadingComponent,
    ModalComponent,
  ],
  entryComponents: [
    CardComponent,
    CarouselComponent,
    NotifyComponent,
    LoadingComponent,
    ModalComponent,
  ],
})
export class SharedModule { }
