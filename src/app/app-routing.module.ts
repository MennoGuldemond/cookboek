import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  RecipeEditComponent,
  RecipeDetailComponent,
  NotFoundComponent,
  HomeComponent,
  RecipeListComponent,
  LoginComponent,
  AccountComponent,
} from './components';
import { AuthGuard } from './guards';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipe-edit/:id', component: RecipeEditComponent, canActivate: [AuthGuard] },
  { path: 'recipe-edit', component: RecipeEditComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
