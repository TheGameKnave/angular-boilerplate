import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SUPPORTED_LANGUAGES } from 'src/app/helpers/constants';
import { LANGUAGES } from 'i18n-l10n-flags';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  Object = Object;
  supportedLanguages: string[] = SUPPORTED_LANGUAGES;
  languages = LANGUAGES;
  classToLang: {[className: string]: string} = {};

  constructor(
    public translate: TranslateService,
  ){
    this.supportedLanguages.forEach(lang => this.classToLang[`i18n-${lang}`] = lang);
  }

  onI18n(event: Event): void {
    const target = (event.target as HTMLElement).closest('li');
    if (target && target.classList) {
      
      const classList = Array.from(target.classList);
      const langClass = classList.find(className => this.classToLang[className]);
    
      if (langClass) {
        const langCode = this.classToLang[langClass];
        this.translate.use(langCode);
      }
    }
  }
}
