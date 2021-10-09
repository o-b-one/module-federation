import { createAction, props } from '@ngrx/store';
import {IUser} from "../../../../../../libs/auth/src";



export const UserFetchStarted = createAction(
  '[User] Fetch Started',
  props<{ ids: string[] }>()
);


export const UserFetchFailed = createAction(
  '[User] Fetch Failed'
);


export const UserFetchSucceed = createAction(
  '[User] Fetch Succeed',
  props<{ users: IUser[] }>()
);


export const UpdateUsers = createAction(
  '[User] Update many',
  props<{ users: IUser[] }>()
);
