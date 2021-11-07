import {Observable} from "rxjs";
import { IUser } from "@mfe/auth";
import {IApplicationFacade, ICRUDFacade} from "@mfe/sideload";
import {ExportedComponents} from "../../../../components";


export interface IUserFacade extends IApplicationFacade<ExportedComponents>{
  getActiveUser(): Observable<IUser>;

  getUser(id: string): Observable<IUser | null>;

  setUser(id: string, data: IUser): Observable<IUser | null>;

  logout(): void;
}
