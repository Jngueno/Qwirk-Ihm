/**
 * Created by jngue on 25/03/2017.
 */
import {
  Component, OnInit, EventEmitter, trigger, transition, animate, keyframes, style, NgZone,
  Input
} from '@angular/core';
import {IUser} from "../../shared/models/user";
import {MaterializeAction, MaterializeDirective} from "angular2-materialize";
import {triggerAnimation} from "@angular/compiler/src/compiler_util/render_util";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('slideInLeft', [
      transition('inactive => active', animate(1000, keyframes([
        style({transform: 'translate3d(-100%, 0, 0);visibility: visible;', offset: .15}),
        style({transform: 'translate3d(0, 0, 0)', offset: 1})
      ]))),
    ]),
    trigger('slideOutRight', [
      transition('inactive => active', animate(1000, keyframes([
        style({transform: 'translate3d(0, 0, 0);', visibility: 'none', offset: .15}),
        style({transform: 'translate3d(100%, 0, 0);', offset: 1})
      ]))),
    ])
  ],
  providers: [AuthenticationService, UserService]
})
export class ProfileComponent implements OnInit {

  profileModalActions = new EventEmitter<string|MaterializeAction>();
  animatedClass : string;
  openProfileClass : string;
  public slideInLeftState: string;
  public slideOutRightState: string;
  user : any;
  status = "profileStatus";
  profileImg = "../../assets/img/avatar.png";
  constructor(
    public zone: NgZone,
    private authService : AuthenticationService,
    private userService : UserService
  ) {
    this.user = {};
  }

  ngOnInit() {
    this.getCurrentProfile();
  }
  openProfileModal() {
    this.profileModalActions.emit({action:"modal",params:['open']});
    this.openProfileClass = 'open';
  }
  closeProfileModal() {
    this.profileModalActions.emit({action:"modal",params:['close']});
    this.openProfileClass = 'close';
  }
  getCurrentProfile() {
    this.authService.getCurrentUserProfile().subscribe(result => {
      console.log(result);
      this.user = result;
      this.getUserProfile(this.user.username);
      return result;
    })
  }

  getUserProfile(userIdentifier) {
    let self = this;
    this.userService.getUserProfile(userIdentifier).subscribe(
      result => {
        if (!result) {
          self.profileImg = "../../assets/img/avatar.png";
          return;
        }
        else {
          self.profileImg = result;
          return result;
        }
      },
      err => {
        self.profileImg = "../../assets/img/avatar.png";
        return;
      }
    )
  }
}
