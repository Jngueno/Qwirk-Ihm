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
import { NgForm } from '@angular/forms';
import {ConnectionService} from "./connection.service";
import {IUser} from "../shared/models/user";
import {UserService} from "../shared/services/user.service";


@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'connection'
  selector: 'connection',  // <connection></connection>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title,
    ConnectionService
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

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public title: Title,
    private connectionService: ConnectionService,
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

  public connectUser(form: NgForm) {
    console.log("Hello from register");
    if(!form.value) { return; }
    this.connectionService.getUser(form.value).subscribe(
        user => this.user = user,
        error => this.errorMessage = <any>error
    );

    if (this.errorMessage) {
        this.toastText = this.errorMessage;
    }
    if (this.user) {
        this.toastText = "Success";
    }
    console.log(this.user);
  }

  triggerConnectionState() {
    this.connectionStateAction.emit('toast');
  }
}
