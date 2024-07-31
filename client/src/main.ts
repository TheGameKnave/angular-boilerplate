import { importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ENVIRONMENT } from './environments/environment';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000',
        })),
        provideHttpClient(withInterceptorsFromDi())
    ]
}).then(() => {
  if ('serviceWorker' in navigator && ENVIRONMENT.production) {
    navigator.serviceWorker.register('ngsw-worker.js');
  }
}).catch(err => console.error(err));
