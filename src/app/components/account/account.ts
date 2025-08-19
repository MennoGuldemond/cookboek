import { Component, ViewChild, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { User } from '@app/models';
import { UserService } from '@app/services/user-service';
import { MatTabsModule } from '@angular/material/tabs';
import { AccountOverview } from './overview/overview';
import { AccountRecipes } from './recipes/recipes';
import { AccountFavorites } from './favorites/favorites';

@Component({
  selector: 'cobo-account',
  templateUrl: './account.html',
  styleUrls: ['./account.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    AccountOverview,
    AccountRecipes,
    AccountFavorites,
  ],
})
export class Account implements OnInit {
  user: Signal<User>;

  @ViewChild(AccountRecipes) recipesComponent: AccountRecipes;
  @ViewChild(AccountFavorites) favoritesComponent: AccountFavorites;

  private userService = inject(UserService);

  ngOnInit() {
    this.user = this.userService.user;
  }

  onTabChange(index: number) {
    if (index === 1) {
      this.recipesComponent?.loadRecipes();
    }
    if (index === 2) {
      this.favoritesComponent?.loadFavorites();
    }
  }
}
