import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteComponent } from './site.component';
import { SiteRoutingModule } from './site-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SiteRoutingModule
  ],
  declarations: [
    SiteComponent
  ],
})
export class SiteModule { }
