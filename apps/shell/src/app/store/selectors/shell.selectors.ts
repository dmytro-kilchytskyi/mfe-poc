import { createSelector } from '@ngrx/store';
import { State } from '../reducers/shell.reducer';

export const selectState = createSelector(
  (state: { shell: State }) => state,
  (state) => state
);
