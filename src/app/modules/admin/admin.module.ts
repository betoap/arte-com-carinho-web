import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  exports: [
  ],
  declarations: [
    AdminComponent,
    HeaderComponent,
    MenuComponent,
  ],
})
export class AdminModule { }
