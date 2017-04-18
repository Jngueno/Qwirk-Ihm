/**
 * Created by TBS on 26/03/2017.
 */
import {Router} from "@angular/router";
import { Headers, Http } from '@angular/http';
import {APPCONFIG} from '../../config/param';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
let queryString = require('query-string');

@Injectable()
export class GroupService {
  private baseURL = 'http://localhost:8000/'
  protected headers = new Headers({'Content-Type': 'application/json'});

  private url: string;
  private appConfig: APPCONFIG;
  constructor(private http: Http) {
    this.appConfig = new APPCONFIG();
    this.url = this.appConfig.urlAPI;
  }
  
  getGroups(params) {
    console.log(this.url)
    let query = params ? '?' + queryString.stringify({filter: JSON.stringify(params)}) : '';
    return this.http.get(this.url + 'groups' + query)
      .map( res => res.json())
  }

  addGroup(content) {
    let body = content || '{}';
    return this.http.post(this.url + 'groups', JSON.stringify(body))
  }

  updateGroup(content) {
    let body = content || '{}';
    return this.http.put(this.url + 'groups', JSON.stringify(body))
  }


}
