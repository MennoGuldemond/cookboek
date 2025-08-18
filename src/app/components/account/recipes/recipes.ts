import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
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
export class AccountRecipes implements OnInit {
  @Input() authorId: string;

  recipes$: Observable<RecipeInfo[]>;

  private recipeService = inject(RecipeService);

  ngOnInit(): void {
    const paginationSettings: PaginationSettings = {
      skip: 0,
      take: 30,
      authorId: this.authorId,
      name: '',
    };

    this.recipes$ = this.recipeService.get(paginationSettings);
  }
}
