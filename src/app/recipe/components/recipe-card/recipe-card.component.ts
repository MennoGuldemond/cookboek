import { Component, Input } from '@angular/core';
import { RecipeInfo } from '@app/models';

@Component({
  selector: 'cobo-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() recipe: RecipeInfo;

  getImageURLStyle(recipe: RecipeInfo): string {
    return `url(${recipe.photoURL})`;
  }
}
