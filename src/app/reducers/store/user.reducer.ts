import { MOUser } from '../../models/user';
import { on, createReducer } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as actions from './user.actions';

interface EntityState<MOUser> {
  ids: string[];
  entities: { [_id: string]: MOUser };
}

export function selectUserId(a: MOUser): string {
  return a._id;
}
export interface State extends EntityState<MOUser> {
  selectedUserId: string | null;
  loading: boolean;

  //=> UI state props
  error: boolean;
  message: string;
  navTo?: string;   // navigation path after modal info
}

export const userAdapter: EntityAdapter<MOUser> = createEntityAdapter<MOUser>({
  selectId: selectUserId,
});

export const initialState: any = userAdapter.getInitialState({
  ids: [],
  selectedUserId: null,
  entities: {},
  loading: false,
  message: '',
  error: false,
  navTo: '',
});

export const userReducer = createReducer(
  initialState,
  on(actions.loadingAction, (state: State, action) => {

    return { ...state, loading: action.loading };
  }),
  on(actions.CreateUserSuccess, (state: State, { user }) => {
    const stateCopy = {
      ...state,
      loading: false,
      message: 'User Successfully added',
    };
    return userAdapter.addOne(user, stateCopy);
  }),
  on(actions.UpdateUserSuccessAction, (state: State, action) => {
    const stateCopy = { ...state, loading: false };
    return userAdapter.updateOne(
      { id: action._id, changes: action.data },
      stateCopy
    );
  }),
  on(actions.GetUSersSuccessAction, (state: State, action) => {
    return userAdapter.addMany(action.users, { ...state, loading: false });
  }),
  on(actions.DeleteUserSuccessAction, (state: State, action) => {
    return userAdapter.removeOne(action._id, state);
  }),
  on(actions.AddInfoMessageAction, (state: State, action) => {
    const updState = {
      ...state,
      message: action.message,
      error: action.error,
      navTo: action?.navTo,
    };
    return updState;
  }),
  on(actions.RemoveInfoMessageAction, (state: State, _action) => {
    const updState = {
      ...state,
      message: '',
      error: false,
      loading: false,
      navTo: '',
    };
    return updState;
  })
);
