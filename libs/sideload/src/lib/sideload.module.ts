import { NgModule } from '@angular/core';
import { SideloadComponent } from './sideload.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    SideloadComponent
  ],
  imports: [
    RouterModule
  ],
  exports: [
    SideloadComponent
  ]
})
export class SideloadModule { }
