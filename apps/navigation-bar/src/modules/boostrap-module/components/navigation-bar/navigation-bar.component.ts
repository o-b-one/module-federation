import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IUser} from "@mfe/auth";
import {UserFacade} from "user/public-api";
import {pluck, shareReplay} from "rxjs/operators";
import {IUserFacade} from '@mfe/user';

@Component({
  selector: 'mfe-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  title = 'navigation-bar';
  links: Array<{ display: string, path: string }> = [{
    display: 'Feed',
    path: '/feed'
  }];

  activeUserId$: Observable<string>;
  activeUserName$: Observable<string>;

  constructor(@Inject(UserFacade) private userService: IUserFacade) {
    const activeUser$: Observable<IUser> = this.userService.getActiveUser().pipe(shareReplay(1));
    this.activeUserId$ = activeUser$.pipe(pluck('id'));
    this.activeUserName$ = activeUser$.pipe(pluck('name'));

  }

  ngOnInit() {
  }


  logout() {
    this.userService.logout()
  }
}
