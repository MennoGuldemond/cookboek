import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setTheme } from '@store/app.actions';
import { AppState, selectTheme } from '@store/app.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'cobo-user-quick-menu',
  templateUrl: './user-quick-menu.component.html',
  styleUrls: ['./user-quick-menu.component.scss'],
})
export class UserQuickMenuComponent implements OnInit {
  currentTheme$: Observable<string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.currentTheme$ = this.store.select(selectTheme);
  }

  setTheme(theme: string): void {
    this.store.dispatch(setTheme({ value: theme }));
  }
}
