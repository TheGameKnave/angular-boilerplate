import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from 'src/app/helpers/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  languages = LANGUAGES;

  constructor(
    public translate: TranslateService,
  ){}

  onI18n(event: Event): void {
    const target = (event.target as HTMLElement).closest('li');
    if(target && target.classList) {
      switch(true) {
        case target.classList.contains('i18n-en'): this.translate.use('en'); break;
        case target.classList.contains('i18n-fr'): this.translate.use('fr'); break;
        case target.classList.contains('i18n-es'): this.translate.use('es'); break;
        case target.classList.contains('i18n-zh'): this.translate.use('zh'); break;
      }
    }
  }
}
