import { TestBed } from '@angular/core/testing';
import { SocketFeatureService } from './socket.feature.service';
import { SocketIoService } from './socket.io.service';
import { of } from 'rxjs';

describe('SocketFeatureService', () => {
  let service: SocketFeatureService;
  let socketIoServiceSpy: jasmine.SpyObj<SocketIoService>;

  beforeEach(() => {
    socketIoServiceSpy = jasmine.createSpyObj('SocketIoService', ['listen', 'emit']);

    TestBed.configureTestingModule({
      providers: [
        { provide: SocketIoService, useValue: socketIoServiceSpy }
      ]
    });

    service = TestBed.inject(SocketFeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call listen on SocketIoService when getFeatureFlags is called', () => {
    service.getFeatureFlags();
    expect(socketIoServiceSpy.listen).toHaveBeenCalledTimes(1);
    expect(socketIoServiceSpy.listen).toHaveBeenCalledWith('update-feature-flags');
  });

  it('should return an observable of feature flags when getFeatureFlags is called', () => {
    const featureFlags = [{ key: 'flag1', value: true }, { key: 'flag2', value: false }];
    socketIoServiceSpy.listen.and.returnValue(of(featureFlags));

    service.getFeatureFlags().subscribe((flags) => {
      expect(flags).toEqual(featureFlags);
    });
  });

  it('should call emit on SocketIoService when requestFeatureFlags is called', () => {
    service.requestFeatureFlags();
    expect(socketIoServiceSpy.emit).toHaveBeenCalledTimes(1);
    expect(socketIoServiceSpy.emit).toHaveBeenCalledWith('request-feature-flags');
  });
});
