import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { HttpModule }    from '@angular/http';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpService } from './http.service';



@NgModule({
  declarations: [ 
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    HttpModule,
    RouterModule.forRoot([ 
      { path: 'login', component: LoginComponent },
      { path: '', component: HomeComponent }
      // { path: '', component: LoginComponent }
      ])
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
