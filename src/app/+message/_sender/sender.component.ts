/**
 * Created by jngue on 04/05/2017.
 */
import {
  Component,
  OnInit, Input
} from '@angular/core';

@Component({
  selector: 'sender',
  styleUrls: ['sender.component.css'],
  templateUrl: 'sender.component.html'
})
export class SenderComponent implements OnInit {
  @Input("user")
  user:any;

  @Input("message")
  message:string;

  constructor(
  ) {}

  public ngOnInit() {
  }
}
