/**
 * Created by TBS on 26/03/2017.
 */
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx' ;
import {APPCONFIG} from '../../config/param';
let queryString = require('query-string');

@Injectable()
export class Service {
  private baseURL = new APPCONFIG().getUrlAPI;
  protected headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  public get(URI: string, filter?: any): Promise<any> {
    let URN = this.baseURL + URI;
    let query = filter ? '?' + queryString.stringify({filter: JSON.stringify(filter)}) : '';
    return this.http
      .get(URN + query, {headers: this.headers, withCredentials: true, body: false})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  // Add new object
  protected post(URI: string, content?: any): Promise<any> {
    let URN = this.baseURL + URI;
    let body = content || '{}';
    return this.http
      .post(URN, JSON.stringify(body), {headers: this.headers, withCredentials: true})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  // Update existing object
  protected put(URI: string, content?: any) {
    let URN = this.baseURL + URI;
    let body = content || '{}';
    return this.http
      .put(URN, JSON.stringify(body), {headers: this.headers, withCredentials: true})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  protected delete(URI: string, content?: any): Promise<any> {
    let URN = this.baseURL + URI;
    let body = content || {};
    return this.http
      .delete(URN, {headers: this.headers, withCredentials: true, body: body})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  protected handleError(error: any) {
    let status = error.status;
    let body = typeof error._body === 'string' ? JSON.parse(error._body) : error;
    body.isError = true;

    if (!status) {
      body.message = 'The API Server is currently under maintenance';
      return body;
    }
    body.message = typeof body.message === 'string' ? body.message : error.statusText;
    return body;
  }
}

