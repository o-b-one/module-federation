import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {UserFacade} from "user/public-api";
import {pluck, shareReplay} from "rxjs/operators";
import {IUserFacade, IUser} from '@mfe/user';

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

  ngOnInit() {
  }
}
