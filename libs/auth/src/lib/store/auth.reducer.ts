import {createReducer, on} from '@ngrx/store';
import {IUser} from '../interfaces/user.interface';
import {AuthorizationFailed, AuthorizationStarted, AuthorizationSucceed} from './auth.action';

export interface IAuthState extends IUser{
  authorized: boolean;
  loading?: boolean;
}

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
  on(AuthorizationStarted, (state) => ({...state, loading: true})),
  on(AuthorizationSucceed, (state, {user}) => ({...state, ...user, loading: false})),
  on(AuthorizationFailed, _ => ({...initialState}))
);
