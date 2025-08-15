import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeInfo } from '@app/models';

@Component({
    selector: 'cobo-recipe-grid',
    templateUrl: './recipe-grid.component.html',
    styleUrls: ['./recipe-grid.component.scss'],
    standalone: false
})
export class RecipeGridComponent {
  @Input() recipes: RecipeInfo[];

  constructor(private router: Router) {}

  onRecipeClick(recipe: RecipeInfo): void {
    if (recipe) {
      this.router.navigate([`recepten/detail/${recipe.id}`]);
    }
  }

  onClickAdd(): void {
    this.router.navigate(['recepten/maak']);
  }
}
