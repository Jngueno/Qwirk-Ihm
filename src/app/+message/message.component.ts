/**
 * Created by jngue on 23/05/2017.
 */
import {
  Component,
  OnInit, Input
} from '@angular/core';

@Component({
  selector: 'message',
  styleUrls: ['message.component.css'],
  templateUrl: 'message.component.html'
})
export class MessageComponent implements OnInit {
  @Input("user")
  user:any;

  @Input("contact")
  contact:any;

  @Input("group")
  group:any;

  @Input("message")
  message:any;

  connectedUser : any;

  constructor(
  ) {}

  public ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem('currentUser')).userIdentifier;
    //console.log(this.message.owner);
  }
}
