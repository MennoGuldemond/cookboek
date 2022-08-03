import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '@app/models';

@Component({
  selector: 'cobo-recipe-grid',
  templateUrl: './recipe-grid.component.html',
  styleUrls: ['./recipe-grid.component.scss'],
})
export class RecipeGridComponent {
  @Input() recipes: Recipe[];

  constructor(private router: Router) {}

  onRecipeClick(recipe: Recipe): void {
    if (recipe) {
      this.router.navigate([`recepten/detail/${recipe.id}`]);
    }
  }

  onClickAdd(): void {
    this.router.navigate(['recepten/maak']);
  }
}
