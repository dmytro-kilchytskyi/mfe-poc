import { createAction, props } from '@ngrx/store';

export const navigate = createAction(
  '[Shell] Navigate',
  props<{ path: string }>()
);
