import {Component, Input, OnInit} from '@angular/core';
import {IUser} from "@mfe/auth";
import {Observable} from "rxjs";
import {IStateWithUserFeature} from "../../../bootstrap/store/user.selector";
import {Store} from "@ngrx/store";
import {UserFacade} from "../../../bootstrap/services/user.facade";

@Component({
  selector: 'mfe-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  public readonly defaultUrl: string = 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png';
  private _userId: string;
  user$: Observable<IUser | undefined | null>;

  @Input()
  size: 'small' | 'large' = 'large';

  @Input()
  set userId(id: string) {
    this._userId = id;
    this.user$ = this.userFacade.getUser(this.userId);
  }
  get userId(){
    return this._userId;
  }

  constructor(
    private store: Store<IStateWithUserFeature>,
    private userFacade: UserFacade,
  ) { }

  ngOnInit(): void {
  }

}
