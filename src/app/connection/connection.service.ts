/**
 * Created by jngue on 06/03/2017.
 */
// Observable Version
import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {IUser} from "../shared/models/user";
import {APPCONFIG} from "../config/param";

@Injectable()
export class ConnectionService {
  private connectionUrl : string;
  private user :IUser;
  private errorMessage: string;
  private appConfig : APPCONFIG;
  constructor(private http : Http) {
    this.appConfig = new APPCONFIG();
    this.connectionUrl = (this.appConfig.urlAPI || "  http://localhost:3000/" ) + "users/";
  }

  getUser(params) : Observable<IUser> {
    console.log(this.connectionUrl);
    return this.http.get(this.connectionUrl + params.userIdentifier + '/' + params.password)
      .map(this.extractData)


  }
  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  /*
  private connectionUrl : string;
  private user :User;
  private appConfig : APPCONFIG;
  constructor(private jsonp: Jsonp) {
    this.appConfig = new APPCONFIG();
    this.connectionUrl = (this.appConfig.urlAPI || "http://localhost:3030/" ) + "user/";
  }

  getUser(params) : Observable<User> {
    let urlParams = new URLSearchParams();

    urlParams.set('format', 'json');
    urlParams.set('callback', 'JSONP_CALLBACK');
    console.log(this.connectionUrl);

    return this.http.get(this.connectionUrl + params.userIdentifier + '/' + params.password)
      .map(this.extractData)
      .catch(this.handleError)
  }*/
}
