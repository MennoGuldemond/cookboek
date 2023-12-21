import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { getUser, login, logout } from '@auth/store/auth.actions';
import { AuthState, selectUser } from '@auth/store/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from './models';
import { BrowserUtilService } from './services';
import { environment } from '@env/environment';

@Component({
  selector: 'cobo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<IUser>;
  version: string = environment.version;

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
