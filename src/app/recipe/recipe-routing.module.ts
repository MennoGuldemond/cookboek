import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './components';
import { RecipeComponent } from './recipe.component';

const routes: Routes = [
  {
    path: '',
    component: RecipeComponent,
  },
  {
    path: ':id',
    title: 'CB | Recept',
    component: RecipeDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
