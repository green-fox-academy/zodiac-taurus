import { async, TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, ResponseOptions, Response, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ HttpService, MockBackend, BaseRequestOptions,
      {
        provide: Http,
        useFactory: (backend, options) => new Http(backend, options),
        deps: [MockBackend, BaseRequestOptions]
      }],
      imports: [ HttpModule ]
    });
  });

  it('should be created', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));

  it('should construct', async(inject(
    [HttpService, MockBackend], (service, mockBackend) => {
    expect(service).toBeDefined();
  })));


  it('postLogin', async(inject(
    [HttpService, MockBackend], (service, mockBackend) => {
      const mockResponse = {
        "success": true,
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZ2Fib3IiLCJpYXQiOjE0OTkwNzUwNTd9.-Bf35dVj6jdMbFc5dsP-F8Iv5JvLtULhvQwHjy6KBXc"
      };


      mockBackend.connections.subscribe( conn => {
        conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
      });

      const result = service.loginPostToServer();

      result.subscribe(res => {
        let data = res.json();
        expect(data.success).toBe(true);
      });
  })));

  it



});

