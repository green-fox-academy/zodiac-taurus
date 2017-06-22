import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Router, RouterModule } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from './home.component';
import { HttpService } from '../http.service';


class routing {
  public routerModule: RouterModule;
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ HomeComponent, HeaderComponent ],
      providers: [ HttpService,  { provide: Router, useClass: routing  } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
