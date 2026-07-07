import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeInfo } from '@app/models';
import { RecipeService } from '@app/services';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RecipeCard } from '../recipe';

@Component({
  selector: 'cobo-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [CommonModule, RecipeCard],
  standalone: true,
})
export class Home implements OnInit {
  newestRecipe$: Observable<RecipeInfo>;

  recipeService = inject(RecipeService);
  router = inject(Router);

  ngOnInit() {
    this.newestRecipe$ = this.recipeService.getNewest();
  }

  onRecipeClick(recipe: RecipeInfo) {
    if (recipe) {
      this.router.navigate([`recepten/detail/${recipe.id}`]);
    }
  }
}
