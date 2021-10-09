import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {BootstrapModule} from "../modules/bootstrap/bootstrap.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    BootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
