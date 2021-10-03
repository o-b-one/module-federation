import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IUser} from "@mfe/auth";
import {UserFacade} from "user/public-api";
import {pluck, take} from "rxjs/operators";
import {IUserFacade} from "@mfe/user";

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
  userInfoComponent: any;

  constructor(@Inject(UserFacade) private userService: IUserFacade) {
    this.activeUserId$ = this.userService.getActiveUser().pipe(pluck('id'));
    this.userService.getActiveUser().pipe(take(1)).subscribe((data: IUser) =>{
      console.log('nav-bar', data);
    })

  }

  ngOnInit() {
    // this.userInfoComponent = await loadRemoteModule({
    //   remoteEntry: environment.micro_frontend.user,
    //   remoteName: 'user',
    //   exposedModule: './public-api'
    // }).then(({UserInfoComponent}) => UserInfoComponent);
  }
}
