import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RecipeService } from '../../services';
import { Recipe } from '@app/models';

@Component({
  selector: 'cobo-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;

  constructor(private router: Router, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipes$ = this.recipeService.getAll();
  }

  onRecipeClick(recipe: Recipe): void {
    if (recipe) {
      this.router.navigate([`recipe/${recipe.id}`]);
    }
  }

  onClickAdd(): void {
    this.router.navigate(['recipe-edit']);
  }
}
