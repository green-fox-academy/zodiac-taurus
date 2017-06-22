import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpService } from './http.service';
import { RoutingService } from './routing.service';

const routes: Routes = [
      { path: 'login', component: LoginComponent },
      { path: '', component: HomeComponent, canActivate:[RoutingService] },
      ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}