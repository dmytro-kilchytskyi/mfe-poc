import { createReducer } from '@ngrx/store';
import { on } from '@ngrx/store';
import * as ShellActions from '../actions/shell.actions';

export interface State {
  path: string;
}

export const initialState: State = {
  path: '/',
};

export const shellReducer = createReducer(
  initialState,
  on(ShellActions.navigate, (state, { path }) => ({ ...state, path }))
);
