/**
 * Created by Housseini  Maiga on 4/1/2017.
 */
import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'splitview',
  templateUrl: './splitview.component.html',
  styleUrls: ['./splitview.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SplitviewComponent implements OnInit {
  isCollapse: boolean = false;
  onChanged: string = 'slide-out';
  constructor() {
  }

  ngOnInit() {
  }

  onToggle() {
    this.onChanged = this.isCollapse ? "slide-out" : "slide-in";
    this.isCollapse = !this.isCollapse;
  }
}
