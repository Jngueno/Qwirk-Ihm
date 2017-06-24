import {APPCONFIG} from "../../config/param";
import {Headers, Http} from "@angular/http";
import {Router} from "@angular/router";
/**
 * Created by jngue on 24/06/2017.
 */
/*
export class ContactService {
  private url: string;
  private appConfig: APPCONFIG;
  private headers: Headers;
  constructor(private http: Http,
              private route: Router) {
    this.appConfig = new APPCONFIG();
    this.url = this.appConfig.urlAPI;
  }

  addUserToContact(user) {
      let data = {"contactemail" : user.email};
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log('Hello is getUserByEmail', currentUser);
      this.headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
      return this.http.post(this.url + 'contact', data, this.headers)
        .map(res => {
          return res.json();
        })
    }
}
*/
