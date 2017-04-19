/**
 * Created by Housseini  Maiga on 3/12/2017.
 */
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  constructor(http: Http) {
  }

  ngOnInit() {
  }
}
