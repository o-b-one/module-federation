import {createReducer, on} from '@ngrx/store';
import {IFeedItem} from "../interfaces/feed-item.interface";
import {FeedFetchFailed, FeedFetchStarted, FeedFetchSucceed} from "./feed.action";

export interface IFeedState {
  data: IFeedItem[];
  loading: boolean;
}

export const initialState: IFeedState = {
  data: [],
  loading: false
};

export const feedReducer = createReducer(
  initialState,
  on(FeedFetchStarted, (state) => ({...state, loading: true})),
  on(FeedFetchSucceed, (state, feed) => ({...state, ...{data: feed.feed}, loading: false})),
  on(FeedFetchFailed, _ => ({...initialState}))
);
