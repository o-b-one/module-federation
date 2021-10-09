import {IFeedItem} from "../interfaces/feed-item.interface";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {FeedFetchStarted} from "../store/feed.action";
import {getFeed, IStateWithFeedFeature, selectFeedFeature} from "../store/feed.selector";
import {filter, map, take, withLatestFrom} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class FeedResolver implements Resolve<IFeedItem[]>{
  constructor(
    private store: Store<IStateWithFeedFeature>
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFeedItem[]> | Promise<IFeedItem[]> | IFeedItem[] {
    this.store.dispatch(FeedFetchStarted());
    return this.store.pipe(
      select(getFeed),
      withLatestFrom(this.store.pipe(select(selectFeedFeature))),
      filter(([feed, loading]) => !!loading),
      map(([feed]) => feed),
      take(1)
    );
  }

}
