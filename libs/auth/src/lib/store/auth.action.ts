import { createAction, props } from '@ngrx/store';
import { IUser } from '../interfaces/user.interface';



export const AuthroizationStarted = createAction(
  '[Auth] Authroization Started'
);


export const AuthroizationFailed = createAction(
  '[Auth] Authroization Failed'
);


export const AuthroizationSucceed = createAction(
  '[Auth] Authroization Succeed',
  props<{ user: IUser }>()
);