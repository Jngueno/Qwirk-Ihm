/**
 * Created by jngue on 14/05/2017.
 */

import {Injectable} from "@angular/core";
import {APPCONFIG} from "../../config/param";
import {Http} from "@angular/http";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class PrivateChatService {
  public appConfig = new APPCONFIG();
  response : any;
  reset : any;
  private url = 'http://localhost:8000';
  private socket;
  constructor(private http: Http) {}

  sendMessage(sender, receiver, message){
    let roomName = "";
    (receiver.username > sender.username) ?
      roomName = sender.username + receiver.username
      : roomName = receiver.username + sender.username;
    this.socket.in.to(roomName).emit(roomName, message);
  }

  getMessages(sender, receiver) {
    let roomName = "";
    (receiver.username > sender.username) ?
      roomName = sender.username + receiver.username
      : roomName = receiver.username + sender.username;
    let observable = new Observable(
      observer => {
        this.socket = io(this.url);
        this.socket.on(roomName, (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      })
    return observable;
  }

}
