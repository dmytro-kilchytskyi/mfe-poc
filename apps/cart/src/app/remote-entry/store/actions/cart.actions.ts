import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
  '[Cart] Add to cart',
  props<{ productId: string }>()
);
