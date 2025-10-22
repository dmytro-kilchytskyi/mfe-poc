import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { navigate } from './store/actions/shell.actions';
import { CommonModule } from '@angular/common';
import { Navbar, NavItem } from '@mfe-poc/ui';

@Component({
  imports: [CommonModule, RouterModule, Navbar],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly store = inject(Store);

  navItems: NavItem[] = [
    { label: 'Products', path: '/products' },
    { label: 'Cart', path: '/cart' },
  ];

  navigate(path: string) {
    this.store.dispatch(navigate({ path }));
  }
}
