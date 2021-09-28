
import { createSelector } from '@ngrx/store';
import { IUser } from '../interfaces/user.interface';
import { IAuthState } from './auth.reducer';

export const authFeatureKey = 'auth'

export const selectAuthFeature = (state: {[authFeatureKey]:  IAuthState} ) => state[authFeatureKey];

export const isAuthorized = createSelector(selectAuthFeature, state => state.authorized)