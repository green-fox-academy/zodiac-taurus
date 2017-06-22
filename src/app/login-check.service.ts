import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LoginCheckService {
  constructor( private router: Router ) {
    this.loggedIn();
  }
  
  loggedIn(){
    if (localStorage.token !== undefined) {
      this.router.navigate(['']);
    }
  }

  logoutEvent() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
