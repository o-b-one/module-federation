import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../bootstrap/services/user.service";
import {IUser} from "@mfe/auth";
import {Observable} from "rxjs";
import {getUser, IStateWithUserFeature} from "../../../bootstrap/store/user.selector";
import {Store} from "@ngrx/store";
import {UserFetchStarted} from "../../../bootstrap/store/user.action";

@Component({
  selector: 'mfe-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  public readonly defaultUrl: string = 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png';
  private _userId: string;
  user$: Observable<IUser | undefined | null>;
  size: 'small' | 'large' = 'large';

  @Input()
  set userId(id: string) {
    this._userId = id;
    // this.store.dispatch(UserFetchStarted({ids: [id]}));
    // this.user$ = this.store.select(getUser(id));

    this.user$ = this.userService.getUser(this.userId);
  }
  get userId(){
    return this._userId;
  }

  constructor(
    private store: Store<IStateWithUserFeature>,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

}
