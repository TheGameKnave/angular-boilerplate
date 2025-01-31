import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesComponent } from './features.component';
import { FeatureFlagService } from 'src/app/services/feature-flag.service';
import db from 'src/../../server/data/db.json';
import { getTranslocoModule } from 'src/../../tests/helpers/transloco-testing.module';
import { signal } from '@angular/core';

// Path to the mock database file

describe('FeaturesComponent', () => {
  const features = {...db.featureFlags};
  let component: FeaturesComponent;
  let fixture: ComponentFixture<FeaturesComponent>;
  let featureFlagService: jasmine.SpyObj<FeatureFlagService>;
  let featureFlagServiceSpy: jasmine.SpyObj<FeatureFlagService>;
  const mockFeaturesSignal = signal({...features});

  beforeEach(waitForAsync(() => {
    featureFlagServiceSpy = jasmine.createSpyObj('FeatureFlagService', ['features', 'getFeature', 'setFeature']);
    featureFlagServiceSpy.features.and.returnValue({...features});
    featureFlagServiceSpy.getFeature.and.callFake((feature: string) => {
      return featureFlagServiceSpy.features()[feature];
    });
    featureFlagServiceSpy.features = jasmine.createSpyObj('features', ['set', 'get']);
    Object.defineProperty(featureFlagServiceSpy, 'features', {
      get: () => mockFeaturesSignal,
      set: (value) => {
        mockFeaturesSignal.set(value);
      },
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
  afterEach(() => {
    mockFeaturesSignal.set({
      ...features,
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display checkboxes for each feature', () => {
    const currentFeatures = featureFlagServiceSpy.features();
    const checkboxes = fixture.nativeElement.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).toBe(Object.keys(currentFeatures).length);
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
    expect(featureFlagServiceSpy.setFeature).toHaveBeenCalledWith(feature1Name, !features[feature1Name]);
  });

  it('should only update from a signal when the target formControl value differs', () => {
    // Set the initial value of the signal
    mockFeaturesSignal.set({...features});
    fixture.detectChanges();
  
    // Get the form control for the 'App Version' feature
    const appVersionFormControl = fixture.componentInstance.featureControls['App Version'];
  
    // Set the initial value of the form control to true
    appVersionFormControl.setValue(features['App Version']);
  
    // Update the signal's value to false
    mockFeaturesSignal.set({
      ...features,
      'App Version': !features['App Version'],
    });
    fixture.detectChanges();
  
    // Verify that the form control's value is updated to false
    expect(appVersionFormControl.value).toBe(!features['App Version']);
  });

});
