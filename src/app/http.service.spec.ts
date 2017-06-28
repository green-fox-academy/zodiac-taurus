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
});


// describe('loginPostToServer', () => {
//   beforeEach(() => {
//   TestBed.configureTestingModule({
//     providers: [ HttpService, MockBackend, BaseRequestOptions,
//     {
//       provide: Http,
//       useFactory: (backend, options) => new Http(backend, options),
//       deps: [MockBackend, BaseRequestOptions]
//     }],
//       imports: [ HttpModule ]
//     });
//   });


//   it('should parse response', async(inject(
//     [HttpService, MockBackend], (service, mockBackend) => {
//       const mockResponse = {
//         success: true,
//         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZ2Fib3IiLCJpYXQiOjE0OTg1OTk0MTB9.ZA9GK6IfOlXu6DdaX1tW1RuSSq3v1lJ52HU3Sb-G-9c",
//         user: "gabor"
//       };

//       const fakeUser = {
//         user: "gabor",
//         pass: "1234"
//       };

//     mockBackend.connections.subscribe(conn => {
//       conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
//     });

//     const result = service.loginPostToServer(fakeUser);

//     result.subscribe(res => {
//       expect(res).toEqual({
//         success: true,
//         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZ2Fib3IiLCJpYXQiOjE0OTg1OTk0MTB9.ZA9GK6IfOlXu6DdaX1tW1RuSSq3v1lJ52HU3Sb-G-9c",
//         user: "gabor"
//       });
//     });
//   })));
// });