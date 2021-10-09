import {Injectable} from "@angular/core";
import {USERS} from "../../../../../../mocks/users.mock";
import {AuthFacade, IAuthState, IUser} from "@mfe/auth";
import {Observable, of} from "rxjs";
import {filter, map, shareReplay, switchMap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {IStateWithUserFeature} from "../store/user.selector";
import {UpdateUsers} from "../store/user.action";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private activeUser$: Observable<IAuthState>;

  constructor(
    private authFacade: AuthFacade,
    private store: Store<IStateWithUserFeature>
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
      switchMap(async activeUser => {
        let isActiveUser = false;
        if (id === activeUser.id) {
          isActiveUser = true;
        }
        const user = this.findUser(id);
        return {user: {...user, ...value}, isActiveUser};
      }),
      map(({user, isActiveUser}) => {
        this.store.dispatch(UpdateUsers({users: [user as IUser]}));
        if(isActiveUser) {
          this.authFacade.authorize(true);
        }
        return user;
      })
    )

  }

  getUsers(ids: string[]) {
    return of(USERS.filter(u => ids.includes(u.id)));
  }

  private findUser(id: string) {
    return USERS.find(u => u.id === id) || null;
  }
}
