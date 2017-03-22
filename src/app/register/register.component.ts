/**
 * Created by Housseini  Maiga on 3/9/2017.
 */
import {Component, OnInit} from '@angular/core';
import {IUser} from "../shared/models/user";
import {UserService} from "../shared/services/user.service";
import { AuthenticationService } from "../shared/services/authentication.service";
import { Router } from '@angular/router';

@Component({
  providers: [
    AuthenticationService
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: IUser;

  loading = false;
  error = '';
  constructor(
    private router: Router,
    private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  public register(form: any){
    this.authService.register(form.value).subscribe(
      result => {
        if (result === true) {
          // login successful
          this.router.navigate(['/']);
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      }
    );

    console.log(form.value);
    console.log("Hello from register");
  }
}
