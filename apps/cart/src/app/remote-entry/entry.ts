import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToCart } from './store/actions/cart.actions';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-cart-entry',
  template: `<h1>Welcome to the Cart Module</h1>
    <button (click)="addToCart()">Add to Cart</button>`,
})
export class RemoteEntry {
  private readonly store = inject(Store);

  addToCart(): void {
    this.store.dispatch(addToCart({ productId: '001' }));
  }
}
