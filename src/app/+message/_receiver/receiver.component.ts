/**
 * Created by jngue on 04/05/2017.
 */
import {
  Component,
  OnInit, Input
} from '@angular/core';
import {Ng2EmojiService} from "ng2-emoji";
import {APPCONFIG} from "../../config/param";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'receiver',
  styleUrls: ['receiver.component.css'],
  templateUrl: 'receiver.component.html'
})
export class ReceiverComponent implements OnInit {
  @Input("user")
  user : any;
  public emojiList = [];

  @Input("group")
  group : any;

  // public msg: string = "";
  @Input("message")
  message : any;

  appConfig = new APPCONFIG();
  url : string;
  private file_url: string;

  constructor(
    private sanitizer: DomSanitizer
  ) {

    //this.url = this.appConfig.getUrlAPI() + this.user.username;
  }

  trustSrcUrl(data){
    return this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }

  public ngOnInit() {
    this.url = "user/";
    this.file_url = this.appConfig.getUrlAPI() + "getFilename/";
    console.log("Receiver message", this.message);
  }
}
