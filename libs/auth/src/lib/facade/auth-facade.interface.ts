import {Observable} from "rxjs";
import {IUser} from "../..";

export interface IAuthFacade{
  authorize(): Observable<IUser>;
  isAuthorized(): Observable<boolean>;
  getUser(): Observable<IUser>;
}
