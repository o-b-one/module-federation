import {createEffect, Actions, ofType} from '@ngrx/effects';
import { of } from 'rxjs';
import {catchError, filter, map, skipUntil, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {UserService} from "../services/user.service";
import {UserFetchFailed, UserFetchStarted, UserFetchSucceed} from "./user.action";
import {IStateWithUserFeature, selectUserFeature} from "./user.selector";

@Injectable({
  providedIn: 'root'
})
export class UserEffect{

    user$ = createEffect(() => this.actions$.pipe(
        ofType(UserFetchStarted),
        withLatestFrom(this.store.select(selectUserFeature)),
        map(([{ids}, state]) => {
          ids = ids.filter(id => !state.entities[id]);
          return [{ids}, state];
        }),
        filter(([{ids}, _]) => ids.length > 0),
        switchMap(([{ids}, state]) => this.userService.getUsers(ids as string[])),
        map(users => UserFetchSucceed({users})),
        catchError(() => of(UserFetchFailed()))
      )
    );

  constructor(
    private actions$: Actions,
    private store: Store<IStateWithUserFeature>,
    private userService: UserService,
  ) {}

}
