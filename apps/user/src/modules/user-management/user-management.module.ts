import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './components/management/management.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    ManagementComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
  ]
})
export class UserManagementModule { }
