import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RecipeGrid } from '@app/components/recipe';
import { RecipeInfo } from '@app/models';
import { RecipeService } from '@app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'cobo-account-favorites',
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
  imports: [CommonModule, RecipeGrid],
})
export class AccountFavorites {
  recipes$: Observable<RecipeInfo[]>;
  private loaded = false;

  private recipeService = inject(RecipeService);

  loadFavorites() {
    if (this.loaded) return;
    this.recipes$ = this.recipeService.getLiked();
    this.loaded = true;
  }
}
