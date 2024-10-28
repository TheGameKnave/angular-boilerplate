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

  getFlag(ln: string): string {
    if (!ln.includes('-')) {
      return Object.values(this.languages[ln].locales)[0].flag;
    } else {
      return this.languages[ln.split('-')[0]].locales[ln].flag;
    }
  }
  
  getNativeName(ln: string): string {
    if (!ln.includes('-')) {
      return this.languages[ln].nativeName;
    } else {
      return `${this.languages[ln.split('-')[0]].nativeName} (${this.languages[ln.split('-')[0]].locales[ln].nativeName})`;
    }
  }

  onI18n(event: Event): void {
    if (event.type === 'click' || (event.type === 'keydown' && event instanceof KeyboardEvent && event.key === 'Enter')) {
      const target = (event.target as HTMLElement).closest('li');
      if (target?.classList) {
        
        const classList = Array.from(target.classList);
        const langClass = classList.find(className => this.classToLang[className]);
      
        if (langClass) {
          const langCode = this.classToLang[langClass];
          this.translate.setActiveLang(langCode);
        }
      }
    }
  }

  stopEventPropagation(event: Event): void {
    event.stopPropagation();
  }
}
