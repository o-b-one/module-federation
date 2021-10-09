
import { createSelector } from '@ngrx/store';
import {IFeedState} from "./feed.reducer";

export const feedFeatureKey = 'feed'

export interface IStateWithFeedFeature {[feedFeatureKey]:  IFeedState};

export const selectFeedFeature = (state: IStateWithFeedFeature ) => state[feedFeatureKey];

export const getFeed = createSelector(selectFeedFeature, state => state.data );
