import { createReducer, on  } from '@ngrx/store';
import { IUser } from '../interfaces/user.interface';
import { AuthroizationFailed, AuthroizationSucceed } from './auth.action';

export interface IAuthState  extends IUser {
    authorized: boolean;
}

export const initialState: IAuthState = {
    id: "",
    authorized: false,
    name: "",
    xsrf: "",
    roles: []
};

export const authReducer = createReducer(
  initialState,
  on(AuthroizationSucceed, (state, { user }) => ( {...state, ...user, authorized: true})),
  on(AuthroizationFailed, _ => ({...initialState}))
);