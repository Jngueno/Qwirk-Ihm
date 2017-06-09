/**
 * Created by Housseini  Maiga on 4/2/2017.
 */
import {Component, OnInit, Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() modalActions1;
  @Input() modalIdentifier;
  @Input() openModalClass;
  @Input() groups;
  @Input() contacts;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.modalIdentifier)
  }

}
