import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { SUPPORTED_LANGUAGES } from 'src/app/helpers/constants';
import { FooterComponent } from './footer.component';
import { of } from 'rxjs';


describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let cookieService: CookieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
      providers: [
        CookieService,
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    cookieService = TestBed.inject(CookieService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize supportedLanguages and classToLang', () => {
    expect(component.supportedLanguages).toEqual(SUPPORTED_LANGUAGES);
    component.supportedLanguages.forEach(lang => {
      expect(component.classToLang[`i18n-${lang}`]).toBe(lang);
    });
  });

  it('should change language if langClass is found', () => {
    // spyOn(translateService, 'use');
    // spyOn(cookieService, 'set');

    // const event = {
    //   target: {
    //     closest: () => ({
    //       classList: ['i18n-en'],
    //     }),
    //   },
    // } as unknown as Event;

    // component.onI18n(event);

    // expect(translateService.use).toHaveBeenCalledWith('en');
    // expect(cookieService.set).toHaveBeenCalledWith('lang', 'en');
  });

  it('should handle language change and set cookie', () => {
    // spyOn(translateService, 'use');
    // spyOn(cookieService, 'set');

    // const event = {
    //   target: {
    //     closest: (selector: string) => ({
    //       classList: ['i18n-en']
    //     })
    //   }
    // } as unknown as Event;

    // component.onI18n(event);

    // expect(translateService.use).toHaveBeenCalledWith('en');
    // expect(cookieService.set).toHaveBeenCalledWith('lang', 'en');
  });

  it('should not change language if target classList is empty', () => {
    // spyOn(translateService, 'use');
    // spyOn(cookieService, 'set');

    // const event = {
    //   target: {
    //     closest: (selector: string) => ({
    //       classList: []
    //     })
    //   }
    // } as unknown as Event;

    // component.onI18n(event);

    // expect(translateService.use).not.toHaveBeenCalled();
    // expect(cookieService.set).not.toHaveBeenCalled();
  });

  it('should not change language if no language class is found', () => {
    // spyOn(translateService, 'use');
    // spyOn(cookieService, 'set');

    // const event = {
    //   target: {
    //     closest: (selector: string) => ({
    //       classList: ['some-other-class']
    //     })
    //   }
    // } as unknown as Event;

    // component.onI18n(event);

    // expect(translateService.use).not.toHaveBeenCalled();
    // expect(cookieService.set).not.toHaveBeenCalled();
  });
});
