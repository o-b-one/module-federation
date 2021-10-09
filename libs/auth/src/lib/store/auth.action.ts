import { createAction, props } from '@ngrx/store';
import { IUser } from '../interfaces/user.interface';



export const AuthorizationStarted = createAction(
  '[Auth] Authorization Started'
);


export const AuthorizationFailed = createAction(
  '[Auth] Authorization Failed'
);


export const AuthorizationSucceed = createAction(
  '[Auth] Authorization Succeed',
  props<{ user: IUser }>()
);
