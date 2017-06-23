import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, XHRBackend, ResponseOptions, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
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

  it('login test', () => {
    inject([ HttpService, MockBackend ], (service: HttpService, mockBackend) => {

      const mockResponse = {
          "success": true,
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIiwiaWF0IjoxNDk4MDQ2ODAyfQ.pMkVfGfdMu6kwc1XrqdN_-8mZjE1YYZgYWWbUtx2fjc",
          "user": "gabor"};

      const fakeUser = {
        "user": 'gabor',
        "pass": '123'
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      })

      service.loginPostToServer(fakeUser).subscribe((mockResponse) => {
          expect(mockBackend.mockResponse.success).toEqual(false);
          expect(mockBackend.mockResponse.user).toEqual("gabor");
      });
    })
  })



});
