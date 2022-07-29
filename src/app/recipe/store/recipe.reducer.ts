import { createReducer, on } from '@ngrx/store';
import { setRecipe, setRecipes } from './recipe.actions';
import { RecipeState } from './recipe.selectors';

export const initialState: RecipeState = {
  recipes: [],
};

const _recipeReducer = createReducer(
  initialState,
  on(setRecipe, (state, action) => {
    let recipes = state.recipes.filter((r) => r.id !== action.recipe.id);
    return { ...state, recipes: [...recipes, action.recipe] };
  }),
  on(setRecipes, (state, action) => {
    // Remove outdated recipes in state
    let recipes = state.recipes.filter((r) => {
      return action.recipes.find((r2) => r2.id === r.id) ? null : r;
    });
    return { ...state, recipes: [...recipes, ...action.recipes] };
  })
);

export function recipeReducer(state: any, action: any): RecipeState {
  return _recipeReducer(state, action);
}
