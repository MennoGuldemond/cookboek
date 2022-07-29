import { Recipe } from '@app/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface RecipeState {
  recipes: Recipe[];
}

export const selectRecipeState = createFeatureSelector<RecipeState>('recipe');
export const selectRecipes = createSelector(selectRecipeState, (state) => state.recipes);
export const selectRecipeById = (id: string) =>
  createSelector(selectRecipeState, (state) => state.recipes.find((r) => r.id === id));
