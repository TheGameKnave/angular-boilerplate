import { importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { TranslocoHttpLoader } from './app/services/transloco-loader';
import { provideTransloco } from '@jsverse/transloco';
import { provideTranslocoMessageformat } from '@jsverse/transloco-messageformat';
import { cookiesStorage, GetLangParams, provideTranslocoPersistLang } from '@jsverse/transloco-persist-lang';
import { provideTranslocoLocale } from '@jsverse/transloco-locale';

import { ENVIRONMENT } from './environments/environment';
import { SUPPORTED_LANGUAGES } from './app/helpers/constants';
import { AppComponent } from './app/app.component';


export function getLangFn({
  cachedLang,
  browserLang,
  cultureLang,
  defaultLang,
}: GetLangParams) {
  return cachedLang || browserLang || cultureLang || defaultLang;
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000',
      })
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: SUPPORTED_LANGUAGES,
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
    provideTranslocoMessageformat(),
    provideTranslocoPersistLang({
      getLangFn,
      storage: {
        useValue: cookiesStorage(),
      },
    }),
    provideTranslocoLocale(),
  ]
}).then(() => {
  if ('serviceWorker' in navigator && ENVIRONMENT.production) {
    navigator.serviceWorker.register('ngsw-worker.js');
  }
}).catch(err => console.error(err));
