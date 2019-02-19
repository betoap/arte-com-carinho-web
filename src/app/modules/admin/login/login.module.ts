
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Componets person **/
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
