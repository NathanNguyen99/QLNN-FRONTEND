import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from './helpers';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import decode from 'jwt-decode';
import { AuthenticationService } from '../Shared/Services/authentication.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private helper: Helpers, public auth: AuthenticationService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    
    if (!this.helper.isAuthenticated()) {
      this.router.navigate(['/login'],{ queryParams: { retUrl: route.url} });
      return false;
    }
    return true;

    // this will be passed from the route config
    // on the data property
    // const expectedRole = route.data.expectedRole;
    // const token = localStorage.getItem('token');
    // // decode the token to get its payload
    // const tokenPayload = decode(token);
    // if (
    //   !this.helper.isAuthenticated() || 
    //   tokenPayload.role !== expectedRole
    // ) {
    //   this.router.navigate(['login']);
    //   return false;
    // }
    // return true;
  
  }
}
