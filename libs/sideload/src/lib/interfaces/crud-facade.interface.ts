import {Observable} from "rxjs";

export interface ICRUDFacade<T>{

  create(resource: T): Observable<T | null> | Promise<T | null> | T | null;

  createMany?(...resources: T[]): Observable<T[] | null> | Promise<T[] | null> | T[] | null;

  read(id: string): Observable<T> | Promise<T> | T;

  readMany?(...ids: string[]): Observable<T[] | null> | Promise<T[] | null> | T[] | null;

  search(params: Record<string, any>): Observable<T[] | null> | Promise<T[] | null> | T[] | null;

  update(id: string, resource: Partial<T>): Observable<T> | Promise<T> | T;

  updateMany?(ids: string[], resource: Partial<T>): Observable<T[] | null> | Promise<T[] | null> | T[] | null;

  delete(id: string): Observable<T> | Promise<T> | T;

  deleteMany?(...ids: string[]): Observable<T[] | null> | Promise<T[] | null> | T[] | null;

}
