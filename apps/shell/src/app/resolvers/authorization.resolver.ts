import {Injectable} from "@angular/core";
import {AuthFacade, IUser} from "@mfe/auth";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthorizationResolver implements Resolve<IUser> {

  constructor(private _authFacade: AuthFacade) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> | Promise<IUser> | IUser {
    return this._authFacade.authorize();
  }


}
