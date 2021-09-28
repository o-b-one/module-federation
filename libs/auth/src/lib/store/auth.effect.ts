import {createEffect, Actions, ofType} from '@ngrx/effects';
import { of } from 'rxjs';
import {catchError, map, skipUntil, switchMap} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AuthroizationFailed, AuthroizationStarted, AuthroizationSucceed } from './auth.action';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthEffect{

    authUser$ = createEffect(() => this.actions$.pipe(
        ofType(AuthroizationStarted),
        switchMap(() => this.authService.authorizeUser()),
        map(user => AuthroizationSucceed({user})),
        catchError(() => of(AuthroizationFailed()))
      )
    );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}

}
