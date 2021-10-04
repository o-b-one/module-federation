import {Observable} from "rxjs";
import {IAuthState} from "../store/auth.reducer";

export interface IAuthFacade{
  authorize(): Observable<IAuthState>;
  isAuthorized(): Observable<boolean>;
  getActiveUser(): Observable<IAuthState>;
  logout(): void;
}
