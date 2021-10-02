import {Injectable} from "@angular/core";
import {USERS} from "../../user-management/constants/users.mock";
import {AuthFacade, IAuthState, IUser} from "@mfe/auth";
import {Observable, of} from "rxjs";
import {filter, map, shareReplay} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private activeUser$: Observable<IAuthState>;

  constructor(
    private authFacade: AuthFacade
  ) {
    this.activeUser$ = this.authFacade.getActiveUser().pipe(
      filter(u => u.authorized),
      shareReplay(1),
    );
  }


  getUser(id: string): Observable<IUser | null> {
    return of(this.findUser(id)).pipe(
      map((res) => (res ? {...res} : res))
    );
  }


  setUser(id: string, value: IUser): Observable<IUser | null> {
    return this.activeUser$.pipe(
      map(activeUser => {
        let isActiveUser = false;
        if (id === activeUser.id) {
          isActiveUser = true;
        }
        const user = this.findUser(id);
        return {user, isActiveUser};
      }),
      map(({user, isActiveUser}) => {
        if (user) {
          user = Object.assign({}, user, value);
          if (isActiveUser) {
            delete (user as any).xsrf;
            localStorage.setItem('test_is_authorized', JSON.stringify(user));
            this.authFacade.authorize(true);
          }
        }
        return user;
      })
    )

  }

  private findUser(id: string) {
    return USERS.find(u => u.id === id) || null;
  }
}
