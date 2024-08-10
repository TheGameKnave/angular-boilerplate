import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { SUPPORTED_LANGUAGES } from 'src/app/helpers/constants';
import { FooterComponent } from './footer.component';
import { getTranslocoModule } from 'src/app/helpers/transloco-testing.module';
import { By } from '@angular/platform-browser';


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

  it('should return the correct flag for a language without a locale', () => {
    const ln = 'en';
    const expectedFlag = Object.values(component.languages[ln].locales)[0].flag;
    expect(component.getFlag(ln)).toEqual(expectedFlag);
  });
  
  it('should return the correct flag for a language with a locale', () => {
    const ln = 'en-US';
    const expectedFlag = component.languages[ln.split('-')[0]].locales[ln].flag;
    expect(component.getFlag(ln)).toEqual(expectedFlag);
  });
  
  it('should return the correct native name for a language without a locale', () => {
    const ln = 'en';
    const expectedNativeName = component.languages[ln].nativeName;
    expect(component.getNativeName(ln)).toEqual(expectedNativeName);
  });
  
  it('should return the correct native name for a language with a locale', () => {
    const ln = 'en-US';
    const expectedNativeName = `${component.languages[ln.split('-')[0]].nativeName} (${component.languages[ln.split('-')[0]].locales[ln].nativeName})`;
    expect(component.getNativeName(ln)).toEqual(expectedNativeName);
  });

  it('should change language if clicked', () => {
    const langClass = 'i18n-de';
    const event = {
      target: {
        closest: (selector: string) => ({
          classList: [langClass]
        })
      },
      type: 'click'
    } as unknown as Event;
  
    spyOn(component.translate, 'setActiveLang').and.callThrough();
  
    component.onI18n(event);
  
    expect(component.translate.setActiveLang).toHaveBeenCalledWith('de');
    expect(component.translate.getActiveLang()).toBe('de');
  });

  it('should change language if key-entered', () => {
    const langClass = 'i18n-de';
    const target = {
      closest: (selector: string) => ({
        classList: [langClass],
      }),
    };
    
    const event = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      view: window,
      key: 'Enter',
    });
    
    Object.defineProperty(event, 'target', {
      value: target,
    });

    spyOn(component.translate, 'setActiveLang').and.callThrough();
  
    component.onI18n(event);
  
    expect(component.translate.setActiveLang).toHaveBeenCalledWith('de');
    expect(component.translate.getActiveLang()).toBe('de');
  });

  it('should stop keydown event propagation on the ul element', () => {
    const ulElement = fixture.debugElement.query(By.css('.i18n'));
    const keydownEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(keydownEvent, 'stopPropagation');

    ulElement.triggerEventHandler('keydown', keydownEvent);
    fixture.detectChanges();

    expect(keydownEvent.stopPropagation).toHaveBeenCalled();
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
