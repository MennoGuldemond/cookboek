import { Component, inject, Input, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { GoogleUser, LocalStorageKeys } from '@app/models';
import { GoogleAuthService, ThemingService } from '@app/services';

@Component({
  selector: 'cobo-user-quick-menu',
  templateUrl: './user-quick-menu.html',
  styleUrls: ['./user-quick-menu.scss'],
  imports: [CommonModule, MatMenuModule, MatIconModule, MatButtonModule],
})
export class UserQuickMenu implements OnInit {
  @Input() user: GoogleUser;

  currentTheme: Signal<string>;

  private router = inject(Router);
  private authService = inject(GoogleAuthService);
  private themingService = inject(ThemingService);

  ngOnInit() {
    this.currentTheme = this.themingService.currentTheme;
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
    this.themingService.setTheme(theme);
  }
}
