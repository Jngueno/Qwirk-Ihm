/**
 * Created by Housseini  Maiga on 3/8/2017.
 */
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Http, Response, Headers} from "@angular/http";

import 'rxjs/add/operator/map'
import {APPCONFIG} from "../../config/param";
import {IUser} from "../models/user";

@Injectable()
export class UserService {
  private url: string;
  private appConfig: APPCONFIG;
  private headers: Headers;
  constructor(private http: Http,
              private route: Router) {
    this.appConfig = new APPCONFIG();
    this.url = this.appConfig.urlAPI;
  }

  create(user: IUser){
    this.http.post(this.url + 'users/', user)
      .map((response: Response) => response.json())
      .subscribe(
        data => {
          this.route.navigate(['./login'])
        },
        error => {
          console.log("Navigate to " +
            "connection failed");
        },
        () => {
          console.log("Completed with success");
        }
      );
  }

  getUserProfile(userIdentifier : string) {
    return this.http.get(this.url + 'user/' + userIdentifier)
      .map(response => {
        if(response.status === 500) { return false; }
        else { return this.url + 'user/' + userIdentifier; }
      })
  }

  getUserById(id : string) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
    return this.http.get(this.url + 'id/' + id, {headers : this.headers})
      .map(response => {
        return response.json();
      })
  }

  addContact(params) {
    this.http.put(this.url + 'users/',params)
      .map((response: Response) => response.json())
      .subscribe(
        data => {
          console.log("New contact added");
        },
        error => {
          console.log("invalid username ou email");
        },
        () => {
          console.log("Completed with success");
        }
      );
  }

  getAllContacts() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
    return this.http.get(this.url + 'contacts', {headers : this.headers})
      .map(response => {
        return response.json();
      })
  }
}

