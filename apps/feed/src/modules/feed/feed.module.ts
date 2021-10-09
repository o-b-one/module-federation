import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeedComponent} from './components/feed/feed.component';
import {FeedItemComponent} from './components/feed-item/feed-item.component';
import {ReactiveComponentModule} from "@ngrx/component";
import {MatCardModule} from "@angular/material/card";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {FeedEffect} from "./store/feed.effect";
import {feedReducer} from "./store/feed.reducer";
import {feedFeatureKey} from "./store/feed.selector";
import {SideloadModule} from "@mfe/sideload";


@NgModule({
  declarations: [
    FeedComponent,
    FeedItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveComponentModule,
    StoreModule.forFeature(feedFeatureKey, feedReducer),
    EffectsModule.forFeature([FeedEffect]),
    MatCardModule,
    SideloadModule
  ],
  exports: [FeedComponent]
})
export class FeedModule {
}
