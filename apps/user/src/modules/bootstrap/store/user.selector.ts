
import { createSelector } from '@ngrx/store';
import {IUserState, storeKey} from "./user.reducer";


export interface IStateWithUserFeature {[storeKey]:  IUserState};

export const selectUserFeature = (state: IStateWithUserFeature ) => state[storeKey];

export const getUser = (id: string) => createSelector(selectUserFeature, state => state.entities[id] );
