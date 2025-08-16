import { Component, Input } from '@angular/core';
import { RecipeInfo } from '@app/models';
import { MatCardModule } from '@angular/material/card';
import { NgStyle } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'cobo-recipe-card',
  templateUrl: './recipe-card.html',
  styleUrls: ['./recipe-card.scss'],
  imports: [MatCardModule, NgStyle, MatIconModule, MatBadgeModule],
})
export class RecipeCard {
  @Input() recipe: RecipeInfo;

  getImageURLStyle(recipe: RecipeInfo): string {
    return `url(${recipe.photoURL})`;
  }
}
