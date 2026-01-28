import { ApplicationConfig, inject } from '@angular/core';
import {
  provideRouter,
  Router,
  withComponentInputBinding,
  withNavigationErrorHandler,
} from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withNavigationErrorHandler((error) => {
        inject(Router).navigate(['login-page']);
      }),
      withComponentInputBinding(),
    ),
  ],
};
