
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// custom modules
import { DynamicComponentLoaderModule } from './modules/core/dynamic-component-loader/dynamic-component-loader.module';
import { DynamicComponent } from './modules/core/dynamic-component-loader/dynamicComponent.utils';

// auth
import { AuthGuard } from './modules/core/auth-guard/auth-guard.service';
import { AuthService } from './modules/core/authentication-service/authentication-service';

const routes = [
  { path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule' },
  { path: '', loadChildren: './modules/site/site.module#SiteModule' },
  {
    componentsId: [ 'LoadingComponent', 'CardComponent', 'ModalComponent' ],
    path: 'shared',
    loadChildren: './modules/shared/shared.module#SharedModule'
  },
];

let dynamicComponents: Array<any> = [];
dynamicComponents = DynamicComponent.getComponents( routes );

@NgModule({
  imports: [
    RouterModule.forRoot( routes, { useHash: false } ),
    DynamicComponentLoaderModule,
    DynamicComponentLoaderModule.forRoot( dynamicComponents )
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService]
})
export class AppRoutingModule { }
