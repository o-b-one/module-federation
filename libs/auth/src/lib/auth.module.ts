import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './store/auth.reducer';
import { AuthEffect } from './store/auth.effect';
import { authFeatureKey } from './store/auth.selector';
import {AuthService} from "./services/auth.service";
import {catchError, take} from "rxjs/operators";
import {EMPTY} from "rxjs";

function initializeAuth(authService: AuthService) {
  return  () => authService.authorizeUser()
    .pipe(catchError(err => EMPTY),take(1))
    .toPromise();
}

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffect])
  ],
  providers: [
    { provide: APP_INITIALIZER,useFactory: initializeAuth, deps: [AuthService], multi: true}
  ]
})
export class AuthModule {}
