import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch()),provideToastr({
    positionClass: 'toast-top-right',
    closeButton: true,
    progressBar: true
  }),provideRouter(routes),provideClientHydration()]
};
