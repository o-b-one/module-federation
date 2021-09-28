import { createEffect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { skipUntil, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AuthroizationFailed, AuthroizationStarted, AuthroizationSucceed } from './auth.action';

export class AuthEffect{
    
    authUser$ = createEffect(() => this.actions$.pipe(
        ofType(AuthroizationStarted),
        skipUntil(this.authService.isAuthorized())
        switchMap(() => this.authService.authorizeUser()),
        map(AuthroizationSucceed),
        catchError(() => of(AuthroizationFailed()))
      )
    );
 
  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}

}