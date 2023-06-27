import { MOUser } from '../../models/user';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import {
  CREATE_USER,
  DELETE_USER,
  GET_USERS,
  UPDATE_USER,
} from 'src/app/api/endpoints';
import { UserService } from '../../containers/user/service/user.service';

import * as actions from './user.actions';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  createUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.CreateUserAction),
        mergeMap((action) => {
          this.store.dispatch(actions.loadingAction({ loading: true }));
          return this.userService.apiCall(CREATE_USER, action.user).pipe(
            map(
              (response: {
                status: string;
                data: { user: MOUser };
                message: string;
                error: boolean;
              }) => {
                if (response.error) {
                  this.store.dispatch(
                    actions.AddInfoMessageAction({
                      error: true,
                      message: response.message,
                    })
                  );
                } else {
                  this.store.dispatch(
                    actions.CreateUserSuccess({ user: response.data.user })
                  );
                  this.store.dispatch(
                    actions.loadingAction({ loading: false })
                  );
                }

              }
            ),
            catchError((error) => {
              console.error(error);

              return of(null);
            })
          );
        })
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.UpdateUserAction),
        mergeMap((action) => {

          this.store.dispatch(actions.loadingAction({ loading: true }));
          return this.userService.apiCall(UPDATE_USER, action.data).pipe(
            map(
              (response: {
                status: string;
                data: { user: MOUser };
                message: string;
                error: boolean;
              }) => {


                if (response.error) {
                  this.store.dispatch(
                    actions.AddInfoMessageAction({
                      error: true,
                      message: response.message,
                    })
                  );
                } else {
                  const bonusCreated = action.bonusCreated;
                  this.store.dispatch(
                    actions.AddInfoMessageAction({
                      error: false,
                      message: bonusCreated
                        ? 'Bonus Created Successfully'
                        : 'User Updated Successfully',
                      navTo: `/${response.data.user._id}/detail`,
                    })
                  );

                  this.store.dispatch(
                    actions.UpdateUserSuccessAction({
                      _id: response.data.user._id,
                      data: response.data.user,
                    })
                  );
                }

              }
            ),
            catchError((error) => {
              console.error(error);

              return of(null);
            })
          );
        })
      ),
    { dispatch: false }
  );
  getUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.GetUSersACtion),
        mergeMap((_action) => {
          this.store.dispatch(actions.loadingAction({ loading: true }));

          return this.userService.apiCall(GET_USERS).pipe(
            map((response: { status: string; data: { users: MOUser[] } }) => {


              this.store.dispatch(
                actions.GetUSersSuccessAction({ users: response.data.users })
              );
            }),
            catchError((error) => {
              console.error(error);

              return of(null);
            })
          );
        })
      ),
    { dispatch: false }
  );
  deleteUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.DeleteUserAction),
        mergeMap((action) => {
          return this.userService.apiCall(DELETE_USER, action.data).pipe(
            map((_response: { status: string; data: { users: MOUser[] } }) => {


              this.store.dispatch(
                actions.AddInfoMessageAction({
                  error: false,
                  message: 'user deleted successfully',
                })
              );
              const id = action.data._id as string;
              this.store.dispatch(actions.DeleteUserSuccessAction({ _id: id }));
            }),
            catchError((error) => {
              console.error(error);

              return of(null);
            })
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store
  ) {}
}
