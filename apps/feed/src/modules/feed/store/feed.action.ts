import { createAction, props } from '@ngrx/store';
import {IFeedItem} from "../interfaces/feed-item.interface";



export const FeedFetchStarted = createAction(
  '[Feed] Fetch Started'
);


export const FeedFetchFailed = createAction(
  '[Feed] Fetch Failed'
);


export const FeedFetchSucceed = createAction(
  '[Feed] Fetch Succeed',
  props<{ feed: IFeedItem[] }>()
);
