import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import {MatCardModule} from "@angular/material/card";
import {ReactiveComponentModule} from "@ngrx/component";



@NgModule({
  declarations: [
    UserInfoComponent
  ],
  exports: [
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    ReactiveComponentModule
  ]
})
export class UserInfoModule { }
