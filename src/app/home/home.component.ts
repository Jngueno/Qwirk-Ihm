/**
 * Created by Housseini  Maiga on 3/12/2017.
 */
import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(http: Http) {
  }

  ngOnInit() {
  }
}
