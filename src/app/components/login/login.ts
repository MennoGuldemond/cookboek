import { AfterViewInit, Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { GoogleAuthService } from '@app/services';

@Component({
  selector: 'cobo-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  imports: [CommonModule, MatCardModule],
})
export class Login implements OnInit, AfterViewInit {
  isLoggedIn: Signal<boolean>;

  authService = inject(GoogleAuthService);

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  ngAfterViewInit() {
    if (!this.isLoggedIn()) {
      this.authService.renderButton('google-signin-btn');
    }
  }
}
