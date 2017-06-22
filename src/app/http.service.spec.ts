import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ HttpService, { provide: XHRBackend, useClass: MockBackend } ]
    });
  });

  it('should be created', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));  
});
