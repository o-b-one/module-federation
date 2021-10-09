import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {UserFacade} from "user/public-api";
import {IUser, IUserFacade} from "@mfe/user";
import {pluck, shareReplay} from "rxjs/operators";

@Component({
  selector: 'mfe-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {


  activeUserId$: Observable<string>;
  activeUserName$: Observable<string>;
  userInfoConfiguration;

  constructor(@Inject(UserFacade) private userService: IUserFacade) {
    const activeUser$: Observable<IUser> = this.userService.getActiveUser().pipe(shareReplay(1));
    this.activeUserId$ = activeUser$.pipe(pluck('id'));
    this.activeUserName$ = activeUser$.pipe(pluck('name'));
    this.userInfoConfiguration = this.userService.getComponentLoadObject('UserInfoComponent');

  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout()
  }

}
