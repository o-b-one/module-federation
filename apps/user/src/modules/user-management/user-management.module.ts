import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './components/management/management.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {UserInfoModule} from "../user-info/user-info.module";
import {ReactiveComponentModule} from "@ngrx/component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  declarations: [
    ManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    MatFormFieldModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    UserInfoModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManagementComponent
      }
    ]),
    MatOptionModule,
    MatSelectModule,
    CommonModule
  ]
})
export class UserManagementModule { }
