import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { getRecipe, getRecipes, RECIPE_SET_RECIPE, RECIPE_SET_RECIPES } from './recipe.actions';
import { RecipeService } from '@recipe/services';

@Injectable()
export class RecipeEffects {
  getRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRecipe),
      switchMap((action) => {
        return this.recipeService.getById(action.id);
      }),
      pipe(
        map((recipe) => {
          return { type: RECIPE_SET_RECIPE, recipe: recipe };
        })
      )
    )
  );

  getRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRecipes),
      switchMap(() => {
        return this.recipeService.get();
      }),
      pipe(
        map((recipes) => {
          return { type: RECIPE_SET_RECIPES, recipes: recipes };
        })
      )
    )
  );

  constructor(private actions$: Actions, private recipeService: RecipeService) {}
}
