import {ActivatedRouteSnapshot, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthorizedGuard} from "./authorized.guard";
import {map, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class NotAuthorizedGuard extends AuthorizedGuard {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return super.canActivate(route, state)
      .pipe(
        map(res => !res),
        tap(res => {
          if (!res) {
            this.navigateByUrl('/');
          }
        })
      );
  }

}
