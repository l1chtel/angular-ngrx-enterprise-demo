import { Routes } from '@angular/router';
import { LoginPage } from './login-page/login-page';
import { authGuard } from './core/auth.guard';
import { AccountPageComponent } from './account-page/account-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-page',
    pathMatch: 'full',
  },
  {
    path: 'account-page/:id',
    loadComponent: () =>
      import('./account-page/account-page.component').then((m) => m.AccountPageComponent),
    canActivate: [authGuard],
  },
  {
    path: 'main-page',
    loadComponent: () =>
      import('../app/main-page/main-page.component').then((m) => m.MainPageComponent),
    canActivate: [authGuard],
  },
  {
    path: 'login-page',
    component: LoginPage,
  },
  { path: '**', redirectTo: 'login-page' },
];
