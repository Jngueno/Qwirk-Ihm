/**
 * Created by jngue on 26/03/2017.
 */

import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {APPCONFIG} from "../../config/param";
import {log} from "util";


@Injectable()
export class StatusService {
  private headers : Headers;
  private appConfig = new APPCONFIG();
  constructor(
    private http : Http,
  ) {}

  getCurrentStatus() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
    return this.http.get(this.appConfig.getUrlAPI() + 'currentStatus', {headers : this.headers})
      .map((response : Response) => {
          return response.json();
      })
  }

  getAllStatuses() {
    return this.http.get(this.appConfig.getUrlAPI() + 'statuses')
      .map((response: Response) => {
          return response.json();
      })
  }

  updateStatusCurrentUser(status : any) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
    return this.http.post(this.appConfig.getUrlAPI() + 'currentStatus', status, {headers : this.headers})
      .map((response : Response) => {
          return response.json();
      })
  }
}
