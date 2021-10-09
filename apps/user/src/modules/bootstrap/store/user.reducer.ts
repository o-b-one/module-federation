import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {IUser} from "@mfe/auth";
import {createReducer, on} from "@ngrx/store";
import {UpdateUsers, UserFetchSucceed} from "./user.action";

export type IUserState = EntityState<IUser>;

export const storeKey = 'users';
const userEntityAdapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();

const initialState = userEntityAdapter.getInitialState();
export const userReducer = createReducer(initialState,
  on(UserFetchSucceed, (state, { users }) => {
    return userEntityAdapter.addMany(users, state);
  }),
  on(UpdateUsers, (state, { users }) => {
    return userEntityAdapter.setAll(users, state);
  })
);
