/**
 * Created by jngue on 20/03/2017.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {UserService} from "../shared/services/user.service";
import {AuthenticationService} from "../shared/services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService : AuthenticationService) { }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
      this.authService.getCurrentUserProfile().subscribe(result => {
          console.log(result);
          return true;
        },
        err => {
          this.authService.logout();
          return false;
        });
    }
      // not logged in so redirect to login page
      this.router.navigate(['/login']);
      return false;
  }
}
