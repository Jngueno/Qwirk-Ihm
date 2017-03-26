/**
 * Created by jngue on 26/03/2017.
 */

import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {APPCONFIG} from "../../config/param";
import {log} from "util";


@Injectable()
export class StatusService {
  constructor(
    private http : Http,
    private headers : Headers,
    private appConfig : APPCONFIG
  ) {}

  getCurrentStatus() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
    this.http.get(this.appConfig.getUrlAPI() + 'currentStatus', this.headers)
      .map((response : Response) => {
          return !!response.json();
      })
  }
}
