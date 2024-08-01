import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslocoLoader } from '@jsverse/transloco';
import { Observable } from 'rxjs';
import { Translation } from '@jsverse/transloco';
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
