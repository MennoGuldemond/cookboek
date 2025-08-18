import { Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { User } from '@app/models';
import { UserService } from '@app/services/user-service';
import { MatTabsModule } from '@angular/material/tabs';
import { AccountOverview } from './overview/overview';
import { AccountRecipes } from './recipes/recipes';

@Component({
  selector: 'cobo-account',
  templateUrl: './account.html',
  styleUrls: ['./account.scss'],
  imports: [CommonModule, MatCardModule, MatTabsModule, AccountOverview, AccountRecipes],
})
export class Account implements OnInit {
  user: Signal<User>;

  private userService = inject(UserService);

  ngOnInit() {
    this.user = this.userService.user;
  }
}
