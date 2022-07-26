import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards';
import { RecipeDetailComponent, RecipeEditComponent } from './components';
import { RecipeComponent } from './recipe.component';

const routes: Routes = [
  {
    path: '',
    component: RecipeComponent,
  },
  {
    path: 'detail/:id',
    title: 'CB | Recept',
    component: RecipeDetailComponent,
  },
  { path: 'maak/:id', title: 'CB | Recept', component: RecipeEditComponent, canActivate: [AuthGuard] },
  { path: 'maak', title: 'CB | Recept', component: RecipeEditComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
