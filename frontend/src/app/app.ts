import { AfterViewInit, Component, inject, OnInit, Signal } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BrowserUtilService, CategoryService, GoogleAuthService, UserService } from './services';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserQuickMenu } from './components';
import { GoogleUser } from './models';
import { appVersion, environmentPostfix } from './global-utils';

@Component({
  selector: 'cobo-app',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    UserQuickMenu,
  ],
})
export class App implements OnInit, AfterViewInit {
  user: Signal<GoogleUser>;
  userIsAdmin: Signal<boolean>;
  version: string = appVersion;
  environmentPostfix: string = environmentPostfix;

  browserUtils = inject(BrowserUtilService);
  private authService = inject(GoogleAuthService);
  private userService = inject(UserService);
  private categoriesService = inject(CategoryService);

  ngOnInit() {
    this.user = this.authService.user;
    this.userIsAdmin = this.userService.isAdmin;
    this.categoriesService.get();
  }

  ngAfterViewInit() {
    this.authService.initialize();
  }

  logout() {
    this.authService.signOut();
  }

  closeSideNavIfHandset(sideNav: MatSidenav) {
    this.browserUtils.isHandset$.subscribe((isHandset) => {
      if (isHandset === true) {
        sideNav.close();
      }
    });
  }
}
