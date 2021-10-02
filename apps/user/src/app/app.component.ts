import { Component } from '@angular/core';
import {AuthFacade} from "@mfe/auth";

@Component({
  selector: 'robust-micro-frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'user';

  constructor(private authFacade: AuthFacade) {
        authFacade.authorize().subscribe();
  }

}
