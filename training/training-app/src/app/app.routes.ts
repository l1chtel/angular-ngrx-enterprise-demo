import { Routes } from '@angular/router';
import { LoginPage } from './login-page/login-page';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-page',
    pathMatch: 'full',
  },
  {
    path: 'account-page',
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
