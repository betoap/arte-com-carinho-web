import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// custom modules
import { DynamicComponentLoaderModule } from './dynamic-component-loader/dynamic-component-loader.module';

// auth
import { AuthGuard } from './auth-guard/auth-guard.service';
import { AuthService } from './authentication-service/authentication-service';

// components
import { NotFoundComponent } from './not-found/not-found.component';
import { DynamicComponent } from './dynamic-component-loader/dynamicComponent.utils';


const routes = [
  {
    componentsId: [
      'BlackoutComponent',
      'QuestionsComponent',
      'RiskSituationQuestionsComponent',
      'LackEnergyQuestionsComponent',
      'FlowSelectComponent',
      'LackEnergySelectionComponent',
      'LackEnergyHomeOnlyComponent',
      'LackEnergyHomeStreetComponent',
      'SuccessComponent',
      'ProtocolNoteReconnectComponent',
      'ClientConfirmationComponent',
      'LackBranchLightQuestionComponent',
      'ProtocolConfirmationComponent',
      'NotifyComponent'
    ],
    path: 'blackout',
    loadChildren: 'app/modules/blackout/blackout.module#BlackoutModule',
    canLoad: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    componentsId: [
      'FormComponent'
    ],
    path: 'admin',
    loadChildren: 'app/modules/admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: 'app/modules/login/login.module#LoginModule'
  },
  {
    path: 'reset-password',
    loadChildren: 'app/modules/reset/reset.module#ResetModule'
  },
  {
    componentsId: [
      'LoadingComponent',
      'MessageComponent',
      'CardComponent',
    ],
    path: 'home',
    loadChildren: 'app/modules/home/home.module#HomeModule',
    canLoad: [AuthGuard]
  },
  {
    componentsId: [
      'ClientFormComponent',
      'ProtocolDetailsComponent',
      'ClientCardNoteComponent',
      'ClientCardNotesWrapperComponent'
    ],
    path: 'client',
    loadChildren: 'app/modules/client/client.module#ClientModule',
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];


let dynamicComponents: Array<any> = [];
dynamicComponents = DynamicComponent.getComponents( routes );


@NgModule({
imports: [ReactiveFormsModule,
    RouterModule.forRoot( routes, { useHash: false } ),
    DynamicComponentLoaderModule,
    DynamicComponentLoaderModule.forRoot( dynamicComponents )
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard, AuthService]
})
export class CoreRoutingModule {}
