import { Routes } from '@angular/router';
import { Home, Login, NotFound, RecipeDetail, RecipeOverview } from './components';
import { authGuard } from './guards';

export const routes: Routes = [
  { path: 'home', title: 'CB | Home', component: Home },
  { path: 'login', title: 'CB | Login', component: Login },
  {
    path: 'profiel',
    title: 'CB | Profiel',
    canActivate: [authGuard],
    loadComponent: () => import('./components/account/account').then((m) => m.Account),
  },
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
    canActivate: [authGuard],
    loadComponent: () => import('./components/recipe/edit/recipe-edit').then((m) => m.RecipeEdit),
  },
  {
    path: 'recepten/maak',
    title: 'CB | Recept',
    canActivate: [authGuard],
    loadComponent: () => import('./components/recipe/edit/recipe-edit').then((m) => m.RecipeEdit),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `home-component`
  { path: '**', title: '404', component: NotFound }, // Wildcard route for a 404 page
];
