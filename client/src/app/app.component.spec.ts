import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UpdateService } from './services/update.service';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ExampleOneComponent } from './components/example-one/example-one.component';
import { ExampleTwoComponent } from './components/example-two/example-two.component';
import { getTranslocoModule } from './helpers/transloco-testing.module';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let updateService: jasmine.SpyObj<UpdateService>;

  beforeEach(() => {
    const updateServiceSpy = jasmine.createSpyObj('UpdateService', ['checkForUpdates']);

    TestBed.configureTestingModule({
      imports: [
        FooterComponent,
        ExampleOneComponent,
        ExampleTwoComponent,
        AppComponent,
        getTranslocoModule(),
      ],
      providers: [
        { provide: UpdateService, useValue: updateServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    updateService = TestBed.inject(UpdateService) as jasmine.SpyObj<UpdateService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle componentToShow correctly', () => {
    const newComponent = 'example-two';
    component.onComponentToggle(newComponent);
    expect(component.componentToShow).toBe(newComponent);
  });

  it('should call checkForUpdates on construction', () => {
    // Ensure checkForUpdates is called once
    expect(updateService.checkForUpdates).toHaveBeenCalled();
  });

  it('should have the correct english title', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.innerText).toBe('Angular Boilerplate');
  });
});
