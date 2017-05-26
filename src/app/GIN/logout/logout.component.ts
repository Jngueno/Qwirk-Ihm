/**
 * Created by jngue on 25/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'logout',
  templateUrl: 'logout.component.html',
  providers: [AuthenticationService],
  styleUrls: ['logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(
    private router: Router,
    private authService : AuthenticationService
  ) {
  }

  ngOnInit() {
  }

  logoutEvent() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
