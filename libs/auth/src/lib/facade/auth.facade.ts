import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AuthorizationStarted} from '../store/auth.action';
import {IStateWithAuthFeature, selectAuthFeature} from '../store/auth.selector';
import {filter, map, pluck, switchMap, tap} from "rxjs/operators";
import {IAuthState} from "../store/auth.reducer";
import {IAuthFacade} from "./auth-facade.interface";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthFacade implements IAuthFacade {
  private authorizationTriggered = false;

  constructor(private _store: Store<IStateWithAuthFeature>,
              private router: Router,
              private authService: AuthService) {
  }

  authorize(forceAuthorization = false): Observable<IAuthState> {
    if(!this.authorizationTriggered && !forceAuthorization) {
      this._store.dispatch(AuthorizationStarted());
      this.authorizationTriggered = true;
    }
    return this.getActiveUser();
  }


  getActiveUser(): Observable<IAuthState> {
    return this._store.select(selectAuthFeature).pipe(filter(state => !state.loading));
  }

  isAuthorized(): Observable<boolean> {
    return this.getActiveUser().pipe(pluck('authorized'));
  }

  login(username: string, password: string): Observable<IAuthState> {
    return this.authService.login(username, password).pipe(
      switchMap( _ => this.authorize()),
      tap(_ => this.router.navigateByUrl('/feed', {replaceUrl: true}))
    );
  }

  logout() {
    this.authService.logout();
    return this.authorize(true).pipe(
      tap( _ => this.router.navigateByUrl('/login'))
    );

  }
}
