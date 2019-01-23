import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalizadoComponent } from './personalizado.component';
import { FormComponent } from './../fornecedor/form/form.component';

const routes: Routes = [
  { path: '', component: PersonalizadoComponent },
  { path: 'cadastro', component: FormComponent},
  { path: 'editar/:id', component: FormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalizadoRoutingModule { }
