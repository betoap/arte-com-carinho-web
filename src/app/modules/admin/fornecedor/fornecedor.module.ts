import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { FormComponent } from './form/form.component';
import { FornecedorComponent } from './fornecedor.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FornecedorRoutingModule,
    SharedModule,
  ],
  declarations: [
    FornecedorComponent,
    FormComponent
  ],
  exports: [
    FornecedorComponent,
    FormComponent
  ]
})
export class FornecedorModule { }
