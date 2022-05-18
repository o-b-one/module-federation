import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {storeKey, userReducer} from "./store/user.reducer";
import {EffectsModule} from "@ngrx/effects";
import {UserEffect} from "./store/user.effect";
import {BootstrapDependenciesModule} from "./bootstrap-dependencies.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(storeKey, userReducer),
    EffectsModule.forFeature([UserEffect]),
    RouterModule.forChild([
      {
        path: 'management',
        loadChildren: () => import('../user-management/user-management.module').then( m => m.UserManagementModule),
      },
      {
        path: '**',
        redirectTo: 'management'
      }
    ]),
    BootstrapDependenciesModule
  ]
})
export class BootstrapModule {
}
