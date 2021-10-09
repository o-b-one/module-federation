import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../bootstrap/services/user.service";
import {IUser} from "@mfe/auth";
import {Observable} from "rxjs";

@Component({
  selector: 'mfe-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  public readonly defaultUrl: string = 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png';
  private _userId: string;
  user$: Observable<IUser | null>;
  size: 'small' | 'large' = 'large';

  @Input()
  set userId(id: string) {
    this._userId = id;
    this.user$ = this.userService.getUser(this.userId);
  }
  get userId(){
    return this._userId;
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
