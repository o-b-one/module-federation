import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "../login-page/components/login/login.component";
import {LoginPageModule} from "../login-page/login-page.module";
import {AuthModule} from "@mfe/auth";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginPageModule,
    AuthModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent
      }
    ])
  ]
})
export class BootstrapModule {
}
