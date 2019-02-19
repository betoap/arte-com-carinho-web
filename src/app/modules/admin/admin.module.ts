import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

/** I18N **/
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { translateLoaderAdmin } from './../shared/utils/translate';

/** Components person **/
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (translateLoaderAdmin),
          deps: [HttpClient]
      },
      isolate: true
    })
  ],
  exports: [
  ],
  declarations: [
    AdminComponent,
    HeaderComponent,
    MenuComponent
  ],
})
export class AdminModule { }
