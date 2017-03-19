/**
 * Created by Housseini  Maiga on 3/9/2017.
 */
import {Component, OnInit} from '@angular/core';
import {IUser} from "../shared/models/user";
import {UserService} from "../shared/services/user.service";

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: IUser;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  public register(form: any){
    this.userService.create(form.value);

    console.log(form.value);
    console.log("Hello from register");
  }
}
