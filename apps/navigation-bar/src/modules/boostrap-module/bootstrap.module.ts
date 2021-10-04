import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatTabsModule} from "@angular/material/tabs";
import {ReactiveComponentModule} from "@ngrx/component";
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import {AuthModule} from "@mfe/auth";
import {SideloadModule} from "@robust-micro-frontend/sideload";
import {MatMenuModule} from "@angular/material/menu";



@NgModule({
  declarations: [
    NavigationBarComponent
  ],
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
    MatMenuModule,
  ]
})
export class BootstrapModule { }
