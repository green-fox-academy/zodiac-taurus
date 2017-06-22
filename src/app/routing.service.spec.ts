import { TestBed, inject } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';

import { RoutingService } from './routing.service';

describe('RoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutingService,  { provide: Router}] 
    });
  });

  it('should be created', inject([RoutingService], (service: RoutingService) => {
    expect(service).toBeTruthy();
  }));
});