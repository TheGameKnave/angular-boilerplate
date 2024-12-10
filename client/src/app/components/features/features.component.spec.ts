import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesComponent } from './features.component';
import { FeatureFlagService } from 'src/app/services/feature-flag.service';
import { of } from 'rxjs';
import { getTranslocoModule } from 'src/app/helpers/transloco-testing.module';

describe('FeaturesComponent', () => {
  let component: FeaturesComponent;
  let fixture: ComponentFixture<FeaturesComponent>;
  let featureFlagService: jasmine.SpyObj<FeatureFlagService>;
  let featureFlagServiceSpy: jasmine.SpyObj<FeatureFlagService>;

  beforeEach(waitForAsync(() => {
    featureFlagServiceSpy = jasmine.createSpyObj('FeatureFlagService', ['features', 'getFeature', 'setFeature']);
    featureFlagServiceSpy.features.and.returnValue({
      'App Version': true,
      'Environment': true,
      'API': false,
      'IndexedDB': true,
    });
    featureFlagServiceSpy.getFeature.and.callFake((feature: string) => {
      return featureFlagServiceSpy.features()[feature];
    });
  
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FeaturesComponent,
        getTranslocoModule(),
      ],
      providers: [{ provide: FeatureFlagService, useValue: featureFlagServiceSpy }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesComponent);
    component = fixture.componentInstance;
    featureFlagService = TestBed.inject(FeatureFlagService) as jasmine.SpyObj<FeatureFlagService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display checkboxes for each feature', () => {
    const checkboxes = fixture.nativeElement.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).toBe(4);
  });

  it('should create FormControls for existing features', () => {
    const currentFeatures = featureFlagServiceSpy.features();
    const existingKeys = Object.keys(currentFeatures);
    existingKeys.forEach((key) => {
      expect(fixture.componentInstance.featureControls[key]).toBeDefined();
      expect(fixture.componentInstance.featureControls[key].value).toBe(currentFeatures[key]);
    });
  });

  it('should update feature flag service when checkbox state changes', () => {
    const checkboxes = fixture.nativeElement.querySelectorAll('input[type="checkbox"]');
    const feature1Checkbox = checkboxes[0];
    const feature1Name = 'App Version'; // Hardcode the feature name
  
    feature1Checkbox.click();
    fixture.detectChanges();
    expect(featureFlagServiceSpy.setFeature).toHaveBeenCalledWith(feature1Name, false);
  });

});
