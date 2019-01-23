import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FornecedorComponent } from './fornecedor.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', component: FornecedorComponent },
  { path: 'cadastro', component: FormComponent},
  { path: 'editar/:id', component: FormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule { }
