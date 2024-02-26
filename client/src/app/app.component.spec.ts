import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { UpdateService } from './services/update.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let updateService: jasmine.SpyObj<UpdateService>;

  beforeEach(() => {
    const updateServiceSpy = jasmine.createSpyObj('UpdateService', ['checkForUpdates']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        CookieService,
        { provide: UpdateService, useValue: updateServiceSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    updateService = TestBed.inject(UpdateService) as jasmine.SpyObj<UpdateService>;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should check for updates', () => {
    component.ngOnInit();
    expect(updateService.checkForUpdates).toHaveBeenCalled();
  });

  it('should toggle component', () => {
    component.onComponentToggle('example-one');
    expect(component.componentToShow).toBe('example-one');
  });
  
});