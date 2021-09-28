import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthModule} from "@mfe/auth";
import {RouterModule} from "@angular/router";
import {ManagementComponent} from "../user-management/components/management/management.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule.forChild([
      {
        path: 'management',
        loadChildren: () => import('../user-management/user-management.module').then( m => m.UserManagementModule),
        component: ManagementComponent
      },
      {
        path: '**',
        redirectTo: 'management'
      }
    ])
  ]
})
export class BootstrapModule {
}
