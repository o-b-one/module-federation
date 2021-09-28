import { Store }  from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from './interfaces/user.interface';
import { AuthroizationStarted } from './store/auth.action';
import { selectAuthFeature } from './store/auth.selector';


export class AuthFacade{

    constructor ( private _store: Store<any>){

    }


    authorizeUser(): Observable<IUser> {
        this._store.dispatch(AuthroizationStarted());
        return this.getUser();
    }

    getUser(): Observable<IUser> {
        return this._store.select(selectAuthFeature);
    }

}