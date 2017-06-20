import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class RoutingService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
       let loggedOut = true;
       if (localStorage.token === undefined) {
           loggedOut = false;
           this.router.navigate(['login']);
       }
       return loggedOut;
   }
}
