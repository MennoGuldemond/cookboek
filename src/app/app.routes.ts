import { Routes } from '@angular/router';
import {
  Account,
  Home,
  Login,
  NotFound,
  RecipeDetail,
  RecipeEdit,
  RecipeOverview,
} from './components';
import { authGuard } from './guards';

export const routes: Routes = [
  { path: 'home', title: 'CB | Home', component: Home },
  { path: 'login', title: 'CB | Login', component: Login },
  { path: 'profiel', title: 'CB | Profiel', component: Account, canActivate: [authGuard] },
  {
    path: 'recepten',
    component: RecipeOverview,
    title: 'CB | Recepten',
  },
  {
    path: 'recepten/detail/:id',
    title: 'CB | Recept',
    component: RecipeDetail,
  },
  {
    path: 'recepten/maak/:id',
    title: 'CB | Recept',
    component: RecipeEdit,
    canActivate: [authGuard],
  },
  { path: 'recepten/maak', title: 'CB | Recept', component: RecipeEdit, canActivate: [authGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `home-component`
  { path: '**', title: '404', component: NotFound }, // Wildcard route for a 404 page
];
