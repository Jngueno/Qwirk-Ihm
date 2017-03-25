/**
 * Created by Housseini  Maiga on 3/9/2017.
 */
import {Component, OnInit} from '@angular/core';
import {IUser} from "../../shared/models/user";
import {UserService} from "../../shared/services/user.service";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { Router } from '@angular/router';
import {Headers} from "@angular/http";

@Component({
  providers: [
    AuthenticationService
  ],
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {
  user: IUser;

  loading = false;
  error = '';
  profileImg = "../../assets/img/add_avatar.png";
  profilePic = null;
  constructor(
    private router: Router,
    private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  public register(form: any){
    //console.log(this.profilePic);
    /*
    let formData = new FormData();
    formData.append('file[]', this.profilePic);
    let headers = new Headers();
    headers.append("Content-Type", 'multipart/form-data');
    this.authService.uploadUserProfilePic(form.value.username, formData).subscribe(res => {
      return res;
    });*/
    this.authService.register(form.value).subscribe(
      result => {
        if (result === true) {
          // register successful
          this.router.navigate(['/']);
        } else {
          // register failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      }
    );
    console.log(form.value);
    console.log("Hello from register");
  }

  clickInputFile (fileInput : any) {
    fileInput.value = null;
  }

  fileChangeEvent(fileInput: any){
    let self = this;
    if (fileInput.target.files && fileInput.target.files[0]) {
      self.profilePic = fileInput.target.files[0];
      let reader = new FileReader();

      reader.onload = function (e : any) {
        self.profileImg = e.target.result;
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
