
import { createSelector } from '@ngrx/store';
import { IUser } from '../interfaces/user.interface';
import { IAuthState } from './auth.reducer';

export const authFeatureKey = 'auth'

export interface IStateWithAuthFeature {[authFeatureKey]:  IAuthState};

export const selectAuthFeature = (state: IStateWithAuthFeature ) => state[authFeatureKey];

export const isAuthorized = createSelector(selectAuthFeature, state => state.authorized || false);
