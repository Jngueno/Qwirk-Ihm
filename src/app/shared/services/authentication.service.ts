/**
 * Created by jngue on 20/03/2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { APPCONFIG } from '../../config/param';
import { IUser } from '../models/index';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  public token: string;
  public appConfig = new APPCONFIG();
  private headers: Headers;
  private progress: any;
  private progressObserver: any;

  requestUrl: string;
  responseData: any;
  handleError: any;


  constructor(private http: Http) {
    // set token if saved in local storage
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.progress = Observable.create(observer => {
      console.log(observer);
      this.progressObserver = observer
    }).share();
  }

  login(userIdentifier: string, password: string): Observable<boolean> {
    return this.http.post(this.appConfig.getUrlAPI() + 'login/', JSON.stringify({ userIdentifier: userIdentifier, password: password }))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        let user_id = response.json() && response.json().user_id;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ userIdentifier: userIdentifier, token: token, user_id : user_id }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  register(user){
    console.log("Mon token est : test");
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

  getCurrentUserProfile() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
    return this.http.get(this.appConfig.getUrlAPI() + 'profile', {headers : this.headers})
      .map((response : Response) => {
        return response.json();
      })
  }

  uploadUserProfile(user : any) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
    return this.http.put(this.appConfig.getUrlAPI() + "update", user, {headers : this.headers})
      .map((response : Response) => {
        return response.json();
      })
  }

  deleteAccount() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
    return this.http.get(this.appConfig.getUrlAPI() + 'delete', {headers : this.headers})
      .map((response : Response) => {
        return response.json();
      })
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  makeFileRequest (postData: any, files: File[]) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
    let formData:FormData = new FormData();
    formData.append('files', files[0], files[0].name);
    // For multiple files
    // for (let i = 0; i < files.length; i++) {
    //     formData.append(`files[]`, files[i], files[i].name);
    // }

    if(postData !=="" && postData !== undefined && postData !==null){
      for (var property in postData) {
        if (postData.hasOwnProperty(property)) {
          formData.append(property, postData[property]);
        }
      }
    }
    let returnReponse = new Promise((resolve, reject) => {
      this.http.post(this.appConfig.getUrlAPI() + "uploadUserPic", formData, {
        headers: headers
      }).subscribe(
        res => {
          this.responseData = res.json();
          resolve(this.responseData);
        },
        error => {
          reject(error);
        }
      );
    });
    return returnReponse;
  }
}
