import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { HttpService } from '../http.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpModule ],
      declarations: [ LoginComponent ],
      providers: [HttpService, { provide: Router }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});



