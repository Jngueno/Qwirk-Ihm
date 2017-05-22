/**
 * Created by Housseini  Maiga on 3/8/2017.
 */
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Http, Response, Headers} from "@angular/http";

import 'rxjs/add/operator/map'
import {APPCONFIG} from "../../config/param";
import {IUser} from "../models/user";
let queryString = require('query-string');

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

  getUser(params) {
    let query = params ? '?' + queryString.stringify({filter: JSON.stringify(params)}) : '';
    return this.http.get(this.url + 'users' + query)
                .map( res => res.json())
                // .subscribe(
                //     data => {
                //       console.log('data success Todo');
                //     },
                //   error => {
                //       console.log('error logged Todo')
                //   },
                //   () => {
                //       console.log('all fine Todo')
                //   }
                // );
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
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

  getAllContacts(user) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let fullContacts = [];
    let self = this;
    this.headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
    return this.http.get(this.url + 'contacts', {headers : this.headers})
      .map(response => {
        let contacts = response.json();
        for (let contact of contacts) {
          console.log("Is it the right thing : ", user.email, contact.email, user.email === contact.email)
          if(user.email === contact.email) {
            this.getUserById(contact.owner).subscribe(
              c => {
                contact.infoContact = c;
                fullContacts.push(contact);
              }
            )
          }
          else {
            this.getUserById(contact.contact).subscribe(
              c => {
                contact.infoContact = c;
                fullContacts.push(contact);
              }
            )
          }
        }
        return fullContacts;
      })
  }
}

