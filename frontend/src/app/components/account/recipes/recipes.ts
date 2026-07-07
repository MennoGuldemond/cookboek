import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RecipeGrid } from '@app/components/recipe';
import { PaginationSettings, RecipeInfo } from '@app/models';
import { RecipeService } from '@app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'cobo-account-recipes',
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss',
  imports: [CommonModule, RecipeGrid],
})
export class AccountRecipes {
  @Input() authorId: string;

  recipes$: Observable<RecipeInfo[]>;
  private loaded = false;

  private recipeService = inject(RecipeService);

  loadRecipes() {
    if (this.loaded) return;
    const paginationSettings: PaginationSettings = {
      skip: 0,
      take: 30,
      authorId: this.authorId,
      name: '',
    };
    this.recipes$ = this.recipeService.get(paginationSettings);
    this.loaded = true;
  }
}
