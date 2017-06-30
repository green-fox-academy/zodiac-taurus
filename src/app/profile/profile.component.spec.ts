import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from '../header/header.component';
import { CapitalizefirstPipe } from '../capitalizefirst.pipe';
import { HttpService } from '../http.service';
import { LoginCheckService } from '../login-check.service';
import { Router, RouterModule } from '@angular/router';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpModule ],
      declarations: [ ProfileComponent, HeaderComponent ],
      providers: [ CapitalizefirstPipe, HttpService, LoginCheckService, {provide: Router} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
