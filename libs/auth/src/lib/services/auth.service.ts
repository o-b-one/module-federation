import {Injectable} from "@angular/core";
import {Observable, of, throwError} from "rxjs";
import {IUser} from "@mfe/auth";
import {switchMap} from "rxjs/operators";
import {USERS} from "../../../../../mocks/users.mock";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly testAuthorizationKey = 'test_is_authorized'


  public isAuthorized(): Observable<boolean> {
    return of(!!localStorage.getItem(this.testAuthorizationKey));
  }

  public authorizeUser(): Observable<IUser> {
    return this.isAuthorized().pipe(
      switchMap(authorized => {
        const user = USERS.find(u => u.id === '1');
        return authorized
          ? of({
            ...user as IUser,
            ...{
              authorized: true,
              xsrf: 'noWayThisIsXSRFToken',
            }
          })
          : throwError('NOT_AUTHORIZED');
      })
    )

  }

  public logout(): void {
    localStorage.removeItem(this.testAuthorizationKey);
  }

}
