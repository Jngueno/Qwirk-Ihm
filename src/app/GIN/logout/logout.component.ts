/**
 * Created by jngue on 25/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";

@Component({
  selector: 'logout',
  templateUrl: 'logout.component.html',
  providers: [AuthenticationService],
  styleUrls: ['logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService : AuthenticationService
  ) {
  }

  ngOnInit() {
  }

  logoutEvent() {
    this.authService.logout();
  }
}
