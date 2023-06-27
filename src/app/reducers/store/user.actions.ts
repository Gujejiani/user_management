import { MOUser } from '../../models/user';

import { createAction, props } from '@ngrx/store';

enum UserActions {
  LOADING = '[LOADING TRIGGERED] LOADING...',

  CREATE = '[CREATE USER] Create',
  CREATE__SUCCESS = '[CREATE USER SUCCESS] User Created',

  UPDATE = '[UPDATE USER] Update user start',
  UPDATE_SUCCESS = '[UPDATE USER] Update user  Success',

  DELETE = '[DELETE USER] Delete',
  DELETE_USER_SUCCESS = '[DELETE USER SUCCESS] user deleted successfully',


  GET_USERS = '[GET USERS] get Users',
  GET_USERS_SUCCESS = '[GET USERS SUCCESS] get Users SUCCESS',

  ADD_INFO_MESSAGE = '[ADD INFO MESSAGE] add info message',
  REMOVE_INFO_MESSAGE = '[GET USERS SUCCESS] removes info message',

}

export const CreateUserAction = createAction(
  UserActions.CREATE,
  props<{ user: FormData }>()
);
export const loadingAction = createAction(
  UserActions.LOADING,
  props<{ loading: boolean }>()
);
export const CreateUserSuccess = createAction(
  UserActions.CREATE__SUCCESS,
  props<{ user: MOUser }>()
);

export const GetUSersACtion = createAction(UserActions.GET_USERS);
export const GetUSersSuccessAction = createAction(
  UserActions.GET_USERS_SUCCESS,
  props<{ users: MOUser[] }>()
);

export const UpdateUserAction = createAction(
  UserActions.UPDATE,
  props<{ data: Partial<MOUser> | FormData; bonusCreated: boolean }>()
);
export const DeleteUserAction = createAction(
  UserActions.DELETE,
  props<{ data: Partial<MOUser>; bonusCreated?: boolean }>()
);
export const DeleteUserSuccessAction = createAction(
  UserActions.DELETE_USER_SUCCESS,
  props<{ _id: string }>()
);
export const UpdateUserSuccessAction = createAction(
  UserActions.UPDATE_SUCCESS,
  props<{ _id: string; data: MOUser }>()
);

export const AddInfoMessageAction = createAction(
  UserActions.ADD_INFO_MESSAGE,
  props<{ error: boolean; message: string; navTo?: string }>()
);

export const RemoveInfoMessageAction = createAction(
  UserActions.REMOVE_INFO_MESSAGE
);
