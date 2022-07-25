import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { getUser, login, logout } from '@auth/store/auth.actions';
import { AuthState, selectUser } from '@auth/store/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './models';
import { BrowserUtilService } from './services';

@Component({
  selector: 'cobo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<User>;

  constructor(public browserUtils: BrowserUtilService, private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.store.dispatch(getUser());
    this.user$ = this.store.select(selectUser);
  }

  login(): void {
    this.store.dispatch(login());
  }

  logout(): void {
    this.store.dispatch(logout());
  }

  closeSideNavIfHandset(sideNav: MatSidenav): void {
    this.browserUtils.isHandset$.subscribe((isHandset) => {
      if (isHandset === true) {
        sideNav.close();
      }
    });
  }
}
