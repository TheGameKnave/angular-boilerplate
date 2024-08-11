import { importProvidersFrom, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { TranslocoHttpLoader } from './app/services/transloco-loader.service';
import { provideTransloco } from '@jsverse/transloco';
import { provideTranslocoMessageformat } from '@jsverse/transloco-messageformat';
import { cookiesStorage, GetLangParams, provideTranslocoPersistLang } from '@jsverse/transloco-persist-lang';
import { provideTranslocoLocale } from '@jsverse/transloco-locale';

import { SUPPORTED_LANGUAGES } from './app/helpers/constants';

export function getLangFn({ cachedLang, browserLang, cultureLang, defaultLang }: GetLangParams) {
  return cachedLang ?? browserLang ?? (cultureLang || defaultLang);
}

export const appProviders = [
  importProvidersFrom(
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerImmediately',
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
];
