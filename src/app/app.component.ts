/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <nav>
      <a [routerLink]=" ['./login'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Sign In
      </a>
      <a [routerLink]=" ['./register'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Sign Up
      </a>
      <logout></logout>
    </nav>
    <!--<workbench></workbench>-->
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent implements OnInit {
  public name = 'Qwirk App';
  public token: string;
  public isToken : boolean;

  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);

    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;

    if(this.token) {
      this.isToken = true;
    }
    else {
      this.isToken = false;
    }
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
