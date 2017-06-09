/**
 * Created by jngue on 04/05/2017.
 */
import {
  Component,
  OnInit, Input
} from '@angular/core';
import {MessageComponent} from "../message.component";
import {APPCONFIG} from "../../config/param";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'sender',
  styleUrls: ['sender.component.css'],
  templateUrl: 'sender.component.html'
})
export class SenderComponent extends MessageComponent implements OnInit {
  @Input("user")
  user:any;

  @Input("message")
  message:string;

  appConfig = new APPCONFIG();
  url : string;
  file_url : string;

  constructor(
    private sanitizer: DomSanitizer
  ) {
    super()
    //this.url = this.appConfig.getUrlAPI() + this.user.username;
  }

  public ngOnInit() {
    this.url = "user/";
    this.file_url = this.appConfig.getUrlAPI() + "getFilename/";
  }

  trustSrcUrl(data){
    return this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }
}
