import { Recipe } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const RECIPE_GET_RECIPE = '[Recipe] getRecipe';
export const RECIPE_GET_RECIPES = '[Recipe] getRecipes';
export const RECIPE_SET_RECIPE = '[Recipe] setRecipe';
export const RECIPE_SET_RECIPES = '[Recipe] setRecipes';
export const RECIPE_SAVE_RECIPE = '[Recipe] saveRecipe';

export const getRecipe = createAction(RECIPE_GET_RECIPE, props<{ id: string }>());
export const getRecipes = createAction(RECIPE_GET_RECIPES);

export const setRecipe = createAction(RECIPE_SET_RECIPE, props<{ recipe: Recipe }>());
export const setRecipes = createAction(RECIPE_SET_RECIPES, props<{ recipes: Recipe[] }>());

export const saveRecipe = createAction(RECIPE_SAVE_RECIPE, props<{ recipe: Recipe }>());
