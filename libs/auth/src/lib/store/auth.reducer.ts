import {createReducer, on} from '@ngrx/store';
import {IUser} from '../interfaces/user.interface';
import {AuthroizationFailed, AuthroizationStarted, AuthroizationSucceed} from './auth.action';

export type IAuthState = IUser

export const initialState: IAuthState = {
  id: "",
  authorized: false,
  loading: false,
  name: "",
  xsrf: "",
  roles: []
};

export const authReducer = createReducer(
  initialState,
  on(AuthroizationStarted, (state) => ({...state, loading: true})),
  on(AuthroizationSucceed, (state, {user}) => ({...state, ...user, loading: false})),
  on(AuthroizationFailed, _ => ({...initialState}))
);
