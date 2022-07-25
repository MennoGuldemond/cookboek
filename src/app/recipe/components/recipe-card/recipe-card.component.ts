import { Component, Input } from '@angular/core';
import { Recipe } from '@app/models';

@Component({
  selector: 'cobo-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() recipe: Recipe;

  getImageURLStyle(recipe: Recipe): string {
    return `url(${recipe.photoURL});`;
  }
}
