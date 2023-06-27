import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from './store/user.reducer';
import * as fromUser from './store/user.reducer';

export interface AppState {
  users: fromUser.State;
}
export const reducers: ActionReducerMap<AppState> = {
  users: userReducer,
};
