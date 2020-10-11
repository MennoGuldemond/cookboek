import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Recipe } from '../../models';
import { RecipeService } from '../../services';

@Component({
  selector: 'cobo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  newestRecipe$: Observable<Recipe>;

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.newestRecipe$ = this.recipeService.getNewest();
  }

  onRecipeClick(recipe: Recipe): void {
    if (recipe) {
      this.router.navigate([`recipe/${recipe.id}`]);
    }
  }
}
