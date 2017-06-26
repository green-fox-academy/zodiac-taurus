import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { DrawComponent } from './draw.component';
import { HeaderComponent } from '../header/header.component';
import { HttpService } from '../http.service';


describe('DrawComponent', () => {
  let component: DrawComponent;
  let fixture: ComponentFixture<DrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpModule ],
      declarations: [ DrawComponent, HeaderComponent ],
      providers: [HttpService, { provide: Router }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
