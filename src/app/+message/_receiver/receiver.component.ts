/**
 * Created by jngue on 04/05/2017.
 */
import {
  Component,
  OnInit, Input
} from '@angular/core';
import {APPCONFIG} from "../../config/param";

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

  appConfig = new APPCONFIG();
  url : string;

  constructor(
  ) {

    //this.url = this.appConfig.getUrlAPI() + this.user.username;
  }

  public ngOnInit() {
    this.url = "user/";
  }
}
