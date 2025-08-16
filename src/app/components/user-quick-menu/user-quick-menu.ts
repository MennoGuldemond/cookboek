import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { GoogleUser, LocalStorageKeys } from '@app/models';
import { Observable } from 'rxjs';
import { GoogleAuthService } from '@app/services';

@Component({
  selector: 'cobo-user-quick-menu',
  templateUrl: './user-quick-menu.html',
  styleUrls: ['./user-quick-menu.scss'],
  imports: [CommonModule, MatMenuModule, MatIconModule, MatButtonModule],
})
export class UserQuickMenu implements OnInit {
  @Input() user: GoogleUser;

  currentTheme$: Observable<string>;

  private router = inject(Router);
  private authService = inject(GoogleAuthService);

  ngOnInit() {
    // this.currentTheme$ = this.store.select(selectTheme);
  }

  login() {
    // Set url before login to return to after loggin in
    localStorage.setItem(LocalStorageKeys.urlBeforeLogin, this.router.url);
    this.router.navigate(['login']);
  }

  logout() {
    this.authService.signOut();
  }

  navigateToAccount() {
    this.router.navigate(['profiel']);
  }

  setTheme(theme: string) {
    // this.store.dispatch(setTheme({ theme: theme }));
  }
}
