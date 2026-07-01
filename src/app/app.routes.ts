import { Routes } from '@angular/router';
import { Home, Login, NotFound, RecipeDetail, RecipeOverview } from './components';
import { adminGuard, authGuard } from './guards';
import { environmentPostfix } from './global-utils';

const pageTitle = (title: string): string => `CB${environmentPostfix} | ${title}`;

export const routes: Routes = [
  { path: 'home', title: pageTitle('Home'), component: Home },
  { path: 'login', title: pageTitle('Login'), component: Login },
  {
    path: 'profiel',
    title: pageTitle('Profiel'),
    canActivate: [authGuard],
    loadComponent: () => import('./components/account/account').then((m) => m.Account),
  },
  {
    path: 'admin',
    title: pageTitle('Admin'),
    canActivate: [adminGuard],
    loadComponent: () => import('./components/admin/admin').then((m) => m.Admin),
  },
  {
    path: 'recepten',
    component: RecipeOverview,
    title: pageTitle('Recepten'),
  },
  {
    path: 'recepten/detail/:id',
    title: pageTitle('Recept'),
    component: RecipeDetail,
  },
  {
    path: 'recepten/maak/:id',
    title: pageTitle('Recept'),
    canActivate: [authGuard],
    loadComponent: () => import('./components/recipe/edit/recipe-edit').then((m) => m.RecipeEdit),
  },
  {
    path: 'recepten/maak',
    title: pageTitle('Recept'),
    canActivate: [authGuard],
    loadComponent: () => import('./components/recipe/edit/recipe-edit').then((m) => m.RecipeEdit),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `home-component`
  { path: '**', title: pageTitle('404'), component: NotFound }, // Wildcard route for a 404 page
];
