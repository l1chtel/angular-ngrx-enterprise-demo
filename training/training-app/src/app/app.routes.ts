import { Routes } from '@angular/router';
import { UserPage } from './user-page/user-page';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-page',
    pathMatch: 'full',
  },
  {
    path: 'account-page',
    loadComponent: () =>
      import('./account-page/account-page.component').then((m) => m.AccountPageComponent),
    canActivate: [authGuard],
  },
  {
    path: 'user-page',
    component: UserPage,
  },
];
