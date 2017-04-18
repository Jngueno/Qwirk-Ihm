/**
 * Created by jngue on 25/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import {IUser} from "../../shared/models/user";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    user :IUser
  ) {
  }

  ngOnInit() {
  }
}
