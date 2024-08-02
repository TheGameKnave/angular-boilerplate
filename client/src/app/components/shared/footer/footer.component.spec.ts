import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { SUPPORTED_LANGUAGES } from 'src/app/helpers/constants';
import { FooterComponent } from './footer.component';
import { of } from 'rxjs';
import { getTranslocoModule } from 'src/app/helpers/transloco-testing.module';


describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FooterComponent,
        getTranslocoModule(),
      ],
      providers: [
        CookieService,
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
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
    const langClass = 'i18n-de';
    const event = {
      target: {
        closest: (selector: string) => ({
          classList: [langClass]
        })
      }
    } as unknown as Event;
  
    spyOn(component.translate, 'setActiveLang').and.callThrough();
  
    component.onI18n(event);
  
    expect(component.translate.setActiveLang).toHaveBeenCalledWith('de');
  });
  
  it('should handle language change', () => {
    const langClass = 'i18n-de';
    const event = {
      target: {
        closest: (selector: string) => ({
          classList: [langClass]
        })
      }
    } as unknown as Event;
  
    spyOn(component.translate, 'setActiveLang').and.callThrough();
  
    component.onI18n(event);
  
    expect(component.translate.getActiveLang()).toBe('de');
  });
  
  it('should not change language if target classList is empty', () => {
    const event = {
      target: {
        closest: (selector: string) => ({
          classList: []
        })
      }
    } as unknown as Event;
  
    spyOn(component.translate, 'setActiveLang').and.callThrough();
  
    component.onI18n(event);
  
    expect(component.translate.setActiveLang).not.toHaveBeenCalled();
  });
  
  it('should not change language if no language class is found', () => {
    const event = {
      target: {
        closest: (selector: string) => ({
          classList: ['some-other-class']
        })
      }
    } as unknown as Event;
  
    spyOn(component.translate, 'setActiveLang').and.callThrough();
  
    component.onI18n(event);
  
    expect(component.translate.setActiveLang).not.toHaveBeenCalled();
  });
});
