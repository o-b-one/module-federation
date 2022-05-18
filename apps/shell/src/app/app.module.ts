import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {EffectsModule} from "@ngrx/effects";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      maxAge: 50,
    }),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MatSlideToggleModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
