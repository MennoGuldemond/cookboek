import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeComponent } from './recipe.component';
import {
  RecipeCardComponent,
  RecipeDetailComponent,
  RecipeEditComponent,
  RecipeGridComponent,
  RecipeListComponent,
} from './components';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { recipeReducer } from './store/recipe.reducer';
import { RecipeEffects } from './store/recipe.effects';

@NgModule({
  declarations: [
    RecipeComponent,
    RecipeListComponent,
    RecipeCardComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeGridComponent,
  ],
  exports: [RecipeCardComponent],
  imports: [
    SharedModule,
    RecipeRoutingModule,
    StoreModule.forFeature('recipe', recipeReducer),
    EffectsModule.forFeature([RecipeEffects]),
  ],
  bootstrap: [RecipeRoutingModule],
})
export class RecipeModule {}
