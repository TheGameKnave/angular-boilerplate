import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FeatureFlagService } from './feature-flag.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('FeatureFlagService', () => {
  let service: FeatureFlagService;
  let httpMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FeatureFlagService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(FeatureFlagService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get feature flags', () => {
    const featureFlags = { 'App Version': true, 'Environment': true };

    service.getFeatureFlags().subscribe((flags) => {
      expect(flags).toEqual(featureFlags);
    });

    const req = httpMock.expectOne('/api/flags');
    expect(req.request.method).toBe('GET');
    req.flush(featureFlags);
  });

  it('should set feature', () => {
    const feature = 'App Version';
    const value = true;
    const newFeatures = { [feature]: value };

    service.setFeature(feature, value);

    const req = httpMock.expectOne('/api/flags');
    expect(req.request.method).toBe('PUT');
    req.flush(newFeatures);
  });

  it('should get feature', () => {
    const feature = 'App Version';
    const value = true;
    service.features.set({ [feature]: value });

    expect(service.getFeature(feature)).toBe(value);
  });

  it('should update features when response is different', fakeAsync(() => {
    const initialFeatures = { 'App Version': true, 'Environment': true };
    service.features.set(initialFeatures);
  
    const feature = 'App Version';
    const value = false;
    service.setFeature(feature, value);
  
    const req = httpMock.expectOne('/api/flags');
    expect(req.request.method).toBe('PUT');
  
    const newFeatures = { 'App Version': true, 'Environment': true };
    req.flush(newFeatures);
  
    tick(); // wait for the subscribe block to be executed
  
    expect(service.features()).toEqual(newFeatures);
  }));

  it('should return false for unknown feature', () => {
    const features = { 'App Version': true, 'Environment': true };
    service.features.set(features);
    expect(service.getFeature('Unknown Feature')).toBe(false);
  });

  afterEach(() => {
    httpMock.verify();
  });
});