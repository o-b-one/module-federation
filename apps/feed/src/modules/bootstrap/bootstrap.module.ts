import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {FeedComponent} from "../feed/components/feed/feed.component";
import {FeedModule} from "../feed/feed.module";
import {FeedResolver} from "../feed/services/feed.resolver";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeedModule,
    RouterModule.forChild([{
      path: '',
      resolve: {
        feed: FeedResolver
      },
      component: FeedComponent
    }])
  ]
})
export class BootstrapModule { }
