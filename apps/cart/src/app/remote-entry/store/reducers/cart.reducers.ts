import { createReducer } from '@ngrx/store';
import { on } from '@ngrx/store';
import * as ShellActions from '../actions/cart.actions';

export interface State {
  items: Array<{ productId: string; quantity: number }>;
}

export const initialState: State = {
  items: [],
};

export const cartReducer = createReducer(
  initialState,
  on(ShellActions.addToCart, (state, { productId }) => {
    const existingItem = state.items.find(
      (item) => item.productId === productId
    );
    if (existingItem) {
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    return {
      ...state,
      items: [...state.items, { productId, quantity: 1 }],
    };
  })
);
