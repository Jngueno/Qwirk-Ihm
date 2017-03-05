/**
 * Created by jngue on 05/03/2017.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class Title {

  public value = 'Sign In to Qwirk';

  constructor(
    public http: Http
  ) {}

  public getData() {
    console.log('Title#getData(): Get Data');
    // return this.http.get('/assets/data.json')
    // .map(res => res.json());
    return {
      value: 'Qwirk'
    };
  }

}
