/**
 * Created by Housseini  Maiga on 5/18/2017.
 */
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Router} from "@angular/router";

//Internal import
import 'rxjs/add/operator/map'
import {APPCONFIG} from "../../config/param";

let Peer = require('peerjs');

@Injectable()
export class PeerConnectionService {
  private url: string;
  private appConfig: APPCONFIG;
  private peer: PeerJs.Peer;
  constructor(private http: Http,
              private route: Router) {
    this.appConfig = new APPCONFIG();
    this.url = this.appConfig.urlAPI;
  }

  initPeer() {
    let peerId = JSON.parse(localStorage.getItem('currentUser')).user_id;
    let config : any = {'iceServers': [{
      urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'turn:numb.viagenie.ca'],
      username:"lisa@learnfromlisa.com",
      credential:"22paris22"
    }]
    };
    this.peer = new Peer(peerId, { key: 'r7c3c8imm7gjsjor',
      debug: 3,
      config : config
    });
    console.log('Peer : ', this.peer);
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
