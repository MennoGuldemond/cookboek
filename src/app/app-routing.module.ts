import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent, HomeComponent, LoginComponent, NotFoundComponent } from './components';
import { AuthGuard } from './guards';

const routes: Routes = [
  { path: 'home', title: 'CB | Home', component: HomeComponent },
  { path: 'login', title: 'CB | Login', component: LoginComponent },
  { path: 'profiel', title: 'CB | Profiel', component: AccountComponent, canActivate: [AuthGuard] },
  {
    path: 'recepten',
    loadChildren: () => import('@recipe/recipe.module').then((m) => m.RecipeModule),
    title: 'CB | Recepten',
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `home-component`
  { path: '**', title: '404', component: NotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
