import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginCheckService } from './login-check.service';

describe('LoginCheckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginCheckService, { provide: Router } ]
    });
  });

  it('should be created', inject([LoginCheckService], (service: LoginCheckService) => {
    expect(service).toBeTruthy();
  }));
});
