/**
 * Created by jngue on 23/03/2017.
 */
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
import { IUser } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ResetPassService} from "../shared/services/resetPass.service";


@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'connection'
  selector: 'reset',  // <connection></connection>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title,
    ResetPassService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './resetPassword.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './resetPassword.component.html'
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordStateAction = new EventEmitter<string|MaterializeAction>();
  toastText = "";
  toastTime = 4000;
  // Set our default values
  public localState = { value: '' };

  user : IUser;
  errorMessage = "";
  mode = 'Observable';

  loading = false;
  error = '';
  resetToken : string;

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public title: Title,
    private resetService : ResetPassService,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  public ngOnInit() {
    console.log('hello `Reset` component');

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let reset = params['reset_token'];
      this.resetToken = reset;
    });
    // this.title.getData().subscribe(data => this.data = data);
  }
/*
  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
*/
  public resetPassword(value: any) {
    if(value.password !== value.confirmPassword) { return; }

    this.resetService.changeUserPassword(this.resetToken, value.password).subscribe(
      result => {
        console.log(result);

        this.router.navigate(['/login']);
      }
    );
  }

  triggerConnectionState() {
    this.resetPasswordStateAction.emit('toast');
  }
}
