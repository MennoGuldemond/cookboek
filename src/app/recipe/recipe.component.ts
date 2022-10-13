import { Component } from '@angular/core';
import { Recipe } from '@app/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getRecipes } from './store/recipe.actions';
import { RecipeState, selectRecipes } from './store/recipe.selectors';

@Component({
  selector: 'cobo-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent {
  recipes$: Observable<Recipe[]>;

  constructor(private store: Store<RecipeState>) {}

  ngOnInit(): void {
    this.store.dispatch(getRecipes());
    this.recipes$ = this.store.select(selectRecipes);
  }
}
