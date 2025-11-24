import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

if (environment.production) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
      providers: [

      provideHttpClient(withFetch()),
      provideAnimationsAsync(),
      providePrimeNG({
        theme: { preset: Aura },
      }),
    ],
  };

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
