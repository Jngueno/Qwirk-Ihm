/**
 * Created by jngue on 04/05/2017.
 */
import {
  Component,
  OnInit, Input
} from '@angular/core';

@Component({
  selector: 'receiver',
  styleUrls: ['receiver.component.css'],
  templateUrl: 'receiver.component.html'
})
export class ReceiverComponent implements OnInit {
  @Input("user")
  user : any;

  @Input("message")
  message : any;

  constructor(
  ) {}

  public ngOnInit() {
  }
}
