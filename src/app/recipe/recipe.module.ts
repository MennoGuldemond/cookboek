import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { RecipeComponent } from './recipe.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeCardComponent, RecipeListComponent } from './components';

@NgModule({
  declarations: [RecipeComponent, RecipeListComponent, RecipeCardComponent],
  imports: [SharedModule, RecipeRoutingModule],
  bootstrap: [RecipeRoutingModule],
})
export class RecipeModule {}
