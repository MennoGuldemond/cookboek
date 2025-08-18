import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RecipeInfo } from '@app/models';
import { RecipeCard } from '../card/recipe-card';

@Component({
  selector: 'cobo-recipe-grid',
  templateUrl: './recipe-grid.html',
  styleUrls: ['./recipe-grid.scss'],
  imports: [CommonModule, RecipeCard],
})
export class RecipeGrid {
  @Input() recipes: RecipeInfo[];

  private router = inject(Router);

  onRecipeClick(recipe: RecipeInfo) {
    if (recipe) {
      this.router.navigate([`recepten/detail/${recipe.id}`]);
    }
  }
}
