import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TranslocoHttpLoader } from './transloco-loader.service';
import { ENVIRONMENT } from '../../environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('TranslocoHttpLoader', () => {
  let loader: TranslocoHttpLoader;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TranslocoHttpLoader
      ]
    });

    loader = TestBed.inject(TranslocoHttpLoader);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests.
  });

  it('should make an HTTP GET request to the correct URL based on the provided language', () => {
    const mockTranslation = { key: 'value' }; // Mock translation data
    const lang = 'en';

    loader.getTranslation(lang).subscribe((translation) => {
      expect(translation).toEqual(mockTranslation);
    });

    const req = httpMock.expectOne(`${ENVIRONMENT.baseUrl}/assets/i18n/${lang}.json`);
    expect(req.request.method).toBe('GET');

    req.flush(mockTranslation); // Respond with the mock data
  });
});
