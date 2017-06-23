import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Router, CanActivate } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AppComponent } from './app.component';
import { RoutingService } from './routing.service';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HttpService } from './http.service';

describe('AppComponent', () => {
  let locations, routing;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent, 
        HeaderComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterTestingModule.withRoutes([
      { path: 'login', component: LoginComponent },
      { path: '', component: HomeComponent, canActivate: [RoutingService] }
                ])
      ],
      providers: [HttpService, RoutingService]
    }).compileComponents();
  }));

  beforeEach(inject([Router, Location], (router: Router, location: Location) => {
        locations = location;
        routing = router;
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('Load the login page', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        routing.navigate(['login']).then(() => {
            expect(locations.path()).toBe('/login');
        });
    }));

  it('Load the Room page', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        routing.navigate(['']).then(() => {
            expect(locations.path()).toBe('/');
        });
    }));

});
