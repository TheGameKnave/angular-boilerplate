import { TestBed } from '@angular/core/testing';
import { HelpersService } from './helpers.service';
import { ENVIRONMENT } from 'src/environments/environment';

describe('HelpersService', () => {
  let service: HelpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HelpersService,
        { provide: ENVIRONMENT, useValue: { production: false } } // Mocking the ENVIRONMENT object
      ]
    });
    service = TestBed.inject(HelpersService);
  });

  afterEach(() => {
    delete (window as any).helpersService;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set window.helpersService if not in production', () => {
    expect((window as any).helpersService).toBe(service);
  });

  // TODO figure out why this doesn't allow mocking ENVIRONMENT
  // it('should not set window.helpersService if in production', () => {
  //   delete (window as any).helpersService;
  //   TestBed.resetTestingModule(); // Reset the testing module to apply the new override

  //   TestBed.configureTestingModule({
  //     providers: [
  //       HelpersService,
  //       { provide: ENVIRONMENT, useValue: { production: true } } // Mocking the ENVIRONMENT object to production
  //     ]
  //   });

  //   service = TestBed.inject(HelpersService);

  //   expect((window as any).helpersService).toBeUndefined();
  // });
});
