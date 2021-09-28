import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { IUser } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly testAuthroizationKey = 'test_is_authorized'
    
    
    public isAuthorized(): Observable<boolean> {
        return of(!!localStorage.getItem(this.testAuthroizationKey));
    }
    
    public authorizeUser(): Observable<IUser> {
        return this.isAuthorized()
        ? of({
            id: '1111',
            name: 'Orel Balilti',
            xsrf: 'noWayThisIsAXSRFToken',
            roles: ['adm', 'user', 'beta'],
        })
        : throwError('NOT_AUTHORIZED');        
    }
    
}