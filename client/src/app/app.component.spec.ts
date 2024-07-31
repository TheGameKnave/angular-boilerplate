import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { UpdateService } from './services/update.service';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ExampleOneComponent } from './components/example-one/example-one.component';
import { ExampleTwoComponent } from './components/example-two/example-two.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let cookieService: jasmine.SpyObj<CookieService>;
  let updateService: jasmine.SpyObj<UpdateService>;

  beforeEach(() => {
    const cookieServiceSpy = jasmine.createSpyObj('CookieService', ['get', 'set']);
    const updateServiceSpy = jasmine.createSpyObj('UpdateService', ['checkForUpdates']);

    TestBed.configureTestingModule({
    imports: [
        FooterComponent,
        ExampleOneComponent,
        ExampleTwoComponent,
        AppComponent
    ],
    providers: [
        { provide: CookieService, useValue: cookieServiceSpy },
        { provide: UpdateService, useValue: updateServiceSpy },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
    updateService = TestBed.inject(UpdateService) as jasmine.SpyObj<UpdateService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userLang and displayApp correctly on ngOnInit', () => {
    // Set up the mock for the get method
    cookieService.get.and.returnValue('fr-FR');

    // Call ngOnInit
    component.ngOnInit();

    // Verify interactions and component state
    expect(cookieService.get).toHaveBeenCalledWith('lang');
    expect(cookieService.set).toHaveBeenCalledWith('lang', 'fr');
    expect(component.userLang).toBe('fr');
    // expect(component.displayApp).toBeTrue();
  });

  it('should fall back to default language if userLang is not supported', () => {
    // Set up the mock for the get method
    cookieService.get.and.returnValue('xx-YY');

    // Call ngOnInit
    component.ngOnInit();

    // Verify interactions and component state
    expect(cookieService.get).toHaveBeenCalledWith('lang');
    expect(cookieService.set).toHaveBeenCalledWith('lang', 'en');
    expect(component.userLang).toBe('en');
  });

  it('should toggle componentToShow correctly', () => {
    const newComponent = 'example-two';
    component.onComponentToggle(newComponent);
    expect(component.componentToShow).toBe(newComponent);
  });

  it('should call checkForUpdates on initialization', () => {
    // Ensure checkForUpdates is called once
    component.ngOnInit();
    expect(updateService.checkForUpdates).toHaveBeenCalled();
  });

  // it('should use the correct language on translate', () => {
  //   const userLang = 'es';
  //   cookieService.get.and.returnValue(userLang);
    
  //   // Call ngOnInit to trigger the translate use
  //   component.ngOnInit();
    
  //   // Check if translateService.use was called with the correct argument
  //   expect(translateService.currentLang).toBe(userLang);
  // });
});
