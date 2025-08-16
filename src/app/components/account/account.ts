import { Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { GoogleAuthService } from '@app/services';
import { User, UserInfo } from '@app/models';
import { UserService } from '@app/services/user-service';

@Component({
  selector: 'cobo-account',
  templateUrl: './account.html',
  styleUrls: ['./account.scss'],
  imports: [CommonModule, MatCardModule],
})
export class Account implements OnInit {
  userData: Signal<User>;
  userInfo: Signal<UserInfo>;

  private authService = inject(GoogleAuthService);
  private userService = inject(UserService);

  ngOnInit() {
    // this.userData = this.authService.user;
    this.userInfo = this.userService.userInfo;
  }
}
