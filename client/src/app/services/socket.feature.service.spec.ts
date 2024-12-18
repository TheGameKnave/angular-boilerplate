import { TestBed } from '@angular/core/testing';

import { SocketFeatureService } from './socket.feature.service';

describe('SocketFeatureService', () => {
  let service: SocketFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketFeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
