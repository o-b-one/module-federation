import {Observable} from "rxjs";
import {IAuthState} from "../store/auth.reducer";
import {IUser} from "../..";

export interface IAuthFacade{
  authorize(): Observable<IAuthState>;
  isAuthorized(): Observable<boolean>;
  getActiveUser(): Observable<IAuthState>;
  login(username: string, password: string): Observable<IUser>;
  logout(): void;
}
