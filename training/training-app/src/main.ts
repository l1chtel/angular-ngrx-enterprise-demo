import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideStore } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { usersReducer } from './app/state/user-reducer';
import { UserEffects } from './app/state/user-effects';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app.routes';
import { authReducer } from './app/auth/auth.reducer';
import { AuthEffects } from './app/auth/auth-effects';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideStore({
      users: usersReducer,
      auth: authReducer,
      router: routerReducer,
    }),
    provideEffects([UserEffects, AuthEffects]),
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25 }),
    provideAnimations(),
    provideRouter(routes, withComponentInputBinding()),
  ],
}).catch((err) => console.error(err));
