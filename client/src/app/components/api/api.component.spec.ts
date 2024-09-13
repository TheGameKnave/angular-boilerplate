import { TestBed } from '@angular/core/testing';
import { ApiComponent } from './api.component';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { throwError } from 'rxjs';

describe('ApiComponent', () => {
  let component: ApiComponent;
  let fixture: any;
  let httpHandler: HttpHandler;
  let httpClient: HttpClient;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    await TestBed.configureTestingModule({
      imports: [ApiComponent],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: HttpHandler, useValue: {} },
        ChangeDetectorRef
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ApiComponent);
    component = fixture.componentInstance;
    httpHandler = TestBed.inject(HttpHandler);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be created', () => {
    expect(fixture).toBeTruthy();
  });

  it('should make a GET request to the API endpoint', () => {
    const url = '/api';
    httpClientSpy.get.and.returnValue(of({}));
    component.ngOnInit();
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get.calls.allArgs()[0].length).toBe(2);
    expect(httpClientSpy.get.calls.allArgs()[0][0]).toBe(url);
  });

  it('should display the API data', () => {
    const data = { message: 'Hello, World!' };
    httpClientSpy.get.and.returnValue(of(data));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.results).toBe(data);
  });
  
  it('should handle API errors', () => {
    const error = { message: 'Error message' };
    httpClientSpy.get.and.returnValue(throwError(() => error));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.error).toEqual(error);
  });
});