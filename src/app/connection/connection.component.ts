/**
 * Created by jngue on 05/03/2017.
 */
import {
  Component,
  OnInit, EventEmitter
} from '@angular/core';

import {MaterializeAction} from "angular2-materialize";

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';
import { IUser } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import {ResetPassService} from "../shared/services/resetPass.service";


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
  styleUrls: [ './connection.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './connection.component.html'
})
export class ConnectionComponent implements OnInit {

  connectionStateAction = new EventEmitter<string|MaterializeAction>();
  toastText = "";
  toastTime = 4000;
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
    private userService: UserService
  ) {}

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
    if(!value) { return; }
    this.authService.login(value.userIdentifier, value.password).subscribe(
      result => {
        if (result === true) {
          this.toastText = "Success";
          // login successful
          this.router.navigate(['/']);
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;

          this.toastText = this.errorMessage;
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
    this.resetService.sendReqResetPass(value.userIdentifier);
  }
}
