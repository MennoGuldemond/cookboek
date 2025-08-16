import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeInfo } from '@app/models';
import { RecipeCard } from '../card/recipe-card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cobo-recipe-grid',
  templateUrl: './recipe-grid.html',
  styleUrls: ['./recipe-grid.scss'],
  imports: [RecipeCard, MatButtonModule, MatIconModule],
})
export class RecipeGrid {
  @Input() recipes: RecipeInfo[];

  private router = inject(Router);

  onRecipeClick(recipe: RecipeInfo) {
    if (recipe) {
      this.router.navigate([`recepten/detail/${recipe.id}`]);
    }
  }

  onClickAdd() {
    this.router.navigate(['recepten/maak']);
  }
}
