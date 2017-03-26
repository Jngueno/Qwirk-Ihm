/**
 * Created by jngue on 20/03/2017.
 */
import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRoute, Params} from '@angular/router';

@Injectable()
export class ResetGuard implements CanActivate {
  private resetToken: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  canActivate() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let reset = params['reset_token'];
      this.resetToken = reset;
    });
    console.log(this.resetToken);
    if (true) {
      // logged in so return true
      return true;
    }
  }
}
/**
 * Created by jngue on 25/03/2017.
 */
