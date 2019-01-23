import { FormComponent } from './../fornecedor/form/form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalizadoRoutingModule } from './personalizado-routing.module';
import { PersonalizadoComponent } from './personalizado.component';

@NgModule({
  imports: [
    CommonModule,
    PersonalizadoRoutingModule,
  ],
  declarations: [
    PersonalizadoComponent,
    FormComponent,
  ],
  exports: [
    PersonalizadoComponent,
    FormComponent,
  ]
})
export class PersonalizadoModule { }
