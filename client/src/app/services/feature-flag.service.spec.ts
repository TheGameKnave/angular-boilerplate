import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FeatureFlagService } from './feature-flag.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Socket } from 'ngx-socket-io';

describe('FeatureFlagService', () => {
  let service: FeatureFlagService;
  let httpMock: any;
  let socketSpy: jasmine.SpyObj<Socket>;

  beforeEach(() => {
    socketSpy = jasmine.createSpyObj('Socket', ['on', 'fromEvent', 'emit', 'disconnect', 'connect']);
    socketSpy.ioSocket = { connected: true };

    TestBed.configureTestingModule({
      providers: [
        FeatureFlagService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Socket, useValue: socketSpy },
        FeatureFlagService,
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
  
    expect(socketSpy.emit).toHaveBeenCalledTimes(1);
    expect(socketSpy.emit).toHaveBeenCalledWith('update-feature-flag', newFeatures);
  });

  it('should get feature', () => {
    const feature = 'App Version';
    const value = true;
    service.features.set({ [feature]: value });

    expect(service.getFeature(feature)).toBe(value);
  });

  it('should update features when WebSocket emits an update', () => {
    // Arrange: Mock an update payload
    const updatePayload = { 'App Version': false, 'New Feature': true };
    const initialFeatures = { 'App Version': true };
    service.features.set(initialFeatures);
  
    // Act: Simulate the WebSocket emitting an "update-feature-flags" event
    const onCallback = socketSpy.on.calls.mostRecent().args[1];
    onCallback(updatePayload); // Trigger the callback passed to `socket.on`
  
    // Assert: Check if features were updated correctly
    expect(service.features()).toEqual({ 'App Version': false, 'New Feature': true });
  });  

  it('should update features when response is different', fakeAsync(() => {
    const feature = 'flag1';
    const value = true;
    service.setFeature(feature, value);
    tick();
    expect(socketSpy.emit).toHaveBeenCalledTimes(1);
    expect(socketSpy.emit).toHaveBeenCalledWith('update-feature-flag', { [feature]: value });
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