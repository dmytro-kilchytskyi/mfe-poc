import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { navigate } from './store/actions/shell.actions';
import { selectState } from './store/selectors/shell.selectors';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly store = inject(Store);

  readonly state$ = this.store.select(selectState);

  navigate(path: string) {
    this.store.dispatch(navigate({ path }));
  }
}
