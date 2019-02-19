import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginModule' },
  { path: '', component: AdminComponent, children: [
    { path: 'home', loadChildren: './home/home.module#HomeModule' },
    { path: 'personalizado', loadChildren: './personalizado/personalizado.module#PersonalizadoModule' },
    { path: 'fornecedor', loadChildren: './fornecedor/fornecedor.module#FornecedorModule' },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
