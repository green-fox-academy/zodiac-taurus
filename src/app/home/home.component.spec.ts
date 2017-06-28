import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import {
    Headers,
    Http,
    XHRBackend,
    ResponseOptions,
    Response
} from '@angular/http';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from './home.component';
import { HttpService } from '../http.service';
import { LoginCheckService } from '../login-check.service'
import { NgxPaginationModule } from 'ngx-pagination';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, NgxPaginationModule ],
      declarations: [ HomeComponent, HeaderComponent ],
      providers: [ HttpService,  { provide: Router }, LoginCheckService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });

});
