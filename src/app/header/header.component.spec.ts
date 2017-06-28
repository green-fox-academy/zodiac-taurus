import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { HttpService } from '../http.service';
import { LoginCheckService } from '../login-check.service'

class routing {
  public routerModule: RouterModule;
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ HeaderComponent ],
      providers: [ HttpService, { provide: Router, useClass: routing  }, LoginCheckService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => { 
  //   expect(component).toBeTruthy();
  // });

});


