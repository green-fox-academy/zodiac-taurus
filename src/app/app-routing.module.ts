import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { DrawComponent } from './draw/draw.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpService } from './http.service';
import { RoutingService } from './routing.service';
import { GuessingComponent } from './guessing/guessing.component';

const routes: Routes = [
      { path: 'login', component: LoginComponent },
      { path: '', component: HomeComponent, canActivate:[RoutingService] },
      { path: 'draw', component: DrawComponent, canActivate:[RoutingService] },
      { path: 'guessing', component: GuessingComponent, canActivate:[RoutingService] },
      { path: 'profile', component: ProfileComponent, canActivate:[RoutingService] },
      { path: '**', redirectTo: '' }
      ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}