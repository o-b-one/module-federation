import {Component, Inject, OnInit} from '@angular/core';
import {UserFacade} from 'user/public-api';
import {IUserFacade} from '@mfe/user';
import {pluck} from "rxjs/operators";
import {Observable} from "rxjs";
import {IFeedItem} from "../../interfaces/feed-item.interface";
import {select, Store} from "@ngrx/store";
import {IFeedState} from "../../store/feed.reducer";
import {getFeed, IStateWithFeedFeature} from "../../store/feed.selector";

@Component({
  selector: 'mfe-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  greeting: string;
  userName$: Observable<string>;
  feed$: Observable<IFeedItem[]>;
  component = this.userFacade.getComponentLoadObject('UserInfoComponent');


  constructor(
    private store: Store<IStateWithFeedFeature>,
    @Inject(UserFacade) private userFacade: IUserFacade
  ) {
    this.userName$ = this.userFacade.getActiveUser().pipe(pluck('name'));
    this.feed$ = this.store.pipe(select(getFeed));
  }

  ngOnInit(): void {
    this.setGreeting();
  }

  setGreeting() {
    const hour = new Date().getHours();
    this.greeting = 'Good ';
    if (hour > 0 && hour < 12) {
      this.greeting += 'Morning';
    } else if (hour >= 12 && hour < 18) {
      this.greeting += 'Afternoon';
    } else {
      this.greeting += 'Evening';
    }
  }


}
