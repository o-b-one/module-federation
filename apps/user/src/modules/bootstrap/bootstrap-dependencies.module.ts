import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthModule} from "@mfe/auth";
import {RouterModule} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {storeKey, userReducer} from "./store/user.reducer";
import {EffectsModule} from "@ngrx/effects";
import {UserEffect} from "./store/user.effect";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(storeKey, userReducer),
    EffectsModule.forFeature([UserEffect])
  ]
})
export class BootstrapDependenciesModule {
}
