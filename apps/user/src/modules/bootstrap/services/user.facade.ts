import {Injectable, ModuleWithProviders} from "@angular/core";
import {UserService} from "./user.service";
import {AuthFacade, IUser} from "@mfe/auth";
import {switchMap, take} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {IUserFacade} from "../interfaces/user-facade.interface";
import {environment} from "../../../../../shell/src/environments/environment";
import {ILoadComponentConfiguration} from "@mfe/sideload";
import {BootstrapDependenciesModule} from "../bootstrap-dependencies.module";
import {Store} from "@ngrx/store";
import {getUser, IStateWithUserFeature} from "../store/user.selector";

@Injectable({
  providedIn: 'root'
})
export class UserFacade implements IUserFacade{
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
    return this.authService.authorize();
  }

  getUser(id: string): Observable<IUser | null>{
    return this.store.select(getUser(id))
      .pipe(
        take(1),
        switchMap(user => {
          if(!user){
            return this.userService.getUser(id);
          }
          else{
            return of(user)
          }
        })
      )
  }

  setUser(id: string, data: IUser){
    return this.userService.setUser(id, data);
  }

  logout() {
    this.authService.logout();
  }

  getComponentLoadObject(component: string): ILoadComponentConfiguration {
    return {
      ...this.BASE_CONF as ILoadComponentConfiguration,
      componentName: component
    };
  }
}
