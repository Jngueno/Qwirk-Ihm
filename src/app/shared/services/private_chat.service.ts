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
    console.log(roomName, message);
    message.roomName = roomName;
    console.log("Send message : ", JSON.parse(JSON.stringify(message)));
    this.socket.emit(roomName, JSON.parse(JSON.stringify(message)));
  }

  initConnection() {

  }

  getMessages(sender, receiver) {
    let roomName = "";
    (receiver.username > sender.username) ?
      roomName = sender.username + receiver.username
      : roomName = receiver.username + sender.username;
    let observable = new Observable(
      observer => {
        this.socket = io(this.url + '/privatePeer2Peer');
        console.log(roomName);
        this.socket.emit('room', roomName);
        this.socket.on(roomName, (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      })
    return observable;
  }

  disconnectSocket() {
    this.socket.disconnect();
  }

  sendNotificationWriting(sender, receiver) {
    let message = sender.username + " is typing";
    console.log("Is emit", sender.username);
    this.socket.emit('isTyping', message);
  }

  sendNotificationBlur(sender, receiver) {
    let message = "";
    console.log("Is emit", sender.username);
    this.socket.emit('isTyping', message);
  }

  getNotificationWriting(sender, receiver) {
    let roomName = "";
    (receiver.username > sender.username) ?
      roomName = sender.username + receiver.username
      : roomName = receiver.username + sender.username;
    let observable = new Observable(
      observer => {
        this.socket = io(this.url + '/privatePeer2Peer');
        console.log('Receive message');
        console.log(roomName);
        this.socket.emit('room', roomName);
        this.socket.on('isTyping', (data) => {
          console.log('Receive message');
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      });
    return observable;
  }

  getNotificationBlur(sender, receiver) {
    let roomName = "";
    (receiver.username > sender.username) ?
      roomName = sender.username + receiver.username
      : roomName = receiver.username + sender.username;
    let observable = new Observable(
      observer => {
        this.socket = io(this.url + '/privatePeer2Peer');
        console.log('Receive message');
        console.log(roomName);
        this.socket.emit('room', roomName);
        this.socket.on('isTyping', (data) => {
          console.log('Receive message');
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      });
    return observable;
  }

}
