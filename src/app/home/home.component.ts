/**
 * Created by Housseini  Maiga on 3/12/2017.
 */
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Http} from "@angular/http";
import {GroupComponent} from '../group/group.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {
  status = "homeStatus";
  constructor(http: Http) {
  }

  ngOnInit() {
  }
}
