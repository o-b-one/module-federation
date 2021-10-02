import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BootstrapModule} from "../modules/boostrap-module/bootstrap.module";
import {AppComponent} from "./app.component";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot([], {initialNavigation: 'enabledBlocking'}),
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    BootstrapModule
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  providers: [],
})
export class AppModule {}
