import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslocoLoader, Translation } from '@jsverse/transloco';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<Translation> {
    return this.http.get(`${ENVIRONMENT.baseUrl}/assets/i18n/${lang}.json`);
  }
}
