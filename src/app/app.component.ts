import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { logout, setUser } from '@auth/store/auth.actions';
import { AuthState, selectUser } from '@auth/store/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BrowserUtilService } from './services';
import { environment } from '@env/environment';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { getCategories } from '@store/app.actions';

@Component({
  selector: 'cobo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<SocialUser>;
  version: string = environment.version;

  constructor(
    public browserUtils: BrowserUtilService,
    private store: Store<AuthState>,
    private authService: SocialAuthService
  ) {}

  ngOnInit(): void {
    // TODO: make sure we stay logged in after a refresh
    this.authService.authState.subscribe((user) => {
      this.store.dispatch(setUser({ user }));
    });

    this.store.dispatch(getCategories());

    this.user$ = this.store.select(selectUser);
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
