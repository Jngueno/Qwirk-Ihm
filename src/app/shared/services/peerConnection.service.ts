/**
 * Created by Housseini  Maiga on 5/18/2017.
 */
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Router} from "@angular/router";

//Internal import
import 'rxjs/add/operator/map'
import {APPCONFIG} from "../../config/param";

@Injectable()
export class PeerConnectionService {
  private url: string;
  private appConfig: APPCONFIG;
  constructor(private http: Http,
              private route: Router) {
    this.appConfig = new APPCONFIG();
    this.url = this.appConfig.urlAPI;
  }

  updateUserPerId(peer : string) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let user = {
      email : currentUser,
      peerId : peer
    };
    return this.http.put(this.url + 'update/peer/', user)
      .map((response: Response) => response.json());
  }
}
