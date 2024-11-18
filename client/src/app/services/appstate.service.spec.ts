import { TestBed } from '@angular/core/testing';

import { AppstateService } from './appstate.service';

describe('AppstateService', () => {
  let service: AppstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
