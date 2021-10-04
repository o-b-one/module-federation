import {Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {AuthFacade, IUser} from "@mfe/auth";
import {switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {IUserFacade} from "../interfaces/user-facade.interface";

@Injectable({
  providedIn: 'root'
})
export class UserFacade implements IUserFacade{

  constructor(
    private userService: UserService,
    private authService: AuthFacade
  ) {
  }

  getActiveUser(): Observable<IUser> {
      // return of({
      //   id: '2222',
      //   name: 'testing',
      //   roles: ['tester'],
      // })
    return this.authService.authorize();
  }

  getUser(id: string): Observable<IUser | null>{
    return this.getActiveUser()
      .pipe(
        switchMap(user => {
          if(user.id === id){
            return of(user)
          }else{
            return this.userService.getUser(id);
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

}
