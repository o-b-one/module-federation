import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatTabsModule} from "@angular/material/tabs";
import {ReactiveComponentModule} from "@ngrx/component";
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import {UserInfoModule} from "user/public-api";
import {AuthModule} from "../../../../../libs/auth/src";
import {SideloadModule} from "../../../../../libs/sideload/src";



@NgModule({
  declarations: [
    NavigationBarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    ReactiveComponentModule,
    MatTabsModule,
    AuthModule,
    RouterModule,
    SideloadModule,
    RouterModule.forChild([
      {
        path: '',
        component: NavigationBarComponent
      }
    ]),
    // UserInfoModule,
  ]
})
export class BootstrapModule { }
