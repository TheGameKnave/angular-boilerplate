import { Component } from '@angular/core';
import { SUPPORTED_LANGUAGES } from 'src/app/helpers/constants';
import { LANGUAGES } from 'i18n-l10n-flags';
import { NgClass } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    standalone: true,
    imports: [NgClass],
    styles: ``
})
export class FooterComponent {
  Object = Object;
  supportedLanguages: string[] = SUPPORTED_LANGUAGES;
  languages = LANGUAGES;
  classToLang: {[className: string]: string} = {};

  constructor(
    public translate: TranslocoService,
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
        this.translate.setActiveLang(langCode);
      }
    }
  }
}
