import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {IUser} from '../interfaces/user.interface';
import {AuthroizationStarted} from '../store/auth.action';
import {IStateWithAuthFeature, selectAuthFeature} from '../store/auth.selector';
import {filter, pluck} from "rxjs/operators";
import {IAuthState} from "../store/auth.reducer";
import {IAuthFacade} from "./auth-facade.interface";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class AuthFacade implements IAuthFacade {

  private authorizationTriggered = false;

  constructor(private _store: Store<IStateWithAuthFeature>) {
  }


  authorize(): Observable<IUser> {
    if(!this.authorizationTriggered) {
      this._store.dispatch(AuthroizationStarted());
      this.authorizationTriggered = true;
    }
    return this.getUser();
  }

  getUser(): Observable<IUser> {
    return this._store.select(selectAuthFeature).pipe(filter(state => !state.loading));
  }

  isAuthorized(): Observable<boolean> {
    return this.getUser().pipe(pluck('authorized'));
  }
}
