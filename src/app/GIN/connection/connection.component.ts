/**
 * Created by jngue on 05/03/2017.
 */
import {
  Component,
  OnInit, EventEmitter
} from '@angular/core';

import {MaterializeAction} from "angular2-materialize";

import { AppState } from '../../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { IUser } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import {ResetPassService} from "../../shared/services/resetPass.service";
import {Headers, Response, Http} from "@angular/http";
import {APPCONFIG} from "../../config/param";
import {StatusService} from "../../shared/services/status.service";


@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'connection'
  selector: 'connection',  // <connection></connection>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title,
    AuthenticationService,
    ResetPassService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ 'connection.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: 'connection.component.html'
})
export class ConnectionComponent implements OnInit {

  connectionStateAction = new EventEmitter<string|MaterializeAction>();
  toastText = "";
  toastTime = 4000;
  profileImg = "../../assets/img/avatar.png";
  // Set our default values
  public localState = { value: '' };

  user : IUser;
  errorMessage = "";
  mode = 'Observable';

  loading = false;
  error = '';

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public title: Title,
    private authService : AuthenticationService,
    private resetService : ResetPassService,
    private router: Router,
    private userService: UserService,
    private statusService: StatusService
  ) {
  }

  public ngOnInit() {
    console.log('hello `Connection` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  public connectUser(value: any) {
    console.log(value.userIdentifier, value.password);
    if(!value) { return; }

    this.authService.login(value.userIdentifier, value.password).subscribe(
      result => {
        if (result === true) {
          this.toastText = "Success";
          let status = {"name" : "Online"};
          this.statusService.updateStatusCurrentUser(status).subscribe(
            result => {
              // login successful
              this.router.navigate(['/']);

              this.connectionStateAction.emit('toast');
            })
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;

          this.toastText = this.errorMessage;

          this.connectionStateAction.emit('toast');
        }
      }
    );
  }

  triggerConnectionState() {
    this.connectionStateAction.emit('toast');
  }

  restorePassProcess(value: any) {
    if (!value.userIdentifier) {
       return;
    }

    console.log('success');
    this.resetService.sendReqResetPass(value.userIdentifier).subscribe(
      result => {
        if (result) {
          this.connectionStateAction.emit('toast');
        }
        else {

          this.error = 'Not send';

          this.toastText = this.error;

          this.connectionStateAction.emit('toast');
        }
      }
    );
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
