/**
 * Created by jngue on 20/03/2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { APPCONFIG } from '../../config/param';
import { IUser } from '../models/index';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  public token: string;
  public appConfig = new APPCONFIG();


  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(userIdentifier: string, password: string): Observable<boolean> {
    return this.http.post(this.appConfig.getUrlAPI() + 'login/', JSON.stringify({ userIdentifier: userIdentifier, password: password }))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ userIdentifier: userIdentifier, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  register(user){
    return this.http.post(this.appConfig.getUrlAPI() + 'register/', user)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ userIdentifier: user.username, token: token }));
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      })
  }

  uploadUserProfilePic(username, image) {

    console.log("test");
    let headers = new Headers();
    headers.append("Content-Type", 'multipart/form-data');

      return this.http.post(this.appConfig.getUrlAPI() + 'user/' + username, image, {headers: headers})
        .map(response => {
          let id = response.json() && response.json().id;
          if(id) {
            return true;
          }
          else {
            return false;
          }
        });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
