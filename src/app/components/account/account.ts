import { Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { User } from '@app/models';
import { UserService } from '@app/services/user-service';

@Component({
  selector: 'cobo-account',
  templateUrl: './account.html',
  styleUrls: ['./account.scss'],
  imports: [CommonModule, MatCardModule],
})
export class Account implements OnInit {
  user: Signal<User>;

  private userService = inject(UserService);

  ngOnInit() {
    this.user = this.userService.user;
  }
}
