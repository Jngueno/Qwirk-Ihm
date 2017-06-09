/**
 * Created by jngue on 04/05/2017.
 */
import {
  Component,
  OnInit, Input
} from '@angular/core';
import {Ng2EmojiService} from "ng2-emoji";

@Component({
  selector: 'receiver',
  styleUrls: ['receiver.component.css'],
  templateUrl: 'receiver.component.html'
})
export class ReceiverComponent implements OnInit {
  @Input("user")
  user : any;
  public emojiList = [];

  // public msg: string = "";
  @Input("message")
  message : any;



  constructor() {
    // this.msg = this.message + ' :joy:'
    // this.emojiList = Ng2EmojiService.emojis;
  }

  public ngOnInit() {
  }
}
