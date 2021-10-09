import {Component, Inject, Input, OnInit} from '@angular/core';
import {IFeedItem} from "../../interfaces/feed-item.interface";
import {UserFacade} from "user/public-api";
import {IUserFacade} from "@mfe/user";

@Component({
  selector: 'mfe-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss']
})
export class FeedItemComponent implements OnInit {

  @Input() item: IFeedItem;
  component = this.userFacade.getComponentLoadObject('UserInfoComponent');

  constructor(
    @Inject(UserFacade) private userFacade: IUserFacade
  ) { }

  ngOnInit(): void {
  }

}
