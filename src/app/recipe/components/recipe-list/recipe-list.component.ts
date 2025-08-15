import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '@app/models';

@Component({
    selector: 'cobo-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss'],
    standalone: false
})
export class RecipeListComponent {
  @Input() recipes: Recipe[];
  displayedColumns: string[] = ['name', 'createdOn'];

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
