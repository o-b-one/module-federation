import {createEffect, Actions, ofType} from '@ngrx/effects';
import { of } from 'rxjs';
import {catchError, map, skipUntil, switchMap} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AuthorizationFailed, AuthorizationStarted, AuthorizationSucceed } from './auth.action';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthEffect{

    authUser$ = createEffect(() => this.actions$.pipe(
        ofType(AuthorizationStarted),
        switchMap(() => this.authService.authorizeUser()),
        map(user => AuthorizationSucceed({user})),
        catchError(() => of(AuthorizationFailed()))
      )
    );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}

}
