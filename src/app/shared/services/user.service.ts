/**
 * Created by Housseini  Maiga on 3/8/2017.
 */
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Http, Response} from "@angular/http";

import 'rxjs/add/operator/map'
import {APPCONFIG} from "../../config/param";
import {IUser} from "../models/user";

@Injectable()
export class UserService {
  private url: string;
  private appConfig: APPCONFIG;
  constructor(private http: Http,
              private route: Router) {
    this.appConfig = new APPCONFIG();
    this.url = this.appConfig.urlAPI;
  }

  getUser(params) {
    return this.http.get(this.url + 'users/' + params.userId + '/' + params.password)
                .map(this.extractData)
                .subscribe(
                    data => {
                      console.log('data success Todo');
                    },
                  error => {
                      console.log('error logged Todo')
                  },
                  () => {
                      console.log('all fine Todo')
                  }
                );
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
           this.route.navigate(['./connection'])
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
}

