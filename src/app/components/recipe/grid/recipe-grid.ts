import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RecipeInfo } from '@app/models';
import { RecipeCard } from '../card/recipe-card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserUtilService } from '@app/services';

@Component({
  selector: 'cobo-recipe-grid',
  templateUrl: './recipe-grid.html',
  styleUrls: ['./recipe-grid.scss'],
  imports: [CommonModule, RecipeCard, MatButtonModule, MatIconModule],
})
export class RecipeGrid {
  @Input() recipes: RecipeInfo[];

  browserUtils = inject(BrowserUtilService);
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
