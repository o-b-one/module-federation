import {Component, OnInit} from '@angular/core';
import {AuthFacade} from "@mfe/auth";
import {Observable} from "rxjs";
import {pluck, take} from "rxjs/operators";
import {loadRemoteModule} from "@angular-architects/module-federation";
import {environment} from "../../../shell/src/environments/environment";
import {UserFacade} from "../../../user/src/modules/bootstrap/services/user.facade";

@Component({
  selector: 'robust-micro-frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{

}
