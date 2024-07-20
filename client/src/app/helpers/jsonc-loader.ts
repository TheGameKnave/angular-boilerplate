import { TranslateLoader } from '@ngx-translate/core';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class JsoncLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`assets/i18n/${lang}.jsonc`, { responseType: 'text' }).pipe(
      map(response => {
        // Remove comments from the JSONC file
        const jsonc = response.replace(/\/\/.*$/gm, '');
        // Parse the JSONC file
        return JSON.parse(jsonc);
      })
    );
  }
}