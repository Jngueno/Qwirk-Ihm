/**
 * Created by jngue on 25/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {Router} from "@angular/router";
import {StatusService} from "../../shared/services/status.service";
import {Headers, Response, Http} from "@angular/http";
import {APPCONFIG} from "../../config/param";

@Component({
  selector: 'logout',
  templateUrl: 'logout.component.html',
  providers: [AuthenticationService, StatusService],
  styleUrls: ['logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(
    private router: Router,
    private authService : AuthenticationService,
    private statusService : StatusService
  ) {
  }

  ngOnInit() {
  }

  logoutEvent() {
    let status = {"name": "Offline"};
    this.statusService.updateStatusCurrentUser(status).subscribe(
      result => {
        this.authService.logout();
        this.router.navigate(['/login']);
      });
  }
}
