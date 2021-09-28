import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router, RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {AuthFacade} from "@mfe/auth";
import {pluck, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthorizedGuard implements CanActivate {
  constructor(
    private authFacade: AuthFacade,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authFacade.authorize()
      .pipe(
        pluck('authorized'),
        tap(res => {
          if (!res && route?.routeConfig?.path !== 'login') {
            this.navigateByUrl('/login');
          }
        })
      );
  }

  protected navigateByUrl(path: string) {
    this.router.navigateByUrl(path);
  }
}
