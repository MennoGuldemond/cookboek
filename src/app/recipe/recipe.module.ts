import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeComponent } from './recipe.component';
import { RecipeCardComponent, RecipeDetailComponent, RecipeEditComponent, RecipeListComponent } from './components';

@NgModule({
  declarations: [RecipeComponent, RecipeListComponent, RecipeCardComponent, RecipeDetailComponent, RecipeEditComponent],
  imports: [SharedModule, RecipeRoutingModule],
  bootstrap: [RecipeRoutingModule],
})
export class RecipeModule {}
