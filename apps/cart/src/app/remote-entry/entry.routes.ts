import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { RemoteEntry } from './entry';
import { cartReducer } from './store/reducers/cart.reducers';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntry,
    providers: [provideState('cart', cartReducer)],
  },
];
