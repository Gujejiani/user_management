import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, userAdapter } from './user.reducer';
export const getUserState = createFeatureSelector<State>('users');

export const selectUserById = (id: string) =>
  createSelector(getUserState, (state) => state.entities[id]);

export const selectLoading = createSelector(
  getUserState,
  (state) => state.loading
);

export const selectModalInfo = createSelector(getUserState, (state) => {
  return {
    error: state.error,
    message: state.message,
    navTo: state.navTo,
  };
});

export const { selectIds, selectEntities, selectAll, selectTotal } =
  userAdapter.getSelectors(getUserState);

export const userSelectors = {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectUserById,
  selectLoading,
  selectModalInfo,
};
