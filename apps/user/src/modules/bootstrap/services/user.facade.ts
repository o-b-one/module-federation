import {Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {AuthFacade, IUser} from "@mfe/auth";
import {map, pluck, switchMap, take} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {IUserFacade} from "../interfaces/user-facade.interface";
import {environment} from "../../../../../shell/src/environments/environment";
import {ILoadComponentConfiguration} from "@mfe/sideload";
import {Store} from "@ngrx/store";
import {getUser, IStateWithUserFeature} from "../store/user.selector";
import {UserComponents} from "@mfe/user";
import {ExportedComponents} from "../../../../components";
// import * as pAPI from '../../../../public-api';

@Injectable({
  providedIn: 'root'
})
export class UserFacade implements IUserFacade {
  private readonly BASE_CONF: Partial<ILoadComponentConfiguration> = {
    remoteEntry: environment.micro_frontend.user,
    remoteName: 'user',
    exposedModule: './public-api',
  };

  constructor(
    private userService: UserService,
    private authService: AuthFacade,
    private store: Store<IStateWithUserFeature>,
  ) {
  }

  getActiveUser(): Observable<IUser> {
    return this.authService.authorize().pipe(
      pluck('id'),
      switchMap(id => {
        return this.getUser(id) as Observable<IUser>;
      })
    );
  }

  getUser(id: string): Observable<IUser | null> {
    return this.store.select(getUser(id))
      .pipe(
        switchMap(user => {
          return user
            ? of(user as IUser)
            : this.userService.getUser(id);
        }),
        map((user) => {
          // this.transformUserName(user);
          return user;
        })
      )
  }

  setUser(id: string, data: IUser) {
    return this.userService.setUser(id, data);
  }

  logout() {
    this.authService.logout();
  }

  getComponentLoadObject(component: keyof ExportedComponents): ILoadComponentConfiguration {
    return {
      ...this.BASE_CONF as ILoadComponentConfiguration,
      componentName: component
    };
  }


  private transformUserName(user: IUser | null){
    if(user) {
      user.name = user.name.toUpperCase();
    }
  }
}
