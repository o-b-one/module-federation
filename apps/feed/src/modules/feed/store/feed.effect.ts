import {createEffect, Actions, ofType} from '@ngrx/effects';
import { of } from 'rxjs';
import {catchError, filter, map, skipUntil, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from "@angular/core";
import {FeedFetchFailed, FeedFetchStarted, FeedFetchSucceed} from "./feed.action";
import {FeedService} from "../services/feed.service";
import {select, Store} from "@ngrx/store";
import {IStateWithFeedFeature, selectFeedFeature} from "./feed.selector";

@Injectable({
  providedIn: 'root'
})
export class FeedEffect{

    feed$ = createEffect(() => this.actions$.pipe(
        ofType(FeedFetchStarted),
        withLatestFrom(this.store.pipe(select(selectFeedFeature))),
        filter(([_, store]) => store.loading),
        switchMap(() => this.feedService.fetchFeed()),
        map(feed => FeedFetchSucceed(feed)),
        catchError(() => of(FeedFetchFailed()))
      )
    );

  constructor(
    private actions$: Actions,
    private store: Store<IStateWithFeedFeature>,
    private feedService: FeedService,
  ) {}

}
