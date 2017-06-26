/**
 * Created by jngue on 14/05/2017.
 */

import {Injectable} from "@angular/core";
import {APPCONFIG} from "../../config/param";
import {Http, Response, Headers} from "@angular/http";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class PrivateChatService {
  public appConfig = new APPCONFIG();
  response : any;
  reset : any;
  private url = this.appConfig.getUrlAPI();
  private socket;
  private globalSocket;
  private responseData: any;
  constructor(private http: Http) {}

  sendMessage(sender, receiver, message){
    let roomName = "";
    (receiver.username > sender.username) ?
      roomName = sender.username + receiver.username
      : roomName = receiver.username + sender.username;
    message.roomName = roomName;
    console.log("Send Message RoomName : ", roomName);
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
        this.socket = io(this.appConfig.getUrlAPI() + 'privatePeer2Peer', {'transports': ['websocket', 'polling']});

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let userRoom = {"user" : currentUser.user_id, "room" : roomName};
        this.socket.emit('room', userRoom);
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
    this.socket.emit('isTyping', message);
  }

  sendNotificationBlur(sender, receiver) {
    let message = "";
    this.socket.emit('isTyping', message);
  }

  updateMessageStatus(sender, receiver, message) {
    this.socket.emit('updateStatus', message);
  }

  getNotificationWriting(sender, receiver) {
    let roomName = "";
    (receiver.username > sender.username) ?
      roomName = sender.username + receiver.username
      : roomName = receiver.username + sender.username;
    let observable = new Observable(
      observer => {
        //this.socket = io(this.url + '/privatePeer2Peer');
        //console.log('Receive message');
        //console.log(roomName);
        //this.socket.emit('room', roomName);
        this.socket.on('isTyping', (data) => {
          //console.log('Receive message');
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
        //this.socket = io(this.url + '/privatePeer2Peer');
        //this.socket.emit('room', roomName);
        this.socket.on('isTyping', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      });
    return observable;
  }

  getMessageWhenMsgStatus(sender, receiver) {
    let roomName = "";
    (receiver.username > sender.username) ?
      roomName = sender.username + receiver.username
      : roomName = receiver.username + sender.username;
    let observable = new Observable(
      observer => {
        this.socket.on('updateStatus', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      });
    return observable;
  }

  getAllHistoryContactMessages(contact, start, limit) {
    return this.http.get(this.appConfig.getUrlAPI() + 'messages/' + contact + '/' + start + '/' + limit)
      .map((response : Response) => {
        //console.log(response.json());
        return response.json();
      })
  }


  getNewMessagesPush(sender) {
    let observable = new Observable(
      observer => {
        this.socket = io(this.appConfig.getUrlAPI(), {'transports': ['websocket', 'polling']});
        this.socket.on('newMessage', (data) => {
          //console.log("Get new messages from qwirk platform",sender, data.receiverUser);
          if(data.receiverUser.indexOf(sender._id) !== -1) {
            observer.next(data);
          }
        });
        return () => {
          this.socket.disconnect();
        };
      });
    return observable;
  }

  makeFileRequest (postData: any, files: File[]) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
    let formData:FormData = new FormData();
    formData.append('files', files[0], files[0].name);
    console.log(postData);
    // For multiple files
    // for (let i = 0; i < files.length; i++) {
    //     formData.append(`files[]`, files[i], files[i].name);
    // }

    if(postData !=="" && postData !== undefined && postData !==null){
      for (var property in postData) {
        if (postData.hasOwnProperty(property)) {
          formData.append(property, JSON.stringify(postData[property]));
        }
      }
    }
    let returnReponse = new Promise((resolve, reject) => {
      this.http.post(this.appConfig.getUrlAPI() + "uploadMessage", formData, {
        headers: headers
      }).subscribe(
        res => {
          console.log("Upload message", res);
          this.responseData = res.json();
          resolve(this.responseData);
        },
        error => {
          reject(error);
        }
      );
    });
    return returnReponse;
  }
}
