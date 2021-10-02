import {Observable} from "rxjs";
import { IUser } from "@mfe/auth";


export interface IUserFacade {
  getActiveUser(): Observable<IUser>;

  getUser(id: string): Observable<IUser | null>;

  setUser(id: string, data: IUser): Observable<IUser | null>;
};
