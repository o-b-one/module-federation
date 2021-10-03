import {Injectable} from "@angular/core";
import {Observable, of, throwError} from "rxjs";
import {IUser} from "../interfaces/user.interface";
import {switchMap} from "rxjs/operators";
import {USERS} from "../../../../../apps/user/src/modules/user-management/constants/users.mock";

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
        const user = USERS.find(u => u.id === '1111');
        return authorized
          ? of({
            ...user,
            ...{
              authorized: true,
              xsrf: 'noWayThisIsXSRFToken',
            },
            ...this.getStoredData()
          })
          : throwError('NOT_AUTHORIZED');
      })
    )

  }

  private getStoredData() {
    const storedData = localStorage.getItem(this.testAuthorizationKey);
    try {
      return storedData ? JSON.parse(storedData) : {}
    } catch (e) {
      return {};
    }
  }
}
