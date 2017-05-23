/**
 * Created by jngue on 07/03/2017.
 */
export class APPCONFIG {

  urlAPI = "http://localhost:8000/";
  // urlAPI = "https://7515068c.ngrok.io/";
  constructor (
  ) { }
  getUrlAPI () {
    return this.urlAPI;
  }
}
