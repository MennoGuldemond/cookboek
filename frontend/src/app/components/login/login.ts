import { AfterViewInit, Component, inject, OnInit, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GoogleAuthService } from '@app/services';

@Component({
  selector: 'cobo-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  imports: [MatCardModule],
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
