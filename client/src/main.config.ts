import { importProvidersFrom, inject, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { TranslocoHttpLoader } from './app/services/transloco-loader.service';
import { provideTransloco } from '@jsverse/transloco';
import { provideTranslocoMessageformat } from '@jsverse/transloco-messageformat';
import { cookiesStorage, GetLangParams, provideTranslocoPersistLang } from '@jsverse/transloco-persist-lang';
import { provideTranslocoLocale } from '@jsverse/transloco-locale';

import { SUPPORTED_LANGUAGES } from './app/helpers/constants';
import { provideFeatureFlag } from './app/providers/feature-flag.provider';
import { ENVIRONMENT } from 'src/environments/environment';

export function getLangFn({ cachedLang, browserLang, cultureLang, defaultLang }: GetLangParams) {
  return cachedLang ?? browserLang ?? (cultureLang || defaultLang);
}
export const isTestEnvironment = ENVIRONMENT.env === 'testing'; // TODO figure out how to mock this in test environment without putting it in the code!!

export const appProviders = [
  importProvidersFrom(
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerImmediately',
    })
  ),
  provideHttpClient(withInterceptorsFromDi()),
  // istanbul ignore next
  !isTestEnvironment ? provideFeatureFlag() : [], // TODO figure out how to mock this in test environment without putting it in the code!!
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
