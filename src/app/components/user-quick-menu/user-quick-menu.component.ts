import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { logout } from '@auth/store/auth.actions';
import { selectUser } from '@auth/store/auth.selectors';
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
  @Input() user: SocialUser;

  currentTheme$: Observable<string>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.currentTheme$ = this.store.select(selectTheme);
  }

  login(): void {
    this.router.navigate(['login']);
  }

  logout(): void {
    this.store.dispatch(logout());
  }

  navigateToAccount(): void {
    this.router.navigate(['profiel']);
  }

  setTheme(theme: string): void {
    this.store.dispatch(setTheme({ theme: theme }));
  }
}
