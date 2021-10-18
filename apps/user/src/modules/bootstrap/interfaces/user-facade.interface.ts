import {Observable} from "rxjs";
import { IUser } from "@mfe/auth";
import {ILoadComponentConfiguration} from "@mfe/sideload";


export interface IUserFacade {
  getActiveUser(): Observable<IUser>;

  getUser(id: string): Observable<IUser | null>;

  setUser(id: string, data: IUser): Observable<IUser | null>;

  logout(): void;

  getComponentLoadObject(component: string): ILoadComponentConfiguration;
}
